# mini-message-board - [Live Preview](https://secret-ruthanne-porobertdev-614629eb.koyeb.app/)

![alt text](https://github.com/porobertdev/mini-message-board/blob/dev/assets/20241027_185221_Screenshot_from%202024-10-27%2018-50-50.png?raw=true)

## About

This project is part of the assignment from [The Odin Project](https://www.theodinproject.com/lessons/node-path-nodejs-mini-message-board). As you may notice, I did more work than it was required, just for fun and because it was easier to practice new knowledge on an existing project.

I have also learned about the WebSocket protocol in order to implement live-chat capability. The number of active users is updated as users connect/disconnects, and messages are seen in real-time.

## How It Works

I specifically want to cover the **WSS** (Web Socket Server). Like any server, once it runs, it wait for client requests in order to give a response back. It's event-driven too, just like ExpressJS, and it needs to be implemented on both sides, frontend and backend.

On backend, we create the WSS server. And on frontend, we use the in-built `WebSocket` API to connect to the WSS server and send data.

Initially, WSS uses the HTTP protocol, but then it's upgraded to the WebSocket protocol which allows a client to exchange data with the server without making actual requests (as you may notice in `DevTools > Network` tab), which means **real-time updates**.

The way number of connected users is tracked is by using `wss.on('connection')` and `ws.on('close')` events on backend-side, and `ws.on('open')` on frontend side.

**Try to imagine this**: you have two physical pipes (one in left, one in right), and you need another smaller pipe to connect both. On the left side we have the client, and on the right we have the server. That smaller pipe is the WebSocket protocol, which acts like a tunnel. Once it connects the other two, information can be exchanged in real-time

## Tech Stack

- **Frontend**: EJS templates rendered on the server
- **Backend**: NodeJS + ExpressJS
  - Authentication:
    - `passportjs`: to validate/invalidate the authentication process
    - `express-session`: to create a session in order to save and exchange client's state
    - `connect-pg-simple`: to connect to the database in order to store the session there ins\*\*\*\*tead of the server's memory
    - `jsonwebtoken`: used as an additional security layer for practice purposes
  - Database: PostgreSQL
- **Deployment**: Koyeb for the server, and Neon for the database - a good combo because of their free plans

## Project Structure

> ┣ 📂authentication
> ┣ 📂controllers
> ┣ 📂database
> ┣ 📂public
> ┃ ┣ 📂css
> ┃ ┣ 📂data
> ┃ ┗ 📂js
> ┣ 📂routes
> ┣ 📂views
> ┃ ┣ 📂pages
> ┃ ┗ 📂partials
> ┣ 📜.env.dev
> ┣ 📜app.js
> ┗ 📜utils.js

- `authentication`: self-explanatory I guess? I can't really break it down into simpler words.
- `database`: all the authentication credentials and messages are stored here
- `routes`: available endpoints for the website. Think of it like a path in the file manager 😉
- `controllers`: basically, functions that are _bound_ to routes (endpoints), and runs automatically as soon as an endpoint is accessed/visited by the client
- `public`: CSS and JS that gets loaded on the client
- `views`: HTML templates that are dynamically generated before they are sent to the client. _Partials_ contains smaller components that are included in the main pages.
- `utils`: additional functions that are used here and there
- `app.js`: is where the servers (both, HTTP & WebSocket protocols) are created and started

## Setup

This assumes you have `npm` and `nvm` installed, you want to run it locally and you already created a PostgreSQL database in your system.

1. Clone the repo.
2. Run `npm install`.
3. Set up environment variables in a `.env.dev` file.
4. Run `npm run dev`.

Example of `.env.dev` (don't include `<`/`>`):

```
# DATABASE
DATABASE_HOST=localhost
DATABASE_USER=porobertdev
DATABASE_PASSWORD=<your-password>
DATABASE_NAME=database-name

# WSS Server
WEBSOCKET_URL=localhost:3000

# Admin Panel
ADMIN_USER=blablabla
ADMIN_PASSWORD='plsdonthackme'
ADMIN_TABLE=<separate-table-in-db-that-stores-admin-credentials>

# Session
SESSION_SECRET=somecooltext
JWT_SECRET=anothercooltext
```
