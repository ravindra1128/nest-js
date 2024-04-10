import { CreateEventDTo, CreateEventTicketDTO, SaveItemDTO, SendInviteDTO, ShareItemDTO, UpdateEventDTO } from '../database/dto/event.dto';
import { FirebaseApp } from '../firebase/firebase-app';
import { UploadService } from '../constants/common/storage/google-cloud-storage.service';
import { SendEmailService } from 'constants/common/utils';
export declare class EventsService {
    private readonly firebaseApp;
    private readonly uploadService;
    private readonly sendEmailService;
    constructor(firebaseApp: FirebaseApp, uploadService: UploadService, sendEmailService: SendEmailService);
    getCategories(): Promise<{
        data: any;
        message: string;
        status: number;
    }>;
    getBadges(): Promise<{
        data: any;
        message: string;
        status: number;
    }>;
    createEvent(user: any, payload: CreateEventDTo): Promise<{
        data: any;
        message: string;
        status: number;
    }>;
    updateEvent(eventId: string, user: any, payload: UpdateEventDTO): Promise<{
        data: any;
        message: string;
        status: number;
    }>;
    createEventTicket(user: any, payload: CreateEventTicketDTO): Promise<{
        data: any;
        message: string;
        status: number;
    }>;
    getSingleEvent(eventId: string): Promise<{
        data: any;
        message: string;
        status: number;
    }>;
    saveItem(itemId: string, payload: SaveItemDTO): Promise<void>;
    shareItem(itemId: string, payload: ShareItemDTO): Promise<void>;
    sendEventInvite(eventId: string, payload: SendInviteDTO): Promise<void>;
    contactUs(email: any, message: any): Promise<void>;
}
