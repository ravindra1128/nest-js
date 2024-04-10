import { Injectable } from '@nestjs/common';
import { api_response } from '../constants/utility/response';
import { logger } from '../config/logger';
import { CreateEventDTo, CreateEventTicketDTO, SaveItemDTO, SendInviteDTO, ShareItemDTO, UpdateEventDTO } from '../database/dto/event.dto';
import { FirebaseApp } from '../firebase/firebase-app';
import { UploadService } from '../constants/common/storage/google-cloud-storage.service';
import { Event } from '../database/entities/event.entity';
import { SendEmailService } from 'constants/common/utils';

@Injectable()
export class EventsService {
  constructor(
    private readonly firebaseApp: FirebaseApp,
    private readonly uploadService: UploadService,
    private readonly sendEmailService: SendEmailService,
  ) { }

  async getCategories() {
    try {
      logger.info('=====getCategories request initiated====');
      const categories = await this.firebaseApp
        .firestore()
        .collection('categories')
        .get();
      const categoriesArray = [];
      categories.forEach((doc) => {
        categoriesArray.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      logger.info('Categories fetched successfully');
      return api_response(categoriesArray, 200);
    } catch (error) {
      logger.error(error);
      return api_response(error, 400);
    }
  }

  async getBadges() {
    try {
      logger.info('=====getBadges request initiated====');
      const badges = await this.firebaseApp
        .firestore()
        .collection('badge')
        .get();
      const badgesArray = [];
      badges.forEach((doc) => {
        badgesArray.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      logger.info('Badges fetched successfully');
      return api_response(badgesArray, 200);
    } catch (error) {
      logger.error(error);
      return api_response(error, 400);
    }
  }

  async createEvent(user: any, payload: CreateEventDTo) {
    try {
      logger.info('=====createEvent request initiated====');
      const { uid } = user;
      const userRecord = await this.firebaseApp.getAuth().getUser(uid);
      if (userRecord) {
        if (!userRecord) {
          logger.error('User not found');
          return api_response([], 401, 'User not found');
        }
        const eventPayload = {
          ...payload,
          owner: uid,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        const event = await this.firebaseApp
          .firestore()
          .collection('events')
          .add({ ...eventPayload });
        await this.firebaseApp
          .firestore()
          .collection('events')
          .doc(event.id)
          .update({
            id: event.id,
          });
        logger.info('Event created successfully');
        return api_response(event, 201, 'Event created successfully');
      }
    } catch (error) {
      logger.error(error);
      return api_response(error, 400);
    }
  }

  async updateEvent(eventId: string, user: any, payload: UpdateEventDTO) {
    try {
      logger.info('=====udpateEvent request initiated====');
      const { uid } = user;
      const userRecord = await this.firebaseApp.getAuth().getUser(uid);
      if (userRecord) {
        if (!userRecord) {
          logger.error('User not found');
          return api_response([], 401, 'User not found');
        }
        const event = await this.firebaseApp
          .firestore()
          .collection('events')
          .doc(eventId);

        event.update({ ...payload });
        logger.info('Event updated successfully');
        return api_response(event, 201, 'Event updated successfully');
      }
    } catch (error) {
      logger.error(error);
      return api_response(error, 400);
    }
  }

  async createEventTicket(user: any, payload: CreateEventTicketDTO) {
    try {
      logger.info('=====createEventTicket request initated====');
      const { uid } = user;
      const userRecord = await this.firebaseApp.getAuth().getUser(uid);
      if (userRecord) {
        if (!userRecord) {
          logger.error('User not found');
          return api_response([], 401, 'User not found');
        }
        const event = await this.firebaseApp
          .firestore()
          .collection('events')
          .doc(uid);
        const newEventTicket = await this.firebaseApp
          .firestore()
          .collection('eventtickets')
          .add({ ...payload, event_id: event.id });
        const getQrCode = await this.uploadService.uploadQrCode(
          newEventTicket.id,
          process.env.EVENT_QRCODE_BUCKET_NAME,
          false,
        );
        if (getQrCode) {
          const eventWithQrcode = await this.firebaseApp
            .firestore()
            .collection('eventtickets')
            .doc(newEventTicket.id)
            .update({
              qrCode: getQrCode,
            });
          const snapshot = await newEventTicket.get();
          const allData = snapshot.data();
          logger.info('Event ticket created successfully');
          return api_response(
            allData,
            201,
            'Event ticket created successfully',
          );
        }
      }
    } catch (error) {
      logger.error(error);
      return api_response(error, 400);
    }
  }

  async getSingleEvent(eventId: string) {
    try {
      logger.info('=====getSingleEvent request initiated====');
      let eventResponse = {};
      const event = await this.firebaseApp
        .firestore()
        .collection('events')
        .doc(eventId)
        .get();

      if (event.exists) {
        const eventData = event.data() as Event;
        eventResponse = {
          id: eventData.id,
          type: eventData.type,
          categories: eventData.categories,
          name: eventData.name,
          description: eventData.description,
          price: eventData.price,
          max_tickets: eventData.max_tickets,
          ticket_ids: eventData.ticket_ids,
          location: eventData.location,
          category: eventData.category,
          badge: eventData.badge,
          start_datetime: eventData.start_datetime,
          end_datetime: eventData.end_datetime,
          schdeuled_release_date: eventData.schdeuled_release_date,
          promotional_images: eventData.promotional_images,
          featured: eventData.featured,
          schedule_release_date: eventData.schedule_release_date,
          attendants: eventData.attendants,
          share_count: eventData.share_count,
          like_count: eventData.like_count,
          save_count: eventData.save_count,
          createdAt: new Date(eventData.createdAt),
          updatedAt: new Date(eventData.updatedAt),
        };
      }
      logger.info('Event fetched successfully');
      return api_response(eventResponse, 200);
    } catch (error) {
      logger.error(error);
      return api_response(error, 400);
    }
  }

  async saveItem(itemId: string, payload: SaveItemDTO) {
    try {
      const itemType = payload.item_type;
      const item = await this.firebaseApp
        .firestore()
        .collection(itemType)
        .doc(itemId);
      logger.info('Item fetched successfully');
      const itemValues = await item.get();

      if (itemValues && itemValues.data() !== undefined) {
        const saveItem = await this.firebaseApp
          .firestore()
          .collection('saves')
          .add({ ...payload });
        item.update({ ...item, save_count: +1 });
        if (saveItem) {
          logger.info('Item Saved Successfully');
          api_response(saveItem, 201, 'Item Saved Successfully');
        }
      } else {
        logger.info(`No item found with ${itemId}`);
        api_response([], 200, `No item found with ${itemId}`);
      }
    } catch (error) {
      logger.error(error);
      api_response(error, 400);
    }
  }

  async shareItem(itemId: string, payload: ShareItemDTO) {
    try {
      const itemType = payload.item_type;
      const item = await this.firebaseApp
        .firestore()
        .collection(itemType)
        .doc(itemId);
      logger.info('Item fetched successfully');
      const itemValues = item.get();

      if (itemValues) {
        const shareItem = await this.firebaseApp
          .firestore()
          .collection('shares')
          .add({ ...payload });
        item.update({ ...item, save_count: +1 });
        if (shareItem) {
          logger.info('Item shared Successfully');
          api_response(shareItem, 201, 'Item shared Successfully');
        }
      }
    } catch (error) {
      logger.error(error);
      api_response(error, 400);
    }
  }

  async sendEventInvite(eventId: string, payload: SendInviteDTO) {
    console.log(payload, "*********payload**************")
    try {
      const event = await this.firebaseApp
        .firestore()
        .collection("events")
        .doc(eventId);
      logger.info('Event fetched successfully');
      console.log(event, "**********event**********")
      const eventValues = event.get();
      console.log(eventValues, "1111111111111111111")

      if (eventValues) {
        const result = this.sendEmailService.sendEmail(eventId, payload.email, payload.message)
        console.log(result, "******result********")
        logger.info('Invite sent Successfully');
        api_response([], 201, 'Invite sent Successfully');
      }
    } catch (error) {
      logger.error(error);
      api_response(error, 400);
    }
  }
  async contactUs(email, message) {
    try {
      this.sendEmailService.sendEmail(email, message)
      logger.info('Email sent Successfully');
      api_response([], 201, 'Email sent Successfully');
    } catch (error) {
      logger.error(error);
      api_response(error, 400);
    }
  }
}
