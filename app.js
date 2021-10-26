document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.box').forEach(
        box => box.addEventListener('click', () => handleBoxClick(box))
    );

    class WinningCombination {
        check(sign) {
            throw new Error('Please implement this method, you moron.')
        }
    }

    class TopRow extends WinningCombination {
        check(sign) {
            console.log('checking');
            console.log((gameState.topLeft === sign) && (gameState.topMiddle === sign) && (gameState.topRight === sign));
            console.log((gameState.topLeft === sign));
            console.log((gameState.topMiddle === sign));
            console.log((gameState.topRight === sign));

            return (gameState.topLeft === sign) && (gameState.topMiddle === sign) && (gameState.topRight === sign);
        }
    }

    class CenterRow extends WinningCombination {
        check(sign) {
            return (gameState.centerLeft === sign) && (gameState.centerMiddle === sign) && (gameState.centerRight === sign);
        }
    }

    class BottomRow extends WinningCombination {
        check(sign) {
            return (gameState.bottomLeft === sign) && (gameState.bottomMiddle === sign) && (gameState.bottomRight === sign);
        }
    }

    class LeftColumn extends WinningCombination {
        check(sign) {
            return (gameState.topLeft === sign) && (gameState.centerLeft === sign) && (gameState.bottomLeft === sign);
        }
    }

    class MiddleColumn extends WinningCombination {
        check(sign) {
            return (gameState.topMiddle === sign) && (gameState.centerMiddle === sign) && (gameState.bottomMiddle === sign);
        }
    }

    class RightColumn extends WinningCombination {
        check(sign) {
            return (gameState.topRight === sign) && (gameState.centerRight === sign) && (gameState.bottomRight === sign);
        }
    }

    class LeftToRightDiagonal extends WinningCombination {
        check(sign) {
            return (gameState.topLeft === sign) && (gameState.centerMiddle === sign) && (gameState.bottomRight === sign);
        }
    }

    class RightToLeftDiagonal extends WinningCombination {
        check(sign) {
            return (gameState.topRight === sign) && (gameState.centerMiddle === sign) && (gameState.bottomLeft === sign);
        }
    }

    const gameState = {
        topLeft: '',
        topMiddle: '',
        topRight: '',
        centerLeft: '',
        centerMiddle: '',
        centerRight: '',
        bottomLeft: '',
        bottomMiddle: '',
        bottomRight: '',
    }

    let gameWonByPlayer = null;

    const winningCombinations = [
        new TopRow(),
        new CenterRow(),
        new BottomRow(),
        new LeftColumn(),
        new MiddleColumn(),
        new RightColumn(),
        new LeftToRightDiagonal(),
        new RightToLeftDiagonal(),
    ];

    const playerX = {
        onTurn: true,
        sign: 'X',
    };

    const playerO = {
        onTurn: false,
        sign: 'O',
    }

    const handleBoxClick = (box) => {
        if (isBoxAlreadyClicked(box)) return;

        const player = whichPlayerIsOnTurn();

        playOnBox(box, player);
        checkIfPlayerWon(player);
        if (gameWonByPlayer) {
            alert(`Player ${gameWonByPlayer.sign} has won the game.`);
        }
        endTurn();
    }

    const isBoxAlreadyClicked = (box) => {
        return box && box.innerHTML !== '';
    }

    const playOnBox = (box, player) => {
        updateGameState(box, player);
        box.innerHTML = player.sign;
    }

    const checkIfPlayerWon = (player) => {
        const sign = player.sign;

        for (let i = 0; i < winningCombinations.length; i++) {
            if (gameWonByPlayer) return;

            if (winningCombinations[i].check(sign)) {
                gameWonByPlayer = player;
            }
        }
    }

    const updateGameState = (box, player) => {
        switch (box.id) {
            case 't-l': gameState.topLeft = player.sign; break;
            case 't-m': gameState.topMiddle = player.sign; break;
            case 't-r': gameState.topRight = player.sign; break;
            case 'c-l': gameState.centerLeft = player.sign; break;
            case 'c-m': gameState.centerMiddle = player.sign; break;
            case 'c-r': gameState.centerRight = player.sign; break;
            case 'b-l': gameState.bottomLeft = player.sign; break;
            case 'b-m': gameState.bottomMiddle = player.sign; break;
            case 'b-r': gameState.bottomRight = player.sign; break;
            default: throw new Error(`Box id ${box.id} does not exist`);
        }
    }

    const endTurn = () => {
        if (playerX.onTurn) {
            playerX.onTurn = false;
            playerO.onTurn = true;
        } else {
            playerX.onTurn = true;
            playerO.onTurn = false;
        }
    }

    const whichPlayerIsOnTurn = () => {
        return playerX.onTurn ? playerX : playerO;
    }
});