// Deklariere ein Array, um den Zustand des Spielfelds zu speichern
var gameState = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

// Variable, um den aktuellen Spieler zu speichern
var currentPlayer = 'X';

// Funktion, die bei einem Klick auf einen Button aufgerufen wird
function buttonClick(button) {
    var position = button.id;
    var row = parseInt(position.charAt(1)) - 1; // Zeile (0-basiert)
    var col = parseInt(position.charAt(3)) - 1; // Spalte (0-basiert)

    // Überprüfe, ob das Feld bereits belegt ist
    if (gameState[row][col] === '') {
        // Setze den Wert im Array
        gameState[row][col] = currentPlayer;

        var svg = createSVG(currentPlayer);
        button.innerHTML = `<img class="svg-icon" src="/${svg}" alt="${svg} Icon">`;

        // Wechsle zum anderen Spieler
        currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';

        // Hier kannst du weitere Logik für den Spielzug oder das Überprüfen auf einen Gewinner einfügen
    }
    var winner = checkWinner();

if (winner !== null) {
    console.log('Spieler ' + winner + ' hat gewonnen!');
    // Hier kannst du weitere Aktionen für das Spielende durchführen
    checkGameEnd();
}
}

function checkWinner() {
    // Überprüfe horizontale Linien
    for (var i = 0; i < 3; i++) {
        if (gameState[i][0] !== '' && gameState[i][0] === gameState[i][1] && gameState[i][1] === gameState[i][2]) {
            return gameState[i][0]; // Spieler hat gewonnen
        }
    }

    // Überprüfe vertikale Linien
    for (var j = 0; j < 3; j++) {
        if (gameState[0][j] !== '' && gameState[0][j] === gameState[1][j] && gameState[1][j] === gameState[2][j]) {
            return gameState[0][j]; // Spieler hat gewonnen
        }
    }

    // Überprüfe diagonale Linien
    if (gameState[0][0] !== '' && gameState[0][0] === gameState[1][1] && gameState[1][1] === gameState[2][2]) {
        return gameState[0][0]; // Spieler hat gewonnen
    }

    if (gameState[0][2] !== '' && gameState[0][2] === gameState[1][1] && gameState[1][1] === gameState[2][0]) {
        return gameState[0][2]; // Spieler hat gewonnen
    }

    // Kein Gewinner
    return null;
}
// Funktion, um das Spielende zu überprüfen
function checkGameEnd() {
    // Überprüfe auf einen Gewinner
    var winner = checkWinner();
    if (winner !== null) {
        alert('Spieler ' + winner + ' hat gewonnen!');
        // Hier kannst du weitere Aktionen für das Spielende durchführen
        // Z.B. ein neues Spiel starten, den Spielstand zurücksetzen, etc.
        resetGame();
        return;
    }

    // Überprüfe, ob das Spiel unentschieden ist
    var isDraw = true;
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            if (gameState[i][j] === '') {
                isDraw = false;
                break;
            }
        }
        if (!isDraw) {
            break;
        }
    }

    if (isDraw) {
        alert('Das Spiel endet unentschieden!');
        // Hier kannst du weitere Aktionen für das Spielende durchführen
        // Z.B. ein neues Spiel starten, den Spielstand zurücksetzen, etc.
        resetGame();
        return;
    }
}

// Funktion, um das Spiel zurückzusetzen
function resetGame() {
    // Hier kannst du den Spielstand und die Anzeige zurücksetzen
    gameState = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];

    // Setze den aktuellen Spieler zurück
    currentPlayer = 'X';

    // Setze den Text in den Buttons zurück
    var buttons = document.querySelectorAll('.matrix button');
    buttons.forEach(function(button) {
        button.innerText = '';
    });
}
function createSVG(player) {
    if (player === 'X') {
        return 'x.svg';
    } else if (player === 'O') {
        return 'o.svg';
    }
}