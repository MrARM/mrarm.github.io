function wait(mili) {
   var Time = new Date().getTime();
   while (Time + mili >= new Date().getTime()) {
   }
}
