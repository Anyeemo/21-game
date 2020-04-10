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
        TextureCard: {
            type: cc.SpriteAtlas,
            default: null,
        },
        Num: cc.Label,
        BigPattern: cc.Sprite,
        SmallPattern: cc.Sprite,
        
        
    },

    onLoad: function() {
        //4种花色的图像集数组
        var heitao = ['heitao_big','heitao_small'];
        var hongtao = ['hongtao_big','hongtao_small'];
        var heimei = ['heimei_big','heimei_small'];
        var fangkuai = ['fangkuai_big','fangkuai_small'];
        var cardColor = [heitao,hongtao,heimei,fangkuai] 
        var x = Math.ceil(Math.random() * 13);//随机1-13整数
        var y = Math.floor(Math.random() * 10 / 3);//随机0-3整数
        var z;//颜色的R属性
        (y == 1 || y == 3)?z = 188 : z = 0;//y=1,3是红色,则为黑色
        
        if(x == 11){
            this.BigPattern.spriteFrame = this.TextureCard.getSpriteFrame('ranker');
            this.Num.string = 'J';
            g_BankerCard.push(10);
        }else
        if(x == 12){
            this.BigPattern.spriteFrame = this.TextureCard.getSpriteFrame('kueen');
            this.Num.string = 'Q';
            g_BankerCard.push(10);
        }else
        if(x == 13){
            this.BigPattern.spriteFrame = this.TextureCard.getSpriteFrame('king');
            this.Num.string = 'K';
            g_BankerCard.push(10);
        }else
        if(x == 1){
            this.Num.string = 'A';
            this.BigPattern.spriteFrame = this.TextureCard.getSpriteFrame(cardColor[y][0]);
            g_BankerCard.push(x);//将数字放进全局数组
        }else{
            this.Num.string = x;
            this.BigPattern.spriteFrame = this.TextureCard.getSpriteFrame(cardColor[y][0]);
            g_BankerCard.push(x);//将数字放进全局数组
        }
        this.SmallPattern.spriteFrame = this.TextureCard.getSpriteFrame(cardColor[y][1]);
        this.Num.node.color = new cc.Color(z,0,0,255);//设定数字颜色

        this.dipai = this.TextureCard.getSpriteFrame(cardColor[y][0]);
        
        
    },
    
});
