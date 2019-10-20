import React from 'react';
import {Feed, Icon} from 'semantic-ui-react'

const NewsFeed = (props) => (
  <Feed>
    <Feed.Event>
      <Feed.Label>
        <img alt="profile" src={props.image} />
      </Feed.Label>
      <Feed.Content>
        <Feed.Summary>
          <Feed.User href={props.url} target="_blank">{props.articleTitle}</Feed.User> 
          <Feed.Date>{props.date}</Feed.Date>
        </Feed.Summary>
        <Feed.Extra text>
          {props.description}
        </Feed.Extra>
        <Feed.Extra images>
          <a href={props.url} target="_blank"><img alt={props.articleTitle} src={props.articleImage} /></a>
        </Feed.Extra>
        <Feed.Meta>
          <Feed.Like>
            <Icon name='like' />
               4 Likes
          </Feed.Like>
        </Feed.Meta>
      </Feed.Content>
    </Feed.Event>
  </Feed>
);

export default NewsFeed;