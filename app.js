let gameSeq = [];
let userSeq = [];
let max = 0;

let started = false;
let level = 0;

let colors = ['red' , 'yellow', 'green', 'purple'];
let para = document.querySelector('p');

document.addEventListener('keydown', function() {
    if(started == false){
        started = true;
        levelUp();
    }
});

function levelUp(){
    userSeq = [];
    level++;
    para.innerText = `Level ${level}`;
    let rand = Math.floor(Math.random() * 4);
    let rand_item = document.querySelector(`.${colors[rand]}`);
    gameFlash(rand_item);
    gameSeq.push(colors[rand]);
}

function gameFlash(btn){
    btn.classList.add('gameflash');
    setTimeout(() => {
        btn.classList.remove('gameflash');
    }, 250);
}

let allBtns = document.querySelectorAll('.btn');

function userFlash(btn){
    btn.classList.add('userflash');
    setTimeout(() => {
        btn.classList.remove('userflash');
    }, 250);
}

function wrongFlash() {
    document.querySelector('body').style.backgroundColor = 'red';
    setTimeout(function () {
        document.querySelector('body').style.backgroundColor = 'white';
    }, 150);
}

function checkAns(idx){
    if(gameSeq[idx] === userSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(() => {
                levelUp();
            }, 700);    
        }
    }else{
        wrongFlash();
        let score = level-1;
        max = Math.max(max,score);
        document.querySelector('span').innerText = "";
        document.querySelector('span').append(max);
        para.innerHTML = `Game Over! Your score is <b>${score}</b><br>Press any key to continue...`;
        reset();
    }
}

function btnPress() {
    if(started == true){
        let btn = this;
        userFlash(btn);
        let id = btn.getAttribute('id');
        userSeq.push(id);
        checkAns(userSeq.length-1);
    }
}

for(btn of allBtns){
    btn.addEventListener('click', btnPress);
}

function reset(){
    gameSeq = [];
    userSeq = [];
    started = false;
    level = 0;
}

