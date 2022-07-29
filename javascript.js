  const cellElements = document.querySelectorAll("[data-cell]");
  const boarder = document.querySelector("[data-boarder]");
  const winningMessageTextElement = document.querySelector("[data-winning-message-text]");
  const winningMessage = document.querySelector("[data-winning-message]");
  const restartButton = document.querySelector("[data-restart-button]");
  const scoreBoarder = document.querySelector("[data-score-board]");
  const playerOne = document.querySelector("[data-playerOne]");
  const playerTwo = document.querySelector("[data-playerTwo]");
  const scoreOne = document.querySelector(".scoreboard-score--one");
  const scoreTwo = document.querySelector(".scoreboard-score--two");
  


  
  
  let isCircleTurn;
  
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]; 

  const startGame = () => {
      isCircleTurn = false;

    for(const cell of cellElements) {
        cell.classList.remove('circle');
        cell.classList.remove('x')
        cell.removeEventListener('click', handleClick)
        cell.addEventListener("click", handleClick, {once: true});
      };
    

      setBoardHover();
      winningMessage.classList.remove("show-winning-message");
  };

  const endRound = (isDraw) => {
    if (isDraw) {
        winningMessageTextElement.innerText = 'Empate!';
    } else {
      
        if(isCircleTurn) {
          winningMessageTextElement.innerText =  'O Venceu!'
          scoreTwo.innerHTML = String(Number(scoreTwo.innerHTML) + 1);
        }else {
          winningMessageTextElement.innerText =  'X Venceu!'
          scoreOne.innerHTML = String(Number(scoreOne.innerHTML) + 1);
        }
      
    };

    if(scoreOne.innerHTML >= '3') {
      winningMessageTextElement.innerText =  'Player one win';
    } 
    if(scoreTwo.innerHTML >= '3'){
      winningMessageTextElement.innerText =  'Player two win';
    }
    winningMessage.classList.add("show-winning-message");  
    
  };

  const newGame = () => {
   scoreOne.innerHTML = 0;
   scoreTwo.innerHTML = 0;
  }

  const checkForWin = (currentPlayer) => {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentPlayer);
        });
    });
  };

  const checkForDraw = () => {
    return [... cellElements].every(cell => {
        return cell.classList.contains('x') || cell.classList.contains('circle');
    });
  };

  const placeMark = (cell, classToAdd) => {
    cell.classList.add(classToAdd);
  };

  const setBoardHover = () => {
    boarder.classList.remove("circle");
    boarder.classList.remove("x");

    if (isCircleTurn) {
        boarder.classList.add("circle");
    } else {
        boarder.classList.add("x");
    };
  };

  const swapTurns = () => {
    isCircleTurn = !isCircleTurn;
    setBoardHover();
  };

  // const endGame = () => {
    
  // }

  
  const handleClick = (e) => { 

    //colocar a marca (X ou circle)
    const cell = e.target;
    const classToAdd = isCircleTurn ? 'circle' : 'x';
   
    placeMark(cell, classToAdd);
    
    //verificar por vitória 
    const isWin = checkForWin(classToAdd);
    
    //verificar por empate
    const isDraw = checkForDraw();
    
    if (isWin) {
        endRound(false);
    }else if (isDraw) {
        endRound(true);
    } else {
    
    //mudar o simbolo
    swapTurns();
    }
      
  };
  startGame();

  restartButton.addEventListener('click', () => {
    if(scoreOne.innerHTML >= '3' || scoreTwo.innerHTML >= '3') {
      newGame();
    }
    startGame();
  });

  

  