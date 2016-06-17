//base example, create a function called action, takes a callback, waits 5 s, and executes.
var action = function(cb){
  setTimeout(function() {
    cb('Hey')
  }, 5000);
};
action(function(arg){
  console.log(arg)
})

//take back control! 'invert the inversion'
  
//a promise is just an object with notification methods on it.

//to get started making a 'new Promise' with a new Promise library, all we have to do is have a funciton that returns a promise with the new Promise constructor.

  var action =  function(){
    return new Promise(function(resolve, reject) {
      setTimeout(function(){
        resolve('hey');
      },2000);
    });
  };
  //A+ promise specification

  action()
    .then(function(word){
      console.log(word);
    });
//now we can store this in a variable
var promise = action();
//sometime in the future, we can ask for what we want.
//the reject
var action =  function(){
  return new Promise(function(resolve, reject) {
    setTimeout(function(){
      reject(new Error('noooooo'));
    },2000);
  });
};
action()
  .then(function(word){ //returns another promise (itself)
    console.log(word); //may or may not happen
  })
  .catch(function(err){ // also returns another promise (itself), so these can be chained
    console.log(err);  //may or may not happen
  });

//anything returned in .then is going to be a promise

var fs = require('fs');


var readFile = function() {
  return new Promise(function(resolve, reject){
    fs.readFile('./package.json', function(err, file){
      return err ? reject(err) : resolve(file.toString());
    });
  });
};

var readAllFiles = function() {
  var promises = [readFile(), readFile(), readFile()];
  return Promise.all(promises);
};


var logFile = function(){
  return readFile() //a promise //resolves 2
    .then(function(){
      return readFile() //also a promise! //resolves 3
    });
};

 //order:
readFile() //resolves 1
  .then(logFile, function(err){
    console.log(err);
  }) //4
  .then(sendEmail) //5
  .then(callHome) //6
  .catch(function(){}) //if you're catching errors on each then() promise you don't need a .catch()

