var express = require('express');
var router = express.Router();


// Bot Setting
const TelegramBot = require('node-telegram-bot-api');
const token = '2140702668:AAHLGoKLzxek5GJtvAtrDiNHOtLT_dxO9dk';
const bot = new TelegramBot(token, {polling: true});

let global_msg_id;

// Main Menu Bot
bot.onText(/\/Start/, (msg) => {
    bot.sendMessage(msg.chat.id, `Welcome, ${msg.chat.first_name}`, {
    "reply_markup": {
      "keyboard":[["/Halo"],["/Mau apa kita hari ini?"]]
      }
    });
});

bot.onText(/\/Halo/, (msg) => {
    global_msg_id = msg.chat.id;
    bot.sendMessage(
        global_msg_id,
        `Halo juga`
        );
});

bot.onText(/\/Mau apa kita hari ini?/, (msg) => {
    global_msg_id = msg.chat.id;
    bot.sendMessage(
        global_msg_id,
        `kita akan mencoba percobaan untuk PBM forum ke 12.`
        );
});

bot.on('message', (msg) => {
  console.log(msg);
});


/* GET users listing. */
router.get('/', (req, res, next) => {
  res.json({
    "status": 202,
    "message": "Success"
  });
});

// https://esp-pbm12-41421110113.herokuapp.com/api/sensor/40/33/37
router.get('/sensor/:sensor1/:sensor2/:sensor3', (req, res, next) => {
  try {
      bot.sendMessage(
            global_msg_id, //msg.id
            `Pembacaan Sensor:: ${req.params.sensor1}, ${req.params.sensor2}, ${req.params.sensor3}`
     );
      res.json({
        "status": 202,
        "message": "Success",
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

// https://esp-pbm12-41421110113.herokuapp.com/api/msg/Percobaan_router_key
router.get('/msg/:key', function(req, res, next){
    bot.sendMessage(
            global_msg_id, //msg.id
            `${req.params.key}`
    );
    res.json(req.params.key);
});


module.exports = router;
