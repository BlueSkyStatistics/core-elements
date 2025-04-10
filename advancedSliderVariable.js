/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */

var Sqrl = require('squirrelly');
var baseElement = require('./baseElement').baseElement;

class AdvancedSlider extends baseElement {
    content;
    id;
    value;
    htmlTemplate = `<div class="row  {{ms.style}}">
    <div class="form-group mt-1 w-75">
      <label for="{{modal.id}}_{{ms.no}}">{{ms.label}}</label>
      <div class="form-row">
        <div class="col-8">
          <input type="range" bs-type="slider" no="{{ms.no}}" class="custom-range slider" min="{{ms.min}}" max="{{ms.max}}" step="{{ms.step}}" value="{{ms.value}}" id="{{modal.id}}_{{ms.no}}" default="{{ms.value}}" extractable=true extractionRule="{{ms.extraction}}">
        </div>
        <div class="col-4">     
          <input id="{{modal.id}}_{{ms.no}}_value" type="text" bs-type="text" extractable=false></input>
        </div>
      </div>
    </div>
    <script>
        $("#{{modal.id}}_{{ms.no}}_value").val($("#{{modal.id}}_{{ms.no}}").val());
        document.getElementById("{{modal.id}}_{{ms.no}}").oninput = function() {
            $("#{{modal.id}}_{{ms.no}}_value").val($("#{{modal.id}}_{{ms.no}}").val());
        }
        document.getElementById("{{modal.id}}_{{ms.no}}_value").onchange = function() {
            if (parseFloat($("#{{modal.id}}_{{ms.no}}_value").val()) <= parseFloat($("#{{modal.id}}_{{ms.no}}").attr("max")) && parseFloat($("#{{modal.id}}_{{ms.no}}_value").val()) >= parseFloat($("#{{modal.id}}_{{ms.no}}").attr("min"))) {
               $("#{{modal.id}}_{{ms.no}}").val($("#{{modal.id}}_{{ms.no}}_value").val());
               $("#{{modal.id}}_{{ms.no}}_value").val($("#{{modal.id}}_{{ms.no}}").val());
            } else {
              $("#{{modal.id}}_{{ms.no}}_value").val($("#{{modal.id}}_{{ms.no}}").attr("default"));
              $("#{{modal.id}}_{{ms.no}}").val($("#{{modal.id}}_{{ms.no}}").attr("default"));
            }
        }
    </script>
  </div>`

    constructor(modal, config) {
        super(modal, config);
        this.content = Sqrl.Render(this.htmlTemplate, {modal: modal, ms: config})
        this.id = `${modal.id}_${config.no}`
    }

    clearContent() {
        $(`#${this.id}`).val($(`#${this.id}`).attr("default"))
        $(`#${this.id}_value`).val($(`#${this.id}`).attr("default"))
    }

}

module.exports.element = AdvancedSlider;