var express = require('express');
var router = express.Router();


// Bot Setting
const TelegramBot = require('node-telegram-bot-api');
const token = '2120328492:AAF7X1PzMUBjRjfMDQ3AGEQ13vcLW-HGp4o';
const bot = new TelegramBot(token, {polling: true});


let global_msg_id;
// Main Menu Bot
bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, `Welcome, ${msg.chat.first_name}`, {
    "reply_markup": {
      "keyboard":[["/Apa kabar?"],["/Mau apa hari ini?"]]
      }
    });
});

bot.onText(/\/Apa kabar?/, (msg) => {
    global_msg_id = msg.chat.id;
    bot.sendMessage(
        global_msg_id,
        `Baik`
        );
});

bot.onText(/\/Mau apa hari ini?/, (msg) => {
    global_msg_id = msg.chat.id;
    bot.sendMessage(
        global_msg_id,
        `Melakukan percobaan forum 12.`
        );
});

bot.on('message', (msg) => {
  console.log(msg);
});


/* GET users listing. */
router.get('/', (req, res, next) => {
  res.json({
    "status": 202,
    "messgae": "Success"
  });
});

https://bebaskan.herokuapp.com/api/sensor/123/150/58
router.get('/sensor/:sensor1/:sensor2/:sensor3',(req, res, next) => {
  try {
      bot.sendMessage(
            global_msg_id, //msg.id
            `Pembacaan Sensor::${req.params.sensor1},${req.params.sensor2},${req.params.sensor3}`
     );
      res.json({
        "status": 202,
        "messgae": "Success",
        "data": {
          "sensor_1": req.params.sensor1,
          "sensor_2": req.params.sensor2,
          "sensor_3": req.params.sensor3
        }
      });
  } catch (err) {
      next(err);
  }
});

https://bebaskan.herokuapp.com/api/test/cobacoba
router.get('/test/:key', function(req, res, next){
    bot.sendMessage(
            global_msg_id, //msg.id
            `${req.params.key}`
    );
    res.json(req.params.key);
});


module.exports = router;
