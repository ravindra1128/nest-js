import { Injectable } from '@nestjs/common';
import { FirebaseApp } from '../firebase/firebase-app';
import { UploadService } from '../constants/common/storage/google-cloud-storage.service';
import { logger } from '../config/logger';
import { api_response } from '../constants/utility/response';
import { UpdateUserDto, UserProfileDto } from '../database/dto/user.dto';

@Injectable()
export class ProfileService {
  constructor(
    private readonly firebaseApp: FirebaseApp,
    private readonly uploadProfile: UploadService,
  ) {}

  async getUserProfile(user: any) {
    try {
      logger.info('=====getUserProfile request initiated====', user);
      const { role, uid } = user;
      const userRecord = await this.firebaseApp.getAuth().getUser(uid);
      if (userRecord) {
        const profileCollectionName =
          role === 'user' ? 'standardprofiles' : 'promoterprofiles';
        const userProfile = await this.firebaseApp
          .firestore()
          .collection(profileCollectionName)
          .doc(user.uid)
          .get();
        const getLookups = await this.firebaseApp
          .firestore()
          .collection('profilelookups')
          .get();
        const lookups = [];
        getLookups.forEach((doc) => {
          lookups.push({
            id: doc.id,
            ...doc.data(),
          });
        });

        if (!userProfile.exists) {
          logger.error('User not found');
          return api_response([], 400, 'User not found');
        }

        const data = userProfile.data();
        const selected_useage = lookups[0].useage.map((item) =>
          data.selected_useage && data.selected_useage.includes(item)
            ? { [item]: true }
            : { [item]: false },
        );
        const search_range = lookups[0].useage.map((item) =>
          data.search_range && data.search_range.includes(item)
            ? { [item]: true }
            : { [item]: false },
        );
        const userData: UserProfileDto = {
          userId: data.id,
          email: data.email,
          name: data.name,
          profile_images: data.profile_images,
          search_range: search_range,
          selected_useage: selected_useage,
          profile_qrcode: data.qrCode,
        };
        logger.info('fetched user profile updated');
        return api_response(userData, 200);
      }
    } catch (error) {
      logger.error(error);
      return api_response(error, 400);
    }
  }

  async updateUserProfile(user: any, payload: UpdateUserDto) {
    try {
      logger.info('=====updateUserProfile request initiated====');
      const { role, uid } = user;
      const userRecord = await this.firebaseApp.getAuth().getUser(uid);
      if (userRecord) {
        const profileCollectionName =
          role === 'user' ? 'standardprofiles' : 'promoterprofiles';
        const userProfile = await this.firebaseApp
          .firestore()
          .collection(profileCollectionName)
          .doc(uid)
          .get();

        if (!userProfile.exists) {
          logger.error('User not found');
          return api_response([], 401, 'User not found');
        }
        const updateUserRecord = await this.firebaseApp
          .firestore()
          .collection(profileCollectionName)
          .doc(uid);
        updateUserRecord.update({
          ...payload,
        });
        logger.info('Profile updated');
        return api_response([], 201, 'Profile updated');
      }
    } catch (error) {
      logger.error(error);
      return api_response(error, 400);
    }
  }

  async uploadFile(user: any, file: Express.Multer.File) {
    try {
      logger.info('=====uploadFile request initiated====');
      const profileCollectionName =
        user.role === 'user' ? 'standardprofiles' : 'promoterprofiles';
      const userProfile = await this.firebaseApp
        .firestore()
        .collection(profileCollectionName)
        .doc(user.uid);
      const uploadPofile = await this.uploadProfile.uploadFile(file);
      if (uploadPofile) {
        logger.info('fetched user successfully');
        const getUserProfileImages = (await userProfile.get()).data();
        userProfile.update({
          profile_images: [
            ...getUserProfileImages['profile_images'],
            uploadPofile,
          ],
        });
        logger.info('User profile uploaded successfully');
        return api_response([], 200, 'User profile uploaded successfully');
      }
    } catch (error) {
      logger.error(error);
      return api_response(error, 400);
    }
  }
}
