class Work < ActiveRecord::Base
   
  belongs_to :project 
  belongs_to :category 
  belongs_to :user 
  
  validates_presence_of   :user_id, :project_id, :category_id , :start_datetime, :end_datetime
  
  validate :valid_project_id
  validate :valid_category_id
  validate :end_time_is_later_than_start_time
  
  def valid_project_id
    return if not project_id.present? 
    if project_id == 0 
      self.errors.add(:project_id , "Project Harus Dipilih")
    end
  end
  
  def valid_category_id
    return if not category_id.present? 
    if category_id == 0 
      self.errors.add(:category_id , "Category Harus Dipilih")
    end
  end
  
  def end_time_is_later_than_start_time
    return if not start_datetime.present? or not end_datetime.present?
    
    if start_datetime >= end_datetime
      self.errors.add(:start_datetime, "Harus lebih awal dari waktu selesai")
    end
    
  end
 
  def self.active_objects
    self.where(:is_deleted => false).order("id DESC")
  end
  
  
  def update_duration
    self.duration = (self.end_datetime.to_time - self.start_datetime.to_time).round/60
    self.save 
    
  end
  # 
  # def time_diff_in_minutes (time)
  #   diff_seconds = (Time.now - time).round
  #   diff_minutes = diff_seconds / 60
  #   return diff_minutes
  # end
  
  def self.create_object( params )
    
    new_object = self.new 
    new_object.project_id = params[:project_id]
    new_object.category_id = params[:category_id]
    new_object.description = params[:description] 
    new_object.start_datetime = params[:start_datetime]
    new_object.end_datetime = params[:end_datetime]
    
    
    if new_object.save 
      new_object.update_duration
    end
    return new_object 
  end
  
  def update_object( params )
    self.project_id = params[:project_id]
    self.category_id = params[:category_id]
    self.description = params[:description] 
    self.start_datetime = params[:start_datetime]
    self.end_datetime = params[:end_datetime]
    
    if self.save 
      self.update_duration
    end
    return self
  end
  
  def delete_object
    self.destroy 
  end
end
