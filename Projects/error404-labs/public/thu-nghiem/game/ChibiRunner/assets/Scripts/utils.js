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
		outlinePrefab: {
			default: null,
            type: cc.Prefab
		},
		scoreDisplay: {
            default: null,
            type: cc.Label
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {
		this.boundLeft = -this.node.width / 2;
		this.boundBot = -this.node.height / 2;
		this.gapX = this.node.width % this.outlinePrefab.data.width / 2;
		this.gapY = this.node.height % this.outlinePrefab.data.height / 2;
		this.outlinePool = new cc.NodePool();
		this.colCount = Math.floor(this.node.width / this.outlinePrefab.data.width);
		this.rowCount = Math.floor(this.node.height / this.outlinePrefab.data.height);
		this.totalScore = this.rowCount * this.colCount;
		for (let i = 0; i < this.totalScore; i++) {
			let outline = cc.instantiate(this.outlinePrefab); // create node instance
			this.outlinePool.put(outline); // populate your pool with put method
			this.createOutline(this.node, i);
		}
		this.score = 0;
		this.scoreDisplay.zIndex = 3;
		this.objCollection = [];
	},
	
	getCellPos(col, row) {
		return cc.v2(this.gapX + this.boundLeft + this.outlinePrefab.data.width / 2 + this.outlinePrefab.data.width * (col - 1),  this.gapY + this.boundBot + this.outlinePrefab.data.height / 2 + this.outlinePrefab.data.height * (row - 1));
	},
	
	createOutline: function (parentNode, order) {
		let outline = null;
		if (this.outlinePool.size() > 0) { // use size method to check if there're nodes available in the pool
			outline = this.outlinePool.get();
		} else { // if not enough node in the pool, we call cc.instantiate to create node
			outline = cc.instantiate(this.outlinePrefab);
		}
		outline.parent = parentNode; // add new outline node to the node tree
		//outline.getComponent('outline').init(); //initialize outline
		let row = Math.floor(order / this.colCount);
		let col = order;
		if (order > this.colCount - 1) {
			col = order - this.colCount * row;
		}
		outline.setPosition(this.getCellPos(col + 1, row + 1));
		//(cc.v2(this.gapX + this.boundLeft + this.outlinePrefab.data.width / 2 + this.outlinePrefab.data.width * col, this.gapY + this.boundBot + this.outlinePrefab.data.height / 2 + this.outlinePrefab.data.height * row));
	},

	createObj: function (parentNode, pos, objPrefab, pool, getCellPos) {
		let obj = cc.instantiate(objPrefab); // create node instance
		pool.put(obj); // populate your pool with put method
		if (getCellPos) {
			pos = this.getCellPos(pos.x, pos.y);
		}
		//let obj = null;
		if (pool.size() > 0) { // use size method to check if there're nodes available in the pool
			obj = pool.get();
		} else { // if not enough node in the pool, we call cc.instantiate to create node
			obj = cc.instantiate(objPrefab);
		}
		obj.parent = parentNode;
		obj.setPosition(pos);
		obj.zIndex = 1;
		this.objCollection.push(obj);
		return pos;
	},
	
	createObstacle: function (parentNode, pos, objPrefab, pool, getCellPos) {
		this.totalScore -= 1;
		return this.createObj(parentNode, pos, objPrefab, pool, getCellPos);		
	},
	
	putObj: function (parentNode, pos, objPrefab, pool, objPosArray, character) {
		this.createObj(parentNode, pos, objPrefab, pool, false);
		objPosArray.push(cc.v2(pos.x, pos.y));
		this.score += 1;
		this.scoreDisplay.string = 'Score: ' + this.score + '/' + this.totalScore;
		if (character != null) {
			character.updateCapturedCell();
		}
		return this.score;
	},
	
	checkCollapsed: function (obj_1, obj_2, checkDist) {
		let dis = obj_1.node.position.sub(obj_2.getPosition()).mag();
		return dis < checkDist;
	},
	
    start () {
		
    },

    // update (dt) {},
});
