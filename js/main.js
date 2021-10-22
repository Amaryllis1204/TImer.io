let start;
let timer_id;
let stop = 0;

function showClock(){
    let now = new Date();

    //時
    let hours = now.getHours();
    hours = addZero(hours);
    //分
    let minutes = now.getMinutes();
    minutes = addZero(minutes);
    //秒
    let seconds = now.getSeconds();
    seconds = addZero(seconds);

    let nowHtml = (hours + ':' + minutes + ':' + seconds);
    document.getElementById('date').innerHTML = nowHtml;
}

//start_stopボタン操作
document.getElementById('start_stop').addEventListener('click', function(){
if(this.innerHTML === 'START'){
    start = new Date();
    timer_id = setInterval(goTimer, 10);

    //STOPボタンにする
    this.innerHTML = 'STOP';
    this.classList.remove('btn-primary');
    this.classList.add('btn-danger');

    //LAPボタンにする
    document.getElementById('reset_lap').innerHTML = 'LAP';
}else{
    stop = goTimer();
    clearInterval(timer_id);

    //STARTボタンにする
    this.innerHTML = 'START';
    this.classList.remove('btn-danger');
    this.classList.add('btn-primary');

    //RESETボタンにする
    document.getElementById('reset_lap').innerHTML = 'RESET';
}
});

//reset_lapボタン操作
document.getElementById('reset_lap').addEventListener('click', function(){
    if(this.innerHTML === 'LAP'){
        let textbox_element = document.getElementById('lapTime');
        let element = document.getElementById('timer').textContent;
        let new_element = document.createElement('p');
        new_element.innerHTML = element;
        document.getElementById('lapTime').appendChild(new_element);
    }else{
        document.getElementById('timer').innerHTML = '00:00:00:00';
        document.getElementById('lapTime').innerHTML = '';
        stop = 0;
    }
});

//時計の数字の先頭に0をつける関数
let addZero = function(value){
if(value < 10){
    value = '0' + value;
}
return value;
};

//タイマー処理の関数
let goTimer = function(value){
let now = new Date();
let time = now.getTime() - start.getTime() + stop;
let milliSec = time % 1000;
let seconds = Math.floor(time / 1000);
let minutes = Math.floor(seconds / 60);
let hours = Math.floor(minutes / 60);

seconds = seconds - minutes * 60;
minutes = minutes - hours * 60;

seconds = addZero(seconds);
minutes = addZero(minutes);
hours = addZero(hours);
milliSec = String(milliSec).slice(0, 2);
milliSec = addZero(milliSec)

document.getElementById('timer').innerHTML = hours + ':' + minutes + ':' + seconds + ':' + milliSec;

//再開した時ようにstopボタンを押すまでの時間を返す
return time;
}

function today(){
    let today = new Date();
    let dayOfWeek = today.getDay();
    let dayOfWeekStr = ['日', '月', '火', '水', '木', '金', '土'][dayOfWeek];
    let todayHtml = today.getFullYear() + '/' + (today.getMonth() + 1)+ '/' + today.getDate() + '(' + dayOfWeekStr + ')';
    document.getElementById('today').innerHTML = todayHtml;
}

setInterval('showClock()', 1000);
setInterval('today()', 1000);
