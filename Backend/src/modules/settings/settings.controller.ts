import { Controller, Get, Patch, Body, UseGuards } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';

@Controller('settings')
@UseGuards(JwtAuthGuard, AdminGuard)
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get('gp')
  async getGpPercentage() {
    return this.settingsService.getPlatformFeePercentage();
  }

  @Patch('gp')
  async updateGpPercentage(@Body('percentage') percentage: number) {
    return this.settingsService.updatePlatformFeePercentage(percentage);
  }
}
