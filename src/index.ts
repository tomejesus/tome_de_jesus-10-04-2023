export class WorldGrid {
    constructor(public m: number, public n: number) {
        this.m = m
        this.n = n
    }
}

export class Robot {
    constructor(public x: number, public y: number, public orientation: string, public worldGrid: WorldGrid) {
        this.x = x
        this.y = y
        this.orientation = orientation
        this.worldGrid = worldGrid
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

    rotateLeft() {
        switch (this.orientation) {
            case 'N':
                this.orientation = 'W'
                break
            case 'E':
                this.orientation = 'N'
                break
            case 'S':
                this.orientation = 'E'
                break
            case 'W':
                this.orientation = 'S'
                break
            default:
                break
        }
    }

    rotateRight() {
        switch (this.orientation) {
            case 'N':
                this.orientation = 'E'
                break
            case 'E':
                this.orientation = 'S'
                break
            case 'S':
                this.orientation = 'W'
                break
            case 'W':
                this.orientation = 'N'
                break
            default:
                break
        }
    }
}

