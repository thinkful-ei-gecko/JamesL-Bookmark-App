"use strict";

const Item = (function(){
  const validateLink = function(link){
    if(link ==='') throw new TypeError('Please enter valid link');
  };
  const create = function(title, url, desc, rating){
    return {
      title,
      url,
      desc,
      rating,
      expanded: false
    };
  };
  return {
    create,
    validateLink
  };
}());