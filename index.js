const TelegramBot = require('node-telegram-bot-api');
const dialogflow = require('./dialogflow');
const youtube = require('./youtube');

const token = '1327376624:AAENhoR-BePiMea1PL4QiLw5_emRvBeC8Jc';

// polling irá ficar pingando no servidor deo telegram quando receber novas menssagens
const bot = new TelegramBot(token, {polling: true});

bot.on('message', async function (msg) {
    const chatId = msg.chat.id;
    console.log(msg.text);

    const dfResponse = await dialogflow.sendMessage(chatId.toString(), msg.text);

    let responseText = dfResponse.text;

    if (dfResponse.intent === 'Treino Saitama'){
        responseText = await youtube.searchVideosURL(responseText, dfResponse.fields.corpo.stringValue);
    }

    
    bot.sendMessage(chatId,  responseText);
});