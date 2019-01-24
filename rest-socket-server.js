const SocketServer = require('socket.io');
const logger = require('log4js').getLogger('app');

class RestSocketServer {

    constructor(fabricStarterClient) {
        this.fabricStarterClient = fabricStarterClient;
    }

    async startSocketServer(server) {
        this.io = new SocketServer(server, {origins: '*:*'});
        const channels = await this.fabricStarterClient.queryChannels();

        channels.map(c => {
            return c.channel_id;
        }).forEach(async channelId => {
            await this.updateServer(channelId);
        });
    }

    async updateServer(channel) {

        await this.fabricStarterClient.registerBlockEvent(channel, block => {
            logger.debug(`block ${block.number} on ${block.channel_id}`);
            this.io.emit('chainblock', block);
        }, e => {
            logger.error('registerBlockEvent', e);
        });
        logger.debug(`registered for block event on ${channel}`);
    }
}

module.exports = RestSocketServer;
