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
    renderGoogleBooksAPIData(data.items);
  });
}

//call to Google Books for selected book
function getSelectedGoogleBookAPIData(book) {
  var singleBookURL = googleBooksURL + `/` + book + `?key=AIzaSyBpAvj7qUWfzUvniX__WEqh8iN5AUphs6s`;
  $.getJSON(singleBookURL, function(result){
    renderSelectedBookAPIData(result);
   //nextPageToken = data.nextPageToken;
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
    renderYouTubeAPIData(data.items);
    nextPageToken = data.nextPageToken;
  });
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
    console.log('the news articles is ');
    console.log(data.articles);
    var indexNum = 0;
    $.each(data, function(index, item) {
      console.log('made it to inside loop');
      console.log(data.articles[0].author);
      indexNum +=1;
      $(`.js-news`).append(`
        <div class='news'>
            <div class="js-title">${data.articles[indexNum].title} </div>
           <div class="js-subtitle">${data.articles[indexNum].author} </div>
           <div class="js-subtitle">${data.articles[indexNum].description} </div>
           <div class="js-authors"><a href="${data.articles[indexNum].url} ">Click here to read the article </a></div>
           <hr>
        </div>
        `
      );
      });
    });
    //renderNewsAPIData(data.items);
  }


function renderYouTubeAPIData(data) {
  console.log(`the following are youtube videos`)
  console.log(data);
  $('.dataItem').remove();
  var indexNum = 0;
  $.each(data, function(index, item) {
    indexNum +=1;
    $(`.js-youtube`).append(`
      <div class='videoItem'>
        <div class='js-title'>
           <a href='${item.snippet.title}'>${item.snippet.title}</a>
        </div>
        <div class='js-desc'>
         <p>${item.snippet.description}</p>
        </div>
        <div class='myVideo' id='${indexNum}'>
            <iframe data-videoIndex = ${index} src='https://www.youtube.com/embed/${item.id.videoId}?controls=1'></iframe>
        </div>
        <hr>
      </div>
      `
    );
  });
}

function renderNewsAPIData(data) {
  console.log('made it to render news');
  $('.news').remove();
  var indexNum = 0;
  //var dataId="";
  
  $.each(data, function(index, item) {
    console.log('made it to inside loop');
    indexNum +=1;
    dataId=`${item.id}`;
    $(`.js-news`).append(`
      <div class='news'>
           <div class="js-title">${item.articles.title} by ${item.articles.author}</div>
           <!--<div class="js-subtitle">${item.description}</div>
           <div class="js-subtitle">${item.publishedAt} from source:  ${item.id}</div>
           <div class="js-authors"><a href="${item.url}">${data.url}</a></div> -->
      </div>
      `
    ); 
  });
}









// Render the API data to the DOM
function renderGoogleBooksAPIData(data) {
  console.log(`the following are google books on the topic`)
  console.log(data);
  $('.dataItem').remove();
  var indexNum = 0;
  var dataId="";
  $(`.js-Overview`).append(`
      <h3 class="boxtitle booklisttitle" >
        <span class="title_style">
          <i class="fas fa-bird"></i>
          Select one of the following books to get more information
        </span>
      </h3>
      <hr>  
      `
    );

  $.each(data, function(index, item) {
    indexNum +=1;
    dataId=`${item.id}`;
    $(`.js-Overview`).append(`
      <div class='dataItem'>
           <div class="js-title">${item.volumeInfo.title}</div>
           <div class="js-itemid" data-bookId="${dataId}">${dataId}</div>
           <div class="js-subtitle">${item.volumeInfo.subtitle}</div>
           <div class="js-authors">${item.volumeInfo.authors}</div>
           <div class="js-categories">${item.volumeInfo.categories}</div>
           <div class="js-average-rating">Average Rating of ${item.volumeInfo.averageRating} out of ${item.volumeInfo.ratingsCount} ratings.</div>
      </div>
      <p>
      <hr>
      <p>
      `
    );
  });
}

function renderSelectedBookAPIData(book) {
  $('.dataItem').remove();


  $(`.js-Overview`).append(`
      <h3 class="boxtitle booklisttitle" >
        <span class="title_style">
          <i class="fas fa-bird"></i>
          Select one of the following books to get more information
        </span>
      </h3>
      <hr>  
      `
    );
    $(`.js-Overview`).append(`
      <h3 class="boxtitle booklisttitle" >
        <span class="title_style">
          <i class="fas fa-bird"></i>
          Overview of the book you selected
        </span>
      </h3>
      <div class='dataItem'>
           <div class="js-title">${book.volumeInfo.title}</div>
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

  $('#js-inputform').submit(function(e){
    e.preventDefault();
    //$('.content').hide();
    
    const queryTarget = $(e.currentTarget).find('#js-searchfield');
    console.log(queryTarget);
    userSelectedSearchTerm  = queryTarget.val();
    console.log(userSelectedSearchTerm);
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
    getSelectedGoogleBookAPIData(selectedBookId);
    getNewsAPIData(userSelectedSearchTerm);
    getYouTubeAPIData(userSelectedSearchTerm)
  }));
}




watchSubmit();
listenForBookSelection();


