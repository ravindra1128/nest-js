import { EventsService } from './events.service';
import { mockFirebase } from 'firestore-jest-mock';
import { UploadService } from '../constants/common/storage/google-cloud-storage.service';
import { FirebaseApp } from '../firebase/firebase-app';
import { Test, TestingModule } from '@nestjs/testing';
import { api_response } from '../constants/utility/response';
import { CreateEventDTo, CreateEventTicketDTO, SaveItemDTO, UpdateEventDTO } from 'database/dto/event.dto';

jest.mock('../constants/common/storage/google-cloud-storage.service');
jest.mock('../constants/utility/response')
jest.mock('firestore-jest-mock')

jest.mock('../firebase/firebase-app', () => ({
  FirebaseApp: jest.fn(() => ({
    getAuth: jest.fn(() => ({
      getUserByEmail: jest.fn(),
      verifyIdToken: jest.fn(),
    })),
    firestore: jest.fn(() => ({
      collection: jest.fn((collectionPath) => ({
        doc: jest.fn((documentPath) => ({
          get: jest.fn(),
          set: jest.fn(),
        })),
        get: jest.fn()
      })),
    })),
  })),
  api_response: jest.fn(),
}));

describe('ProfileService', () => {
  let service: EventsService;
  let mockFirebaseApp = new mockFirebase();
  let mockUploadService: jest.Mocked<UploadService>;

  beforeEach(async () => {
    mockFirebaseApp = new FirebaseApp() as jest.Mocked<FirebaseApp>;
    mockUploadService = new UploadService() as jest.Mocked<UploadService>;
    mockUploadService.uploadFile.mockResolvedValue(
      'https://storage.googleapis.com/thisbucket/thisfile',
    );
    mockUploadService.uploadQrCode.mockResolvedValue(
      'https://storage.googleapis.com/thisbucket/thisqrcode',
    );
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        EventsService,
        {
          provide: FirebaseApp,
          useValue: mockFirebaseApp,
        },
        {
          provide: UploadService,
          useValue: mockUploadService,
        },
      ],
    }).compile();

    service = app.get(EventsService);
  });

  describe("Should be defined", () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });
  })

  describe("Categories", () => {

    it('getCategories', async () => {
      const categories = {
        "data": [
          {
            "id": "02fqg0BIavxQ8xwEWAbO",
            "categories": [
              "Wellness Retreats",
              "Health Workshops",
              "Mindfulness Events",
              "Medical Seminars"
            ],
            "type": "Health & Wellness"
          },
          {
            "id": "02vIRceRoAj4K2xkRwTO",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "03GxHflUoCdPhYazvrOn",
            "categories": [
              "Home Improvement Workshops",
              "Gardening Classes",
              "Home Shows",
              "DIY Events"
            ],
            "type": "Home & Garden"
          },
          {
            "id": "049ABbA7mZOydp9VBSMK",
            "categories": [
              "Local Community Events",
              "Environmental Causes",
              "Social Activism",
              "Fundraising for Causes"
            ],
            "type": "Community & Causes"
          },
          {
            "id": "05rEafUKHXLwzDSRzY9H",
            "categories": [
              "Religious Gatherings",
              "Spiritual Retreats",
              "Meditation Groups",
              "Interfaith Dialogues"
            ],
            "type": "Religion & Spirituality"
          },
          {
            "id": "07CojXldbu8EEINswXwn",
            "categories": [
              "Charity Galas",
              "Fundraising Events",
              "Volunteer Opportunities",
              "Community Outreach"
            ],
            "type": "Charity & Fundraising"
          },
          {
            "id": "07mChhEA1xzLSHizPyuJ",
            "categories": [
              "Educational Workshops",
              "Lectures & Talks",
              "Online Courses",
              "Tutoring Services"
            ],
            "type": "Education & Learning"
          },
          {
            "id": "09iY66dV0bXT5h5vrJVU",
            "categories": [
              "Science Exhibitions",
              "STEM Workshops",
              "Space & Astronomy",
              "Technology Talks"
            ],
            "type": "Science & Technology"
          },
          {
            "id": "0ANhOEECvKaIC7kc1d0B",
            "categories": [
              "Wellness Retreats",
              "Health Workshops",
              "Mindfulness Events",
              "Medical Seminars"
            ],
            "type": "Health & Wellness"
          },
          {
            "id": "0Af0iousMgqWUmA422Fe",
            "categories": [
              "Science Exhibitions",
              "STEM Workshops",
              "Space & Astronomy",
              "Technology Talks"
            ],
            "type": "Science & Technology"
          },
          {
            "id": "0BNz1iJFauC7OTMqxxS4",
            "categories": [
              "Family - Friendly Events",
              "Children's Workshops",
              "Kid - Friendly Activities",
              "Amusement Parks"
            ],
            "type": "Family & Kids"
          },
          {
            "id": "0BVmslOr6BIGiQCzpwsE",
            "categories": [
              "Theater Productions",
              "Magic Shows",
              "Stand - Up Comedy",
              "Movie Screenings"
            ],
            "type": "Entertainment & Shows"
          },
          {
            "id": "0Cwx8AI1a75VEIXxBqYw",
            "categories": [
              "Indian Cuisine",
              "Italian Cuisine",
              "American Fare",
              "Asian Fusion",
              "Mediterranean",
              "Mexican & Tex - Mex",
              "Sushi & Japanese",
              "Chinese Cuisine",
              "French Dining",
              "Vegetarian & Vegan",
              "Seafood Specialties",
              "BBQ & Grill",
              "Steakhouse",
              "Fast Food & Burgers",
              "Cafes & Bakeries",
              "Food Trucks",
              "Fine Dining",
              "Farm - to - Table",
              "Ethnic Eateries"
            ],
            "type": "Food styles"
          },
          {
            "id": "0E3CgK8ZhaXrWebtK028",
            "categories": [
              "Family - Friendly Events",
              "Children's Workshops",
              "Kid - Friendly Activities",
              "Amusement Parks"
            ],
            "type": "Family & Kids"
          },
          {
            "id": "0FG0x50P08i4hlElGFai",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "0GABrQh79JMCVPmWsBvt",
            "categories": [
              "Pet Adoption Events",
              "Animal Welfare Fundraisers",
              "Pet - Friendly Activities",
              "Zoo Visits"
            ],
            "type": "Pets & Animals"
          },
          {
            "id": "0GEj0BdctU3sHSM22iJC",
            "categories": [
              "Family - Friendly Events",
              "Children's Workshops",
              "Kid - Friendly Activities",
              "Amusement Parks"
            ],
            "type": "Family & Kids"
          },
          {
            "id": "0HDkc7H2gSQUsed2Ef8h",
            "categories": [
              "Family - Friendly Events",
              "Children's Workshops",
              "Kid - Friendly Activities",
              "Amusement Parks"
            ],
            "type": "Family & Kids"
          },
          {
            "id": "0HtPFcg7AVvFy6NA6OTM",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "0K01Aa2k8Z7Ck1fOYlqB",
            "categories": [
              "Tech Conferences",
              "Startup Events",
              "Coding Workshops",
              "Tech Expos"
            ],
            "type": "Tech & Innovation"
          },
          {
            "id": "0KKFDYPIl6XriH5SsUYc",
            "categories": [
              "Religious Gatherings",
              "Spiritual Retreats",
              "Meditation Groups",
              "Interfaith Dialogues"
            ],
            "type": "Religion & Spirituality"
          },
          {
            "id": "0LwFRJmMwfdtYrBT9QcU",
            "categories": [
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Food & Dining"
          },
          {
            "id": "0NAJCk1mrbRGTPfWNUkh",
            "categories": [
              "Indian Cuisine",
              "Italian Cuisine",
              "American Fare",
              "Asian Fusion",
              "Mediterranean",
              "Mexican & Tex - Mex",
              "Sushi & Japanese",
              "Chinese Cuisine",
              "French Dining",
              "Vegetarian & Vegan",
              "Seafood Specialties",
              "BBQ & Grill",
              "Steakhouse",
              "Fast Food & Burgers",
              "Cafes & Bakeries",
              "Food Trucks",
              "Fine Dining",
              "Farm - to - Table",
              "Ethnic Eateries"
            ],
            "type": "Food styles"
          },
          {
            "id": "0Op61cfyN4dIfQkvVGkT",
            "categories": [
              "Sporting Events",
              "Fitness Classes",
              "Yoga & Meditation",
              "Outdoor Activities"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "0SKrbzBNX6CkX9NBiHot",
            "categories": [
              "Charity Galas",
              "Fundraising Events",
              "Volunteer Opportunities",
              "Community Outreach"
            ],
            "type": "Charity & Fundraising"
          },
          {
            "id": "0TQw0mrOpIlOJ0YbQU3j",
            "categories": [
              "Home Improvement Workshops",
              "Gardening Classes",
              "Home Shows",
              "DIY Events"
            ],
            "type": "Home & Garden"
          },
          {
            "id": "0Tk9R4cG8LW80xdHpzEY",
            "categories": [
              "Local Community Events",
              "Environmental Causes",
              "Social Activism",
              "Fundraising for Causes"
            ],
            "type": "Community & Causes"
          },
          {
            "id": "0YZ9ebyGc0Xhp0AliUgi",
            "categories": [
              "Food & Dining",
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Sports & Fitness"
          },
          {
            "id": "0aPvZgDpTUqfYEseOZP4",
            "categories": [
              "Indian Cuisine",
              "Italian Cuisine",
              "American Fare",
              "Asian Fusion",
              "Mediterranean",
              "Mexican & Tex - Mex",
              "Sushi & Japanese",
              "Chinese Cuisine",
              "French Dining",
              "Vegetarian & Vegan",
              "Seafood Specialties",
              "BBQ & Grill",
              "Steakhouse",
              "Fast Food & Burgers",
              "Cafes & Bakeries",
              "Food Trucks",
              "Fine Dining",
              "Farm - to - Table",
              "Ethnic Eateries"
            ],
            "type": "Food styles"
          },
          {
            "id": "0aR4wDD6LcqgXMA3jEi4",
            "categories": [
              "Food & Dining",
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Sports & Fitness"
          },
          {
            "id": "0aqqHhtEM7c9GphS2Dzn",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "0bPOVVf8sv11angjF0p3",
            "categories": [
              "Science Exhibitions",
              "STEM Workshops",
              "Space & Astronomy",
              "Technology Talks"
            ],
            "type": "Science & Technology"
          },
          {
            "id": "0dkoqpsvxr7hyJ7Zntmo",
            "categories": [
              "Theater Productions",
              "Magic Shows",
              "Stand - Up Comedy",
              "Movie Screenings"
            ],
            "type": "Entertainment & Shows"
          },
          {
            "id": "0hG5wKZKbeW6tPHS5aEH",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "0iN1zajayMOI6RCKx3tK",
            "categories": [
              "Family - Friendly Events",
              "Children's Workshops",
              "Kid - Friendly Activities",
              "Amusement Parks"
            ],
            "type": "Family & Kids"
          },
          {
            "id": "0np2Rp6lsPFOcqKvDd2v",
            "categories": [
              "Educational Workshops",
              "Lectures & Talks",
              "Online Courses",
              "Tutoring Services"
            ],
            "type": "Education & Learning"
          },
          {
            "id": "0nukSpYxurEKenzmsStL",
            "categories": [
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Food & Dining"
          },
          {
            "id": "0oR847wwksfEBdbktJN1",
            "categories": [
              "Tech Conferences",
              "Startup Events",
              "Coding Workshops",
              "Tech Expos"
            ],
            "type": "Tech & Innovation"
          },
          {
            "id": "0pFk1x3uD57ZN33LYbJ7",
            "categories": [
              "Theater Productions",
              "Magic Shows",
              "Stand - Up Comedy",
              "Movie Screenings"
            ],
            "type": "Entertainment & Shows"
          },
          {
            "id": "0qxHTsrHhE4xs9yQx9T8",
            "categories": [
              "Travel Expos",
              "Adventure Tours",
              "Backpacking Trips",
              "Cultural Experiences"
            ],
            "type": "Travel & Adventure"
          },
          {
            "id": "0r5rXs2N0VtEFvlre2ie",
            "categories": [
              "Wellness Retreats",
              "Health Workshops",
              "Mindfulness Events",
              "Medical Seminars"
            ],
            "type": "Health & Wellness"
          },
          {
            "id": "0rHuxEaf7oxB4nasrM54",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "0uH6OpSH25Ggyk7R3swo",
            "categories": [
              "Food & Dining",
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Sports & Fitness"
          },
          {
            "id": "0v1zzECdk2EQRegbmGsF",
            "categories": [
              "Theater Productions",
              "Magic Shows",
              "Stand - Up Comedy",
              "Movie Screenings"
            ],
            "type": "Entertainment & Shows"
          },
          {
            "id": "0wB3b3KWRP1rvLtpRCvC",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "0wCkprW3hESr5A7yT1a1",
            "categories": [
              "Networking Events",
              "Workshops & Seminars",
              "Conferences",
              "Job Fairs"
            ],
            "type": "Networking & Business"
          },
          {
            "id": "0xWChguv5DFS1cNW16XA",
            "categories": [
              "Food & Dining",
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Sports & Fitness"
          },
          {
            "id": "0y3txe4J7Cdxcf86425k",
            "categories": [
              "Science Exhibitions",
              "STEM Workshops",
              "Space & Astronomy",
              "Technology Talks"
            ],
            "type": "Science & Technology"
          },
          {
            "id": "0zFyeK5Bv7aIokcUnZpD",
            "categories": [
              "Hobbyist Gatherings",
              "Hobby Workshops",
              "Special Interest Groups",
              "Craft Fairs"
            ],
            "type": "Hobbies & Interests"
          },
          {
            "id": "102NJ5PDNtPMuBaZGdLa",
            "categories": [
              "Hobbyist Gatherings",
              "Hobby Workshops",
              "Special Interest Groups",
              "Craft Fairs"
            ],
            "type": "Hobbies & Interests"
          },
          {
            "id": "11P7MAR1zA4WKrFx2jB9",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "11lP7NW7ByyaV8Drkz8v",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "11z4O7pLp3YcVMh1INv0",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "12S5QsmLEJxD8MGwFLGw",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "1713GXAGHscp82fZVBAa",
            "categories": [
              "Tech Conferences",
              "Startup Events",
              "Coding Workshops",
              "Tech Expos"
            ],
            "type": "Tech & Innovation"
          },
          {
            "id": "17nOUk7YUgA7e3SpGTte",
            "categories": [
              "Family - Friendly Events",
              "Children's Workshops",
              "Kid - Friendly Activities",
              "Amusement Parks"
            ],
            "type": "Family & Kids"
          },
          {
            "id": "1ArXF9sJ4AfeggAW3X67",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "1Dxqxn9BW3Uus0o7PTMX",
            "categories": [
              "Sporting Events",
              "Fitness Classes",
              "Yoga & Meditation",
              "Outdoor Activities"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "1E7qypo6o9Ql2m2QeIHD",
            "categories": [
              "Local Community Events",
              "Environmental Causes",
              "Social Activism",
              "Fundraising for Causes"
            ],
            "type": "Community & Causes"
          },
          {
            "id": "1EzTi40vjFTU4tB8adet",
            "categories": [
              "Networking Events",
              "Workshops & Seminars",
              "Conferences",
              "Job Fairs"
            ],
            "type": "Networking & Business"
          },
          {
            "id": "1FwK89g3K7I4I7tjgS8V",
            "categories": [
              "Charity Galas",
              "Fundraising Events",
              "Volunteer Opportunities",
              "Community Outreach"
            ],
            "type": "Charity & Fundraising"
          },
          {
            "id": "1Im6T1DUYqXk6NsBOoLf",
            "categories": [
              "Educational Workshops",
              "Lectures & Talks",
              "Online Courses",
              "Tutoring Services"
            ],
            "type": "Education & Learning"
          },
          {
            "id": "1Nz1SlSn5gi02qAYFiku",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "1O53yiFcDEEgPOHQYNcQ",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "1OgDO4Yolmsyu7HfpOf6",
            "categories": [
              "Pet Adoption Events",
              "Animal Welfare Fundraisers",
              "Pet - Friendly Activities",
              "Zoo Visits"
            ],
            "type": "Pets & Animals"
          },
          {
            "id": "1TJ9TU5Mx4a1xH9HkmCl",
            "categories": [
              "Travel Expos",
              "Adventure Tours",
              "Backpacking Trips",
              "Cultural Experiences"
            ],
            "type": "Travel & Adventure"
          },
          {
            "id": "1TRq2SlpcHwWISgcMor1",
            "categories": [
              "Wellness Retreats",
              "Health Workshops",
              "Mindfulness Events",
              "Medical Seminars"
            ],
            "type": "Health & Wellness"
          },
          {
            "id": "1V4GwNaXWXhJ4q70J7ic",
            "categories": [
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Food & Dining"
          },
          {
            "id": "1Wt6ck4psJ82w0ssnYys",
            "categories": [
              "Religious Gatherings",
              "Spiritual Retreats",
              "Meditation Groups",
              "Interfaith Dialogues"
            ],
            "type": "Religion & Spirituality"
          },
          {
            "id": "1YYRMZar3uQppbqMZGX2",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "1aX3tYO5Ge5xx0fgpVoO",
            "categories": [
              "Sporting Events",
              "Fitness Classes",
              "Yoga & Meditation",
              "Outdoor Activities"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "1akOpisFNGm7jRDRwOYA",
            "categories": [
              "Pet Adoption Events",
              "Animal Welfare Fundraisers",
              "Pet - Friendly Activities",
              "Zoo Visits"
            ],
            "type": "Pets & Animals"
          },
          {
            "id": "1eJxW86ndk7Nt8ikOIyr",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "1f8stoxQxNRD2xQdwjU4",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "1fSfdJqPpLulXWWnA2j6",
            "categories": [
              "Science Exhibitions",
              "STEM Workshops",
              "Space & Astronomy",
              "Technology Talks"
            ],
            "type": "Science & Technology"
          },
          {
            "id": "1fbH277rvQOTKIy2GzzQ",
            "categories": [
              "Science Exhibitions",
              "STEM Workshops",
              "Space & Astronomy",
              "Technology Talks"
            ],
            "type": "Science & Technology"
          },
          {
            "id": "1fbRy6SYg8hcJbx0kWN3",
            "categories": [
              "Networking Events",
              "Workshops & Seminars",
              "Conferences",
              "Job Fairs"
            ],
            "type": "Networking & Business"
          },
          {
            "id": "1hqcsU50eKETo2fxOsaD",
            "categories": [
              "Sporting Events",
              "Fitness Classes",
              "Yoga & Meditation",
              "Outdoor Activities"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "1hyc6aOMxvojJK4MZiNu",
            "categories": [
              "Travel Expos",
              "Adventure Tours",
              "Backpacking Trips",
              "Cultural Experiences"
            ],
            "type": "Travel & Adventure"
          },
          {
            "id": "1mTpvxE2N0cyxKrdqcWe",
            "categories": [
              "Food & Dining",
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Sports & Fitness"
          },
          {
            "id": "1mzv1Ef2ofaKvLeeyVez",
            "categories": [
              "Hobbyist Gatherings",
              "Hobby Workshops",
              "Special Interest Groups",
              "Craft Fairs"
            ],
            "type": "Hobbies & Interests"
          },
          {
            "id": "1p4NT3WzldkKqP1D6jH3",
            "categories": [
              "Travel Expos",
              "Adventure Tours",
              "Backpacking Trips",
              "Cultural Experiences"
            ],
            "type": "Travel & Adventure"
          },
          {
            "id": "1pfcB4ngeRB7TZqjFfag",
            "categories": [
              "Networking Events",
              "Workshops & Seminars",
              "Conferences",
              "Job Fairs"
            ],
            "type": "Networking & Business"
          },
          {
            "id": "1qOYJs10Jx1yKe5r6jer",
            "categories": [
              "Pet Adoption Events",
              "Animal Welfare Fundraisers",
              "Pet - Friendly Activities",
              "Zoo Visits"
            ],
            "type": "Pets & Animals"
          },
          {
            "id": "1qad9eLXW3vk8OUWpKdO",
            "categories": [
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Food & Dining"
          },
          {
            "id": "1sI3lFtuefQSUXUCyWRH",
            "categories": [
              "Fashion Shows",
              "Beauty Workshops",
              "Pop - Up Boutiques",
              "Makeup Classes"
            ],
            "type": "Fashion & Beauty"
          },
          {
            "id": "1uBYfSrLUqly7J1chYfV",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "1wnZeYyGMcOLSOf45XTu",
            "categories": [
              "Local Community Events",
              "Environmental Causes",
              "Social Activism",
              "Fundraising for Causes"
            ],
            "type": "Community & Causes"
          },
          {
            "id": "1x17swEdKYStxVRwttS3",
            "categories": [
              "Charity Galas",
              "Fundraising Events",
              "Volunteer Opportunities",
              "Community Outreach"
            ],
            "type": "Charity & Fundraising"
          },
          {
            "id": "1x1WE5qnhAHeRJSVKYaF",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "1xW90SbZv1ZQHtmQl3qP",
            "categories": [
              "Local Community Events",
              "Environmental Causes",
              "Social Activism",
              "Fundraising for Causes"
            ],
            "type": "Community & Causes"
          },
          {
            "id": "20dGwwg8P9GsVEB1cHLu",
            "categories": [
              "Family - Friendly Events",
              "Children's Workshops",
              "Kid - Friendly Activities",
              "Amusement Parks"
            ],
            "type": "Family & Kids"
          },
          {
            "id": "20u8lQRgbceLFKN7U35d",
            "categories": [
              "Science Exhibitions",
              "STEM Workshops",
              "Space & Astronomy",
              "Technology Talks"
            ],
            "type": "Science & Technology"
          },
          {
            "id": "20xD9rUYPgq3DevdJCfZ",
            "categories": [
              "Hobbyist Gatherings",
              "Hobby Workshops",
              "Special Interest Groups",
              "Craft Fairs"
            ],
            "type": "Hobbies & Interests"
          },
          {
            "id": "236YfA06zpMZMNUCz7lT",
            "categories": [
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Food & Dining"
          },
          {
            "id": "23CA9iyVe6yq15GHI69S",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "24DWYYnNBtBW8sPI6s23",
            "categories": [
              "Home Improvement Workshops",
              "Gardening Classes",
              "Home Shows",
              "DIY Events"
            ],
            "type": "Home & Garden"
          },
          {
            "id": "2Akv3113boYXqaNXwGgX",
            "categories": [
              "Pet Adoption Events",
              "Animal Welfare Fundraisers",
              "Pet - Friendly Activities",
              "Zoo Visits"
            ],
            "type": "Pets & Animals"
          },
          {
            "id": "2BKMFSPbBaNGdC21JUQQ",
            "categories": [
              "Fashion Shows",
              "Beauty Workshops",
              "Pop - Up Boutiques",
              "Makeup Classes"
            ],
            "type": "Fashion & Beauty"
          },
          {
            "id": "2CKYZl3RlHnyCriH2gpI",
            "categories": [
              "Theater Productions",
              "Magic Shows",
              "Stand - Up Comedy",
              "Movie Screenings"
            ],
            "type": "Entertainment & Shows"
          },
          {
            "id": "2D2cLrHHdplzQHVX9NV6",
            "categories": [
              "Tech Conferences",
              "Startup Events",
              "Coding Workshops",
              "Tech Expos"
            ],
            "type": "Tech & Innovation"
          },
          {
            "id": "2JAUmFvxOXIY6XvOf7ox",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "2LATv0f5eEoGoIsvzyDc",
            "categories": [
              "Theater Productions",
              "Magic Shows",
              "Stand - Up Comedy",
              "Movie Screenings"
            ],
            "type": "Entertainment & Shows"
          },
          {
            "id": "2MxMireQAxFAMyqQiaho",
            "categories": [
              "Pet Adoption Events",
              "Animal Welfare Fundraisers",
              "Pet - Friendly Activities",
              "Zoo Visits"
            ],
            "type": "Pets & Animals"
          },
          {
            "id": "2N4njFf9C2W65gHRFkYv",
            "categories": [
              "Family - Friendly Events",
              "Children's Workshops",
              "Kid - Friendly Activities",
              "Amusement Parks"
            ],
            "type": "Family & Kids"
          },
          {
            "id": "2NYYaATqxO9T4jQe3fkm",
            "categories": [
              "Science Exhibitions",
              "STEM Workshops",
              "Space & Astronomy",
              "Technology Talks"
            ],
            "type": "Science & Technology"
          },
          {
            "id": "2Pa5SnaGkaPXHePlyfQi",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "2VSbrAibDxadUJooREg9",
            "categories": [
              "Pet Adoption Events",
              "Animal Welfare Fundraisers",
              "Pet - Friendly Activities",
              "Zoo Visits"
            ],
            "type": "Pets & Animals"
          },
          {
            "id": "2YjGOxKvBXioLesd6cjh",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "2Yo1wfzANFiDCWBXJUOB",
            "categories": [
              "Food & Dining",
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Sports & Fitness"
          },
          {
            "id": "2ZFPLkWlKL5qamc05zmh",
            "categories": [
              "Wellness Retreats",
              "Health Workshops",
              "Mindfulness Events",
              "Medical Seminars"
            ],
            "type": "Health & Wellness"
          },
          {
            "id": "2ZeWPhbSemg4zVmROMYJ",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "2bCW7OOMyvRO7N50KCK0",
            "categories": [
              "Fashion Shows",
              "Beauty Workshops",
              "Pop - Up Boutiques",
              "Makeup Classes"
            ],
            "type": "Fashion & Beauty"
          },
          {
            "id": "2bvtWJ2SDseTwa3XRb9e",
            "categories": [
              "Family - Friendly Events",
              "Children's Workshops",
              "Kid - Friendly Activities",
              "Amusement Parks"
            ],
            "type": "Family & Kids"
          },
          {
            "id": "2c2cVZ9XrC37cVokwv9S",
            "categories": [
              "Food & Dining",
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Sports & Fitness"
          },
          {
            "id": "2dTdZRAbn71Edq6fO0ua",
            "categories": [
              "Theater Productions",
              "Magic Shows",
              "Stand - Up Comedy",
              "Movie Screenings"
            ],
            "type": "Entertainment & Shows"
          },
          {
            "id": "2fKeAb2TWqgZbCoaLhGM",
            "categories": [
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Food & Dining"
          },
          {
            "id": "2foTfvb7fmatZNgF4N8t",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "2hMpFpo9AFln3NqKDxSg",
            "categories": [
              "Indian Cuisine",
              "Italian Cuisine",
              "American Fare",
              "Asian Fusion",
              "Mediterranean",
              "Mexican & Tex - Mex",
              "Sushi & Japanese",
              "Chinese Cuisine",
              "French Dining",
              "Vegetarian & Vegan",
              "Seafood Specialties",
              "BBQ & Grill",
              "Steakhouse",
              "Fast Food & Burgers",
              "Cafes & Bakeries",
              "Food Trucks",
              "Fine Dining",
              "Farm - to - Table",
              "Ethnic Eateries"
            ],
            "type": "Food styles"
          },
          {
            "id": "2k4GduQx7DthCxLvhAcH",
            "categories": [
              "Pet Adoption Events",
              "Animal Welfare Fundraisers",
              "Pet - Friendly Activities",
              "Zoo Visits"
            ],
            "type": "Pets & Animals"
          },
          {
            "id": "2l9salqld3H5pxsBmKOo",
            "categories": [
              "Educational Workshops",
              "Lectures & Talks",
              "Online Courses",
              "Tutoring Services"
            ],
            "type": "Education & Learning"
          },
          {
            "id": "2mWlPF3ixhpguZBJIoYv",
            "categories": [
              "Educational Workshops",
              "Lectures & Talks",
              "Online Courses",
              "Tutoring Services"
            ],
            "type": "Education & Learning"
          },
          {
            "id": "2nMjakZUD85b5Yvw8G17",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "2oEpBbWBGOidAZkZfQCm",
            "categories": [
              "Home Improvement Workshops",
              "Gardening Classes",
              "Home Shows",
              "DIY Events"
            ],
            "type": "Home & Garden"
          },
          {
            "id": "2r7MXC9XxL0NsPkfQ3mu",
            "categories": [
              "Hobbyist Gatherings",
              "Hobby Workshops",
              "Special Interest Groups",
              "Craft Fairs"
            ],
            "type": "Hobbies & Interests"
          },
          {
            "id": "2rndo1Wlf362OZwDQRs4",
            "categories": [
              "Wellness Retreats",
              "Health Workshops",
              "Mindfulness Events",
              "Medical Seminars"
            ],
            "type": "Health & Wellness"
          },
          {
            "id": "2sYWYDJXBbAfMI96rcfp",
            "categories": [
              "Charity Galas",
              "Fundraising Events",
              "Volunteer Opportunities",
              "Community Outreach"
            ],
            "type": "Charity & Fundraising"
          },
          {
            "id": "2vSlBtuvqmRV6oWCYunv",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "2yXwNG59WS5o3MHRCWVd",
            "categories": [
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Food & Dining"
          },
          {
            "id": "2ymPTnX08jOjEB1Difhz",
            "categories": [
              "Family - Friendly Events",
              "Children's Workshops",
              "Kid - Friendly Activities",
              "Amusement Parks"
            ],
            "type": "Family & Kids"
          },
          {
            "id": "2z2KTaJDA088tNvNnivE",
            "categories": [
              "Food & Dining",
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Sports & Fitness"
          },
          {
            "id": "2zyGqjLzE73FQnFGMF0t",
            "categories": [
              "Science Exhibitions",
              "STEM Workshops",
              "Space & Astronomy",
              "Technology Talks"
            ],
            "type": "Science & Technology"
          },
          {
            "id": "307IYeU1yMWlkrUo0Bg6",
            "categories": [
              "Home Improvement Workshops",
              "Gardening Classes",
              "Home Shows",
              "DIY Events"
            ],
            "type": "Home & Garden"
          },
          {
            "id": "32BBeyhrPfGFLOmSphuQ",
            "categories": [
              "Local Community Events",
              "Environmental Causes",
              "Social Activism",
              "Fundraising for Causes"
            ],
            "type": "Community & Causes"
          },
          {
            "id": "34GFUFDKluHi9LAow6xw",
            "categories": [
              "Local Community Events",
              "Environmental Causes",
              "Social Activism",
              "Fundraising for Causes"
            ],
            "type": "Community & Causes"
          },
          {
            "id": "36sWoOgwDyXUZuwezO7w",
            "categories": [
              "Indian Cuisine",
              "Italian Cuisine",
              "American Fare",
              "Asian Fusion",
              "Mediterranean",
              "Mexican & Tex - Mex",
              "Sushi & Japanese",
              "Chinese Cuisine",
              "French Dining",
              "Vegetarian & Vegan",
              "Seafood Specialties",
              "BBQ & Grill",
              "Steakhouse",
              "Fast Food & Burgers",
              "Cafes & Bakeries",
              "Food Trucks",
              "Fine Dining",
              "Farm - to - Table",
              "Ethnic Eateries"
            ],
            "type": "Food styles"
          },
          {
            "id": "37i9TNRkF1wZsyYD3u7I",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "3CzD6CevuoZNSTfqujQD",
            "categories": [
              "Religious Gatherings",
              "Spiritual Retreats",
              "Meditation Groups",
              "Interfaith Dialogues"
            ],
            "type": "Religion & Spirituality"
          },
          {
            "id": "3DZWhw1WkDxyOWZenZDv",
            "categories": [
              "Tech Conferences",
              "Startup Events",
              "Coding Workshops",
              "Tech Expos"
            ],
            "type": "Tech & Innovation"
          },
          {
            "id": "3HIBHNiif4TSjp5mHY65",
            "categories": [
              "Theater Productions",
              "Magic Shows",
              "Stand - Up Comedy",
              "Movie Screenings"
            ],
            "type": "Entertainment & Shows"
          },
          {
            "id": "3IHVTcsAhwD47AyVKzPH",
            "categories": [
              "Wellness Retreats",
              "Health Workshops",
              "Mindfulness Events",
              "Medical Seminars"
            ],
            "type": "Health & Wellness"
          },
          {
            "id": "3KhyVYpQouHrDuR5xzz3",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "3Krzi5iFOLUNtA5Jfaqx",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "3QnEWKWkdnpFdhmisBp7",
            "categories": [
              "Theater Productions",
              "Magic Shows",
              "Stand - Up Comedy",
              "Movie Screenings"
            ],
            "type": "Entertainment & Shows"
          },
          {
            "id": "3QodjJYGAwwFhQCiuI8r",
            "categories": [
              "Food & Dining",
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Sports & Fitness"
          },
          {
            "id": "3SWjjDnZN07JSgIjcm1n",
            "categories": [
              "Tech Conferences",
              "Startup Events",
              "Coding Workshops",
              "Tech Expos"
            ],
            "type": "Tech & Innovation"
          },
          {
            "id": "3TnJ3l5qZ0Yal40cp1Iy",
            "categories": [
              "Networking Events",
              "Workshops & Seminars",
              "Conferences",
              "Job Fairs"
            ],
            "type": "Networking & Business"
          },
          {
            "id": "3UV3N9s7Xh53d8uRmt1A",
            "categories": [
              "Theater Productions",
              "Magic Shows",
              "Stand - Up Comedy",
              "Movie Screenings"
            ],
            "type": "Entertainment & Shows"
          },
          {
            "id": "3WqEpg9CSu7oafA13YJQ",
            "categories": [
              "Charity Galas",
              "Fundraising Events",
              "Volunteer Opportunities",
              "Community Outreach"
            ],
            "type": "Charity & Fundraising"
          },
          {
            "id": "3YAqN0UvE8RbMer1qtBZ",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "3ZdzP3dOPrhIC5CL5Lax",
            "categories": [
              "Sporting Events",
              "Fitness Classes",
              "Yoga & Meditation",
              "Outdoor Activities"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "3aVJaZD5ala7i1g6XJWp",
            "categories": [
              "Indian Cuisine",
              "Italian Cuisine",
              "American Fare",
              "Asian Fusion",
              "Mediterranean",
              "Mexican & Tex - Mex",
              "Sushi & Japanese",
              "Chinese Cuisine",
              "French Dining",
              "Vegetarian & Vegan",
              "Seafood Specialties",
              "BBQ & Grill",
              "Steakhouse",
              "Fast Food & Burgers",
              "Cafes & Bakeries",
              "Food Trucks",
              "Fine Dining",
              "Farm - to - Table",
              "Ethnic Eateries"
            ],
            "type": "Food styles"
          },
          {
            "id": "3asSrBnztGWmCYtY4Vz8",
            "categories": [
              "Science Exhibitions",
              "STEM Workshops",
              "Space & Astronomy",
              "Technology Talks"
            ],
            "type": "Science & Technology"
          },
          {
            "id": "3bGn1lvcaok6iTM5eGVt",
            "categories": [
              "Sporting Events",
              "Fitness Classes",
              "Yoga & Meditation",
              "Outdoor Activities"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "3bcyN7reQHnee5cfPxDP",
            "categories": [
              "Sporting Events",
              "Fitness Classes",
              "Yoga & Meditation",
              "Outdoor Activities"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "3ccbVgnMkKfIdtuWlfXY",
            "categories": [
              "Local Community Events",
              "Environmental Causes",
              "Social Activism",
              "Fundraising for Causes"
            ],
            "type": "Community & Causes"
          },
          {
            "id": "3eNwnV0EISttIYTMRrsC",
            "categories": [
              "Food & Dining",
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Sports & Fitness"
          },
          {
            "id": "3fmJxLsFtwGCmUsI3q32",
            "categories": [
              "Pet Adoption Events",
              "Animal Welfare Fundraisers",
              "Pet - Friendly Activities",
              "Zoo Visits"
            ],
            "type": "Pets & Animals"
          },
          {
            "id": "3fuS9BSibP1CRYccDZ4F",
            "categories": [
              "Networking Events",
              "Workshops & Seminars",
              "Conferences",
              "Job Fairs"
            ],
            "type": "Networking & Business"
          },
          {
            "id": "3g2uHpUJUbcJNTyt2Ycr",
            "categories": [
              "Science Exhibitions",
              "STEM Workshops",
              "Space & Astronomy",
              "Technology Talks"
            ],
            "type": "Science & Technology"
          },
          {
            "id": "3gQlUEyxYqcD7e11ilbN",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "3gWi0Sb8u7Zbl2KCIDKA",
            "categories": [
              "Family - Friendly Events",
              "Children's Workshops",
              "Kid - Friendly Activities",
              "Amusement Parks"
            ],
            "type": "Family & Kids"
          },
          {
            "id": "3ha5CFEE46INvgFg3QE0",
            "categories": [
              "Religious Gatherings",
              "Spiritual Retreats",
              "Meditation Groups",
              "Interfaith Dialogues"
            ],
            "type": "Religion & Spirituality"
          },
          {
            "id": "3iDWR2rXq4muptaT6ejO",
            "categories": [
              "Science Exhibitions",
              "STEM Workshops",
              "Space & Astronomy",
              "Technology Talks"
            ],
            "type": "Science & Technology"
          },
          {
            "id": "3ickXjOhwGQ3LvrHCkbC",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "3qaEsoVdi9XFOr81yOhu",
            "categories": [
              "Fashion Shows",
              "Beauty Workshops",
              "Pop - Up Boutiques",
              "Makeup Classes"
            ],
            "type": "Fashion & Beauty"
          },
          {
            "id": "3qyZuy9JlElNblB8tR87",
            "categories": [
              "Home Improvement Workshops",
              "Gardening Classes",
              "Home Shows",
              "DIY Events"
            ],
            "type": "Home & Garden"
          },
          {
            "id": "3uRJUVtKfVsnlkXxMS0U",
            "categories": [
              "Home Improvement Workshops",
              "Gardening Classes",
              "Home Shows",
              "DIY Events"
            ],
            "type": "Home & Garden"
          },
          {
            "id": "3ujcC610fJw1Y1Iqa1Hx",
            "categories": [
              "Sporting Events",
              "Fitness Classes",
              "Yoga & Meditation",
              "Outdoor Activities"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "3v64e3EzOAEG7JV9gSUP",
            "categories": [
              "Pet Adoption Events",
              "Animal Welfare Fundraisers",
              "Pet - Friendly Activities",
              "Zoo Visits"
            ],
            "type": "Pets & Animals"
          },
          {
            "id": "40UCU9Oac0Kim6eNzEhf",
            "categories": [
              "Indian Cuisine",
              "Italian Cuisine",
              "American Fare",
              "Asian Fusion",
              "Mediterranean",
              "Mexican & Tex - Mex",
              "Sushi & Japanese",
              "Chinese Cuisine",
              "French Dining",
              "Vegetarian & Vegan",
              "Seafood Specialties",
              "BBQ & Grill",
              "Steakhouse",
              "Fast Food & Burgers",
              "Cafes & Bakeries",
              "Food Trucks",
              "Fine Dining",
              "Farm - to - Table",
              "Ethnic Eateries"
            ],
            "type": "Food styles"
          },
          {
            "id": "44Y3iuZxLCCiinzOi6oI",
            "categories": [
              "Pet Adoption Events",
              "Animal Welfare Fundraisers",
              "Pet - Friendly Activities",
              "Zoo Visits"
            ],
            "type": "Pets & Animals"
          },
          {
            "id": "45Gl5S9tp4DFAaDzmAIw",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "46TsOfEOODKGiXkDJI7k",
            "categories": [
              "Wellness Retreats",
              "Health Workshops",
              "Mindfulness Events",
              "Medical Seminars"
            ],
            "type": "Health & Wellness"
          },
          {
            "id": "48VOITSy53RNvsFLwyQ9",
            "categories": [
              "Indian Cuisine",
              "Italian Cuisine",
              "American Fare",
              "Asian Fusion",
              "Mediterranean",
              "Mexican & Tex - Mex",
              "Sushi & Japanese",
              "Chinese Cuisine",
              "French Dining",
              "Vegetarian & Vegan",
              "Seafood Specialties",
              "BBQ & Grill",
              "Steakhouse",
              "Fast Food & Burgers",
              "Cafes & Bakeries",
              "Food Trucks",
              "Fine Dining",
              "Farm - to - Table",
              "Ethnic Eateries"
            ],
            "type": "Food styles"
          },
          {
            "id": "48k4lJdlInBHVFO02R6D",
            "categories": [
              "Science Exhibitions",
              "STEM Workshops",
              "Space & Astronomy",
              "Technology Talks"
            ],
            "type": "Science & Technology"
          },
          {
            "id": "49ngMKCIHK1ozIk8ZLiN",
            "categories": [
              "Charity Galas",
              "Fundraising Events",
              "Volunteer Opportunities",
              "Community Outreach"
            ],
            "type": "Charity & Fundraising"
          },
          {
            "id": "4FwEfiexXFhOZKJb2IMN",
            "categories": [
              "Local Community Events",
              "Environmental Causes",
              "Social Activism",
              "Fundraising for Causes"
            ],
            "type": "Community & Causes"
          },
          {
            "id": "4Gk6CRpuDGf13g5ZIQm2",
            "categories": [
              "Food & Dining",
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Sports & Fitness"
          },
          {
            "id": "4IJXkb3kxwZKi1FSoSbI",
            "categories": [
              "Science Exhibitions",
              "STEM Workshops",
              "Space & Astronomy",
              "Technology Talks"
            ],
            "type": "Science & Technology"
          },
          {
            "id": "4IhyGvycmGZbAsyvzy2n",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "4JhiS6Ch0i9FAs4Do6UQ",
            "categories": [
              "Wellness Retreats",
              "Health Workshops",
              "Mindfulness Events",
              "Medical Seminars"
            ],
            "type": "Health & Wellness"
          },
          {
            "id": "4JivUJH6jciaNJTPYTiu",
            "categories": [
              "Family - Friendly Events",
              "Children's Workshops",
              "Kid - Friendly Activities",
              "Amusement Parks"
            ],
            "type": "Family & Kids"
          },
          {
            "id": "4KCcpKsGZBJH0asNJa0Z",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "4KYnipxLduNy4XDXEd7R",
            "categories": [
              "Indian Cuisine",
              "Italian Cuisine",
              "American Fare",
              "Asian Fusion",
              "Mediterranean",
              "Mexican & Tex - Mex",
              "Sushi & Japanese",
              "Chinese Cuisine",
              "French Dining",
              "Vegetarian & Vegan",
              "Seafood Specialties",
              "BBQ & Grill",
              "Steakhouse",
              "Fast Food & Burgers",
              "Cafes & Bakeries",
              "Food Trucks",
              "Fine Dining",
              "Farm - to - Table",
              "Ethnic Eateries"
            ],
            "type": "Food styles"
          },
          {
            "id": "4Lu6EsTsm0hFjy30eOUS",
            "categories": [
              "Networking Events",
              "Workshops & Seminars",
              "Conferences",
              "Job Fairs"
            ],
            "type": "Networking & Business"
          },
          {
            "id": "4N8Hneol3MiEr0wKHrS4",
            "categories": [
              "Family - Friendly Events",
              "Children's Workshops",
              "Kid - Friendly Activities",
              "Amusement Parks"
            ],
            "type": "Family & Kids"
          },
          {
            "id": "4NECCoJbyO0xzlDqjJK1",
            "categories": [
              "Religious Gatherings",
              "Spiritual Retreats",
              "Meditation Groups",
              "Interfaith Dialogues"
            ],
            "type": "Religion & Spirituality"
          },
          {
            "id": "4NsOK7O1TFwPuqr2GSIK",
            "categories": [
              "Tech Conferences",
              "Startup Events",
              "Coding Workshops",
              "Tech Expos"
            ],
            "type": "Tech & Innovation"
          },
          {
            "id": "4R22cOO7p3l0cKy4GXEp",
            "categories": [
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Food & Dining"
          },
          {
            "id": "4TN9hMs300LmpO4n4dw5",
            "categories": [
              "Food & Dining",
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Sports & Fitness"
          },
          {
            "id": "4VZvZAtEvoUUmagKwSZO",
            "categories": [
              "Networking Events",
              "Workshops & Seminars",
              "Conferences",
              "Job Fairs"
            ],
            "type": "Networking & Business"
          },
          {
            "id": "4Xd9eOzlKMiyQUm0IOE4",
            "categories": [
              "Networking Events",
              "Workshops & Seminars",
              "Conferences",
              "Job Fairs"
            ],
            "type": "Networking & Business"
          },
          {
            "id": "4cm93DN8s9ZkzRwsuutN",
            "categories": [
              "Hobbyist Gatherings",
              "Hobby Workshops",
              "Special Interest Groups",
              "Craft Fairs"
            ],
            "type": "Hobbies & Interests"
          },
          {
            "id": "4hdZXzMi1WQgNKxsmomx",
            "categories": [
              "Fashion Shows",
              "Beauty Workshops",
              "Pop - Up Boutiques",
              "Makeup Classes"
            ],
            "type": "Fashion & Beauty"
          },
          {
            "id": "4mnx9z9Iiog8N39eIoVA",
            "categories": [
              "Tech Conferences",
              "Startup Events",
              "Coding Workshops",
              "Tech Expos"
            ],
            "type": "Tech & Innovation"
          },
          {
            "id": "4nksLpDhfxv58sqXXf9i",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "4nrRUkWzbaBG42cVZATl",
            "categories": [
              "Food & Dining",
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Sports & Fitness"
          },
          {
            "id": "4p7lDr0RHoOx6xmv58cF",
            "categories": [
              "Travel Expos",
              "Adventure Tours",
              "Backpacking Trips",
              "Cultural Experiences"
            ],
            "type": "Travel & Adventure"
          },
          {
            "id": "4ra8IlG3149bztP4c9d8",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "4rthdPy3RkwNzML0TVXo",
            "categories": [
              "Home Improvement Workshops",
              "Gardening Classes",
              "Home Shows",
              "DIY Events"
            ],
            "type": "Home & Garden"
          },
          {
            "id": "4sbPfQeKLvPZ5EkCNBjV",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "4sgZLYmrgO2KCZKvjEf9",
            "categories": [
              "Wellness Retreats",
              "Health Workshops",
              "Mindfulness Events",
              "Medical Seminars"
            ],
            "type": "Health & Wellness"
          },
          {
            "id": "4tC6pwA1hzMJeKGRiYea",
            "categories": [
              "Networking Events",
              "Workshops & Seminars",
              "Conferences",
              "Job Fairs"
            ],
            "type": "Networking & Business"
          },
          {
            "id": "4uIFFTzwmq1Q7ky99fDp",
            "categories": [
              "Theater Productions",
              "Magic Shows",
              "Stand - Up Comedy",
              "Movie Screenings"
            ],
            "type": "Entertainment & Shows"
          },
          {
            "id": "4vCQwqfLRCqEfYOyETru",
            "categories": [
              "Indian Cuisine",
              "Italian Cuisine",
              "American Fare",
              "Asian Fusion",
              "Mediterranean",
              "Mexican & Tex - Mex",
              "Sushi & Japanese",
              "Chinese Cuisine",
              "French Dining",
              "Vegetarian & Vegan",
              "Seafood Specialties",
              "BBQ & Grill",
              "Steakhouse",
              "Fast Food & Burgers",
              "Cafes & Bakeries",
              "Food Trucks",
              "Fine Dining",
              "Farm - to - Table",
              "Ethnic Eateries"
            ],
            "type": "Food styles"
          },
          {
            "id": "4vhowM6d4cUqsSD6zMBw",
            "categories": [
              "Hobbyist Gatherings",
              "Hobby Workshops",
              "Special Interest Groups",
              "Craft Fairs"
            ],
            "type": "Hobbies & Interests"
          },
          {
            "id": "4wWX2bG8EfigDtGfZndC",
            "categories": [
              "Tech Conferences",
              "Startup Events",
              "Coding Workshops",
              "Tech Expos"
            ],
            "type": "Tech & Innovation"
          },
          {
            "id": "4z4hGaU2D14252hl9zzz",
            "categories": [
              "Family - Friendly Events",
              "Children's Workshops",
              "Kid - Friendly Activities",
              "Amusement Parks"
            ],
            "type": "Family & Kids"
          },
          {
            "id": "504y0IaMBPZgqC2sUnBV",
            "categories": [
              "Fashion Shows",
              "Beauty Workshops",
              "Pop - Up Boutiques",
              "Makeup Classes"
            ],
            "type": "Fashion & Beauty"
          },
          {
            "id": "50COPuGWoOxqmBngoD8X",
            "categories": [
              "Fashion Shows",
              "Beauty Workshops",
              "Pop - Up Boutiques",
              "Makeup Classes"
            ],
            "type": "Fashion & Beauty"
          },
          {
            "id": "510JdkU2AmZuNgsAIys3",
            "categories": [
              "Science Exhibitions",
              "STEM Workshops",
              "Space & Astronomy",
              "Technology Talks"
            ],
            "type": "Science & Technology"
          },
          {
            "id": "53dPldNYZbLcHJTV0alb",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "547jIRCLhwmdMvSMpZjH",
            "categories": [
              "Theater Productions",
              "Magic Shows",
              "Stand - Up Comedy",
              "Movie Screenings"
            ],
            "type": "Entertainment & Shows"
          },
          {
            "id": "54QG8BS3Ru1FtuZkbeT8",
            "categories": [
              "Educational Workshops",
              "Lectures & Talks",
              "Online Courses",
              "Tutoring Services"
            ],
            "type": "Education & Learning"
          },
          {
            "id": "54ngc1cV8bz6K8LUyKSt",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "55Z6W5dfGGuSFsf2rgAO",
            "categories": [
              "Family - Friendly Events",
              "Children's Workshops",
              "Kid - Friendly Activities",
              "Amusement Parks"
            ],
            "type": "Family & Kids"
          },
          {
            "id": "56kDAcu9Sf7sReIlgWo1",
            "categories": [
              "Family - Friendly Events",
              "Children's Workshops",
              "Kid - Friendly Activities",
              "Amusement Parks"
            ],
            "type": "Family & Kids"
          },
          {
            "id": "59NZXpSSuVBIPSnYbksL",
            "categories": [
              "Travel Expos",
              "Adventure Tours",
              "Backpacking Trips",
              "Cultural Experiences"
            ],
            "type": "Travel & Adventure"
          },
          {
            "id": "59xwHdj6ASnrSPF7TNve",
            "categories": [
              "Theater Productions",
              "Magic Shows",
              "Stand - Up Comedy",
              "Movie Screenings"
            ],
            "type": "Entertainment & Shows"
          },
          {
            "id": "5BtM9qhec0CWp31sckAr",
            "categories": [
              "Sporting Events",
              "Fitness Classes",
              "Yoga & Meditation",
              "Outdoor Activities"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "5C3rM1mBE9ABqyqJYoS5",
            "categories": [
              "Hobbyist Gatherings",
              "Hobby Workshops",
              "Special Interest Groups",
              "Craft Fairs"
            ],
            "type": "Hobbies & Interests"
          },
          {
            "id": "5CP6PC1dE5c3uAl64VBD",
            "categories": [
              "Indian Cuisine",
              "Italian Cuisine",
              "American Fare",
              "Asian Fusion",
              "Mediterranean",
              "Mexican & Tex - Mex",
              "Sushi & Japanese",
              "Chinese Cuisine",
              "French Dining",
              "Vegetarian & Vegan",
              "Seafood Specialties",
              "BBQ & Grill",
              "Steakhouse",
              "Fast Food & Burgers",
              "Cafes & Bakeries",
              "Food Trucks",
              "Fine Dining",
              "Farm - to - Table",
              "Ethnic Eateries"
            ],
            "type": "Food styles"
          },
          {
            "id": "5CSkim4vKhtRjSIJ6MeE",
            "categories": [
              "Pet Adoption Events",
              "Animal Welfare Fundraisers",
              "Pet - Friendly Activities",
              "Zoo Visits"
            ],
            "type": "Pets & Animals"
          },
          {
            "id": "5D5LDrN1UnybntCFTweV",
            "categories": [
              "Indian Cuisine",
              "Italian Cuisine",
              "American Fare",
              "Asian Fusion",
              "Mediterranean",
              "Mexican & Tex - Mex",
              "Sushi & Japanese",
              "Chinese Cuisine",
              "French Dining",
              "Vegetarian & Vegan",
              "Seafood Specialties",
              "BBQ & Grill",
              "Steakhouse",
              "Fast Food & Burgers",
              "Cafes & Bakeries",
              "Food Trucks",
              "Fine Dining",
              "Farm - to - Table",
              "Ethnic Eateries"
            ],
            "type": "Food styles"
          },
          {
            "id": "5Don2S4IXMOIhZlrh9cC",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "5E1GjWWgAVQAOsuc4oMM",
            "categories": [
              "Indian Cuisine",
              "Italian Cuisine",
              "American Fare",
              "Asian Fusion",
              "Mediterranean",
              "Mexican & Tex - Mex",
              "Sushi & Japanese",
              "Chinese Cuisine",
              "French Dining",
              "Vegetarian & Vegan",
              "Seafood Specialties",
              "BBQ & Grill",
              "Steakhouse",
              "Fast Food & Burgers",
              "Cafes & Bakeries",
              "Food Trucks",
              "Fine Dining",
              "Farm - to - Table",
              "Ethnic Eateries"
            ],
            "type": "Food styles"
          },
          {
            "id": "5GwzdCx93SXlQCFeOb2m",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "5K5e56dBcaMwU8zQWkSJ",
            "categories": [
              "Fashion Shows",
              "Beauty Workshops",
              "Pop - Up Boutiques",
              "Makeup Classes"
            ],
            "type": "Fashion & Beauty"
          },
          {
            "id": "5N7T5QrfotQtBsCZxmSU",
            "categories": [
              "Indian Cuisine",
              "Italian Cuisine",
              "American Fare",
              "Asian Fusion",
              "Mediterranean",
              "Mexican & Tex - Mex",
              "Sushi & Japanese",
              "Chinese Cuisine",
              "French Dining",
              "Vegetarian & Vegan",
              "Seafood Specialties",
              "BBQ & Grill",
              "Steakhouse",
              "Fast Food & Burgers",
              "Cafes & Bakeries",
              "Food Trucks",
              "Fine Dining",
              "Farm - to - Table",
              "Ethnic Eateries"
            ],
            "type": "Food styles"
          },
          {
            "id": "5OctxdS7oOAQBiAGvqWs",
            "categories": [
              "Sporting Events",
              "Fitness Classes",
              "Yoga & Meditation",
              "Outdoor Activities"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "5PQ9Ku3ra0jD4vMTthxs",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "5PYectMvpWuqJokNyfCB",
            "categories": [
              "Travel Expos",
              "Adventure Tours",
              "Backpacking Trips",
              "Cultural Experiences"
            ],
            "type": "Travel & Adventure"
          },
          {
            "id": "5QKlVUM41GXeg9lMyzMU",
            "categories": [
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Food & Dining"
          },
          {
            "id": "5QRq2j4pFWaB3sSilcoF",
            "categories": [
              "Pet Adoption Events",
              "Animal Welfare Fundraisers",
              "Pet - Friendly Activities",
              "Zoo Visits"
            ],
            "type": "Pets & Animals"
          },
          {
            "id": "5RFt4S2daCzEbotYHmFz",
            "categories": [
              "Home Improvement Workshops",
              "Gardening Classes",
              "Home Shows",
              "DIY Events"
            ],
            "type": "Home & Garden"
          },
          {
            "id": "5UI3QAsbQq21r2ngpkl0",
            "categories": [
              "Travel Expos",
              "Adventure Tours",
              "Backpacking Trips",
              "Cultural Experiences"
            ],
            "type": "Travel & Adventure"
          },
          {
            "id": "5V8RLH4mh3sYoDDPjVzK",
            "categories": [
              "Travel Expos",
              "Adventure Tours",
              "Backpacking Trips",
              "Cultural Experiences"
            ],
            "type": "Travel & Adventure"
          },
          {
            "id": "5cyAmuj6RPcJr5LDUXix",
            "categories": [
              "Sporting Events",
              "Fitness Classes",
              "Yoga & Meditation",
              "Outdoor Activities"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "5dRhfnLw8N5PFawyI9B8",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "5fu1EPTn31g7sFPEci7w",
            "categories": [
              "Travel Expos",
              "Adventure Tours",
              "Backpacking Trips",
              "Cultural Experiences"
            ],
            "type": "Travel & Adventure"
          },
          {
            "id": "5o5WIcpyqJGZKT6p0bJ9",
            "categories": [
              "Science Exhibitions",
              "STEM Workshops",
              "Space & Astronomy",
              "Technology Talks"
            ],
            "type": "Science & Technology"
          },
          {
            "id": "5pax7S8pcvAzLOgNLJIr",
            "categories": [
              "Local Community Events",
              "Environmental Causes",
              "Social Activism",
              "Fundraising for Causes"
            ],
            "type": "Community & Causes"
          },
          {
            "id": "5qdBIcw2FhJhWknx9HuT",
            "categories": [
              "Tech Conferences",
              "Startup Events",
              "Coding Workshops",
              "Tech Expos"
            ],
            "type": "Tech & Innovation"
          },
          {
            "id": "5qrM4pt6j24HUZnxrZK9",
            "categories": [
              "Educational Workshops",
              "Lectures & Talks",
              "Online Courses",
              "Tutoring Services"
            ],
            "type": "Education & Learning"
          },
          {
            "id": "5qwN81o2UaAN97XU3xUq",
            "categories": [
              "Networking Events",
              "Workshops & Seminars",
              "Conferences",
              "Job Fairs"
            ],
            "type": "Networking & Business"
          },
          {
            "id": "5r4J78Xzhkwrj5B7g8kn",
            "categories": [
              "Educational Workshops",
              "Lectures & Talks",
              "Online Courses",
              "Tutoring Services"
            ],
            "type": "Education & Learning"
          },
          {
            "id": "5rT5wtSLCIUVgdB33uFB",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "5sXixqqfyiCZHtvVDtx1",
            "categories": [
              "Educational Workshops",
              "Lectures & Talks",
              "Online Courses",
              "Tutoring Services"
            ],
            "type": "Education & Learning"
          },
          {
            "id": "5voy7IQMIZq0fgA48p07",
            "categories": [
              "Charity Galas",
              "Fundraising Events",
              "Volunteer Opportunities",
              "Community Outreach"
            ],
            "type": "Charity & Fundraising"
          },
          {
            "id": "5wcNV0NBrkHapJN8DFtC",
            "categories": [
              "Home Improvement Workshops",
              "Gardening Classes",
              "Home Shows",
              "DIY Events"
            ],
            "type": "Home & Garden"
          },
          {
            "id": "5xYOcQntSzSNSDaIGS3n",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "60xFbdFseALAcCQeedZe",
            "categories": [
              "Educational Workshops",
              "Lectures & Talks",
              "Online Courses",
              "Tutoring Services"
            ],
            "type": "Education & Learning"
          },
          {
            "id": "665ohqqg7Uu0peEHcYii",
            "categories": [
              "Tech Conferences",
              "Startup Events",
              "Coding Workshops",
              "Tech Expos"
            ],
            "type": "Tech & Innovation"
          },
          {
            "id": "66idK6KiOpPhkmCwXLEi",
            "categories": [
              "Food & Dining",
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Sports & Fitness"
          },
          {
            "id": "67FQ73N0GQuWFtz90Uia",
            "categories": [
              "Charity Galas",
              "Fundraising Events",
              "Volunteer Opportunities",
              "Community Outreach"
            ],
            "type": "Charity & Fundraising"
          },
          {
            "id": "67RooyKRHy2D5qKdLQgK",
            "categories": [
              "Fashion Shows",
              "Beauty Workshops",
              "Pop - Up Boutiques",
              "Makeup Classes"
            ],
            "type": "Fashion & Beauty"
          },
          {
            "id": "6AyTBaOXVBlG3j3pMZQs",
            "categories": [
              "Religious Gatherings",
              "Spiritual Retreats",
              "Meditation Groups",
              "Interfaith Dialogues"
            ],
            "type": "Religion & Spirituality"
          },
          {
            "id": "6C1hTLUlJt2L7IkmFEPL",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "6CeWWQ40osKQBEey66kc",
            "categories": [
              "Science Exhibitions",
              "STEM Workshops",
              "Space & Astronomy",
              "Technology Talks"
            ],
            "type": "Science & Technology"
          },
          {
            "id": "6EOdyyRTnMpfnAW5YCqu",
            "categories": [
              "Educational Workshops",
              "Lectures & Talks",
              "Online Courses",
              "Tutoring Services"
            ],
            "type": "Education & Learning"
          },
          {
            "id": "6HiHziSz5t8SbzeT5MmI",
            "categories": [
              "Science Exhibitions",
              "STEM Workshops",
              "Space & Astronomy",
              "Technology Talks"
            ],
            "type": "Science & Technology"
          },
          {
            "id": "6KjdOLk808bRszdS2PWn",
            "categories": [
              "Charity Galas",
              "Fundraising Events",
              "Volunteer Opportunities",
              "Community Outreach"
            ],
            "type": "Charity & Fundraising"
          },
          {
            "id": "6N6J4p2YtJzyVcfCXs4a",
            "categories": [
              "Pet Adoption Events",
              "Animal Welfare Fundraisers",
              "Pet - Friendly Activities",
              "Zoo Visits"
            ],
            "type": "Pets & Animals"
          },
          {
            "id": "6OVsynspOzQ102Elzg6S",
            "categories": [
              "Family - Friendly Events",
              "Children's Workshops",
              "Kid - Friendly Activities",
              "Amusement Parks"
            ],
            "type": "Family & Kids"
          },
          {
            "id": "6Ouy0jr9FaISRZfOyApe",
            "categories": [
              "Theater Productions",
              "Magic Shows",
              "Stand - Up Comedy",
              "Movie Screenings"
            ],
            "type": "Entertainment & Shows"
          },
          {
            "id": "6RmBQDsDr9LmYaQkJX7E",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "6VMbC4IRXM2g47Cidmqs",
            "categories": [
              "Local Community Events",
              "Environmental Causes",
              "Social Activism",
              "Fundraising for Causes"
            ],
            "type": "Community & Causes"
          },
          {
            "id": "6X5bJwDQbDHo6hgA1WIt",
            "categories": [
              "Food & Dining",
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Sports & Fitness"
          },
          {
            "id": "6Y3Ypnf4Tl4cNejMv76B",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "6YgqBadlQ42CU6xmDtIH",
            "categories": [
              "Charity Galas",
              "Fundraising Events",
              "Volunteer Opportunities",
              "Community Outreach"
            ],
            "type": "Charity & Fundraising"
          },
          {
            "id": "6g1nyHc1XSa6KEJ7JBhW",
            "categories": [
              "Food & Dining",
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Sports & Fitness"
          },
          {
            "id": "6hfaHEn7SLIVsKoLqmph",
            "categories": [
              "Hobbyist Gatherings",
              "Hobby Workshops",
              "Special Interest Groups",
              "Craft Fairs"
            ],
            "type": "Hobbies & Interests"
          },
          {
            "id": "6jBunHR5yq376X8W1V5N",
            "categories": [
              "Food & Dining",
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Sports & Fitness"
          },
          {
            "id": "6oYCTAWU3dgmJCuUMkwF",
            "categories": [
              "Educational Workshops",
              "Lectures & Talks",
              "Online Courses",
              "Tutoring Services"
            ],
            "type": "Education & Learning"
          },
          {
            "id": "6ozdKWseGItheIeyRxqd",
            "categories": [
              "Wellness Retreats",
              "Health Workshops",
              "Mindfulness Events",
              "Medical Seminars"
            ],
            "type": "Health & Wellness"
          },
          {
            "id": "6p440zJ1o9aw8ObOOjnS",
            "categories": [
              "Educational Workshops",
              "Lectures & Talks",
              "Online Courses",
              "Tutoring Services"
            ],
            "type": "Education & Learning"
          },
          {
            "id": "6qlfQiFoe0eEmlxyhFy4",
            "categories": [
              "Food & Dining",
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Sports & Fitness"
          },
          {
            "id": "6u8hZc3TMtXZDiZTa2f0",
            "categories": [
              "Sporting Events",
              "Fitness Classes",
              "Yoga & Meditation",
              "Outdoor Activities"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "6vSihLZOgkXWtzqXP09n",
            "categories": [
              "Wellness Retreats",
              "Health Workshops",
              "Mindfulness Events",
              "Medical Seminars"
            ],
            "type": "Health & Wellness"
          },
          {
            "id": "714E32DMKqb4TISK7cX7",
            "categories": [
              "Religious Gatherings",
              "Spiritual Retreats",
              "Meditation Groups",
              "Interfaith Dialogues"
            ],
            "type": "Religion & Spirituality"
          },
          {
            "id": "72DfblSXOseXaELs6gNI",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "73GBZERfcgmQ8GT0PwTQ",
            "categories": [
              "Family - Friendly Events",
              "Children's Workshops",
              "Kid - Friendly Activities",
              "Amusement Parks"
            ],
            "type": "Family & Kids"
          },
          {
            "id": "76QviILiB1pBX4c1rzvK",
            "categories": [
              "Indian Cuisine",
              "Italian Cuisine",
              "American Fare",
              "Asian Fusion",
              "Mediterranean",
              "Mexican & Tex - Mex",
              "Sushi & Japanese",
              "Chinese Cuisine",
              "French Dining",
              "Vegetarian & Vegan",
              "Seafood Specialties",
              "BBQ & Grill",
              "Steakhouse",
              "Fast Food & Burgers",
              "Cafes & Bakeries",
              "Food Trucks",
              "Fine Dining",
              "Farm - to - Table",
              "Ethnic Eateries"
            ],
            "type": "Food styles"
          },
          {
            "id": "77M7M3QbxBJbr6JFRjQr",
            "categories": [
              "Local Community Events",
              "Environmental Causes",
              "Social Activism",
              "Fundraising for Causes"
            ],
            "type": "Community & Causes"
          },
          {
            "id": "77thkF3crZAcPpxVBczv",
            "categories": [
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Food & Dining"
          },
          {
            "id": "78J986YzyC2e9IYR2ol1",
            "categories": [
              "Sporting Events",
              "Fitness Classes",
              "Yoga & Meditation",
              "Outdoor Activities"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "78wzilKK5ISwzAHDILfq",
            "categories": [
              "Sporting Events",
              "Fitness Classes",
              "Yoga & Meditation",
              "Outdoor Activities"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "79RdozWAOk6BsjFyU2Bl",
            "categories": [
              "Travel Expos",
              "Adventure Tours",
              "Backpacking Trips",
              "Cultural Experiences"
            ],
            "type": "Travel & Adventure"
          },
          {
            "id": "7Bgp6qt8yEnHs402QTI6",
            "categories": [
              "Fashion Shows",
              "Beauty Workshops",
              "Pop - Up Boutiques",
              "Makeup Classes"
            ],
            "type": "Fashion & Beauty"
          },
          {
            "id": "7CBc7lWJf8WzuIQxtve3",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "7CQ99FCq1sxygWvl48HL",
            "categories": [
              "Religious Gatherings",
              "Spiritual Retreats",
              "Meditation Groups",
              "Interfaith Dialogues"
            ],
            "type": "Religion & Spirituality"
          },
          {
            "id": "7CfCsN5UtGMjUlpxpBaM",
            "categories": [
              "Hobbyist Gatherings",
              "Hobby Workshops",
              "Special Interest Groups",
              "Craft Fairs"
            ],
            "type": "Hobbies & Interests"
          },
          {
            "id": "7E6qEb9udSx21ZhlcFWn",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "7EG9VtjSLqt5CcQeBoi0",
            "categories": [
              "Charity Galas",
              "Fundraising Events",
              "Volunteer Opportunities",
              "Community Outreach"
            ],
            "type": "Charity & Fundraising"
          },
          {
            "id": "7HKdGk7qqbHltShb4bUU",
            "categories": [
              "Travel Expos",
              "Adventure Tours",
              "Backpacking Trips",
              "Cultural Experiences"
            ],
            "type": "Travel & Adventure"
          },
          {
            "id": "7NHMtWpYre6EtfeXlPGg",
            "categories": [
              "Pet Adoption Events",
              "Animal Welfare Fundraisers",
              "Pet - Friendly Activities",
              "Zoo Visits"
            ],
            "type": "Pets & Animals"
          },
          {
            "id": "7OsKJL4h5wvGVjldas9O",
            "categories": [
              "Travel Expos",
              "Adventure Tours",
              "Backpacking Trips",
              "Cultural Experiences"
            ],
            "type": "Travel & Adventure"
          },
          {
            "id": "7P6ogG4zoDOtZVfyIKgM",
            "categories": [
              "Charity Galas",
              "Fundraising Events",
              "Volunteer Opportunities",
              "Community Outreach"
            ],
            "type": "Charity & Fundraising"
          },
          {
            "id": "7QmIRKLyCnoOl5yunuPn",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "7S2Sy9bt7E7pa6wfcFlU",
            "categories": [
              "Local Community Events",
              "Environmental Causes",
              "Social Activism",
              "Fundraising for Causes"
            ],
            "type": "Community & Causes"
          },
          {
            "id": "7UlZQb7X6gBDg1Dgz9LF",
            "categories": [
              "Local Community Events",
              "Environmental Causes",
              "Social Activism",
              "Fundraising for Causes"
            ],
            "type": "Community & Causes"
          },
          {
            "id": "7VJ9hUJ5awO5srFJoPSN",
            "categories": [
              "Tech Conferences",
              "Startup Events",
              "Coding Workshops",
              "Tech Expos"
            ],
            "type": "Tech & Innovation"
          },
          {
            "id": "7VaosSQvcXJlIWwUGCmk",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "7ZkMnxhzQA6Iat3rDPeF",
            "categories": [
              "Theater Productions",
              "Magic Shows",
              "Stand - Up Comedy",
              "Movie Screenings"
            ],
            "type": "Entertainment & Shows"
          },
          {
            "id": "7a0styCo4GtRMpiSGgJH",
            "categories": [
              "Sporting Events",
              "Fitness Classes",
              "Yoga & Meditation",
              "Outdoor Activities"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "7bfdeJHnDqhtxsGQxPpC",
            "categories": [
              "Food & Dining",
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Sports & Fitness"
          },
          {
            "id": "7jr1A4aJAvBsF8q4tSCS",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "7mqN5j7brTwYWmCv4hDS",
            "categories": [
              "Fashion Shows",
              "Beauty Workshops",
              "Pop - Up Boutiques",
              "Makeup Classes"
            ],
            "type": "Fashion & Beauty"
          },
          {
            "id": "7nXsypIPU09Did6EayxT",
            "categories": [
              "Sporting Events",
              "Fitness Classes",
              "Yoga & Meditation",
              "Outdoor Activities"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "7o0oUKcSwQ1W0BT0ifv8",
            "categories": [
              "Indian Cuisine",
              "Italian Cuisine",
              "American Fare",
              "Asian Fusion",
              "Mediterranean",
              "Mexican & Tex - Mex",
              "Sushi & Japanese",
              "Chinese Cuisine",
              "French Dining",
              "Vegetarian & Vegan",
              "Seafood Specialties",
              "BBQ & Grill",
              "Steakhouse",
              "Fast Food & Burgers",
              "Cafes & Bakeries",
              "Food Trucks",
              "Fine Dining",
              "Farm - to - Table",
              "Ethnic Eateries"
            ],
            "type": "Food styles"
          },
          {
            "id": "7oPC3gSitiGFNj4uHG7D",
            "categories": [
              "Pet Adoption Events",
              "Animal Welfare Fundraisers",
              "Pet - Friendly Activities",
              "Zoo Visits"
            ],
            "type": "Pets & Animals"
          },
          {
            "id": "7qh5FWEiEd7by2S7W0GV",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "7tzT0zr8bTeGINddQIai",
            "categories": [
              "Wellness Retreats",
              "Health Workshops",
              "Mindfulness Events",
              "Medical Seminars"
            ],
            "type": "Health & Wellness"
          },
          {
            "id": "7uy8DQd9fKlwErfZ7gwc",
            "categories": [
              "Tech Conferences",
              "Startup Events",
              "Coding Workshops",
              "Tech Expos"
            ],
            "type": "Tech & Innovation"
          },
          {
            "id": "7v73aYd9pPGC88h9QG8Z",
            "categories": [
              "Fashion Shows",
              "Beauty Workshops",
              "Pop - Up Boutiques",
              "Makeup Classes"
            ],
            "type": "Fashion & Beauty"
          },
          {
            "id": "7wIg9n8trRzxvgGYzTeN",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "7xofOvwP6pfRNevoJoEh",
            "categories": [
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Food & Dining"
          },
          {
            "id": "81fHcJaAkQRlKI5KMKtx",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "83aE9RcIC9MnbWQ7U7tX",
            "categories": [
              "Science Exhibitions",
              "STEM Workshops",
              "Space & Astronomy",
              "Technology Talks"
            ],
            "type": "Science & Technology"
          },
          {
            "id": "83bGmnVN4WaVHTWq6Kn8",
            "categories": [
              "Networking Events",
              "Workshops & Seminars",
              "Conferences",
              "Job Fairs"
            ],
            "type": "Networking & Business"
          },
          {
            "id": "845HgQdn6nQ8UiOhzYm6",
            "categories": [
              "Home Improvement Workshops",
              "Gardening Classes",
              "Home Shows",
              "DIY Events"
            ],
            "type": "Home & Garden"
          },
          {
            "id": "88fU1WpeDnWzQ72tfSCT",
            "categories": [
              "Charity Galas",
              "Fundraising Events",
              "Volunteer Opportunities",
              "Community Outreach"
            ],
            "type": "Charity & Fundraising"
          },
          {
            "id": "88kULFCMq8anJg7FPCyS",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "8AbQH02V3kphYSVTUFNf",
            "categories": [
              "Pet Adoption Events",
              "Animal Welfare Fundraisers",
              "Pet - Friendly Activities",
              "Zoo Visits"
            ],
            "type": "Pets & Animals"
          },
          {
            "id": "8BYTew0pd6OJa7VDpGTQ",
            "categories": [
              "Theater Productions",
              "Magic Shows",
              "Stand - Up Comedy",
              "Movie Screenings"
            ],
            "type": "Entertainment & Shows"
          },
          {
            "id": "8CfV6ZWP9aXtzRvYEw0F",
            "categories": [
              "Charity Galas",
              "Fundraising Events",
              "Volunteer Opportunities",
              "Community Outreach"
            ],
            "type": "Charity & Fundraising"
          },
          {
            "id": "8FgdOd65N26rciHwbvtt",
            "categories": [
              "Sporting Events",
              "Fitness Classes",
              "Yoga & Meditation",
              "Outdoor Activities"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "8Foa7U43Gx7ruBWAH9f2",
            "categories": [
              "Educational Workshops",
              "Lectures & Talks",
              "Online Courses",
              "Tutoring Services"
            ],
            "type": "Education & Learning"
          },
          {
            "id": "8GLw5hcTb6XMHiEcSVUI",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "8H0GmPGMs46WvlgNxpRa",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "8IHi0l3x3I9e86TB3HbM",
            "categories": [
              "Theater Productions",
              "Magic Shows",
              "Stand - Up Comedy",
              "Movie Screenings"
            ],
            "type": "Entertainment & Shows"
          },
          {
            "id": "8LhwKy1yPVUpqC1I9Fbs",
            "categories": [
              "Hobbyist Gatherings",
              "Hobby Workshops",
              "Special Interest Groups",
              "Craft Fairs"
            ],
            "type": "Hobbies & Interests"
          },
          {
            "id": "8O0mFaDJ7uVzZH2CbooO",
            "categories": [
              "Pet Adoption Events",
              "Animal Welfare Fundraisers",
              "Pet - Friendly Activities",
              "Zoo Visits"
            ],
            "type": "Pets & Animals"
          },
          {
            "id": "8R9Sy7gcgVSjypjReFY5",
            "categories": [
              "Hobbyist Gatherings",
              "Hobby Workshops",
              "Special Interest Groups",
              "Craft Fairs"
            ],
            "type": "Hobbies & Interests"
          },
          {
            "id": "8RC5xkXtsB0EHL5nHVuU",
            "categories": [
              "Travel Expos",
              "Adventure Tours",
              "Backpacking Trips",
              "Cultural Experiences"
            ],
            "type": "Travel & Adventure"
          },
          {
            "id": "8XNKFMp49HcXMGIS2ZRP",
            "categories": [
              "Hobbyist Gatherings",
              "Hobby Workshops",
              "Special Interest Groups",
              "Craft Fairs"
            ],
            "type": "Hobbies & Interests"
          },
          {
            "id": "8XNqsDxBX1tPBbgKNBcl",
            "categories": [
              "Indian Cuisine",
              "Italian Cuisine",
              "American Fare",
              "Asian Fusion",
              "Mediterranean",
              "Mexican & Tex - Mex",
              "Sushi & Japanese",
              "Chinese Cuisine",
              "French Dining",
              "Vegetarian & Vegan",
              "Seafood Specialties",
              "BBQ & Grill",
              "Steakhouse",
              "Fast Food & Burgers",
              "Cafes & Bakeries",
              "Food Trucks",
              "Fine Dining",
              "Farm - to - Table",
              "Ethnic Eateries"
            ],
            "type": "Food styles"
          },
          {
            "id": "8YCS75P6rxtqcbhz7IeK",
            "categories": [
              "Pet Adoption Events",
              "Animal Welfare Fundraisers",
              "Pet - Friendly Activities",
              "Zoo Visits"
            ],
            "type": "Pets & Animals"
          },
          {
            "id": "8d6vlGijf1MViF9aTMQe",
            "categories": [
              "Religious Gatherings",
              "Spiritual Retreats",
              "Meditation Groups",
              "Interfaith Dialogues"
            ],
            "type": "Religion & Spirituality"
          },
          {
            "id": "8dg5zBBiYAi9moI3s6VC",
            "categories": [
              "Charity Galas",
              "Fundraising Events",
              "Volunteer Opportunities",
              "Community Outreach"
            ],
            "type": "Charity & Fundraising"
          },
          {
            "id": "8dsoTi3CsaO2T1ddrf8K",
            "categories": [
              "Hobbyist Gatherings",
              "Hobby Workshops",
              "Special Interest Groups",
              "Craft Fairs"
            ],
            "type": "Hobbies & Interests"
          },
          {
            "id": "8e3vMFP02uUBl2y1EgcT",
            "categories": [
              "Indian Cuisine",
              "Italian Cuisine",
              "American Fare",
              "Asian Fusion",
              "Mediterranean",
              "Mexican & Tex - Mex",
              "Sushi & Japanese",
              "Chinese Cuisine",
              "French Dining",
              "Vegetarian & Vegan",
              "Seafood Specialties",
              "BBQ & Grill",
              "Steakhouse",
              "Fast Food & Burgers",
              "Cafes & Bakeries",
              "Food Trucks",
              "Fine Dining",
              "Farm - to - Table",
              "Ethnic Eateries"
            ],
            "type": "Food styles"
          },
          {
            "id": "8eOsOBb9kg8YJ7bLY1GA",
            "categories": [
              "Sporting Events",
              "Fitness Classes",
              "Yoga & Meditation",
              "Outdoor Activities"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "8eYwtmxjH4uTLpKtUzR0",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "8gQbB6FEisxtCMSru7dl",
            "categories": [
              "Networking Events",
              "Workshops & Seminars",
              "Conferences",
              "Job Fairs"
            ],
            "type": "Networking & Business"
          },
          {
            "id": "8gd3CiTiTsWcwwepmgik",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "8gyo3xPm2tpVg9PhO3k5",
            "categories": [
              "Pet Adoption Events",
              "Animal Welfare Fundraisers",
              "Pet - Friendly Activities",
              "Zoo Visits"
            ],
            "type": "Pets & Animals"
          },
          {
            "id": "8iwpDav5M6D8CShOAJj6",
            "categories": [
              "Food & Dining",
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Sports & Fitness"
          },
          {
            "id": "8jT3jM3MSIObgHiPXHsJ",
            "categories": [
              "Local Community Events",
              "Environmental Causes",
              "Social Activism",
              "Fundraising for Causes"
            ],
            "type": "Community & Causes"
          },
          {
            "id": "8kZAI49pnniJE1HcM45a",
            "categories": [
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Food & Dining"
          },
          {
            "id": "8mNi5dEBCkt7cnpzJX9O",
            "categories": [
              "Hobbyist Gatherings",
              "Hobby Workshops",
              "Special Interest Groups",
              "Craft Fairs"
            ],
            "type": "Hobbies & Interests"
          },
          {
            "id": "8pVMtoUVN16twSDenTGB",
            "categories": [
              "Food & Dining",
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Sports & Fitness"
          },
          {
            "id": "8peb32x7wOSfOs1trgGl",
            "categories": [
              "Tech Conferences",
              "Startup Events",
              "Coding Workshops",
              "Tech Expos"
            ],
            "type": "Tech & Innovation"
          },
          {
            "id": "8puAJw6P2pMQ3QCpm8EG",
            "categories": [
              "Charity Galas",
              "Fundraising Events",
              "Volunteer Opportunities",
              "Community Outreach"
            ],
            "type": "Charity & Fundraising"
          },
          {
            "id": "8pvhkv0fJgcqITrMSKzw",
            "categories": [
              "Sporting Events",
              "Fitness Classes",
              "Yoga & Meditation",
              "Outdoor Activities"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "8rsME7d0S3U5FEwFMMgv",
            "categories": [
              "Hobbyist Gatherings",
              "Hobby Workshops",
              "Special Interest Groups",
              "Craft Fairs"
            ],
            "type": "Hobbies & Interests"
          },
          {
            "id": "8sh7Wftleiz87rXIbb0A",
            "categories": [
              "Wellness Retreats",
              "Health Workshops",
              "Mindfulness Events",
              "Medical Seminars"
            ],
            "type": "Health & Wellness"
          },
          {
            "id": "8tjkun9Ui5s5dZ6Hwloe",
            "categories": [
              "Sporting Events",
              "Fitness Classes",
              "Yoga & Meditation",
              "Outdoor Activities"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "8vNq6Oa154867gAr7jRC",
            "categories": [
              "Wellness Retreats",
              "Health Workshops",
              "Mindfulness Events",
              "Medical Seminars"
            ],
            "type": "Health & Wellness"
          },
          {
            "id": "8vWNJg2XQYOqDCNSV8OT",
            "categories": [
              "Religious Gatherings",
              "Spiritual Retreats",
              "Meditation Groups",
              "Interfaith Dialogues"
            ],
            "type": "Religion & Spirituality"
          },
          {
            "id": "8vaNOsPaFXCnkHMx6jx9",
            "categories": [
              "Fashion Shows",
              "Beauty Workshops",
              "Pop - Up Boutiques",
              "Makeup Classes"
            ],
            "type": "Fashion & Beauty"
          },
          {
            "id": "8xlF2gQXidGJrh8PcP3y",
            "categories": [
              "Wellness Retreats",
              "Health Workshops",
              "Mindfulness Events",
              "Medical Seminars"
            ],
            "type": "Health & Wellness"
          },
          {
            "id": "8xmv2yWA8In9lgD6JlTP",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "8zRMwK5n1oK2ETjctzhP",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "92E5i792GV6jQ59F04gd",
            "categories": [
              "Sporting Events",
              "Fitness Classes",
              "Yoga & Meditation",
              "Outdoor Activities"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "92ai0bY0fGY5pbEqOkhD",
            "categories": [
              "Indian Cuisine",
              "Italian Cuisine",
              "American Fare",
              "Asian Fusion",
              "Mediterranean",
              "Mexican & Tex - Mex",
              "Sushi & Japanese",
              "Chinese Cuisine",
              "French Dining",
              "Vegetarian & Vegan",
              "Seafood Specialties",
              "BBQ & Grill",
              "Steakhouse",
              "Fast Food & Burgers",
              "Cafes & Bakeries",
              "Food Trucks",
              "Fine Dining",
              "Farm - to - Table",
              "Ethnic Eateries"
            ],
            "type": "Food styles"
          },
          {
            "id": "92mGIIzovmpzDSTg1h0A",
            "categories": [
              "Local Community Events",
              "Environmental Causes",
              "Social Activism",
              "Fundraising for Causes"
            ],
            "type": "Community & Causes"
          },
          {
            "id": "96CHKuEbDvMULRqPHG0w",
            "categories": [
              "Charity Galas",
              "Fundraising Events",
              "Volunteer Opportunities",
              "Community Outreach"
            ],
            "type": "Charity & Fundraising"
          },
          {
            "id": "97H4TpL1kBHtdNieRs5P",
            "categories": [
              "Tech Conferences",
              "Startup Events",
              "Coding Workshops",
              "Tech Expos"
            ],
            "type": "Tech & Innovation"
          },
          {
            "id": "9CqKFbwavfQ6UXfeqCT7",
            "categories": [
              "Family - Friendly Events",
              "Children's Workshops",
              "Kid - Friendly Activities",
              "Amusement Parks"
            ],
            "type": "Family & Kids"
          },
          {
            "id": "9JEiDhAYDJR1IRO1rSYx",
            "categories": [
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Food & Dining"
          },
          {
            "id": "9K3TDPiu8jL56uAPlMA9",
            "categories": [
              "Family - Friendly Events",
              "Children's Workshops",
              "Kid - Friendly Activities",
              "Amusement Parks"
            ],
            "type": "Family & Kids"
          },
          {
            "id": "9Kuii4MrQ7GLQE74SUDn",
            "categories": [
              "Local Community Events",
              "Environmental Causes",
              "Social Activism",
              "Fundraising for Causes"
            ],
            "type": "Community & Causes"
          },
          {
            "id": "9LCbfpi6F7NFCGsL9ZcM",
            "categories": [
              "Travel Expos",
              "Adventure Tours",
              "Backpacking Trips",
              "Cultural Experiences"
            ],
            "type": "Travel & Adventure"
          },
          {
            "id": "9OhstshfFq2KAakNKPPl",
            "categories": [
              "Sporting Events",
              "Fitness Classes",
              "Yoga & Meditation",
              "Outdoor Activities"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "9REUkEOwFp5a5VRHATpB",
            "categories": [
              "Travel Expos",
              "Adventure Tours",
              "Backpacking Trips",
              "Cultural Experiences"
            ],
            "type": "Travel & Adventure"
          },
          {
            "id": "9Sq8ojQcoY7slG9QlN2P",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "9TtjrrwLOzzoOK54H6hv",
            "categories": [
              "Charity Galas",
              "Fundraising Events",
              "Volunteer Opportunities",
              "Community Outreach"
            ],
            "type": "Charity & Fundraising"
          },
          {
            "id": "9VCLR1ktI8p8U64zjxIv",
            "categories": [
              "Religious Gatherings",
              "Spiritual Retreats",
              "Meditation Groups",
              "Interfaith Dialogues"
            ],
            "type": "Religion & Spirituality"
          },
          {
            "id": "9WoVMDdZwECLieNYj5F3",
            "categories": [
              "Food & Dining",
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Sports & Fitness"
          },
          {
            "id": "9Yer2y6iNxEGYmGg2HLD",
            "categories": [
              "Theater Productions",
              "Magic Shows",
              "Stand - Up Comedy",
              "Movie Screenings"
            ],
            "type": "Entertainment & Shows"
          },
          {
            "id": "9ZRvZarqMuGJ5CLc5wwB",
            "categories": [
              "Sporting Events",
              "Fitness Classes",
              "Yoga & Meditation",
              "Outdoor Activities"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "9b27VhfNRgx2Wm4eaxtK",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "9ce4wvTUd2264rAhw8iV",
            "categories": [
              "Educational Workshops",
              "Lectures & Talks",
              "Online Courses",
              "Tutoring Services"
            ],
            "type": "Education & Learning"
          },
          {
            "id": "9gCF1Ou5DfpNwmoVMVsH",
            "categories": [
              "Travel Expos",
              "Adventure Tours",
              "Backpacking Trips",
              "Cultural Experiences"
            ],
            "type": "Travel & Adventure"
          },
          {
            "id": "9ir1LTxkemeSXg5D6vJT",
            "categories": [
              "Charity Galas",
              "Fundraising Events",
              "Volunteer Opportunities",
              "Community Outreach"
            ],
            "type": "Charity & Fundraising"
          },
          {
            "id": "9jbfqAQVYc57gZfpS7ZF",
            "categories": [
              "Fashion Shows",
              "Beauty Workshops",
              "Pop - Up Boutiques",
              "Makeup Classes"
            ],
            "type": "Fashion & Beauty"
          },
          {
            "id": "9jfU6cqZspqeL6jgQeTj",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "9jwr5MNhsBDLwxwx75aH",
            "categories": [
              "Educational Workshops",
              "Lectures & Talks",
              "Online Courses",
              "Tutoring Services"
            ],
            "type": "Education & Learning"
          },
          {
            "id": "9lMW5cqhNkjCnB52PtLh",
            "categories": [
              "Educational Workshops",
              "Lectures & Talks",
              "Online Courses",
              "Tutoring Services"
            ],
            "type": "Education & Learning"
          },
          {
            "id": "9n8G3cndeqLDUkkNIY00",
            "categories": [
              "Networking Events",
              "Workshops & Seminars",
              "Conferences",
              "Job Fairs"
            ],
            "type": "Networking & Business"
          },
          {
            "id": "9oTuwPmQpW76m5oyJ33h",
            "categories": [
              "Fashion Shows",
              "Beauty Workshops",
              "Pop - Up Boutiques",
              "Makeup Classes"
            ],
            "type": "Fashion & Beauty"
          },
          {
            "id": "9rkWPx5GV4ve2YmdSF7w",
            "categories": [
              "Food & Dining",
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Sports & Fitness"
          },
          {
            "id": "9vJOgedNEtdsBxwLhOMH",
            "categories": [
              "Hobbyist Gatherings",
              "Hobby Workshops",
              "Special Interest Groups",
              "Craft Fairs"
            ],
            "type": "Hobbies & Interests"
          },
          {
            "id": "9vYl3z1p6hQ6Ddoe56uv",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "9xup41wFmNQ2RyMMLs4Z",
            "categories": [
              "Food & Dining",
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Sports & Fitness"
          },
          {
            "id": "9yRJN1Nyj0qYcCxO44Au",
            "categories": [
              "Travel Expos",
              "Adventure Tours",
              "Backpacking Trips",
              "Cultural Experiences"
            ],
            "type": "Travel & Adventure"
          },
          {
            "id": "9ylleUMMKYuaFm7xKnGr",
            "categories": [
              "Sporting Events",
              "Fitness Classes",
              "Yoga & Meditation",
              "Outdoor Activities"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "9z1345eXsS7lMJFqXCSj",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "A1AJRzc7Xd2l9aSCSeCw",
            "categories": [
              "Wellness Retreats",
              "Health Workshops",
              "Mindfulness Events",
              "Medical Seminars"
            ],
            "type": "Health & Wellness"
          },
          {
            "id": "A3wRjYh8zJYHIy1SKSGJ",
            "categories": [
              "Wellness Retreats",
              "Health Workshops",
              "Mindfulness Events",
              "Medical Seminars"
            ],
            "type": "Health & Wellness"
          },
          {
            "id": "A7NZN0jKOX6toCWpfnCi",
            "categories": [
              "Charity Galas",
              "Fundraising Events",
              "Volunteer Opportunities",
              "Community Outreach"
            ],
            "type": "Charity & Fundraising"
          },
          {
            "id": "AIXnrpaOk7GJewFTif3I",
            "categories": [
              "Theater Productions",
              "Magic Shows",
              "Stand - Up Comedy",
              "Movie Screenings"
            ],
            "type": "Entertainment & Shows"
          },
          {
            "id": "AIo2iihtHkDDpaCrMOpa",
            "categories": [
              "Local Community Events",
              "Environmental Causes",
              "Social Activism",
              "Fundraising for Causes"
            ],
            "type": "Community & Causes"
          },
          {
            "id": "AKqcnMBe8EXRO4DH8HK0",
            "categories": [
              "Food & Dining",
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Sports & Fitness"
          },
          {
            "id": "AKsuStnsYLNFvtBG07ZY",
            "categories": [
              "Networking Events",
              "Workshops & Seminars",
              "Conferences",
              "Job Fairs"
            ],
            "type": "Networking & Business"
          },
          {
            "id": "ANLK64sa6FMduZlo5EBW",
            "categories": [
              "Sporting Events",
              "Fitness Classes",
              "Yoga & Meditation",
              "Outdoor Activities"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "AQ0Ur5zbK9HF07CNB5Ir",
            "categories": [
              "Fashion Shows",
              "Beauty Workshops",
              "Pop - Up Boutiques",
              "Makeup Classes"
            ],
            "type": "Fashion & Beauty"
          },
          {
            "id": "AR0QstaG5eiKiDu3uXU0",
            "categories": [
              "Theater Productions",
              "Magic Shows",
              "Stand - Up Comedy",
              "Movie Screenings"
            ],
            "type": "Entertainment & Shows"
          },
          {
            "id": "ARrnl6lMHznTftvpt2KB",
            "categories": [
              "Theater Productions",
              "Magic Shows",
              "Stand - Up Comedy",
              "Movie Screenings"
            ],
            "type": "Entertainment & Shows"
          },
          {
            "id": "ATYmlWL7PFkmORjtLqhX",
            "categories": [
              "Networking Events",
              "Workshops & Seminars",
              "Conferences",
              "Job Fairs"
            ],
            "type": "Networking & Business"
          },
          {
            "id": "ATxHOcAcF475sTou0Yxu",
            "categories": [
              "Networking Events",
              "Workshops & Seminars",
              "Conferences",
              "Job Fairs"
            ],
            "type": "Networking & Business"
          },
          {
            "id": "AUOx0m1awQsZ9LCI2xFN",
            "categories": [
              "Charity Galas",
              "Fundraising Events",
              "Volunteer Opportunities",
              "Community Outreach"
            ],
            "type": "Charity & Fundraising"
          },
          {
            "id": "AWbGOQSujIsj44WTQcSv",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "AWp2V71kTzKVlIKTbaHW",
            "categories": [
              "Hobbyist Gatherings",
              "Hobby Workshops",
              "Special Interest Groups",
              "Craft Fairs"
            ],
            "type": "Hobbies & Interests"
          },
          {
            "id": "AYdgLGZ8rd9nMSec7YKf",
            "categories": [
              "Sporting Events",
              "Fitness Classes",
              "Yoga & Meditation",
              "Outdoor Activities"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "AbbiI0Kn7GcoEZoG8BDC",
            "categories": [
              "Educational Workshops",
              "Lectures & Talks",
              "Online Courses",
              "Tutoring Services"
            ],
            "type": "Education & Learning"
          },
          {
            "id": "AdKtJTYVCO3Pzt5GE0tk",
            "categories": [
              "Home Improvement Workshops",
              "Gardening Classes",
              "Home Shows",
              "DIY Events"
            ],
            "type": "Home & Garden"
          },
          {
            "id": "AiKTp17ObwA8VuiHjjzl",
            "categories": [
              "Indian Cuisine",
              "Italian Cuisine",
              "American Fare",
              "Asian Fusion",
              "Mediterranean",
              "Mexican & Tex - Mex",
              "Sushi & Japanese",
              "Chinese Cuisine",
              "French Dining",
              "Vegetarian & Vegan",
              "Seafood Specialties",
              "BBQ & Grill",
              "Steakhouse",
              "Fast Food & Burgers",
              "Cafes & Bakeries",
              "Food Trucks",
              "Fine Dining",
              "Farm - to - Table",
              "Ethnic Eateries"
            ],
            "type": "Food styles"
          },
          {
            "id": "AjH0SNRNMpTDlJOZ5nGN",
            "categories": [
              "Local Community Events",
              "Environmental Causes",
              "Social Activism",
              "Fundraising for Causes"
            ],
            "type": "Community & Causes"
          },
          {
            "id": "AjzlnSrbbUvgt2AG18QW",
            "categories": [
              "Pet Adoption Events",
              "Animal Welfare Fundraisers",
              "Pet - Friendly Activities",
              "Zoo Visits"
            ],
            "type": "Pets & Animals"
          },
          {
            "id": "AkVZNE7ORK7BabTlBQA3",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "AnpIY6FzZOvtMSskorfl",
            "categories": [
              "Pet Adoption Events",
              "Animal Welfare Fundraisers",
              "Pet - Friendly Activities",
              "Zoo Visits"
            ],
            "type": "Pets & Animals"
          },
          {
            "id": "Aoykix2dbnTxySpXYXAL",
            "categories": [
              "Food & Dining",
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Sports & Fitness"
          },
          {
            "id": "ApL0w5UuVuKU1P3rsw1t",
            "categories": [
              "Tech Conferences",
              "Startup Events",
              "Coding Workshops",
              "Tech Expos"
            ],
            "type": "Tech & Innovation"
          },
          {
            "id": "ApL8rpitcRiks8fTsmQz",
            "categories": [
              "Indian Cuisine",
              "Italian Cuisine",
              "American Fare",
              "Asian Fusion",
              "Mediterranean",
              "Mexican & Tex - Mex",
              "Sushi & Japanese",
              "Chinese Cuisine",
              "French Dining",
              "Vegetarian & Vegan",
              "Seafood Specialties",
              "BBQ & Grill",
              "Steakhouse",
              "Fast Food & Burgers",
              "Cafes & Bakeries",
              "Food Trucks",
              "Fine Dining",
              "Farm - to - Table",
              "Ethnic Eateries"
            ],
            "type": "Food styles"
          },
          {
            "id": "Aqwp10qoK6l4LDfDElrm",
            "categories": [
              "Networking Events",
              "Workshops & Seminars",
              "Conferences",
              "Job Fairs"
            ],
            "type": "Networking & Business"
          },
          {
            "id": "ArO2uc4st3bDB0yKPFcc",
            "categories": [
              "Educational Workshops",
              "Lectures & Talks",
              "Online Courses",
              "Tutoring Services"
            ],
            "type": "Education & Learning"
          },
          {
            "id": "At7gIPhYNxbMYKmXkONk",
            "categories": [
              "Networking Events",
              "Workshops & Seminars",
              "Conferences",
              "Job Fairs"
            ],
            "type": "Networking & Business"
          },
          {
            "id": "Aulp76mN3p8Yea5YKnnA",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "AxMZpgKQyEsgxVbHNU98",
            "categories": [
              "Family - Friendly Events",
              "Children's Workshops",
              "Kid - Friendly Activities",
              "Amusement Parks"
            ],
            "type": "Family & Kids"
          },
          {
            "id": "B0mkFNnr01PQZob4xCej",
            "categories": [
              "Religious Gatherings",
              "Spiritual Retreats",
              "Meditation Groups",
              "Interfaith Dialogues"
            ],
            "type": "Religion & Spirituality"
          },
          {
            "id": "B15YmpzPYybWCM3jXWKF",
            "categories": [
              "Fashion Shows",
              "Beauty Workshops",
              "Pop - Up Boutiques",
              "Makeup Classes"
            ],
            "type": "Fashion & Beauty"
          },
          {
            "id": "B1t2l0D0FNdGPhVtZHeE",
            "categories": [
              "Tech Conferences",
              "Startup Events",
              "Coding Workshops",
              "Tech Expos"
            ],
            "type": "Tech & Innovation"
          },
          {
            "id": "B5ubjWZJ39oUXW4jBpTT",
            "categories": [
              "Religious Gatherings",
              "Spiritual Retreats",
              "Meditation Groups",
              "Interfaith Dialogues"
            ],
            "type": "Religion & Spirituality"
          },
          {
            "id": "B6SnVVCpabMDwdhkKsRL",
            "categories": [
              "Wellness Retreats",
              "Health Workshops",
              "Mindfulness Events",
              "Medical Seminars"
            ],
            "type": "Health & Wellness"
          },
          {
            "id": "B85JK2sGaPDKm9rYq5E5",
            "categories": [
              "Networking Events",
              "Workshops & Seminars",
              "Conferences",
              "Job Fairs"
            ],
            "type": "Networking & Business"
          },
          {
            "id": "BA135NVsEy0iA94XOmdw",
            "categories": [
              "Home Improvement Workshops",
              "Gardening Classes",
              "Home Shows",
              "DIY Events"
            ],
            "type": "Home & Garden"
          },
          {
            "id": "BCPjtvDj1CIgwSBlUpp4",
            "categories": [
              "Home Improvement Workshops",
              "Gardening Classes",
              "Home Shows",
              "DIY Events"
            ],
            "type": "Home & Garden"
          },
          {
            "id": "BDVMoxMo1iGrEhlOjZqr",
            "categories": [
              "Travel Expos",
              "Adventure Tours",
              "Backpacking Trips",
              "Cultural Experiences"
            ],
            "type": "Travel & Adventure"
          },
          {
            "id": "BDrpjgBMD3xmn44os7hU",
            "categories": [
              "Hobbyist Gatherings",
              "Hobby Workshops",
              "Special Interest Groups",
              "Craft Fairs"
            ],
            "type": "Hobbies & Interests"
          },
          {
            "id": "BFSxakCv9RcEXcZ4bysQ",
            "categories": [
              "Indian Cuisine",
              "Italian Cuisine",
              "American Fare",
              "Asian Fusion",
              "Mediterranean",
              "Mexican & Tex - Mex",
              "Sushi & Japanese",
              "Chinese Cuisine",
              "French Dining",
              "Vegetarian & Vegan",
              "Seafood Specialties",
              "BBQ & Grill",
              "Steakhouse",
              "Fast Food & Burgers",
              "Cafes & Bakeries",
              "Food Trucks",
              "Fine Dining",
              "Farm - to - Table",
              "Ethnic Eateries"
            ],
            "type": "Food styles"
          },
          {
            "id": "BI5HqLFhdq6XwgUc2mEG",
            "categories": [
              "Religious Gatherings",
              "Spiritual Retreats",
              "Meditation Groups",
              "Interfaith Dialogues"
            ],
            "type": "Religion & Spirituality"
          },
          {
            "id": "BL9jo4hzjoDEfA5l3fG5",
            "categories": [
              "Travel Expos",
              "Adventure Tours",
              "Backpacking Trips",
              "Cultural Experiences"
            ],
            "type": "Travel & Adventure"
          },
          {
            "id": "BLjbQsNdgppe4lGbqqrd",
            "categories": [
              "Theater Productions",
              "Magic Shows",
              "Stand - Up Comedy",
              "Movie Screenings"
            ],
            "type": "Entertainment & Shows"
          },
          {
            "id": "BNEUmGHn3x146Db96ypc",
            "categories": [
              "Indian Cuisine",
              "Italian Cuisine",
              "American Fare",
              "Asian Fusion",
              "Mediterranean",
              "Mexican & Tex - Mex",
              "Sushi & Japanese",
              "Chinese Cuisine",
              "French Dining",
              "Vegetarian & Vegan",
              "Seafood Specialties",
              "BBQ & Grill",
              "Steakhouse",
              "Fast Food & Burgers",
              "Cafes & Bakeries",
              "Food Trucks",
              "Fine Dining",
              "Farm - to - Table",
              "Ethnic Eateries"
            ],
            "type": "Food styles"
          },
          {
            "id": "BO0hACFJMxkd3zqYg8BM",
            "categories": [
              "Indian Cuisine",
              "Italian Cuisine",
              "American Fare",
              "Asian Fusion",
              "Mediterranean",
              "Mexican & Tex - Mex",
              "Sushi & Japanese",
              "Chinese Cuisine",
              "French Dining",
              "Vegetarian & Vegan",
              "Seafood Specialties",
              "BBQ & Grill",
              "Steakhouse",
              "Fast Food & Burgers",
              "Cafes & Bakeries",
              "Food Trucks",
              "Fine Dining",
              "Farm - to - Table",
              "Ethnic Eateries"
            ],
            "type": "Food styles"
          },
          {
            "id": "BOPrBuLCS61Qr4H90d3C",
            "categories": [
              "Pet Adoption Events",
              "Animal Welfare Fundraisers",
              "Pet - Friendly Activities",
              "Zoo Visits"
            ],
            "type": "Pets & Animals"
          },
          {
            "id": "BQfCLI2BdQFoLslixbL9",
            "categories": [
              "Religious Gatherings",
              "Spiritual Retreats",
              "Meditation Groups",
              "Interfaith Dialogues"
            ],
            "type": "Religion & Spirituality"
          },
          {
            "id": "BRDNEmmqbHsJH1sGNCVW",
            "categories": [
              "Family - Friendly Events",
              "Children's Workshops",
              "Kid - Friendly Activities",
              "Amusement Parks"
            ],
            "type": "Family & Kids"
          },
          {
            "id": "BRSViB7x7WazQOyeR8yh",
            "categories": [
              "Indian Cuisine",
              "Italian Cuisine",
              "American Fare",
              "Asian Fusion",
              "Mediterranean",
              "Mexican & Tex - Mex",
              "Sushi & Japanese",
              "Chinese Cuisine",
              "French Dining",
              "Vegetarian & Vegan",
              "Seafood Specialties",
              "BBQ & Grill",
              "Steakhouse",
              "Fast Food & Burgers",
              "Cafes & Bakeries",
              "Food Trucks",
              "Fine Dining",
              "Farm - to - Table",
              "Ethnic Eateries"
            ],
            "type": "Food styles"
          },
          {
            "id": "BUmoJCIyW6gU1E1d6sP3",
            "categories": [
              "Educational Workshops",
              "Lectures & Talks",
              "Online Courses",
              "Tutoring Services"
            ],
            "type": "Education & Learning"
          },
          {
            "id": "BVll9PYGC0NfJsdokdYT",
            "categories": [
              "Religious Gatherings",
              "Spiritual Retreats",
              "Meditation Groups",
              "Interfaith Dialogues"
            ],
            "type": "Religion & Spirituality"
          },
          {
            "id": "BZ4RRRCpMhY1qo2xuJuN",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "BaJP1aLAkSaoq9fVIqax",
            "categories": [
              "Sporting Events",
              "Fitness Classes",
              "Yoga & Meditation",
              "Outdoor Activities"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "BcMtHL0uPz2bn8IcaNqF",
            "categories": [
              "Science Exhibitions",
              "STEM Workshops",
              "Space & Astronomy",
              "Technology Talks"
            ],
            "type": "Science & Technology"
          },
          {
            "id": "Bft3rxFNU2M8UIHLNmMm",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "BfxKKeYFuXP9gbvx08P1",
            "categories": [
              "Indian Cuisine",
              "Italian Cuisine",
              "American Fare",
              "Asian Fusion",
              "Mediterranean",
              "Mexican & Tex - Mex",
              "Sushi & Japanese",
              "Chinese Cuisine",
              "French Dining",
              "Vegetarian & Vegan",
              "Seafood Specialties",
              "BBQ & Grill",
              "Steakhouse",
              "Fast Food & Burgers",
              "Cafes & Bakeries",
              "Food Trucks",
              "Fine Dining",
              "Farm - to - Table",
              "Ethnic Eateries"
            ],
            "type": "Food styles"
          },
          {
            "id": "BhaIxEoVxQty8adoaMpq",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "BibfvcCGgwSHWTai64JY",
            "categories": [
              "Fashion Shows",
              "Beauty Workshops",
              "Pop - Up Boutiques",
              "Makeup Classes"
            ],
            "type": "Fashion & Beauty"
          },
          {
            "id": "BjQGarWzoz9ASDbyR98s",
            "categories": [
              "Indian Cuisine",
              "Italian Cuisine",
              "American Fare",
              "Asian Fusion",
              "Mediterranean",
              "Mexican & Tex - Mex",
              "Sushi & Japanese",
              "Chinese Cuisine",
              "French Dining",
              "Vegetarian & Vegan",
              "Seafood Specialties",
              "BBQ & Grill",
              "Steakhouse",
              "Fast Food & Burgers",
              "Cafes & Bakeries",
              "Food Trucks",
              "Fine Dining",
              "Farm - to - Table",
              "Ethnic Eateries"
            ],
            "type": "Food styles"
          },
          {
            "id": "BkuEV0WFjzDBUaFDJHHS",
            "categories": [
              "Food & Dining",
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Sports & Fitness"
          },
          {
            "id": "BlbwxqmZo4AfJK00S8ME",
            "categories": [
              "Family - Friendly Events",
              "Children's Workshops",
              "Kid - Friendly Activities",
              "Amusement Parks"
            ],
            "type": "Family & Kids"
          },
          {
            "id": "BlfsrxEJO4BKrjJ63PC8",
            "categories": [
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Food & Dining"
          },
          {
            "id": "BlvR25NhyMHLQxeVpQaN",
            "categories": [
              "Fashion Shows",
              "Beauty Workshops",
              "Pop - Up Boutiques",
              "Makeup Classes"
            ],
            "type": "Fashion & Beauty"
          },
          {
            "id": "BnAAPXnZa1NhGgi2ZpZl",
            "categories": [
              "Fashion Shows",
              "Beauty Workshops",
              "Pop - Up Boutiques",
              "Makeup Classes"
            ],
            "type": "Fashion & Beauty"
          },
          {
            "id": "Bpp2T1RZXTOg7RZ7u4pD",
            "categories": [
              "Family - Friendly Events",
              "Children's Workshops",
              "Kid - Friendly Activities",
              "Amusement Parks"
            ],
            "type": "Family & Kids"
          },
          {
            "id": "BqdOaGwyuhBr4bItcidp",
            "categories": [
              "Local Community Events",
              "Environmental Causes",
              "Social Activism",
              "Fundraising for Causes"
            ],
            "type": "Community & Causes"
          },
          {
            "id": "BsBSX2UkVWSSAjkMaXRd",
            "categories": [
              "Hobbyist Gatherings",
              "Hobby Workshops",
              "Special Interest Groups",
              "Craft Fairs"
            ],
            "type": "Hobbies & Interests"
          },
          {
            "id": "BuMJOWSElAM6J3ve200h",
            "categories": [
              "Family - Friendly Events",
              "Children's Workshops",
              "Kid - Friendly Activities",
              "Amusement Parks"
            ],
            "type": "Family & Kids"
          },
          {
            "id": "Busj5FbZUO1mmJECypUu",
            "categories": [
              "Home Improvement Workshops",
              "Gardening Classes",
              "Home Shows",
              "DIY Events"
            ],
            "type": "Home & Garden"
          },
          {
            "id": "Buub7G4fCdpWSf8A683O",
            "categories": [
              "Hobbyist Gatherings",
              "Hobby Workshops",
              "Special Interest Groups",
              "Craft Fairs"
            ],
            "type": "Hobbies & Interests"
          },
          {
            "id": "BwDS1bhE3AggJEz7ebSq",
            "categories": [
              "Indian Cuisine",
              "Italian Cuisine",
              "American Fare",
              "Asian Fusion",
              "Mediterranean",
              "Mexican & Tex - Mex",
              "Sushi & Japanese",
              "Chinese Cuisine",
              "French Dining",
              "Vegetarian & Vegan",
              "Seafood Specialties",
              "BBQ & Grill",
              "Steakhouse",
              "Fast Food & Burgers",
              "Cafes & Bakeries",
              "Food Trucks",
              "Fine Dining",
              "Farm - to - Table",
              "Ethnic Eateries"
            ],
            "type": "Food styles"
          },
          {
            "id": "BwLICWiTRG1guzUt8j0Z",
            "categories": [
              "Home Improvement Workshops",
              "Gardening Classes",
              "Home Shows",
              "DIY Events"
            ],
            "type": "Home & Garden"
          },
          {
            "id": "BwREKOaq35Y5LXnO9d8Q",
            "categories": [
              "Tech Conferences",
              "Startup Events",
              "Coding Workshops",
              "Tech Expos"
            ],
            "type": "Tech & Innovation"
          },
          {
            "id": "Bwm8n64VkTnMVkAA2oUz",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "BwwciMNGLyAn29qDf49H",
            "categories": [
              "Food & Dining",
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Sports & Fitness"
          },
          {
            "id": "BzOm4h2kJibF96oq9xcA",
            "categories": [
              "Charity Galas",
              "Fundraising Events",
              "Volunteer Opportunities",
              "Community Outreach"
            ],
            "type": "Charity & Fundraising"
          },
          {
            "id": "C0zwBFzS30peYdI5Fa7H",
            "categories": [
              "Hobbyist Gatherings",
              "Hobby Workshops",
              "Special Interest Groups",
              "Craft Fairs"
            ],
            "type": "Hobbies & Interests"
          },
          {
            "id": "C2jhEv4nxT6i7VtS1UCF",
            "categories": [
              "Religious Gatherings",
              "Spiritual Retreats",
              "Meditation Groups",
              "Interfaith Dialogues"
            ],
            "type": "Religion & Spirituality"
          },
          {
            "id": "C53EE2dFDMrDFSGa7yWk",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "C5GndVisFZMKT4S11Pf1",
            "categories": [
              "Sporting Events",
              "Fitness Classes",
              "Yoga & Meditation",
              "Outdoor Activities"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "C5P1OiWIwzKUUrAmyA0g",
            "categories": [
              "Hobbyist Gatherings",
              "Hobby Workshops",
              "Special Interest Groups",
              "Craft Fairs"
            ],
            "type": "Hobbies & Interests"
          },
          {
            "id": "C5RiiE5EklT0ulSVcLc6",
            "categories": [
              "Fashion Shows",
              "Beauty Workshops",
              "Pop - Up Boutiques",
              "Makeup Classes"
            ],
            "type": "Fashion & Beauty"
          },
          {
            "id": "C5Z01zoQGhF8ZCgXqaZZ",
            "categories": [
              "Pet Adoption Events",
              "Animal Welfare Fundraisers",
              "Pet - Friendly Activities",
              "Zoo Visits"
            ],
            "type": "Pets & Animals"
          },
          {
            "id": "C6ZIp2DoiAf3J61A6LtO",
            "categories": [
              "Hobbyist Gatherings",
              "Hobby Workshops",
              "Special Interest Groups",
              "Craft Fairs"
            ],
            "type": "Hobbies & Interests"
          },
          {
            "id": "C8nHii1iZVLBWm5v0TMH",
            "categories": [
              "Tech Conferences",
              "Startup Events",
              "Coding Workshops",
              "Tech Expos"
            ],
            "type": "Tech & Innovation"
          },
          {
            "id": "C9i1OnVZMCQYpGV8sedN",
            "categories": [
              "Travel Expos",
              "Adventure Tours",
              "Backpacking Trips",
              "Cultural Experiences"
            ],
            "type": "Travel & Adventure"
          },
          {
            "id": "CBHF5ru8w1t716ZhamHn",
            "categories": [
              "Travel Expos",
              "Adventure Tours",
              "Backpacking Trips",
              "Cultural Experiences"
            ],
            "type": "Travel & Adventure"
          },
          {
            "id": "CBnV5A0IBz2QiUIpMN0S",
            "categories": [
              "Charity Galas",
              "Fundraising Events",
              "Volunteer Opportunities",
              "Community Outreach"
            ],
            "type": "Charity & Fundraising"
          },
          {
            "id": "CCutwJgdFqVZXAq0x7zn",
            "categories": [
              "Religious Gatherings",
              "Spiritual Retreats",
              "Meditation Groups",
              "Interfaith Dialogues"
            ],
            "type": "Religion & Spirituality"
          },
          {
            "id": "CEIn7LT924ziEGKYxRnm",
            "categories": [
              "Home Improvement Workshops",
              "Gardening Classes",
              "Home Shows",
              "DIY Events"
            ],
            "type": "Home & Garden"
          },
          {
            "id": "CGQbM0MXMOPorKNDAZ0B",
            "categories": [
              "Fashion Shows",
              "Beauty Workshops",
              "Pop - Up Boutiques",
              "Makeup Classes"
            ],
            "type": "Fashion & Beauty"
          },
          {
            "id": "CGrAwq9fLBXP4XI8F8rb",
            "categories": [
              "Religious Gatherings",
              "Spiritual Retreats",
              "Meditation Groups",
              "Interfaith Dialogues"
            ],
            "type": "Religion & Spirituality"
          },
          {
            "id": "CMAQs0wscKPNLZM8BDrQ",
            "categories": [
              "Pet Adoption Events",
              "Animal Welfare Fundraisers",
              "Pet - Friendly Activities",
              "Zoo Visits"
            ],
            "type": "Pets & Animals"
          },
          {
            "id": "CNWyxckJEHxZbSUK2fiF",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "CO26W3oldtZ56dYARvqm",
            "categories": [
              "Family - Friendly Events",
              "Children's Workshops",
              "Kid - Friendly Activities",
              "Amusement Parks"
            ],
            "type": "Family & Kids"
          },
          {
            "id": "CS2qN2cBbpmX3loHP3YB",
            "categories": [
              "Religious Gatherings",
              "Spiritual Retreats",
              "Meditation Groups",
              "Interfaith Dialogues"
            ],
            "type": "Religion & Spirituality"
          },
          {
            "id": "CUnUjYaQ4opaOc3oebJx",
            "categories": [
              "Hobbyist Gatherings",
              "Hobby Workshops",
              "Special Interest Groups",
              "Craft Fairs"
            ],
            "type": "Hobbies & Interests"
          },
          {
            "id": "CVbfSO3EhVJE2e0fD8Qk",
            "categories": [
              "Tech Conferences",
              "Startup Events",
              "Coding Workshops",
              "Tech Expos"
            ],
            "type": "Tech & Innovation"
          },
          {
            "id": "CXXlRib1QVYwkSkyQ1Vu",
            "categories": [
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Food & Dining"
          },
          {
            "id": "CdJiwCnOlwQ2Vuk5HcfE",
            "categories": [
              "Travel Expos",
              "Adventure Tours",
              "Backpacking Trips",
              "Cultural Experiences"
            ],
            "type": "Travel & Adventure"
          },
          {
            "id": "CgnRQ9cO5gSvZVcNvv7m",
            "categories": [
              "Wellness Retreats",
              "Health Workshops",
              "Mindfulness Events",
              "Medical Seminars"
            ],
            "type": "Health & Wellness"
          },
          {
            "id": "Cn8yRvQ2Yf1K7EgbfiME",
            "categories": [
              "Networking Events",
              "Workshops & Seminars",
              "Conferences",
              "Job Fairs"
            ],
            "type": "Networking & Business"
          },
          {
            "id": "CnT5OoPpBZlOI5WwVsqn",
            "categories": [
              "Charity Galas",
              "Fundraising Events",
              "Volunteer Opportunities",
              "Community Outreach"
            ],
            "type": "Charity & Fundraising"
          },
          {
            "id": "Cono287UKOgfVNvJZsSn",
            "categories": [
              "Food & Dining",
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Sports & Fitness"
          },
          {
            "id": "CorUEF8fW3O7s4bAyebG",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "CpRs4TCt3yXc5GQMtBgt",
            "categories": [
              "Pet Adoption Events",
              "Animal Welfare Fundraisers",
              "Pet - Friendly Activities",
              "Zoo Visits"
            ],
            "type": "Pets & Animals"
          },
          {
            "id": "CqnN5d0Qiet0DQJU8Rty",
            "categories": [
              "Hobbyist Gatherings",
              "Hobby Workshops",
              "Special Interest Groups",
              "Craft Fairs"
            ],
            "type": "Hobbies & Interests"
          },
          {
            "id": "Cr9w8n232k9BdLtzCbmz",
            "categories": [
              "Science Exhibitions",
              "STEM Workshops",
              "Space & Astronomy",
              "Technology Talks"
            ],
            "type": "Science & Technology"
          },
          {
            "id": "CrtHAqqxAqfUcedfJpii",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "CsuNaAFFAbqjzcMSTIcX",
            "categories": [
              "Charity Galas",
              "Fundraising Events",
              "Volunteer Opportunities",
              "Community Outreach"
            ],
            "type": "Charity & Fundraising"
          },
          {
            "id": "CwJrYTMI7C4MyToQuln1",
            "categories": [
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Food & Dining"
          },
          {
            "id": "Cx7sJrqYM8Mgzfn6V3de",
            "categories": [
              "Local Community Events",
              "Environmental Causes",
              "Social Activism",
              "Fundraising for Causes"
            ],
            "type": "Community & Causes"
          },
          {
            "id": "Cy7sbsYBhttJas6EKDAr",
            "categories": [
              "Theater Productions",
              "Magic Shows",
              "Stand - Up Comedy",
              "Movie Screenings"
            ],
            "type": "Entertainment & Shows"
          },
          {
            "id": "CyI9MFved2fpjuvRNag9",
            "categories": [
              "Local Community Events",
              "Environmental Causes",
              "Social Activism",
              "Fundraising for Causes"
            ],
            "type": "Community & Causes"
          },
          {
            "id": "CzLz351V1hmEpDfjRXv9",
            "categories": [
              "Home Improvement Workshops",
              "Gardening Classes",
              "Home Shows",
              "DIY Events"
            ],
            "type": "Home & Garden"
          },
          {
            "id": "D2dJg74SUPN9T0tLmyKq",
            "categories": [
              "Charity Galas",
              "Fundraising Events",
              "Volunteer Opportunities",
              "Community Outreach"
            ],
            "type": "Charity & Fundraising"
          },
          {
            "id": "D4NQ36nl3WNVOvbzi0xj",
            "categories": [
              "Charity Galas",
              "Fundraising Events",
              "Volunteer Opportunities",
              "Community Outreach"
            ],
            "type": "Charity & Fundraising"
          },
          {
            "id": "D66Aw5XhZyXeyVoqTW7o",
            "categories": [
              "Wellness Retreats",
              "Health Workshops",
              "Mindfulness Events",
              "Medical Seminars"
            ],
            "type": "Health & Wellness"
          },
          {
            "id": "D6Y0EX9eyBA7Zo5JA2ZX",
            "categories": [
              "Tech Conferences",
              "Startup Events",
              "Coding Workshops",
              "Tech Expos"
            ],
            "type": "Tech & Innovation"
          },
          {
            "id": "D7wJIU8MEA5XhxPaaWs6",
            "categories": [
              "Family - Friendly Events",
              "Children's Workshops",
              "Kid - Friendly Activities",
              "Amusement Parks"
            ],
            "type": "Family & Kids"
          },
          {
            "id": "D85qn9hc0L2c9pDmtjks",
            "categories": [
              "Travel Expos",
              "Adventure Tours",
              "Backpacking Trips",
              "Cultural Experiences"
            ],
            "type": "Travel & Adventure"
          },
          {
            "id": "D9tJ5GiZuGVJ49PxHnut",
            "categories": [
              "Home Improvement Workshops",
              "Gardening Classes",
              "Home Shows",
              "DIY Events"
            ],
            "type": "Home & Garden"
          },
          {
            "id": "DA50XiLKQEfMvzyobguV",
            "categories": [
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Food & Dining"
          },
          {
            "id": "DBc25nLTBjif1kju1lHt",
            "categories": [
              "Home Improvement Workshops",
              "Gardening Classes",
              "Home Shows",
              "DIY Events"
            ],
            "type": "Home & Garden"
          },
          {
            "id": "DFOzUGvIPC6hhnxl8FWc",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "DGayTUb0ntiOBfl8MQSZ",
            "categories": [
              "Pet Adoption Events",
              "Animal Welfare Fundraisers",
              "Pet - Friendly Activities",
              "Zoo Visits"
            ],
            "type": "Pets & Animals"
          },
          {
            "id": "DHn6T0O5wRuQyCot7jWh",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "DI8v6W4JNKaFEESFGABt",
            "categories": [
              "Tech Conferences",
              "Startup Events",
              "Coding Workshops",
              "Tech Expos"
            ],
            "type": "Tech & Innovation"
          },
          {
            "id": "DIJG0wVZM40FhuanJduG",
            "categories": [
              "Hobbyist Gatherings",
              "Hobby Workshops",
              "Special Interest Groups",
              "Craft Fairs"
            ],
            "type": "Hobbies & Interests"
          },
          {
            "id": "DL6uk1FOb3Q0JWBpz91H",
            "categories": [
              "Food & Dining",
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Sports & Fitness"
          },
          {
            "id": "DSyFmKwLN4Ms6FeTKgRS",
            "categories": [
              "Educational Workshops",
              "Lectures & Talks",
              "Online Courses",
              "Tutoring Services"
            ],
            "type": "Education & Learning"
          },
          {
            "id": "DVNpELWY5LxKjmbUrguJ",
            "categories": [
              "Science Exhibitions",
              "STEM Workshops",
              "Space & Astronomy",
              "Technology Talks"
            ],
            "type": "Science & Technology"
          },
          {
            "id": "DWVLBKGvpeUb9fr1tcjW",
            "categories": [
              "Religious Gatherings",
              "Spiritual Retreats",
              "Meditation Groups",
              "Interfaith Dialogues"
            ],
            "type": "Religion & Spirituality"
          },
          {
            "id": "DX3RE9RuTEDYPfKsfNaB",
            "categories": [
              "Wellness Retreats",
              "Health Workshops",
              "Mindfulness Events",
              "Medical Seminars"
            ],
            "type": "Health & Wellness"
          },
          {
            "id": "DZwfBCDxQbyRSSm5Rq3G",
            "categories": [
              "Local Community Events",
              "Environmental Causes",
              "Social Activism",
              "Fundraising for Causes"
            ],
            "type": "Community & Causes"
          },
          {
            "id": "DaAS5spaBb1hiNACp1SN",
            "categories": [
              "Indian Cuisine",
              "Italian Cuisine",
              "American Fare",
              "Asian Fusion",
              "Mediterranean",
              "Mexican & Tex - Mex",
              "Sushi & Japanese",
              "Chinese Cuisine",
              "French Dining",
              "Vegetarian & Vegan",
              "Seafood Specialties",
              "BBQ & Grill",
              "Steakhouse",
              "Fast Food & Burgers",
              "Cafes & Bakeries",
              "Food Trucks",
              "Fine Dining",
              "Farm - to - Table",
              "Ethnic Eateries"
            ],
            "type": "Food styles"
          },
          {
            "id": "DceTNTvJgvagV7Esbthk",
            "categories": [
              "Science Exhibitions",
              "STEM Workshops",
              "Space & Astronomy",
              "Technology Talks"
            ],
            "type": "Science & Technology"
          },
          {
            "id": "Df0l9ysatUk9IAelcTu3",
            "categories": [
              "Tech Conferences",
              "Startup Events",
              "Coding Workshops",
              "Tech Expos"
            ],
            "type": "Tech & Innovation"
          },
          {
            "id": "Dio2v9XKOqrfZRGcbukZ",
            "categories": [
              "Theater Productions",
              "Magic Shows",
              "Stand - Up Comedy",
              "Movie Screenings"
            ],
            "type": "Entertainment & Shows"
          },
          {
            "id": "Dj1wOuGvDNRC2F4bgcIU",
            "categories": [
              "Sporting Events",
              "Fitness Classes",
              "Yoga & Meditation",
              "Outdoor Activities"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "Dk5uNAz4FHlHXQEnQVEy",
            "categories": [
              "Local Community Events",
              "Environmental Causes",
              "Social Activism",
              "Fundraising for Causes"
            ],
            "type": "Community & Causes"
          },
          {
            "id": "DkPOXjgxCHjAYs4Nsia4",
            "categories": [
              "Tech Conferences",
              "Startup Events",
              "Coding Workshops",
              "Tech Expos"
            ],
            "type": "Tech & Innovation"
          },
          {
            "id": "DkZf3WOSd6Khe5IaAlYV",
            "categories": [
              "Pet Adoption Events",
              "Animal Welfare Fundraisers",
              "Pet - Friendly Activities",
              "Zoo Visits"
            ],
            "type": "Pets & Animals"
          },
          {
            "id": "DknFocaNfxgDqJKWXKmG",
            "categories": [
              "Fashion Shows",
              "Beauty Workshops",
              "Pop - Up Boutiques",
              "Makeup Classes"
            ],
            "type": "Fashion & Beauty"
          },
          {
            "id": "DnHLClxVXFO6G5DGpn4b",
            "categories": [
              "Home Improvement Workshops",
              "Gardening Classes",
              "Home Shows",
              "DIY Events"
            ],
            "type": "Home & Garden"
          },
          {
            "id": "DtfkZPgLj2WGWzmsS0Va",
            "categories": [
              "Home Improvement Workshops",
              "Gardening Classes",
              "Home Shows",
              "DIY Events"
            ],
            "type": "Home & Garden"
          },
          {
            "id": "Dum7BgZoYNWDT72Fr4tl",
            "categories": [
              "Home Improvement Workshops",
              "Gardening Classes",
              "Home Shows",
              "DIY Events"
            ],
            "type": "Home & Garden"
          },
          {
            "id": "Dy9nDzgRBBj9wn38a1kI",
            "categories": [
              "Networking Events",
              "Workshops & Seminars",
              "Conferences",
              "Job Fairs"
            ],
            "type": "Networking & Business"
          },
          {
            "id": "DzKe2Q8tMi6AJjXeh27w",
            "categories": [
              "Pet Adoption Events",
              "Animal Welfare Fundraisers",
              "Pet - Friendly Activities",
              "Zoo Visits"
            ],
            "type": "Pets & Animals"
          },
          {
            "id": "E3w2ABGy2t1YEXJNQKNI",
            "categories": [
              "Home Improvement Workshops",
              "Gardening Classes",
              "Home Shows",
              "DIY Events"
            ],
            "type": "Home & Garden"
          },
          {
            "id": "E4HeXvS3iHoEHGD3spC5",
            "categories": [
              "Food & Dining",
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Sports & Fitness"
          },
          {
            "id": "E4c4I2tDdlbFkYUoMtLL",
            "categories": [
              "Educational Workshops",
              "Lectures & Talks",
              "Online Courses",
              "Tutoring Services"
            ],
            "type": "Education & Learning"
          },
          {
            "id": "E4knDtHcImZBYJXs32Zp",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "E77G5mQIf9cC1LYWIqoI",
            "categories": [
              "Educational Workshops",
              "Lectures & Talks",
              "Online Courses",
              "Tutoring Services"
            ],
            "type": "Education & Learning"
          },
          {
            "id": "E81QLXAKruGc9AEIuerp",
            "categories": [
              "Travel Expos",
              "Adventure Tours",
              "Backpacking Trips",
              "Cultural Experiences"
            ],
            "type": "Travel & Adventure"
          },
          {
            "id": "E9ERXqkrW9ojH3BIjg5s",
            "categories": [
              "Wellness Retreats",
              "Health Workshops",
              "Mindfulness Events",
              "Medical Seminars"
            ],
            "type": "Health & Wellness"
          },
          {
            "id": "E9fjBduk0tVSo1mTRQvu",
            "categories": [
              "Hobbyist Gatherings",
              "Hobby Workshops",
              "Special Interest Groups",
              "Craft Fairs"
            ],
            "type": "Hobbies & Interests"
          },
          {
            "id": "EBc5JxAJ3zs3hVJuiERE",
            "categories": [
              "Local Community Events",
              "Environmental Causes",
              "Social Activism",
              "Fundraising for Causes"
            ],
            "type": "Community & Causes"
          },
          {
            "id": "EBm0I8CNYXvfy4SEqndV",
            "categories": [
              "Travel Expos",
              "Adventure Tours",
              "Backpacking Trips",
              "Cultural Experiences"
            ],
            "type": "Travel & Adventure"
          },
          {
            "id": "ECuP42DIQEe4uHNcc8Pd",
            "categories": [
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Food & Dining"
          },
          {
            "id": "EFw8qzHRMdLdIocNNjXF",
            "categories": [
              "Pet Adoption Events",
              "Animal Welfare Fundraisers",
              "Pet - Friendly Activities",
              "Zoo Visits"
            ],
            "type": "Pets & Animals"
          },
          {
            "id": "EIbCxJikaULZLMvs4DIe",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "EM1LoLbmrcD861PWU4be",
            "categories": [
              "Networking Events",
              "Workshops & Seminars",
              "Conferences",
              "Job Fairs"
            ],
            "type": "Networking & Business"
          },
          {
            "id": "EMbeMjJDN6n9TxoGJxUb",
            "categories": [
              "Science Exhibitions",
              "STEM Workshops",
              "Space & Astronomy",
              "Technology Talks"
            ],
            "type": "Science & Technology"
          },
          {
            "id": "EQaB3kwkMXtunl5Yzj6F",
            "categories": [
              "Fashion Shows",
              "Beauty Workshops",
              "Pop - Up Boutiques",
              "Makeup Classes"
            ],
            "type": "Fashion & Beauty"
          },
          {
            "id": "ER1njMis2UKxl8TDMDKn",
            "categories": [
              "Family - Friendly Events",
              "Children's Workshops",
              "Kid - Friendly Activities",
              "Amusement Parks"
            ],
            "type": "Family & Kids"
          },
          {
            "id": "EUVuocUpQso9LfOw2n3V",
            "categories": [
              "Educational Workshops",
              "Lectures & Talks",
              "Online Courses",
              "Tutoring Services"
            ],
            "type": "Education & Learning"
          },
          {
            "id": "EUdXt9dFfgrSkWGcKR3Q",
            "categories": [
              "Theater Productions",
              "Magic Shows",
              "Stand - Up Comedy",
              "Movie Screenings"
            ],
            "type": "Entertainment & Shows"
          },
          {
            "id": "EUm8odypgroORYgNKToe",
            "categories": [
              "Educational Workshops",
              "Lectures & Talks",
              "Online Courses",
              "Tutoring Services"
            ],
            "type": "Education & Learning"
          },
          {
            "id": "EYG2fSmFDv0O4vpDC3cY",
            "categories": [
              "Religious Gatherings",
              "Spiritual Retreats",
              "Meditation Groups",
              "Interfaith Dialogues"
            ],
            "type": "Religion & Spirituality"
          },
          {
            "id": "EacL3Xe1XzHnSmDZc0mC",
            "categories": [
              "Sporting Events",
              "Fitness Classes",
              "Yoga & Meditation",
              "Outdoor Activities"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "Edk9CTv6orOw4cp17Q7r",
            "categories": [
              "Educational Workshops",
              "Lectures & Talks",
              "Online Courses",
              "Tutoring Services"
            ],
            "type": "Education & Learning"
          },
          {
            "id": "EeXHYuTeV3AwaFUgV3OW",
            "categories": [
              "Networking Events",
              "Workshops & Seminars",
              "Conferences",
              "Job Fairs"
            ],
            "type": "Networking & Business"
          },
          {
            "id": "Eh2Y83HUBDIdZIRwFXiv",
            "categories": [
              "Indian Cuisine",
              "Italian Cuisine",
              "American Fare",
              "Asian Fusion",
              "Mediterranean",
              "Mexican & Tex - Mex",
              "Sushi & Japanese",
              "Chinese Cuisine",
              "French Dining",
              "Vegetarian & Vegan",
              "Seafood Specialties",
              "BBQ & Grill",
              "Steakhouse",
              "Fast Food & Burgers",
              "Cafes & Bakeries",
              "Food Trucks",
              "Fine Dining",
              "Farm - to - Table",
              "Ethnic Eateries"
            ],
            "type": "Food styles"
          },
          {
            "id": "EhSKxyuBEQaoIKFBFdqd",
            "categories": [
              "Hobbyist Gatherings",
              "Hobby Workshops",
              "Special Interest Groups",
              "Craft Fairs"
            ],
            "type": "Hobbies & Interests"
          },
          {
            "id": "EjJe3sA5D0MDVhBiT6Oa",
            "categories": [
              "Wellness Retreats",
              "Health Workshops",
              "Mindfulness Events",
              "Medical Seminars"
            ],
            "type": "Health & Wellness"
          },
          {
            "id": "EkImSa6Mf4eOe68NKM70",
            "categories": [
              "Fashion Shows",
              "Beauty Workshops",
              "Pop - Up Boutiques",
              "Makeup Classes"
            ],
            "type": "Fashion & Beauty"
          },
          {
            "id": "EkuYhJ6cnDO6jL3lFlMv",
            "categories": [
              "Theater Productions",
              "Magic Shows",
              "Stand - Up Comedy",
              "Movie Screenings"
            ],
            "type": "Entertainment & Shows"
          },
          {
            "id": "EoTMebTTQlnLBX0Dmnp5",
            "categories": [
              "Pet Adoption Events",
              "Animal Welfare Fundraisers",
              "Pet - Friendly Activities",
              "Zoo Visits"
            ],
            "type": "Pets & Animals"
          },
          {
            "id": "EtdNLwz5clrSS9zsoR7Z",
            "categories": [
              "Hobbyist Gatherings",
              "Hobby Workshops",
              "Special Interest Groups",
              "Craft Fairs"
            ],
            "type": "Hobbies & Interests"
          },
          {
            "id": "EufqtnqeBdEOs1fRJHmp",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "EyDZ8AQ32eYlZuI10hQ2",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "F1CirxnqMkcLc67ZlDWd",
            "categories": [
              "Educational Workshops",
              "Lectures & Talks",
              "Online Courses",
              "Tutoring Services"
            ],
            "type": "Education & Learning"
          },
          {
            "id": "F3C4KlSTAEaw0xBiHmBQ",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "F3lMwt8sBaf3trRXUASx",
            "categories": [
              "Religious Gatherings",
              "Spiritual Retreats",
              "Meditation Groups",
              "Interfaith Dialogues"
            ],
            "type": "Religion & Spirituality"
          },
          {
            "id": "F4Taz62fyCNiY65nPlin",
            "categories": [
              "Religious Gatherings",
              "Spiritual Retreats",
              "Meditation Groups",
              "Interfaith Dialogues"
            ],
            "type": "Religion & Spirituality"
          },
          {
            "id": "F5yFpmICPREKM17wFmPc",
            "categories": [
              "Sporting Events",
              "Fitness Classes",
              "Yoga & Meditation",
              "Outdoor Activities"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "F7HF5gSdKeJk4BL9InJj",
            "categories": [
              "Networking Events",
              "Workshops & Seminars",
              "Conferences",
              "Job Fairs"
            ],
            "type": "Networking & Business"
          },
          {
            "id": "F7jiynYuwXakP8yvez4V",
            "categories": [
              "Sporting Events",
              "Fitness Classes",
              "Yoga & Meditation",
              "Outdoor Activities"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "F9Orw5TgpY47nF2rvy6a",
            "categories": [
              "Sporting Events",
              "Fitness Classes",
              "Yoga & Meditation",
              "Outdoor Activities"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "FD4SodGQrVj9xDlZB2i0",
            "categories": [
              "Hobbyist Gatherings",
              "Hobby Workshops",
              "Special Interest Groups",
              "Craft Fairs"
            ],
            "type": "Hobbies & Interests"
          },
          {
            "id": "FG79TblvDGIjJ5zOOiQk",
            "categories": [
              "Family - Friendly Events",
              "Children's Workshops",
              "Kid - Friendly Activities",
              "Amusement Parks"
            ],
            "type": "Family & Kids"
          },
          {
            "id": "FHg66RtimTOdC8chwgPo",
            "categories": [
              "Charity Galas",
              "Fundraising Events",
              "Volunteer Opportunities",
              "Community Outreach"
            ],
            "type": "Charity & Fundraising"
          },
          {
            "id": "FHmzH2NDmRW5NUHwP0ty",
            "categories": [
              "Networking Events",
              "Workshops & Seminars",
              "Conferences",
              "Job Fairs"
            ],
            "type": "Networking & Business"
          },
          {
            "id": "FItXzfiGXFjsC5OxdEEE",
            "categories": [
              "Travel Expos",
              "Adventure Tours",
              "Backpacking Trips",
              "Cultural Experiences"
            ],
            "type": "Travel & Adventure"
          },
          {
            "id": "FLzusdhPwfGbBq8lDJRm",
            "categories": [
              "Indian Cuisine",
              "Italian Cuisine",
              "American Fare",
              "Asian Fusion",
              "Mediterranean",
              "Mexican & Tex - Mex",
              "Sushi & Japanese",
              "Chinese Cuisine",
              "French Dining",
              "Vegetarian & Vegan",
              "Seafood Specialties",
              "BBQ & Grill",
              "Steakhouse",
              "Fast Food & Burgers",
              "Cafes & Bakeries",
              "Food Trucks",
              "Fine Dining",
              "Farm - to - Table",
              "Ethnic Eateries"
            ],
            "type": "Food styles"
          },
          {
            "id": "FMcYiZ40S2UaSzl3Du5I",
            "categories": [
              "Religious Gatherings",
              "Spiritual Retreats",
              "Meditation Groups",
              "Interfaith Dialogues"
            ],
            "type": "Religion & Spirituality"
          },
          {
            "id": "FN33OveLQeggW55BKW9c",
            "categories": [
              "Tech Conferences",
              "Startup Events",
              "Coding Workshops",
              "Tech Expos"
            ],
            "type": "Tech & Innovation"
          },
          {
            "id": "FOYyQp0jc7MGwZQK36zP",
            "categories": [
              "Fashion Shows",
              "Beauty Workshops",
              "Pop - Up Boutiques",
              "Makeup Classes"
            ],
            "type": "Fashion & Beauty"
          },
          {
            "id": "FOduyILiOgOCNAv7hXQQ",
            "categories": [
              "Travel Expos",
              "Adventure Tours",
              "Backpacking Trips",
              "Cultural Experiences"
            ],
            "type": "Travel & Adventure"
          },
          {
            "id": "FQ9sCOXHxXIyaR8FGc5j",
            "categories": [
              "Local Community Events",
              "Environmental Causes",
              "Social Activism",
              "Fundraising for Causes"
            ],
            "type": "Community & Causes"
          },
          {
            "id": "FTxWcXtjsvMkzwSPYuDT",
            "categories": [
              "Travel Expos",
              "Adventure Tours",
              "Backpacking Trips",
              "Cultural Experiences"
            ],
            "type": "Travel & Adventure"
          },
          {
            "id": "FVp2FMsoihVVNSjZsJQq",
            "categories": [
              "Religious Gatherings",
              "Spiritual Retreats",
              "Meditation Groups",
              "Interfaith Dialogues"
            ],
            "type": "Religion & Spirituality"
          },
          {
            "id": "FWBJbxlsbOTLvZmTbUKT",
            "categories": [
              "Sporting Events",
              "Fitness Classes",
              "Yoga & Meditation",
              "Outdoor Activities"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "FZe2YbMyOV475VCAkCe6",
            "categories": [
              "Sporting Events",
              "Fitness Classes",
              "Yoga & Meditation",
              "Outdoor Activities"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "Fa2tTelFJfdF1vyEF1WY",
            "categories": [
              "Educational Workshops",
              "Lectures & Talks",
              "Online Courses",
              "Tutoring Services"
            ],
            "type": "Education & Learning"
          },
          {
            "id": "FaQzuVi5DZUvkF9cK1v6",
            "categories": [
              "Charity Galas",
              "Fundraising Events",
              "Volunteer Opportunities",
              "Community Outreach"
            ],
            "type": "Charity & Fundraising"
          },
          {
            "id": "FaV2zyMyLQYeHb9d3pHM",
            "categories": [
              "Local Community Events",
              "Environmental Causes",
              "Social Activism",
              "Fundraising for Causes"
            ],
            "type": "Community & Causes"
          },
          {
            "id": "FbuFbBoSpeKwTJ3VZfmx",
            "categories": [
              "Sporting Events",
              "Fitness Classes",
              "Yoga & Meditation",
              "Outdoor Activities"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "FcAjrMliVHs9oBCmkX4s",
            "categories": [
              "Tech Conferences",
              "Startup Events",
              "Coding Workshops",
              "Tech Expos"
            ],
            "type": "Tech & Innovation"
          },
          {
            "id": "FcOTeatem1vRv6Gt7NHR",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "FgeHTyfQ8EIDdQBex79g",
            "categories": [
              "Local Community Events",
              "Environmental Causes",
              "Social Activism",
              "Fundraising for Causes"
            ],
            "type": "Community & Causes"
          },
          {
            "id": "FhbahKjJR0n0Tc5pMOFq",
            "categories": [
              "Religious Gatherings",
              "Spiritual Retreats",
              "Meditation Groups",
              "Interfaith Dialogues"
            ],
            "type": "Religion & Spirituality"
          },
          {
            "id": "FiAbETDTgcNaBxRMbYsw",
            "categories": [
              "Pet Adoption Events",
              "Animal Welfare Fundraisers",
              "Pet - Friendly Activities",
              "Zoo Visits"
            ],
            "type": "Pets & Animals"
          },
          {
            "id": "FjIKnAC1XADfOLabaAzE",
            "categories": [
              "Religious Gatherings",
              "Spiritual Retreats",
              "Meditation Groups",
              "Interfaith Dialogues"
            ],
            "type": "Religion & Spirituality"
          },
          {
            "id": "FmQ3YXQsuO3WN6lWRi2S",
            "categories": [
              "Educational Workshops",
              "Lectures & Talks",
              "Online Courses",
              "Tutoring Services"
            ],
            "type": "Education & Learning"
          },
          {
            "id": "Fp5wlwfSjJmWpRcMFky4",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "FreTqHNuGpeu7UfK12lE",
            "categories": [
              "Home Improvement Workshops",
              "Gardening Classes",
              "Home Shows",
              "DIY Events"
            ],
            "type": "Home & Garden"
          },
          {
            "id": "FtkrikY6QwxY47bpWTqZ",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "FuZxIqqFpCKC610WwMV1",
            "categories": [
              "Religious Gatherings",
              "Spiritual Retreats",
              "Meditation Groups",
              "Interfaith Dialogues"
            ],
            "type": "Religion & Spirituality"
          },
          {
            "id": "Fv7wq3Doad26u4ejLsG1",
            "categories": [
              "Home Improvement Workshops",
              "Gardening Classes",
              "Home Shows",
              "DIY Events"
            ],
            "type": "Home & Garden"
          },
          {
            "id": "Fw9akLBEPUbV7QJBMjjP",
            "categories": [
              "Travel Expos",
              "Adventure Tours",
              "Backpacking Trips",
              "Cultural Experiences"
            ],
            "type": "Travel & Adventure"
          },
          {
            "id": "Fwp9hUlwKasCkct1Ar1B",
            "categories": [
              "Wellness Retreats",
              "Health Workshops",
              "Mindfulness Events",
              "Medical Seminars"
            ],
            "type": "Health & Wellness"
          },
          {
            "id": "FxL5Azzu4eyUoKpS4H5J",
            "categories": [
              "Food & Dining",
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Sports & Fitness"
          },
          {
            "id": "FzsoPg6axp1jSSMm1p5r",
            "categories": [
              "Charity Galas",
              "Fundraising Events",
              "Volunteer Opportunities",
              "Community Outreach"
            ],
            "type": "Charity & Fundraising"
          },
          {
            "id": "G57j0YC2k3o7o8qn3B4p",
            "categories": [
              "Science Exhibitions",
              "STEM Workshops",
              "Space & Astronomy",
              "Technology Talks"
            ],
            "type": "Science & Technology"
          },
          {
            "id": "GCOIQ3qWczgLrdn4nO9S",
            "categories": [
              "Wellness Retreats",
              "Health Workshops",
              "Mindfulness Events",
              "Medical Seminars"
            ],
            "type": "Health & Wellness"
          },
          {
            "id": "GE1z1Pqg3JoodW4YuZbc",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "GEc6t0URU13ipCDmsV3I",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "GG1yTNfk2C64Lq79qjMD",
            "categories": [
              "Home Improvement Workshops",
              "Gardening Classes",
              "Home Shows",
              "DIY Events"
            ],
            "type": "Home & Garden"
          },
          {
            "id": "GIzUbtueqJVy97vl8F0h",
            "categories": [
              "Home Improvement Workshops",
              "Gardening Classes",
              "Home Shows",
              "DIY Events"
            ],
            "type": "Home & Garden"
          },
          {
            "id": "GJ1SZT2mvM4mgTIgvj7T",
            "categories": [
              "Sporting Events",
              "Fitness Classes",
              "Yoga & Meditation",
              "Outdoor Activities"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "GMznZEMgtKl9KoxoRJCZ",
            "categories": [
              "Family - Friendly Events",
              "Children's Workshops",
              "Kid - Friendly Activities",
              "Amusement Parks"
            ],
            "type": "Family & Kids"
          },
          {
            "id": "GN29KXkpUbOA4NR8jlXB",
            "categories": [
              "Charity Galas",
              "Fundraising Events",
              "Volunteer Opportunities",
              "Community Outreach"
            ],
            "type": "Charity & Fundraising"
          },
          {
            "id": "GRhVB2fESg1szDfYWvQQ",
            "categories": [
              "Hobbyist Gatherings",
              "Hobby Workshops",
              "Special Interest Groups",
              "Craft Fairs"
            ],
            "type": "Hobbies & Interests"
          },
          {
            "id": "GSB0rRWCKIHzsG6YN255",
            "categories": [
              "Theater Productions",
              "Magic Shows",
              "Stand - Up Comedy",
              "Movie Screenings"
            ],
            "type": "Entertainment & Shows"
          },
          {
            "id": "GTeNsdPB22h06ohCOxkl",
            "categories": [
              "Educational Workshops",
              "Lectures & Talks",
              "Online Courses",
              "Tutoring Services"
            ],
            "type": "Education & Learning"
          },
          {
            "id": "GVc2FmQ5DaW6fOSlJYhy",
            "categories": [
              "Family - Friendly Events",
              "Children's Workshops",
              "Kid - Friendly Activities",
              "Amusement Parks"
            ],
            "type": "Family & Kids"
          },
          {
            "id": "GW1tODuX9x3LvdQMAdZ0",
            "categories": [
              "Pet Adoption Events",
              "Animal Welfare Fundraisers",
              "Pet - Friendly Activities",
              "Zoo Visits"
            ],
            "type": "Pets & Animals"
          },
          {
            "id": "GYWtonwEHwZOj4oUKZew",
            "categories": [
              "Science Exhibitions",
              "STEM Workshops",
              "Space & Astronomy",
              "Technology Talks"
            ],
            "type": "Science & Technology"
          },
          {
            "id": "GYtgMVJHiyXa0s30Fxjw",
            "categories": [
              "Fashion Shows",
              "Beauty Workshops",
              "Pop - Up Boutiques",
              "Makeup Classes"
            ],
            "type": "Fashion & Beauty"
          },
          {
            "id": "GZCjdPVV0kfhbgOX7VFg",
            "categories": [
              "Food & Dining",
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Sports & Fitness"
          },
          {
            "id": "GZL7fALbEfnJS6WLEO9T",
            "categories": [
              "Local Community Events",
              "Environmental Causes",
              "Social Activism",
              "Fundraising for Causes"
            ],
            "type": "Community & Causes"
          },
          {
            "id": "Gc3NDUqbeOAKSMPlwqnS",
            "categories": [
              "Networking Events",
              "Workshops & Seminars",
              "Conferences",
              "Job Fairs"
            ],
            "type": "Networking & Business"
          },
          {
            "id": "GcDyjgc5pg8pg3LEqLe4",
            "categories": [
              "Wellness Retreats",
              "Health Workshops",
              "Mindfulness Events",
              "Medical Seminars"
            ],
            "type": "Health & Wellness"
          },
          {
            "id": "Gd7ToHn1L536q6ZeM75r",
            "categories": [
              "Fashion Shows",
              "Beauty Workshops",
              "Pop - Up Boutiques",
              "Makeup Classes"
            ],
            "type": "Fashion & Beauty"
          },
          {
            "id": "GdpwWtsG2tgaweEhkqq7",
            "categories": [
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Food & Dining"
          },
          {
            "id": "Gfej6Rgdpl9UGFqgUAio",
            "categories": [
              "Sporting Events",
              "Fitness Classes",
              "Yoga & Meditation",
              "Outdoor Activities"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "GhJqJc70qg5MtCw28t8m",
            "categories": [
              "Tech Conferences",
              "Startup Events",
              "Coding Workshops",
              "Tech Expos"
            ],
            "type": "Tech & Innovation"
          },
          {
            "id": "GijSuckwjfi5oY8rUNhe",
            "categories": [
              "Theater Productions",
              "Magic Shows",
              "Stand - Up Comedy",
              "Movie Screenings"
            ],
            "type": "Entertainment & Shows"
          },
          {
            "id": "Gm7NZYhhrTSdjqGkBqat",
            "categories": [
              "Indian Cuisine",
              "Italian Cuisine",
              "American Fare",
              "Asian Fusion",
              "Mediterranean",
              "Mexican & Tex - Mex",
              "Sushi & Japanese",
              "Chinese Cuisine",
              "French Dining",
              "Vegetarian & Vegan",
              "Seafood Specialties",
              "BBQ & Grill",
              "Steakhouse",
              "Fast Food & Burgers",
              "Cafes & Bakeries",
              "Food Trucks",
              "Fine Dining",
              "Farm - to - Table",
              "Ethnic Eateries"
            ],
            "type": "Food styles"
          },
          {
            "id": "GtB0rvGdz0Pxua1AmngL",
            "categories": [
              "Family - Friendly Events",
              "Children's Workshops",
              "Kid - Friendly Activities",
              "Amusement Parks"
            ],
            "type": "Family & Kids"
          },
          {
            "id": "GtLCpFN5W0aowKydNdMM",
            "categories": [
              "Wellness Retreats",
              "Health Workshops",
              "Mindfulness Events",
              "Medical Seminars"
            ],
            "type": "Health & Wellness"
          },
          {
            "id": "Gut8uyFN8OBXzGHRI4Rc",
            "categories": [
              "Charity Galas",
              "Fundraising Events",
              "Volunteer Opportunities",
              "Community Outreach"
            ],
            "type": "Charity & Fundraising"
          },
          {
            "id": "Gv5NWsNIcss5HwpHIoks",
            "categories": [
              "Local Community Events",
              "Environmental Causes",
              "Social Activism",
              "Fundraising for Causes"
            ],
            "type": "Community & Causes"
          },
          {
            "id": "Gy0GkdoHUK1utAqZ557K",
            "categories": [
              "Wellness Retreats",
              "Health Workshops",
              "Mindfulness Events",
              "Medical Seminars"
            ],
            "type": "Health & Wellness"
          },
          {
            "id": "GzESVvb4ysvmw7oAG6Dp",
            "categories": [
              "Sporting Events",
              "Fitness Classes",
              "Yoga & Meditation",
              "Outdoor Activities"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "GzdlrvDI9tURrwrPSGfh",
            "categories": [
              "Educational Workshops",
              "Lectures & Talks",
              "Online Courses",
              "Tutoring Services"
            ],
            "type": "Education & Learning"
          },
          {
            "id": "H0OoCNk2ToYanqEpLZFs",
            "categories": [
              "Local Community Events",
              "Environmental Causes",
              "Social Activism",
              "Fundraising for Causes"
            ],
            "type": "Community & Causes"
          },
          {
            "id": "H0w7dDfBaT3Z3lyQW8cq",
            "categories": [
              "Religious Gatherings",
              "Spiritual Retreats",
              "Meditation Groups",
              "Interfaith Dialogues"
            ],
            "type": "Religion & Spirituality"
          },
          {
            "id": "H0y6ToR1i5pKwKpu7dlw",
            "categories": [
              "Food & Dining",
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Sports & Fitness"
          },
          {
            "id": "H3BC7vsTSHB9dnjnmqMd",
            "categories": [
              "Local Community Events",
              "Environmental Causes",
              "Social Activism",
              "Fundraising for Causes"
            ],
            "type": "Community & Causes"
          },
          {
            "id": "H7SO8DMAuc71lvCpd8Ho",
            "categories": [
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Food & Dining"
          },
          {
            "id": "HAaR1pziz1S60YUNQAIk",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "HB42byOPGSHNLwlsy8ZL",
            "categories": [
              "Religious Gatherings",
              "Spiritual Retreats",
              "Meditation Groups",
              "Interfaith Dialogues"
            ],
            "type": "Religion & Spirituality"
          },
          {
            "id": "HC6bNdH5grb3mi95K9RG",
            "categories": [
              "Theater Productions",
              "Magic Shows",
              "Stand - Up Comedy",
              "Movie Screenings"
            ],
            "type": "Entertainment & Shows"
          },
          {
            "id": "HKu5i5GgejHkiv0dQHNT",
            "categories": [
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Food & Dining"
          },
          {
            "id": "HMNm47w4bH4B7BE8WWg5",
            "categories": [
              "Family - Friendly Events",
              "Children's Workshops",
              "Kid - Friendly Activities",
              "Amusement Parks"
            ],
            "type": "Family & Kids"
          },
          {
            "id": "HOK3BAKgGYhk0T2mQ4df",
            "categories": [
              "Hobbyist Gatherings",
              "Hobby Workshops",
              "Special Interest Groups",
              "Craft Fairs"
            ],
            "type": "Hobbies & Interests"
          },
          {
            "id": "HOs8h8JeKLvKoW2wMfQX",
            "categories": [
              "Travel Expos",
              "Adventure Tours",
              "Backpacking Trips",
              "Cultural Experiences"
            ],
            "type": "Travel & Adventure"
          },
          {
            "id": "HPxLFGLItCvqWJpE9kCJ",
            "categories": [
              "Family - Friendly Events",
              "Children's Workshops",
              "Kid - Friendly Activities",
              "Amusement Parks"
            ],
            "type": "Family & Kids"
          },
          {
            "id": "HQ8UwmRkjmGbLg5C3mGy",
            "categories": [
              "Religious Gatherings",
              "Spiritual Retreats",
              "Meditation Groups",
              "Interfaith Dialogues"
            ],
            "type": "Religion & Spirituality"
          },
          {
            "id": "HUf2PEytYydeCWFG6A0e",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "HVD7GffuLskQmBcCDPFO",
            "categories": [
              "Fashion Shows",
              "Beauty Workshops",
              "Pop - Up Boutiques",
              "Makeup Classes"
            ],
            "type": "Fashion & Beauty"
          },
          {
            "id": "HZsd6hFe3e72rSznBn1g",
            "categories": [
              "Wellness Retreats",
              "Health Workshops",
              "Mindfulness Events",
              "Medical Seminars"
            ],
            "type": "Health & Wellness"
          },
          {
            "id": "Hbv3EWA1fpd4bUs8vWr9",
            "categories": [
              "Networking Events",
              "Workshops & Seminars",
              "Conferences",
              "Job Fairs"
            ],
            "type": "Networking & Business"
          },
          {
            "id": "HcPEJZ6LSFwSpdhy65SQ",
            "categories": [
              "Fashion Shows",
              "Beauty Workshops",
              "Pop - Up Boutiques",
              "Makeup Classes"
            ],
            "type": "Fashion & Beauty"
          },
          {
            "id": "HfRXOtiuHfglLop0TLft",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "Hfx9IYeyWTrpbyADQwvK",
            "categories": [
              "Theater Productions",
              "Magic Shows",
              "Stand - Up Comedy",
              "Movie Screenings"
            ],
            "type": "Entertainment & Shows"
          },
          {
            "id": "HhJ3MgP9jHAlgwkViYeo",
            "categories": [
              "Home Improvement Workshops",
              "Gardening Classes",
              "Home Shows",
              "DIY Events"
            ],
            "type": "Home & Garden"
          },
          {
            "id": "HkCMFIsvTFAFV4bjAErY",
            "categories": [
              "Educational Workshops",
              "Lectures & Talks",
              "Online Courses",
              "Tutoring Services"
            ],
            "type": "Education & Learning"
          },
          {
            "id": "Hl7XQczPJSmIggmJ1q9P",
            "categories": [
              "Indian Cuisine",
              "Italian Cuisine",
              "American Fare",
              "Asian Fusion",
              "Mediterranean",
              "Mexican & Tex - Mex",
              "Sushi & Japanese",
              "Chinese Cuisine",
              "French Dining",
              "Vegetarian & Vegan",
              "Seafood Specialties",
              "BBQ & Grill",
              "Steakhouse",
              "Fast Food & Burgers",
              "Cafes & Bakeries",
              "Food Trucks",
              "Fine Dining",
              "Farm - to - Table",
              "Ethnic Eateries"
            ],
            "type": "Food styles"
          },
          {
            "id": "HpVmIysinDoQBxzTGngJ",
            "categories": [
              "Charity Galas",
              "Fundraising Events",
              "Volunteer Opportunities",
              "Community Outreach"
            ],
            "type": "Charity & Fundraising"
          },
          {
            "id": "Hu4z4BCuwWFYCG7joUGB",
            "categories": [
              "Pet Adoption Events",
              "Animal Welfare Fundraisers",
              "Pet - Friendly Activities",
              "Zoo Visits"
            ],
            "type": "Pets & Animals"
          },
          {
            "id": "HuLXuDMLbAc2d0wIWc0o",
            "categories": [
              "Local Community Events",
              "Environmental Causes",
              "Social Activism",
              "Fundraising for Causes"
            ],
            "type": "Community & Causes"
          },
          {
            "id": "HwNr8asyNNK46AVgRFxm",
            "categories": [
              "Theater Productions",
              "Magic Shows",
              "Stand - Up Comedy",
              "Movie Screenings"
            ],
            "type": "Entertainment & Shows"
          },
          {
            "id": "HxBlHF1VjjwyUwEBAtUt",
            "categories": [
              "Travel Expos",
              "Adventure Tours",
              "Backpacking Trips",
              "Cultural Experiences"
            ],
            "type": "Travel & Adventure"
          },
          {
            "id": "I0FOCg1Q2C1vJiLDUQeN",
            "categories": [
              "Religious Gatherings",
              "Spiritual Retreats",
              "Meditation Groups",
              "Interfaith Dialogues"
            ],
            "type": "Religion & Spirituality"
          },
          {
            "id": "I2WWA4AjcU6z9TwdNr6h",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "I4usXDUFT06J50aNGx2G",
            "categories": [
              "Indian Cuisine",
              "Italian Cuisine",
              "American Fare",
              "Asian Fusion",
              "Mediterranean",
              "Mexican & Tex - Mex",
              "Sushi & Japanese",
              "Chinese Cuisine",
              "French Dining",
              "Vegetarian & Vegan",
              "Seafood Specialties",
              "BBQ & Grill",
              "Steakhouse",
              "Fast Food & Burgers",
              "Cafes & Bakeries",
              "Food Trucks",
              "Fine Dining",
              "Farm - to - Table",
              "Ethnic Eateries"
            ],
            "type": "Food styles"
          },
          {
            "id": "I6YTLPxBKWfb9wDLJRDv",
            "categories": [
              "Sporting Events",
              "Fitness Classes",
              "Yoga & Meditation",
              "Outdoor Activities"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "I7WqfIOfszqHMeI8HC1N",
            "categories": [
              "Hobbyist Gatherings",
              "Hobby Workshops",
              "Special Interest Groups",
              "Craft Fairs"
            ],
            "type": "Hobbies & Interests"
          },
          {
            "id": "I7xt5Lr2QCKZCRUcKh4z",
            "categories": [
              "Charity Galas",
              "Fundraising Events",
              "Volunteer Opportunities",
              "Community Outreach"
            ],
            "type": "Charity & Fundraising"
          },
          {
            "id": "I9JBmTkPLMO6v9sirtNW",
            "categories": [
              "Theater Productions",
              "Magic Shows",
              "Stand - Up Comedy",
              "Movie Screenings"
            ],
            "type": "Entertainment & Shows"
          },
          {
            "id": "IBHfFTg6OVOTllkUXRxD",
            "categories": [
              "Religious Gatherings",
              "Spiritual Retreats",
              "Meditation Groups",
              "Interfaith Dialogues"
            ],
            "type": "Religion & Spirituality"
          },
          {
            "id": "ICBs7nvtyljPhKXdIWa0",
            "categories": [
              "Pet Adoption Events",
              "Animal Welfare Fundraisers",
              "Pet - Friendly Activities",
              "Zoo Visits"
            ],
            "type": "Pets & Animals"
          },
          {
            "id": "IE2hx6K34bNxHOslpv95",
            "categories": [
              "Religious Gatherings",
              "Spiritual Retreats",
              "Meditation Groups",
              "Interfaith Dialogues"
            ],
            "type": "Religion & Spirituality"
          },
          {
            "id": "IJdwCnRwH001AlzIRKPX",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "IMiFRFfcUANBivUFAnkb",
            "categories": [
              "Family - Friendly Events",
              "Children's Workshops",
              "Kid - Friendly Activities",
              "Amusement Parks"
            ],
            "type": "Family & Kids"
          },
          {
            "id": "IQr0Nd6OKOH1H6ht9rBP",
            "categories": [
              "Family - Friendly Events",
              "Children's Workshops",
              "Kid - Friendly Activities",
              "Amusement Parks"
            ],
            "type": "Family & Kids"
          },
          {
            "id": "ISK4iOgvEvLysVqybK1e",
            "categories": [
              "Theater Productions",
              "Magic Shows",
              "Stand - Up Comedy",
              "Movie Screenings"
            ],
            "type": "Entertainment & Shows"
          },
          {
            "id": "ITtN8nnJBXNRypSpKbBz",
            "categories": [
              "Hobbyist Gatherings",
              "Hobby Workshops",
              "Special Interest Groups",
              "Craft Fairs"
            ],
            "type": "Hobbies & Interests"
          },
          {
            "id": "IXNxPUyz1xcFyrkCHT0Z",
            "categories": [
              "Hobbyist Gatherings",
              "Hobby Workshops",
              "Special Interest Groups",
              "Craft Fairs"
            ],
            "type": "Hobbies & Interests"
          },
          {
            "id": "IYaE6JyqRd6GmMnOO47e",
            "categories": [
              "Family - Friendly Events",
              "Children's Workshops",
              "Kid - Friendly Activities",
              "Amusement Parks"
            ],
            "type": "Family & Kids"
          },
          {
            "id": "IaeYEktUO4ra8hZUi7Gz",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "IanisbM4zJkd0xDYM7Ub",
            "categories": [
              "Indian Cuisine",
              "Italian Cuisine",
              "American Fare",
              "Asian Fusion",
              "Mediterranean",
              "Mexican & Tex - Mex",
              "Sushi & Japanese",
              "Chinese Cuisine",
              "French Dining",
              "Vegetarian & Vegan",
              "Seafood Specialties",
              "BBQ & Grill",
              "Steakhouse",
              "Fast Food & Burgers",
              "Cafes & Bakeries",
              "Food Trucks",
              "Fine Dining",
              "Farm - to - Table",
              "Ethnic Eateries"
            ],
            "type": "Food styles"
          },
          {
            "id": "Ic24Bdgz7FU4cO6U8Czy",
            "categories": [
              "Family - Friendly Events",
              "Children's Workshops",
              "Kid - Friendly Activities",
              "Amusement Parks"
            ],
            "type": "Family & Kids"
          },
          {
            "id": "IdiNENKLfJIYM7gOumVj",
            "categories": [
              "Indian Cuisine",
              "Italian Cuisine",
              "American Fare",
              "Asian Fusion",
              "Mediterranean",
              "Mexican & Tex - Mex",
              "Sushi & Japanese",
              "Chinese Cuisine",
              "French Dining",
              "Vegetarian & Vegan",
              "Seafood Specialties",
              "BBQ & Grill",
              "Steakhouse",
              "Fast Food & Burgers",
              "Cafes & Bakeries",
              "Food Trucks",
              "Fine Dining",
              "Farm - to - Table",
              "Ethnic Eateries"
            ],
            "type": "Food styles"
          },
          {
            "id": "IhLcX71mMhftLtuKp0OQ",
            "categories": [
              "Charity Galas",
              "Fundraising Events",
              "Volunteer Opportunities",
              "Community Outreach"
            ],
            "type": "Charity & Fundraising"
          },
          {
            "id": "IhOQVbIjnP6sZaQ4m7qX",
            "categories": [
              "Home Improvement Workshops",
              "Gardening Classes",
              "Home Shows",
              "DIY Events"
            ],
            "type": "Home & Garden"
          },
          {
            "id": "IhUOTcOetRuzCVGoCi33",
            "categories": [
              "Educational Workshops",
              "Lectures & Talks",
              "Online Courses",
              "Tutoring Services"
            ],
            "type": "Education & Learning"
          },
          {
            "id": "IjsVmcEOl20kYZBSNRbh",
            "categories": [
              "Fashion Shows",
              "Beauty Workshops",
              "Pop - Up Boutiques",
              "Makeup Classes"
            ],
            "type": "Fashion & Beauty"
          },
          {
            "id": "ImSIwDLk86wQqU8vH4Jn",
            "categories": [
              "Food & Dining",
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Sports & Fitness"
          },
          {
            "id": "IovOQFkrxxuwKFqrgztj",
            "categories": [
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Food & Dining"
          },
          {
            "id": "Ip7NXrs2cozL35S6XOLU",
            "categories": [
              "Theater Productions",
              "Magic Shows",
              "Stand - Up Comedy",
              "Movie Screenings"
            ],
            "type": "Entertainment & Shows"
          },
          {
            "id": "Ir9O69MRwaMuzrCo72mZ",
            "categories": [
              "Home Improvement Workshops",
              "Gardening Classes",
              "Home Shows",
              "DIY Events"
            ],
            "type": "Home & Garden"
          },
          {
            "id": "IvKDvtZYbNgwja4qjABL",
            "categories": [
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Food & Dining"
          },
          {
            "id": "IxgmYsL1nvbt0AmOdrEh",
            "categories": [
              "Networking Events",
              "Workshops & Seminars",
              "Conferences",
              "Job Fairs"
            ],
            "type": "Networking & Business"
          },
          {
            "id": "IykD5MpVfVKVl8Xb4mDn",
            "categories": [
              "Food & Dining",
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Sports & Fitness"
          },
          {
            "id": "Iz58rYNE2LQMwV8QjFIo",
            "categories": [
              "Pet Adoption Events",
              "Animal Welfare Fundraisers",
              "Pet - Friendly Activities",
              "Zoo Visits"
            ],
            "type": "Pets & Animals"
          },
          {
            "id": "J0i3OIDThWIcCwLZpUwO",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "J1SejGk0Y53hSusDUgsa",
            "categories": [
              "Fashion Shows",
              "Beauty Workshops",
              "Pop - Up Boutiques",
              "Makeup Classes"
            ],
            "type": "Fashion & Beauty"
          },
          {
            "id": "J3nQ6RZrmBXVW0zB8Vff",
            "categories": [
              "Family - Friendly Events",
              "Children's Workshops",
              "Kid - Friendly Activities",
              "Amusement Parks"
            ],
            "type": "Family & Kids"
          },
          {
            "id": "J5dfjYbSUfH8oBBH2HA3",
            "categories": [
              "Educational Workshops",
              "Lectures & Talks",
              "Online Courses",
              "Tutoring Services"
            ],
            "type": "Education & Learning"
          },
          {
            "id": "J78pVGM8RcvrhjhZ09kJ",
            "categories": [
              "Networking Events",
              "Workshops & Seminars",
              "Conferences",
              "Job Fairs"
            ],
            "type": "Networking & Business"
          },
          {
            "id": "J9PQuxGHz0tqN0nUEZde",
            "categories": [
              "Food & Dining",
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Sports & Fitness"
          },
          {
            "id": "J9dbyp4fyQ94rIYkuwo4",
            "categories": [
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Food & Dining"
          },
          {
            "id": "JA7Quax2P6TcZ2dZmP83",
            "categories": [
              "Family - Friendly Events",
              "Children's Workshops",
              "Kid - Friendly Activities",
              "Amusement Parks"
            ],
            "type": "Family & Kids"
          },
          {
            "id": "JI26Sj4AwkHJ6r3Acq54",
            "categories": [
              "Educational Workshops",
              "Lectures & Talks",
              "Online Courses",
              "Tutoring Services"
            ],
            "type": "Education & Learning"
          },
          {
            "id": "JIVjdX81momVHC0YTYVA",
            "categories": [
              "Travel Expos",
              "Adventure Tours",
              "Backpacking Trips",
              "Cultural Experiences"
            ],
            "type": "Travel & Adventure"
          },
          {
            "id": "JIgUOusU4Kvl0vSTzMgm",
            "categories": [
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Food & Dining"
          },
          {
            "id": "JMncB26CpUA139CzHr2V",
            "categories": [
              "Family - Friendly Events",
              "Children's Workshops",
              "Kid - Friendly Activities",
              "Amusement Parks"
            ],
            "type": "Family & Kids"
          },
          {
            "id": "JPijC3USlRz8T8iVx3iR",
            "categories": [
              "Family - Friendly Events",
              "Children's Workshops",
              "Kid - Friendly Activities",
              "Amusement Parks"
            ],
            "type": "Family & Kids"
          },
          {
            "id": "JQx0Ne9n6j1GLculQcBb",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "JST4aUGVA0xj5WGg4eu1",
            "categories": [
              "Home Improvement Workshops",
              "Gardening Classes",
              "Home Shows",
              "DIY Events"
            ],
            "type": "Home & Garden"
          },
          {
            "id": "JSU9I22gKpMhYTAUxdNs",
            "categories": [
              "Sporting Events",
              "Fitness Classes",
              "Yoga & Meditation",
              "Outdoor Activities"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "JUA9NLfFOKUu5ecrgJ0e",
            "categories": [
              "Food & Dining",
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Sports & Fitness"
          },
          {
            "id": "JUXwWJ7SfgqfycIbEMP6",
            "categories": [
              "Religious Gatherings",
              "Spiritual Retreats",
              "Meditation Groups",
              "Interfaith Dialogues"
            ],
            "type": "Religion & Spirituality"
          },
          {
            "id": "JVisxsSASKioN4AyXhSv",
            "categories": [
              "Local Community Events",
              "Environmental Causes",
              "Social Activism",
              "Fundraising for Causes"
            ],
            "type": "Community & Causes"
          },
          {
            "id": "JYSjViQ5kC56WX73TT3V",
            "categories": [
              "Food & Dining",
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Sports & Fitness"
          },
          {
            "id": "JZxMTHmFJ38cfWlQ7ofc",
            "categories": [
              "Local Community Events",
              "Environmental Causes",
              "Social Activism",
              "Fundraising for Causes"
            ],
            "type": "Community & Causes"
          },
          {
            "id": "JbiOuuAC6U4u2kU9jh6R",
            "categories": [
              "Science Exhibitions",
              "STEM Workshops",
              "Space & Astronomy",
              "Technology Talks"
            ],
            "type": "Science & Technology"
          },
          {
            "id": "Jct4r2aHqG2QuGIXJhrf",
            "categories": [
              "Home Improvement Workshops",
              "Gardening Classes",
              "Home Shows",
              "DIY Events"
            ],
            "type": "Home & Garden"
          },
          {
            "id": "JdOunmHjdVj0rklcsQmE",
            "categories": [
              "Local Community Events",
              "Environmental Causes",
              "Social Activism",
              "Fundraising for Causes"
            ],
            "type": "Community & Causes"
          },
          {
            "id": "Je2yuUnYBzk9NIrJZk92",
            "categories": [
              "Hobbyist Gatherings",
              "Hobby Workshops",
              "Special Interest Groups",
              "Craft Fairs"
            ],
            "type": "Hobbies & Interests"
          },
          {
            "id": "JgwZTdJOdxOT7DyJTyVZ",
            "categories": [
              "Theater Productions",
              "Magic Shows",
              "Stand - Up Comedy",
              "Movie Screenings"
            ],
            "type": "Entertainment & Shows"
          },
          {
            "id": "Jh8FsktySQnFWW218MUt",
            "categories": [
              "Tech Conferences",
              "Startup Events",
              "Coding Workshops",
              "Tech Expos"
            ],
            "type": "Tech & Innovation"
          },
          {
            "id": "JjMsO11hp2wayqPliL65",
            "categories": [
              "Local Community Events",
              "Environmental Causes",
              "Social Activism",
              "Fundraising for Causes"
            ],
            "type": "Community & Causes"
          },
          {
            "id": "Jm3FOHb4rVu3cgXTGYlY",
            "categories": [
              "Local Community Events",
              "Environmental Causes",
              "Social Activism",
              "Fundraising for Causes"
            ],
            "type": "Community & Causes"
          },
          {
            "id": "JrELR5C6GyvarwnkKxUy",
            "categories": [
              "Hobbyist Gatherings",
              "Hobby Workshops",
              "Special Interest Groups",
              "Craft Fairs"
            ],
            "type": "Hobbies & Interests"
          },
          {
            "id": "JsxCyA1ReBqAGMY8Gsyi",
            "categories": [
              "Food & Dining",
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Sports & Fitness"
          },
          {
            "id": "JuCKu9FnNDgh8AaNXwmW",
            "categories": [
              "Sporting Events",
              "Fitness Classes",
              "Yoga & Meditation",
              "Outdoor Activities"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "JuCqGjNcV06nQrZOxCJD",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "JviBpRS4aGh7EMpPGSGp",
            "categories": [
              "Sporting Events",
              "Fitness Classes",
              "Yoga & Meditation",
              "Outdoor Activities"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "Jwu4yrL94kuLm9c0ePgE",
            "categories": [
              "Charity Galas",
              "Fundraising Events",
              "Volunteer Opportunities",
              "Community Outreach"
            ],
            "type": "Charity & Fundraising"
          },
          {
            "id": "Jwxw4QyCutYRDzoxBzy8",
            "categories": [
              "Family - Friendly Events",
              "Children's Workshops",
              "Kid - Friendly Activities",
              "Amusement Parks"
            ],
            "type": "Family & Kids"
          },
          {
            "id": "JyalDoTIlkFvHIeAAHbQ",
            "categories": [
              "Tech Conferences",
              "Startup Events",
              "Coding Workshops",
              "Tech Expos"
            ],
            "type": "Tech & Innovation"
          },
          {
            "id": "K0zuUFq4iSRrW5BMht2j",
            "categories": [
              "Indian Cuisine",
              "Italian Cuisine",
              "American Fare",
              "Asian Fusion",
              "Mediterranean",
              "Mexican & Tex - Mex",
              "Sushi & Japanese",
              "Chinese Cuisine",
              "French Dining",
              "Vegetarian & Vegan",
              "Seafood Specialties",
              "BBQ & Grill",
              "Steakhouse",
              "Fast Food & Burgers",
              "Cafes & Bakeries",
              "Food Trucks",
              "Fine Dining",
              "Farm - to - Table",
              "Ethnic Eateries"
            ],
            "type": "Food styles"
          },
          {
            "id": "K5IsuC0P0MTl7upKUl4U",
            "categories": [
              "Charity Galas",
              "Fundraising Events",
              "Volunteer Opportunities",
              "Community Outreach"
            ],
            "type": "Charity & Fundraising"
          },
          {
            "id": "K6Mb6QSVXAmRlST6UTg7",
            "categories": [
              "Family - Friendly Events",
              "Children's Workshops",
              "Kid - Friendly Activities",
              "Amusement Parks"
            ],
            "type": "Family & Kids"
          },
          {
            "id": "K6rdCewnB056xE6Vtkb4",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "K787FWb1cinQGXRjDXO3",
            "categories": [
              "Fashion Shows",
              "Beauty Workshops",
              "Pop - Up Boutiques",
              "Makeup Classes"
            ],
            "type": "Fashion & Beauty"
          },
          {
            "id": "K9bPd55zCJOWdv7QVeT5",
            "categories": [
              "Wellness Retreats",
              "Health Workshops",
              "Mindfulness Events",
              "Medical Seminars"
            ],
            "type": "Health & Wellness"
          },
          {
            "id": "KAEeMJpON6RU7q4G2EAx",
            "categories": [
              "Wellness Retreats",
              "Health Workshops",
              "Mindfulness Events",
              "Medical Seminars"
            ],
            "type": "Health & Wellness"
          },
          {
            "id": "KB1ySd9UANQqCksFGaIu",
            "categories": [
              "Pet Adoption Events",
              "Animal Welfare Fundraisers",
              "Pet - Friendly Activities",
              "Zoo Visits"
            ],
            "type": "Pets & Animals"
          },
          {
            "id": "KC49jV7zHuGvf5tJVyCu",
            "categories": [
              "Home Improvement Workshops",
              "Gardening Classes",
              "Home Shows",
              "DIY Events"
            ],
            "type": "Home & Garden"
          },
          {
            "id": "KEiSJ2ZHgNjPXj6myGGe",
            "categories": [
              "Networking Events",
              "Workshops & Seminars",
              "Conferences",
              "Job Fairs"
            ],
            "type": "Networking & Business"
          },
          {
            "id": "KEyJzmBh0Bl9OzHSipKD",
            "categories": [
              "Charity Galas",
              "Fundraising Events",
              "Volunteer Opportunities",
              "Community Outreach"
            ],
            "type": "Charity & Fundraising"
          },
          {
            "id": "KGRyR8zeAjGdiS97jJtw",
            "categories": [
              "Family - Friendly Events",
              "Children's Workshops",
              "Kid - Friendly Activities",
              "Amusement Parks"
            ],
            "type": "Family & Kids"
          },
          {
            "id": "KGifNb9xX8P6blokNETc",
            "categories": [
              "Hobbyist Gatherings",
              "Hobby Workshops",
              "Special Interest Groups",
              "Craft Fairs"
            ],
            "type": "Hobbies & Interests"
          },
          {
            "id": "KGzssLIEsWoThmBPSKOv",
            "categories": [
              "Educational Workshops",
              "Lectures & Talks",
              "Online Courses",
              "Tutoring Services"
            ],
            "type": "Education & Learning"
          },
          {
            "id": "KJxc3a8VtJtHr0XTc9UP",
            "categories": [
              "Indian Cuisine",
              "Italian Cuisine",
              "American Fare",
              "Asian Fusion",
              "Mediterranean",
              "Mexican & Tex - Mex",
              "Sushi & Japanese",
              "Chinese Cuisine",
              "French Dining",
              "Vegetarian & Vegan",
              "Seafood Specialties",
              "BBQ & Grill",
              "Steakhouse",
              "Fast Food & Burgers",
              "Cafes & Bakeries",
              "Food Trucks",
              "Fine Dining",
              "Farm - to - Table",
              "Ethnic Eateries"
            ],
            "type": "Food styles"
          },
          {
            "id": "KJy0bNCNuwA2o3fOPvQu",
            "categories": [
              "Pet Adoption Events",
              "Animal Welfare Fundraisers",
              "Pet - Friendly Activities",
              "Zoo Visits"
            ],
            "type": "Pets & Animals"
          },
          {
            "id": "KLD9MpS5YBHl9RgY5gqt",
            "categories": [
              "Local Community Events",
              "Environmental Causes",
              "Social Activism",
              "Fundraising for Causes"
            ],
            "type": "Community & Causes"
          },
          {
            "id": "KN6xfyZiBZVUCQ8FXd52",
            "categories": [
              "Educational Workshops",
              "Lectures & Talks",
              "Online Courses",
              "Tutoring Services"
            ],
            "type": "Education & Learning"
          },
          {
            "id": "KNwuhGcbm3KAHF8ysUA3",
            "categories": [
              "Science Exhibitions",
              "STEM Workshops",
              "Space & Astronomy",
              "Technology Talks"
            ],
            "type": "Science & Technology"
          },
          {
            "id": "KRPJx4yz6wdB1oJHjM7j",
            "categories": [
              "Educational Workshops",
              "Lectures & Talks",
              "Online Courses",
              "Tutoring Services"
            ],
            "type": "Education & Learning"
          },
          {
            "id": "KSB9hZynwtwrCrE067aO",
            "categories": [
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Food & Dining"
          },
          {
            "id": "KSEV4Z0pOC9OyOxXH0fW",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "KVbwJSmjzrmgScEOb10a",
            "categories": [
              "Tech Conferences",
              "Startup Events",
              "Coding Workshops",
              "Tech Expos"
            ],
            "type": "Tech & Innovation"
          },
          {
            "id": "KXIhpqfdM4rEzqIhQ4mr",
            "categories": [
              "Travel Expos",
              "Adventure Tours",
              "Backpacking Trips",
              "Cultural Experiences"
            ],
            "type": "Travel & Adventure"
          },
          {
            "id": "KY03WsU4a5ueSrHfwufT",
            "categories": [
              "Sporting Events",
              "Fitness Classes",
              "Yoga & Meditation",
              "Outdoor Activities"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "KZqlKK34PvpQysBTHrzy",
            "categories": [
              "Local Community Events",
              "Environmental Causes",
              "Social Activism",
              "Fundraising for Causes"
            ],
            "type": "Community & Causes"
          },
          {
            "id": "KaSBJcsjgmrJrYKIV9Fp",
            "categories": [
              "Food & Dining",
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Sports & Fitness"
          },
          {
            "id": "KbRsOrgxuBVx95sNtHHX",
            "categories": [
              "Family - Friendly Events",
              "Children's Workshops",
              "Kid - Friendly Activities",
              "Amusement Parks"
            ],
            "type": "Family & Kids"
          },
          {
            "id": "Kdi1q2xn3VRezM2RbJ4e",
            "categories": [
              "Sporting Events",
              "Fitness Classes",
              "Yoga & Meditation",
              "Outdoor Activities"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "KfkBKLtoPFW5hQel7EwR",
            "categories": [
              "Educational Workshops",
              "Lectures & Talks",
              "Online Courses",
              "Tutoring Services"
            ],
            "type": "Education & Learning"
          },
          {
            "id": "KgNZq2DY0FJjGBC83qBs",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "Kgs3kLnDJIjuCWvpAVvc",
            "categories": [
              "Fashion Shows",
              "Beauty Workshops",
              "Pop - Up Boutiques",
              "Makeup Classes"
            ],
            "type": "Fashion & Beauty"
          },
          {
            "id": "KiDbgiTVdImPWCnNHmYe",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "KiXCHZNi4a6siIt6KUit",
            "categories": [
              "Family - Friendly Events",
              "Children's Workshops",
              "Kid - Friendly Activities",
              "Amusement Parks"
            ],
            "type": "Family & Kids"
          },
          {
            "id": "Kiyy1ltMb9EaPQ1tK93R",
            "categories": [
              "Food & Dining",
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Sports & Fitness"
          },
          {
            "id": "KjsYWDJX3RQVfoTanaXW",
            "categories": [
              "Pet Adoption Events",
              "Animal Welfare Fundraisers",
              "Pet - Friendly Activities",
              "Zoo Visits"
            ],
            "type": "Pets & Animals"
          },
          {
            "id": "KkEiVqEKueWriLCzCx9G",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "KkU4ryeDrSfSrwreZ2HN",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "Kl3KqkorAT63o6m0Y3Pp",
            "categories": [
              "Indian Cuisine",
              "Italian Cuisine",
              "American Fare",
              "Asian Fusion",
              "Mediterranean",
              "Mexican & Tex - Mex",
              "Sushi & Japanese",
              "Chinese Cuisine",
              "French Dining",
              "Vegetarian & Vegan",
              "Seafood Specialties",
              "BBQ & Grill",
              "Steakhouse",
              "Fast Food & Burgers",
              "Cafes & Bakeries",
              "Food Trucks",
              "Fine Dining",
              "Farm - to - Table",
              "Ethnic Eateries"
            ],
            "type": "Food styles"
          },
          {
            "id": "Kn5fyg8RPxj8mrDFXQcn",
            "categories": [
              "Food & Dining",
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Sports & Fitness"
          },
          {
            "id": "KnHmQzdjbqltQGtl6OeE",
            "categories": [
              "Tech Conferences",
              "Startup Events",
              "Coding Workshops",
              "Tech Expos"
            ],
            "type": "Tech & Innovation"
          },
          {
            "id": "KnUkJeJ9e1QSOqjbenlC",
            "categories": [
              "Hobbyist Gatherings",
              "Hobby Workshops",
              "Special Interest Groups",
              "Craft Fairs"
            ],
            "type": "Hobbies & Interests"
          },
          {
            "id": "KoSOluDLfkVuzOMoFfGn",
            "categories": [
              "Charity Galas",
              "Fundraising Events",
              "Volunteer Opportunities",
              "Community Outreach"
            ],
            "type": "Charity & Fundraising"
          },
          {
            "id": "KpfqB7RJzcIYvKwQJzHn",
            "categories": [
              "Educational Workshops",
              "Lectures & Talks",
              "Online Courses",
              "Tutoring Services"
            ],
            "type": "Education & Learning"
          },
          {
            "id": "KxC1ABsv9gc9ktQtgmt6",
            "categories": [
              "Science Exhibitions",
              "STEM Workshops",
              "Space & Astronomy",
              "Technology Talks"
            ],
            "type": "Science & Technology"
          },
          {
            "id": "KxFUafv6iYGwCsMcaSQT",
            "categories": [
              "Sporting Events",
              "Fitness Classes",
              "Yoga & Meditation",
              "Outdoor Activities"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "Kxzqbkkuthgk9GuAeHQ0",
            "categories": [
              "Charity Galas",
              "Fundraising Events",
              "Volunteer Opportunities",
              "Community Outreach"
            ],
            "type": "Charity & Fundraising"
          },
          {
            "id": "KzrOJgvhTqvJe3QwqULV",
            "categories": [
              "Sporting Events",
              "Fitness Classes",
              "Yoga & Meditation",
              "Outdoor Activities"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "L2UMx6qDGGsbdnF13Y1b",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "L37ogolnqRZS4CJjBIhZ",
            "categories": [
              "Theater Productions",
              "Magic Shows",
              "Stand - Up Comedy",
              "Movie Screenings"
            ],
            "type": "Entertainment & Shows"
          },
          {
            "id": "L3QjiIrg6PKtJF17Ghq1",
            "categories": [
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Food & Dining"
          },
          {
            "id": "L7V5mL3lyZXfSHU1uZKG",
            "categories": [
              "Food & Dining",
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Sports & Fitness"
          },
          {
            "id": "L7ogYJgIuxI2CjMHY90Q",
            "categories": [
              "Family - Friendly Events",
              "Children's Workshops",
              "Kid - Friendly Activities",
              "Amusement Parks"
            ],
            "type": "Family & Kids"
          },
          {
            "id": "L9GHgVQCHONNsyDb2YQw",
            "categories": [
              "Local Community Events",
              "Environmental Causes",
              "Social Activism",
              "Fundraising for Causes"
            ],
            "type": "Community & Causes"
          },
          {
            "id": "L9ob2eWfV46lRIjy1bzK",
            "categories": [
              "Local Community Events",
              "Environmental Causes",
              "Social Activism",
              "Fundraising for Causes"
            ],
            "type": "Community & Causes"
          },
          {
            "id": "LAwMxIkq87xzTAiamRGv",
            "categories": [
              "Home Improvement Workshops",
              "Gardening Classes",
              "Home Shows",
              "DIY Events"
            ],
            "type": "Home & Garden"
          },
          {
            "id": "LCbmGx9TKKWCOU5uX5YV",
            "categories": [
              "Pet Adoption Events",
              "Animal Welfare Fundraisers",
              "Pet - Friendly Activities",
              "Zoo Visits"
            ],
            "type": "Pets & Animals"
          },
          {
            "id": "LDByQ5IudAR5fEPi6kvf",
            "categories": [
              "Charity Galas",
              "Fundraising Events",
              "Volunteer Opportunities",
              "Community Outreach"
            ],
            "type": "Charity & Fundraising"
          },
          {
            "id": "LFTpwgFZK7vG2IilPQfN",
            "categories": [
              "Home Improvement Workshops",
              "Gardening Classes",
              "Home Shows",
              "DIY Events"
            ],
            "type": "Home & Garden"
          },
          {
            "id": "LG9ehc5ND302y50tnWmm",
            "categories": [
              "Food & Dining",
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Sports & Fitness"
          },
          {
            "id": "LGNYVZ3udUL8v8Inc1cD",
            "categories": [
              "Home Improvement Workshops",
              "Gardening Classes",
              "Home Shows",
              "DIY Events"
            ],
            "type": "Home & Garden"
          },
          {
            "id": "LGPaickBitzsN9wzgLYq",
            "categories": [
              "Charity Galas",
              "Fundraising Events",
              "Volunteer Opportunities",
              "Community Outreach"
            ],
            "type": "Charity & Fundraising"
          },
          {
            "id": "LNtT8gzn5Wxcaxi0dUjf",
            "categories": [
              "Pet Adoption Events",
              "Animal Welfare Fundraisers",
              "Pet - Friendly Activities",
              "Zoo Visits"
            ],
            "type": "Pets & Animals"
          },
          {
            "id": "LRaxBhcWcsdtFR6mSZ1A",
            "categories": [
              "Pet Adoption Events",
              "Animal Welfare Fundraisers",
              "Pet - Friendly Activities",
              "Zoo Visits"
            ],
            "type": "Pets & Animals"
          },
          {
            "id": "LTLEjjTqs0vh0WuXL0D0",
            "categories": [
              "Religious Gatherings",
              "Spiritual Retreats",
              "Meditation Groups",
              "Interfaith Dialogues"
            ],
            "type": "Religion & Spirituality"
          },
          {
            "id": "LTcmai4eKVRJRxg2wiV1",
            "categories": [
              "Family - Friendly Events",
              "Children's Workshops",
              "Kid - Friendly Activities",
              "Amusement Parks"
            ],
            "type": "Family & Kids"
          },
          {
            "id": "LWQXE4zGSEpbKo80giwG",
            "categories": [
              "Hobbyist Gatherings",
              "Hobby Workshops",
              "Special Interest Groups",
              "Craft Fairs"
            ],
            "type": "Hobbies & Interests"
          },
          {
            "id": "LWcw8OR2mK9gTDRUfYHU",
            "categories": [
              "Travel Expos",
              "Adventure Tours",
              "Backpacking Trips",
              "Cultural Experiences"
            ],
            "type": "Travel & Adventure"
          },
          {
            "id": "LXfZE4FaKuOKdH4e6G23",
            "categories": [
              "Food & Dining",
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Sports & Fitness"
          },
          {
            "id": "LYBt0rc5qnCtqZF4GKbv",
            "categories": [
              "Science Exhibitions",
              "STEM Workshops",
              "Space & Astronomy",
              "Technology Talks"
            ],
            "type": "Science & Technology"
          },
          {
            "id": "LYG27NdNX5HyWXs0wM9G",
            "categories": [
              "Indian Cuisine",
              "Italian Cuisine",
              "American Fare",
              "Asian Fusion",
              "Mediterranean",
              "Mexican & Tex - Mex",
              "Sushi & Japanese",
              "Chinese Cuisine",
              "French Dining",
              "Vegetarian & Vegan",
              "Seafood Specialties",
              "BBQ & Grill",
              "Steakhouse",
              "Fast Food & Burgers",
              "Cafes & Bakeries",
              "Food Trucks",
              "Fine Dining",
              "Farm - to - Table",
              "Ethnic Eateries"
            ],
            "type": "Food styles"
          },
          {
            "id": "LYNPL9x2Z7jL2etMnRDd",
            "categories": [
              "Food & Dining",
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Sports & Fitness"
          },
          {
            "id": "Laxqe4yrwIPv7oDKoqJS",
            "categories": [
              "Educational Workshops",
              "Lectures & Talks",
              "Online Courses",
              "Tutoring Services"
            ],
            "type": "Education & Learning"
          },
          {
            "id": "Lb0kcCrf2UOCB6noshzj",
            "categories": [
              "Religious Gatherings",
              "Spiritual Retreats",
              "Meditation Groups",
              "Interfaith Dialogues"
            ],
            "type": "Religion & Spirituality"
          },
          {
            "id": "Lb7b4QPnHtSiSo2nVAoN",
            "categories": [
              "Pet Adoption Events",
              "Animal Welfare Fundraisers",
              "Pet - Friendly Activities",
              "Zoo Visits"
            ],
            "type": "Pets & Animals"
          },
          {
            "id": "LbXMjLGvvJcS42CLBd9U",
            "categories": [
              "Indian Cuisine",
              "Italian Cuisine",
              "American Fare",
              "Asian Fusion",
              "Mediterranean",
              "Mexican & Tex - Mex",
              "Sushi & Japanese",
              "Chinese Cuisine",
              "French Dining",
              "Vegetarian & Vegan",
              "Seafood Specialties",
              "BBQ & Grill",
              "Steakhouse",
              "Fast Food & Burgers",
              "Cafes & Bakeries",
              "Food Trucks",
              "Fine Dining",
              "Farm - to - Table",
              "Ethnic Eateries"
            ],
            "type": "Food styles"
          },
          {
            "id": "LbZvuyTqAHPSmJGpVouQ",
            "categories": [
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Food & Dining"
          },
          {
            "id": "LcbzjCU2Q4gB8l0WslkA",
            "categories": [
              "Family - Friendly Events",
              "Children's Workshops",
              "Kid - Friendly Activities",
              "Amusement Parks"
            ],
            "type": "Family & Kids"
          },
          {
            "id": "Lcy5M36lI7olXDPikJAf",
            "categories": [
              "Hobbyist Gatherings",
              "Hobby Workshops",
              "Special Interest Groups",
              "Craft Fairs"
            ],
            "type": "Hobbies & Interests"
          },
          {
            "id": "Le8ZpzTS31vVnzsjnczo",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "LeyyDtxW3INcyKgJXyyt",
            "categories": [
              "Networking Events",
              "Workshops & Seminars",
              "Conferences",
              "Job Fairs"
            ],
            "type": "Networking & Business"
          },
          {
            "id": "Lh4D8QaImBWF6CpgFNPB",
            "categories": [
              "Hobbyist Gatherings",
              "Hobby Workshops",
              "Special Interest Groups",
              "Craft Fairs"
            ],
            "type": "Hobbies & Interests"
          },
          {
            "id": "Li1aY8rwU8bQplBgGSNx",
            "categories": [
              "Wellness Retreats",
              "Health Workshops",
              "Mindfulness Events",
              "Medical Seminars"
            ],
            "type": "Health & Wellness"
          },
          {
            "id": "LlQEAzUlmtRM8JZGKLGU",
            "categories": [
              "Wellness Retreats",
              "Health Workshops",
              "Mindfulness Events",
              "Medical Seminars"
            ],
            "type": "Health & Wellness"
          },
          {
            "id": "LolNWI4EBof1x7XFHzNg",
            "categories": [
              "Tech Conferences",
              "Startup Events",
              "Coding Workshops",
              "Tech Expos"
            ],
            "type": "Tech & Innovation"
          },
          {
            "id": "Lqn0Ads3hKCoT0mJAbv1",
            "categories": [
              "Food & Dining",
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Sports & Fitness"
          },
          {
            "id": "Lre9irQ5PBKNFOrUMnUI",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "LsTg709VRw8Ti0zSclNe",
            "categories": [
              "Sporting Events",
              "Fitness Classes",
              "Yoga & Meditation",
              "Outdoor Activities"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "LsbJoY44BnSTfnMVWFxw",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "LtFERFHG4GKjQDRRUzhs",
            "categories": [
              "Theater Productions",
              "Magic Shows",
              "Stand - Up Comedy",
              "Movie Screenings"
            ],
            "type": "Entertainment & Shows"
          },
          {
            "id": "LwTBNuEfT58gZzqkIQf8",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "LxyCZarFPGb3nG9yc6lI",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "LyKiMj5otTd2ygyJXOyy",
            "categories": [
              "Pet Adoption Events",
              "Animal Welfare Fundraisers",
              "Pet - Friendly Activities",
              "Zoo Visits"
            ],
            "type": "Pets & Animals"
          },
          {
            "id": "M0aSevUesQ2PFeT9uUKo",
            "categories": [
              "Theater Productions",
              "Magic Shows",
              "Stand - Up Comedy",
              "Movie Screenings"
            ],
            "type": "Entertainment & Shows"
          },
          {
            "id": "M0fveyReiJgNFzix4apI",
            "categories": [
              "Fashion Shows",
              "Beauty Workshops",
              "Pop - Up Boutiques",
              "Makeup Classes"
            ],
            "type": "Fashion & Beauty"
          },
          {
            "id": "M2GMZVPcTbmB912nQjj2",
            "categories": [
              "Travel Expos",
              "Adventure Tours",
              "Backpacking Trips",
              "Cultural Experiences"
            ],
            "type": "Travel & Adventure"
          },
          {
            "id": "M6lMThCG3Yx0h51OtpJR",
            "categories": [
              "Educational Workshops",
              "Lectures & Talks",
              "Online Courses",
              "Tutoring Services"
            ],
            "type": "Education & Learning"
          },
          {
            "id": "M7UYpKOM9J3XIs1czRPa",
            "categories": [
              "Networking Events",
              "Workshops & Seminars",
              "Conferences",
              "Job Fairs"
            ],
            "type": "Networking & Business"
          },
          {
            "id": "M82msT4v2dPKUpha8cRt",
            "categories": [
              "Networking Events",
              "Workshops & Seminars",
              "Conferences",
              "Job Fairs"
            ],
            "type": "Networking & Business"
          },
          {
            "id": "M8YooqrXwFzLsjYb9LVm",
            "categories": [
              "Theater Productions",
              "Magic Shows",
              "Stand - Up Comedy",
              "Movie Screenings"
            ],
            "type": "Entertainment & Shows"
          },
          {
            "id": "M8ih1REo9YPJNBcmYTQp",
            "categories": [
              "Theater Productions",
              "Magic Shows",
              "Stand - Up Comedy",
              "Movie Screenings"
            ],
            "type": "Entertainment & Shows"
          },
          {
            "id": "M9REM9mUHYfGCJNpXplv",
            "categories": [
              "Travel Expos",
              "Adventure Tours",
              "Backpacking Trips",
              "Cultural Experiences"
            ],
            "type": "Travel & Adventure"
          },
          {
            "id": "MBCegxaQ1rwpFh80YFtU",
            "categories": [
              "Tech Conferences",
              "Startup Events",
              "Coding Workshops",
              "Tech Expos"
            ],
            "type": "Tech & Innovation"
          },
          {
            "id": "MDGwMyqzryE1tOSVwZ8S",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "MEXF3LbLXCZe4ALsE9w6",
            "categories": [
              "Food & Dining",
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Sports & Fitness"
          },
          {
            "id": "MEejeEQgvYsGzzsI5A9w",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "MG321WOHTOoOYSLODUrE",
            "categories": [
              "Tech Conferences",
              "Startup Events",
              "Coding Workshops",
              "Tech Expos"
            ],
            "type": "Tech & Innovation"
          },
          {
            "id": "MHHZyMepgSx1mBvgK0Ff",
            "categories": [
              "Local Community Events",
              "Environmental Causes",
              "Social Activism",
              "Fundraising for Causes"
            ],
            "type": "Community & Causes"
          },
          {
            "id": "MLWICeGZ1vLTo4TGgyJQ",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "MNqt2QQhZdxx8JZmCwX6",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "MQ8UhTPWwzQLJ6frYg1j",
            "categories": [
              "Theater Productions",
              "Magic Shows",
              "Stand - Up Comedy",
              "Movie Screenings"
            ],
            "type": "Entertainment & Shows"
          },
          {
            "id": "MQI0a2W6JIgJ0QFXyKWS",
            "categories": [
              "Sporting Events",
              "Fitness Classes",
              "Yoga & Meditation",
              "Outdoor Activities"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "MTXDkNmxk3TA2bcxpCrP",
            "categories": [
              "Charity Galas",
              "Fundraising Events",
              "Volunteer Opportunities",
              "Community Outreach"
            ],
            "type": "Charity & Fundraising"
          },
          {
            "id": "MV5FHhTEwlA6rQPOAfL9",
            "categories": [
              "Networking Events",
              "Workshops & Seminars",
              "Conferences",
              "Job Fairs"
            ],
            "type": "Networking & Business"
          },
          {
            "id": "MV5woTuNrLhMkyXPuJC6",
            "categories": [
              "Tech Conferences",
              "Startup Events",
              "Coding Workshops",
              "Tech Expos"
            ],
            "type": "Tech & Innovation"
          },
          {
            "id": "MVbcukm5eWtfzU32yAfi",
            "categories": [
              "Theater Productions",
              "Magic Shows",
              "Stand - Up Comedy",
              "Movie Screenings"
            ],
            "type": "Entertainment & Shows"
          },
          {
            "id": "MXj3rH5XwzZKR7pERSjt",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "MZL7iWiEkghJfmsa3IIx",
            "categories": [
              "Educational Workshops",
              "Lectures & Talks",
              "Online Courses",
              "Tutoring Services"
            ],
            "type": "Education & Learning"
          },
          {
            "id": "MdBsDnp4rdSkSDXbxT5Q",
            "categories": [
              "Networking Events",
              "Workshops & Seminars",
              "Conferences",
              "Job Fairs"
            ],
            "type": "Networking & Business"
          },
          {
            "id": "MeKRhl1aSD3n7Lah2Bzf",
            "categories": [
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Food & Dining"
          },
          {
            "id": "MetxQg0TbTBEkzSGPSij",
            "categories": [
              "Family - Friendly Events",
              "Children's Workshops",
              "Kid - Friendly Activities",
              "Amusement Parks"
            ],
            "type": "Family & Kids"
          },
          {
            "id": "Mf23MvAXbaWeSI5Uv1l2",
            "categories": [
              "Home Improvement Workshops",
              "Gardening Classes",
              "Home Shows",
              "DIY Events"
            ],
            "type": "Home & Garden"
          },
          {
            "id": "MhRPa6Td0wxMku22Y4H3",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "Mkn5rkDC1UUqxjcXGzXq",
            "categories": [
              "Tech Conferences",
              "Startup Events",
              "Coding Workshops",
              "Tech Expos"
            ],
            "type": "Tech & Innovation"
          },
          {
            "id": "Ml8w3oEiW3jQuElwIKYL",
            "categories": [
              "Science Exhibitions",
              "STEM Workshops",
              "Space & Astronomy",
              "Technology Talks"
            ],
            "type": "Science & Technology"
          },
          {
            "id": "MmkCVCmfkLgXdYhIUg5v",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "Mn39zy8AjS2AMhWpwNDG",
            "categories": [
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Food & Dining"
          },
          {
            "id": "MnFRoMPWjeDT87fhKXzN",
            "categories": [
              "Indian Cuisine",
              "Italian Cuisine",
              "American Fare",
              "Asian Fusion",
              "Mediterranean",
              "Mexican & Tex - Mex",
              "Sushi & Japanese",
              "Chinese Cuisine",
              "French Dining",
              "Vegetarian & Vegan",
              "Seafood Specialties",
              "BBQ & Grill",
              "Steakhouse",
              "Fast Food & Burgers",
              "Cafes & Bakeries",
              "Food Trucks",
              "Fine Dining",
              "Farm - to - Table",
              "Ethnic Eateries"
            ],
            "type": "Food styles"
          },
          {
            "id": "MnoYrb4btyMHQzX52GoB",
            "categories": [
              "Fashion Shows",
              "Beauty Workshops",
              "Pop - Up Boutiques",
              "Makeup Classes"
            ],
            "type": "Fashion & Beauty"
          },
          {
            "id": "MojbnB6a78Jq1dgeHQ0o",
            "categories": [
              "Educational Workshops",
              "Lectures & Talks",
              "Online Courses",
              "Tutoring Services"
            ],
            "type": "Education & Learning"
          },
          {
            "id": "MpN7CE7zGZTCpDlaUxud",
            "categories": [
              "Family - Friendly Events",
              "Children's Workshops",
              "Kid - Friendly Activities",
              "Amusement Parks"
            ],
            "type": "Family & Kids"
          },
          {
            "id": "MpWZdYLmekBcYERuhulh",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "MpXEoWdEZGIwr8XlyW9T",
            "categories": [
              "Travel Expos",
              "Adventure Tours",
              "Backpacking Trips",
              "Cultural Experiences"
            ],
            "type": "Travel & Adventure"
          },
          {
            "id": "Mpj8QfhnCO4YkoSnzf65",
            "categories": [
              "Local Community Events",
              "Environmental Causes",
              "Social Activism",
              "Fundraising for Causes"
            ],
            "type": "Community & Causes"
          },
          {
            "id": "MsB5qxBAQ4A9plBGbXUi",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "Msslv6EXMd4z9LkGqWsl",
            "categories": [
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Food & Dining"
          },
          {
            "id": "Muebl0e2w1dLkmdpHQOG",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "Mv0qCMqX9uESUzUjO2qu",
            "categories": [
              "Wellness Retreats",
              "Health Workshops",
              "Mindfulness Events",
              "Medical Seminars"
            ],
            "type": "Health & Wellness"
          },
          {
            "id": "MxN1IQRqt665RcX7MJl8",
            "categories": [
              "Theater Productions",
              "Magic Shows",
              "Stand - Up Comedy",
              "Movie Screenings"
            ],
            "type": "Entertainment & Shows"
          },
          {
            "id": "MxQ4olPRf1UGR18NEq9P",
            "categories": [
              "Travel Expos",
              "Adventure Tours",
              "Backpacking Trips",
              "Cultural Experiences"
            ],
            "type": "Travel & Adventure"
          },
          {
            "id": "MxyROKurGTv61DYNyv2k",
            "categories": [
              "Pet Adoption Events",
              "Animal Welfare Fundraisers",
              "Pet - Friendly Activities",
              "Zoo Visits"
            ],
            "type": "Pets & Animals"
          },
          {
            "id": "N0WIp8qkdawLtnX12Lf1",
            "categories": [
              "Wellness Retreats",
              "Health Workshops",
              "Mindfulness Events",
              "Medical Seminars"
            ],
            "type": "Health & Wellness"
          },
          {
            "id": "N13aOivhlOUSwJfvQdbl",
            "categories": [
              "Educational Workshops",
              "Lectures & Talks",
              "Online Courses",
              "Tutoring Services"
            ],
            "type": "Education & Learning"
          },
          {
            "id": "N2dGDfk8wihcc1kUUQ4p",
            "categories": [
              "Home Improvement Workshops",
              "Gardening Classes",
              "Home Shows",
              "DIY Events"
            ],
            "type": "Home & Garden"
          },
          {
            "id": "N48Ek0ORK0OjLpuxqnIq",
            "categories": [
              "Pet Adoption Events",
              "Animal Welfare Fundraisers",
              "Pet - Friendly Activities",
              "Zoo Visits"
            ],
            "type": "Pets & Animals"
          },
          {
            "id": "N4jzkd69rVlsgAsRGSBa",
            "categories": [
              "Home Improvement Workshops",
              "Gardening Classes",
              "Home Shows",
              "DIY Events"
            ],
            "type": "Home & Garden"
          },
          {
            "id": "N53kUCp1AoUjWi5g1Wp1",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "N55oQ8QJDvCNuctCzurN",
            "categories": [
              "Wellness Retreats",
              "Health Workshops",
              "Mindfulness Events",
              "Medical Seminars"
            ],
            "type": "Health & Wellness"
          },
          {
            "id": "N5nXbjaMxAvzbUNQeFoK",
            "categories": [
              "Food & Dining",
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Sports & Fitness"
          },
          {
            "id": "N73HaJhBQO0UnmN7Qqrp",
            "categories": [
              "Sporting Events",
              "Fitness Classes",
              "Yoga & Meditation",
              "Outdoor Activities"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "N8fXHtkUCuDsDDApAa6T",
            "categories": [
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Food & Dining"
          },
          {
            "id": "NFFw9Xr2CX6cShlYakWK",
            "categories": [
              "Tech Conferences",
              "Startup Events",
              "Coding Workshops",
              "Tech Expos"
            ],
            "type": "Tech & Innovation"
          },
          {
            "id": "NFi9f4c9y20p7A9pLGro",
            "categories": [
              "Charity Galas",
              "Fundraising Events",
              "Volunteer Opportunities",
              "Community Outreach"
            ],
            "type": "Charity & Fundraising"
          },
          {
            "id": "NFjw8pgnkO3eey38Ocuo",
            "categories": [
              "Indian Cuisine",
              "Italian Cuisine",
              "American Fare",
              "Asian Fusion",
              "Mediterranean",
              "Mexican & Tex - Mex",
              "Sushi & Japanese",
              "Chinese Cuisine",
              "French Dining",
              "Vegetarian & Vegan",
              "Seafood Specialties",
              "BBQ & Grill",
              "Steakhouse",
              "Fast Food & Burgers",
              "Cafes & Bakeries",
              "Food Trucks",
              "Fine Dining",
              "Farm - to - Table",
              "Ethnic Eateries"
            ],
            "type": "Food styles"
          },
          {
            "id": "NGW0Lbz8ZB3QyQHPjmoF",
            "categories": [
              "Home Improvement Workshops",
              "Gardening Classes",
              "Home Shows",
              "DIY Events"
            ],
            "type": "Home & Garden"
          },
          {
            "id": "NGtobe2z8JWSOraq41cd",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "NGxEoDdMhA6lzRYzy2an",
            "categories": [
              "Science Exhibitions",
              "STEM Workshops",
              "Space & Astronomy",
              "Technology Talks"
            ],
            "type": "Science & Technology"
          },
          {
            "id": "NH6oaqNdzulN54SPvA5Q",
            "categories": [
              "Religious Gatherings",
              "Spiritual Retreats",
              "Meditation Groups",
              "Interfaith Dialogues"
            ],
            "type": "Religion & Spirituality"
          },
          {
            "id": "NHk9dw6mCVcH8InKGGQt",
            "categories": [
              "Food & Dining",
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Sports & Fitness"
          },
          {
            "id": "NI00RPMVlsQerXucEK8V",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "NI38z1z8eukV1XI2dfGB",
            "categories": [
              "Theater Productions",
              "Magic Shows",
              "Stand - Up Comedy",
              "Movie Screenings"
            ],
            "type": "Entertainment & Shows"
          },
          {
            "id": "NIE0OIePjG3jYaS7S41y",
            "categories": [
              "Networking Events",
              "Workshops & Seminars",
              "Conferences",
              "Job Fairs"
            ],
            "type": "Networking & Business"
          },
          {
            "id": "NISYlGyZUhq9Rdso6jaC",
            "categories": [
              "Wellness Retreats",
              "Health Workshops",
              "Mindfulness Events",
              "Medical Seminars"
            ],
            "type": "Health & Wellness"
          },
          {
            "id": "NJAcj6LxxFZUpNmkNFTn",
            "categories": [
              "Tech Conferences",
              "Startup Events",
              "Coding Workshops",
              "Tech Expos"
            ],
            "type": "Tech & Innovation"
          },
          {
            "id": "NKsKLJXVhaorlf6HTNMj",
            "categories": [
              "Charity Galas",
              "Fundraising Events",
              "Volunteer Opportunities",
              "Community Outreach"
            ],
            "type": "Charity & Fundraising"
          },
          {
            "id": "NLVFEuMicDqGvntKfysO",
            "categories": [
              "Pet Adoption Events",
              "Animal Welfare Fundraisers",
              "Pet - Friendly Activities",
              "Zoo Visits"
            ],
            "type": "Pets & Animals"
          },
          {
            "id": "NLi71LptVHeZhA6e43FO",
            "categories": [
              "Theater Productions",
              "Magic Shows",
              "Stand - Up Comedy",
              "Movie Screenings"
            ],
            "type": "Entertainment & Shows"
          },
          {
            "id": "NPYDYUdt7uge4dxfiml7",
            "categories": [
              "Travel Expos",
              "Adventure Tours",
              "Backpacking Trips",
              "Cultural Experiences"
            ],
            "type": "Travel & Adventure"
          },
          {
            "id": "NYClDRfavaRfMKWYl2WP",
            "categories": [
              "Pet Adoption Events",
              "Animal Welfare Fundraisers",
              "Pet - Friendly Activities",
              "Zoo Visits"
            ],
            "type": "Pets & Animals"
          },
          {
            "id": "Naf7zurQtGnBesIOY0pe",
            "categories": [
              "Networking Events",
              "Workshops & Seminars",
              "Conferences",
              "Job Fairs"
            ],
            "type": "Networking & Business"
          },
          {
            "id": "Nbi9AEnSOmmAKHAOUEUG",
            "categories": [
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Food & Dining"
          },
          {
            "id": "NebJAYizWkIjILtYLZe5",
            "categories": [
              "Educational Workshops",
              "Lectures & Talks",
              "Online Courses",
              "Tutoring Services"
            ],
            "type": "Education & Learning"
          },
          {
            "id": "NgYH3YQSlNtDzHonyTYQ",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "Ngv3xZtUZAOj0gaX18ql",
            "categories": [
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Food & Dining"
          },
          {
            "id": "Nh6hcmzSGbS3fqaMgUAL",
            "categories": [
              "Local Community Events",
              "Environmental Causes",
              "Social Activism",
              "Fundraising for Causes"
            ],
            "type": "Community & Causes"
          },
          {
            "id": "NjSynVGMBkUPhVjSuAhG",
            "categories": [
              "Local Community Events",
              "Environmental Causes",
              "Social Activism",
              "Fundraising for Causes"
            ],
            "type": "Community & Causes"
          },
          {
            "id": "Nlbjra780Lpv32TM5Wxs",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "Nm3LLH2nDAdPhBSFOe8q",
            "categories": [
              "Travel Expos",
              "Adventure Tours",
              "Backpacking Trips",
              "Cultural Experiences"
            ],
            "type": "Travel & Adventure"
          },
          {
            "id": "NmlroHnRgWf5n86jJclQ",
            "categories": [
              "Wellness Retreats",
              "Health Workshops",
              "Mindfulness Events",
              "Medical Seminars"
            ],
            "type": "Health & Wellness"
          },
          {
            "id": "Npkq6F5fJdO6NBxbIW9m",
            "categories": [
              "Sporting Events",
              "Fitness Classes",
              "Yoga & Meditation",
              "Outdoor Activities"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "Nqu64N1PYRW8CkP9Y3Nd",
            "categories": [
              "Hobbyist Gatherings",
              "Hobby Workshops",
              "Special Interest Groups",
              "Craft Fairs"
            ],
            "type": "Hobbies & Interests"
          },
          {
            "id": "NrrdXEtPCrMtO8okIUzE",
            "categories": [
              "Wellness Retreats",
              "Health Workshops",
              "Mindfulness Events",
              "Medical Seminars"
            ],
            "type": "Health & Wellness"
          },
          {
            "id": "Nrv67mW2BXdmS5GpUIVI",
            "categories": [
              "Charity Galas",
              "Fundraising Events",
              "Volunteer Opportunities",
              "Community Outreach"
            ],
            "type": "Charity & Fundraising"
          },
          {
            "id": "NwhM7OKBbb5EMETIA1yG",
            "categories": [
              "Religious Gatherings",
              "Spiritual Retreats",
              "Meditation Groups",
              "Interfaith Dialogues"
            ],
            "type": "Religion & Spirituality"
          },
          {
            "id": "NzEbkJL2PkovlPUMU4lE",
            "categories": [
              "Family - Friendly Events",
              "Children's Workshops",
              "Kid - Friendly Activities",
              "Amusement Parks"
            ],
            "type": "Family & Kids"
          },
          {
            "id": "O0rukjYIVOAmNXjwnv6g",
            "categories": [
              "Family - Friendly Events",
              "Children's Workshops",
              "Kid - Friendly Activities",
              "Amusement Parks"
            ],
            "type": "Family & Kids"
          },
          {
            "id": "O2ZsExm3E7Fmq3BKrwuy",
            "categories": [
              "Science Exhibitions",
              "STEM Workshops",
              "Space & Astronomy",
              "Technology Talks"
            ],
            "type": "Science & Technology"
          },
          {
            "id": "O4nGxLTSaTCduEef5drn",
            "categories": [
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Food & Dining"
          },
          {
            "id": "O5bLme3LbkMAG5mu8bUe",
            "categories": [
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Food & Dining"
          },
          {
            "id": "O60zTMeaxXxdEdZBGcVE",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "O65EkTD5DaYspQ30LurC",
            "categories": [
              "Educational Workshops",
              "Lectures & Talks",
              "Online Courses",
              "Tutoring Services"
            ],
            "type": "Education & Learning"
          },
          {
            "id": "O66UDcMOLdHvUtXzO6bb",
            "categories": [
              "Travel Expos",
              "Adventure Tours",
              "Backpacking Trips",
              "Cultural Experiences"
            ],
            "type": "Travel & Adventure"
          },
          {
            "id": "O8iUQw2tQyHIgnp0bEIg",
            "categories": [
              "Theater Productions",
              "Magic Shows",
              "Stand - Up Comedy",
              "Movie Screenings"
            ],
            "type": "Entertainment & Shows"
          },
          {
            "id": "O8zD3nw49oDPX4iUbcbY",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "OAA3rnz9aI0t6tR14Ncf",
            "categories": [
              "Family - Friendly Events",
              "Children's Workshops",
              "Kid - Friendly Activities",
              "Amusement Parks"
            ],
            "type": "Family & Kids"
          },
          {
            "id": "OIstBFBVYXfUqvTvgf60",
            "categories": [
              "Travel Expos",
              "Adventure Tours",
              "Backpacking Trips",
              "Cultural Experiences"
            ],
            "type": "Travel & Adventure"
          },
          {
            "id": "OJ2pZGsMW93eyGLrLA7I",
            "categories": [
              "Charity Galas",
              "Fundraising Events",
              "Volunteer Opportunities",
              "Community Outreach"
            ],
            "type": "Charity & Fundraising"
          },
          {
            "id": "OJRP76sHFM7on0EUBmDW",
            "categories": [
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Food & Dining"
          },
          {
            "id": "OJruQEuZo0IO6qa0b7h9",
            "categories": [
              "Networking Events",
              "Workshops & Seminars",
              "Conferences",
              "Job Fairs"
            ],
            "type": "Networking & Business"
          },
          {
            "id": "OLOwyCaktiAZMuGWqp06",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "OO4UVmyHIK8u9DSHhcjY",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "OOsw5KMiL1d6d9KeFEGg",
            "categories": [
              "Science Exhibitions",
              "STEM Workshops",
              "Space & Astronomy",
              "Technology Talks"
            ],
            "type": "Science & Technology"
          },
          {
            "id": "OSs7FWEuSrqSH2QLjNH7",
            "categories": [
              "Theater Productions",
              "Magic Shows",
              "Stand - Up Comedy",
              "Movie Screenings"
            ],
            "type": "Entertainment & Shows"
          },
          {
            "id": "OVN0lA6rvSlSocyYqfaC",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "OWBuhdIjBJIyAhgSncHg",
            "categories": [
              "Networking Events",
              "Workshops & Seminars",
              "Conferences",
              "Job Fairs"
            ],
            "type": "Networking & Business"
          },
          {
            "id": "OWJfmhyCLzf0mZk4Bupy",
            "categories": [
              "Science Exhibitions",
              "STEM Workshops",
              "Space & Astronomy",
              "Technology Talks"
            ],
            "type": "Science & Technology"
          },
          {
            "id": "OWdAmGWxGDtvIPhm98hS",
            "categories": [
              "Religious Gatherings",
              "Spiritual Retreats",
              "Meditation Groups",
              "Interfaith Dialogues"
            ],
            "type": "Religion & Spirituality"
          },
          {
            "id": "OYObtesYI8hOpAeBDSs9",
            "categories": [
              "Tech Conferences",
              "Startup Events",
              "Coding Workshops",
              "Tech Expos"
            ],
            "type": "Tech & Innovation"
          },
          {
            "id": "Obqul9Abg6glSYk114PH",
            "categories": [
              "Science Exhibitions",
              "STEM Workshops",
              "Space & Astronomy",
              "Technology Talks"
            ],
            "type": "Science & Technology"
          },
          {
            "id": "OdFCkMmEBEFkMZxK8YwV",
            "categories": [
              "Charity Galas",
              "Fundraising Events",
              "Volunteer Opportunities",
              "Community Outreach"
            ],
            "type": "Charity & Fundraising"
          },
          {
            "id": "Off72Fq6cydyb0BfSrZF",
            "categories": [
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Food & Dining"
          },
          {
            "id": "Ojscbtcr5uhhbwnHzYQu",
            "categories": [
              "Wellness Retreats",
              "Health Workshops",
              "Mindfulness Events",
              "Medical Seminars"
            ],
            "type": "Health & Wellness"
          },
          {
            "id": "Ol6kYjYoERNuAlfCALGk",
            "categories": [
              "Hobbyist Gatherings",
              "Hobby Workshops",
              "Special Interest Groups",
              "Craft Fairs"
            ],
            "type": "Hobbies & Interests"
          },
          {
            "id": "OlGVHognCq7ZCrmCJnsU",
            "categories": [
              "Home Improvement Workshops",
              "Gardening Classes",
              "Home Shows",
              "DIY Events"
            ],
            "type": "Home & Garden"
          },
          {
            "id": "OnhddcWGwXOhX2jO3EH2",
            "categories": [
              "Family - Friendly Events",
              "Children's Workshops",
              "Kid - Friendly Activities",
              "Amusement Parks"
            ],
            "type": "Family & Kids"
          },
          {
            "id": "OnknCs1s7tFZyX6NBcdA",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "OoNWJlIUsyc9pyN0Iues",
            "categories": [
              "Sporting Events",
              "Fitness Classes",
              "Yoga & Meditation",
              "Outdoor Activities"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "OsxOCUH98Hc74sBaLkff",
            "categories": [
              "Hobbyist Gatherings",
              "Hobby Workshops",
              "Special Interest Groups",
              "Craft Fairs"
            ],
            "type": "Hobbies & Interests"
          },
          {
            "id": "OtwQhr4ui0JYtDRYZYyn",
            "categories": [
              "Food & Dining",
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Sports & Fitness"
          },
          {
            "id": "OvEFlRloQm6KqKRjiiC5",
            "categories": [
              "Networking Events",
              "Workshops & Seminars",
              "Conferences",
              "Job Fairs"
            ],
            "type": "Networking & Business"
          },
          {
            "id": "Owzp1Br2rt2qUiNZlsGM",
            "categories": [
              "Fashion Shows",
              "Beauty Workshops",
              "Pop - Up Boutiques",
              "Makeup Classes"
            ],
            "type": "Fashion & Beauty"
          },
          {
            "id": "Oxw3nvbRWGhBdyw7si1O",
            "categories": [
              "Food & Dining",
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Sports & Fitness"
          },
          {
            "id": "P1fXUfokxZsg4LNPj1nG",
            "categories": [
              "Home Improvement Workshops",
              "Gardening Classes",
              "Home Shows",
              "DIY Events"
            ],
            "type": "Home & Garden"
          },
          {
            "id": "P561j7VBjMIGGdzK3lZK",
            "categories": [
              "Hobbyist Gatherings",
              "Hobby Workshops",
              "Special Interest Groups",
              "Craft Fairs"
            ],
            "type": "Hobbies & Interests"
          },
          {
            "id": "P57ldmqN9dsKCuHtbabK",
            "categories": [
              "Sporting Events",
              "Fitness Classes",
              "Yoga & Meditation",
              "Outdoor Activities"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "P676rm2y1W3StNT0Fk9T",
            "categories": [
              "Home Improvement Workshops",
              "Gardening Classes",
              "Home Shows",
              "DIY Events"
            ],
            "type": "Home & Garden"
          },
          {
            "id": "P7zCLY9536Q9Czts8a5g",
            "categories": [
              "Theater Productions",
              "Magic Shows",
              "Stand - Up Comedy",
              "Movie Screenings"
            ],
            "type": "Entertainment & Shows"
          },
          {
            "id": "P9MwRKuSC6WitDtem95t",
            "categories": [
              "Food & Dining",
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Sports & Fitness"
          },
          {
            "id": "PASPye6LdRsHXOGTTygM",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "PBdW7vrPSTpGHYnnsGm8",
            "categories": [
              "Hobbyist Gatherings",
              "Hobby Workshops",
              "Special Interest Groups",
              "Craft Fairs"
            ],
            "type": "Hobbies & Interests"
          },
          {
            "id": "PDZHeGORNcufOhLn33nH",
            "categories": [
              "Educational Workshops",
              "Lectures & Talks",
              "Online Courses",
              "Tutoring Services"
            ],
            "type": "Education & Learning"
          },
          {
            "id": "PFf0Pxqfe9b01uUIk7pC",
            "categories": [
              "Tech Conferences",
              "Startup Events",
              "Coding Workshops",
              "Tech Expos"
            ],
            "type": "Tech & Innovation"
          },
          {
            "id": "PKVLCjIPiqZYsm7DfToO",
            "categories": [
              "Religious Gatherings",
              "Spiritual Retreats",
              "Meditation Groups",
              "Interfaith Dialogues"
            ],
            "type": "Religion & Spirituality"
          },
          {
            "id": "PKjmAtyyTVhVY17PSyem",
            "categories": [
              "Hobbyist Gatherings",
              "Hobby Workshops",
              "Special Interest Groups",
              "Craft Fairs"
            ],
            "type": "Hobbies & Interests"
          },
          {
            "id": "PKnInQFNEDwYvoNYWD0M",
            "categories": [
              "Hobbyist Gatherings",
              "Hobby Workshops",
              "Special Interest Groups",
              "Craft Fairs"
            ],
            "type": "Hobbies & Interests"
          },
          {
            "id": "PKp6ZvPGrMQtH6RSFmqY",
            "categories": [
              "Educational Workshops",
              "Lectures & Talks",
              "Online Courses",
              "Tutoring Services"
            ],
            "type": "Education & Learning"
          },
          {
            "id": "PLsITAGCHjuE9ggKr3vm",
            "categories": [
              "Sporting Events",
              "Fitness Classes",
              "Yoga & Meditation",
              "Outdoor Activities"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "PMbrUEdNmPw4lqFypyRj",
            "categories": [
              "Pet Adoption Events",
              "Animal Welfare Fundraisers",
              "Pet - Friendly Activities",
              "Zoo Visits"
            ],
            "type": "Pets & Animals"
          },
          {
            "id": "PMom21H5ityxMqTn3pvt",
            "categories": [
              "Food & Dining",
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Sports & Fitness"
          },
          {
            "id": "POUEN9gidHvIy7fDdDzD",
            "categories": [
              "Hobbyist Gatherings",
              "Hobby Workshops",
              "Special Interest Groups",
              "Craft Fairs"
            ],
            "type": "Hobbies & Interests"
          },
          {
            "id": "PPk0wpKOO4asAYLLxQya",
            "categories": [
              "Pet Adoption Events",
              "Animal Welfare Fundraisers",
              "Pet - Friendly Activities",
              "Zoo Visits"
            ],
            "type": "Pets & Animals"
          },
          {
            "id": "PSfFg3C1RWJQJuZHF6g4",
            "categories": [
              "Networking Events",
              "Workshops & Seminars",
              "Conferences",
              "Job Fairs"
            ],
            "type": "Networking & Business"
          },
          {
            "id": "PTjB1dvwudsIJrKBIbY3",
            "categories": [
              "Wellness Retreats",
              "Health Workshops",
              "Mindfulness Events",
              "Medical Seminars"
            ],
            "type": "Health & Wellness"
          },
          {
            "id": "PVXE46kvNwYBEUCEKs73",
            "categories": [
              "Educational Workshops",
              "Lectures & Talks",
              "Online Courses",
              "Tutoring Services"
            ],
            "type": "Education & Learning"
          },
          {
            "id": "PXNI5dbxmZn52j9q75Hi",
            "categories": [
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Food & Dining"
          },
          {
            "id": "PXkdFzdEfDeaQx7QGg0E",
            "categories": [
              "Fashion Shows",
              "Beauty Workshops",
              "Pop - Up Boutiques",
              "Makeup Classes"
            ],
            "type": "Fashion & Beauty"
          },
          {
            "id": "PZPXeSglX0PQZJ05p6N2",
            "categories": [
              "Theater Productions",
              "Magic Shows",
              "Stand - Up Comedy",
              "Movie Screenings"
            ],
            "type": "Entertainment & Shows"
          },
          {
            "id": "PaKS78kC8UH0wLKl63Z5",
            "categories": [
              "Educational Workshops",
              "Lectures & Talks",
              "Online Courses",
              "Tutoring Services"
            ],
            "type": "Education & Learning"
          },
          {
            "id": "Pc6AIK9731OegHMmeQBg",
            "categories": [
              "Networking Events",
              "Workshops & Seminars",
              "Conferences",
              "Job Fairs"
            ],
            "type": "Networking & Business"
          },
          {
            "id": "PfzMES0urw2JgaL0ggGF",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "Pj9N0j62zEOibpnSzQrF",
            "categories": [
              "Travel Expos",
              "Adventure Tours",
              "Backpacking Trips",
              "Cultural Experiences"
            ],
            "type": "Travel & Adventure"
          },
          {
            "id": "PjTq5WKYXL4JGWGydnf0",
            "categories": [
              "Religious Gatherings",
              "Spiritual Retreats",
              "Meditation Groups",
              "Interfaith Dialogues"
            ],
            "type": "Religion & Spirituality"
          },
          {
            "id": "PlmGeks20Zlp2ElC7oaR",
            "categories": [
              "Family - Friendly Events",
              "Children's Workshops",
              "Kid - Friendly Activities",
              "Amusement Parks"
            ],
            "type": "Family & Kids"
          },
          {
            "id": "PpCeMOB0JFLxPbC81oPp",
            "categories": [
              "Networking Events",
              "Workshops & Seminars",
              "Conferences",
              "Job Fairs"
            ],
            "type": "Networking & Business"
          },
          {
            "id": "PpmL1toMw0dhsvuvok8u",
            "categories": [
              "Pet Adoption Events",
              "Animal Welfare Fundraisers",
              "Pet - Friendly Activities",
              "Zoo Visits"
            ],
            "type": "Pets & Animals"
          },
          {
            "id": "PqARVmN5YTuT7fBSSwb6",
            "categories": [
              "Science Exhibitions",
              "STEM Workshops",
              "Space & Astronomy",
              "Technology Talks"
            ],
            "type": "Science & Technology"
          },
          {
            "id": "PrH3OyTq5vDQyQm6SMel",
            "categories": [
              "Fashion Shows",
              "Beauty Workshops",
              "Pop - Up Boutiques",
              "Makeup Classes"
            ],
            "type": "Fashion & Beauty"
          },
          {
            "id": "PwBS2EszeXKaFEuc1Bt4",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "PwqqLvIjo7vUF7iSMOLY",
            "categories": [
              "Pet Adoption Events",
              "Animal Welfare Fundraisers",
              "Pet - Friendly Activities",
              "Zoo Visits"
            ],
            "type": "Pets & Animals"
          },
          {
            "id": "Q2DwM4zyymjmPKmiarff",
            "categories": [
              "Indian Cuisine",
              "Italian Cuisine",
              "American Fare",
              "Asian Fusion",
              "Mediterranean",
              "Mexican & Tex - Mex",
              "Sushi & Japanese",
              "Chinese Cuisine",
              "French Dining",
              "Vegetarian & Vegan",
              "Seafood Specialties",
              "BBQ & Grill",
              "Steakhouse",
              "Fast Food & Burgers",
              "Cafes & Bakeries",
              "Food Trucks",
              "Fine Dining",
              "Farm - to - Table",
              "Ethnic Eateries"
            ],
            "type": "Food styles"
          },
          {
            "id": "Q4oHEPIW3jqyK0DLODNz",
            "categories": [
              "Pet Adoption Events",
              "Animal Welfare Fundraisers",
              "Pet - Friendly Activities",
              "Zoo Visits"
            ],
            "type": "Pets & Animals"
          },
          {
            "id": "Q600F4a8BSzKKzst1inH",
            "categories": [
              "Local Community Events",
              "Environmental Causes",
              "Social Activism",
              "Fundraising for Causes"
            ],
            "type": "Community & Causes"
          },
          {
            "id": "QCzzNi7YhvHaVj5D6gKR",
            "categories": [
              "Home Improvement Workshops",
              "Gardening Classes",
              "Home Shows",
              "DIY Events"
            ],
            "type": "Home & Garden"
          },
          {
            "id": "QF33I6TBb0LiwoNteAoQ",
            "categories": [
              "Home Improvement Workshops",
              "Gardening Classes",
              "Home Shows",
              "DIY Events"
            ],
            "type": "Home & Garden"
          },
          {
            "id": "QG0hKnasrRGfQuhuXUFh",
            "categories": [
              "Charity Galas",
              "Fundraising Events",
              "Volunteer Opportunities",
              "Community Outreach"
            ],
            "type": "Charity & Fundraising"
          },
          {
            "id": "QKut8j2sy2sD5CKRabKb",
            "categories": [
              "Local Community Events",
              "Environmental Causes",
              "Social Activism",
              "Fundraising for Causes"
            ],
            "type": "Community & Causes"
          },
          {
            "id": "QLYWADYbF1GALaBRUzJw",
            "categories": [
              "Religious Gatherings",
              "Spiritual Retreats",
              "Meditation Groups",
              "Interfaith Dialogues"
            ],
            "type": "Religion & Spirituality"
          },
          {
            "id": "QLoKnOZAop89rfaPat8B",
            "categories": [
              "Local Community Events",
              "Environmental Causes",
              "Social Activism",
              "Fundraising for Causes"
            ],
            "type": "Community & Causes"
          },
          {
            "id": "QNReuIC2t9qTC6yYQ8lt",
            "categories": [
              "Tech Conferences",
              "Startup Events",
              "Coding Workshops",
              "Tech Expos"
            ],
            "type": "Tech & Innovation"
          },
          {
            "id": "QPeUAYBmvwLWJL4Iss4A",
            "categories": [
              "Theater Productions",
              "Magic Shows",
              "Stand - Up Comedy",
              "Movie Screenings"
            ],
            "type": "Entertainment & Shows"
          },
          {
            "id": "QQzRR6LsvQumM7dHTe1q",
            "categories": [
              "Hobbyist Gatherings",
              "Hobby Workshops",
              "Special Interest Groups",
              "Craft Fairs"
            ],
            "type": "Hobbies & Interests"
          },
          {
            "id": "QRvRLvt9g9rrm58CIpkN",
            "categories": [
              "Tech Conferences",
              "Startup Events",
              "Coding Workshops",
              "Tech Expos"
            ],
            "type": "Tech & Innovation"
          },
          {
            "id": "QSE4AJLz1Hmx8dUPdRMF",
            "categories": [
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Food & Dining"
          },
          {
            "id": "QSiw3NayRLsZDK0RJb0V",
            "categories": [
              "Travel Expos",
              "Adventure Tours",
              "Backpacking Trips",
              "Cultural Experiences"
            ],
            "type": "Travel & Adventure"
          },
          {
            "id": "QTIQPciRquEh6ZEkSPjv",
            "categories": [
              "Religious Gatherings",
              "Spiritual Retreats",
              "Meditation Groups",
              "Interfaith Dialogues"
            ],
            "type": "Religion & Spirituality"
          },
          {
            "id": "QWahH4LhnC5QwEI5tXAd",
            "categories": [
              "Charity Galas",
              "Fundraising Events",
              "Volunteer Opportunities",
              "Community Outreach"
            ],
            "type": "Charity & Fundraising"
          },
          {
            "id": "QaIsjI1vSJi0Twzoe5ep",
            "categories": [
              "Indian Cuisine",
              "Italian Cuisine",
              "American Fare",
              "Asian Fusion",
              "Mediterranean",
              "Mexican & Tex - Mex",
              "Sushi & Japanese",
              "Chinese Cuisine",
              "French Dining",
              "Vegetarian & Vegan",
              "Seafood Specialties",
              "BBQ & Grill",
              "Steakhouse",
              "Fast Food & Burgers",
              "Cafes & Bakeries",
              "Food Trucks",
              "Fine Dining",
              "Farm - to - Table",
              "Ethnic Eateries"
            ],
            "type": "Food styles"
          },
          {
            "id": "QaLjctTT6Un8LPie0hwt",
            "categories": [
              "Hobbyist Gatherings",
              "Hobby Workshops",
              "Special Interest Groups",
              "Craft Fairs"
            ],
            "type": "Hobbies & Interests"
          },
          {
            "id": "QbNI18hSN1iEGYAxQxNH",
            "categories": [
              "Food & Dining",
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Sports & Fitness"
          },
          {
            "id": "QbPxlDAC3mjaa1NZSZ7j",
            "categories": [
              "Family - Friendly Events",
              "Children's Workshops",
              "Kid - Friendly Activities",
              "Amusement Parks"
            ],
            "type": "Family & Kids"
          },
          {
            "id": "QbmzVr9bfSOjkrzMJMm2",
            "categories": [
              "Charity Galas",
              "Fundraising Events",
              "Volunteer Opportunities",
              "Community Outreach"
            ],
            "type": "Charity & Fundraising"
          },
          {
            "id": "QdQgViivTdrepp2AtRl3",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "QeFn33rqawgRrnaNdMRd",
            "categories": [
              "Travel Expos",
              "Adventure Tours",
              "Backpacking Trips",
              "Cultural Experiences"
            ],
            "type": "Travel & Adventure"
          },
          {
            "id": "QelbzvimyoR7q36HW9FJ",
            "categories": [
              "Local Community Events",
              "Environmental Causes",
              "Social Activism",
              "Fundraising for Causes"
            ],
            "type": "Community & Causes"
          },
          {
            "id": "Qfz62E24eVo64sgM6KIw",
            "categories": [
              "Charity Galas",
              "Fundraising Events",
              "Volunteer Opportunities",
              "Community Outreach"
            ],
            "type": "Charity & Fundraising"
          },
          {
            "id": "QgO19kauiZVIfOEKYF4c",
            "categories": [
              "Fashion Shows",
              "Beauty Workshops",
              "Pop - Up Boutiques",
              "Makeup Classes"
            ],
            "type": "Fashion & Beauty"
          },
          {
            "id": "QkYTLjYF0plkPMW4VKeK",
            "categories": [
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Food & Dining"
          },
          {
            "id": "Ql8NPHmFiTKQDWUyLq7o",
            "categories": [
              "Home Improvement Workshops",
              "Gardening Classes",
              "Home Shows",
              "DIY Events"
            ],
            "type": "Home & Garden"
          },
          {
            "id": "Qlfm7zJL7EgqUHEFH7x5",
            "categories": [
              "Travel Expos",
              "Adventure Tours",
              "Backpacking Trips",
              "Cultural Experiences"
            ],
            "type": "Travel & Adventure"
          },
          {
            "id": "Qmfj8sOlqNkIAQEMsUYD",
            "categories": [
              "Indian Cuisine",
              "Italian Cuisine",
              "American Fare",
              "Asian Fusion",
              "Mediterranean",
              "Mexican & Tex - Mex",
              "Sushi & Japanese",
              "Chinese Cuisine",
              "French Dining",
              "Vegetarian & Vegan",
              "Seafood Specialties",
              "BBQ & Grill",
              "Steakhouse",
              "Fast Food & Burgers",
              "Cafes & Bakeries",
              "Food Trucks",
              "Fine Dining",
              "Farm - to - Table",
              "Ethnic Eateries"
            ],
            "type": "Food styles"
          },
          {
            "id": "Qo73nbRhyi3NTPsbJ3NY",
            "categories": [
              "Religious Gatherings",
              "Spiritual Retreats",
              "Meditation Groups",
              "Interfaith Dialogues"
            ],
            "type": "Religion & Spirituality"
          },
          {
            "id": "QoPgrv229kBS2gbPM8K5",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "QrF0iEcAs1BYsaZvZgV1",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "QtHN65OFpxfiEdIPSv44",
            "categories": [
              "Tech Conferences",
              "Startup Events",
              "Coding Workshops",
              "Tech Expos"
            ],
            "type": "Tech & Innovation"
          },
          {
            "id": "QtHjelmqiyXicQY3C9wC",
            "categories": [
              "Tech Conferences",
              "Startup Events",
              "Coding Workshops",
              "Tech Expos"
            ],
            "type": "Tech & Innovation"
          },
          {
            "id": "QtZ2iLpiLWWFmpwJSdiH",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "Qv6P8bcKOFSFxVAmEjCZ",
            "categories": [
              "Local Community Events",
              "Environmental Causes",
              "Social Activism",
              "Fundraising for Causes"
            ],
            "type": "Community & Causes"
          },
          {
            "id": "QvDdalp7r26WIDqx0D1L",
            "categories": [
              "Educational Workshops",
              "Lectures & Talks",
              "Online Courses",
              "Tutoring Services"
            ],
            "type": "Education & Learning"
          },
          {
            "id": "QvksAT3MitVj4xIDPGC2",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "QwLLgyHno0yCCk0S5UWL",
            "categories": [
              "Hobbyist Gatherings",
              "Hobby Workshops",
              "Special Interest Groups",
              "Craft Fairs"
            ],
            "type": "Hobbies & Interests"
          },
          {
            "id": "QwoWvR6OaNoD55Av2FhL",
            "categories": [
              "Wellness Retreats",
              "Health Workshops",
              "Mindfulness Events",
              "Medical Seminars"
            ],
            "type": "Health & Wellness"
          },
          {
            "id": "QxOEONCRPCfzrGzslF4A",
            "categories": [
              "Wellness Retreats",
              "Health Workshops",
              "Mindfulness Events",
              "Medical Seminars"
            ],
            "type": "Health & Wellness"
          },
          {
            "id": "QzseLJ5RUp10jXKCwYTY",
            "categories": [
              "Family - Friendly Events",
              "Children's Workshops",
              "Kid - Friendly Activities",
              "Amusement Parks"
            ],
            "type": "Family & Kids"
          },
          {
            "id": "R1RYEkA60UlpUGn5Q1Je",
            "categories": [
              "Theater Productions",
              "Magic Shows",
              "Stand - Up Comedy",
              "Movie Screenings"
            ],
            "type": "Entertainment & Shows"
          },
          {
            "id": "R1legwOmBfekrmTlJAs6",
            "categories": [
              "Science Exhibitions",
              "STEM Workshops",
              "Space & Astronomy",
              "Technology Talks"
            ],
            "type": "Science & Technology"
          },
          {
            "id": "R3CtB9MxQrLBP3aCqkYO",
            "categories": [
              "Science Exhibitions",
              "STEM Workshops",
              "Space & Astronomy",
              "Technology Talks"
            ],
            "type": "Science & Technology"
          },
          {
            "id": "R5sZMKSjYUsrl9Fy3XAl",
            "categories": [
              "Theater Productions",
              "Magic Shows",
              "Stand - Up Comedy",
              "Movie Screenings"
            ],
            "type": "Entertainment & Shows"
          },
          {
            "id": "R8i50rMksAMo0pOxuQnL",
            "categories": [
              "Food & Dining",
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Sports & Fitness"
          },
          {
            "id": "R9swwNHKncQohkvMZurZ",
            "categories": [
              "Religious Gatherings",
              "Spiritual Retreats",
              "Meditation Groups",
              "Interfaith Dialogues"
            ],
            "type": "Religion & Spirituality"
          },
          {
            "id": "RBTRr36cH9h8NWUwCHxH",
            "categories": [
              "Sporting Events",
              "Fitness Classes",
              "Yoga & Meditation",
              "Outdoor Activities"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "RE35A0sMpPti2JEglg5j",
            "categories": [
              "Home Improvement Workshops",
              "Gardening Classes",
              "Home Shows",
              "DIY Events"
            ],
            "type": "Home & Garden"
          },
          {
            "id": "RFy9WWs0hgfiCq1IvZ3p",
            "categories": [
              "Religious Gatherings",
              "Spiritual Retreats",
              "Meditation Groups",
              "Interfaith Dialogues"
            ],
            "type": "Religion & Spirituality"
          },
          {
            "id": "RGeD3zgBSIeCSHkya3Is",
            "categories": [
              "Fashion Shows",
              "Beauty Workshops",
              "Pop - Up Boutiques",
              "Makeup Classes"
            ],
            "type": "Fashion & Beauty"
          },
          {
            "id": "RHAm9irHq6p7oojaBmvq",
            "categories": [
              "Fashion Shows",
              "Beauty Workshops",
              "Pop - Up Boutiques",
              "Makeup Classes"
            ],
            "type": "Fashion & Beauty"
          },
          {
            "id": "RHuXPLityjRlvCTNytjJ",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "RJ4BNCIthMMaIPnkXaby",
            "categories": [
              "Theater Productions",
              "Magic Shows",
              "Stand - Up Comedy",
              "Movie Screenings"
            ],
            "type": "Entertainment & Shows"
          },
          {
            "id": "RJOMA1tdGDMpIVoovy52",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "RJsH7GAdcLAff1mqmtKf",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "RK0JynuXxTjPwSn0u3sJ",
            "categories": [
              "Science Exhibitions",
              "STEM Workshops",
              "Space & Astronomy",
              "Technology Talks"
            ],
            "type": "Science & Technology"
          },
          {
            "id": "RKNsPOQANnTCAJtSFr88",
            "categories": [
              "Home Improvement Workshops",
              "Gardening Classes",
              "Home Shows",
              "DIY Events"
            ],
            "type": "Home & Garden"
          },
          {
            "id": "ROAgmAqhr2LsYg493dus",
            "categories": [
              "Sporting Events",
              "Fitness Classes",
              "Yoga & Meditation",
              "Outdoor Activities"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "RPpqvPdqSedFRBYPemrX",
            "categories": [
              "Sporting Events",
              "Fitness Classes",
              "Yoga & Meditation",
              "Outdoor Activities"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "RRBdLrOesYnKX5cbz0WU",
            "categories": [
              "Hobbyist Gatherings",
              "Hobby Workshops",
              "Special Interest Groups",
              "Craft Fairs"
            ],
            "type": "Hobbies & Interests"
          },
          {
            "id": "RRiTGlsu8G9U640ik7M1",
            "categories": [
              "Family - Friendly Events",
              "Children's Workshops",
              "Kid - Friendly Activities",
              "Amusement Parks"
            ],
            "type": "Family & Kids"
          },
          {
            "id": "RVFCgmthL79YbRNPKYA6",
            "categories": [
              "Fashion Shows",
              "Beauty Workshops",
              "Pop - Up Boutiques",
              "Makeup Classes"
            ],
            "type": "Fashion & Beauty"
          },
          {
            "id": "RW3quxtAlyYTqdfKtUej",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "RW4vVcwgtLbLutUtt7km",
            "categories": [
              "Family - Friendly Events",
              "Children's Workshops",
              "Kid - Friendly Activities",
              "Amusement Parks"
            ],
            "type": "Family & Kids"
          },
          {
            "id": "RWK86VQoLHgi0arjQglP",
            "categories": [
              "Religious Gatherings",
              "Spiritual Retreats",
              "Meditation Groups",
              "Interfaith Dialogues"
            ],
            "type": "Religion & Spirituality"
          },
          {
            "id": "Rf8g0PrQxHkg0siuVbd1",
            "categories": [
              "Hobbyist Gatherings",
              "Hobby Workshops",
              "Special Interest Groups",
              "Craft Fairs"
            ],
            "type": "Hobbies & Interests"
          },
          {
            "id": "RgQcKvddIaUTUlbVH25p",
            "categories": [
              "Wellness Retreats",
              "Health Workshops",
              "Mindfulness Events",
              "Medical Seminars"
            ],
            "type": "Health & Wellness"
          },
          {
            "id": "Ri5Ns5HyQLSeVtgaBJ7n",
            "categories": [
              "Travel Expos",
              "Adventure Tours",
              "Backpacking Trips",
              "Cultural Experiences"
            ],
            "type": "Travel & Adventure"
          },
          {
            "id": "RjzCcSx4OXzd5uolcNWh",
            "categories": [
              "Indian Cuisine",
              "Italian Cuisine",
              "American Fare",
              "Asian Fusion",
              "Mediterranean",
              "Mexican & Tex - Mex",
              "Sushi & Japanese",
              "Chinese Cuisine",
              "French Dining",
              "Vegetarian & Vegan",
              "Seafood Specialties",
              "BBQ & Grill",
              "Steakhouse",
              "Fast Food & Burgers",
              "Cafes & Bakeries",
              "Food Trucks",
              "Fine Dining",
              "Farm - to - Table",
              "Ethnic Eateries"
            ],
            "type": "Food styles"
          },
          {
            "id": "RlF62xBqtto1whtjaWPF",
            "categories": [
              "Home Improvement Workshops",
              "Gardening Classes",
              "Home Shows",
              "DIY Events"
            ],
            "type": "Home & Garden"
          },
          {
            "id": "RlaYoRdAC9Gd7g0MOp2z",
            "categories": [
              "Local Community Events",
              "Environmental Causes",
              "Social Activism",
              "Fundraising for Causes"
            ],
            "type": "Community & Causes"
          },
          {
            "id": "Rly98NJKEkfC2rp6osZy",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "RnYT6kqmkDQem1MajbVd",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "Rp6ngffgRLy8uzqoOOGl",
            "categories": [
              "Networking Events",
              "Workshops & Seminars",
              "Conferences",
              "Job Fairs"
            ],
            "type": "Networking & Business"
          },
          {
            "id": "Rp92PsjZwUrIKXuuatl2",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "RqRYn1slBJPklqe3prmU",
            "categories": [
              "Hobbyist Gatherings",
              "Hobby Workshops",
              "Special Interest Groups",
              "Craft Fairs"
            ],
            "type": "Hobbies & Interests"
          },
          {
            "id": "RqlWE5jEIRj0VdhAx54J",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "Rs5N5iwTwNsIPSJRWDWR",
            "categories": [
              "Local Community Events",
              "Environmental Causes",
              "Social Activism",
              "Fundraising for Causes"
            ],
            "type": "Community & Causes"
          },
          {
            "id": "RsY8DkV4Vcf1eCjDZxfZ",
            "categories": [
              "Tech Conferences",
              "Startup Events",
              "Coding Workshops",
              "Tech Expos"
            ],
            "type": "Tech & Innovation"
          },
          {
            "id": "RsjhGXWflbrwgq8l9nh2",
            "categories": [
              "Pet Adoption Events",
              "Animal Welfare Fundraisers",
              "Pet - Friendly Activities",
              "Zoo Visits"
            ],
            "type": "Pets & Animals"
          },
          {
            "id": "RtOuYEhhIzWGw2ZnVyGj",
            "categories": [
              "Fashion Shows",
              "Beauty Workshops",
              "Pop - Up Boutiques",
              "Makeup Classes"
            ],
            "type": "Fashion & Beauty"
          },
          {
            "id": "Rv0L02OjWVZEtaVeTdKE",
            "categories": [
              "Networking Events",
              "Workshops & Seminars",
              "Conferences",
              "Job Fairs"
            ],
            "type": "Networking & Business"
          },
          {
            "id": "RxH5Q58fps5oPPrYlNkV",
            "categories": [
              "Family - Friendly Events",
              "Children's Workshops",
              "Kid - Friendly Activities",
              "Amusement Parks"
            ],
            "type": "Family & Kids"
          },
          {
            "id": "RyLO5zDIkXWXNbdQ0By3",
            "categories": [
              "Science Exhibitions",
              "STEM Workshops",
              "Space & Astronomy",
              "Technology Talks"
            ],
            "type": "Science & Technology"
          },
          {
            "id": "RzTSn9Al6wcZHcuvtug3",
            "categories": [
              "Wellness Retreats",
              "Health Workshops",
              "Mindfulness Events",
              "Medical Seminars"
            ],
            "type": "Health & Wellness"
          },
          {
            "id": "RzWWGA4Xw2bOZBtn8OSh",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "S09qbYkT0Gap0lGMPiFN",
            "categories": [
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Food & Dining"
          },
          {
            "id": "S0Z0YKZWxodN0ADUtOSq",
            "categories": [
              "Home Improvement Workshops",
              "Gardening Classes",
              "Home Shows",
              "DIY Events"
            ],
            "type": "Home & Garden"
          },
          {
            "id": "S2Bidsop6eRHrPrVkZt0",
            "categories": [
              "Networking Events",
              "Workshops & Seminars",
              "Conferences",
              "Job Fairs"
            ],
            "type": "Networking & Business"
          },
          {
            "id": "S2RBTXjAcjTiNygeaadu",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "S2RGOc4tacSHL1sSJuza",
            "categories": [
              "Indian Cuisine",
              "Italian Cuisine",
              "American Fare",
              "Asian Fusion",
              "Mediterranean",
              "Mexican & Tex - Mex",
              "Sushi & Japanese",
              "Chinese Cuisine",
              "French Dining",
              "Vegetarian & Vegan",
              "Seafood Specialties",
              "BBQ & Grill",
              "Steakhouse",
              "Fast Food & Burgers",
              "Cafes & Bakeries",
              "Food Trucks",
              "Fine Dining",
              "Farm - to - Table",
              "Ethnic Eateries"
            ],
            "type": "Food styles"
          },
          {
            "id": "S3o3igvQQRA3V4KkQuFA",
            "categories": [
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Food & Dining"
          },
          {
            "id": "S3sPnZSnQU1RzC6zS0DS",
            "categories": [
              "Science Exhibitions",
              "STEM Workshops",
              "Space & Astronomy",
              "Technology Talks"
            ],
            "type": "Science & Technology"
          },
          {
            "id": "S57OBe2f9KZ0rG82iMZj",
            "categories": [
              "Wellness Retreats",
              "Health Workshops",
              "Mindfulness Events",
              "Medical Seminars"
            ],
            "type": "Health & Wellness"
          },
          {
            "id": "S6PlSUIK146poyzoJKvS",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "S7DhcU7VvW2rfURH5St9",
            "categories": [
              "Networking Events",
              "Workshops & Seminars",
              "Conferences",
              "Job Fairs"
            ],
            "type": "Networking & Business"
          },
          {
            "id": "S7OTE7gp2ZWjSNeLbKo2",
            "categories": [
              "Tech Conferences",
              "Startup Events",
              "Coding Workshops",
              "Tech Expos"
            ],
            "type": "Tech & Innovation"
          },
          {
            "id": "S8g5j6afn0PdEvqTwWrW",
            "categories": [
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Food & Dining"
          },
          {
            "id": "S8mP2zTTIZnGwIMpzuyq",
            "categories": [
              "Fashion Shows",
              "Beauty Workshops",
              "Pop - Up Boutiques",
              "Makeup Classes"
            ],
            "type": "Fashion & Beauty"
          },
          {
            "id": "SCpuD8RblkDcH6ToxdO4",
            "categories": [
              "Family - Friendly Events",
              "Children's Workshops",
              "Kid - Friendly Activities",
              "Amusement Parks"
            ],
            "type": "Family & Kids"
          },
          {
            "id": "SCtE5L2XFO6oyTNhJHLG",
            "categories": [
              "Sporting Events",
              "Fitness Classes",
              "Yoga & Meditation",
              "Outdoor Activities"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "SFAu40PPAShuVMxPJj3Y",
            "categories": [
              "Science Exhibitions",
              "STEM Workshops",
              "Space & Astronomy",
              "Technology Talks"
            ],
            "type": "Science & Technology"
          },
          {
            "id": "SFDIeNDSIdyYcfG9V8Ou",
            "categories": [
              "Educational Workshops",
              "Lectures & Talks",
              "Online Courses",
              "Tutoring Services"
            ],
            "type": "Education & Learning"
          },
          {
            "id": "SJZUWW4YiL4TPH3TqU5e",
            "categories": [
              "Local Community Events",
              "Environmental Causes",
              "Social Activism",
              "Fundraising for Causes"
            ],
            "type": "Community & Causes"
          },
          {
            "id": "SK4MEObO1gSCXzkFGKhO",
            "categories": [
              "Science Exhibitions",
              "STEM Workshops",
              "Space & Astronomy",
              "Technology Talks"
            ],
            "type": "Science & Technology"
          },
          {
            "id": "SK87Z5Aew1t5JETYXGs2",
            "categories": [
              "Wellness Retreats",
              "Health Workshops",
              "Mindfulness Events",
              "Medical Seminars"
            ],
            "type": "Health & Wellness"
          },
          {
            "id": "SL92fWvLiznCwHG7klY5",
            "categories": [
              "Indian Cuisine",
              "Italian Cuisine",
              "American Fare",
              "Asian Fusion",
              "Mediterranean",
              "Mexican & Tex - Mex",
              "Sushi & Japanese",
              "Chinese Cuisine",
              "French Dining",
              "Vegetarian & Vegan",
              "Seafood Specialties",
              "BBQ & Grill",
              "Steakhouse",
              "Fast Food & Burgers",
              "Cafes & Bakeries",
              "Food Trucks",
              "Fine Dining",
              "Farm - to - Table",
              "Ethnic Eateries"
            ],
            "type": "Food styles"
          },
          {
            "id": "SMAzWfZlFNATgRfBkGrG",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "SMIV2PNA5YxNiDoVHa0Q",
            "categories": [
              "Local Community Events",
              "Environmental Causes",
              "Social Activism",
              "Fundraising for Causes"
            ],
            "type": "Community & Causes"
          },
          {
            "id": "SMso0ypFDl7cmWwSloMY",
            "categories": [
              "Charity Galas",
              "Fundraising Events",
              "Volunteer Opportunities",
              "Community Outreach"
            ],
            "type": "Charity & Fundraising"
          },
          {
            "id": "SMxYZoJHWz0KB93RqHH9",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "SQG3iqA9RmNrXLtHkykg",
            "categories": [
              "Religious Gatherings",
              "Spiritual Retreats",
              "Meditation Groups",
              "Interfaith Dialogues"
            ],
            "type": "Religion & Spirituality"
          },
          {
            "id": "SUuYQwL0Bg0WogZyzR7p",
            "categories": [
              "Theater Productions",
              "Magic Shows",
              "Stand - Up Comedy",
              "Movie Screenings"
            ],
            "type": "Entertainment & Shows"
          },
          {
            "id": "SVAGRgOFNzizeLCIPxco",
            "categories": [
              "Religious Gatherings",
              "Spiritual Retreats",
              "Meditation Groups",
              "Interfaith Dialogues"
            ],
            "type": "Religion & Spirituality"
          },
          {
            "id": "SVc2h2gGokPeqJc4JZ8s",
            "categories": [
              "Indian Cuisine",
              "Italian Cuisine",
              "American Fare",
              "Asian Fusion",
              "Mediterranean",
              "Mexican & Tex - Mex",
              "Sushi & Japanese",
              "Chinese Cuisine",
              "French Dining",
              "Vegetarian & Vegan",
              "Seafood Specialties",
              "BBQ & Grill",
              "Steakhouse",
              "Fast Food & Burgers",
              "Cafes & Bakeries",
              "Food Trucks",
              "Fine Dining",
              "Farm - to - Table",
              "Ethnic Eateries"
            ],
            "type": "Food styles"
          },
          {
            "id": "SVtyDP0ZscypGgRdNNkj",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "SYdBVvtlUenzo4UUHPoL",
            "categories": [
              "Networking Events",
              "Workshops & Seminars",
              "Conferences",
              "Job Fairs"
            ],
            "type": "Networking & Business"
          },
          {
            "id": "SanwJwyGbj1wPknNeBjX",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "SeKKh7uIRdtohJ1wGAKS",
            "categories": [
              "Networking Events",
              "Workshops & Seminars",
              "Conferences",
              "Job Fairs"
            ],
            "type": "Networking & Business"
          },
          {
            "id": "SedV5yRa3c2DYwd1Q87y",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "ShncvJcxeFAQEZCYk7NP",
            "categories": [
              "Local Community Events",
              "Environmental Causes",
              "Social Activism",
              "Fundraising for Causes"
            ],
            "type": "Community & Causes"
          },
          {
            "id": "ShxolSsgSlIRR7ZRiZHj",
            "categories": [
              "Tech Conferences",
              "Startup Events",
              "Coding Workshops",
              "Tech Expos"
            ],
            "type": "Tech & Innovation"
          },
          {
            "id": "SjEJuUiGzMid3OlqwNdB",
            "categories": [
              "Networking Events",
              "Workshops & Seminars",
              "Conferences",
              "Job Fairs"
            ],
            "type": "Networking & Business"
          },
          {
            "id": "SlOhwET2CZuA74qPEQI2",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "SmGlbrrRI8SkmPVBE2tv",
            "categories": [
              "Educational Workshops",
              "Lectures & Talks",
              "Online Courses",
              "Tutoring Services"
            ],
            "type": "Education & Learning"
          },
          {
            "id": "Sp1OjPgfUnPhho7DbgyS",
            "categories": [
              "Travel Expos",
              "Adventure Tours",
              "Backpacking Trips",
              "Cultural Experiences"
            ],
            "type": "Travel & Adventure"
          },
          {
            "id": "Sp41iNhnaz5uy1ZxqGWS",
            "categories": [
              "Science Exhibitions",
              "STEM Workshops",
              "Space & Astronomy",
              "Technology Talks"
            ],
            "type": "Science & Technology"
          },
          {
            "id": "SpeWuLeyoUstzvMGPsbM",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "St0niLctjW8fct9sr6Sb",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "SviDgJormGwxuIvGm7yk",
            "categories": [
              "Religious Gatherings",
              "Spiritual Retreats",
              "Meditation Groups",
              "Interfaith Dialogues"
            ],
            "type": "Religion & Spirituality"
          },
          {
            "id": "SvsGyZxe1RQZsWt5XRLL",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "SxmDYpIC8016PJKjn3Yu",
            "categories": [
              "Educational Workshops",
              "Lectures & Talks",
              "Online Courses",
              "Tutoring Services"
            ],
            "type": "Education & Learning"
          },
          {
            "id": "Sy2baG6ZrxLMlX91X9CX",
            "categories": [
              "Family - Friendly Events",
              "Children's Workshops",
              "Kid - Friendly Activities",
              "Amusement Parks"
            ],
            "type": "Family & Kids"
          },
          {
            "id": "Syut4ODR329Ddama1E4w",
            "categories": [
              "Travel Expos",
              "Adventure Tours",
              "Backpacking Trips",
              "Cultural Experiences"
            ],
            "type": "Travel & Adventure"
          },
          {
            "id": "T4AbVPf10EopQIArwVls",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "T4O0tRddGiPhLt364ZNK",
            "categories": [
              "Educational Workshops",
              "Lectures & Talks",
              "Online Courses",
              "Tutoring Services"
            ],
            "type": "Education & Learning"
          },
          {
            "id": "T5bcu1CZEoOWCjD7upyk",
            "categories": [
              "Local Community Events",
              "Environmental Causes",
              "Social Activism",
              "Fundraising for Causes"
            ],
            "type": "Community & Causes"
          },
          {
            "id": "T5vNFChZGCcwXLCLyATa",
            "categories": [
              "Tech Conferences",
              "Startup Events",
              "Coding Workshops",
              "Tech Expos"
            ],
            "type": "Tech & Innovation"
          },
          {
            "id": "T812aOrcZeUvS3gueik8",
            "categories": [
              "Food & Dining",
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Sports & Fitness"
          },
          {
            "id": "TBGOhdOteiFyBNIuguDu",
            "categories": [
              "Hobbyist Gatherings",
              "Hobby Workshops",
              "Special Interest Groups",
              "Craft Fairs"
            ],
            "type": "Hobbies & Interests"
          },
          {
            "id": "TBSTaVZCPLKnpnZWuIIS",
            "categories": [
              "Science Exhibitions",
              "STEM Workshops",
              "Space & Astronomy",
              "Technology Talks"
            ],
            "type": "Science & Technology"
          },
          {
            "id": "TFQGq2k4ZYsWStJ0qXe3",
            "categories": [
              "Theater Productions",
              "Magic Shows",
              "Stand - Up Comedy",
              "Movie Screenings"
            ],
            "type": "Entertainment & Shows"
          },
          {
            "id": "THHrM7pmjebQtpvwWwDP",
            "categories": [
              "Local Community Events",
              "Environmental Causes",
              "Social Activism",
              "Fundraising for Causes"
            ],
            "type": "Community & Causes"
          },
          {
            "id": "TIPeCM0iVulscln8SRYR",
            "categories": [
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Food & Dining"
          },
          {
            "id": "TLtjyMI1O9OKMt1SBsM0",
            "categories": [
              "Science Exhibitions",
              "STEM Workshops",
              "Space & Astronomy",
              "Technology Talks"
            ],
            "type": "Science & Technology"
          },
          {
            "id": "TPI0g2f24LUQmQHYeYA0",
            "categories": [
              "Food & Dining",
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Sports & Fitness"
          },
          {
            "id": "TTtdrwk4S7lZOwpAXTX7",
            "categories": [
              "Theater Productions",
              "Magic Shows",
              "Stand - Up Comedy",
              "Movie Screenings"
            ],
            "type": "Entertainment & Shows"
          },
          {
            "id": "TUEySQXKWqY2xJrTMxjR",
            "categories": [
              "Networking Events",
              "Workshops & Seminars",
              "Conferences",
              "Job Fairs"
            ],
            "type": "Networking & Business"
          },
          {
            "id": "TY474YQ9t98YroRGxBjF",
            "categories": [
              "Pet Adoption Events",
              "Animal Welfare Fundraisers",
              "Pet - Friendly Activities",
              "Zoo Visits"
            ],
            "type": "Pets & Animals"
          },
          {
            "id": "Ta2undeAZWXuvWdog117",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "TcA0ilIsWSKwDykXkg96",
            "categories": [
              "Sporting Events",
              "Fitness Classes",
              "Yoga & Meditation",
              "Outdoor Activities"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "TeQQ8oxN4K1qVPjzQPfc",
            "categories": [
              "Sporting Events",
              "Fitness Classes",
              "Yoga & Meditation",
              "Outdoor Activities"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "TeStocOieEQojP4AgtBb",
            "categories": [
              "Educational Workshops",
              "Lectures & Talks",
              "Online Courses",
              "Tutoring Services"
            ],
            "type": "Education & Learning"
          },
          {
            "id": "TebMrqmBE46q0biuaiHZ",
            "categories": [
              "Charity Galas",
              "Fundraising Events",
              "Volunteer Opportunities",
              "Community Outreach"
            ],
            "type": "Charity & Fundraising"
          },
          {
            "id": "TfHlAgOaVMyP0MdMWOjc",
            "categories": [
              "Wellness Retreats",
              "Health Workshops",
              "Mindfulness Events",
              "Medical Seminars"
            ],
            "type": "Health & Wellness"
          },
          {
            "id": "ThUt8VmSa7EE4eBirIat",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "ThVbLxlUhPKwmw5JD0dQ",
            "categories": [
              "Wellness Retreats",
              "Health Workshops",
              "Mindfulness Events",
              "Medical Seminars"
            ],
            "type": "Health & Wellness"
          },
          {
            "id": "TiDQTCUl4L6t0IbThXU1",
            "categories": [
              "Fashion Shows",
              "Beauty Workshops",
              "Pop - Up Boutiques",
              "Makeup Classes"
            ],
            "type": "Fashion & Beauty"
          },
          {
            "id": "TiVLQah3Kbvt8YpfKewU",
            "categories": [
              "Networking Events",
              "Workshops & Seminars",
              "Conferences",
              "Job Fairs"
            ],
            "type": "Networking & Business"
          },
          {
            "id": "TpGAVSrYosPL5vZsjFYC",
            "categories": [
              "Charity Galas",
              "Fundraising Events",
              "Volunteer Opportunities",
              "Community Outreach"
            ],
            "type": "Charity & Fundraising"
          },
          {
            "id": "TqTiHbd5MtesG40PnTHm",
            "categories": [
              "Hobbyist Gatherings",
              "Hobby Workshops",
              "Special Interest Groups",
              "Craft Fairs"
            ],
            "type": "Hobbies & Interests"
          },
          {
            "id": "TsPLBEbM1S2wYKXRVdBZ",
            "categories": [
              "Theater Productions",
              "Magic Shows",
              "Stand - Up Comedy",
              "Movie Screenings"
            ],
            "type": "Entertainment & Shows"
          },
          {
            "id": "TtZxpsCy9MPjRSTaDRJT",
            "categories": [
              "Sporting Events",
              "Fitness Classes",
              "Yoga & Meditation",
              "Outdoor Activities"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "TvIy1qMKCBdMIk9QkZz5",
            "categories": [
              "Family - Friendly Events",
              "Children's Workshops",
              "Kid - Friendly Activities",
              "Amusement Parks"
            ],
            "type": "Family & Kids"
          },
          {
            "id": "TwULZkF9ftq81nTb2Yto",
            "categories": [
              "Wellness Retreats",
              "Health Workshops",
              "Mindfulness Events",
              "Medical Seminars"
            ],
            "type": "Health & Wellness"
          },
          {
            "id": "Tznmmgb4bEdCyWKcsZ0D",
            "categories": [
              "Sporting Events",
              "Fitness Classes",
              "Yoga & Meditation",
              "Outdoor Activities"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "U2WeTokNgTYaNKgHWVoq",
            "categories": [
              "Sporting Events",
              "Fitness Classes",
              "Yoga & Meditation",
              "Outdoor Activities"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "U5yA3K3mWzX9eI3qPu0a",
            "categories": [
              "Religious Gatherings",
              "Spiritual Retreats",
              "Meditation Groups",
              "Interfaith Dialogues"
            ],
            "type": "Religion & Spirituality"
          },
          {
            "id": "UBD68f0lzFOuTXtwa3il",
            "categories": [
              "Science Exhibitions",
              "STEM Workshops",
              "Space & Astronomy",
              "Technology Talks"
            ],
            "type": "Science & Technology"
          },
          {
            "id": "UHUrzWF16EnUBdcKTAdO",
            "categories": [
              "Indian Cuisine",
              "Italian Cuisine",
              "American Fare",
              "Asian Fusion",
              "Mediterranean",
              "Mexican & Tex - Mex",
              "Sushi & Japanese",
              "Chinese Cuisine",
              "French Dining",
              "Vegetarian & Vegan",
              "Seafood Specialties",
              "BBQ & Grill",
              "Steakhouse",
              "Fast Food & Burgers",
              "Cafes & Bakeries",
              "Food Trucks",
              "Fine Dining",
              "Farm - to - Table",
              "Ethnic Eateries"
            ],
            "type": "Food styles"
          },
          {
            "id": "UKGn7HEBmPuba1mFcOxx",
            "categories": [
              "Food & Dining",
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Sports & Fitness"
          },
          {
            "id": "ULyTMl2tknWgXBqkwikv",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "UMdKB3QUYuwRiripypNJ",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "UP9x9IH5JPlRV63uGDbu",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "UQpsVMMKDZpOBwG19QI3",
            "categories": [
              "Pet Adoption Events",
              "Animal Welfare Fundraisers",
              "Pet - Friendly Activities",
              "Zoo Visits"
            ],
            "type": "Pets & Animals"
          },
          {
            "id": "URXKpiPZ5XylW3ZS6dkh",
            "categories": [
              "Networking Events",
              "Workshops & Seminars",
              "Conferences",
              "Job Fairs"
            ],
            "type": "Networking & Business"
          },
          {
            "id": "UUKUBGOY48KLseERkz8F",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "UVnxt6ZC4rtYKQZdA4Eh",
            "categories": [
              "Sporting Events",
              "Fitness Classes",
              "Yoga & Meditation",
              "Outdoor Activities"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "UYhgbkRBjuPnEX8DawH6",
            "categories": [
              "Tech Conferences",
              "Startup Events",
              "Coding Workshops",
              "Tech Expos"
            ],
            "type": "Tech & Innovation"
          },
          {
            "id": "UZe9tj9nSNMO2KoNHLml",
            "categories": [
              "Science Exhibitions",
              "STEM Workshops",
              "Space & Astronomy",
              "Technology Talks"
            ],
            "type": "Science & Technology"
          },
          {
            "id": "UaNZBFWrtJRoF9bzlJL0",
            "categories": [
              "Theater Productions",
              "Magic Shows",
              "Stand - Up Comedy",
              "Movie Screenings"
            ],
            "type": "Entertainment & Shows"
          },
          {
            "id": "UblsIX2A75VAQUPhwfZT",
            "categories": [
              "Educational Workshops",
              "Lectures & Talks",
              "Online Courses",
              "Tutoring Services"
            ],
            "type": "Education & Learning"
          },
          {
            "id": "UbxWAN1CGmcXoarxKkRK",
            "categories": [
              "Networking Events",
              "Workshops & Seminars",
              "Conferences",
              "Job Fairs"
            ],
            "type": "Networking & Business"
          },
          {
            "id": "UcyS8mz2Rgy8CEaKgQLq",
            "categories": [
              "Food & Dining",
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Sports & Fitness"
          },
          {
            "id": "UeN3lt5JVa5RNPh3QwKx",
            "categories": [
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Food & Dining"
          },
          {
            "id": "Ug4qWcXrgBD6AsPp1HE9",
            "categories": [
              "Food & Dining",
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Sports & Fitness"
          },
          {
            "id": "UgBpwjYJqgG5WvWwkSsh",
            "categories": [
              "Travel Expos",
              "Adventure Tours",
              "Backpacking Trips",
              "Cultural Experiences"
            ],
            "type": "Travel & Adventure"
          },
          {
            "id": "UlGtt1clkY2S9Kei2ZgA",
            "categories": [
              "Educational Workshops",
              "Lectures & Talks",
              "Online Courses",
              "Tutoring Services"
            ],
            "type": "Education & Learning"
          },
          {
            "id": "UoDaeqrFGo58UegqBIqr",
            "categories": [
              "Indian Cuisine",
              "Italian Cuisine",
              "American Fare",
              "Asian Fusion",
              "Mediterranean",
              "Mexican & Tex - Mex",
              "Sushi & Japanese",
              "Chinese Cuisine",
              "French Dining",
              "Vegetarian & Vegan",
              "Seafood Specialties",
              "BBQ & Grill",
              "Steakhouse",
              "Fast Food & Burgers",
              "Cafes & Bakeries",
              "Food Trucks",
              "Fine Dining",
              "Farm - to - Table",
              "Ethnic Eateries"
            ],
            "type": "Food styles"
          },
          {
            "id": "UoSbqTlgvd9wscDNPsTj",
            "categories": [
              "Sporting Events",
              "Fitness Classes",
              "Yoga & Meditation",
              "Outdoor Activities"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "UsXJKq5zJmt2HN7uyeq1",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "UvJkOcDjU1c5LMxpugRy",
            "categories": [
              "Family - Friendly Events",
              "Children's Workshops",
              "Kid - Friendly Activities",
              "Amusement Parks"
            ],
            "type": "Family & Kids"
          },
          {
            "id": "UwLXXiBmrMJIdyu4gAB2",
            "categories": [
              "Religious Gatherings",
              "Spiritual Retreats",
              "Meditation Groups",
              "Interfaith Dialogues"
            ],
            "type": "Religion & Spirituality"
          },
          {
            "id": "V0XzybIMioz58ShFbom0",
            "categories": [
              "Religious Gatherings",
              "Spiritual Retreats",
              "Meditation Groups",
              "Interfaith Dialogues"
            ],
            "type": "Religion & Spirituality"
          },
          {
            "id": "V0wM2MTfWgJMbrq7cLhz",
            "categories": [
              "Hobbyist Gatherings",
              "Hobby Workshops",
              "Special Interest Groups",
              "Craft Fairs"
            ],
            "type": "Hobbies & Interests"
          },
          {
            "id": "V1xPRJEBb7bCKvEZj1cI",
            "categories": [
              "Home Improvement Workshops",
              "Gardening Classes",
              "Home Shows",
              "DIY Events"
            ],
            "type": "Home & Garden"
          },
          {
            "id": "V3fq9r9nwtap6freGRRe",
            "categories": [
              "Food & Dining",
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Sports & Fitness"
          },
          {
            "id": "V4cUJSqK7LFV9oOjN2u8",
            "categories": [
              "Fashion Shows",
              "Beauty Workshops",
              "Pop - Up Boutiques",
              "Makeup Classes"
            ],
            "type": "Fashion & Beauty"
          },
          {
            "id": "V6HSzVowssk8l5pFzsaQ",
            "categories": [
              "Indian Cuisine",
              "Italian Cuisine",
              "American Fare",
              "Asian Fusion",
              "Mediterranean",
              "Mexican & Tex - Mex",
              "Sushi & Japanese",
              "Chinese Cuisine",
              "French Dining",
              "Vegetarian & Vegan",
              "Seafood Specialties",
              "BBQ & Grill",
              "Steakhouse",
              "Fast Food & Burgers",
              "Cafes & Bakeries",
              "Food Trucks",
              "Fine Dining",
              "Farm - to - Table",
              "Ethnic Eateries"
            ],
            "type": "Food styles"
          },
          {
            "id": "V9DPHD2A5U5GGayoG3gL",
            "categories": [
              "Networking Events",
              "Workshops & Seminars",
              "Conferences",
              "Job Fairs"
            ],
            "type": "Networking & Business"
          },
          {
            "id": "VC4zSs958WhQ9hbYYjsb",
            "categories": [
              "Home Improvement Workshops",
              "Gardening Classes",
              "Home Shows",
              "DIY Events"
            ],
            "type": "Home & Garden"
          },
          {
            "id": "VCQ6xz9Qxy6G06aBOc4T",
            "categories": [
              "Hobbyist Gatherings",
              "Hobby Workshops",
              "Special Interest Groups",
              "Craft Fairs"
            ],
            "type": "Hobbies & Interests"
          },
          {
            "id": "VCbLuo86PspoKZ2yNkIL",
            "categories": [
              "Tech Conferences",
              "Startup Events",
              "Coding Workshops",
              "Tech Expos"
            ],
            "type": "Tech & Innovation"
          },
          {
            "id": "VD1cyHRMd4TgivvWfOjV",
            "categories": [
              "Theater Productions",
              "Magic Shows",
              "Stand - Up Comedy",
              "Movie Screenings"
            ],
            "type": "Entertainment & Shows"
          },
          {
            "id": "VDBAgQhl4G5fdbtCFD16",
            "categories": [
              "Pet Adoption Events",
              "Animal Welfare Fundraisers",
              "Pet - Friendly Activities",
              "Zoo Visits"
            ],
            "type": "Pets & Animals"
          },
          {
            "id": "VHq4R7Q5o8ECaP9kPKcl",
            "categories": [
              "Fashion Shows",
              "Beauty Workshops",
              "Pop - Up Boutiques",
              "Makeup Classes"
            ],
            "type": "Fashion & Beauty"
          },
          {
            "id": "VI9BZErnNpZjbP3lrzQ7",
            "categories": [
              "Fashion Shows",
              "Beauty Workshops",
              "Pop - Up Boutiques",
              "Makeup Classes"
            ],
            "type": "Fashion & Beauty"
          },
          {
            "id": "VK6cmBWlNel5gtZA0f7L",
            "categories": [
              "Networking Events",
              "Workshops & Seminars",
              "Conferences",
              "Job Fairs"
            ],
            "type": "Networking & Business"
          },
          {
            "id": "VPpEWVSIfkSeGKkZQiu9",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "VRViNuVPP2Q8WmvccLLw",
            "categories": [
              "Theater Productions",
              "Magic Shows",
              "Stand - Up Comedy",
              "Movie Screenings"
            ],
            "type": "Entertainment & Shows"
          },
          {
            "id": "VRZ0UNhDayTRDcDzISAo",
            "categories": [
              "Tech Conferences",
              "Startup Events",
              "Coding Workshops",
              "Tech Expos"
            ],
            "type": "Tech & Innovation"
          },
          {
            "id": "VSKoNiAHZrVdy5vbwjlu",
            "categories": [
              "Wellness Retreats",
              "Health Workshops",
              "Mindfulness Events",
              "Medical Seminars"
            ],
            "type": "Health & Wellness"
          },
          {
            "id": "VX3YTYRf7yPLOD1ObOqH",
            "categories": [
              "Indian Cuisine",
              "Italian Cuisine",
              "American Fare",
              "Asian Fusion",
              "Mediterranean",
              "Mexican & Tex - Mex",
              "Sushi & Japanese",
              "Chinese Cuisine",
              "French Dining",
              "Vegetarian & Vegan",
              "Seafood Specialties",
              "BBQ & Grill",
              "Steakhouse",
              "Fast Food & Burgers",
              "Cafes & Bakeries",
              "Food Trucks",
              "Fine Dining",
              "Farm - to - Table",
              "Ethnic Eateries"
            ],
            "type": "Food styles"
          },
          {
            "id": "VXKVPSYfzOvuDAbuuu7h",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "VYvUaVaVGNsPjIsgqGfc",
            "categories": [
              "Networking Events",
              "Workshops & Seminars",
              "Conferences",
              "Job Fairs"
            ],
            "type": "Networking & Business"
          },
          {
            "id": "VaqgxJ6LwoMfD44Xxr4l",
            "categories": [
              "Hobbyist Gatherings",
              "Hobby Workshops",
              "Special Interest Groups",
              "Craft Fairs"
            ],
            "type": "Hobbies & Interests"
          },
          {
            "id": "Vc4MjTAW5O8HJTJwx7o4",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "VcF7v6g2G03DTSavHWok",
            "categories": [
              "Local Community Events",
              "Environmental Causes",
              "Social Activism",
              "Fundraising for Causes"
            ],
            "type": "Community & Causes"
          },
          {
            "id": "VdYmDSJx3tRNg41pUrnL",
            "categories": [
              "Theater Productions",
              "Magic Shows",
              "Stand - Up Comedy",
              "Movie Screenings"
            ],
            "type": "Entertainment & Shows"
          },
          {
            "id": "VfCojLH8WCu7CAoRZEW1",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "Vg7JuF7ae6u6xrgBI2Ni",
            "categories": [
              "Family - Friendly Events",
              "Children's Workshops",
              "Kid - Friendly Activities",
              "Amusement Parks"
            ],
            "type": "Family & Kids"
          },
          {
            "id": "Vg7YaUYlbSOS2ctrBw2O",
            "categories": [
              "Pet Adoption Events",
              "Animal Welfare Fundraisers",
              "Pet - Friendly Activities",
              "Zoo Visits"
            ],
            "type": "Pets & Animals"
          },
          {
            "id": "VgDqdkr3XFU23BMxS11d",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "VhRhHKEdeARu8B296sOl",
            "categories": [
              "Educational Workshops",
              "Lectures & Talks",
              "Online Courses",
              "Tutoring Services"
            ],
            "type": "Education & Learning"
          },
          {
            "id": "VjcTgJPL44sY2MCdJGxg",
            "categories": [
              "Hobbyist Gatherings",
              "Hobby Workshops",
              "Special Interest Groups",
              "Craft Fairs"
            ],
            "type": "Hobbies & Interests"
          },
          {
            "id": "VmWeW9DXKEXs0wHGenNj",
            "categories": [
              "Sporting Events",
              "Fitness Classes",
              "Yoga & Meditation",
              "Outdoor Activities"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "VpcHHBk37EmPwSpFu910",
            "categories": [
              "Home Improvement Workshops",
              "Gardening Classes",
              "Home Shows",
              "DIY Events"
            ],
            "type": "Home & Garden"
          },
          {
            "id": "VxtOzcUXbmlOnPW33WTo",
            "categories": [
              "Theater Productions",
              "Magic Shows",
              "Stand - Up Comedy",
              "Movie Screenings"
            ],
            "type": "Entertainment & Shows"
          },
          {
            "id": "VyVtchEvcU7Fs3u65Jgk",
            "categories": [
              "Hobbyist Gatherings",
              "Hobby Workshops",
              "Special Interest Groups",
              "Craft Fairs"
            ],
            "type": "Hobbies & Interests"
          },
          {
            "id": "VzwDhvDjeSKj3gGQxdUd",
            "categories": [
              "Tech Conferences",
              "Startup Events",
              "Coding Workshops",
              "Tech Expos"
            ],
            "type": "Tech & Innovation"
          },
          {
            "id": "W1W1pyVJFE1jv6xJj9L9",
            "categories": [
              "Charity Galas",
              "Fundraising Events",
              "Volunteer Opportunities",
              "Community Outreach"
            ],
            "type": "Charity & Fundraising"
          },
          {
            "id": "W2VOwkZtIFNSeaGewXr5",
            "categories": [
              "Networking Events",
              "Workshops & Seminars",
              "Conferences",
              "Job Fairs"
            ],
            "type": "Networking & Business"
          },
          {
            "id": "W57WUYbpNRHEHYnn9uAu",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "W63POon1s5p631gmnpDZ",
            "categories": [
              "Indian Cuisine",
              "Italian Cuisine",
              "American Fare",
              "Asian Fusion",
              "Mediterranean",
              "Mexican & Tex - Mex",
              "Sushi & Japanese",
              "Chinese Cuisine",
              "French Dining",
              "Vegetarian & Vegan",
              "Seafood Specialties",
              "BBQ & Grill",
              "Steakhouse",
              "Fast Food & Burgers",
              "Cafes & Bakeries",
              "Food Trucks",
              "Fine Dining",
              "Farm - to - Table",
              "Ethnic Eateries"
            ],
            "type": "Food styles"
          },
          {
            "id": "W6qZszw6uDlEW4CeBA24",
            "categories": [
              "Pet Adoption Events",
              "Animal Welfare Fundraisers",
              "Pet - Friendly Activities",
              "Zoo Visits"
            ],
            "type": "Pets & Animals"
          },
          {
            "id": "W70TXTX1psWtawmI8rJR",
            "categories": [
              "Home Improvement Workshops",
              "Gardening Classes",
              "Home Shows",
              "DIY Events"
            ],
            "type": "Home & Garden"
          },
          {
            "id": "W7M2KahLKS0tnLMHtuMF",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "W9Zw1D2c6Y6O4fnAtY4Y",
            "categories": [
              "Sporting Events",
              "Fitness Classes",
              "Yoga & Meditation",
              "Outdoor Activities"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "WB9w97pi9JwLtm9e6kOq",
            "categories": [
              "Family - Friendly Events",
              "Children's Workshops",
              "Kid - Friendly Activities",
              "Amusement Parks"
            ],
            "type": "Family & Kids"
          },
          {
            "id": "WBK38ZHtlqA77XSnVYXO",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "WBuznWfu271kr50jWmPD",
            "categories": [
              "Food & Dining",
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Sports & Fitness"
          },
          {
            "id": "WD9EI5PUxcNc4v8u93cl",
            "categories": [
              "Hobbyist Gatherings",
              "Hobby Workshops",
              "Special Interest Groups",
              "Craft Fairs"
            ],
            "type": "Hobbies & Interests"
          },
          {
            "id": "WGfPpXQeY3POTxyeyVAP",
            "categories": [
              "Religious Gatherings",
              "Spiritual Retreats",
              "Meditation Groups",
              "Interfaith Dialogues"
            ],
            "type": "Religion & Spirituality"
          },
          {
            "id": "WHIniC6hvFrdM3yRSYTb",
            "categories": [
              "Wellness Retreats",
              "Health Workshops",
              "Mindfulness Events",
              "Medical Seminars"
            ],
            "type": "Health & Wellness"
          },
          {
            "id": "WHoBWsjh8QpdhOkgUbrN",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "WIj59PyX19IdeIkPu4G9",
            "categories": [
              "Charity Galas",
              "Fundraising Events",
              "Volunteer Opportunities",
              "Community Outreach"
            ],
            "type": "Charity & Fundraising"
          },
          {
            "id": "WJ73KTtBj1ycwiFs5For",
            "categories": [
              "Fashion Shows",
              "Beauty Workshops",
              "Pop - Up Boutiques",
              "Makeup Classes"
            ],
            "type": "Fashion & Beauty"
          },
          {
            "id": "WJYCXIPihjXFF7pykbSC",
            "categories": [
              "Fashion Shows",
              "Beauty Workshops",
              "Pop - Up Boutiques",
              "Makeup Classes"
            ],
            "type": "Fashion & Beauty"
          },
          {
            "id": "WKX0serwQHQPXIYWzN3Z",
            "categories": [
              "Food & Dining",
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Sports & Fitness"
          },
          {
            "id": "WLUJtjFibUVMDVAwF0xk",
            "categories": [
              "Home Improvement Workshops",
              "Gardening Classes",
              "Home Shows",
              "DIY Events"
            ],
            "type": "Home & Garden"
          },
          {
            "id": "WLaYFGcV6EIMQfBNoCAB",
            "categories": [
              "Wellness Retreats",
              "Health Workshops",
              "Mindfulness Events",
              "Medical Seminars"
            ],
            "type": "Health & Wellness"
          },
          {
            "id": "WO5r3Z5Ks26NVvyi3QY6",
            "categories": [
              "Travel Expos",
              "Adventure Tours",
              "Backpacking Trips",
              "Cultural Experiences"
            ],
            "type": "Travel & Adventure"
          },
          {
            "id": "WP3VwrwvHEeijIOwr4FW",
            "categories": [
              "Home Improvement Workshops",
              "Gardening Classes",
              "Home Shows",
              "DIY Events"
            ],
            "type": "Home & Garden"
          },
          {
            "id": "WTyMoEOyqpIiZg2U3x54",
            "categories": [
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Food & Dining"
          },
          {
            "id": "WWND0ofZ0b0rHuqaKL3Q",
            "categories": [
              "Charity Galas",
              "Fundraising Events",
              "Volunteer Opportunities",
              "Community Outreach"
            ],
            "type": "Charity & Fundraising"
          },
          {
            "id": "WXMNwtfcHhHuppgvR284",
            "categories": [
              "Tech Conferences",
              "Startup Events",
              "Coding Workshops",
              "Tech Expos"
            ],
            "type": "Tech & Innovation"
          },
          {
            "id": "WY94Xk6r1d4bHzSKC54H",
            "categories": [
              "Wellness Retreats",
              "Health Workshops",
              "Mindfulness Events",
              "Medical Seminars"
            ],
            "type": "Health & Wellness"
          },
          {
            "id": "WYI5bvb1f1hXCtcRcbZH",
            "categories": [
              "Wellness Retreats",
              "Health Workshops",
              "Mindfulness Events",
              "Medical Seminars"
            ],
            "type": "Health & Wellness"
          },
          {
            "id": "WYS7HVp3cRuD0poew6Ks",
            "categories": [
              "Tech Conferences",
              "Startup Events",
              "Coding Workshops",
              "Tech Expos"
            ],
            "type": "Tech & Innovation"
          },
          {
            "id": "WYekqOtxYqReGAVNq9MU",
            "categories": [
              "Indian Cuisine",
              "Italian Cuisine",
              "American Fare",
              "Asian Fusion",
              "Mediterranean",
              "Mexican & Tex - Mex",
              "Sushi & Japanese",
              "Chinese Cuisine",
              "French Dining",
              "Vegetarian & Vegan",
              "Seafood Specialties",
              "BBQ & Grill",
              "Steakhouse",
              "Fast Food & Burgers",
              "Cafes & Bakeries",
              "Food Trucks",
              "Fine Dining",
              "Farm - to - Table",
              "Ethnic Eateries"
            ],
            "type": "Food styles"
          },
          {
            "id": "WZjdflot186ffGpOnFTA",
            "categories": [
              "Food & Dining",
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Sports & Fitness"
          },
          {
            "id": "Wam89h4daEGLix8DPM4x",
            "categories": [
              "Educational Workshops",
              "Lectures & Talks",
              "Online Courses",
              "Tutoring Services"
            ],
            "type": "Education & Learning"
          },
          {
            "id": "WctlXa2fPyVt46Zf3Yka",
            "categories": [
              "Science Exhibitions",
              "STEM Workshops",
              "Space & Astronomy",
              "Technology Talks"
            ],
            "type": "Science & Technology"
          },
          {
            "id": "WeNEvhzBO9Z3jxW9cFoN",
            "categories": [
              "Charity Galas",
              "Fundraising Events",
              "Volunteer Opportunities",
              "Community Outreach"
            ],
            "type": "Charity & Fundraising"
          },
          {
            "id": "WgFvZcTBooD9IuaisRxB",
            "categories": [
              "Religious Gatherings",
              "Spiritual Retreats",
              "Meditation Groups",
              "Interfaith Dialogues"
            ],
            "type": "Religion & Spirituality"
          },
          {
            "id": "WgIbUB4uQ2Zyv67yIcaj",
            "categories": [
              "Sporting Events",
              "Fitness Classes",
              "Yoga & Meditation",
              "Outdoor Activities"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "WgYQFy5Ds66wglxsZBji",
            "categories": [
              "Science Exhibitions",
              "STEM Workshops",
              "Space & Astronomy",
              "Technology Talks"
            ],
            "type": "Science & Technology"
          },
          {
            "id": "WiKgU69zu4BPUvNvOqYH",
            "categories": [
              "Networking Events",
              "Workshops & Seminars",
              "Conferences",
              "Job Fairs"
            ],
            "type": "Networking & Business"
          },
          {
            "id": "WjEYQUzItPqZzUjX5Rvs",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "WkQCzLO8rSEOVaFPan1g",
            "categories": [
              "Family - Friendly Events",
              "Children's Workshops",
              "Kid - Friendly Activities",
              "Amusement Parks"
            ],
            "type": "Family & Kids"
          },
          {
            "id": "Wl8tqnOue4x6JoNOCtue",
            "categories": [
              "Travel Expos",
              "Adventure Tours",
              "Backpacking Trips",
              "Cultural Experiences"
            ],
            "type": "Travel & Adventure"
          },
          {
            "id": "WmalhlpwsuxyxDKKPEfy",
            "categories": [
              "Religious Gatherings",
              "Spiritual Retreats",
              "Meditation Groups",
              "Interfaith Dialogues"
            ],
            "type": "Religion & Spirituality"
          },
          {
            "id": "WpkHooBr1YeLg9wYjiWn",
            "categories": [
              "Travel Expos",
              "Adventure Tours",
              "Backpacking Trips",
              "Cultural Experiences"
            ],
            "type": "Travel & Adventure"
          },
          {
            "id": "WrAUXCGSohD3mI4kOJ9d",
            "categories": [
              "Indian Cuisine",
              "Italian Cuisine",
              "American Fare",
              "Asian Fusion",
              "Mediterranean",
              "Mexican & Tex - Mex",
              "Sushi & Japanese",
              "Chinese Cuisine",
              "French Dining",
              "Vegetarian & Vegan",
              "Seafood Specialties",
              "BBQ & Grill",
              "Steakhouse",
              "Fast Food & Burgers",
              "Cafes & Bakeries",
              "Food Trucks",
              "Fine Dining",
              "Farm - to - Table",
              "Ethnic Eateries"
            ],
            "type": "Food styles"
          },
          {
            "id": "WrKCrbgznFhlVjCetCEH",
            "categories": [
              "Science Exhibitions",
              "STEM Workshops",
              "Space & Astronomy",
              "Technology Talks"
            ],
            "type": "Science & Technology"
          },
          {
            "id": "WulVJr2BlCj3agpAlnbs",
            "categories": [
              "Hobbyist Gatherings",
              "Hobby Workshops",
              "Special Interest Groups",
              "Craft Fairs"
            ],
            "type": "Hobbies & Interests"
          },
          {
            "id": "WwOF728faFLXKCyFWzpt",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "WxwzwuX9fm0dKDO4uf4Z",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "X2Qmq6TAASGgPlDcGIO2",
            "categories": [
              "Science Exhibitions",
              "STEM Workshops",
              "Space & Astronomy",
              "Technology Talks"
            ],
            "type": "Science & Technology"
          },
          {
            "id": "X32TraqCkTPahaJarhhV",
            "categories": [
              "Wellness Retreats",
              "Health Workshops",
              "Mindfulness Events",
              "Medical Seminars"
            ],
            "type": "Health & Wellness"
          },
          {
            "id": "X7bpqA8E6C2mCwgs4sZ3",
            "categories": [
              "Family - Friendly Events",
              "Children's Workshops",
              "Kid - Friendly Activities",
              "Amusement Parks"
            ],
            "type": "Family & Kids"
          },
          {
            "id": "X8xrdiBGa6slRxZTpywL",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "XA3JDiNqyo3c6DsMxaEM",
            "categories": [
              "Networking Events",
              "Workshops & Seminars",
              "Conferences",
              "Job Fairs"
            ],
            "type": "Networking & Business"
          },
          {
            "id": "XB2RCmKqn0PcGKJSqPx3",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "XCdnZcKrIAqa4bpofnKv",
            "categories": [
              "Fashion Shows",
              "Beauty Workshops",
              "Pop - Up Boutiques",
              "Makeup Classes"
            ],
            "type": "Fashion & Beauty"
          },
          {
            "id": "XDFxy8gNIZURLWTHmtX2",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "XEfCRznNFzdfJFzADTfo",
            "categories": [
              "Travel Expos",
              "Adventure Tours",
              "Backpacking Trips",
              "Cultural Experiences"
            ],
            "type": "Travel & Adventure"
          },
          {
            "id": "XEnIzvVMti6DkRhXLprQ",
            "categories": [
              "Tech Conferences",
              "Startup Events",
              "Coding Workshops",
              "Tech Expos"
            ],
            "type": "Tech & Innovation"
          },
          {
            "id": "XGbS8xBzfgShPzbn0yNP",
            "categories": [
              "Theater Productions",
              "Magic Shows",
              "Stand - Up Comedy",
              "Movie Screenings"
            ],
            "type": "Entertainment & Shows"
          },
          {
            "id": "XJXqfbHoBllmvxoj48xY",
            "categories": [
              "Pet Adoption Events",
              "Animal Welfare Fundraisers",
              "Pet - Friendly Activities",
              "Zoo Visits"
            ],
            "type": "Pets & Animals"
          },
          {
            "id": "XLHupYuWYZ4fT2t37Fea",
            "categories": [
              "Travel Expos",
              "Adventure Tours",
              "Backpacking Trips",
              "Cultural Experiences"
            ],
            "type": "Travel & Adventure"
          },
          {
            "id": "XOPAcbrw5F4jsiGo8e5y",
            "categories": [
              "Networking Events",
              "Workshops & Seminars",
              "Conferences",
              "Job Fairs"
            ],
            "type": "Networking & Business"
          },
          {
            "id": "XRbQLoNc5Pjb4SimGC7u",
            "categories": [
              "Sporting Events",
              "Fitness Classes",
              "Yoga & Meditation",
              "Outdoor Activities"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "XURG5TZcs6IBic9HvEeB",
            "categories": [
              "Family - Friendly Events",
              "Children's Workshops",
              "Kid - Friendly Activities",
              "Amusement Parks"
            ],
            "type": "Family & Kids"
          },
          {
            "id": "XVfTYyBmjCSMvdTaGJNz",
            "categories": [
              "Networking Events",
              "Workshops & Seminars",
              "Conferences",
              "Job Fairs"
            ],
            "type": "Networking & Business"
          },
          {
            "id": "XaqH9wS0TKnP3Dfhvqjo",
            "categories": [
              "Wellness Retreats",
              "Health Workshops",
              "Mindfulness Events",
              "Medical Seminars"
            ],
            "type": "Health & Wellness"
          },
          {
            "id": "XbgyKW0NzEP9nIaISr07",
            "categories": [
              "Sporting Events",
              "Fitness Classes",
              "Yoga & Meditation",
              "Outdoor Activities"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "XcvzZlZ9HsYg3SuwKEib",
            "categories": [
              "Sporting Events",
              "Fitness Classes",
              "Yoga & Meditation",
              "Outdoor Activities"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "XiFHHsPToxEsqAm6XtgU",
            "categories": [
              "Hobbyist Gatherings",
              "Hobby Workshops",
              "Special Interest Groups",
              "Craft Fairs"
            ],
            "type": "Hobbies & Interests"
          },
          {
            "id": "Xjf7O9Kd5xkYTPLVznId",
            "categories": [
              "Sporting Events",
              "Fitness Classes",
              "Yoga & Meditation",
              "Outdoor Activities"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "XpBIgciuJl7ct19blV0x",
            "categories": [
              "Fashion Shows",
              "Beauty Workshops",
              "Pop - Up Boutiques",
              "Makeup Classes"
            ],
            "type": "Fashion & Beauty"
          },
          {
            "id": "XqagjCyh2z45NESv7cI1",
            "categories": [
              "Fashion Shows",
              "Beauty Workshops",
              "Pop - Up Boutiques",
              "Makeup Classes"
            ],
            "type": "Fashion & Beauty"
          },
          {
            "id": "XuHUQ4Sio5I1JsOqo9cp",
            "categories": [
              "Sporting Events",
              "Fitness Classes",
              "Yoga & Meditation",
              "Outdoor Activities"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "Xv7W0VF8i4nfIvpv2hmD",
            "categories": [
              "Food & Dining",
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Sports & Fitness"
          },
          {
            "id": "XvD1EviTgVVR9FZLBRUw",
            "categories": [
              "Educational Workshops",
              "Lectures & Talks",
              "Online Courses",
              "Tutoring Services"
            ],
            "type": "Education & Learning"
          },
          {
            "id": "XwWl6KEZs32RpIVznfwn",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "XwwmRkgxn3X4eSM2zMJl",
            "categories": [
              "Science Exhibitions",
              "STEM Workshops",
              "Space & Astronomy",
              "Technology Talks"
            ],
            "type": "Science & Technology"
          },
          {
            "id": "XxS2UOzFlPhtbDJBQltd",
            "categories": [
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Food & Dining"
          },
          {
            "id": "XxSKXZUuL8ibwb6yrtZ8",
            "categories": [
              "Sporting Events",
              "Fitness Classes",
              "Yoga & Meditation",
              "Outdoor Activities"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "Xz121HYlQcGi2keJFUcc",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "XzmNzT4BsjK21q8AhH7U",
            "categories": [
              "Local Community Events",
              "Environmental Causes",
              "Social Activism",
              "Fundraising for Causes"
            ],
            "type": "Community & Causes"
          },
          {
            "id": "Y29J0Bw8AhFtBYt5ZJWV",
            "categories": [
              "Fashion Shows",
              "Beauty Workshops",
              "Pop - Up Boutiques",
              "Makeup Classes"
            ],
            "type": "Fashion & Beauty"
          },
          {
            "id": "Y2RK6JEJSgNIG1oK8SoM",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "Y6ZhIIgvceduNZcpzctq",
            "categories": [
              "Charity Galas",
              "Fundraising Events",
              "Volunteer Opportunities",
              "Community Outreach"
            ],
            "type": "Charity & Fundraising"
          },
          {
            "id": "Y6fWJhQziTo7TnbJvahx",
            "categories": [
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Food & Dining"
          },
          {
            "id": "Y7UnocWVg4aJbX2xsjj5",
            "categories": [
              "Travel Expos",
              "Adventure Tours",
              "Backpacking Trips",
              "Cultural Experiences"
            ],
            "type": "Travel & Adventure"
          },
          {
            "id": "Y81BgUSRkU16InwxF0DY",
            "categories": [
              "Home Improvement Workshops",
              "Gardening Classes",
              "Home Shows",
              "DIY Events"
            ],
            "type": "Home & Garden"
          },
          {
            "id": "YEG8K0l3UP6uvqjWQbIi",
            "categories": [
              "Home Improvement Workshops",
              "Gardening Classes",
              "Home Shows",
              "DIY Events"
            ],
            "type": "Home & Garden"
          },
          {
            "id": "YF7EweJtFuwGR2jAq3sk",
            "categories": [
              "Local Community Events",
              "Environmental Causes",
              "Social Activism",
              "Fundraising for Causes"
            ],
            "type": "Community & Causes"
          },
          {
            "id": "YGNTUaZxjhycKvMmOqjo",
            "categories": [
              "Wellness Retreats",
              "Health Workshops",
              "Mindfulness Events",
              "Medical Seminars"
            ],
            "type": "Health & Wellness"
          },
          {
            "id": "YGPrX7MFqI32hXejv35p",
            "categories": [
              "Travel Expos",
              "Adventure Tours",
              "Backpacking Trips",
              "Cultural Experiences"
            ],
            "type": "Travel & Adventure"
          },
          {
            "id": "YH2RDbd0UwgKsqDmblXP",
            "categories": [
              "Food & Dining",
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Sports & Fitness"
          },
          {
            "id": "YHHTh2dxlkZ4FNRVrz7M",
            "categories": [
              "Charity Galas",
              "Fundraising Events",
              "Volunteer Opportunities",
              "Community Outreach"
            ],
            "type": "Charity & Fundraising"
          },
          {
            "id": "YHQGHaku7JCnGmWCw9Ip",
            "categories": [
              "Networking Events",
              "Workshops & Seminars",
              "Conferences",
              "Job Fairs"
            ],
            "type": "Networking & Business"
          },
          {
            "id": "YJzES0wiOYqsDBazsSNq",
            "categories": [
              "Sporting Events",
              "Fitness Classes",
              "Yoga & Meditation",
              "Outdoor Activities"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "YMEZg8hA6zAxhEuENDwU",
            "categories": [
              "Networking Events",
              "Workshops & Seminars",
              "Conferences",
              "Job Fairs"
            ],
            "type": "Networking & Business"
          },
          {
            "id": "YOZ3MVmOrIIMhDm0KZy8",
            "categories": [
              "Food & Dining",
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Sports & Fitness"
          },
          {
            "id": "YPwcrSCd1qrC3qfkfYHz",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "YQ3sIeavC90zFMdGUNcR",
            "categories": [
              "Tech Conferences",
              "Startup Events",
              "Coding Workshops",
              "Tech Expos"
            ],
            "type": "Tech & Innovation"
          },
          {
            "id": "YV3Y4eM2F9rhUUJ5hnGg",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "YVxweXpi4giolsKaZV6T",
            "categories": [
              "Pet Adoption Events",
              "Animal Welfare Fundraisers",
              "Pet - Friendly Activities",
              "Zoo Visits"
            ],
            "type": "Pets & Animals"
          },
          {
            "id": "YYi5k2t8R6YpiNjSjWcQ",
            "categories": [
              "Home Improvement Workshops",
              "Gardening Classes",
              "Home Shows",
              "DIY Events"
            ],
            "type": "Home & Garden"
          },
          {
            "id": "YZFbpflf2AENpobDxnud",
            "categories": [
              "Sporting Events",
              "Fitness Classes",
              "Yoga & Meditation",
              "Outdoor Activities"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "YZx9Wi1Rku41KMxxJHQU",
            "categories": [
              "Local Community Events",
              "Environmental Causes",
              "Social Activism",
              "Fundraising for Causes"
            ],
            "type": "Community & Causes"
          },
          {
            "id": "YaA6MvS0EqDc0xt792Tp",
            "categories": [
              "Networking Events",
              "Workshops & Seminars",
              "Conferences",
              "Job Fairs"
            ],
            "type": "Networking & Business"
          },
          {
            "id": "Yb8Z098PRPSgRqp3syXb",
            "categories": [
              "Educational Workshops",
              "Lectures & Talks",
              "Online Courses",
              "Tutoring Services"
            ],
            "type": "Education & Learning"
          },
          {
            "id": "YdWXzPG8FsarRzjNlj9j",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "YetBccUStnKzpKgBQ39J",
            "categories": [
              "Tech Conferences",
              "Startup Events",
              "Coding Workshops",
              "Tech Expos"
            ],
            "type": "Tech & Innovation"
          },
          {
            "id": "YfeeAc8nRbeP7b0sKhia",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "YolXz9dQeukzC2DJR2sS",
            "categories": [
              "Educational Workshops",
              "Lectures & Talks",
              "Online Courses",
              "Tutoring Services"
            ],
            "type": "Education & Learning"
          },
          {
            "id": "Yqi7vhQawMHjWGibx97a",
            "categories": [
              "Fashion Shows",
              "Beauty Workshops",
              "Pop - Up Boutiques",
              "Makeup Classes"
            ],
            "type": "Fashion & Beauty"
          },
          {
            "id": "Yr3PrdTOKCGi9afmpTtZ",
            "categories": [
              "Networking Events",
              "Workshops & Seminars",
              "Conferences",
              "Job Fairs"
            ],
            "type": "Networking & Business"
          },
          {
            "id": "YrTOvtKuDpNaYxFMc9LF",
            "categories": [
              "Fashion Shows",
              "Beauty Workshops",
              "Pop - Up Boutiques",
              "Makeup Classes"
            ],
            "type": "Fashion & Beauty"
          },
          {
            "id": "Yw8UmYqDZsjJaUPuunJ8",
            "categories": [
              "Educational Workshops",
              "Lectures & Talks",
              "Online Courses",
              "Tutoring Services"
            ],
            "type": "Education & Learning"
          },
          {
            "id": "YwXN9rezHDfWz6Onq6Pa",
            "categories": [
              "Home Improvement Workshops",
              "Gardening Classes",
              "Home Shows",
              "DIY Events"
            ],
            "type": "Home & Garden"
          },
          {
            "id": "YyC2HNA1NwC92sj0SP9S",
            "categories": [
              "Networking Events",
              "Workshops & Seminars",
              "Conferences",
              "Job Fairs"
            ],
            "type": "Networking & Business"
          },
          {
            "id": "YzMmdIpIUn32L728GnH3",
            "categories": [
              "Theater Productions",
              "Magic Shows",
              "Stand - Up Comedy",
              "Movie Screenings"
            ],
            "type": "Entertainment & Shows"
          },
          {
            "id": "Z02Sl1OZaUCye5iIrwcd",
            "categories": [
              "Pet Adoption Events",
              "Animal Welfare Fundraisers",
              "Pet - Friendly Activities",
              "Zoo Visits"
            ],
            "type": "Pets & Animals"
          },
          {
            "id": "Z1bzn7hxdZMRAB9vMshf",
            "categories": [
              "Science Exhibitions",
              "STEM Workshops",
              "Space & Astronomy",
              "Technology Talks"
            ],
            "type": "Science & Technology"
          },
          {
            "id": "Z2FVxykZy0821U9pDS4l",
            "categories": [
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Food & Dining"
          },
          {
            "id": "Z3FSA7STBLYxoKMNpZ2R",
            "categories": [
              "Science Exhibitions",
              "STEM Workshops",
              "Space & Astronomy",
              "Technology Talks"
            ],
            "type": "Science & Technology"
          },
          {
            "id": "Z3ufe1RA09KLuR52KHcj",
            "categories": [
              "Educational Workshops",
              "Lectures & Talks",
              "Online Courses",
              "Tutoring Services"
            ],
            "type": "Education & Learning"
          },
          {
            "id": "Z5Wv885SnHl38fVkliE3",
            "categories": [
              "Tech Conferences",
              "Startup Events",
              "Coding Workshops",
              "Tech Expos"
            ],
            "type": "Tech & Innovation"
          },
          {
            "id": "ZENdVnmxA4xQyGxorwQw",
            "categories": [
              "Pet Adoption Events",
              "Animal Welfare Fundraisers",
              "Pet - Friendly Activities",
              "Zoo Visits"
            ],
            "type": "Pets & Animals"
          },
          {
            "id": "ZGCXx5t8XIxdCb04oSMd",
            "categories": [
              "Science Exhibitions",
              "STEM Workshops",
              "Space & Astronomy",
              "Technology Talks"
            ],
            "type": "Science & Technology"
          },
          {
            "id": "ZImy9vpW1mOIOS8uuN3r",
            "categories": [
              "Tech Conferences",
              "Startup Events",
              "Coding Workshops",
              "Tech Expos"
            ],
            "type": "Tech & Innovation"
          },
          {
            "id": "ZSiVy37cDEDEHHbgNX0Q",
            "categories": [
              "Hobbyist Gatherings",
              "Hobby Workshops",
              "Special Interest Groups",
              "Craft Fairs"
            ],
            "type": "Hobbies & Interests"
          },
          {
            "id": "ZSnFu8fh13G64zZs01pL",
            "categories": [
              "Sporting Events",
              "Fitness Classes",
              "Yoga & Meditation",
              "Outdoor Activities"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "ZWETWz0Ej2ixDEYVGzlA",
            "categories": [
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Food & Dining"
          },
          {
            "id": "ZWmRSfu7gnrhQgeWL89L",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "ZXyy52eSyK6llpVdPV6A",
            "categories": [
              "Wellness Retreats",
              "Health Workshops",
              "Mindfulness Events",
              "Medical Seminars"
            ],
            "type": "Health & Wellness"
          },
          {
            "id": "ZcaCzZiaNNK67GMDVF5J",
            "categories": [
              "Home Improvement Workshops",
              "Gardening Classes",
              "Home Shows",
              "DIY Events"
            ],
            "type": "Home & Garden"
          },
          {
            "id": "ZhRABlTVXHhBctRvHFtc",
            "categories": [
              "Tech Conferences",
              "Startup Events",
              "Coding Workshops",
              "Tech Expos"
            ],
            "type": "Tech & Innovation"
          },
          {
            "id": "ZhyH8TcCzPQ2DzgJc5pA",
            "categories": [
              "Hobbyist Gatherings",
              "Hobby Workshops",
              "Special Interest Groups",
              "Craft Fairs"
            ],
            "type": "Hobbies & Interests"
          },
          {
            "id": "Zk67eU9KPHctPWfyMCVg",
            "categories": [
              "Educational Workshops",
              "Lectures & Talks",
              "Online Courses",
              "Tutoring Services"
            ],
            "type": "Education & Learning"
          },
          {
            "id": "ZmOxvGZ8OQluHJdu93n1",
            "categories": [
              "Tech Conferences",
              "Startup Events",
              "Coding Workshops",
              "Tech Expos"
            ],
            "type": "Tech & Innovation"
          },
          {
            "id": "Zr7xSdOceBceTPxO55aN",
            "categories": [
              "Fashion Shows",
              "Beauty Workshops",
              "Pop - Up Boutiques",
              "Makeup Classes"
            ],
            "type": "Fashion & Beauty"
          },
          {
            "id": "ZrIfbTDjtkpVdrf5FnkU",
            "categories": [
              "Hobbyist Gatherings",
              "Hobby Workshops",
              "Special Interest Groups",
              "Craft Fairs"
            ],
            "type": "Hobbies & Interests"
          },
          {
            "id": "ZsGB4TGAYYrUkFiV5Yvq",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "ZttBnVAxGUOClcvToWP8",
            "categories": [
              "Travel Expos",
              "Adventure Tours",
              "Backpacking Trips",
              "Cultural Experiences"
            ],
            "type": "Travel & Adventure"
          },
          {
            "id": "Zyhog36tVedhexND2vNO",
            "categories": [
              "Wellness Retreats",
              "Health Workshops",
              "Mindfulness Events",
              "Medical Seminars"
            ],
            "type": "Health & Wellness"
          },
          {
            "id": "ZyrnKqUtOBpVUmOI8Biv",
            "categories": [
              "Indian Cuisine",
              "Italian Cuisine",
              "American Fare",
              "Asian Fusion",
              "Mediterranean",
              "Mexican & Tex - Mex",
              "Sushi & Japanese",
              "Chinese Cuisine",
              "French Dining",
              "Vegetarian & Vegan",
              "Seafood Specialties",
              "BBQ & Grill",
              "Steakhouse",
              "Fast Food & Burgers",
              "Cafes & Bakeries",
              "Food Trucks",
              "Fine Dining",
              "Farm - to - Table",
              "Ethnic Eateries"
            ],
            "type": "Food styles"
          },
          {
            "id": "Zz9kdD7bwtKjuQfItV2r",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "a0aJEEt1SLVhYp4lDVoD",
            "categories": [
              "Charity Galas",
              "Fundraising Events",
              "Volunteer Opportunities",
              "Community Outreach"
            ],
            "type": "Charity & Fundraising"
          },
          {
            "id": "a2VePgxx3TQiQX4V1Fnr",
            "categories": [
              "Science Exhibitions",
              "STEM Workshops",
              "Space & Astronomy",
              "Technology Talks"
            ],
            "type": "Science & Technology"
          },
          {
            "id": "a4Gi97RmYuqX03UvrZwX",
            "categories": [
              "Religious Gatherings",
              "Spiritual Retreats",
              "Meditation Groups",
              "Interfaith Dialogues"
            ],
            "type": "Religion & Spirituality"
          },
          {
            "id": "a4g7BOiKIDbCoPhVSoep",
            "categories": [
              "Travel Expos",
              "Adventure Tours",
              "Backpacking Trips",
              "Cultural Experiences"
            ],
            "type": "Travel & Adventure"
          },
          {
            "id": "a9di3YkeshfEWgpLJ7uK",
            "categories": [
              "Travel Expos",
              "Adventure Tours",
              "Backpacking Trips",
              "Cultural Experiences"
            ],
            "type": "Travel & Adventure"
          },
          {
            "id": "aAo35dYrykYgwDTnDqJd",
            "categories": [
              "Educational Workshops",
              "Lectures & Talks",
              "Online Courses",
              "Tutoring Services"
            ],
            "type": "Education & Learning"
          },
          {
            "id": "aBGcZLungHrJjg1eELW7",
            "categories": [
              "Educational Workshops",
              "Lectures & Talks",
              "Online Courses",
              "Tutoring Services"
            ],
            "type": "Education & Learning"
          },
          {
            "id": "aBZvhklzn0OiICKhD9Nf",
            "categories": [
              "Travel Expos",
              "Adventure Tours",
              "Backpacking Trips",
              "Cultural Experiences"
            ],
            "type": "Travel & Adventure"
          },
          {
            "id": "aC3AHM4zedGdsx8BuvCs",
            "categories": [
              "Local Community Events",
              "Environmental Causes",
              "Social Activism",
              "Fundraising for Causes"
            ],
            "type": "Community & Causes"
          },
          {
            "id": "aCTkAo8DQGSpN5jyDNEE",
            "categories": [
              "Hobbyist Gatherings",
              "Hobby Workshops",
              "Special Interest Groups",
              "Craft Fairs"
            ],
            "type": "Hobbies & Interests"
          },
          {
            "id": "aCzLfKhN6QynuPedu5UH",
            "categories": [
              "Educational Workshops",
              "Lectures & Talks",
              "Online Courses",
              "Tutoring Services"
            ],
            "type": "Education & Learning"
          },
          {
            "id": "aGEUDYo0LpAJCNC9LgQG",
            "categories": [
              "Hobbyist Gatherings",
              "Hobby Workshops",
              "Special Interest Groups",
              "Craft Fairs"
            ],
            "type": "Hobbies & Interests"
          },
          {
            "id": "aHHb3Hd0RprTAJAMTUGk",
            "categories": [
              "Networking Events",
              "Workshops & Seminars",
              "Conferences",
              "Job Fairs"
            ],
            "type": "Networking & Business"
          },
          {
            "id": "aHrIBmzuMKSZZMFFn4n3",
            "categories": [
              "Educational Workshops",
              "Lectures & Talks",
              "Online Courses",
              "Tutoring Services"
            ],
            "type": "Education & Learning"
          },
          {
            "id": "aLKJjxfLWva7ULPTXuMR",
            "categories": [
              "Charity Galas",
              "Fundraising Events",
              "Volunteer Opportunities",
              "Community Outreach"
            ],
            "type": "Charity & Fundraising"
          },
          {
            "id": "aM6e2ZX5137nGVNBd0Db",
            "categories": [
              "Tech Conferences",
              "Startup Events",
              "Coding Workshops",
              "Tech Expos"
            ],
            "type": "Tech & Innovation"
          },
          {
            "id": "aNsCZUQEWzF7Ae6uhUAH",
            "categories": [
              "Sporting Events",
              "Fitness Classes",
              "Yoga & Meditation",
              "Outdoor Activities"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "aNyVSYV5Ye2lWNwr2kqU",
            "categories": [
              "Wellness Retreats",
              "Health Workshops",
              "Mindfulness Events",
              "Medical Seminars"
            ],
            "type": "Health & Wellness"
          },
          {
            "id": "aQQKNx1LDc5aN9WUcykc",
            "categories": [
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Food & Dining"
          },
          {
            "id": "aUeCdKVJLr1itpi9Tmsq",
            "categories": [
              "Fashion Shows",
              "Beauty Workshops",
              "Pop - Up Boutiques",
              "Makeup Classes"
            ],
            "type": "Fashion & Beauty"
          },
          {
            "id": "aZFacfEVV5IHddQ1PW1e",
            "categories": [
              "Theater Productions",
              "Magic Shows",
              "Stand - Up Comedy",
              "Movie Screenings"
            ],
            "type": "Entertainment & Shows"
          },
          {
            "id": "aagahXEHnb4dzWBrlc2x",
            "categories": [
              "Tech Conferences",
              "Startup Events",
              "Coding Workshops",
              "Tech Expos"
            ],
            "type": "Tech & Innovation"
          },
          {
            "id": "abF2sNU2RI4absW63Ty0",
            "categories": [
              "Pet Adoption Events",
              "Animal Welfare Fundraisers",
              "Pet - Friendly Activities",
              "Zoo Visits"
            ],
            "type": "Pets & Animals"
          },
          {
            "id": "acffacruhjz9KFRdN0jO",
            "categories": [
              "Pet Adoption Events",
              "Animal Welfare Fundraisers",
              "Pet - Friendly Activities",
              "Zoo Visits"
            ],
            "type": "Pets & Animals"
          },
          {
            "id": "ah6WnfezuFRc0aKQF5Kh",
            "categories": [
              "Networking Events",
              "Workshops & Seminars",
              "Conferences",
              "Job Fairs"
            ],
            "type": "Networking & Business"
          },
          {
            "id": "aipXov9hlDyjFihtlAHh",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "ajmUB9KuMiyRhCZfovvi",
            "categories": [
              "Home Improvement Workshops",
              "Gardening Classes",
              "Home Shows",
              "DIY Events"
            ],
            "type": "Home & Garden"
          },
          {
            "id": "ajmyA989qOEpN0xfI0lM",
            "categories": [
              "Sporting Events",
              "Fitness Classes",
              "Yoga & Meditation",
              "Outdoor Activities"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "anLcNslzVdcw2Ofao5xz",
            "categories": [
              "Wellness Retreats",
              "Health Workshops",
              "Mindfulness Events",
              "Medical Seminars"
            ],
            "type": "Health & Wellness"
          },
          {
            "id": "aqWYDiOX3ZSLDY5utpIk",
            "categories": [
              "Local Community Events",
              "Environmental Causes",
              "Social Activism",
              "Fundraising for Causes"
            ],
            "type": "Community & Causes"
          },
          {
            "id": "aqfKXSSatmLas4LCXDah",
            "categories": [
              "Charity Galas",
              "Fundraising Events",
              "Volunteer Opportunities",
              "Community Outreach"
            ],
            "type": "Charity & Fundraising"
          },
          {
            "id": "awXqstegg4UtFXLEHV85",
            "categories": [
              "Travel Expos",
              "Adventure Tours",
              "Backpacking Trips",
              "Cultural Experiences"
            ],
            "type": "Travel & Adventure"
          },
          {
            "id": "axb1Ifjnw5QBzzR6jFeV",
            "categories": [
              "Travel Expos",
              "Adventure Tours",
              "Backpacking Trips",
              "Cultural Experiences"
            ],
            "type": "Travel & Adventure"
          },
          {
            "id": "ayzXNAO6gi3bMjLfqhGh",
            "categories": [
              "Tech Conferences",
              "Startup Events",
              "Coding Workshops",
              "Tech Expos"
            ],
            "type": "Tech & Innovation"
          },
          {
            "id": "azp26TOIS0llE0KO2LUP",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "b1BQtS2HilHyGubhlxra",
            "categories": [
              "Hobbyist Gatherings",
              "Hobby Workshops",
              "Special Interest Groups",
              "Craft Fairs"
            ],
            "type": "Hobbies & Interests"
          },
          {
            "id": "b2AsgYiMfCgwRabqpcph",
            "categories": [
              "Family - Friendly Events",
              "Children's Workshops",
              "Kid - Friendly Activities",
              "Amusement Parks"
            ],
            "type": "Family & Kids"
          },
          {
            "id": "b2rgvxenhheup1toamvz",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "b68bpV6QS5M8i6ufluCi",
            "categories": [
              "Food & Dining",
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Sports & Fitness"
          },
          {
            "id": "b6UVebYjqnHMPsOgbfcE",
            "categories": [
              "Wellness Retreats",
              "Health Workshops",
              "Mindfulness Events",
              "Medical Seminars"
            ],
            "type": "Health & Wellness"
          },
          {
            "id": "b7aRUZ8uSRFgw23HjbwD",
            "categories": [
              "Hobbyist Gatherings",
              "Hobby Workshops",
              "Special Interest Groups",
              "Craft Fairs"
            ],
            "type": "Hobbies & Interests"
          },
          {
            "id": "b8go5RlkSeO64Zv2wTkn",
            "categories": [
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Food & Dining"
          },
          {
            "id": "b8o3VbWm8Duc7W0CgTwf",
            "categories": [
              "Sporting Events",
              "Fitness Classes",
              "Yoga & Meditation",
              "Outdoor Activities"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "bBbgxYA0E9vcU9OnWABB",
            "categories": [
              "Networking Events",
              "Workshops & Seminars",
              "Conferences",
              "Job Fairs"
            ],
            "type": "Networking & Business"
          },
          {
            "id": "bCNanCLZrv1UuJAkTzTs",
            "categories": [
              "Travel Expos",
              "Adventure Tours",
              "Backpacking Trips",
              "Cultural Experiences"
            ],
            "type": "Travel & Adventure"
          },
          {
            "id": "bEevvaTTGIpIzR9o1hEZ",
            "categories": [
              "Wellness Retreats",
              "Health Workshops",
              "Mindfulness Events",
              "Medical Seminars"
            ],
            "type": "Health & Wellness"
          },
          {
            "id": "bEm6rNucquKtlDr3hrHh",
            "categories": [
              "Networking Events",
              "Workshops & Seminars",
              "Conferences",
              "Job Fairs"
            ],
            "type": "Networking & Business"
          },
          {
            "id": "bIfDGOT83XerjzCiLwEu",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "bLBWXSLyQ5e74C5jm7fl",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "bMPcwdW73P9kTjxe2h2r",
            "categories": [
              "Charity Galas",
              "Fundraising Events",
              "Volunteer Opportunities",
              "Community Outreach"
            ],
            "type": "Charity & Fundraising"
          },
          {
            "id": "bMbzzzFNUVHL96DgKFWa",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "bNIXcZZxY2B4h2wDwOZb",
            "categories": [
              "Wellness Retreats",
              "Health Workshops",
              "Mindfulness Events",
              "Medical Seminars"
            ],
            "type": "Health & Wellness"
          },
          {
            "id": "bOBICaZQoh2yTOBT4tFP",
            "categories": [
              "Tech Conferences",
              "Startup Events",
              "Coding Workshops",
              "Tech Expos"
            ],
            "type": "Tech & Innovation"
          },
          {
            "id": "bOqbEjxEnqpJjpPkMWos",
            "categories": [
              "Networking Events",
              "Workshops & Seminars",
              "Conferences",
              "Job Fairs"
            ],
            "type": "Networking & Business"
          },
          {
            "id": "bPnye9ko42fkzrEK5YBJ",
            "categories": [
              "Wellness Retreats",
              "Health Workshops",
              "Mindfulness Events",
              "Medical Seminars"
            ],
            "type": "Health & Wellness"
          },
          {
            "id": "bQa0FyeiCLup3gXi2Qsn",
            "categories": [
              "Networking Events",
              "Workshops & Seminars",
              "Conferences",
              "Job Fairs"
            ],
            "type": "Networking & Business"
          },
          {
            "id": "bSJiuJxCVVA1uK9dt8IZ",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "bT9CT8WOdbd9Y3sWCwHp",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "bVXZ0iBsWtXrSu5bhDbS",
            "categories": [
              "Family - Friendly Events",
              "Children's Workshops",
              "Kid - Friendly Activities",
              "Amusement Parks"
            ],
            "type": "Family & Kids"
          },
          {
            "id": "bWKSMzGRI2CQaR1LsUj4",
            "categories": [
              "Hobbyist Gatherings",
              "Hobby Workshops",
              "Special Interest Groups",
              "Craft Fairs"
            ],
            "type": "Hobbies & Interests"
          },
          {
            "id": "bXFRkN7haHM1FKNqo36e",
            "categories": [
              "Networking Events",
              "Workshops & Seminars",
              "Conferences",
              "Job Fairs"
            ],
            "type": "Networking & Business"
          },
          {
            "id": "bYANHkMfh8TVtRu3X2EH",
            "categories": [
              "Sporting Events",
              "Fitness Classes",
              "Yoga & Meditation",
              "Outdoor Activities"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "bay0JliJIXKljkaICx31",
            "categories": [
              "Food & Dining",
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Sports & Fitness"
          },
          {
            "id": "bbKS62RlJPNicZvry52P",
            "categories": [
              "Educational Workshops",
              "Lectures & Talks",
              "Online Courses",
              "Tutoring Services"
            ],
            "type": "Education & Learning"
          },
          {
            "id": "bfVcUJPWAjNVTXDCXogP",
            "categories": [
              "Sporting Events",
              "Fitness Classes",
              "Yoga & Meditation",
              "Outdoor Activities"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "biB1gjjIwD9CgzlX32Hg",
            "categories": [
              "Charity Galas",
              "Fundraising Events",
              "Volunteer Opportunities",
              "Community Outreach"
            ],
            "type": "Charity & Fundraising"
          },
          {
            "id": "bj7mokGAfjKN3y3sCrqY",
            "categories": [
              "Local Community Events",
              "Environmental Causes",
              "Social Activism",
              "Fundraising for Causes"
            ],
            "type": "Community & Causes"
          },
          {
            "id": "bmFREtKVSYZFUaZVpdEQ",
            "categories": [
              "Networking Events",
              "Workshops & Seminars",
              "Conferences",
              "Job Fairs"
            ],
            "type": "Networking & Business"
          },
          {
            "id": "bnxRMIPwihFkn9GP0fK8",
            "categories": [
              "Educational Workshops",
              "Lectures & Talks",
              "Online Courses",
              "Tutoring Services"
            ],
            "type": "Education & Learning"
          },
          {
            "id": "bw1lKm7V6p9E4xR60mlm",
            "categories": [
              "Religious Gatherings",
              "Spiritual Retreats",
              "Meditation Groups",
              "Interfaith Dialogues"
            ],
            "type": "Religion & Spirituality"
          },
          {
            "id": "c26Gui9iFKuw7TiiCQiM",
            "categories": [
              "Travel Expos",
              "Adventure Tours",
              "Backpacking Trips",
              "Cultural Experiences"
            ],
            "type": "Travel & Adventure"
          },
          {
            "id": "c2BFXwDV9GaStaHCStoG",
            "categories": [
              "Charity Galas",
              "Fundraising Events",
              "Volunteer Opportunities",
              "Community Outreach"
            ],
            "type": "Charity & Fundraising"
          },
          {
            "id": "c2CAupBiOTgUoNFVLy98",
            "categories": [
              "Pet Adoption Events",
              "Animal Welfare Fundraisers",
              "Pet - Friendly Activities",
              "Zoo Visits"
            ],
            "type": "Pets & Animals"
          },
          {
            "id": "c2RtdTnHNeG7LEjulmxi",
            "categories": [
              "Hobbyist Gatherings",
              "Hobby Workshops",
              "Special Interest Groups",
              "Craft Fairs"
            ],
            "type": "Hobbies & Interests"
          },
          {
            "id": "c3dnr65ttA2zuq3VYfNo",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "c78liv3T6vT1ndbQLU2Y",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "c8S0HgSwEeRSXJRuhuWt",
            "categories": [
              "Charity Galas",
              "Fundraising Events",
              "Volunteer Opportunities",
              "Community Outreach"
            ],
            "type": "Charity & Fundraising"
          },
          {
            "id": "c9kmxXAnjzmJrBsg86TW",
            "categories": [
              "Pet Adoption Events",
              "Animal Welfare Fundraisers",
              "Pet - Friendly Activities",
              "Zoo Visits"
            ],
            "type": "Pets & Animals"
          },
          {
            "id": "cAEILFRyX3CGEm85SCzu",
            "categories": [
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Food & Dining"
          },
          {
            "id": "cCdtl9SKSdDAvgYNg92Q",
            "categories": [
              "Religious Gatherings",
              "Spiritual Retreats",
              "Meditation Groups",
              "Interfaith Dialogues"
            ],
            "type": "Religion & Spirituality"
          },
          {
            "id": "cCmkHWmWD0P5p2q2ZCyY",
            "categories": [
              "Educational Workshops",
              "Lectures & Talks",
              "Online Courses",
              "Tutoring Services"
            ],
            "type": "Education & Learning"
          },
          {
            "id": "cE6Zd9dpIKrCHmD8wvIX",
            "categories": [
              "Indian Cuisine",
              "Italian Cuisine",
              "American Fare",
              "Asian Fusion",
              "Mediterranean",
              "Mexican & Tex - Mex",
              "Sushi & Japanese",
              "Chinese Cuisine",
              "French Dining",
              "Vegetarian & Vegan",
              "Seafood Specialties",
              "BBQ & Grill",
              "Steakhouse",
              "Fast Food & Burgers",
              "Cafes & Bakeries",
              "Food Trucks",
              "Fine Dining",
              "Farm - to - Table",
              "Ethnic Eateries"
            ],
            "type": "Food styles"
          },
          {
            "id": "cHi4AuQzGQGxOUtQK4jM",
            "categories": [
              "Tech Conferences",
              "Startup Events",
              "Coding Workshops",
              "Tech Expos"
            ],
            "type": "Tech & Innovation"
          },
          {
            "id": "cHyaWdiNFbnyqEhBnDhm",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "cITt66fTexa9chGQNTOG",
            "categories": [
              "Travel Expos",
              "Adventure Tours",
              "Backpacking Trips",
              "Cultural Experiences"
            ],
            "type": "Travel & Adventure"
          },
          {
            "id": "cIqc4Oo1M9A97XRLnPyU",
            "categories": [
              "Family - Friendly Events",
              "Children's Workshops",
              "Kid - Friendly Activities",
              "Amusement Parks"
            ],
            "type": "Family & Kids"
          },
          {
            "id": "cKningeaWhA1lWPH72Q4",
            "categories": [
              "Charity Galas",
              "Fundraising Events",
              "Volunteer Opportunities",
              "Community Outreach"
            ],
            "type": "Charity & Fundraising"
          },
          {
            "id": "cLNXOTX9Zn1Az3gO5RaG",
            "categories": [
              "Indian Cuisine",
              "Italian Cuisine",
              "American Fare",
              "Asian Fusion",
              "Mediterranean",
              "Mexican & Tex - Mex",
              "Sushi & Japanese",
              "Chinese Cuisine",
              "French Dining",
              "Vegetarian & Vegan",
              "Seafood Specialties",
              "BBQ & Grill",
              "Steakhouse",
              "Fast Food & Burgers",
              "Cafes & Bakeries",
              "Food Trucks",
              "Fine Dining",
              "Farm - to - Table",
              "Ethnic Eateries"
            ],
            "type": "Food styles"
          },
          {
            "id": "cLxxr3CRsJ4gnEVUYyN9",
            "categories": [
              "Sporting Events",
              "Fitness Classes",
              "Yoga & Meditation",
              "Outdoor Activities"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "cM3u397iOAilzH4nhiOD",
            "categories": [
              "Fashion Shows",
              "Beauty Workshops",
              "Pop - Up Boutiques",
              "Makeup Classes"
            ],
            "type": "Fashion & Beauty"
          },
          {
            "id": "cN4GjDeo6Xn5txOk1bZg",
            "categories": [
              "Educational Workshops",
              "Lectures & Talks",
              "Online Courses",
              "Tutoring Services"
            ],
            "type": "Education & Learning"
          },
          {
            "id": "cNLLtpStvIpRYTUL1WBz",
            "categories": [
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Food & Dining"
          },
          {
            "id": "cQY03psdOud53jp1eqdc",
            "categories": [
              "Indian Cuisine",
              "Italian Cuisine",
              "American Fare",
              "Asian Fusion",
              "Mediterranean",
              "Mexican & Tex - Mex",
              "Sushi & Japanese",
              "Chinese Cuisine",
              "French Dining",
              "Vegetarian & Vegan",
              "Seafood Specialties",
              "BBQ & Grill",
              "Steakhouse",
              "Fast Food & Burgers",
              "Cafes & Bakeries",
              "Food Trucks",
              "Fine Dining",
              "Farm - to - Table",
              "Ethnic Eateries"
            ],
            "type": "Food styles"
          },
          {
            "id": "cQiPFIyJjRksAhxWTbim",
            "categories": [
              "Wellness Retreats",
              "Health Workshops",
              "Mindfulness Events",
              "Medical Seminars"
            ],
            "type": "Health & Wellness"
          },
          {
            "id": "cRAPgOe20lXtIeAQNXXy",
            "categories": [
              "Networking Events",
              "Workshops & Seminars",
              "Conferences",
              "Job Fairs"
            ],
            "type": "Networking & Business"
          },
          {
            "id": "cRBBT4wmvuz4FnlZ9KyD",
            "categories": [
              "Wellness Retreats",
              "Health Workshops",
              "Mindfulness Events",
              "Medical Seminars"
            ],
            "type": "Health & Wellness"
          },
          {
            "id": "cRpX7ylXkNSJ8PG8b6Ft",
            "categories": [
              "Religious Gatherings",
              "Spiritual Retreats",
              "Meditation Groups",
              "Interfaith Dialogues"
            ],
            "type": "Religion & Spirituality"
          },
          {
            "id": "cSOgNQcB0iWRFMJ8X7Lp",
            "categories": [
              "Family - Friendly Events",
              "Children's Workshops",
              "Kid - Friendly Activities",
              "Amusement Parks"
            ],
            "type": "Family & Kids"
          },
          {
            "id": "cToQmPFlPOz7wKrFD0mV",
            "categories": [
              "Theater Productions",
              "Magic Shows",
              "Stand - Up Comedy",
              "Movie Screenings"
            ],
            "type": "Entertainment & Shows"
          },
          {
            "id": "cVYiAUbIAd7ntSItzbe5",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "cYaPlbrItmEil9xdtV3P",
            "categories": [
              "Networking Events",
              "Workshops & Seminars",
              "Conferences",
              "Job Fairs"
            ],
            "type": "Networking & Business"
          },
          {
            "id": "ca0YDUmBKPD3R2uikDpe",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "cb88pat9s2SdXvVVAQla",
            "categories": [
              "Science Exhibitions",
              "STEM Workshops",
              "Space & Astronomy",
              "Technology Talks"
            ],
            "type": "Science & Technology"
          },
          {
            "id": "cfGeN7QhVS1kzv7iCV9B",
            "categories": [
              "Indian Cuisine",
              "Italian Cuisine",
              "American Fare",
              "Asian Fusion",
              "Mediterranean",
              "Mexican & Tex - Mex",
              "Sushi & Japanese",
              "Chinese Cuisine",
              "French Dining",
              "Vegetarian & Vegan",
              "Seafood Specialties",
              "BBQ & Grill",
              "Steakhouse",
              "Fast Food & Burgers",
              "Cafes & Bakeries",
              "Food Trucks",
              "Fine Dining",
              "Farm - to - Table",
              "Ethnic Eateries"
            ],
            "type": "Food styles"
          },
          {
            "id": "cjEVFfjcVS7wmh2MiCRy",
            "categories": [
              "Theater Productions",
              "Magic Shows",
              "Stand - Up Comedy",
              "Movie Screenings"
            ],
            "type": "Entertainment & Shows"
          },
          {
            "id": "ck5FqEDiazZX1luScEht",
            "categories": [
              "Educational Workshops",
              "Lectures & Talks",
              "Online Courses",
              "Tutoring Services"
            ],
            "type": "Education & Learning"
          },
          {
            "id": "cl7M9D3jPFHMPpmHqg4k",
            "categories": [
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Food & Dining"
          },
          {
            "id": "clDfwkm1aemqUbUsHYUm",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "cmlHFB2nmgRBzAvTIT0D",
            "categories": [
              "Local Community Events",
              "Environmental Causes",
              "Social Activism",
              "Fundraising for Causes"
            ],
            "type": "Community & Causes"
          },
          {
            "id": "cnmP89XHLmMMjnM8ZBO2",
            "categories": [
              "Religious Gatherings",
              "Spiritual Retreats",
              "Meditation Groups",
              "Interfaith Dialogues"
            ],
            "type": "Religion & Spirituality"
          },
          {
            "id": "cp7q9pcIsZGOXVvyI03X",
            "categories": [
              "Tech Conferences",
              "Startup Events",
              "Coding Workshops",
              "Tech Expos"
            ],
            "type": "Tech & Innovation"
          },
          {
            "id": "cpSJeOTjv3NG4Zw1TXuU",
            "categories": [
              "Theater Productions",
              "Magic Shows",
              "Stand - Up Comedy",
              "Movie Screenings"
            ],
            "type": "Entertainment & Shows"
          },
          {
            "id": "csQVFK9byQbG9KTj1uVG",
            "categories": [
              "Local Community Events",
              "Environmental Causes",
              "Social Activism",
              "Fundraising for Causes"
            ],
            "type": "Community & Causes"
          },
          {
            "id": "ct9s6nGbC5gm39csoZqt",
            "categories": [
              "Sporting Events",
              "Fitness Classes",
              "Yoga & Meditation",
              "Outdoor Activities"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "cuUQIs5hVz4y4rJx5rpu",
            "categories": [
              "Wellness Retreats",
              "Health Workshops",
              "Mindfulness Events",
              "Medical Seminars"
            ],
            "type": "Health & Wellness"
          },
          {
            "id": "cvRgvnnlzl76YNGrcoAL",
            "categories": [
              "Family - Friendly Events",
              "Children's Workshops",
              "Kid - Friendly Activities",
              "Amusement Parks"
            ],
            "type": "Family & Kids"
          },
          {
            "id": "cysDTipSGPJujLLSDXRi",
            "categories": [
              "Religious Gatherings",
              "Spiritual Retreats",
              "Meditation Groups",
              "Interfaith Dialogues"
            ],
            "type": "Religion & Spirituality"
          },
          {
            "id": "d68TtMjioLV7QNMHP5aE",
            "categories": [
              "Religious Gatherings",
              "Spiritual Retreats",
              "Meditation Groups",
              "Interfaith Dialogues"
            ],
            "type": "Religion & Spirituality"
          },
          {
            "id": "d9wmJFshbkbfCi3gYDic",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "dCiHjQG7WN4CMMcTHIId",
            "categories": [
              "Educational Workshops",
              "Lectures & Talks",
              "Online Courses",
              "Tutoring Services"
            ],
            "type": "Education & Learning"
          },
          {
            "id": "dG6B7aoz01U7rcxo59sO",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "dHKaFXdGepmg2Sl9lQWJ",
            "categories": [
              "Pet Adoption Events",
              "Animal Welfare Fundraisers",
              "Pet - Friendly Activities",
              "Zoo Visits"
            ],
            "type": "Pets & Animals"
          },
          {
            "id": "dIPvUrsUVPiI43VS1z0u",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "dJc2db1hWoQWDGYwCxE3",
            "categories": [
              "Wellness Retreats",
              "Health Workshops",
              "Mindfulness Events",
              "Medical Seminars"
            ],
            "type": "Health & Wellness"
          },
          {
            "id": "dKIp3YaV9vdCx4a1rpHz",
            "categories": [
              "Hobbyist Gatherings",
              "Hobby Workshops",
              "Special Interest Groups",
              "Craft Fairs"
            ],
            "type": "Hobbies & Interests"
          },
          {
            "id": "dPU8kpSepPqOrFIUImEi",
            "categories": [
              "Tech Conferences",
              "Startup Events",
              "Coding Workshops",
              "Tech Expos"
            ],
            "type": "Tech & Innovation"
          },
          {
            "id": "dSsbN0EcZCIl0pCxp1on",
            "categories": [
              "Science Exhibitions",
              "STEM Workshops",
              "Space & Astronomy",
              "Technology Talks"
            ],
            "type": "Science & Technology"
          },
          {
            "id": "dXRKETYdwaaxWyanJZUe",
            "categories": [
              "Hobbyist Gatherings",
              "Hobby Workshops",
              "Special Interest Groups",
              "Craft Fairs"
            ],
            "type": "Hobbies & Interests"
          },
          {
            "id": "dXTBFTlgyTUSHjC31QIO",
            "categories": [
              "Wellness Retreats",
              "Health Workshops",
              "Mindfulness Events",
              "Medical Seminars"
            ],
            "type": "Health & Wellness"
          },
          {
            "id": "dZ72FvkfcdRs5E3FCW0K",
            "categories": [
              "Theater Productions",
              "Magic Shows",
              "Stand - Up Comedy",
              "Movie Screenings"
            ],
            "type": "Entertainment & Shows"
          },
          {
            "id": "dZigIGylAJcFPLx9KHVW",
            "categories": [
              "Networking Events",
              "Workshops & Seminars",
              "Conferences",
              "Job Fairs"
            ],
            "type": "Networking & Business"
          },
          {
            "id": "daIUdLVU7Ce5qDsunGtR",
            "categories": [
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Food & Dining"
          },
          {
            "id": "daUgX0G3GoSjeHRK9BnY",
            "categories": [
              "Home Improvement Workshops",
              "Gardening Classes",
              "Home Shows",
              "DIY Events"
            ],
            "type": "Home & Garden"
          },
          {
            "id": "damUNDgJxXJx3Jj9kjL8",
            "categories": [
              "Family - Friendly Events",
              "Children's Workshops",
              "Kid - Friendly Activities",
              "Amusement Parks"
            ],
            "type": "Family & Kids"
          },
          {
            "id": "dcFzUJCbNvxDFEveCczQ",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "ddofrDVUpBgkx89HtfbA",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "dfcz4u1W0RsQ9qiJ9j0h",
            "categories": [
              "Wellness Retreats",
              "Health Workshops",
              "Mindfulness Events",
              "Medical Seminars"
            ],
            "type": "Health & Wellness"
          },
          {
            "id": "dmBBwxPeYduQAv8ikKw1",
            "categories": [
              "Local Community Events",
              "Environmental Causes",
              "Social Activism",
              "Fundraising for Causes"
            ],
            "type": "Community & Causes"
          },
          {
            "id": "dmOuMO0sYoOlIiBTWVxZ",
            "categories": [
              "Food & Dining",
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Sports & Fitness"
          },
          {
            "id": "dntF4BBFsSfDVbNyzSEP",
            "categories": [
              "Travel Expos",
              "Adventure Tours",
              "Backpacking Trips",
              "Cultural Experiences"
            ],
            "type": "Travel & Adventure"
          },
          {
            "id": "dnxW2CtTXBesWXYqkMZo",
            "categories": [
              "Wellness Retreats",
              "Health Workshops",
              "Mindfulness Events",
              "Medical Seminars"
            ],
            "type": "Health & Wellness"
          },
          {
            "id": "do7JP8bmZYFpO1fCUBEH",
            "categories": [
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Food & Dining"
          },
          {
            "id": "dp8Caogq6rR8gL9WDPSB",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "dp9RX3dgHbWS7RhbxQDw",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "du4Zb6SiI593N283AxlZ",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "du5FFrgS2ELs4fRGScTJ",
            "categories": [
              "Indian Cuisine",
              "Italian Cuisine",
              "American Fare",
              "Asian Fusion",
              "Mediterranean",
              "Mexican & Tex - Mex",
              "Sushi & Japanese",
              "Chinese Cuisine",
              "French Dining",
              "Vegetarian & Vegan",
              "Seafood Specialties",
              "BBQ & Grill",
              "Steakhouse",
              "Fast Food & Burgers",
              "Cafes & Bakeries",
              "Food Trucks",
              "Fine Dining",
              "Farm - to - Table",
              "Ethnic Eateries"
            ],
            "type": "Food styles"
          },
          {
            "id": "duS1XKXlWQ3dH95NbT3l",
            "categories": [
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Food & Dining"
          },
          {
            "id": "duyd92GVZEqPDPZk0HBt",
            "categories": [
              "Networking Events",
              "Workshops & Seminars",
              "Conferences",
              "Job Fairs"
            ],
            "type": "Networking & Business"
          },
          {
            "id": "e16Rr2mSgU4y42sYlagF",
            "categories": [
              "Charity Galas",
              "Fundraising Events",
              "Volunteer Opportunities",
              "Community Outreach"
            ],
            "type": "Charity & Fundraising"
          },
          {
            "id": "e7YOrPzFOCDyUmwpvnrk",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "e7asMpzF6PNVHK2ZG0kd",
            "categories": [
              "Home Improvement Workshops",
              "Gardening Classes",
              "Home Shows",
              "DIY Events"
            ],
            "type": "Home & Garden"
          },
          {
            "id": "e8XiOt9NDG8OFZEqY5fp",
            "categories": [
              "Food & Dining",
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Sports & Fitness"
          },
          {
            "id": "e8zqeYNtiNSBMG1m0UTN",
            "categories": [
              "Local Community Events",
              "Environmental Causes",
              "Social Activism",
              "Fundraising for Causes"
            ],
            "type": "Community & Causes"
          },
          {
            "id": "e9o0wN5YdP3eE6i3Bm6i",
            "categories": [
              "Pet Adoption Events",
              "Animal Welfare Fundraisers",
              "Pet - Friendly Activities",
              "Zoo Visits"
            ],
            "type": "Pets & Animals"
          },
          {
            "id": "eDXNH4F38XkaAqjUxXq3",
            "categories": [
              "Indian Cuisine",
              "Italian Cuisine",
              "American Fare",
              "Asian Fusion",
              "Mediterranean",
              "Mexican & Tex - Mex",
              "Sushi & Japanese",
              "Chinese Cuisine",
              "French Dining",
              "Vegetarian & Vegan",
              "Seafood Specialties",
              "BBQ & Grill",
              "Steakhouse",
              "Fast Food & Burgers",
              "Cafes & Bakeries",
              "Food Trucks",
              "Fine Dining",
              "Farm - to - Table",
              "Ethnic Eateries"
            ],
            "type": "Food styles"
          },
          {
            "id": "eDlSLvsgzNKfjDDaezL5",
            "categories": [
              "Science Exhibitions",
              "STEM Workshops",
              "Space & Astronomy",
              "Technology Talks"
            ],
            "type": "Science & Technology"
          },
          {
            "id": "eDtRcQjd589lKsgNUjbz",
            "categories": [
              "Food & Dining",
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Sports & Fitness"
          },
          {
            "id": "eH27ujgrXTBbVOx0Pwbo",
            "categories": [
              "Theater Productions",
              "Magic Shows",
              "Stand - Up Comedy",
              "Movie Screenings"
            ],
            "type": "Entertainment & Shows"
          },
          {
            "id": "eHOcQGJgTXxzLEk0t5fM",
            "categories": [
              "Theater Productions",
              "Magic Shows",
              "Stand - Up Comedy",
              "Movie Screenings"
            ],
            "type": "Entertainment & Shows"
          },
          {
            "id": "eIlFeMo0GgI2399oKp9D",
            "categories": [
              "Theater Productions",
              "Magic Shows",
              "Stand - Up Comedy",
              "Movie Screenings"
            ],
            "type": "Entertainment & Shows"
          },
          {
            "id": "eLWU9aNAqunThxsco9gv",
            "categories": [
              "Home Improvement Workshops",
              "Gardening Classes",
              "Home Shows",
              "DIY Events"
            ],
            "type": "Home & Garden"
          },
          {
            "id": "ePByQZPJXFwB1tPhE3bC",
            "categories": [
              "Science Exhibitions",
              "STEM Workshops",
              "Space & Astronomy",
              "Technology Talks"
            ],
            "type": "Science & Technology"
          },
          {
            "id": "ePsxntmFjALIwIT2tSDr",
            "categories": [
              "Food & Dining",
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Sports & Fitness"
          },
          {
            "id": "eUk1HdKWwYO3u6EvDnfd",
            "categories": [
              "Food & Dining",
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Sports & Fitness"
          },
          {
            "id": "eXJKDBBleLvJDFoWqZYs",
            "categories": [
              "Food & Dining",
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Sports & Fitness"
          },
          {
            "id": "ehiwF8sCcwAjhLUBXrsT",
            "categories": [
              "Local Community Events",
              "Environmental Causes",
              "Social Activism",
              "Fundraising for Causes"
            ],
            "type": "Community & Causes"
          },
          {
            "id": "ejxzJ4OCWMDV5rMPiemv",
            "categories": [
              "Sporting Events",
              "Fitness Classes",
              "Yoga & Meditation",
              "Outdoor Activities"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "elCLPs28XKwCPgrVy1JY",
            "categories": [
              "Tech Conferences",
              "Startup Events",
              "Coding Workshops",
              "Tech Expos"
            ],
            "type": "Tech & Innovation"
          },
          {
            "id": "elMJtVd3s9FHiOc0T9AH",
            "categories": [
              "Local Community Events",
              "Environmental Causes",
              "Social Activism",
              "Fundraising for Causes"
            ],
            "type": "Community & Causes"
          },
          {
            "id": "emKKZRJ1hmg0uYkyCsHF",
            "categories": [
              "Charity Galas",
              "Fundraising Events",
              "Volunteer Opportunities",
              "Community Outreach"
            ],
            "type": "Charity & Fundraising"
          },
          {
            "id": "eq9hU8JjaIXhomiI83FC",
            "categories": [
              "Tech Conferences",
              "Startup Events",
              "Coding Workshops",
              "Tech Expos"
            ],
            "type": "Tech & Innovation"
          },
          {
            "id": "esQu3P6MAh7KrXl208VW",
            "categories": [
              "Educational Workshops",
              "Lectures & Talks",
              "Online Courses",
              "Tutoring Services"
            ],
            "type": "Education & Learning"
          },
          {
            "id": "esSgBKMTlG0VyfP1MDYH",
            "categories": [
              "Fashion Shows",
              "Beauty Workshops",
              "Pop - Up Boutiques",
              "Makeup Classes"
            ],
            "type": "Fashion & Beauty"
          },
          {
            "id": "et52pY0whuHqpJqLeNHx",
            "categories": [
              "Hobbyist Gatherings",
              "Hobby Workshops",
              "Special Interest Groups",
              "Craft Fairs"
            ],
            "type": "Hobbies & Interests"
          },
          {
            "id": "euKr8OHiv7zgyoOCnPxZ",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "evXMVQ2taU9CvqBjCtIr",
            "categories": [
              "Food & Dining",
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Sports & Fitness"
          },
          {
            "id": "exJckOZvAWg0TQ2mgcBc",
            "categories": [
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Food & Dining"
          },
          {
            "id": "eyW0Ushns2dRoaLeuDSC",
            "categories": [
              "Educational Workshops",
              "Lectures & Talks",
              "Online Courses",
              "Tutoring Services"
            ],
            "type": "Education & Learning"
          },
          {
            "id": "f1BxIJRFq37T2CooJxs4",
            "categories": [
              "Networking Events",
              "Workshops & Seminars",
              "Conferences",
              "Job Fairs"
            ],
            "type": "Networking & Business"
          },
          {
            "id": "f1RnHBPF41baDiZCIfxA",
            "categories": [
              "Networking Events",
              "Workshops & Seminars",
              "Conferences",
              "Job Fairs"
            ],
            "type": "Networking & Business"
          },
          {
            "id": "f1UYqIW6GNzple4Dx96Q",
            "categories": [
              "Networking Events",
              "Workshops & Seminars",
              "Conferences",
              "Job Fairs"
            ],
            "type": "Networking & Business"
          },
          {
            "id": "f6zSbXzx7A7UKrTG2Byc",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "f9sia33BiKPvyl0OrDkn",
            "categories": [
              "Tech Conferences",
              "Startup Events",
              "Coding Workshops",
              "Tech Expos"
            ],
            "type": "Tech & Innovation"
          },
          {
            "id": "fABmm9DuaKh8FRSNiX40",
            "categories": [
              "Networking Events",
              "Workshops & Seminars",
              "Conferences",
              "Job Fairs"
            ],
            "type": "Networking & Business"
          },
          {
            "id": "fAHkYSNRRaqvOVWW00qt",
            "categories": [
              "Tech Conferences",
              "Startup Events",
              "Coding Workshops",
              "Tech Expos"
            ],
            "type": "Tech & Innovation"
          },
          {
            "id": "fC54egNr4bmtJo7C6FsN",
            "categories": [
              "Hobbyist Gatherings",
              "Hobby Workshops",
              "Special Interest Groups",
              "Craft Fairs"
            ],
            "type": "Hobbies & Interests"
          },
          {
            "id": "fEFFFxF4q7UJD9bX5L0E",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "fEtBUawlG9tYpNRiePdv",
            "categories": [
              "Travel Expos",
              "Adventure Tours",
              "Backpacking Trips",
              "Cultural Experiences"
            ],
            "type": "Travel & Adventure"
          },
          {
            "id": "fFXBkBJQkNeGKaAhqgdN",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "fFxHmsD1e7fdKOoEqg2f",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "fGYxYHu3iq6PHdp7jSIe",
            "categories": [
              "Science Exhibitions",
              "STEM Workshops",
              "Space & Astronomy",
              "Technology Talks"
            ],
            "type": "Science & Technology"
          },
          {
            "id": "fHoSBQVIKmrwkmH6iXBj",
            "categories": [
              "Hobbyist Gatherings",
              "Hobby Workshops",
              "Special Interest Groups",
              "Craft Fairs"
            ],
            "type": "Hobbies & Interests"
          },
          {
            "id": "fIBJR0JdPmi17tuj4Ksw",
            "categories": [
              "Science Exhibitions",
              "STEM Workshops",
              "Space & Astronomy",
              "Technology Talks"
            ],
            "type": "Science & Technology"
          },
          {
            "id": "fIg3LLNlQcHLqZNOAmAK",
            "categories": [
              "Wellness Retreats",
              "Health Workshops",
              "Mindfulness Events",
              "Medical Seminars"
            ],
            "type": "Health & Wellness"
          },
          {
            "id": "fJSrMYPBs7pAiYNZZbj6",
            "categories": [
              "Theater Productions",
              "Magic Shows",
              "Stand - Up Comedy",
              "Movie Screenings"
            ],
            "type": "Entertainment & Shows"
          },
          {
            "id": "fNdwakysFbtPuxMjZHGB",
            "categories": [
              "Tech Conferences",
              "Startup Events",
              "Coding Workshops",
              "Tech Expos"
            ],
            "type": "Tech & Innovation"
          },
          {
            "id": "fO0FcvRmwFSp18ybSmIX",
            "categories": [
              "Tech Conferences",
              "Startup Events",
              "Coding Workshops",
              "Tech Expos"
            ],
            "type": "Tech & Innovation"
          },
          {
            "id": "fR4GGcTgldSh8GND3AZk",
            "categories": [
              "Travel Expos",
              "Adventure Tours",
              "Backpacking Trips",
              "Cultural Experiences"
            ],
            "type": "Travel & Adventure"
          },
          {
            "id": "fRJ6Jyi51WJnNHXSkBz4",
            "categories": [
              "Pet Adoption Events",
              "Animal Welfare Fundraisers",
              "Pet - Friendly Activities",
              "Zoo Visits"
            ],
            "type": "Pets & Animals"
          },
          {
            "id": "fSNkSHyBs7i1Vuez0w68",
            "categories": [
              "Food & Dining",
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Sports & Fitness"
          },
          {
            "id": "fTllS5Lospo2WaPlMk7g",
            "categories": [
              "Indian Cuisine",
              "Italian Cuisine",
              "American Fare",
              "Asian Fusion",
              "Mediterranean",
              "Mexican & Tex - Mex",
              "Sushi & Japanese",
              "Chinese Cuisine",
              "French Dining",
              "Vegetarian & Vegan",
              "Seafood Specialties",
              "BBQ & Grill",
              "Steakhouse",
              "Fast Food & Burgers",
              "Cafes & Bakeries",
              "Food Trucks",
              "Fine Dining",
              "Farm - to - Table",
              "Ethnic Eateries"
            ],
            "type": "Food styles"
          },
          {
            "id": "fUdW5xI4kTZLtfTy6soo",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "fWEjYGvBwTta9rc5gzjj",
            "categories": [
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Food & Dining"
          },
          {
            "id": "fZJwHtQ1FIfIxpwwsTVN",
            "categories": [
              "Tech Conferences",
              "Startup Events",
              "Coding Workshops",
              "Tech Expos"
            ],
            "type": "Tech & Innovation"
          },
          {
            "id": "faNNefExTjQYpRNSxFpD",
            "categories": [
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Food & Dining"
          },
          {
            "id": "fdAnBhE9WxATdQvXEqF3",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "fdTuv9DyunhQGB0B8z3Q",
            "categories": [
              "Networking Events",
              "Workshops & Seminars",
              "Conferences",
              "Job Fairs"
            ],
            "type": "Networking & Business"
          },
          {
            "id": "fdcKzyVqwuE4duPs9CG7",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "feXA3nZjaESA8FNqticM",
            "categories": [
              "Tech Conferences",
              "Startup Events",
              "Coding Workshops",
              "Tech Expos"
            ],
            "type": "Tech & Innovation"
          },
          {
            "id": "ffGLdBY56nLWelWIJXTA",
            "categories": [
              "Family - Friendly Events",
              "Children's Workshops",
              "Kid - Friendly Activities",
              "Amusement Parks"
            ],
            "type": "Family & Kids"
          },
          {
            "id": "fh6JojUFGRjpeTHfbhov",
            "categories": [
              "Home Improvement Workshops",
              "Gardening Classes",
              "Home Shows",
              "DIY Events"
            ],
            "type": "Home & Garden"
          },
          {
            "id": "fkeNY6I8IrXFIKXJQn0w",
            "categories": [
              "Hobbyist Gatherings",
              "Hobby Workshops",
              "Special Interest Groups",
              "Craft Fairs"
            ],
            "type": "Hobbies & Interests"
          },
          {
            "id": "fnxqqwPkcurdCQaEBfcw",
            "categories": [
              "Theater Productions",
              "Magic Shows",
              "Stand - Up Comedy",
              "Movie Screenings"
            ],
            "type": "Entertainment & Shows"
          },
          {
            "id": "fpbylBx0cPoTjtLvsrKr",
            "categories": [
              "Indian Cuisine",
              "Italian Cuisine",
              "American Fare",
              "Asian Fusion",
              "Mediterranean",
              "Mexican & Tex - Mex",
              "Sushi & Japanese",
              "Chinese Cuisine",
              "French Dining",
              "Vegetarian & Vegan",
              "Seafood Specialties",
              "BBQ & Grill",
              "Steakhouse",
              "Fast Food & Burgers",
              "Cafes & Bakeries",
              "Food Trucks",
              "Fine Dining",
              "Farm - to - Table",
              "Ethnic Eateries"
            ],
            "type": "Food styles"
          },
          {
            "id": "ftmAnTEjwykT69CdSkCU",
            "categories": [
              "Tech Conferences",
              "Startup Events",
              "Coding Workshops",
              "Tech Expos"
            ],
            "type": "Tech & Innovation"
          },
          {
            "id": "fvq1popLJlhMYDdrQaCW",
            "categories": [
              "Family - Friendly Events",
              "Children's Workshops",
              "Kid - Friendly Activities",
              "Amusement Parks"
            ],
            "type": "Family & Kids"
          },
          {
            "id": "fw1AfRM0cIWdfiwX2SrW",
            "categories": [
              "Fashion Shows",
              "Beauty Workshops",
              "Pop - Up Boutiques",
              "Makeup Classes"
            ],
            "type": "Fashion & Beauty"
          },
          {
            "id": "fyMaZnEcRJhbTzbmjdSV",
            "categories": [
              "Sporting Events",
              "Fitness Classes",
              "Yoga & Meditation",
              "Outdoor Activities"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "g1V1xY8j8wN5bfmzuZMA",
            "categories": [
              "Charity Galas",
              "Fundraising Events",
              "Volunteer Opportunities",
              "Community Outreach"
            ],
            "type": "Charity & Fundraising"
          },
          {
            "id": "g2Cmwd4PzMSDXsYkQoBl",
            "categories": [
              "Family - Friendly Events",
              "Children's Workshops",
              "Kid - Friendly Activities",
              "Amusement Parks"
            ],
            "type": "Family & Kids"
          },
          {
            "id": "g3pisxHuMroshNAIvpgn",
            "categories": [
              "Tech Conferences",
              "Startup Events",
              "Coding Workshops",
              "Tech Expos"
            ],
            "type": "Tech & Innovation"
          },
          {
            "id": "g4Hup8vTbTWBLbPnvUqd",
            "categories": [
              "Science Exhibitions",
              "STEM Workshops",
              "Space & Astronomy",
              "Technology Talks"
            ],
            "type": "Science & Technology"
          },
          {
            "id": "g4gxIS0Uy0IDs7KDi3KI",
            "categories": [
              "Science Exhibitions",
              "STEM Workshops",
              "Space & Astronomy",
              "Technology Talks"
            ],
            "type": "Science & Technology"
          },
          {
            "id": "g5FpL2a7V4If1eHPCo4l",
            "categories": [
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Food & Dining"
          },
          {
            "id": "g5KpqAdfhtB9Twq2g65E",
            "categories": [
              "Travel Expos",
              "Adventure Tours",
              "Backpacking Trips",
              "Cultural Experiences"
            ],
            "type": "Travel & Adventure"
          },
          {
            "id": "g8UxlkCv8fcEfnOCay6g",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "g8lNZcpfnaBnH7y6F2VY",
            "categories": [
              "Indian Cuisine",
              "Italian Cuisine",
              "American Fare",
              "Asian Fusion",
              "Mediterranean",
              "Mexican & Tex - Mex",
              "Sushi & Japanese",
              "Chinese Cuisine",
              "French Dining",
              "Vegetarian & Vegan",
              "Seafood Specialties",
              "BBQ & Grill",
              "Steakhouse",
              "Fast Food & Burgers",
              "Cafes & Bakeries",
              "Food Trucks",
              "Fine Dining",
              "Farm - to - Table",
              "Ethnic Eateries"
            ],
            "type": "Food styles"
          },
          {
            "id": "g9DOOHUaJcPy3pC7QdMj",
            "categories": [
              "Food & Dining",
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Sports & Fitness"
          },
          {
            "id": "gAeyvkl03mgMgwJYG7ml",
            "categories": [
              "Charity Galas",
              "Fundraising Events",
              "Volunteer Opportunities",
              "Community Outreach"
            ],
            "type": "Charity & Fundraising"
          },
          {
            "id": "gBJ7G1m68JAANXs4AXH3",
            "categories": [
              "Food & Dining",
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Sports & Fitness"
          },
          {
            "id": "gE6fxS0MrHSucXnAA2NS",
            "categories": [
              "Family - Friendly Events",
              "Children's Workshops",
              "Kid - Friendly Activities",
              "Amusement Parks"
            ],
            "type": "Family & Kids"
          },
          {
            "id": "gGkCAA0nrD2U5NMyjhEV",
            "categories": [
              "Hobbyist Gatherings",
              "Hobby Workshops",
              "Special Interest Groups",
              "Craft Fairs"
            ],
            "type": "Hobbies & Interests"
          },
          {
            "id": "gIKLUewEOUatixHagrK2",
            "categories": [
              "Theater Productions",
              "Magic Shows",
              "Stand - Up Comedy",
              "Movie Screenings"
            ],
            "type": "Entertainment & Shows"
          },
          {
            "id": "gIoQH7Sgfg7t3nriisdk",
            "categories": [
              "Networking Events",
              "Workshops & Seminars",
              "Conferences",
              "Job Fairs"
            ],
            "type": "Networking & Business"
          },
          {
            "id": "gJ1imG5MmLbhc9M1JYfQ",
            "categories": [
              "Charity Galas",
              "Fundraising Events",
              "Volunteer Opportunities",
              "Community Outreach"
            ],
            "type": "Charity & Fundraising"
          },
          {
            "id": "gJcQbSlEEcNTUAomBZwS",
            "categories": [
              "Tech Conferences",
              "Startup Events",
              "Coding Workshops",
              "Tech Expos"
            ],
            "type": "Tech & Innovation"
          },
          {
            "id": "gJo3PZ3MBzJkllyzNs1q",
            "categories": [
              "Networking Events",
              "Workshops & Seminars",
              "Conferences",
              "Job Fairs"
            ],
            "type": "Networking & Business"
          },
          {
            "id": "gLEFzfYwRbLgQno1jXmC",
            "categories": [
              "Travel Expos",
              "Adventure Tours",
              "Backpacking Trips",
              "Cultural Experiences"
            ],
            "type": "Travel & Adventure"
          },
          {
            "id": "gLZMvt1gRBKJurDV6tHD",
            "categories": [
              "Local Community Events",
              "Environmental Causes",
              "Social Activism",
              "Fundraising for Causes"
            ],
            "type": "Community & Causes"
          },
          {
            "id": "gOI7Cuj4eTVoxnFMbyHJ",
            "categories": [
              "Charity Galas",
              "Fundraising Events",
              "Volunteer Opportunities",
              "Community Outreach"
            ],
            "type": "Charity & Fundraising"
          },
          {
            "id": "gQXPA5jLzU829WdHELe0",
            "categories": [
              "Pet Adoption Events",
              "Animal Welfare Fundraisers",
              "Pet - Friendly Activities",
              "Zoo Visits"
            ],
            "type": "Pets & Animals"
          },
          {
            "id": "gQfuQi38SSfiqwR26qkn",
            "categories": [
              "Indian Cuisine",
              "Italian Cuisine",
              "American Fare",
              "Asian Fusion",
              "Mediterranean",
              "Mexican & Tex - Mex",
              "Sushi & Japanese",
              "Chinese Cuisine",
              "French Dining",
              "Vegetarian & Vegan",
              "Seafood Specialties",
              "BBQ & Grill",
              "Steakhouse",
              "Fast Food & Burgers",
              "Cafes & Bakeries",
              "Food Trucks",
              "Fine Dining",
              "Farm - to - Table",
              "Ethnic Eateries"
            ],
            "type": "Food styles"
          },
          {
            "id": "gRbuKOMNRYdBxTOuwSQz",
            "categories": [
              "Educational Workshops",
              "Lectures & Talks",
              "Online Courses",
              "Tutoring Services"
            ],
            "type": "Education & Learning"
          },
          {
            "id": "gS9rhh3y5kUU79ZhbuLN",
            "categories": [
              "Networking Events",
              "Workshops & Seminars",
              "Conferences",
              "Job Fairs"
            ],
            "type": "Networking & Business"
          },
          {
            "id": "gTBEOa1HqOZvGSQSKfPw",
            "categories": [
              "Food & Dining",
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Sports & Fitness"
          },
          {
            "id": "gWLIknHVJiyKTo0IbZFp",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "gWbS7V6IGnPWgdmWDg7N",
            "categories": [
              "Sporting Events",
              "Fitness Classes",
              "Yoga & Meditation",
              "Outdoor Activities"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "gXp8yWTbYaCDH9njrurP",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "gY4Qbpn9xAHySv2Qkm2m",
            "categories": [
              "Pet Adoption Events",
              "Animal Welfare Fundraisers",
              "Pet - Friendly Activities",
              "Zoo Visits"
            ],
            "type": "Pets & Animals"
          },
          {
            "id": "gYMmq2tmlquHTnqt5ARV",
            "categories": [
              "Charity Galas",
              "Fundraising Events",
              "Volunteer Opportunities",
              "Community Outreach"
            ],
            "type": "Charity & Fundraising"
          },
          {
            "id": "gc5PFC5c4EYDBDNkRWnG",
            "categories": [
              "Travel Expos",
              "Adventure Tours",
              "Backpacking Trips",
              "Cultural Experiences"
            ],
            "type": "Travel & Adventure"
          },
          {
            "id": "gcV9gK7uVm77DJSkUE2G",
            "categories": [
              "Indian Cuisine",
              "Italian Cuisine",
              "American Fare",
              "Asian Fusion",
              "Mediterranean",
              "Mexican & Tex - Mex",
              "Sushi & Japanese",
              "Chinese Cuisine",
              "French Dining",
              "Vegetarian & Vegan",
              "Seafood Specialties",
              "BBQ & Grill",
              "Steakhouse",
              "Fast Food & Burgers",
              "Cafes & Bakeries",
              "Food Trucks",
              "Fine Dining",
              "Farm - to - Table",
              "Ethnic Eateries"
            ],
            "type": "Food styles"
          },
          {
            "id": "gcakGUoZ6BNZNMRYgmqs",
            "categories": [
              "Networking Events",
              "Workshops & Seminars",
              "Conferences",
              "Job Fairs"
            ],
            "type": "Networking & Business"
          },
          {
            "id": "gdATUekZBqXNUcUJfAOo",
            "categories": [
              "Food & Dining",
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Sports & Fitness"
          },
          {
            "id": "gfWDsQGjGXRCYVL8q5pB",
            "categories": [
              "Religious Gatherings",
              "Spiritual Retreats",
              "Meditation Groups",
              "Interfaith Dialogues"
            ],
            "type": "Religion & Spirituality"
          },
          {
            "id": "gk4hJ9boQTvRwLY7mGvj",
            "categories": [
              "Hobbyist Gatherings",
              "Hobby Workshops",
              "Special Interest Groups",
              "Craft Fairs"
            ],
            "type": "Hobbies & Interests"
          },
          {
            "id": "gkNmZQmlllCNtWqadY47",
            "categories": [
              "Tech Conferences",
              "Startup Events",
              "Coding Workshops",
              "Tech Expos"
            ],
            "type": "Tech & Innovation"
          },
          {
            "id": "gkunF2Hum5kkuHY45n2f",
            "categories": [
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Food & Dining"
          },
          {
            "id": "glfBUIWYbFSecakfEMCq",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "go3Cb6C6YaSOipVqeBAv",
            "categories": [
              "Fashion Shows",
              "Beauty Workshops",
              "Pop - Up Boutiques",
              "Makeup Classes"
            ],
            "type": "Fashion & Beauty"
          },
          {
            "id": "gogCyRlsK8DqkJ2l8JMj",
            "categories": [
              "Tech Conferences",
              "Startup Events",
              "Coding Workshops",
              "Tech Expos"
            ],
            "type": "Tech & Innovation"
          },
          {
            "id": "goj1t4CLGugJxDtSKihO",
            "categories": [
              "Indian Cuisine",
              "Italian Cuisine",
              "American Fare",
              "Asian Fusion",
              "Mediterranean",
              "Mexican & Tex - Mex",
              "Sushi & Japanese",
              "Chinese Cuisine",
              "French Dining",
              "Vegetarian & Vegan",
              "Seafood Specialties",
              "BBQ & Grill",
              "Steakhouse",
              "Fast Food & Burgers",
              "Cafes & Bakeries",
              "Food Trucks",
              "Fine Dining",
              "Farm - to - Table",
              "Ethnic Eateries"
            ],
            "type": "Food styles"
          },
          {
            "id": "gpesVWe38WmkNLhPMKqb",
            "categories": [
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Food & Dining"
          },
          {
            "id": "gqICjHxL0O6JuFgQ8J4B",
            "categories": [
              "Hobbyist Gatherings",
              "Hobby Workshops",
              "Special Interest Groups",
              "Craft Fairs"
            ],
            "type": "Hobbies & Interests"
          },
          {
            "id": "gtMhNfIVGJIEnczM1Wps",
            "categories": [
              "Travel Expos",
              "Adventure Tours",
              "Backpacking Trips",
              "Cultural Experiences"
            ],
            "type": "Travel & Adventure"
          },
          {
            "id": "guyl8K7aMrg4PM5sdQsu",
            "categories": [
              "Theater Productions",
              "Magic Shows",
              "Stand - Up Comedy",
              "Movie Screenings"
            ],
            "type": "Entertainment & Shows"
          },
          {
            "id": "gwcjZ9CG4Ae5fx3khvSh",
            "categories": [
              "Sporting Events",
              "Fitness Classes",
              "Yoga & Meditation",
              "Outdoor Activities"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "gxKvGfsFsAvJRj2lg379",
            "categories": [
              "Networking Events",
              "Workshops & Seminars",
              "Conferences",
              "Job Fairs"
            ],
            "type": "Networking & Business"
          },
          {
            "id": "gxZVCrxarbgev6KUbdSS",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "h0D3BLJhXgj5bHKh4zIu",
            "categories": [
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Food & Dining"
          },
          {
            "id": "h3KsiLYUL1VpaJOWuu1Y",
            "categories": [
              "Local Community Events",
              "Environmental Causes",
              "Social Activism",
              "Fundraising for Causes"
            ],
            "type": "Community & Causes"
          },
          {
            "id": "h3dr0fCS2SYYn1HMGSqp",
            "categories": [
              "Charity Galas",
              "Fundraising Events",
              "Volunteer Opportunities",
              "Community Outreach"
            ],
            "type": "Charity & Fundraising"
          },
          {
            "id": "h5c0VSTtfzYqwFJLVqVH",
            "categories": [
              "Wellness Retreats",
              "Health Workshops",
              "Mindfulness Events",
              "Medical Seminars"
            ],
            "type": "Health & Wellness"
          },
          {
            "id": "h6vIsL2yM6S94tj6ZGnV",
            "categories": [
              "Local Community Events",
              "Environmental Causes",
              "Social Activism",
              "Fundraising for Causes"
            ],
            "type": "Community & Causes"
          },
          {
            "id": "hA7IVBi9WzxajQGDcDZb",
            "categories": [
              "Hobbyist Gatherings",
              "Hobby Workshops",
              "Special Interest Groups",
              "Craft Fairs"
            ],
            "type": "Hobbies & Interests"
          },
          {
            "id": "hAJNc97iyM9T0nLhrqCW",
            "categories": [
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Food & Dining"
          },
          {
            "id": "hCAK0VucjVI4GfVdqljO",
            "categories": [
              "Local Community Events",
              "Environmental Causes",
              "Social Activism",
              "Fundraising for Causes"
            ],
            "type": "Community & Causes"
          },
          {
            "id": "hDt4oWGJEDQDkbr4UFBr",
            "categories": [
              "Sporting Events",
              "Fitness Classes",
              "Yoga & Meditation",
              "Outdoor Activities"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "hEBbTOq2YFwxuOGwYeuQ",
            "categories": [
              "Pet Adoption Events",
              "Animal Welfare Fundraisers",
              "Pet - Friendly Activities",
              "Zoo Visits"
            ],
            "type": "Pets & Animals"
          },
          {
            "id": "hHbx6JjBDsVa40LdX6Y2",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "hJCb0UyfdETUaFZbr6Em",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "hJw0utYJzndKcPFNqaLO",
            "categories": [
              "Educational Workshops",
              "Lectures & Talks",
              "Online Courses",
              "Tutoring Services"
            ],
            "type": "Education & Learning"
          },
          {
            "id": "hN5McPNHLhxCoAupyZnn",
            "categories": [
              "Home Improvement Workshops",
              "Gardening Classes",
              "Home Shows",
              "DIY Events"
            ],
            "type": "Home & Garden"
          },
          {
            "id": "hNvlirXbDMXwM0l9N77K",
            "categories": [
              "Tech Conferences",
              "Startup Events",
              "Coding Workshops",
              "Tech Expos"
            ],
            "type": "Tech & Innovation"
          },
          {
            "id": "hOtCJ82vZfFFZItxeiNs",
            "categories": [
              "Religious Gatherings",
              "Spiritual Retreats",
              "Meditation Groups",
              "Interfaith Dialogues"
            ],
            "type": "Religion & Spirituality"
          },
          {
            "id": "hPmieZqynqQNGwakPZTc",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "hSZfEbG2HJJpbxCOi00l",
            "categories": [
              "Fashion Shows",
              "Beauty Workshops",
              "Pop - Up Boutiques",
              "Makeup Classes"
            ],
            "type": "Fashion & Beauty"
          },
          {
            "id": "hShT4nN3Abpis7U7BqEu",
            "categories": [
              "Wellness Retreats",
              "Health Workshops",
              "Mindfulness Events",
              "Medical Seminars"
            ],
            "type": "Health & Wellness"
          },
          {
            "id": "hTPNhu9TUNgePAzaLL2m",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "hUDhnA1Hz1ZaWX9XK0Lf",
            "categories": [
              "Sporting Events",
              "Fitness Classes",
              "Yoga & Meditation",
              "Outdoor Activities"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "hUpxvYIL5dX4408DqNzY",
            "categories": [
              "Hobbyist Gatherings",
              "Hobby Workshops",
              "Special Interest Groups",
              "Craft Fairs"
            ],
            "type": "Hobbies & Interests"
          },
          {
            "id": "hWMaKzp6hWq2Ie2ZRx4w",
            "categories": [
              "Educational Workshops",
              "Lectures & Talks",
              "Online Courses",
              "Tutoring Services"
            ],
            "type": "Education & Learning"
          },
          {
            "id": "hYr4UL3WC67otglpj5YF",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "ha9KfihJbcYyn7kY9vcs",
            "categories": [
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Food & Dining"
          },
          {
            "id": "hbolJ8olvU9PMUSBgvnn",
            "categories": [
              "Science Exhibitions",
              "STEM Workshops",
              "Space & Astronomy",
              "Technology Talks"
            ],
            "type": "Science & Technology"
          },
          {
            "id": "hcUPF1cQwCIVqMDXxjtP",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "hdrN8MvMxfqdLRCtiu2W",
            "categories": [
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Food & Dining"
          },
          {
            "id": "hjZ97oYJ6WZmUNccpOJ6",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "hkSURoRwcfAcMo43TQ83",
            "categories": [
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Food & Dining"
          },
          {
            "id": "hkvzRyR659kRxCPDIn0L",
            "categories": [
              "Networking Events",
              "Workshops & Seminars",
              "Conferences",
              "Job Fairs"
            ],
            "type": "Networking & Business"
          },
          {
            "id": "hltzeOp7Ka3MeY0VfcvX",
            "categories": [
              "Family - Friendly Events",
              "Children's Workshops",
              "Kid - Friendly Activities",
              "Amusement Parks"
            ],
            "type": "Family & Kids"
          },
          {
            "id": "hoPeNMD6kmYyc9eojeay",
            "categories": [
              "Tech Conferences",
              "Startup Events",
              "Coding Workshops",
              "Tech Expos"
            ],
            "type": "Tech & Innovation"
          },
          {
            "id": "hsVcGeoZJhysoXqLUR6a",
            "categories": [
              "Charity Galas",
              "Fundraising Events",
              "Volunteer Opportunities",
              "Community Outreach"
            ],
            "type": "Charity & Fundraising"
          },
          {
            "id": "huf72RjthktT2jtcBKVL",
            "categories": [
              "Charity Galas",
              "Fundraising Events",
              "Volunteer Opportunities",
              "Community Outreach"
            ],
            "type": "Charity & Fundraising"
          },
          {
            "id": "hvKp8yQiHbN3i4hWeD4i",
            "categories": [
              "Fashion Shows",
              "Beauty Workshops",
              "Pop - Up Boutiques",
              "Makeup Classes"
            ],
            "type": "Fashion & Beauty"
          },
          {
            "id": "i2NsnJMKAcUQlJqTH7Je",
            "categories": [
              "Fashion Shows",
              "Beauty Workshops",
              "Pop - Up Boutiques",
              "Makeup Classes"
            ],
            "type": "Fashion & Beauty"
          },
          {
            "id": "i6ubohMCoKgqwrfZdWft",
            "categories": [
              "Tech Conferences",
              "Startup Events",
              "Coding Workshops",
              "Tech Expos"
            ],
            "type": "Tech & Innovation"
          },
          {
            "id": "i7oKvT3ls01VxXdhGRak",
            "categories": [
              "Indian Cuisine",
              "Italian Cuisine",
              "American Fare",
              "Asian Fusion",
              "Mediterranean",
              "Mexican & Tex - Mex",
              "Sushi & Japanese",
              "Chinese Cuisine",
              "French Dining",
              "Vegetarian & Vegan",
              "Seafood Specialties",
              "BBQ & Grill",
              "Steakhouse",
              "Fast Food & Burgers",
              "Cafes & Bakeries",
              "Food Trucks",
              "Fine Dining",
              "Farm - to - Table",
              "Ethnic Eateries"
            ],
            "type": "Food styles"
          },
          {
            "id": "i7xi9jr2uXV08nTwJS07",
            "categories": [
              "Pet Adoption Events",
              "Animal Welfare Fundraisers",
              "Pet - Friendly Activities",
              "Zoo Visits"
            ],
            "type": "Pets & Animals"
          },
          {
            "id": "i82ReDUnxCJQQlB9da82",
            "categories": [
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Food & Dining"
          },
          {
            "id": "i9cdtL3kdtixiOAhtPWx",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "i9wFCwtI0yT6l6hVUoeA",
            "categories": [
              "Food & Dining",
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Sports & Fitness"
          },
          {
            "id": "iA8LkhgII25G8Ly9qWmx",
            "categories": [
              "Home Improvement Workshops",
              "Gardening Classes",
              "Home Shows",
              "DIY Events"
            ],
            "type": "Home & Garden"
          },
          {
            "id": "iENpIbRhYqU8IXWh8aLi",
            "categories": [
              "Travel Expos",
              "Adventure Tours",
              "Backpacking Trips",
              "Cultural Experiences"
            ],
            "type": "Travel & Adventure"
          },
          {
            "id": "iF5viaY7I1aRO0JFuXM5",
            "categories": [
              "Fashion Shows",
              "Beauty Workshops",
              "Pop - Up Boutiques",
              "Makeup Classes"
            ],
            "type": "Fashion & Beauty"
          },
          {
            "id": "iIMKCSVdYrVpT68QxIzo",
            "categories": [
              "Networking Events",
              "Workshops & Seminars",
              "Conferences",
              "Job Fairs"
            ],
            "type": "Networking & Business"
          },
          {
            "id": "iIQltHSTgwL6RHbQBvpK",
            "categories": [
              "Charity Galas",
              "Fundraising Events",
              "Volunteer Opportunities",
              "Community Outreach"
            ],
            "type": "Charity & Fundraising"
          },
          {
            "id": "iJvS9X7RLU2ZZjYTMP1J",
            "categories": [
              "Wellness Retreats",
              "Health Workshops",
              "Mindfulness Events",
              "Medical Seminars"
            ],
            "type": "Health & Wellness"
          },
          {
            "id": "iK25AvKNRGAzIoA1Tz7f",
            "categories": [
              "Wellness Retreats",
              "Health Workshops",
              "Mindfulness Events",
              "Medical Seminars"
            ],
            "type": "Health & Wellness"
          },
          {
            "id": "iKCKaTqQ7TdjUlXKCv9S",
            "categories": [
              "Sporting Events",
              "Fitness Classes",
              "Yoga & Meditation",
              "Outdoor Activities"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "iLCN0jp6orRfUaUMH9zU",
            "categories": [
              "Pet Adoption Events",
              "Animal Welfare Fundraisers",
              "Pet - Friendly Activities",
              "Zoo Visits"
            ],
            "type": "Pets & Animals"
          },
          {
            "id": "iLOiicZ8ELJzXBPtLQkG",
            "categories": [
              "Fashion Shows",
              "Beauty Workshops",
              "Pop - Up Boutiques",
              "Makeup Classes"
            ],
            "type": "Fashion & Beauty"
          },
          {
            "id": "iQ2TbdXQIwhh9jmzH3eg",
            "categories": [
              "Charity Galas",
              "Fundraising Events",
              "Volunteer Opportunities",
              "Community Outreach"
            ],
            "type": "Charity & Fundraising"
          },
          {
            "id": "iQegC3pnL2uh1bkDkn0I",
            "categories": [
              "Religious Gatherings",
              "Spiritual Retreats",
              "Meditation Groups",
              "Interfaith Dialogues"
            ],
            "type": "Religion & Spirituality"
          },
          {
            "id": "iTOdrsnLhyImuyhXKnWp",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "iXsLBheWZgUNaspQPV0d",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "iYxo0P5cPOA5iCud4LAq",
            "categories": [
              "Wellness Retreats",
              "Health Workshops",
              "Mindfulness Events",
              "Medical Seminars"
            ],
            "type": "Health & Wellness"
          },
          {
            "id": "iZ1Zq3yvx2QVWjuneiMh",
            "categories": [
              "Pet Adoption Events",
              "Animal Welfare Fundraisers",
              "Pet - Friendly Activities",
              "Zoo Visits"
            ],
            "type": "Pets & Animals"
          },
          {
            "id": "iZBIil9vIVas1t0cvLJ8",
            "categories": [
              "Food & Dining",
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Sports & Fitness"
          },
          {
            "id": "iZGstPTKZie8Drzi5NQr",
            "categories": [
              "Home Improvement Workshops",
              "Gardening Classes",
              "Home Shows",
              "DIY Events"
            ],
            "type": "Home & Garden"
          },
          {
            "id": "iZRUaGzPX57gXphggGRD",
            "categories": [
              "Science Exhibitions",
              "STEM Workshops",
              "Space & Astronomy",
              "Technology Talks"
            ],
            "type": "Science & Technology"
          },
          {
            "id": "iZrCPlqoUYItaFlWI16F",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "id2oQtFMuSFIdO8ZSv6J",
            "categories": [
              "Travel Expos",
              "Adventure Tours",
              "Backpacking Trips",
              "Cultural Experiences"
            ],
            "type": "Travel & Adventure"
          },
          {
            "id": "idB6r7iSxZ7vqetnf5GH",
            "categories": [
              "Family - Friendly Events",
              "Children's Workshops",
              "Kid - Friendly Activities",
              "Amusement Parks"
            ],
            "type": "Family & Kids"
          },
          {
            "id": "idMhPYUsq3y4JJyf8Bmx",
            "categories": [
              "Educational Workshops",
              "Lectures & Talks",
              "Online Courses",
              "Tutoring Services"
            ],
            "type": "Education & Learning"
          },
          {
            "id": "idRiharzt6bfnQ2AgoNB",
            "categories": [
              "Theater Productions",
              "Magic Shows",
              "Stand - Up Comedy",
              "Movie Screenings"
            ],
            "type": "Entertainment & Shows"
          },
          {
            "id": "ifPwwnQTaUfPvYkOlwYA",
            "categories": [
              "Indian Cuisine",
              "Italian Cuisine",
              "American Fare",
              "Asian Fusion",
              "Mediterranean",
              "Mexican & Tex - Mex",
              "Sushi & Japanese",
              "Chinese Cuisine",
              "French Dining",
              "Vegetarian & Vegan",
              "Seafood Specialties",
              "BBQ & Grill",
              "Steakhouse",
              "Fast Food & Burgers",
              "Cafes & Bakeries",
              "Food Trucks",
              "Fine Dining",
              "Farm - to - Table",
              "Ethnic Eateries"
            ],
            "type": "Food styles"
          },
          {
            "id": "ihRhNM5FDOB5uEu7EAaT",
            "categories": [
              "Home Improvement Workshops",
              "Gardening Classes",
              "Home Shows",
              "DIY Events"
            ],
            "type": "Home & Garden"
          },
          {
            "id": "iizqMx5hSPW7Erj9Ntu3",
            "categories": [
              "Networking Events",
              "Workshops & Seminars",
              "Conferences",
              "Job Fairs"
            ],
            "type": "Networking & Business"
          },
          {
            "id": "ijo9x3hgG22TLNI4nnMo",
            "categories": [
              "Networking Events",
              "Workshops & Seminars",
              "Conferences",
              "Job Fairs"
            ],
            "type": "Networking & Business"
          },
          {
            "id": "ikNltg9ZPwrmHsZDZudl",
            "categories": [
              "Home Improvement Workshops",
              "Gardening Classes",
              "Home Shows",
              "DIY Events"
            ],
            "type": "Home & Garden"
          },
          {
            "id": "ioOmG63byvvQYr6y02FT",
            "categories": [
              "Local Community Events",
              "Environmental Causes",
              "Social Activism",
              "Fundraising for Causes"
            ],
            "type": "Community & Causes"
          },
          {
            "id": "ipTQOEmIy4xisWJfLWSm",
            "categories": [
              "Fashion Shows",
              "Beauty Workshops",
              "Pop - Up Boutiques",
              "Makeup Classes"
            ],
            "type": "Fashion & Beauty"
          },
          {
            "id": "ipaRwhRv4aty9izgcsUT",
            "categories": [
              "Home Improvement Workshops",
              "Gardening Classes",
              "Home Shows",
              "DIY Events"
            ],
            "type": "Home & Garden"
          },
          {
            "id": "iqi2UlCqHyRvgrqSbnVu",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "it16U8foRCOUc8Jvr29h",
            "categories": [
              "Home Improvement Workshops",
              "Gardening Classes",
              "Home Shows",
              "DIY Events"
            ],
            "type": "Home & Garden"
          },
          {
            "id": "it4u10dpURfGge97PblA",
            "categories": [
              "Home Improvement Workshops",
              "Gardening Classes",
              "Home Shows",
              "DIY Events"
            ],
            "type": "Home & Garden"
          },
          {
            "id": "iuxJE5SdQXUg4oG5tyI6",
            "categories": [
              "Hobbyist Gatherings",
              "Hobby Workshops",
              "Special Interest Groups",
              "Craft Fairs"
            ],
            "type": "Hobbies & Interests"
          },
          {
            "id": "izGFKrkwtytzLi6k5H5H",
            "categories": [
              "Local Community Events",
              "Environmental Causes",
              "Social Activism",
              "Fundraising for Causes"
            ],
            "type": "Community & Causes"
          },
          {
            "id": "izeZeDfcVtSG4fYwDbyY",
            "categories": [
              "Religious Gatherings",
              "Spiritual Retreats",
              "Meditation Groups",
              "Interfaith Dialogues"
            ],
            "type": "Religion & Spirituality"
          },
          {
            "id": "j1v8wRfjc5bSWjX2Izur",
            "categories": [
              "Home Improvement Workshops",
              "Gardening Classes",
              "Home Shows",
              "DIY Events"
            ],
            "type": "Home & Garden"
          },
          {
            "id": "j3N7oY7H7zjDCIJOOrb4",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "j53icOKgXJF5BjbX7old",
            "categories": [
              "Tech Conferences",
              "Startup Events",
              "Coding Workshops",
              "Tech Expos"
            ],
            "type": "Tech & Innovation"
          },
          {
            "id": "j5zNRkd03YMNraQxVIK3",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "j6pXADLEAANLEg2P42ib",
            "categories": [
              "Theater Productions",
              "Magic Shows",
              "Stand - Up Comedy",
              "Movie Screenings"
            ],
            "type": "Entertainment & Shows"
          },
          {
            "id": "j6rt7vXd9wGhn4F0d8gD",
            "categories": [
              "Food & Dining",
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Sports & Fitness"
          },
          {
            "id": "j7Ihol9mbiTguoZXFrw7",
            "categories": [
              "Fashion Shows",
              "Beauty Workshops",
              "Pop - Up Boutiques",
              "Makeup Classes"
            ],
            "type": "Fashion & Beauty"
          },
          {
            "id": "j9koq2qa4D4k9YTu0Eh7",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "jE3I1SPyjA66UyWX2nwS",
            "categories": [
              "Fashion Shows",
              "Beauty Workshops",
              "Pop - Up Boutiques",
              "Makeup Classes"
            ],
            "type": "Fashion & Beauty"
          },
          {
            "id": "jFU7BjvdHbMNfWSqJ7am",
            "categories": [
              "Sporting Events",
              "Fitness Classes",
              "Yoga & Meditation",
              "Outdoor Activities"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "jI5FvOzahkNayuFH0xGg",
            "categories": [
              "Pet Adoption Events",
              "Animal Welfare Fundraisers",
              "Pet - Friendly Activities",
              "Zoo Visits"
            ],
            "type": "Pets & Animals"
          },
          {
            "id": "jJBCbtKWyR3vmCT3z1Iv",
            "categories": [
              "Family - Friendly Events",
              "Children's Workshops",
              "Kid - Friendly Activities",
              "Amusement Parks"
            ],
            "type": "Family & Kids"
          },
          {
            "id": "jKVGfeqbO4Z4nfR2pKV3",
            "categories": [
              "Indian Cuisine",
              "Italian Cuisine",
              "American Fare",
              "Asian Fusion",
              "Mediterranean",
              "Mexican & Tex - Mex",
              "Sushi & Japanese",
              "Chinese Cuisine",
              "French Dining",
              "Vegetarian & Vegan",
              "Seafood Specialties",
              "BBQ & Grill",
              "Steakhouse",
              "Fast Food & Burgers",
              "Cafes & Bakeries",
              "Food Trucks",
              "Fine Dining",
              "Farm - to - Table",
              "Ethnic Eateries"
            ],
            "type": "Food styles"
          },
          {
            "id": "jPLTtt1wOc18oAXbKvcN",
            "categories": [
              "Hobbyist Gatherings",
              "Hobby Workshops",
              "Special Interest Groups",
              "Craft Fairs"
            ],
            "type": "Hobbies & Interests"
          },
          {
            "id": "jRkEhfybeJVfM0qxUM0z",
            "categories": [
              "Indian Cuisine",
              "Italian Cuisine",
              "American Fare",
              "Asian Fusion",
              "Mediterranean",
              "Mexican & Tex - Mex",
              "Sushi & Japanese",
              "Chinese Cuisine",
              "French Dining",
              "Vegetarian & Vegan",
              "Seafood Specialties",
              "BBQ & Grill",
              "Steakhouse",
              "Fast Food & Burgers",
              "Cafes & Bakeries",
              "Food Trucks",
              "Fine Dining",
              "Farm - to - Table",
              "Ethnic Eateries"
            ],
            "type": "Food styles"
          },
          {
            "id": "jVsqkSurqm6rgNU5e7BJ",
            "categories": [
              "Travel Expos",
              "Adventure Tours",
              "Backpacking Trips",
              "Cultural Experiences"
            ],
            "type": "Travel & Adventure"
          },
          {
            "id": "jYJcdu7n7ZprcxTtZwPw",
            "categories": [
              "Educational Workshops",
              "Lectures & Talks",
              "Online Courses",
              "Tutoring Services"
            ],
            "type": "Education & Learning"
          },
          {
            "id": "jYL2icqtSDwYZUFpxbRR",
            "categories": [
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Food & Dining"
          },
          {
            "id": "jcLA1mpmmMUfMMAf2YBs",
            "categories": [
              "Networking Events",
              "Workshops & Seminars",
              "Conferences",
              "Job Fairs"
            ],
            "type": "Networking & Business"
          },
          {
            "id": "jcq3QgSnS2lFcX9MpNHQ",
            "categories": [
              "Wellness Retreats",
              "Health Workshops",
              "Mindfulness Events",
              "Medical Seminars"
            ],
            "type": "Health & Wellness"
          },
          {
            "id": "jdI2zgBZ8d1yZHNgxxvY",
            "categories": [
              "Wellness Retreats",
              "Health Workshops",
              "Mindfulness Events",
              "Medical Seminars"
            ],
            "type": "Health & Wellness"
          },
          {
            "id": "jdy8gbniesMAH139PaSB",
            "categories": [
              "Local Community Events",
              "Environmental Causes",
              "Social Activism",
              "Fundraising for Causes"
            ],
            "type": "Community & Causes"
          },
          {
            "id": "jf2eNgdfJXfIRL6JD3mT",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "jfX0w8LngV2lDmOHqaTi",
            "categories": [
              "Food & Dining",
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Sports & Fitness"
          },
          {
            "id": "jh8PgbCNW7zzpYr9A49Y",
            "categories": [
              "Charity Galas",
              "Fundraising Events",
              "Volunteer Opportunities",
              "Community Outreach"
            ],
            "type": "Charity & Fundraising"
          },
          {
            "id": "jiGtCjpGDSqujPGCUNQo",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "jjRVRbdyLPJdhmx2ZhCw",
            "categories": [
              "Fashion Shows",
              "Beauty Workshops",
              "Pop - Up Boutiques",
              "Makeup Classes"
            ],
            "type": "Fashion & Beauty"
          },
          {
            "id": "jlvwSOX2A2zc4afVcepO",
            "categories": [
              "Religious Gatherings",
              "Spiritual Retreats",
              "Meditation Groups",
              "Interfaith Dialogues"
            ],
            "type": "Religion & Spirituality"
          },
          {
            "id": "jml5u4o3iXgQUvx5z3ek",
            "categories": [
              "Wellness Retreats",
              "Health Workshops",
              "Mindfulness Events",
              "Medical Seminars"
            ],
            "type": "Health & Wellness"
          },
          {
            "id": "jmo1pHPKKgYAJZRqgFpC",
            "categories": [
              "Tech Conferences",
              "Startup Events",
              "Coding Workshops",
              "Tech Expos"
            ],
            "type": "Tech & Innovation"
          },
          {
            "id": "joFXS4fObrg7VgSlNXpG",
            "categories": [
              "Fashion Shows",
              "Beauty Workshops",
              "Pop - Up Boutiques",
              "Makeup Classes"
            ],
            "type": "Fashion & Beauty"
          },
          {
            "id": "jqTOFfTYYugoT8e5xbE1",
            "categories": [
              "Fashion Shows",
              "Beauty Workshops",
              "Pop - Up Boutiques",
              "Makeup Classes"
            ],
            "type": "Fashion & Beauty"
          },
          {
            "id": "jr42dCbxNqT4HIjEeyG9",
            "categories": [
              "Tech Conferences",
              "Startup Events",
              "Coding Workshops",
              "Tech Expos"
            ],
            "type": "Tech & Innovation"
          },
          {
            "id": "js9zsAvwPD9YnNqM04cl",
            "categories": [
              "Tech Conferences",
              "Startup Events",
              "Coding Workshops",
              "Tech Expos"
            ],
            "type": "Tech & Innovation"
          },
          {
            "id": "jvF2czHMApPYMP8yyqu5",
            "categories": [
              "Science Exhibitions",
              "STEM Workshops",
              "Space & Astronomy",
              "Technology Talks"
            ],
            "type": "Science & Technology"
          },
          {
            "id": "jx7a5GxEHZnkscXL5Ovx",
            "categories": [
              "Home Improvement Workshops",
              "Gardening Classes",
              "Home Shows",
              "DIY Events"
            ],
            "type": "Home & Garden"
          },
          {
            "id": "jzWwMxwn2VLWcuqtX4F4",
            "categories": [
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Food & Dining"
          },
          {
            "id": "k2KCHyScXx1waZNePSmA",
            "categories": [
              "Travel Expos",
              "Adventure Tours",
              "Backpacking Trips",
              "Cultural Experiences"
            ],
            "type": "Travel & Adventure"
          },
          {
            "id": "k3VF0gwfPkDybqfyLs2J",
            "categories": [
              "Religious Gatherings",
              "Spiritual Retreats",
              "Meditation Groups",
              "Interfaith Dialogues"
            ],
            "type": "Religion & Spirituality"
          },
          {
            "id": "k4B2VapsrVoTMN3MsvTP",
            "categories": [
              "Home Improvement Workshops",
              "Gardening Classes",
              "Home Shows",
              "DIY Events"
            ],
            "type": "Home & Garden"
          },
          {
            "id": "k5YgKdNt2TUNRwRELHPk",
            "categories": [
              "Home Improvement Workshops",
              "Gardening Classes",
              "Home Shows",
              "DIY Events"
            ],
            "type": "Home & Garden"
          },
          {
            "id": "k5mgdFQfRIxX8EXUTBwg",
            "categories": [
              "Theater Productions",
              "Magic Shows",
              "Stand - Up Comedy",
              "Movie Screenings"
            ],
            "type": "Entertainment & Shows"
          },
          {
            "id": "k8oxPFsGYtqVAMx7ITMj",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "kBEBxQvLlm57AYKcqa99",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "kBEQPp6BZu6cUkwUvoAg",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "kBwJCUSghBRIwKOnYypa",
            "categories": [
              "Family - Friendly Events",
              "Children's Workshops",
              "Kid - Friendly Activities",
              "Amusement Parks"
            ],
            "type": "Family & Kids"
          },
          {
            "id": "kCh1QgCoSLqC9jAK1StH",
            "categories": [
              "Sporting Events",
              "Fitness Classes",
              "Yoga & Meditation",
              "Outdoor Activities"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "kH7nJCcFzAePLjEnM2k6",
            "categories": [
              "Fashion Shows",
              "Beauty Workshops",
              "Pop - Up Boutiques",
              "Makeup Classes"
            ],
            "type": "Fashion & Beauty"
          },
          {
            "id": "kKU934mMymar7YZHEGnU",
            "categories": [
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Food & Dining"
          },
          {
            "id": "kKiUQKashGkKTb7z1yRI",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "kLIhghYFA5X6TFtOT5Fe",
            "categories": [
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Food & Dining"
          },
          {
            "id": "kLMLl30ch4PLVlXaSY5h",
            "categories": [
              "Indian Cuisine",
              "Italian Cuisine",
              "American Fare",
              "Asian Fusion",
              "Mediterranean",
              "Mexican & Tex - Mex",
              "Sushi & Japanese",
              "Chinese Cuisine",
              "French Dining",
              "Vegetarian & Vegan",
              "Seafood Specialties",
              "BBQ & Grill",
              "Steakhouse",
              "Fast Food & Burgers",
              "Cafes & Bakeries",
              "Food Trucks",
              "Fine Dining",
              "Farm - to - Table",
              "Ethnic Eateries"
            ],
            "type": "Food styles"
          },
          {
            "id": "kMhU89CEPQEw76VJKUXh",
            "categories": [
              "Indian Cuisine",
              "Italian Cuisine",
              "American Fare",
              "Asian Fusion",
              "Mediterranean",
              "Mexican & Tex - Mex",
              "Sushi & Japanese",
              "Chinese Cuisine",
              "French Dining",
              "Vegetarian & Vegan",
              "Seafood Specialties",
              "BBQ & Grill",
              "Steakhouse",
              "Fast Food & Burgers",
              "Cafes & Bakeries",
              "Food Trucks",
              "Fine Dining",
              "Farm - to - Table",
              "Ethnic Eateries"
            ],
            "type": "Food styles"
          },
          {
            "id": "kNGYWZUHQKEjCAkSwUOS",
            "categories": [
              "Charity Galas",
              "Fundraising Events",
              "Volunteer Opportunities",
              "Community Outreach"
            ],
            "type": "Charity & Fundraising"
          },
          {
            "id": "kNKCDzzReVlPPs9mFZ5j",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "kNu0sqgTS0QnBJ0j2zcN",
            "categories": [
              "Science Exhibitions",
              "STEM Workshops",
              "Space & Astronomy",
              "Technology Talks"
            ],
            "type": "Science & Technology"
          },
          {
            "id": "kOcSIp9Gx6bz22P7N9Cv",
            "categories": [
              "Science Exhibitions",
              "STEM Workshops",
              "Space & Astronomy",
              "Technology Talks"
            ],
            "type": "Science & Technology"
          },
          {
            "id": "kOtVOiZk8EjWySr8bYDB",
            "categories": [
              "Pet Adoption Events",
              "Animal Welfare Fundraisers",
              "Pet - Friendly Activities",
              "Zoo Visits"
            ],
            "type": "Pets & Animals"
          },
          {
            "id": "kTxEvX19opyRQTBwG2uN",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "kW0WSnsV73wY05h8Glaw",
            "categories": [
              "Pet Adoption Events",
              "Animal Welfare Fundraisers",
              "Pet - Friendly Activities",
              "Zoo Visits"
            ],
            "type": "Pets & Animals"
          },
          {
            "id": "kb07hZpAt6z2bJHJAY99",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "kctlxFKp5VWLJvQ5opj4",
            "categories": [
              "Local Community Events",
              "Environmental Causes",
              "Social Activism",
              "Fundraising for Causes"
            ],
            "type": "Community & Causes"
          },
          {
            "id": "kdEM4DpHyv6RHEUMUsqo",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "kez4rkk1Urv0kVRCXsjZ",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "kfe6sqcltQynxasQ6EDZ",
            "categories": [
              "Charity Galas",
              "Fundraising Events",
              "Volunteer Opportunities",
              "Community Outreach"
            ],
            "type": "Charity & Fundraising"
          },
          {
            "id": "khSK1Q9tZBGojNYPqEjv",
            "categories": [
              "Religious Gatherings",
              "Spiritual Retreats",
              "Meditation Groups",
              "Interfaith Dialogues"
            ],
            "type": "Religion & Spirituality"
          },
          {
            "id": "knbsytRdEjU1pLgiBxt7",
            "categories": [
              "Networking Events",
              "Workshops & Seminars",
              "Conferences",
              "Job Fairs"
            ],
            "type": "Networking & Business"
          },
          {
            "id": "knktDX7tQln1ErGrRnzh",
            "categories": [
              "Indian Cuisine",
              "Italian Cuisine",
              "American Fare",
              "Asian Fusion",
              "Mediterranean",
              "Mexican & Tex - Mex",
              "Sushi & Japanese",
              "Chinese Cuisine",
              "French Dining",
              "Vegetarian & Vegan",
              "Seafood Specialties",
              "BBQ & Grill",
              "Steakhouse",
              "Fast Food & Burgers",
              "Cafes & Bakeries",
              "Food Trucks",
              "Fine Dining",
              "Farm - to - Table",
              "Ethnic Eateries"
            ],
            "type": "Food styles"
          },
          {
            "id": "korGdk6zpJy3e8c9lXQA",
            "categories": [
              "Sporting Events",
              "Fitness Classes",
              "Yoga & Meditation",
              "Outdoor Activities"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "kpvXTP3OUQ1NJPGiClEt",
            "categories": [
              "Sporting Events",
              "Fitness Classes",
              "Yoga & Meditation",
              "Outdoor Activities"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "kqah3mGa1NLrU1BoDNX2",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "kuBgKX5nc27jZkebtgkx",
            "categories": [
              "Wellness Retreats",
              "Health Workshops",
              "Mindfulness Events",
              "Medical Seminars"
            ],
            "type": "Health & Wellness"
          },
          {
            "id": "kudFfBTXMUnMrCGF8CpL",
            "categories": [
              "Fashion Shows",
              "Beauty Workshops",
              "Pop - Up Boutiques",
              "Makeup Classes"
            ],
            "type": "Fashion & Beauty"
          },
          {
            "id": "kvmEjIRP18ORCcWyNbmV",
            "categories": [
              "Fashion Shows",
              "Beauty Workshops",
              "Pop - Up Boutiques",
              "Makeup Classes"
            ],
            "type": "Fashion & Beauty"
          },
          {
            "id": "kwv6X9FwlKd5r7dM8mF5",
            "categories": [
              "Fashion Shows",
              "Beauty Workshops",
              "Pop - Up Boutiques",
              "Makeup Classes"
            ],
            "type": "Fashion & Beauty"
          },
          {
            "id": "kyo5hzNxscBZ9YsotKye",
            "categories": [
              "Hobbyist Gatherings",
              "Hobby Workshops",
              "Special Interest Groups",
              "Craft Fairs"
            ],
            "type": "Hobbies & Interests"
          },
          {
            "id": "l252YEvDthcleqYKcFQl",
            "categories": [
              "Wellness Retreats",
              "Health Workshops",
              "Mindfulness Events",
              "Medical Seminars"
            ],
            "type": "Health & Wellness"
          },
          {
            "id": "l5Efhjhy253xwcNNIKRI",
            "categories": [
              "Wellness Retreats",
              "Health Workshops",
              "Mindfulness Events",
              "Medical Seminars"
            ],
            "type": "Health & Wellness"
          },
          {
            "id": "l5qkMhAp8Z2TV2NmCAgn",
            "categories": [
              "Fashion Shows",
              "Beauty Workshops",
              "Pop - Up Boutiques",
              "Makeup Classes"
            ],
            "type": "Fashion & Beauty"
          },
          {
            "id": "l6AygF0XPoj3Db9mNYyl",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "lBMeGxjvna8oTtcOJ0pc",
            "categories": [
              "Theater Productions",
              "Magic Shows",
              "Stand - Up Comedy",
              "Movie Screenings"
            ],
            "type": "Entertainment & Shows"
          },
          {
            "id": "lBxdbOGNWb6OMEv5xKgB",
            "categories": [
              "Wellness Retreats",
              "Health Workshops",
              "Mindfulness Events",
              "Medical Seminars"
            ],
            "type": "Health & Wellness"
          },
          {
            "id": "lCJz6eYTdgD0LW4XOKoI",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "lERDHvQFu1eQ8aRcA6w1",
            "categories": [
              "Hobbyist Gatherings",
              "Hobby Workshops",
              "Special Interest Groups",
              "Craft Fairs"
            ],
            "type": "Hobbies & Interests"
          },
          {
            "id": "lF9T4xGP1J9tcDG1KKPt",
            "categories": [
              "Home Improvement Workshops",
              "Gardening Classes",
              "Home Shows",
              "DIY Events"
            ],
            "type": "Home & Garden"
          },
          {
            "id": "lFhWMjgcoZMGDmt0BwQY",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "lIoRYWP4afWXKN9IgADC",
            "categories": [
              "Home Improvement Workshops",
              "Gardening Classes",
              "Home Shows",
              "DIY Events"
            ],
            "type": "Home & Garden"
          },
          {
            "id": "lIqMZD8FQtUg8aJzazvD",
            "categories": [
              "Theater Productions",
              "Magic Shows",
              "Stand - Up Comedy",
              "Movie Screenings"
            ],
            "type": "Entertainment & Shows"
          },
          {
            "id": "lJaP3fks87Pa86WIlTRr",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "lJvffMWtJ7FtoxzZ7wfb",
            "categories": [
              "Local Community Events",
              "Environmental Causes",
              "Social Activism",
              "Fundraising for Causes"
            ],
            "type": "Community & Causes"
          },
          {
            "id": "lKBbPjJsVsPTrrmdK752",
            "categories": [
              "Travel Expos",
              "Adventure Tours",
              "Backpacking Trips",
              "Cultural Experiences"
            ],
            "type": "Travel & Adventure"
          },
          {
            "id": "lKFzacdfp07CGsX0TWYG",
            "categories": [
              "Fashion Shows",
              "Beauty Workshops",
              "Pop - Up Boutiques",
              "Makeup Classes"
            ],
            "type": "Fashion & Beauty"
          },
          {
            "id": "lMO8wLeepMoLkMGtLAOV",
            "categories": [
              "Theater Productions",
              "Magic Shows",
              "Stand - Up Comedy",
              "Movie Screenings"
            ],
            "type": "Entertainment & Shows"
          },
          {
            "id": "lNdqqVcUbrSEBuZ0Uoj6",
            "categories": [
              "Travel Expos",
              "Adventure Tours",
              "Backpacking Trips",
              "Cultural Experiences"
            ],
            "type": "Travel & Adventure"
          },
          {
            "id": "lOehAbFNQGoSnE0TjI45",
            "categories": [
              "Food & Dining",
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Sports & Fitness"
          },
          {
            "id": "lPqZXZRb7XHti0lfo9E0",
            "categories": [
              "Pet Adoption Events",
              "Animal Welfare Fundraisers",
              "Pet - Friendly Activities",
              "Zoo Visits"
            ],
            "type": "Pets & Animals"
          },
          {
            "id": "lVswxSt0h6u27rcyHXaV",
            "categories": [
              "Networking Events",
              "Workshops & Seminars",
              "Conferences",
              "Job Fairs"
            ],
            "type": "Networking & Business"
          },
          {
            "id": "lWisWGGBxns82aHQhIBr",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "lXLff8Wu6orI43A38G7c",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "lZAfIPRszeWyO7zfRGex",
            "categories": [
              "Educational Workshops",
              "Lectures & Talks",
              "Online Courses",
              "Tutoring Services"
            ],
            "type": "Education & Learning"
          },
          {
            "id": "lb1IS2e8kOtH0CdbzLtZ",
            "categories": [
              "Religious Gatherings",
              "Spiritual Retreats",
              "Meditation Groups",
              "Interfaith Dialogues"
            ],
            "type": "Religion & Spirituality"
          },
          {
            "id": "lddwTkQa1S4nS5D3FxYq",
            "categories": [
              "Pet Adoption Events",
              "Animal Welfare Fundraisers",
              "Pet - Friendly Activities",
              "Zoo Visits"
            ],
            "type": "Pets & Animals"
          },
          {
            "id": "le8U3fT4q31bkmgGJa5l",
            "categories": [
              "Family - Friendly Events",
              "Children's Workshops",
              "Kid - Friendly Activities",
              "Amusement Parks"
            ],
            "type": "Family & Kids"
          },
          {
            "id": "leZalEL8yTIZR5LFMPyq",
            "categories": [
              "Family - Friendly Events",
              "Children's Workshops",
              "Kid - Friendly Activities",
              "Amusement Parks"
            ],
            "type": "Family & Kids"
          },
          {
            "id": "lls4PzmAzwYYSu4lvgjY",
            "categories": [
              "Educational Workshops",
              "Lectures & Talks",
              "Online Courses",
              "Tutoring Services"
            ],
            "type": "Education & Learning"
          },
          {
            "id": "loBgZz5w5KQPxHDjjtn3",
            "categories": [
              "Family - Friendly Events",
              "Children's Workshops",
              "Kid - Friendly Activities",
              "Amusement Parks"
            ],
            "type": "Family & Kids"
          },
          {
            "id": "lsFo3P2ZJW7l7N3LC9Qk",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "lvD6eLaLK0jxKYVMnfLX",
            "categories": [
              "Tech Conferences",
              "Startup Events",
              "Coding Workshops",
              "Tech Expos"
            ],
            "type": "Tech & Innovation"
          },
          {
            "id": "lvdWU6gxflBku6V9JBw6",
            "categories": [
              "Religious Gatherings",
              "Spiritual Retreats",
              "Meditation Groups",
              "Interfaith Dialogues"
            ],
            "type": "Religion & Spirituality"
          },
          {
            "id": "lxFfsYhD7V3TInPVSLfM",
            "categories": [
              "Educational Workshops",
              "Lectures & Talks",
              "Online Courses",
              "Tutoring Services"
            ],
            "type": "Education & Learning"
          },
          {
            "id": "lyBvz2wNfCbW1y0cKuzL",
            "categories": [
              "Fashion Shows",
              "Beauty Workshops",
              "Pop - Up Boutiques",
              "Makeup Classes"
            ],
            "type": "Fashion & Beauty"
          },
          {
            "id": "lyKNm4NLjlLEjfbodvp8",
            "categories": [
              "Indian Cuisine",
              "Italian Cuisine",
              "American Fare",
              "Asian Fusion",
              "Mediterranean",
              "Mexican & Tex - Mex",
              "Sushi & Japanese",
              "Chinese Cuisine",
              "French Dining",
              "Vegetarian & Vegan",
              "Seafood Specialties",
              "BBQ & Grill",
              "Steakhouse",
              "Fast Food & Burgers",
              "Cafes & Bakeries",
              "Food Trucks",
              "Fine Dining",
              "Farm - to - Table",
              "Ethnic Eateries"
            ],
            "type": "Food styles"
          },
          {
            "id": "m86AISaeq5AaTd9goGn5",
            "categories": [
              "Charity Galas",
              "Fundraising Events",
              "Volunteer Opportunities",
              "Community Outreach"
            ],
            "type": "Charity & Fundraising"
          },
          {
            "id": "m8BRzCK7gpSD4kwsNT02",
            "categories": [
              "Food & Dining",
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Sports & Fitness"
          },
          {
            "id": "mApFpD4M6DGc6xMye3GL",
            "categories": [
              "Tech Conferences",
              "Startup Events",
              "Coding Workshops",
              "Tech Expos"
            ],
            "type": "Tech & Innovation"
          },
          {
            "id": "mB6us1yjJipV9tp0Mel4",
            "categories": [
              "Food & Dining",
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Sports & Fitness"
          },
          {
            "id": "mCHlBM0kZHq3uHk7VjP2",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "mGuQHcgkmoYApTFp39PK",
            "categories": [
              "Science Exhibitions",
              "STEM Workshops",
              "Space & Astronomy",
              "Technology Talks"
            ],
            "type": "Science & Technology"
          },
          {
            "id": "mH15BYXdAh9FJ9K0WVMJ",
            "categories": [
              "Travel Expos",
              "Adventure Tours",
              "Backpacking Trips",
              "Cultural Experiences"
            ],
            "type": "Travel & Adventure"
          },
          {
            "id": "mHl2h7VC19Qf7sSfN0Ki",
            "categories": [
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Food & Dining"
          },
          {
            "id": "mLNDPEXqtGEZbrjS9ofB",
            "categories": [
              "Science Exhibitions",
              "STEM Workshops",
              "Space & Astronomy",
              "Technology Talks"
            ],
            "type": "Science & Technology"
          },
          {
            "id": "mLkR9IjWikIANogJUnd7",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "mLzWNeRXSICakRHBdc0n",
            "categories": [
              "Wellness Retreats",
              "Health Workshops",
              "Mindfulness Events",
              "Medical Seminars"
            ],
            "type": "Health & Wellness"
          },
          {
            "id": "mMCx0HH0QiqDLZCHrBLX",
            "categories": [
              "Tech Conferences",
              "Startup Events",
              "Coding Workshops",
              "Tech Expos"
            ],
            "type": "Tech & Innovation"
          },
          {
            "id": "mPbnN5pOubG0ulguPkMX",
            "categories": [
              "Home Improvement Workshops",
              "Gardening Classes",
              "Home Shows",
              "DIY Events"
            ],
            "type": "Home & Garden"
          },
          {
            "id": "mVXoh41KDvpsKUrkqTmm",
            "categories": [
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Food & Dining"
          },
          {
            "id": "mWTqNma0O6h0NcxUM29a",
            "categories": [
              "Theater Productions",
              "Magic Shows",
              "Stand - Up Comedy",
              "Movie Screenings"
            ],
            "type": "Entertainment & Shows"
          },
          {
            "id": "mZNoOX6yj1uZY6VZp0Ro",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "mapl92qYAjPZrSWlXsjk",
            "categories": [
              "Theater Productions",
              "Magic Shows",
              "Stand - Up Comedy",
              "Movie Screenings"
            ],
            "type": "Entertainment & Shows"
          },
          {
            "id": "mbYumKB3JxcjDiBL8Iit",
            "categories": [
              "Travel Expos",
              "Adventure Tours",
              "Backpacking Trips",
              "Cultural Experiences"
            ],
            "type": "Travel & Adventure"
          },
          {
            "id": "mctOLakh1Qdogi63LR0N",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "mcyYpJSwAubN06fqUGAv",
            "categories": [
              "Wellness Retreats",
              "Health Workshops",
              "Mindfulness Events",
              "Medical Seminars"
            ],
            "type": "Health & Wellness"
          },
          {
            "id": "mfu1SouekpU59d9F1277",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "ml5Q6cI2hKPXHiLYBZxo",
            "categories": [
              "Wellness Retreats",
              "Health Workshops",
              "Mindfulness Events",
              "Medical Seminars"
            ],
            "type": "Health & Wellness"
          },
          {
            "id": "mlO8vIeiUmBSYnO50011",
            "categories": [
              "Tech Conferences",
              "Startup Events",
              "Coding Workshops",
              "Tech Expos"
            ],
            "type": "Tech & Innovation"
          },
          {
            "id": "moxyro4rpTGr4OldCQWC",
            "categories": [
              "Travel Expos",
              "Adventure Tours",
              "Backpacking Trips",
              "Cultural Experiences"
            ],
            "type": "Travel & Adventure"
          },
          {
            "id": "mp81YgHb1j7NW9jDYYBn",
            "categories": [
              "Tech Conferences",
              "Startup Events",
              "Coding Workshops",
              "Tech Expos"
            ],
            "type": "Tech & Innovation"
          },
          {
            "id": "mpnItcwdaeav7mgKjDEl",
            "categories": [
              "Fashion Shows",
              "Beauty Workshops",
              "Pop - Up Boutiques",
              "Makeup Classes"
            ],
            "type": "Fashion & Beauty"
          },
          {
            "id": "mqw709my98B9jD2ukhUo",
            "categories": [
              "Religious Gatherings",
              "Spiritual Retreats",
              "Meditation Groups",
              "Interfaith Dialogues"
            ],
            "type": "Religion & Spirituality"
          },
          {
            "id": "mrBjITvTzIYG6HAwCGsd",
            "categories": [
              "Religious Gatherings",
              "Spiritual Retreats",
              "Meditation Groups",
              "Interfaith Dialogues"
            ],
            "type": "Religion & Spirituality"
          },
          {
            "id": "mrI2xzLUoXRGWDDHXhsy",
            "categories": [
              "Food & Dining",
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Sports & Fitness"
          },
          {
            "id": "msGVq4ZBlMctoYeBj2tA",
            "categories": [
              "Hobbyist Gatherings",
              "Hobby Workshops",
              "Special Interest Groups",
              "Craft Fairs"
            ],
            "type": "Hobbies & Interests"
          },
          {
            "id": "mt43CB97KFPFvMZRKLy9",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "mxstSSlRgfvCjBEmYPU4",
            "categories": [
              "Networking Events",
              "Workshops & Seminars",
              "Conferences",
              "Job Fairs"
            ],
            "type": "Networking & Business"
          },
          {
            "id": "myx5Tk3nqtuxVAmDn3jv",
            "categories": [
              "Indian Cuisine",
              "Italian Cuisine",
              "American Fare",
              "Asian Fusion",
              "Mediterranean",
              "Mexican & Tex - Mex",
              "Sushi & Japanese",
              "Chinese Cuisine",
              "French Dining",
              "Vegetarian & Vegan",
              "Seafood Specialties",
              "BBQ & Grill",
              "Steakhouse",
              "Fast Food & Burgers",
              "Cafes & Bakeries",
              "Food Trucks",
              "Fine Dining",
              "Farm - to - Table",
              "Ethnic Eateries"
            ],
            "type": "Food styles"
          },
          {
            "id": "n09d41oy7gzISiDkj3zc",
            "categories": [
              "Travel Expos",
              "Adventure Tours",
              "Backpacking Trips",
              "Cultural Experiences"
            ],
            "type": "Travel & Adventure"
          },
          {
            "id": "n0wpxhEkYxuAiWOTPNsp",
            "categories": [
              "Science Exhibitions",
              "STEM Workshops",
              "Space & Astronomy",
              "Technology Talks"
            ],
            "type": "Science & Technology"
          },
          {
            "id": "n127wY3A5utygaS3druk",
            "categories": [
              "Food & Dining",
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Sports & Fitness"
          },
          {
            "id": "n1Mvk89MDqB2KpcfbuNa",
            "categories": [
              "Hobbyist Gatherings",
              "Hobby Workshops",
              "Special Interest Groups",
              "Craft Fairs"
            ],
            "type": "Hobbies & Interests"
          },
          {
            "id": "n28AD3okp1JfY12Va8jO",
            "categories": [
              "Family - Friendly Events",
              "Children's Workshops",
              "Kid - Friendly Activities",
              "Amusement Parks"
            ],
            "type": "Family & Kids"
          },
          {
            "id": "n3cauZ16CrsZUwfNJWIM",
            "categories": [
              "Religious Gatherings",
              "Spiritual Retreats",
              "Meditation Groups",
              "Interfaith Dialogues"
            ],
            "type": "Religion & Spirituality"
          },
          {
            "id": "n67SqCdZwtXScWqbzI7N",
            "categories": [
              "Charity Galas",
              "Fundraising Events",
              "Volunteer Opportunities",
              "Community Outreach"
            ],
            "type": "Charity & Fundraising"
          },
          {
            "id": "nA750fbmVlpLSdcL0TSa",
            "categories": [
              "Food & Dining",
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Sports & Fitness"
          },
          {
            "id": "nAaWvO8odj4ktQQc7rbu",
            "categories": [
              "Food & Dining",
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Sports & Fitness"
          },
          {
            "id": "nCQYneb328KRKoJasFiK",
            "categories": [
              "Sporting Events",
              "Fitness Classes",
              "Yoga & Meditation",
              "Outdoor Activities"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "nEFogZWp5r3X61HHVPnv",
            "categories": [
              "Fashion Shows",
              "Beauty Workshops",
              "Pop - Up Boutiques",
              "Makeup Classes"
            ],
            "type": "Fashion & Beauty"
          },
          {
            "id": "nEHzFD56uXrunbeADGE0",
            "categories": [
              "Religious Gatherings",
              "Spiritual Retreats",
              "Meditation Groups",
              "Interfaith Dialogues"
            ],
            "type": "Religion & Spirituality"
          },
          {
            "id": "nFKSiNPdGlTeq4khK2Vk",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "nH8sTHYsN0S1xFQ2OkMF",
            "categories": [
              "Sporting Events",
              "Fitness Classes",
              "Yoga & Meditation",
              "Outdoor Activities"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "nJFUzcXcbJ5a3FGv7rdh",
            "categories": [
              "Charity Galas",
              "Fundraising Events",
              "Volunteer Opportunities",
              "Community Outreach"
            ],
            "type": "Charity & Fundraising"
          },
          {
            "id": "nLKbySNaakdphwOFgbEa",
            "categories": [
              "Sporting Events",
              "Fitness Classes",
              "Yoga & Meditation",
              "Outdoor Activities"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "nLfEXU0auHSZArvSnQVc",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "nLkLM6Er83RQZrwEbk8I",
            "categories": [
              "Religious Gatherings",
              "Spiritual Retreats",
              "Meditation Groups",
              "Interfaith Dialogues"
            ],
            "type": "Religion & Spirituality"
          },
          {
            "id": "nLqvinrC8ZGbLbQg7p0K",
            "categories": [
              "Theater Productions",
              "Magic Shows",
              "Stand - Up Comedy",
              "Movie Screenings"
            ],
            "type": "Entertainment & Shows"
          },
          {
            "id": "nMIqlAdZxXk1YCBTqjuE",
            "categories": [
              "Charity Galas",
              "Fundraising Events",
              "Volunteer Opportunities",
              "Community Outreach"
            ],
            "type": "Charity & Fundraising"
          },
          {
            "id": "nNdWdwbOxG98MfhIELq6",
            "categories": [
              "Wellness Retreats",
              "Health Workshops",
              "Mindfulness Events",
              "Medical Seminars"
            ],
            "type": "Health & Wellness"
          },
          {
            "id": "nOcwOgGE33FgcWtMPKmT",
            "categories": [
              "Networking Events",
              "Workshops & Seminars",
              "Conferences",
              "Job Fairs"
            ],
            "type": "Networking & Business"
          },
          {
            "id": "nP3TrgJAivwDT3x4V0Lo",
            "categories": [
              "Religious Gatherings",
              "Spiritual Retreats",
              "Meditation Groups",
              "Interfaith Dialogues"
            ],
            "type": "Religion & Spirituality"
          },
          {
            "id": "nPUp4yCZNDP7zD3LzIuU",
            "categories": [
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Food & Dining"
          },
          {
            "id": "nQI7AIDvSriZReHLj5yL",
            "categories": [
              "Travel Expos",
              "Adventure Tours",
              "Backpacking Trips",
              "Cultural Experiences"
            ],
            "type": "Travel & Adventure"
          },
          {
            "id": "nRv3ZJAaYeCaObyjA3oG",
            "categories": [
              "Indian Cuisine",
              "Italian Cuisine",
              "American Fare",
              "Asian Fusion",
              "Mediterranean",
              "Mexican & Tex - Mex",
              "Sushi & Japanese",
              "Chinese Cuisine",
              "French Dining",
              "Vegetarian & Vegan",
              "Seafood Specialties",
              "BBQ & Grill",
              "Steakhouse",
              "Fast Food & Burgers",
              "Cafes & Bakeries",
              "Food Trucks",
              "Fine Dining",
              "Farm - to - Table",
              "Ethnic Eateries"
            ],
            "type": "Food styles"
          },
          {
            "id": "nUcW57NcHSzaG8wbLbAp",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "nVO3SlkfXJL9ia60MbhL",
            "categories": [
              "Educational Workshops",
              "Lectures & Talks",
              "Online Courses",
              "Tutoring Services"
            ],
            "type": "Education & Learning"
          },
          {
            "id": "nWnrkxEHaARvN9gyOFQa",
            "categories": [
              "Hobbyist Gatherings",
              "Hobby Workshops",
              "Special Interest Groups",
              "Craft Fairs"
            ],
            "type": "Hobbies & Interests"
          },
          {
            "id": "nXaQJZgWLRU79LxDQrQR",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "naE6vENIWdHfeWxji1w8",
            "categories": [
              "Science Exhibitions",
              "STEM Workshops",
              "Space & Astronomy",
              "Technology Talks"
            ],
            "type": "Science & Technology"
          },
          {
            "id": "natEYCDPmDmViehlagbn",
            "categories": [
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Food & Dining"
          },
          {
            "id": "ndUeX9zmEx1BATqi2Qlk",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "nhye3c7Sq15K2FQpj5Fd",
            "categories": [
              "Educational Workshops",
              "Lectures & Talks",
              "Online Courses",
              "Tutoring Services"
            ],
            "type": "Education & Learning"
          },
          {
            "id": "nhyrwthBiD9Iqe8sMcZA",
            "categories": [
              "Wellness Retreats",
              "Health Workshops",
              "Mindfulness Events",
              "Medical Seminars"
            ],
            "type": "Health & Wellness"
          },
          {
            "id": "ni5XmeiJ2llj5cNwsMMg",
            "categories": [
              "Religious Gatherings",
              "Spiritual Retreats",
              "Meditation Groups",
              "Interfaith Dialogues"
            ],
            "type": "Religion & Spirituality"
          },
          {
            "id": "niJS2SDhdFMuML0q6Uho",
            "categories": [
              "Travel Expos",
              "Adventure Tours",
              "Backpacking Trips",
              "Cultural Experiences"
            ],
            "type": "Travel & Adventure"
          },
          {
            "id": "njzTOEZibZDkIj9Ss4hE",
            "categories": [
              "Religious Gatherings",
              "Spiritual Retreats",
              "Meditation Groups",
              "Interfaith Dialogues"
            ],
            "type": "Religion & Spirituality"
          },
          {
            "id": "nk0NMyIve5OGp4s780A0",
            "categories": [
              "Local Community Events",
              "Environmental Causes",
              "Social Activism",
              "Fundraising for Causes"
            ],
            "type": "Community & Causes"
          },
          {
            "id": "nkA7F9SMD9eVPMvcZOio",
            "categories": [
              "Pet Adoption Events",
              "Animal Welfare Fundraisers",
              "Pet - Friendly Activities",
              "Zoo Visits"
            ],
            "type": "Pets & Animals"
          },
          {
            "id": "nlI9uvFBIV1zprMXmVmH",
            "categories": [
              "Home Improvement Workshops",
              "Gardening Classes",
              "Home Shows",
              "DIY Events"
            ],
            "type": "Home & Garden"
          },
          {
            "id": "nlbEommD8DPxteIILpLY",
            "categories": [
              "Pet Adoption Events",
              "Animal Welfare Fundraisers",
              "Pet - Friendly Activities",
              "Zoo Visits"
            ],
            "type": "Pets & Animals"
          },
          {
            "id": "nlcPiO60saTWNA0rq7eZ",
            "categories": [
              "Family - Friendly Events",
              "Children's Workshops",
              "Kid - Friendly Activities",
              "Amusement Parks"
            ],
            "type": "Family & Kids"
          },
          {
            "id": "nn0iZ1rRQijELXYtE0Tq",
            "categories": [
              "Wellness Retreats",
              "Health Workshops",
              "Mindfulness Events",
              "Medical Seminars"
            ],
            "type": "Health & Wellness"
          },
          {
            "id": "nndZAnXuPDK8zhuV2Mwc",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "npzljsVCLR8BwZVTmzZ3",
            "categories": [
              "Wellness Retreats",
              "Health Workshops",
              "Mindfulness Events",
              "Medical Seminars"
            ],
            "type": "Health & Wellness"
          },
          {
            "id": "nqakH3VekEcHPmVIxVrC",
            "categories": [
              "Sporting Events",
              "Fitness Classes",
              "Yoga & Meditation",
              "Outdoor Activities"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "nqgh1Zigjos2zvcZqzrN",
            "categories": [
              "Networking Events",
              "Workshops & Seminars",
              "Conferences",
              "Job Fairs"
            ],
            "type": "Networking & Business"
          },
          {
            "id": "nsn3mQZFIyQ72lFNJhAU",
            "categories": [
              "Hobbyist Gatherings",
              "Hobby Workshops",
              "Special Interest Groups",
              "Craft Fairs"
            ],
            "type": "Hobbies & Interests"
          },
          {
            "id": "ntb1NK54IYRQe1lcblrw",
            "categories": [
              "Science Exhibitions",
              "STEM Workshops",
              "Space & Astronomy",
              "Technology Talks"
            ],
            "type": "Science & Technology"
          },
          {
            "id": "ntgAKHsG7KNVwOutXbvM",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "ntm9gsD3qS6SjZRKHKBc",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "nvb0yZ3xBqaYpraLN4nC",
            "categories": [
              "Fashion Shows",
              "Beauty Workshops",
              "Pop - Up Boutiques",
              "Makeup Classes"
            ],
            "type": "Fashion & Beauty"
          },
          {
            "id": "nxhsmt4tUJbFo4D1YH2j",
            "categories": [
              "Local Community Events",
              "Environmental Causes",
              "Social Activism",
              "Fundraising for Causes"
            ],
            "type": "Community & Causes"
          },
          {
            "id": "nyNzDJtDV8h7aF2xvmFV",
            "categories": [
              "Networking Events",
              "Workshops & Seminars",
              "Conferences",
              "Job Fairs"
            ],
            "type": "Networking & Business"
          },
          {
            "id": "o1GmuYOaPXB6KG2ATjyM",
            "categories": [
              "Tech Conferences",
              "Startup Events",
              "Coding Workshops",
              "Tech Expos"
            ],
            "type": "Tech & Innovation"
          },
          {
            "id": "o1OFuao4BFx59gSlWqMQ",
            "categories": [
              "Theater Productions",
              "Magic Shows",
              "Stand - Up Comedy",
              "Movie Screenings"
            ],
            "type": "Entertainment & Shows"
          },
          {
            "id": "o1PbmuinMPngDEkqpz3M",
            "categories": [
              "Family - Friendly Events",
              "Children's Workshops",
              "Kid - Friendly Activities",
              "Amusement Parks"
            ],
            "type": "Family & Kids"
          },
          {
            "id": "o3lNpoVJXGIQ93725WC7",
            "categories": [
              "Indian Cuisine",
              "Italian Cuisine",
              "American Fare",
              "Asian Fusion",
              "Mediterranean",
              "Mexican & Tex - Mex",
              "Sushi & Japanese",
              "Chinese Cuisine",
              "French Dining",
              "Vegetarian & Vegan",
              "Seafood Specialties",
              "BBQ & Grill",
              "Steakhouse",
              "Fast Food & Burgers",
              "Cafes & Bakeries",
              "Food Trucks",
              "Fine Dining",
              "Farm - to - Table",
              "Ethnic Eateries"
            ],
            "type": "Food styles"
          },
          {
            "id": "o46GJRH55HBhKY7PPvPg",
            "categories": [
              "Charity Galas",
              "Fundraising Events",
              "Volunteer Opportunities",
              "Community Outreach"
            ],
            "type": "Charity & Fundraising"
          },
          {
            "id": "o4OdKIcuM2poNG1d9oY4",
            "categories": [
              "Charity Galas",
              "Fundraising Events",
              "Volunteer Opportunities",
              "Community Outreach"
            ],
            "type": "Charity & Fundraising"
          },
          {
            "id": "o51lPrZeTrKuhKRwmVq5",
            "categories": [
              "Local Community Events",
              "Environmental Causes",
              "Social Activism",
              "Fundraising for Causes"
            ],
            "type": "Community & Causes"
          },
          {
            "id": "o70LRvnCgTZghY5VoAip",
            "categories": [
              "Indian Cuisine",
              "Italian Cuisine",
              "American Fare",
              "Asian Fusion",
              "Mediterranean",
              "Mexican & Tex - Mex",
              "Sushi & Japanese",
              "Chinese Cuisine",
              "French Dining",
              "Vegetarian & Vegan",
              "Seafood Specialties",
              "BBQ & Grill",
              "Steakhouse",
              "Fast Food & Burgers",
              "Cafes & Bakeries",
              "Food Trucks",
              "Fine Dining",
              "Farm - to - Table",
              "Ethnic Eateries"
            ],
            "type": "Food styles"
          },
          {
            "id": "o7pjrzCDUVGAvc6BOa4l",
            "categories": [
              "Science Exhibitions",
              "STEM Workshops",
              "Space & Astronomy",
              "Technology Talks"
            ],
            "type": "Science & Technology"
          },
          {
            "id": "o8NOtmRDqie4SQQx4wBv",
            "categories": [
              "Science Exhibitions",
              "STEM Workshops",
              "Space & Astronomy",
              "Technology Talks"
            ],
            "type": "Science & Technology"
          },
          {
            "id": "o8uL49qAmGU5nHa4g59Z",
            "categories": [
              "Educational Workshops",
              "Lectures & Talks",
              "Online Courses",
              "Tutoring Services"
            ],
            "type": "Education & Learning"
          },
          {
            "id": "oAe8czWI06UBMR8WTwee",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "oGfvyVHbajFvzzko1Wo1",
            "categories": [
              "Networking Events",
              "Workshops & Seminars",
              "Conferences",
              "Job Fairs"
            ],
            "type": "Networking & Business"
          },
          {
            "id": "oGyjkQAfgaNBP1EDfX7g",
            "categories": [
              "Religious Gatherings",
              "Spiritual Retreats",
              "Meditation Groups",
              "Interfaith Dialogues"
            ],
            "type": "Religion & Spirituality"
          },
          {
            "id": "oHthVx78zUOHK3fsg5gs",
            "categories": [
              "Pet Adoption Events",
              "Animal Welfare Fundraisers",
              "Pet - Friendly Activities",
              "Zoo Visits"
            ],
            "type": "Pets & Animals"
          },
          {
            "id": "oIeMoAtnR2LNnKnQbpUq",
            "categories": [
              "Home Improvement Workshops",
              "Gardening Classes",
              "Home Shows",
              "DIY Events"
            ],
            "type": "Home & Garden"
          },
          {
            "id": "oK5dJDv4Yu9lTWGjYFKP",
            "categories": [
              "Educational Workshops",
              "Lectures & Talks",
              "Online Courses",
              "Tutoring Services"
            ],
            "type": "Education & Learning"
          },
          {
            "id": "oMUyeGuo77JUjxQHMpqD",
            "categories": [
              "Travel Expos",
              "Adventure Tours",
              "Backpacking Trips",
              "Cultural Experiences"
            ],
            "type": "Travel & Adventure"
          },
          {
            "id": "oOTjDgj1Fpwi9K4EkYub",
            "categories": [
              "Hobbyist Gatherings",
              "Hobby Workshops",
              "Special Interest Groups",
              "Craft Fairs"
            ],
            "type": "Hobbies & Interests"
          },
          {
            "id": "oOaOgZJPbU087woWBukG",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "oOhbRz5H3QSVGHjkgbXQ",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "oQ2ghfx81AFPQuxJrpUo",
            "categories": [
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Food & Dining"
          },
          {
            "id": "oQ4usWSuv6KpZvaNHqog",
            "categories": [
              "Indian Cuisine",
              "Italian Cuisine",
              "American Fare",
              "Asian Fusion",
              "Mediterranean",
              "Mexican & Tex - Mex",
              "Sushi & Japanese",
              "Chinese Cuisine",
              "French Dining",
              "Vegetarian & Vegan",
              "Seafood Specialties",
              "BBQ & Grill",
              "Steakhouse",
              "Fast Food & Burgers",
              "Cafes & Bakeries",
              "Food Trucks",
              "Fine Dining",
              "Farm - to - Table",
              "Ethnic Eateries"
            ],
            "type": "Food styles"
          },
          {
            "id": "oRUHEijPZ2mRIdHoJzVQ",
            "categories": [
              "Theater Productions",
              "Magic Shows",
              "Stand - Up Comedy",
              "Movie Screenings"
            ],
            "type": "Entertainment & Shows"
          },
          {
            "id": "oUqdpzB9z4NoXLsBSxNO",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "oUu8s5VYL3gDdiFRvcBd",
            "categories": [
              "Sporting Events",
              "Fitness Classes",
              "Yoga & Meditation",
              "Outdoor Activities"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "oVgRCTY49Qv48uYsOM0p",
            "categories": [
              "Home Improvement Workshops",
              "Gardening Classes",
              "Home Shows",
              "DIY Events"
            ],
            "type": "Home & Garden"
          },
          {
            "id": "oVkdlfGnU8Hg2sjV4Gis",
            "categories": [
              "Science Exhibitions",
              "STEM Workshops",
              "Space & Astronomy",
              "Technology Talks"
            ],
            "type": "Science & Technology"
          },
          {
            "id": "oY9ohJXWhdvEL93F8Rs8",
            "categories": [
              "Religious Gatherings",
              "Spiritual Retreats",
              "Meditation Groups",
              "Interfaith Dialogues"
            ],
            "type": "Religion & Spirituality"
          },
          {
            "id": "ocvCYx7QTLV06FK0kpih",
            "categories": [
              "Travel Expos",
              "Adventure Tours",
              "Backpacking Trips",
              "Cultural Experiences"
            ],
            "type": "Travel & Adventure"
          },
          {
            "id": "odWF2YiWNYahSejZAFZJ",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "of2lR1mvwEwJNG2NPYY0",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "ofjLwuZaabF2D54sKgUQ",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "ohGyzZ7Tp86wRjKcSNAX",
            "categories": [
              "Food & Dining",
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Sports & Fitness"
          },
          {
            "id": "oiKlStWUpwj5B0GyQYO4",
            "categories": [
              "Educational Workshops",
              "Lectures & Talks",
              "Online Courses",
              "Tutoring Services"
            ],
            "type": "Education & Learning"
          },
          {
            "id": "oiykolO3j15s4zCHk5ZT",
            "categories": [
              "Religious Gatherings",
              "Spiritual Retreats",
              "Meditation Groups",
              "Interfaith Dialogues"
            ],
            "type": "Religion & Spirituality"
          },
          {
            "id": "oj6dx5xFbhamH8s0tiYQ",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "ojkBDKiKYpUWuivdCVLt",
            "categories": [
              "Family - Friendly Events",
              "Children's Workshops",
              "Kid - Friendly Activities",
              "Amusement Parks"
            ],
            "type": "Family & Kids"
          },
          {
            "id": "olAXmcoKbLlmECc2i1bK",
            "categories": [
              "Sporting Events",
              "Fitness Classes",
              "Yoga & Meditation",
              "Outdoor Activities"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "omE4hWOhPMN5qfBT33MO",
            "categories": [
              "Fashion Shows",
              "Beauty Workshops",
              "Pop - Up Boutiques",
              "Makeup Classes"
            ],
            "type": "Fashion & Beauty"
          },
          {
            "id": "onJfJEeHECFPfjlWWJtj",
            "categories": [
              "Educational Workshops",
              "Lectures & Talks",
              "Online Courses",
              "Tutoring Services"
            ],
            "type": "Education & Learning"
          },
          {
            "id": "orBVFnB0atUJ4ecAYE0M",
            "categories": [
              "Food & Dining",
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Sports & Fitness"
          },
          {
            "id": "otTwsKdUlVYfzYo8Kf0x",
            "categories": [
              "Fashion Shows",
              "Beauty Workshops",
              "Pop - Up Boutiques",
              "Makeup Classes"
            ],
            "type": "Fashion & Beauty"
          },
          {
            "id": "owslktH5JmB1DM40KoBO",
            "categories": [
              "Theater Productions",
              "Magic Shows",
              "Stand - Up Comedy",
              "Movie Screenings"
            ],
            "type": "Entertainment & Shows"
          },
          {
            "id": "ozpfjnHO9a1IcwhmA1Lk",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "ozs7AwQZDJSsOzfIh3Tp",
            "categories": [
              "Travel Expos",
              "Adventure Tours",
              "Backpacking Trips",
              "Cultural Experiences"
            ],
            "type": "Travel & Adventure"
          },
          {
            "id": "p0Wjbub3XOpkFwqMUo7G",
            "categories": [
              "Educational Workshops",
              "Lectures & Talks",
              "Online Courses",
              "Tutoring Services"
            ],
            "type": "Education & Learning"
          },
          {
            "id": "p3IWkmyzobMicSkAUV6m",
            "categories": [
              "Educational Workshops",
              "Lectures & Talks",
              "Online Courses",
              "Tutoring Services"
            ],
            "type": "Education & Learning"
          },
          {
            "id": "p3ihmLq6hoez89oPmHNO",
            "categories": [
              "Science Exhibitions",
              "STEM Workshops",
              "Space & Astronomy",
              "Technology Talks"
            ],
            "type": "Science & Technology"
          },
          {
            "id": "p5u7yuIcObDFrM2ToERC",
            "categories": [
              "Family - Friendly Events",
              "Children's Workshops",
              "Kid - Friendly Activities",
              "Amusement Parks"
            ],
            "type": "Family & Kids"
          },
          {
            "id": "p74vHaLIV9HaDKsYwirN",
            "categories": [
              "Science Exhibitions",
              "STEM Workshops",
              "Space & Astronomy",
              "Technology Talks"
            ],
            "type": "Science & Technology"
          },
          {
            "id": "p7bU1wrsdaij2Yy3it9F",
            "categories": [
              "Local Community Events",
              "Environmental Causes",
              "Social Activism",
              "Fundraising for Causes"
            ],
            "type": "Community & Causes"
          },
          {
            "id": "pAJGfVw7J5vLyW23OSxP",
            "categories": [
              "Food & Dining",
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Sports & Fitness"
          },
          {
            "id": "pAbyrQ5Dd4jadKZpp7vs",
            "categories": [
              "Charity Galas",
              "Fundraising Events",
              "Volunteer Opportunities",
              "Community Outreach"
            ],
            "type": "Charity & Fundraising"
          },
          {
            "id": "pDKkOJakMUnYckx6gwGV",
            "categories": [
              "Travel Expos",
              "Adventure Tours",
              "Backpacking Trips",
              "Cultural Experiences"
            ],
            "type": "Travel & Adventure"
          },
          {
            "id": "pDgtUdNue8xYNjhgujro",
            "categories": [
              "Family - Friendly Events",
              "Children's Workshops",
              "Kid - Friendly Activities",
              "Amusement Parks"
            ],
            "type": "Family & Kids"
          },
          {
            "id": "pEFo17YAE8KxYqJP55Lo",
            "categories": [
              "Fashion Shows",
              "Beauty Workshops",
              "Pop - Up Boutiques",
              "Makeup Classes"
            ],
            "type": "Fashion & Beauty"
          },
          {
            "id": "pH1dZs1qCMfXqGcsDl60",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "pH2KE2xPIHY2ZuckmTIU",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "pHLlm99a7RNMDXnUx34k",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "pIdSiAxLHSxH0W1Avz2F",
            "categories": [
              "Science Exhibitions",
              "STEM Workshops",
              "Space & Astronomy",
              "Technology Talks"
            ],
            "type": "Science & Technology"
          },
          {
            "id": "pL36B0DroKtJbGWGvY0t",
            "categories": [
              "Food & Dining",
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Sports & Fitness"
          },
          {
            "id": "pP6cOEI2s8Z1zZ4OvK8X",
            "categories": [
              "Travel Expos",
              "Adventure Tours",
              "Backpacking Trips",
              "Cultural Experiences"
            ],
            "type": "Travel & Adventure"
          },
          {
            "id": "pPs1fTCboSA1gkqZlLTG",
            "categories": [
              "Theater Productions",
              "Magic Shows",
              "Stand - Up Comedy",
              "Movie Screenings"
            ],
            "type": "Entertainment & Shows"
          },
          {
            "id": "pQC4hAnUChMwMkIyDnhT",
            "categories": [
              "Theater Productions",
              "Magic Shows",
              "Stand - Up Comedy",
              "Movie Screenings"
            ],
            "type": "Entertainment & Shows"
          },
          {
            "id": "pQZkKpM5MAdcZNwmbnWP",
            "categories": [
              "Pet Adoption Events",
              "Animal Welfare Fundraisers",
              "Pet - Friendly Activities",
              "Zoo Visits"
            ],
            "type": "Pets & Animals"
          },
          {
            "id": "pSULz22jiyVvIBBS6Qh6",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "pTrZieeOgKm7R7a3MIYz",
            "categories": [
              "Wellness Retreats",
              "Health Workshops",
              "Mindfulness Events",
              "Medical Seminars"
            ],
            "type": "Health & Wellness"
          },
          {
            "id": "pXIPREdDMxvncPt4FRgB",
            "categories": [
              "Science Exhibitions",
              "STEM Workshops",
              "Space & Astronomy",
              "Technology Talks"
            ],
            "type": "Science & Technology"
          },
          {
            "id": "pXzyv7QYlXUcFpMe0keK",
            "categories": [
              "Science Exhibitions",
              "STEM Workshops",
              "Space & Astronomy",
              "Technology Talks"
            ],
            "type": "Science & Technology"
          },
          {
            "id": "pYsJV7CSdSrZjQnlhkBi",
            "categories": [
              "Fashion Shows",
              "Beauty Workshops",
              "Pop - Up Boutiques",
              "Makeup Classes"
            ],
            "type": "Fashion & Beauty"
          },
          {
            "id": "pYsx5P1ATdKGr8DaWX8d",
            "categories": [
              "Networking Events",
              "Workshops & Seminars",
              "Conferences",
              "Job Fairs"
            ],
            "type": "Networking & Business"
          },
          {
            "id": "pdf8WzSLD8Vulxk1KgfN",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "pdhREAGLxwiBpBuM2Dtm",
            "categories": [
              "Fashion Shows",
              "Beauty Workshops",
              "Pop - Up Boutiques",
              "Makeup Classes"
            ],
            "type": "Fashion & Beauty"
          },
          {
            "id": "pe2f302d8eXQuZkv0ywx",
            "categories": [
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Food & Dining"
          },
          {
            "id": "pfVBP9LbOoO1jv1XwJND",
            "categories": [
              "Sporting Events",
              "Fitness Classes",
              "Yoga & Meditation",
              "Outdoor Activities"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "pgoFri5G0mLNzh5wYBxG",
            "categories": [
              "Fashion Shows",
              "Beauty Workshops",
              "Pop - Up Boutiques",
              "Makeup Classes"
            ],
            "type": "Fashion & Beauty"
          },
          {
            "id": "pjUeTBoimG3RHOOiR4sI",
            "categories": [
              "Religious Gatherings",
              "Spiritual Retreats",
              "Meditation Groups",
              "Interfaith Dialogues"
            ],
            "type": "Religion & Spirituality"
          },
          {
            "id": "plA03dtf4uxow6EJZkjo",
            "categories": [
              "Pet Adoption Events",
              "Animal Welfare Fundraisers",
              "Pet - Friendly Activities",
              "Zoo Visits"
            ],
            "type": "Pets & Animals"
          },
          {
            "id": "pla8zd9RHCbmcs48gSaU",
            "categories": [
              "Family - Friendly Events",
              "Children's Workshops",
              "Kid - Friendly Activities",
              "Amusement Parks"
            ],
            "type": "Family & Kids"
          },
          {
            "id": "pltdqlq3VYVFOfEBZZF7",
            "categories": [
              "Local Community Events",
              "Environmental Causes",
              "Social Activism",
              "Fundraising for Causes"
            ],
            "type": "Community & Causes"
          },
          {
            "id": "pp4sKImdmFrOYgqzhgbZ",
            "categories": [
              "Indian Cuisine",
              "Italian Cuisine",
              "American Fare",
              "Asian Fusion",
              "Mediterranean",
              "Mexican & Tex - Mex",
              "Sushi & Japanese",
              "Chinese Cuisine",
              "French Dining",
              "Vegetarian & Vegan",
              "Seafood Specialties",
              "BBQ & Grill",
              "Steakhouse",
              "Fast Food & Burgers",
              "Cafes & Bakeries",
              "Food Trucks",
              "Fine Dining",
              "Farm - to - Table",
              "Ethnic Eateries"
            ],
            "type": "Food styles"
          },
          {
            "id": "ppkt1VYbHsJp51OQkMH0",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "pqlLhZqd5znxQdVpbOlT",
            "categories": [
              "Travel Expos",
              "Adventure Tours",
              "Backpacking Trips",
              "Cultural Experiences"
            ],
            "type": "Travel & Adventure"
          },
          {
            "id": "pteD21ZDFnbd4dvM0cvW",
            "categories": [
              "Charity Galas",
              "Fundraising Events",
              "Volunteer Opportunities",
              "Community Outreach"
            ],
            "type": "Charity & Fundraising"
          },
          {
            "id": "pvkMv1oKgTVSnjpPxvWv",
            "categories": [
              "Fashion Shows",
              "Beauty Workshops",
              "Pop - Up Boutiques",
              "Makeup Classes"
            ],
            "type": "Fashion & Beauty"
          },
          {
            "id": "qC4LYp5I56mx5iNFkxIB",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "qFiYRaop4rEOjKonglXD",
            "categories": [
              "Travel Expos",
              "Adventure Tours",
              "Backpacking Trips",
              "Cultural Experiences"
            ],
            "type": "Travel & Adventure"
          },
          {
            "id": "qH1WNG1S5fvAbnL4BlYG",
            "categories": [
              "Wellness Retreats",
              "Health Workshops",
              "Mindfulness Events",
              "Medical Seminars"
            ],
            "type": "Health & Wellness"
          },
          {
            "id": "qJqLlu7YnvHztVFIp9U4",
            "categories": [
              "Family - Friendly Events",
              "Children's Workshops",
              "Kid - Friendly Activities",
              "Amusement Parks"
            ],
            "type": "Family & Kids"
          },
          {
            "id": "qLRUH0CjRaKctTgDHOAO",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "qLUQ0iDbeIZRHZWytaTD",
            "categories": [
              "Family - Friendly Events",
              "Children's Workshops",
              "Kid - Friendly Activities",
              "Amusement Parks"
            ],
            "type": "Family & Kids"
          },
          {
            "id": "qLyJNQmiYrnPaYBFa4HR",
            "categories": [
              "Tech Conferences",
              "Startup Events",
              "Coding Workshops",
              "Tech Expos"
            ],
            "type": "Tech & Innovation"
          },
          {
            "id": "qMyt0WaV5ki9TivsrbV4",
            "categories": [
              "Food & Dining",
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Sports & Fitness"
          },
          {
            "id": "qOLjihmRfsBcn9qofwvn",
            "categories": [
              "Indian Cuisine",
              "Italian Cuisine",
              "American Fare",
              "Asian Fusion",
              "Mediterranean",
              "Mexican & Tex - Mex",
              "Sushi & Japanese",
              "Chinese Cuisine",
              "French Dining",
              "Vegetarian & Vegan",
              "Seafood Specialties",
              "BBQ & Grill",
              "Steakhouse",
              "Fast Food & Burgers",
              "Cafes & Bakeries",
              "Food Trucks",
              "Fine Dining",
              "Farm - to - Table",
              "Ethnic Eateries"
            ],
            "type": "Food styles"
          },
          {
            "id": "qQdc25Ia6bwmfTxzPep1",
            "categories": [
              "Food & Dining",
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Sports & Fitness"
          },
          {
            "id": "qULfCBQrcXUF8OpZZBRD",
            "categories": [
              "Local Community Events",
              "Environmental Causes",
              "Social Activism",
              "Fundraising for Causes"
            ],
            "type": "Community & Causes"
          },
          {
            "id": "qV1wjdjMB1gDaahDV4MM",
            "categories": [
              "Travel Expos",
              "Adventure Tours",
              "Backpacking Trips",
              "Cultural Experiences"
            ],
            "type": "Travel & Adventure"
          },
          {
            "id": "qWGc5QMCsPgoFH8kicJE",
            "categories": [
              "Tech Conferences",
              "Startup Events",
              "Coding Workshops",
              "Tech Expos"
            ],
            "type": "Tech & Innovation"
          },
          {
            "id": "qXOXAOViGCEJ825QOufM",
            "categories": [
              "Theater Productions",
              "Magic Shows",
              "Stand - Up Comedy",
              "Movie Screenings"
            ],
            "type": "Entertainment & Shows"
          },
          {
            "id": "qbhGmwTFQeVFa9L6VMf7",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "qdhqSVOOH7ns4JZCREkS",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "qivIhI2iKslF1O09tiJw",
            "categories": [
              "Indian Cuisine",
              "Italian Cuisine",
              "American Fare",
              "Asian Fusion",
              "Mediterranean",
              "Mexican & Tex - Mex",
              "Sushi & Japanese",
              "Chinese Cuisine",
              "French Dining",
              "Vegetarian & Vegan",
              "Seafood Specialties",
              "BBQ & Grill",
              "Steakhouse",
              "Fast Food & Burgers",
              "Cafes & Bakeries",
              "Food Trucks",
              "Fine Dining",
              "Farm - to - Table",
              "Ethnic Eateries"
            ],
            "type": "Food styles"
          },
          {
            "id": "qj3ilZA1JydtRKXvk79t",
            "categories": [
              "Tech Conferences",
              "Startup Events",
              "Coding Workshops",
              "Tech Expos"
            ],
            "type": "Tech & Innovation"
          },
          {
            "id": "qnDsVGw7eDbDGV0Md2SX",
            "categories": [
              "Charity Galas",
              "Fundraising Events",
              "Volunteer Opportunities",
              "Community Outreach"
            ],
            "type": "Charity & Fundraising"
          },
          {
            "id": "qncMrDPnPrInTuk6zUzQ",
            "categories": [
              "Sporting Events",
              "Fitness Classes",
              "Yoga & Meditation",
              "Outdoor Activities"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "qoBkC0uM8iYTRkpt4ywE",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "qp4hz2t8iNcat0tYIzzc",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "qpf2e4GLvvni8K8NKaCC",
            "categories": [
              "Networking Events",
              "Workshops & Seminars",
              "Conferences",
              "Job Fairs"
            ],
            "type": "Networking & Business"
          },
          {
            "id": "qq94yTla4zBisbmU7nAZ",
            "categories": [
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Food & Dining"
          },
          {
            "id": "qq9xWwAbDHCUdZ7XeqWb",
            "categories": [
              "Charity Galas",
              "Fundraising Events",
              "Volunteer Opportunities",
              "Community Outreach"
            ],
            "type": "Charity & Fundraising"
          },
          {
            "id": "qqiYimxFNmIDOTzLFHKi",
            "categories": [
              "Hobbyist Gatherings",
              "Hobby Workshops",
              "Special Interest Groups",
              "Craft Fairs"
            ],
            "type": "Hobbies & Interests"
          },
          {
            "id": "qu3oaVYPnUHVY2tqes5h",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "qv4Xa5PcubyBZeO2TOv9",
            "categories": [
              "Science Exhibitions",
              "STEM Workshops",
              "Space & Astronomy",
              "Technology Talks"
            ],
            "type": "Science & Technology"
          },
          {
            "id": "qvLlEzjmwZWsaNgmrO0R",
            "categories": [
              "Sporting Events",
              "Fitness Classes",
              "Yoga & Meditation",
              "Outdoor Activities"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "qvahdzOhO9ETcHFEjcUw",
            "categories": [
              "Tech Conferences",
              "Startup Events",
              "Coding Workshops",
              "Tech Expos"
            ],
            "type": "Tech & Innovation"
          },
          {
            "id": "qy8uRlhNUjNE3OjcyxDh",
            "categories": [
              "Sporting Events",
              "Fitness Classes",
              "Yoga & Meditation",
              "Outdoor Activities"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "r3p45oLOWxb55rKvJJOG",
            "categories": [
              "Travel Expos",
              "Adventure Tours",
              "Backpacking Trips",
              "Cultural Experiences"
            ],
            "type": "Travel & Adventure"
          },
          {
            "id": "r40kPYLQgvJB2Ii6G66o",
            "categories": [
              "Home Improvement Workshops",
              "Gardening Classes",
              "Home Shows",
              "DIY Events"
            ],
            "type": "Home & Garden"
          },
          {
            "id": "r49dNlHgmcnEc3LrgAL5",
            "categories": [
              "Fashion Shows",
              "Beauty Workshops",
              "Pop - Up Boutiques",
              "Makeup Classes"
            ],
            "type": "Fashion & Beauty"
          },
          {
            "id": "r5vGOBTM4KSTPCfpZzHD",
            "categories": [
              "Indian Cuisine",
              "Italian Cuisine",
              "American Fare",
              "Asian Fusion",
              "Mediterranean",
              "Mexican & Tex - Mex",
              "Sushi & Japanese",
              "Chinese Cuisine",
              "French Dining",
              "Vegetarian & Vegan",
              "Seafood Specialties",
              "BBQ & Grill",
              "Steakhouse",
              "Fast Food & Burgers",
              "Cafes & Bakeries",
              "Food Trucks",
              "Fine Dining",
              "Farm - to - Table",
              "Ethnic Eateries"
            ],
            "type": "Food styles"
          },
          {
            "id": "r6EExKWxLd6L6L5zP1xL",
            "categories": [
              "Travel Expos",
              "Adventure Tours",
              "Backpacking Trips",
              "Cultural Experiences"
            ],
            "type": "Travel & Adventure"
          },
          {
            "id": "r7yKKMWosO87tS9J3Iwm",
            "categories": [
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Food & Dining"
          },
          {
            "id": "r9PHJCfPGO7dwlcl5xpb",
            "categories": [
              "Indian Cuisine",
              "Italian Cuisine",
              "American Fare",
              "Asian Fusion",
              "Mediterranean",
              "Mexican & Tex - Mex",
              "Sushi & Japanese",
              "Chinese Cuisine",
              "French Dining",
              "Vegetarian & Vegan",
              "Seafood Specialties",
              "BBQ & Grill",
              "Steakhouse",
              "Fast Food & Burgers",
              "Cafes & Bakeries",
              "Food Trucks",
              "Fine Dining",
              "Farm - to - Table",
              "Ethnic Eateries"
            ],
            "type": "Food styles"
          },
          {
            "id": "r9cMChywVqKGkKTo9PM0",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "rEYpXISgf16hAHhgizAS",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "rEhHTe6Dw0ebWgnoIPLa",
            "categories": [
              "Charity Galas",
              "Fundraising Events",
              "Volunteer Opportunities",
              "Community Outreach"
            ],
            "type": "Charity & Fundraising"
          },
          {
            "id": "rEuIUhnE9hrNvUjxelBY",
            "categories": [
              "Science Exhibitions",
              "STEM Workshops",
              "Space & Astronomy",
              "Technology Talks"
            ],
            "type": "Science & Technology"
          },
          {
            "id": "rI6kSqUgjgvvu2O87BaB",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "rJYfdI3u8r82wwdeDqgn",
            "categories": [
              "Educational Workshops",
              "Lectures & Talks",
              "Online Courses",
              "Tutoring Services"
            ],
            "type": "Education & Learning"
          },
          {
            "id": "rMoj7tS7eErR6noV9ZeC",
            "categories": [
              "Sporting Events",
              "Fitness Classes",
              "Yoga & Meditation",
              "Outdoor Activities"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "rNYSiF6pgqNks4kzsR2j",
            "categories": [
              "Food & Dining",
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Sports & Fitness"
          },
          {
            "id": "rPmNOQNvprY7tOSIYVe6",
            "categories": [
              "Science Exhibitions",
              "STEM Workshops",
              "Space & Astronomy",
              "Technology Talks"
            ],
            "type": "Science & Technology"
          },
          {
            "id": "rQE8ZHa8Pb0IU5L5VUVm",
            "categories": [
              "Educational Workshops",
              "Lectures & Talks",
              "Online Courses",
              "Tutoring Services"
            ],
            "type": "Education & Learning"
          },
          {
            "id": "rR8OWvSsLmpn4rUJtBXC",
            "categories": [
              "Family - Friendly Events",
              "Children's Workshops",
              "Kid - Friendly Activities",
              "Amusement Parks"
            ],
            "type": "Family & Kids"
          },
          {
            "id": "rSC05NLURUKOmYMh19P7",
            "categories": [
              "Fashion Shows",
              "Beauty Workshops",
              "Pop - Up Boutiques",
              "Makeup Classes"
            ],
            "type": "Fashion & Beauty"
          },
          {
            "id": "rShZLiurbmB8SmdZfFwP",
            "categories": [
              "Educational Workshops",
              "Lectures & Talks",
              "Online Courses",
              "Tutoring Services"
            ],
            "type": "Education & Learning"
          },
          {
            "id": "rVJT0YPAS1zB1TwJTDTY",
            "categories": [
              "Religious Gatherings",
              "Spiritual Retreats",
              "Meditation Groups",
              "Interfaith Dialogues"
            ],
            "type": "Religion & Spirituality"
          },
          {
            "id": "rYSO7zYj19np76l1VW81",
            "categories": [
              "Family - Friendly Events",
              "Children's Workshops",
              "Kid - Friendly Activities",
              "Amusement Parks"
            ],
            "type": "Family & Kids"
          },
          {
            "id": "rZP1Cx3rwkep3NzyE0db",
            "categories": [
              "Sporting Events",
              "Fitness Classes",
              "Yoga & Meditation",
              "Outdoor Activities"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "rawpj0vfmdsrjAGGUvbA",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "rdh5kpHIBYtYYQWFzam4",
            "categories": [
              "Theater Productions",
              "Magic Shows",
              "Stand - Up Comedy",
              "Movie Screenings"
            ],
            "type": "Entertainment & Shows"
          },
          {
            "id": "rgroyx9Hjrnf26ShdnxC",
            "categories": [
              "Indian Cuisine",
              "Italian Cuisine",
              "American Fare",
              "Asian Fusion",
              "Mediterranean",
              "Mexican & Tex - Mex",
              "Sushi & Japanese",
              "Chinese Cuisine",
              "French Dining",
              "Vegetarian & Vegan",
              "Seafood Specialties",
              "BBQ & Grill",
              "Steakhouse",
              "Fast Food & Burgers",
              "Cafes & Bakeries",
              "Food Trucks",
              "Fine Dining",
              "Farm - to - Table",
              "Ethnic Eateries"
            ],
            "type": "Food styles"
          },
          {
            "id": "rj3DSJcdS5ZaDJbca2uK",
            "categories": [
              "Home Improvement Workshops",
              "Gardening Classes",
              "Home Shows",
              "DIY Events"
            ],
            "type": "Home & Garden"
          },
          {
            "id": "rmQ1LJ0fprIpjOwJt971",
            "categories": [
              "Family - Friendly Events",
              "Children's Workshops",
              "Kid - Friendly Activities",
              "Amusement Parks"
            ],
            "type": "Family & Kids"
          },
          {
            "id": "ro0IYLCtRpaZyAe1bn8i",
            "categories": [
              "Theater Productions",
              "Magic Shows",
              "Stand - Up Comedy",
              "Movie Screenings"
            ],
            "type": "Entertainment & Shows"
          },
          {
            "id": "rpc4Ocq3hgKyAOHcLnjr",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "rpc7dbwUfVqaBKSiDa9v",
            "categories": [
              "Pet Adoption Events",
              "Animal Welfare Fundraisers",
              "Pet - Friendly Activities",
              "Zoo Visits"
            ],
            "type": "Pets & Animals"
          },
          {
            "id": "rpifGI6kejy6s0oMW0uv",
            "categories": [
              "Religious Gatherings",
              "Spiritual Retreats",
              "Meditation Groups",
              "Interfaith Dialogues"
            ],
            "type": "Religion & Spirituality"
          },
          {
            "id": "ryrFKib5mjtnVWPY7OXy",
            "categories": [
              "Sporting Events",
              "Fitness Classes",
              "Yoga & Meditation",
              "Outdoor Activities"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "rzIoqJmxsf9D7Ut7OBhf",
            "categories": [
              "Educational Workshops",
              "Lectures & Talks",
              "Online Courses",
              "Tutoring Services"
            ],
            "type": "Education & Learning"
          },
          {
            "id": "s0jfealn8FhW07zu7hjy",
            "categories": [
              "Fashion Shows",
              "Beauty Workshops",
              "Pop - Up Boutiques",
              "Makeup Classes"
            ],
            "type": "Fashion & Beauty"
          },
          {
            "id": "s0yLz8eLHQly067eA1s1",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "s36Prjg33CT8Etjf2yxb",
            "categories": [
              "Religious Gatherings",
              "Spiritual Retreats",
              "Meditation Groups",
              "Interfaith Dialogues"
            ],
            "type": "Religion & Spirituality"
          },
          {
            "id": "s3DRsT4KagXt4oBNXCkZ",
            "categories": [
              "Science Exhibitions",
              "STEM Workshops",
              "Space & Astronomy",
              "Technology Talks"
            ],
            "type": "Science & Technology"
          },
          {
            "id": "s45ZLxcTGQEoqIP33wTJ",
            "categories": [
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Food & Dining"
          },
          {
            "id": "s6Ms24s6hqjvAVbPinrk",
            "categories": [
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Food & Dining"
          },
          {
            "id": "s6Ta3EafH7VW9CL73S4s",
            "categories": [
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Food & Dining"
          },
          {
            "id": "s80MJnPdeS2p9cg8aS1W",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "s9xpeAp3IRcTKF1buWPU",
            "categories": [
              "Pet Adoption Events",
              "Animal Welfare Fundraisers",
              "Pet - Friendly Activities",
              "Zoo Visits"
            ],
            "type": "Pets & Animals"
          },
          {
            "id": "sE4Ubzgz6ibzEx9Nq2n4",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "sEeEPCHkNqL5oICXpK7P",
            "categories": [
              "Hobbyist Gatherings",
              "Hobby Workshops",
              "Special Interest Groups",
              "Craft Fairs"
            ],
            "type": "Hobbies & Interests"
          },
          {
            "id": "sFcMe6wPvKDrBEMIuPOj",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "sHYCBZHkBvfD9GsxQrMo",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "sJQiJR1nLQwcmc15gN9v",
            "categories": [
              "Tech Conferences",
              "Startup Events",
              "Coding Workshops",
              "Tech Expos"
            ],
            "type": "Tech & Innovation"
          },
          {
            "id": "sKJ4IfCObRa5tyOpGF7q",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "sLr21NdqpkZ4GXwlxkaq",
            "categories": [
              "Science Exhibitions",
              "STEM Workshops",
              "Space & Astronomy",
              "Technology Talks"
            ],
            "type": "Science & Technology"
          },
          {
            "id": "sMQyRbGUVXZUofX9LLpg",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "sNTDUJZDkTWkXs1IUWeO",
            "categories": [
              "Fashion Shows",
              "Beauty Workshops",
              "Pop - Up Boutiques",
              "Makeup Classes"
            ],
            "type": "Fashion & Beauty"
          },
          {
            "id": "sQTf9Aa4XKohzI7tJUwA",
            "categories": [
              "Travel Expos",
              "Adventure Tours",
              "Backpacking Trips",
              "Cultural Experiences"
            ],
            "type": "Travel & Adventure"
          },
          {
            "id": "sRIeGQrm1tsPhC3niKh7",
            "categories": [
              "Food & Dining",
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Sports & Fitness"
          },
          {
            "id": "sSEdMt5Pd2tKoNKjagYO",
            "categories": [
              "Home Improvement Workshops",
              "Gardening Classes",
              "Home Shows",
              "DIY Events"
            ],
            "type": "Home & Garden"
          },
          {
            "id": "sSrP8PZBoHIzEKQBRBNR",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "sVZtjCwPvTu4xHWIZxB4",
            "categories": [
              "Sporting Events",
              "Fitness Classes",
              "Yoga & Meditation",
              "Outdoor Activities"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "sXcyVKkCwbOaEUbQeh5T",
            "categories": [
              "Travel Expos",
              "Adventure Tours",
              "Backpacking Trips",
              "Cultural Experiences"
            ],
            "type": "Travel & Adventure"
          },
          {
            "id": "sZ1QEN1KZwVa5vLh92vK",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "saIh9m3UcHN4rhQMDUV4",
            "categories": [
              "Indian Cuisine",
              "Italian Cuisine",
              "American Fare",
              "Asian Fusion",
              "Mediterranean",
              "Mexican & Tex - Mex",
              "Sushi & Japanese",
              "Chinese Cuisine",
              "French Dining",
              "Vegetarian & Vegan",
              "Seafood Specialties",
              "BBQ & Grill",
              "Steakhouse",
              "Fast Food & Burgers",
              "Cafes & Bakeries",
              "Food Trucks",
              "Fine Dining",
              "Farm - to - Table",
              "Ethnic Eateries"
            ],
            "type": "Food styles"
          },
          {
            "id": "saQdCT5J6VDbPmyAlbEg",
            "categories": [
              "Fashion Shows",
              "Beauty Workshops",
              "Pop - Up Boutiques",
              "Makeup Classes"
            ],
            "type": "Fashion & Beauty"
          },
          {
            "id": "sijB4Gg4QN19s9AMqMhj",
            "categories": [
              "Family - Friendly Events",
              "Children's Workshops",
              "Kid - Friendly Activities",
              "Amusement Parks"
            ],
            "type": "Family & Kids"
          },
          {
            "id": "sjdp6FasUqwiQKUjcMWn",
            "categories": [
              "Charity Galas",
              "Fundraising Events",
              "Volunteer Opportunities",
              "Community Outreach"
            ],
            "type": "Charity & Fundraising"
          },
          {
            "id": "soLSn7CCaTpCWpPivQ02",
            "categories": [
              "Local Community Events",
              "Environmental Causes",
              "Social Activism",
              "Fundraising for Causes"
            ],
            "type": "Community & Causes"
          },
          {
            "id": "sov9GebkIak29js8eSpH",
            "categories": [
              "Wellness Retreats",
              "Health Workshops",
              "Mindfulness Events",
              "Medical Seminars"
            ],
            "type": "Health & Wellness"
          },
          {
            "id": "spN7oBinGAoYTaelggUs",
            "categories": [
              "Local Community Events",
              "Environmental Causes",
              "Social Activism",
              "Fundraising for Causes"
            ],
            "type": "Community & Causes"
          },
          {
            "id": "spTLCVlw5zmg4JzPRBKM",
            "categories": [
              "Hobbyist Gatherings",
              "Hobby Workshops",
              "Special Interest Groups",
              "Craft Fairs"
            ],
            "type": "Hobbies & Interests"
          },
          {
            "id": "sqrv4ra95uxGu3WTzTc0",
            "categories": [
              "Educational Workshops",
              "Lectures & Talks",
              "Online Courses",
              "Tutoring Services"
            ],
            "type": "Education & Learning"
          },
          {
            "id": "ssMDXaAN58ZoG0bDWDld",
            "categories": [
              "Charity Galas",
              "Fundraising Events",
              "Volunteer Opportunities",
              "Community Outreach"
            ],
            "type": "Charity & Fundraising"
          },
          {
            "id": "stYS2eKdQmYRxfH37ni2",
            "categories": [
              "Science Exhibitions",
              "STEM Workshops",
              "Space & Astronomy",
              "Technology Talks"
            ],
            "type": "Science & Technology"
          },
          {
            "id": "suGNm4ku7jZnRfQEINx0",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "sul2vD3a09PIFVw9AQ0c",
            "categories": [
              "Indian Cuisine",
              "Italian Cuisine",
              "American Fare",
              "Asian Fusion",
              "Mediterranean",
              "Mexican & Tex - Mex",
              "Sushi & Japanese",
              "Chinese Cuisine",
              "French Dining",
              "Vegetarian & Vegan",
              "Seafood Specialties",
              "BBQ & Grill",
              "Steakhouse",
              "Fast Food & Burgers",
              "Cafes & Bakeries",
              "Food Trucks",
              "Fine Dining",
              "Farm - to - Table",
              "Ethnic Eateries"
            ],
            "type": "Food styles"
          },
          {
            "id": "svNqXAX2eVa6qBz9oEvZ",
            "categories": [
              "Science Exhibitions",
              "STEM Workshops",
              "Space & Astronomy",
              "Technology Talks"
            ],
            "type": "Science & Technology"
          },
          {
            "id": "swRHWyAgP99n45MiT7Tg",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "syFmej2gwgBv7loOMCxG",
            "categories": [
              "Local Community Events",
              "Environmental Causes",
              "Social Activism",
              "Fundraising for Causes"
            ],
            "type": "Community & Causes"
          },
          {
            "id": "syTjIxdzroMU1hLPHZxi",
            "categories": [
              "Networking Events",
              "Workshops & Seminars",
              "Conferences",
              "Job Fairs"
            ],
            "type": "Networking & Business"
          },
          {
            "id": "t0bHACwGAY7wCU7cTwUY",
            "categories": [
              "Indian Cuisine",
              "Italian Cuisine",
              "American Fare",
              "Asian Fusion",
              "Mediterranean",
              "Mexican & Tex - Mex",
              "Sushi & Japanese",
              "Chinese Cuisine",
              "French Dining",
              "Vegetarian & Vegan",
              "Seafood Specialties",
              "BBQ & Grill",
              "Steakhouse",
              "Fast Food & Burgers",
              "Cafes & Bakeries",
              "Food Trucks",
              "Fine Dining",
              "Farm - to - Table",
              "Ethnic Eateries"
            ],
            "type": "Food styles"
          },
          {
            "id": "t0lhkxJwCdGvrvrutC87",
            "categories": [
              "Hobbyist Gatherings",
              "Hobby Workshops",
              "Special Interest Groups",
              "Craft Fairs"
            ],
            "type": "Hobbies & Interests"
          },
          {
            "id": "t1jWVGeHlWwu9quG2vS1",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "t3YxnB8eJWTIGY7kB6lZ",
            "categories": [
              "Home Improvement Workshops",
              "Gardening Classes",
              "Home Shows",
              "DIY Events"
            ],
            "type": "Home & Garden"
          },
          {
            "id": "t5yoVpW3yQwlu4n2Ybsz",
            "categories": [
              "Family - Friendly Events",
              "Children's Workshops",
              "Kid - Friendly Activities",
              "Amusement Parks"
            ],
            "type": "Family & Kids"
          },
          {
            "id": "t95anoDW2p6mnZoUx5fF",
            "categories": [
              "Science Exhibitions",
              "STEM Workshops",
              "Space & Astronomy",
              "Technology Talks"
            ],
            "type": "Science & Technology"
          },
          {
            "id": "tDpx6ZyyMpxw99b5b0UF",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "tHVhWPSVaNkUTRxFSrgw",
            "categories": [
              "Fashion Shows",
              "Beauty Workshops",
              "Pop - Up Boutiques",
              "Makeup Classes"
            ],
            "type": "Fashion & Beauty"
          },
          {
            "id": "tHgFNf2SrqIHTKQIeSep",
            "categories": [
              "Science Exhibitions",
              "STEM Workshops",
              "Space & Astronomy",
              "Technology Talks"
            ],
            "type": "Science & Technology"
          },
          {
            "id": "tKH02hTdOSNNVOtQNnIx",
            "categories": [
              "Local Community Events",
              "Environmental Causes",
              "Social Activism",
              "Fundraising for Causes"
            ],
            "type": "Community & Causes"
          },
          {
            "id": "tKeGH0EAQegbt2zjgfOQ",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "tKhE3HU1yGwHD87evNLH",
            "categories": [
              "Pet Adoption Events",
              "Animal Welfare Fundraisers",
              "Pet - Friendly Activities",
              "Zoo Visits"
            ],
            "type": "Pets & Animals"
          },
          {
            "id": "tNc9avCPjD7tX5QLFSAC",
            "categories": [
              "Theater Productions",
              "Magic Shows",
              "Stand - Up Comedy",
              "Movie Screenings"
            ],
            "type": "Entertainment & Shows"
          },
          {
            "id": "tNlf6TDgjZOaA372KfLO",
            "categories": [
              "Local Community Events",
              "Environmental Causes",
              "Social Activism",
              "Fundraising for Causes"
            ],
            "type": "Community & Causes"
          },
          {
            "id": "tOxlv2aE7hzwQXf0P2yl",
            "categories": [
              "Food & Dining",
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Sports & Fitness"
          },
          {
            "id": "tPhqoZVQZIQE05eIhdE2",
            "categories": [
              "Local Community Events",
              "Environmental Causes",
              "Social Activism",
              "Fundraising for Causes"
            ],
            "type": "Community & Causes"
          },
          {
            "id": "tPv8TciN6yetLylFP5qC",
            "categories": [
              "Tech Conferences",
              "Startup Events",
              "Coding Workshops",
              "Tech Expos"
            ],
            "type": "Tech & Innovation"
          },
          {
            "id": "tQf9n8zJLyxZCY2dWX2v",
            "categories": [
              "Pet Adoption Events",
              "Animal Welfare Fundraisers",
              "Pet - Friendly Activities",
              "Zoo Visits"
            ],
            "type": "Pets & Animals"
          },
          {
            "id": "tQrbheRlM8m3vXwN3xpI",
            "categories": [
              "Food & Dining",
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Sports & Fitness"
          },
          {
            "id": "tRRDywIE1DvU6vKiUwom",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "tTJhBQLtQAMtKJQL5OPb",
            "categories": [
              "Charity Galas",
              "Fundraising Events",
              "Volunteer Opportunities",
              "Community Outreach"
            ],
            "type": "Charity & Fundraising"
          },
          {
            "id": "tUyN7Q1l6G1UsqummWX5",
            "categories": [
              "Hobbyist Gatherings",
              "Hobby Workshops",
              "Special Interest Groups",
              "Craft Fairs"
            ],
            "type": "Hobbies & Interests"
          },
          {
            "id": "tVu7MShsw0Ghfamim2GO",
            "categories": [
              "Pet Adoption Events",
              "Animal Welfare Fundraisers",
              "Pet - Friendly Activities",
              "Zoo Visits"
            ],
            "type": "Pets & Animals"
          },
          {
            "id": "tWDY2dAJhFy2touPHBmY",
            "categories": [
              "Wellness Retreats",
              "Health Workshops",
              "Mindfulness Events",
              "Medical Seminars"
            ],
            "type": "Health & Wellness"
          },
          {
            "id": "tWq6wyyJnwcC6vfrWDkn",
            "categories": [
              "Educational Workshops",
              "Lectures & Talks",
              "Online Courses",
              "Tutoring Services"
            ],
            "type": "Education & Learning"
          },
          {
            "id": "tXn3r3ttOXD8LCf8MFSG",
            "categories": [
              "Local Community Events",
              "Environmental Causes",
              "Social Activism",
              "Fundraising for Causes"
            ],
            "type": "Community & Causes"
          },
          {
            "id": "tYlWacNuD6ZC0rpFJlz8",
            "categories": [
              "Local Community Events",
              "Environmental Causes",
              "Social Activism",
              "Fundraising for Causes"
            ],
            "type": "Community & Causes"
          },
          {
            "id": "tZ6nsFpvSumJYwGXpnzk",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "taiuri4hTqjbyBmtbxSy",
            "categories": [
              "Science Exhibitions",
              "STEM Workshops",
              "Space & Astronomy",
              "Technology Talks"
            ],
            "type": "Science & Technology"
          },
          {
            "id": "tbq77Pfj277RiMtQYs8M",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "tcnYZX52XYzGJDbWSMpD",
            "categories": [
              "Wellness Retreats",
              "Health Workshops",
              "Mindfulness Events",
              "Medical Seminars"
            ],
            "type": "Health & Wellness"
          },
          {
            "id": "tcrjuUUEh8CbHJ3IVVg2",
            "categories": [
              "Food & Dining",
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Sports & Fitness"
          },
          {
            "id": "tfWkzjUu3oiLm32wXimo",
            "categories": [
              "Charity Galas",
              "Fundraising Events",
              "Volunteer Opportunities",
              "Community Outreach"
            ],
            "type": "Charity & Fundraising"
          },
          {
            "id": "tgNXVTpjIdQJZdlx81wC",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "th91Plvpd7QyF8utnvL3",
            "categories": [
              "Local Community Events",
              "Environmental Causes",
              "Social Activism",
              "Fundraising for Causes"
            ],
            "type": "Community & Causes"
          },
          {
            "id": "thQxoPCcpZd0M53STAtK",
            "categories": [
              "Indian Cuisine",
              "Italian Cuisine",
              "American Fare",
              "Asian Fusion",
              "Mediterranean",
              "Mexican & Tex - Mex",
              "Sushi & Japanese",
              "Chinese Cuisine",
              "French Dining",
              "Vegetarian & Vegan",
              "Seafood Specialties",
              "BBQ & Grill",
              "Steakhouse",
              "Fast Food & Burgers",
              "Cafes & Bakeries",
              "Food Trucks",
              "Fine Dining",
              "Farm - to - Table",
              "Ethnic Eateries"
            ],
            "type": "Food styles"
          },
          {
            "id": "tkTbs5Z0Lt9xLIHMVLQ8",
            "categories": [
              "Local Community Events",
              "Environmental Causes",
              "Social Activism",
              "Fundraising for Causes"
            ],
            "type": "Community & Causes"
          },
          {
            "id": "tkkO7EWubJq6wOwCE895",
            "categories": [
              "Networking Events",
              "Workshops & Seminars",
              "Conferences",
              "Job Fairs"
            ],
            "type": "Networking & Business"
          },
          {
            "id": "tnaBTgLQcAB1qLfRyGLx",
            "categories": [
              "Tech Conferences",
              "Startup Events",
              "Coding Workshops",
              "Tech Expos"
            ],
            "type": "Tech & Innovation"
          },
          {
            "id": "trmwLaWIkwQtKBMHIbIX",
            "categories": [
              "Networking Events",
              "Workshops & Seminars",
              "Conferences",
              "Job Fairs"
            ],
            "type": "Networking & Business"
          },
          {
            "id": "ttB846U9KeLRt7Ci9NcF",
            "categories": [
              "Fashion Shows",
              "Beauty Workshops",
              "Pop - Up Boutiques",
              "Makeup Classes"
            ],
            "type": "Fashion & Beauty"
          },
          {
            "id": "tuWFU25DZmAsgYjjOnDx",
            "categories": [
              "Tech Conferences",
              "Startup Events",
              "Coding Workshops",
              "Tech Expos"
            ],
            "type": "Tech & Innovation"
          },
          {
            "id": "tuxz7CAoz4eXFIlS4BaM",
            "categories": [
              "Religious Gatherings",
              "Spiritual Retreats",
              "Meditation Groups",
              "Interfaith Dialogues"
            ],
            "type": "Religion & Spirituality"
          },
          {
            "id": "tvJOzQd4y07kkFR6gQuk",
            "categories": [
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Food & Dining"
          },
          {
            "id": "twD6H6aGLqCPOeVRBrgo",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "ty41HwVJMLUQ9yPNPzYS",
            "categories": [
              "Theater Productions",
              "Magic Shows",
              "Stand - Up Comedy",
              "Movie Screenings"
            ],
            "type": "Entertainment & Shows"
          },
          {
            "id": "u0E3Q8RfilHDGdpIORrn",
            "categories": [
              "Fashion Shows",
              "Beauty Workshops",
              "Pop - Up Boutiques",
              "Makeup Classes"
            ],
            "type": "Fashion & Beauty"
          },
          {
            "id": "u1IEAWo6Y345FsHYwKjW",
            "categories": [
              "Indian Cuisine",
              "Italian Cuisine",
              "American Fare",
              "Asian Fusion",
              "Mediterranean",
              "Mexican & Tex - Mex",
              "Sushi & Japanese",
              "Chinese Cuisine",
              "French Dining",
              "Vegetarian & Vegan",
              "Seafood Specialties",
              "BBQ & Grill",
              "Steakhouse",
              "Fast Food & Burgers",
              "Cafes & Bakeries",
              "Food Trucks",
              "Fine Dining",
              "Farm - to - Table",
              "Ethnic Eateries"
            ],
            "type": "Food styles"
          },
          {
            "id": "u366ljzHxG333l0HwcCr",
            "categories": [
              "Hobbyist Gatherings",
              "Hobby Workshops",
              "Special Interest Groups",
              "Craft Fairs"
            ],
            "type": "Hobbies & Interests"
          },
          {
            "id": "u49K42uHZZzyRjOUlSeW",
            "categories": [
              "Family - Friendly Events",
              "Children's Workshops",
              "Kid - Friendly Activities",
              "Amusement Parks"
            ],
            "type": "Family & Kids"
          },
          {
            "id": "u4ajNVYwMntPPcP2Je1Y",
            "categories": [
              "Sporting Events",
              "Fitness Classes",
              "Yoga & Meditation",
              "Outdoor Activities"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "u6BKNHPNPNCupkzSyos4",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "u7VO5Xhw2ngqu7Oq8t6n",
            "categories": [
              "Pet Adoption Events",
              "Animal Welfare Fundraisers",
              "Pet - Friendly Activities",
              "Zoo Visits"
            ],
            "type": "Pets & Animals"
          },
          {
            "id": "uA5R5PnsTcPxb99HwmaU",
            "categories": [
              "Indian Cuisine",
              "Italian Cuisine",
              "American Fare",
              "Asian Fusion",
              "Mediterranean",
              "Mexican & Tex - Mex",
              "Sushi & Japanese",
              "Chinese Cuisine",
              "French Dining",
              "Vegetarian & Vegan",
              "Seafood Specialties",
              "BBQ & Grill",
              "Steakhouse",
              "Fast Food & Burgers",
              "Cafes & Bakeries",
              "Food Trucks",
              "Fine Dining",
              "Farm - to - Table",
              "Ethnic Eateries"
            ],
            "type": "Food styles"
          },
          {
            "id": "uGSXC3rpmU1wBidY09U0",
            "categories": [
              "Religious Gatherings",
              "Spiritual Retreats",
              "Meditation Groups",
              "Interfaith Dialogues"
            ],
            "type": "Religion & Spirituality"
          },
          {
            "id": "uKosp7GC0MwOzeGup6U9",
            "categories": [
              "Sporting Events",
              "Fitness Classes",
              "Yoga & Meditation",
              "Outdoor Activities"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "uMQtf1s9Y0nyAqmmLp0R",
            "categories": [
              "Food & Dining",
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Sports & Fitness"
          },
          {
            "id": "uMu8mwdJi0Ag4rnmD2cq",
            "categories": [
              "Educational Workshops",
              "Lectures & Talks",
              "Online Courses",
              "Tutoring Services"
            ],
            "type": "Education & Learning"
          },
          {
            "id": "uNsTlkds03pTOYzGwI93",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "uVNlRQOCIVIcjyuucwHr",
            "categories": [
              "Religious Gatherings",
              "Spiritual Retreats",
              "Meditation Groups",
              "Interfaith Dialogues"
            ],
            "type": "Religion & Spirituality"
          },
          {
            "id": "uW4uEdnzktg4gyICZksa",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "uWAiSTM56lucw8KMwVUS",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "uXASjegBCyUJsrvfsiHw",
            "categories": [
              "Family - Friendly Events",
              "Children's Workshops",
              "Kid - Friendly Activities",
              "Amusement Parks"
            ],
            "type": "Family & Kids"
          },
          {
            "id": "uaAhsBcs0zyPermiyflp",
            "categories": [
              "Science Exhibitions",
              "STEM Workshops",
              "Space & Astronomy",
              "Technology Talks"
            ],
            "type": "Science & Technology"
          },
          {
            "id": "uaRld8EkAWiJioOWDCFh",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "uku1GbJlpFdMJ73oR32L",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "up8Vxmk4wz9j6VdV1o2w",
            "categories": [
              "Charity Galas",
              "Fundraising Events",
              "Volunteer Opportunities",
              "Community Outreach"
            ],
            "type": "Charity & Fundraising"
          },
          {
            "id": "urQy5b8IHCAvg4snitq3",
            "categories": [
              "Family - Friendly Events",
              "Children's Workshops",
              "Kid - Friendly Activities",
              "Amusement Parks"
            ],
            "type": "Family & Kids"
          },
          {
            "id": "usMzGy7KNjh3WDNJW2sd",
            "categories": [
              "Charity Galas",
              "Fundraising Events",
              "Volunteer Opportunities",
              "Community Outreach"
            ],
            "type": "Charity & Fundraising"
          },
          {
            "id": "ut8EMpdlJqlYCkaUMNck",
            "categories": [
              "Educational Workshops",
              "Lectures & Talks",
              "Online Courses",
              "Tutoring Services"
            ],
            "type": "Education & Learning"
          },
          {
            "id": "uvsYFjQEDtke4C6f0jH1",
            "categories": [
              "Local Community Events",
              "Environmental Causes",
              "Social Activism",
              "Fundraising for Causes"
            ],
            "type": "Community & Causes"
          },
          {
            "id": "uwWoGj4oK3z6uJV2bNiO",
            "categories": [
              "Theater Productions",
              "Magic Shows",
              "Stand - Up Comedy",
              "Movie Screenings"
            ],
            "type": "Entertainment & Shows"
          },
          {
            "id": "uxlrNihDQOlFDV1HBXhD",
            "categories": [
              "Local Community Events",
              "Environmental Causes",
              "Social Activism",
              "Fundraising for Causes"
            ],
            "type": "Community & Causes"
          },
          {
            "id": "uxxZpGmHhtx9XQ6opwCn",
            "categories": [
              "Wellness Retreats",
              "Health Workshops",
              "Mindfulness Events",
              "Medical Seminars"
            ],
            "type": "Health & Wellness"
          },
          {
            "id": "uz2smcWXiZ46SVBViQsS",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "v0QOJqySO8W63LZEtwgl",
            "categories": [
              "Local Community Events",
              "Environmental Causes",
              "Social Activism",
              "Fundraising for Causes"
            ],
            "type": "Community & Causes"
          },
          {
            "id": "v2Vxd9cSvIz4X7wjerWs",
            "categories": [
              "Home Improvement Workshops",
              "Gardening Classes",
              "Home Shows",
              "DIY Events"
            ],
            "type": "Home & Garden"
          },
          {
            "id": "v3K4pqOSF7sm6UcAtQtK",
            "categories": [
              "Pet Adoption Events",
              "Animal Welfare Fundraisers",
              "Pet - Friendly Activities",
              "Zoo Visits"
            ],
            "type": "Pets & Animals"
          },
          {
            "id": "v4AFegSsh5xBDFfjpHCv",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "v57oTgSVZFMVIwpT38uc",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "v5QJKNzbQsMHTiVwxeDv",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "v5aSIxuXmQ7Cxi6LXR0p",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "v6UXxodOCHNtNCIBMWzL",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "v87jkJr4hT1NquzgdS79",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "v9LyDvB0yL0Ir0Bgdsby",
            "categories": [
              "Family - Friendly Events",
              "Children's Workshops",
              "Kid - Friendly Activities",
              "Amusement Parks"
            ],
            "type": "Family & Kids"
          },
          {
            "id": "vBRbn6qBaLP5nwhKRmw7",
            "categories": [
              "Travel Expos",
              "Adventure Tours",
              "Backpacking Trips",
              "Cultural Experiences"
            ],
            "type": "Travel & Adventure"
          },
          {
            "id": "vCfojlEApoJAUo5qxHuQ",
            "categories": [
              "Hobbyist Gatherings",
              "Hobby Workshops",
              "Special Interest Groups",
              "Craft Fairs"
            ],
            "type": "Hobbies & Interests"
          },
          {
            "id": "vHkGarh0CefpHOqszX2e",
            "categories": [
              "Family - Friendly Events",
              "Children's Workshops",
              "Kid - Friendly Activities",
              "Amusement Parks"
            ],
            "type": "Family & Kids"
          },
          {
            "id": "vLtIrhlFr9nuKK83dDJz",
            "categories": [
              "Indian Cuisine",
              "Italian Cuisine",
              "American Fare",
              "Asian Fusion",
              "Mediterranean",
              "Mexican & Tex - Mex",
              "Sushi & Japanese",
              "Chinese Cuisine",
              "French Dining",
              "Vegetarian & Vegan",
              "Seafood Specialties",
              "BBQ & Grill",
              "Steakhouse",
              "Fast Food & Burgers",
              "Cafes & Bakeries",
              "Food Trucks",
              "Fine Dining",
              "Farm - to - Table",
              "Ethnic Eateries"
            ],
            "type": "Food styles"
          },
          {
            "id": "vMVohFmXwh97lilOCKQn",
            "categories": [
              "Science Exhibitions",
              "STEM Workshops",
              "Space & Astronomy",
              "Technology Talks"
            ],
            "type": "Science & Technology"
          },
          {
            "id": "vNSYdguOPabf5n5DgFBZ",
            "categories": [
              "Charity Galas",
              "Fundraising Events",
              "Volunteer Opportunities",
              "Community Outreach"
            ],
            "type": "Charity & Fundraising"
          },
          {
            "id": "vNZacjqGGJPWH3bnxgAR",
            "categories": [
              "Food & Dining",
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Sports & Fitness"
          },
          {
            "id": "vNgM7TBseaWl0pJjgbka",
            "categories": [
              "Religious Gatherings",
              "Spiritual Retreats",
              "Meditation Groups",
              "Interfaith Dialogues"
            ],
            "type": "Religion & Spirituality"
          },
          {
            "id": "vNoaTBiR6ITIoJwwCNeL",
            "categories": [
              "Wellness Retreats",
              "Health Workshops",
              "Mindfulness Events",
              "Medical Seminars"
            ],
            "type": "Health & Wellness"
          },
          {
            "id": "vOs8SgrKep8E8TM51Fqg",
            "categories": [
              "Indian Cuisine",
              "Italian Cuisine",
              "American Fare",
              "Asian Fusion",
              "Mediterranean",
              "Mexican & Tex - Mex",
              "Sushi & Japanese",
              "Chinese Cuisine",
              "French Dining",
              "Vegetarian & Vegan",
              "Seafood Specialties",
              "BBQ & Grill",
              "Steakhouse",
              "Fast Food & Burgers",
              "Cafes & Bakeries",
              "Food Trucks",
              "Fine Dining",
              "Farm - to - Table",
              "Ethnic Eateries"
            ],
            "type": "Food styles"
          },
          {
            "id": "vRPi6GiwR2SsDuSbTT4k",
            "categories": [
              "Tech Conferences",
              "Startup Events",
              "Coding Workshops",
              "Tech Expos"
            ],
            "type": "Tech & Innovation"
          },
          {
            "id": "vSTBodEcShTCyJb2VR6V",
            "categories": [
              "Sporting Events",
              "Fitness Classes",
              "Yoga & Meditation",
              "Outdoor Activities"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "vSsLgdB4O47tAFTjja3d",
            "categories": [
              "Pet Adoption Events",
              "Animal Welfare Fundraisers",
              "Pet - Friendly Activities",
              "Zoo Visits"
            ],
            "type": "Pets & Animals"
          },
          {
            "id": "vVWrQdslX4rxH6lDEg06",
            "categories": [
              "Tech Conferences",
              "Startup Events",
              "Coding Workshops",
              "Tech Expos"
            ],
            "type": "Tech & Innovation"
          },
          {
            "id": "vVZNOxTWcK3eadwgWn0o",
            "categories": [
              "Charity Galas",
              "Fundraising Events",
              "Volunteer Opportunities",
              "Community Outreach"
            ],
            "type": "Charity & Fundraising"
          },
          {
            "id": "vZhWAlB8J7eTdblmNogo",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "vaQ9prs2uAdmuNamxv0g",
            "categories": [
              "Home Improvement Workshops",
              "Gardening Classes",
              "Home Shows",
              "DIY Events"
            ],
            "type": "Home & Garden"
          },
          {
            "id": "vbHtjIP4dhoupCq9ypxL",
            "categories": [
              "Home Improvement Workshops",
              "Gardening Classes",
              "Home Shows",
              "DIY Events"
            ],
            "type": "Home & Garden"
          },
          {
            "id": "vcS8EePxeJrwwXpfY16j",
            "categories": [
              "Travel Expos",
              "Adventure Tours",
              "Backpacking Trips",
              "Cultural Experiences"
            ],
            "type": "Travel & Adventure"
          },
          {
            "id": "vdGRFKvirX8T2FGcszjy",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "vfOoEmUKsMMs5xFFm3Ge",
            "categories": [
              "Science Exhibitions",
              "STEM Workshops",
              "Space & Astronomy",
              "Technology Talks"
            ],
            "type": "Science & Technology"
          },
          {
            "id": "vfg1OBTpd342iKguXLdj",
            "categories": [
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Food & Dining"
          },
          {
            "id": "vgH49NuJnEtOL7Rtmlez",
            "categories": [
              "Educational Workshops",
              "Lectures & Talks",
              "Online Courses",
              "Tutoring Services"
            ],
            "type": "Education & Learning"
          },
          {
            "id": "vhKOoNp8Cm9Lpmi5XPJh",
            "categories": [
              "Networking Events",
              "Workshops & Seminars",
              "Conferences",
              "Job Fairs"
            ],
            "type": "Networking & Business"
          },
          {
            "id": "vpjWGsPigNPVdrqKzJbU",
            "categories": [
              "Networking Events",
              "Workshops & Seminars",
              "Conferences",
              "Job Fairs"
            ],
            "type": "Networking & Business"
          },
          {
            "id": "vpz90UGUnxHNECJ4tRpb",
            "categories": [
              "Wellness Retreats",
              "Health Workshops",
              "Mindfulness Events",
              "Medical Seminars"
            ],
            "type": "Health & Wellness"
          },
          {
            "id": "vxKEu9OhGaljt0o0nKQq",
            "categories": [
              "Hobbyist Gatherings",
              "Hobby Workshops",
              "Special Interest Groups",
              "Craft Fairs"
            ],
            "type": "Hobbies & Interests"
          },
          {
            "id": "w0d2BVjuIrzfh7PIVwb3",
            "categories": [
              "Sporting Events",
              "Fitness Classes",
              "Yoga & Meditation",
              "Outdoor Activities"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "w7by3zmTuFAwn6nHduFx",
            "categories": [
              "Food & Dining",
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Sports & Fitness"
          },
          {
            "id": "w889nxD7rLWNm4EiLqpJ",
            "categories": [
              "Religious Gatherings",
              "Spiritual Retreats",
              "Meditation Groups",
              "Interfaith Dialogues"
            ],
            "type": "Religion & Spirituality"
          },
          {
            "id": "w9SKNLgtSeTgMyWLhDLd",
            "categories": [
              "Home Improvement Workshops",
              "Gardening Classes",
              "Home Shows",
              "DIY Events"
            ],
            "type": "Home & Garden"
          },
          {
            "id": "w9hkS9xcoaHKR0fKNciX",
            "categories": [
              "Educational Workshops",
              "Lectures & Talks",
              "Online Courses",
              "Tutoring Services"
            ],
            "type": "Education & Learning"
          },
          {
            "id": "wCA9ugtmcsrlNYmCH6al",
            "categories": [
              "Food & Dining",
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Sports & Fitness"
          },
          {
            "id": "wCDeTt26k9rdUJIKozlS",
            "categories": [
              "Travel Expos",
              "Adventure Tours",
              "Backpacking Trips",
              "Cultural Experiences"
            ],
            "type": "Travel & Adventure"
          },
          {
            "id": "wIkdFNIpGS3LfEadiJ73",
            "categories": [
              "Pet Adoption Events",
              "Animal Welfare Fundraisers",
              "Pet - Friendly Activities",
              "Zoo Visits"
            ],
            "type": "Pets & Animals"
          },
          {
            "id": "wJwCdqAq5iezl9nGowxd",
            "categories": [
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Food & Dining"
          },
          {
            "id": "wKvq6RZBYZruzuhOH6Eb",
            "categories": [
              "Educational Workshops",
              "Lectures & Talks",
              "Online Courses",
              "Tutoring Services"
            ],
            "type": "Education & Learning"
          },
          {
            "id": "wLskW8SSP8wXacsZu95u",
            "categories": [
              "Local Community Events",
              "Environmental Causes",
              "Social Activism",
              "Fundraising for Causes"
            ],
            "type": "Community & Causes"
          },
          {
            "id": "wMHegGUPtqcDMMuCFLiN",
            "categories": [
              "Theater Productions",
              "Magic Shows",
              "Stand - Up Comedy",
              "Movie Screenings"
            ],
            "type": "Entertainment & Shows"
          },
          {
            "id": "wMkFUlWeUjbqRWrM5WKj",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "wN8eVkbU5PaAniZ15PPc",
            "categories": [
              "Home Improvement Workshops",
              "Gardening Classes",
              "Home Shows",
              "DIY Events"
            ],
            "type": "Home & Garden"
          },
          {
            "id": "wNXoZSckUOuaCHUeyr1L",
            "categories": [
              "Religious Gatherings",
              "Spiritual Retreats",
              "Meditation Groups",
              "Interfaith Dialogues"
            ],
            "type": "Religion & Spirituality"
          },
          {
            "id": "wNYC7DMDuRHsFT3LbJ7u",
            "categories": [
              "Fashion Shows",
              "Beauty Workshops",
              "Pop - Up Boutiques",
              "Makeup Classes"
            ],
            "type": "Fashion & Beauty"
          },
          {
            "id": "wNePNExPBd1kpz3rkKxb",
            "categories": [
              "Theater Productions",
              "Magic Shows",
              "Stand - Up Comedy",
              "Movie Screenings"
            ],
            "type": "Entertainment & Shows"
          },
          {
            "id": "wOMzbJWxRnNvjEyuW0zS",
            "categories": [
              "Home Improvement Workshops",
              "Gardening Classes",
              "Home Shows",
              "DIY Events"
            ],
            "type": "Home & Garden"
          },
          {
            "id": "wOtDUFEYW15k7NcWENaL",
            "categories": [
              "Indian Cuisine",
              "Italian Cuisine",
              "American Fare",
              "Asian Fusion",
              "Mediterranean",
              "Mexican & Tex - Mex",
              "Sushi & Japanese",
              "Chinese Cuisine",
              "French Dining",
              "Vegetarian & Vegan",
              "Seafood Specialties",
              "BBQ & Grill",
              "Steakhouse",
              "Fast Food & Burgers",
              "Cafes & Bakeries",
              "Food Trucks",
              "Fine Dining",
              "Farm - to - Table",
              "Ethnic Eateries"
            ],
            "type": "Food styles"
          },
          {
            "id": "wQRs3ZQNFHmJ80hboHhw",
            "categories": [
              "Science Exhibitions",
              "STEM Workshops",
              "Space & Astronomy",
              "Technology Talks"
            ],
            "type": "Science & Technology"
          },
          {
            "id": "wQdU6apq7TCf44110U10",
            "categories": [
              "Networking Events",
              "Workshops & Seminars",
              "Conferences",
              "Job Fairs"
            ],
            "type": "Networking & Business"
          },
          {
            "id": "wRIdl8z3qmanef7DPuYR",
            "categories": [
              "Science Exhibitions",
              "STEM Workshops",
              "Space & Astronomy",
              "Technology Talks"
            ],
            "type": "Science & Technology"
          },
          {
            "id": "wRQezRRNJrZpE3H1rEgt",
            "categories": [
              "Hobbyist Gatherings",
              "Hobby Workshops",
              "Special Interest Groups",
              "Craft Fairs"
            ],
            "type": "Hobbies & Interests"
          },
          {
            "id": "wTLbmfHNIT2b8WENEnI6",
            "categories": [
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Food & Dining"
          },
          {
            "id": "wTWqtkz8QkIkS6bkenBa",
            "categories": [
              "Food & Dining",
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Sports & Fitness"
          },
          {
            "id": "wTmD7qQgaoGDpxaeZMtw",
            "categories": [
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Food & Dining"
          },
          {
            "id": "wU8opxO19N0pskbnePv0",
            "categories": [
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Food & Dining"
          },
          {
            "id": "wUFo6nbHsb6wPf9PfL1P",
            "categories": [
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Food & Dining"
          },
          {
            "id": "wWzbnHFUWytL1ltN1kdx",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "wYJDSuJiom6ViqaejPdU",
            "categories": [
              "Tech Conferences",
              "Startup Events",
              "Coding Workshops",
              "Tech Expos"
            ],
            "type": "Tech & Innovation"
          },
          {
            "id": "wYdaHOTuAkzkfmKBpNlk",
            "categories": [
              "Wellness Retreats",
              "Health Workshops",
              "Mindfulness Events",
              "Medical Seminars"
            ],
            "type": "Health & Wellness"
          },
          {
            "id": "wZiG6dUJcU6Hjo93zsbW",
            "categories": [
              "Educational Workshops",
              "Lectures & Talks",
              "Online Courses",
              "Tutoring Services"
            ],
            "type": "Education & Learning"
          },
          {
            "id": "wbW381uIazrHF2OdToPl",
            "categories": [
              "Theater Productions",
              "Magic Shows",
              "Stand - Up Comedy",
              "Movie Screenings"
            ],
            "type": "Entertainment & Shows"
          },
          {
            "id": "wdsYZXcokMY3jik42rl3",
            "categories": [
              "Fashion Shows",
              "Beauty Workshops",
              "Pop - Up Boutiques",
              "Makeup Classes"
            ],
            "type": "Fashion & Beauty"
          },
          {
            "id": "wiiTtUDzqmW00SzA7iOt",
            "categories": [
              "Science Exhibitions",
              "STEM Workshops",
              "Space & Astronomy",
              "Technology Talks"
            ],
            "type": "Science & Technology"
          },
          {
            "id": "wkBw73U7DHb3bUKWU1FA",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "wlHzvNNYXDBeW1FZvfJA",
            "categories": [
              "Travel Expos",
              "Adventure Tours",
              "Backpacking Trips",
              "Cultural Experiences"
            ],
            "type": "Travel & Adventure"
          },
          {
            "id": "wpcQHO991pSse1kdKk2M",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "wriTq6rlsyZybJm0Q5Sc",
            "categories": [
              "Religious Gatherings",
              "Spiritual Retreats",
              "Meditation Groups",
              "Interfaith Dialogues"
            ],
            "type": "Religion & Spirituality"
          },
          {
            "id": "wvBGNH4hwc2WDmyIxxRQ",
            "categories": [
              "Charity Galas",
              "Fundraising Events",
              "Volunteer Opportunities",
              "Community Outreach"
            ],
            "type": "Charity & Fundraising"
          },
          {
            "id": "wx7C36UUOqs9CK44SkYl",
            "categories": [
              "Local Community Events",
              "Environmental Causes",
              "Social Activism",
              "Fundraising for Causes"
            ],
            "type": "Community & Causes"
          },
          {
            "id": "x1GWuSNqAfglzu9mjyln",
            "categories": [
              "Charity Galas",
              "Fundraising Events",
              "Volunteer Opportunities",
              "Community Outreach"
            ],
            "type": "Charity & Fundraising"
          },
          {
            "id": "x1cswWVerut8CIpw1f0j",
            "categories": [
              "Indian Cuisine",
              "Italian Cuisine",
              "American Fare",
              "Asian Fusion",
              "Mediterranean",
              "Mexican & Tex - Mex",
              "Sushi & Japanese",
              "Chinese Cuisine",
              "French Dining",
              "Vegetarian & Vegan",
              "Seafood Specialties",
              "BBQ & Grill",
              "Steakhouse",
              "Fast Food & Burgers",
              "Cafes & Bakeries",
              "Food Trucks",
              "Fine Dining",
              "Farm - to - Table",
              "Ethnic Eateries"
            ],
            "type": "Food styles"
          },
          {
            "id": "x31DN9mfnd0g80KCyfxr",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "xAZ7cvHzf4HWNute5Wm2",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "xClNBpRRUGqHiiA6prNa",
            "categories": [
              "Charity Galas",
              "Fundraising Events",
              "Volunteer Opportunities",
              "Community Outreach"
            ],
            "type": "Charity & Fundraising"
          },
          {
            "id": "xCrJhWlxjcRM5Ridg3e6",
            "categories": [
              "Family - Friendly Events",
              "Children's Workshops",
              "Kid - Friendly Activities",
              "Amusement Parks"
            ],
            "type": "Family & Kids"
          },
          {
            "id": "xEUsLk9FHrbZcSCbfPpH",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "xG2yvloDaSbj2iH567Yi",
            "categories": [
              "Theater Productions",
              "Magic Shows",
              "Stand - Up Comedy",
              "Movie Screenings"
            ],
            "type": "Entertainment & Shows"
          },
          {
            "id": "xG5Fr0YVwSEVyPzj4ekO",
            "categories": [
              "Local Community Events",
              "Environmental Causes",
              "Social Activism",
              "Fundraising for Causes"
            ],
            "type": "Community & Causes"
          },
          {
            "id": "xIjoC8VXFzSsMBPv6f4m",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "xIsVz5K7eeOMTKqCar0X",
            "categories": [
              "Pet Adoption Events",
              "Animal Welfare Fundraisers",
              "Pet - Friendly Activities",
              "Zoo Visits"
            ],
            "type": "Pets & Animals"
          },
          {
            "id": "xJeQYgKzTXkwOcAc0jXk",
            "categories": [
              "Theater Productions",
              "Magic Shows",
              "Stand - Up Comedy",
              "Movie Screenings"
            ],
            "type": "Entertainment & Shows"
          },
          {
            "id": "xJqXWptkhIHvHFAPOT5k",
            "categories": [
              "Fashion Shows",
              "Beauty Workshops",
              "Pop - Up Boutiques",
              "Makeup Classes"
            ],
            "type": "Fashion & Beauty"
          },
          {
            "id": "xLgYfvA9kxhN21dJWKjb",
            "categories": [
              "Theater Productions",
              "Magic Shows",
              "Stand - Up Comedy",
              "Movie Screenings"
            ],
            "type": "Entertainment & Shows"
          },
          {
            "id": "xMpWsWZopNISY6qhge93",
            "categories": [
              "Family - Friendly Events",
              "Children's Workshops",
              "Kid - Friendly Activities",
              "Amusement Parks"
            ],
            "type": "Family & Kids"
          },
          {
            "id": "xOvt4ccSKgmSEM9FHU6K",
            "categories": [
              "Charity Galas",
              "Fundraising Events",
              "Volunteer Opportunities",
              "Community Outreach"
            ],
            "type": "Charity & Fundraising"
          },
          {
            "id": "xSKZ6r0umaiUOLRnmgNK",
            "categories": [
              "Travel Expos",
              "Adventure Tours",
              "Backpacking Trips",
              "Cultural Experiences"
            ],
            "type": "Travel & Adventure"
          },
          {
            "id": "xUp70s14ggdemqwkq3mS",
            "categories": [
              "Home Improvement Workshops",
              "Gardening Classes",
              "Home Shows",
              "DIY Events"
            ],
            "type": "Home & Garden"
          },
          {
            "id": "xVqF8QtZYghQlS56X5nM",
            "categories": [
              "Wellness Retreats",
              "Health Workshops",
              "Mindfulness Events",
              "Medical Seminars"
            ],
            "type": "Health & Wellness"
          },
          {
            "id": "xXMSXYtu4uZqxG5uKZJx",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "xYtgEtcDxctr5HRHEw5x",
            "categories": [
              "Religious Gatherings",
              "Spiritual Retreats",
              "Meditation Groups",
              "Interfaith Dialogues"
            ],
            "type": "Religion & Spirituality"
          },
          {
            "id": "xZu7xoLmx4JTfHlIT3Zr",
            "categories": [
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Food & Dining"
          },
          {
            "id": "xaQOc1D8OXohN01HwXXn",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "xd4ovqqsguW9A5md1A6z",
            "categories": [
              "Wellness Retreats",
              "Health Workshops",
              "Mindfulness Events",
              "Medical Seminars"
            ],
            "type": "Health & Wellness"
          },
          {
            "id": "xeysgEuqqhqWUWnc5Wcg",
            "categories": [
              "Sporting Events",
              "Fitness Classes",
              "Yoga & Meditation",
              "Outdoor Activities"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "xhtXSoLl3n2L0GVklBBs",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "xmCatKTCNjK6vxcPkUGq",
            "categories": [
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Food & Dining"
          },
          {
            "id": "xobMpyQHbnw14vD1gMhQ",
            "categories": [
              "Pet Adoption Events",
              "Animal Welfare Fundraisers",
              "Pet - Friendly Activities",
              "Zoo Visits"
            ],
            "type": "Pets & Animals"
          },
          {
            "id": "xowlhH33RcQzDpdnhwla",
            "categories": [
              "Educational Workshops",
              "Lectures & Talks",
              "Online Courses",
              "Tutoring Services"
            ],
            "type": "Education & Learning"
          },
          {
            "id": "xqIeThiGbBssydqHYjcY",
            "categories": [
              "Networking Events",
              "Workshops & Seminars",
              "Conferences",
              "Job Fairs"
            ],
            "type": "Networking & Business"
          },
          {
            "id": "xr4X416fYeXgjiFcKD0M",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "xyMx8Wjhjz2EzuWjHbAO",
            "categories": [
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Food & Dining"
          },
          {
            "id": "xyQzik0VkF6bGvaHTU7E",
            "categories": [
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Food & Dining"
          },
          {
            "id": "xyhyMnJHnuPVitchhCMS",
            "categories": [
              "Wellness Retreats",
              "Health Workshops",
              "Mindfulness Events",
              "Medical Seminars"
            ],
            "type": "Health & Wellness"
          },
          {
            "id": "xynx0HMSdJ6zJl2ki65A",
            "categories": [
              "Home Improvement Workshops",
              "Gardening Classes",
              "Home Shows",
              "DIY Events"
            ],
            "type": "Home & Garden"
          },
          {
            "id": "xzUYVzXBHys5ZO2ixYmh",
            "categories": [
              "Family - Friendly Events",
              "Children's Workshops",
              "Kid - Friendly Activities",
              "Amusement Parks"
            ],
            "type": "Family & Kids"
          },
          {
            "id": "xzZMUEpiE1YBu2Wy2Air",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "y13cuMCW3La96jqXfiMK",
            "categories": [
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Food & Dining"
          },
          {
            "id": "y1En8CO6WasLp9sEfy1i",
            "categories": [
              "Sporting Events",
              "Fitness Classes",
              "Yoga & Meditation",
              "Outdoor Activities"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "y4QMwzHx8Pmc1A6J0wk5",
            "categories": [
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Food & Dining"
          },
          {
            "id": "y5OA2RCpMpUR2d4ihrPr",
            "categories": [
              "Home Improvement Workshops",
              "Gardening Classes",
              "Home Shows",
              "DIY Events"
            ],
            "type": "Home & Garden"
          },
          {
            "id": "y6GWmNg2gALW3arblZjg",
            "categories": [
              "Sporting Events",
              "Fitness Classes",
              "Yoga & Meditation",
              "Outdoor Activities"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "y7SQwdGV9QgRZZQN3QxC",
            "categories": [
              "Charity Galas",
              "Fundraising Events",
              "Volunteer Opportunities",
              "Community Outreach"
            ],
            "type": "Charity & Fundraising"
          },
          {
            "id": "yAI2kufaWvUIYPeJypUz",
            "categories": [
              "Home Improvement Workshops",
              "Gardening Classes",
              "Home Shows",
              "DIY Events"
            ],
            "type": "Home & Garden"
          },
          {
            "id": "yASzcnTSuvEQlE5nkaqg",
            "categories": [
              "Food & Dining",
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Sports & Fitness"
          },
          {
            "id": "yJ3XYCw22PzfBCSZ5PUD",
            "categories": [
              "Home Improvement Workshops",
              "Gardening Classes",
              "Home Shows",
              "DIY Events"
            ],
            "type": "Home & Garden"
          },
          {
            "id": "yJtqqprnvp3AI5OKY8vA",
            "categories": [
              "Family - Friendly Events",
              "Children's Workshops",
              "Kid - Friendly Activities",
              "Amusement Parks"
            ],
            "type": "Family & Kids"
          },
          {
            "id": "yK937YRIY8DIdclvbM2b",
            "categories": [
              "Charity Galas",
              "Fundraising Events",
              "Volunteer Opportunities",
              "Community Outreach"
            ],
            "type": "Charity & Fundraising"
          },
          {
            "id": "yL3YPC2jE8lMZZNutPm6",
            "categories": [
              "Travel Expos",
              "Adventure Tours",
              "Backpacking Trips",
              "Cultural Experiences"
            ],
            "type": "Travel & Adventure"
          },
          {
            "id": "yNrpijZtCp6Cr3Dez9Gy",
            "categories": [
              "Local Community Events",
              "Environmental Causes",
              "Social Activism",
              "Fundraising for Causes"
            ],
            "type": "Community & Causes"
          },
          {
            "id": "yOGjafTzwQKc5IagGSEg",
            "categories": [
              "Food & Dining",
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Sports & Fitness"
          },
          {
            "id": "yP0FViHwuk523sran5fl",
            "categories": [
              "Science Exhibitions",
              "STEM Workshops",
              "Space & Astronomy",
              "Technology Talks"
            ],
            "type": "Science & Technology"
          },
          {
            "id": "yPh5HzYhAJh302Snd497",
            "categories": [
              "Pet Adoption Events",
              "Animal Welfare Fundraisers",
              "Pet - Friendly Activities",
              "Zoo Visits"
            ],
            "type": "Pets & Animals"
          },
          {
            "id": "yPuoil6d7oGXadAbFZOo",
            "categories": [
              "Sporting Events",
              "Fitness Classes",
              "Yoga & Meditation",
              "Outdoor Activities"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "yQDnu3WJa7FRolFPNGG0",
            "categories": [
              "Charity Galas",
              "Fundraising Events",
              "Volunteer Opportunities",
              "Community Outreach"
            ],
            "type": "Charity & Fundraising"
          },
          {
            "id": "yS861eXWp62NEVjqbpPv",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "yT8gIzlfdXlOYIDQQVX5",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "yVn9fwkArIHx2yNeEuIX",
            "categories": [
              "Science Exhibitions",
              "STEM Workshops",
              "Space & Astronomy",
              "Technology Talks"
            ],
            "type": "Science & Technology"
          },
          {
            "id": "yW9wy484TA5Z1QZmR5WF",
            "categories": [
              "Science Exhibitions",
              "STEM Workshops",
              "Space & Astronomy",
              "Technology Talks"
            ],
            "type": "Science & Technology"
          },
          {
            "id": "yXP8RxWt3af3J6DwNJUH",
            "categories": [
              "Food & Dining",
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Sports & Fitness"
          },
          {
            "id": "yXYxnO9RPCos92xMQI0t",
            "categories": [
              "Food & Dining",
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Sports & Fitness"
          },
          {
            "id": "yY8DcCTQALOSz5flK8AV",
            "categories": [
              "Networking Events",
              "Workshops & Seminars",
              "Conferences",
              "Job Fairs"
            ],
            "type": "Networking & Business"
          },
          {
            "id": "yZZSmWnBwlUZDX1dzD0X",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "yZjkRGKJVao2wFtobb7H",
            "categories": [
              "Tech Conferences",
              "Startup Events",
              "Coding Workshops",
              "Tech Expos"
            ],
            "type": "Tech & Innovation"
          },
          {
            "id": "yZxZWokAG5jjnlyeYKyw",
            "categories": [
              "Religious Gatherings",
              "Spiritual Retreats",
              "Meditation Groups",
              "Interfaith Dialogues"
            ],
            "type": "Religion & Spirituality"
          },
          {
            "id": "yaW44hSkYuVbNstmtUe5",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "yaY6GjGbTPFKuXObb7AR",
            "categories": [
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Food & Dining"
          },
          {
            "id": "ybGiNNqWsZSZB8zftixN",
            "categories": [
              ""
            ],
            "type": ""
          },
          {
            "id": "ybNTdlNuViu4aBowsPBt",
            "categories": [
              "Theater Productions",
              "Magic Shows",
              "Stand - Up Comedy",
              "Movie Screenings"
            ],
            "type": "Entertainment & Shows"
          },
          {
            "id": "yg4roSoKZkyJN8fmO8Pr",
            "categories": [
              "Networking Events",
              "Workshops & Seminars",
              "Conferences",
              "Job Fairs"
            ],
            "type": "Networking & Business"
          },
          {
            "id": "yiA0u35a7JNsKgswJbM8",
            "categories": [
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Food & Dining"
          },
          {
            "id": "yioGVHMJu1hwliLWHsR3",
            "categories": [
              "Pet Adoption Events",
              "Animal Welfare Fundraisers",
              "Pet - Friendly Activities",
              "Zoo Visits"
            ],
            "type": "Pets & Animals"
          },
          {
            "id": "yjXcbrYc4qVDETG18jIw",
            "categories": [
              "Family - Friendly Events",
              "Children's Workshops",
              "Kid - Friendly Activities",
              "Amusement Parks"
            ],
            "type": "Family & Kids"
          },
          {
            "id": "yjxDUW9axYLxUmfeWCGt",
            "categories": [
              "Educational Workshops",
              "Lectures & Talks",
              "Online Courses",
              "Tutoring Services"
            ],
            "type": "Education & Learning"
          },
          {
            "id": "ykMOjE8Laf4AWK8ZViZ9",
            "categories": [
              "Hobbyist Gatherings",
              "Hobby Workshops",
              "Special Interest Groups",
              "Craft Fairs"
            ],
            "type": "Hobbies & Interests"
          },
          {
            "id": "ymkFTSoWopBKu0gx5zrF",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "yoaBc9uZEf142aJNztPC",
            "categories": [
              "Charity Galas",
              "Fundraising Events",
              "Volunteer Opportunities",
              "Community Outreach"
            ],
            "type": "Charity & Fundraising"
          },
          {
            "id": "ypRN51OD3C4fb1umPV8N",
            "categories": [
              "Fashion Shows",
              "Beauty Workshops",
              "Pop - Up Boutiques",
              "Makeup Classes"
            ],
            "type": "Fashion & Beauty"
          },
          {
            "id": "yry1106i9NY2nECTeBPd",
            "categories": [
              "Fashion Shows",
              "Beauty Workshops",
              "Pop - Up Boutiques",
              "Makeup Classes"
            ],
            "type": "Fashion & Beauty"
          },
          {
            "id": "ys8oJl85EM7lRJ3jHirh",
            "categories": [
              "Hobbyist Gatherings",
              "Hobby Workshops",
              "Special Interest Groups",
              "Craft Fairs"
            ],
            "type": "Hobbies & Interests"
          },
          {
            "id": "ywnRtgGss5vJSCPFZRga",
            "categories": [
              "Pet Adoption Events",
              "Animal Welfare Fundraisers",
              "Pet - Friendly Activities",
              "Zoo Visits"
            ],
            "type": "Pets & Animals"
          },
          {
            "id": "ywtzM5fXX5KMSyHCG2M7",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "yxCzW2wwZoJlVBgkGctZ",
            "categories": [
              "Science Exhibitions",
              "STEM Workshops",
              "Space & Astronomy",
              "Technology Talks"
            ],
            "type": "Science & Technology"
          },
          {
            "id": "yzPhGBUoKmgLZAqPmY96",
            "categories": [
              "Sporting Events",
              "Fitness Classes",
              "Yoga & Meditation",
              "Outdoor Activities"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "z1KEdDe8c0cpXrQI13sc",
            "categories": [
              "Wellness Retreats",
              "Health Workshops",
              "Mindfulness Events",
              "Medical Seminars"
            ],
            "type": "Health & Wellness"
          },
          {
            "id": "z6VzwdNeOJSFAsspvx6i",
            "categories": [
              "Home Improvement Workshops",
              "Gardening Classes",
              "Home Shows",
              "DIY Events"
            ],
            "type": "Home & Garden"
          },
          {
            "id": "zFUd4sKfX080KCesNtQn",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "zK42nNHkH1jMXgONI8zC",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "zKsBerIVXpUAK2nFgkzK",
            "categories": [
              "Educational Workshops",
              "Lectures & Talks",
              "Online Courses",
              "Tutoring Services"
            ],
            "type": "Education & Learning"
          },
          {
            "id": "zLEMgZHWWACH4LsUDeut",
            "categories": [
              "Wellness Retreats",
              "Health Workshops",
              "Mindfulness Events",
              "Medical Seminars"
            ],
            "type": "Health & Wellness"
          },
          {
            "id": "zNMJiFkpIMhEwazibFIB",
            "categories": [
              "Food & Dining",
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Sports & Fitness"
          },
          {
            "id": "zPXHhBW8Z0OUlAOCV4Mb",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "zRe7kXW80qySHpCoW3H0",
            "categories": [
              "Local Community Events",
              "Environmental Causes",
              "Social Activism",
              "Fundraising for Causes"
            ],
            "type": "Community & Causes"
          },
          {
            "id": "zTsZV3SSG8KDlVLdOslF",
            "categories": [
              "Family - Friendly Events",
              "Children's Workshops",
              "Kid - Friendly Activities",
              "Amusement Parks"
            ],
            "type": "Family & Kids"
          },
          {
            "id": "zTzs6YNVu4gnLlSYWgHr",
            "categories": [
              "Travel Expos",
              "Adventure Tours",
              "Backpacking Trips",
              "Cultural Experiences"
            ],
            "type": "Travel & Adventure"
          },
          {
            "id": "zUqYGPaU9frITlRv4HFY",
            "categories": [
              "Local Community Events",
              "Environmental Causes",
              "Social Activism",
              "Fundraising for Causes"
            ],
            "type": "Community & Causes"
          },
          {
            "id": "zV6ywSc8VSm2ihSXDCde",
            "categories": [
              "Travel Expos",
              "Adventure Tours",
              "Backpacking Trips",
              "Cultural Experiences"
            ],
            "type": "Travel & Adventure"
          },
          {
            "id": "zWY0hfFvbw82wvTc5uW8",
            "categories": [
              "Live Music",
              "Concerts",
              "DJ Events"
            ],
            "type": "Music & Concerts"
          },
          {
            "id": "zXka6ESGWrT5XTqfuuEM",
            "categories": [
              "Tech Conferences",
              "Startup Events",
              "Coding Workshops",
              "Tech Expos"
            ],
            "type": "Tech & Innovation"
          },
          {
            "id": "zXmFZxYVIAy6ZlR3zf7h",
            "categories": [
              "Art Exhibitions",
              "Museums",
              "Theater Shows",
              "Galleries"
            ],
            "type": "Arts & Culture"
          },
          {
            "id": "zc0n7l1L1Zmx6qHRjg2W",
            "categories": [
              "Religious Gatherings",
              "Spiritual Retreats",
              "Meditation Groups",
              "Interfaith Dialogues"
            ],
            "type": "Religion & Spirituality"
          },
          {
            "id": "zdOy8w9W6QkMH4Jf0AH9",
            "categories": [
              "Wellness Retreats",
              "Health Workshops",
              "Mindfulness Events",
              "Medical Seminars"
            ],
            "type": "Health & Wellness"
          },
          {
            "id": "zgIy9Ax5nxrRSxQO4uft",
            "categories": [
              "Food & Dining",
              "Restaurants",
              "Food Festivals",
              "Food Trucks",
              "Wine Tasting"
            ],
            "type": "Sports & Fitness"
          },
          {
            "id": "zgVDmGMRevRZOU4m2v7r",
            "categories": [
              "Fashion Shows",
              "Beauty Workshops",
              "Pop - Up Boutiques",
              "Makeup Classes"
            ],
            "type": "Fashion & Beauty"
          },
          {
            "id": "zgbDIm60t3rzTh2MYvw2",
            "categories": [
              "Wellness Retreats",
              "Health Workshops",
              "Mindfulness Events",
              "Medical Seminars"
            ],
            "type": "Health & Wellness"
          },
          {
            "id": "zgpQjz0tItqvxn0b3h4C",
            "categories": [
              "Educational Workshops",
              "Lectures & Talks",
              "Online Courses",
              "Tutoring Services"
            ],
            "type": "Education & Learning"
          },
          {
            "id": "zjeBNGLuolAlaNWcOGt6",
            "categories": [
              "Wellness Retreats",
              "Health Workshops",
              "Mindfulness Events",
              "Medical Seminars"
            ],
            "type": "Health & Wellness"
          },
          {
            "id": "zjlPX5cnl2mZbsKYe9ui",
            "categories": [
              "Educational Workshops",
              "Lectures & Talks",
              "Online Courses",
              "Tutoring Services"
            ],
            "type": "Education & Learning"
          },
          {
            "id": "zkaZm1dRIrgH2ZbHpQSU",
            "categories": [
              "Local Community Events",
              "Environmental Causes",
              "Social Activism",
              "Fundraising for Causes"
            ],
            "type": "Community & Causes"
          },
          {
            "id": "zlISaGo2y3nvYcibAhBT",
            "categories": [
              "Indian Cuisine",
              "Italian Cuisine",
              "American Fare",
              "Asian Fusion",
              "Mediterranean",
              "Mexican & Tex - Mex",
              "Sushi & Japanese",
              "Chinese Cuisine",
              "French Dining",
              "Vegetarian & Vegan",
              "Seafood Specialties",
              "BBQ & Grill",
              "Steakhouse",
              "Fast Food & Burgers",
              "Cafes & Bakeries",
              "Food Trucks",
              "Fine Dining",
              "Farm - to - Table",
              "Ethnic Eateries"
            ],
            "type": "Food styles"
          },
          {
            "id": "zmeFRBlPod0TKz0WyDEN",
            "categories": [
              "Theater Productions",
              "Magic Shows",
              "Stand - Up Comedy",
              "Movie Screenings"
            ],
            "type": "Entertainment & Shows"
          },
          {
            "id": "znopRYOVRdksjBMVkxE9",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "zq2R7J0TGh0bbb3S9DHw",
            "categories": [
              "Tech Conferences",
              "Startup Events",
              "Coding Workshops",
              "Tech Expos"
            ],
            "type": "Tech & Innovation"
          },
          {
            "id": "zqNo5QLb0vNY4pTv7gzr",
            "categories": [
              "Nightlife",
              "Bars & Lounges",
              "Nightclubs",
              "Karaoke Nights",
              "Comedy Clubs"
            ],
            "type": "Music Festivals"
          },
          {
            "id": "zsLdGjHKl1UFXYDbZemk",
            "categories": [
              "Family - Friendly Events",
              "Children's Workshops",
              "Kid - Friendly Activities",
              "Amusement Parks"
            ],
            "type": "Family & Kids"
          },
          {
            "id": "zsOc3s4VQcuydH8LX0u7",
            "categories": [
              "Educational Workshops",
              "Lectures & Talks",
              "Online Courses",
              "Tutoring Services"
            ],
            "type": "Education & Learning"
          },
          {
            "id": "zsXENG4WY220mMII96AG",
            "categories": [
              "Pet Adoption Events",
              "Animal Welfare Fundraisers",
              "Pet - Friendly Activities",
              "Zoo Visits"
            ],
            "type": "Pets & Animals"
          },
          {
            "id": "ztEjSR0YxeDoESYhl3fb",
            "categories": [
              "Religious Gatherings",
              "Spiritual Retreats",
              "Meditation Groups",
              "Interfaith Dialogues"
            ],
            "type": "Religion & Spirituality"
          },
          {
            "id": "zv2yvhULrlcDafCEX6tL",
            "categories": [
              "Charity Galas",
              "Fundraising Events",
              "Volunteer Opportunities",
              "Community Outreach"
            ],
            "type": "Charity & Fundraising"
          }
        ],
        "message": null,
        "status": 200
      }

      const result = await service.getCategories();

      expect(result).toEqual(api_response(categories, 200));
    });

    it('should return permission issue if user is not promoter', async () => {
      mockFirebaseApp.getAuth.mockResolvedValue({ uid: 'uVOmbdjrCejDuwbBZJeU' });
      mockFirebaseApp.firestore().collection('roles').doc('uVOmbdjrCejDuwbBZJeU').get.mockResolvedValue({
        data: jest.fn(() => ({ role: 'user' })),
      });

      const permissionError = {
        "statusCode": 403,
        "timestamp": "2024-03-01T06:49:59.581Z",
        "path": "/auth/categories",
        "message": "You don not have permission to perform this action"
      }

      const result = await service.getCategories();
      expect(result).toEqual(api_response(permissionError, 400));
    });
  })
  describe("Categories", () => {
    it('getCategories', async () => {
      const badges = {
        "data": [
          {
            "id": "1N3gv9HE6qKkNl1Gy8S5",
            "name": "rewards"
          },
          {
            "id": "1NEnFaOoTv31ir8ImkSy",
            "name": "Augmented Reality"
          },
          {
            "id": "21XyYyoHS5DAoT42JIrJ",
            "name": "rewards"
          },
          {
            "id": "2gnN9jSHR9bEyPORv2Ud",
            "name": "rewards"
          },
          {
            "id": "2hdgyxDn67euEFQ6oNcy",
            "name": "Augmented Reality"
          },
          {
            "id": "2odAEOyd8JbLYWYudBr2",
            "name": "gamification"
          },
          {
            "id": "2tUBZSg0kPzICk7iAW55",
            "name": "Augmented Reality"
          },
          {
            "id": "2zvBEhBOonJiQZCt4Vlj",
            "name": "Augmented Reality"
          },
          {
            "id": "38qoJj3WOQ5NRWptzGGV",
            "name": "rewards"
          },
          {
            "id": "3G6uxN1kE6hJa7dVpIBX",
            "name": "rewards"
          },
          {
            "id": "3GVLwcaD83kXOhHdjOrc",
            "name": "rewards"
          },
          {
            "id": "3q8E3MHjV8nOt0si3iuj",
            "name": "gamification"
          },
          {
            "id": "4lSGvqFNt6BqSwVoeuR6",
            "name": "gamification"
          },
          {
            "id": "4rlEu9ic6s5NE9z8eNJw",
            "name": "gamification"
          },
          {
            "id": "5Oxmwf6aAKg2m8uMuuKZ",
            "name": "rewards"
          },
          {
            "id": "5XLBPkN9UaAT2ncl8BxV",
            "name": "rewards"
          },
          {
            "id": "5g13jDZIKn0TrIkzjuTQ",
            "name": "Augmented Reality"
          },
          {
            "id": "6sXdTf7Md8tEeffZCXXu",
            "name": "gamification"
          },
          {
            "id": "7Ao1cFeK1uitrdkdSpPN",
            "name": "gamification"
          },
          {
            "id": "7n5u0ig8JjbmTWegzYEc",
            "name": "Augmented Reality"
          },
          {
            "id": "7tMLPFR20XYxqxCpXMbW",
            "name": "rewards"
          },
          {
            "id": "8RZHNTHo7R2jDGkF54vR",
            "name": "gamification"
          },
          {
            "id": "8ZmPqwzn57pBR4bb83A4",
            "name": "rewards"
          },
          {
            "id": "8ogcrohCqhLI3ET4Xgjd",
            "name": "rewards"
          },
          {
            "id": "91tgkYyJ9VKVGOUNTRh5",
            "name": "Augmented Reality"
          },
          {
            "id": "9Op06ioUS3RhiyxC21md",
            "name": "rewards"
          },
          {
            "id": "E74UepGzjv8Z9DIJfsaM",
            "name": "Augmented Reality"
          },
          {
            "id": "Ee56WyJBru5vBgxaWW42",
            "name": "gamification"
          },
          {
            "id": "EwRuqFpYDatBKhAVNBdw",
            "name": "gamification"
          },
          {
            "id": "FIPDkAHiJCaVtaHDO4U5",
            "name": "rewards"
          },
          {
            "id": "Fd3WIiKjP44UCDsKozvO",
            "name": "rewards"
          },
          {
            "id": "Fjw7ZfwH0uleRh5XgIht",
            "name": "gamification"
          },
          {
            "id": "GyNlPwFjliVmXChEt0BU",
            "name": "rewards"
          },
          {
            "id": "HYmOQkQseeyh3wj1yadl",
            "name": "Augmented Reality"
          },
          {
            "id": "Hk5aExwUZRUBBvG0WSdF",
            "name": "gamification"
          },
          {
            "id": "IDy7gbqNp6EM5FygNDAx",
            "name": "Augmented Reality"
          },
          {
            "id": "IN7hy3mlr5oVlVeCpVBx",
            "name": "Augmented Reality"
          },
          {
            "id": "IWrdMVk6gq00ooOxpOwi",
            "name": "gamification"
          },
          {
            "id": "Iuzd1zHkzyZXQOYF95bn",
            "name": "rewards"
          },
          {
            "id": "JEPcOgpVFNajckvdvPG9",
            "name": "rewards"
          },
          {
            "id": "JOqafdZDEztdXk7HB3jS",
            "name": "Augmented Reality"
          },
          {
            "id": "JaBO7E55w0nkGFpFbWz5",
            "name": "rewards"
          },
          {
            "id": "JaJsdFafOTuhLIFhBKcP",
            "name": "Augmented Reality"
          },
          {
            "id": "KyVdF3oE6I0T0w2UlJR6",
            "name": "gamification"
          },
          {
            "id": "LlArgvWYLIrt4AfnBVnd",
            "name": "rewards"
          },
          {
            "id": "M3Ll04e72tcFSlSNwprf",
            "name": "Augmented Reality"
          },
          {
            "id": "M5kpNq4noMrLP705gXmr",
            "name": "Augmented Reality"
          },
          {
            "id": "M9337Ou9aUVJUN089lNw",
            "name": "Augmented Reality"
          },
          {
            "id": "MDuKjdW8Hrlml5XIEDCo",
            "name": "rewards"
          },
          {
            "id": "N9lda34Gd4dhRe2oPx2q",
            "name": "Augmented Reality"
          },
          {
            "id": "NT8uiM9GtV4fDfsDfxxh",
            "name": "Augmented Reality"
          },
          {
            "id": "Nex6tyB1i70kLjndQSsK",
            "name": "Augmented Reality"
          },
          {
            "id": "O642O1TMptfR6R2orgcG",
            "name": "Augmented Reality"
          },
          {
            "id": "OlHSmuJopg7OlPhY5O58",
            "name": "rewards"
          },
          {
            "id": "OrFLSDMH33xkq30rLHmR",
            "name": "rewards"
          },
          {
            "id": "P3EttoabacgVKZjAkDb2",
            "name": "gamification"
          },
          {
            "id": "POjBO9IWSKVn5QeQ53N4",
            "name": "rewards"
          },
          {
            "id": "PwXBEEDORFmgQKNI0UHY",
            "name": "gamification"
          },
          {
            "id": "R3lhDTVDT4lYfcuOtP5F",
            "name": "gamification"
          },
          {
            "id": "SD9oX908pziR1LN55q8I",
            "name": "gamification"
          },
          {
            "id": "TBo2QftIBXBJFWuyClvp",
            "name": "gamification"
          },
          {
            "id": "UFFqfzqBGDsZ1FOBWEMm",
            "name": "gamification"
          },
          {
            "id": "UTfjhtoUoC3j5BF47XkW",
            "name": "Augmented Reality"
          },
          {
            "id": "Uuyvkyc5wKDIMjHBju6P",
            "name": "gamification"
          },
          {
            "id": "V08Ob7Z0dzhd9HdAfJBc",
            "name": "gamification"
          },
          {
            "id": "V5MoEFI3cITpJVttVFdd",
            "name": "gamification"
          },
          {
            "id": "VXrEjCnYiOHRW7KFKCMJ",
            "name": "gamification"
          },
          {
            "id": "VXrdGHlIvXSE1zgzVf3G",
            "name": "rewards"
          },
          {
            "id": "WQSIWbpQ9cvG8myL1vmU",
            "name": "rewards"
          },
          {
            "id": "Wrmxi3bAXkBXiW48HI0o",
            "name": "gamification"
          },
          {
            "id": "X6fclgxk1EdWVUEAlpau",
            "name": "gamification"
          },
          {
            "id": "XM8Paw96NhXam9jDqGv5",
            "name": "gamification"
          },
          {
            "id": "XnoMWugJAHACZwtHCKVy",
            "name": "gamification"
          },
          {
            "id": "YZCBfTJT2Vgr06l8KD7q",
            "name": "gamification"
          },
          {
            "id": "Z9W8Zv56YpLoPx6lzfSi",
            "name": "gamification"
          },
          {
            "id": "ZmGbYiTOBN5aEQOeOhAX",
            "name": "Augmented Reality"
          },
          {
            "id": "aUCeVQ77FYZh2h959782",
            "name": "rewards"
          },
          {
            "id": "aq1GgfOVxXBMoNYMmsFy",
            "name": "rewards"
          },
          {
            "id": "aumVirSn95exHxjWJF7O",
            "name": "rewards"
          },
          {
            "id": "bFGVZsV0b1FJze51p6xA",
            "name": "gamification"
          },
          {
            "id": "bHanBQV8Wa5gu2FlWt9w",
            "name": "rewards"
          },
          {
            "id": "bKCJtAYUdJCRKfiBmZ47",
            "name": "Augmented Reality"
          },
          {
            "id": "c3dsH7WupQfpWd4dIrwJ",
            "name": "gamification"
          },
          {
            "id": "cGZ1JDLv5kCcVKuZSwzI",
            "name": "rewards"
          },
          {
            "id": "cjBRg4C6GPaBFxXqlchC",
            "name": "Augmented Reality"
          },
          {
            "id": "dTQpbxyhb3DbK8paNRRU",
            "name": "gamification"
          },
          {
            "id": "dz3KiQaRY48AkP3dKUAJ",
            "name": "gamification"
          },
          {
            "id": "e3mv3DfBTppvXlL167Mu",
            "name": "gamification"
          },
          {
            "id": "eOhkLdo7c4rmMS5glLd4",
            "name": "Augmented Reality"
          },
          {
            "id": "eopWt7tiDxSRZVFQRJgX",
            "name": "rewards"
          },
          {
            "id": "fNXLnPZr2LurQD7QDpT4",
            "name": "rewards"
          },
          {
            "id": "fuwDhVBvbY6xM3kPuxmv",
            "name": "rewards"
          },
          {
            "id": "fwNKnkM4gxn5zaZsEPnN",
            "name": "rewards"
          },
          {
            "id": "fzwHnO0dWi4k1ITa30F0",
            "name": "rewards"
          },
          {
            "id": "g71LyoCw2H8jZBst0lJc",
            "name": "gamification"
          },
          {
            "id": "gYs97IN8seThQLfOcgAx",
            "name": "Augmented Reality"
          },
          {
            "id": "hcLNOaNnfhTPiP7ZY7HA",
            "name": "rewards"
          },
          {
            "id": "heUzXdSuSYXhN4FgjHo5",
            "name": "Augmented Reality"
          },
          {
            "id": "ifQQKKkhnwCZUMzzSBN5",
            "name": "rewards"
          },
          {
            "id": "igyN3Q98YEwVVQ0Ai6Hv",
            "name": "Augmented Reality"
          },
          {
            "id": "im1sS2jvucg1gYYwqr2W",
            "name": "Augmented Reality"
          },
          {
            "id": "kFx8thprByFtjbQUwLl1",
            "name": "gamification"
          },
          {
            "id": "kiuwfFNiQqearXdbdv8d",
            "name": "Augmented Reality"
          },
          {
            "id": "",
            "profile_id": {
              "_firestore": {
                "projectId": "whats-tha-move-dev"
              },
              "_path": {
                "segments": [
                  "collection",
                  "standardprofiles"
                ]
              },
              "_converter": {}
            },
            "name": "",
            "image": "",
            "collected_count": 0,
            "collected_ids": [
              {
                "_firestore": {
                  "projectId": "whats-tha-move-dev"
                },
                "_path": {
                  "segments": [
                    "collection",
                    "standardprofiles"
                  ]
                },
                "_converter": {}
              }
            ],
            "created_on": {
              "_seconds": 1703788200,
              "_nanoseconds": 342000000
            }
          },
          {
            "id": "koZTTpQhZrfkGyrsuToo",
            "name": "Augmented Reality"
          },
          {
            "id": "lKWkVSWD66MAX01eFo49",
            "name": "Augmented Reality"
          },
          {
            "id": "lOOxtHzacIxT1F2HYEZ9",
            "name": "Augmented Reality"
          },
          {
            "id": "ltKXGq2vRRi4283DsgN9",
            "name": "Augmented Reality"
          },
          {
            "id": "mKlFl6zudYDwpBzEnifM",
            "name": "rewards"
          },
          {
            "id": "nbbSSK1ntyn29ETYZWZQ",
            "name": "gamification"
          },
          {
            "id": "nyJBM3fG3LvuudgaeCPl",
            "name": "rewards"
          },
          {
            "id": "oCR6dXxNjbuVkOyGpZds",
            "name": "gamification"
          },
          {
            "id": "oEBecmRDbplTBoiXsrzj",
            "name": "gamification"
          },
          {
            "id": "oMWonUdaqBEuBKf9JoXY",
            "name": "rewards"
          },
          {
            "id": "rH4pDjAFn5gBv5tC4asD",
            "name": "Augmented Reality"
          },
          {
            "id": "rO8Mz6wUKId56bCqqEfb",
            "name": "rewards"
          },
          {
            "id": "sVHmWWd23h1JRbktFInP",
            "name": "Augmented Reality"
          },
          {
            "id": "tUqNSzwC46OAFuDM12Fj",
            "name": "gamification"
          },
          {
            "id": "tYLSOgE7IRKDY5q3zJWf",
            "name": "gamification"
          },
          {
            "id": "u93KQCmxLBQWkLzwAjz9",
            "name": "rewards"
          },
          {
            "id": "uB0GBPLDAbYDd6XuaWhm",
            "name": "Augmented Reality"
          },
          {
            "id": "uBeaRjLR1PvWKdktw4iS",
            "name": "Augmented Reality"
          },
          {
            "id": "uMSGNZoY4oyOfAs8leEO",
            "name": "rewards"
          },
          {
            "id": "uV65NqDaHM4qEL57p9ds",
            "name": "Augmented Reality"
          },
          {
            "id": "uwkb0bRm058U1NZiIGEw",
            "name": "gamification"
          },
          {
            "id": "w0AsOpl5dQ9gzh30sl0D",
            "name": "gamification"
          },
          {
            "id": "w4gXxIKNaYCX44dITWKb",
            "name": "Augmented Reality"
          },
          {
            "id": "wOCUy1IYYnDbHpxQ7JIW",
            "name": "gamification"
          },
          {
            "id": "wcAiThsb7ufUJUzKUUV4",
            "name": "Augmented Reality"
          },
          {
            "id": "wfzvQPzAN93D1hOzpHOy",
            "name": "gamification"
          },
          {
            "id": "xPHGs0reWzZwV94FhI4F",
            "name": "gamification"
          },
          {
            "id": "xrSyQz9fhSQj64DLkEr9",
            "name": "Augmented Reality"
          },
          {
            "id": "yBIlpfep81ZUeUemXeQF",
            "name": "rewards"
          },
          {
            "id": "yEmHa77Evw8lZbK6hBDz",
            "name": "Augmented Reality"
          },
          {
            "id": "yYNt2gJjY381vzAnWG6x",
            "name": "Augmented Reality"
          },
          {
            "id": "yan1kaoKV5qfNoA0R3dS",
            "name": "Augmented Reality"
          },
          {
            "id": "yhPgImLze9PjvivHPvcA",
            "name": "rewards"
          },
          {
            "id": "zECPt8SGqvA19TSzvHJ0",
            "name": "Augmented Reality"
          },
          {
            "id": "zTn6b1dA4erTsGwdR0II",
            "name": "rewards"
          }
        ],
        "message": null,
        "status": 200
      }
      const result = await service.getBadges();

      expect(result).toEqual(api_response(badges, 200));
    });
    it('should return permission issue if user is not promoter', async () => {
      mockFirebaseApp.getAuth.mockResolvedValue({ uid: 'uVOmbdjrCejDuwbBZJeU' });
      mockFirebaseApp.firestore().collection('roles').doc('uVOmbdjrCejDuwbBZJeU').get.mockResolvedValue({
        data: jest.fn(() => ({ role: 'user' })),
      });

      const permissionError = {
        "statusCode": 403,
        "timestamp": "2024-03-01T06:49:59.581Z",
        "path": "/auth/categories",
        "message": "You don not have permission to perform this action"
      }

      const result = await service.getBadges();
      expect(result).toEqual(api_response(permissionError, 400));
    });
  })

  describe("Create Events", () => {
    const user = { role: 'promoter', uid: '5EtelidAvtZtXoy2VHGXQ8c13dK2' };
    const createEventPayload: CreateEventDTo = {
      "name": "Test",
      "description": "test description",
      "price": 100,
      "max_tickets": 10,
      "location": "Melbourne",
      "category": "Wellness Retreats",
      "badge": "rewards",
      "start_datetime": new Date(),
      "end_datetime": new Date("2024-03-01T07:14:23.489Z"),
      "schdeuled_release_date": new Date("2024-03-01T07:14:23.489Z"),
      ticket_ids: [],
      promotional_images: [],
      featured: null,
      schedule_release_date: null,
      attendants: [],
      share_count: 0,
      like_count: 0,
      save_count: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    const eventCreateResponse = {
      "data": {
        "_firestore": {
          "projectId": "whats-tha-move-dev"
        },
        "_path": {
          "segments": [
            "events",
            "xu09qniUnL48bFVEipVB"
          ]
        },
        "_converter": {}
      },
      "message": "Event created successfully",
      "status": 201
    }
    it('createEvent', async () => {
      const result = await service.createEvent(user, createEventPayload);

      expect(result).toEqual(api_response(eventCreateResponse, 201, 'Event created successfully'));
    });
    it('should return permission issue if user is not promoter', async () => {
      mockFirebaseApp.getAuth.mockResolvedValue({ uid: 'uVOmbdjrCejDuwbBZJeU' });
      mockFirebaseApp.firestore().collection('roles').doc('uVOmbdjrCejDuwbBZJeU').get.mockResolvedValue({
        data: jest.fn(() => ({ role: 'user' })),
      });

      const permissionError = {
        "statusCode": 403,
        "timestamp": "2024-03-01T06:49:59.581Z",
        "path": "/auth/categories",
        "message": "You don not have permission to perform this action"
      }

      const result = await service.createEvent(user, createEventPayload);
      expect(result).toEqual(api_response(permissionError, 400));
    });
  })
  describe("Update Events", () => {
    let user = { role: 'promoter', uid: '5EtelidAvtZtXoy2VHGXQ8c13dK2' };
    const eventId = "xu09qniUnL48bFVEipVB"
    const updatEventPayload: UpdateEventDTO = {
      "name": "Singing event",
      "description": "Let's rock",
      "category": "Melbourne",
      "badge": "Wellness Retreats",
      "price": 100.56,
      "max_tickets": 100,
      "schdeuled_release_date": new Date("2024-03-01T07:40:04.822Z"),
      ticket_ids: [],
      location: '',
      start_datetime: undefined,
      end_datetime: undefined,
      promotional_images: [],
      featured: null,
      schedule_release_date: null,
      attendants: [],
      share_count: 0,
      like_count: 0,
      save_count: 0
    }
    const eventUpdateResponse = {
      "data": {
        "_firestore": {
          "projectId": "whats-tha-move-dev"
        },
        "_path": {
          "segments": [
            "events",
            "xu09qniUnL48bFVEipVB"
          ]
        },
        "_converter": {}
      },
      "message": "Event updated successfully",
      "status": 201
    }
    it('updatEvent', async () => {
      const result = await service.updateEvent(eventId, user, updatEventPayload);

      expect(result).toEqual(api_response(eventUpdateResponse, 201, 'Event updated successfully'));
    });

    it('should return permission issue if user is not promoter', async () => {
      user = {role: "user", uid: "uVOmbdjrCejDuwbBZJeU"}
      const permissionError = {
        "statusCode": 403,
        "timestamp": "2024-03-01T06:49:59.581Z",
        "path": "/auth/categories",
        "message": "You don not have permission to perform this action"
      }

      const result = await service.updateEvent(eventId, user, updatEventPayload);
      expect(result).toEqual(api_response(permissionError, 400));
    });
  })
  describe("Get single event", () => {
    let user = { role: 'promoter', uid: '5EtelidAvtZtXoy2VHGXQ8c13dK2' };
    const eventId = "xu09qniUnL48bFVEipVB"

    it("getSingleEvent", async () => {
      const eventResponse = {
        "data": {
          "id": "xu09qniUnL48bFVEipVB",
          "name": "Singing event",
          "description": "Let's rock",
          "price": 100.56,
          "max_tickets": 100,
          "location": "Melbourne",
          "category": "Melbourne",
          "badge": "Wellness Retreats",
          "start_datetime": "2024-03-01T07:14:23.489Z",
          "end_datetime": "2024-03-01T07:14:23.489Z",
          "schdeuled_release_date": "2024-03-01T07:40:04.822Z",
          "createdAt": null,
          "updatedAt": null
        },
        "message": null,
        "status": 200
      }
      mockFirebaseApp.getAuth.mockResolvedValue({ uid: 'uVOmbdjrCejDuwbBZJeU' });
      mockFirebaseApp.firestore().collection('roles').doc('uVOmbdjrCejDuwbBZJeU').get.mockResolvedValue({
        data: jest.fn(() => ({ role: 'promoter' })),
      });

      const result = await service.getSingleEvent(eventId);
      expect(result).toEqual(api_response(eventResponse, 200));
    })
  })

  describe("Create Event Ticket", () => {
    let user = { role: 'promoter', uid: '5EtelidAvtZtXoy2VHGXQ8c13dK2' };

    it("createeventTicket", async () => {

      const eventTicketPayload: CreateEventTicketDTO = {
        "price": 100,
        "quantity": 3,
        "event_id": "xu09qniUnL48bFVEipVB",
        "event_name": "Singing event"
      }
      const eventTicketResponse = {
        "data": {
          "quantity": 3,
          "event_id": "9rAlitgNBLdpjvsTZBcu1W5LeoP2",
          "price": 100,
          "event_name": "Singing event",
          "qrCode": "https://storage.googleapis.com/events_qrcodes/iHwBt1sg0kKCIaCtM1wt_qrcode.png"
        },
        "message": "Event ticket created successfully",
        "status": 201
      }
      mockFirebaseApp.getAuth.mockResolvedValue({ uid: 'uVOmbdjrCejDuwbBZJeU' });
      mockFirebaseApp.firestore().collection('roles').doc('uVOmbdjrCejDuwbBZJeU').get.mockResolvedValue({
        data: jest.fn(() => ({ role: 'promoter' })),
      });

      const result = await service.createEventTicket(user, eventTicketPayload);
      expect(result).toEqual(api_response(eventTicketResponse, 201, 'Event ticket created successfully'));
    })
  })
  describe("Save item", () => {
    let user = { role: 'promoter', uid: '5EtelidAvtZtXoy2VHGXQ8c13dK2' };

    it("saveItem", async () => {
      const itemId = "xu09qniUnL48bFVEipVB"

      const saveItemPayload: SaveItemDTO = {
        "itemId": "xu09qniUnL48bFVEipVB",
        "item_type": "event",
        "who_saved": "5EtelidAvtZtXoy2VHGXQ8c13dK2",
        "timestamp": "2024-03-01T06:49:59.581Z"
      }
      const saveItemResponse = {
        "data": {
          "quantity": 3,
          "event_id": "9rAlitgNBLdpjvsTZBcu1W5LeoP2",
          "price": 100,
          "event_name": "Singing event",
          "qrCode": "https://storage.googleapis.com/events_qrcodes/iHwBt1sg0kKCIaCtM1wt_qrcode.png"
        },
        "message": "Event ticket created successfully",
        "status": 201
      }
      mockFirebaseApp.getAuth.mockResolvedValue({ uid: 'uVOmbdjrCejDuwbBZJeU' });
      mockFirebaseApp.firestore().collection('roles').doc('uVOmbdjrCejDuwbBZJeU').get.mockResolvedValue({
        data: jest.fn(() => ({ role: 'promoter' })),
      });

      const result = await service.saveItem(itemId, saveItemPayload);
      expect(result).toEqual(api_response(saveItemResponse, 201, 'Item Saved Successfully'));
    })
  })
});
