//callback return -> [err, data]
//example args    -> [data, callback]



function getTemplate(id, title, cover){
  var template  = '<li><div style="text-align: center">'
  template    += '<img src='+cover+' onclick="openLink('+id+')" />'
  template    += '<span class="title">'+title+'</span>'
  template    += '</div></li>'

  return template
}

function tab_list(data, callback){

  var file = data.pop()

  if (!file){
    return;
  }

  var id    = file.id
  var title = file.name

  listenQuery(function(result, resultId, err){
    callback(err, {
      id:    id,
      title: title,
      img:   result
    }) 
    tab_list(data, callback)
  })

  btcQuey(id)

  
}

tab_list(result, function(err, data){

  var id    = data.id
  var title = data.title
  var url = styleManger.imageBlobURLFromBase64(data.img)
  var urlCover = '"'+url'"'
  var cover = setDomain(urlCover) 

  var template = getTemplate(id, title, cover)
  
  $('#tabs').append(template)

})
