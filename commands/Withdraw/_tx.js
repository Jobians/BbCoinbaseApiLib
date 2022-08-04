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

var id = params.split(" ")[0]
var coin = params.split(" ")[1]

Libs.CoinbaseApi.getTxInfo({
  id: id,
  currency: coin,
  onSuccess: "/getTxInfo",
});

