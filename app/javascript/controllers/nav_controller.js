import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [ "dropdown", "freelancer", "hirer" ]

  static values = {signIn: Boolean, accountId: String}

  initialize() {
    this.signInValue = window.walletConnection.isSignedIn();
    this.accountIdValue = window.walletConnection.getAccountId().replaceAll('.', '-');
    this.showDropdown()
  }

  showDropdown() {
    this.dropdownTargets.forEach((element, _index) => {
      element.hidden = !this.signInValue;
    })

    this.freelancerTargets.forEach((element, _index) => {
      element.href = "/freelancers/" + this.accountIdValue;
    })

    this.hirerTargets.forEach((element, _index) => {
      element.href = "/hirers/" + this.accountIdValue;
    })
  }
}