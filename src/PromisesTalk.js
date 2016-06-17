/*callback hell, christmas tree code - nesting callback after callback...
  PROMISES
*/
/*let's replicate an async method!
call setTimout, wait 500, then console.log a messsage, 
this is just a replicated async method without doing anything terribly complicated
this coudl be a call to an API, or a database, something that simulates a need for 
callbacks.
*/
function asyncMethod(message, cb){
  setTimeout(function(){
    console.log(message);
    cb();
  } , 500)
}

asyncMethod('Open DB Connection', function(){
  //find user in DB, takes a function
  asyncMethod('Find User', function(){
    //validate the user, takes a function
    asyncMethod('Validate User', function(){
      //do stuff after validation!
      asyncMethod('Do Stuff', function(){})
    })
  })
})

//another example of callback versus promise!
/*We need to handle errors thrown by JSON.parse but we also need to be careful not to handle errors thrown by the callback function. By the time we've done all of this our code is a mess of error handling:*/
function readJSON(filename, callback){
  fs.readFile(filename, 'utf8', function(err, res){
    if(err) {return calback(err);}
    try {
      res = JSON.parse(res);
    } catch (ex) {
      return callback(ex);
    }
    callback(null, res);
  });
}
//constructing a promise
function readFile(filename, enc){
  return new Promise(function (fulfill, reject){
    fs.readFile(filename, enc, function (err, res){
      if (err) reject(err);
      else fulfill(res);
    });
  });
}