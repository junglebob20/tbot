const request = require('request');
var TelegramBot = require('node-telegram-bot-api');
var app = require('./appStart.js');
// Устанавливаем токен, который выдавал нам бот.
var token = '463399042:AAG49evmQ_18oxvy-rGg_NgybiEvtu3POsk';
// Включить опрос сервера
var bot = new TelegramBot(token, {polling: true});
var likeDisLike = {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [
          {text:'Проорал бы',callback_data:'good'},
          {text:'Не понял',callback_data:'trash'}
        ]
      ]
  })
}
var members=[291241850,334293900,235936992,266012403,381570783];
var newMem=['Лови мемасик','А вот м мем4ик подъехал','Ды на эту хуйню','Честно....Орнул. А ты?','Классека!','Лол кек 4ебурек'];
bot.on('message', (msg) => {

  var Hi = "Привет";
  var dimon='DIMON';
    if (msg.text.toLowerCase().localeCompare(Hi.toLowerCase()) === 0) {
    bot.sendMessage(msg.chat.id,"Добро пожаловать мистер: "+msg.from.first_name+" "+msg.from.last_name);
    }
    if (msg.text.toLowerCase().localeCompare(dimon.toLowerCase()) === 0) {
    bot.sendPhoto(msg.chat.id,"Photo/dimon.jpeg",{caption:'ДИМОООООНб ТУДУДТУДУДАУДДУДУДУИУТУ'})
    }

    console.log(msg);

});
bot.onText(/\/start/, (msg) => {
  db.query("SELECT `id` FROM `members` WHERE `id`="+msg.from.id,function(err,result){
    if (result.length==0) {
      var sql="INSERT INTO `members`(`id`, `first_name`, `last_name`, `username`) VALUES ('"+msg.from.id+"','"+msg.from.first_name+"','"+msg.from.last_name+"','"+msg.from.username+"')";
      db.query(sql, function (err, result) {
        if (err) throw err;
        console.log("New User add");
      });
    }
  });
  bot.sendMessage(msg.chat.id, "Пацики привет, вы че не узнали, это же я Илюха Прусикин!!");
  bot.sendMessage(msg.chat.id, "Фразо4ки в наличии:\nПривет\nDIMON");
});
bot.on('callback_query', function (msg) {
  if (msg.data=='good') {
    bot.answerCallbackQuery(msg.id, 'Я знал что тебе понравиться!', false);
  }else if(msg.data=='trash'){
    bot.answerCallbackQuery(msg.id, 'Следующий мем будет лучше!', false);
  }
});
function givePhoto(host,cb) {
     const options = {
         url: host,
         method: 'GET',
         headers: {
             'Accept': 'application/json',
             'Accept-Charset': 'utf-8'
         }
     };

     function callback(error, response, body) {
         if (!error && response.statusCode == 200) {
             var cert = JSON.parse(body);
             cb(cert);
         }
     }
     request(options, callback);
 }
 function main(interval){
   setInterval(function(){
     givePhoto("https://api.vk.com/method/photos.get?owner_id=-45745333&album_id=wall&rev=1&extended=1&v=5.68", function(photo) {
       photo.response.items.sort(function(a,b){
         return b.likes.count-a.likes.count;
       });
       var i=Math.floor((Math.random() * 450) + 0);
           if (!photo.response.items[i].photo_604) {
             bot.sendPhoto(291241850,photo.response.items[i].photo_130,likeDisLike,{caption:newMem[Math.floor((Math.random() * newMem.length) + 0)]});
           }else{
             bot.sendPhoto(291241850,photo.response.items[i].photo_604,likeDisLike,{caption:newMem[Math.floor((Math.random() * newMem.length) + 0)]});
           }
           console.log('mem vyslan');
    });
   }, interval);
 }
main(5000);
