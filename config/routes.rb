Rails.application.routes.draw do
  # get 'freelancers/profile'
  get 'home', to: 'static_pages#home'

  get 'users', to: 'users#new'
  get '/users/:account_id', to: 'users#show'
  post 'users', to: 'users#create'

  get 'freelancers/:account_id', to: 'freelancers#profile'
  post 'freelancers/:account_id', to: 'freelancers#create'

  root 'static_pages#home'

  resources :users
end
