import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [ "slide", "name" ]

  static values = {amount: String, balance: String}

  initialize() {
    this.balanceValue = document.getElementById("balance").innerText;
  }

  hire() {
    this.amountValue = document.getElementById("amount").value;
    if (parseFloat(this.amountValue) <= parseFloat(this.balanceValue)) {
      window.create_stream(this.amountValue);
      this.redirectAfter();
    } else {
      alert('You do not have enough balance. Please swap more money at ref finance.' + 
        "\nYour balance: " + this.balanceValue +
        "\nYou pay: " + this.amountValue
      );
    }
    
  }

  redirectAfter() {
    window.location.replace(
      "/hirers/" + window.walletConnection.getAccountId().replaceAll('.', '-')
    );
  }
}