var isEnd;
var life;
var isClicked = [];
var endTimer;
var timers = [];
var gameTime;
var gameTimer;
var hidedButtons = [];

function play() {
  isEnd = false;
  gameTimer = setInterval(deduct, 10000);
  gameTime = 1200;
  life = 10;
  timers[1] = setTimeout(show, 10, 1)
  for (var i = 2; i < 5; i++) {
  var time = Math.random() * 2000 + 100;
  timers[i] = setTimeout(show, time, i);
  }  
};

function deduct() {
  if (gameTime != 700)
  gameTime = gameTime - 100;
  else isEnd = true; 
};

function show(id) {
  hidedButtons[id] = false;
  document.getElementById(id).style.visibility = "visible";
  timers[id] = setTimeout(hide, gameTime, id, false);
  var now = new Date();
  var sec = now.getSeconds();
  var ms = now.getMilliseconds();
  if (isEnd) {
    endTimer = setTimeout(win, 1000);
  }  
};

function hide(id) {  
  if (life == 0) {
    end();
    alert("Game over");
    return;
  }
  hidedButtons[id] = true;
  if (isClicked[id] == false) {
    life--;
  }
  else {
    isClicked[id] = false;
  }
  document.getElementById(id).style.visibility = "hidden";
  clearTimeout(endTimer);
  if (isEnd) {
    endTimer = setTimeout(win, 1000);
  }
  var time = Math.random() * 2000 + 100;
  clearTimeout(timers[id]);
  timers[id] = setTimeout(show, time, id);
  var now = new Date();
  var sec = now.getSeconds();
  var ms = now.getMilliseconds();
  if (hidedButtons == true) {
    show(Math.abs(id - 1));
  }
};

function clicked(id) {
  document.getElementById(id).style.visibility = "hidden";
  isClicked[id] = true;
}

function win() {
  end();
  alert("You won!");
}

function end() {
  for (var id = 1; id <= 4; id++) {
    document.getElementById(id).style.visibility = "hidden";      
    clearTimeout(timers[id]);
  }  
  clearTimeout(gameTimer);
  clearTimeout(endTimer);
}




