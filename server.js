'use strict';

var config = require('./config/config'),
	chalk = require('chalk'),
	express = require('express'),
	expressBase = require('express-base'),
	userAuth = require('express-user-auth'),
	mongoose = require('mongoose'),
	path = require('path'),
	nodemailer = require('nodemailer'),
	smtpTransport = require('nodemailer-smtp-transport');

expressBase.init(config.expressBase, function(app) {

	mongoose.connect(config.mongoose.URI);

	var mailer = nodemailer.createTransport(smtpTransport(config.mailer));

	userAuth.init(app, require('./app/models/user'), config.expressUserAuth, mailer);

	expressBase.setMailerService(mailer);

	expressBase.getGlobbedFiles('./app/models/*.js').forEach(function(routePath) {
		require(path.resolve(routePath));
	});

	expressBase.initDynamicRouter(mongoose.connection, config.expressBase.dynamicRouter);

	app.use('/api/v1/images', express.static('./app/images'));

	if (process.send) process.send('online');

	process.on('message', function(message) {
		if (message === 'shutdown') {
			performCleanup();
			process.exit(0);
		}
	});

	console.log(chalk.green.bgBlue.bold(config.appTitle + ' serveur écoute maintenant sur le port ' + config.expressBase.port));
});