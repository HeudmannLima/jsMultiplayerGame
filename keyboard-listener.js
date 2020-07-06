// OUTRA FACTORY + OBSERVER
// (factory pq instancia e usa .subscribe p/ registrar observers)
export default function createKeyboardListener(document) {

    // PATTERN OBSERVER
    const state = {
        observers: []
    };

    // 1. Aqui Observers se REGISTRAM dentro do Subject (observers[])
    function subscribe(observerFunction) {
        state.observers.push(observerFunction);
    }

    // 2. Aqui o Subject vai NOTIFICAR todos os obs da array com o COMANDO
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

    return {
        subscribe
    };
}
