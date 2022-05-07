module ApplicationHelper
  def define_constants
    @node_url = 'https://rpc.testnet.near.org/'
    @conf = NearApi::Config.new(node_url: @node_url)
    @query = NearApi::Query.new(config = @conf)

    @contract = 'streaming-r-v2.dcversus.testnet'
  end

  def query_function(contract=@contract, function_name, metadata)
    data = @query.function(
      contract,
      function_name,
      metadata
    )["result"]["result"]

    if data.nil?
      {}
    else
      JSON.parse(data.pack('c*'))
    end
  end

  def yocto_to_near(yoctonear, decimal=3)
    one_decimal = ("1" + "0" * (24 - decimal)).to_i
    mNEAR = yoctonear.to_i / one_decimal


    # mNEAR.to_f / ("1" + "0" * decimal).to_i
    #  If you don't mind scientific notation, cancel everything below
    # and activate the line above. 

    first_n = (mNEAR.to_i / ("1" + "0" * decimal).to_i).to_s
    first_n ||= "0"

    last_n = mNEAR.to_s
    last_n ||= "0"
    if last_n.length < decimal
      last_n = ("0" * (decimal - last_n.length)) + last_n
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
