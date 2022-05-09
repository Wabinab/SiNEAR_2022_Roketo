use near_sdk::{
  env, near_bindgen, AccountId, require
};
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::collections::{LookupMap};
use std::collections::HashSet;

use near_helper::expect_lightweight;

pub type StreamId = String;

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct Contract {
    stopped_by_owner: LookupMap<AccountId, HashSet<StreamId>>
}


impl Default for Contract {
    fn default() -> Self {
      Self {
        stopped_by_owner: LookupMap::new(b"a".to_vec()),
      }
    }
}


#[near_bindgen]
impl Contract {
    /// Add stream id that's stopped by owner (deleted by roketo) here
    /// for future references. 
    pub fn add_stream_id(
      &mut self,
      stream_id: StreamId
    ) {
      // Skipped assert one yocto because we don't want to 
      // be taken to that "confirmation" page. 

      let account_id = env::signer_account_id();

      env::log_str(
        format!(
          "Add {} to {}",
          stream_id,
          account_id
        ).as_str(),
      );

      let mut stream_ids: HashSet<StreamId> = match self.stopped_by_owner.get(&account_id) {
        Some(value) => value,
        None => HashSet::new()
      };

      stream_ids.insert(stream_id);

      self.stopped_by_owner.insert(&account_id, &stream_ids);
    }


    /// Delete a stream id if it's not required anymore, for whatever reasons. Most common
    /// reason being: 
    /// - Wrongly added.
    /// - NOt needed anymore. 
    /// - Added here but also present in Roketo (hence, Wrongly added)
    pub fn remove_strema_id(
      &mut self,
      stream_id: StreamId
    ) {
      let account_id = env::signer_account_id();

      env::log_str(
        format!(
          "Remove {} from {}",
          stream_id,
          account_id
        ).as_str(),
      );

      let mut stream_ids = expect_lightweight(
        self.stopped_by_owner.get(&account_id),
        "This account id is never registered. Please check again."
      );

      stream_ids.remove(&stream_id);

      self.stopped_by_owner.insert(&account_id, &stream_ids);
    }


    /// Get the current stream id given account id. 
    pub fn get_stream_id(
      &self,
      account_id: AccountId
    ) -> HashSet<StreamId> {
      let stream_ids = expect_lightweight(
        self.stopped_by_owner.get(&account_id),
        "This account id doesn't exist in our database."
      );

      stream_ids
    }
}


#[cfg(all(test, not(target_arch = "wasm32")))]
mod tests {
    use super::*;
    use near_sdk::{VMContext, testing_env};
    use near_sdk::test_utils::VMContextBuilder;

    fn get_context(is_view: bool, deposit: u128) -> VMContext {
      VMContextBuilder::new()
          .current_account_id("contract".parse().unwrap())
          .signer_account_id(get_signer())
          .attached_deposit(deposit)
          .is_view(is_view)
          .build()
    }

    fn get_signer() -> AccountId {
      "alice_near".parse().unwrap()
    }


    #[test]
    fn test_add_stream_id_and_get() {
      let context = get_context(false, 1);
      testing_env!(context);

      let mut contract = Contract::default();
      contract.add_stream_id("some_id".to_owned());

      let data = contract.get_stream_id(get_signer());

      assert!(
        data.contains(&"some_id".to_owned())
      );
      assert_eq!(
        data.len(), 
        1
      );
    }

    #[test]
    fn test_add_multiple_stream_id() {
      let context = get_context(false, 1);
      testing_env!(context);

      let mut contract = Contract::default();
      contract.add_stream_id("first_id".to_owned());
      contract.add_stream_id("second_id".to_owned());
      contract.add_stream_id("third_id".to_owned());

      assert_eq!(
        contract.get_stream_id(get_signer()).len(),
        3
      );
    }

    #[test]
    fn add_multiple_and_delete() {
      let context = get_context(false, 1);
      testing_env!(context);

      let mut contract = Contract::default();
      contract.add_stream_id("first_id".to_owned());
      contract.add_stream_id("second_id".to_owned());
      contract.add_stream_id("third_id".to_owned());

      contract.remove_strema_id("second_id".to_owned());

      let data = contract.get_stream_id(get_signer());

      assert_eq!(data.len(), 2);

      assert!(
        data.contains(&"first_id".to_owned())
      );
      assert!(
        !data.contains(&"second_id".to_owned())
      );
      assert!(
        data.contains(&"third_id".to_owned())
      );

    }
}

