var path = '/Users/detass_g/Etna/EIP/InDesign-Scripts/'; // TODO: load it dynamically

var doc_name = app.scriptArgs.getValue('document');
var format = app.scriptArgs.getValue('format');
var size = app.scriptArgs.getValue('size');
var quality = app.scriptArgs.getValue('quality');
var page_range = app.scriptArgs.getValue('pages');
var spreads = app.scriptArgs.getValue('spreads');

var message = 'OK';

if (format.length == 0)
  format = 'jpeg';
if (size.length == 0)
  size = '100';
if (quality.length == 0)
  quality = '100';
if (doc_name.length == 0)
  message = 'Error : No document parameter specified!';

var file = new File(path + 'documents/' + doc_name + '.indd');
var img_file = new File(path + 'results/' + doc_name + '.' + format);

var doc = app.open(file);
var export_format = null;
if (format == 'png') {
  export_format = ExportFormat.PNG_FORMAT;
  app.pngExportPreferences.exportResolution = Number(quality);
  if (page_range.length != 0) {
    app.pngExportPreferences.pngExportRange = PNGExportRangeEnum.EXPORT_RANGE;
    app.pngExportPreferences.pageString = page_range;
  }
  else
    app.pngExportPreferences.pngExportRange = PNGExportRangeEnum.EXPORT_ALL;
} 
else if (format == 'jpeg') {
  export_format = ExportFormat.JPG;
  app.jpegExportPreferences.exportResolution = Number(quality);
  if (page_range.length != 0) {
    app.jpegExportPreferences.jpegExportRange = ExportRangeOrAllPages.EXPORT_RANGE;
    app.jpegExportPreferences.pageString = page_range;
  }
  else
    app.jpegExportPreferences.jpegExportRange = ExportRangeOrAllPages.EXPORT_ALL;
}
doc.exportFile(export_format, img_file);
doc.close();
message;
