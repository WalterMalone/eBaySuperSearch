// Live search pull

var timeout = null;
var oldResults = [];
var oldLength;
var activeResults = [];
var activeLength;
var resultLength;
var resultArray = [];
var sortedResults = [];
var currentPage;
var scrollKill = true;
var timeout = null;
var boxCount = 0;
var set = { show:"both", sort:"" };
var query = "";

//    Search typing input timeout filter
function keyUp(str) {
  if ( str.length >2 ){
    clearTimeout(timeout)
    query = "&keywords=" + encodeURI(str);
    timeout = setTimeout( searchManager(), 600 );
  }else {
    scrollKill = true
    document.getElementById("results").innerHTML = "";

      document.getElementById("loading").style.display = "none";
      document.getElementById("results").innerHTML = "";
      document.getElementById("scriptDiv").innerHTML = "";
      resultArray = null;
      currentPage = 0;
}
}

function searchManager() {
  document.getElementById("loading").style.display = "block";
  document.getElementById("results").innerHTML = "";
  document.getElementById("scriptDiv").innerHTML = "";
  resultArray = null;
  currentPage = 0;
  buildSearch(query, true, 1);
  buildSearch(query, false, 1);
}


function buildSearch(inStr, isActive, page) {

      var url = "http://svcs.ebay.com/services/search/FindingService/v1";
      if ( isActive ) {
          url += "?OPERATION-NAME=findItemsByKeywords";
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
          url += "&outputSelector=SellerInfo";
          url += inStr;
          url += "&paginationInput.entriesPerPage=100";
          url += "&paginationInput.pageNumber=" + page;

          n=document.createElement('script'); // create script element
          n.src = url;

    //      console.log(n);

        if ( isActive ) {
            n.id = "scriptActive" + page;
            document.getElementById("scriptDiv").appendChild(n);
        } else {
            n.id = "scriptOld" + page;
            document.getElementById("scriptDiv").appendChild(n);
        }

}
function scrollCall() {
  if ( scrollKill == true ) break;
  console.log(scrollKill);
  var loadNum = 25
          while(true) {
            let windowRelativeBottom = document.documentElement.getBoundingClientRect().bottom;
            if (windowRelativeBottom > document.documentElement.clientHeight + 100) break;

          }

          let a = resultArray.length;
          let r = a - currentPage;
          if ( r<=loadNum ) {
          loadNum = r;
          scrollKill = true;
          document.getElementById("loading").style.display = "none;";
          }

          let next = [];
          for ( var i=0; i<loadnum; i++ ) {
            next[i] = resultArray[i]
          }

          boxResults(next);
}


function callback(root, isActive) {
  if ( isActive ) {
    var items       = root.findItemsByKeywordsResponse[0].searchResult[0].item || [];
    let totalPages  = root.findItemsByKeywordsResponse[0].paginationOutput[0].totalPages;
    var page        = root.findItemsByKeywordsResponse[0].paginationOutput[0].pageNumber;
  } else {
    var items       = root.findCompletedItemsResponse[0].searchResult[0].item || [];
    let totalPages  = root.findCompletedItemsResponse[0].paginationOutput[0].totalPages;
    var page        = root.findCompletedItemsResponse[0].paginationOutput[0].pageNumber;
  }
    var results = [];
  for (var i = 0; i < items.length; ++i) {
    results[i] = buildObj(items[i]);
  }
  if ( page==1 ) {
    if ( resultArray!=null ) {
      console.log(results.length);
      resultArray = resultArray.concat(results);
      console.log(resultArray.length);
      resultLength = resultArray.length;
      document.getElementById("resultCount").innerHTML =
        '<h5 style="text-align: center;">Results: ' + resultLength + '</h5>';
      resultArray.sort(function(a, b){return b.price - a.price});
      boxResults(resultArray);
      page++;
      currentPage = resultArray.length;
    } else {
      resultArray = results;
      console.log(resultArray.length);
    }
  } else {

      resultArray.concat(results);
      resultLength = resultArray.length;
      document.getElementById("resultCount").innerHTML =
        '<h5 style="text-align: center;">Results: ' + resultLength + '</h5>';

      if ( page<totalPages ) {
        page++;
        buildSearch(query, isActive, page);

      }

  }

}

function callbackActive(root) {
    callback(root, true)
}

function callbackOld(root) {
    callback(root, false)
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
    if ( obj.state[0]=="Active" )
      obj.state = "Active";
  return obj;
}

function combineArray(results, isActive) {

}

function boxResults(root){

  console.log(root[1].state);

  var html = [];
      for (var i = 0; i < root.length; ++i) {
        var item     = root[i];
        boxCount++;

        switch ( item.state ) {
          case "Active":
            var color = "#B5D3FF";
            break;
          case "Unsold":
            var color = "#E6E6E6";
            break;
          case "Sold":
            var color = "#B8FCD6";
            break;
          default:
          var color = "#FF0045";
          break;
        }



        html.push('<div class="m-1 container border align-middle" id="boxMain" style="height: 155px; background-color: ' + color + '">');
        html.push('<div class="media">');
        html.push('<img class="rounded" id="boxImg" src="' + item.pic + '" style="width 140px;">');
        html.push('<h5 id="boxStatus" class="align-self-left" style="transform: rotate(90deg);	transform-origin: left bottom 0;">' + item.state + '</h5>');
        html.push('<div class="media-body text-align: left;">');
        html.push('<h5 id="boxTitle"><a href="' + item.viewitem + '" target="_blank">' + item.title + '</a></h5>');
        html.push('<div class="row justify-content-between">');
        html.push('<div class="col-5">');
        html.push('<p>#: <b>' + boxCount + '</b></p>');
        html.push('</div>');
        html.push('<div class="col-5">');
        html.push('<p style="text-align: right;">' + item.location + '</p>');
        html.push('</div></div>');
        html.push('<div class="row justify-content-between">');
        html.push('<div class="col-5">');
        html.push('<button type="button" class="btn btn-sm btn-primary" disabled>Watchers:</button>');
        html.push('<button type="button" class="btn btn-secondary btn-sm" disabled>' + item.watchers + '</button>');
        html.push('</div>');
        html.push('<div style="text-align: right;" class="col-5">');
        html.push('<button type="button" class="btn btn-sm btn-primary" disabled>$'+ item.price +'</button>');
        html.push('<button type="button" class="btn btn-secondary btn-sm" disabled>' + item.shipping + '</button>');
        html.push('</div></div></div></div></div>');

      }
      var box = document.createElement('div');
      box.id = 'box';
      box.class = 'container';
      box.innerHTML = html.join("");
      document.getElementById("results").appendChild(box);

    }
