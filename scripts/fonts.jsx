var fonts = [];

for (var i = 0; i < app.fonts.count(); i++)
{
  fonts[i] = app.fonts[i].fullName;
}

fonts;