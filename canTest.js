function configure(values){
    var fs = require('fs')
            ,config = {docRoot:'/somewhere'}
            ,key 
            ,stat
            ;
    for(key in values){
        config[key] = values[key]
    } 
    try{
        stat = fs.statSync(config.docRoot);
        if(!stat.isDirectory()){
            throw new Error('Is not valid');
        }
    }catch(e){
        console.log("**"+config.docRoot+"does not exist or is not a directory!!**");
        return;
    }
    return config;
}
///////可以切成幾個比較小的函式
/**
 * 設定組態值的函式（及查詢函式,這類函式有一個回傳值）
 * @param {*} values 
 */
function configure(values){
    var config = { docRoot:'/somewhere'}
        ,key
    ;
    for(key in values){
        config[key]=values[key];
    }
    return config;
}
/**
 * 驗證個別組態的傳回值屬於命令函式可能會丟出異常錯誤
 * @param {*} config 
 */
function validateDocRoot(config){
    var fs = require('fs')
        ,stat
    ;
    stat = fs.statSync(config.docRoot);
    if(!stat.isDirectory()){
        throw new Error('Is not valid');
    }

}