const { Schema, model } = require('mongoose');


const eventSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	Type of meeting: {
		type: String
	},
    Language: {
        type: String 
    },
	contact email: {
		type: String
	},
	// favorites: [{ type: Schema.Types.ObjectId, ref: 'Room', default: [] }]
});

const Event = model('Event', eventSchema);

module.exports = Event;
