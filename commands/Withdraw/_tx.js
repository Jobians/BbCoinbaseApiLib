/*CMD
  command: /tx
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

if(!params){return}

Api.answerCallbackQuery({
  callback_query_id: request.id,
  text: "ℹ️ Getting transaction info...",
  show_alert: false // or false - for alert on top
})

var id = params.split(" ")[0]
var coin = params.split(" ")[1]

Libs.CoinbaseApi.getTxInfo({
  id: id,
  currency: coin,
  onSuccess: "/getTxInfo",
});

