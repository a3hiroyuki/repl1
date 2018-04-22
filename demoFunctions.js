var client;
window.init = function(token, senario) {
  client = new ReplAiClient({accessToken: token, accessSenario: senario});
  return client.initRequest();
};

function setUserId(userId){
	client.setUserId(userId);
}

function sendText(text) {
  return client.textRequest(text, "simple");
}