/*CMD
  command: /AdminBalance
  help: 
  need_reply: false
  auto_retry_time: 
  folder: Admin Features

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 🔐 admin features
CMD*/

//if(user.telegramid != 1350180828){return}

// get all your coinbase coin from property
var accounts = Bot.getProperty("CBAPI-accounts");

/* 
// for custom get balance coin uncomment this
var accounts = [
  { currency: "LTC" },
  { currency: "BTC" },
  { currency: "ETH" }
]
*/

var keyboard = [[]];
var account;
var keyboardRow = 0;

for(var ind in accounts){
  account = accounts[ind];
  keyboard[keyboardRow].push({
    text: account.currency,
    callback_data: "/getBalance " + account.currency
  })
  
  if(ind==0){ continue }  
  if((ind%3)==0){
    // new row in keyboard
    keyboard.push([])
    keyboardRow = keyboardRow + 1
  }
}

var text = "🔐 Select currency from below you want to get the balance:"

Api.sendMessage({
  text: text,
  parse_mode: "markdown",
  reply_markup: { inline_keyboard: keyboard }
})
