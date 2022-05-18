//index.js
const db = require("./db");

//index.js
(async () => {
    const db = require("./db");
    console.log('Começou!');

    console.log('select quee irá testar');
    const user = await db.selectUser();
    console.log(user);
})();