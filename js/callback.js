var firstNum = 30;




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

if ( page!=0 ) {
  let results = [];
  for ( i = 0; i < items.length; i++ ) {
    results[i] = buildObj(items[i]);
  }
  console.log("Page: "+page+"  , isActive: "+isActive+'  , Total Pages: '+totalPages);

    console.log("Results: "+results);
    if ( isActive ) {
      newResults = newResults.concat(results);
    } else {
      oldResults = oldResults.concat(results);
    }

    resultLength = newResults.length + oldResults.length;
    console.log("resultLength: "+resultLength);
    document.getElementById("resultCount").innerHTML =
      '<h5 style="text-align: center;">Results: ' + resultLength + '</h5>';
      if ( page==1 ) firstLoad();

      sortResults();

      if ( page<totalPages ) {
        page++;
        buildSearch(query, isActive, page);
      }

  }

}



function firstLoad(isActive) {

    sortResults();
    let firstArray = [];
    if ( resultArray.length<firstNum )
      firstNum = resultArray.length;
    for ( var i=0; i<firstNum; i++ ) {
      firstArray[i] = resultArray[i];
    }
    document.getElementById("results").innerHTML = "";
    boxResults(firstArray);
    currentPage = firstArray.length;

  }
