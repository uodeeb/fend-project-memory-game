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





