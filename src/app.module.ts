import {
  Module,
  MiddlewareConsumer,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirebaseApp } from './firebase/firebase-app';
import { AuthMiddleware, EventMiddleware } from './config/middleware';
import { UploadService } from './constants/common/storage/google-cloud-storage.service';
import { CategorySeeder } from './constants/seeders/Categories/category.seeder';
import { BadgeSeeder } from './constants/seeders/Badges/Badges';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { EventsModule } from './events/events.module';
import { CommentsModule } from './comments/comments.module';
import { ReviewsModule } from './reviews/reviews.module';
import { ReelsModule } from './reels/reels.module';
import { PostsModule } from './posts/posts.module';
import { FeedsModule } from './feeds/feeds.module';
import { SendEmailService } from 'constants/common/utils';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    ProfileModule,
    EventsModule,
    CommentsModule,
    ReviewsModule,
    ReelsModule,
    PostsModule,
    FeedsModule,
  ],
  controllers: [AppController],
  providers: [
    FirebaseApp,
    CategorySeeder,
    BadgeSeeder,
    AppService,
    UploadService,
    SendEmailService
  ],
  exports: [FirebaseApp, UploadService, SendEmailService],
})
export class AppModule implements NestModule {
  constructor(
    private readonly categorySeeder: CategorySeeder,
    private readonly badgeSeeder: BadgeSeeder,
  ) {}

  async onModuleInit() {
    await this.categorySeeder.seedCategories();
    await this.badgeSeeder.seedCategories();
  }
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware, EventMiddleware).forRoutes({
      path: '/auth/*',
      method: RequestMethod.ALL,
    });
  }
}
