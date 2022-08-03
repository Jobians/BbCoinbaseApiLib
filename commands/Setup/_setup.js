/*CMD
  command: /setup
  help: 
  need_reply: false
  auto_retry_time: 
  folder: Setup

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
CMD*/

// Get your keys in https://www.coinbase.com/settings/api

var PrivateKey = "M0Iwc4SRCK5owapqJuhlyzmP0CnwwYzO"
var ApiKey = "Zt7AF5bknDURaw1o"

Libs.CoinbaseApi.setPrivateKey(PrivateKey);
Libs.CoinbaseApi.setApiKey(ApiKey);

Libs.CoinbaseApi.getAccounts({
  onSuccess: "/onGetAccounts"
});
