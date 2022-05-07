Rails.application.routes.draw do
  get 'home', to: 'static_pages#home'

  get 'users', to: 'users#new'
  get '/users/:account_id', to: 'users#show'
  post 'users', to: 'users#create'

  get 'freelancers', to: 'freelancers#index'
  get 'freelancers/:account_id', to: 'freelancers#profile'
  post 'freelancers/:account_id', to: 'freelancers#create'

  get 'hirers/:account_id', to: 'hirers#profile'
  get 'hiring/:account_id', to: 'hirers#hiring'
  get 'cards/:stream_id', to: 'hirers#cards'

  get 'searches', to: "searches#search"

  root 'static_pages#home'

  resources :users
end
