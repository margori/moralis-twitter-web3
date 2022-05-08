import React from 'react';
import { defaultImgs } from '../defaultimgs';
import { Icon } from 'web3uikit';

const Tweet = ({ tweet }) => {
  return (
    <div className="feedTweet">
      <img
        src={
          tweet.attributes.tweeterPfp
            ? tweet.attributes.tweeterPfp
            : defaultImgs[0]
        }
        className="profilePic"
      ></img>
      <div className="completeTweet">
        <div className="who">
          {tweet.attributes.tweeterUserName.slice(0, 6)}
          <div className="accWhen">
            {`${tweet.attributes.tweeterAcc.slice(
              0,
              4
            )}...${tweet.attributes.tweeterAcc.slice(38)} · 
                        ${tweet.attributes.createdAt.toLocaleString('en-us', {
                          month: 'short',
                        })}  
                        ${tweet.attributes.createdAt.toLocaleString('en-us', {
                          day: 'numeric',
                        })}
                        `}
          </div>
        </div>
        <div className="tweetContent">
          {tweet.attributes.tweetTxt}
          {tweet.attributes.tweetImg && (
            <img src={tweet.attributes.tweetImg} className="tweetImg"></img>
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
