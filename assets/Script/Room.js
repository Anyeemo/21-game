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
        DiamondsNum: cc.Label,
        GoldNum: cc.Label,
        PlayerName: cc.Label,
        Advice: cc.Node,
        Block: cc.Node,
        ChangeName: cc.Node,
        ChangeFace: cc.Node,
        PlayerFace: cc.Sprite,
    },

    onLoad() {
        //显示金币和钻石
        this.DiamondsNum.string = g_DiamondsNum;
        this.GoldNum.string = g_GoldNum;
        this.PlayerName.string = g_PlayerName;
        this.sound = this.node.getChildByName('Sound').getComponent('RoomSound');
        this.sound.playSoundBG();
        this.Advice.active = false;
        this.Block.active = false;
        this.ChangeName.active = false;
        this.ChangeFace.active = false;
    },
    //点击意见按钮
    GiveAdvice: function () {
        this.Advice.active = true;
        this.Block.active = true;
    },
    //点击提交意见
    Submit: function () {
        this.Advice.active = false;
        this.Block.active = false;
    },
    //点击修改名字
    ChangePlayerName: function () {
        this.ChangeName.active = true;
        this.Block.active = true;
    },
    //点击确定修改名字
    SubmitChangeName: function () {
        console.log(this.ChangeName.getComponent(cc.EditBox).string);
        this.PlayerName.string = this.ChangeName.getComponent(cc.EditBox).string;
        this.ChangeName.active = false;
        this.Block.active = false;

    },
    //点击修改头像
    ChangePlayerFace: function () {
        this.ChangeFace.active = true;
        this.Block.active = true;
    },
    //点击确定修改头像
    SubmitChangeFace: function (event, CustomEventData) {
        console.log(this.node.getChildByName('ChangeFace').getChildByName(CustomEventData).getChildByName('Background').getComponent(cc.Sprite).spriteFrame);
        var face = this.node.getChildByName('ChangeFace').getChildByName(CustomEventData).getChildByName('Background').getComponent(cc.Sprite).spriteFrame;
        this.PlayerFace.spriteFrame = face;
        this.ChangeFace.active = false;
        this.Block.active = false;
    },
    //进入游戏场景
    onFastStart: function () {
        cc.director.loadScene('GameScene');
        this.sound.playSoundButton();
        this.sound.offSoundBG();
    },
    //点击加钻石
    onDiamondsButton: function () {
        g_DiamondsNum += 100;
        this.DiamondsNum.string = g_DiamondsNum;
        this.sound.playSoundButton();
    },
    //点击加金币
    onGoldButton: function () {
        g_GoldNum += 10000;
        this.GoldNum.string = g_GoldNum;
        this.sound.playSoundButton();
    },
    onManualButton: function () {
        this.sound.playSoundButton();
    },
    onSettingButton: function () {
        this.sound.playSoundButton();
    },



});
