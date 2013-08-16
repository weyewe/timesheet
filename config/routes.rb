Timesheet::Application.routes.draw do
  devise_for :users
  root :to => 'home#extjs' , :method => :get 
end
