'use strict';

var mongoose = require('mongoose'),
	extend = require('mongoose-schema-extend'),
	ExpressBase = require('express-base'),
	Schema = mongoose.Schema,
	_ = require('lodash-node');

var PartenaireSchema = ExpressBase.getBaseSchema().extend({
	name: {
		type: String
	},
	position: {
		type: Number,
	},
	presentation: {
		type: String
	},
	site: {
		type: String
	},
	telephone: {
		type: String
	},
	img: {
		type: String
	},
	infos: {}
});

PartenaireSchema.statics.can = function(operation, user) {
	return true;
}

module.exports = mongoose.model('partenaire', PartenaireSchema);