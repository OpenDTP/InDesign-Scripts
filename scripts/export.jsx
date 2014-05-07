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
  var path = '/Users/detass_g/Etna/EIP/InDesign-Scripts/';
  var file = new File(path + 'documents/' + config['document'] + '.indd');
  var img_file = new File(path + 'results/' + config['document'] + '.' + config['format']);

  var doc = app.open(file);
  var export_format = null;
  if (config['format'] == 'png') {
    export_format = ExportFormat.PNG_FORMAT;
    app.pngExportPreferences.exportResolution = Number(config['quality']);
    if (config['pages']!= null) {
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

  doc.exportFile(export_format, img_file);
  doc.close();
}

message;
