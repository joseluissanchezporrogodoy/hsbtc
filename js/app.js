var indice = [];
var indi=0;
var map = new Array();
var mapa = new Array();



function getTemplate2(id, title, cover, event,isNew,comen){
  var template  = '<li><div class="targeta"><div class="w3-card-12"  style="background-color: #fdfbee;position:relative;">'
  template     += '<div style="top:4px; right:22px; position:absolute;"><img src=images/comments.png></div>'
  template     += '<div style=" bottom:194px; right:2px; position:absolute;"><p style="color:white;">'+comen+'</p></div>'
  if(isNew == 1){
     //template     +='<div class="box" style="border:1px solid #40ff02; position:absolute; width:100%;height:1px;"> </div>'
    template += '<div class="ribbon"><span>New</span></div>'
  }
  template     += '<img src='+cover+' onclick="'+event+'('+id+')" >'
  template     += '<div class="w3-container w3-center" id="pie" style="background-color: #fdfbee; height:70px;" "><p style="color: #116388; text-align: left; font-family: Helvetica Neue; font-weight: bold;"><b>'+truncate(title)+'</b></p>'
  template     += '</div></div></div></li>'

  return template
}

function getTemplate3(id, title, cover, event){
  var template  = '<li ><div class="targeta"><div class="w3-card-12" style="background-color: #fdfbee" >'
  template     += '<img src='+cover+' onclick="'+event+'('+id+')" >'
  template     += '<div class="w3-container w3-center" id="pie" style="background-color: #fdfbee; height:70px;" "><p style="color: #116388; text-align: left;  font-family: Helvetica Neue;font-weight: bold;"><b>'+truncate(title)+'</b></p>'
  template     += '</div></div></div></li>'
  map[id] = title
  return template
}

function getTemplate4(id, title, cover, event){
    var template  = '<section class="bee3D--slide" id="'+id+'">'
    template     += '<div class="bee3D--inner" align="center">'
    template     += '<img src='+cover+'/>'
    template     += '<p class="section_title"><b>'+title+'</b></p>'
    template     += '</div></section>'
    mapa[id] = title
    return template
}

function truncate(description){
        if(description.length > 50){
          return description.split('').slice(0, description.lastIndexOf("",50)).join('') + "...";
        }else {
          return description;
        }
}

function tab_list(data, callback, _id){
  var file = data.pop()
  if (!_id){
    _id = file.id
  }
  if (!file){
    channel_list(_id)
      var demo = document.getElementById('demo');
     
      var slider = new Bee3D(demo, {
        effect: 'coverflow',
        listeners: { // <-- added here
        keys: true,
        touches: true,
        clicks: true
        },
        navigation: {
          enabled: true
        },
        loop: {
          enabled: true,
          continuous: true
        },
       
        onChange: function(event){
          channel_list(event.slide.id)
        }
      });
    
    return;
  }

  var id    = file.id

  var title = file.name

  listenQuery(function(result, resultId, err){

    callback(err,id,title,result)
    tab_list(data, callback, _id)
  })

  var idd = 'entityName=tab&id='+id
  btcQuery('getEntityImage', idd)
}

listenQuery(function (result, requestId, error){

  result.reverse()
  tab_list(result, function(err, id, title, data){
    var url=imageBlobURLFromBase64(data)
    var urlCover = "\""+url+"\""
    if(title == "My Content"){
      urlCover = "images/mycontent.jpg"
    }
    var template = getTemplate4(id, title, urlCover, 'channel_list')
     $('#demo').append(template)
   
  })
})

btcQuery('getList', 'entityName=tab&sortBy=name&fullRelationshipRecord=true')


//BIGTINCAN
//##############################################
function channel_list(id){

  change_channel_title(mapa[id])
  listenQuery(function (result, requestId, error){
    result.reverse()

    pintaChannelList(result, function(err, id,title,data){
      var url=imageBlobURLFromBase64(data)
      var urlCover = "\""+url+"\""
      if(title == "My Channel"){
        urlCover = "images/mychannel.png"
      }
      if(title == "Ofertas Clientes"){
        urlCover = "images/ofertas.png"
      }
      if(title == "Mis Notas"){
        urlCover = "images/notas.png"
      }
      if(title == "Presentaciones Clientes"){
        urlCover = "images/presentaciones.png"
      }
      var template = getTemplate3(id, title, urlCover,'story_list')
      $('#channels').append(template)

    })
  })
  btcQuery('getList', 'entityName=channel&parentEntityName=tab&sortBy=name&peid='+id)
}

function pintaChannelList(data,callback,_id){


  var file = data.pop()

  if (!_id){
    _id = file.id
   
    $('#channels').empty() 
  }

  if (!file){
   
    $('#channels_container').removeData('flexslider')
    $('#channels_container').flexslider({
      animation:      'slide',
      animationLoop:  true,
      slideshow:      false,
      itemWidth:      150,
      itemMargin:     30,
      controlNav:     false,
      directionNav:   false
    })
    story_list(_id)
    $("#esperaChannel").hide()
    return;
  }

  var id    = file.id

  var title = file.name

  listenQuery(function(result, resultId, err){

    callback(err,id,title,result)

    pintaChannelList(data, callback,_id)
  })

  var idd = 'entityName=channel&id='+id
  btcQuery('getEntityImage', idd)
}

////////////////////////////////////////////////////////////
function story_list(id){
  

  //////////////////////////////////////////////////
  change_story_title(map[id])
  
  $("#esperaStory").show()

  listenQuery(function (result, requestId, error){
   
    if(isEmpty(result)){
      $("#esperaStory").hide()
      $('#story').empty()
      $('#story_container').removeData('flexslider')
    }
    result.reverse()
    pintaStoryList(result, function(err, id,title,data,isNew,comen){
      var url=imageBlobURLFromBase64(data)
      var urlCover = "\""+url+"\""
      var template = getTemplate2(id, title, urlCover, 'openLink',isNew,comen)
      $('#story').append(template)

    })
  })

  btcQuery('getList', 'entityName=story&parentEntityName=channel&sortBy=title&peid='+id)
}
function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}
function pintaStoryList(data, callback, _id){

  var file = data.pop()
  
  if (!_id){
    _id = file.id
    $('#story').empty()
  }

  if (!file){
    $('#story_container').removeData('flexslider')
    $('#story_container').flexslider({
      animation:      'slide',
      animationLoop:  true,
      slideshow:      false,
      itemWidth:      150,
      itemMargin:     30,
      controlNav:     false,
      directionNav:   false
    })
    //channel_list(_id)
    $("#esperaStory").hide()
    return;
  }

  var id    = file.id

  var title = file.title
  var isNew = file.isUnread
  var comen = String(file.comments.length)
  listenQuery(function(result, resultId, err){


    callback(err,id,title,result,isNew,comen)

    pintaStoryList(data, callback,_id)
  })

  var idd = 'entityName=story&id='+id
  btcQuery('getEntityImage', idd)
}


function change_story_title(ti){

    $("p.category_o").text(HtmlDecode(ti));
}
function change_channel_title(ti){

    $("p.category_e").text(HtmlDecode(ti));
}
function HtmlDecode(s) {
    return $('<div>').html(s).text();
}



///////////////////////////////////////////////////////////
/*
 * convert base 64 image to blob for the purpose of using in the embed background image in style
 * */
function imageBlobURLFromBase64(base64Data){
  function dataURItoBlob(dataURI, mimeType) {
    var binData = dataURI
    if(binData.substr(0,5)=='data:'){
      binData = binData.split(',')[1]
    }
    binData = binData.replace(/\s/g, '')
    var byteString = atob(binData);
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return constructBlob(ab,mimeType);
  }

  var blob = dataURItoBlob(base64Data,'image/png')
  var blobURL = (window.webkitURL ? webkitURL : URL).createObjectURL(blob)

  return blobURL;
}

/*
 * Helper method to create blob, since andriod does not blob
 * */
function constructBlob(array, mimeType) {
  try{
    var result = new Blob( [array], {type : mimeType});
  }
  catch(e){
    // TypeError old chrome and FF
    window.BlobBuilder = window.BlobBuilder ||
      window.WebKitBlobBuilder ||
      window.MozBlobBuilder ||
      window.MSBlobBuilder;

    if(e.name == 'TypeError' && window.BlobBuilder){
      var bb = new BlobBuilder();
      bb.append([array.buffer]);
      var result = bb.getBlob(mimeType);
    }
    else if(e.name == "InvalidStateError"){
      // InvalidStateError (tested on FF13 WinXP)
      var result = new Blob( [array.buffer], {type : mimeType});
    }
    else{
      // We're screwed, blob constructor unsupported entirely
    }
  }

  return result;
}
