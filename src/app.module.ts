import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { AppService } from './services/app.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [AppService],
})
export class AppModule {}
