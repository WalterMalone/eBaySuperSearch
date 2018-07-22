
window.addEventListener('scroll', scrollCall);

var loadNum = 5

function scrollCall() {
console.log("ScrollKill: "+scrollKill);
          while(true) {
            if ( scrollKill ) break;
            let windowRelativeBottom = document.documentElement.getBoundingClientRect().bottom;
            if (windowRelativeBottom > document.documentElement.clientHeight + 200) break;

            loadPage();

          }
        }

function loadPage() {
          let a = resultArray.length;
          let r = a - currentPage;

          if ( r<=loadNum ) {
          loadNum = r;
          scrollKill = true;
          }

          let next = [];

          for ( i=0; i<loadNum; i++ ) {

            next[i] = resultArray[i+currentPage];

          }
          currentPage += loadNum;
          let loadCount = 0;


          console.log("Scrolling loading "+next.length+" results");
          boxResults(next);
        }
