require "test_helper"

class SiteLayoutTest < ActionDispatch::IntegrationTest

  test "redirect user to freelancer" do 
    get "/users/freelancer-testnet"
    follow_redirect!
    assert_template "freelancers/profile"
  end

end
