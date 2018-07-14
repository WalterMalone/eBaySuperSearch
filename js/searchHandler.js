// Live search pull

var timeout = null;
var oldResults = [];
var oldLength;
var activeResults = [];
var activeLength;
var sortedResults = []
var timeout = null;
var set = { show:"both", sort:"" };

//    Search typing input timeout filter
function keyUp(str) {
  if ( str.length >2 ){
    clearTimeout(timeout)
    var input = "&keywords=" + encodeURI(str);
    timeout = setTimeout( searchManager(input), 600);
  }else document.getElementById("results").innerHTML = "";
}

function searchManager(query) {
  document.getElementById("loading").style.display = "block";
  document.getElementById("results").innerHTML = "";
  buildSearch(query);
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

function buildSearch(inStr) {
    var flip = 0;
    var isActive = true;
      while ( flip<2 ) {
      var url = "http://svcs.ebay.com/services/search/FindingService/v1";
      if ( isActive ) {
          url += "?OPERATION-NAME=findItemsByKeywords"
          url += "&callback=callbackActive";
        } else {
          url += "?OPERATION-NAME=findCompletedItems";
          url += "&callback=callbackOld";
        }
          url += "&SERVICE-VERSION=1.0.0";
          url += "&SECURITY-APPNAME=eWasteeP-ESMC-PRD-a2ccbdebc-e043d603";
          url += "&GLOBAL-ID=EBAY-US";
          url += "&RESPONSE-DATA-FORMAT=JSON";
          url += "&REST-PAYLOAD";
          url += "&outputSelector=SellerInfo"
          url += inStr;
          url += "&paginationInput.entriesPerPage=100";

          n=document.createElement('script'); // create script element
          n.src = url;

        if ( isActive ) {
            var div = document.getElementById("scriptActive");
            div.remove();
            n.id = "scriptActive"
            document.body.appendChild(n);
        } else {
            var div = document.getElementById("scriptOld");
            div.remove();
            n.id = "scriptOld"
            document.body.appendChild(n);
        }
      isActive = false;
      flip++;
    }

}
// Main eBay finding construction
/*
function append(root) {
  var div = document.getElementById("scriptShow");
  div.remove();
  n=document.createElement('script'); // create script element
  n.src= root;
  n.id = "scriptShow"
  document.body.appendChild(n);

}
*/
function callbackActive(root) {
  var items = root.findItemsByKeywordsResponse[0].searchResult[0].item || [];
  activeLength = root.findItemsByKeywordsResponse[0].searchResult["0"]["@count"] || [];
  for (var i = 0; i < items.length; ++i) {
    activeResults[i] = buildObj(items[i]);
}
pushResults(activeResults);
}

function callbackOld(root) {
  var items = root.findCompletedItemsResponse [0].searchResult[0].item || [];
  oldLength = root.findCompletedItemsResponse [0].searchResult["0"]["@count"] || [];
  for (var i = 0; i < items.length; ++i) {
    oldResults[i] = buildObj(items[i]);
}
pushResults(oldResults);
}

function buildObj(item) { // Pull values from JSON array
// Initialize empty incase of null
    var obj = { title:"", start:"", end:"", pic:"", viewitem:"", price:"",
      state:"", condition:"", type:"", shipping:"", location:"", country:"",
      category:"", buyitnow:"", binprice:"", bestoffer:"", watchers:0,
      returns:"", seller:"", feedback:"", positive:"", toprated:"" };
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
    if ( item.listingInfo[0].watchCount != null )
      obj.watchers  = item.listingInfo[0].watchCount;
    obj.returns   = item.returnsAccepted;
    obj.seller    = item.sellerInfo[0].sellerUserName;
    obj.feedback  = item.sellerInfo[0].feebackScore;
    obj.positive  = item.sellerInfo[0].positiveFeedbackPercent;
    obj.toprated  = item.topRatedListing;
    if ( obj.state=="EndedWithoutSales" )
      obj.state = "Unsold";
    if ( obj.state=="EndedWithSales" )
      obj.state = "Sold";

  return obj;
}

function combineArray(results, isActive) {

}

function pushResults() {
  sortedResults = activeResults.concat(oldResults);
  sortedResults.sort(function(a, b){return b.price - a.price});
  html = boxResults(sortedResults);
}

function boxResults(root){

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
        html.push('<img class="rounded" id="boxImg" src="' + item.pic + '" style="width 140px;">');
        html.push('<h5 id="boxStatus" class="align-self-left" style="transform: rotate(90deg);	transform-origin: left bottom 0;">' + item.state + '</h5>');
        html.push('<div class="media-body text-align: left;">');
        html.push('<h5 id="boxTitle"><a href="' + item.viewitem + '" target="_blank">' + item.title + '</a></h5>');
        html.push('<div class="row justify-content-between">');
        html.push('<div class="col-5">');
        html.push('<p>Sold by: <b>' + item.seller + '</b></p>');
        html.push('</div>');
        html.push('<div class="col-5">');
        html.push('<p style="text-align: right;">' + item.location + '</p>');
        html.push('</div></div>');
        html.push('<div class="row justify-content-between">');
        html.push('<div class="col-3">');
        html.push('<button type="button" class="btn btn-sm btn-primary" disabled>Watchers:</button>');
        html.push('<button type="button" class="btn btn-secondary btn-sm" disabled>' + item.watchers + '</button>');
        html.push('</div>');
        html.push('<div style="text-align: right;" class="col-3">');
        html.push('<button type="button" class="btn btn-sm btn-primary" disabled>$'+ item.price +'</button>');
        html.push('<button type="button" class="btn btn-secondary btn-sm" disabled>' + item.shipping + '</button>');
        html.push('</div></div></div></div></div></div>');

      }
      document.getElementById("results").innerHTML=html.join("");
    }
