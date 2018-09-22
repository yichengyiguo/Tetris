var tab = document.getElementsByTagName("table")[0];  //主界面
var face = new Array(18);
for(var i = 0; i < 18; i++){
    face[i] = new Array(10);  //得到一个18行10列的矩阵
    for(var j = 0; j < 10; j++){
        face[i][j] = 0;  //初始化矩阵的所有值为零
    }
}
function randomGraphics(){
    var square = new Array(4);
    var random = Math.floor(Math.random()*7);
    switch(random){
        case 0:
            square[0] = {x: 0, y: 3};
            square[1] = {x: 0, y: 4};
            square[2] = {x: 0, y: 5};
            square[3] = {x: 0, y: 6};
            square[4] = "blue";
            break;
        case 1:
            square[0] = {x: 0, y: 4};
            square[1] = {x: 1, y: 4};
            square[2] = {x: 1, y: 5};
            square[3] = {x: 2, y: 5};
            square[4] = "red";
            break;
        case 2:
            square[0] = {x: 0, y: 5};
            square[1] = {x: 1, y: 4};
            square[2] = {x: 1, y: 5};
            square[3] = {x: 2, y: 4};
            square[4] = "red";
            break;
        case 3:
            square[0] = {x: 0, y: 4};
            square[1] = {x: 0, y: 5};
            square[2] = {x: 1, y: 4};
            square[3] = {x: 1, y: 5};
            square[4] = "aqua";
            break;
        case 4:
            square[0] = {x: 0, y: 4};
            square[1] = {x: 1, y: 3};
            square[2] = {x: 1, y: 4};
            square[3] = {x: 1, y: 5};
            square[4] = "chartreuse";
            break;
        case 5:
            square[0] = {x: 0, y: 4};
            square[1] = {x: 0, y: 5};
            square[2] = {x: 1, y: 5};
            square[3] = {x: 2, y: 5};
            square[4] = "blueviolet";
            break;
        case 6:
            square[0] = {x: 0, y: 4};
            square[1] = {x: 0, y: 5};
            square[2] = {x: 1, y: 4};
            square[3] = {x: 2, y: 4};
            square[4] = "blueviolet";
            break;
    }
    return square;  //随机获取一个图形
}
var square = new Array();
var score = 0;
var p = document.getElementById("score");
time = "";
function start(){
    square = randomGraphics();
    for(var i = 0; i < 4; i++){
        tab.rows[square[i].x].cells[square[i].y].style.backgroundColor = square[4];
    }
    time = setInterval(moveDown,800); //开始函数
}
function touch(){
    for(var i = 0; i < 4; i++){
        if(square[i].x + 1 > 17 || face[square[i].x + 1][square[i].y] == 1){
            return true;  
        }
    }
    return false;  //判断是否触边或者和下一个图形接触
}
function moveDown() {
    if(!touch()){
        for(var i = 0; i < 4; i++){
            tab.rows[square[i].x].cells[square[i].y].style.backgroundColor = "";
        }
        for(var i = 0; i < 4; i++){
            square[i].x = square[i].x +1;
            tab.rows[square[i].x].cells[square[i].y].style.backgroundColor = square[4];
        }  //图块向下移动
    }else{
        clearInterval(time);
        for(var i = 0; i < 4; i++){
            face[square[i].x][square[i].y] = 1;
        }
        var del = delet();
        score = score + del;
        p.innerHTML = score; //计分器
        square = randomGraphics();
        if(!touch()){
            for(var i = 0; i < 4; i++){
                tab.rows[square[i].x].cells[square[i].y].style.backgroundColor = square[4];
            }
            time = setInterval(moveDown,800);
        }
    } 
}
document.addEventListener("keydown",control)  //添加键盘控制
function control(event){
    var ctrl = event.key;
    switch(ctrl){
        case "ArrowLeft" :
            moveLeft();
            break;
        case "ArrowRight" :
            moveRight();
            break;
        case "ArrowUp" :
            change();
            break;
        case "ArrowDown" :
            moveDown();
            break;
    }
}
function left(){  //判断是否可以左移
    for(var i = 0; i < 4; i++){
        if(square[i].y - 1 < 0 || face[square[i].x][square[i].y - 1] == 1){
            return false;
        }
    }
    return true;
}
function moveLeft(){  //左移
    if(left()){
        for(var i = 0; i < 4; i++){
            tab.rows[square[i].x].cells[square[i].y].style.backgroundColor = "";
        }
        for(var i = 0; i < 4; i++){
            square[i].y = square[i].y - 1;
            tab.rows[square[i].x].cells[square[i].y].style.backgroundColor = square[4];
        }
    }
}
function right(){
    for(var i = 0; i < 4; i++){
        if(square[i].y + 1 > 9 || face[square[i].x][square[i].y + 1] == 1){
            return false;
        }
    }
    return true;
}
function moveRight(){
    if(right()){
        for(var i = 0; i < 4; i++){
            tab.rows[square[i].x].cells[square[i].y].style.backgroundColor = "";
        }
        for(var i = 0; i < 4; i++){
            square[i].y = square[i].y + 1;
            tab.rows[square[i].x].cells[square[i].y].style.backgroundColor = square[4];
        }
    }
}
function change(){  //图形的旋转
    var ox = 0;
    var oy = 0;
    for(var i = 0; i < 4; i++){
        ox = ox +square[i].x;
    }
    ox = Math.round(ox/4);
    for(var i = 0; i < 4; i++){
        oy = oy +square[i].y;
    }
    oy = Math.round(oy/4);
    var changeX = 0;
    var changeY = 0;
    var chan = 1;
    for(var i = 0; i < 4; i++){
        changeX = -square[i].y + oy + ox;
        changeY = -ox + square[i].x + oy;
        if(changeX < 0 ||changeX > 17 ||changeY < 0 || changeY > 9 || face[changeX][changeY] == 1){
            chan = 0;
        }
    }
    if(chan != 0){
        for(var i = 0; i < 4; i++){
            tab.rows[square[i].x].cells[square[i].y].style.backgroundColor = "";
        }
        for(var i = 0; i < 4; i++){
            changeX = -square[i].y + oy + ox;
            changeY = -ox + square[i].x + oy;
            square[i].x = changeX;
            square[i].y = changeY;
            tab.rows[square[i].x].cells[square[i].y].style.backgroundColor = square[4];
        }
    }
}
function delet(){  //消行
    var lines = 0;
    for(var i = 0; i < 18; i++){
        for(var j = 0; j < 10; j++){
            if(face[i][j] == 0){
                break;
            }
        }
        if(j == 10){
            lines++;
            if(i != 0){
                var k = 0;
                for(k = i; k > 0; k--){
                    face[k] = face[k - 1];
                    for(var n = 0; n < 10; n++){
                        tab.rows[k].cells[n].style.backgroundColor = tab.rows[k - 1].cells[n].style.backgroundColor;
                    }
                }
                face[0] = new Array(10);
                for(var m = 0; m < 10; m++){
                    face[0][m] = 0;
                }
            }
        }
    }
    return lines;
}
var begin = document.getElementById("begin");
begin.addEventListener("click",function(){
    if(time){
        clearInterval(time);
    }
    score = 0;
    p.innerHTML = 0;
    for(var i = 0; i < 18; i++){
        for(var j = 0; j < 10; j++){
            face[i][j] = 0;
            tab.rows[i].cells[j].style.backgroundColor = "";
        }
    }
    start();  //开始按钮
});
var pulse = document.getElementById("pulse");
pulse.addEventListener("click",function(){
    clearInterval(time);  //暂停按钮
});
var goon = document.getElementById("goon");
goon.addEventListener("click",function(){
    time = setInterval(moveDown,800);  //继续按钮
})