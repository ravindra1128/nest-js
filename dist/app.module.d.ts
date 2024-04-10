import { MiddlewareConsumer, NestModule } from '@nestjs/common';
import { CategorySeeder } from './constants/seeders/Categories/category.seeder';
import { BadgeSeeder } from './constants/seeders/Badges/Badges';
export declare class AppModule implements NestModule {
    private readonly categorySeeder;
    private readonly badgeSeeder;
    constructor(categorySeeder: CategorySeeder, badgeSeeder: BadgeSeeder);
    onModuleInit(): Promise<void>;
    configure(consumer: MiddlewareConsumer): void;
}
