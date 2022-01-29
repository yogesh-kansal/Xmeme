module.exports={
    secretKey: process.env.SECRETKEY || '12344321',
    dburl: process.env.DBURL || 'mongodb://localhost:27017/memeHUB',
    serverUrl: process.env.BACKENDURL || 'http://localhost:3001',
    clientUrl: process.env.FRONTENDURL || 'http://localhost:3000',
    PORT: process.env.PORT || 3001,
};