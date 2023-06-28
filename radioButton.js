

var Sqrl = require('squirrelly');
var baseElement = require('./baseElement').baseElement;

class radioButton extends baseElement{
    content;
    id;
    radio_id;
    dependant = [];
    default_state = false;
    required = false;
    increment = '';
    label = null;
    htmlTemplate = `<div class="form-check {{if(options.ms.style)}}{{ms.style}}{{/if}}">
    <input class="form-check-input" 
           type="radio" bs-type="radio" name="{{modal.id}}_{{ms.no}}" 
           no="{{ms.no}}" id="{{modal.id}}_{{ms.no}}_{{ms.increment}}" 
           {{if(options.ms.syntax)}} syntax="{{ms.syntax}}" {{/if}} 
           extractable=true extractionRule="{{ms.extraction}}" 
           value="{{ms.value}}"
           onchange="changeRadio(event)"
           {{ if(options.ms.dependant_objects) }}   
              data-dependants={{ ms.dependant_objects | safe }} 
           {{/if}}
           default_state={{if (options.ms.state === "")}} false {{#else}} true {{/if}} 
           {{ms.state}}>
    <label class="form-check-label small-label" for="{{modal.id}}_{{ms.no}}_{{ms.increment}}">
        {{ms.label}}
    </label>
  </div>
  `

    constructor(modal, config) {
        super(modal, config);
        this.label = config.label;
        this.default_state = config.state == "checked" ? true : false
        var outer_this = this
        this.increment = config.increment;
        if (config.dependant_objects) {
            config.dependant_objects.forEach(function(element) {
                outer_this.dependant.push(`#${modal.id}_${element}`)
            })
            config.dependant_objects = this.dependant
        }
        if (config.required) {
            this.required = config.required
        }
        this.content = Sqrl.Render(this.htmlTemplate, {modal: modal, ms: config})
        this.id = `${modal.id}_${config.no}`
        this.radio_id = `${modal.id}_${config.no}_${config.increment}`
    }

    clearContent() {
        $(`#${this.radio_id}`).prop("checked", this.default_state)
        $(`#${this.radio_id}`).trigger('change');
    }

    canExecute(refToBaseModal) {
        var BreakException = {};
        var res = true
        var outer_this = this;
        if (this.required && this.dependant && $(`#${this.radio_id}`).is(':checked')) {
            try{
                this.dependant.forEach(function(element) {
                    if ($(`${element}`).attr("type") === 'text') {
                        if ($(`${element}`).val() === '' || $(`${element}`).val() === undefined) {
                            res = false;
                            dialog.showMessageBoxSync({type: "error", buttons: ["OK"], title: "Rediobutton rule violation", message: `Radiobutton with label: "${outer_this.label}" requires another control to be populated to proceed`})
                            throw BreakException;
                        }
                    }
                })
            } catch (e) {
                if (e !== BreakException) throw e;
            }
        }
        return res
    }
}

module.exports.element = radioButton;