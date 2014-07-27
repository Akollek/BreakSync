var request = require('request');
var htmlparser = require("htmlparser");

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



// Parsing stuff

var handler = new htmlparser.DefaultHandler(function (error, dom) {
    if (error)
        console.log("Parsing Error!")
    //else
        //console.log("Parsing Sucessful!")
});
var parser = new htmlparser.Parser(handler);



function getTimes (doc,i) {
  if (doc[i]["children"].length==6) {
    return doc[i]["children"][4]["children"][3]["children"][0]["raw"]+" -- "+doc[i]["children"][4]["children"][1]["children"][0]["raw"]
  }
  else{
    first=doc[i]["children"][4]["children"][3]["children"][0]["raw"]+" -- "+doc[i]["children"][4]["children"][1]["children"][0]["raw"]
    second=doc[i]["children"][6]["children"][3]["children"][0]["raw"]+" -- "+doc[i]["children"][6]["children"][1]["children"][0]["raw"]
    return first+"\n"+second
  }
}



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
        //console.log(body) //parse here
        parser.parseComplete(body);
        //since only second one with children will have a schedule time, we can toggle this varaible
        times = true
        classes=[]
        base_doc=handler.dom[2]["children"][3]["children"][5]["children"]
        //console.log(base_doc[17]["children"][6]["children"][3]["children"][0]["raw"])
        for (var i = 4; i < base_doc.length; i++) {
          if(base_doc[i]["children"]){
            times = !times
            if (times && base_doc[i]["children"].length > 5) {
              console.log(getTimes(base_doc,i))

            };
          }
        };
        
})})


