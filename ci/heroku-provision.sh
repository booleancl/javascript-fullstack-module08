APP_NAME=$(node -p "require('./package.json').name")
heroku create $APP_NAME
heroku addons:create heroku-postgresql:hobby-dev
heroku config | grep DATABASE_URL