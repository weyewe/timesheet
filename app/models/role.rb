class Role < ActiveRecord::Base
  include RoleModel
  attr_accessible :name, :title, :description, :the_role 
end
