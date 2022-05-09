import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [ "submit", "tooltip" ]

  static values = {amount: String, balance: String, account: String, innerAccount: String}

  initialize() {
    this.balanceValue = document.getElementById("balance").innerText;
    this.accountValue = document.getElementById("receiver_id").value.replaceAll('.', '-');
    this.innerAccountValue = window.walletConnection.getAccountId().replaceAll('.', '-')
    this.enableSubmit()
  }

  hire() {
    this.amountValue = document.getElementById("amount").value;
    if (parseFloat(this.amountValue) <= parseFloat(this.balanceValue)) {
      window.create_stream(this.amountValue).then(
        this.redirectAfter()
      );
    } else {
      alert('You do not have enough balance. Please swap more money at ref finance.' + 
        "\nYour balance: " + this.balanceValue +
        "\nYou pay: " + this.amountValue
      );
    }
    
    this.enableSubmit()
  }

  redirectAfter() {
    window.location.replace(
      "/hirers/" + this.innerAccountValue
    );
  }

  enableSubmit() {
    this.submitTargets.forEach((element, _index) => {
      element.disabled = this.accountValue == this.innerAccountValue;
    })

    this.tooltipTargets.forEach((element, _index) => {
      if (this.accountValue == this.innerAccountValue) {
        element.innerText = "You cannot hire yourself."
      } else {
        element.innerText = ""
      }
      
    })
  }
}