

  function callback(root) {
    var items = root.findItemsByKeywordsResponse[0].searchResult[0].item || [];
    var resultCount = root.findItemsByKeywordsResponse[0].searchResult || [];
    //document.getElementById("count").innerHTML = resultCount.count;
    var html = [];
    html.push('<div class="container" id="results">');
    for (var i = 0; i < items.length; ++i) {
      var item     = items[i];
      var title    = item.title;
      var pic      = item.galleryURL;
      var viewitem = item.viewItemURL;
      var price    = item.sellingStatus[0].convertedCurrentPrice[0].__value__;
      var state    = item.sellingStatus[0].sellingState;
      //var condition= item.sellingStatus.condition.conditionDisplayName;
      if (null != title && null != viewitem) {
        html.push('<div class="media h-140"><img class="rounded float-left" src="' + pic + '" alt="Gallery image"><div class="media-body m-3"><h5>' + '<a href="' + viewitem + '" target="_blank">' + title + '</a></h5>' + '   Price: ' + price + '   State: ' + state + '    Cobdition: ' + 'fuck you' + '</div></div></div>');
      }
    }
  document.getElementById("results").innerHTML = html.join("");
  }


// Live search pull

var timeout = null;

function submitResult(str) {
  if ( str.length >2 ){
    clearTimeout(timeout)
    var query = "&keywords=" + encodeURI(str);
    buildSearch(query);
  }else document.getElementById("results").innerHTML = "";
  console.log("success");
}

function fetchResult(str) {
  if ( str.length >2 ){
    clearTimeout(timeout)
    var query = "&keywords=" + encodeURI(str);
    timeout = setTimeout( function () {
      buildSearch(query);
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
          f = document.getElementById("scriptDiv");
          f.removeChild('scriptShow');
          document.getElementById("scriptShow").src = url;

          document.getElementById("debugLink").innerHTML = "<a href=\"" + url + "\">" + url + "</a>";
}
