const canvas = document.querySelector('canvas')
// c = canvas content
const c = canvas.getContext('2d')

// styling the canvas
canvas.width = 1024
canvas.height = 576
// fill a rectangle in the screen
c.fillStyle = 'white'

c.fillRect(0,0, canvas.width, canvas.height)

// 1. create html image object before import it
const image = new Image()
console.log(image)
// this image we that a long time to load, so we should wait for
// it to load before drawing the image
image.src = './images/Pellet Town.png'


// Create our player
const playerImage = new Image()
playerImage.src = './images/playerDown.png'


// // 2. we want to import our Pellet Town from Tile
// // we should only draw the image adter it is load
// image.onload = () => {
//     // drawImage(image, x-coordinate, y-coordinate) we want ot start
//     c.drawImage(image, -735, -600)
//     // draw the player after the map
//     // doing the cropping
//     // (playerImage, where we start cropping from x, start-y,how much to crop-x, how much-y location-x, location-y, end x, end y )
//     c.drawImage(playerImage, 
//         0,
//         0,
//         playerImage.width / 4,
//         playerImage.height,
//         canvas.width / 2 - (playerImage.width / 4)/2, 
//         canvas.height / 2 - playerImage.height / 2,
//         playerImage.width / 4,
//         playerImage.height,
//     )
// }

//// A class //////
// store the image coordinate (using class)
class Sprite {
    constructor({ position, velocity, image }) {
        this.position = position;
        this.image = image
    }

    // create method 
    draw() {
        c.drawImage(this.image, this.position.x, this.position.y)
    }
}

// initialise the position and image
const background = new Sprite({
    position: {
        x: -735,
        y: -600,
    },
    image: image
});

// know what key is press currently
const keys = {
    ArrowUp: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowDown: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },

}

// animation loop for moving the background and player
function animate() {
    // creating an infinite loop with another animate call
    window.requestAnimationFrame(animate)
    // render the image every time (to display the movement)
    background.draw()
    // where to draw
    c.drawImage(playerImage, 
        0,
        0,
        playerImage.width / 4,
        playerImage.height,
        canvas.width / 2 - (playerImage.width / 4)/2, 
        canvas.height / 2 - playerImage.height / 2,
        playerImage.width / 4,
        playerImage.height,
    )
    // to make the game more fluent, we should change the position
    // depend on the last key pressed
    if (keys.ArrowDown.pressed &&  lastKey === 'ArrowDown') background.position.y -= 3;
    else if (keys.ArrowUp.pressed &&  lastKey === 'ArrowUp') background.position.y += 3;
    else if (keys.ArrowLeft.pressed &&  lastKey === 'ArrowLeft') background.position.x += 3;
    else if (keys.ArrowRight.pressed &&  lastKey === 'ArrowRight') background.position.x -= 3;


}
// call animate first
animate()

let lastKey = ''
// Moving our player - add in listener
window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp':
            console.log('press up')
            keys.ArrowUp.pressed = true;
            lastKey = 'ArrowUp'
            break
        case 'ArrowLeft':
            console.log('press left')
            keys.ArrowLeft.pressed = true;
            lastKey = 'ArrowLeft'
            break
        case 'ArrowDown':
            console.log('press down')
            keys.ArrowDown.pressed = true;
            lastKey = 'ArrowDown'
            break
        case 'ArrowRight':
            console.log('press right')
            keys.ArrowRight.pressed = true;
            lastKey = 'ArrowRight'
            break
    }
    console.log(keys)
})

// after we release, set press value to false
window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'ArrowUp':
            console.log('press up')
            keys.ArrowUp.pressed = false;
            break
        case 'ArrowLeft':
            console.log('press left')
            keys.ArrowLeft.pressed = false;
            break
        case 'ArrowDown':
            console.log('press down')
            keys.ArrowDown.pressed = false;
            break
        case 'ArrowRight':
            console.log('press right')
            keys.ArrowRight.pressed = false;
            break
    }
    console.log(keys)
})

