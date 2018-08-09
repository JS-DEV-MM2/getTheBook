// Single state object
var state = {
  userSelectedSearchTerm: "",
  userSelectedAuthor:"",
  selectedBookId:"",
  newsNextPage:1,
  youtubePageToken: "",
  selBookTitle: "",
  selAuthor:"",
  bookImage: ""

};

const googleBooksURL = 'https://www.googleapis.com/books/v1/volumes';
const newsURL = 'https://newsapi.org/v2/everything';
const youtubeURL = 'https://www.googleapis.com/youtube/v3/search';
const wikiURL = 'https://en.wikipedia.org/w/api.php';

//***Render Headers
//Render list of books based on selecction
function renderListOfBooksHeader() {
  //console.log('made it to renderListofbooksheader');
  $('.content').remove();
  var listofbooksHeader="";
  listofbooksHeader = "<div class='col-12'><div class='boxshadow'><div class='boxtitle booklisttitle'><div class='title_style'><div class='slidedown'></div><div title='othertitle'><div class='appicons'><i class='fas fa-kiwi-bird'></i></div><div class='titleverbage'><span class='titlewords'>Select one of the following books to get more information</span></div></div></div></div>";
  $('.row:nth-of-type(2)').append("<div class='content'>");
  $('.content').append(listofbooksHeader);
  $('html, body').animate({ scrollTop: $('main').offset().top - 100}); 
}

// Render Single Book header
function renderSelectedBookHeader() {
  //console.log('fired renderSelectedBookHeader');
  var selectedbookHeaderHtml = "";
  $('.content').remove();
  selectedbookHeaderHtml = "<div class='col-12'><div class='boxshadow'><div class='boxtitle booklisttitle' ><div class='title_style'><div class='slidedown'></div><div class='othertitle'><div class='appicons'><i class='fas fa-kiwi-bird'></i></div><div class='titleverbage'><span class='titlewords'>Overview of the book you selected<span></div></div></div></div>";
  $('.row:nth-of-type(2)').append("<div class='content'>");
  $('.content').append(selectedbookHeaderHtml);

}

//Render Youtube header
function renderYoutubeHeader() {
  //console.log('fired renderYoutubeHeader');
  $('.boxshadow').append("<div class='col-4'><div class='js-youtube'></div></div>");
  var youtubeHeaderHtml = "";
  youtubeHeaderHtml = "<div class='boxtitle youtubetitle'><div class='title_style'><div class='slidedown sdyoutube'><i id='youtubeangledown' class='fas fa-angle-double-down' aria-hidden='true' ></i><i id='youtubeangleup' class=' fas fa-angle-double-up' aria-hidden='true' style='display:none' ></i></div><div class='othertitle'><div class='appicons'><i class='fas fa-handshake'></i></div><div class='titleverbage'><span class='titlewords'>Youtube Videos</span></div><p><div class='nextYoutube'>More results</div></div></div></div>";
  $('.js-youtube').append(youtubeHeaderHtml);
 // $('.boxshadow').append("</div></div>");

}

//Render News header
function renderNewsHeader() {
  //console.log('fired renderNewsHeader');
  $('.boxshadow').append("<div class='col-4'><div class='js-news'></div></div>");
  var newsHeaderHtml = "";
  newsHeaderHtml = "<div class='boxtitle newstitle'><div class='title_style'><div class='slidedown sdnews'><i id='newsangledown' class='fas fa-angle-double-down' aria-hidden='true' ></i><i id='newsangleup' class=' fas fa-angle-double-up' aria-hidden='true' style='display:none' ></i></div><div class='othertitle'><div class='appicons'><i class='fas fa-star'></i></div><div class='titleverbage'><span class='titlewords'>News Articles</span></div><p><div class='nextNews'>More results</div></div></div></div>";
  $(`.js-news`).append(newsHeaderHtml);
}
//Render Wiki header
function renderWikiHeader() {
  //console.log('fired renderWikiHeader');
  $('.boxshadow').append("<div class='col-4'><div class='js-wiki'></div></div>");
  var newsWikiHtml = "";
  wikiHeaderHtml = "<div class='boxtitle wikititle'><div class='title_style'><div class='slidedown sdwiki'><i id='wikiangledown' class='fas fa-angle-double-down' aria-hidden='true' ></i><i id='wikiangleup' class=' fas fa-angle-double-up' aria-hidden='true' style='display:none' ></i></div><div class='othertitle'><div class='appicons'><i class='fas fa-certificate'></i></div><div class='titleverbage'><span class='titlewords'>Wiki</span></div><p><div class='nextWiki'>More</div></div></div></div>";
  $(`.js-wiki`).append(wikiHeaderHtml);
}

//***Render Details

//Render List of books details
function renderListOfBooks(listofbooksData) {
  //console.log('fired renderListOfBooks');
  var txtSnippet = "";
  var pub = "";
  var bookGenres = "";
  var aveRating = "";
  var listofbooksHTML="";
  $(`.boxshadow`).append("<div class='listofbookstable'>");
  

  //Error msg for no search results: book list
  if (listofbooksData.length === 0) {
    listofbooksHTML += '<div class="center"><div class="errormessage">Sorry, no books on the selected topic were found on Google Books.</div></div>';
  } else {
    var i = 0;
    $.each(listofbooksData, function(index, item) {
        //if there is no image available
        if (typeof(listofbooksData[i].volumeInfo.imageLinks) =='undefined' || listofbooksData[i].volumeInfo.imageLinks === null) {
          bookImage = 'images/noimageavailable.png';
        } else {
          bookImage = listofbooksData[i].volumeInfo.imageLinks.thumbnail;
        };

        //if there is no publisher available
        if (typeof(listofbooksData[i].volumeInfo.publisher) =='undefined' || listofbooksData[i].volumeInfo.publisher === null) {
          pub = 'No publisher is listed.';
        } else {
          pub = listofbooksData[i].volumeInfo.publisher;
        };

        //no genres available
        if (typeof(listofbooksData[i].volumeInfo.categories) =='undefined' || listofbooksData[i].volumeInfo.categories === null) {
          bookGenres = 'No genres are listed.';
        } else {
          bookGenres = listofbooksData[i].volumeInfo.categories;
        };

        if (typeof(listofbooksData[i].volumeInfo.averageRating) =='undefined' || listofbooksData[i].volumeInfo.averageRating === null) {
          aveRating = 'No ratings are listed.';
        } else {
          aveRating = listofbooksData[i].volumeInfo.averageRating;
        };
          //if there is no snippet available
        if (typeof(listofbooksData[i].searchInfo) =='undefined' || listofbooksData[i].searchInfo.textSnippet === null) {
          txtSnippet = 'There is no summary for this book';
        } else {
          txtSnippet = listofbooksData[i].searchInfo.textSnippet;
        };
        listofbooksHTML += "<div class='book'><div class='bookthumbtable-cell'><img class='listofbooksthumb' src='" + bookImage +
                            "'></img></div><div class='listofbookstable-cell'><div class='headerinfo'><div class='js-authorname'>" + listofbooksData[i].volumeInfo.authors + " </div> <div class='js-title'>" +  
                            listofbooksData[i].volumeInfo.title + "</div></div><div class='resultbody'><div class='js-publisher'><div class='pubwords'> Publisher:</div><div class='pubdata'>" + pub + 
                            "</div></div><div class='js-categories'><div class='genwords'> Genres: </div><div class='gendata'>" +  bookGenres + "</div></div><div class='ratingwords'>" + 
                            "Average Rating: </div><div class='ratingdata'>" + listofbooksData[i].volumeInfo.averageRating + "</div><div class='js-textsnippet'>" + txtSnippet +
                            "</div></div><div class='js-itemid' data-bookId='" + listofbooksData[i].id + "'>" + listofbooksData[i].id + "</div></div></div></div>";
      
        
          i +=1;
    });
    listofbooksHTML+="</div>";
  };

  $(`.listofbookstable`).append(listofbooksHTML);
  $(`.boxshadow`).append("</div>");
  $('.col-12').append("</div")
  
}

//Render Single Book details
function renderSelectedBookData(selectedBookData) {
  selBookTitle = selectedBookData.volumeInfo.title;
  selAuthor=selectedBookData.volumeInfo.authors;
  var selectedBookRatings = "";
  var overviewHtml = "";
  var pricinginfoHtml = "";
  var forSale=`${selectedBookData.saleInfo.saleability}`;
  var isElectronic = `${selectedBookData.saleInfo.isEbook}`;

  //if there are no ratings listed for the book
  if (typeof(selectedBookData.volumeInfo.averageRating) =='undefined' || selectedBookData.volumeInfo.averageRating === null) {
    selectedBookRatings = 'There are no ratings for this book.';
  } else {
    selectedBookRatings = "Average Rating of " + selectedBookData.volumeInfo.averageRating + " out of " + selectedBookData.volumeInfo.ratingsCount + " ratings.";
  };

  //if the book is either FREE for not for sale
  if (isElectronic === `true`) {
    if (forSale == 'FREE') {
      pricinginfoHtml = "The price is 0!  Yeah!</div><div class='js-linkToBuy'><a href=" + selectedBookData.saleInfo.buyLink + ">Click to purchase from Google Play</a>";
    } else if (forSale === 'FOR_SALE') {
      pricinginfoHtml = "The price is: " + selectedBookData.saleInfo.retailPrice.amount + "</div><div class='js-linkToBuy'><a href=" + selectedBookData.saleInfo.buyLink + ">Click to purchase from Google Play</a>";
    } else {
      pricinginfoHtml = "There is some other status that I haven't considered.";
    }
} else {
  pricinginfoHtml = "<div class='notForSale'>This book is not for sale through Google Play.</div>";
};
  overviewHtml = "<div class='overviewitem'><div class='indbookheaderinfo'><div class='indbookthumbtable-cell'><img src=" + bookImage + " class='js-thumbnail'></div>" + 
                 "<div class='indbooktable-cell'><div class='headerinfo'><div class='js-title'>" + selectedBookData.volumeInfo.title + "</div><div class='js-authorname'>" + selectedBookData.volumeInfo.authors + "</div></div>" + 
                 "<div class = 'resultbody'><div class='js-publisher'><div class='pubwords'>Publisher/Date:</div><div class='pubdata'>" + selectedBookData.volumeInfo.publisher + "  " + selectedBookData.volumeInfo.publishedDate + 
                 "</div></div><div class='js-average-rating'>" + selectedBookRatings + "</div><div class='pagecount'> " + selectedBookData.volumeInfo.pageCount + " page(s)</div><div class='js-salePrice'>" + pricinginfoHtml + "</div><div class='js-description'>" + selectedBookData.volumeInfo.description + "</div></div></div></div>" +  
                 "</div></div>";
  

  $('.boxshadow').append(overviewHtml);
  $('.js-author').css('float', 'initial');
  $('.js-publisher').css('float', 'initial');
  $('html, body').animate({ scrollTop: $('main').offset().top - 100}); 
}

function renderClosingDivs() {
  console.log("fired renderClosingDivs");
  $('.boxshadow').append("</div></div>");
}


//Display Youtube detail
function renderYoutubeData(youtubeData) {
  //console.log('fired renderYoutubeData');
  var youtubeHTML="";
  $('.youtubeitem').remove();
  $.each(youtubeData.items, function(i, item) {
    youtubeHTML += "<div class='youtubeitem'><div class='headerinfo'><div class='js-title'>" + youtubeData.items[i].snippet.title + 
              "</div></div><div class='resultbody'><div class='js-desc'>" + youtubeData.items[i].snippet.description + "</div></div><div class='myVideo' id='" + i + "'>" + 
              "<iframe class='resp-iframe' data-videoIndex='" + 0 + "' src='https://www.youtube.com/embed/" + youtubeData.items[i].id.videoId + "?controls=1'></iframe></div></div>";
  });
  $('.js-youtube').append(youtubeHTML);
  $('.nextYoutube').show();
}


//Display News detail
function renderNewsData(newsData) {
  var indexNum = 0;
  var newsHTML="";
  var authName = "";
  $('.newsitem').remove();
  $.each(newsData, function(index, item) {
    if (typeof(newsData.articles[indexNum].author) =='undefined' || newsData.articles[indexNum].author === null) {
      authName = 'no author"s name is listed';
    } else {
      authName = newsData.articles[indexNum].author;
    };
    newsHTML += "<div class='newsitem'><div class='headerinfo'><div class='js-title'>" + newsData.articles[indexNum].title + "</div><div class='js-authorname'>Author:  " + 
    authName + "</div></div><div class='resultbody'><div class='js-subtitle'>" + newsData.articles[indexNum].description + "</div><div class='read'><a href='" + newsData.articles[indexNum].url + "' target='_blank'>Click here to read the article </a></div></div></div>";
    indexNum +=1;
  });
  $(`.js-news`).append(newsHTML);
  $('.nextNews').show();
}

//Display Wikipedia author data
function renderWikiData(authorData) {
  //console.log("renderWikiData fired");
  //console.log(authorData);
  var pageId = authorData.pageids[0];
  var wikiHTML="";

  var thumbSource = "";
  //console.log(typeof(authorData.pages[pageId].thumbnail.source));

  if (pageId =='-1' ) {
    wikiHTML += "<div class='wikiitem'><div class='headerinfo'><div class='wikimessage'>There is Wikipedia information on this author.</div></div>";
  } else {
      if (typeof(authorData.pages[pageId].thumbnail) =='undefined' || authorData.pages[pageId].thumbnail === null) {
        thumbSource = 'There is no thumnail for this book.';
      } else {
        thumbSource = authorData.pages[pageId].thumbnail.source;
      };
      console.log(authorData.pages[pageId].title);
     
      wikiHTML += "<div class='wikiitem'><div class='headerinfo'><div class='wikiimg'><img class='js-wikithumb' src='" + thumbSource +  "'></img></div><div class='js-title'>" + authorData.pages[pageId].title + "</div></div><div class='resultbody'>" + 
      "<div class='js-subtitle'>" + authorData.pages[pageId].extract + "</div></div><hr><p class='wikilink'><a href='//en.wikipedia.org/wiki/" + authorData.pages[pageId].title + 
      " target='_blank' data-lity><i class='fa fa-external-link-square' aria-hidden='true'></i> &nbsp;More on Wikipedia</a></p>";
  };

  $('.js-wiki').append(wikiHTML);
  }
  


//Calls to the APIs

//AJAX call for list of Google Books
function getGoogleBooksAPIData(userSelectedSearchTerm) {
  console.log('fired getGoogleBooksAPIData');
  const params = {
    q: `"${userSelectedSearchTerm}"`,
    key: `AIzaSyBpAvj7qUWfzUvniX__WEqh8iN5AUphs6s`,
  }
  $.getJSON(googleBooksURL, params, function(data){
    //console.log(data.items);
    var dataId="";
    renderListOfBooksHeader();
    renderListOfBooks(data.items);
    
  });
} 

//AJAX call to Google Books for Selected Book
function getSelectedGoogleBookAPIData(book) {
  console.log('fired getSelectedGoogleBookAPIData');
  const params = {
    volumeId: `"${book}"`,
    projection: `full`,
  }
  var singleBookURL = googleBooksURL + `/` + book + `?key=AIzaSyBpAvj7qUWfzUvniX__WEqh8iN5AUphs6s`;
  $.getJSON(singleBookURL, function(selectedBookData){
    //console.log("selected book data");
    //console.log(selectedBookData);
    userSelectedAuthor = selectedBookData.volumeInfo.authors;
    renderSelectedBookHeader();
    renderSelectedBookData(selectedBookData);
    //console.log('selected book data is ');
    //console.log (selectedBookData);
    nextPageToken = selectedBookData.nextPageToken;
    renderYoutubeHeader();
    renderNewsHeader();
    renderWikiHeader();
  });
}

//call to Youtube for videos
function getYouTubeAPIData(userSelectedSearchTerm) {
  console.log('fired getYouTubeAPIData');

  const youtubeParams = {
    q: `"${selAuthor}" OR "${selBookTitle}"`,
    key: `AIzaSyDoLr1m73oBf7SHHiLQMEXg_8nhHUBWLYM`,
    part: 'snippet',
    maxResults: 5,
    videoID:'id'
  }
  $.getJSON(youtubeURL, youtubeParams, function(data){
    //console.log('youtube data');
    //console.log(data);
    renderYoutubeData(data);
    state.youtubePageToken = data.nextPageToken;
  }); 
}

//AJAX call to News for articles
function getNewsAPIData(userSelectedSearchTerm) {
  const params = {
    q: `"${selAuthor}" OR "${selBookTitle}"`,
    apiKey: `430d190071894a52b7716e87bf74ced3`,
    articleList:`articles`,
    pagesize: 8,
    language: `en`
    }
    console.log(params);
  $.getJSON(newsURL, params, function(data){
    renderNewsData(data);
    console.log(data);
    //document.getElementById("nextNews").style.display = "block";
    state.newsNextPage++;
    console.log('newsnextpage is ' + state.newsNextPage);
  });  
}

//AJAX call to Wikipedia API
function getWikiAPIData() {
  const wikiParams = {
    titles: `${selAuthor}`,
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
      renderWikiData(data.query)
  });
}




function getNewsDataNextPage(userSelectedSearchTerm) {
  const params = {
    q: `"${selAuthor}" OR "${selBookTitle}"`,
    apiKey: `430d190071894a52b7716e87bf74ced3`,
    articleList:`articles`,
    pagesize: 10,
    language: `en`,
    page: state.newsNextPage
    }
  $.getJSON(newsURL, params, function(data){
    renderNewsData(data);
    state.newsNextPage++;
  });  
}

function getYoutubeDataNextPage(userSelectedSearchTerm){
  console.log('fired getYoutubeDataNextPage');
  const params = {
    q: `"${selAuthor}" OR "${selBookTitle}"`,
    key: `AIzaSyDoLr1m73oBf7SHHiLQMEXg_8nhHUBWLYM`,
    part: 'snippet',
    maxResults: 2,
    videoID:'id',
    pageToken: state.youtubePageToken
  }
  $.getJSON(youtubeURL, params, function(data){
    //console.log(data)

    renderYoutubeData(data);
    state.youtubePageToken = data.nextPageToken;
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
    console.log('fired listener for book selection')
    e.preventDefault();
    selectedBookId = $(e.currentTarget).find('.js-itemid').attr('data-bookId');
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
  $(document).on('click', '.sdyoutube', (function(e){
    e.preventDefault();
    console.log('fired youtube event listener');
    //if the down-angle icon is visible, then go get the data and display
    if ($('#youtubeangledown').css('display')=='inline-block') {
      getYouTubeAPIData(userSelectedSearchTerm);
      $('#youtubeangledown').css('display','none');
      $('#youtubeangleup').css('display','');
    // however, if the up-angle icon is visible, then remove all data and replace icon with the down-angle icon
    } else if($('#youtubeangledown').css('display')=='none') {
      $('.youtubeitem').remove();
      $('.nextYoutube').css('display','none');
      $('#youtubeangleup').css('display','none');
      $('#youtubeangledown').css('display','');
    } else {
      console.log('ERROR_YOUTUBE ARROW CLICK');
    }
  }));

//listener for news data
  $(document).on('click', '.sdnews', (function(e){
    e.preventDefault();
    //if the down-angle icon is visible, then go get the data and display
    if ($('#newsangledown').css('display')=='inline-block') {
      getNewsAPIData(userSelectedSearchTerm);
      $('#newsangledown').css('display','none');
      $('#newsangleup').css('display','');
    // however, if the up-angle icon is visible, then remove all data and replace icon with the down-angle icon
    } else if($('#newsangledown').css('display')=='none') {
      $('.newsitem').remove();
      $('.nextNews').css('display','none');
      $('#newsangleup').css('display','none');
      $('#newsangledown').css('display','');
    } else {
      console.log('ERROR_NEWS ARROW CLICK');
    };
  }));

//listener for wiki data
  $(document).on('click', '.sdwiki', (function(e){
    e.preventDefault();
    if ($('#wikiangledown').css('display')=='inline-block') {
      getWikiAPIData(userSelectedSearchTerm);
      $('#wikiangledown').css('display','none');
      $('#wikiangleup').css('display','');
    // however, if the up-angle icon is visible, then remove all data and replace icon with the down-angle icon
    } else if($('#wikiangledown').css('display')=='none') {
      console.log('MADE IT PASSED THE ANGLE UP IS SHOWING');
      $('.wikiitem').remove();
      $('.nextWiki').css('display','none');
      $('#wikiangleup').css('display','none');
      $('#wikiangledown').css('display','');
    } else {
      console.log('ERROR_WIKI ARROW CLICK');
    };
  }));

//get next set of you tube videos
  $(document).on('click','.nextYoutube', (function(event){
    //console.log('fired next youtube event listener');
    event.preventDefault();
    getYoutubeDataNextPage(userSelectedSearchTerm);
  }));

//get next set of news articles
  $(document).on('click','.nextNews', (function(event){
    //console.log('fired next new article event listener');
    event.preventDefault();
    getNewsDataNextPage(userSelectedSearchTerm);
  }));

}

watchSubmit();