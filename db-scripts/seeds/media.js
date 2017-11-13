const faker = require('faker');
const youtube = require('youtube-random-video');
const database = require('../../dist/lib/database').database;

async function reset() {
    await database('media').del();
}

async function seed(count = 10) {

    const trainer = await database
        .select()
        .from('users')
        .where('type', 'trainer')
        .first();
    
    const clients = await database
        .select()
        .from('users')
        .where('type', 'client');

    for (let client of clients) {
        for (let i = 0; i < count; i++) {
            const videoData = await getRandomVideo();
            const mediaUrl = `https://www.youtube.com/watch?v=${videoData['id'].videoId}`;

            await database('media')
                .insert({
                    media_url: mediaUrl,
                    comment: faker.lorem.sentence(),
                    client_id: client.id,
                    trainer_id: trainer.id
                })
        }
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

module.exports = {
    reset: reset,
    seed: seed
}