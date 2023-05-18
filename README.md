# Chat-WebApp 💻🖥

This is a web chat that uses SocketIO to communicate between clients and server. It also uses ReactJS for the frontend and NodeJS for the backend.

## Personal note 📝🙍🏻‍♂️

This project constitutes the final project of a Backend Nodejs bootcamp that I did at the Barcelona Cibern@rium (https://cibernarium.barcelonactiva.cat/). This project allowed me to throw myself into the pool and try many different technologies, almost entirely in Typescript, which is quite new to me.

## Installation 📦

- Clone the repository on your local machine using the command git clone.
- Open two terminals to be able to execute client and server side at the same time.
- Terminal 1: **cd client** and then **npm i**. Then **npm run dev** to run the frontend.
- Terminal 2: **cd server** and then **npm i**.
- On server side, create a config.env file inside the /config folder. It will contain the environment variables that you need to set up for the databse in order to run the server. You can use the .env.example file as a template.
- Make sure you fill correctly the variables in the config.env file, otherwise the server won't run. Put a correct mysql username (MYSQL_USER) and password (MYSQL_PWD), and a correct database name (MYSQL_NAME). You can change the PORT if you want.
- **npm start** to run the backend.
- Open http://localhost:3000/ in your browser.
- Have fun🎊🎉

## Improvement opportunities 📈

Although I believe I've achieved the desired functional result and fulfilled most of the bootcamp requirements, there is significant room for improvement for this app. To mention a few potential improvements:

- The app should be dockerized. I'm still learning how to use docker and docker-compose.
- I wasn't able to configure the sequelize models in typescript. That's why these are the only pure javascript files in the project. Ideally, these files at well could've been implemented in typescript.
- Implement a more robust error handling and validation system. Mine here is still quite basic.
- Study the implementation of hexagonal architecture. At least in the backend.
- Client side is rather simplistic, so it could be improved as well.
- At the moment the rooms can only be created but not deleted. This could be a nice feature to add and manage whether there are users in that in a room to be deleted or not.
- Users don't have a profile picture nor can send files or pictures. Multer could be used to implement this feature.
- Also, once registered, users are permanently stored on the db. It would be nice to implement a feature so users can delete their accounts.

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

### Databases and ORM

![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)

### Frontend stack

![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Bootstrap](https://img.shields.io/badge/bootstrap-%23563D7C.svg?style=for-the-badge&logo=bootstrap&logoColor=white)
