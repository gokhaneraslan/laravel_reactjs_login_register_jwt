# laravel_reactjs_login_register_jwt
php laravel jwt reactjs login and register

Installation

Clone the repository-

git clone https://github.com/gokhaneraslan/laravel_reactjs_login_register_jwt.git

Then cd into the folder with this command-

cd server

Then do a composer install

composer install

Then create a environment file using this command-

cp .env.example .env


Then create a database named jwtAuth and then do a database migration using this command-

php artisan migrate

Then change permission of storage folder using thins command-

(sudo) chmod 777 -R storage

At last generate application key, which will be used for password hashing, session and cookie encryption etc.

php artisan key:generate

Run server

Run server using this command-


php artisan serve


Then go to http://localhost:8000 from your browser and see the app.
