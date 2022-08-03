/*CMD
  command: /onWalletCreate
  help: 
  need_reply: false
  auto_retry_time: 
  folder: Deposit

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
CMD*/

if(!options){return}

var currency = options.currency
var address = options.address
var text = "<b>✅ Send The Amount Of "+currency+" You Want To Deposit To The Following Address:</b>\n\n<code>"+address+"</code>"

var inlkey = [[{text:"⬅️ Return",callback_data:"/Deposit r"}]]
Api.editMessageText({
  chat_id: chat.chatid,
  text: text,
  message_id: request.message.message_id,
  parse_mode: "HTML",
  reply_markup: { inline_keyboard: inlkey }
})


