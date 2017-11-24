console.log('Bot is starting ');

var Twit = require('twit');

var config = require('./config');

var T = new Twit(config);


// parameters passed to the function get

var params = {
    q: 'machine learning',
     count: 5
};

// get function to get the number of tweets

T.get('search/tweets', params , gotData);


function gotData(err, data, response){
  var tweets = data.statuses;
  for(var i = 0;i< tweets.length;i++){
    console.log(tweets[i].text);
  }

    // console.log(data);
};


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

// posting tweets through post method

setInterval(tweetIt,1000*20)
tweetIt();

 function tweetIt(){
  var r = Math.floor(Math.random() * 100);

var tweet = {
    status: 'here is a random no ' + r + ' #coding from node.js'
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


// RETWEET tweets

var retweet = function() {
    var params = {
        q: '#nodejs, #Nodejs',  // REQUIRED
        result_type: 'recent',
        lang: 'en'
    }
    T.get('search/tweets', params, function(err, data) {
      // if there no errors
        if (!err) {
          // grab ID of tweet to retweet
            var retweetId = data.statuses[0].id_str;
            // Tell TWITTER to retweet
            T.post('statuses/retweet/:id', {
                id: retweetId
            }, function(err, response) {
                if (response) {
                    console.log('Retweeted!!!');
                }
                // if there was an error while tweeting
                if (err) {
                    console.log('Something went wrong while RETWEETING... Duplication maybe...');
                }
            });
        }
        // if unable to Search a tweet
        else {
          console.log('Something went wrong while SEARCHING...');
        }
    });
}

// grab & retweet as soon as program is running...
retweet();
// retweet in every 50 minutes
setInterval(retweet, 3000000);

// ====== Favorite tweets ====



var favoriteTweet = function(){
  var params = {
      q: '#nodejs, #Nodejs',  // REQUIRED
      result_type: 'recent',
      lang: 'en'
  }
  // for more parametes, see: https://dev.twitter.com/rest/reference

  // find the tweet
  T.get('search/tweets', params, function(err,data){

    // find tweets
    var tweet = data.statuses;
    var randomTweet = ranDom(tweet);   // pick a random tweet

    // if random tweet exists
    if(typeof randomTweet != 'undefined'){
      // Tell TWITTER to 'favorite'
      T.post('favorites/create', {id: randomTweet.id_str}, function(err, response){
        // if there was an error while 'favorite'
        if(err){
          console.log('CANNOT BE FAVORITE... Error');
        }
        else{
          console.log('FAVORITED... Success!!!');
        }
      });
    }
  });
}
// grab & 'favorite' as soon as program is running...
favoriteTweet();
// 'favorite' a tweet in every 60 minutes
setInterval(favoriteTweet, 3600000);

// function to generate a random tweet tweet
function ranDom (arr) {
  var index = Math.floor(Math.random()*arr.length);
  return arr[index];
};

//