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
                box.setAttribute("data-index", `row: ${i}, cell: ${j}`);//string.split(",") before regex then number that ish
                box.innerHTML = `${board[i][j]}`;
                row.appendChild(box);
            }
            document.getElementById('gameboard').appendChild(row);
        }
        let allBoxes = document.querySelectorAll('[data-index]');//node ist of all squares
        const regex = /[0-9]/gi;
        for(const boxes of allBoxes){
            boxes.addEventListener('click', function(){
                let numArr = this.dataset.index.match(regex);
                numArr.forEach((el,index,array) =>{
                    array[index] = Number(el);//just converting the el is not enough, you're renaming the value AT the address. 
                });
                /*for(let i = 0; i < 2; i++){
                    numArr[i] = Number(numArr[i]);
                }*/
                console.log(numArr);
                board[numArr[0]][numArr[1]] = "GAH";
                console.log(board)
                
            });
        }

    }
    return{
        makeBoard
    };
    
})();

gameBoard.makeBoard();