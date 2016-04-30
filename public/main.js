var $ = require('jquery');
window.$ = $;
window.jQuery = $;
require('bootstrap')
const Dialog = require('remote').require('dialog')

var fs = require('fs')
    xml2js = require('xml2js');


function convertXml(file, callback) {
  var xml = fs.readFileSync(file, 'utf8');
  var parser = new xml2js.Parser();
  parser.parseString(xml, function (err, result) {
    if (err) {
      alert("Ein Problem mit der Datei ist aufgetreten.\nEs Könnte vieleicht ein '&' sein.\nBitte überprüfen sie die Datei nach einem '&' oder anderen Fehlern.")
      return;
    }
    days = result["ljtr-2016"].day
    out = "";
    for (var i = 0; i < days.length; i++) {
      events = days[i].event
      if (i === 0) {
        out = out+"Donnerstag, 05.05.2016\n"
      } else if (i === 1) {
        out = out+"Freitag, 06.05.2016\n"
      } else if (i === 2) {
        out = out+"Samstag, 07.05.2016\n"
      } else if (i === 3) {
        out = out+"Sontag, 08.05.2016\n"
      }
      for (var r = 0; r < events.length; r++) {
        if (events[r].start[0][0] === "a") {
          out = out+events[r].start[0]+"\t"+events[r].name+"\t"+events[r].place+"\n";
        } else {
          out = out+events[r].start[0]+" - "+events[r].end[0]+"\t"+events[r].name+"\t"+events[r].place+"\n";
        }
      }
      out = out+"\n"

    }
    callback(out)
  });
}


addFile = function () {
  const files = Dialog.showOpenDialog({ properties: [ 'openFile', 'openFile' ],   filters: [{ name: 'XML', extensions: ['xml']}]});
  if (files) {
    convertXml(files.toString(), function (result) {
      $('#output').text(result);
    })
  }
}

description = function () {
  $('#description').fadeToggle()
}
