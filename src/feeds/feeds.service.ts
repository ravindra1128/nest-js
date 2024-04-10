import { Injectable } from '@nestjs/common';
import { api_response } from '../constants/utility/response';
import { logger } from '../config/logger';
import { FirebaseApp } from '../firebase/firebase-app';
import { UploadService } from '../constants/common/storage/google-cloud-storage.service';

@Injectable()
export class FeedsService {
  constructor(
    private readonly firebaseApp: FirebaseApp,
    private uploadService: UploadService,
  ) {}

  async getFeeds(page_, pageSize_) {
    try {
      const pageSize = +pageSize_;
      const page = +page_;
      const offset = (page - 1) * pageSize;
      logger.info('=====getFeeds request initiated====');
      const feeds = await this.firebaseApp
        .firestore()
        .collection('feeds')
        .orderBy('timestamp')
        .offset(offset)
        .limit(pageSize)
        .get();
      const feedData = [];
      feeds.forEach((doc) => {
        feedData.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      logger.info('Feeds fetched successfully');
      return api_response(feedData, 200);
    } catch (error) {
      logger.error(error);
      return api_response(error, 400);
    }
  }

  async createFeed(user: any, payload: any) {
    try {
      logger.info('=====createFeed request initiated====');
      const { uid } = user;
      const userRecord = await this.firebaseApp.getAuth().getUser(uid);
      if (userRecord) {
        const feedData = {
          ...payload,
          owner: uid,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        const feed = await this.firebaseApp
          .firestore()
          .collection('feeds')
          .add({ ...feedData });
        await this.firebaseApp
          .firestore()
          .collection('feeds')
          .doc(feed.id)
          .update({
            id: feed.id,
          });
        const newFeed = await this.firebaseApp
          .firestore()
          .collection('feeds')
          .doc(feed.id);
        if (payload.file) {
          const uploadFeedPost = await this.uploadService.uploadFile(
            payload.file,
            'posts',
          );
          if (uploadFeedPost) {
            logger.info('fetched user successfully');
            const getPosts = (await newFeed.get()).data();
            newFeed.update({
              id: feed.id,
              images: [...getPosts['images'], uploadFeedPost],
            });
          }
        }
        logger.info('Feed created successfully');
        return api_response(feed, 201, 'Feed created successfully');
      } else {
        logger.error('User not found');
        return api_response([], 401, 'User not found');
      }
    } catch (error) {
      logger.error(error);
      return api_response(error, 400);
    }
  }
}
