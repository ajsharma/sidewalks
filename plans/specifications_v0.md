# Application Specifications v0.0

I want to build a mobile-friendly web application called "Sidewalks". Using modern best practices. It should be a showcase of modern technology, engineering best practices, and world-class design.  

It will be hosted at sidewalkshq.com

It should be built using a full-stack Typescript web framework, with a Postgres backend.

The application curates activities for me and invited friends to participate in.

For every resources, I should have the standard CRUD operations, using RESTful URLs for accessing them.

Each resource should have standard best practice attributes:

- bigint id (hidden from user)
- public facing slug (part of the url)
- created_by_user_id (if appropriate)
- created_at
- modified_at
- archived_at

By default, archive resources instead of deleting them by setting archived_at to the current time.

## Users

Support best-in class User access. 

In development, add a user@sidewalkshq.com user with the password `sidewalks` to log in.

User should have:

- Name
- Email

## How Activities Work

Users will provide a list of activities, along with criteria about when the best time to do the activity would be. I should be able to provide:

- Name
- Links
- A schedule
- Max frequency

### Activity Scheduling

Some activities reoccur on a strict schedule:

- Pub Trivia at the Willows is every Wednesday from 8pm - 10pm
- Alemany Flea Market is every Sunday from 7:00 am to 3:00 pm
- Viewing the Christmas tree in Union Square in only possible from 12:00 pm to 6pm in December

Some activities don't have strict times, or are abstract ideas. These can reoccur:

- Go day drinking in Napa 
- Do an escape room
- Lunch with friends
- Board game night

Some activities have a deadline or they expire, and cannot be scheduled after the deadline:

- The Superman movie is only in theaters until August.
- A special sale only until the end of the week.

An Activity can only be edited or deleted by its author.

### Activity Max Frequency

User should be able to declare the frequency between when they would want to repeat an activity. Frequency options include:

- 1 day
- 1 month
- 2 month
- 3 months
- 6 months
- 12 months
- Never

## Playlists

User should be able to add Activities to "Playlists". 

A playlist can only be edited or deleted by its author.

## Google Access

User will give Sidewalks access to their Google calendar.
User could have multiple Google calendars that they need to link to their Sidewalks account.

## Coordinating Activities

The application should have an Activity Coordinator module.

## Friends

I should be able to invite friends to my Playlists. 

Friends can accept or archive the invite.
Friends can leave playlists if they want.

Friends can view an activity and express their interest on a scale of 1 though 5.

Everyone who can view the Playlist should be called a Playlist Watcher.

## Coordinating Activities

The application should have an Activity Coordinator module.

This module should suggest activites based on the Playlist Watchers: 

- interest in the events
- recency of last participated

Users should be able to trigger a command for the application to review their Google Calendar and Sidewalk Playlists, and suggest Activities to populate empty days (up to 4 weekends into the future).

Coordinator should not suggest more than 3 Activities per day.

User should be able to accept the suggestions and Coordinator should then create the Google Calendar events.

Sidewalks should keep a record mapping the Google Calendar event to the Activity.

Sidewalks should respect the max frequency parameter when making suggestions.

Assume that the Activity Coordinator will come progressively more complex in future versions.