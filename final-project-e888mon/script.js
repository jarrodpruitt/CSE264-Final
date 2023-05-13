

let deck = [];
let dealerAce=false;
let player1Ace= false;
let player2Ace= false;
let player3Ace = false;
let hidden;
let dealerSum=0;
let player1Sum=0;
let player2Sum=0;
let player3Sum=0;


//which players turn is it
let turn1 = false;
let turn2 = false;
let turn3 = false;
let turndealer = false;


//scoreboard wins
let win1 =0;
let win2 =0;
let win3 = 0;


let hiddendisplay = document.createElement("img");
hiddendisplay.src = "./gifs/cardback.png";
hiddendisplay.id = "hiddencard";




window.onload = function() {
    loadDeck();
    document.getElementById("deal").addEventListener("click", deal);

}

function loadDeck() {
    let num = ["a", "2", "3", "4", "5", "6", "7", "8", "9", "t", "j", "q", "k"];
    let suits = ["c", "s", "h", "d"];
    for (let i = 0; i < num.length; i++) {
        for (let j = 0; j < suits.length; j++) {
            deck.push(num[i]+suits[j]);
        }
    }

    //shuffle deck 100 times
    for (let i = deck.length -1; i > 0; i--) {
        const j = Math.floor(Math.random() * (51));
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
        // [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}






function deal(){
    let currentTurnSpan = document.getElementById("current-turn");
    currentTurnSpan.textContent = "Player 1";
    loadDeck();
    hidden = deck.pop();
    // console.log(hidden);

    //dealer inital deal
    dealerSum = cardValue(hidden);
    if (dealerSum == 11){
        dealerAce = true;
    }
    
    document.getElementById("dealer").append(hiddendisplay);

    let card = deck.pop();
    console.log(card);
    dealerSum += cardValue(card);
    console.log(dealerSum);

    let cardDisplay = document.createElement("img");
    cardDisplay.src = "./gifs/"+card+".gif";
    cardDisplay.id = "card";
    document.getElementById("dealer").append(cardDisplay);

    //Player one initial two cards
    for (let i = 0; i < 2; i++) {
        card =deck.pop();
        let cardDisplay1 = document.createElement("img");
        cardDisplay1.src = "./gifs/"+card+".gif";
        let temp = cardValue(card);
        if (temp == 11){
            player1Ace =true;
        }
        player1Sum += temp;
        
        document.getElementById("player1").append(cardDisplay1); 
        
    
    }  

    //player two inital two cards

    for (let i = 0; i < 2; i++) {
        card =deck.pop();
        let cardDisplay1 = document.createElement("img");
        cardDisplay1.src = "./gifs/"+card+".gif";
        let temp = cardValue(card);
        if (temp == 11){
            player2Ace =true;
        }
        player2Sum += temp;
        
        document.getElementById("player2").append(cardDisplay1); 
        
    }


    //player 3 initial two cards
    for (let i = 0; i < 2; i++) {
        card =deck.pop();
        let cardDisplay1 = document.createElement("img");
        cardDisplay1.src = "./gifs/"+card+".gif";
        let temp = cardValue(card);
        if (temp == 11){
            player3Ace =true;
        }
        player3Sum += temp;
        
        document.getElementById("player3").append(cardDisplay1); 
        
    }

    //set it to player 1s turn
    turn1= true;

    document.getElementById("hit").addEventListener("click", hit);
    document.getElementById("stay").addEventListener("click", stay);

    //display dealers hidden card


    // hiddendisplay.remove();

    // let dealerCard = document.createElement("img");
    // dealerCard.src = "./gifs/"+hidden+".gif";
    // dealerCard.id = "card";
    // document.getElementById("dealer").append(cardDisplay);

    

}

function hit(){
    
    
    //player one turn
    if (turn1){
        
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./gifs/" +card+".gif";
        console.log(card);
        let temp = cardValue(card);
        if (temp == 11){
            player1Ace =true;
        }
        document.getElementById("player1").append(cardImg); 
        player1Sum = player1Sum+temp;
        
        console.log(player1Sum);
        //if player sum is over 21
        if (player1Sum > 21){
            //if player has an ace, make ace = to 1 instead of 11
            if (player1Ace){
                player1Sum = player1Sum-10;
                player1Ace = false;
                //hit again
                document.getElementById("hit").addEventListener("click", hit);
                //stay and next players turn
                document.getElementById("stay").addEventListener("click", stay);

            }
            else{
                console.log("busted")
                //if no ace, player busted, end player 1 turn and start player2
                let currentTurnSpan = document.getElementById("current-turn");
                currentTurnSpan.textContent = "Player 2";
                turn1=false;
                turn2= true;
                document.getElementById("hit").addEventListener("click", hit);
            }
        }
        //if player has under 21
        else{
            //hit again
            document.getElementById("hit").addEventListener("click", hit);
            //stay and next players turn
            document.getElementById("stay").addEventListener("click", stay);
        }
    }

    //player two turn. SAME THING AS PLAYER ONE JUST FOR PLAYER 2
    else if(turn2){
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./gifs/" +card+".gif";
        console.log(card);
        let temp = cardValue(card);
        if (temp == 11){
            player1Ace =true;

        }
        document.getElementById("player2").append(cardImg); 
        player2Sum = player2Sum+temp;
        
        console.log(player2Sum);
        //if player sum is over 21
        if (player2Sum > 21){
            //if player has an ace, make ace = to 1 instead of 11
            if (player2Ace){
                player2Sum = player2Sum-10;
                player2Ace = false;
                //hit again
                document.getElementById("hit").addEventListener("click", hit);
                //stay and next players turn
                document.getElementById("stay").addEventListener("click", stay);
            }
            else{
                console.log("busted")
                //if no ace, player busted, end player 1 turn and start player2
                turn2=false;
                turn3= true;
                let currentTurnSpan = document.getElementById("current-turn");
                currentTurnSpan.textContent = "Player 3";
                document.getElementById("hit").addEventListener("click", hit);
            }
        }
        //if player has under 21
        else{
            //hit again
            document.getElementById("hit").addEventListener("click", hit);
            //stay and next players turn
            document.getElementById("stay").addEventListener("click", stay);
        }
    }

    //player 3 turn. SAME THING AS PLAYER ONE JUST FOR PLAYER 2
    else if(turn3){
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./gifs/" +card+".gif";
        console.log(card);
        let temp = cardValue(card);
        if (temp == 11){
            player1Ace =true;
        }
        document.getElementById("player3").append(cardImg); 
        player3Sum = player3Sum+temp;
        
        console.log(player3Sum);
        //if player sum is over 21
        if (player3Sum > 21){
            //if player has an ace, make ace = to 1 instead of 11
            if (player3Ace){
                player3Sum = player3Sum-10;
                player3Ace = false;
                //hit again
                document.getElementById("hit").addEventListener("click", hit);
                //stay and next players turn
                document.getElementById("stay").addEventListener("click", stay);
            }
            else{
                console.log("busted")
                //if no ace, player busted, end player 1 turn and start player2
                turn3=false;
                turnDealer = true;
                let currentTurnSpan = document.getElementById("current-turn");
                currentTurnSpan.textContent = "Dealer";
                dealer();
                
            }
        }
        //if player has under 21
        else{
            //hit again
            document.getElementById("hit").addEventListener("click", hit);
            //stay and next players turn
            document.getElementById("stay").addEventListener("click", stay);
        }
    }

    
}


function stay(){
    if (turn1){
        turn1 = false;
        turn2 = true;
        let currentTurnSpan = document.getElementById("current-turn");
        currentTurnSpan.textContent = "Player 2";
        document.getElementById("hit").addEventListener("click", hit);
    }
    else if(turn2){
        turn2 = false;
        turn3 = true;
        let currentTurnSpan = document.getElementById("current-turn");
        currentTurnSpan.textContent = "Player 3";
        document.getElementById("hit").addEventListener("click", hit);
    }
    else if(turn3){
        turn3 = false;
        turndealer = true;
        let currentTurnSpan = document.getElementById("current-turn");
        currentTurnSpan.textContent = "Dealer";
        dealer();
        
    }
}


function dealer(){
    //remove hidden card and actually show face of the card
    hiddendisplay.remove();
    let hiddendisplayC = document.createElement("img");
    hiddendisplayC.src = "./gifs/"+hidden+".gif";
    hiddendisplayC.id = "hiddencard";
    document.getElementById("dealer").append(hiddendisplayC);


    //deals until dealer has more than 16 or busts
    while (dealerSum<16){
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./gifs/" +card+".gif";
        console.log(card);
        let temp = cardValue(card);
        if (temp == 11){
            dealerAce =true;
        }
        document.getElementById("dealer").append(cardImg); 
        dealerSum = dealerSum+temp;
        if(dealerSum> 21 && dealerAce){
            dealerAce = false;
            dealerSum = dealerSum - 10;
        }
    }
    console.log(dealerSum);
    finish();

}

function finish(){

    //player 1 scoring
    if (player1Sum ==21){
        win1++;
        let score = document.getElementById("player1-wins");
        score.textContent = win1.toString();
    }
    else if(player1Sum < 21){
        if (dealerSum>21){
            win1++;
            let score = document.getElementById("player1-wins");
            score.textContent = win1.toString();
        }
        else if (dealerSum<player1Sum){
            win1++;
            let score = document.getElementById("player1-wins");
            score.textContent = win1.toString();
        }
    }

    if (player2Sum ==21){
        win2++;
        let score = document.getElementById("player2-wins");
        score.textContent = win2.toString();
    }
    else if(player2Sum < 21){
        if (dealerSum>21){
            win2++;
            let score = document.getElementById("player2-wins");
            score.textContent = win2.toString();
        }
        else if (dealerSum<player2Sum){
            win2++;
            let score = document.getElementById("player2-wins");
            score.textContent = win2.toString();
        }
    }


    if (player3Sum ==21){
        win3++;
        let score = document.getElementById("player3-wins");
        score.textContent = win3.toString();
    }
    else if(player3Sum < 21){
        if (dealerSum>21){
            win3++;
            let score = document.getElementById("player3-wins");
            score.textContent = win3.toString();
        }
        else if (dealerSum<player3Sum){
            win3++;
            let score = document.getElementById("player3-wins");
            score.textContent = win3.toString();
        }
    }

    

    console.log(win1);
    console.log(win2);
    console.log(win3);
    document.getElementById("deal").addEventListener("click", clear);

   
}

function clear(){
    deck = [];
    dealerAce=false;
    player1Ace= false;
    player2Ace= false;
    player3Ace = false;
    dealerSum=0;
    player1Sum=0;
    player2Sum=0;
    player3Sum=0;


    //which players turn is it
    turn1 = false;
    turn2 = false;
    turn3 = false;
    turndealer = false;

    let p1 = document.getElementById("player1");
    p1.innerHTML= "";
    let p2 = document.getElementById("player2");
    p2.innerHTML= "";
    let p3 = document.getElementById("player3");
    p3.innerHTML= "";
    let d = document.getElementById("dealer");
    d.innerHTML= "";

    deal();
}


function cardValue(card){
    if (card[0]=="2"){
        return 2;
    }
    else if (card[0]=="3"){
        return 3;
    }
    else if (card[0]=="4"){
        return 4;
    }
    else if (card[0]=="5"){
        return 5;
    }
    else if (card[0]=="6"){
        return 6;
    }
    else if (card[0]=="7"){
        return 7;
    }
    else if (card[0]=="8"){
        return 8;
    }
    else if (card[0]=="9"){
        return 9;
    }
    else if (card[0]=="t"){
        return 10;
    }
    else if (card[0]=="j"){
        return 10;
    }
    else if (card[0]=="q"){
        return 10;
    }
    else if (card[0]=="k"){
        return 10;
    }
    else if (card[0]=="a"){
        return 11;
    }
    else{
        return null;
    }

}


