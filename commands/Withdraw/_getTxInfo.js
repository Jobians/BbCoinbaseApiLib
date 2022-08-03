/*CMD
  command: /getTxInfo
  help: 
  need_reply: false
  auto_retry_time: 
  folder: Withdraw

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
CMD*/

if (!options) {return}
var info = options.info
var currency = info.network.transaction_amount.currency
var amount = info.network.transaction_amount.amount
var hash = info.network.hash
if(!hash){
Api.answerCallbackQuery({
  callback_query_id: request.id,
  text: "ℹ️ Transaction still processing,\n\n Please try again for some minutes",
  show_alert: true // or false - for alert on top
})
return}

var hashurl = '<a href="https://api.jobians.top/tx/?c='+currency+'&h='+hash+'">'+hash+' </a>'
var line = "\n• ━━━━━━━━━━━━━━━━━ •\n"
var text = "<b>✅ NEW WITHDRAWAL SENT </b>"+line+"<b>👨 User: </b>"+user.telegramid+"\n<b>💵 Amount: </b><code>"+amount+" "+currency+"</code>\n\n"+hashurl+""

Api.editMessageText({
  chat_id: chat.chatid,
  text: text,
  message_id: request.message.message_id,
  parse_mode: "HTML",
 disable_web_page_preview: true 
})

/*
// for channel boardcast
Api.sendMessage({ 
  chat_id: "@yourchannel",
  text: text, parse_mode : "HTML" , disable_web_page_preview: true });
*/
