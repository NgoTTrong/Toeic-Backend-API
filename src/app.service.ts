import { Injectable } from '@nestjs/common';
import * as dayjs from 'dayjs';

@Injectable()
export class AppService {
  date = Date();

  getHello(): string {
    return `Lasted version release at --- ${dayjs(this.date)
      .add(7, 'hour')
      .format('DD/MM/YYYY - HH:mm:ss')} ---`;
  }
}
