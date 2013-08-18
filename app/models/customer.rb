class Customer < ActiveRecord::Base
  # validate :unique_non_deleted_name 
  has_many :projects
  
  validates_presence_of :name 
 
  def self.active_objects
    self.where(:is_deleted => false).order("id DESC")
  end
  
  def self.create_object( params )
    
    new_object = self.new 
    new_object.name = params[:name]
    new_object.bb_pin = params[:bb_pin]
    new_object.mobile_phone = params[:mobile_phone]
    new_object.contact = params[:contact]
    
    
    new_object.save 
    return new_object 
  end
  
  def update_object( params )
    self.name = params[:name]
    self.bb_pin = params[:bb_pin]
    self.mobile_phone = params[:mobile_phone]
    self.contact = params[:contact]
    
    
    self.save 
    return self
  end
  
  def delete_object
    if self.bookings.active_objects.count != 0 
      self.errors.add(:generic_errors, "Sudah ada booking")
      return 
    else
      self.destroy 
    end
      
    
  end
end
