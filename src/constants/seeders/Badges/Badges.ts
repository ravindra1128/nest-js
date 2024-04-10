import { Injectable } from '@nestjs/common';
import { FirebaseApp } from 'firebase/firebase-app';

const Badges = [
  { name: 'gamification' },
  { name: 'rewards' },
  { name: 'Augmented Reality' },
];

export class Badge {
  id?: string;
  name: string;
}

@Injectable()
export class BadgeSeeder {
  constructor(private readonly firebaseApp: FirebaseApp) {}

  async seedCategories(): Promise<void> {
    const badges: Badge[] = Badges;

    for (const badge of badges) {
      const existingCategory = await this.getBadgeByName(badge.name);

      if (!existingCategory) {
        await this.firebaseApp.firestore().collection('badge').add(badge);
      }
    }
  }

  private async getBadgeByName(name: string): Promise<Badge | undefined> {
    const query = await this.firebaseApp
      .firestore()
      .collection('badge')
      .where('name', '==', name)
      .limit(1)
      .get();

    if (!query.empty) {
      const doc = query.docs[0];
      return { id: doc.id, ...doc.data() } as Badge;
    }
    return undefined;
  }
}
