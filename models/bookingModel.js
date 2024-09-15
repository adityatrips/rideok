const { Schema, model } = require('mongoose');
const ShortUniqueId = require('short-unique-id');

const uid = new ShortUniqueId({ length: 10 });

const bookingSchema = new Schema(
	{
		booking_id: {
			type: String,
			default: uid.rnd(),
		},
		ride_id: {
			type: Schema.Types.ObjectId,
			ref: 'Ride',
			required: [true, 'Ride ID is a required field.'],
		},
		passenger_id: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: [true, 'Passenger ID is a required field.'],
		},
		status: {
			type: String,
			enum: ['pending', 'accepted', 'rejected', 'completed'],
			default: 'pending',
		},
	},
	{ timestamps: true }
);

module.exports = model('Booking', bookingSchema);
