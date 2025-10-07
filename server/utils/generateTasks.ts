import type { Task, RatingLevel, UrgencyLevel } from "#shared/types/task";
import type { DummyUser, DummyPost } from "#shared/types/dummyjson";

function getRandomInteger(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomDateOffset(days: number): Date {
  const base = new Date();
  const offsetDays = getRandomInteger(0, days);
  base.setDate(base.getDate() + offsetDays);

  return base;
}

export function generateTasks(users: DummyUser[], posts: DummyPost[]): Task[] {
  const minimalDataCount = Math.min(users.length, posts.length);

  return Array.from({ length: minimalDataCount }, (_, index) => {
    const user = users[index];
    const post = posts[index];

    const startDate = getRandomDateOffset(10);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + getRandomInteger(1, 7));

    return {
      id: crypto.randomUUID(),
      name: `${user.firstName} ${user.lastName}`,
      avatar: user.image,
      rating: getRandomInteger(1, 5) as RatingLevel,
      urgency: getRandomInteger(1, 5) as UrgencyLevel,
      title: post.title,
      location: user.address.city,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      workplace: user.company.name,
    };
  });
}
