import { Server, Socket } from 'socket.io';
// import cors from 'cors';
// import { createServer } from 'http';
// const httpServer = createServer();

interface Character {
    id: string;
    name: string;
    position: number[];
    topColor: string;
    bottomColor: string;
    bodyColor: string;
    baseColor: string;
}

const io = new Server({
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});



// httpServer.listen(3002, () => {
//     console.log('listening on *:3002');
// });

io.listen(3001);

const characters: Character[] = [];

const generateRandomPosition = (): number[] => {
    return [
        Math.random() * 3,
        Math.random() * 0,
        Math.random() * 3,
    ];
};

const generateRandomHexColor = (): string => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

io.on('connection', (socket: Socket) => {
    console.log('a user connected');

    socket.emit('hello');

    characters.push({
        id: socket.id,
        name: `Player(id:${socket.id})`,
        position: generateRandomPosition(),
        topColor: generateRandomHexColor(),
        bottomColor: generateRandomHexColor(),
        bodyColor: generateRandomHexColor(),
        baseColor: generateRandomHexColor(),
    });

    io.emit('characters', characters);

    socket.on('move', (position: number[]) => {
        const characterIndex = characters.findIndex((character) => character.id === socket.id);
        if (characterIndex !== -1) {
            characters[characterIndex].position = position;
            io.emit('characters', characters);
        }
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
        const characterIndex = characters.findIndex((character) => character.id === socket.id);
        if (characterIndex !== -1) {
            characters.splice(characterIndex, 1);
            io.emit('characters', characters);
        }
    });
});

export default io;