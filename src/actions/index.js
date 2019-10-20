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
    const key = `api-key=${process.env.REACT_APP_NYT_API_KEY}`
    const base = `${process.env.REACT_APP_NYT_API_URL}q=travel&`

    fetch(`${base}${key}`)
      .then(res => res.json(),
        error => console.log('An error occurred.', error)
      )
      .then(data => {
        let articles = data.response.docs;
        //arrange by date
        let sortedData = articles.sort(function compare(a, b) {
          const date1 = new Date(a.updated_date);
          const date2 = new Date(b.updated_date);
          return date2 - date1;
        });
      dispatch(receivedArticles(sortedData))
    }) 
  }
}
