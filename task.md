Back-End Exam

What We Look For
This exam is designed to test if you can:
Follow simple, written, English instructions.
Build a simple sign up/sign in app that exists in all apps.
Find and use third party APIs to save time.
Write clean and well documented code.
Work with ambiguity in instructions to build an app that has a good user experience.

Exam Grade and Starting Salary
Each portion of the exam is worth a certain maximum number of points if features are functional. You do not have to attempt all features. We will test your demo app and add up the points. The more points in the total points tally, the higher your starting salary. The number of points will directly determine your starting salary.

Submission Instructions
Please complete the exam within 3 weeks.
Please commit all your code to GitHub. Our engineers will read your code.
Please complete the following form to submit your exam and schedule final round of interview:
https://2bs9m2ujxlo.typeform.com/to/EMuA9dnZ

Requirements
Create a simple app where users can sign up and sign in from a landing page into a simple dashboard. The landing page can be blank with only two separate links to “Sign Up” and “Sign In”. The simple dashboard can only be accessed after the user signs up or signs in. 

You may use the following tech stacks:
JavaScript, Node.js
Python, Django Rest Framework (DRF) or Fast API

Sign Up [20 points]
The Sign Up page should allow users 3 options to create an account: 
(1) email and user defined password
(2) Google OAuth
(3) Facebook OAuth

You can use any third party tool, library, or API for this. In fact, to save time, it is highly recommended that you use a third party auth API. Create your own guest or trial accounts with third party tools. We only need a live demo app to test for 1 or 2 weeks.  

User Defined Password [20 points]
The user defined password must be entered twice and match. In addition, the password must be validated by the following conditions.
contains at least one lower character 
contains at least one upper character 
contains at least one digit character 
contains at least one special character
contains at least 8 characters

Email Verification [40 points]
For the user defined password, after the validated password is entered, your back-end app must send an verification email to the email address provided. The email must contain a link, that if the user clicks the link, their email will be verified in the back-end and the user will be directed to a simple dashboard in a new browser.

Only accounts that have email verified can access the simple dashboard. Users that have not verified email will only see a button or link that says “Resend Email Verification”, and clicking on this link will resend the same email verification.

Only accounts created via email and password must be verified with email verification. Facebook and Google OAuth sign up accounts do not need to send email verification, and can immediately access the simple dashboard.

Like with authentication, you can use any third party email sending tool, library, or API. Create your own guest or trial accounts. We only need a live demo app to test for 1 or 2 weeks.  

Login [10 points]
We will allow users to login through the 3 methods that users can sign up with:
(1) email and user defined password
(2) Google OAuth
(3) Facebook OAuth

You can use any third party tool, library, or API for this feature.

Simple Dashboard [20 points]
The simple dashboard will display the user’s email and name (from Google or Facebook OAuth). In addition, the user can reset their name. Everytime the user logins, the user should see the name they have chosen.

Reset Password [30 points]
In the simple dashboard, add the ability to reset password. The password must meet the same criterias as defined previously. In addition, the user must enter 3 text input boxes:
Old password
New password
Re-enter new password


