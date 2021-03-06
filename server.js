var restify = require('restify');
var builder = require('botbuilder');
var dialog = require('./dialogs/luisDialog');

var request = require('request');

// Get secrets from server environment
var botConnectorOptions = { 
    appId: process.env.BOTFRAMEWORK_APPID, 
    appSecret: process.env.BOTFRAMEWORK_APPSECRET 
};

// Create bot
var bot = new builder.BotConnectorBot(botConnectorOptions);
bot.add('/', function (session) {
	if(!session.userData.name){
		session.beginDialog('/profile');
	} else {    
	    if(session.message.text.indexOf("/roll") > -1){
	    	var min = 0;
	    	var max = 100;
			var num = Math.floor(min + (1 + max - min)*Math.random());

	    	session.send("%s님, 랜덤값은 %d입니다.", session.userData.name, num);
	    } else {
	   	 //respond with user's message
	    	session.send("%s님이 '%s'라고 하셨어요!", session.userData.name, session.message.text);
		}
	}
});

bot.add('/profile', [
	function (session){
		builder.Prompts.text(session, "반갑습니다! 뭐라고 불러드릴까요?");
	},
	function (session, result){
		session.userData.name = result.response;
		builder.Prompts.text(session, "안녕하세요, " + reuslt.response + "님!");
		session.endDialog();
	}
]);


//LUIS bot
var luis = new builder.BotConnectorBot(botConnectorOptions);
luis.add('/', dialog);


//simsimi bot
var simsimiApi = "http://api.simsimi.com/request.p";

var simsimi = new builder.BotConnectorBot(botConnectorOptions);
simsimi.add('/', function(session){
	request({
			method: 'GET',
			// url: simsimiApi + session.message.text.replace(" ", "%20"),
			url: simsimiApi,
			qs:{
				key: 'your_paid_key',
				lc: 'ko',
				ft: '1.0',
				text: session.message.text
			},
			json: true
		}, function(error, response, body){
		if (!error && response.statusCode == 200){
			session.send("%s", body.response);
		} else {
			session.send("뭔가 잘못됐어!");
		}
	});
});


// Setup Restify Server
var server = restify.createServer();

// Handle Bot Framework messages
server.post('/api/messages', bot.verifyBotFramework(), bot.listen());
server.post('/api/luis', luis.verifyBotFramework(), luis.listen());
server.post('/api/simsimi', simsimi.verifyBotFramework(), simsimi.listen());

// Serve a static web page
server.get(/.*/, restify.serveStatic({
	'directory': '.',
	'default': 'index.html'
}));

server.listen(process.env.port || 3978, function () {
    console.log('%s listening to %s', server.name, server.url); 
});
