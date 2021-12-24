import 'phaser'
import Enemy from '../sprites/Enemy'




export default class Enemies extends Phaser.Physics.Arcade.Group {
    constructor(world, scene, children, spriteArray) {
        super(world, scene, children)
        this.scene = scene
        this.spriteFrames = [379, 271, 324, 486, 541, 270]

        this.createEnemies(scene, spriteArray)
    }

    createEnemies(scene, spriteArray) {
        spriteArray.forEach(sprite => {
            const frame = Math.floor(Math.random() * this.spriteFrames.length - 1)
            const enemy = new Enemy(scene, sprite.x, sprite.y, this.spriteFrames[frame])
            this.add(enemy)
            sprite.destroy()
        });
    }

}