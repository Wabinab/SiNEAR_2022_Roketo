import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [ "dropdown" ]

  static values = {signIn: Boolean}

  initialize() {
    this.signInValue = window.walletConnection.isSignedIn()
    this.showDropdown()
  }

  showDropdown() {
    this.dropdownTargets.forEach((element, _index) => {
      element.hidden = !this.signInValue;
    })
  }
}