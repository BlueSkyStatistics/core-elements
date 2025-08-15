/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */

var Sqrl = require('squirrelly');
var baseElement = require('./baseElement').baseElement;

class Slider extends baseElement{
    content;
    id;
    value;
    htmlTemplate = `<div class="row {{if(options.ms.style)}}{{ms.style}}{{/if}}">
    <div class="form-group mt-1 w-75">
      <label for="{{modal.id}}_{{ms.no}}">{{ms.label}}</label>
      <div class="form-row">
        <div class="col-8">
          <input type="range" bs-type="slider" class="custom-range slider" no="{{ms.no}}" min="{{ms.min}}" max="{{ms.max}}" step="{{ms.step}}" value="{{ms.value}}" id="{{modal.id}}_{{ms.no}}" extractable=true extractionRule="{{ms.extraction}}">
        </div>
        <div class="col-4">     
          <span id="{{modal.id}}_{{ms.no}}_value"></span>
        </div>
      </div>
    </div>
    <script>
        $("#{{modal.id}}_{{ms.no}}_value").html($("#{{modal.id}}_{{ms.no}}").val());
        document.getElementById("{{modal.id}}_{{ms.no}}").oninput = function() {
            $("#{{modal.id}}_{{ms.no}}_value").html($("#{{modal.id}}_{{ms.no}}").val());
        }
    </script>
  </div>`

    constructor(modal, config) {
      super(modal, config)
      this.content = Sqrl.Render(this.htmlTemplate, {modal: modal, ms: config})
      this.value = config.value;
      this.id = `${modal.id}_${config.no}`
    }

    canExecute() {
      return true
    }

    clearContent() {
        $(`#${this.id}`).val(`${this.value}`)
    }

}

module.exports.element = Slider;