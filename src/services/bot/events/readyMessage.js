module.exports = bot => {
    function log( seperator, args ) {
        if ( typeof args != 'object') throw new TypeError( 'args must be typeof object' );

        function logArray( arr ) {
            return arr
                .map( ( l, i, arr ) => arr.indexOf( l ) == 0 ? l : `   ${ l }` )
                .join( '\n' );
        };

        args = args
            .map( arg => typeof arg == 'object' ? logArray( arg ) : arg )
            .join( `\n${ seperator }\n` );
        
        console.log( args );
    };

    const mainGuildMembers = bot.guilds.cache.get( settings.guilds.main )?.members?.cache;
    const filterMembers = filter => mainGuildMembers?.filter( filter )?.size ?? 0;

    log( '_____________________', [
        `[LuxuryList - Bot] ${ bot.user.tag } is online`,
        [
            'Bot:',
            `${ bot.guilds.cache.size } guilds`,
            `${ bot.users.cache.size } users`
        ],
        [
            'LuxuryList:',
            `${ 'a' } approved bots`,
            `384 denied bots`
        ],
        [
            'LuxuryList Discord:',
            `${ mainGuildMembers.size } members`,
            `${ filterMembers( mem => mem.user.bot == false ) } humans`,
            `${ filterMembers( mem => mem.user.bot ) } bots`
        ]
    ] );
};


module.exports.config = {
    event:    'ready',
    disabled: false
};