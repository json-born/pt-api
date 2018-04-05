const faker = require('faker');
const youtube = require('youtube-random-video');
const database = require('../../dist/lib/database').database;

module.exports = {
    reset: reset,
    seed: seed
}

async function reset() {
    await database('media').del();
}

async function seed(trainerId, clientIds) {
    for (let clientId of clientIds) {
        const videoData = await getRandomVideo();
        const mediaUrl = `https://www.youtube.com/watch?v=${videoData['id'].videoId}`;

        await database('media').insert({
            media_url: mediaUrl,
            comment: faker.lorem.sentence(),
            client_id: clientId,
            trainer_id: trainerId
        });   
    }
}

function getRandomVideo() {
    return new Promise((resolve, reject) => {
        youtube.getRandomVid(process.env.YOUTUBE_API_KEY, (error, result) => {
            if(!error) { resolve(result); }
            else { reject(error) }
        });
    });
}
