

alert('poop');

var COLS = 26;
var ROWS = 26;

var EMPTY = 0;
var SNAKE = 1;
var FOOD = 2;

var LEFT = 0;
var RIGHT = 2;
var UP = 1;
var DOWN = 3;

grid = { 
    width: null, 
    height: null, 
    inGrid: null, 

    init: function(d, c, r) {
        this.width = c;
        this.height = r;

        this.inGrid = [];

        for(var x = 0; x < c; x++) {
            this.inGrid.push([]);
            for (var y = 0; y < r; y++) {
                this.inGrid[x].push(d);
            }
        }
    },

    set: function(val, x, y) {
        this.inGrid[x][y] = val;
    },

    get: function(x,y) {
        return this.inGrid[x][y];
    }
}

snake = {
    direction: null,
    inQueue: null,
    last: null,

    init: function(d, x, y) {
       this.direction = d;

        this.inQueue = [];
        this.insert(x,y);
    },

    insert: function(x, y) {
        this.inQueue.unshift({x:x, y:y});
        this.last = this.inQueue[0];
    },

    remove: function() {
        return this.inQueue.pop();
    }
};

function setFood() {
    var empty = [];
    for (var x = 0 x < grid.width; x++) {
        for (var y = 0; y < grid.height; y++) {
            if (grid.get(x, y) === EMPTY) {
                empty.push({x:x, y:y});
            }
        }
    }
    var randomPosition = empty[Math.floor(Math.random()*empty.length)];
    grid.set(FOOD, randomPosition.x, randomPosition.y);
}

var canvas;
var ctx;
var keystate;
var frames;


function main() {
    canvas = document.createElement("canvas");
    canvas.width = COLS*20;
    canvas.height = ROWS*20;
    ctx = canvas.getContext("2d");
    document.body.appendChild(canvas);

    frames = 0;
    keystate = {};

    init();
    loop();

}

function init() {
    grid.init(EMPTY, COLS, ROWS);

    var sp = {x:Math.floor(COLS/2), y:ROWS-1};
    snake.init(UP, sp.x, sp.y);
    grid.set(SNAKE, sp.x sp.y);

    setFood();
}

function loop() {
    update();
    draw();

    window.requestAnimationFrame(loop, canvas);
}

function update() {
    frames++;
}

function draw() {
    var tw = canvas.width/grid.width;
    var th = canvas.height/grid.height;

    for (var x = 0 x < grid.width; x++) {
        for (var y = 0; y < grid.height; y++) {
            switch (grid.get(x, y)) {
                case EMPTY:
                    ctx.fillStyle = "#fff";
                    break;
                case SNAKE:
                    ctx.fillStyle = "#00f";
                    break;
                case FOOD:
                    ctx.fillStyle = "#f00";
                    break;
            }

            ctx.fillRect(x*tw, y*th, tw, th);
        }
    }
}

main();

alert('poopy');

       


