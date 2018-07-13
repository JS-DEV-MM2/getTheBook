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
    $(`.js-resultsOverview`).append(`
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
    $(`.js-resultsOverview`).append(`
      <div class='dataItem'>
           <H3><div class="js-title">${book.volumeInfo.title}</div></h3>
           <div class="js-subtitle">${book.volumeInfo.subtitle}</div>
           <div class="js-subtitle">${book.volumeInfo.subtitle}</div>
           <div class="js-authors">${book.volumeInfo.authors}</div>
           <div class="js-categories">${book.volumeInfo.categories}</div>
           <div class="js-average-rating">Average Rating of ${book.volumeInfo.averageRating} out of ${book.volumeInfo.ratingsCount} ratings.</div>
           <hr>
      </div>
      `
    ); 

    $('.purchaseDataItem').remove();
    if (forSale = 'NOT_FOR_SALE') {
      forSale=`${book.saleInfo.saleability}`;
      console.log('is this book for sale' + forSale);
      $(`.js-purchase`).append(`
      <div class='purchaseDataItem'>
           <H3><div class="notForSale">This book is not for sale through Google Play.</div></h3>
      </div>
      `
      );
    } else {
      isElectronic=`${book.saleInfo.isEbook}`;
      console.log('does this book come in an electronic version ' + isElectronic);
      salePrice=`${book.saleInfo.retailPrice.amount}`;
      console.log('the sale price is ' + salePrice);
      clickToBuy= `${book.saleInfo.buyLink}`;
      console.log('click this link to purchase from Google Play' + clickToBuy);


      $(`.js-purchase`).append(`
        <div class='purchaseDataItem'>
            <H3><div class="js-title">${book.volumeInfo.title}</div></h3>
            <div class="js-isElectronic">${book.saleInfo.isEbook}</div>
            <div class="js-salePrice">$${book.saleInfo.retailPrice.amount}</div>
            <div class="js-linkToBuy">${book.saleInfo.buyLink}</div>
            <hr>
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
  $('.js-resultsOverview').on('click', '.dataItem', (function(e) {
    e.preventDefault();
    const selectedBookId = $(e.currentTarget).find('.js-itemId').attr('data-bookId');
    getSelectedGoogleBookAPIData(selectedBookId);
  }));
}



watchSubmit();
listenForBookSelection();


