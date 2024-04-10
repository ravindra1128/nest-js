import { Injectable } from '@nestjs/common';
import { api_response } from '../constants/utility/response';
import { logger } from '../config/logger';
import { FirebaseApp } from '../firebase/firebase-app';

@Injectable()
export class CommentsService {
  constructor(private readonly firebaseApp: FirebaseApp) {}

  async getComments() {
    try {
      logger.info('=====getComments request initiated====');
      const reviews = await this.firebaseApp
        .firestore()
        .collection('comments')
        .get();
      const reviewArray = [];
      reviews.forEach((doc) => {
        reviewArray.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      logger.info('Comments fetched successfully');
      return api_response(reviewArray, 200);
    } catch (error) {
      logger.error(error);
      return api_response(error, 400);
    }
  }

  async createComments(user: any, payload: any) {
    try {
      logger.info('=====createComment request initiated====');
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
          .collection('comments')
          .add({ ...reviewPayload });
        await this.firebaseApp
          .firestore()
          .collection('comments')
          .doc(review.id)
          .update({
            id: review.id,
          });
        logger.info('Comment created successfully');
        return api_response(review, 201, 'Comment created successfully');
      }
    } catch (error) {
      logger.error(error);
      return api_response(error, 400);
    }
  }

  async createLikes(itemId: string, payload: any) {
    try {
      logger.info('=====createLike request initiated====');
      const review = await this.firebaseApp
        .firestore()
        .collection('likes')
        .add({ ...payload, itemId: itemId });
      logger.info('Like added successfully');
      return api_response(review, 201, 'Like addded successfully');
    } catch (error) {
      logger.error(error);
      return api_response(error, 400);
    }
  }

  async saveItem(itemId: string, payload: any) {
    try {
      logger.info('=====saveItem request initiated====');
      const review = await this.firebaseApp
        .firestore()
        .collection('saveditems')
        .add({ ...payload, itemId: itemId });
      logger.info('Item saved successfully');
      return api_response(review, 201, 'Item saved successfully');
    } catch (error) {
      logger.error(error);
      return api_response(error, 400);
    }
  }
}
