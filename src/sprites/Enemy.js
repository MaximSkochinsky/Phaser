import 'phaser'
// import { PhaserNavMeshPlugin } from "phaser-navmesh";


export default class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, frame) {
        super(scene, x, y, 'characters', frame)
        this.scene = scene
        this.target = this.scene.player
        this.state = "passive"
        this.path = []
        


        this.scene.physics.world.enable(this)
        this.scene.add.existing(this)


        this.setScale(4)

        this.timeEvent = this.scene.time.addEvent({
            delay: 16, 
            callback: this.move,
            loop: true,
            callbackScope: this
        })

        
    }

    setState() {
        if (Math.abs(this.target.x - this.x) < 32 && Math.abs(this.target.y - this.y) < 32 && this.state != "active") {
            this.state = "attack"
        }
        else if (Math.abs(this.target.x - this.x) < 350 && Math.abs(this.target.y - this.y) < 350 && this.state != "active") {
            this.state = "active"
        }
        else {
            this.state = "passive"
            this.path = []
            this.setVelocity(0)
        }
    }


    move () {
            this.setState()
            if (this.state === "active") {
                    this.path = this.scene.navMesh.findPath({ x: this.x, y: this.y }, { x: this.target.x, y: this.target.y });
                    if (this.path !== null) {
                    if (this.path.length >= 2) {
                        for (let i = 0; i < this.path.length - 1; i++) {
                            let ex = Math.floor(this.path[i + 1].x)
                            let ey = Math.floor(this.path[i + 1].y)
                            let x = Math.floor(this.path[i].x)
                            let y = Math.floor(this.path[i].y)
                            this.scene.physics.moveTo(
                                this, 
                                ex,
                                ey, 
                                400
                            )

                        }
                    }
                }
            }
            if (this.state === "attack") {
                this.setVelocity(0)
            }
    
    }


    

}