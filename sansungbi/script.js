const canvas = document.getElementById("canvas");
const monitor = document.getElementById("monitor");
const input = document.getElementById("input");
const life = document.getElementById("life");
const start = document.getElementById("start");
const score = document.getElementById("score");
const width = document.getElementById("monitor").offsetWidth;
const height = document.getElementById("monitor").offsetHeight;
const data = ["hi", "안녕", "헬로우", "bong", "hahaha"];

function startGame() {
  let levelsp = 5000;
  let cnt = 0;
  let level = 1;
  let levelcnt = 10;
  let hi;

  function generator() {
    console.log(start.innerText);
    if (start.innerText === "restart!") {
      life.innerText = "♥♥♥♥♥";
      start.innerText = "start";
      score.innerText = "score: 0";
      monitor.removeChild(document.getElementById("restart"));
    }

    let newWord = makeword(Math.random() * (width - 30));
    monitor.appendChild(newWord.node);

    if (life.innerText.length === 0) {
      console.log(monitor.firstChild);
      monitor.removeChild(monitor.firstChild);
      clearTimeout(hi);
      monitor.innerHTML = restart();
      return;
    }
    hi = setTimeout(generator, levelsp);
  }

  function gotcha(e) {
    const wordsList = monitor.querySelectorAll("div");
    if (e.key === "Enter") {
      for (let i = 0; i < wordsList.length; i++) {
        if (wordsList[i].innerText === input.value) {
          const removed = document.getElementById(wordsList[i].id);
          monitor.removeChild(removed);
          input.value = "";
          console.log(score.innerText);
          score.innerText = `score : ${cnt + 10}`;
          cnt += 10;
          levelcnt--;
          if (levelcnt === 0) {
            levelcnt = level * 10;
            level++;
            levelsp -= 200;
            console.log(levelcnt);
          }
          return;
        }
      }
    }
  }

  function restart() {
    start.innerText = "restart!";
    return `
    <div id = "restart">RESTART!</div> 
    `;
  }
  start.addEventListener("click", generator);
  input.addEventListener("keypress", gotcha);
}

function makeword(y) {
  const El = {};
  let elTop = 0;
  let speed = 100;
  let madeword = data[Math.floor(Math.random() * data.length)];

  const Elconstructor = function () {
    const word = document.createElement("div");

    word.append(madeword);
    word.className = "words";
    word.style.position = "absolute";

    word.id = Math.floor(Math.random() * 1000).toString();
    return word;
  };

  El.node = Elconstructor();

  El.setElPos = function (x, y) {
    Object.assign(El.node.style, {
      left: `${y}px`,
      top: `${x}px`,
    });
  };

  El.Elmove = function (x, y) {
    let interval;
    if (elTop > 800) {
      const cid = document.getElementById(El.node.id);

      if (cid) {
        if (life.innerText.length !== 1) {
          life.innerText = life.innerText.slice(0, life.innerText.length - 1);
          monitor.removeChild(El.node);
          clearTimeout(interval);
        } else if (life.innerText.length === 1) {
          life.innerText = life.innerText.slice(0, life.innerText.length - 1);

          monitor.innerHTML = "";
          clearTimeout(interval);
        }
      }
    }

    El.node.style.top = `${elTop}px`;
    elTop += 10;
    interval = setTimeout(El.Elmove, speed);
  };

  El.setElPos(0, y);
  El.Elmove();

  return El;
}

startGame();
