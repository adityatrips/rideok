const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const ShortUniqueId = require('short-unique-id');

const userSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, 'Name is not an optional field.'],
			trim: true,
		},
		email: {
			type: String,
			required: [true, 'Email is not an optional field.'],
			trim: true,
			unique: true,
		},
		phone: {
			type: String,
			required: [true, 'Phone number is not an optional field.'],
			trim: true,
			unique: true,
		},
		role: {
			type: [String],
			enum: ['driver', 'passenger'],
			default: ['passenger'],
		},
		token: {
			type: String,
		},
		password: {
			type: String,
			required: [true, 'Password is not an optional field.'],
			trim: true,
		},
		profile_photo: {
			type: String,
			default: '',
		},
		vehicle: {
			type: Schema.Types.ObjectId,
			ref: 'Vehicle',
			default: null,
		},
		saved_locations: {
			type: [
				{
					lat: Number,
					lng: Number,
					name: String,
				},
			],
			ref: 'Location',
			default: [
				{
					lat: 0,
					lng: 0,
					name: 'Center of the Earth',
				},
			],
		},
	},
	{ timestamps: true }
);

userSchema.pre('save', async function (next) {
	if (this.isModified('password')) {
		this.password = await bcrypt.hash(this.password, 8);
	}
	const uid = new ShortUniqueId({ length: 10 });
	this.token = uid.rnd();
	next();
});

userSchema.methods.comparePassword = async function (password) {
	return await bcrypt.compare(password, this.password);
};

module.exports = model('User', userSchema);
