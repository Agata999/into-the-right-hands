# Into the right hands

http://into-the-right-hands.herokuapp.com/
> _Into the right hands_ is a web application created with Django, JavaScript, PostgreSQL and a ready layout. You can help the needy by donating stuff you don’t need (but is still useful).


## Table of contents
* [Technologies](#technologies)
* [Setup](#setup)
* [Features](#features)

## Technologies
* Python - version 3.6
* Django - version 2.2.5
* PostgreSQL - version 10.10

## Setup
* Clone git repository
* Create virtualenv `virtualenv -p python3 venv`
* Activate virtualenv `source venv/bin/activate`
* Install requirements `pip install -r requirements.txt`
* Setup psql database called `charity-donation`
* Change psql user and password to yours
* `python manage.py migrate`
* `python manage.py runserver`

## Features

* Models needed to create your database
* A form to donate stuff: clothes, toys, food, books, etc. (it creates a donation in your database)
* Possibility to choose institution you want donate. Institutions are filtered by categories of stuff chosen to donate.
* User forms to register, log in / log out
* List of user’s donations (option only for logged in users)
* Admin site
