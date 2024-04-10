import { Injectable } from '@nestjs/common';
import { api_response } from '../constants/utility/response';
import { logger } from '../config/logger';
import { CreateReelDTO } from '../database/dto/reels.dto';
import { FirebaseApp } from '../firebase/firebase-app';
import { UploadService } from '../constants/common/storage/google-cloud-storage.service';

@Injectable()
export class ReelsService {
  constructor(
    private readonly firebaseApp: FirebaseApp,
    private uploadService: UploadService,
  ) {}

  async getReels(page_, pageSize_) {
    try {
      const pageSize = +pageSize_;
      const page = +page_;
      const offset = (page - 1) * pageSize;
      logger.info('=====getReels request initiated====');
      const reviews = await this.firebaseApp
        .firestore()
        .collection('reels')
        .orderBy('timestamp')
        .offset(offset)
        .limit(pageSize)
        .get();
      const reviewArray = [];
      reviews.forEach((doc) => {
        reviewArray.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      logger.info('Reels fetched successfully');
      return api_response(reviewArray, 200);
    } catch (error) {
      logger.error(error);
      return api_response(error, 400);
    }
  }

  async createReel(itemId: string, user: any, payload: any) {
    try {
      logger.info('=====createReel request initiated====');
      const { uid } = user;
      const userRecord = await this.firebaseApp.getAuth().getUser(uid);
      if (userRecord) {
        if (!userRecord) {
          logger.error('User not found');
          return api_response([], 401, 'User not found');
        }
        const reviewPayload = {
          ...payload,
          owner: uid,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        const review = await this.firebaseApp
          .firestore()
          .collection('reels')
          .add({ ...reviewPayload });
        await this.firebaseApp
          .firestore()
          .collection('reels')
          .doc(review.id)
          .update({
            id: review.id,
          });
        const newReel = await this.firebaseApp
          .firestore()
          .collection('reels')
          .doc(review.id);
        const uploadReel = await this.uploadService.uploadFile(
          payload.file,
          'posts',
        );
        if (uploadReel) {
          logger.info('fetched user successfully');
          const getPosts = (await newReel.get()).data();
          newReel.update({
            id: review.id,
            images: [...getPosts['images'], uploadReel],
          });
        }
        logger.info('Reel created successfully');
        return api_response(review, 201, 'Reel created successfully');
      }
    } catch (error) {
      logger.error(error);
      return api_response(error, 400);
    }
  }
}
