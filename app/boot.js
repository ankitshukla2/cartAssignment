/*
 * Boot File
 * Project : Shopping Bag
 * Date : 09-09-2011
 * Author : Ankit Shukla
 * Dependency : server.js,route.js
 */


'use strict';

module.exports = function(config, nunjucks, express) {
    var app = express();
    app.use(express.static(config.staticFolder));

    //Set up views path with template engine nunjucks
    var env = nunjucks.configure('app/views', {
        autoescape: true,
        express: app
    });

    //Passing the app object to route module
    require('./routes.js')(app);

    return app;
};