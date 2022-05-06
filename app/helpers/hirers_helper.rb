module HirersHelper
  def convert_to_tps(price_per_hour)
    one_near = 1000000000000000000000000
    second_per_hour = 3600

    # Count the number of decimals
    # https://stackoverflow.com/questions/8597766/how-to-count-the-number-of-decimal-places-in-a-float
    decimal = price_per_hour.to_s.split('.').last.size 

    price_int = (price_per_hour * decimal).to_i * one_near / decimal
    price_int / second_per_hour
  end
end
