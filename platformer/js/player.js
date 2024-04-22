class Player{
    constructor({position, collisionBlocks, platformCollisionBlocks}) {
        this.position = position;
        this.velocity = {
            x: 0,
            y: 1,
            x_: 0,
        }
        this.height = 8/scale
        this.width = 8/scale
        this.collisionBlocks = collisionBlocks
        this.platformCollisionBlocks = platformCollisionBlocks
    }

    draw() {
        c.fillStyle = "red";
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update() {
        this.draw();

        this.position.x += this.velocity.x;
        this.position.x -= this.velocity.x_;
        this.checkForHorizontalCollisions()
        this.applyGravity();
        this.checkForVerticalCollisions()
        
    }
    
    checkForHorizontalCollisions() {
        for (i=0;i<this.collisionBlocks.length;i++) {
            const collisionBlock = this.collisionBlocks[i]
    
            if (
                collision({
                    object1: this,
                    object2: collisionBlock,
                })
            ) {
                if (this.velocity.x > 0) {
                    this.velocity.x = 0;
                    this.position.x = collisionBlock.position.x - this.width - 0.01;
                }
                if (this.velocity.x_ > 0) {
                    this.velocity.x_ = 0;
                    this.position.x = collisionBlock.position.x + collisionBlock.width + 0.01;
                } 
                
            }
        }
        if (this.position.x < 0) {
            this.position.x = 0;
            this.velocity.x_ = 0;
        }
        if (this.position.x + this.width > scaledCanvas.width) {
            this.position.x = scaledCanvas.width - this.width
        }
    }

    applyGravity() {
        this.position.y += this.velocity.y;
        this.velocity.y += gravity;
    }
    
    checkForVerticalCollisions() {
        for (i=0;i<this.collisionBlocks.length;i++) {
            const collisionBlock = this.collisionBlocks[i]
    
            if (
                collision({
                    object1: this,
                    object2: collisionBlock,
                })
            ) {
                if (this.velocity.y > 0) {
                    this.velocity.y = 0;
                    this.position.y = collisionBlock.position.y - this.height - 0.01;
                }
                
                if (this.velocity.y < 0) {
                    this.velocity.y = 0;
                    this.position.y = collisionBlock.position.y + collisionBlock.height + 0.01;
                }
            }
        }

        // plat
        for (i=0;i<this.platformCollisionBlocks.length;i++) {
            const platformCollisionBlock = this.platformCollisionBlocks[i]
    
            if (
                platformCollision({
                    object1: this,
                    object2: platformCollisionBlock,
                })
            ) {
                if (this.velocity.y > 0) {
                    this.velocity.y = 0;
                    this.position.y = platformCollisionBlock.position.y - this.height - 0.01;
                }

            }
        }
        if (this.position.y < 0) {
            this.position.y = 0;
            this.velocity.y = 0;
        }
    }

}