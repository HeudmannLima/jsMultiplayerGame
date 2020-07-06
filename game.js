// FACTORY
// Uma Função que qdo executada, retorna uma instância, um objeto
// que podemos utilizar depois.
export default function createGame() {

    // const state = {
    //     players: {
    //         'player1': { x: 1, y: 1 },
    //         'player2': { x: 9, y: 9 },
    //     },
    //     fruits: {
    //         'fruit1':  { x: 3, y: 1 }, 
    //     }
    // };

    const state = {
        players: {},
        fruits: {},
        screen: {
            width: 10,
            height: 10
        }
    };

    function addPlayer(command) {
        const playerId = command.playerId;
        const playerX = command.playerX;
        const playerY = command.playerY;

        state.players[playerId] ={
            x: playerX,
            y: playerY
        };
    }
    function removePlayer(command) {
        const playerId = command.playerId;

        delete state.players[playerId];
    }

    function addFruit(command) {
        const fruitId = command.fruitId;
        const fruitX = command.fruitX;
        const fruitY = command.fruitY;

        state.fruits[fruitId] ={
            x: fruitX,
            y: fruitY
        };
    }
    function removeFruit(command) {
        const fruitId = command.fruitId;

        delete state.fruits[fruitId];
    }

    function movePlayer(command) {
        console.log(`game.movePlayer() -> Moving ${command.playerId} with ${command.keyPressed}`);

        const acceptedMoves = {
            ArrowUp(player) {
                console.log('game.movePlayer.ArrowUp()  => Move Up');
                // console.log(`y: ${player.y}  |  y-1: ${player.y-1}`);
                if (player.y - 1 >= 0)
                player.y = player.y-1;
                // player.y = Math.max(player.y-1, 0);
            },
            ArrowRight(player) {
                console.log('Moving Right');
                if (player.x + 1 < screen.width)
                player.x = player.x+1;
            },
            ArrowDown(player) {
                console.log('Moving Down');
                if (player.y + 1 < screen.height)
                player.y = player.y+1;
            },
            ArrowLeft(player) {
                console.log('Moving Left');
                if (player.x - 1 >= 0)
                player.x = player.x-1;
            },
            b(player) {
                console.log("BOMBA!");
            }
        };

        const keyPressed = command.keyPressed;
        const playerId = command.playerId;
        const player = state.players[command.playerId];
        const moveFunction = acceptedMoves[keyPressed];

        // se player ainda existe (se esta no jogo) e, moveFunction
        // para validar somente com as teclas certas, pq vira
        // undefined se nao for as Arrows de dentro de acceptedMoves
        if (player && moveFunction) {
            moveFunction(player);
            checkForFruitCollision(playerId);
        }

    }

    function checkForFruitCollision(playerId) {
        const player = state.players[playerId];

        for (const fruitId in state.fruits) {
            const fruit = state.fruits[fruitId];
            console.log(`Checking ${playerId} and ${fruitId}`);
            
            if (player.x == fruit.x && player.y == fruit.y) {
                console.log(`COLLISION between ${playerId} and ${fruitId}`);
                removeFruit({ fruitId: fruitId });
            }
        }
    }

    return {
        addPlayer,
        removePlayer,
        addFruit,
        removeFruit,
        movePlayer,
        state
    };
}
