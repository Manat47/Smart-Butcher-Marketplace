import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma-db/prisma.service';

@Injectable()
export class SettingsService {
  constructor(private readonly prisma: PrismaService) {}

  async getPlatformFeePercentage() {
    const setting = await this.prisma.systemSetting.findUnique({
      where: { key: 'PLATFORM_FEE_PERCENTAGE' },
    });
    return {
      percentage: setting ? parseFloat(setting.value) : 10,
    };
  }

  async updatePlatformFeePercentage(percentage: number) {
    const updated = await this.prisma.systemSetting.upsert({
      where: { key: 'PLATFORM_FEE_PERCENTAGE' },
      update: { value: percentage.toString() },
      create: { key: 'PLATFORM_FEE_PERCENTAGE', value: percentage.toString() },
    });
    return {
      message: 'อัปเดตเปอร์เซ็นต์ GP สำเร็จ',
      percentage: parseFloat(updated.value),
    };
  }
}
