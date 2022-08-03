/*CMD
  command: /Withdraw
  help: 
  need_reply: false
  auto_retry_time: 
  folder: Withdraw

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: withdraw
CMD*/

/*
// for withdraw with all coin uncomment this
var accounts = Bot.getProperty("CBAPI-accounts");
*/

// for custom withdraw coin
var accounts = [
  { currency: "LTC" }
]


var keyboard = [[]];
var account;
var keyboardRow = 0;

for(var ind in accounts){
  account = accounts[ind];
  keyboard[keyboardRow].push({
    text: account.currency,
    callback_data: "/createPayment " + account.currency
  })
  
  if(ind==0){ continue }  
  if((ind%3)==0){
    // new row in keyboard
    keyboard.push([])
    keyboardRow = keyboardRow + 1
  }
}

var text = "👇 Select currency from below you want to withdraw:"

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
