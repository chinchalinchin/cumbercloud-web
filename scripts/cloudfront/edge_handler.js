function endsWithArray(uri, arr) {
  for (var i = 0; i < arr.length; i++) {
    if (uri.endsWith(arr[i])) return true;
  }
  return false;
}

function endsWithPath(uri) {
  var paths = [
    "grant",
    "design",
    "pricing",
    "contact",
    "404",
    "angular_on_aws",
  ];
  return endsWithArray(uri, paths);
}

function endsWithBackslash(uri) {
  var paths = [
    "grant/",
    "design/",
    "pricing/",
    "contact/",
    "404/",
    "angular_on_aws/",
  ];
  return endsWithArray(uri, paths);
}

function handler(event) {
  var request = event.request;
  var uri = request.uri;

  if (endsWithPath(uri)) {
    request.uri += "/index.html";
  } else if (endsWithBackslash(uri)) {
    request.uri += "index.html";
  }
  return request;
}
