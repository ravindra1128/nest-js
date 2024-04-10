import { Injectable } from '@nestjs/common';
import { FirebaseApp } from '../firebase/firebase-app';
import { UploadService } from '../constants/common/storage/google-cloud-storage.service';
import { CreateUserDto } from '../database/dto/user.dto';
import { logger } from '../config/logger';
import { api_response } from '../constants/utility/response';
import axios from 'axios';

@Injectable()
export class AuthService {
  constructor(
    private readonly firebaseApp: FirebaseApp,
    private uploadService: UploadService,
  ) {}
  async create(user: CreateUserDto) {
    const { email, password, role, name } = user;
    if (name.replace(/\s/g, '').length < 2) {
      logger.error('Please enter a valid name');
      return api_response([], 400, 'Please enter a valid name');
    }
    try {
      logger.info('====create Request initiated====');
      const res = await this.firebaseApp
        .getAuth()
        .createUser({ email, password });
      const userRole = (
        await this.firebaseApp.firestore().collection('roles').doc(role).get()
      ).data().role;
      await this.firebaseApp
        .getAuth()
        .setCustomUserClaims(res.uid, { userRole });
      try {
        delete user.password;
        delete user.role;
        const newRecord = await this.firebaseApp
          .firestore()
          .collection('User')
          .doc(res.uid)
          .set({ id: res.uid, role: userRole, ...user });
        if (newRecord) {
          logger.info('User fetched from User collection');
          const profileCollectionName =
            userRole === 'user' ? 'standardprofiles' : 'promoterprofiles';
          const createUserProfile = await this.firebaseApp
            .firestore()
            .collection(profileCollectionName)
            .doc(res.uid)
            .set({ id: res.uid, ...user });
          if (userRole !== 'user') {
            const getQrCode = await this.uploadService.uploadQrCode(
              res.uid,
              process.env.PROFILE_QR_CODE_BUCKET,
              false,
            );
            if (getQrCode) {
              await this.firebaseApp
                .firestore()
                .collection('promoterprofiles')
                .doc(res.uid)
                .update({
                  qrCode: getQrCode,
                });
            }
          }

          if (createUserProfile) {
            logger.info('User registered successfully');
            return api_response([], 201, 'User registerd successfully');
          }
        }
      } catch (error) {
        logger.error(error.message);
        return api_response([], 400, error.message);
      }
    } catch (error) {
      logger.error(error.message);
      return api_response([], 400, error.message);
    }
  }

  async verifyToken(token: string) {
    try {
      logger.info('====verifyToken Request initiated====');
      const res = await this.firebaseApp.getAuth().verifyIdToken(token);
      if (res) {
        logger.info('Token Verified');
        return api_response(res, 201, 'Token verified successfully');
      }
    } catch (err) {
      logger.error(err);
      return api_response(err, 401);
    }
  }

  async loginUser(email: string, password: string) {
    try {
      logger.info('====loginUser Request initiated====');
      const res = await axios(
        `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${process.env.API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          data: {
            email: email,
            password: password,
            returnSecureToken: true,
          },
        },
      );

      if (res) {
        logger.info('User logged in successfully');
        return api_response(res.data, res.data.status);
      }
    } catch (err) {
      logger.error(err);
      return api_response(err, 401);
    }
  }

  async sendPasswordResetEmail(email: string) {
    try {
      logger.info('====sendPasswordResetEmail Request initiated====');
      const user = await this.firebaseApp.getAuth().getUserByEmail(email);
      if (user) {
        const sendRsendEmail = await this.firebaseApp
          .getAuth()
          .generatePasswordResetLink(email);
        if (sendRsendEmail) {
          logger.info('Reset Email sent successfully');
          return api_response(
            sendRsendEmail,
            200,
            'Reset Email sent successfully',
          );
        }
      } else {
        logger.error('User with email not found');
        return api_response([], 404, 'User with email not found');
      }
    } catch (error) {
      logger.error(error);
      return api_response(error, 404);
    }
  }

  async resetPassword(email: string, newPassword: string): Promise<any> {
    try {
      logger.info('====resetPassword Request initiated====');
      const getUser = await this.firebaseApp.getAuth().getUserByEmail(email);
      if (getUser) {
        const resetPassword = await this.firebaseApp
          .getAuth()
          .updateUser(getUser.uid, {
            password: newPassword,
          });
        if (resetPassword) {
          logger.info('Password Reset successfully');
          return api_response([], 200, 'Password Reset successfully');
        }
      } else {
        logger.error('User not found');
        return api_response([], 404, 'User not found');
      }
    } catch (error) {
      logger.error(error);
      return api_response(error, 404);
    }
  }

  async getRoles(): Promise<any> {
    try {
      logger.info('====getRoles Request initiated====');
      const getAllRoles = await this.firebaseApp
        .firestore()
        .collection('roles');
      const roles = [];
      await getAllRoles.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          roles.push({ id: doc.id, name: data.role });
        });
      });

      logger.info('Fetched roles successfully');
      return api_response(roles, 200);
    } catch (error) {
      logger.error(error);
      return api_response(error, 404);
    }
  }
}
