/*CMD
  command: /getBalance
  help: 
  need_reply: false
  auto_retry_time: 
  folder: Admin Features

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
CMD*/

if(!params){return}
Api.deleteMessage({
chat_id :  chat.chatid,
message_id : request.message.message_id
})

Libs.CoinbaseApi.getBalance(params);

//Libs.CoinbaseApi.getBalance("LTC");

