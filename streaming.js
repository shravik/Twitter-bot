console.log('Bot is starting ');

var Twit = require('twit');

var config = require('./config');

var T = new Twit(config);


// streaming tweets

// setting up a user stream
 var stream = T.stream('user');

// anytime someone who follows me
stream.on('follow', followed);

function followed(eventMsg){
      var name = eventMsg.source.name;
      var screenName = eventMsg.source.screen_name;
         tweetIt('@' + screenName + 'Thank you for following me !' );
}


 function tweetIt(txt){

var tweet = {
    status: txt
}

T.post('statuses/update' ,tweet, tweeted);

function tweeted(err, data, response){
    if(err){
        console.log("Something went wrong!");
    }
     else{
        console.log("It worked!");
     }
}
} // end of function