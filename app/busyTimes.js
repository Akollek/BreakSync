module.exports=function(app){

var express = require('express'),
    req = require('request'),
    htmlparser = require("htmlparser")



var router = express.Router();

router.route('/busytimes').post(function(request, response){

  var username = request.body.username
  var password = request.body.password

  console.log(request.body) //This prints '{}' !?!

  // URLS
  var base_url='https://horizon.mcgill.ca/'
  var login_url = base_url+'pban1/twbkwbis.P_ValLogin'
  var schedule_url = base_url+'pban1/bwskfshd.P_CrseSchdDetl'


  // Cookie stuff - credit to mcgill-minerva-api for this part, https://github.com/charlespwd/mcgill-minerva-api
  var j = req.jar();
  var required_cookie = req.cookie('TESTID=set');
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
      else
          console.log("Parsing Sucessful!")
  });
  var parser = new htmlparser.Parser(handler);


  function getTimes (doc,i) {
    var times = [];
    if (doc[i]["children"].length==6) {
      var days =doc[i]["children"][4]["children"][3]["children"][0]["raw"]
      var hours = doc[i]["children"][4]["children"][1]["children"][0]["raw"]
      for (var i = 0; i < days.length; i++) {
        times.push([days[i],hours])
      };
      return times;
    }
    else{
      var days1=doc[i]["children"][4]["children"][3]["children"][0]["raw"]
      var days2=doc[i]["children"][6]["children"][3]["children"][0]["raw"]
      var hours1=doc[i]["children"][4]["children"][1]["children"][0]["raw"]
      var hours2=doc[i]["children"][6]["children"][1]["children"][0]["raw"]
      for (var i = 0; i < days1.length; i++) {
        times.push([days1[i],hours1])
      };
      for (var i = 0; i < days2.length; i++) {
        times.push([days2[i],hours2])
      };
      return times
    }
  }

  req.post(login_options,function(error, resp, body) {
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
      req.post(schedule_options,function(error, resp, body){ // post to get schedule
        //console.log(body) //parse here
        parser.parseComplete(body);
        //since only second one with children will have a schedule time, we can toggle this varaible
        times = true
        base_doc=handler.dom[2]["children"][3]["children"][5]["children"]
        var week={
          "M":[],
          "T":[],
          "W":[],
          "R":[],
          "F":[]
        }
        //console.log(body)
        for (var i = 4; i < base_doc.length; i++) {
          if(base_doc[i]["children"]){
            times = !times
            if (times && base_doc[i]["children"].length > 5) {
              var busy = getTimes(base_doc,i)
              for (var j = 0; j < busy.length; j++) {
                week[busy[j][0]].push(busy[j][1])
              };
            };
          }
        };
        console.log(week)
        response.send(JSON.stringify(week))
        })})

      });
      app.use('/minerva', router)
  }

