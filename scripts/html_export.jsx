#include "lib/parameters.jsx";

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
  var file = new File(config['document'] + '.indd');
  var doc = app.open(file);
  var xml = new XML("<body>");
  var img_file = new File(doc.filePath + '/../results/' + doc.name + '.html');
  doc.exportFile(ExportFormat.HTML, img_file);
  for (var i = 0; i < doc.spreads.count(); i++)
  {
    var spread = doc.spreads[i];
    var xml_spread = new XML("<div" + ' id="' + spread.id + '" class="spread"' +">");
    for (var j = 0; j < spread.pages.count(); j++)
    {
      var page = spread.pages[j];
      var xml_page = new XML("<div" + ' id="' + page.id + '"' + ' class="page"' + ">");
      xml_spread.appendChild(xml_page);
    }
    xml.appendChild(xml_spread);

  }
  var html = get_html_structure();
  html.appendChild(xml);
  var xml_file = new File(doc.filePath + '/../results/' + doc.name + '.xml');
  write_xml_file(xml_file, html);
  doc.close();
}

message;
