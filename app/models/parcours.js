'use strict';

var mongoose = require('mongoose'),
	extend = require('mongoose-schema-extend'),
	ExpressBase = require('express-base'),
	Schema = mongoose.Schema,
	_ = require('lodash-node');

var ParcourSchema = ExpressBase.getBaseSchema().extend({
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
	position: {
		type: Number
	},
	img: {
		type: String
	},
	pageColor: {
		type: String
	},
	aPropos: {
		type: String
	},
	ressourcesDispo: {
		type: String
	},
	medias: [{
		type: mongoose.Schema.ObjectId,
		ref: 'media'
	}]
});

ParcourSchema.statics.can = function(operation, user) {
	if (_.contains(['READ'], operation)) {
		return true
	} else {
		return _.intersection(user.roles, ['admin']).length > 0;
	}
}

module.exports = mongoose.model('parcours', ParcourSchema);