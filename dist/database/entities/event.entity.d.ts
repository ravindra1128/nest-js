export declare class Event {
    id?: string;
    type: string;
    categories: Array<string>;
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
