const emojis = [ //an array of colors that will be used
    "funny",
    "cool",
    "laughing",
    "smile",
    "winking-face",
    "smiling"

]

let board = []
let rows = 9
let columns = 9
let score = 0
let lives = 30

let currTile; // the candy being dragged
let otherTile; //the candy being dropped on

window.onload = function() {
    startGame()


    window.setInterval(function() { //call this functions at the set time of
            crushEmojis()
            slideCandy()
            generateEmojis()
            LivesCount()

        }, 200) //interval seconds
}

function randomEmoji() {
    return emojis[Math.floor(Math.random() * emojis.length)]

}

function Plives() {
    lives = 10
}

function LivesCount() { //check amount of lives and issue messages accordingly
    if (score >= 10) {
        document.getElementById("score").innerText = "You Won!"
    } else if (lives == 5) {
        document.getElementById("lives-el").style.color = "yellowgreen"

    } else if (lives <= 3) {
        document.getElementById("lives-el").style.color = "red"
        if (lives == 0) {
            document.getElementById("score").innerText = "You Lost, try again"
            return
        }

    }

}

function stopGame() {
    if (lives == 0 || score >= 10) {
        return
    }
}

function startGame() {

    for (let r = 0; r < rows; r++) {
        let row = []
        for (let c = 0; c < columns; c++) {
            //<img id="0-0" src="./emojis/funny50.png">
            let tile = document.createElement("img")
            tile.id = r.toString() + "-" + c.toString()
            tile.src = "./emojis/" + randomEmoji() + ".png"

            //drag functionality

            tile.addEventListener("dragstart", dragStart) //click on a candy, intitialize the drag process
            tile.addEventListener("dragover", dragOver) //after drag process is completed, we swap the candy
            tile.addEventListener("dragenter", dragEnter) //clicking on candy, moving the mouse to drag the candy
            tile.addEventListener("dragleave", dragLeave) //dragging candy onto another candy
            tile.addEventListener("drop", dragDrop) //leave candy over another candy
            tile.addEventListener("dragend", dragEnd) //dropping candy over another candy

            document.getElementById("board").append(tile)
            row.push(tile)

        }
        board.push(row)
    }

}



function dragStart() {
    //the tile clicked for dragging
    currTile = this

}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {

}

function dragDrop() {
    //the target tile dropped on
    otherTile = this

}

function dragEnd() { //swapping images rather than the tiles
    if (lives == 0 || score >= 10) {
        return
    }

    if (currTile.src.includes("bg") || otherTile.src.includes("bg")) { //checks to not swap blank tile
        return
    }

    let currCoords = currTile.id.split("-") //id ="0-0" -> ["0","0"] //grabing the row and column of the first emoji
    let r = parseInt(currCoords[0]) //r takes the first value of the currCoords array
    let c = parseInt(currCoords[1]) // c takes the second value

    let otherCoords = otherTile.id.split("-")
    let r2 = parseInt(otherCoords[0])
    let c2 = parseInt(otherCoords[1]) //same thing with the first emoji

    let moveLeft = c2 == c - 1 && r == r2 // if other emoji is same row as current emoji
    let moveRight = c2 == c + 1 && r == r2

    let moveUp = r2 == r - 1 && c == c2
    let moveDown = r2 == r + 1 && c == c2

    let isAdjacent = moveLeft || moveRight || moveUp || moveDown



    if (isAdjacent) {
        let currImg = currTile.src //current image equals current tile's src
        let otherImg = otherTile.src //other img also has its own imaage src
        currTile.src = otherImg //swapping
        otherTile.src = currImg

        let validMove = checkValid()
        if (!validMove) {
            let currImg = currTile.src
            let otherImg = otherTile.src
            currTile.src = otherImg
            otherTile.src = currImg
        }
    }
}

function crushEmojis() {
    crush5()
    crush4()
    crush3()
}

function crush5() {
    //crushing rows
    for (let r = 0; r < rows; r++) {

        for (let c = 0; c < columns - 4; c++) {
            let emoji1 = board[r][c]
            let emoji2 = board[r][c + 1]
            let emoji3 = board[r][c + 2]
            let emoji4 = board[r][c + 3]
            let emoji5 = board[r][c + 4]

            if (emoji1.src == emoji2.src && emoji2.src == emoji3.src && emoji3.src == emoji4.src && emoji4.src == emoji5.src && !emoji1.src.includes("bg")) {
                emoji1.src = "./emojis/bg.png"
                emoji2.src = "./emojis/bg.png"
                emoji3.src = "./emojis/travelling.png"
                emoji4.src = "./emojis/bg.png"
                emoji5.src = "./emojis/bg.png"
                console.log("Crushed a super 5 row")
                lives -= 1
                score += 5
                document.getElementById("score").innerText = score
                document.getElementById("lives-el").innerText = lives
            }
        }
    }
    //crushing columns
    for (let c = 0; c < columns; c++) {

        for (let r = 0; r < rows - 4; r++) {
            let emoji1 = board[r][c]
            let emoji2 = board[r + 1][c]
            let emoji3 = board[r + 2][c]
            let emoji4 = board[r + 3][c]
            let emoji5 = board[r + 4][c]

            if (emoji1.src == emoji2.src && emoji2.src == emoji3.src && emoji3.src == emoji4.src && emoji4.src == emoji5.src && !emoji1.src.includes("bg")) {
                emoji1.src = "./emojis/bg.png"
                emoji2.src = "./emojis/bg.png"
                emoji3.src = "./emojis/travelling.png"
                emoji4.src = "./emojis/bg.png"
                emoji5.src = "./emojis/bg.png"

                console.log("Crushed a Super 5 column")
                lives -= 1
                score += 5
                document.getElementById("score").innerText = score
                document.getElementById("lives-el").innerText = lives
            }
        }
    }
}

function crush4() {

    //crushing rows
    for (let r = 0; r < rows; r++) {

        for (let c = 0; c < columns - 3; c++) {
            let emoji1 = board[r][c]
            let emoji2 = board[r][c + 1]
            let emoji3 = board[r][c + 2]
            let emoji4 = board[r][c + 3]

            if (emoji1.src == emoji2.src && emoji2.src == emoji3.src && emoji3.src == emoji4.src && !emoji1.src.includes("bg")) {
                emoji1.src = "./emojis/bg.png"
                emoji2.src = "./emojis/bg.png"
                emoji3.src = "./emojis/bg.png"
                emoji4.src = "./emojis/bg.png"
                console.log("Crushed a 4 row")

                score += 4
                lives -= 1
                document.getElementById("score").innerText = score
                document.getElementById("lives-el").innerText = lives
            }
        }
    }
    //crushing columns
    for (let c = 0; c < columns; c++) {
        if (lives == 0) {
            return

        }


        for (let r = 0; r < rows - 3; r++) {
            let emoji1 = board[r][c]
            let emoji2 = board[r + 1][c]
            let emoji3 = board[r + 2][c]
            let emoji4 = board[r + 3][c]

            if (emoji1.src == emoji2.src && emoji2.src == emoji3.src && emoji3.src == emoji4.src && !emoji1.src.includes("bg")) {
                emoji1.src = "./emojis/bg.png"
                emoji2.src = "./emojis/bg.png"
                emoji3.src = "./emojis/bg.png"
                emoji4.src = "./emojis/bg.png"
                console.log("Crushed a 4 column")

                score += 4
                lives -= 1
                document.getElementById("score").innerText = score
                document.getElementById("lives-el").innerText = lives
            }
        }
    }
}

function crush3() {

    //crushing rows
    for (let r = 0; r < rows; r++) {

        for (let c = 0; c < columns - 2; c++) {
            let emoji1 = board[r][c]
            let emoji2 = board[r][c + 1]
            let emoji3 = board[r][c + 2]

            if (emoji1.src == emoji2.src && emoji2.src == emoji3.src && !emoji1.src.includes("bg")) {
                emoji1.src = "./emojis/bg.png"
                emoji2.src = "./emojis/bg.png"
                emoji3.src = "./emojis/bg.png"
                console.log("Crushed a 3 row")

                score += 3
                lives -= 1
                document.getElementById("score").innerText = score
                document.getElementById("lives-el").innerText = lives
            }
        }
    }
    //crushing columns
    for (let c = 0; c < columns; c++) {

        for (let r = 0; r < rows - 2; r++) {
            let emoji1 = board[r][c]
            let emoji2 = board[r + 1][c]
            let emoji3 = board[r + 2][c]

            if (emoji1.src == emoji2.src && emoji2.src == emoji3.src && !emoji1.src.includes("bg")) {
                emoji1.src = "./emojis/bg.png"
                emoji2.src = "./emojis/bg.png"
                emoji3.src = "./emojis/bg.png"
                console.log("Crushed a 3 column")

                score += 3
                lives -= 1
                document.getElementById("score").innerText = score
                document.getElementById("lives-el").innerText = lives
            }
        }
    }
}

function checkValid() {
    for (let r = 0; r < rows; r++) {

        for (let c = 0; c < columns - 2; c++) {
            let emoji1 = board[r][c]
            let emoji2 = board[r][c + 1]
            let emoji3 = board[r][c + 2]

            if (emoji1.src == emoji2.src && emoji2.src == emoji3.src && !emoji1.src.includes("bg")) {
                return true
            }
        }
    }
    //crushing columns
    for (let c = 0; c < columns; c++) {

        for (let r = 0; r < rows - 2; r++) {
            let emoji1 = board[r][c]
            let emoji2 = board[r + 1][c]
            let emoji3 = board[r + 2][c]

            if (emoji1.src == emoji2.src && emoji2.src == emoji3.src && !emoji1.src.includes("bg")) {
                return true
            }
        }

    }
    return false
}

function slideCandy() { //sliding the candy down

    for (c = 0; c < columns; c++) { //iterate each column
        let ind = rows - 1 //start from the bottom of each column
        for (r = columns - 1; r >= 0; r--) { //going up
            if (!board[r][c].src.includes("bg")) { //if its no blank its an emoji
                board[ind][c].src = board[r][c].src //set the image of the current blank tile to  that candy up there
                ind -= 1 //move the blank tile up by 1
            }

        }

        for (let r = ind; r >= 0; r--) { //set the slided tiles to blank
            board[r][c].src = "./emojis/bg.png" //
        }
    }
}

function generateEmojis() { //generate emojis only for the first row
    for (c = 0; c < columns; c++) {
        if (board[0][c].src.includes("bg")) {
            board[0][c].src = "./emojis/" + randomEmoji() + ".png"
        }
    }
}





























/**document.addEventListener('DOMContentLoaded', () => { //event listener for the whole html doc
    const grid = document.querySelector('.grid') //grab the grid element
    const scoreDisplay = document.getElementById('score')
    const width = 8 // size of the small divs in the grid
    const squares = [] //store squares 
    let score = 0 //after each match make a score

    const emojis = [ //an array of colors that will be used
           funny50.png)',
           emoji50.png)',
           cool50.png)',
           smile50.png)',
           winking-face50.png)',
           laughing50.png)'
        ]
        //create board
    function createBoard() {
        for (let i = 0; i < width * width; i++) { //loop around the 8*8 times
            const square = document.createElement('div') //create a div element 
            square.setAttribute('draggable', true) // make a square draggable
            square.setAttribute('id', i) //assign each square an id starting from 0
            let randomColor = Math.floor(Math.random() * emojis.length) //randomising colors
            square.style.backgroundImage = emojis[randomColor] //assign a random color to a square
            grid.appendChild(square) //put the square in the grid
            squares.push(square) //throw each created squre into the squares array

        }
    }
    createBoard()







    //Dragging the candies

    let emojibeingDragged //store the emoji being picked up and dragged
    let EmojibeingReplaced // the replaced emoji being stored
    let squareIdBeingDragged //store the id of the dragged square
    let squareIdBeingReplaced //store the id of the replaced square

    // the green are the events being listened and the other are functions that will be called 
    tile.addEventListener('dragstart', dragStart))
    tile.addEventListener('dragend', dragEnd))
    tile.addEventListener('dragover', dragOver))
    tile.addEventListener('dragenter', dragEnter))
    tile.addEventListener('dragleave', dragLeave))
    tile.addEventListener('drop', dragDrop))

    function dragStart() {
        emojibeingDragged = this.style.backgroundImage // save the dragged color
        squareIdBeingDragged = parseInt(this.id) // to replace the color correctly
    }

    function dragOver(e) {
        e.preventDefault() //prevent an event from doing its default function
    }

    function dragEnter(e) {
        e.preventDefault() //prevent an event from doing its default function

    }

    function dragLeave() {
        this.style.backgroundImage = ''
    }

    function dragDrop() {
        console.log(this.id, 'dragdrop')
        EmojibeingReplaced = this.style.backgroundImage //store the original color
        this.style.backgroundImage = emojibeingDragged
        squareIdBeingReplaced = parseInt(this.id)
        squares[squareIdBeingDragged].style.backgroundImage = EmojibeingReplaced //give the origina square tbeing dragged this color
    }

    function dragEnd() {
        //what is a valid move
        //array of all valid moves
        let validMoves = [
            squareIdBeingDragged - 1, //every square being dragged is a valid move
            squareIdBeingDragged - width, //
            squareIdBeingDragged + 1,
            squareIdBeingDragged + width
        ]
        let validMove = validMoves.includes(squareIdBeingReplaced) //if valid moves has squareIdbeing replaced, this statement is true
        if (squareIdBeingReplaced && validMove) {
            squareIdBeingReplaced = null //if true, clear the value of square being repplaced
        } else if (squareIdBeingReplaced && !validMove) { //if there is an invalid move
            squares[squareIdBeingReplaced].style.backgroundImage = EmojibeingReplaced //set the square back to its og color
            squares[squareIdBeingDragged].style.backgroundImage = emojibeingDragged //same with the dragged square
        } else squares[squareIdBeingDragged].style.backgroundImage = emojibeingDragged //if none is true, square being dragged goes back to its OG space

    }
    //drop candies once cleared
    function moveDown() {
        for (i = 0; i < 55; i++) {
            if (squares[i + width].style.backgroundImage === '') { //check a square bg color, if blank
                squares[i + width].style.backgroundImage = squares[i].style.backgroundImage //give squares bg color to it
                squares[i].style.backgroundImage = '' //remove color from the square to make it empty
                const firstRow = [0, 1, 2, 3, 4, 5, 6, 7] //first row
                const isFirstRow = firstRow.includes(i)
                if (isFirstRow && squares[i].style.backgroundImage === '') {
                    let randomEmoji = Math.floor(Math.random() * emojis.length)
                    squares[i].style.backgroundImage = squares[randomEmoji]
                }
            }
        }
    }

    function refillBoard() {
        for (i = 0; i < 8; i++) {
            if (squares[i + width].style.backgroundImage == '') {
                let randomEmoji = Math.floor(Math.random() * emojis.length)
                squares[i + width].style.backgroundImage = squares[randomEmoji]
                squares.push(i)

            }
        }


    }




    //checking for matches
    //checking rows of four
    function checkRowFor5() {
        for (i = 0; i < 60; i++) {
            let rowOf5 = [i, i + 1, i + 2, i + 3, i + 4]
            let chosenEmoji = squares[i].style.backgroundImage
            const isBlank = squares[i].style.backgroundImage === ''

            const notvalid = [4, 5, 6, 7, 12, 13, 14, 15, 20, 21, 22, 23, 28, 29, 30, 31, 36, 37, 38, 39, 44, 45, 46, 47, 52, 53, 54, 55]
            if (notvalid.includes(i)) continue

            if (rowOf5.every(index => squares[index].style.backgroundImage === chosenEmoji && !isBlank)) {
                score += 5

                scoreDisplay.innerHTML = score

                rowOf5.forEach(index => {
                    squares[index].style.backgroundImage = ''

                })
            }
        }
    }
    //checkRowFor5()
    //checking for matches
    //checking columns for four
    function checkColFor5() {
        for (i = 0; i < 39; i++) {
            let colOf5 = [i, i + width, i + width * 2, i + width * 3, i + width * 4]
            let chosenEmoji = squares[i].style.backgroundImage
            const isBlank = squares[i].style.backgroundImage === ''


            if (colOf5.every(index => squares[index].style.backgroundImage === chosenEmoji && !isBlank)) {
                score += 5
                scoreDisplay.innerHTML = score
                colOf5.forEach(index => {
                    squares[index].style.backgroundImage = ''
                })
            }
        }
    }
    //checking for matches
    //checking rows of four
    function checkRowFor4() {
        for (i = 0; i < 60; i++) {
            let rowOf4 = [i, i + 1, i + 2, i + 3]
            let chosenEmoji = squares[i].style.backgroundImage
            const isBlank = squares[i].style.backgroundImage === ''

            const notvalid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55]
            if (notvalid.includes(i)) continue

            if (rowOf4.every(index => squares[index].style.backgroundImage === chosenEmoji && !isBlank)) {
                score += 4
                scoreDisplay.innerHTML = score

                rowOf4.forEach(index => {
                    squares[index].style.backgroundImage = ''

                })
            }
        }
    }
    //checkRowFor4()
    //checking for matches
    //checking columns for four
    function checkColFor4() {
        for (i = 0; i < 39; i++) {
            let colOf4 = [i, i + width, i + width * 2, i + width * 3]
            let chosenEmoji = squares[i].style.backgroundImage
            const isBlank = squares[i].style.backgroundImage === ''


            if (colOf4.every(index => squares[index].style.backgroundImage === chosenEmoji && !isBlank)) {
                score += 4
                scoreDisplay.innerHTML = score
                colOf4.forEach(index => {
                    squares[index].style.backgroundImage = ''
                })
            }
        }
    }
    //checkColFor4()



    /////////////////



    //checking for matches
    //checking rows of three
    function checkRowFor3() {
        for (i = 0; i < 61; i++) {
            let rowOf3 = [i, i + 1, i + 2]
            let chosenEmoji = squares[i].style.backgroundImage
            const isBlank = squares[i].style.backgroundImage === ''

            const notvalid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55]
            if (notvalid.includes(i)) continue

            if (rowOf3.every(index => squares[index].style.backgroundImage === chosenEmoji && !isBlank)) {
                score += 3
                scoreDisplay.innerHTML = score
                rowOf3.forEach(index => {
                    squares[index].style.backgroundImage = ''
                })
            }
        }
    }
    //checkRowFor3()

    //checking for matches
    //checking columns of three
    function checkColFor3() {
        for (i = 0; i < 47; i++) {
            let colOf3 = [i, i + width, i + width * 2]
            let chosenEmoji = squares[i].style.backgroundImage
            const isBlank = squares[i].style.backgroundImage === ''


            if (colOf3.every(index => squares[index].style.backgroundImage === chosenEmoji && !isBlank)) {
                score += 3
                scoreDisplay.innerHTML = score
                colOf3.forEach(index => {
                    squares[index].style.backgroundImage = ''

                })
            }
        }
    }
    // checkColFor3()


    window.setInterval(function() {
        moveDown()
        checkColFor5()
        checkRowFor5()
        checkColFor4()
        checkRowFor4()
        checkRowFor3()
        checkColFor3()
            //refillBoard()
            //chechBoard()
    }, 1000)


    //window.setInterval(function() {
    //chechBoard()
    // }, 900)

}) **/