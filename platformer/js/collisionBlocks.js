class CollisionBlock {
    constructor({position, imageSrc}) {
        this.position = position;
        this.width = 24
        this.height = 24
    }

    draw() {
        c.fillStyle = "#f000"
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        this.draw();
    }
}
class PlatformBlock {
    constructor({position, imageSrc}) {
        this.position = position;
        this.width = 24
        this.height = 8
    }

    draw() {
        c.fillStyle = "#00f0"
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        this.draw();
    }
}