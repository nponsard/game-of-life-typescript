

let canvas = <HTMLCanvasElement>document.getElementById('canvas')
let ctx = <CanvasRenderingContext2D>canvas.getContext("2d")
let WIDTH = 1000
let HEIGHT = 1000

canvas.width = WIDTH
canvas.height = HEIGHT

class grid {

    grid: Array<Array<boolean>>
    w: number
    h: number
    constructor(w: number, h: number) {
        this.grid = [[]]
        let line: Array<boolean> = []
        let i: boolean = true
        this.w = w
        this.h = h

        for (let x = 0; x <= w; x++) {
            for (let y = 0; y < h; y++) {
                i = false
                if (Math.random() >= 0.5) i = true
                line.push(i)
            }
            this.grid.push(line)
        }
    }

    show(ctx: CanvasRenderingContext2D) {

        for (let x = 0; x <= this.w; x++) {
            for (let y = 0; y < this.h; y++) {
                ctx.beginPath();
                ctx.rect(x, y, 1, 1);
                ctx.fillStyle = "white"
                if (this.grid[x][y]) ctx.fillStyle = "black";
                ctx.fill();
                ctx.closePath();
            }
        }
    }


    update() {
        let temp = this.grid
        for (let x = 0; x <= this.w; x++) {
            for (let y = 0; y <= this.h; y++) {
                let n = this.neighbours(x, y)
                if (this.grid[x][y]) {
                    temp[x][y] = false
                    if (n === 2) temp[x][y] = true
                    if (n === 3) temp[x][y] = true
                } else {
                    if (n === 3) temp[x][y] = true
                }
            }
        }
        this.grid = temp
    }

    neighbours(x: number, y: number): number {
        let sum = 0
        if (x !== 1) {
            if (this.grid[x - 1][y]) sum += 1
        }
        if (y !== 1) {
            if (this.grid[x][y - 1]) sum += 1
            if (x !== 1) {
                if (this.grid[x - 1][y - 1]) sum += 1
            }
        }
        if (x !== this.w) {
            if (this.grid[x + 1][y]) sum += 1
        }
        if (y !== this.h) {
            if (this.grid[x][y + 1]) sum += 1
            if (x !== this.w) {
                if (this.grid[x + 1][y + 1]) sum += 1
            }
        }
        return sum
    }


}

let cells = new grid(WIDTH,HEIGHT)


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    cells.update()
    cells.show(ctx)

}


setInterval(draw, 10);