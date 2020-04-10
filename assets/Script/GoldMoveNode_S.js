// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,
    
    properties: {
        GoldMove: cc.Prefab,
    },
    //向桌面添加一个金币
    F_GoldMove: function() {
        var GoldX = Math.random() * 50 + 525;
        var GoldY = Math.random() * 50 - 275;
        var Gold = cc.instantiate(this.GoldMove);
        this.node.addChild(Gold);
        Gold.setPosition(GoldX,GoldY);
        var GoldMove = Gold.getComponent('GoldMove');
        GoldMove.onPlay();
    },
    //清空桌面的金币
    F_GoldRemove: function() {
        this.node.removeAllChildren;
    },
});
