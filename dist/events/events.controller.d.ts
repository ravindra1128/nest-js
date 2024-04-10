import { EventsService } from './events.service';
export declare class EventsController {
    private readonly eventService;
    constructor(eventService: EventsService);
    getCategories(req: any): Promise<{
        data: any;
        message: string;
        status: number;
    }>;
    getBadges(req: any): Promise<{
        data: any;
        message: string;
        status: number;
    }>;
    createEvent(req: any): Promise<{
        data: any;
        message: string;
        status: number;
    }>;
    updateEventController(eventId: string, req: any): Promise<{
        data: any;
        message: string;
        status: number;
    }>;
    getSingleEvent(eventId: string, req: any): Promise<{
        data: any;
        message: string;
        status: number;
    }>;
    createEventTicketController(req: any): Promise<{
        data: any;
        message: string;
        status: number;
    }>;
    saveEvent(itemId: string, req: any): Promise<void>;
    shareEvent(itemId: string, req: any): Promise<void>;
    sendEventInvite(eventId: string, req: any): Promise<void>;
    contact(itemId: string, req: any): Promise<void>;
}
