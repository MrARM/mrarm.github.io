function wait(mili) {
   var Time = new Date().getTime();
   while (Time + mili >= new Date().getTime()) {
   }
}
function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
function makeid()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
