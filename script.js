//gameboard module will hold everything. 
const gameBoard = (()=>{
    let board = [["","",""],
                 ["","",""],
                 ["","",""]];
    const makeBoard = () =>{
        for(let i = 0; i < 3; i++){
            let row = document.createElement('div');
            row.className = "row";
            for(let j = 0; j < 3; j++){
                let box = document.createElement('div');
                box.className = 'box';
                box.setAttribute("data-index", `row: ${i}, cell: ${j}`);//string.split(",")then number that ish
                box.innerHTML = `${board[i][j]}`;
                row.appendChild(box);
            }
            document.getElementById('gameboard').appendChild(row);
        }
    }
    return{
        makeBoard
    };
    
})();

gameBoard.makeBoard();