'use strict';

$(document).ready(function(){
  bookmarks.bindEventListeners();
  api.getBookmarks()
  .then(response => response.json())
  .then(items => {
      items.forEach(item => store.addBookmark(item));
      bookmarks.renderBookmarks(store.bookmarks);
  })
});

