/* ____________________ Project Plan ____________________*/
/* 
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
/* _________________ the real code _______________*/
/* deck & card variables ___________*/
let card = document.getElementsByClassName("card");
let cards = [...card]
const deck = document.getElementById("card-deck");
//console.log(cards);

/* move variables ___________*/
let moves = 0;
let movesCounter = document.querySelector(".moves");

/* star rating variables ___________*/
const stars = document.querySelectorAll(".fa-star");
let starsList = document.querySelectorAll(".stars li");

/* match & opencards variables ___________*/
let matchedCard = document.getElementsByClassName("match");
var openedCards = [];

/* start game with shuffle functions_______________*/
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
    cards = shuffle(cards);
    
    for (let i = 0; i < cards.length; i++){
        deck.innerHTML = "";
        [].forEach.call(cards, function(item) {
            deck.appendChild(item);
        });
        cards[i].classList.remove("show", "open", "match", "disabled");
    }
    // to reset the timer
    second = 0;
    minute = 0; 
    hour = 0;
    let timer = document.querySelector(".timer");
    timer.innerHTML = "0 mins 0 secs";
    clearInterval(interval);
    // reset moves
    moves = 0;
    movesCounter.innerHTML = moves;
}
/* build a card display function ________________*/
let displayCard = function (){
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
};

/* build a match & unmatch function ________________*/
function matched(){
    openedCards[0].classList.add("match", "disabled");
    openedCards[1].classList.add("match", "disabled");
    openedCards[0].classList.remove("show", "open", "no-event");
    openedCards[1].classList.remove("show", "open", "no-event");
    openedCards = [];
}

function unmatched(){
    openedCards[0].classList.add("unmatched");
    openedCards[1].classList.add("unmatched");
    disable();
    setTimeout(function(){
        openedCards[0].classList.remove("show", "open", "no-event","unmatched");
        openedCards[1].classList.remove("show", "open", "no-event","unmatched");
        enable();
        openedCards = [];
    },1100);
}
 /* build an opend cards on matched function ___________*/
 function cardOpen() {
    openedCards.push(this);
    let arrLeng = openedCards.length;
    if(arrLeng === 2){
        s();
        if(openedCards[0].type === openedCards[1].type){
            matched();
        } else {
            unmatched();
        }
    }
};
/* make cards enabled or disabled ___________________*/
function disable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.add('disabled');
    });
}

function enable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.remove('disabled');
        for(let i = 0; i < matchedCard.length; i++){
            matchedCard[i].classList.add("disabled");
        }
    });
}
/* Build a timer function ____________________ */
let second = 0;
let minute = 0;
let hour = 0;
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

/* Build a moves counter function _________________ */
function moveCounter(){
    moves++;
    movesCounter.innerHTML = moves;
    
    if(moves == 1){
        second = 0;
        minute = 0; 
        hour = 0;
        startTimer();
    }
    /* Build a star rating based on moves ________________*/
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

/* Add an event listener to cards ____________*/
for (let i = 0; i < cards.length; i++){
    card = cards[i];
    card.addEventListener("click", displayCard);
    card.addEventListener("click", cardOpen);
}
/* buils a winner message function _____________*/
function congratulations(){
    if (matchedCard.length == 16){
        clearInterval(interval);
        finalTime = timer.innerHTML;
        modal.classList.add("show");

        let starRating = document.querySelector(".stars").innerHTML;

        document.getElementById("finalMove").innerHTML = moves;
        document.getElementById("starRating").innerHTML = starRating;
        document.getElementById("totalTime").innerHTML = finalTime;

        closeModal();
    };
}

function closeModal(){
    closeicon.addEventListener("click", function(e){
        modal.classList.remove("show");
        startGame();
    });
}

function playAgain(){
    modal.classList.remove("show");
    startGame();
}