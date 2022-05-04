# Rails JS Template (Under Development)

The first thing is to bundle install stuff. We only want non production. 

```
bundle config set --local without production
bundle install
```

The second thing is to recreate master key and credentials. 

```
EDITOR="code ." bin/rails credentials:edit
```

**Close the file.** Then run migrations:

```
rails db:migrate
```

Then we need to install bootstrap. (Ignore the error, it'll auto install upon cannot find bootstrap). 
This requires yarn and node js. 

```
bash rebuild.sh
```

Everything should be fine after that. Try to start `rails s` and see if it starts or not. 

```
rails s
```

Everything should be fine after that. Try to start `rails s` and see if it starts or not. 

## Heroku

Run these **one by one**: 

```
heroku create app_name
git push heroku main
heroku run rails db:migrate
```

---

## Improvements Required
- There are quite a lot of tests required for this repository. 
- Handling ajax to send request to backend; or just do sign and send transactions from the backend if user not scared of hacked database (which most probably lead to small sum stolen per user, given the limit of the private key stored). 
- Waiting for `near_api` gem to improve... 