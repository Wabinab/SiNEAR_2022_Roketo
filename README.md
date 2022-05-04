# Spring is NEAR 2022 Challenge 8: Roketo Challenge

## Problem Statement
Roketo, a crypto streaming service, announces a new challenge to reveal the product’s strongest side – their real-time payments.  
The task is to create a service application of Roketo for any pay per minute service such as co-working, car parking, equipment rental, etc. The MVP of a service could work partially, but the payment in that service should be done through Roketo and work. Use Roketo streaming smart contract as a payment method in your MVP.  

To take part in challenge, follow these steps:  
- Choose a particular situation applicable for real-time payments.
- (ok this statement is confusing but I guess we don't need to do this?) Then find a way to onboard people into the topic (Roketo & NEAR).
- Come up with a tool / product /service / dApp where Roketo payment solution will be integrated. Do not hesitate to create a simple UI to use our contract. So the goal is to find a way to lay our technology on daily tasks.
- Make a video presentation with an idea explanation.

### Useful Links
- https://kikimora-labs.notion.site/Roketo-v2-api-a6b1cff8b9f74014a42b86b084cbbbd0
- https://kikimora-labs.notion.site/What-is-Roketo-8d037557a9074d929403898d1fc7808b
- https://www.roke.to/
- https://test.app.roke.to/  (testnet)

---
## Technical setup

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
