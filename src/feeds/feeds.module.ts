import { Module, forwardRef } from '@nestjs/common';
import { FeedsService } from './feeds.service';
import { FeedsController } from './feeds.controller';
import { AppModule } from '../app.module';

@Module({
  imports: [forwardRef(() => AppModule)],
  controllers: [FeedsController],
  providers: [FeedsService],
})
export class FeedsModule {}
