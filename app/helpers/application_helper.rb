module ApplicationHelper
  def define_constants
    @node_url = 'https://rpc.testnet.near.org/'
    @conf = NearApi::Config.new(node_url: @node_url)
    @query = NearApi::Query.new(config = @conf)

    @contract = 'streaming-r-v2.dcversus.testnet'
    @helper_contract = 'roketo_helper.wabinab.testnet'
    
    # Currently hardcoded
    @coin_contract = 'wrap.testnet'
  end

  def query_function(contract=@contract, function_name, metadata)
    data = @query.function(
      contract,
      function_name,
      metadata
    )["result"]["result"]

    if data.nil?
      []
    else
      JSON.parse(data.pack('c*'))
    end
  end

  def yocto_to_near(yoctonear, to_dp=3, token_decimal=24)
    one_to_dp = ("1" + "0" * (token_decimal - to_dp)).to_i
    mNEAR = yoctonear.to_i / one_to_dp


    # mNEAR.to_f / ("1" + "0" * to_dp).to_i
    #  If you don't mind scientific notation, cancel everything below
    # and activate the line above. 

    first_n = (mNEAR.to_i / ("1" + "0" * to_dp).to_i).to_s
    first_n ||= "0"

    if first_n.length > 1
      last_n = mNEAR.to_s[first_n.length..-1]
    else
      last_n = mNEAR.to_s
    end

    last_n ||= "0"
    if last_n.length < to_dp
      last_n = ("0" * (to_dp - last_n.length)) + last_n
    end

    first_n + "." + last_n
  end

  def color_by_status(status)
    if status == "Active" 
      "text-success"
    elsif status == "Paused"
      "text-warning"
    else
      "text-danger"
    end
  end
end
