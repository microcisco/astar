cc.Class({
    extends: cc.Component,

    properties: {

        //用户点击地图后开启
        edit: {
            visible:false,
            default: false
        },
        //用户点击编辑模式后开启
        edit1: {
            visible:false,
            default: 0
        },
        map: {
            default: null,
            type: cc.Node
        }

    },

    // use this for initialization
    onLoad: function () {

        //地图脚本
        this.mapScript = this.map.getComponent('HelloWorld');

        var self = this;
        // 使用枚举类型来注册
        this.node.on(cc.Node.EventType.MOUSE_DOWN, function (event) {
            self.edit = true;
            //正在编辑模式
            if(self.edit && (this.edit1 !== 0 && this.edit1 !== 4) ) {
                self.notifyMapChange(event.getLocation());
            }
        }, this);
        this.node.on(cc.Node.EventType.MOUSE_MOVE, function (event) {
            //正在编辑模式
            if(self.edit && (this.edit1 !== 0 && this.edit1 !== 4) ) {
                self.notifyMapChange(event.getLocation());
            }
        }, this);
        this.node.on(cc.Node.EventType.MOUSE_UP, function (event) {
            self.edit = false;
        }, this);

    },
    
    SetEdit1: function (state) {
        this.edit1 = state;
    },

    //通知地图变化
    notifyMapChange: function (position) {
        this.mapScript.getMapNotify(position);
    }



    // update: function (dt) {

    // },
});
