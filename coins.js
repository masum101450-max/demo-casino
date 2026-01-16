let coins = localStorage.getItem("coins")
 ? parseInt(localStorage.getItem("coins"))
 : 10000;

updateCoins();

function updateCoins(){
 document.getElementById("coins").innerText = coins;
 localStorage.setItem("coins", coins);
}

function resetCoins(){
 coins = 10000;
 updateCoins();
}
