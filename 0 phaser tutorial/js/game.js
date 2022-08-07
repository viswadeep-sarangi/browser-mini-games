// lol create a new scene
let gameScene = new Phaser.Scene('Game')

// load assets
gameScene.preload = function(){
    // load images
    this.load.image('background','assets/background.jpg');
    this.load.image('player','assets/player.png');
    this.load.image('treasure','assets/treasure.png');
    this.load.image('enemy','assets/apple.png');
};

// called once after preload ends
gameScene.create = function(){
    this.bg = this.add.sprite(0,0,'background');
    this.bg.setOrigin(0,0);
    let gameW = this.sys.game.config.width;
    let gameH = this.sys.game.config.height;
    let scaleX = gameW/this.bg.width;
    let scaleY = gameH/this.bg.height;
    this.bg.scale = Math.max(scaleX, scaleY)
    this.bg.depth = 0
    console.log(gameW, gameH)

    // create the player
    this.player = this.add.sprite(50,180, 'player')
    this.player.scale = 0.1
    this.player.depth = 1

    // create enemy
    this.enemy1 = this.add.sprite(200,180, 'enemy')
    this.enemy1.scale = 0.25
    this.enemy2 = this.add.sprite(300,180, 'enemy')
    this.enemy2.scale = 0.25
    this.enemy3 = this.add.sprite(400,180, 'enemy')
    this.enemy3.scale = 0.25
    this.enemy4 = this.add.sprite(500,180, 'enemy')
    this.enemy4.scale = 0.25

    console.log(this.enemy1)

    // create the treasure
    this.treasure = this.add.sprite(600, 180, 'treasure')
    this.treasure.scale = 0.025
};

enemy_speed = function(enemy_obj, max_height, speed=2.5){
    if ('speed' in enemy_obj){
        if (enemy_obj.y < enemy_obj.displayHeight){
            enemy_obj.speed = speed
        }
        else if (enemy_obj.y>max_height-enemy_obj.displayHeight){
            enemy_obj.speed = -1*speed
        }
    } else {
        enemy_obj.speed = speed
    }
}

// this update loop is called up to 60 times per second
gameScene.update = function(){
    enemy_speed(this.enemy1, this.sys.game.config.height)
    this.enemy1.y += this.enemy1.speed
    enemy_speed(this.enemy2, this.sys.game.config.height,3.5)
    this.enemy2.y += this.enemy2.speed
    enemy_speed(this.enemy3, this.sys.game.config.height, 4.5)
    this.enemy3.y += this.enemy3.speed
    enemy_speed(this.enemy4, this.sys.game.config.height, 6)
    this.enemy4.y += this.enemy4.speed
    
}

// set the configuration of the game
let config = {
    type: Phaser.AUTO, // Phaser will use WebGL if available if not, Canvas
    width: 640,
    height: 480,
    scene: gameScene
};

// create a new game and pass the configuration to it
let game = new Phaser.Game(config);