// Single state object
var state = {
  userSelectedSearchTerm: '',
  //nextPageToken: ''
};

const googleBooksURL = 'https://www.googleapis.com/books/v1/volumes';
const newsURL = 'https://newsapi.org/v2/everything';
const youtubeURL = 'https://www.googleapis.com/youtube/v3/search';

//Calls to the APIs

//first call to Google Books
function getGoogleBooksAPIData(userSelectedSearchItem) {
  const params = {
    q: `"${userSelectedSearchItem}"`,
    key: `AIzaSyBpAvj7qUWfzUvniX__WEqh8iN5AUphs6s`,
    projection:`lite`,
    printType:`books`,
    volumePart: `volumeInfo`,
    salePart: `saleInfo`,
    searchPart: `searchInfo`
  }
  $.getJSON(googleBooksURL, params, function(data){
    $('.dataItem').remove();
    var dataId="";
    $(`.js-Overview`).append(`
      <h3 class="boxtitle booklisttitle" >
        <span class="title_style">
          <i class="fas fa-bird"></i>
          Select one of the following books to get more information
        </span>
      </h3>
      `
    ); 
    console.log(data.items.length);
    console.log(data.items);
    for (var i=0;i < data.items.length; i++) {
      $(`.js-Overview`).append(`
        <div class='dataItem'>
          <div class="headerinfo">
            <div class="js-title">${data.items[i].volumeInfo.title}</div>
            <div class="js-author"> by ${data.items[i].volumeInfo.authors}</div>
          </div>
          <div class="resultbody">
            <div class="js-categories"> Genres:  ${data.items[i].volumeInfo.categories}</div>
            <div class="js-itemid" data-bookId="${data.items[i].id}">${data.items[i].id}</div> -->
            <div class="js-average-rating">Average Rating of ${data.items[i].volumeInfo.averageRating} out of ${data.items[i].volumeInfo.ratingsCount} ratings.</div>
          </div>
          
        </div>
        `
        );
    };
  });
} 

//call to Google Books for the selected book
function getSelectedGoogleBookAPIData(book) {
  var singleBookURL = googleBooksURL + `/` + book + `?key=AIzaSyBpAvj7qUWfzUvniX__WEqh8iN5AUphs6s`;
  $.getJSON(singleBookURL, function(result){
    renderSelectedBookAPIData(result);
   //nextPageToken = data.nextPageToken;
 });
}

//render HTML for the selected book
function renderSelectedBookAPIData(book) {
  $('.dataItem').remove();
  $('.booklisttitle').remove();
  $(`.js-Overview`).append(`
      <div class="boxtitle booklisttitle" >
        <span class="title_style">
          <i class="fas fa-bird"></i>
          Overview of the book you selected
        </span>
      </div>
      <div class='dataItem'>
        <div class="headerinfo">
           <div class="js-title">${book.volumeInfo.title}:  ${book.volumeInfo.subtitle}</div>
           <div class="js-author">${book.volumeInfo.authors}</div>
        </div>
        <div class="resultbody">
             <div class="js-categories">${book.volumeInfo.categories}</div>
             <div class="js-average-rating">Average Rating of ${book.volumeInfo.averageRating} out of ${book.volumeInfo.ratingsCount} ratings.</div>
        </div>
        <div class="purchasedata">
             <div class="saleprice">SALE PRICE GOES HERE</div>
             <div class="linktobuy"><a href="URL GOES HERE">Click to purchase from Google Play</a></div>
        </div>
      </div>
      `
    ); 

    $('.purchaseDataItem').remove();
    var forSale=`${book.saleInfo.saleability}`;
    var isElectronic = `${book.saleInfo.isEbook}`;
    if (isElectronic === `true`) {
      //console.log('did book make it to here');
        if (forSale == 'FREE') {
          $(`.js-purchase`).append(`
                <div class='purchaseDataItem'>
                    <div class="js-salePrice">The price is 0!  Yeah!</div>
                    <div class="js-linkToBuy"><a href=${book.saleInfo.buyLink}>Click to purchase from Google Play</a></div>
                </div>
                `
          ); 
        } else if (forSale === 'FOR_SALE') {
          $(`.js-purchase`).append(`
            <div class='purchaseDataItem'>
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


//call to News for articles
function getNewsAPIData(userSelectedSearchItem) {
  const params = {
    q: `${userSelectedSearchItem}`,
    apiKey: `430d190071894a52b7716e87bf74ced3`,
    articleList:`articles`,
    pagesize: 5,
    language: `en`
    }

  $.getJSON(newsURL, params, function(data){
    console.log('made it to the news api');
    $('.dataItem').remove();
    $(`.js-news`).append(`
      <div class="boxtitle newstitle">
        <span class="title_style">
          <i class="fas fa-star"></i>
            Articles (news) API
          </span>
      </div>
      `
    );
    
    for (var i=0;i < data.articles.length; i++) {
      $(`.js-news`).append(`
        <div class='newsItem'>
         <div class="headerinfo">
            <div class="js-title">${data.articles[i].title} </div>
          </div>
          <div class="resultbody">
            <div class="js-author"><span class="js-authorname">Author:  </span>${data.articles[i].author} </div>
            <div class="js-subtitle">${data.articles[i].description} </div>
            <div class="read"><a href="${data.articles[i].url} ">Click here to read the article </a></div>
          </div>
        </div>
       `
      );
      $('.col-6').show();
    };
  });
}


//call to Youtube for videos
function getYouTubeAPIData(userSelectedSearchItem) {
  const params = {
    q: `${userSelectedSearchItem} in:name`,
    key: `AIzaSyDoLr1m73oBf7SHHiLQMEXg_8nhHUBWLYM`,
    part: 'snippet',
    maxResults: 8,
    videoID:'id'
  }

  $.getJSON(youtubeURL, params, function(data){
    console.log('made it to the youtube api');
    //renderYouTubeAPIData(data.items);
    console.log(data.items);
    $('.youtubeItem').remove();

    $(`.js-youtube`).append(`
      <div class="boxtitle newstitle">
        <span class="title_style">
        <i class="fas fa-handshake" ></i>
        Youtube Videos: YouTube
          </span>
      </div>
      `
    );
    
    for (var i=0;i < data.items.length; i++) {
      $(`.js-youtube`).append(`
        <div class='youtubeItem'>
          <div class="headerinfo">
            <div class='js-title'>
              <a href='${data.items[i].snippet.title}'>${data.items[i].snippet.title}</a>
            </div>
          </div>
          <div class="resultbody">
            <div class='js-desc'>
              ${data.items[i].snippet.description}
            </div>
          </div>
          <div class='myVideo' id='${i}'>
              <iframe class="resp-iframe" data-videoIndex = ${i} src='https://www.youtube.com/embed/${data.items[i].id.videoId}?controls=1'></iframe>
          </div>
        </div>
        `
      );
      $('.col-6').show();
    nextPageToken = data.nextPageToken;
  };
  });
}






/* Event listeners */

function watchSubmit() {
//suggestions for submission text input
  var searchEx = [ 'Want some suggestions?', 'David Grann', 'Jane Eyre', 'Radium Girls', 'William Shakespeare', 'Shakespeare', 'nanotechnology', 'sustainability', 'sensationalism', 'gentrification', 'socialization', 'benchmarking', 'brick and mortar', 'best practice', 'syllogism', 'paradigm shift', 'semantics', 'responsive web design' ];
  setInterval(function() {
    $("input#js-searchfield").attr("placeholder", searchEx[searchEx.push(searchEx.shift())-1]);
  }, 3000);

 //user clicks to look at example
  $('.example_search').click(function(e) {
    e.preventDefault();
    $('html, body').animate({ scrollTop: $('main').offset().top - 20});    
  });

  $('a#newsearch').click(function(e) {
    e.preventDefault();
    document.getElementById("js-inputform");
    $('html, body').animate({ scrollTop: $('header').offset().top});
    $('input#js-searchfield').focus();
  });

  $('#js-inputform').submit(function(e){
    e.preventDefault();
    //$('.content').hide();
    
    const queryTarget = $(e.currentTarget).find('#js-searchfield');
    console.log(queryTarget);
    userSelectedSearchTerm  = queryTarget.val();
    getGoogleBooksAPIData(userSelectedSearchTerm);
    $('html, body').animate({ scrollTop: $('main').offset().top - 20});  
    $('.results').empty();
    $('.col-6').hide();
    $('.content').show();
    
  });
}

function listenForBookSelection() {
  $('.js-Overview').on('click', '.dataItem', (function(e) {
    e.preventDefault();
    const selectedBookId = $(e.currentTarget).find('.js-itemid').attr('data-bookId');
    console.log(selectedBookId);
    getSelectedGoogleBookAPIData(selectedBookId);
    getNewsAPIData(userSelectedSearchTerm);
    getYouTubeAPIData(userSelectedSearchTerm)
  }));
}




watchSubmit();
listenForBookSelection();


