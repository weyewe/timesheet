class CreateCategories < ActiveRecord::Migration
  def change
    create_table :categories do |t|
      t.string :name 
      t.boolean :is_billable, :default => false 
      
      t.boolean :is_deleted, :default => false 

      t.timestamps
    end
  end
end
