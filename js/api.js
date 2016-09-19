
//##############################################
//BIGTINCAN

function openLink(id){
  BTCJSAPIHtmlManager.makeRequest('openEntity?entityName=story&id='+id)
}

function btcQuery(action, request){

  BTCJSAPIHtmlManager.makeRequest(action+'?'+request+'&originalJsListener=btcQuery&jsListener=responseFromRequest')
}

function listenQuery(callback){
  $().btcjsapi({
    'jsListeners': {
      'btcQuery': callback
    } 
  })
}

//BIGTINCAN
//##############################################
