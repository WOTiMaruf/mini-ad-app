export interface Task {
  id: string
  name: string
  avatar: string 
  rating: 1 | 2 | 3 | 4 | 5 
  urgency: 1 | 2 | 3 | 4 | 5, 
  title: string
  location: string 
  startDate: string
  endDate: string 
  workplace: string
}
