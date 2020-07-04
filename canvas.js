const screen = document.getElementById("screen");
const context = screen.getContext('2d');
const currentPlayerId = 'player1';

// const color = 'red';
// const positionX = 0;
// const positionY = 0;
// const width = 250;
// const height = 250;
// context.fillStyle = color;
// context.fillRect(positionX, positionY, width, height);

// FACTORY
// Uma Função que qdo executada, retorna uma instância, um objeto
// que podemos utilizar depois.
function createGame() {

    const state = {
        players: {
            'player1': { x: 1, y: 1 },
            'player2': { x: 9, y: 9 },
        },
        fruits: {
            'fruit1':  { x: 3, y: 1 }, 
        }
    };

    function movePlayer(command) {
        console.log(`Move ${command.playerId} w ${command.keyPressed}`);

        const keyPressed = command.keyPressed;
        const player = state.players[command.playerId];

        switch (keyPressed) {
            case 'ArrowUp':
                // console.log(`y: ${player.y}  |  y-1: ${player.y-1}`);
                if (player.y - 1 >= 0)
                    player.y = player.y-1;
                break;
        
            case 'ArrowRight':
                // console.log(`x: ${player.x}  | x+1: ${player.x+1}  |  screen.width: ${screen.width}`);
                if (player.x + 1 < screen.width)
                    player.x = player.x+1;
                break;

            case 'ArrowDown':
                // console.log(`y: ${player.y}  | y+1: ${player.y+1}  |  screen.heigth: ${screen.height}`);
                if (player.y + 1 < screen.height)
                    player.y = player.y+1;
                break;

            case 'ArrowLeft':
                // console.log(`x: ${player.x}  | x-1: ${player.x-1}`);
                if (player.x - 1 >= 0)
                    player.x = player.x-1;
                break;
        }

    }

    return {
        movePlayer,
        state
    };
}


const game = createGame();
const keyboardListener = createKeyboardListener();
//keyboardListener

// OUTRA FACTORY + OBSERVER
// (factory pq instancia e usa .subscribe p/ registrar observers)
function createKeyboardListener() {

    // PATTERN OBSERVER
    const state = {
        observers: []
    };

    // 1. Aqui Observers se REGISTRAM dentro do Subject (observers[])
    function subscribe(observerFunction) {
        state.observers.push(observerFunction);
    }

    // 2. Aqui o Subject vai NOTIFICAR todos os obs da array
    // 3. vai fazer o loop e EXECUTAR cada funçao deles deste array
    function notifyAll(command) {
        console.log(`Notifying ${state.observers.length} observers`);

        for (const observerFunction of state.observers) {
            observerFunction(command);
        }

    }

    document.addEventListener('keydown', handleKeyDown);
    
    function handleKeyDown(event) {
        const keyPressed = event.key;
    
        const command = {
            playerId: 'player1',
            keyPressed
        };

        // 4. O obj command vai ser passado pra todas as func
        //    do arr de Observers executando as func c/ esse obj
        notifyAll(command);    
    }
}

renderScreen();

function renderScreen() {

    context.clearRect(0, 0, 10, 10);

    for (const playerId in game.state.players) {
        const player = game.state.players[playerId];
        context.fillStyle = 'black';
        context.fillRect(player.x, player.y, 1, 1);
    }

    for (const fruitId in game.state.fruits) {
        const fruit = game.state.fruits[fruitId];
        context.fillStyle = 'green';
        context.fillRect(fruit.x, fruit.y, 1, 1);
    }
    
    requestAnimationFrame(renderScreen);
}


