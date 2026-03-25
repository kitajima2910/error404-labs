// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        moveSpeed: 1,
		game: {
			default: null,
			type: cc.Node
		}
    },
	
	onKeyDown (event) {
        // set a flag when key pressed
        switch(event.keyCode) {
			case cc.macro.KEY.w:
				this.pressDown = false;
				this.pressLeft = false;
				this.pressRight = false;
				this.pressUp = true;
                break;
			case cc.macro.KEY.s:
                this.pressUp = false;				
				this.pressLeft = false;
				this.pressRight = false;			
				this.pressDown = true;
                break;	
            case cc.macro.KEY.a:
                this.pressUp = false;
				this.pressDown = false;				
				this.pressRight = false;				
				this.pressLeft = true;
                break;
            case cc.macro.KEY.d:
                this.pressUp = false;
				this.pressDown = false;
				this.pressLeft = false;
				this.pressRight = true;
                break;
        }
    },

    // LIFE-CYCLE CALLBACKS:
	
	initChar: function () {
		//this.node.setPosition(cc.v2(this.boundLeft, this.boundBot));
		this.dirChangeable = true;
		this.pressUp = false;
        this.pressDown = false;
		this.pressLeft = false;
        this.pressRight = false;
		this.moveUp = false;
		this.moveDown = false;
		this.moveLeft = false;
		this.moveRight = false;
		// this.game.node.getComponent('utils').putObj(this.game.node, cc.v2(this.node.x, this.node.y));
	},

    onLoad: function () {
		this.boundLeft = -this.game.node.width / 2 + this.game.node.getComponent('utils').outlinePrefab.data.width / 2 + this.game.node.getComponent('utils').gapX;
		this.boundRight = this.game.node.width / 2 - this.game.node.getComponent('utils').outlinePrefab.data.width / 2 - this.game.node.getComponent('utils').gapX;
		this.boundBot = -this.game.node.height / 2 + this.game.node.getComponent('utils').outlinePrefab.data.height / 2 + this.game.node.getComponent('utils').gapY;
		this.boundTop = this.game.node.height / 2 - this.game.node.getComponent('utils').outlinePrefab.data.height / 2 - this.game.node.getComponent('utils').gapY;
		this.initChar();
		this.col = this.game.startCell.x;
		this.row = this.game.startCell.y;
		this.currentCel = cc.v2(this.col, this.row);
		cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
		this.node.zIndex = 2;
	},
	
	onDestroy () {
        // Cancel keyboard input monitoring
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    },

    // start: function () {
		
    // },
	
	checkMovedInCell: function () {
		if (this.moveUp) {
			this.dirChangeable = false;
			this.node.y += this.moveSpeed;
			if ((this.col != this.currentCel.x || this.row != this.currentCel.y) && this.node.y > this.currentCelY) {
				this.node.y = this.currentCelY;
				this.dirChangeable = true;
				this.currentCel = cc.v2(this.col, this.row);
				//this.game.putFlower(this.game.node, cc.v2(currentCelX - this.game.node.width / 2, currentCelY - this.game.node.height / 2));
				return cc.v2(this.currentCelX, this.currentCelY);
			}
		} else if (this.moveDown) {
			this.dirChangeable = false;
			this.node.y -= this.moveSpeed;
			if ((this.col != this.currentCel.x || this.row != this.currentCel.y) && this.node.y < this.currentCelY) {
				this.node.y = this.currentCelY;
				this.dirChangeable = true;
				this.currentCel = cc.v2(this.col, this.row);
				//this.game.putFlower(this.game.node, cc.v2(currentCelX - this.game.node.width / 2, currentCelY - this.game.node.height / 2));
				return cc.v2(this.currentCelX, this.currentCelY);
			}
		} else if (this.moveRight) {
			this.dirChangeable = false;
			this.node.x += this.moveSpeed;
			if ((this.col != this.currentCel.x || this.row != this.currentCel.y) && this.node.x > this.currentCelX) {
				this.node.x = this.currentCelX;
				this.dirChangeable = true;
				this.currentCel = cc.v2(this.col, this.row);
				//this.game.putFlower(this.game.node, cc.v2(currentCelX - this.game.node.width / 2, currentCelY - this.game.node.height / 2));
				return cc.v2(this.currentCelX, this.currentCelY);
			}
		} else if (this.moveLeft) {
			this.dirChangeable = false;
			this.node.x -= this.moveSpeed;
			if ((this.col != this.currentCel.x || this.row != this.currentCel.y) && this.node.x < this.currentCelX) {
				this.node.x = this.currentCelX;
				this.dirChangeable = true;
				this.currentCel = cc.v2(this.col, this.row);
				//this.game.putFlower(this.game.node, cc.v2(currentCelX - this.game.node.width / 2, currentCelY - this.game.node.height / 2));
				return cc.v2(this.currentCelX, this.currentCelY);
			}
		}
		return null;
	},
	
	checkHitObstacle: function (obstArray) {
		for (let i = 0; i < obstArray.length; i++) {
			if (obstArray[i].x == this.node.x && obstArray[i].y == this.node.y) {
				return i;
			}
		}
		return null;
	},
	
	checkHitCapturedCell: function (obstArray) {
		if (this.capturedCell != null && (this.col != this.capturedCell.x || this.row != this.capturedCell.y)) {
			for (let i = 0; i < obstArray.length; i++) {
				if (obstArray[i].x == this.node.x && obstArray[i].y == this.node.y) {
					return i;
				}
			}
		}
		return null;
	},
	
	updateCapturedCell: function () {
		this.capturedCell = cc.v2(this.col, this.row);
	},
	
	resetCapturedCell: function () {
		this.capturedCell = cc.v2(-1, -1);
	},

    update: function (dt) {
		this.col = Math.ceil((this.node.x + this.game.node.width / 2) / this.game.node.getComponent('utils').outlinePrefab.data.width);
		this.row = Math.ceil((this.node.y + this.game.node.height / 2) / this.game.node.getComponent('utils').outlinePrefab.data.height);
		this.currentCelX = this.col * this.game.node.getComponent('utils').outlinePrefab.data.width + this.game.node.getComponent('utils').gapX - this.game.node.getComponent('utils').outlinePrefab.data.width / 2 - this.game.node.width / 2;
		this.currentCelY = this.row * this.game.node.getComponent('utils').outlinePrefab.data.height + this.game.node.getComponent('utils').gapY - this.game.node.getComponent('utils').outlinePrefab.data.height / 2 - this.game.node.height / 2;
		if (this.node.x < this.boundLeft) {
			cc.director.loadScene('GameOver');
			return;
		} else if (this.node.x > this.boundRight) {
			cc.director.loadScene('GameOver');
			return;
		}
		if (this.node.y < this.boundBot) {
			cc.director.loadScene('GameOver');
			return;
		} else if (this.node.y > this.boundTop) {
			cc.director.loadScene('GameOver');
			return;
		} 
		if (this.game.winGoal.x == this.node.x && this.game.winGoal.y == this.node.y) {
			cc.director.loadScene('Win');
			return;
		}
		if (this.dirChangeable) {
			if (this.pressUp) {
				this.moveUp = true;
				this.moveDown = false;
				this.moveLeft = false;
				this.moveRight = false;
			} else if (this.pressDown) {
				this.moveUp = false;
				this.moveDown = true;
				this.moveLeft = false;
				this.moveRight = false;
			} else if (this.pressLeft) {
				this.moveUp = false;
				this.moveDown = false;
				this.moveLeft = true;
				this.moveRight = false;
			} else if (this.pressRight) {
				this.moveUp = false;
				this.moveDown = false;
				this.moveLeft = false;
				this.moveRight = true;
			}
		}
	},
});
