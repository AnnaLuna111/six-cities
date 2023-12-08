import { faker } from '@faker-js/faker';
import { ReviewProps } from '../types/review-type';


export const mockReviewItem = ():ReviewProps => ({
  id: crypto.randomUUID(),
  date: faker.date.recent().toString(),
  user: {
    name: faker.person.fullName(),
    avatarUrl: faker.image.avatar(),
    isPro: faker.datatype.boolean(),
  },
  comment: faker.lorem.paragraph(),
  rating: faker.number.int({max: 5, min: 0}),
});

const mockReviews = () => Array.from({length: 10}, mockReviewItem);


export const mockedReviews = mockReviews();
