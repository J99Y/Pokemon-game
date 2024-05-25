
//// A class //////
// store the image coordinate (using class)
class Sprite {
    constructor({ position, velocity, image, frames = {max: 1} }) {
        this.position = position;
        this.image = image
        this.frames = frames
        // load the image before finding the width
        this.image.onload = () => {
            this.width = this.image.width / this.frames.max
            this.height = this.image.height
        }
    }

    // create the draw method
    draw() {
        // c.drawImage(this.image, this.position.x, this.position.y)
        c.drawImage(this.image, 
            0,
            0,
            this.image.width / this.frames.max,
            this.image.height,
            this.position.x,
            this.position.y,
            this.image.width / this.frames.max,
            this.image.height,
        )
    }
}


class Boundary {
    static width = 48
    static height = 48
    constructor({ position }) {
        this.position = position
        // this is depending on how you save your file
        // i.e the the width of map * Zoom In / 100 => 12 * 400/100 = 48
        this.width = 48;
        this.height = 48;
    }

    draw() {
        c.fillStyle = 'rgba(255, 0, 0, 0)'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}
