const { Schema, model } = require('mongoose');


const meetingSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    host: { type: Schema.Types.ObjectId, ref: 'User'},
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
    attendees: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }]
});

const Meeting = model('Meeting', meetingSchema);

module.exports = Meeting;
