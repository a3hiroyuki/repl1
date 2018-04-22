

var ReplAiClient = function(options){
        if (!options || !options.accessToken) {
            throw new ReplAiClientConfigurationError("Access token is required for new ReplAi.Client instance");
        }
        this.accessToken = options.accessToken;
        this.botId = options.accessSenario;
        this.apiLang = ReplAiConstants.DEFAULT_CLIENT_LANG;
    };
ReplAiClient.prototype = {
		initRequest : function() {
			this.apiBaseUrl = ReplAiConstants.DEFAULT_BASE_URL1;
			options = {};
			return new BaseRequest(this, options).perform();
		},
		textRequest : function(query, topicId) {
			if (!query) {
				throw new ReplAiClientConfigurationError("Query should not be empty");
			}
			options = {};
			this.apiBaseUrl = ReplAiConstants.DEFAULT_BASE_URL2;
			options.voiceText = query;
			options.initTopicId = topicId;
			return new TextRequest(this, options).perform();
		},
		getAccessToken : function() {
			return this.accessToken;
		},
		getApiVersion : function() {
			return (this.apiVersion) ? this.apiVersion : ReplAiConstants.DEFAULT_API_VERSION;
		},
		getApiLang : function() {
			return (this.apiLang) ? this.apiLang : ReplAiConstants.DEFAULT_CLIENT_LANG;
		},
		getApiBaseUrl : function() {
			return (this.apiBaseUrl) ? this.apiBaseUrl : ReplAiConstants.DEFAULT_BASE_URL;
		},
		setSessionId  : function(sessionId) {
			this.sessionId = sessionId;
		},
		getSessionId : function() {
			return this.sessionId;
		},
		getBotId : function() {
			return this.botId;
		},
		getUserId : function(){
			return this.userId;
		},
		setUserId : function(userId){
			this.userId = userId;
		},
};
