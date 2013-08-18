class CreateCustomers < ActiveRecord::Migration
  def change
    create_table :customers do |t|

      t.string :name
      t.string :bb_pin
      t.string :mobile_phone
      t.string :contact 
      
      t.boolean :is_deleted, :default => false 
      
      
      
      t.timestamps
    end
  end
end
