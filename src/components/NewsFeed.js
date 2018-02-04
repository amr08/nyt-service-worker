import React, { Component } from 'react';
import {Feed, Icon} from 'semantic-ui-react'

const NewsFeed = (props) => (
	<Feed>
		<Feed.Event>
		  <Feed.Label>
		    <img src={props.image} />
		  </Feed.Label>
		  <Feed.Content>
		    <Feed.Summary>
		      <Feed.User>{props.articleTitle}</Feed.User> 
		    	<Feed.Date>{props.date}</Feed.Date>
		    </Feed.Summary>
		    <Feed.Extra text>
        	{props.description}
       	</Feed.Extra>
		    <Feed.Extra images>
         	<a><img src={props.articleImage} /></a>
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
