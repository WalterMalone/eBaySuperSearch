
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

          console.log(n);

        if ( isActive ) {
            n.id = "scriptActive" + page;
            document.getElementById("scriptDiv").appendChild(n);
        } else {
            n.id = "scriptOld" + page;
            document.getElementById("scriptDiv").appendChild(n);
        }

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


function boxResults(root){
console.log("Boxing: "+root.length);
  var html = [];
      for (var i = 0; i < root.length; ++i) {
        var item     = root[i];
        boxCount++;
        //console.log(boxCount);
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


        let startDate = item.start.toStr
        let endDate = item.end.slice(14);

        console.log(startDate);

        html.push('<div class="box" style="background-color: '+color+';" id="box">');
        html.push('<div class="boxImg"><img class="rounded" id="boxImg" src="'+item.pic+'" /></div>');
        html.push('<div class="boxContent">');
        html.push('<div class="boxBit boxTitle"><p>'+item.title+'</p></div>');
        html.push('<div class="boxBit boxLeft">');
        html.push('<div class="boxBit boxPrice"><p>$'+item.price+'</p></div>');
        html.push('<div class="boxBit boxShip"><p>#'+boxCount+'</p></div>');
        html.push('<div class="boxBit boxShipSm"><p>'+item.shipping+'</p></div>');
        html.push('<div class="boxBit boxPriceSm"><p>'+item.type+'</p></div>');
        html.push('<div class="boxBit boxStatus"><p>'+item.state+' <small>Since '+startDate+'</small></p></div></div>');
        html.push('<div class="boxBit boxCenter">');
        html.push('<p>Shipped from: <b>'+item.location+'</b></p>');
        html.push('<p>0 Watchers</p>');
        html.push('<p><b>#num</b> views</p>');
        html.push('<p>Ending in <b>'+endDate+'</b></p></div>');
        html.push('<div class="boxBit boxRight">');
        html.push('<p>Listed by: <b>'+item.seller+'</b></p>');
        html.push('<p><b>'+item.feedback+'</b> Feedback at <b>'+item.positive+'%</b></p>');
        html.push('<p><i>'+item.category+'</i></p></div></div></div>');

      }
      var box = document.createElement('div');
      box.id = 'box';
      box.class = 'container';
      box.innerHTML = html.join("");
      document.getElementById("results").appendChild(box);

    }
