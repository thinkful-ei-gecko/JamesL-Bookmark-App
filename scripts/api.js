
const api = (function(){
  const baseUrl = 'https://thinkful-list-api.herokuapp.com/jameslee/bookmarks'
  
  function listApiFetch(...args) {
    let error;
    return fetch(...args)
      .then(res => {
        if (!res.ok) {
          // Valid HTTP response but non-2xx status - let's create an error!
          error = { code: res.status };
        };
  
        // In either case, parse the JSON stream:
     
        return res.json();
      })
  
      .then(data => {
        // If error was flagged, reject the Promise with the error object
        if (error) {
          error.message = data.message;
          return Promise.reject(error);
        };
  
        // Otherwise give back the data as resolved Promise
       
        return data;
      });
  }

  const getBookmarks = () => {
    return fetch(baseUrl)
  }

  const createBookmark = function(data){
    return listApiFetch(`${baseUrl}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: data
    });
  };

  // const updateBookmark = function(id, updateItem){
  //   return listApiFetch(`${baseUrl}`, {
  //     method: 'PATCH',
  //     headers: {
  //       'Content-Type': 'applicatin/json'
  //     },
  //     body: newData
  //   });
  // };

  const deleteBookmark = function(id){
    return listApiFetch(`${baseUrl}/${id}`, {
      method: 'DELETE'
    });
  };

  return{
    getBookmarks,
    createBookmark,
    // updateBookmark,
    deleteBookmark
  };
}());