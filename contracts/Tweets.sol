// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract Tweets {
    address public owner;
    uint256 private counter;

    constructor() {
        owner = msg.sender;
        counter = 0;
    }

    struct Tweet {
        address tweeter;
        uint256 id;
        string tweetText;
        string tweetImage;
    }

    event TweetCreated(
        address tweeter,
        uint256 id,
        string tweetText,
        string tweetImage
    );

    mapping(uint256 => Tweet) tweets;

    function addTweet(string memory _tweetText, string memory _tweetImage)
        public
        payable
    {
        require(msg.value == (0.01 ether), "Please submit 1 Matic");

        Tweet storage newTweet = tweets[counter];

        newTweet.tweeter = msg.sender;
        newTweet.tweetText = _tweetText;
        newTweet.tweetImage = _tweetImage;
        newTweet.id = counter;

        emit TweetCreated(msg.sender, counter, _tweetText, _tweetImage);

        counter++;

        payable(owner).transfer(msg.value);
    }

    function getTweet(uint256 id)
        public
        view
        returns (
            string memory,
            string memory,
            address
        )
    {
        require(id < counter, "No such Tweet");
        Tweet storage tweet = tweets[id];
        return (tweet.tweetText, tweet.tweetImage, tweet.tweeter);
    }
}
