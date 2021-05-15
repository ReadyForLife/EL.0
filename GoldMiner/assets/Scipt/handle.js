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
        rotation_state: 1,
        state: 0,
        ox: 0,
        oy:0,
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

    GrowHandle: function () {
        var dx = 10 * Math.cos(this.node.rotation * (Math.PI / 180) + Math.PI / 2), dy = -10 * Math.sin(this.node.rotation * (Math.PI / 180) + Math.PI / 2);
        this.node.setPosition(cc.v2(this.node.x + dx, this.node.y + dy));
        var ds = Math.sqrt((this.node.x - this.ox) * (this.node.x - this.ox) + (this.node.y - this.oy) * (this.node.y - this.oy));
        if (ds > 400) this.state = 1;
    },

    BackHandle: function () {
        var dx = -10 * Math.cos(this.node.rotation * (Math.PI / 180) + Math.PI / 2), dy = 10 * Math.sin(this.node.rotation * (Math.PI / 180) + Math.PI / 2);
        this.node.setPosition(cc.v2(this.node.x + dx, this.node.y + dy));
        var ds = Math.sqrt((this.node.x - this.ox) * (this.node.x - this.ox) + (this.node.y - this.oy) * (this.node.y - this.oy));
        if (ds < 1) this.state = 2;
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
            if (this.node.rotation > 60 || this.node.rotation < -60) this.rotation_state = -this.rotation_state;
            this.node.rotation += this.rotation_state;
        }
    },
    onDestroy() {
        this.node.off(cc.Node.EventType.MOUSE_DOWN, this.onMouseDown, this);
    }
});
