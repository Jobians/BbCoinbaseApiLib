/*CMD
  command: /createWallet
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

if(!params){return}
Api.answerCallbackQuery({
    callback_query_id: request.id,
    text: "Generating address...",
    show_alert: false 
  })
  
// get CB all accounts from property
var accounts = Bot.getProperty("CBAPI-accounts");  
var code = params;
var account;

// search account by currency code
for(var ind in accounts){
  account = accounts[ind];
  if(account.currency==code){ break }
}
  
// webhook url to get user deposit automatic
var url = Libs.Webhooks.getUrlFor({
  command: "getDeposit",
  user_id: user.id
})

Libs.CoinbaseApi.createWallet({
  account: account.id,
  currency: code,
  onSuccess: "/onWalletCreate",
  onIncome: url
});

