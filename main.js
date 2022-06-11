var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

var mini = {
    x : 500,
    y : 60,
    width : 15,
    height : 15,
    draw(){
        ctx.fillStyle = 'gray';
        ctx.fillRect(this.x,this.y,this.width,this.height);
    }
}

var square = {
    x : 900,
    y : 60,
    width : 30,
    height : 30,
    draw(){
        ctx.fillStyle = 'brown';
        ctx.fillRect(this.x,this.y,this.width,this.height);
    }
}

var earth = {
    x : 80,
    y : 600,
    width : 1600,
    height : 30,
    draw(){
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x,this.y,this.width,this.height);
    }
}

var object = {
    x : 1200,
    y : 100,
    width : 100,
    height : 100,
    draw(){
        ctx.fillStyle = 'purple';
        ctx.fillRect(this.x,this.y,this.width,this.height);
    }
}

var miniP = {
    t : 0,
    v : 0,
    g : 0.3,
    e : 0.5,
    m : 0.5,
    a : 0,
    vx : 0,
    u : 0.3
}

var objectP = {
    t : 0,
    v : 0,
    g : 0.3,
    e : 0.5,
    m : 3,
    a : 0,
    vx : 0,
    u : 0.3
}

var squareP = {
    t : 0,
    v : 0,
    g : 0.3,
    e : 0.5,
    m : 1,
    a : 0,
    vx : 0,
    u : 0.3
}

var earthP = {
    t : 0,
    v : 0,
    g : 0.3,
    e : 0.5,
    m : 1,
    a : 0,
    vx : 0,
    u : 0.3
}

document.addEventListener('keydown', function(e){
    if (e.code == 'ArrowUp'){
        squareP.t = squareP.t - force.ft / squareP.m;
    }
    if (e.code == 'ArrowRight'){
        squareP.a = squareP.a + force.f / squareP.m;
    }
    if (e.code == 'ArrowLeft'){
        squareP.a = squareP.a - force.f / squareP.m;
    }
    if (e.code == 'ArrowDown'){
        squareP.t = squareP.t + force.ft / squareP.m;
    }
})

function ps(a, ap){
    ap.t++;
    ap.vx = ap.vx + ap.a;
    ap.a = 0;
    ap.v = ap.g*ap.t;
    a.y = a.y + ap.v;
    a.x = a.x + ap.vx;
    crash(a, earth, ap, earthP)
    crash(a, object, ap, objectP)
    crash(a, mini,ap,miniP)
}

function squareframe(){
    requestAnimationFrame(squareframe)

    ctx.clearRect(0,0, canvas.width, canvas.height)
    ps(mini, miniP)
    ps(square, squareP)
    ps(object, objectP)

    earth.draw()
    square.draw()
    object.draw()
    mini.draw()
}

function crash(a, b, ap, bp){
    var undercrashy = b.y - (a.y + a.height);
    var undercrashxleft = (a.x + a.width) - b.x;
    var undercrashxright = (b.x + b.width) - a.x;
    var overundercrashy = (a.y + a.height) - (b.y + b.height);

    if (undercrashy < 0) {
        if(undercrashxleft > 0 && undercrashxright > 0 &&overundercrashy < 0){
            if (ap.vx > ap.u) {
                if (ap.vx > ap.u*ap.g*ap.m) 
                    ap.vx = ap.vx - ap.u*ap.g*ap.m;
            }
            else if (ap.vx< -ap.u) {
                if (ap.vx < ap.u*ap.g*ap.m)
                    ap.vx = ap.vx + ap.u*ap.g*ap.m;
            }
            else{
                ap.vx = 0;
            }
            
            if(ap.v > 0.1){
                a.y = a.y + undercrashy;
                ap.t = ap.e * ap.t * -1;
            }
            else {
                ap.v = 0;
                a.y = a.y + undercrashy;
            }

        }
    }

    var leftcrashup = (a.y + a.height) - b.y;
    var leftcrashdown = (b.y + b.height) - a.y;
    var leftcrashx = b.x - (a.x + a.width);
    var overleftcrashx = (a.x + a.width) - (b.x + b. width);

    var rightcrashup = (a.y + a.height) - b.y;
    var rightcrashdown = (b.y + b.height) - a.y;
    var rightcrashx = a.x - (b.x + b.width);
    var overrightcrashx = (b.x + b.width) - (a.x + a. width);

    if (rightcrashx < 0) {
        if(rightcrashup > 0 && rightcrashdown > 0 &&overrightcrashx < 0){
            
            var afv = ap.vx;
            var bfv = bp.vx;
            a.x = a.x - rightcrashx;
            ap.vx = afv - bp.m * (1+ap.e) / (ap.m + bp.m) * (afv - bfv);
            bp.vx = bfv + ap.m * (1+ap.e) / (ap.m + bp.m) * (afv - bfv);

        }
    }
    
    if (leftcrashx < 0) {
        if(leftcrashup > 0 && leftcrashdown > 0 &&overleftcrashx < 0){
            
            var afv = ap.vx;
            var bfv = bp.vx;
            a.x = a.x + leftcrashx;
            ap.vx = afv - bp.m * (1+ap.e) / (ap.m + bp.m) * (afv - bfv);
            bp.vx = bfv + ap.m * (1+ap.e) / (ap.m + bp.m) * (afv - bfv);

        }
    }
}



var force = {
    f : 5,
    ft : 50
}

squareframe()