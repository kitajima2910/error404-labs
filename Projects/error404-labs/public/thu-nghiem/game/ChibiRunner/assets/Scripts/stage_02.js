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
		flowerPrefab: {
			default: null,
            type: cc.Prefab
		},
		fencePrefab: {
			default: null,
            type: cc.Prefab
		},
		grassPrefab: {
			default: null,
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
		this.background.stage = 2;
		this.player = this.character.getComponent('character');
		this.character.getComponent('character').game = this;
		let size = this.node.getComponent('utils').outlinePool.size();
		this.flowerPool = new cc.NodePool();
		for (let i = 0; i < size; i++) {
			let flower = cc.instantiate(this.flowerPrefab); // create node instance
			this.flowerPool.put(flower); // populate your pool with put method
		}
		let x = -1;
		this.map = [
			0, x, x, x, x, x, 1, x, x, x, x, x, x, x, x, x, x, x, x, 
			x, x, 1, 1, 1, x, 1, x, 2, x, x, x, x, x, 1, 1, 1, 1, x, 
			1, 1, 1, 1, x, x, 1, x, 1, 1, 1, 1, 1, 1, x, x, x, x, x, 
			x, x, x, x, x, 2, 1, x, 2, x, x, x, x, x, x, 2, 1, 1, 1, 
			x, x, 2, x, x, 1, x, x, x, x, 1, x, x, 2, x, x, x, x, x, 
			2, x, x, 1, 1, 1, 1, x, x, x, x, x, x, x, x, x, x, x, x, 
			1, 1, x, x, x, 2, 1, x, x, 3, 1, 1, 1, 1, 1, x, 1, 1, 1, 
			2, 1, x, x, x, x, 1, 1, 1, 1, x, x, x, x, x, x, x, x, 1, 
			2, 1, x, x, x, x, x, x, 1, 1, x, x, x, x, x, x, x, x, 1, 
			1, 1, x, x, x, x, x, x, 1, 1, 1, 1, 1, x, x, x, x, 2, 2, 
			x, x, x, x, 1, 2, 2, x, x, x, x, x, x, x, x, x, x, x, x, 
			x, x, x, x, 1, 1, 1, x, x, x, x, x, x, 1, 1, x, x, x, x
		];
		this.flowerPos = [];
		this.fencePos = [];
		this.grassPos = [];
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
				this.fencePos.push(cc.v2(i + 1 - colCount, maxRow));
			} else if (this.map[i] == 2) {
				this.grassPos.push(cc.v2(i + 1 - colCount, maxRow));
			} else if (this.map[i] == 3) {
				this.winGoal.setPosition(this.node.getComponent('utils').getCellPos(i + 1 - colCount, maxRow));
			}
		}
		this.fencePool = new cc.NodePool();
		for (let i = 0; i < this.fencePos.length; i++) {
			this.fencePos[i] = this.node.getComponent('utils').createObstacle(this.node, this.fencePos[i], this.fencePrefab, this.fencePool, true);
		}
		this.grassPool = new cc.NodePool();
		for (let i = 0; i < this.grassPos.length; i++) {
			this.grassPos[i] = this.node.getComponent('utils').createObstacle(this.node, this.grassPos[i], this.grassPrefab, this.grassPool, true);
		}
		let startPos = this.node.getComponent('utils').getCellPos(this.startCell.x, this.startCell.y);
		this.player.node.setPosition(startPos);
		this.background.score = this.node.getComponent('utils').putObj(this.node, startPos, this.flowerPrefab, this.flowerPool, this.flowerPos, null);
		this.background.totalScore = this.node.getComponent('utils').totalScore;
	},

    start () {

    },

    update: function (dt) {
		let pos = this.player.checkMovedInCell();
		if (this.player.checkHitCapturedCell(this.flowerPos) != null) {
			cc.director.loadScene('GameOver');
			return;
		}
		if (this.player.checkHitObstacle(this.fencePos) != null) {
			cc.director.loadScene('GameOver');
			return;
		}
		if (this.player.checkHitObstacle(this.grassPos) != null) {
			cc.director.loadScene('GameOver');
			return;
		}
		if (pos != null) {
			this.background.score = this.node.getComponent('utils').putObj(this.node, pos, this.flowerPrefab, this.flowerPool, this.flowerPos, this.player);
		} 
	},
});
