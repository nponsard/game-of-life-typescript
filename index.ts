

let canvas = <HTMLCanvasElement>document.getElementById('canvas')
let ctx = <CanvasRenderingContext2D>canvas.getContext("2d")
let WIDTH = 92
let HEIGHT = 47

let p = 0.8
let Dmethod = 1
let scale = 20
let steps = 1
let play = false
let show = true
let tracing = false
let mX = 0
let mY = 0

let ScaleValue = <HTMLInputElement>document.getElementById("ScaleValue")
let WidthValue = <HTMLInputElement>document.getElementById("WidthValue")
let HeightValue = <HTMLInputElement>document.getElementById("HeightValue")
let ProbabilityValue = <HTMLInputElement>document.getElementById("ProbabilityValue")
let StepsValue = <HTMLInputElement>document.getElementById("StepsValue")

canvas.width = WIDTH * scale
canvas.height = HEIGHT * scale

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
        for (let x = 0; x < w; x++) {
            for (let y = 0; y < h; y++) {
                line.push(false)

            }
            this.grid.push(line)
            line = []
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

    show(ctx: CanvasRenderingContext2D) {

        ctx.strokeStyle = "grey"
        for (let x = 0; x < this.w; x++) {
            for (let y = 0; y < this.h; y++) {
                ctx.fillStyle = "white"
                if (this.grid[x][y]) ctx.fillStyle = "black";
                ctx.fillRect(x * scale, y * scale, scale, scale);
                ctx.strokeRect(x * scale, y * scale, scale, scale);
            }
        }
    }


    update() {
        let temp = []
        let t = false
        let line: Array<boolean> = []
        for (let x = 0; x < this.w; x++) {

            for (let y = 0; y < this.h; y++) {

                let n = this.neighbours(x, y)

                if (this.grid[x][y]) {

                    t = true

                    if (n === 2) t = true
                    if (n === 3) t = true
                    if (n > 3) t = false
                    if (n < 2) t = false

                } else {
                    t = false
                    if (n === 3) t = true
                }
                line.push(t)


            }
            temp.push(line)
            line = []
        }
        this.grid = temp
    }

    neighbours(x: number, y: number): number {
        let sum = 0
        if (x !== 0) {
            if (this.grid[x - 1][y]) sum += 1
            if (y !== this.h - 1) {
                if (this.grid[x - 1][y + 1]) sum += 1
            }
        }
        if (y !== 0) {
            if (this.grid[x][y - 1]) sum += 1
            if (x !== 0) {
                if (this.grid[x - 1][y - 1]) sum += 1
            }
            if (x !== this.w - 1) {
                if (this.grid[x + 1][y - 1]) sum += 1
            }
        }
        if (x !== this.w - 1) {
            if (this.grid[x + 1][y]) sum += 1
        }
        if (y !== this.h - 1) {
            if (this.grid[x][y + 1]) sum += 1
            if (x !== this.w - 1) {
                if (this.grid[x + 1][y + 1]) sum += 1
            }
        }
        return sum
    }


}

let cells = new grid(WIDTH, HEIGHT)

//keys listeners
canvas.addEventListener("mousedown", function (e) {
    tracing = true
    let x = Math.floor(e.layerX / scale)
    let y = Math.floor(e.layerY / scale) 
    if (cells.grid[x][y]) {

        cells.grid[x][y] = false
    } else {
        cells.grid[x][y] = true
    }

})
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
    tracing = false
    // let x = Math.floor(e.layerX / scale)
    // let y = Math.floor(e.layerY / scale) - 1
    // if (cells.grid[x][y]) {

    //     cells.grid[x][y] = false
    // } else {
    //     cells.grid[x][y] = true
    // }
})

canvas.addEventListener("mousemove", function (e) {
    let x = Math.floor(e.layerX / scale)
    let y = Math.floor(e.layerY / scale) 
    if (x !== mX || y !== mY) {
        if (tracing) {
            if (cells.grid[x][y]) {

                cells.grid[x][y] = false
            } else {
                cells.grid[x][y] = true
            }
        }
        mX = x
        mY = y
    }


})
addEventListener("keypress", function (e) {


    if (e.key === " " || e.key === "p") {
        if (play) {
            play = false
        } else {
            play = true
        }
    }
    if (e.key === "r") {
        cells.grid = []

        let i = false
        let line = []
        let h = cells.h
        let w = cells.w

        for (let x = 0; x <w; x++) {
            for (let y = 0; y < h; y++) {
                i = false
                if (Math.random() >= p) i = true

                line.push(i)
            }
            cells.grid.push(line)
            line = []
        }

    }
    if (e.key === "c") {

        cells.grid = [[]]
        let line: Array<boolean> = []
        let i: boolean = true
        let w = cells.w
        let h = cells.h
        for (let x = 0; x < w; x++) {
            for (let y = 0; y < h; y++) {
                line.push(false)

            }
            cells.grid.push(line)
            line = []
        }


    }
    if (e.key === "o") {
        canvas.style.display = "none"
        let optionsDiv = <HTMLElement>document.getElementById("options")
        optionsDiv.style.display = "block"
        play = false

        ScaleValue.value = scale.toString()

        WidthValue.value = WIDTH.toString()

        HeightValue.value = HEIGHT.toString()

        ProbabilityValue.value = p.toString()

        StepsValue.value = steps.toString()


    }


})

function validateOptions() {
    canvas.style.display = "block"
    let optionsDiv = <HTMLElement>document.getElementById("options")
    optionsDiv.style.display = "none"

    scale = parseInt(ScaleValue.value)

    WIDTH = parseInt(WidthValue.value)

    HEIGHT = parseInt(HeightValue.value)

    p = parseFloat(ProbabilityValue.value)

    steps = parseInt(StepsValue.value)

    canvas.width = WIDTH * scale
    canvas.height = HEIGHT * scale

    cells.w = WIDTH
    cells.h = HEIGHT

    // clear the grid to the right format
    cells.grid = [[]]
    let line: Array<boolean> = []
    let i: boolean = true
    let w = cells.w
    let h = cells.h
    for (let x = 0; x < w; x++) {
        for (let y = 0; y < h; y++) {
            line.push(false)

        }
        cells.grid.push(line)
        line = []
    }



}

let f = 0
function draw() {
    if (show) cells.show(ctx)
    requestAnimationFrame(draw)
    f += 1
    if (f >= steps) {
        f = 0
        if (play) cells.update()
    }
}

draw()

