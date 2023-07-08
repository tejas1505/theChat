const socket = io('https://csuitechat.vercel.app', {transports : ['websocket', 'polling']});
const form = document.getElementById('send-container');
const messageInp = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');
const append = (message, position)=>{
    const messageElement = document.createElement('div')
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement)

}

let name1 = prompt("Enter Your name to Join");
socket.emit('new-user-joined', name1)

socket.on('user-joined', data =>{
    append(`${data} joined the chat`, 'right');
})

socket.on('receive', data =>{
    append(`${data.name}: ${data.message}`,`left`);
})

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInp.value;
    append(`You: ${message}`, 'right')
    socket.emit('send', message);
    messageInp.value = "";
})

socket.on('left', name =>{
    append(`${name} Left the Chat`,'left');
})
