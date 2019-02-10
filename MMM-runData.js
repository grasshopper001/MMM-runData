Module.register("MMM-runData",{
    defaults:{},
    start:function(){},
    getStyles:function(){
        return [
            "MMM-runData.css"
        ];
    },
    getDom:function(){
        var wrapper=document.createElement("div");
        wrapper.id="runData-wrapper";
        var html=`
            <p>Wx runData</p>
            <hr id="runData-header-hr"></hr>
            <table border="0" id="runData">
                <tr id="runData-Header">
                    <th></th>
                    <th>nickName</th>
                    <th>step</th>
                </tr>
            </table>
        `;
        wrapper.insertAdjacentHTML("afterbegin",html);
        return wrapper;
    },
    notificationReceived:function(notification,payload,sender){
        switch(notification){
            case "ALL_MODULES_STARTED":
                this.sendSocketNotification("bring me runData");
                break;
            case "DOM_OBJECTS_CREATED":
                setInterval(()=>{
                    this.sendSocketNotification("bring me runData");
                },30000);
                break;
            case "got runData":
                this.updateDom();
                break;
            default:
                break;
        }
    },
    socketNotificationReceived:function(notification,payload){
        switch(notification){
            case "runData":
            var table=document.getElementById("runData");
                for(let i=0;i<payload.length;i++){
                    var row=`
                        <tr id="${payload[i].nickName}">
                            <td>${i+1}</td>
                            <td>${payload[i].nickName}</td>
                            <td>${payload[i].step}</td>
                        </tr>
                    `;
                    if(i==0){
                        row=`
                        <tr id="${payload[i].nickName}">
                            <td>1</td>
                            <td>${payload[i].nickName}</td>
                            <td>${payload[i].step}<small id="fa-star" class="icon">&#xf005</small></td>
                        </tr>
                        `;
                    }
                    if(document.getElementById(payload[i].nickName)!==null){
                        var line=document.getElementById(payload[i].nickName);
                        line.innerHTML=`
                            <td>${i+1}</td>
                            <td>${payload[i].nickName}</td>
                            <td>${payload[i].step}</td>
                        `;
                        if(i==0){
                            var line=document.getElementById(payload[i].nickName);
                            line.innerHTML=`
                            <td>${i+1}</td>
                            <td>${payload[i].nickName}</td>
                            <td>${payload[i].step}<small id="fa-star" class="icon">&#xf005</small></td>
                        `;
                        }
                    }else{
                        table.insertAdjacentHTML("beforeend",row);
                    }
                    //<i id="fa-hand-o-left" class="icon">&#xf0a5</i>    
                }
                this.sendNotification("got runData");
                break;
            default:
                break;
        }
    }
})