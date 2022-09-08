import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
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
    const response = await firstValueFrom(
      this.httpService.get(
        `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${Config.appId}&secret=${Config.appSecret}`,
      ),
    );

    this.accessToken = response.data.access_token;
    console.log(this.accessToken);
  }
}
