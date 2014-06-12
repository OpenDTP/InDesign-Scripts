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
