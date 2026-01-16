function playRoulette(){
 if(coins < 100){
   alert("Not enough coins");
   return;
 }
 coins -= 100;

 let userPick = parseInt(document.getElementById("roulettePick").value);
 let result = Math.floor(Math.random()*10);

 if(userPick === result){
   coins += 900;
   document.getElementById("rouletteResult").innerText =
     "Number: "+result+" — You Win +900!";
 } else {
   document.getElementById("rouletteResult").innerText =
     "Number: "+result+" — You Lost!";
 }

 updateCoins();
}
