const { Schema, model } = require('mongoose');
const ShortUniqueId = require('short-unique-id');

const rideSchema = new Schema({
	ride_id: {
		type: String,
		trim: true,
	},
	driver_id: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: [true, 'Driver ID is a required field.'],
	},
	passenger_id: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: [true, 'Passenger ID is a required field.'],
	},
	origin: {
		type: Schema.Types.ObjectId,
		ref: 'Location',
		required: [true, 'Origin is a required field.'],
	},
	destination: {
		type: Schema.Types.ObjectId,
		ref: 'Location',
		required: [true, 'Destination is a required field.'],
	},
	time: {
		type: Date,
		required: [true, 'Time is a required field.'],
	},
	seats_available: {
		type: Number,
		required: [true, 'Seats available is a required field.'],
	},
	seats_filled: {
		type: Number,
		default: 0,
	},
});

rideSchema.pre('save', function (next) {
	const uid = new ShortUniqueId({
		length: 10,
	});
	this.ride_id = uid.rnd();
	next();
});

module.exports = model('Ride', rideSchema);
