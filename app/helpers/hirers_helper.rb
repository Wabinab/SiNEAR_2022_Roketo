module HirersHelper
  def convert_to_tps(price_per_hour)
    one_near = 1000000000000000000000000
    second_per_hour = 3600

    price_per_hour * one_near / second_per_hour
  end
end
