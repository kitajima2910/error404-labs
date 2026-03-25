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
        tutorial_0: {
			default: null,
			isActive: true,
            type: cc.Node
		},
		tutorial_1: {
			default: null,
			isActive: false,
            type: cc.Node
		}
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {
		this.tutorial_1.active = false;
		let here = this;
		let endTut = false;
		this.node.on('touchstart', function(){
			//here.tutorial_0.active = here.tutorial_0.isActive = !here.tutorial_0.isActive;
			if (!endTut) {
				here.tutorial_1.active = here.tutorial_1.isActive = !here.tutorial_1.isActive;
				endTut = true;
			} else {
				cc.director.loadScene('Stage_01');
			}
		}, this.node);

		this.node.on('touchmove', function (event) {

			var delta = event.touch.getDelta();

			this.x += delta.x;
			this.y += delta.y;

		}, this.node);

		this.node.on('touchend', function () {
		}, this.node);
	},

    start () {

    },

    // update (dt) {},
});
