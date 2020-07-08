// FACTORY
// Uma Função que qdo executada, retorna uma instância, um objeto
// que podemos utilizar depois.
export default function createGame() {

    const state = {
        players: {},
        fruits: {},
        screen: {
            width: 30,
            height: 30
        }
    };

    // PATTERN OBSERVER
    const observers = [];

    function start() {
        const frequency = 4000;

        setInterval(addFruit, frequency);
    }

    function subscribe(observerFunction) {
        observers.push(observerFunction);
    }

    function notifyAll(command) {
        for (const observerFunction of observers) {
            observerFunction(command);
        }
    }
    /////////////////////

    function setState(newState) {
        Object.assign(state, newState); 
        // Faz um MERGE do state novo com o novo state que já estava na instancia
    }

    function addPlayer(command) {
        const playerId = command.playerId;
        const playerX = 'playerX' in command ? command.playerX : Math.floor(Math.random() * state.screen.width);
        const playerY = 'playerY' in command ? command.playerY : Math.floor(Math.random() * state.screen.height);

        state.players[playerId] ={
            x: playerX,
            y: playerY
        };

        notifyAll({
            type: 'add-player',
            playerId: playerId,
            playerX: playerX,
            playerY: playerY
        });

    }
    function removePlayer(command) {
        const playerId = command.playerId;

        delete state.players[playerId];

        notifyAll({ 
            type: 'remove-player',
            playerId: playerId
        });
    }

    function addFruit(command) {
        const fruitId = command ? command.fruitId : Math.floor(Math.random() * 10000000);
        const fruitX = command ? command.fruitX : Math.floor(Math.random() * state.screen.width);
        const fruitY = command ? command.fruitY : Math.floor(Math.random() * state.screen.height);

        state.fruits[fruitId] ={
            x: fruitX,
            y: fruitY
        };

        notifyAll({
            type: 'add-fruit',
            fruitId: fruitId,
            fruitX: fruitX,
            fruitY: fruitY
        });
    }
    function removeFruit(command) {
        const fruitId = command.fruitId;

        delete state.fruits[fruitId];

        notifyAll({
            type: 'remove-fruit',
            fruitId: fruitId,
        });
    }

    function movePlayer(command) {
        // console.log(`game.movePlayer() -> Moving ${command.playerId} with ${command.keyPressed}`);

        notifyAll(command);

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
                if (player.x + 1 < state.screen.width)
                player.x = player.x+1;
            },
            ArrowDown(player) {
                console.log('Moving Down');
                if (player.y + 1 < state.screen.height)
                player.y = player.y+1;
            },
            ArrowLeft(player) {
                console.log('Moving Left');
                if (player.x - 1 >= 0)
                player.x = player.x-1;
            },
            b(player) {
                console.log("BOMBA! de " + player);
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
        movePlayer,
        addFruit,
        removeFruit,
        state,
        setState,
        subscribe,
        start
    };
}
