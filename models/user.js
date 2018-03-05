let mongoose = require('mongoose')
let bcrypt = require('bcryptjs')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
let SALT_FACTOR = 13


let schema = new Schema({
	created: { type: Number, required: true, default: Date.now() },
	displayName: { type: String, required: true },
	email: { type: String, required: true, unique: true, dropDups: true },

	local: {
		email: String,
		password: String
	},
	google: {
		id: String,
		token: String,
		email: String,
		name: Object
	}

})

schema.pre('save', function (next) {
	var user = this;
	if (!user.isModified('local.password')) {
		return next();
	}
	bcrypt.genSalt(SALT_FACTOR, function (err, salt) {
		if (err) {
			return next(err);
		} else {
			bcrypt.hash(user.local.password, salt, function (err, hash) {
				user.local.password = hash;
				next();
			});
		}
	});
});

schema.statics.generateHash = function (password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(SALT_FACTOR));
};

schema.methods.validatePassword = function (password) {
	return bcrypt.compareSync(password, this.local.password);
};


// a very simple auth system should likely be switched for a more robust solution
let roles = ['public', 'moderator', 'admin']

schema.methods.hasAccess = function (role) {
	return roles.indexOf(role) <= roles.indexOf(this.role)
}

schema.methods.compareRoles = function (otherUser) {
	return roles.indexOf(otherUser.role) < roles.indexOf(this.role)
}

module.exports = mongoose.model('User', schema)