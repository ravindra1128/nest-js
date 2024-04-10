import { Injectable } from '@nestjs/common';
import { FirebaseApp } from 'firebase/firebase-app';
import { Category } from '../../../database/entities/category.entity';
import { CategoriesData } from './categories';

@Injectable()
export class CategorySeeder {
  constructor(private readonly firebaseApp: FirebaseApp) {}

  async seedCategories(): Promise<void> {
    const categories: Category[] = CategoriesData;

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

  private async getCategoryByName(name: string): Promise<Category | undefined> {
    const query = await this.firebaseApp
      .firestore()
      .collection('categories')
      .where('type', '==', name)
      .limit(1)
      .get();

    if (!query.empty) {
      const doc = query.docs[0];
      return { id: doc.id, ...doc.data() } as Category;
    }
    return undefined;
  }
}
