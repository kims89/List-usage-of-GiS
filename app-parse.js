moment.locale("nb");
var myURL =
  "https://www.aenett.no/arcgis/rest/services/Ekstern/DMSPublicStromstansNyeSymboler/MapServer/0/query?f=json&where=1%3D1&returnGeometry=true&spatialRel=esriSpatialRelIntersects&outFields=*&outSR=102100";
$.getJSON(myURL, function (data) {
  var AlarmHTML = "";
  var customNum = 0;
  console.log(data);
  if (data.features.length > 0) {
    for (i = 0; i < data.features.length; i++) {
      var objData = data.features[i].attributes;
      customNum +=objData.NUM_AB;
      var txtCusIn = "";
      if (objData.CUSTOMER_WEB_TEXT==null){
        txtCusIn = "";
      }
      else {
        txtCusIn = objData.CUSTOMER_WEB_TEXT;
      }

      AlarmHTML += '<div class="animated zoomIn ui icon negative message">'+
                    '<i class="notched circle loading icon"></i>'+
                    '<div class="content">'+
                            '<div class="header">'+
              moment(objData.STARTTIME).startOf('hour').fromNow()+': '+objData.MUNICIPAL_TXT+' <a class="ui green label">'+objData.TYPE_TXT+'</a>'+
                            '</div>'+
                            '<p>'+txtCusIn+'</p>'+
                            '<div class="ui label">'+
                                    'Kunder uten strøm'+
                                    '<div class="detail">'+objData.NUM_AB+'</div>'+
                            '</div>'+
                    '</div>'+
              '</div>';          


      console.log("Sted " + objData.MUNICIPAL_TXT);
      console.log("Kunder ute " + objData.NUM_AB);
      console.log("Tilstand " + objData.STATE_TXT);
      console.log("Type " + objData.TYPE_TXT);
      console.log("Tid startet " + objData.STARTTIME);
      console.log("Prioritering " + objData.GRIDLEVEL_TXT);
      console.log("Textkunder " + objData.CUSTOMER_WEB_TEXT);
    } 
  }
  else {
    AlarmHTML ='<div class="animated zoomIn ui success message">'+
                    '<div class="content">'+
                            '<div class="header">'+
                                    'Ingen strømbrudd for øyeblikket!'+
                            '</div>'+
                            '<p>Jippi!!</p>'+
                    '</div>'+
            '</div>';


}
$( document ).ready(function() {
var customOutHTML = "";
if (customNum > 0) {
customOutHTML = '<div class="ui inverted segment">'+
                    '<div class="ui yellow inverted statistic">'+
                            '<div class="value">'+
                                    '<i class="fa fa-users" aria-hidden="true"></i> '+customNum+
                            '</div>'+
                            '<div class="label">'+
                                    'er berørt av strømbrudd akkurat nå (Agder Energis forsyningsområdet)'+
                            '</div>'+
                    '</div>'+
            '</div>';
}
else {
customOutHTML = '<div class="ui segment">'+
                    '<div class="ui green statistic">'+
                            '<div class="value">'+
                                    '<i class="fa fa-users" aria-hidden="true"></i> Ingen'+
                            '</div>'+
                            '<div class="label">'+
                                    'er berørt av strømbrudd akkurat nå (Agder Energis forsyningsområdet)'+
                            '</div>'+
                    '</div>'+
            '</div>';
}
$("#numCus").html(customOutHTML);
$("#Cases").html(AlarmHTML);
});
});