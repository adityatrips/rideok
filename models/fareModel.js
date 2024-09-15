const { Schema, model } = require('mongoose');
const ShortUniqueId = require('short-unique-id');

const uid = new ShortUniqueId({ length: 10 });

const fareSchema = new Schema(
	{
		fare_id: {
			type: String,
			default: uid.rnd(),
		},
		ride_id: {
			type: Schema.Types.ObjectId,
			ref: 'Ride',
			required: [true, 'Ride ID is a required field.'],
		},
		base_fare: {
			type: Number,
			required: [true, 'Base fare is a required field.'],
		},
		distance: {
			type: Number,
			required: [true, 'Distance is a required field.'],
		},
		seats_filled: {
			type: Number,
			required: [true, 'Seats filled is a required field.'],
		},
		dynamic_fare: {
			type: Number,
			required: [true, 'Dynamic fare is a required field.'],
		},
	},
	{ timestamps: true }
);

module.exports = model('Fare', fareSchema);
