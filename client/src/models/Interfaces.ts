export interface Message {
  id: string;
  text?: string;
  room?: string;
  UserId: string;
  created_at: string; // string because we'll be fetching JSON data, which does not admit Date objects.
}

export interface User {
  id: string;
  username: string;
  room?: string;
  connectedAt: string;
}
