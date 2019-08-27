'use strict'

//populateStoreBookmarks
const populateStore = function(bookmarks){
  store.bookmarks = bookmarks;
  renderBookmarks();
}

const renderBookmarks = function(bookmarks){
  const bookmarksHtml = store.bookmarks.map(bookmark => {
    generateHtmlBookmark(bookmark);
  }).join('')

  $('body').html(bookmarksHtml);
};

const generateHtmlBookmark = function (bookmark){
  return `
    <div>${bookmark.title}</div> 
  `
}