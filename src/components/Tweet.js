import React from 'react';
import { defaultImgs } from '../defaultimgs';
import { Icon } from 'web3uikit';

const Tweet = ({ tweet }) => {
  return (
    <div className="feedTweet">
      <img
        src={tweet.tweeterPfp ? tweet.tweeterPfp : defaultImgs[0]}
        className="profilePic"
      ></img>
      <div className="completeTweet">
        <div className="tweetContent">
          {tweet.tweetText}
          {tweet.tweetImage && tweet.tweetImage != 'No Img' && (
            <img src={tweet.tweetImage} className="tweetImage"></img>
          )}
        </div>
        <div className="interactions">
          <div className="interactionNums">
            <Icon fill="#3f3f3f" size={20} svg="messageCircle" />
          </div>
          <div className="interactionNums">
            <Icon fill="#3f3f3f" size={20} svg="star" />
            12
          </div>
          <div className="interactionNums">
            <Icon fill="#3f3f3f" size={20} svg="matic" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tweet;
