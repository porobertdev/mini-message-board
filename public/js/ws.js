// WebSocket API
const ws = new WebSocket(
    window.location.host === 'localhost:3000'
        ? 'ws:localhost:3000'
        : 'wss://secret-ruthanne-porobertdev-614629eb.koyeb.app'
);

ws.onopen = (e) => {
    console.log('[WS-CLIENT] connected to WebSocket Server');
};

ws.onmessage = (e) => {
    const data = JSON.parse(e.data);
    console.log('[WS-CLIENT] received data', data);

    if (data.clients) {
        renderNumOfClients(data.clients);
    } else {
        renderMsg(data);

        if (data.notify) {
            notify('Mini MessageBoard: New message!');
        }
    }
};

ws.onclose = (e) => {
    console.log('[WS-CLIENT] closed WebSocket connection');
};

const renderMsg = (data) => {
    const { user, msg, date } = data;
    const container = document.querySelector('ul.messages .msg-list');

    // Create
    const div = document.createElement('div');
    const li = document.createElement('li');
    const username = document.createElement('span');
    const message = document.createElement('span');
    const time = document.createElement('span');

    // add classes
    username.classList.add('username');
    message.classList.add('text');
    time.classList.add('date');

    // set values
    username.textContent = user;
    message.textContent = msg;
    time.textContent = date;

    // Append
    li.appendChild(username);
    li.appendChild(message);
    li.appendChild(time);
    div.appendChild(li);
    container.appendChild(div);

    message.scrollIntoView();
};

const renderNumOfClients = (num) => {
    const usersConnected = document.querySelector('span.users-connected');

    usersConnected.textContent = num;
};

// MDN: copy-paste due time constraint :P
const notify = (msg) => {
    if (!('Notification' in window)) {
        // Check if the browser supports notifications
        alert('This browser does not support desktop notification');
    } else if (Notification.permission === 'granted') {
        // Check whether notification permissions have already been granted;
        // if so, create a notification
        const notification = new Notification(msg);
    } else if (Notification.permission !== 'denied') {
        // We need to ask the user for permission
        Notification.requestPermission().then((permission) => {
            // If the user accepts, let's create a notification
            if (permission === 'granted') {
                const notification = new Notification(msg);
            }
        });
    }
};

export { ws, renderMsg };
