import { connect, Contract, keyStores, WalletConnection, utils } from 'near-api-js';
import getConfig from './config.js';


const nearConfig = getConfig('development', 'streaming-r-v2.dcversus.testnet')
const nearConfig2 = getConfig('development', 'wrap.testnet')

const near = await connect(Object.assign({ deps: { keyStore: new keyStores.BrowserLocalStorageKeyStore() } }, nearConfig));
const near2 = await connect(Object.assign({ deps: { keyStore: new keyStores.BrowserLocalStorageKeyStore() } }, nearConfig2));

window.nearConfig = nearConfig
window.near = near

window.nearCOnfig2 = nearConfig2
window.near2 = near2

window.walletConnection = new WalletConnection(near)
window.accountId = window.walletConnection.getAccountId()

window.wrap_contract = await new Contract(window.walletConnection.account(), nearConfig2.contractName, {
  changeMethods: ['ft_transfer_call', 'near_deposit'],
})

window.contract = await new Contract(window.walletConnection.account(), nearConfig.contractName, {
  changeMethods: ['start_stream', 'pause_stream', 'stop_stream'],
})


function logout() {
  window.walletConnection.signOut()
  window.location.replace(window.location.origin + window.location.pathname)
}

function login() {
  window.walletConnection.requestSignIn(nearConfig.contractName)
}


function create_stream() {
  var amount = document.getElementById("amount").value;
  var receiver_id = document.getElementById("receiver_id").value;
  var tokens_per_sec = parseInt(document.getElementById("tokens_per_sec").value);

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
            "tokens_per_sec": tokens_per_sec
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


function set_greeting() {
  var message = document.getElementById("form_message").value;
  window.contract.set_greeting({"message": message})
  .then(
    value => {
      alert("Successful set_greeting for yourself.");
      window.location.reload();
    },
    err => alert(err),
  );
}


window.parse_near = utils.format.parseNearAmount
window.create_stream = create_stream
window.logout = logout
window.login = login