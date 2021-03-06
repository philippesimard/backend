'use strict';

module.exports = {

	appTitle: 'Alliés',

	apiRoot: 'api/v1',

	expressBase: {

		port: process.env.PORT || 9001,

		dynamicRouter: {
			useAutorizations: true,
			apiRoot: 'api/v1'
		},

		mailer: {
			url: 'api/v1/mailer',
			addresses: {
				'info': 'info@acommealliees.ca'
			}
		}
	},

	mongoose: {

		URI: process.env.mongoURI ||  'mongodb://localhost/allies'

	},

	expressUserAuth: {

		resetPassword: {
			mailOptions: {
				from: 'Gris Québec ✔ <nepasrepondre@grisquebec.org>',
				subject: 'Réinitialisation de votre mot de passe'
			},
			template: 'templates/resetEmail.html'
		},

		confirmEmail: {
			mailOptions: {
				from: 'Gris Québec ✔ <nepasrepondre@grisquebec.org>',
				subject: 'Confirmation de votre courriel'
			},
			template: 'templates/confirmationEmail.html'
		},

		signup: {
		//	sendConfirmationEmail: true,
		},

		userApi: {
			//hideUserIds: ['55eb0075b2996d900ef8879a'],
			userCreationRoles: ['admin'],
			permissions: {
				admin: 'all',
				user: ['READ-OWN', 'UPDATE-OWN']
			},
		},

		token: {

			options: {
				expiresInMinutes: 1440
			},
			secret: '7279BEE6EBCC80400E2CED8D12D0591D34EA5C5F3B3D557A1773F1680F217780',
		},
		apiRoot: 'api/v1',
		unprotectedRoutes: [
			'api/v1/parcours/*',
			'api/v1/media/*',
			'api/v1/media-section/*',
			'api/v1/niveau/*',
			'api/v1/piste/*',
			'api/v1/secteur/*',
			'api/v1/activite/*',
			'api/v1/partenaire/*',
			'api/v1/mailer'
		]
	},

	mailer: {
		host: 'acommealliees.ca',
		port: 465,
		secure: true,
		 auth: {
        user: 'acommealliees',
        pass: 'admingris39150043'
    },
    tls: {
        rejectUnauthorized: false
    }
		//ignoreTLS: true
	}
};