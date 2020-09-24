"use strict";
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext("2d");
let WIDTH = 160;
let HEIGHT = 80;
let showLines = false;
let p = 0.8;
let Dmethod = 1;
let scale = 10;
let steps = 1;
let play = false;
let show = true;
let tracing = false;
let mX = 0;
let mY = 0;
let ScaleValue = document.getElementById("ScaleValue");
let WidthValue = document.getElementById("WidthValue");
let HeightValue = document.getElementById("HeightValue");
let ProbabilityValue = document.getElementById("ProbabilityValue");
let StepsValue = document.getElementById("StepsValue");
canvas.width = WIDTH * scale;
canvas.height = HEIGHT * scale;
class Color {
    constructor(r = 0, g = 0, b = 0) {
        this.r = r;
        this.g = g;
        this.b = b;
    }
    toHex() {
        return `rgb(${Math.floor(this.r)},${Math.floor(this.g)},${Math.floor(this.b)})`;
    }
}
const WHITE = new Color(255, 255, 255);
const BLACK = new Color();
class Cell {
    constructor(alive, color = WHITE) {
        this.alive = alive;
        this.color = color;
    }
    getColor() {
        if (!this.alive) {
            this.color = WHITE;
        }
        // else this.color = BLACK
        return this.color.toHex();
    }
}
function randomColor() {
    let r = Math.floor(Math.random() * 250);
    let g = Math.floor(Math.random() * 250);
    let b = Math.floor(Math.random() * 250);
    return new Color(r, g, b);
}
class grid {
    constructor(w, h) {
        this.grid = [];
        let line = [];
        let alive = false;
        this.w = w;
        this.h = h;
        for (let x = 0; x < w; x++) {
            for (let y = 0; y < h; y++) {
                line.push(new Cell(alive, randomColor()));
            }
            this.grid.push(line);
            line = [];
        }
        // for (let x = 0; x <= w; x++) {
        //     for (let y = 0; y < h; y++) {
        //         i = false
        //         if (Math.random() >= p) i = true
        //         line.push(i)
        //     }
        //     this.grid.push(line)
        //     line = []
        // }
    }
    show(ctx) {
        ctx.strokeStyle = "grey";
        for (let x = 0; x < this.w; x++) {
            for (let y = 0; y < this.h; y++) {
                // console.log(this.grid[x][y])
                ctx.fillStyle = this.grid[x][y].getColor();
                ctx.fillRect(x * scale, y * scale, scale, scale);
                if (showLines) {
                    ctx.strokeRect(x * scale, y * scale, scale, scale);
                }
            }
        }
    }
    update() {
        let temp = [];
        let alive = false;
        let line = [];
        for (let x = 0; x < this.w; x++) {
            for (let y = 0; y < this.h; y++) {
                let color = this.grid[x][y].color;
                let out = this.neighbours(x, y);
                let n = out.sum;
                if (this.grid[x][y].alive) {
                    alive = true;
                    if (n === 2)
                        alive = true;
                    if (n === 3)
                        alive = true;
                    if (n > 3)
                        alive = false;
                    if (n < 2)
                        alive = false;
                }
                else {
                    alive = false;
                    if (n === 3) {
                        alive = true;
                        color = out.average_color;
                        color.r += Math.round(Math.random() * 6 - 3);
                        color.g += Math.round(Math.random() * 6 - 3);
                        color.b += Math.round(Math.random() * 6 - 3);
                    }
                }
                line.push(new Cell(alive, color));
            }
            temp.push(line);
            line = [];
        }
        this.grid = temp;
    }
    neighbours(x, y) {
        let average_color = new Color();
        let sum = 0;
        if (x !== 0) {
            if (this.grid[x - 1][y].alive) {
                sum += 1;
                average_color.r += this.grid[x - 1][y].color.r;
                average_color.g += this.grid[x - 1][y].color.g;
                average_color.b += this.grid[x - 1][y].color.b;
            }
            if (y !== this.h - 1) {
                if (this.grid[x - 1][y + 1].alive) {
                    sum += 1;
                    average_color.r += this.grid[x - 1][y + 1].color.r;
                    average_color.g += this.grid[x - 1][y + 1].color.g;
                    average_color.b += this.grid[x - 1][y + 1].color.b;
                }
            }
        }
        if (y !== 0) {
            if (this.grid[x][y - 1].alive) {
                sum += 1;
                average_color.r += this.grid[x][y - 1].color.r;
                average_color.g += this.grid[x][y - 1].color.g;
                average_color.b += this.grid[x][y - 1].color.b;
            }
            if (x !== 0) {
                if (this.grid[x - 1][y - 1].alive) {
                    sum += 1;
                    average_color.r += this.grid[x - 1][y - 1].color.r;
                    average_color.g += this.grid[x - 1][y - 1].color.g;
                    average_color.b += this.grid[x - 1][y - 1].color.b;
                }
            }
            if (x !== this.w - 1) {
                if (this.grid[x + 1][y - 1].alive) {
                    sum += 1;
                    average_color.r += this.grid[x + 1][y - 1].color.r;
                    average_color.g += this.grid[x + 1][y - 1].color.g;
                    average_color.b += this.grid[x + 1][y - 1].color.b;
                }
            }
        }
        if (x !== this.w - 1) {
            if (this.grid[x + 1][y].alive) {
                sum += 1;
                average_color.r += this.grid[x + 1][y].color.r;
                average_color.g += this.grid[x + 1][y].color.g;
                average_color.b += this.grid[x + 1][y].color.b;
            }
        }
        if (y !== this.h - 1) {
            if (this.grid[x][y + 1].alive) {
                sum += 1;
                average_color.r += this.grid[x][y + 1].color.r;
                average_color.g += this.grid[x][y + 1].color.g;
                average_color.b += this.grid[x][y + 1].color.b;
            }
            if (x !== this.w - 1) {
                if (this.grid[x + 1][y + 1].alive) {
                    sum += 1;
                    average_color.r += this.grid[x + 1][y + 1].color.r;
                    average_color.g += this.grid[x + 1][y + 1].color.g;
                    average_color.b += this.grid[x + 1][y + 1].color.b;
                }
            }
        }
        average_color.r = average_color.r / sum;
        average_color.g = average_color.g / sum;
        average_color.b = average_color.b / sum;
        return { sum: sum, average_color: average_color };
    }
}
let cells = new grid(WIDTH, HEIGHT);
//keys listeners
canvas.addEventListener("mousedown", function (e) {
    tracing = true;
    let x = Math.floor(e.offsetX / scale);
    let y = Math.floor(e.offsetY / scale);
    if (cells.grid[x][y].alive) {
        cells.grid[x][y].alive = false;
    }
    else {
        cells.grid[x][y].alive = true;
        cells.grid[x][y].color = randomColor();
    }
});
// canvas.addEventListener("click", function (e) {
//     let x = Math.floor(e.layerX / scale)
//     let y = Math.floor(e.layerY / scale) - 1
//     if (cells.grid[x][y]) {
//         cells.grid[x][y] = false
//     } else {
//         cells.grid[x][y] = true
//     }
// })
addEventListener("mouseup", function (e) {
    tracing = false;
    // let x = Math.floor(e.layerX / scale)
    // let y = Math.floor(e.layerY / scale) - 1
    // if (cells.grid[x][y]) {
    //     cells.grid[x][y] = false
    // } else {
    //     cells.grid[x][y] = true
    // }
});
canvas.addEventListener("mousemove", function (e) {
    let x = Math.floor(e.offsetX / scale);
    let y = Math.floor(e.offsetY / scale);
    if (x !== mX || y !== mY) {
        if (tracing) {
            if (cells.grid[x][y].alive) {
                cells.grid[x][y].alive = false;
            }
            else {
                cells.grid[x][y].alive = true;
                cells.grid[x][y].color = randomColor();
            }
        }
        mX = x;
        mY = y;
    }
});
addEventListener("keypress", function (e) {
    if (e.key === " " || e.key === "p") {
        if (play) {
            play = false;
        }
        else {
            play = true;
        }
    }
    if (e.key === "r") {
        cells.grid = [];
        let i = false;
        let line = [];
        let h = cells.h;
        let w = cells.w;
        for (let x = 0; x < w; x++) {
            for (let y = 0; y < h; y++) {
                i = false;
                if (Math.random() >= p)
                    i = true;
                let c = new Cell(i, randomColor());
                line.push(c);
            }
            cells.grid.push(line);
            line = [];
        }
    }
    if (e.key === "c") {
        cells.grid = [[]];
        let line = [];
        let w = cells.w;
        let h = cells.h;
        for (let x = 0; x < w; x++) {
            for (let y = 0; y < h; y++) {
                line.push(new Cell(false));
            }
            cells.grid.push(line);
            line = [];
        }
    }
    if (e.key === "o") {
        canvas.style.display = "none";
        let optionsDiv = document.getElementById("options");
        optionsDiv.style.display = "block";
        play = false;
        ScaleValue.value = scale.toString();
        WidthValue.value = WIDTH.toString();
        HeightValue.value = HEIGHT.toString();
        ProbabilityValue.value = p.toString();
        StepsValue.value = steps.toString();
    }
});
function validateOptions() {
    canvas.style.display = "block";
    let optionsDiv = document.getElementById("options");
    optionsDiv.style.display = "none";
    scale = parseInt(ScaleValue.value, 10);
    WIDTH = parseInt(WidthValue.value, 10);
    HEIGHT = parseInt(HeightValue.value, 10);
    p = parseFloat(ProbabilityValue.value);
    steps = parseInt(StepsValue.value, 10);
    canvas.width = WIDTH * scale;
    canvas.height = HEIGHT * scale;
    cells.w = WIDTH;
    cells.h = HEIGHT;
    // clear the grid to the right format
    cells.grid = [[]];
    let line = [];
    // let i: boolean = true
    let w = cells.w;
    let h = cells.h;
    for (let x = 0; x < w; x++) {
        for (let y = 0; y < h; y++) {
            line.push(new Cell(false));
        }
        cells.grid.push(line);
        line = [];
    }
}
let f = 0;
function draw() {
    if (show)
        cells.show(ctx);
    requestAnimationFrame(draw);
    f += 1;
    if (f >= steps) {
        f = 0;
        if (play)
            cells.update();
    }
}
draw();
