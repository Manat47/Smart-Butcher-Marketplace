import {
  BadRequestException,
  NotFoundException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../../prisma-db/prisma.service';
import { VerifyPaymentDto } from './dto/verify-payment.dto';

@Injectable()
export class PaymentService {
  constructor(private readonly prisma: PrismaService) {}

  async processSlipUpload(
    userId: number,
    orderId: number,
    amount: number,
    slipImageUrl: string,
  ) {
    const order = await this.prisma.order.findFirst({
      where: { id: orderId, userId: userId },
    });

    if (!order) {
      throw new BadRequestException('ไม่พบคำสั่งซื้อนี้ในระบบ');
    }

    const existingPendingPayment = await this.prisma.payment.findFirst({
      where: { orderId, status: 'PENDING' },
    });
    if (existingPendingPayment) {
      throw new BadRequestException(
        'คำสั่งซื้อนี้มีสลิปรอการตรวจสอบอยู่แล้ว กรุณารอแอดมินตรวจสอบก่อน',
      );
    }

    const payment = await this.prisma.payment.create({
      data: {
        orderId: orderId,
        userId: userId,
        amount: amount,
        paymentMethod: 'BANK_TRANSFER',
        slipImageUrl: slipImageUrl,
        status: 'PENDING',
        paymentDate: new Date(),
      },
    });

    return {
      message: 'อัปโหลดสลิปสำเร็จ กรุณารอผู้ดูแลระบบตรวจสอบ',
      payment,
    };
  }

  async verifyPaymentSlip(paymentId: number, status: 'VERIFIED' | 'REJECTED') {
    const payment = await this.prisma.payment.findUnique({
      where: { id: paymentId },
      include: {
        order: {
          include: {
            orderItems: {
              include: {
                product: true,
              },
            },
          },
        },
      },
    });

    if (!payment) {
      throw new NotFoundException('ไม่พบข้อมูลสลิปการชำระเงินนี้');
    }

    if (payment.status !== 'PENDING') {
      throw new BadRequestException(
        `สลิปใบนี้ถูกตรวจสอบไปแล้ว (สถานะปัจจุบัน: ${payment.status})`,
      );
    }

    const newOrderStatus = status === 'VERIFIED' ? 'PAID' : 'CANCELLED';

    const prismaOperations: any[] = [
      this.prisma.payment.update({
        where: { id: paymentId },
        data: { status: status },
      }),
      this.prisma.order.update({
        where: { id: payment.orderId },
        data: { orderStatus: newOrderStatus },
      }),
    ];

    if (status === 'VERIFIED') {
      let platformFeePercentage = 10;
      const setting = await this.prisma.systemSetting.findUnique({
        where: { key: 'PLATFORM_FEE_PERCENTAGE' },
      });
      if (setting) {
        platformFeePercentage = parseFloat(setting.value) || 10;
      }

      const storeEarnings = new Map<number, number>();
      for (const item of payment.order.orderItems) {
        const storeId = item.product.storeId;
        storeEarnings.set(
          storeId,
          (storeEarnings.get(storeId) || 0) + item.subtotal,
        );
      }

      let totalPlatformFee = 0;

      for (const [storeId, totalAmount] of storeEarnings.entries()) {
        const feeAmount = (totalAmount * platformFeePercentage) / 100;
        const storeAmount = totalAmount - feeAmount;
        totalPlatformFee += feeAmount;

        prismaOperations.push(
          this.prisma.store.update({
            where: { id: storeId },
            data: {
              balance: { increment: storeAmount },
              totalSales: { increment: totalAmount },
            },
          }),
        );
        prismaOperations.push(
          this.prisma.storeTransaction.create({
            data: {
              storeId: storeId,
              amount: storeAmount,
              description: `รายรับจากคำสั่งซื้อ #${payment.orderId} (หัก GP ${platformFeePercentage}%)`,
            },
          }),
        );
      }

      if (totalPlatformFee > 0) {
        prismaOperations.push(
          this.prisma.platformTransaction.create({
            data: {
              orderId: payment.orderId,
              amount: totalPlatformFee,
              description: `Platform GP Fee ${platformFeePercentage}% for Order #${payment.orderId}`,
            },
          }),
        );
      }
    } else if (status === 'REJECTED') {
      for (const item of payment.order.orderItems) {
        prismaOperations.push(
          this.prisma.product.update({
            where: { id: item.productId },
            data: {
              stockQuantity: { increment: item.quantity },
            },
          }),
        );
      }
    }

    const results = await this.prisma.$transaction(prismaOperations);

    return {
      message: 'อัปเดตสถานะสำเร็จ',
      updatedPayment: results[0],
      updatedOrder: results[1],
    };
  }
}
