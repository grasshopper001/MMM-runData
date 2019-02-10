var NodeHelper=require("node_helper");
var request=require("request");

module.exports=NodeHelper.create({
    start:function(){
        
    },
    getTable:function(callback){
        request({
            url:"http://47.96.26.134:3001/runData",
            json:true
        },(err,res,body)=>{
            if(err) callback("fail to connect runData");
            callback(undefined,body);
        })
    },
    socketNotificationReceived:function(notification,payload){
        var self=this;
        switch(notification){
            case "bring me runData":
                this.getTable((err,res)=>{
                    if(err) this.sendSocketNotification(err);
                    this.sendSocketNotification("runData",res);
                })
                break;
            default:
                break;
        }
    }
})