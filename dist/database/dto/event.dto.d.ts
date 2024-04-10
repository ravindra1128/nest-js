export declare class CreateEventDTo {
    name: string;
    description: string;
    price: number;
    max_tickets: number;
    ticket_ids: Array<string>;
    location: string;
    category: string;
    badge: string;
    start_datetime: Date;
    end_datetime: Date;
    schdeuled_release_date: Date;
    promotional_images: Array<string>;
    featured: null;
    schedule_release_date: null;
    attendants: Array<string>;
    share_count: number;
    like_count: number;
    save_count: number;
    createdAt: Date;
    updatedAt: Date;
}
export declare class UpdateEventDTO {
    name: string;
    description: string;
    category: string;
    badge: string;
    price: Number;
    max_tickets: number;
    ticket_ids: Array<string>;
    location: string;
    start_datetime: Date;
    end_datetime: Date;
    schdeuled_release_date: Date;
    promotional_images: Array<string>;
    featured: null;
    schedule_release_date: null;
    attendants: Array<string>;
    share_count: number;
    like_count: number;
    save_count: number;
}
export declare class CreateEventTicketDTO {
    price: number;
    quantity: number;
    event_id: string;
    event_name: string;
}
export declare class SaveItemDTO {
    itemId: string;
    item_type: string;
    who_saved: string;
    timestamp: string;
}
export declare class ShareItemDTO {
    itemId: string;
    item_type: string;
    shared_to: string;
    user_id: string;
    timestamp: string;
}
export declare class SendInviteDTO {
    email: string;
    message: string;
    eventId: string;
}
