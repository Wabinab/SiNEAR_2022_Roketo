import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [ "start", "pause", "stop", "withdraw" ]

  static values = {status: String, streamId: String, streamOwner: String, currentAcc: String}

  initialize() {
    this.streamIdValue = document.getElementById('stream_id').value;
    this.statusValue = document.getElementById('status').value;
    this.streamOwnerValue = document.getElementById("stream_owner").value;
    this.currentAccValue = window.walletConnection.getAccountId();
    this.render_buttons()
    window.streamId = this.streamIdValue;
  }

  start_stream() {
    window.start_stream(this.streamIdValue);
    this.render_buttons();
  }

  pause_stream() {
    window.pause_stream(this.streamIdValue);
    this.render_buttons();
  }

  stop_stream() {
    window.stop_stream(this.streamIdValue);
    this.render_buttons();
  }

  withdraw_stream() {
    window.withdraw_stream(this.streamIdValue);
    this.render_buttons();
  }

  render_buttons() {
    // Every render needs repeating to check. 
    this.statusValue = document.getElementById('status').value;
    this.startButton()
    this.pauseButton()
    this.stopButton()
    this.withdrawButton()
  }

  startButton() {
    this.startTargets.forEach((element, _index) => {
      element.disabled = this.statusValue != "Paused"
    })
  }

  pauseButton() {
    this.pauseTargets.forEach((element, _index) => {
      element.disabled = this.statusValue != "Active"
    })
  }

  stopButton() {
    this.stopTargets.forEach((element, _index) => {
      // Hidden when it's not owner
      element.hidden = !(this.streamOwnerValue == this.currentAccValue);

      var g = ["Active", "Paused"];
      element.disabled = !g.includes(this.statusValue);
    })
  }

  withdrawButton() {
    this.withdrawTargets.forEach((element, _index) => {
      element.hidden = this.streamOwnerValue == this.currentAccValue;
      element.disabled = this.statusValue != "Active";
    })
  }

}