cc.Class({
    extends: cc.Component,

    properties: {
        DiamondsNum: cc.Label,
        GoldNum: cc.Label,
        Warning: cc.Label,
        Lose: cc.Label,
        Betting: cc.Node,
        Restart: cc.Node,
        bankerCards: cc.Node,
        myCard: cc.Node,
        addCard: cc.Prefab,
        addBankerCard: cc.Prefab,
        DealCardUI: cc.Node,
        MyCardNum: cc.Label,
        BankerNum: cc.Label,
        Win: cc.Prefab,
        Fail: cc.Prefab,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.Lose.node.active = false;
        this.Restart.active = false;
        this.bankerCards.active = false;
        this.myCard.active = false;
        //显示金币和钻石
        this.DiamondsNum.string = g_DiamondsNum;
        this.GoldNum.string = g_GoldNum;
        //记录初始金币
        this.startGoldNum = g_GoldNum;
        //获取金币移动脚本
        this.Gold = cc.find('Canvas/GameUI/Betting/GoldMoveNode')
        this.GoldMove = this.Gold.getComponent('GoldMoveNode_S'); 
        //获取庄家点数节点
        this.bankerCount = cc.find('Canvas/bankerCards/paishu')
        //警告不显示
        this.Warning.node.active = false;
        //发牌界面不显示
        this.DealCardUI.active = false;

        this.sound = this.node.getChildByName('Sound').getComponent('GameSound');//获取声音脚本
        this.sound.playSoundBG();//播放背景音乐
    },

    start () {
    },

    //返回房间场景
    onBackButton: function() {
        this.sound.playSoundButton();//播放按钮音效
        this.sound.offSoundBG();//关闭背景音乐
        cc.director.loadScene('RoomScene');
        
    },
    //点击加钻石
    onDiamondsButton: function() {
        g_DiamondsNum += 100;
        this.DiamondsNum.string = g_DiamondsNum;
        this.sound.playSoundButton();//播放按钮音效
    },
    //点击加金币10000
    onGoldButton: function() {
        g_GoldNum += 10000;
        this.GoldNum.string = g_GoldNum;
        this.startGoldNum += 10000;
        this.sound.playSoundButton();//播放按钮音效
    },

    //
    onUserBetClick:function(event,customEventData){

        this.onButton(customEventData);
        console.log(customEventData)
    },

    //点击全部投注
    onButtonAll: function() {
        this.sound.playSoundButton();//播放按钮音效
        if(g_GoldNum > 0){
            for(var i = 0;i < 10 ;i ++){
                this.GoldMove.F_GoldMove();
            }
            this.schedule(function(){
                this.sound.playSoundGold()
            },0.02,7,);
            //播放金币音效
            g_BetNum += g_GoldNum;
            g_GoldNum = 0;
        }
        
    },
    onButton: function(i) {
        if(g_GoldNum >= 1000 * i){
            this.GoldMove.F_GoldMove();
            this.Warning.node.active = false;
            g_GoldNum -= 1000 * i;
            g_BetNum += 1000 * i;
        }else{
            this.Warning.node.active = true;//如果金币不够显示警告
        }  
        this.sound.playSoundButton();//播放按钮音效
        this.sound.playSoundGold();//播放金币音效
    },
    //点击取消投注
    onButtonCancel: function() {
        this.Gold.removeAllChildren();//移除所有桌面金币
        g_GoldNum = this.startGoldNum;//退回金币
        g_BetNum = 0;//投注清零
        this.sound.playSoundButton();//播放按钮音效
    },
    //点击确认投注
    onButtonBetting: function() {
        //投注界面关闭，打开发牌界面，警告界面关闭，显示庄家底牌，显示我的牌,隐藏庄家点数
        this.Betting.active = false;
        this.DealCardUI.active = true;
        this.Warning.node.active = false;
        this.bankerCards.active = true;
        this.myCard.active = true;
        this.bankerCount.active = false;
        //添加初始2张牌
        var card0 = cc.instantiate(this.addCard);
        this.node.addChild(card0);
        var card1 = cc.instantiate(this.addCard);
        this.node.addChild(card1);
        card0.setPosition(0,-45);
        card1.setPosition(0,-45);
        this.cardMoveBy(card1,1);
        g_MyCardNum = g_MyCard[0] + g_MyCard[1];
        this.MyCardNum.string = g_MyCardNum;
        //添加庄家2张初始牌
        var x = Math.ceil(Math.random() * 10);
        g_BankerCard.push(x);
        var banker1 = cc.instantiate(this.addBankerCard);
        this.node.addChild(banker1);
        banker1.setPosition(0,225);
        this.cardMoveBy(banker1,1);
        g_BankerNum = g_BankerCard[0] + g_BankerCard[1];
        this.BankerNum.string = g_BankerNum;
        //播放按钮音效
        this.sound.playSoundButton();
    },
    //点击停止要牌
    onButtonStop: function() {
        this.DealCardUI.active = false;//隐藏发牌界面
        this.Restart.active = true;//显示重新开始界面
        this.bankerCount.active =true;//显示庄家点数
        //庄家要牌
        while(g_BankerNum < 15){
            this.bankerAddCard();
        }
        if(g_BankerNum > 21) {
            this.showBankerCard();
            var fail = cc.instantiate(this.Fail);
            this.node.addChild(fail);
            fail.setPosition(0,225)
            var Failed = fail.getComponent(cc.Animation);
            Failed.play('Fail');
            this.sound.playSoundLose();//播放音效
            g_GoldNum += g_BetNum * 2;
            var win = cc.instantiate(this.Win);
            this.node.addChild(win);
            var Winner = win.getComponent(cc.Animation);
            Winner.play('Win');
        }else{
            console.log(g_BankerCard);
            this.isWin();//判断输赢
            //显示庄家底牌
            this.showBankerCard();
        }
        //初始化数据
        this.init();
        
        this.sound.playSoundButton();//播放按钮音效
    },
    //点击要牌
    onButtonAdd: function() {
        this.AddCard();
        this.sound.playSoundButton();//播放按钮音效
    },
    //点击双倍
    onButtonDouble: function() {
        this.sound.playSoundButton();//播放按钮音效
    },
    //点击重新开始
    onButtonRestart: function() {
        this.Restart.active = false;//关闭重新开始按钮
        cc.director.loadScene('GameScene');
        this.sound.playSoundButton();//播放音效
        cc.audioEngine.stopAll();//停止播放音效
    },
    //加牌
    AddCard: function() {
        //添加我的手牌
        var card = cc.instantiate(this.addCard);
        this.node.addChild(card);
        g_CardNum += 1;
        card.setPosition(0,-45);
        this.cardMoveBy(card,g_CardNum);
        //手牌点数更新
        g_MyCardNum += g_MyCard[g_CardNum];
        this.MyCardNum.string = g_MyCardNum;
        //加牌音效
        this.sound.playSoundCard();
        //判断是否超过21
        this.isPast()
    },
    //庄家要牌
    bankerAddCard: function(){
        
        //添加庄家的手牌
        var banker = cc.instantiate(this.addBankerCard);
        this.node.addChild(banker);
        g_BankerCardNum += 1;
        banker.setPosition(0,225);
        this.cardMoveBy(banker,g_BankerCardNum);
        //更新庄家手牌点数
        g_BankerNum += g_BankerCard[g_BankerCardNum];
        this.BankerNum.string = g_BankerNum;
    },
    //显示庄家底牌
    showBankerCard: function() {
        var backCard = cc.find('Canvas/bankerCards/poker_bg')
        backCard.active = false;
        var card = cc.instantiate(this.addBankerCard);
        this.node.addChild(card);
        var BankerCard = card.getComponent('BankerCard')
        BankerCard.Num.string = g_BankerCard[0];
        BankerCard.BigPattern.spriteFrame = BankerCard.dipai;
        card.setPosition(0,225);
        this.cardMoveBy(card,g_BankerCardNum + 1);
    },
    //牌移动
    cardMoveBy: function(card,order) {
        var move = cc.moveBy(0.5,cc.v2(order * 25,0));
        card.runAction(move);
    },
    //初始化手牌数据
    init: function() {
        g_MyCardNum = 0;
        g_CardNum = 1;
        g_BetNum = 0;
        g_MyCard = new Array();
        g_BankerCardNum = 1;
        g_BankerNum = 0;
        g_BankerCard = new Array();
    },
    
    //是否超过21
    isPast: function() {
        //超过21点
        if(g_MyCardNum > 21){
            this.init();
            this.DealCardUI.active = false;//隐藏发牌界面
            this.Restart.active = true;//显示重新开始界面
            var fail = cc.instantiate(this.Fail);
            this.node.addChild(fail);
            fail.setPosition(0,-45)
            var Failed = fail.getComponent(cc.Animation);
            Failed.play('Fail');
            this.sound.playSoundLose();//播放音效
        }
    },
    //庄家是否超过21
    isBankerPast: function() {
        if(g_BankerNum > 21){
            var fail = cc.instantiate(this.Fail);
            this.node.addChild(fail);
            fail.setPosition(0,225);
            var Failed = fail.getComponent(cc.Animation);
            Failed.play('Fail');
        }
    },
    //判断输赢
    isWin :function() {
        if(g_MyCardNum > g_BankerNum) {
            g_GoldNum += g_BetNum * 2;
            var win = cc.instantiate(this.Win);
            this.node.addChild(win);
            var Winner = win.getComponent(cc.Animation);
            Winner.play('Win');
            this.sound.playSoundWin();//播放音效
        } else {
            this.Lose.node.active = true;
            this.sound.playSoundLose();//播放音效
        }
    }, 
    update: function() {
        this.DiamondsNum.string = g_DiamondsNum;
        this.GoldNum.string = g_GoldNum;
        
    },
});
