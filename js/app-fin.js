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
let moveCounter = document.querySelector(".moves");

/* star rating variables ___________*/
const stars = document.querySelectorAll(".fa-star");
let starsList = document.querySelectorAll(".stars li");

/* match & opencards variables ___________*/
let matchedCard = document.getElementsByClassName("match");
var openedCards = [];

/* start game with shuffle functions_______________*/
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

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
    
    for (var i = 0; i < cards.length; i++){
        deck.innerHTML = "";
        [].forEach.call(cards, function(item) {
            deck.appendChild(item);
        });
        cards[i].classList.remove("show", "open", "match", "disabled");
    }
    
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




