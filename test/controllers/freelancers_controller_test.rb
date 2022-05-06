require "test_helper"

class FreelancersControllerTest < ActionDispatch::IntegrationTest
  test "should get profile" do 
    get "/freelancers/freelancer-testnet"
    assert_response :success
  end
end
