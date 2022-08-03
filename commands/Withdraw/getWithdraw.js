/*CMD
  command: getWithdraw
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

if (!options) { return }
var info = options.info
var error_1 = info.errors

if (!error_1){
var id = info.data.id
var code = info.data.amount.currency
var debit = info.data.network.transaction_amount.amount
var balance = Libs.ResourcesLib.userRes("balance");

Bot.sendInlineKeyboard([ {title: "🖇️ Get Transaction Details", command: "/tx "+id+" "+code+""} ], "✅ Transaction Successful, Check Your Wallet")

balance.remove(parseFloat(debit))

} else {
var meg = "*❌ Coinbase Error (Internal)*\n\n`"+info.errors[0].message+"`"

Bot.sendMessage(meg)
//Api.sendMessage({ chat_id: "admin id", text: meg, parse_mode: "Markdown" })

}
