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

//A PROMISE MAKES OUR FUNCTIONS THEN-ABLE
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

//awaiting a promise
/*In order to use a promise, we must somehow be able to wait for it to be fulfilled or rejected. The way to do this is using promise.done (see warning at the end of this section if attempting to run these samples).
With this in mind, it's easy to re-write our earlier readJSON function to use promises:*/

function readJSON(filename) {
  return new Promise(function(fullfill, reject){
    readfile(filename, 'utf8').done(function (res){
      try{
        fulfill(JSON.parse(res));      
      } catch (ex) {
        reject(ex);
      }
    }, reject);
  });
}

/*Put simply, .then is to .done as .map is to .forEach. To put that another way, use .then whenever you're going to do something with the result (even if that's just waiting for it to finish) and use .done whenever you aren't planning on doing anything with the result.

Now we can re-write our original example as simply:*/

function readJSON(filename) {
  return readFile(filename, 'utf8').then(function (res){
    return JSON.parse(res);
  })
}

//Since JSON.parse is just a function, we could re-write this as:

function readJSON(filename){
  return readFile(filename, 'utf8').then(JSON.parse);
}


