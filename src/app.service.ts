import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { firstValueFrom } from 'rxjs';
import * as Config from './wxConfig.json';

@Injectable()
export class AppService {
  accessToken: string;

  constructor(private readonly httpService: HttpService) {
    this.getAccessToken();
  }

  @Cron(CronExpression.EVERY_HOUR)
  async getAccessToken() {
    try {
      const response = await firstValueFrom(
        this.httpService.get(
          `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${Config.appId}&secret=${Config.appSecret}`,
        ),
      );

      if (response.data.access_token) {
        this.accessToken = response.data.access_token;
      } else {
        Logger.log('获取access_token为空');
      }
    } catch (e) {
      Logger.log('获取access_token失败: ' + e.toString());
      this.getAccessToken();
    }
  }
}
