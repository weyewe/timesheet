class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :token_authenticatable, :confirmable,
  # :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  include TheRoleUserModel
  # Include default devise modules. Others available are:
  # :token_authenticatable, :encryptable, :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,  :token_authenticatable

  # Setup accessible (or protected) attributes for your model
  attr_accessible :email, :password, :password_confirmation, :remember_me, :name , :role_id
  
  validates_uniqueness_of :email 
  validates_presence_of :email  , :role_id 
  
  validate :valid_role
  
  def valid_role
    
    return if not role_id.present?
    
    if role_id == 0
      errors.add(:role_id, "Role harus dipilih")
    end
  end
  
  def self.create_main_user(params) 
    new_user = User.new( :email => params[:email], 
                            :password => params[:password],
                            :password => params[:password_confirmation] ,
                            :name => params[:name])
                      
  
    admin_role = Role.find_by_name ROLE_NAME[:admin]
    new_user.role_id = admin_role.id 
    new_user.is_main_user = true
    
    new_user.save 
  
    return new_user 
  end
  
  def self.active_objects
    self.where(:is_deleted => false).order("id DESC")
  end
  
  def delete_object 
    
    random_password                    = UUIDTools::UUID.timestamp_create.to_s[0..7]
    self.password = random_password
    self.password_confirmation = random_password 
    self.is_deleted = true 
    self.save 
    
  end
  
  def User.create_object(params)
    # only used in seeds.rb => we need to assign pre-determined password
    
    
    new_object                        = User.new 
    password                         = UUIDTools::UUID.timestamp_create.to_s[0..7]
    new_object.name                  = params[:name]
    new_object.email                 = params[:email] 
    new_object.role_id               =   params[:role_id]
    
    new_object.password              = password
    new_object.password_confirmation = password 
    
    new_object.save

    
     
    
    if new_object.valid? and Rails.env.production? 
      UserMailer.notify_new_user_registration( new_object , password    ).deliver 
    end
    return new_object
    
  end
  
  def User.create_by_employee( employee, params)
    return nil if employee.nil? 
    
    admin_role = Role.find_by_name ROLE_NAME[:admin]
    
    new_object                        = User.new 
    password                         = UUIDTools::UUID.timestamp_create.to_s[0..7]
    new_object.name                  = params[:name]
    new_object.email                 = params[:email] 
    new_object.role_id               =   params[:role_id]
    
    new_object.password              = password
    new_object.password_confirmation = password 
    
    new_object.save

    
     
    
    if new_object.valid? and Rails.env.production? 
      UserMailer.notify_new_user_registration( new_object , password    ).deliver
    end
    return new_object 

  end
  
  def update_by_employee( employee, params)
    return nil if employee.nil? 
      
    admin_role = Role.find_by_name ROLE_NAME[:admin]
    
    self.name                  = params[:name]
    self.email                 = params[:email] 
    
    
    if  self.is_main_user == true  
      self.role_id               = admin_role.id    
    else
      self.role_id = params[:role_id]
    end 
    
    self.save
    return self  
  end
  
  def update_password(  params) 
    self.password = params[:password]
    self.password_confirmation = params[:password_confirmation]
    
    self.save 
    
    return self 
    
  end
  
  def reset_password( employee, params ) 
    password                   = UUIDTools::UUID.timestamp_create.to_s[0..7]
    self.password              = password
    self.password_confirmation = password 
    
    if self.save
      UserMailer.notify_reset_password( employee, self , password    ).deliver
    end
    
    return self
  end
  
  def set_as_main_user 
    admin_role = Role.find_by_name ROLE_NAME[:admin]
    self.role_id = admin_role.id 
    self.is_main_user = true 
    self.save 
  end
end
