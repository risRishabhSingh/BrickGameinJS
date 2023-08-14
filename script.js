const grid = document.querySelector(".grid")
const blockWidth = 100
const blockheight = 20
const userstart = [230,10]
let currentposition = userstart
const ballstart = [270,40]
let ballcurrentposition = ballstart
const ballDiameter = 20
const boardWidth = 560
const boardHeight = 300
let  xDirection =  2
let yDirection =  2
let timerId
const scoredisplay = document.querySelector('.score') 
let score = 0


// create Block
class Block{
    constructor(xAxis,yAxis){
        this.bottomleft = [xAxis,yAxis]
        this.bottomright = [xAxis + blockWidth , yAxis]
        this.topleft = [xAxis, yAxis + blockheight]
        this.toprigth = [xAxis + blockWidth, yAxis + blockheight]
    }
}


//all my blocks
const blocks = [
    new Block(10,270),
    new Block(120,270),
    new Block(230,270),
    new Block(340,270),
    new Block(450,270),
    new Block(10,240),
    new Block(120,240),
    new Block(230,240),
    new Block(340,240),
    new Block(450,240),
    new Block(10,210),
    new Block(120,210),
    new Block(230,210),
    new Block(340,210),
    new Block(450,210),
    new Block(10,180),
    new Block(120,180),
    new Block(230,180),
    new Block(340,180),
    new Block(450,180),
]

//drawing block
function addBlocks(){
    for( let i = 0; i < blocks.length; i++){
        const block = document.createElement("div")
        block.classList.add("block")
        block.style.left = blocks[i].bottomleft[0] + 'px'  
        block.style.bottom = blocks[i].bottomleft[1] + 'px'
        grid.appendChild(block)
    }
}

addBlocks()

//adding user

let user = document.createElement('div')
user.classList.add("user")
drawuser()
grid.appendChild(user)

//draw user
function drawuser(){
    user.style.left = currentposition[0] + 'px'
    user.style.bottom = currentposition[1] + 'px'
}

//user movement
function moveuser(e){
    switch(e.key){
        case 'ArrowLeft':
            if(currentposition[0] > 0){
                currentposition[0] = currentposition[0] - 10
                drawuser()
            }
            break;

        case 'ArrowRight':
            if(currentposition[0] < 460){
                currentposition[0] = currentposition[0] + 10
                drawuser()
            }
            break;
    }
}

document.addEventListener("keydown", moveuser)

//draw ball
function drawball(){
    ball.style.left = ballcurrentposition[0] + "px"
    ball.style.bottom = ballcurrentposition[1] + "px"
}


//add ball
let ball = document.createElement("div")
ball.classList.add("ball")
drawball()
grid.appendChild(ball)


//move the ball 
function moveBall(){
    ballcurrentposition[0] += xDirection
    ballcurrentposition[1] += yDirection
    drawball() 
    checkforCollision()
}


timerId = setInterval(moveBall , 30)

//check for Collide
function checkforCollision(){
    //Check for block collisions
    for ( let i = 0; i < blocks.length; i++){
        if(
            (ballcurrentposition[0] > blocks[i].bottomleft[0] && ballcurrentposition[0] < blocks[i].bottomright[0]) && (
                (ballcurrentposition[1] + ballDiameter) > blocks[i].bottomleft[1] && ballcurrentposition[1] < blocks[i].topleft[1]
            )
        ){
            const allblocks = Array.from(document.querySelectorAll('.block'))
            allblocks[i].classList.remove("block")
            blocks.splice(i,1)
            changeDirection()
            score++
            scoredisplay.innerHTML = score

            if(blocks.length === 0){
                scoredisplay.innerHTML = "You Win"
                clearInterval(timerId)
                document.removeEventListener("keydown",moveuser)
            }
        }
    }


    //check for wall collision
    if(ballcurrentposition[0] >= (boardWidth - ballDiameter) || // 540 because 560 is width of grid so we substract 560-20 (20 is width of ball)
        ballcurrentposition[1] >= (boardHeight - ballDiameter) ||
        ballcurrentposition[0] <= 0 ){               
        changeDirection()
    }

    //check for user collision
    if((ballcurrentposition[0] > currentposition[0] && ballcurrentposition[0] < (currentposition[0] + blockWidth)) &&
        (ballcurrentposition[1] > currentposition[1] && ballcurrentposition[1] < (currentposition[1] +blockheight))
    ){
        changeDirection()
    }

    //check for game over
    if(ballcurrentposition[1] <= 0  ){
        clearInterval(timerId)
        scoredisplay.innerHTML = "You Lose"
        document.removeEventListener("keydown", moveuser)
    }
}

function changeDirection(){
    if(xDirection === 2 && yDirection ===2){
        yDirection = -2
        return
    }
    if(xDirection === 2 && yDirection === -2){
        xDirection = -2
        return 
    }
    if(xDirection === -2 && yDirection === -2){
        yDirection = 2
        return 
    }
    if(xDirection === -2 && yDirection === 2){
        xDirection = 2
        return 
    }
}