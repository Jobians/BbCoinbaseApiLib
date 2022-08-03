/*CMD
  command: /sendPayment
  help: 
  need_reply: true
  auto_retry_time: 
  folder: Withdraw
  answer: 💸 Send me how much you want to withdraw...

  <<KEYBOARD

  KEYBOARD
  aliases: 
CMD*/

var balance = Libs.ResourcesLib.userRes("balance");
function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n)
}
if (!isNumeric(message)) {
  Bot.sendMessage("❌ Only Number allowed", { is_reply: true})
  return}

if (message < 0.001) {
  Bot.sendMessage(
    "😢 Your balance is too small to withdraw.\n\nMinimum withdrawal: 0.001 LTC")
return}

if (message > balance.value()) {
    Bot.sendMessage(
      "_🚫 You Can Withdraw Maximum:_ " + balance.value().toFixed(5) + " LTC"
    )
return}

var wallet = User.getProperty("withdrawADDR")
var crypto = User.getProperty("withdrawcoin")

// get CB all accounts from property
var accounts = Bot.getProperty("CBAPI-accounts");  
var account;

// search account by currency code
for(var ind in accounts){
  account = accounts[ind];
  if(account.currency==crypto){ break }
}
if (account) {

Libs.CoinbaseApi.createPayment({
  account: account.id,
  currency: crypto,
  address: wallet,
  amount: message,
  onSuccess: "getWithdraw"
})

/*
 NOTE: bot_ remove withdraw amount after successful transaction in getWithdraw command
*/

} else 
Bot.sendMessage("Unknown Error Occurred")

