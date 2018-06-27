/*TODO:  ____________________ Project Plan ____________________*/
/*TODO:  
A) HTML asets !--------------------------------------------!
1- Game title >> header, h1 (may be modified, not sure yet).
2- Score panel >> a)- rating stars >> ul
                  b)- move counter >> span
                  c)- timer >> (span, not yet generated)
                  d)- restart button >> div, i
3- Game cards container >> div
4- Game cards >> a)- card >> ul, i
                 b)- sympol >> fa (webfont)
5- Winner message popup window >> (modal or sweetalert)
B) Game logic !--------------------------------------------!
*1* game |starts|  ----------->> *2* 16 cards |load|---->
    timer |starts|                                      |
    move counter |starts|                               |
    rating calculator |starts|                          |
                                                        |
    --<----------------*3* player |click| a card<<------|
    |-->>*4* this card |open| & |shoW| sympol --------->-
*5* the card stay |open| & |show| sympol till   <<------|
                another card |clicked|
        --------------------< >------------------                    
    <---|                                       |--->
    |---> *6(a)*                       *6(b)* <<----|
    two card |matched|_____________two card |matched|
    cards |matched|&|show|____ card|unmatched| |hide|
    |----------->>*7*moves counter(+1)<<------------|
    |--->> *8* player continues |clicking| ------>--
    *9* number of |matched| cards == 16  <<---------|
    |--->>*10*  >timer |stops|                      |
                >move counter |stops|               |
                >rating calculator |stops|
                >winner message |starts|
                >player |cick| the message
                >cards |shffled|
                >game |restarts|
----------------------------------------------------
____________________________________________________
/*  _________________ the real code _______________*/
/*TODO:  deck & card variables ___________*/

let card = document.getElementsByClassName("card");
let cards = Array.from(card);
const deck = document.getElementById("card-deck");

/*TODO:  move variables ___________*/

let moves = 0;
let movesCounter = document.querySelector(".moves");

/*TODO:  star rating variables ___________*/
const stars = document.querySelectorAll(".fa-star");
let starsList = document.querySelectorAll(".stars li");

/*TODO:  match & opencards variables ___________*/

let matchedCard = document.getElementsByClassName("match");
var openedCards = [];

/*TODO:  winnwer message variables ___________*/
 
let modal = document.getElementById("popup1")
let closeicon = document.querySelector(".close");

/*TODO:  build a card display function ________________*/

let showCard = function (){
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
};

/*TODO:  build an opend cards on matched function ___________*/

function openCard() {
    openedCards.push(this);
    if(openedCards.length === 2){
        moveCounter();
        if(openedCards[0].type === openedCards[1].type){
            openedCards[0].classList.add("match", "disabled");
            openedCards[1].classList.add("match", "disabled");
            openedCards[0].classList.remove("show", "open", "no-event");
            openedCards[1].classList.remove("show", "open", "no-event");
            openedCards = [];
        } else {
            openedCards[0].classList.add("unmatched");
            openedCards[1].classList.add("unmatched");
        lockedCards();
        setTimeout(function(){
            openedCards[0].classList.remove("show", "open", "no-event","unmatched");
            openedCards[1].classList.remove("show", "open", "no-event","unmatched");
            activeCards();
            openedCards = [];
            },1100);
        }
    }
};


/*TODO:  make cards locked or active ___________________*/

let lockedCards = function (){
    for (card of cards){
        card.classList.add('disabled');
    }
}

let activeCards = function (){
    for (card of cards){
        card.classList.remove('disabled');
        for(let i = 0; i < matchedCard.length; i++){
            matchedCard[i].classList.add("disabled");
        }
    };
}
/*TODO:  Build a moves counter function _________________ */

function moveCounter(){
    moves++;
    movesCounter.innerHTML = moves;
    
    if(moves == 1){
        second = 0;
        minute = 0; 
        hour = 0;
        startTimer();
    }

    /*TODO:  Build a star rating based on moves ________________*/

if (moves > 8 && moves < 12){
    for( i= 0; i < 5; i++){
        if(i > 3){
            stars[i].style.visibility = "collapse";
        }
    }
}
if (  moves > 13 && moves < 18 ){
    for( i= 0; i < 5; i++){
        if(i > 2){
            stars[i].style.visibility = "collapse";
        }
    }
}
if ( moves > 19 && moves < 22 ){
    for( i= 0; i < 5; i++){
        if(i > 1){
            stars[i].style.visibility = "collapse";
        }
    }
}
else if ( moves > 23 && moves < 26){
    for( i= 0; i < 5; i++){
        if(i > 0){
            stars[i].style.visibility = "collapse";
        }
    }
}
}

/*TODO:  Build a timer function ____________________ */

second = 0;
minute = 0;
hour = 0;
let timer = document.querySelector(".timer");
let interval;
function startTimer(){
    interval = setInterval(function(){
        timer.innerHTML = minute+"mins "+second+"secs";
        second++;
        if(second == 60){
            minute++;
            second=0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
    },1000);
}

/*TODO:  buils a winner message function _____________*/

function winMessage(){
    if (matchedCard.length == 16){
        clearInterval(interval);
        endTime = timer.innerHTML;
        modal.classList.add("show");

        let starRating = document.querySelector(".stars").innerHTML;
        
        document.getElementById("lastMove").innerHTML = moves;
        document.getElementById("lastRating").innerHTML = starRating;
        document.getElementById("endTime").innerHTML = endTime;

        closeWinMess();
    };
}

function closeWinMess(){
    closeicon.addEventListener("click", function(e){
        modal.classList.remove("show");
        startGame();
    });
}

function restartPlay(){
    modal.classList.remove("show");
    startGame();
}

/*TODO:  Add an event listener to cards ____________*/

for (let i = 0; i < cards.length; i++){
    card = cards[i];
    card.addEventListener("click", showCard);
    card.addEventListener("click", openCard);
    card.addEventListener("click",winMessage);
}
/*TODO:  start game with shuffle functions_______________*/
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};

document.body.onload = startGame();

function startGame(){
    // shuffle deck

    cards = shuffle(cards);
    // remove all exisiting classes from each card
    for (var i = 0; i < cards.length; i++){
        deck.innerHTML = "";
        [].forEach.call(cards, function(item) {
            deck.appendChild(item);
        });
        cards[i].classList.remove("show", "open", "match", "disabled");
    }
    

    // reset moves
    moves = 0;
    movesCounter.innerHTML = moves;
    // reset rating
    for (let i= 0; i < stars.length; i++){
        stars[i].style.color = "#FFD700";
        stars[i].style.visibility = "visible";
    }
    //reset timer
    second = 0;
    minute = 0; 
    hour = 0;
    var timer = document.querySelector(".timer");
    timer.innerHTML = "0 mins 0 secs";
    clearInterval(interval);  
}
