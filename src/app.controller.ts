import * as crypto from 'crypto';
import { Controller, Get, Logger, Query } from '@nestjs/common';
import { AppService } from './app.service';
import * as config from './wxConfig.json';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/wechat/')
  async getSignature(@Query() query) {
    const arr = [config.wechatToken, query.timestamp, query.nonce].sort();
    const sha1Hash = crypto.createHash('sha1');
    sha1Hash.update(arr.join(''));

    const result = sha1Hash.digest('hex');

    if (result === query.signature) {
      Logger.log('微信公众号验证成功');
      return query.echostr;
    }

    Logger.error('微信公众号验证失败');
    return 'failed';
  }
}
