// import { Telegraf } from "telegraf";
// import { message } from 'telegraf/filters';
// import config from 'config';

// const bot = new Telegraf(config.get('TELEGRAM_TOKEN'), {
//     handlerTimeout: Infinity,
// })

// bot.command('start', ctx => {
//     ctx.reply(
//         `Welcome to TG bot! 
//         Send a text message with theses about history.`
//         )
// })

// bot.on(message('text'), ctx => {
//     ctx.reply('test')
// })

// bot.launch()


const TelegramApi = require('node-telegram-bot-api')

const {gameOptions, againOptions} = require('./options')

const token = '6739264453:AAEkzFPCyVSrL4LaT-t5-wSL4A41XIN3NIc'

const bot = new TelegramApi(token, {polling: true})

const chats = {}



const startGame = async (chatId) => {
    await bot.sendMessage(chatId, `Guess the number from 0 to 9`)
            const randomNumber = Math.floor(Math.random() * 10)
            chats[chatId] = randomNumber;
            await bot.sendMessage(chatId, `Try guess!`, gameOptions)
}

const start = () => {
    bot.setMyCommands([
        {command: '/start', description: 'Welcome'},
        {command: '/info', description: 'Information about user'},
        {command: '/game', description: 'Random number'},
    ])
    
    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;
        const firstName = msg.chat.first_name;
        const lastName = msg.chat.last_name;
        
    
        if (text === '/start') {
            await bot.sendSticker(chatId, 'https://chpic.su/_data/stickers/e/Enotopack/Enotopack_001.webp?v=1705093503')
            return bot.sendMessage(chatId, `You are welcome, ${firstName}!`)
        }
        if (text === '/info') {
            return bot.sendMessage(chatId, `Your name is ${firstName} ${lastName}`)
        }
        if (text === '/game') {
            return startGame(chatId)
        }
        return bot.sendMessage(chatId, `I do not understand! Try more!`)
    })
    
    bot.on('callback_query', msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;

        if (data === '/again') {
            return startGame(chatId)
        }
        if (data === chats[chatId]) {
            return bot.sendMessage(chatId, `You right! Number ${chats[chatId]}`, againOptions)
        } else {
            return bot.sendMessage(chatId, `You lose! You chose number ${data} Right: ${chats[chatId]}`, againOptions)
        }
        bot.sendMessage(chatId, `You chose number ${data}`)
        
    })
}

start()