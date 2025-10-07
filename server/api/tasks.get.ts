import { generateTasks } from "@@/server/utils/generateTasks";

import type { Task } from "#shared/types/task";
import type {
  DummyUsersResponse,
  DummyPostsResponse,
} from "#shared/types/dummyjson";

const LIFE_TIME_CACHE_IN_SECONDS = 60 * 15;

export default defineCachedEventHandler(
  async (): Promise<Task[]> => {
    const [usersResponse, postsResponse] = await Promise.all([
      $fetch<DummyUsersResponse>("https://dummyjson.com/users"),
      $fetch<DummyPostsResponse>("https://dummyjson.com/posts"),
    ]);

    const users = usersResponse.users;
    const posts = postsResponse.posts;

    const tasks = generateTasks(users, posts);

    return tasks;
  },
  {
    maxAge: LIFE_TIME_CACHE_IN_SECONDS,
  },
);
