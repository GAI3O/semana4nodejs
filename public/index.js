const socket = io()
const form = document.querySelector('form')
const autor = document.getElementById('nuevo-usn')
const comentario = document.getElementById('nuevo-cm')
let someoneTyping = document.getElementById('someoneTyping')

let mensajes = document.getElementById('chat-window')
form.addEventListener('submit',(e)=>{
    
    e.preventDefault()
    if(comentario.value){
        const data = {
            autor:autor.value,
            comentario:comentario.value
        } 
        socket.emit('chat',data)
        comentario.value = ''
    }
})

comentario.addEventListener('keypress',(e)=>{
    console.log(autor.value)
    socket.emit('chat:typing',autor.value);
})

socket.on('chat',(msg)=>{
    someoneTyping.innerHTML = ''
    console.log(msg);
    let item = document.createElement('p');
    let formmsg = msg.autor+":"+msg.comentario
    item.textContent = formmsg;
    mensajes.appendChild(item);
    window.scrollTo(0,document.body.scrollHeight);   
})

socket.on('chat:typing',(autorTyping)=>{
    someoneTyping.innerHTML = `<p><em>${autorTyping} está escribiendo...</em></p>`
})







