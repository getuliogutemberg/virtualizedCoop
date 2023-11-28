import { Server } from 'socket.io';

const io = new Server({
    cors: {
        origin: 'http://localhost:5173',
    },
});

io.listen(3001);

const characters = [
     
]
const generateRandomPosition = () => {
    return [
        Math.random() * 3,
        Math.random() * 0,
        Math.random() * 3,
    ]
}
const generateRandomHexColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
io.on('connection', (socket) => {
    console.log('a user connected');
    
    socket.emit('hello');
    characters.push({
        id: socket.id,
        name: 'Player(id:'+socket.id+')',
        position: generateRandomPosition(),
        topColor: generateRandomHexColor(),
        bottomColor: generateRandomHexColor(),
        bodyColor: generateRandomHexColor(),
        baseColor: generateRandomHexColor(),
   
    
    })
    
    io.emit('characters', characters);

    socket.on("move", (position) => {
        characters[characters.findIndex(character => character.id === socket.id)].position = position
        io.emit('characters', characters);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
        characters.splice(characters.findIndex(character => character.id === socket.id),1)
        io.emit('characters', characters);
    })
});


