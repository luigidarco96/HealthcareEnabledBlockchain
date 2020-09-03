const bcrypt = require('bcrypt');

async function encrypt(password) {
    var hashedPassword
    
    try {
        const salt = await bcrypt.genSalt();
        hashedPassword = await bcrypt.hash(password, salt);
    } catch {
        console.log('Error while encrypting');
    }

    console.log(hashedPassword);
}

var password = process.argv.slice(2)[0];
encrypt(password);