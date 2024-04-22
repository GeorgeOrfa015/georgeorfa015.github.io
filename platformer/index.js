const canvas = document.querySelector("canvas");
const c = canvas.getContext('2d');

const scale = 1;
canvas.width = 864*scale;
canvas.height = 648*scale;

const scaledCanvas = {
    width: canvas.width / scale,
    height: canvas.height / scale
}

const floorCollisions2D = []
for (i=0;i < floorCollisions.length;i+=36) {
    floorCollisions2D.push(floorCollisions.slice(i, i+36));
}

const platformCollisions2D = []
for (i=0;i < platformCollisions.length;i+=36) {
    platformCollisions2D.push(platformCollisions.slice(i, i+36));
}

const floorCollisionBlocks = []
floorCollisions2D.forEach((row, y) => {
    row.forEach((symbol, x) => {
        if (symbol==1) {
            floorCollisionBlocks.push(new CollisionBlock({
                position: {
                    x: x*24,
                    y: y*24,
                }
            }))
        }
    })
})
const platformCollisionBlocks = []
platformCollisions2D.forEach((row, y) => {
    row.forEach((symbol, x) => {
        if (symbol==1) {
            platformCollisionBlocks.push(new PlatformBlock({
                position: {
                    x: x*24,
                    y: y*24,
                }
            }))
        }
    })
})



const gravity = 0.15/scale;
const friction = 0.15/scale;

const background = new Sprite({
    position: {
        x: 0,
        y: 0,
    },
    imageSrc: './img/background.png'
})

const player = new Player({
    position: {
        x: 500, 
        y: 600
    },
    collisionBlocks: floorCollisionBlocks,
    platformCollisionBlocks: platformCollisionBlocks,
});

const keys = {
    d: {
        pressed: false,
    },
    a: {
        pressed: false,
    },
}

function animate() {
    window.requestAnimationFrame(animate);
    c.fillStyle = "#111";
    c.fillRect(0,0,canvas.width,canvas.width);
    
    c.save()
    c.scale(scale, scale)
    c.translate(0, -background.image.height + scaledCanvas.height)
    background.update();

    floorCollisionBlocks.forEach(floorCollisionBlock => {
        floorCollisionBlock.update();
    })

    platformCollisionBlocks.forEach(platformCollisionBlock => {
        platformCollisionBlock.update();
    })

    player.update();

    c.restore()

    if (keys.d.pressed) {
        if (player.velocity.x < 2.5) player.velocity.x += friction
        if (player.velocity.x_ > 0) player.velocity.x_ -= friction
    }else if (keys.a.pressed) {
        if (player.velocity.x_ < 2.5) player.velocity.x_ += friction
        if (player.velocity.x > 0) player.velocity.x -= friction
    }else if (!keys.a.pressed&&!keys.d.pressed) {
        if (player.velocity.x > 0) {
            player.velocity.x -= friction
        }else{
            player.velocity.x = 0;
        }
        if (player.velocity.x_ > 0 ){
            player.velocity.x_ -= friction
        }else{
            player.velocity.x_ = 0;
        }
    }
}

animate()

window.addEventListener('keydown', (event) => {
    switch(event.key) {
        case 'd':
            keys.d.pressed = true
            break
        case 'a':
            keys.a.pressed = true
            break
        case 'w':
            player.velocity.y = -6;
            break
    }
})
window.addEventListener('keyup', (event) => {
    switch(event.key) {
        case 'd':
            keys.d.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
    }
})