interface User {
  id: number;
  login: string;
  avatar_url: string;
}

export interface UserList {
  items: User[];
  total_count: number;
  incomplete_results: boolean;
}

export interface HttpResponse<T> extends Response {
  data?: T;
}
