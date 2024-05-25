const canvas = document.querySelector('canvas')
// c = canvas content
const c = canvas.getContext('2d')

// styling the canvas
canvas.width = 1024
canvas.height = 576

const collisionsMap = []
// transform the json collision data to 2D array
for (let i = 0; i < collisions.length; i += 70) {
    // get every 70 value
    
    const subSlice = collisions.slice(i, i + 70)
    collisionsMap.push(subSlice)

}
console.log(collisionsMap)

// an offset is where we view our game that makes the player at the middle
const offset = {
    x: -735,
    y: -690
}

// consist all the collision boundaries
const boundaries = []
collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        // only capture the value that is a collision  
        if (symbol === 1025)
            // make a new boundary with the value
            boundaries.push(new Boundary({position: {
                x: j * Boundary.width + offset.x,
                y:  i * Boundary.height + offset.y
            }
        }))
    })
})
console.log(boundaries)

// fill a rectangle in the screen
c.fillStyle = 'white'

c.fillRect(0,0, canvas.width, canvas.height)

/////////////////////////////////////////////
//////////      Create Image    /////////////
/////////////////////////////////////////////
// 1. create html image object before import it
const image = new Image()
// this image we that a long time to load, so we should wait for
// it to load before drawing the image
image.src = './images/Pellet Town.png'

// Create our player
const playerImage = new Image()
playerImage.src = './images/playerDown.png'

// import foreground image (Export image same size as the background)
const foregroundImage = new Image();
foregroundImage.src = './images/foregroundObjects.png'

//////////////////////////////////////////////////

const player = new Sprite({
    position: {
        x: canvas.width / 2 - (192 / 4) / 2,
        y: canvas.height / 2 - 168 / 2,
    },
    image: playerImage,
    frames: { max: 4 }
})

// initialise the position and image
const background = new Sprite({
    position: {
        x: offset.x,
        y: offset.y,
    },
    image: image
});

// initialise the position and image
const foreground = new Sprite({
    position: {
        x: offset.x,
        y: offset.y,
    },
    image: foregroundImage
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

const movables = [background, ...boundaries, foreground]

function rectangularCollision({player, boundarySquare}) {
    return (
        player.position.x + player.width >= boundarySquare.position.x &&
        player.position.x <= boundarySquare.position.x + boundarySquare.width &&
        player.position.y <= boundarySquare.position.y + boundarySquare.height &&
        player.position.y + player.height >= boundarySquare.position.y
    )
}
// animation loop for moving the background and player
function animate() {
    // creating an infinite loop with another animate call
    window.requestAnimationFrame(animate)    
    ////////    Drawing layers ///////
    background.draw()
    // draw the boundary
    boundaries.forEach(boundary => {
        boundary.draw()
    })
    player.draw()
    foreground.draw()
    //////////////////////////////////

    // to make the game more fluent, we should change the position
    // depend on the last key pressed
    let moving = true;
    if (keys.ArrowDown.pressed &&  lastKey === 'ArrowDown') {
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            // detect if the player step near the boundaries
            if (
                rectangularCollision({
                    player,
                    boundarySquare: {
                        ...boundary, 
                        position: {
                            x: boundary.position.x, 
                            y: boundary.position.y - 3
                        }
                    }
                })
            ) {
                moving = false;
                break
            }
        }
        if (moving) {
            movables.forEach(movable => {
                movable.position.y -= 3
            })
        }
    }
    else if (keys.ArrowUp.pressed &&  lastKey === 'ArrowUp') {
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            // detect if the player step near the boundaries
            if (
                rectangularCollision({
                    player,
                    boundarySquare: {
                        ...boundary, 
                        position: {
                            x: boundary.position.x, 
                            y: boundary.position.y + 3
                        }
                    }
                })
            ) {
                moving = false;
                break
            }
        }
        if (moving) {
            movables.forEach(movable => {
                movable.position.y += 3
            })
        }
    }
    else if (keys.ArrowLeft.pressed &&  lastKey === 'ArrowLeft') {
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            // detect if the player step near the boundaries
            if (
                rectangularCollision({
                    player,
                    boundarySquare: {
                        ...boundary, 
                        position: {
                            x: boundary.position.x + 3, 
                            y: boundary.position.y
                        }
                    }
                })
            ) {
                moving = false;
                break
            }
        }
        if (moving) {
            movables.forEach(movable => {
                movable.position.x += 3
            })
        }
    }
    else if (keys.ArrowRight.pressed &&  lastKey === 'ArrowRight') {
        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            // detect if the player step near the boundaries
            if (
                rectangularCollision({
                    player,
                    boundarySquare: {
                        ...boundary, 
                        position: {
                            x: boundary.position.x - 3, 
                            y: boundary.position.y
                        }
                    }
                })
            ) {
                moving = false;
                break
            }
        }
        if (moving) {
            movables.forEach(movable => {
                movable.position.x -= 3
            })
        }
    }


}

// call animate first
animate()

let lastKey = ''
// Moving our player - add in listener
window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp':
            keys.ArrowUp.pressed = true;
            lastKey = 'ArrowUp'
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true;
            lastKey = 'ArrowLeft'
            break
        case 'ArrowDown':
            keys.ArrowDown.pressed = true;
            lastKey = 'ArrowDown'
            break
        case 'ArrowRight':
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

