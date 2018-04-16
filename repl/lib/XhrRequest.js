
var XhrRequest = function(){};
// Method that performs the ajax request
XhrRequest.ajax = function(method, url, args, headers, options) {
        // Creating a promise
        return new Promise(function(resolve, reject){
            // Instantiates the XMLHttpRequest
            var client = XhrRequest.createXMLHTTPObject();
            var uri = url;
            var payload = null;
            // Add given payload to get request
            if (args && (method === XhrRequest.Method.GET)) {
                uri += "?";
                var argcount = 0;
                for (var key in args) {
                    if (args.hasOwnProperty(key)) {
                        if (argcount++) {
                            uri += "&";
                        }
                        uri += encodeURIComponent(key) + "=" + encodeURIComponent(args[key]);
                    }
                }
            }
            else if (args) {
                if (!headers) {
                    headers = {};
                }
                //headers["Content-Type"] = "application/json; charset=utf-8";
                headers["Content-Type"] = "application/json";
                payload = JSON.stringify(args);
            }
            for (var key in options) {
                if (key in client) {
                    client[key] = options[key];
                }
            }
            // hack: method[method] is somewhat like .toString for enum Method
            // should be made in normal way
            client.open(XhrRequest.Method[method], uri, true);
            // Add given headers
            if (headers) {
                for (var key in headers) {
                    if (headers.hasOwnProperty(key)) {
                        alert(headers[key]);
                        client.setRequestHeader(key, headers[key]);
                    }
                }
            }
            payload ? client.send(payload) : client.send();
            client.onload = function() {
                if (client.status >= 200 && client.status < 300) {
                    // Performs the function "resolve" when this.status is equal to 2xx
                    resolve(client);
                }
                else {
                    // Performs the function "reject" when this.status is different than 2xx
                    reject(client);
                }
            };
            client.onerror = function() {
                reject(client);
            };
        });
}
/**
XhrRequest.get = function(url, payload = null, headers = null, options = {}) {
    return XhrRequest.ajax(XhrRequest.Method.GET, url, payload, headers, options);
}
XhrRequest.post = function(url, payload = null, headers = null, options = {}) {
    return XhrRequest.ajax(XhrRequest.Method.POST, url, payload, headers, options);
}
XhrRequest.put = function(url, payload = null, headers = null, options = {}) {
    return XhrRequest.ajax(XhrRequest.Method.PUT, url, payload, headers, options);
}
XhrRequest.delete = function(url, payload = null, headers = null, options = {}) {
    return XhrRequest.ajax(XhrRequest.Method.DELETE, url, payload, headers, options);
}
**/
XhrRequest.createXMLHTTPObject = function() {
        var xmlhttp = null;
        //for (var i of XhrRequest.XMLHttpFactories) {
        for (var index = 0; index < 4 ; index++){
            try {
                xmlhttp = XhrRequest.XMLHttpFactories[index]();
            }
            catch (e) {
                continue;
            }
            break;
        }
        return xmlhttp;
}

XhrRequest.XMLHttpFactories = [
    function(){return new XMLHttpRequest()},
    function(){return new window["ActiveXObject"]("Msxml2.XMLHTTP")},
    function(){return new window["ActiveXObject"]("Msxml3.XMLHTTP")},
    function(){return new window["ActiveXObject"]("Microsoft.XMLHTTP")}
    //() => new XMLHttpRequest(),
    //() => new window["ActiveXObject"]("Msxml2.XMLHTTP"),
    //() => new window["ActiveXObject"]("Msxml3.XMLHTTP"),
    //() => new window["ActiveXObject"]("Microsoft.XMLHTTP")
];
(function (XhrRequest) {
    var Method;
    (function (Method) {
        Method[Method["GET"] = "GET"] = "GET";
        Method[Method["POST"] = "POST"] = "POST";
        Method[Method["PUT"] = "PUT"] = "PUT";
        Method[Method["DELETE"] = "DELETE"] = "DELETE";
    })(Method = XhrRequest.Method || (XhrRequest.Method = {}));
})(XhrRequest || (XhrRequest = {}));
//export default XhrRequest;
