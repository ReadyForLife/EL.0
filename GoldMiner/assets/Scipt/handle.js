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
        StoneSet: {
            default: null,
            type:cc.Node
        },
        Bag: {
            default: null,
            type:cc.Node
        },

        rotation_state: 1,
        state: 0,
        ox: 0,
        oy: 0,
        with_stone:0,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    onLoad() {
        this.state = 2;
        this.ox = this.node.x;
        this.oy = this.node.y;
        //this.node.on(cc.Node.EventType.MOUSE_DOWN, this.onMouseDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);  
    },
    collision_detection: function () {
        //delay(100);
        var i;
        var child = this.StoneSet.children;
        for (i = 0; i < child.length; i++) {
            var ds = Math.sqrt((this.node.x - child[i].x) * (this.node.x - child[i].x) + (this.node.y - child[i].y) * (this.node.y - child[i].y));
           // delay(100);
            var a = child[i];
            console.log(ds);
            if (ds <= 50) {
                this.StoneSet.removeChild(child[i]);
                a.setPosition(cc.v2(this.node.anchorX, this.node.anchorY));
                this.node.addChild(a);
                return 1;
            }
        }
        var dd = Math.sqrt((this.node.x - this.Bag.x) * (this.node.x - this.Bag.x) + (this.node.y - this.Bag.y) * (this.node.y - this.Bag.y));
        if (dd <= 50) {
            //
            this.Bag.setPosition(cc.v2(this.node.anchorX, this.node.anchorY));
            this.node.addChild(this.Bag);
            return 1;
        }
        return 0;
    },

    GrowHandle: function () {
        var dx = 10 * Math.cos(-this.node.angle * (Math.PI / 180) + Math.PI / 2), dy = -10 * Math.sin(-this.node.angle * (Math.PI / 180) + Math.PI / 2);
        this.node.setPosition(cc.v2(this.node.x + dx, this.node.y + dy));
        var ds = Math.sqrt((this.node.x - this.ox) * (this.node.x - this.ox) + (this.node.y - this.oy) * (this.node.y - this.oy));
        //console.log('Yes');
        if (this.collision_detection() == 1) {
            //console.log('Yes');
            this.with_stone = 1;
            this.state = 1;
        }
        if (ds > 600) this.state = 1;
    },

    BackHandle: function () {
        var dx = -10 * Math.cos(-this.node.angle * (Math.PI / 180) + Math.PI / 2), dy = 10 * Math.sin(-this.node.angle * (Math.PI / 180) + Math.PI / 2);
        this.node.setPosition(cc.v2(this.node.x + dx, this.node.y + dy));
        var ds = Math.sqrt((this.node.x - this.ox) * (this.node.x - this.ox) + (this.node.y - this.oy) * (this.node.y - this.oy));
        if (ds < 1) {
            this.state = 2;
            if (this.with_stone == 1) {
                var i;
                var child = this.node.children;
                for (i = child.length - 1; i >= 0; i--) {
                    //console.log('No');
                    this.node.removeChild(child[i]); 
                }
                this.with_stone = 0;
            }
        }
    },

    start () {

    },

    // update (dt) {},
    /*onMouseDown: function (event) {
        cosole.log('Yes');
        if (this.state==2) this.state = 0;
    },*/

    onKeyDown(event) {
        // set a flag when key pressed
        switch (event.keyCode) {
            case cc.macro.KEY.a:
                if (this.state == 2) this.state = 0;
                break;
            case cc.macro.KEY.d:
                if (this.state == 2) this.state = 0;
                break;
        }
    },

    update: function (dt) {
        //if (cc.Node.EventType.MOUSE_DOWN) this.state = 0;
        if (this.state==0) {
            this.GrowHandle();
        }
        else if (this.state == 1) {
            this.BackHandle();
        }
        else {
            if (this.node.angle > 60 || this.node.angle < -60) this.rotation_state = -this.rotation_state;
            this.node.angle += this.rotation_state;
        }
    },
    onDestroy() {
        this.node.off(cc.Node.EventType.MOUSE_DOWN, this.onMouseDown, this);
    }
});
