// Single state object
var state = {
  userSelectedSearchTerm: '',
  //nextPageToken: ''
};

const googleBooksURL = 'https://www.googleapis.com/books/v1/volumes';



// Query Google Books API
function getGoogleBooksAPIData(userSelectedSearchItem) {
  const params = {
    q: `"${userSelectedSearchItem}"`,
    key: `AIzaSyBpAvj7qUWfzUvniX__WEqh8iN5AUphs6s`,
    projection:`lite`,
    printType:`books`,
    volumePart: `volumeInfo`,
    salePart: `saleInfo`,
    searchPart: `searchInfo`
    //categoryId: `???`
  }
 $.getJSON(googleBooksURL, params, function(data){
   renderGoogleBooksAPIData(data.items);
 });
}
//GET https://www.googleapis.com/books/v1/volumes/zyTCAlFPjgYC?key=yourAPIKey


function getSelectedGoogleBookAPIData(book) {
  var singleBookURL = googleBooksURL + `/` + book + `?key=AIzaSyBpAvj7qUWfzUvniX__WEqh8iN5AUphs6s`;
 $.getJSON(singleBookURL, function(result){
   renderSelectedBookAPIData(result);
   //nextPageToken = data.nextPageToken;
 });
}

// Render the API data to the DOM
function renderGoogleBooksAPIData(data) {
  $('.dataItem').remove();
  var indexNum = 0;
  var dataId="";
  $.each(data, function(index, item) {
    indexNum +=1;
    dataId=`${item.id}`;
    $(`.js-Overview`).append(`
      <div class='dataItem'>
           <H3><div class="js-title">${item.volumeInfo.title}</div></h3>
           <div class="js-itemId" data-bookId="${dataId}">${dataId}</div>
           <div class="js-subtitle">${item.volumeInfo.subtitle}</div>
           <div class="js-authors">${item.volumeInfo.authors}</div>
           <div class="js-categories">${item.volumeInfo.categories}</div>
           <div class="js-average-rating">Average Rating of ${item.volumeInfo.averageRating} out of ${item.volumeInfo.ratingsCount} ratings.</div>
      </div>
      `
    );
  });
}

function renderSelectedBookAPIData(book) {
  console.log(book);
  $('.dataItem').remove();
    $(`.js-Overview`).append(`
      <div class='dataItem'>
           <H3><div class="js-title">${book.volumeInfo.title}</div></h3>
           <div class="js-subtitle">${book.volumeInfo.subtitle}</div>
           <div class="js-subtitle">${book.volumeInfo.subtitle}</div>
           <div class="js-authors">${book.volumeInfo.authors}</div>
           <div class="js-categories">${book.volumeInfo.categories}</div>
           <div class="js-average-rating">Average Rating of ${book.volumeInfo.averageRating} out of ${book.volumeInfo.ratingsCount} ratings.</div>
           
      </div>
      `
    ); 

    $('.purchaseDataItem').remove();
    var forSale=`${book.saleInfo.saleability}`;
    var isElectronic = `${book.saleInfo.isEbook}`;
    console.log('This book is for sale ' + forSale + ' also, this book is electronic ' + isElectronic );

    if (isElectronic === `true`) {
      console.log('did book make it to here');
        if (forSale == 'FREE') {
          $(`.js-purchase`).append(`
                <div class='purchaseDataItem'>
                    <H3><div class="js-title">${book.volumeInfo.title}</div></h3>
                    <div class="js-salePrice">The price is 0!  Yeah!</div>
                    <div class="js-linkToBuy"><a href=${book.saleInfo.buyLink}>Click to purchase from Google Play</a></div>
                 
                </div>
                `
          ); 
        } else if (forSale === 'FOR_SALE') {
          $(`.js-purchase`).append(`
            <div class='purchaseDataItem'>
                <H3><div class="js-title">${book.volumeInfo.title}</div></h3>
                <div class="js-salePrice">The price is: ${book.saleInfo.retailPrice.amount}</div>
                <div class="js-linkToBuy"><a href=${book.saleInfo.buyLink}>Click to purchase from Google Play</a></div>
                
            </div>
            `
          ); 
        } else {
          `<div class='purchaseDataItem'>
                    <div class="js-linkToBuy">There is some other status that I haven't considered.</div>
                  
                </div>`

        }
    } else {
      $(`.js-purchase`).append(`
      <div class='purchaseDataItem'>
           <H3><div class="notForSale">This book is not for sale through Google Play.</div></h3>
      </div>
      `
      );
      
    };


    $('.col-6').show();
}


/* Event listeners */

function watchSubmit() {
  $('.js-search-form').submit(function(e){
    e.preventDefault();
    const queryTarget = $(e.currentTarget).find('.js-queryByTitle');
    userSelectedSearchTerm  = queryTarget.val();
    getGoogleBooksAPIData(userSelectedSearchTerm);
  });
}

function listenForBookSelection() {
  $('.js-Overview').on('click', '.dataItem', (function(e) {
    e.preventDefault();
    const selectedBookId = $(e.currentTarget).find('.js-itemId').attr('data-bookId');
    getSelectedGoogleBookAPIData(selectedBookId);
  }));
}



watchSubmit();
listenForBookSelection();


