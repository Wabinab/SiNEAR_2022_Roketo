# Spring is NEAR 2022 Challenge 8: Roketo Challenge

## Introduction
For the frontend, just check the youtube videos: 
    Part 1: https://youtu.be/Z_dzdQct2KA
    Part 2: https://youtu.be/IY1IAkSBs34
    
The backend is as simple as the "greeting" contract, and you can understand it yourself by looking at it. 

---
## Design weaknesses
The above mentions when you play "in the box". If you're a hacker and chose to play outside the box, there certainly aren't fully thought-of frontend design. Can't blame, when one design this, one assumes you'll work only within constraints, and ignores "what if" we work outside constraints. It's nothing one care about anyways, 
unless we're going to deploy to mainnet and requires security check then only it returns to one's concern. 

First, display of active streams. This active stream includes ALL streams that are and aren't created by the frontend. Supposingly we should only display those created by the frontend and not everything. This also means 
**streams that are created outside will have NO CONFIRMATION that it'll display**. If your page don't show up, it just means it can't be displayed within the box's range. Example, before a fix, someone has a stream that only stream 1 yoctoNEAR
per second, for lots of NEAR. The value displays is infinity, which Rails cannot perform arithmetic on; hence page refuses to display. Though we hard-fix it by displaying "infinity", it's better to remove it altogether from displaying. Oh well. 

Solution? Add "stream_id" to a helper contract after calling function. This requires **two calls separately** instead of done in a single click; because one cannot solve this problem. 
- From the (helper) smart contract side, if we have a function that we initially deposit and make the call; how do we use "view functions" in smart contract? Only if we can use view functions could we solve this issue. 
- From the frontend side: **any `#[payable]` smart contract calls cannot use `.then()`**. As far as one tried, even a simple `console.log()`, if it has redirect to the page requiring you to "accept", all `.then()` would fail. At least, that's one's experimentation. 

Until either one of these solved, we are stuck with 2 buttons, one click after another. 

Second, buttons. When one design the buttons, it's "if it's this then we **hide**, else we display;" rather than "if it's this then we **display**, else we hide;" One's design means: the "else" is also exposed to other non-intended people. 
Although when call the contract will panic; it's not intended to show the buttons to non-eligible people. That isn't designed to. 

And we could see other people's work and transactions; that's fine on public blockchain. If we want specific access only by "authorized people", unfortunately my skills don't allow me to design that yet (one don't know how to do that). 

---
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
