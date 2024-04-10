import { ProfileService } from './profile.service';
import { mockFirebase } from 'firestore-jest-mock';
import { UploadService } from '../constants/common/storage/google-cloud-storage.service';
import { FirebaseApp } from '../firebase/firebase-app';
import { Test, TestingModule } from '@nestjs/testing';
import { api_response } from '../constants/utility/response';

jest.mock('../constants/common/storage/google-cloud-storage.service');
jest.mock('../constants/utility/response')
jest.mock('firestore-jest-mock')

jest.mock('../firebase/firebase-app', () => ({
  FirebaseApp: jest.fn(() => ({
    getAuth: jest.fn(() => ({
      getUserByEmail: jest.fn(),
      verifyIdToken: jest.fn(),
    })),
    firestore: jest.fn(() => ({
      collection: jest.fn((collectionPath) => ({
        doc: jest.fn((documentPath) => ({
          get: jest.fn(),
          set: jest.fn(),
        })),
        get: jest.fn()
      })),
    })),
  })),
  api_response: jest.fn(),
}));

describe('ProfileService', () => {
  let service: ProfileService;
  let mockFirebaseApp = new mockFirebase();
  let mockUploadService: jest.Mocked<UploadService>;

  beforeEach(async () => {
    mockFirebaseApp = new FirebaseApp() as jest.Mocked<FirebaseApp>;
    mockUploadService = new UploadService() as jest.Mocked<UploadService>;
    mockUploadService.uploadFile.mockResolvedValue(
      'https://storage.googleapis.com/thisbucket/thisfile',
    );
    mockUploadService.uploadQrCode.mockResolvedValue(
      'https://storage.googleapis.com/thisbucket/thisqrcode',
    );
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        ProfileService,
        {
          provide: FirebaseApp,
          useValue: mockFirebaseApp,
        },
        {
          provide: UploadService,
          useValue: mockUploadService,
        },
      ],
    }).compile();

    service = app.get(ProfileService);
  });

  describe("Should be defined", () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });
  })

  describe("Should return user details", () => {
    it('should return user detail with valid token', async () => {
      mockFirebaseApp.getAuth.mockResolvedValue({ uid: '5EtelidAvtZtXoy2VHGXQ8c13dK2' });
      mockFirebaseApp.firestore().collection('roles').doc('qIUBfRO2r6Wt4tafxZVT').get.mockResolvedValue({
        data: jest.fn(() => ({ role: 'promoter' })),
      });
      mockFirebaseApp.firestore().collection('User').doc('123').set.mockResolvedValue({});
      mockFirebaseApp.firestore().collection('standardprofiles').doc('123').set.mockResolvedValue({});
      mockUploadService.uploadQrCode.mockResolvedValue('qrCode');

      const user = { role: 'promoter', uid: '5EtelidAvtZtXoy2VHGXQ8c13dK2' };
      const userProfile = {
        "userId": "jo8Nwzfz5WM8eLjVArL3cIwanPh1",
        "email": "johndoe+10@yopmail.com",
        "name": "John Doe",
        "search_range": [
          {
            "Entertainment an fun": false
          },
          {
            "Socializing and networking": false
          },
          {
            "Discovering new experiences": false
          },
          {
            "Hobbies and interest": false
          },
          {
            "Business and networking experiences": false
          },
          {
            "Learning and personal growth": false
          },
          {
            "Cultural and artistic experiences": false
          },
          {
            "Fitness and wellness": false
          }
        ],
        "selected_useage": [
          {
            "Entertainment an fun": false
          },
          {
            "Socializing and networking": false
          },
          {
            "Discovering new experiences": false
          },
          {
            "Hobbies and interest": false
          },
          {
            "Business and networking experiences": false
          },
          {
            "Learning and personal growth": false
          },
          {
            "Cultural and artistic experiences": false
          },
          {
            "Fitness and wellness": false
          }
        ],
        "profile_qrcode": "https://storage.googleapis.com/profile_qrcodes/jo8Nwzfz5WM8eLjVArL3cIwanPh1_qrcode.png"
      };
      mockFirebaseApp.firestore().collection.mockReturnValueOnce({
        doc: jest.fn().mockReturnValueOnce({ get: jest.fn().mockResolvedValueOnce({ exists: true, data: () => userProfile }) }),
      });

      const result = await service.getUserProfile(user);

      expect(result).toEqual(api_response(userProfile, 200, ''));
    });
    it('should return error if role or uid is wrong', async () => {
      mockFirebaseApp.getAuth.mockResolvedValue({ uid: '5EtelidAvtZtXoy2VHGXQ8c13dK2' });
      mockFirebaseApp.firestore().collection('roles').doc('qIUBfRO2r6Wt4tafxZVT').get.mockResolvedValue({
        data: jest.fn(() => ({ role: 'promoter' })),
      });
      mockFirebaseApp.firestore().collection('User').doc('123').set.mockResolvedValue({});
      mockFirebaseApp.firestore().collection('standardprofiles').doc('123').set.mockResolvedValue({});
      mockUploadService.uploadQrCode.mockResolvedValue('qrCode');

      const user = { role: '', uid: 'askhjashk' };

      const result = await service.getUserProfile(user);
      expect(result).toEqual(api_response('User not found', 400, 'User not found'));
    });
  })
});
