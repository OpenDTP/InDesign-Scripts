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
var config = load_parameters(['document'], {});

function get_html_structure()
{
  var html = new XML('<html xmlns="http://www.w3.org/1999/xhtml">\n');
  var head = new XML('<head>');
  head.appendChild(new XML('<meta charset="utf-8">'));
  html.appendChild(head);

  return html;
}

function write_xml_file(file, xml) {
  file.encoding = "UTF8";
  file.open("w", "TEXT", "????");
  file.write("\uFEFF");
  file.lineFeed = "unix";
  file.write('<!DOCTYPE html>\n');
  file.write(xml.toString());
  file.close();
};

if (config != null) {
  var file = new File(config['document']);
  var doc = app.open(file);
  var xml = new XML("<body>");
  var img_file = new File('/d/Exports/' + doc.name + '.html');
  doc.exportFile(ExportFormat.HTML, img_file);
  for (var i = 0; i < doc.spreads.count(); i++)
  {
    var spread = doc.spreads[i];
    var xml_spread = new XML("<div" + ' id="' + spread.id + '" class="spread"' +">");
    for (var j = 0; j < spread.pages.count(); j++)
    {
      var page = spread.pages[j];
      var xml_page = new XML("<div" + ' id="' + page.id + '" class="page"' + ">");
      for (var k = 0; k < page.textFrames.count(); k++)
      {
        var text_frame = page.textFrames[k];
        if (text_frame.contentType == ContentType.TEXT_TYPE)
        {
          var xml_frame = new XML("<div" + ' id="' + text_frame.id + '" class="block"' + '>');
          xml_frame.appendChild(text_frame.contents);
          xml_page.appendChild(xml_frame);
        }
      }
      xml_spread.appendChild(xml_page);
    }
    xml.appendChild(xml_spread);

  }
  var html = get_html_structure();
  html.appendChild(xml);
  var xml_file = new File('/d/Exports/' + doc.name + '.xml');
  write_xml_file(xml_file, html);
  message = xml_file.name;
  doc.close();
}

message;
