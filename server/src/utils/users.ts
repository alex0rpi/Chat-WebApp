// Join, leave, get all users in a room

interface User {
  id: string;
  username: string;
  room: string;
}

// Puc fer servir la base de dades? Puc comunicar-me aquí amb Mysql?
// Perquè de moment això és un array de users, no és la base de dades.

const users: User[] = [];

// Join user to chat
export function userJoin(id: string, username: string, room: string) {
  const user = { id, username, room };

  users.push(user);

  return user;
}

export function getRoomUsers(room: string) {
  return users.filter((user) => user.room === room);
}

// Get current user
export function getCurrentUser(id: string) {
  return users.find((user) => user.id === id);
}

// User leaves chat
export function userLeave(id: string) {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    return users.splice(index, 1)[0];
    // splice modified the users array but also returns an array containing the removed items (if any).
  }
}
