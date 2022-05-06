require "test_helper"

class HirersControllerTest < ActionDispatch::IntegrationTest
  test "should get profile" do
    get "/hirers/hirers-testnet"
    assert_response :success
  end
end
