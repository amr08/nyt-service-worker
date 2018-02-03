import React, { Component } from 'react';
import {Container} from "semantic-ui-react";
import NewsFeed from "../components/NewsFeed";

class Main extends Component {
	constructor(props) {
    super(props);
    //Placeholder data
    this.state = {
      articleTitle: "Title",
      description: "Description of article content",
      articleNumber: ["Article 1", "Article 2", "Article 3", "Article 4"],
      image: "https://thenypost.files.wordpress.com/2017/08/parrot.jpg?quality=90&strip=all&w=664&h=441&crop=1",
      articleImage: "https://www.seoclerk.com/pics/346493-2ufWRv1427249947.jpg",
      date: "1 hour ago"
    };
  }

  render() {
  	const {
  		articleTitle, 
  		description, 
  		articleNumber, 
  		image,
  		articleImage,
  		date
  	} = this.state;

  	let feed = articleNumber.map((number, i) => (
	   	<NewsFeed
	      key={i} 
	      articleTitle={articleTitle}
	      articleNumber={number} 
	      articleImage={articleImage}
	      description={description} 
	      image= {image}
	      date={date}
	     />
    ));
    return (
      <Container textAlign="center">
        <h1> Practicing Service Workers </h1>
        {feed}
      </Container>
    );
  }
}

export default Main;
