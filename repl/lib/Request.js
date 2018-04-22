//リクエストクラス
var BaseRequest = function(replAiClient, options) {
	this.replAiClient = replAiClient;
	this.options = options;
	this.uri = this.replAiClient.getApiBaseUrl();
	this.options.botId = this.replAiClient.getBotId();
	//this.requestMethod = XhrRequest.Method.POST;
	this.requestMethod = "POST"
	this.headers = {
		"x-api-key": this.replAiClient.getAccessToken()
	};
};

BaseRequest.handleSuccess = function(xhr) {
	return Promise.resolve(JSON.parse(xhr.responseText));
}

BaseRequest.handleError = function(xhr) {
    var error = new ApiAiRequestError(null, null);
    try {
        var serverResponse = JSON.parse(xhr.responseText);
        if (serverResponse.status && serverResponse.status.errorDetails) {
            error = new ApiAiRequestError(serverResponse.status.errorDetails, serverResponse.status.code);
        }else {
            error = new ApiAiRequestError(xhr.statusText, xhr.status);
        }
    }catch (e) {
        error = new ApiAiRequestError(xhr.statusText, xhr.status);
    }
    return Promise.reject(error);
}

BaseRequest.prototype.perform = function() {
	var options = this.options;
	return XhrRequest.ajax(this.requestMethod, this.uri, options, this.headers, {})
	.then(BaseRequest.handleSuccess.bind(this))
	.catch(BaseRequest.handleError.bind(this));
}

var TextRequest = function(replAiClient, options){
    initializeBase(this, BaseRequest, [replAiClient, options]);
    this.options.appUserId = replAiClient.getUserId();
    this.options.initTalkingFlag = false;
};
