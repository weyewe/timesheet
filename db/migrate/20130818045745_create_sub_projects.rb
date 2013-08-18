class CreateSubProjects < ActiveRecord::Migration
  def change
    create_table :sub_projects do |t|

      t.timestamps
    end
  end
end
