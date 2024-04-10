import { Module, forwardRef } from '@nestjs/common';
import { ReelsService } from './reels.service';
import { ReelsController } from './reels.controller';
import { AppModule } from '../app.module';

@Module({
  imports: [forwardRef(() => AppModule)],
  controllers: [ReelsController],
  providers: [ReelsService],
})
export class ReelsModule {}
