import 'phaser'
const level1 = 'assets/tilemaps/level1.json'
const level2 = 'assets/tilemaps/level2.json'
const packRPG = 'assets/images/RPGpack_sheet.png' 
const characters = 'assets/images/roguelikeChar_transparent.png'
const portal = 'assets/images/raft.png'
const coin = 'assets/images/coin_01.png'


export default class BootScene extends Phaser.Scene
{
    constructor (key)
    {
        super(key);
    }

    preload ()
    {
        this.levels = {
            1: 'level1',
            2: 'level2'
        }
        // load in the tilemap
        this.load.tilemapTiledJSON('level1', level1)
        this.load.tilemapTiledJSON('level2', level2)
        //load in the spritesheet
        this.load.spritesheet('RPGpack_sheet', packRPG, {frameWidth: 64, frameHeight: 64})
        //load in our character
        this.load.spritesheet('characters', characters, {frameWidth: 17, frameHeight: 17})
    
        this.load.image('portal', portal)

        this.load.image('coin', coin)
    }
      
    create ()
    {
        this.scene.start('Game', {level: 1, newGame: true, levels: this.levels})

    }


}
