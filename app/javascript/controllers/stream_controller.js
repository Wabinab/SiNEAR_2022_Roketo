import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [ "start", "pause", "stop" ]

  static values = {current: String, streamId: String}

  initialize() {
    this.streamIdValue = document.getElementById('stream_id').value;
    this.currentValue = document.getElementById('status').value;
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

  render_buttons() {
    // Every render needs repeating to check. 
    this.currentValue = document.getElementById('status').value;
    this.startButton()
    this.pauseButton()
    this.stopButton()
  }

  startButton() {
    this.startTargets.forEach((element, _index) => {
      element.disabled = this.currentValue != "Paused"
    })
  }

  pauseButton() {
    this.pauseTargets.forEach((element, _index) => {
      element.disabled = this.currentValue != "Active"
    })
  }

  stopButton() {
    this.stopTargets.forEach((element, _index) => {
      var g = ["Active", "Paused"];
      element.disabled = !g.includes(this.currentValue);
    })
  }

}