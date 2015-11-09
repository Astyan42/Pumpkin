/// <reference path="Phaser/phaser.d.ts"/>
module PumpkinNinja {
    export class Play extends Phaser.State {
        private tilesprite;
        public background: Phaser.TileSprite;
        public pumpkin: Phaser.Sprite;
        public lightAnimation:Phaser.Sprite;
        
        private rope: Phaser.Rope;
        
        private wallAnchor;
        private ropeHead: Phaser.Sprite;
        private anchorGroup: Phaser.Group;

        private ropeCollisionGroup: Phaser.Physics.P2.CollisionGroup;
        private pumpkinCollisionGroup: Phaser.Physics.P2.CollisionGroup;
        private blockCollisionGroup: Phaser.Physics.P2.CollisionGroup;
        
        private spaceKey:Phaser.Key;
        
        private constraints = [];
        private ropeDocked:boolean;
        public score = 0;
        private scoreText: Phaser.Text;
        private scorePoints: Phaser.Text;
        private scoreString = "points !";

        preload() {
            this.game.load.image('rope', 'Assets/corde2.png');
            this.game.load.image("wall", "Assets/texture_bg.png"); 
            this.game.load.image("pumpkin", "Assets/pumpkin.png");
            this.game.load.image("block", "Assets/caillou.png");
            this.game.load.image("grapin", "Assets/grapin.png");
            this.game.load.spritesheet('light', 'Assets/lumiere.png', 406, 424, 2);

            this.game.load.physics('grapinPhysics', 'Assets/grapin.json');
        }

        create() {
            this.score = 0;
            this.game.physics.startSystem(Phaser.Physics.P2JS);
            this.game.physics.p2.setImpactEvents(true);
            this.game.physics.p2.setBoundsToWorld(false,false,false,false);
            this.game.physics.p2.gravity.y = 1400;



            this.ropeCollisionGroup = this.game.physics.p2.createCollisionGroup();
            this.pumpkinCollisionGroup = this.game.physics.p2.createCollisionGroup();
            this.blockCollisionGroup = this.game.physics.p2.createCollisionGroup();
            
            this.ropeDocked = false;

            // create background first
            this.background = this.game.add.tileSprite(0, 0, 800, 600, 'wall');

            this.pumpkin = new Pumpkin(this.game, 50, this.game.world.centerY);
            for (var i = 0 ; i < 30; i++) {
                var block: Phaser.Sprite = this.game.add.sprite(i * 32 + 16, 16, "block");
                this.game.physics.p2.enable(block);
                var body: Phaser.Physics.P2.Body = block.body;
                body.kinematic = true;
                body.setRectangle(block.width, block.height);
                body.setCollisionGroup(this.blockCollisionGroup);
                body.collides([this.ropeCollisionGroup,this.pumpkinCollisionGroup]);
                body.data.gravityScale = 0;
                body.velocity.x = -this.speed;
                
                block.events.onOutOfBounds.add(() => {
                    block.destroy();
                }, this);
            }

            this.pumpkin.body.setCollisionGroup(this.pumpkinCollisionGroup);
            this.pumpkin.body.collides(this.blockCollisionGroup);

            this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
            this.game.input.keyboard.addKeyCapture(Phaser.Keyboard.SPACEBAR);

            this.anchorGroup = this.game.add.group();
            
            this.scoreText = this.game.add.text(this.game.world.width - 120, this.game.world.height - 42, this.scoreString, { font: 'Homemade Apple', fontSize: '22px', fill: '#fff' });
            this.scorePoints = this.game.add.text(this.game.world.width - 180, this.game.world.height - 42, this.score.toString(), { font: 'Homemade Apple', fontSize: '22px', fill: '#fff' });
            
            
        }


        private counterBlockPosition: number = 0;
        /**
         * Speed in pixel/framerate
         */
        private speed: number = 100;

        private emptyBlock = 0;
        private nextBlockPosition = 32;
        private updateTicks = 0;
        private numberOfEmptyBlocksInARow = 0;

        update() {
            this.updateTicks ++;
            this.background.tilePosition.x -= 2;
            this.nextBlockPosition -= this.speed;

           this.clearConstraints();
            
            if (this.ropeDocked) {
                if (this.dist >= 40) { this.dist -= 10; }
                this.constraints.push(this.game.physics.p2.createDistanceConstraint(this.pumpkin, this.wallAnchor, this.dist));
            }

            if (this.spaceKey.isDown && !this.spaceKey.downDuration()) {
                this.shootRope();
            }
            
            if (this.nextBlockPosition <= 0) {
                this.nextBlockPosition = 32;
                if (Math.random() > 0.98) {
                    var block: Phaser.Sprite = this.game.add.sprite(this.game.world.width+ 16, 16, "block");
                    this.game.physics.p2.enable(block);
                    var body: Phaser.Physics.P2.Body = block.body;
                    body.setRectangle(block.width, block.height);
                    body.kinematic = true;
                    body.setCollisionGroup(this.blockCollisionGroup);
                    body.collides([this.ropeCollisionGroup, this.pumpkinCollisionGroup]);
                    body.data.gravityScale = 0;
                    body.velocity.x = -this.speed;
                    block.events.onOutOfBounds.add(() => {
                        block.destroy();
                    }, this);
                    
                    this.numberOfEmptyBlocksInARow = 0;
                    this.score += 10;
                } else {
                    this.numberOfEmptyBlocksInARow++;
                    this.score += 20;
                    this.emptyBlock += 32;
                }
            }
            this.scorePoints.text = this.score.toString();
            this.scorePoints.x = this.game.world.width - this.scoreText.width - 120;
                
             
        }

        // Launch a projectile that must have a velocity.
        // Width is not enough to fire collision event
        private sensorAngle;

        shootRope() { 
            this.cleanAnchors();
            
            this.ropeHead = this.anchorGroup.create(this.pumpkin.x, this.pumpkin.y, "grapin");
            this.game.physics.p2.enable(this.ropeHead);
            this.ropeHead.body.clearShapes();
            this.ropeHead.body.loadPolygon("grapinPhysics", "grapin");
            this.ropeHead.body.data.gravityScale = 0;
            this.ropeHead.body.fixedRotation = true;
            this.ropeHead.body.collideWorldBounds = false;
            this.ropeHead.body.setCollisionGroup(this.ropeCollisionGroup);
            this.ropeHead.body.collides(this.blockCollisionGroup, this.fixRope, this);

            
            this.sensorAngle = Math.atan2(this.game.camera.y + this.game.input.y - this.pumpkin.y, this.game.camera.x + this.game.input.x - this.pumpkin.x);
            this.sensorAngle = Phaser.Math.radToDeg(this.sensorAngle);
            this.ropeHead.angle = this.sensorAngle;
            this.ropeHead.body.angle = this.sensorAngle;
            this.game.physics.arcade.moveToPointer(this.ropeHead,1800);
            this.pumpkin.bringToTop();
        }

        fixRope(sensor,ground) {
            var sensorX = sensor.x;  //get x and y from the sensor where it collided
            var sensorY = sensor.y;
            sensor.sprite.kill();

            this.wallAnchor = this.anchorGroup.create(sensorX, sensorY, 'grapin');
            this.game.physics.p2.enable(this.wallAnchor);
            this.wallAnchor.body.angle = this.sensorAngle;
            this.wallAnchor.body.static = true;
            this.wallAnchor.body.velocity.x = -this.speed;

            this.dist = this.distanceBetweenPoints([this.pumpkin.x, this.pumpkin.y], [sensorX, sensorY]);  //point [x,y], point [x,y]
            this.constraints.push(this.game.physics.p2.createDistanceConstraint(this.pumpkin, this.wallAnchor, this.dist));

            this.ropeDocked = true; 
        }

        cleanAnchors() {
            this.ropeDocked = false;
            this.clearConstraints();
            this.anchorGroup.destroy(true, true);  // destroy children, dont destroy group	
        }

        clearConstraints() {
            for (var i = 0; i <= this.constraints.length; i++) {
                 this.game.physics.p2.removeConstraint(this.constraints[i]);
            }
            this.constraints = [];
        }

        distanceBetweenPoints(pointA, pointB) {
            var dx = pointA[0] - pointB[0];  //distance ship X to enemy X
            var dy = pointA[1] - pointB[1];  //distance ship Y to enemy Y
            var distance = Math.sqrt(dx * dx + dy * dy);     //pythagoras ^^  (get the distance to each other)
            return distance;
        }
        
        dist: number;
    }
}
