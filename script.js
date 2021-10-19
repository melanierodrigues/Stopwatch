window.onload = ()=>{
    h = 0;
    m = 0;
    s= 0;
    mls = 0;
    timeStarted = [];
    time = document.getElementById(`time`);
    btnStart = document.getElementById(`btn-start`);
    btnPause = document.getElementById(`btn-stop`);
    btnReset = document.getElementById(`btn-reset`);
    event();
};

function event() {
    btnStart.addEventListener("click", start);
    btnPause.addEventListener("click", pause);
    btnReset.addEventListener("click", reset);
}

function write() {
    let ht, mt, st, mlts;
    mls++;

    if(mls > 99) {
        s++;
        mls= 0;
    }

    if(s > 59){
        m++;
        s=0;
    }

    if(m > 59) {
        h++;
        m=0;
    }

    if(h > 24){
        h= 0;
    }

    mlts = (`0` + mls).slice(-2);
    st = (`0` + s).slice(-2);
    mt = (`0` + m).slice(-2);
    ht = (`0` + h).slice(-2);

    time.innerHTML = `${ht}:${mt}:${st}.${mlts}`;
}

function start(){
    write();
    timeStarted = setInterval(write, 10);
    btnStart.removeEventListener("click", start);

    if(timeStarted >= 0){
    btnStart.addEventListener("click", pause);
    }
}


function pause(){
    clearInterval(timeStarted);
    btnStart.addEventListener("click", start);
}

function reset(){
    clearInterval(timeStarted);
    time.innerHTML = "00:00:00.00";
    h = 0; m = 0; s = 0; ml = 0;
    btnStart.addEventListener("click", start);
}

function share(){
	if (navigator.share) {
		navigator.share({
			title: 'Stopwatch',
			text: `Your Score was ${time.innerHTML}`,
			url: window.document.location.href,
		})
		.then(() => console.log('Thanks for sharing!'))
		.catch((error) => console.log('Error sharing', error));
	}
}

let textarea = document.getElementById(`textarea`);
btnStart = document.getElementById(`btn-start`);

btnStart.addEventListener('click', function () {
  textarea.innerHTML = `Your time is...`;
  if(timeStarted >= 0){
    btnStart.addEventListener("click", function () {
        textarea.innerHTML = `Your time is \n ${time.innerHTML}`
    })
    }
});

btnReset = document.getElementById(`btn-reset`);

btnReset.addEventListener(`click`, function () {
    textarea.innerHTML = `Check your time...`;
})