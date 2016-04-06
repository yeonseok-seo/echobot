# echobot
A sample bot for getting started with Bot Framework

This repo is an example of using Node.js to build a bot, which is hosted on Azure and uses continuous deployment from Github.

Here's how to use this bot as a starter template for your own Node.js based bot:

*note: in the examples below, replace "echobotsample" with your bot ID for any settings or URLs.*

1. Fork this repo.
2. Create an Azure web app.
![](images/azure-create-webapp.png?raw=true)
3. Set up continuous deployment to Azure from your Github repo.
![](images/azure-deployment.png?raw=true)
4. Verify the deployment has completed by visiting the web app [http://echobotsample.azurewebsites.net/](http://echobotsample.azurewebsites.net/).
![](images/azure-browse.png?raw=true)
5. [Register your bot with the Bot Framework](http://docs.botframework.com/connector/getstarted/#registering-your-bot-with-the-microsoft-bot-framework).
6. Enter your Bot Framework App ID and App Secret into Azure settings.
![](images/azure-secrets.png?raw=true)
7. [Test the connection to your bot](http://docs.botframework.com/connector/getstarted/#testing-the-connection-to-your-bot) from the Bot Framework developer portal.
   