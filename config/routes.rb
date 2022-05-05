Rails.application.routes.draw do
  get 'home', to: 'static_pages#home'

  get 'users', to: 'users#new'
  get '/users/:account_id', to: 'users#show'
  post 'users', to: 'users#create'

  root 'static_pages#home'

  resources :users
end
