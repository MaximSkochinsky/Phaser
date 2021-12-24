import 'phaser'

export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'characters', 541)
        this.scene = scene
        this.health = 3
        this.hitDelay = false

        this.scene.physics.world.enable(this)
        this.scene.add.existing(this)


        this.setScale(4)
    }


    update (cursors) {
        this.setVelocity(0)
        if (cursors.up.isDown) {
            this.setVelocityY(-500)
        }
        else if (cursors.down.isDown) {
            this.setVelocityY(500)
        }

        if (cursors.left.isDown) {
            this.setVelocityX(-500)
        }
        else if (cursors.right.isDown) {
            this.setVelocityX(500)
        }
        
    }


    loseHealth () {
        this.health--;
        if (this.health === 0) {
            this.scene.loadNextLevel()
        }
    }


    enemyCollision(player, enemy) {
        if (!this.hitDelay) {
            this.loseHealth()
            this.hitDelay = true
            this.scene.time.addEvent({
                delay: 1200, 
                callback: () => {
                    this.hitDelay = false
                },
                callbackScope: this
            })
        }
        
    }

    

}