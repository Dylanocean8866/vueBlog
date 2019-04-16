let arg = {};

function processArg(argStr){
    let strArr = argStr.split('&');
    for(var i = 0; i < strArr.length; i++){
        let temp = strArr[i].split('=');
        arg[temp[0]] = temp[1];

    }
    return arg;
}

module.exports.processArg = processArg;


