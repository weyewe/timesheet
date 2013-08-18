class CreateWorks < ActiveRecord::Migration
  def change
    create_table :works do |t|

      t.integer :project_id 
      t.integer :user_id 
      t.integer :category_id # simplification. a work belongs to one category
      # if this is working, will do the habtm
      
      t.datetime :start_datetime
      t.datetime :end_datetime 
      
      t.integer :duration  # in minutes 
      
      
      
      
      t.boolean :is_deleted, :default => false 
      
      
      t.timestamps
    end
  end
end
