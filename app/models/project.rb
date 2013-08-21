class Project < ActiveRecord::Base
   
  has_many :works
  belongs_to :customer 
  
  validates_presence_of :title  , :customer_id
  
  validate :valid_customer_id
  
  def valid_customer_id
    return if not customer_id.present? 
    if customer_id == 0 
      self.errors.add(:customer_id , "Customer Harus Dipilih")
    end
  end
 
  def self.active_objects
    self.where(:is_deleted => false).order("id DESC")
  end
  
  def self.create_object( params )
    
    new_object = self.new 
    new_object.title = params[:title]
    new_object.description = params[:description]
    new_object.deadline_date = params[:deadline_date] 
    new_object.customer_id = params[:customer_id]
    
    
    new_object.save 
    return new_object 
  end
  
  def update_object( params )
    self.title = params[:title]
    self.description = params[:description]
    self.deadline_date = params[:deadline_date]
    self.customer_id = params[:customer_id]
    
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
