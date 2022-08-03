/*CMD
  command: getDeposit
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

if (!content) { return }
var info = JSON.parse(content)

var currency = info.currency
var amount = info.amount
var hash = info.hash
var text =
  "*✅ " +
  currency +
  " DEPOSIT RECEIVED *\n\n◼️ Amount: " +
  amount +
  " " +
  currency +
  "\n\n◼️ Transaction link:\n["+hash+"](https://api.jobians.top/tx/?c="+currency+"&h="+hash+")"
Api.sendMessage({ text: text, parse_mode: "Markdown", disable_web_page_preview: true  })

// convert from Crypto to LTC and Add to user balance
// LTC is my bot currency
var ltc = CurrencyQuote.convert({ amount: amount, from: currency, to: "LTC" })
var balance = Libs.ResourcesLib.userRes("balance")
balance.add(ltc)
