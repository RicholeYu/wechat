import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import Config from './wxConfig.json';
@Injectable()
export class AppService {
  accessToken: string;

  constructor(private readonly httpService: HttpService) {
    this.getAccessToken();
  }

  @Cron(CronExpression.EVERY_HOUR)
  async getAccessToken() {
    const response = await firstValueFrom(
      this.httpService.get(
        `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${Config.appId}&secret=${Config.appSecret}`,
      ),
    );

    console.log(response.data);
    this.accessToken = response.data.accessToken;
  }
}
