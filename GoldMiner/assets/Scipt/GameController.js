// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        ground: {
            default: null,
            type: cc.Node
        },
        Stone: {
            default: null,
            type: cc.Prefab
        },
        handle: {
            default: null,
            type: cc.Node
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    onLoad: function () {
        var i = 0;
        for (; i < 10; i++) {
            this.spawnNewStone();
        }
    },
    spawnNewStone: function () {
        var newStone = cc.instantiate(this.Stone);
        this.node.addChild(newStone);
        newStone.setPosition(this.getStoneNewPosition());
        newStone.setContentSize(this.getStoneSize());
    },
    getStoneNewPosition:function() {
        var randX = 0;
        var randY = this.ground.y-(Math.random()+0.2)*300;
        var maxX = this.node.width / 2;
        randX = (Math.random() - 0.5) * 2 * maxX;
        return cc.v2(randX, randY);
    },
    getStoneSize:function() {
        var randwidth = Math.random() * 50+50, randheight = Math.random() * 50+50;
        console.log(randwidth);
        return cc.size(randwidth, randheight);
    },

    MoveHandle: function () {
        //console.log('Yes');
        var PositionX = cc.Event.EventMouse.getLocationX(), PositionY = cc.Event.EventMouse.getLocationY();
        var dx = (PositionX - this.handle.x) / 10,dy=(PositionY-this.handle.y)/10;
        for (var i = 0; i < 10; i++) {
            this.handle.setPosition(cc.v2(PositionX + i * dx, Positiony + i * dy));
            delay(10);
        }
        for (var i = 9; i >=0; i++) {
            this.handle.setPosition(cc.v2(PositionX + i * dx, Positiony + i * dy));
            delay(10);
        }
    },
    start() {

    },
    update: function (dt) {
        /*if (cc.Node.EventType.MOUSE_DOWN) {
            this.MoveHandle();
        }*/
    },
    // update (dt) {},
});
