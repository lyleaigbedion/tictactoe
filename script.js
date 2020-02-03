//gameboard module will hold everything. 
const gameBoard = (()=>{
    let board = [["","",""],
                 ["","",""],
                 ["","",""]];
    let player1;//add html code to capture name.
    let player2;
    const regex = /[0-9]/gi;
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

    }
    const startGame = () =>{
        
        clearBoard();
        document.getElementById("gameText").innerHTML = "";
        const Player = (name, symbol, move) => {
            const getName = () => name;
            const getSymbol = () => symbol;
            const getMove = () => move;
            //let move = true;
            const turn = () => move = !move;
    
            const countUp = (count) => count++;
            return {getName, getSymbol, getMove, turn, countUp}
        }
        
        let p1Name = document.getElementById("Player1").value;
        let p2Name;
        player1 = Player(p1Name,"X",true);

        if(document.getElementById("comp").checked == true){
            p2Name = "Computer"
            player2 = Player(p2Name,"O",false);
        }else{
            p2Name = document.getElementById("Player2").value; 
            player2 = Player(p2Name,"O",false);
        }
        
        if(p1Name === "" || p2Name === ""){
            alert("Please add a name");
            return;
        }
        document.getElementById("input").style.visibility = "hidden";

        function computerPlay() {
            if (document.getElementById("comp").checked == true  // verifies the computer is playing and the game
                ) { // has not ended
                let counter = 0; 
                while (true) {                               
                    let numA = Math.floor(Math.random() * 3);
                    let numB = Math.floor(Math.random() * 3);  // randomly finds a number and checks that array index
                    if (counter == 20) {                       // if the array index is empty, marks that box w/ num
                        break;                                 // if all indexes are full, breaks while.
                    }                                          // sometimes, the same index is generated randomly more
                    if (board[numA][numB] == "") {        // than once. counter at 20 to reduce chance that any index
                        
                        board[numA][numB] = player2.getSymbol();                   // is missed.
                        document.body.querySelector(`[data-index="row: ${numA}, cell: ${numB}"]`).innerHTML = player2.getSymbol();

                        break; 
                    }
                    counter++; 
                }
                //checkWin();   // checks if computer won after it's move
            }
            
        }

        let allBoxes = document.querySelectorAll('[data-index]');//node ist of all squares
        //console.log(allBoxes);
        let count = 0;
        function play(){
            //console.log(this);
            
            if(player1.getMove()){
                this.innerHTML = player1.getSymbol();
            }else if(player2.getMove()){
                this.innerHTML = player2.getSymbol();
            }
            
            
            
            
            let numArr = this.dataset.index.match(regex);
            numArr.forEach((el,index,array) =>{
                array[index] = Number(el);//just converting the el is not enough, you're renaming the value AT the address. 
            });
            let l = numArr[0];
            let m = numArr[1];
            board[l][m] = this.innerHTML 
            console.log(board);
            
            
            
            for(const box of allBoxes){
                if(box.innerHTML !== ""){
                    box.removeEventListener('click', play)
                    console.log("event listener removed");
                }
            }

            if(document.getElementById("comp").checked){
                computerPlay();  
              }else{
                player1.turn();
                player2.turn();  
              }
            
            //should wrap this in a function..... ehhh...
            count++;
            console.log(count);
            if(count > 2){
                checkWin();
                
            }
            if(document.getElementById("gameText").innerHTML !== ""){
                //let allBoxes = document.querySelectorAll('[data-index]');
                for(const box of allBoxes){
            
                box.removeEventListener('click', play)
                console.log("event listener removed");
            
        
                }
            }
        }
        for(const boxes of allBoxes){
            boxes.addEventListener('click', play);
        }

  
        

    }

    const checkWin = () => {
            if (board[0][0] == board[0][1] && board[0][1] == board[0][2] && board[0][0] != "") {
                declareWinner(board[0][0]); 
        } else if (board[1][0] == board[1][1] && board[1][1] == board[1][2] && board[1][0] != "") {
                declareWinner(board[1][0]);
        } else if (board[2][0] == board[2][1] && board[2][1] == board[2][2] && board[2][0] != "") {
                declareWinner(board[2][0]); 
        } else if (board[0][0] == board[1][0] && board[1][0] == board[2][0] && board[0][0] != "") {
                declareWinner(board[0][0]); 
        } else if (board[0][1] == board[1][1] && board[1][1] == board[2][1] && board[0][1] != "") {
                declareWinner(board[0][1]); 
        } else if (board[0][2] == board[1][2] && board[1][2] == board[2][2] && board[0][2] != "") {
            declareWinner(board[0][2]); 
        } else if (board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[0][0] != "") {
            declareWinner(board[0][0]);
        } else if (board[0][2] == board[1][1] && board[1][1] == board[2][0] && board[0][2] != "") {
            declareWinner(board[0][2]); 
        } else {
            let k = 0; 
            for (i = 0; i < 3; i++) {
                for (j = 0; j < 3; j++) {                         // makes sure all array indexes are filled before
                    if (board[i][j] != "") {                 // declaring match a tie
                        k++;            
                    }
                }
            };
            if (k == 9) {
                declareWinner("Tie");
            }
        }
    }

    function declareWinner(winner) {
        console.log(winner);
        if (winner == "X") {
            document.getElementById("gameText").innerHTML = "The winner is " + player1.getName() + "!"; 
        } else if (winner == "O") {
            document.getElementById("gameText").innerHTML = "The winner is " + player2.getName() + "!"; 
        } else if (winner == "end") {
            document.getElementById("gameText").innerHTML = "Game ended."; 
        } else {
            document.getElementById("gameText").innerHTML = "It's a tie!";
            
        }
        
        document.getElementById("input").style.visibility = "visible";
        
    } 
    
    const clearBoard  = () =>{
        for(let i = 0; i < 3; i++){
            for(let j = 0; j < 3; j++){
                board[i][j] = "";
            }
        }
        //repetitive you can change this
        let boxes = document.querySelectorAll('[data-index]');
        for(const box of boxes){
            box.innerHTML = "";
        }
        
    }
    function disablePlayerTwo() {   // disables naming player 2 if computer will be challenger
        if (document.getElementById("comp").checked == true) {
            document.getElementById("Player2").disabled = true;
        } else {
            document.getElementById("Player2").disabled = false;
        }
    }


    return{
        makeBoard,
        clearBoard,
        disablePlayerTwo,
        startGame
    };
    
})();

gameBoard.makeBoard();
/* <ul>
// Define our WP Query Parameters
<?php $the_query = new WP_Query( 'posts_per_page=5' ); ?>
 
// Start our WP Query
<?php while ($the_query -> have_posts()) : $the_query -> the_post(); ?>
 
// Display the Post Title with Hyperlink
<li><a href="<?php the_permalink() ?>"><?php the_title(); ?></a></li>
 
// Display the Post Excerpt
<li><?php the_excerpt(__('(more…)')); ?></li>
 
// Repeat the process and reset once it hits the limit
<?php 
endwhile;
wp_reset_postdata();
?>
</ul>





<section id="blogy" class="blogz">
  <div class="blogz__header">
    <!--<p class="blogz__header1">some of my</p>
    <h2 class="blogz__header2">Medium
      <span class="blogz__header2Span">posts</span>
    </h2>-->
  </div>
  <ul class="blogz__slider">
    Posts go here
  </ul>
  <!--<ul class="blogz__counter">
    <li class="blogz__counterItem blogz__counterItem-active"></li>
    <li class="blogz__counterItem"></li>
    <li class="blogz__counterItem"></li>
  </ul>-->
</section>







<li class="blogz__post">
            <a href="<?php the_permalink() ?>>
               <img src="<?php the_post_thumnail_url ?>" class="blogz__topImg"></img>
               <div class="blogz__content">
                  <div class="blogz_preview">
                     <h2 class="blogz__title"><?php the_title(); ?></h2>
                     <p class="blogz__intro"><?php the_excerpt(__('(more…)')); ?></p>
                  </div>
                  <hr>
                  <div class="blogz__info">
                     <!--<span class="blogz__author"></span>-->
                     <!--<span class="blogz__date"></span>-->
                  </div>
               </div>
            <a/>
</li>*/