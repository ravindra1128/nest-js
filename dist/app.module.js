"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const firebase_app_1 = require("./firebase/firebase-app");
const middleware_1 = require("./config/middleware");
const google_cloud_storage_service_1 = require("./constants/common/storage/google-cloud-storage.service");
const category_seeder_1 = require("./constants/seeders/Categories/category.seeder");
const Badges_1 = require("./constants/seeders/Badges/Badges");
const auth_module_1 = require("./auth/auth.module");
const profile_module_1 = require("./profile/profile.module");
const events_module_1 = require("./events/events.module");
const comments_module_1 = require("./comments/comments.module");
const reviews_module_1 = require("./reviews/reviews.module");
const reels_module_1 = require("./reels/reels.module");
const posts_module_1 = require("./posts/posts.module");
const feeds_module_1 = require("./feeds/feeds.module");
const utils_1 = require("./constants/common/utils");
let AppModule = class AppModule {
    constructor(categorySeeder, badgeSeeder) {
        this.categorySeeder = categorySeeder;
        this.badgeSeeder = badgeSeeder;
    }
    async onModuleInit() {
        await this.categorySeeder.seedCategories();
        await this.badgeSeeder.seedCategories();
    }
    configure(consumer) {
        consumer.apply(middleware_1.AuthMiddleware, middleware_1.EventMiddleware).forRoutes({
            path: '/auth/*',
            method: common_1.RequestMethod.ALL,
        });
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            auth_module_1.AuthModule,
            profile_module_1.ProfileModule,
            events_module_1.EventsModule,
            comments_module_1.CommentsModule,
            reviews_module_1.ReviewsModule,
            reels_module_1.ReelsModule,
            posts_module_1.PostsModule,
            feeds_module_1.FeedsModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            firebase_app_1.FirebaseApp,
            category_seeder_1.CategorySeeder,
            Badges_1.BadgeSeeder,
            app_service_1.AppService,
            google_cloud_storage_service_1.UploadService,
            utils_1.SendEmailService
        ],
        exports: [firebase_app_1.FirebaseApp, google_cloud_storage_service_1.UploadService, utils_1.SendEmailService],
    }),
    __metadata("design:paramtypes", [category_seeder_1.CategorySeeder,
        Badges_1.BadgeSeeder])
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map