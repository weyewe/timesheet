Timesheet::Application.routes.draw do
  devise_for :users
  root :to => 'home#extjs' , :method => :get 
  namespace :api do 
    devise_for :users
    
    post 'authenticate_auth_token', :to => 'sessions#authenticate_auth_token', :as => :authenticate_auth_token 
    put 'update_password' , :to => "passwords#update" , :as => :update_password
    
    get 'search_role' => 'roles#search', :as => :search_role
    get 'search_customers' => 'customers#search', :as => :search_customers
    
    resources :customers 
    resources :projects 
    resources :app_users
    resources :categories 
  end
end
