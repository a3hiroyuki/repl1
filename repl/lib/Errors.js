

function initializeBase(derive, base, baseArgs) {
    base.apply(derive, baseArgs);
    for (prop in base.prototype) {
       var proto = derive.constructor.prototype;
       if (!proto[prop]) {
           proto[prop] = base.prototype[prop];
       }
    }
}

var REplAiBaseError = function(){
    initializeBase(this, Error);
    this.message = message;
    this.stack = new Error().stack;
}
var ReplAiClientConfigurationError = function(){
    initializeBase(this, ReplAiBaseError);
    this.name = "ReplAiClientConfigurationError";
}
var ReplAiRequestError = function(message, code) {
    initializeBase(this, ReplAiBaseError);
    this.message = message;
    this.code = code;
    this.name = "ReplAiRequestError";
}