/*Now we will give the direction of our snake*/

let inputDir = {x:0,y:0};/*It is the intial direction before starting the game as intialy before pressing any key are snake will not moving */
const foodsound = new Audio('food.mp3');
const gameOverSound = new Audio('gameover.mp3');
const movesound = new Audio('move.mp3');
const musicSound = new Audio('music.mp3');
let speed = 9;
let lastPaintTime = 0;
let snakeArr = [{x:9,y:9}]; // intialy the 0,0 origin of our box is the top left corener point 
let score = 0; 
  
  

food = {x: 3 , y: 5}; // this is food element it is the object not the array
//Game Functions 

function main(ctime){
    window.requestAnimationFrame(main);
    //ctime = current time 
    musicSound.play();
    
    if ((ctime-lastPaintTime)/1000 < 1/speed)
    {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();

}


function isCollide(snake){
    // if snake hits itself
    for(let i = 1; i<snakeArr.length; i++) { // we have started with 1 as at 0 there is the head of the snake
        if(snake[i].x === snake[0].x  && snake[i].y === snake[0].y ){// here we are checking weather the quardinates of the head of the snake is equal to the any quardinates of the snake array then return true 
            return true;
        }
}
    if ( snake[0].x >= 18 || snake[0].x <= 0   ||  snake[0].y >= 18 || snake[0].y <= 0 ){
       return true;
    }
} 

function gameEngine(){
    //Part 1 ==> Updating the snake variable, genrallly it will be array where there are the locations of snake different body parts 

    if (isCollide(snakeArr)){
       score = 0 ;
       gameOverSound.play();
       musicSound.pause();
       inputDir = {x:0,y:0};
       alert("GAME OVER !!! Press any key to continue.")
       snakeArr = [{x:9,y:9}];
       musicSound.play();
       scorebox.innerHTML= "Score : "+ score;
       
    }

     // If you have eaten the food then increment the length and regenrate the food
     
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        score+=1;

        if(score > hiscoreval){
            hiscoreval = score;
            localStorage.setItem("highscore",JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML="High Score : " + hiscoreval;
           }
        scorebox.innerHTML= "Score : "+ score;
        foodsound.play();
        snakeArr.unshift({x:snakeArr[0].x + inputDir.x, y: snakeArr[0].y+inputDir.y}); // unshift adds the element to the starting of the array
        let a =2;
        let b = 16; // here a and b are the numbers between which we are genrating the random number for assigning the new position of food 
        //as are grid is between 0 to 18 therefore we are makiing it little bit simplar and gnerating the new food block in the range of 2 and 16
        // the formula of genrating random number between a range a and b is a+(b-a)*
        food = {x:Math.round(a+(b-a)*Math.random()), y:Math.round(a+(b-a)*Math.random())}
        
    }


    // Moving the snake 

    for (let i = snakeArr.length - 2; i>=0 ; i-- ){ // snakeArray.length -1 is the last elemetn adn snakeArr.length - 2 is the second last element
       
       snakeArr[i+1] = {...snakeArr[i]}; // the next element should be equal to current element 
         // the ... is used to declare the new object we hare creating a new object as it slves the refrencing problem 
        //when we simply write snakeArr[i] then a time will come when the snakeArr[i+1] will point to the same element
        
    }

    // Display the snake and food
    // Now how to display the snake it is the challenge 
    
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;       
    
    //Display the snake
    board.innerHTML = ""; // it will clean the slid
    snakeArr.forEach((e,index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y //(why y as y  is vertivle and they are the rows)
        snakeElement.style.gridColumnStart = e.x;
        
        if (index == 0){
             snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    

    //Display food 

    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y //(why y as y  is vertivle and they are the rows)
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);


}


// Game Logic starts here
let hiscore = localStorage.getItem("hiscore");
if(hiscore==null){
    hiscoreval = 0;
    localStorage.setItem("hiscore",JSON.stringify(hiscoreval)) // here we cant directly set to 0 we need tomake the 0 as string
}

else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "High Score : " + hiscore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    
    inputDir = {x:0,y:1};  // start the game toward the y = 1 that is down words.
    
    movesound.play(); //When the game is started this song is played
    switch(e.key){ // e.key will tell about the which key is pressed
       
       // nOW here the input x and y coordinates will change according to it  the snake will turn
       // llike if the snake is moving above/up then x=0 and y = -1 as we are moving towards negetive axis as the origin is top left corner  
        case "ArrowUp":
            console.log("Arrowup");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("Arrowdown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("Arrowleft")
            inputDir.x=-1;
            inputDir.y=0;
            break;

        case "ArrowRight":
            console.log("ArrowRight")
            inputDir.x=1;
            inputDir.y=0;
            break;
    }
});// whenever a button is pressed in the keybord that is keydown then it listens and an arrow function will be fired as it has 2 things event and function, first event will be occoured and then functions is fired
