# Project 2

Language Exchanger
Become fluent in any language while making friends with native speakers 

Description
Language Exchanger is an app for connecting users willing to trade language learning practices with speakers of different languages.

Interaction
There are 3 types of user interactions: by profiles, by comments or by events.

Profiles
    • A user’s flow will be as follows: They register, or log in if they have already an account and land in the Main feed. From there, they can access their personal profile page, where they can edit it: add their language & meeting preferences, their favorite hobbies or memes, as well as have access to their events(created or registered).  If they go back to the Main feed, they can access the list of the other users’ profiles, sort them, filter them by their preferences, visit and read their profile page.

Comments & reviews
    • A user can add a comment/post in other user’s profiles to suggest a meeting to practice a language, and rate their interaction later on if they had any. 

Events
    • Users can search for events that might interest them: online, in person, 1-to-1 or in group and in different cities. All users can view and join the events but only the host (creator) user can edit and delete them.

Route	Views	Description	Persmissions
GET "/"	index.hbs	renders the homepage/login	All
/auth			
GET/POST "/signup"	signup.hbs	renders the signup form for users	All
GET/POST "/login"	login.hbs	renders the signup form for users	All
POST "/logout"	index.hbs	Logouts users and renders homepage	All
/user			
GET "/feed"	feed.hbs	renders the main private feed	registered
GET "/profile"	Profile-user.hbs	shows your profile page, with preferences, comments and events	registered
GET/POST "/edit	profile-edit.hbs	shows form to edit your profile	registered
GET "/results	profile-results.hbs	shows a list of profiles	registered
GET /:id	profile-public.hbs	shows other users’ profile	registered
GET "/mymeetings	mymeetings.hbs	shows list of all your events	registered
/meetings			
GET "/"	Meeting-list.hbs	shows a list of all the events	registered
GET "/:id"	meeting-details.hbs	shows an event details	registered
GET/POST "/create"	meeting-create.hbs	shows form to create a new event	registered
GET/POST "/
/mymeetings/edit	meeting-edit.hbs	shows a form to edit your events	registered




