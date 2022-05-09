import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [ "display", "button" ]

  static values = {remove: Boolean, reason: String, streamId: String}

  initialize() {
    this.streamIdValue = document.getElementById('stream_id').value;
    this.removeValue = document.getElementById('remove_value').value;
    this.render_buttons()
  }

  add_or_remove() {
    if (this.removeValue) {
      window.remove_stream_id(this.streamIdValue)
    } else {
      window.add_stream_id(this.streamIdValue)
    }

    window.location.reload();
    this.render_buttons()
  }

  render_buttons() {
    // Every render needs repeating to check. 
    var element = document.getElementById('reason');

    if (element) {
      this.reasonValue = element.value;
    }

    this.displayControl();
    this.buttonControl();
  }

  displayControl() {
    window.reasonValue = this.reasonValue;
    this.displayTargets.forEach((element, _index) => {
      element.hidden = this.reasonValue != "StoppedByOwner"
    })
  }

  buttonControl() {
    window.removeValue = this.removeValue
    this.buttonTargets.forEach((element, _index) => {
      if (this.removeValue) {
        element.innerText = "Remove from database"
        element.classList.remove('btn-primary')
        element.classList.add('btn-secondary')
      } else {
        element.innerText = "Add to database"
        element.classList.remove('btn-secondary')
        element.classList.add('btn-primary')
      }
    })
  }

}