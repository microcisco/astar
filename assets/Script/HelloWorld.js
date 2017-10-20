var authFindPath = require('AutoFindPath');

cc.Class({
    extends: cc.Component,

    properties: {
        gird: {
            default: null,
            type: cc.Prefab
        },
        canv: {
            default: null,
            type: cc.Node
        },

        operatorAction: {
            default: 0    // 0: 无操作  1: 设置出生点  2: 设置障碍物  3: 设置目标点 4: 开始寻路
        }
    },

    // use this for initialization
    onLoad: function () {

        var self = this;

        //地图脚本
        this.canvScript = this.canv.getComponent('canvasControl');

        //初始化地图
        var winSize = cc.director.getWinSize();
        var instantiate = cc.instantiate(this.gird);
        var widthNum = (winSize.width / instantiate.width);
        var heightNum = (winSize.height / instantiate.height);
        for(var i = 0; i < widthNum; ++i) {
            for(var j = 0; j < heightNum; ++j) {
                var _instantiate = cc.instantiate(this.gird);
                _instantiate.x = i * instantiate.width;
                _instantiate.y = j * instantiate.height;
                _instantiate.setTag(_instantiate.x + '' + _instantiate.y);
                this.node.addChild(_instantiate);
            }
        }

        //事件监听
        //出身点
        cc.find('Canvas/control/bron').on('mousedown', function ( event ) {
            self.canvScript.SetEdit1(1);
            self.operatorAction = 1;
        }.bind(this));
        //障碍物
        cc.find('Canvas/control/obstacles').on('mousedown', function ( event ) {
            self.canvScript.SetEdit1(2);
            self.operatorAction = 2;
        }.bind(this));
        //目标点
        cc.find('Canvas/control/target').on('mousedown', function ( event ) {
            self.canvScript.SetEdit1(3);
            self.operatorAction = 3;
        }.bind(this));
        //开始寻路
        cc.find('Canvas/control/action').on('mousedown', function ( event ) {
            self.canvScript.SetEdit1(4);
            self.operatorAction = 4;

            var navigationInfo = self.getNavigationInfo();
            var path = authFindPath.getPath(navigationInfo.bron, navigationInfo.obstacles, navigationInfo.target, navigationInfo.map, navigationInfo.girdLength);

            console.log(path);


            var index = 0;
            setInterval(function () {
                if(index === path.length) {
                    return;
                }
                var t = path[index++];
                var node = self.node.getChildByTag(t.x + '' + t.y);
                node.setColor(cc.color(255,230,150));
            }, 200);


            /*
            path[1].forEach(function (t) {

                if(t.F) {
                    var node = self.node.getChildByTag(t.x + '' + t.y);

                    // node.setColor(cc.color(255,230,150));

                    node.getChildByName('tt').getComponent('cc.Label').string = t.F;

                }

            });

            path[2].forEach(function (t) {

                if(t.F) {
                    var node = self.node.getChildByTag(t.x + '' + t.y);

                    node.setColor(cc.color(255,230,150));


                }

            });
*/

        }.bind(this));

    },

    //获取导航信息
    getNavigationInfo: function () {
        var res = {bron: null, obstacles: [], target: null, map: [], girdLength: 0};
        res.bron = new cc.Vec2(this.bron.x, this.bron.y);
        res.target = new cc.Vec2(this.target.x, this.target.y);
        res.girdLength = this.bron.width;
        this.obstacles.forEach(function (t) {
            res.obstacles.push(new cc.Vec2(t.x, t.y))
        });
        this.node.getChildren().forEach(function (t) {
            res.map.push(new cc.Vec2(t.x, t.y));
        });
        return res;
    },

    //更新地图变化
    getMapNotify: function (position) {
        var gridObject = this.getGirdObject(position);



        //设置出生点
        if(this.operatorAction === 1) {
            //已经有出生点就清空
            if(this.bron) {
                this.bron.setColor(cc.color(255,255,255));
            }
            this.bron = gridObject;
            gridObject.setColor(cc.color(0,255,0));
        }
        //设置障碍物
        if(this.operatorAction === 2) {
            if(!this.obstacles) {
                this.obstacles = [];
            }
            this.obstacles.push(gridObject);
            gridObject.setColor(cc.color(0,0,0));
        }
        //设置目标点
        if(this.operatorAction === 3) {
            //已经结束点就清空
            if(this.target) {
                this.target.setColor(cc.color(255,255,255));
            }
            this.target = gridObject;
            gridObject.setColor(cc.color(255,165,0));
        }
    },

    //获取个字对象
    getGirdObject: function (position) {
        var children = this.node.getChildren();
        for(var i = 0, l = children.length ; i < l; ++i) {
            if(children.hasOwnProperty(i)) {
                var t = children[i];
                //包含该点
                if(cc.rectContainsPoint(t.getBoundingBox(), position)) {
                    return t;
                }
            }
        }
    },

    // called every frame
    update: function (dt) {

    }



});
