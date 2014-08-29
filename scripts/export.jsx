// This script purpose is to export an indesign document (fully or partially)
// The parameters are the following :
//   - "document" : /path/to/the/document, the path should be inside the NFS.
//   - "format" :  the format to export the image (jpeg or png). The default value is 'jpeg'
//   - 'pages' : The pages to export. By default, all the pages are exported, in separated files. Example of input : "1-3, 4, 7"
//   - "quality" : the resolution of the export (the range is between 1 and 2400). The default value is '100'
//   - 'spreads' : if set to true, the spreads will be exported as well.
//
// The only required parameter is the document name.
//

function load_parameters(args, default_values) {
  var hash = {};
  for (var i = 0; i < args.length; i++) {
    hash[args[i]] = app.scriptArgs.getValue(args[i]);
    if (hash[args[i]].length == 0) {
      if (args[i] in default_values)
        hash[args[i]] = default_values[args[i]];
      else {
        message = 'Error : undefined required parameter : ' + args[i];
        return null;
      }
    }
  }
  return hash;
}

var message = 'OK';
var config = load_parameters(['document', 'format', 'size', 'quality', 'pages', 'spreads'], 
  {
    format: 'jpeg',
    size: '100',
    quality: '100',
    pages: null,
    spreads: null
  });

if (config != null) {
  var file = new File(config['document']);

  var doc = app.open(file);
  var export_format = null;
  if (config['format'] == 'png') {
    export_format = ExportFormat.PNG_FORMAT;
    app.pngExportPreferences.exportResolution = Number(config['quality']);
    if (config['pages'] != null) {
      app.pngExportPreferences.pngExportRange = PNGExportRangeEnum.EXPORT_RANGE;
      app.pngExportPreferences.pageString = config['pages'];
    }
    else
      app.pngExportPreferences.pngExportRange = PNGExportRangeEnum.EXPORT_ALL;
    app.pngExportPreferences.exportingSpread = (config['spreads'] == 'true');
  } 
  else if (config['format'] == 'jpeg') {
    export_format = ExportFormat.JPG;
    app.jpegExportPreferences.exportResolution = Number(config['quality']);
    if (config['pages'] != null) {
      app.jpegExportPreferences.jpegExportRange = ExportRangeOrAllPages.EXPORT_RANGE;
      app.jpegExportPreferences.pageString = config['pages'];
    }
    else
      app.jpegExportPreferences.jpegExportRange = ExportRangeOrAllPages.EXPORT_ALL;
    app.jpegExportPreferences.exportingSpread = (config['spreads'] == 'true');
  }
  var img_file = new File('/c/Data/Exports/' + doc.name + '.' + config['format']);
  doc.exportFile(export_format, img_file);
  message = img_file.name;
  doc.close();
}

message;
