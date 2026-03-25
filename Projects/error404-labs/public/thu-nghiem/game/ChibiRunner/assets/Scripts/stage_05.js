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
        background: {
            default: null,
			stage: 0,
			score: 0,
			totalScore: 0,
            type: cc.Node
        },
		snowFlakePrefab: {
			default: null,
            type: cc.Prefab
		},
		iglooPrefab: {
			default: null,
            type: cc.Prefab
		},
		iceSkatePrefab: {
			default: null,
            type: cc.Prefab
		},
		snowballPrefab: {
			default: null,
			orgPos: 0,
			dir: 1,
            type: cc.Prefab
		},
		winGoal: {
			default: null,
			type: cc.Node
		},
		character: {
			default: null,
			type: cc.Node
		}
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {
		cc.game.addPersistRootNode(this.background);
		this.background.zIndex = -1;
		this.background.stage = 5;
		this.player = this.character.getComponent('character');
		this.character.getComponent('character').game = this;
		let size = this.node.getComponent('utils').outlinePool.size();
		this.snowFlakePool = new cc.NodePool();
		for (let i = 0; i < size; i++) {
			let snowFlake = cc.instantiate(this.snowFlakePrefab); // create node instance
			this.snowFlakePool.put(snowFlake); // populate your pool with put method
		}
		let x = -1;
		this.map = [
			0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
			x, x, x, 2, x, x, x, 2, x, x, x, 2, x, x, x, 2, x, x, x, 
			1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, x, 
			x, 2, 2, 2, x, 2, x, 2, x, 2, x, 2, x, 2, x, 2, x, 2, x, 
			x, 2, 1, 1, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 
			x, 2, x, 2, x, 2, x, 2, x, 2, x, 2, x, 2, x, 2, x, 2, x, 
			1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, x, 
			x, 2, x, 2, x, 2, x, 2, x, 2, x, 2, x, 2, x, 2, x, 2, x, 
			x, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 
			x, 2, x, 2, x, 2, x, 2, x, 2, x, 2, x, 2, x, 2, x, 2, 2, 
			1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2,
			3, x, x, 2, x, x, x, 2, x, x, x, 2, x, x, x, 2, x, x, 2
		];
		this.snowFlakePos = [];
		this.iglooPos = [];
		this.iceSkatePos = [];
		this.snowballPos = [
			cc.v2(-5, 11),
			cc.v2(25, 9),
			cc.v2(-5, 7),
			cc.v2(25, 5),
			cc.v2(-5, 3),
			cc.v2(25, 1)	
		];
		let maxRow = this.node.getComponent('utils').rowCount;
		let maxCol = this.node.getComponent('utils').colCount;
		let colCount = 0;
		for (let i = 0; i < this.map.length; i++) {
			if (i == colCount + maxCol) {
				maxRow -= 1;
				colCount += maxCol;
			}
			if (this.map[i] == 0) {
				this.startCell = cc.v2(i + 1 - colCount, maxRow);
			} else if (this.map[i] == 1) {
				this.iglooPos.push(cc.v2(i + 1 - colCount, maxRow));
			} else if (this.map[i] == 2) {
				this.iceSkatePos.push(cc.v2(i + 1 - colCount, maxRow));
			} else if (this.map[i] == 3) {
				this.winGoal.setPosition(this.node.getComponent('utils').getCellPos(i + 1 - colCount, maxRow));
			}
		}
		this.iglooPool = new cc.NodePool();
		for (let i = 0; i < this.iglooPos.length; i++) {
			this.iglooPos[i] = this.node.getComponent('utils').createObstacle(this.node, this.iglooPos[i], this.iglooPrefab, this.iglooPool, true);
		}
		this.iceSkatePool = new cc.NodePool();
		for (let i = 0; i < this.iceSkatePos.length; i++) {
			this.iceSkatePos[i] = this.node.getComponent('utils').createObstacle(this.node, this.iceSkatePos[i], this.iceSkatePrefab, this.iceSkatePool, true);
		}
		this.snowballIndexList = [];
		this.snowballPool = new cc.NodePool();
		let dirTmp = 1;
		for (let i = 0; i < this.snowballPos.length; i++) {
			this.snowballPos[i] = this.node.getComponent('utils').createObj(this.node, this.snowballPos[i], this.snowballPrefab, this.snowballPool, true);
			this.snowballIndexList.push(this.node.getComponent('utils').objCollection.length - 1);
			this.node.getComponent('utils').objCollection[this.node.getComponent('utils').objCollection.length - 1].orgPos = this.snowballPos[i].x;
			this.node.getComponent('utils').objCollection[this.node.getComponent('utils').objCollection.length - 1].dir = dirTmp;
			this.node.getComponent('utils').objCollection[this.node.getComponent('utils').objCollection.length - 1].zIndex = 4;
			dirTmp *= -1;
		}
		let startPos = this.node.getComponent('utils').getCellPos(this.startCell.x, this.startCell.y);
		this.player.node.setPosition(startPos);
		this.background.score = this.node.getComponent('utils').putObj(this.node, startPos, this.snowFlakePrefab, this.snowFlakePool, this.snowFlakePos, null);
		this.background.totalScore = this.node.getComponent('utils').totalScore;
		this.spdUpAmount = 1;
		this.spdUp = false;
		this.snowballSpd = 2.5;
	},

    start () {

    },

    update: function (dt) {
		let pos = this.player.checkMovedInCell();
		if (this.player.checkHitCapturedCell(this.snowFlakePos) != null) {
			cc.director.loadScene('GameOver');
			return;
		}
		if (this.player.checkHitObstacle(this.iglooPos) != null) {
			cc.director.loadScene('GameOver');
			return;
		}
		if (pos != null) {
			if (!this.spdUp) {
				for (let i = 0; i < this.iceSkatePos.length; i++) {
					if (this.iceSkatePos[i].x == pos.x && this.iceSkatePos[i].y == pos.y) {
						this.player.moveSpeed += this.spdUpAmount;
						this.spdUp = true;
						this.player.resetCapturedCell();
						return;
					}
				}
			} else {
				for (let i = 0; i < this.iceSkatePos.length; i++) {
					if (this.iceSkatePos[i].x == pos.x && this.iceSkatePos[i].y == pos.y) {
						return;
					}
				}
				this.player.moveSpeed -= this.spdUpAmount;
				this.spdUp = false;
			}
			this.background.score = this.node.getComponent('utils').putObj(this.node, pos, this.snowFlakePrefab, this.snowFlakePool, this.snowFlakePos, this.player);
		}
		for (let i = 0; i < this.snowballIndexList.length; i++) {
			let snowballIndex = this.snowballIndexList[0] + i;
			if (this.node.getComponent('utils').checkCollapsed(this.player, this.node.getComponent('utils').objCollection[snowballIndex], this.player.node.width / 2 + this.snowballPrefab.data.width / 2 - 15)) {
				cc.director.loadScene('GameOver');
				return;
			}
			if (this.node.getComponent('utils').objCollection[snowballIndex].dir == -1) {
				if (this.node.getComponent('utils').objCollection[snowballIndex].x < -this.node.width / 2 - this.snowballPrefab.data.width / 2) {
					this.node.getComponent('utils').objCollection[snowballIndex].x = this.node.getComponent('utils').objCollection[snowballIndex].orgPos;
				}
			} else if (this.node.getComponent('utils').objCollection[snowballIndex].x > this.node.width / 2 + this.snowballPrefab.data.width / 2) {
					this.node.getComponent('utils').objCollection[snowballIndex].x = this.node.getComponent('utils').objCollection[snowballIndex].orgPos;
			}
			this.node.getComponent('utils').objCollection[snowballIndex].x += this.snowballSpd * this.node.getComponent('utils').objCollection[snowballIndex].dir;
		}
	},
});
