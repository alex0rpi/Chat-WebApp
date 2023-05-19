# Chat-WebApp 💻🖥

This is a web chat that uses SocketIO to communicate between clients and server. It also uses ReactJS with Vite for the frontend and NodeJS with Express for the backend.

## Personal note 📝🙍🏻‍♂️

This project constitutes the final project of a Backend Nodejs bootcamp that I did at the Barcelona Cibern@rium (https://cibernarium.barcelonactiva.cat/). This project allowed me to throw myself into the pool and try many different technologies, almost entirely in Typescript, which is quite new to me. I would lie If I said that I didn't struggle. Every technology gave me its own headaches. Some comments and a few difficulties I had:

- I struggled setting up the sequelize models in typescript. To the point I decided to allow these files in javascript.
- Manage routing in react, since react-router had significant changes from v5 to v6. Eventually I manage to have a working routing system that redirects the user to certain pages depending on the state of the app. If a user is not logged, he/she cannot go into a chat room, for example. I setup a not found page as well.
- Setup the first 'connection' event emitters and listeners in the socket context to connect at the start and listen for the socketIO server reply and update the context accordingly.
- Decide where and how to set the event emitters and listeners in the react frontend. Ended up using several useEffect hooks for each necessity and grouping them in the welcomeChat, father component, instead of placing them in each child component.
- Combining Bootstrap styling with Formik and Yup validation on client side.
- Ended up using quite a few of useStates (e.g. for rooms, messages, loggedUser etc.). At some point I wasn't sure what to store in the context, so the app has a mix of both. At least I think it was beneficial for learning purposes but I'm sure there are better practices to apply.
- I big wall I hit was the fact that as users created and joined different chat rooms, messages started being sent everywhere and where no longer segregated to the room they where created in. I thought I could solve this by filtering on the client side by the message roomName but it didn't work out. What did the trick was to use additional socketIO functionalities on server side like **.join(roomName)**, **.leave(roomName)** and **.to(roomName)** to be more precise about where the users are connected and where should the messages be targetted from the server side.
- JSON web token is used to authorize users once they're logged in. User token is then verified over and again once a user tries either to create a room, either to join an existing room. If the token is not valid, the user is redirected to the login page.

## Working principles of this chat 📝

The chat is a web application that allows users to create rooms and chat with other users in real time.

- First users must register. Usernames must be unique, so any attempt to register with an already existing username will be rejected with a simple browser alert message displayed.
- Users can switch between login and register forms by clicking on the 'login' or 'register' links. If a user tries to login with a non-existing username, a simple browser alert message will be displayed.
- After registering/login, users are redirected to the welcome chat where the input msg is autofocused (a nice touch I believe :) and they can start chatting with other users in that room.
- Users can create new rooms by writting a name in the newRoom input above the room list.
- After that they can just click on the new generated room button in the room list and they will be redirected to that room, where they can chat with other users in that room.
- A user can ONLY BE AT ONE ROOM AT A TIME. Meaning, once he/she goes to a different room, it will be socket-disconnected from the previous one, and socket-joined to the next one.
- Users can delete rooms (except the welcome room) as long as they're empty of users
- Finally, users can disconnect by clicking the disconnect button on the top left of the app grid or simply close the browser window which triggers a javascript beforeunload event that emmits a disconnection request to the socket server.
</br><hr>

  **What the app doesn't allow** (at least for now)**:**

* _Open private conversation with other users._ Since all rooms are public to all registered users.
* _Send files or pictures._
* _Delete neither rooms that contain users nor the 'welcome' room in any case._ </br>

## Installation 📦

- Clone the repository on your local machine using the command git clone.
- Open two terminals to be able to execute client and server side at the same time.
- Terminal 1: __cd client__ and then __npm i__. Then __npm run dev__ to run the frontend.
- Terminal 2: __cd server__ and then __npm i__.
- On server side, create a config.env file if not exists inside the /config folder. It will contain the environment variables that you need to set up for the databse in order \* to run the server. You can use the _config.env-template_ file as a template.
- Make sure you fill correctly the variables in the config.env file, otherwise the server won't run. Put a correct mysql username (MYSQL_USER) and password \* (MYSQL_PWD), and a correct database name (MYSQL_NAME). You can change the PORT if you want.
- __npm start__ to run the backend. This will create the database and the tables if they don't exist already. You can check that in the mysql workbench.
- Open http://localhost:3000/ in your browser.
- Have fun🎊🎉 cat lovers🐈.

## Improvement opportunities 📈

Although I believe I've achieved the desired functional result and fulfilled most of the bootcamp requirements, there is significant room for improvement for this app. To mention a few potential improvements:

- First and foremost, there is no password recovery functionality. I would like to implement this feature in the future.
- The app should be dockerized. I'm still learning how to use docker and docker-compose.
- React implementation on client side needs to be more encapsulated. For example all http request should be in a services directory. My frontend in general is rather simplistic, so it could be improved as well. Adding framer motion animations would be a nice touch.
- JSON web token implementation is a bit trivial and superficial. Users are assigned a token at login/register and then it is stored in the local storage, which is not the most secure practice. I'm still learning how to implement a more robust authentication system.
- Ideally, the sequelize models shouls be implemented in typescript, just like the rest of the project.
- Implement a more robust error handling. Mine here is still quite basic with browser alerts.
- Study the implementation of hexagonal architecture. At least in the backend. I only scratched the surface by having an infrastructure of database repositories. These are charged with the CRUD operation on the databse. These allows the controllers and listeners to be db agnostic.
- It could be a nice feature to add deleteRooms with users inside and redirect them all somewhere else. Also, the fact that any user can delete any room is not the best practice. Ideally, only the creator of the room should be able to delete it (for example).
- Users don't have a profile picture nor can send files or pictures. Multer could be used to implement this feature.
- Also, once registered, users are permanently stored on the db. It would be nice to implement a feature so users can delete their accounts.</br>

These are just a few enhancements that I can think of right now. I'm sure there are many more. Feel free to contribute to this project if you want to.

## Languages and Technologies 👦•💻

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

### Backend stack

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

### Databases and ORM

![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)

### Frontend stack

![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Bootstrap](https://img.shields.io/badge/bootstrap-%23563D7C.svg?style=for-the-badge&logo=bootstrap&logoColor=white)
