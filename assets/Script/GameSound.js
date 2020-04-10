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
        soundBG: {
            default: null,
            type: cc.AudioClip
        },
        soundButton: {
            default: null,
            type: cc.AudioClip
        },
        soundWin: {
            default: null,
            type: cc.AudioClip
        },
        soundLose: {
            default: null,
            type: cc.AudioClip
        },
        soundGold: {
            default: null,
            type: cc.AudioClip
        },
        soundCard: {
            default: null,
            type: cc.AudioClip
        },
        
        
    },

    playSoundBG: function() {
        cc.audioEngine.playMusic(this.soundBG,true);
    },
    offSoundBG: function() {
        cc.audioEngine.stopMusic();
    },
    playSoundButton: function() {
        cc.audioEngine.playEffect(this.soundButton,false);
    },
    playSoundWin: function() {
        cc.audioEngine.playEffect(this.soundWin,false);
    },
    playSoundLose: function() {
        cc.audioEngine.playEffect(this.soundLose,false);
    },
    playSoundGold: function() {
        cc.audioEngine.playEffect(this.soundGold,false);
    },
    playSoundCard: function() {
        cc.audioEngine.playEffect(this.soundCard,false);
    },
});
