const { Client } = require( 'discord.js' );

const events = require( './events.js' );

module.exports = class LuxuryClient extends Client {
    constructor( { eventsPath } ) {
        super();
        
        this.events = new events( this, { eventsPath } );
    };
};