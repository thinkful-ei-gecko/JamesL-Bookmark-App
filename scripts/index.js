'use strict';

$(document).ready(function(){
  api.getBookmarks()
  .then(res => res.json())
  .then(bookmarks => bookmarks.forEach(bookmark => {
    store.addBookmark(bookmark);
    bookmarks.render();
  }));
})

