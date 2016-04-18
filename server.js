var restify = require('restify');
var builder = require('botbuilder');

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

// Setup Restify Server
var server = restify.createServer();

// Handle Bot Framework messages
server.post('/api/messages', bot.verifyBotFramework(), bot.listen());

// Serve a static web page
server.get(/.*/, restify.serveStatic({
	'directory': '.',
	'default': 'index.html'
}));

server.listen(process.env.port || 3978, function () {
    console.log('%s listening to %s', server.name, server.url); 
});
