# TeamSheet, timesheet tracker 


I made a timesheet tracker to track the time spent on the project and work category. The use case for this timesheet tracker is for __Marketing Agency__ or __Law Firm__:

1. External Use: to produce detailed billing hours to the client 

2. Internal Use: to understand how the time is spent (what kind of work category) in finishing the project.


## App Design

Everyday, each employee has to log the work done, segregated by the __project__ (Project A, Project B, Project C) and __work category__ (for example: brain storming, drafting, handling phone call from client, calling supplier). 

There are 2 roles: __admin__ and __data entry__. Data entry can only log in to the app, enter the work log, and view his performance report. For admin, he can create new user, create new project, create new customer, and create the work categories. Furthermore, admin has the capability to see the detailed time-spent breakdown: by employee, by project, or by work category. 

## Technology Used

1. Web Framework : Ruby on Rails 4 

2. Authentication : [Devise](https://github.com/plataformatec/devise) 

3. Authorization : [The role](https://github.com/the-teacher/the_role)

4. Deployed@Heroku 



## Deployment @Heroku: 

1. clone the __TeamSheet__ code 
`git clone https://github.com/weyewe/timesheet`

2. install the gem 
` bundle install`

3. Create heroku app
`$ heroku create --stack cedar`

4. Enable asset compilation @ heroku 
`heroku labs:enable user-env-compile`

5. Push the code to heroku 
`git push heroku master`

6. Setup the database 
`heroku run rake db:migrate`

7. Setup the seed data: will create example projects, work log, user (admin@gmail.com) and (data_entry1@gmail.com). Password for both of them: willy1234
`heroku run rake db:seed`





