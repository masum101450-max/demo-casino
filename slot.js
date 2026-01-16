function playSlot(){
 if(coins < 100){
   alert("Not enough coins");
   return;
 }
 coins -= 100;

 const symbols = ["🍒","🍋","⭐","🔔"];
 let a = symbols[Math.floor(Math.random()*4)];
 let b = symbols[Math.floor(Math.random()*4)];
 let c = symbols[Math.floor(Math.random()*4)];

 document.getElementById("slotDisplay").innerText = a+" "+b+" "+c;

 if(a === b && b === c){
   coins += 500;
   document.getElementById("slotResult").innerText = "You Win +500!";
 } else {
   document.getElementById("slotResult").innerText = "Try Again!";
 }

 updateCoins();
}
