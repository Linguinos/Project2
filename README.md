# Project 2

##parlem.
Become fluent in any language while making friends with native speakers 

##Description
Language Exchanger is an app for connecting users willing to trade language learning practices with speakers of different languages.

##Interaction
There are 3 types of user interactions: by profiles, by comments or by events.

##Profiles
    • A user’s flow will be as follows: They register, or log in if they have already an account and land in the Main feed. From there, they can access their personal profile page, where they can edit it: add their language & meeting preferences, their favorite hobbies or memes, as well as have access to their events(created or registered).  If they go back to the Main feed, they can access the list of the other users’ profiles, sort them, filter them by their preferences, visit and read their profile page.

##Comments & reviews
    • A user can add a comment/post in other user’s profiles to suggest a meeting to practice a language, and rate their interaction later on if they had any. 

##Events
    • Users can search for events that might interest them: online, in person, 1-to-1 or in group and in different cities. All users can view and join the events but only the host (creator) user can edit and delete them.
 

##Pages

| Route            |    Views       |          Description                | 
|GET "/"	   | index.hbs      | renders the homepage/login          |
| /auth	           |                |                                     |
|GET/POST "/signup"| signup.hbs     | renders the signup form for users   |
| GET/POST "/login"|   login.hbs    | renders the login form for users    |
|POST "/logout"    | index.hbs      | Logouts users and renders homepage  |
| /user            |                |                                     |	
|GET"/feed"        | feed.hbs       | renders the main private feed       |
| GET "/profile"   |profile-user.hbs| renders your profile page           |
|GET/POST "/edit"  |profile-edit.hbs| shows form to edit your profile     |
| GET "/results"   |profile-results.hbs|    shows a list of profiles      |			
| GET /":id"       |profile-public.hbs|   shows other users’ profile      |	
|GET "/mymeetings" |mymeetings.hbs  | shows list of all your events       |
| /meetings        |                |                                     |
|GET "/"           |meeting-list.hbs| shows a list of all the events      |
| GET /":id"       |meeting-details.hbs|   shows an event's details       |	
|GET/POST "/create"|meeting-create.hbs| shows form to create a new event  |
| GET/POST "/
/mymeetings/edit   |meeting-edit.hbs|   shows a form to edit your events  |

##Models
User model

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
		type: [String],
		required: false,
		enum: ['English', 'Spanish', 'Catalan',
        'French', 'Italian', 'German',
        'Chinese', 'Japanese', 'Hindi',
        'Russian', 'Dutch', 'Swedish',
        'Portuguese', 'Korean', 'Polish',
        'Greek', 'Others']
	},
	languageLearn: {
		type: [String],
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



Meeting model:

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
    city: {
        type: String,
        required: true
    },
    description: {
		type: String,
		required: true
	},
    attendees: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }]


##Git
The url to the repository and to the deployed project:






