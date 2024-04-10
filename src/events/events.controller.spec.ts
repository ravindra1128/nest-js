import { Test, TestingModule } from '@nestjs/testing';
import { EventsController } from './events.controller';
import { mockFirebase } from 'firestore-jest-mock';
import { FirebaseApp } from 'firebase/firebase-app';
import { UploadService } from 'constants/common/storage/google-cloud-storage.service';
import { api_response } from 'constants/utility/response';

describe('EventsController', () => {
  let controller: EventsController;
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
        EventsController,
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

    controller = app.get(EventsController);
  });

  describe("Should be defined", () => {
    it('should be defined', () => {
      expect(controller).toBeDefined();
    });
  })
  describe('Create event controller', () => {
    it('should create an event with given data', async () => {
      mockFirebaseApp.getAuth.mockResolvedValue({ uid: '5EtelidAvtZtXoy2VHGXQ8c13dK2' });
      mockFirebaseApp.firestore().collection('roles').doc('qIUBfRO2r6Wt4tafxZVT').get.mockResolvedValue({
        data: jest.fn(() => ({ role: 'promoter' })),
      });
      mockFirebaseApp.firestore().collection('User').doc('123').set.mockResolvedValue({});
      mockFirebaseApp.firestore().collection('standardprofiles').doc('123').set.mockResolvedValue({});
      mockUploadService.uploadQrCode.mockResolvedValue('qrCode');
      const Eventresponse ={
        "data": {
          "_firestore": {
            "projectId": "whats-tha-move-dev"
          },
          "_path": {
            "segments": [
              "events",
              "Z0jt0InxP8w96ePLK9rz"
            ]
          },
          "_converter": {}
        },
        "message": "Event created successfully",
        "status": 201
      }
      const eventBody = {
        "name": "Event",
        "description": "test",
        "price": 0,
        "max_tickets": 0,
        "location": "Melbourne",
        "category": ["Wellness Retreats"],
        "badge": "rewards",
        "start_datetime": "2024-02-28T15:31:15.871Z",
        "end_datetime": "2024-02-28T15:31:15.871Z",
        "schdeuled_release_date": "2024-02-28T15:31:15.871Z"
      }
      mockFirebaseApp.firestore().collection.mockReturnValueOnce({
        doc: jest.fn().mockReturnValueOnce({ get: jest.fn().mockResolvedValueOnce({ exists: true, data: () => Eventresponse }) }),
      });

      const result = await controller.createEvent(eventBody);

      expect(result).toEqual(api_response(Eventresponse, 201, 'Event created successfully'));
    });
  })

});
