// Single state object
var state = {
  userSelectedSearchTerm: "",
  selectedBookId:"",
  newsNextPage:1,
  nextPageToken: ""
};

const googleBooksURL = 'https://www.googleapis.com/books/v1/volumes';
const newsURL = 'https://newsapi.org/v2/everything';
const youtubeURL = 'https://www.googleapis.com/youtube/v3/search';

//**Render Youtube Data
//Render Youtube header
function renderYoutubeHeader() {
  $(`.js-youtube`).append(`
  <div class="boxtitle newstitle">
    <span class="title_style">
    <i class="fas fa-handshake" ></i>
    Youtube Videos: YouTube
      </span>
      <span class="nextYoutube">More results</span>
  </div>
  `
);
}

//Render Youtube detail
function renderYoutubeData(youtubeData) {
  console.log(youtubeData);
    $('.youtubeitem').remove();
    for (var i=0;i < youtubeData.length; i++) {
      $(`.js-youtube`).append(`
        <div class='youtubeitem'>
          <div class="headerinfo">
            <div class='js-title'>
              <a href='${youtubeData[i].snippet.title}'>${youtubeData[i].snippet.title}</a>
            </div>
          </div>
          <div class="resultbody">
            <div class='js-desc'>
              ${youtubeData[i].snippet.description}
            </div>
          </div>
          <div class='myVideo' id='${i}'>
              <iframe class="resp-iframe" data-videoIndex = ${i} src='https://www.youtube.com/embed/${youtubeData[i].id.videoId}?controls=1'></iframe>
          </div>
        </div>
        `
      );
    }; 
    $('.col-6').show();
}

//**Render News Data
//Render News header
function renderNewsHeader() {
  $(`.js-news`).append(`
      <div class="boxtitle newstitle">
        <span class="title_style">
          <i class="fas fa-star"></i>
            Articles (news) API
          </span>
          <span class="nextNews">More results</span>
      </div>
      `
    );
}

//Render News detail
function renderNewsData(newsData) {
  //console.log(newsData.length);
  //console.log(newsData.articles.length);
  var indexNum = 0;
  $.each(newsData, function(index, item) {
    indexNum +=1;
      $(`.js-news`).append(`
        <div class='newsitem'>
         <div class="headerinfo">
            <div class="js-title">${newsData.articles.title} </div>
          </div>
          <div class="resultbody">
            <div class="js-author"><span class="js-authorname">Author:  </span>${newsData.articles.author} </div>
            <div class="js-subtitle">${newsData.articles.description} </div>
            <div class="read"><a href="${newsData.articles.url} ">Click here to read the article </a></div>
          </div>
        </div>
       `
      );
    });
    $('.col-6').show();
}
  


//Calls to the APIs

//call to News for articles
function getNewsAPIData(userSelectedSearchItem) {
  const params = {
    q: `${userSelectedSearchItem}`,
    apiKey: `430d190071894a52b7716e87bf74ced3`,
    articleList:`articles`,
    pagesize: 5,
    language: `en`,
    }
  $.getJSON(newsURL, params, function(data){
    renderNewsHeader();
    renderNewsData(data.items);
    newsNextPage = data.nextPage;
    //console.log("news next page is " + newsNextPage);
    //$('.col-6').show();
   
  });  
}


//call to Youtube for videos
function getYouTubeAPIData(userSelectedSearchItem) {
  const params = {
    q: `${userSelectedSearchItem} in:name`,
    key: `AIzaSyDoLr1m73oBf7SHHiLQMEXg_8nhHUBWLYM`,
    part: 'snippet',
    maxResults: 2,
    videoID:'id'
  }
  $.getJSON(youtubeURL, params, function(data){
    renderYoutubeHeader();
    renderYoutubeData(data);
    nextPageToken = data.nextPageToken;
    $('.col-6').show();
  }); 
}



//first call to Google Books
function getGoogleBooksAPIData(userSelectedSearchItem) {
  const params = {
    q: `"${userSelectedSearchItem}"`,
    key: `AIzaSyBpAvj7qUWfzUvniX__WEqh8iN5AUphs6s`,
  }
  $.getJSON(googleBooksURL, params, function(data){
    //console.log("google data: " );
    //console.log(data.items);
    $('.overviewitem').remove();
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
   

    for (var i=0;i < data.items.length; i++) {
      $(`.js-Overview`).append(`
        <div class='overviewitem'>
          <div class="headerinfo">
            <div class="js-title">${data.items[i].volumeInfo.title}</div>
            <div class="js-author"> by ${data.items[i].volumeInfo.authors}</div>
            <div class="js-publisher"> Publisher: ${data.items[i].volumeInfo.publisher}</div>
            <div class="js-categories"> Genres:  ${data.items[i].volumeInfo.categories}</div>
          </div>
          <div class="resultbody">
            <div class="js-textsnippet">${data.items[i].searchInfo.textSnippet}</div>
          </div>
          <div class="otherdata">
            <div class="js-itemid" data-bookId="${data.items[i].id}">${data.items[i].id}</div> 
            <div class="js-average-rating">Average Rating of ${data.items[i].volumeInfo.averageRating} out of ${data.items[i].volumeInfo.ratingsCount} ratings.</div>
          </div>
          
        </div>
        `
        );
    };
  });
} 


//render HTML for the selected book
function getSelectedGoogleBookAPIData(book) {

  const params = {
    volumeId: `"${book}"`,
    projection: `full`,
  }
  var singleBookURL = googleBooksURL + `/` + book + `?key=AIzaSyBpAvj7qUWfzUvniX__WEqh8iN5AUphs6s`;

  $.getJSON(singleBookURL, function(selectedBookResult){
    //console.log("selected book google data: " );
    //console.log(selectedBookResult);
  
   //nextPageToken = data.nextPageToken;
      $('.overviewitem').remove();
      $('.booklisttitle').remove();
      $(`.js-Overview`).append(`
          <div class="boxtitle booklisttitle" >
            <span class="title_style">
              <i class="fas fa-bird"></i>
              Overview of the book you selected
            </span>
          </div>
          <div class='overviewitem'>
            <div class="headerinfo">
              <div class="js-thumbnail"><img src='${selectedBookResult.volumeInfo.imageLinks.thumbnail}'></img></div>
              <div class="js-title">${selectedBookResult.volumeInfo.title}</div>
              <div class="js-author">${selectedBookResult.volumeInfo.authors}</div>
              <div class="js-publisher">Publisher:  ${selectedBookResult.volumeInfo.publisher}  Published: ${selectedBookResult.volumeInfo.publishedDate}</div>
            </div>
            <div class="resultbody">
               <div class="js-description">Publisher:  ${selectedBookResult.volumeInfo.description}</div>
               <div class="js-average-rating">Average Rating of ${selectedBookResult.volumeInfo.averageRating} out of ${selectedBookResult.volumeInfo.ratingsCount} ratings.</div>
               <div class="pageCount">${selectedBookResult.volumeInfo.pageCount} page(s)</div>
            </div>
            <div class="otherdata">
                <!--<div class="saleprice">Price:  $${selectedBookResult.saleInfo.retailPrice.amount}</div> -->
                <div class="linktobuy"><a href="${selectedBookResult.saleInfo.buyLink}">Click to purchase from Google Play</a></div>
            </div>
          </div>
          `
        ); 

        $('.otherdata').remove();
        var forSale=`${selectedBookResult.saleInfo.saleability}`;
        var isElectronic = `${selectedBookResult.saleInfo.isEbook}`;
        if (isElectronic === `true`) {
        
            if (forSale == 'FREE') {
              $(`.js-purchase`).append(`
                    <div class='otherdata'>
                        <div class="js-salePrice">The price is 0!  Yeah!</div>
                        <div class="js-linkToBuy"><a href=${selectedBookResult.saleInfo.buyLink}>Click to purchase from Google Play</a></div>
                    </div>
                    `
              ); 
            } else if (forSale === 'FOR_SALE') {
              $(`.js-purchase`).append(`
                <div class='otherdata'>
                    <div class="js-salePrice">The price is: ${selectedBookResult.saleInfo.retailPrice.amount}</div>
                    <div class="js-linkToBuy"><a href=${selectedBookResult.saleInfo.buyLink}>Click to purchase from Google Play</a></div>
                </div>
                `
              ); 
            } else {
              `<div class='otherdata'>
                        <div class="js-linkToBuy">There is some other status that I haven't considered.</div>
                    </div>`
            }
        } else {
          $(`.js-purchase`).append(`
          <div class='otherdata'>
              <H3><div class="notForSale">This book is not for sale through Google Play.</div></h3>
          </div>
          `
          );
        };
        $('.col-12').show();
    });
}

/*
function getNewsDataNextPage(userSelectedSearchItem) {
  const params = {
    q: `${userSelectedSearchItem}`,
    apiKey: `430d190071894a52b7716e87bf74ced3`,
    articleList:`articles`,
    pagesize: 5,
    language: `en`,
    page: nextPage
    }
  $.getJSON(newsURL, params, function(data){
    renderNewsData(data.items);
    newsNextPage = data.nextPage;
     console.log("news next page is " + newsNextPage);
   
  });  
}
*/
function getYoutubeDataNextPage(userSelectedSearchTerm){
  const params = {
    q: `${userSelectedSearchTerm} in:name`,
    key: `AIzaSyDoLr1m73oBf7SHHiLQMEXg_8nhHUBWLYM`,
    part: 'snippet',
    maxResults: 2,
    videoID:'id',
    pageToken: nextPageToken
  }
  $.getJSON(youtubeURL, params, function(data){
    renderYoutubeData(data.items);
    //console.log(data.items);
    nextPageToken = data.nextPageToken;
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
 
    userSelectedSearchTerm  = queryTarget.val();
    getGoogleBooksAPIData(userSelectedSearchTerm);
    $('html, body').animate({ scrollTop: $('main').offset().top - 20});  
    $('.results').empty();
    $('.col-6').hide();
    $('.overviewitem').show();
    
  });

}

function listenForBookSelection() {
  $('.js-Overview').on('click', '.overviewitem', (function(e) {
    e.preventDefault();
    selectedBookId = $(e.currentTarget).find('.js-itemid').attr('data-bookId');
    console.log("selected book id is " + selectedBookId);
    getSelectedGoogleBookAPIData(selectedBookId);
    getNewsAPIData(userSelectedSearchTerm);
    getYouTubeAPIData(userSelectedSearchTerm)
  }));
}

//get next set of youtube data
function listenforNextYoutube() {
  $('.js-youtube').on('click','.nextYoutube', (function(event){
    console.log('nextYoutube');
    event.preventDefault();
    getYoutubeDataNextPage(userSelectedSearchTerm);
  }));
}
/*
//get next set of news articles
function listenforNextNews() {
  $('.js-news').on('click','.nextNews', (function(event){
    console.log('nextNews');
    event.preventDefault();
    getNewsDataNextPage(userSelectedSearchTerm);
  }));
}
*/



watchSubmit();
listenForBookSelection();
listenforNextYoutube();
//listenforNextNews();