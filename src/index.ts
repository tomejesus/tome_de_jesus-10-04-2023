export class WorldGrid {
    constructor(public m: number, public n: number) {
        this.m = m
        this.n = n
    }
}

export class Robot {
    isLost: boolean
    constructor(public x: number, public y: number, public orientation: string, public worldGrid: WorldGrid) {
        this.x = x
        this.y = y
        this.orientation = orientation
        this.worldGrid = worldGrid
        this.isLost = false
    }

    moveForward() { 
        if (this.isLost) {
            return
        }

        switch (this.orientation) {
            case 'N':
                if (this.y + 1 > this.worldGrid.n) {
                    this.isLost = true
                    return
                }
                this.y++
                break
            case 'E':
                if (this.x + 1 > this.worldGrid.m) {
                    this.isLost = true
                    return
                }
                this.x++
                break
            case 'S':
                if (this.y - 1 < 0) {
                    this.isLost = true
                    return
                }
                this.y--
                break
            case 'W':
                if (this.x - 1 < 0) {
                    this.isLost = true
                    return
                }
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

