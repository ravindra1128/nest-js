import { Injectable } from '@nestjs/common';
import { api_response } from '../constants/utility/response';
import { logger } from '../config/logger';
import { FirebaseApp } from '../firebase/firebase-app';
import { UploadService } from '../constants/common/storage/google-cloud-storage.service';

@Injectable()
export class PostsService {
	constructor(
		private readonly firebaseApp: FirebaseApp,
		private uploadService: UploadService
	) { }

  async getPost(page_, pageSize_) {
    try {
      const pageSize = +pageSize_;
      const page = +page_;
      const offset = (page - 1) * pageSize;
      logger.info('=====getPost request initiated====');
      const posts = await this.firebaseApp
        .firestore()
        .collection('posts')
        .orderBy('timestamp')
        .offset(offset)
        .limit(pageSize)
        .get();
      const postsArray = [];
      posts.forEach((doc) => {
        postsArray.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      logger.info('Post fetched successfully');
      return api_response(postsArray, 200);
    } catch (error) {
      logger.error(error);
      return api_response(error, 400);
    }
  }

  async createPost(itemId: string, user: any, payload: any) {
    try {
      logger.info('=====createPost request initiated====');
      const { uid } = user;
      const userRecord = await this.firebaseApp.getAuth().getUser(uid);
      if (userRecord) {
        if (!userRecord) {
          logger.error('User not found');
          return api_response([], 401, 'User not found');
        }
        const postPayload = {
          ...payload,
          owner: uid,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        const post = await this.firebaseApp
          .firestore()
          .collection('posts')
          .add({ ...postPayload });

        const newPost = await this.firebaseApp
          .firestore()
          .collection('posts')
          .doc(post.id);
        const uploadPost = await this.uploadService.uploadFile(
          payload.file,
          'posts',
        );
        if (uploadPost) {
          logger.info('fetched user successfully');
          const getPosts = (await newPost.get()).data();
          newPost.update({
            id: post.id,
            images: [...getPosts['images'], uploadPost],
          });
        }
        logger.info('Post created successfully');
        return api_response(post, 201, 'Post created successfully');
      }
    } catch (error) {
      logger.error(error);
      return api_response(error, 400);
    }
  }
}
