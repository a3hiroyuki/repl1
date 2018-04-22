
(function() {
  "use strict";

  var ENTER_KEY_CODE = 13;
  var queryInput, resultDiv, accessTokenInput, accessSenarioInput;

  window.onload = init;

  function init() {
    queryInput = document.getElementById("q");
    resultDiv = document.getElementById("result");
    accessTokenInput = document.getElementById("access_token");
    accessSenarioInput = document.getElementById("access_senario");
    var setAccessTokenButton = document.getElementById("set_access_token");

    queryInput.addEventListener("keydown", queryInputKeyDown);
    setAccessTokenButton.addEventListener("click", setAccessToken);
  }

  function setAccessToken() {
    document.getElementById("placeholder").style.display = "none";
    document.getElementById("main-wrapper").style.display = "block";
    //var responseNode = createResponseNode();
    window.init(accessTokenInput.value, accessSenarioInput.value)
     .then(function(response) {
        var result;
        try {
            result = response.appUserId;
        } catch(error) {
          result = "";
        }
        setUserId(result);
        setResponseJSON(response);
        sendMessage("init");
      })
      .catch(function(err) {
        setResponseJSON(err);
        //setResponseOnNode("Something goes wrong", responseNode);
      });
  }

  function queryInputKeyDown(event) {
    if (event.which !== ENTER_KEY_CODE) {
      return;
    }
    var value = queryInput.value;
    queryInput.value = "";

    createQueryNode(value);

    sendMessage(value);
  }

  function sendMessage(value){
	  var responseNode = createResponseNode();
	  sendText(value)
      .then(function(response) {
        var result;
        try {
          result = response.systemText.expression
        } catch(error) {
          result = "";
        }
        setResponseJSON(response);
        setResponseOnNode(result, responseNode);
      })
      .catch(function(err) {
        setResponseJSON(err);
        setResponseOnNode("Something goes wrong", responseNode);
      });
  }

  function createQueryNode(query) {
    var node = document.createElement('div');
    //node.className = "clearfix left-align left card-panel green accent-1";
    node.className = "balloon1";
    node.innerHTML = query;
    var node2 = document.createElement('div');
    node2.className = "icon";
    var node3 = document.createElement('img');
    node3.setAttribute("src", "aaa.jpg");
    node2.appendChild(node3);
    node.appendChild( node2 );
    resultDiv.appendChild(node);
  }

  function createResponseNode() {
    var node = document.createElement('div');
    //node.className = "clearfix right-align right card-panel blue-text text-darken-2 hoverable";
    node.className = "balloon2";
    node.innerHTML = "...";
    resultDiv.appendChild(node);
    return node;
  }

  function setResponseOnNode(response, node) {
    node.innerHTML = response ? response : "[empty response]";
    node.setAttribute('data-actual-response', response);
  }

  function setResponseJSON(response) {
    var node = document.getElementById("jsonResponse");
    node.innerHTML = JSON.stringify(response, null, 2);
  }

})();
