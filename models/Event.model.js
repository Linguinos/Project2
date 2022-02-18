const { Schema, model } = require('mongoose');


const eventSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	typeOfMeeting: {
		type: String
	},
    language: {
        type: String 
    },
	contactEmail: {
		type: String
	},
	// favorites: [{ type: Schema.Types.ObjectId, ref: 'Room', default: [] }]
});

const Event = model('Event', eventSchema);

module.exports = Event;
