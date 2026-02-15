import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './profile.service';
import { ProfileController } from './profile.controller';

@Module({
  imports: [],
  controllers: [ProfileController],
  providers: [AppService],
})
export class AppModule {}
