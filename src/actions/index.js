import fetch from "cross-fetch";

export const receivedArticles = articles => {
  return {
    type: "RECEIVED_ARTICLES",
    articles
  }
}

export const updateServiceWorker = status => {
  return {
    type: "USER_APPROVED_UPDATE",
    status
  }
}

export const swUpdateAvailable = update => {
  return {
    type: "SW_UPDATE_AVAILABLE",
    update
  }
}

export const fetchArticles = () => {
  return dispatch => {
    const key = "api-key=de5dfac7dbea4088a900c7b2d5b41369"
    const base = "https://api.nytimes.com/svc/"

    fetch(`${base}topstories/v2/travel.json?${key}`)
      .then(res => res.json(),
        error => console.log('An error occurred.', error)
      )
      .then(data => {
      //arrange by date
      let sortedData = data.results.sort(function compare(a, b) {
          const date1 = new Date(a.updated_date);
          const date2 = new Date(b.updated_date);
          return date2 - date1;
      });
      dispatch(receivedArticles(sortedData))
    }) 
  }
}
