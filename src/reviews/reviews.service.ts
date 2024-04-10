import { Injectable } from '@nestjs/common';
import { api_response } from '../constants/utility/response';
import { logger } from '../config/logger';
import { CreateReviewDTo } from '../database/dto/review.dto';
import { FirebaseApp } from '../firebase/firebase-app';

@Injectable()
export class ReviewsService {
  constructor(private readonly firebaseApp: FirebaseApp) {}

  async getReviews(eventId: string) {
    try {
      logger.info('=====getReviewes request initiated====');
      const reviews = await this.firebaseApp
        .firestore()
        .collection('reviews')
        .get();
      const reviewArray = [];
      reviews.forEach((doc) => {
        reviewArray.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      logger.info('Reviews fetched successfully');
      return api_response(reviewArray, 200);
    } catch (error) {
      logger.error(error);
      return api_response(error, 400);
    }
  }

  async createReview(eventId: string, user: any, payload: CreateReviewDTo) {
    try {
      logger.info('=====createreview request initiated====');
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
          .collection('reviews')
          .add({ ...reviewPayload });
        await this.firebaseApp
          .firestore()
          .collection('reviews')
          .doc(review.id)
          .update({
            id: review.id,
          });
        logger.info('Review created successfully');
        return api_response(review, 201, 'Review created successfully');
      }
    } catch (error) {
      logger.error(error);
      return api_response(error, 400);
    }
  }
}
