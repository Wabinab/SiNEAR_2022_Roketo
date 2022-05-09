class FreelancersForHire < ActiveRecord::Migration[7.0]
  def change
    add_column :freelancers, :for_hire, :boolean
  end
end
