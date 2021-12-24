import 'phaser'
import Player from '../sprites/Player'
import Portal from '../sprites/Portal';
import Coins from '../groups/Coins';
import Enemies from '../groups/Enemies';


export default class GameScene extends Phaser.Scene
{
    constructor (key)
    {
        super(key);
    }

    init (data)
    {
        console.log(data)
        this._LEVEL = data.level
        this._LEVELS = data.levels
        this._NEWGAME = data.newGame
        this.loadingLevel = false
    }
      
    create ()
    {
        this.events.on('resize', this.scale.resize, this)
        this.cursors = this.input.keyboard.createCursorKeys()
        this.createMap()
        this.createPlayer()
        this.coins = this.map.createFromObjects('Coins', {key: 'coin'})
        this.coinsGroup = new Coins(this.physics.world, this, [], this.coins)
        this.enemies = this.map.createFromObjects('Enemies', {})
        this.enemiesGroup = new Enemies(this.physics.world, this, [], this.enemies)

        this.createPortal()
        this.createCoins()
        this.addCollisions()
        this.cameras.main.startFollow(this.player)
    }

    update() {
       this.player.update(this.cursors)
    }

    addCollisions () {
        this.physics.world.setBounds(64, 64, 1792, 1792, true, true, true, true);
        this.physics.add.collider(this.player, this.blockedLayer)
        this.physics.add.overlap(this.player, this.enemiesGroup, this.player.enemyCollision.bind(this.player))
        this.physics.add.overlap(this.player, this.portal, this.loadNextLevel.bind(this))
        this.player.body.setCollideWorldBounds(true);
        this.physics.add.collider(this.enemiesGroup, this.blockedLayer)
        this.physics.add.collider(this.enemiesGroup, this.enemiesGroup)
        this.player.body.onWorldBounds = true;
        this.physics.add.overlap(this.coinsGroup, this.player, this.coinsGroup.collectCoin.bind(this.coinsGroup))
    }

    loadNextLevel () {
        if (!this.loadingLevel) {
            this.cameras.main.fade(200, 0, 0, 0)
            this.cameras.main.on('camerafadeoutcomplete', () => {
                if (this._LEVEL === 1) {
                    this.scene.restart({level: 2, levels: this._LEVELS, newGame: false})
                }
                else if (this._LEVEL === 2) {
                    this.scene.restart({level: 1, levels: this._LEVELS, newGame: false})
                }
            })
            this.loadingLevel = true
        }
        
    }

    createPlayer() {
        this.map.findObject('Player', (obj) => {
            if (this._NEWGAME && this._LEVEL === 1) {
                if (obj.type === "StartingPosition") {
                    this.player = new Player(this, obj.x, obj.y)
                } 
            } else {
                this.player = new Player(this, obj.x, obj.y)
            }
           
        })
        
    }

    createCoins() {

    }


    resize  (width, height) {
        if (width === undefined) {
            width = this.sys.game.config.width
        } 
        if (height === undefined) {
            height = this.sys.game.config.height
        } 
        this.cameras.resize(width, height)
    }

    createPortal () {
        this.map.findObject('Portal', (obj) => {
            if (this._LEVEL === 1) {
                this.portal = new Portal(this, obj.x, obj.y)
            }
            else if (this._LEVEL === 2) {
                this.portal = new Portal(this, obj.x, obj.y)
            }
        })
    }

    createMap () {
        this.add.tileSprite(0, 0, 8000, 8000, 'RPGpack_sheet', 31)
        this.map = this.make.tilemap({key: this._LEVELS[this._LEVEL]});

        this.tiles = this.map.addTilesetImage('RPGpack_sheet');

        this.backgroundLayer = this.map.createLayer('Background', this.tiles, 0, 0);
        this.blockedLayer = this.map.createLayer('Blocked', this.tiles, 0, 0);
        this.blockedLayer.setCollisionByExclusion([-1])

        
        this.meshLayer = this.map.getObjectLayer("navmesh");
        this.navMesh = this.navMeshPlugin.buildMeshFromTiled("mesh1", this.meshLayer, 64);
    }



    

    
}
