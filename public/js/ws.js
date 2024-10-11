// WebSocket API
const ws = new WebSocket(
    window.location.host === 'localhost:3000'
        ? 'ws:localhost:3000'
        : 'wss://secret-ruthanne-porobertdev-614629eb.koyeb.app'
);
console.log('🚀 ~ ws:', ws);

ws.onopen = (e) => {
    console.log('[CLIENT] connected to WebSocket Server');
};

ws.onmessage = (e) => {
    const data = JSON.parse(e.data);
    console.log('[CLIENT] received data', data);

    if (data.clients) {
        renderNumOfClients(data.clients);
    } else {
        renderMsg(data);
    }
};

ws.onclose = (e) => {
    console.log('[CLIENT] closed WebSocket connection');
};

const renderMsg = (data) => {
    console.log('🚀 ~ renderMsg ~ data:', data);

    const { user, msg } = data;

    const container = document.querySelector('ul.messages .msg-list');

    // Create
    const div = document.createElement('div');
    const li = document.createElement('li');
    const username = document.createElement('span');
    username.classList.add('username');
    const message = document.createElement('span');
    message.classList.add('text');

    username.textContent = user;
    message.textContent = msg;

    // Append
    li.appendChild(username);
    li.appendChild(message);
    div.appendChild(li);
    container.appendChild(div);
};

const renderNumOfClients = (num) => {
    const usersConnected = document.querySelector('span.users-connected');

    usersConnected.textContent = num;
};

export { ws, renderMsg };
