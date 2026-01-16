function playBlackjack(){
 if(coins < 100){
   alert("Not enough coins");
   return;
 }
 coins -= 100;

 let player = Math.floor(Math.random()*11)+16;
 let dealer = Math.floor(Math.random()*11)+16;

 let msg = "You: "+player+" | Dealer: "+dealer+" — ";

 if(player > 21){
   msg += "You Bust!";
 } 
 else if(dealer > 21 || player > dealer){
   msg += "You Win +300!";
   coins += 300;
 } 
 else if(player === dealer){
   msg += "Draw! Bet Returned";
   coins += 100;
 } 
 else {
   msg += "Dealer Wins!";
 }

 document.getElementById("blackjackResult").innerText = msg;
 updateCoins();
}
