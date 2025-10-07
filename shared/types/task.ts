export type RatingLevel = 1 | 2 | 3 | 4 | 5;
export type UrgencyLevel = 1 | 2 | 3 | 4 | 5;

export interface Task {
  id: string;
  name: string;
  avatar: string;
  rating: RatingLevel;
  urgency: UrgencyLevel;
  title: string;
  location: string;
  startDate: string;
  endDate: string;
  workplace: string;
}
