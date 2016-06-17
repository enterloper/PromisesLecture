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