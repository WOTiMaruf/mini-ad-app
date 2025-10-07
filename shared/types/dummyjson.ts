export interface DummyUser {
  id: number;
  firstName: string;
  lastName: string;
  image: string;
  address: {
    city: string;
  };
  company: {
    name: string;
  };
}

export interface DummyPost {
  id: number;
  title: string;
  body: string;
}

export interface DummyUsersResponse {
  users: DummyUser[];
}

export interface DummyPostsResponse {
  posts: DummyPost[];
}
