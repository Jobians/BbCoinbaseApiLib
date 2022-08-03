
// Copyright 2022 jobiansTechie. All right reserved
// Last updated 3/8/2022
// Use this code to connect Bots.Business BJS with Coinbase
// https://help.bots.business/libs/coinbaseapi


let libPrefix = "CoinbaseApi" 
let API_URL = "https://api.jobians.top/coinbase";


function setPrivateKey(key){ 
Bot.setProperty(libPrefix + "privatekey", key, "string"); 
} 
 
function setApiKey(key){ 
Bot.setProperty(libPrefix + "apikey", key, "string"); 
}


function loadKey(){ 
  var apiKey = Bot.getProperty(libPrefix + "apikey"); 
  var privateKey = Bot.getProperty(libPrefix + "privatekey"); 
 
  if(!privateKey){ throw new Error("CoinbaseApi lib: no privateKey. You need to setup it") } 
  if(!apiKey){ throw new Error("CoinbaseApi lib: no apiKey. You need to setup it") } 
 
  return { 
    apiKey: apiKey, 
    privateKey: privateKey 
  } 
} 

function getUserCallback(options){
  let userCallback = "";
  if(!options.onSuccess){ options.onSuccess = "" }

  if(options.onSuccess){
    userCallback = options.onSuccess.split(" ").join("#==#");
  }

  if(options.onError){
    userCallback+= options.onError.split(" ").join("#==#");
  }

  return userCallback;
}


// Create Deposit
function createWallet(options){
    if(!options){ throw "CoinbaseApi Lib: need options" }
    if(!options.account){ throw "CoinbaseApi Lib: need options.account" }
    if(!options.currency){ throw "CoinbaseApi Lib: need options.currency" }
    if(!options.onIncome){ throw "CoinbaseApi Lib: need options.onIncome" }
    if(!options.onSuccess){ throw "CoinbaseApi Lib: need options.onSuccess" }
    let worker = loadKey(); 
    let privatekey = worker.privateKey 
    let apikey = worker.apiKey 
    let userCallback = getUserCallback(options);
    
 HTTP.get({ 
  url:""+API_URL+"/deposit.php?key="+privatekey+"&api="+apikey+"&url="+encodeURIComponent(options.onIncome)+"&account="+options.account+"&crypto="+options.currency+"", 
  success: libPrefix + "onGetCallbackAddress " + userCallback
 }) 
} 
 
function onGetCallbackAddress(){
  let arr = params.split(" ");
  let callback
  let errCallback;

  if(arr[0]){
    callback = arr[0].split("#==#").join(" ");
  }

  if(arr[1]){
    errCallback = arr[1].split("#==#").join(" ");
  }

  let info = JSON.parse(content)
  let currency = info.currency;
  let address = info.address;

  if(callback&&(callback!="")){
    Bot.runCommand(callback, {currency: currency,address:address});
  }

  if(!address){ return }
  // TODO - is need stored in prop?
}



// Create Payment
function createPayment(options){
    if(!options){ throw "CoinbaseApi Lib: need options" }
    if(!options.account){ throw "CoinbaseApi Lib: need options.account" }
    if(!options.currency){ throw "CoinbaseApi Lib: need options.currency" }
    if(!options.address){ throw "CoinbaseApi Lib: need options.address" }
    if(!options.amount){ throw "CoinbaseApi Lib: need options.amount" }
    if(!options.onSuccess){ throw "CoinbaseApi Lib: need options.onSuccess" }
    let worker = loadKey(); 
    let privatekey = worker.privateKey 
    let apikey = worker.apiKey 
    let userCallback = getUserCallback(options);
    
 HTTP.get({ 
  url:""+API_URL+"/send.php?key="+privatekey+"&api="+apikey+"&amount="+options.amount+"&account="+options.account+"&crypto="+options.currency+"&to="+options.address+"", 
  success: libPrefix + "onPaymentCompleted " + userCallback
 }) 
} 
 
function onPaymentCompleted(){
  let arr = params.split(" ");
  let callback
  let errCallback;

  if(arr[0]){
    callback = arr[0].split("#==#").join(" ");
  }

  if(arr[1]){
    errCallback = arr[1].split("#==#").join(" ");
  }

  let info = JSON.parse(content)

  if(callback&&(callback!="")){
    Bot.runCommand(callback, {info: info});
  }

  if(!info){ return }
  // TODO - is need stored in prop?
}



// Get Transaction info
function getTxInfo(options){
    if(!options){ throw "CoinbaseApi Lib: need options" }
    if(!options.id){ throw "CoinbaseApi Lib: need options.id" }
    if(!options.currency){ throw "CoinbaseApi Lib: need options.currency" }
    if(!options.onSuccess){ throw "CoinbaseApi Lib: need options.onSuccess" }
    let worker = loadKey(); 
    let privatekey = worker.privateKey 
    let apikey = worker.apiKey 
    let userCallback = getUserCallback(options);
    
 HTTP.get({ 
  url:""+API_URL+"/tx.php?key="+privatekey+"&api="+apikey+"&id="+options.id+"&coin="+options.currency+"", 
  success: libPrefix + "ongetTxInfo " + userCallback
 }) 
} 
 
function ongetTxInfo(){
  let arr = params.split(" ");
  let callback
  let errCallback;

  if(arr[0]){
    callback = arr[0].split("#==#").join(" ");
  }

  if(arr[1]){
    errCallback = arr[1].split("#==#").join(" ");
  }

  let info = JSON.parse(content)

  if(callback&&(callback!="")){
    Bot.runCommand(callback, {info: info});
  }

  if(!info){ return }
  // TODO - is need stored in prop?
}



// Get Coinbase Balance
function getBalance(currency){
     if(!currency){ 
      Bot.sendMessage('Use : `Libs.CoinbaseApi.getBalance("LTC");`'); 
      return 
} 
    let worker = loadKey(); 
    let privatekey = worker.privateKey 
    let apikey = worker.apiKey 
    
 HTTP.get({ 
  url:""+API_URL+"/balance.php?key="+privatekey+"&api="+apikey+"&coin="+currency+"", 
  success: libPrefix + 'ongetBalance'
 }) 
} 
 
function ongetBalance(){ 
 
    let info = JSON.parse(content)
    let currency = info.balance.currency;
    let amount = info.balance.amount;
    Bot.sendMessage("*Currency:* "+currency+"\n\n*Amount:* "+amount+""); 
}  



// Get All Coinbase Accounts
function getAccounts(options){
    if(!options){ throw "CoinbaseApi Lib: need options" }
    if(!options.onSuccess){ throw "CoinbaseApi Lib: need options.onSuccess" }
    let worker = loadKey(); 
    let privatekey = worker.privateKey 
    let apikey = worker.apiKey 
    let userCallback = getUserCallback(options);
    
 HTTP.get({ 
  url:""+API_URL+"/accounts.php?key="+privatekey+"&api="+apikey+"", 
  success: libPrefix + "ongetAccounts " + userCallback
 }) 
} 

 
function ongetAccounts(){
  let arr = params.split(" ");
  let callback
  let errCallback;

  if(arr[0]){
    callback = arr[0].split("#==#").join(" ");
  }

  if(arr[1]){
    errCallback = arr[1].split("#==#").join(" ");
  }

  let info = JSON.parse(content)

  if(callback&&(callback!="")){
      Bot.run({
      command: callback,
      options: {
      info: info
      }
   })
    
  }

  if(!info){ return }
  // TODO - is need stored in prop?
}



on(libPrefix + 'onGetCallbackAddress', onGetCallbackAddress); 
on(libPrefix + 'onPaymentCompleted', onPaymentCompleted); 
on(libPrefix + 'ongetTxInfo', ongetTxInfo);
on(libPrefix + 'ongetBalance', ongetBalance); 
on(libPrefix + 'ongetAccounts', ongetAccounts); 

publish({ 
 createWallet:createWallet, 
 createPayment:createPayment, 
 getTxInfo:getTxInfo, 
 getBalance:getBalance, 
 getAccounts:getAccounts,
 setPrivateKey:setPrivateKey, 
 setApiKey:setApiKey, 
 loadKey:loadKey
})
