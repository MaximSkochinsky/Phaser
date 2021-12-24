import 'phaser';
import { PhaserNavMeshPlugin } from 'phaser-navmesh/dist/phaser-navmesh-plugin';


export default {
        type: Phaser.AUTO,
        parent: 'phaser-example',
        width: window.innerWidth,
        height: window.innerHeight,
        pixelArt: true,
         roundPixels: true,
        plugins: {
            scene: [
              {
                key: "PhaserNavMeshPlugin", // Key to store the plugin class under in cache
                plugin: PhaserNavMeshPlugin, // Class that constructs plugins
                mapping: "navMeshPlugin", // Property mapping to use for the scene, e.g. this.navMeshPlugin
                start: true
              }
            ]
          },
        physics: {
            default: 'arcade',
            arcade: {
                gravity: {y: 0},
                debug: true
            }
        },
            checkCollision: {
               up: true,
               down: true,
               left: true,
               right: true
           },
}
