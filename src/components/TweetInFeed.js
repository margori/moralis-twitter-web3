import React from 'react';
import './TweetInFeed.css';
import { useMoralis, useWeb3ExecuteFunction } from 'react-moralis';
import { useEffect, useState } from 'react';
import Tweet from './Tweet';
import config from '../config.json';

const PAGE_SIZE = 6;

const getCounter = async (contractProcessor) => {
  console.log(`getCounter`);
  let options = {
    contractAddress: config.contractAddress,
    functionName: 'counter',
    abi: [
      {
        inputs: [],
        name: 'counter',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    params: {},
  };

  const counter = await contractProcessor.fetch({
    params: options,
    onSuccess: () => {
      console.log('fetch counter success');
    },
    onError: (error) => {
      console.log(error);
    },
  });

  if (counter) {
    console.log('counter: ', counter.toNumber());
    return counter.toNumber();
  }
  return 0;
};

const getTweet = async (contractProcessor, id) => {
  console.log(`getTweet id: ${id}`);
  let options = {
    contractAddress: config.contractAddress,
    functionName: 'getTweet',
    abi: [
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
        ],
        name: 'getTweet',
        outputs: [
          {
            internalType: 'string',
            name: 'tweetText',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'tweetImage',
            type: 'string',
          },
          {
            internalType: 'address',
            name: 'tweeter',
            type: 'address',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    params: {
      id,
    },
  };

  const tweet = await contractProcessor.fetch({
    params: options,
    onSuccess: () => {
      console.log('fetch tweet success');
    },
    onError: (error) => {
      console.log(error);
    },
  });
  console.log('tweet: ', tweet);
  return tweet;
};

const getTweets = async (contractProcessor) => {
  console.log(`getTweets`);
  const counter = await getCounter(contractProcessor);
  if (counter < 1) {
    return [];
  }
  const firstIndex = Math.max(counter - PAGE_SIZE, 0);
  const lastIndex = counter - 1;

  const tweets = [];

  for (let i = firstIndex; i <= lastIndex; i++) {
    const tweet = await getTweet(contractProcessor, i);
    console.log(tweet);
    tweets.push(tweet);
  }
  console.log(tweets);

  return tweets;
};

const TweetInFeed = ({ profile }) => {
  const [tweetArr, setTweetArr] = useState();
  const { Moralis } = useMoralis();
  const user = Moralis.User.current();
  const contractProcessor = useWeb3ExecuteFunction();

  useEffect(() => {
    getTweets(contractProcessor).then((results) => {
      setTweetArr(results);
    });
  }, [profile]);

  console.log(`tweetArr`, tweetArr);

  return <>{tweetArr?.map((e,id) => <Tweet key={id} tweet={e} />).reverse()}</>;
};

export default TweetInFeed;
