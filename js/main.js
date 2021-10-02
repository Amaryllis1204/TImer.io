
let start;
let timer_id;

//ボタン操作
document.getElementById('start_stop').addEventListener('click', function(){
if(this.innerHTML === 'START'){
    start = new Date();
    timer_id = setInterval(goTimer, 10);

    //STOPボタンにする
    this.innerHTML = 'STOP';
    this.classList.remove('btn-primary');
    this.classList.add('btn-danger');
}else{
    clearInterval(timer_id);

    //STRATボタンにする
    this.innerHTML = 'START';
    this.classList.remove('btn-danger');
    this.classList.add('btn-primary');
}
});

document.getElementById('reset').addEventListener('click', function(){
document.getElementById('timer').innerHTML = '00:00:00';
});



//時計の数字の先頭に0をつける関数
let addZero = function(value){
if(value < 10){
    value = '0' + value;
}
return value;
};

//タイマー処理の関数
let goTimer = function(){
let now = new Date();
let milli = now.getTime() - start.getTime();
let seconds = Math.floor(milli / 1000);
let minutes = Math.floor(seconds / 60);
let hours = Math.floor(minutes / 60);

seconds = seconds - minutes * 60;
minutes = minutes - hours * 60;

seconds = addZero(seconds);
minutes = addZero(minutes);
hours = addZero(hours);

document.getElementById('timer').innerHTML = hours + ':' + minutes + ':' + seconds;
}
