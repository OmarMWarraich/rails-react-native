Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  resources :sessions, only: [:create]
  resources :registrations, only: [:create]
  delete :logged_out, to: "sessions#logged_out"
  get :logged_in, to: "sessions#logged_in"
  root "static#home"
end
