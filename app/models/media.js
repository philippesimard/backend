'use strict';

var mongoose = require('mongoose'),
	extend = require('mongoose-schema-extend'),
	ExpressBase = require('express-base'),
	Schema = mongoose.Schema,
	_ = require('lodash-node');

var MediaSchema = ExpressBase.getBaseSchema().extend({
	name: {
		type: String
	},
	sectionId: {
		type: mongoose.Schema.ObjectId,
		ref: 'media-section'
	},
	niveau: [{
		type: mongoose.Schema.ObjectId,
		ref: 'niveau'
	}],
	annee: {
		type: Number
	},
	img: {
		type: String
	},
	infos: {}
});

MediaSchema.statics.can = function(operation, user) {
	if (_.contains(['READ'], operation)) {
		return true
	} else {
		return _.intersection(user.roles, ['admin']).length > 0;
	}
}

module.exports = mongoose.model('media', MediaSchema);