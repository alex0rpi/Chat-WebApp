export interface ActiveUser {
  [key: string]: string;
}

export interface TokenPayloadInterface {
  username?: string;
  userId?: number;
}

export interface MessageData {
  userId: number | null;
  roomName: string;
  message: string;
}

export interface Message {
  text?: string;
  room?: string;
  UserId: string;
  created_at: string; // string because we'll be fetching JSON data, which does not admit Date objects.
}

export interface User {
  uid: number;
  username: string;
}
