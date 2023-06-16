import { Controller, Get } from '@nestjs/common';
import * as packageJson from '../../package.json';

@Controller()
export class CheckController {
  @Get('/')
  async check(): Promise<string> {
    return packageJson.version;
  }
}
