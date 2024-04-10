import { AuthService } from './auth.service';
import { mockFirebase } from 'firestore-jest-mock';
import { UploadService } from '../constants/common/storage/google-cloud-storage.service';
import { FirebaseApp } from '../firebase/firebase-app';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from 'database/dto/user.dto';
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

describe('AuthService', () => {
  let service: AuthService;
  let mockFirebaseApp = new mockFirebase();
  let mockUploadService: jest.Mocked<UploadService>;
  let RESET_LINK: 'https://whats-tha-move-dev.firebaseapp.com/__/auth/action?mode=resetPassword&oobCode=gmDPuwYcFwYtba7trJe27t8Gl-TFR9icccUOQ-G-9J0AAAGN0P2F4A&apiKey=AIzaSyCjYIXIyRtE6CbOdc5NCLs_psmkdYEqE7c&lang=en'

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
        AuthService,
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

    service = app.get(AuthService);
  });

  it('should create a user successfully', async () => {
    mockFirebaseApp.getAuth.mockResolvedValue({ uid: '123' });
    mockFirebaseApp.firestore().collection('roles').doc('qIUBfRO2r6Wt4tafxZVT').get.mockResolvedValue({
      data: jest.fn(() => ({ role: 'promoter' })),
    });
    mockFirebaseApp.firestore().collection('User').doc('123').set.mockResolvedValue({});
    mockFirebaseApp.firestore().collection('standardprofiles').doc('123').set.mockResolvedValue({});
    mockUploadService.uploadQrCode.mockResolvedValue('qrCode');

    const testUser: CreateUserDto = {
      email: 'johndoe@gmail.com',
      password: 'test@123',
      role: 'qIUBfRO2r6Wt4tafxZVT',
      name: 'Test User',
      createdAt: '2024-02-22 18:16:49',
      updatedAt: '2024-02-22 18:16:49'
    };

    const result = await service.create(testUser);

    expect(result).toEqual(api_response([], 201, 'User registered successfully'));
  });

  it('should handle invalid name', async () => {
    const testUser: CreateUserDto = {
      email: 'johndoe@gmail.com',
      password: 'test@123',
      role: 'qIUBfRO2r6Wt4tafxZVT',
      name: '   ', // Invalid name
      createdAt: '2024-02-22 18:16:49',
      updatedAt: '2024-02-22 18:16:49'
    };

    const result = await service.create(testUser);

    expect(result).toEqual(api_response([], 400, 'Please enter a valid name'));
  });

  describe('verifyToken()', () => {
    // Try with new token
    it.skip('should verify the token successfully', async () => {
      const data = {
        data: {
          "userRole": "promoter",
          "iss": "https://securetoken.google.com/whats-tha-move-dev",
          "aud": "whats-tha-move-dev",
          "auth_time": 1708607757,
          "user_id": "R7hzqMD816Tw0RplUJHM4l4GiW23",
          "sub": "R7hzqMD816Tw0RplUJHM4l4GiW23",
          "iat": 1708607757,
          "exp": 1708611357,
          "email": "gaurav+1@yopmail.com",
          "email_verified": false,
          "firebase": {
            "identities": {
              "email": [
                "gaurav+1@yopmail.com"
              ]
            },
            "sign_in_provider": "password"
          },
          "uid": "R7hzqMD816Tw0RplUJHM4l4GiW23"
        }
      }
      
      mockFirebaseApp.getAuth().verifyIdToken.mockResolvedValue({ data });
      const token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImExODE4ZjQ0ODk0MjI1ZjQ2MWQyMmI1NjA4NDcyMDM3MTc2MGY1OWIiLCJ0eXAiOiJKV1QifQ.eyJ1c2VyUm9sZSI6InByb21vdGVyIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL3doYXRzLXRoYS1tb3ZlLWRldiIsImF1ZCI6IndoYXRzLXRoYS1tb3ZlLWRldiIsImF1dGhfdGltZSI6MTcwODYwNzc1NywidXNlcl9pZCI6IlI3aHpxTUQ4MTZUdzBScGxVSkhNNGw0R2lXMjMiLCJzdWIiOiJSN2h6cU1EODE2VHcwUnBsVUpITTRsNEdpVzIzIiwiaWF0IjoxNzA4NjA3NzU3LCJleHAiOjE3MDg2MTEzNTcsImVtYWlsIjoiZ2F1cmF2KzFAeW9wbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsiZ2F1cmF2KzFAeW9wbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.fw9IBFl38kAJ5dxXllqbRoknu6JwbCcxSEPT929D_3XvjrauPjs9AMj-5M8EYuv7prqqNMOk9hhOmh9fNshf1Y9yBftzksOqzaR9CGtMqnaIO8tdejyQMaWwY2WBOFCrS1rITy2zTuyMKtMqcXTlRTDqhoCvTddJcDyQyDoxvK9VYsx2WeD5qURIocoQBeCA-SPPnL__EM18ER0V98MIzAY719v9EFv7YwHtNCONgaCHpfqK3U47gv7Ej_KyvHzijaTOml38tgc0mF4ZYOcwMzC6KYcj9Y_Uc6LQjNXE1_PfQ5sh9Ak_bEL5hn3doBFsWo2sMWeS8VuQ4MS9IhnmaQ';
      const result = await service.verifyToken(token);

      expect(result).toEqual(api_response({}, 201, 'Token verified successfully'));
    });

    it('should handle verification failure', async () => {
      const invalidToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImExODE4ZjQ0ODk0MjI1ZjQ2MWQyMmI1NjA4NDcyMDM3MTc2MGY1OWIiLCJ0eXAiOiJKV1QifQ.eyJ1c2VyUm9sZSI6InByb21vdGVyIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL3doYXRzLXRoYS1tb3ZlLWRldiIsImF1ZCI6IndoYXRzLXRoYS1tb3ZlLWRldiIsImF1dGhfdGltZSI6MTcwODU4NjU2OCwidXNlcl9pZCI6IlI3aHpxTUQ4MTZUdzBScGxVSkhNNGw0R2lXMjMiLCJzdWIiOiJSN2h6cU1EODE2VHcwUnBsVUpITTRsNEdpVzIzIiwiaWF0IjoxNzA4NTg2NTY4LCJleHAiOjE3MDg1OTAxNjgsImVtYWlsIjoiZ2F1cmF2KzFAeW9wbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsiZ2F1cmF2KzFAeW9wbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.nHRxtaA_YfeKxN0KCD8DALEHtMlpvdIqtPZC9TKGo5ltl6X0hOHGWaH20RT1Ngx3mZquHSiwFh0dGnXdzQC9vi7JIjBO2OV4MudKrOrOnxCynDg-fzZDUApSjkiCYcJaE_I32xqnQcn9rXsU_HCZdFaFWiLv1HCWmKJvMONoHZMtw-ylVB40vh_DoCx9t67H9Q4bv4N3vFmtaYeavr9g2BrJZH3x00IzF59yNZ_I7JcQiYY39iJi3GXVekImkVlHc8CaPCFomOghCRwqj6o_gCEUQ6m_E9n_QxPieGcIo0OFjwFZG6lPgkSX_CA9YutrhPYeDKSxaPLZyF3kyBs-Wg';
      const result = await service.verifyToken(invalidToken);

      expect(result).toEqual(api_response(new Error('Verification failed'), 401));
    });
  });

  describe('sendPasswordResetEmail()', () => {
    it('should send a password reset email successfully', async () => {
      const email = 'testingdev2s@yopmail.com"';
      const result = await service.sendPasswordResetEmail(email);
  
      expect(result).toEqual(api_response(RESET_LINK, 200, 'Reset Email sent successfully'));
    });
  
    it('should handle user not found', async () => {
      mockFirebaseApp.getAuth().getUserByEmail.mockResolvedValue(null);
  
      const invalidEmail = 'abc@gmail.com';
      const result = await service.sendPasswordResetEmail(invalidEmail);
  
      expect(result).toEqual(api_response([], 404, 'User with email not found'));
    });
  
    it('should handle error during password reset', async () => {
      const email = 'testingdev2s@yopmail.com"';
      const result = await service.sendPasswordResetEmail(email);
  
      expect(result).toEqual(api_response(new Error('Reset failed'), 404));
    });
  })

  describe('getRoles()', () => {
    it('should get roles successfully', async () => {
      const mockRoles = [
        { id: 'role1', data: () => ({ role: 'promoter' }) },
        { id: 'role2', data: () => ({ role: 'user' }) },
      ];
  
      mockFirebaseApp.firestore().collection('roles').get.mockResolvedValue({
        forEach: jest.fn((callback) => {
          mockRoles.forEach((role) => callback(role));
        }),
      });
  
      const result = await service.getRoles();
  
      const expectedResponse = api_response([
        { id: 'role1', name: 'promoter' },
        { id: 'role2', name: 'user' },
      ], 200);
  
      expect(result).toEqual(expectedResponse);
    });
  
    it('should handle error during role retrieval', async () => {
      mockFirebaseApp.firestore().collection('roles').get.mockRejectedValue(new Error('Role retrieval failed'));
      const result = await service.getRoles();
  
      expect(result).toEqual(api_response(new Error('Role retrieval failed'), 404));
    });
  })
});
