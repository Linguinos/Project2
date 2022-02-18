const { Schema, model } = require('mongoose');


const eventSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	Type of meeting: {
		type: String,
		required: true
	},
    Language: {
        type: String,
        required: true
    },
	contact email: {
		type: String,
		required: true
	},
	// favorites: [{ type: Schema.Types.ObjectId, ref: 'Room', default: [] }]
});

const Event = model('Event', eventSchema);

module.exports = Event;
