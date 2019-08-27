'use strict';

const store = (function(){
  const bookmarks= [];
  let adding=false;
  let editing=null; //should contain id of bookmark selected for editing
  let minRating=null; //once minRating is set, filter bookmark based on rating
  
  // const _toStore = function(bookmark){
  //   return Object.assign(bookmark, {
  //     expanded: false, //when true, render full information of bookmark

  //   })
  // }

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
    editing,
    minRating,
    findBookmarkById,
    addBookmark,
    removeBookmark,
    
  }
}());