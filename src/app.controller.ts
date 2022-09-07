import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';
import * as wechat from 'wechat-jssdk';
import { Request } from 'express';
import config from '../wxConfig.json';

const wx = new wechat.Wechat(config);

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  async getSignature(@Req() request: Request) {
    console.log(request.url);
    const signatureData: any = await wx.jssdk.getSignature(request.url);
    console.log(signatureData);

    return signatureData;
  }
}
