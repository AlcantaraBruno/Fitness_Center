const YouTube = require('youtube-node');
const config = require('./yt-config.json');

const youtube = new YouTube();
youtube.setKey(config.key);

function searchVideosURL(message, queryText){
    return new Promise((resolve, reject) => {
        youtube.search(`Exercicio em casa para bíceps ${queryText}`, 2, function(error, result){
            if(!error){
                const videoIds = result.items.map((item) => item.id.videoId).filter(item => item);
                const youtubeLinks = videoIds.map(videosId => `https://www.youtube.com/watch?v=${videosId}`);
                resolve(`${message} ${youtubeLinks.join(`, `)}`);
        
            }else {
                reject('Deu erro');
                  
            }
        });
    });
   
};

module.exports.searchVideosURL = searchVideosURL;
