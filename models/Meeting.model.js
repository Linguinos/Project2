const { Schema, model } = require('mongoose');


const meetingSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    host: { type: Schema.Types.ObjectId, ref: 'User'},
    typeOfMeeting: {
        type: String,
        enum: ['1-on-1', 'Study Group', 'Beers and fun', 'Book Club']
    },
    language: {
        type: String,
        enum: ['English', 'Spanish', 'Catalan',
        'French', 'Italian', 'German',
        'Chinese', 'Japanese', 'Hindi',
        'Russian', 'Dutch', 'Swedish',
        'Portuguese', 'Korean', 'Polish',
        'Greek', 'Others']
    },
    contactEmail: {
        type: String
    },
    schedule: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    attendees: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }]
});

const Meeting = model('Meeting', meetingSchema);

module.exports = Meeting;
