import express from "express";
import server from "socket.io";

const app = express();

const dblocal = []

app.get("/", (req, res) => {
  res.sendFile(__dirname + '/public');
});

app.use(express.static('public'))

const serverinit =  app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});

const io = server(serverinit);

io.on ('connection',(socket)=>{
  console.log(socket.id);
  socket.on('chat',(data)=>{
    data = {
      id:dblocal.length+1,
      autor:data.autor,
      comentario:data.comentario
    } 
    dblocal.push(data)
    io.emit('chat',data);
    console.log(dblocal)
  })

  socket.on('chat:typing',(autor)=>{
    socket.broadcast.emit('chat:typing',autor);
    console.log(autor)
  })
});
