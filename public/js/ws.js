// WebSocket API
const ws = new WebSocket('ws://localhost:3000/');
console.log('🚀 ~ ws:', ws);

ws.onopen = (e) => {
    console.log('[CLIENT] connected to WebSocket Server');
};

ws.onmessage = (e) => {
    const data = JSON.parse(e.data);
    console.log('[CLIENT] received data', data);

    renderMsg(data);
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

export { ws, renderMsg };
