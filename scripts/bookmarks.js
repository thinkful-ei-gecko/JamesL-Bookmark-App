'use strict'

const bookmarks = (function(){

  const renderBookmarks = function(bookmarks){
    const bookmarksHtml = bookmarks.map(bookmark => {
      return generateHtmlBookmark(bookmark);
    }).join('')
    $('.js-bookmark-list').html(bookmarksHtml);
  };

  const generateHtmlBookmark = function(bookmark){
    if(bookmark.expanded === true){
      return `
        <li id="bookmark-element" data-item-id="${bookmark.id}">
          <span class="bookmark-title">${bookmark.title}</span>
          <button class="details">Details</button>
          <span class="rating">Rating: ${bookmark.rating}</span>
          <span class="description">Description: ${bookmark.desc}</span>
          <span class="bookmark-url">Visit website: ${bookmark.url}</span>
          <button class="delete-bookmark">Delete</button>
        </li>
      `
    }
    else{
      return `
      <li id="bookmark-element" data-item-id="${bookmark.id}">
          <span class="bookmark-title">${bookmark.title}</span>
          <button class="details">Details</button>
          <span class="rating">Rating: ${bookmark.rating}</span>
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
            <label for="title">Title:</label>
            <input id="title" name="title" type="text" placeholder="Title" required="true" />
          </div>
          <div class="input-group">
            <label for="url-input">URL:</label>
            <input id="url-input" name="url" type="url" placeholder="https://example.com" />
          </div>
          <div class="input-group">
            <label for="description">Description:</label>
            <input id="description" name="desc" type="text" placeholder="Add description here" />
          </div>
          <form class="input-group" role"radiogroup">
            Rating: 
            <input type="radio" name="rating" role="radio" id="bookmark-rating" value="5" checked>5 Stars
            <input type="radio" name="rating" role="radio" id="bookmark-rating" value="4">4 Stars
            <input type="radio" name="rating" role="radio" id="bookmark-rating" value="3">3 Stars
            <input type="radio" name="rating" role="radio" id="bookmark-rating" value="2">2 Stars
            <input type="radio" name="rating" role="radio" id="bookmark-rating" value="1">1 Star
          </form>

          <div class="error-display"></div>
          <div class="submit-input">
            <input type="submit" value="Add" />
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
          $('#title').val('');
          $('#url-input').val('');
          $('#description').val('');
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
        })
    })
  }

  const bindEventListeners = function(){
    addBookmarkToggle(),
    handleBookmarkSubmit(),
    handleExpandDetails(),
    handleDeleteBookmark()
  }
  return {
    bindEventListeners,
    renderBookmarks,
  }
}());