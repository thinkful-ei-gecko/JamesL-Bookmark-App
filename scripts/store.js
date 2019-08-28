'use strict';

const store = (function(){
  const bookmarks= [];
  let adding=false;
  //let editing=null; 

  const findBookmarkById = function(id){
    return this.bookmarks.find(bookmark => bookmark.id === id);
  };


  
  const addBookmark = function(bookmark){
    this.bookmarks.push(bookmark);
  };

  const removeBookmark = function(id){
    this.bookmarks = this.bookmarks.filter(item => item.id !== id)
  }

  return {
    bookmarks,
    adding,
    // editing,
    findBookmarkById,
    addBookmark,
    removeBookmark,
    
  }
}());