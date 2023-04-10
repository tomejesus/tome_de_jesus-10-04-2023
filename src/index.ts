export class WorldGrid {
    constructor(public m: number, public n: number) {
        this.m = m
        this.n = n
    }
}

export class Robot {
    constructor(public x: number, public y: number, public orientation: string) {
        this.x = x
        this.y = y
        this.orientation = orientation
    }

    moveForward() { 
        switch (this.orientation) {
            case 'N':
                this.y++
                break
            case 'E':
                this.x++
                break
            case 'S':
                this.y--
                break
            case 'W':
                this.x--
                break
            default:
                break
        }
    }
}

