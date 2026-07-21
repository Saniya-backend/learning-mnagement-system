const bcrypt = require("bcryptjs");

bcrypt.hash("Admin4744@", 10).then((hash) => {
    console.log(hash);
});