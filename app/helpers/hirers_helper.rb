require 'set'

module HirersHelper
  def convert_to_tps(price_per_hour)
    one_near = 1000000000000000000000000
    second_per_hour = 3600

    # Count the number of decimals
    # https://stackoverflow.com/questions/8597766/how-to-count-the-number-of-decimal-places-in-a-float
    decimal = price_per_hour.to_s.split('.').last.size
    decimal = 10.pow(decimal)

    price_int = (price_per_hour * decimal).to_i * one_near / decimal
    price_int / second_per_hour
  end

  def get_active_hirers(account_id)
    query_function(
      @contract,
      'get_account_outgoing_streams',
      {
        "account_id": account_id,
        "from": 0,
        "limit": 100
      }
    )
  end

  def get_stream(stream_id)
    query_function(
      @contract,
      'get_stream',
      {
        "stream_id": stream_id
      }
    )
  end

  def get_balance(token_id, account_id)
    query_function(
      token_id,
      'ft_balance_of',
      {
        "account_id": account_id
      }
    )
  end

  def get_token_metadata(token_id) 
    query_function(
      token_id,
      'ft_metadata',
      {}
    )
  end

  # https://stackoverflow.com/questions/28908214/converting-seconds-into-hours-only-using-ruby-in-built-function-except-the-day
  def seconds_to_hms(sec)
    if sec.finite?
      "%02d:%02d:%02d" % [sec / 3600, sec / 60 % 60, sec % 60]
    else
      sec
    end
  end

  def estimate_time(token_info)
    balance = yocto_to_near(token_info["balance"], 5).to_f 
    tps = yocto_to_near(token_info["tokens_per_sec"], 5).to_f
    seconds_to_hms balance/tps
  end


  def get_from_database(account_id, stream_id)
    query_function(
      @helper_contract,
      'get_stream_id',
      {
        "account_id": account_id
      }
    ).include? @stream_id
  end

  def get_stopped_by_owner(account_id)
    list_of_tokens = query_function(
      @helper_contract,
      'get_stream_id',
      {
        "account_id": account_id
      }
    )

    array = []

    list_of_tokens.each do |t|
      array.push(
        get_stream(t)
      )
    end

    array
  end
end
