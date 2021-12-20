cc.Class({
    extends: cc.Component,

    properties: {
        levelInformation: {
            default: null,
            type: cc.Label
        },

        chipLabel: {
            default: null,
            type: cc.Node 
        },

        playButton: {
            default: null,
            type: cc.Button
        },
        
    },

    enable(){
        this.node.active = true;
    },

    disable(){
        this.node.active = false; 
    },
    
    displaylevelInformation(level, goalNum, goalColor, movies){
        this.chipLabel.color = goalColor; 
        this.levelInformation.string = "Level " + level +  "\n Goal:  collect " + goalNum +  "\n in " + movies + " movies!"
    },
   
  

});
