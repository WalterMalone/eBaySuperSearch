// Live search pull

var timeout = null;
var oldResults = [];
var activeResults = [];
var timeout = null;
var set = { show:"both", sort:"" };


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

function sort(type) {
  set.show = type;
  switch (type) {
    case old:

      break;
    case active:

      break;
    case both:

      break;
    default:

  }
}


// Main eBay finding construction

function buildString(inStr) {

        // Construct the request
        var url = "http://svcs.ebay.com/services/search/FindingService/v1";
            url += "?OPERATION-NAME=findItemsByKeywords";
            url += "&SERVICE-VERSION=1.0.0";
            url += "&SECURITY-APPNAME=eWasteeP-ESMC-PRD-a2ccbdebc-e043d603";
            url += "&GLOBAL-ID=EBAY-US";
            url += "&RESPONSE-DATA-FORMAT=JSON";
            url += "&callback=callbackActive";
            url += "&REST-PAYLOAD";
            url += inStr;
            url += "&paginationInput.entriesPerPage=100";
            url += "?OPERATION-NAME=findCompletedItems";
            url += "&SERVICE-VERSION=1.0.0";
            url += "&SECURITY-APPNAME=eWasteeP-ESMC-PRD-a2ccbdebc-e043d603";
            url += "&GLOBAL-ID=EBAY-US";
            url += "&RESPONSE-DATA-FORMAT=JSON";
            url += "&callback=callbackOld";
            url += "&REST-PAYLOAD";
            url += inStr;
            url += "&paginationInput.entriesPerPage=100";

            append(url);

  }

      // Construct the request
      var url = "http://svcs.ebay.com/services/search/FindingService/v1";
          url += "?OPERATION-NAME=findItemsByKeywords";
          url += "&SERVICE-VERSION=1.0.0";
          url += "&SECURITY-APPNAME=eWasteeP-ESMC-PRD-a2ccbdebc-e043d603";
          url += "&GLOBAL-ID=EBAY-US";
          url += "&RESPONSE-DATA-FORMAT=JSON";
          url += "&callback=callbackActive";
          url += "&REST-PAYLOAD";
          url += inStr;
          url += "&paginationInput.entriesPerPage=100";

          append(url);

}

function buildOld(inStr) {


      // Construct the request
      var url = "http://svcs.ebay.com/services/search/FindingService/v1";
          url += "?OPERATION-NAME=findCompletedItems";
          url += "&SERVICE-VERSION=1.0.0";
          url += "&SECURITY-APPNAME=eWasteeP-ESMC-PRD-a2ccbdebc-e043d603";
          url += "&GLOBAL-ID=EBAY-US";
          url += "&RESPONSE-DATA-FORMAT=JSON";
          url += "&callback=callbackOld";
          url += "&REST-PAYLOAD";
          url += inStr;
          url += "&paginationInput.entriesPerPage=100";

          append(url);

}

function append(root) {
  var div = document.getElementById("scriptShow");
  div.remove();
  n=document.createElement('script'); // create script element
  n.src= root;
  n.id = "scriptShow"
  document.body.appendChild(n);

  document.getElementById("debugLink").innerHTML = "<a href=\"" + url + "\">" + url + "</a>";
}

function callbackActive(root) {
  var items = root.findItemsByKeywordsResponse[0].searchResult[0].item || [];
  var resultCount = root.findItemsByKeywordsResponse[0].searchResult["0"]["@count"] || [];
  document.getElementById("resultCount").innerHTML = "Results: " + resultCount;
  for (var i = 0; i < items.length; ++i) {
    activeResults[i] = buildObj(items[i]);
}
pushResults(activeResults);
}

function callbackOld(root) {
  var items = root.findCompletedItemsResponse [0].searchResult[0].item || [];
  var resultCount = root.findCompletedItemsResponse [0].searchResult["0"]["@count"] || [];
  document.getElementById("resultCount").innerHTML = "Results: " + resultCount;
  for (var i = 0; i < items.length; ++i) {
    oldResults[i] = buildObj(items[i]);
}
pushResults(oldResults);
}

function combineArray() {

}

function sort() { // Action for the sorting form

}



function buildObj(item) { // Pull values from JSON array
// Initialize empty incase of null
    var obj = { title:"", start:"", end:"", pic:"", viewitem:"", price:"",
      state:"", condition:"", type:"", shipping:"", location:"", country:"",
      category:"", buyitnow:"", binprice:"", bestoffer:"", watchers:"",
      returns:"", toprated:"" };
// Assign values
    obj.title     = item.title;
    obj.start     = item.listingInfo[0].startTime;
    obj.end       = item.listingInfo[0].endTime;
    obj.pic       = item.galleryURL;
    obj.viewitem  = item.viewItemURL;
    obj.price     = item.sellingStatus[0].convertedCurrentPrice[0].__value__;
    obj.state     = item.sellingStatus[0].sellingState;
    if ( item.condition != null )
      obj.condition =  item.condition[0].conditionDisplayName;
    obj.type      = item.listingInfo[0].listingType;
    obj.shipping  = item.shippingInfo[0].shippingType;
    obj.location  = item.location;
    obj.country   = item.country;
    obj.category  = item.primaryCategory[0].categoryName;
    obj.buyitnow  = item.listingInfo[0].buyItNowAvailable;
    obj.binprice  = item.listingInfo[0].buyItNowAvailable;
    obj.bestoffer = item.listingInfo[0].bestOfferEnabled;
    obj.watchers  = item.listingInfo[0].watchCount;
    obj.returns   = item.returnsAccepted;
    obj.toprated  = item.topRatedListing;

  return obj;
}

function pushResults(root){

  var html = [];
      for (var i = 0; i < root.length; ++i) {
        var item     = root[i];
        switch(item.state) {
          case n:
            break;
          case n:
            break;
          default:
}
        var color = "#f1f3f3"
        html.push('<div class="container" id="box">');
        html.push('<div class="m-1 container border align-middle" id="boxMain" style="height: 155px; background-color: ' + color + '">');
        html.push('<div class="media">');
        html.push('<img class="rounded align-self-center" id="boxImg" src="' + item.pic + '" style="width 140px;">');
        html.push('<h5 id="boxStatus">' + item.state + '</h5>');
        html.push('<p>' + item.start + item.end + '</p>');
        html.push('<div class="media-body m-3">');
        html.push('<h5 id="boxTitle"><a href="' + item.viewitem + '" target="_blank">' + item.title + '</a></h5>');
        html.push('</div></div></div></div>');



      }
      document.getElementById("results").innerHTML=html.join("");
    }
