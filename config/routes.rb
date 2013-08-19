Timesheet::Application.routes.draw do
  devise_for :users
  root :to => 'home#extjs' , :method => :get 
  namespace :api do 
    devise_for :users
    
    post 'authenticate_auth_token', :to => 'sessions#authenticate_auth_token', :as => :authenticate_auth_token 
    put 'update_password' , :to => "passwords#update" , :as => :update_password
    
    get 'search_role' => 'roles#search', :as => :search_role
    get 'search_customers' => 'customers#search', :as => :search_customers
    get 'search_projects' => 'projects#search', :as => :search_projects
    get 'search_categories' => 'categories#search', :as => :search_categories
    
    
    get 'work_reports' => 'works#reports', :as => :work_reports
    
    resources :customers 
    resources :projects 
    resources :app_users
    resources :categories 
    resources :works
  end
  
  get 'work_reports' => 'works#reports', :as => :work_reports
end
