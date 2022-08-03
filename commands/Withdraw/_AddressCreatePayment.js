/*CMD
  command: /AddressCreatePayment
  help: 
  need_reply: true
  auto_retry_time: 
  folder: Withdraw

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
CMD*/

if (message == "❌ Cancel"){
  Bot.runCommand("/start")
return
}
if (message.length < 30) {
  Bot.sendMessage("❌ Wrong Wallet Address")
Bot.runCommand("/start")
//Coinbase also check it
  return
}
User.setProperty("withdrawADDR", message)
Bot.runCommand("/sendPayment")

