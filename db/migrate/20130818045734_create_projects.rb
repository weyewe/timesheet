class CreateProjects < ActiveRecord::Migration
  def change
    create_table :projects do |t|
      t.integer :customer_id
      t.string :title
      t.text :description 
      t.datetime  :deadline_date
      t.datetime  :internal_deadline_date
      
      t.boolean   :is_closed, :default => false 
      t.datetime  :closing_date 
      
      
      t.boolean :is_deleted , :default => false 
      
      t.timestamps
    end
  end
end
