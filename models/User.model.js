const { Schema, model } = require('mongoose');

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: false
	},
	city: {
		type: String,
		required: false
	},
	languageSpeak: {
		type: String,
		required: false,
		enum: ['English', 'Spanish', 'Catalan',
        'French', 'Italian', 'German',
        'Chinese', 'Japanese', 'Hindi',
        'Russian', 'Dutch', 'Swedish',
        'Portuguese', 'Korean', 'Polish',
        'Greek', 'Others']
	},
	languageLearn: {
		type: String,
		required: false,
		enum: ['English', 'Spanish', 'Catalan',
        'French', 'Italian', 'German',
        'Chinese', 'Japanese', 'Hindi',
        'Russian', 'Dutch', 'Swedish',
        'Portuguese', 'Korean', 'Polish',
        'Greek', 'Others']
	},
	imgUrl: {
		type: String,
		default: "https://cdn-icons-png.flaticon.com/512/456/456212.png"
	},
	schedule: {
		type: String,
		required: false
	},

	meetingPreference: { type: String, enum: ['online', 'in-person', 'both'] },
	meetings: [{ type: Schema.Types.ObjectId, ref: 'Meeting', default: [] }],
	meetingsAttended: [{ type: Schema.Types.ObjectId, ref: 'Meeting', default: [] }]
});

const User = model('User', userSchema);

module.exports = User;
