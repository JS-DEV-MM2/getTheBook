// Single state object
var state = {
  userSelectedSearchTerm: "",
  userSelectedAuthor:"",
  selectedBookId:"",
  newsNextPage:1,
  youtubePageToken: "",

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
  listofbooksHeader = "<div class='col-12'><div class='boxshadow'><div class='boxtitle booklisttitle'><span class='title_style'><i class='fas fa-kiwi-bird'></i>Select one of the following books to get more information</span></div></div>";
  $('.row:nth-of-type(2)').append("<div class='content'>");
  $('.content').append(listofbooksHeader);
  $('html, body').animate({ scrollTop: $('main').offset().top - 100}); 
}

// Render Single Book header
function renderSelectedBookHeader() {
  console.log('fired renderSelectedBookHeader');
  var selectedbookHeaderHtml = "";
  $('.content').remove();
  selectedbookHeaderHtml = "<div class='col-12'><div class='boxshadow'><div class='boxtitle booklisttitle' ><span class='title_style'><i class='fas fa-kiwi-bird'></i>Overview of the book you selected</span></div>";
  $('.row:nth-of-type(2)').append("<div class='content'>");
  $('.content').append(selectedbookHeaderHtml);

}

//Render Youtube header
function renderYoutubeHeader() {
  console.log('fired renderYoutubeHeader');
  $('.boxshadow').append("<div class='col-4'><div class='js-youtube'></div></div>");
  var youtubeHeaderHtml = "";
  youtubeHeaderHtml = "<div class='boxtitle youtubetitle'><span class='title_style'><div class='slidedown sdyoutube'><span><i id='youtubeangledown' class='fas fa-angle-double-down' aria-hidden='true' ></i><i id='youtubeangleup' class=' fas fa-angle-double-up' aria-hidden='true' style='display:none' ></i></div><span><i class='fas fa-handshake'></i>Youtube Videos</span><p><span class='nextYoutube'>More results</span></div>";
  $('.js-youtube').append(youtubeHeaderHtml);
 // $('.boxshadow').append("</div></div>");

}

//Render News header
function renderNewsHeader() {
  console.log('fired renderNewsHeader');
  $('.boxshadow').append("<div class='col-4'><div class='js-news'></div></div>");
  var newsHeaderHtml = "";
  newsHeaderHtml = "<div class='boxtitle newstitle'><span class='title_style'><div class='slidedown sdnews'><i id='newsangledown' class='fas fa-angle-double-down' aria-hidden='true' ></i><i id='newsangleup' class=' fas fa-angle-double-up' aria-hidden='true' style='display:none' ></i></div><div class='othertitle'><span><i class='fas fa-star'></i>News Articles</span><p><span class='nextNews'>More results</span></div></div></div>";
  $(`.js-news`).append(newsHeaderHtml);
}
//Render Wiki header
function renderWikiHeader() {
  console.log('fired renderWikiHeader');
  $('.boxshadow').append("<div class='col-4'><div class='js-wiki'></div></div>");
  var newsWikiHtml = "";
  wikiHeaderHtml = "<div class='boxtitle wikititle'><span class='title_style'><div class='slidedown sdwiki'><i id='wikiangledown' class='fas fa-angle-double-down' aria-hidden='true' ></i><i id='wikiangleup' class=' fas fa-angle-double-up' aria-hidden='true' style='display:none' ></i></div><div class='othertitle'><span><i class='fas fa-certificate'></i>Wiki</span><p><span class='nextWiki'>More</span></div></div></div>";
  $(`.js-wiki`).append(wikiHeaderHtml);
}

//***Render Details

//Render List of books details
function renderListOfBooks(listofbooksData) {
  console.log('fired renderListOfBooks');
  console.log(listofbooksData.length);
  console.log(listofbooksData);
  var txtSnippet = "";
  var pub = "";

  var listofbooksHTML="";
  $(`.boxshadow`).append("<div class='listofbookstable'>");

  //Error msg for no search results: book list
  if (listofbooksData.length === 0) {
    listofbooksHTML += '<div class="center"><div class="errormessage">Sorry, no books on the selected topic were found on Google Books.</div></div>';
  } else {
    var i = 0;
    $.each(listofbooksData, function(index, item) {
    //if there is no publisher available
    if (typeof(listofbooksData[i].volumeInfo.publisher) =='undefined' || listofbooksData[i].volumeInfo.publisher === null) {
      pub = 'No publisher is listed.';
    } else {
      pub = listofbooksData[i].volumeInfo.publisher;
    };
      //if there is no snippet available
    if (typeof(listofbooksData[i].searchInfo) =='undefined' || listofbooksData[i].searchInfo.textSnippet === null) {
      txtSnippet = 'There is no summary for this book';
    } else {
      txtSnippet = listofbooksData[i].searchInfo.textSnippet;
    };
    listofbooksHTML += "<div class='book'><div class='bookthumbtable-cell'><img class='listofbooksthumb' src='" + listofbooksData[i].volumeInfo.imageLinks.thumbnail +
                        "'></img></div><div class='listofbookstable-cell'><div class='headerinfo'><div class='js-author'>" + listofbooksData[i].volumeInfo.authors + ", </div> <div class='js-title'>" +  
                        listofbooksData[i].volumeInfo.title + "</div></div><div class='resultbody'><div class='js-publisher'> Publisher:" +  pub + 
                        "</div><div class='js-categories'> Genres: " +  listofbooksData[i].volumeInfo.categories + "</div><div class='js-average-rating'>Average Rating of " + listofbooksData[i].volumeInfo.averageRating +
                        " out of " + listofbooksData[i].volumeInfo.ratingsCount + " ratings.</div> </div><div class='otherdata'><div class='js-textsnippet'>" + txtSnippet +
                        "</div></div><div class='js-itemid' data-bookId='" + listofbooksData[i].id + "'>" + listofbooksData[i].id + "</div></div></div>";
  
    
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
  var overviewHtml = "";
  var pricinginfoHtml = "";
  overviewHtml = "<div class='overviewitem'><div class='indbookheaderinfo'><div class='indbookthumbtable-cell'><img src=" + selectedBookData.volumeInfo.imageLinks.thumbnail + " class='js-thumbnail'></div>" + 
                 "<div class='indbooktable-cell'><div class='indbookbodyinfo'><div class='js-title'>" + selectedBookData.volumeInfo.title + "</div><div class='js-author'> by  " + selectedBookData.volumeInfo.authors + "</div>" + 
                 "<div class='js-publisher'><strong>Publisher:</strong>" + selectedBookData.volumeInfo.publisher + " <strong>Publish Date:</strong> " + selectedBookData.volumeInfo.publishedDate + 
                 "</div><div class='js-average-rating'>Average Rating of " + selectedBookData.volumeInfo.averageRating + 
                 " out of " + selectedBookData.volumeInfo.ratingsCount + " ratings.</div><div class='pagecount'> " + selectedBookData.volumeInfo.pageCount + " page(s)</div><div class='js-description'>" + selectedBookData.volumeInfo.description + "</div></div></div>" +  
                 "</div></div>";
  
/*
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

  <div class='otherdata'><div class='saleprice'>Price:  GET PRICE</div><div class='linktobuy'><a href=" + selectedBookData.saleInfo.buyLink + ">Click to purchase from Google Play</a></div></div></div></div>";

  overviewHtml += pricinginfoHtml;
  */
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
  console.log('fired renderYoutubeData');
  var youtubeHTML="";
  $('.youtubeitem').remove();
  $.each(youtubeData.items, function(i, item) {
    youtubeHTML += "<div class='youtubeitem'><div class='headerinfo'><div class='js-title'>" + youtubeData.items[i].snippet.title + 
              "</div></div><div class='resultbody'><div class='js-desc'>" + youtubeData.items[i].snippet.description + "</div></div><div class='myVideo' id='" + i + "'>" + 
              "<iframe class='resp-iframe' data-videoIndex='" + 0 + "' src='https://www.youtube.com/embed/" + youtubeData.items[i].id.videoId + "?controls=1'></iframe></div></div>";
  });
  $('.js-youtube').append(youtubeHTML);
}


//Display News detail
function renderNewsData(newsData) {
  var indexNum = 0;
  var newsHTML="";
  //console.log("renderNewsData before each " + nextNewsPage);
  $('.newsitem').remove();
  $.each(newsData, function(index, item) {
    ////console.log(newsData.articles[indexNum].title);
    newsHTML += "<div class='newsitem'><div class='headerinfo'><div class='js-title'>" + newsData.articles[indexNum].title + "</div></div><div class='resultbody'><div class='js-author'><span class='js-authorname'>Author:  </span>" + 
    newsData.articles[indexNum].author + "</div><div class='js-subtitle'>" + newsData.articles[indexNum].description + "</div><div class='read'><a href='" + newsData.articles[indexNum].url + "'>Click here to read the article </a></div></div></div>";
    ////console.log(newsHTML);
    indexNum +=1;
  });
  //console.log('In renderNewsData newsNextPage is ' + newsNextPage);
  $(`.js-news`).append(newsHTML);
  $('.nextNews').show();
}

//Display Wikipedia author data
function renderWikiData(authorData) {
  console.log("renderWikiData fired");
  var pageId = authorData.pageids[0];
  //console.log(pageId);
  var wikiHTML="";
  wikiHTML += "<div class='wikiitem'><div class='headerinfo'><div class='wikiimg'><img class='js-wikithumb' src='" + authorData.pages[pageId].thumbnail.source + "' height='" + authorData.pages[pageId].thumbnail.height + "' width='" + authorData.pages[pageId].thumbnail.width + "'></img></div><div class='js-title'>" + authorData.pages[pageId].title + "</div></div><div class='resultbody'>" + 
"<div class='js-subtitle'>" + authorData.pages[pageId].extract + "</div></div>";
  $('.js-wiki').append(wikiHTML);
  $('.js-wiki').append('<hr>');
  $('.js-wiki').append('<p class="wikilink"><a href="//en.wikipedia.org/wiki/' + authorData.pages[pageId].title + 
      '" data-lity><i class="fa fa-external-link-square" aria-hidden="true"></i> &nbsp;More on Wikipedia</a></p>');
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
    console.log("selected book data");
    console.log(selectedBookData);
    userSelectedAuthor = selectedBookData.volumeInfo.authors;
    renderSelectedBookHeader();
    renderSelectedBookData(selectedBookData);
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
    q: `${userSelectedSearchTerm} in:name`,
    key: `AIzaSyDoLr1m73oBf7SHHiLQMEXg_8nhHUBWLYM`,
    part: 'snippet',
    maxResults: 5,
    videoID:'id'
  }
  $.getJSON(youtubeURL, youtubeParams, function(data){
    //console.log('aferJSON');
    //console.log(data);
    renderYoutubeData(data);
    //console.log('you tube data after api call');
    //console.log(data);
    state.youtubePageToken = data.nextPageToken;
    console.log('youtube nextpageToken is' + state.youtubePageToken);
    //$('.col-4').show();
  }); 
}

//AJAX call to News for articles
function getNewsAPIData(userSelectedSearchTerm) {
  const params = {
    q: `${userSelectedSearchTerm}`,
    apiKey: `430d190071894a52b7716e87bf74ced3`,
    articleList:`articles`,
    pagesize: 8,
    language: `en`
    }
  $.getJSON(newsURL, params, function(data){
    renderNewsData(data);
    console.log(data);
    //document.getElementById("nextNews").style.display = "block";
    state.newsNextPage++;
    console.log('newsnextpage is ' + state.newsNextPage);
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
    page: state.newsNextPage
    }
  $.getJSON(newsURL, params, function(data){
    renderNewsData(data);
    state.newsNextPage++;
    console.log('newsnextpage is ' + state.newsNextPage);
  });  
}

function getYoutubeDataNextPage(userSelectedSearchTerm){
  console.log('fired getYoutubeDataNextPage');
  const params = {
    q: `${userSelectedSearchTerm} in:name`,
    key: `AIzaSyDoLr1m73oBf7SHHiLQMEXg_8nhHUBWLYM`,
    part: 'snippet',
    maxResults: 2,
    videoID:'id',
    pageToken: state.youtubePageToken
  }
  console.log("next page token is " + state.youtubePageToken);
  $.getJSON(youtubeURL, params, function(data){
    console.log(data)

    renderYoutubeData(data);
    ////console.log(data.items);
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
      console.log('MADE IT PASSED THE ANGLE UP IS SHOWING');
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
      console.log('MADE IT PASSED THE ANGLE UP IS SHOWING');
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
    ////console.log('nextYoutube');
    event.preventDefault();
    getYoutubeDataNextPage(userSelectedSearchTerm);
  }));

//get next set of news articles
  $(document).on('click','.nextNews', (function(event){
    console.log('next news listener is working');
    event.preventDefault();
    getNewsDataNextPage(userSelectedSearchTerm);
  }));

}

watchSubmit();