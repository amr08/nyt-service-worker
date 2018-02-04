import React, { Component } from 'react';
import {Container, Header, Segment} from "semantic-ui-react";
import {connect} from 'react-redux';
import {fetchArticles} from "../actions";
import NewsFeed from "../components/NewsFeed";
import moment from "moment";

class Main extends Component {
  constructor(props) {
    super(props);
    //Placeholder data
    this.state = {
      image: "https://upload.wikimedia.org/wikipedia/commons/4/40/New_York_Times_logo_variation.jpg",
    };
  }

  componentDidMount(){
    this.props.getArticles();
  }

  render() {
    const {image} = this.state;
    const {articles} = this.props;

    let feed = articles.map((article, i) => (
      <NewsFeed
        key={i} 
        articleTitle={article.title}
        articleNumber={i+1} 
        articleImage={article.multimedia[1].url}
        description={article.abstract} 
        image= {image}
        date={moment(article.updated_date).fromNow()}
       />
    ));
    return (
      <Container textAlign="center" style={{marginTop: "20px"}}>
        <Header as="h1"> Practicing Service Workers </Header>
        <Header as="h3"  attached="top"> 
          New York Times - Travel's Top Stories
          <Container style={{fontSize: "12px"}} textAlign="right">
          Results: {articles.length}
          </Container> 
        </Header>
        <Segment attached>
          {feed}
        </Segment>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  articles: state
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  getArticles() {
    return dispatch(fetchArticles());
  }
});

export default connect(mapStateToProps, mapDispatchToProps) (Main);
