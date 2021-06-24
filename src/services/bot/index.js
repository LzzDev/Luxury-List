const LuxuryClient = require( './lib/structures/Client.js' );
const bot = new LuxuryClient( {
    eventsPath: path.join( __dirname, 'events' )
} );

bot.login( settings.bot.token );



module.exports = bot;