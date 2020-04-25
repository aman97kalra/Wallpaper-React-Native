export const shortID = ( length = 8, numbersOnly = false ) => {
    const vocab = numbersOnly ? '1234567890' : 'qwertyuiopasdfghjklzxcvbnm1234567890';
    let id = '';
    for( let i=0; i<length; i = i + 1 ) {
        const pos = Math.floor( Math.random() * vocab.length );
        id = id + vocab[ pos ];
    }
    return id;
};
