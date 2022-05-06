require "test_helper"

class FreelancerTest < ActiveSupport::TestCase
  def setup
    @freelancer = freelancers(:freelancer)
  end

  test "should be valid" do
    assert @freelancer.valid?
  end

  test "account_id should be present" do 
    @freelancer.account_id = "   "
    assert_not @freelancer.valid?
  end

  test "message should be present" do 
    @freelancer.message = "   "
    assert_not @freelancer.valid?
  end

  test "price should be present" do 
    @freelancer.price_per_hour = "  "
    assert_not @freelancer.valid?
  end

  test "price should be larger than 0" do 
    @freelancer.price_per_hour = 0
    assert_not @freelancer.valid?
  end

  test "account id should be unique" do
    dup_user = @freelancer.dup 
    @freelancer.save 
    assert_not dup_user.valid?
  end
end
