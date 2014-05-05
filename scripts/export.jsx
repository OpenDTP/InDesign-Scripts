function export_pages(doc, path) {
  var name = doc.name;
  for (var i = 0; i < doc.pages.length; i++) {
    page = doc.pages.item(i);
    app.JPEGExportPreference.exportResolution = quality;
  }
}

function export_elem() {
  if (format == 'jpeg')
  {
    app.JPEGExportPreference.exportResolution = quality;
    //app.JPEGExportPreference.exportingSpread = true;
  }
}

var path = '/Users/detass_g/Etna/EIP/InDesign-Scripts/'; // TODO: load it dynamically

var doc_name = app.scriptArgs.getValue('document');
var format = app.scriptArgs.getValue('format');
var size = app.scriptArgs.getValue('size');
var quality = app.scriptArgs.getValue('quality');

var message = 'OK';

if (format.length == 0)
  format = 'jpeg';
if (size.length == 0)
  size = '100';
if (quality.length == 0)
  quality = '72';
if (doc_name.length == 0)
  message = 'Error : No document parameter specified!';

var file = new File(path + 'documents/' + doc_name + '.indd');
var img_file = new File(path + 'results/' + doc_name + '.' + format);

var doc = app.open(file);
var export_format = null;
if (format == 'png') {
  export_format = ExportFormat.PNG_FORMAT;
  app.pngExportPreferences.exportResolution = Number(quality);
} else if (format == 'jpeg') {
  export_format = ExportFormat.JPG;
  app.jpegExportPreferences.exportResolution = Number(quality);
}
doc.exportFile(export_format, img_file);

doc.close();
message;
