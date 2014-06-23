#include "lib/parameters.jsx";

var message = 'OK';
var config = load_parameters(['document'], {});

if (config != null) {
  var file = new File(config['document'] + '.indd');
  var doc = app.open(file);


  var img_file = new File(doc.filePath + '/../results/' + doc.name + '.html');
  doc.exportFile(ExportFormat.HTML, img_file);
  doc.close();
}


message;