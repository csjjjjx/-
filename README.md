const dingRobot = require('dingtalkrobot');
cosnt token ='*****';
const msgType = 'text';
const data = {
    content: '测试'
}
const at = [];
const isAtall = false;
dingRobot.send(token,msgType,data,at,isAtall)
    .then(function(result){
        console.log(result);
    })
    .catch(functino(err){
        console.error(err);
    })
