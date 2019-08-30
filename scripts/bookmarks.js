'use strict'

const bookmarks = (function(){

 
  const renderBookmarks = function(bookmarks){
    $('.error-message').empty();
    if(store.error.message){
      $('.error-message').append(store.error.message);
      store.error.message = null;
    };
    const bookmarksHtml = bookmarks.map(bookmark => {
      return generateHtmlBookmark(bookmark);
    }).join('')
    $('.js-bookmark-list').html(bookmarksHtml);

  };



  const generateHtmlBookmark = function(bookmark){
    if(bookmark.expanded === true){
      return `
        <li id="bookmark-element" data-item-id="${bookmark.id}">
          <div class="section">
            <span class="bookmark-title"><span class="refer">Title: </span>${bookmark.title}</span>
            <span class="rating"><span class="refer">Rating: </span>${bookmark.rating} stars</span><br>
          </div>
          <div class="section">  
            <span class="description"><span class="refer">Description: </span>${bookmark.desc}</span><br>
          </div>
          <div class="section">
            <span class="bookmark-url"><span class="refer">Visit website: </span><a class="links" href="url">${bookmark.url}</a></span><br>
          </div>
            <button class="details">Details</button>
          <button class="delete-bookmark">Delete</button>
        </li>
      `
    }
    else{
      return `
      <li id="bookmark-element" data-item-id="${bookmark.id}">
          <span class="bookmark-title"><span class="refer">Title: </span>${bookmark.title}</span>
          <span class="rating"><span class="refer">Rating: </span>${bookmark.rating} stars</span><br>
          <button class="details">Details</button>
      </li>
    `}
  }

  const generateBookmarkElement = function(){
    if(store.adding === false){
      return '';
    }
    else{
      return `
      <form class="bookmark-creator">
        <fieldset>
          <legend>Create a Bookmark:</legend>
          <div class="input-group">
            <label for="title">Title:  </label>
            <input id="title" name="title" type="text" placeholder="Title" required="true" aria-required="true"/>
          </div>
          <div class="input-group">
            <label for="url-input">URL:  </label>
            <input id="url-input" name="url" type="url" placeholder="https://example.com" aria-required="true" />
          </div>
          <div class="input-group">
            <label for="description">Description:  </label>
            <input id="description" name="desc" type="text" placeholder="optional" aria-required="false" />
          </div>
          <form class="input-group" role="radiogroup">
            Rating: <br>
            <input type="radio" name="rating" role="radio" id="bookmark-rating" value="5" checked>5 Stars
            <input type="radio" name="rating" role="radio" id="bookmark-rating" value="4">4 Stars
            <input type="radio" name="rating" role="radio" id="bookmark-rating" value="3">3 Stars
            <input type="radio" name="rating" role="radio" id="bookmark-rating" value="2">2 Stars
            <input type="radio" name="rating" role="radio" id="bookmark-rating" value="1">1 Star
          </form>

          <div class="error-display"></div>
          <div class="submit-input">
            <button type="submit">Add</button>
          </div>
        </fieldset>
      </form>
    `
    };
  };

  function serializeJson(form) {
    const formData = new FormData(form);
    const obj = {};
    formData.forEach((val, name) => obj[name] = val);
    return JSON.stringify(obj);
  }

  const addBookmarkToggle = function(){
    $('.addBookmark').on('click', (e) =>{
      e.preventDefault();
      store.adding = !store.adding;
      $('.add-bookmark-form').html(generateBookmarkElement);
    });
  };

  const handleBookmarkSubmit = function(){
    $('.add-bookmark-form').on('submit', (e) => {
      e.preventDefault();
      const formData = $('.bookmark-creator')[0];
      const jsonObj = serializeJson(formData);
      api.createBookmark(jsonObj)
        .then((bookmarkElements) => {
          store.addBookmark(bookmarkElements);
          renderBookmarks(store.bookmarks);
          $('.bookmark-creator')[0].reset();
        })
        .catch((err) => {
          store.alertError(err.message);
          $('.error-message').empty();
          renderBookmarks(store.bookmarks);
        });
    });
  };

  const handleExpandDetails = function(){
    $('.js-bookmark-list').on('click', '.details', (e) => {
      e.preventDefault();
      const bookmarkId = $(e.currentTarget).closest('#bookmark-element').attr('data-item-id');
      const findBookmarkId = store.findBookmarkById(bookmarkId);
      findBookmarkId.expanded = !findBookmarkId.expanded;
      renderBookmarks(store.bookmarks);
    });
  };

  const handleDeleteBookmark = function(){
    $('.js-bookmark-list').on('click', '.delete-bookmark', (e) => {
      const bookmarkId = $(e.currentTarget).closest('#bookmark-element').attr('data-item-id');
      api.deleteBookmark(bookmarkId)
        .then(() => {
          store.removeBookmark(bookmarkId);
          renderBookmarks(store.bookmarks);
        });
    });
  };

  const handleVisitWebsite = function(){
    $('.js-bookmark-list').on('click', '.links', function(e){
      e.preventDefault();
      const bookmarkId = $(e.currentTarget).closest('#bookmark-element').attr('data-item-id');
      const findBookmarkId = store.findBookmarkById(bookmarkId)
      const visitSiteLink = findBookmarkId.url;
      window.open(visitSiteLink);
    });
  };

  const generateBookmarkString = function (bookmarkList) {
    const items = bookmarkList.map((item) => generateHtmlBookmark(item));
    return items.join('');
  };  

  const handleRatingFilter = function(){
    $('#ratingSelect').change(e => {
      e.preventDefault();
      const selectedRating = $('#ratingSelect option:selected').val();
      console.log(selectedRating)
      if(selectedRating === ""){
        renderBookmarks(store.bookmarks)
      }
      const filteredBookmarks = store.bookmarks.filter(x => x.rating >= selectedRating);
      const filteredList = generateBookmarkString(filteredBookmarks);
      $('.js-bookmark-list').html(filteredList);
    });
  };



  const bindEventListeners = function(){
    addBookmarkToggle(),
    handleBookmarkSubmit(),
    handleExpandDetails(),
    handleDeleteBookmark(),
    handleVisitWebsite(),
    handleRatingFilter()
  }
  return {
    bindEventListeners,
    renderBookmarks,
  }
}());