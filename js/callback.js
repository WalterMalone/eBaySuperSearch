function callback(root, isActive) {
  let items, totalPages, page;
  if ( isActive ) {
    items       = root.findItemsByKeywordsResponse[0].searchResult[0].item || [];
    totalPages  = root.findItemsByKeywordsResponse[0].paginationOutput[0].totalPages;
    page        = root.findItemsByKeywordsResponse[0].paginationOutput[0].pageNumber;
  } else {
    items       = root.findCompletedItemsResponse[0].searchResult[0].item || [];
    totalPages  = root.findCompletedItemsResponse[0].paginationOutput[0].totalPages;
    page        = root.findCompletedItemsResponse[0].paginationOutput[0].pageNumber;
  }

  let results = [];

  for (var i = 0; i < items.length; ++i) {
    results[i] = buildObj(items[i]);
  }

  if ( page!=0 ) {
  console.log("Page: "+page+"  , isActive: "+isActive+'  , Total Pages: '+totalPages);
  if ( page==1 ) {
    if ( resultArray!="" ) {
      //console.log(results.length);
      resultArray = resultArray.concat(results);
      console.log("!!!"+resultArray.length);
      resultLength = resultArray.length;
      document.getElementById("resultCount").innerHTML =
        '<h5 style="text-align: center;">Results: ' + resultLength + '</h5>';
      resultArray.sort(function(a, b){return b.price - a.price});
      var dataSet = [];
      var firstLoad = 30;
      if ( resultArray.length<firstLoad )
        firstLoad = resultArray.length;
      for ( var i=0; i<firstLoad; i++ ) {
        dataSet[i] = resultArray[i];
      }

      console.log("ResultArray Length: "+resultArray.length);
      boxResults(dataSet);
      currentPage = dataSet.length;

      if ( page<totalPages ){
      page++;
      buildSearch(query, false, page);
      buildSearch(query, true, page);
    }
    } else {
      console.log("Null Array");
      resultArray = results;
      console.log("Null ResultArray Length: "+resultArray.length);
    }

  } else if ( page<=totalPages ) {
    console.log("Results: "+results);
      resultArray.concat(results);
      resultLength = resultArray.length;
      document.getElementById("resultCount").innerHTML =
        '<h5 style="text-align: center;">Results: ' + resultLength + '</h5>';
console.log("ResultLength: "+resultLength);
      if ( page<totalPages ) {
        console.log("Next Page");
        page++;
        buildSearch(query, isActive, page);

      }

  } else console.log("Error, page:totalPages - "+page+":"+totalPages);

}else console.log("Page Zero, isActive = "+isActive);
}
