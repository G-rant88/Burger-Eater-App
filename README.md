<h1>Welcome to Burger Eater 3000</h1>

<p>the deployed app is <a href="https://burger-eater3000.herokuapp.com/" target="_blank">HERE</a></p>

<p>The new branch v3 is the updated app. V3 updates:</p>

<ul>
	<li>when you go to the app you will be sent to a login page</li>
	<li>If you do not already have an account you will have to sign up</li>
	<li>Once logged in with your user/pw you will be sent to the home page</li>
	<li>All of your burgers will be stored to your user specific table</li>
	<li>You can log out on the home page and will be sent to the login page</li>
	<li>If you login with the same account all of your burgers will be saved</li>
	<li>If you login and quit the app without logging out when you come back to it you will be logged in with your account automatically.</li>
</ul>

<p>All the data is tied to my mysql db.</p>

<p>After adding a new burger it will appear on the left side list with a "DEVOUR IT" button next to it.</p>

<p>Once devoured it will go to the right side.</p>

<p>Devouring updates the db to set the devoured property to true.</p>

<p>Adding a burger with ingredients inserts a new burger and its ingredients into the db.</p>

<p>Updating the burger allows you to change the name and ingredients of that burger on a separate page that will update your burger table.</p>

<p>Regurgitating sets the devoured to false and puts it on the left side.</p>

<p>Going to bathroom deletes from the mysql table where devoured is true.</p>

<p>the burgers are ordered by their id in the db.</p>

<p>Have fun eating those burgs!</p>

