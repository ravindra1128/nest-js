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
exports.CategorySeeder = void 0;
const common_1 = require("@nestjs/common");
const firebase_app_1 = require("../../../firebase/firebase-app");
const categories_1 = require("./categories");
let CategorySeeder = class CategorySeeder {
    constructor(firebaseApp) {
        this.firebaseApp = firebaseApp;
    }
    async seedCategories() {
        const categories = categories_1.CategoriesData;
        for (const category of categories) {
            const existingCategory = await this.getCategoryByName(category.type);
            if (!existingCategory) {
                await this.firebaseApp
                    .firestore()
                    .collection('categories')
                    .add(category);
            }
        }
    }
    async getCategoryByName(name) {
        const query = await this.firebaseApp
            .firestore()
            .collection('categories')
            .where('type', '==', name)
            .limit(1)
            .get();
        if (!query.empty) {
            const doc = query.docs[0];
            return Object.assign({ id: doc.id }, doc.data());
        }
        return undefined;
    }
};
CategorySeeder = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [firebase_app_1.FirebaseApp])
], CategorySeeder);
exports.CategorySeeder = CategorySeeder;
//# sourceMappingURL=category.seeder.js.map