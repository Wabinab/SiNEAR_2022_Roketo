class Freelancer < ApplicationRecord
  validates :account_id, presence: true, uniqueness: true
  validates :message, presence: true
  validates :price_per_hour, presence: true, numericality: { :greater_than => 0 }
end
