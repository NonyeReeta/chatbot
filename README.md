# CHAT BOT PROJECT 

This project serves as the third semester **exam** for [Alt School's](altschoolafrica.com) Backend development with Nodejs.

The project's UI is rendered using *ejs*

## GETTING STARTED

* Clone the repository into your local environment.
* Run `npm install` to install all dependencies.
* Create a .env file
    * Add the following variables
        * DB_URL = `Mongo db url`
        * PORT = 3000
        * JWT_SECRET = `add a random text here`.
* Add .env to gitignore
* Run `node app.js` to get the project running.
* The Entry point for the api is localhost:3000.

## How to use
* On initialization, the bot returns the initial options required to perform any action.
    * ![application screenshot](https://github.com/NonyeReeta/chatbot/blob/master/images/chatbot-init.png?raw=true)
* input 1 to get available menu. This area is where we perform actions.
    * ![application screenshot](https://github.com/NonyeReeta/chatbot/blob/master/images/chatbot1.png?raw=true)
        * This will return a list of items the "Place order area". This is where we place order.
            * Input a number from the list to add an item to cart.
                ![application screenshot](https://github.com/NonyeReeta/chatbot/blob/master/images/chatbot-user1.png?raw=true)
            * input multiple orders like this:
                ![application screenshot](https://github.com/NonyeReeta/chatbot/blob/master/images/chatbot-usermul.png?raw=true)
* After adding items to the cart, we can checkout, view current order, view order history and cancel an order like this:
    * ![application screenshot](https://github.com/NonyeReeta/chatbot/blob/master/images/chatbot-99.png?raw=true)
    * * ![application screenshot](https://github.com/NonyeReeta/chatbot/blob/master/images/chatbot-orderplaced.png?raw=true)
