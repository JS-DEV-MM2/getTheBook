// Single state object
var state = {
  userSelectedSearchTerm: "",
  userSelectedAuthor:"",
  selectedBookId:"",
  newsNextPage:1,
  nextPageToken: "",

};

const googleBooksURL = 'https://www.googleapis.com/books/v1/volumes';
const newsURL = 'https://newsapi.org/v2/everything';
const youtubeURL = 'https://www.googleapis.com/youtube/v3/search';
const wikiURL = 'https://en.wikipedia.org/w/api.php';

//***Render Headers
//Render list of books based on selecction
function renderListOfBooksHeader() {
  console.log('made it to renderListofbooksheader');
  $('.content').remove();
  var listofbooksHeader="";
  listofbooksHeader = "<div class='col-12'><div class='boxshadow'><div class='boxtitle booklisttitle'><span class='title_style'><i class='fas fa-bird'></i>Select one of the following books to get more information</span></div></div>";
  $('.row:nth-of-type(2)').append("<div class='content'>");
  $('.content').append(listofbooksHeader);
  $('html, body').animate({ scrollTop: $('main').offset().top - 100}); 
}

// Render Single Book header
function renderSelectedBookHeader() {
  console.log('fired renderSelectedBookHeader');
  var selectedbookHeaderHtml = "";
  $('.content').remove();
  selectedbookHeaderHtml = "<div class='col-12'><div class='boxshadow'><div class='boxtitle booklisttitle' ><span class='title_style'><i class='fas fa-bird'></i>Overview of the book you selected</span></div>";
  $('.row:nth-of-type(2)').append("<div class='content'>");
  $('.content').append(selectedbookHeaderHtml);
  $('.content').append("<div class='missy'>missymissy</div>");
  renderYoutubeHeader();

}

//Render Youtube header
function renderYoutubeHeader() {
  console.log('fired renderYoutubeHeader');
  $('.content').append("<div class='missy'>missymissy</div>");
  //$('.boxshadow').append("<div class='col-4'><div class='js-youtube'>");
 // $('.col-12').append("<div class='missy'>missymissy</div>");
  //var youtubeHeaderHtml = "";
  //youtubeHeaderHtml = "<div class='boxtitle youtubetitle'><span class='title_style'><div class='slidedown sdyoutube'><i class='fas fa-angle-double-down' aria-hidden='true' ></i></div><i class='fas fa-handshake'></i>Youtube Videos: YouTube</span><span class='nextYoutube'>More results</span></div></div></div>";
  //$('.js-youtube').append(youtubeHeaderHtml);
 // $('.boxshadow').append("</div></div>");

}
/*
//Render News header
function renderNewsHeader() {
  console.log('fired renderNewsHeader');
  var newsHeaderHtml = "";
  newsHeaderHtml = "<div class='boxtitle newstitle'><span class='title_style'><div class='slidedown sdyoutube'><i class='fas fa-angle-double-down' aria-hidden='true' ></i></div><i class='fas fa-star'></i>News Articles</span><span class='nextNews'>More results</span></div>";
  $(`.js-news`).append(newsHeaderHtml);
}
//Render Wiki header
function renderWikiHeader() {
  console.log('fired renderWikiHeader');
  var newsWikiHtml = "";
  wikiHeaderHtml = "<div class='boxtitle newstitle'><span class='title_style'><div class='slidedown sdyoutube'><i class='fas fa-angle-double-down' aria-hidden='true' ></i></div><i class='fas fa-certificate'></i>Wiki</span><span class='nextWiki'>More</span></div>";
  $(`.js-wiki`).append(newsWikiHtml);
}

*/
//***Render Details

//Render List of books details
function renderListOfBooks(listofbooksData) {
  var i = 0;
  $(`.boxshadow`).append("<div class='listofbookstable'>");
  var listofbooksHTML="";
  console.log(listofbooksData);
  $.each(listofbooksData, function(index, item) {
  listofbooksHTML += "<div class='book'><div class='bookthumbtable-cell'><img class='listofbooksthumb' src='" + listofbooksData[i].volumeInfo.imageLinks.thumbnail +
                      "'></img></div><div class='listofbookstable-cell'><div class='headerinfo'><div class='js-author'>" + listofbooksData[i].volumeInfo.authors + ", </div> <div class='js-title'>" +  
                      listofbooksData[i].volumeInfo.title + "</div></div><div class='resultbody'><div class='js-publisher'> Publisher:" +  listofbooksData[i].volumeInfo.publisher + 
                      "</div><div class='js-categories'> Genres: " +  listofbooksData[i].volumeInfo.categories + "</div><div class='js-average-rating'>Average Rating of " + listofbooksData[i].volumeInfo.averageRating +
                      " out of " + listofbooksData[i].volumeInfo.ratingsCount + " ratings.</div> </div><div class='otherdata'><div class='js-textsnippet'>" + listofbooksData[i].searchInfo.textSnippet +
                      "</div></div><div class='js-itemid' data-bookId='" + listofbooksData[i].id + "'>" + listofbooksData[i].id + "</div></div></div>";
 
   
    i +=1;
  });
  listofbooksHTML+="</div>";

  $(`.listofbookstable`).append(listofbooksHTML);
  $(`.boxshadow`).append("</div>");
  $('.col-12').append("</div");

  
}

//Render Single Book details
function renderSelectedBookData(selectedBookData) {
  var overviewHtml = "";
  var pricinginfoHtml = "";
  overviewHtml = "<div class='overviewitem'><div class='headerinfo'><div class='js-thumbnail'>image goes here</div><div class='js-title'>" + selectedBookData.volumeInfo.title + "</div><div class='js-author'>" + selectedBookData.volumeInfo.authors + 
  "</div><div class='js-publisher'>Publisher:  $" + selectedBookData.volumeInfo.publisher + " Published: " + selectedBookData.volumeInfo.publishedDate + 
  "</div></div><div class='resultbody'><div class='js-description'>" + selectedBookData.volumeInfo.description + "</div>" + 
  "<div class='js-average-rating'>Average Rating of " + selectedBookData.volumeInfo.averageRating + " out of " + selectedBookData.volumeInfo.ratingsCount + " ratings.</div><div class='pageCount'> " + selectedBookData.volumeInfo.pageCount + 
  " page(s)</div></div><div class='otherdata'><div class='saleprice'>Price:  GET PRICE</div><div class='linktobuy'><a href=" + selectedBookData.saleInfo.buyLink + ">Click to purchase from Google Play</a></div></div></div>";

  var forSale=`${selectedBookData.saleInfo.saleability}`;
  var isElectronic = `${selectedBookData.saleInfo.isEbook}`;
  if (isElectronic === `true`) {
      if (forSale == 'FREE') {
        pricinginfoHtml = "<div class='otherdata'><div class='js-salePrice'>The price is 0!  Yeah!</div><div class='js-linkToBuy'><a href=" + selectedBookData.saleInfo.buyLink + ">Click to purchase from Google Play</a></div></div>";
      } else if (forSale === 'FOR_SALE') {
        pricinginfoHtml = "<div class='otherdata'><div class='js-salePrice'>The price is: " + selectedBookData.saleInfo.retailPrice.amount + "</div><div class='js-linkToBuy'><a href=" + selectedBookData.saleInfo.buyLink + ">Click to purchase from Google Play</a></div></div>";
      } else {
        pricinginfoHtml = "<div class='otherdata'><div class='js-linkToBuy'>There is some other status that I haven't considered.</div></div>";
      }
  } else {
    pricinginfoHtml = "<div class='otherdata'><H3><div class='notForSale'>This book is not for sale through Google Play.</div></h3></div>";
  };

  overviewHtml += pricinginfoHtml;
  $('.boxshadow').append(overviewHtml);
  $('html, body').animate({ scrollTop: $('main').offset().top - 100}); 
}

function renderClosingDivs() {
  console.log("fired renderClosingDivs");
  $('.boxshadow').append("</div></div>");
}


//Display Youtube detail
function renderYoutubeData(youtubeData) {
  var i = 0;
  var youtubeHTML="";
  ////console.log(youtubeData);
  ////console.log(youtubeData.items[0].snippet.title);
  $.each(youtubeData, function(index, item) {
    //??CANNOT CHANGE HARDCODED INDEX NUMBER TO A VARIABLE
    youtubeHTML += "<div class='youtubeitem'><div class='headerinfo'><div class='js-title'><a href='" + youtubeData.items[0].snippet.title +  "'>" + youtubeData.items[0].snippet.title + 
              "</a></div></div><div class='resultbody'><div class='js-desc'>" + youtubeData.items[0].snippet.description + "</div></div><div class='myVideo' id='" + 0 + "'>" + 
              "<iframe class='resp-iframe' data-videoIndex='" + 0 + "' src='https://www.youtube.com/embed/" + youtubeData.items[0].id.videoId + "?controls=1'></iframe></div></div>";
    i +=1;
    ////console.log(youtubeHTML);
  });
  
  $('.js-youtube').append(youtubeHTML);
  $('.sdyoutube').append('<span id="nextYoutube">More results</span>');
}

/*
//Display News detail
function renderNewsData(newsData) {
  var indexNum = 0;
  var newsHTML="";
  //console.log(newsHTML);
  $.each(newsData, function(index, item) {
    ////console.log(newsData.articles[indexNum].title);
    newsHTML += "<div class='newsitem'><div class='headerinfo'><div class='js-title'>" + newsData.articles[indexNum].title + "</div></div><div class='resultbody'><div class='js-author'><span class='js-authorname'>Author:  </span>" + 
    newsData.articles[indexNum].author + "</div><div class='js-subtitle'>" + newsData.articles[indexNum].description + "</div><div class='read'><a href='" + newsData.articles[indexNum].url + "'>Click here to read the article </a></div></div></div>";
    ////console.log(newsHTML);
    indexNum +=1;
  });
  $(`.js-news`).append(newsHTML);
  $('.sdnews').append('<span id="nextNews">More results</span>');
}

//Display Wikipedia author data
function renderWikiData(authorData) {
  var pageId = authorData.pageids[0];
  //console.log(pageId);
  var wikiHTML="";
  wikiHTML += "<div class='wikiitem'><div class='headerinfo'><img class='js-wikithumb' src='" + authorData.pages[pageId].thumbnail.source + "' height='" + authorData.pages[pageId].thumbnail.height + "' width='" + authorData.pages[pageId].thumbnail.width + "'></img><div class='js-title'>" + authorData.pages[pageId].title + "</div></div><div class='resultbody'>" + 
"<div class='js-subtitle'>" + authorData.pages[pageId].extract + "</div></div>";
  //console.log(wikiHTML);
  $(`.js-wiki`).append(wikiHTML);
  $('.js-wiki').append('<hr>');
  $('.js-wiki').append('<p class="wikilink"><a href="//en.wikipedia.org/wiki/' + authorData.pages[pageId].title + 
      '" data-lity><i class="fa fa-external-link-square" aria-hidden="true"></i> &nbsp;More on Wikipedia</a></p>');

  }
  
*/

//Calls to the APIs

//AJAX call for list of Google Books
function getGoogleBooksAPIData(userSelectedSearchTerm) {
  const params = {
    q: `"${userSelectedSearchTerm}"`,
    key: `AIzaSyBpAvj7qUWfzUvniX__WEqh8iN5AUphs6s`,
  }
  $.getJSON(googleBooksURL, params, function(data){
    console.log(data.items);
    var dataId="";
    
    renderListOfBooksHeader();
    renderListOfBooks(data.items);
    
  });
} 

//AJAX call to Google Books for Selected Book
function getSelectedGoogleBookAPIData(book) {
  const params = {
    volumeId: `"${book}"`,
    projection: `full`,
  }
  var singleBookURL = googleBooksURL + `/` + book + `?key=AIzaSyBpAvj7qUWfzUvniX__WEqh8iN5AUphs6s`;
  $.getJSON(singleBookURL, function(selectedBookData){
    userSelectedAuthor = selectedBookData.volumeInfo.authors;
    renderSelectedBookHeader();
    renderSelectedBookData(selectedBookData);
    nextPageToken = selectedBookData.nextPageToken;
    renderYoutubeHeader();
    //$('.col-4').show();
  });
  
  
  /*renderNewsHeader();
  renderWikiHeader();
  renderClosingDivs();*/
}



//call to Youtube for videos
function getYouTubeAPIData(userSelectedSearchTerm) {
  //console.log('inside get you TUBE');
  const youtubeParams = {
    q: `${userSelectedSearchTerm} in:name`,
    key: `AIzaSyDoLr1m73oBf7SHHiLQMEXg_8nhHUBWLYM`,
    part: 'snippet',
    maxResults: 2,
    videoID:'id'
  }
  $.getJSON(youtubeURL, youtubeParams, function(data){
    //console.log('aferJSON');
    //console.log(data);
    renderYoutubeData(data);
    //console.log('you tube data after api call');
    //console.log(data);
    nextPageToken = data.nextPageToken;
    //$('.col-4').show();
  }); 
}

//AJAX call to News for articles
function getNewsAPIData(userSelectedSearchTerm) {
  const params = {
    q: `${userSelectedSearchTerm}`,
    apiKey: `430d190071894a52b7716e87bf74ced3`,
    articleList:`articles`,
    pagesize: 5,
    language: `en`,
    }
  $.getJSON(newsURL, params, function(data){
    renderNewsData(data);
    document.getElementById("nextNews").style.display = "block";
    newsNextPage = data.nextPage;
    ////console.log("news next page is " + newsNextPage);
    //$('.col-4').show();
   
  });  
}

//AJAX call to Wikipedia API
function getWikiAPIData() {
  const wikiParams = {
    titles: `${userSelectedAuthor}`,
    origin: '*',
    action: 'query',
    format: 'json',
    prop: 'extracts|pageimages',
    indexpageids: 1,
    redirects: 1, 
    exchars: 1200,
    // explaintext: 1,
    exsectionformat: 'plain',
    piprop: 'name|thumbnail|original',
    pithumbsize: 250
  };
  
  $.getJSON(wikiURL, wikiParams, function(data) {
      //console.log(data.query);
      renderWikiData(data.query)
  });
}




function getNewsDataNextPage(userSelectedSearchTerm) {
  const params = {
    q: `${userSelectedSearchTerm}`,
    apiKey: `430d190071894a52b7716e87bf74ced3`,
    articleList:`articles`,
    pagesize: 5,
    language: `en`,
    page: nextPage
    }
  $.getJSON(newsURL, params, function(data){
    renderNewsData(data.items);
    newsNextPage = data.nextPage;
     //console.log("news next page is " + newsNextPage);
   
  });  
}

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
    ////console.log(data.items);
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

  //listener for input from user; on submit or click, bring up list of associated books
  $('#js-inputform').submit(function(e){
    e.preventDefault();
    const queryTarget = $(e.currentTarget).find('#js-searchfield');
    userSelectedSearchTerm  = queryTarget.val();
    getGoogleBooksAPIData(userSelectedSearchTerm);

  });

  //listener for book selection; on click, get information on selected book
  $(document).on('click', '.book', (function(e) {
    console.log('book has been clicked');
    e.preventDefault();
    selectedBookId = $(e.currentTarget).find('.js-itemid').attr('data-bookId');
    console.log(selectedBookId);
    getSelectedGoogleBookAPIData(selectedBookId);
  }));

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

 //listener for youtube data
  $('.js-youtube').on('click', '.slidedown', (function(e){
    e.preventDefault();
    getYouTubeAPIData(userSelectedSearchTerm);
  }));

//listener for news data
  $('.js-news').on('click', '.slidedown', (function(e){
    e.preventDefault();
    getNewsAPIData(userSelectedSearchTerm);
  }));

//listener for wiki data
  $('.js-wiki').on('click', '.slidedown', (function(e){
    e.preventDefault();
    getWikiAPIData(userSelectedSearchTerm);
  }));

//get next set of you tube videos
  $('.js-youtube').on('click','.nextYoutube', (function(event){
    ////console.log('nextYoutube');
    event.preventDefault();
    getYoutubeDataNextPage(userSelectedSearchTerm);
  }));

//get next set of news articles
  $('.js-news').on('click','.nextNews', (function(event){
    event.preventDefault();
    getNewsDataNextPage(userSelectedSearchTerm);
  }));
}

watchSubmit();