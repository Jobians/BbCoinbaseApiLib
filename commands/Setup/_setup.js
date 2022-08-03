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

var PrivateKey = "YOUR PRIVATE KEY"
var ApiKey = "YOUR API KEY"

Libs.CoinbaseApi.setPrivateKey(PrivateKey);
Libs.CoinbaseApi.setApiKey(ApiKey);

Libs.CoinbaseApi.getAccounts({
  onSuccess: "/onGetAccounts"
});
