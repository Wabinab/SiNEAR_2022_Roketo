module FreelancersHelper
  def get_active_freelancers(account_id)
    query_function(
      @contract,
      'get_account_incoming_streams',
      {
        "account_id": account_id,
        "from": 0,
        "limit": 100
      }
    )
  end

  def not_yet_registered_storage(storage_id, account_id)
    data = query_function(
      storage_id,
      'storage_balance_of',
      {
        "account_id": account_id
      }
    )

    if data.nil?
      true
    else
      false
    end
  end

  def get_storage_max(storage_id)
    data = query_function(
      storage_id,
      'storage_balance_bounds',
      {}
    )["max"]
  end
end
