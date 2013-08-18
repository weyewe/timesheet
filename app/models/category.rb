class Category < ActiveRecord::Base
  # validate :unique_non_deleted_name 
  has_many :projects
  
  validates_presence_of :name 
 
  def self.active_objects
    self.where(:is_deleted => false).order("id DESC")
  end
  
  def self.create_object( params )
    
    new_object = self.new 
    new_object.name = params[:name]
    new_object.is_billable = params[:is_billable] 
    
    new_object.save 
    return new_object 
  end
  
  def update_object( params )
    self.name = params[:name]
    self.is_billable = params[:is_billable] 
    
    self.save 
    return self
  end
  
  def delete_object
    # if self.bookings.active_objects.count != 0 
    #   self.errors.add(:generic_errors, "Sudah ada booking")
    #   return 
    # else
    #   self.destroy 
    # end
      
    self.destroy 
    
  end
end
