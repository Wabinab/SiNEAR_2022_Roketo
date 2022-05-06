require "test_helper"

class FreelancersEditTest < ActionDispatch::IntegrationTest
  def setup
    @freelancer_path = "/freelancers/freelancer-testnet"
    @somebodyelse_path = "/freelancers/somebodyelse-testnet"
  end

  test "flash success after creation somebodyelse" do
    get @somebodyelse_path

    assert_difference 'Freelancer.count', 1 do 
      post @somebodyelse_path, params: {
        account_id: "somebodyelse-testnet",
        message: "I am a NEAR developer",
        price_per_hour: 0.1
      }
    end

    assert_template 'freelancers/profile'
    assert_not flash.nil?
    get @somebodyelse_path
    assert flash.empty?
  end

  test "flash success after update freelancer" do 
    get @freelancer_path

    assert_no_difference 'Freelancer.count' do 
      post @freelancer_path, params: {
        account_id: 'freelancer-testnet',
        message: "some description goes here",
        price_per_hour: 0.3
      }
    end

    assert_template 'freelancers/profile'
    assert_not flash.nil?
    get @freelancer_path
    assert flash.empty?
  end
end
