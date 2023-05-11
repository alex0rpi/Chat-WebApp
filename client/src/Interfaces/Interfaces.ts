export interface User {
  userId?: number;
  userName: string;
}

export interface IUserAuthFormProps {
  setLoggedUser: (user: User | null) => void;
}

export interface Message {
  messageId?: number;
  roomName?: string;
  message: string;
  createdAt?: string;
  userId?: number;
  userName: string | null;
}

export interface Room {
  roomId?: number;
  roomName: string;
  users?: User[];
}

export interface RegisterForm extends User {
  passwordConfirmation?: string;
  formError?: string;
}
