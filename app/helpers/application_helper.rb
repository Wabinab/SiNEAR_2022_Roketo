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
    mNEAR.to_f / ("1" + "0" * decimal).to_i
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
