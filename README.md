# Birthdays React Challenge

This is a birthday form and listing, using the MERN stack.

_This is a challenge for an interview._
<br>

## Dependencies

- NPM

## Setup

### **Repository**

To setup this application, let's first clone the repository using the following command:

`git clone https://github.com/macmartins/birthdates-advisor`

### **Server**

After we have a local copy, let's handle the server setup:

1. Open a CLI window, navigate to the server folder using: `cd server`
2. Then, install the server dependencies using: `npm install`
3. Then, copy the `.env.local` file as `.env` so the environment variables are setup
4. Then to run the server do: `npm start`

After a few seconds, you should see something like this:

![Server running in a CLI](/assets/images/serverCLI.png)

Nice! The server is working! You should be able to access the server in the localhost using the default port, for example: <a href="http:localhost:3001/api" target="_blank">http:localhost:3001/api</a>

### **Client**

1. Open another CLI window, navigate to the client folder using: `cd client`
2. Then, install the app dependencies using: `npm install`
3. Then, copy the `.env.local` file as `.env` so the environment variables are setup
4. Lastly, run the client app using: `npm start`

After a few seconds, you should see something like this:

![Client running in a CLI](/assets/images/clientCLI.png)

Great! The application is up and running!
Just click or paste the URL and start using the application!

#### **Frontend Extras**

1. When you first arrive at the app, you'll be redirected to the homepage. Also, there's an /revisited route that'll load saved birthdays from the DB. However, this is only available if the stored roles has an 'admin' role.<br><br>
For demo purposes, whenever you enter the application it automatically stores that role in the local storage.<br>
If you want to test being "kicked out" of the revisit page, you can manually delete or change the roles from the local storage and refresh the page, the app will then redirect you to the homepage.
2. The table items are clickable, and whenever you click on one of them it renders the birthday legend according to that record.
3. There's an simple dropdown to change the app's language, which uses the i18next library.
4. All form fields are required, and some of them have extra requirements. This is all informed whenever submitting the form or un-focusing the fields.
5. Whenever there's an asynchronous action (Submitting form, loading data) a loading spinner is shown.

#### **Backend Extras**
**Note**: From here on out, assume the base url is /api to avoid repetition.
1. Besides the GET /countries and GET /birthdays, there's also a POST, PUT and DELETE for /countries, but they are protected. If you attempt to make a request to these endpoints, it'll return 401 (Unauthorized).<br>
To be able to make the request fully, you need to make a call to /login which will return a token. Use this token for the "Authorization" header in those requests, prefixed with "Bearer " like so (Using Postman, for example):
![POST /countries example](/assets/images/authorizationExample.png)
2. There's also a test suite for birthdays. To run them, simply do `npm test` on the server CLI.
