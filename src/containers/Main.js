import React, { Component } from 'react';
import {Container, Header, Segment} from "semantic-ui-react";
import {connect} from 'react-redux';
import {fetchArticles, updateServiceWorker} from "../actions";
import NewsFeed from "../components/NewsFeed";
import moment from "moment";
import ShowMessage from "../components/ShowMessage";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: "https://upload.wikimedia.org/wikipedia/commons/4/40/New_York_Times_logo_variation.jpg",
    };
  }

  componentDidMount(){
    this.props.getArticles();
  }

  render() {
    const {image} = this.state;
    const {
      articles, 
      swUpdateAvail, 
      userSwUpdateSelection,
      updateStatus
    } = this.props;

    let feed = articles.map((article, i) => {
      const {web_url, lead_paragraph, multimedia, abstract, updated_date } = article;
      
      //Handle when no article image is present in API
      return (
        <NewsFeed
          key={i} 
          url={web_url}
          articleTitle={lead_paragraph}
          articleNumber={i+1} 
          articleImage={multimedia.length && multimedia[0].url ? `https://static01.nyt.com/${multimedia[0].url}` : image}
          description={abstract} 
          image= {image}
          date={moment(updated_date).fromNow()}
        />
      )   
    });
    return (
      <Container textAlign="center" style={{marginTop: "20px"}}>
        {swUpdateAvail && userSwUpdateSelection !== false &&
          <ShowMessage updateStatus={(status) => updateStatus(status)}/>
        }
        <Header as="h1"> Practicing Service Workers </Header>
        <Header as="h3"  attached="top"> 
          New York Times: Top Stories - Travel
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
  articles: state.articles,
  swUpdateAvail: state.swUpdateAvail,
  userSwUpdateSelection: state.userSwUpdateSelection
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  getArticles() {
    return dispatch(fetchArticles());
  },
  updateStatus(status) {
    return dispatch(updateServiceWorker(status));
  }
});

export default connect(mapStateToProps, mapDispatchToProps) (Main);
