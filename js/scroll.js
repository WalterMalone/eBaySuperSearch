
window.addEventListener('scroll', scrollCall);



function scrollCall() {
//console.log("ScrollKill: "+scrollKill);
          while(true) {
            if ( scrollKill ) break;
            let windowRelativeBottom = document.documentElement.getBoundingClientRect().bottom;
            if (windowRelativeBottom > document.documentElement.clientHeight + 100) break;

            loadPage();

          }
        }

function loadPage() {
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
          console.log("Scrolling loading "+next.length+" results");
          boxResults(next);
        }
