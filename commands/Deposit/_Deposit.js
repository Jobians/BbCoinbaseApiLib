/*CMD
  command: /Deposit
  help: 
  need_reply: false
  auto_retry_time: 
  folder: Deposit

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: deposit
CMD*/

// get all your coinbase coin from property
var accounts = Bot.getProperty("CBAPI-accounts");

/* 
// for custom deposit coin uncomment this
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
    callback_data: "/createWallet " + account.currency
  })
  
  if(ind==0){ continue }  
  if((ind%3)==0){
    // new row in keyboard
    keyboard.push([])
    keyboardRow = keyboardRow + 1
  }
}

var text = "👇 Choose a method from below to deposit:"

if(params == "r"){
  Api.editMessageText({
  chat_id: chat.chatid,
  text: text,
  message_id: request.message.message_id,
  parse_mode: "HTML",
  reply_markup: { inline_keyboard: keyboard }
})

} else {

Api.sendMessage({
  text: text,
  parse_mode: "markdown",
  reply_markup: { inline_keyboard: keyboard }
})}
