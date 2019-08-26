
const api = (function(){
  const baseUrl = 'https://thinkful-list-api.herokuapp.com/jamesl/bookmarks'
  
  function listApiFetch(...args) {
    let error;
    return fetch(...args)
      .then(res => {
        if (!res.ok) {
          // Valid HTTP response but non-2xx status - let's create an error!
          error = { code: res.status };
        }
  
        // In either case, parse the JSON stream:
        return res.json();
      })
  
      .then(data => {
        // If error was flagged, reject the Promise with the error object
        if (error) {
          error.message = data.message;
          return Promise.reject(error);
        }
  
        // Otherwise give back the data as resolved Promise
        return data;
      });
  }

  const getBookmarks = function(){
    return fetch(baseUrl)
  };

  const createBookmark = function(name){
    let newData = JSON.stringify({
      name,
    });
    return listApiFetch(`${baseUrl}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: newData
    });
  };

  const updateBookmark = function(id, updateItem){
    let newData = JSON.stringify(updateItem);
    return listApiFetch(`${baseUrl}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'applicatin/json'
      },
      body: newData
    });
  };

  const deleteBookmark = function(id){
    return listApiFetch(`${baseUrl}`, {
      method: 'DELETE'
    });
  };

  return{
    getBookmarks,
    createBookmark,
    updateBookmark,
    deleteBookmark
  };
}());