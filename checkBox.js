

var Sqrl = require('squirrelly');
var baseElement = require('./baseElement').baseElement;

class checkBox extends baseElement{
    content;
    id;
    dependant = [];
    required = false;
    label = null
    htmlTemplate = `<div class="form-check {{if(!options.ms.newline)}}form-check-inline{{/if}} {{if(options.ms.style)}}{{ms.style}}{{/if}}">
    <input type="checkbox" bs-type="{{if(options.ms.bs_type)}}{{ms.bs_type}}{{#else}}checkbox{{/if}}" 
           class="form-check-input" id="{{modal.id}}_{{ms.no}}" no="{{ms.no}}" 
           extractable=true extractionRule="{{ms.extraction}}" 
           {{if(options.ms.true_value)}} true-value="{{ms.true_value}}"{{/if}}
           {{if(options.ms.false_value)}} false-value="{{ms.false_value}}"{{/if}}
           onchange="changeCheckBox(event)"
           {{ if(options.ms.dependant_objects) }}  
              data-dependants={{ ms.dependant_objects | safe }} 
           {{/if}}
           default_state={{if (options.ms.state === "")}} false {{#else}} true {{/if}} 
           {{ms.state}}
           >
    <label class="form-check-label" for="{{modal.id}}_{{ms.no}}">{{ms.label}}</label>
    </div>`


    constructor(modal, config) {
        super(modal, config);
        var outer_this = this
        this.label = config.label
        this.state = config.state ? true : false;
        if (config.dependant_objects) {
            config.dependant_objects.forEach(function(element) {
                outer_this.dependant.push(`#${modal.id}_${element}`)
            })
            config.dependant_objects = this.dependant
        }
        this.modal_id = modal.id
        if (config.required) {
            this.required = config.required
        }
        this.content = Sqrl.Render(this.htmlTemplate, {modal: modal, ms: config})
        this.id = `${modal.id}_${config.no}`
    }

    clearContent() {
        if (this.state) {
            $(`#${this.id}`).prop("checked", true)
        } else {
            $(`#${this.id}`).prop("checked", false)
        }
        $(`#${this.id}`).trigger('change');
    }

    canExecute(refToBaseModal) {
        var BreakException = {};
        var res = true
        var outer_this = this;
        if (this.required && this.dependant && this.getVal() ){
            try{
                this.dependant.forEach(function(element) {
                    if ($(`${element}`).attr("type") === 'text') {
                        if ($(`${element}`).val() === '' || $(`${element}`).val() === undefined) {
                            res = false;
                            dialog.showMessageBoxSync({type: "error", buttons: ["OK"], title: "Checkbox rule violation", message: `Checkbox with label: "${outer_this.label}" requires another control to be populated to proceed`})
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

module.exports.element = checkBox;