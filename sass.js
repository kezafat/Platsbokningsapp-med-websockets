var nodeSass = require('node-sass'),
    fs = require('fs');

/*  EXAMPLE CONFIG
"sass": [
  {
    "compileAtBootup": true,
    "watch": true,
    "arguments": {
      "file": "../sass/index.scss",
      "outFile": "./client/css/all.css",
      "outputStyle": "compressed"
    }
  }
]
*/

module.exports = class Sass {
  constructor(config){
    this.config = config;

    if (this.config.compileAtBootup) {
      this.compile();
    }

    if (this.config.watch) {
      this.startWatch();
    }
  }

  get timeTaken(){
    return parseInt(process.hrtime(this.timeBegun)[1] / 1000000) + 'ms';
  }

  writeOutputFile(css) {
    let dst = this.config.arguments.outFile;
    fs.writeFile(dst, css, (err)=>{
      err
        ? console.warn(this.getFormattedTime(), 'Error writing compiled SASS to outFile:', err)
        : console.log(this.getFormattedTime(), 'SASS re-compiled in', this.timeTaken);
    });
  }

  compile() {
    this.timeBegun = process.hrtime();
    nodeSass.render(this.config.arguments, (err, result)=>{
      err
        ? console.warn(this.getFormattedTime(), 'Error compiling SASS:', err)
        : this.writeOutputFile(result.css.toString());
    });
  }

  startWatch() {
    let throttleId;

    fs.watch(this.config.arguments.watchFolder, { recursive: true }, (eventType, filename) => {
      if (throttleId) { clearTimeout(throttleId); }

      throttleId = setTimeout(() => {
        throttleId = null;
        this.compile();
      }, 50);
    });
  }

  getFormattedTime(){
    let d = new Date();
    return d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
  }
}
