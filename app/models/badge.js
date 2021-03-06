'use strict';

var mongoose = require('mongoose'),
	extend = require('mongoose-schema-extend'),
	ExpressBase = require('express-base'),
	Schema = mongoose.Schema,
	_ = require('lodash-node');

var BadgeSchema = ExpressBase.getBaseSchema().extend({
	name: {
		type: String
	},
	description: {
		type: String
	},
	img: {
		type: String
	}
});

BadgeSchema.statics.can = function(operation, user) {
	if (_.contains(['READ'], operation)) {
		return true
	} else {
		return _.intersection(user.roles, ['admin']).length > 0;
	}
}

module.exports = mongoose.model('badge', BadgeSchema);