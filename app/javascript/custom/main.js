import { connect, Contract, keyStores, WalletConnection, utils } from 'near-api-js';
import getConfig from './config.js';
import Big from 'big-js';


const nearConfig = getConfig('development', 'streaming-r-v2.dcversus.testnet')
const nearConfig2 = getConfig('development', 'wrap.testnet')
const nearConfig3 = getConfig('development', 'roketo_helper.wabinab.testnet')

const near = await connect(Object.assign({ deps: { keyStore: new keyStores.BrowserLocalStorageKeyStore() } }, nearConfig));
const near2 = await connect(Object.assign({ deps: { keyStore: new keyStores.BrowserLocalStorageKeyStore() } }, nearConfig2));
const near3 = await connect(Object.assign({ deps: { keyStore: new keyStores.BrowserLocalStorageKeyStore() } }, nearConfig3));


window.nearConfig = nearConfig
window.near = near

window.nearConfig2 = nearConfig2
window.near2 = near2

window.nearConfig3 = nearConfig3
window.near3 = near3

window.walletConnection = new WalletConnection(near)
window.accountId = window.walletConnection.getAccountId()

window.wrap_contract = await new Contract(window.walletConnection.account(), nearConfig2.contractName, {
  viewMethods: ['ft_balance_of'],
  changeMethods: ['ft_transfer_call', 'near_deposit', 'storage_deposit'],
})

window.contract = await new Contract(window.walletConnection.account(), nearConfig.contractName, {
  viewMethods: ['get_stream'],
  changeMethods: ['start_stream', 'pause_stream', 'stop_stream', 'withdraw'],
})

window.helper_contract = await new Contract(window.walletConnection.account(), nearConfig3.contractName, {
  changeMethods: ['add_stream_id', 'remove_strema_id'],
})


function logout() {
  window.walletConnection.signOut()
  window.location.replace(window.location.origin + window.location.pathname)
}

function login() {
  window.walletConnection.requestSignIn(nearConfig.contractName)
}


function create_stream(amount) {
  var description = document.getElementById("description").value;
  var receiver_id = document.getElementById("receiver_id").value;
  var tokens_per_sec = parseInt(document.getElementById("tokens_per_sec").value);
  // var tokens_per_sec = Big(document.getElementById("tokens_per_sec").value).toFixed();

  var amount_parsed = utils.format.parseNearAmount(amount);

  window.wrap_contract.ft_transfer_call(
    {
      receiver_id: 'streaming-r-v2.dcversus.testnet',
      amount: amount_parsed,
      msg: JSON.stringify({
        Create: {
          request: {
            "owner_id": window.walletConnection.getAccountId(),
            "receiver_id": receiver_id,
            "tokens_per_sec": tokens_per_sec,
            "description": description
          }
        }
      }),
    },
    200000000000000,  // 200 TGas
    1
  ).then(
    value => {
      window.location.reload();
    },
    err => alert(err)
  );
}


function start_stream(stream_id) {
  // var stream_id = document.getElementById("stream_id").value;

  window.contract.start_stream(
    {
      "stream_id": stream_id
    },
    200000000000000,  // 200 TGas
    1
  );
}


function pause_stream(stream_id) {
  window.contract.pause_stream(
    {
      "stream_id": stream_id
    },
    200000000000000, // 200 TGas
    1
  );
}


function stop_stream(stream_id) {
  window.contract.stop_stream(
    {
      "stream_id": stream_id
    },
    200000000000000, // 200 TGas
    1
  );
}


function withdraw_stream(stream_id) {
  window.contract.withdraw(
    {
      "stream_ids": [stream_id]
    },
    200000000000000, // 200 TGas
    1
  )
}


function deposit_storage() {
  var account_id = window.walletConnection.getAccountId();
  var storage_max = document.getElementById("storage_max").value;

  // Use JSON RPC calls and pass in contract account id, if need to change
  // rather than do it this way. 
  window.wrap_contract.storage_deposit(
    {
      "account_id": account_id,
    },
    200000000000000,
    storage_max
  );
}


function add_stream_id(stream_id) {
  window.helper_contract.add_stream_id(
    {
      "stream_id": stream_id
    },
    30000000000000, // 30 TGas,
    0
  );
}


function remove_stream_id(stream_id) {
  window.helper_contract.remove_strema_id(
    {
      "stream_id": stream_id
    },
    30000000000000,  // 30 Tgas
    0
  );
}


function yocto_to_near(yocto) {
  var full_value =  parseFloat(utils.format.formatNearAmount(yocto));

  // Always 3DP. 
  var rounded_down = parseFloat(Math.floor(full_value * 1000) / 1000);
  return rounded_down.toFixed(3);
}



window.create_stream = create_stream
window.start_stream = start_stream
window.pause_stream = pause_stream
window.stop_stream = stop_stream
window.withdraw_stream = withdraw_stream
window.deposit_storage = deposit_storage
window.add_stream_id = add_stream_id
window.remove_stream_id = remove_stream_id
window.yocto_to_near = yocto_to_near
window.logout = logout
window.login = login