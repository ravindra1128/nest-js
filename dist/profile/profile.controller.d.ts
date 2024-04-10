import { ProfileService } from './profile.service';
export declare class ProfileController {
    private readonly profileService;
    constructor(profileService: ProfileService);
    getUserProfile(req: any): Promise<{
        data: any;
        message: string;
        status: number;
    }>;
    updateUser(req: any): Promise<{
        data: any;
        message: string;
        status: number;
    }>;
    updateProfilePic(req: any): Promise<{
        data: any;
        message: string;
        status: number;
    }>;
}
