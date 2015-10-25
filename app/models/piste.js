'use strict';

var mongoose = require('mongoose'),
	extend = require('mongoose-schema-extend'),
	ExpressBase = require('express-base'),
	Schema = mongoose.Schema,
	_ = require('lodash-node');

var PisteSchema = ExpressBase.getBaseSchema().extend({
	secteurId: {
		type: Schema.ObjectId,
    ref: 'secteur'
	},
	parcoursId: {
		type: Schema.ObjectId,
    ref: 'parcours'
	},
	name: {
		type: String
	},
	shortName: {
		type: String,
		unique: true
	},
	description: {
		type: String
	},
	templateUrl: {
		type: String
	},
	badge: {
		type: Schema.ObjectId,
    ref: 'badge'
	},
	data: {}
});

PisteSchema.statics.can = function(operation, user) {
	if (_.contains(['READ'], operation)) {
		return true
	} else {
		return _.intersection(user.roles, ['admin']).length > 0;
	}
}

module.exports = mongoose.model('piste', PisteSchema);