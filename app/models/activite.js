'use strict';

var mongoose = require('mongoose'),
	extend = require('mongoose-schema-extend'),
	ExpressBase = require('express-base'),
	Schema = mongoose.Schema,
	_ = require('lodash-node');

var ActiviteSchema = ExpressBase.getBaseSchema().extend({
	name: {
		type: String
	},
	niveau: [{
		type: mongoose.Schema.ObjectId,
		ref: 'niveau'
	}],
	img: {
		type: String
	},
	infos: {}
});

ActiviteSchema.statics.can = function(operation, user) {
	if (_.contains(['READ'], operation)) {
		return true
	} else {
		return _.intersection(user.roles, ['admin']).length > 0;
	}
}

module.exports = mongoose.model('activite', ActiviteSchema);