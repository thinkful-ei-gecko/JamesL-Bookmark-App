'use strict';

const store = (function(){
  const error = {
    message: null
  };
  const bookmarks= [];
  let adding=false;

  const findBookmarkById = function(id){
    return this.bookmarks.find(bookmark => bookmark.id === id);
  };


  
  const addBookmark = function(bookmark){
    this.bookmarks.push(bookmark);
  };

  const removeBookmark = function(id){
    this.bookmarks = this.bookmarks.filter(item => item.id !== id)
  }

  const alertError = function(errMessage){
    error.message = errMessage;
  }

  return {
    bookmarks,
    adding,
    // editing,
    findBookmarkById,
    addBookmark,
    removeBookmark,
    error,
    alertError
  }
}());