var request = require('request')

//for dev
username='amiel.kollek@mail.mcgill.ca'
password=''

// URLS
var base_url='https://horizon.mcgill.ca/'
var login_url = base_url+'pban1/twbkwbis.P_ValLogin'
var schedule_url = base_url+'pban1/bwskfshd.P_CrseSchdDetl'


// Cookie stuff
var j = request.jar();
var required_cookie = request.cookie('TESTID=set');
j.setCookie(required_cookie, base_url); // set up the required cookie so that authentication works


// POST options for login
var login_options = {
    url: login_url,
    form:{
      'sid':username,
      'pin':password
      },
    jar: j
    };

request.post(login_options,function(error, response, body) {
    // Set up options for getting schedule

    var schedule_options = {
          url: schedule_url,
          headers:{
                "Cookie": j.getCookieString(base_url)
            },
          form:{
              'term_in':'201409' // fall hardcoded here.
            },
          };
          //console.log(j.getCookieString(base_url))
      request.post(schedule_options,function(error, response, body){ // post to get schedule
        console.log(body) //parse here

      })
})



