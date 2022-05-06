class CreateFreelancers < ActiveRecord::Migration[7.0]
  def change
    create_table :freelancers do |t|
      t.string :account_id
      t.string :message
      t.float :price_per_hour

      t.timestamps
    end
    add_index :freelancers, :account_id, unique: true
  end
end
