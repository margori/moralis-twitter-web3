import React from 'react';
import './TweetInFeed.css';
import { useMoralis } from 'react-moralis';
import { useEffect, useState } from 'react';
import Tweet from './Tweet';

const TweetInFeed = ({ profile }) => {
  const [tweetArr, setTweetArr] = useState();
  const { Moralis, account } = useMoralis();

  useEffect(() => {
    async function getTweets() {
      console.log(`getTweets`);
      try {
        const Tweets = Moralis.Object.extend('Tweets');
        const query = new Moralis.Query(Tweets);
        if (profile) {
          query.equalTo('tweeterAcc', account);
        }
        const results = await query.find();

        setTweetArr(results);
        console.log(results);
      } catch (error) {
        console.error(error);
      }
    }
    getTweets();
  }, [profile]);

  return <>{tweetArr?.map((e) => <Tweet tweet={e} />).reverse()}</>;
};

export default TweetInFeed;
