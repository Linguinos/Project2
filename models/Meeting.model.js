const { Schema, model } = require('mongoose');


const eventSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	host: {
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
	schedule: {
		type: String
	},
	attendees: [{ type: Schema.Types.ObjectId, ref: 'Profiles', default: [] }]
});

const Event = model('Event', eventSchema);

module.exports = Event;
