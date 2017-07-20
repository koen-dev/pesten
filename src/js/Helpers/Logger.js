class Logger{
  constructor(){
    var exLog = console.log;
    console.log = (msg) => {
      exLog(msg);
      var test = document.createElement("li");
      test.appendChild(document.createTextNode(msg));
      var log = document.getElementById('log');
      log.insertBefore(test, log.firstChild);
    }
  }
}

export default new Logger();
