// Single state object
var state = {
  userSelectedSearchTerm: '',
  userSelectedAuthor:'',
  selectedBookId:'',
  googleStartIndex:0,
  newsNextPage:1,
  youtubePageToken: '',
};

const googleBooksURL = 'https://www.googleapis.com/books/v1/volumes';
const newsURL = 'https://newsapi.org/v2/everything';
const youtubeURL = 'https://www.googleapis.com/youtube/v3/search';
const wikiURL = 'https://en.wikipedia.org/w/api.php';

//***Render Headers
//Render list of books based on selecction
const showListH = function renderListOfBooksHeader() {
  $('.content').remove();
  let listofbooksHeader='';
  listofbooksHeader = '<div class="col-12"><div class="boxshadow"><div class="boxtitle booklisttitle"><div class="title-style"><div class="slidedown"></div>' + 
                      '<div title="othertitle"><div class="appicons"><i class="fas fa-kiwi-bird"></i></div><div class="titleverbage"><span class="titlewords">' + 
                      'Select one of the following books to get more information</span></div><p><div class="nextlist js-nextlist">More books</div></div></div></div>';
  $('.row:nth-of-type(2)').append('<div class="content">');
  $('.content').append(listofbooksHeader);
  $('html, body').animate({ scrollTop: $('main').offset().top - 100}); 
}

// Render Single Book header
const showBookH = function renderSelectedBookHeader() {
  let selectedbookHeaderHtml = '';
  $('.content').remove();
  selectedbookHeaderHtml = '<div class="col-12"><div class="boxshadow"><div class="boxtitle booklisttitle" ><div class="title-style"><div class="slidedown"></div>' + 
                          '<div class="othertitle"><div class="appicons"><i class="fas fa-kiwi-bird"></i></div><div class="titleverbage"><span class="titlewords">' + 
                          'Overview of the book you selected<span></div><p><div class="back-to-list js-back-to-list">Back to List</div></div></div></div>';
  $('.row:nth-of-type(2)').append('<div class="content">');
  $('.content').append(selectedbookHeaderHtml);

}

//Render Youtube header
const showYtH = function renderYoutubeHeader() {
  $('.boxshadow').first().append('<div class="col-4"><div class="js-youtube"></div></div>');
  let youtubeHeaderHtml = '';
  youtubeHeaderHtml = '<div class="boxtitle youtubetitle"><div class="title-style"><div class="slidedown sdyoutube"><i id="youtubeangledown" class="fas fa-angle-double-down" aria-hidden="true" ></i>' + 
                      '<i id="youtubeangleup" class=" fas fa-angle-double-up" aria-hidden="true" style="display:none" ></i></div><div class="othertitle"><div class="appicons"><i class="fas fa-handshake"></i>' + 
                      '</div><div class="titleverbage"><span class="titlewords">Videos on Author or Title</span></div><p><div class="nextyt js-nextyt">More results</div></div></div></div>';
  $('.js-youtube').append(youtubeHeaderHtml);
}

//Render News header
const showNewsH = function renderNewsHeader() {
  $('.boxshadow').first().append('<div class="col-4"><div class="js-news"></div></div>');
  let newsHeaderHtml = '';
  newsHeaderHtml = '<div class="boxtitle newstitle"><div class="title-style"><div class="slidedown sdnews"><i id="newsangledown" class="fas fa-angle-double-down" aria-hidden="true" ></i>' + 
                  '<i id="newsangleup" class=" fas fa-angle-double-up" aria-hidden="true" style="display:none" ></i></div><div class="othertitle"><div class="appicons"><i class="fas fa-star"></i>' + 
                  '</div><div class="titleverbage"><span class="titlewords">News on Author or Title</span></div><p><div class="nextnews js-nextnews">More results</div></div></div></div>';
  $('.js-news').append(newsHeaderHtml);
}
//Render Wiki header
const showWikiH = function renderWikiHeader() {
  $('.boxshadow').first().append('<div class="col-4"><div class="js-wiki"></div></div>');
  let newsWikiHtml = '';
  wikiHeaderHtml = '<div class="boxtitle wikititle"><div class="title-style"><div class="slidedown sdwiki"><i id="wikiangledown" class="fas fa-angle-double-down" aria-hidden="true" ></i>' + 
                   '<i id="wikiangleup" class=" fas fa-angle-double-up" aria-hidden="true" style="display:none" ></i></div><div class="othertitle"><div class="appicons"><i class="fas fa-certificate"></i>' + 
                   '</div><div class="titleverbage"><span class="titlewords">Wiki Details on Author</span></div></div></div></div>';
  $('.js-wiki').append(wikiHeaderHtml);
}

//***Render Details

//Render List of books details
const showList = function renderListOfBooks(listOfBooksData) {
  let txtSnippet = '';
  let pub = '';
  let authName = '';
  let bookTitle = '';
  let bookGenres = '';
  let aveRating = '';
  let dtaId = '';
  let listOfBooksHtml='';
  let bookImage= '';
  $('.boxshadow').first().append('<div class="listofbookstable">');
  

  //Error msg for no search results: book list
  if (listOfBooksData.length === 0) {
    listOfBooksHtml += '<div class="center"><div class="errormessage">Sorry, no books on the selected topic were found on Google Books.</div></div>';
  } else {
    $.each(listOfBooksData.items, function(i, item) {
        authName = listOfBooksData.items[i].volumeInfo.authors;
        bookTitle = listOfBooksData.items[i].volumeInfo.title;
        dtaId = listOfBooksData.items[i].id;
        //if there is no image available
        if (typeof(listOfBooksData.items[i].volumeInfo.imageLinks) =='undefined' || listOfBooksData.items[i].volumeInfo.imageLinks === null) {
          bookImage = 'images/noimageavailable.png';
        } else {
          bookImage = listOfBooksData.items[i].volumeInfo.imageLinks.thumbnail;
        };

        //if there is no publisher available
        if (typeof(listOfBooksData.items[i].volumeInfo.publisher) =='undefined' || listOfBooksData.items[i].volumeInfo.publisher === null) {
          pub = 'No publisher is listed.';
        } else {
          pub = listOfBooksData.items[i].volumeInfo.publisher;
        };
        //no genres available
        if (typeof(listOfBooksData.items[i].volumeInfo.categories) =='undefined' || listOfBooksData.items[i].volumeInfo.categories === null) {
          bookGenres = 'No genres are listed.';
        } else {
          bookGenres = listOfBooksData.items[i].volumeInfo.categories;
        };

        if (typeof(listOfBooksData.items[i].volumeInfo.averageRating) =='undefined' || listOfBooksData.items[i].volumeInfo.averageRating === null) {
          aveRating = 'No ratings are listed.';
        } else {
          aveRating = listOfBooksData.items[i].volumeInfo.averageRating;
        };
          //if there is no snippet available
        if (typeof(listOfBooksData.items[i].searchInfo) =='undefined' || listOfBooksData.items[i].searchInfo.textSnippet === null) {
          txtSnippet = 'There is no summary for this book';
        } else {
          txtSnippet = listOfBooksData.items[i].searchInfo.textSnippet;
        };
        listOfBooksHtml += `<div class="book"><div class="bookthumbtable-cell"><img class="listofbooksthumb" src="${bookImage}"></img>` + 
                            `</div><div class="listofbookstable-cell"><div class="headerinfo"><div class="author-name-style">${authName}</div>` +
                            `<div class="title-style-1">${bookTitle}</div></div><div class="resultbody"><div class="pub-style"><div class="pubwords"> Publisher:</div>` + 
                            `<div class="pubdata">${pub}</div></div><div class="js-categories"><div class="genwords"> Genres: </div><div class="gendata">${bookGenres}</div>` + 
                            `</div><div class="ratingwords">Average Rating: </div><div class="ratingdata">${aveRating}</div><div class="desc-style">${txtSnippet}</div>` +
                            `</div><div class="itemid js-itemid" data-bookId="${dtaId}">${dtaId}</div></div></div></div>`;
    });
    listOfBooksHtml+='</div>';
  };

  $('.listofbookstable').append(listOfBooksHtml);
  $('.boxshadow').first().append('</div>');
  $('.col-12').append('</div')
  
}

//Render Single Book details
const showBook = function renderSelectedBookData(selectedBookData) {
  selBookTitle = selectedBookData.volumeInfo.title;
  selAuthor=selectedBookData.volumeInfo.authors;
  let selectedBookRatings = '';
  let selPublisher = selectedBookData.volumeInfo.publisher;
  let selPubDate = selectedBookData.volumeInfo.publishedDate;
  let selDesc = selectedBookData.volumeInfo.description;
  let pc = selectedBookData.volumeInfo.pageCount;
  let overviewHtml = '';
  let pricinginfoHtml = '';
  let bookImage = '';
  let forSale=`${selectedBookData.saleInfo.saleability}`;
  let isElectronic = `${selectedBookData.saleInfo.isEbook}`;

  //if there is no image available
  if (typeof(selectedBookData.volumeInfo.imageLinks) =='undefined' || selectedBookData.volumeInfo.imageLinks === null) {
    bookImage = 'images/noimageavailable.png';
  } else {
    bookImage = selectedBookData.volumeInfo.imageLinks.thumbnail;
  };

  //if there are no ratings listed for the book
  if (typeof(selectedBookData.volumeInfo.averageRating) =='undefined' || selectedBookData.volumeInfo.averageRating === null) {
    selectedBookRatings = 'There are no ratings for this book.';
  } else {
    selectedBookRatings = 'Average Rating of ' + selectedBookData.volumeInfo.averageRating + ' out of ' + selectedBookData.volumeInfo.ratingsCount + ' ratings.';
  };

  //if the book is either FREE for not for sale
  if (isElectronic === 'true') {
    if (forSale == 'FREE') {
      pricinginfoHtml = 'The price is 0!  Yeah!</div><div class="linktobuy"><a href=' + selectedBookData.saleInfo.buyLink + '>Click to purchase from Google Play</a>';
    } else if (forSale === 'FOR_SALE') {
      pricinginfoHtml = 'The price is: ' + selectedBookData.saleInfo.retailPrice.amount + '</div><div class="linktobuy"><a href=' + selectedBookData.saleInfo.buyLink + ' target="_blank">Click to purchase from Google Play</a>';
    } else {
      pricinginfoHtml = 'There is some other status that I haven"t considered.';
    }
} else {
  pricinginfoHtml = '<div class="notForSale">This book is not for sale through Google Play.</div>';
};
  overviewHtml = `<div class="overviewitem"><div class="indbookheaderinfo"><div class="indbookthumbtable-cell"><img src='${bookImage}' class="js-thumbnail"></div>` +
                 `<div class="indbooktable-cell"><div class="headerinfo"><div class="title-style-1">${selBookTitle}</div><div class="author-name-style">${selAuthor}</div></div>` + 
                 `<div class = "resultbody"><div class="pub-style"><div class="pubwords">Publisher/Date:</div><div class="pubdata">${selPublisher}  ${selPubDate}</div></div>` +
                 `<div class="js-average-rating">${selectedBookRatings}</div><div class="pagecount">${pc} page(s)</div><div class="saleprice">${pricinginfoHtml}</div>` +
                 `<div class="desc-style">${selDesc}</div></div></div></div></div></div>`;
  $('.boxshadow').first().append(overviewHtml);
  $('.js-author').css('float', 'initial');
  $('.pub-style').css('float', 'initial');
  $('html, body').animate({ scrollTop: $('main').offset().top - 100}); 
}

//Display Youtube detail
const showYt = function renderYoutubeData(ytData) {
  let ytTitle = '';
  let ytDesc = '';
  let ytVidId = '';
  let ytHtml='';
  $('.youtubeitem').remove();
  $.each(ytData.items, function(i, item) {
    ytTitle = ytData.items[i].snippet.title;
    ytDesc = ytData.items[i].snippet.description;
    ytVidId = ytData.items[i].id.videoId;
    ytHtml += `<div class="youtubeitem"><div class="headerinfo"><div class="title-style-1">${ytTitle}</div>` +
              `</div><div class="resultbody"><div class="ytdesc-style">${ytDesc}</div></div><div class="myVideo" id="' + i + '">` +
              `<iframe class="resp-iframe" data-videoIndex="' + 0 + '" src="https://www.youtube.com/embed/${ytVidId}?controls=1">` +
              `</iframe></div></div>`;
  });
  $('.js-youtube').append(ytHtml);
  $('.js-nextyt').show();
}

//Display News detail
const showNews = function renderNewsData(newsData) {
  let newsHtml='';
  let authName = '';
  let newsTitle = '';
  let newsDesc = '';
  let newsUrl = '';
  $('.newsitem').remove();
  $.each(newsData.articles, function(i, item) {
    newsTitle = newsData.articles[i].title;
    newsDesc = newsData.articles[i].description;
    newsUrl = newsData.articles[i].url;
    if (typeof(newsData.articles[i].author) =='undefined' || newsData.articles[i].author === null) {
      authName = 'no author\"s name is listed';
    } else {
      authName = newsData.articles[i].author;
    };
    newsHtml += `<div class="newsitem"><div class="headerinfo"><div class="title-style-1">${newsTitle}</div><div class="author-name-style">Author:  ${authName}</div></div>` +
                `<div class="resultbody"><div class="js-subtitle">${newsDesc}</div><div class="read"><a href="${newsUrl}" target="_blank">Click here to read the article </a></div></div></div>`;
  });
  $('.js-news').append(newsHtml);
  $('.js-nextnews').show();
}

//Display Wikipedia author data
const showWiki = function renderWikiData(authorData) {
  let pageId = authorData.pageids[0];
  let wikiThumb = authorData.pages[pageId].thumbnail;
  let wikiThumbSource = '';
  let wikiTitle = authorData.pages[pageId].title;
  let wikiExtract = authorData.pages[pageId].extract
  let wikiHtml='';
  let thumbSource = '';
  if (pageId =='-1' ) {
    wikiHtml += '<div class="wikiitem"><div class="headerinfo"><div class="wikimessage">There is no Wikipedia information on this author.</div></div>';
  } else {
    console.log(authorData);
    if (typeof(authorData.pages[pageId].thumbnail) =='undefined' || authorData.pages[pageId].thumbnail === null) {
      wikiThumbSource = 'There is no image for this author';
    } else {
      wikiThumbSource = '<img src="' + authorData.pages[pageId].thumbnail.source + '"';
    };

      wikiHtml += `<div class="wikiitem"><div class="headerinfo"><div class="wikiimg">${wikiThumbSource}</div><div class="title-style-1">${wikiTitle}</div></div><div class="resultbody">` + 
      `<div class="js-subtitle">${wikiExtract}</div></div><hr><p class="wikilink"><a href="http://en.wikipedia.org/wiki/${wikiTitle}" target="_blank">` + 
      `<i class="fab fa-wikipedia-w"></i></i> &nbsp;More on Wikipedia</a></p>`;
  };

  $('.js-wiki').append(wikiHtml);
  }
  

//*****Calls to the APIs

//AJAX call for list of Google Books
const googleList = function getGoogleBooksAPIData(userSelectedSearchTerm) {
      const params = {
        q: `"${userSelectedSearchTerm}"`,
        key: 'AIzaSyBpAvj7qUWfzUvniX__WEqh8iN5AUphs6s',
      }
      $.getJSON(googleBooksURL, params, function(data){
        let dataId='';
        showListH();
        showList(data);
      });
} 

//AJAX call to Google Books for next set of data
const listNext = function getGoogleBooksAPINextList(userSelectedSearchTerm) {
  state.googleStartIndex += 10;
  const params = {
    q: `"${userSelectedSearchTerm}"`,
        key: 'AIzaSyBpAvj7qUWfzUvniX__WEqh8iN5AUphs6s',
        startIndex: state.googleStartIndex,
      }
  $.getJSON(googleBooksURL, params, function(data){
    console.log(state.googleStartIndex);
    showListH();
    showList(data);
  });  
}

//AJAX call to Google Books for Selected Book
const googleBook = function getSelectedGoogleBookAPIData(book) {
      const params = {
        volumeId: `"${book}"`,
        projection: 'full',
      }
      let singleBookURL = googleBooksURL + '/' + book + '?key=AIzaSyBpAvj7qUWfzUvniX__WEqh8iN5AUphs6s';
      $.getJSON(singleBookURL, function(selectedBookData){
        userSelectedAuthor = selectedBookData.volumeInfo.authors;
        showBookH();
        showBook(selectedBookData);
        nextPageToken = selectedBookData.nextPageToken;
        showYtH();
        showNewsH();
        showWikiH();
      });
}

//call to Youtube for videos
const getYt = function getYouTubeAPIData(userSelectedSearchTerm) {
      const ytParams = {
        q: `"${selAuthor}" OR ${selBookTitle}"`,
        key: 'AIzaSyDoLr1m73oBf7SHHiLQMEXg_8nhHUBWLYM',
        part: 'snippet',
        maxResults: 3,
        videoID:'id'
      }
      $.getJSON(youtubeURL, ytParams, function(data){
        showYt(data);
        state.youtubePageToken = data.nextPageToken;
      }); 
}

//AJAX call to News for articles
const getNews = function getNewsAPIData(userSelectedSearchTerm) {
      const params = {
        q: `"${selAuthor}" OR "${selBookTitle}"`,
        apiKey: '430d190071894a52b7716e87bf74ced3',
        articleList:'articles',
        pagesize: 5,
        language: 'en'
        }
      $.getJSON(newsURL, params, function(data){
        showNews(data);
        state.newsNextPage++;
      });  
}

//AJAX call to Wikipedia API
const getWiki = function getWikiAPIData() {
      const wikiParams = {
        titles: `${selAuthor}`,
        origin: '*',
        action: 'query',
        format: 'json',
        prop: 'extracts|pageimages',
        indexpageids: 1,
        //redirects: 1, 
        exchars: 1200,
        // explaintext: 1,
        //exsectionformat: 'plain',
        piprop: 'name|thumbnail|original',
        pithumbsize: 250
      };
      $.getJSON(wikiURL, wikiParams, function(data) {
        console.log(data);
          showWiki(data.query)
      });
}
//AJAX call to Wiki for next set of data
const newsNext = function getNewsDataNextPage(userSelectedSearchTerm) {
  const params = {
    q: `"${selAuthor}" OR "${selBookTitle}"`,
    apiKey: '430d190071894a52b7716e87bf74ced3',
    articleList:'articles',
    pagesize: 10,
    language: 'en',
    page: state.newsNextPage
    }
  $.getJSON(newsURL, params, function(data){
    showNews(data);
    state.newsNextPage++;
  });  
}

//AJAX call to Youtube for next set of data
const ytNext = function getYoutubeDataNextPage(userSelectedSearchTerm){
  const params = {
    q: `"${selAuthor}" OR "${selBookTitle}"`,
    key: 'AIzaSyDoLr1m73oBf7SHHiLQMEXg_8nhHUBWLYM',
    part: 'snippet',
    maxResults: 5,
    videoID:'id',
    pageToken: state.youtubePageToken
  }
  $.getJSON(youtubeURL, params, function(data){
    showYt(data);
    state.youtubePageToken = data.nextPageToken;
  });
}

/* Event listeners */

function watchSubmit() {
//suggestions for submission text input
  let searchEx = [ 'Want some suggestions?', 'David Grann', 'Jane Eyre', 'Radium Girls', 'William Shakespeare', 'Shakespeare', 'Louisa May Alcott', 'Jack London', 'Harry Potter', 'J. K. Rowling', 'Margaret Atwood', 'Lord of the Flies', 'America"s Cup', 'The Poisonwood Bible' ];
  setInterval(function() {
    $('input#js-searchfield').attr('placeholder', searchEx[searchEx.push(searchEx.shift())-1]);
  }, 3000);

  //listener for input from user; on submit or click, bring up list of associated books
  $('#js-inputform').submit(function(e){
    e.preventDefault();
    const queryTarget = $(e.currentTarget).find('#js-searchfield');
    userSelectedSearchTerm  = queryTarget.val();
    googleList(userSelectedSearchTerm);
    
  });

  //get next set of books
  $(document).on('click','.js-nextlist', (function(event){
    event.preventDefault();
    console.log('event listener is working');
    listNext(userSelectedSearchTerm);
  }));

  //listener for book selection; on click, get information on selected book
  $(document).on('click', '.book', (function(e) {
    e.preventDefault();
    selectedBookId = $(e.currentTarget).find('.js-itemid').attr('data-bookId');
    googleBook(selectedBookId);
    
  }));

  //listener for back to list of books
  $(document).on('click', '.back-to-list', function(e){
    e.preventDefault();
    googleList(userSelectedSearchTerm);
  })

  //user clicks the footer to fire new search
  $('a#newsearch').click(function(e) {
    e.preventDefault();
    document.getElementById('js-inputform');
    $('html, body').animate({ scrollTop: $('header').offset().top});
    $('input#js-searchfield').focus();
  });

 //listener for youtube data
  $(document).on('click', '.sdyoutube', (function(e){
    e.preventDefault();
    //if the down-angle icon is visible, then go get the data and display
    if ($('#youtubeangledown').css('display')=='inline-block') {
      getYt(userSelectedSearchTerm);
      $('#youtubeangledown').css('display','none');
      $('#youtubeangleup').css('display','');
    // however, if the up-angle icon is visible, then remove all data and replace icon with the down-angle icon
    } else {
      $('.youtubeitem').remove();
      $('.js-nextyt').css('display','none');
      $('#youtubeangleup').css('display','none');
      $('#youtubeangledown').css('display','');
    };
  }));

//listener for news data
  $(document).on('click', '.sdnews', (function(e){
    e.preventDefault();
    //if the down-angle icon is visible, then go get the data and display
    if ($('#newsangledown').css('display')=='inline-block') {
      getNews(userSelectedSearchTerm);
      $('#newsangledown').css('display','none');
      $('#newsangleup').css('display','');
    // however, if the up-angle icon is visible, then remove all data and replace icon with the down-angle icon
    } else {
      $('.newsitem').remove();
      $('.js-nexnews').css('display','none');
      $('#newsangleup').css('display','none');
      $('#newsangledown').css('display','');
    };
  }));

//listener for wiki data
  $(document).on('click', '.sdwiki', (function(e){
    e.preventDefault();
    if ($('#wikiangledown').css('display')=='inline-block') {
      getWiki(userSelectedSearchTerm);
      $('#wikiangledown').css('display','none');
      $('#wikiangleup').css('display','');
    // however, if the up-angle icon is visible, then remove all data and replace icon with the down-angle icon
    } else {
      $('.wikiitem').remove();
      $('.js-nextwiki').css('display','none');
      $('#wikiangleup').css('display','none');
      $('#wikiangledown').css('display','');
    };
  }));



//get next set of you tube videos
  $(document).on('click','.js-nextyt', (function(event){
    event.preventDefault();
    ytNext(userSelectedSearchTerm);
  }));

//get next set of news articles
  $(document).on('click','.js-nextnews', (function(event){
    event.preventDefault();
    newsNext(userSelectedSearchTerm);
  }));

}

watchSubmit();