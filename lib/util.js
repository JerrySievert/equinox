var path = require('path');

function create_funcname (filename) {
  var funcname = filename.replace(path.sep, "_");
  funcname = funcname.replace("\.", "_");

  return funcname;
}

exports.create_funcname = create_funcname;
