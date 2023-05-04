export interface Message {
  id: number;
  text?: string;
  room?: string;
  UserId: string;
  created_at: string; // string because we'll be fetching JSON data, which does not admit Date objects.
}

export interface User {
  id: number;
  username: string;
  room?: string;
  active: boolean;
}
