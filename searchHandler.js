// Live search pull

var timeout = null;
var resultArray = []
var timeout = null;

function fetchResult(str) {
  if ( str.length >2 ){
    clearTimeout(timeout)
    var query = "&keywords=" + encodeURI(str);
    timeout = setTimeout( function () {
      buildSearch(query);
      document.getElementById("loading").style.display = "block";
      document.getElementById("results").innerHTML = "";
    }, 600);
  }else document.getElementById("results").innerHTML = "";
}


// Main eBay finding construction

function buildSearch(inStr) {


      // Construct the request
      var url = "http://svcs.ebay.com/services/search/FindingService/v1";
          url += "?OPERATION-NAME=findItemsByKeywords";
          url += "&SERVICE-VERSION=1.0.0";
          url += "&SECURITY-APPNAME=eWasteeP-ESMC-PRD-a2ccbdebc-e043d603";
          url += "&GLOBAL-ID=EBAY-US";
          url += "&RESPONSE-DATA-FORMAT=JSON";
          url += "&callback=callback";
          url += "&REST-PAYLOAD";
          url += inStr;
          url += "&paginationInput.entriesPerPage=100";
/*
          s=document.createElement('script'); // create script element
          s.src= url;
          document.body.appendChild(s);
          */
          n=document.createElement('script'); // create script element
          n.src= url;
          document.body.appendChild(n);

          //document.getElementById("debugLink").innerHTML = "<a href=\"" + url + "\">" + url + "</a>";
}


function callback(root) {

  var items = root.findItemsByKeywordsResponse[0].searchResult[0].item || [];
  var resultCount = root.findItemsByKeywordsResponse[0].searchResult || [];
  //document.getElementById("count").innerHTML = resultCount.count;
  for (var i = 0; i < items.length; ++i) {
    var item = items[i];

    var Vtitle     = "";
    var Vpic       = "";
    var Vviewitem  = "";
    var Vprice     = "";
    var Vstate     = "";
    var Vcondition = "";

    Vtitle     = "";
    Vpic       = "";
    Vviewitem  = "";
    Vprice     = "";
    Vstate     = "";
    Vcondition = "";

    Vtitle     = item.title;
    Vpic       = item.galleryURL;
    Vviewitem  = item.viewItemURL;
    Vprice     = item.sellingStatus[0].convertedCurrentPrice[0].__value__;
    Vstate     = item.sellingStatus[0].sellingState;
    Vcondition = item.condition[0].conditionDisplayName;

    var obj = {
title:Vtitle,
pic:Vpic,
viewitem:Vviewitem,
price:Vprice,
state:Vstate,
condition:Vcondition,
};
resultArray[i] = obj;
}
pushResults(resultArray);
}

function pushResults(root){

  var html = [];
      for (var i = 0; i < root.length; ++i) {
        var item     = root[i];
        var color = "#f1f3f3"
        html.push('<div class="container" id="box">');
        html.push('<div class="m-1 container border align-middle" id="boxMain" style="height: 155px; background-color: ' + color + '">');
        html.push('<div class="media">');
        html.push('<img class="rounded align-self-center" id="boxImg" src="' + item.pic + '" alt="Gallery image">');
        html.push('<h5 id="boxStatus">' + item.state + '</h5>');
        html.push('<div class="media-body m-3">');
        html.push('<h5 id="boxTitle"><a href="' + item.viewitem + '" target="_blank">' + item.title + '</a></h5>');
        html.push('</div></div></div></div>');



      }
      document.getElementById("results").innerHTML=html.join("");
    }
