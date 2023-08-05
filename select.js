var Sqrl = require('squirrelly');
var baseElement = require('./baseElement').baseElement;
class select extends baseElement{
    content;
    id;
    required = false;
    defaults;
    label = null
    htmlTemplate = `<div class="simple-select">
    <label for="{{modal.id}}_{{ms.no}}" class="mt-2 mr-2 small-label {{if(options.ms.style)}}{{ms.style}}{{/if}}">{{ms.label}} {{if(options.ms.required)}}<span class="required">*</span>{{/if}}</label>
    <select class="form-select mb-3 {{if(options.ms.width)}}{{ms.width}}{{#else}}w-100{{/if}}" bs-type="select" id="{{modal.id}}_{{ms.no}}" no="{{ms.no}}" extractable=true default="{{ms.default}}" extractionRule="{{ms.extraction}}">
        {{ each(options.ms.options) }}
            <option {{ if (options.ms.hasOwnProperty("default") && options.ms.default == @this)}} selected="selected"{{/if}}>{{@this}}</option>
        {{/each}}
    </select>
    {{ if (options.ms.onselect_r != "" ) }}
    <script>
        $(\`#{{modal.id}}_{{ms.no}}\`).on('change', function(){
            r_on_select('{{modal.id}}', {{ms.onselect_r | safe}}, $(this).val())
        })
    </script>
    {{/if}}
    </div>
    `
    constructor(modal, config) {
        super(modal, config);
        this.label = config.label
        this.id = `${modal.id}_${config.no}`
        if (config.required) {
            this.required = config.required
        }
        this.defaults = config.hasOwnProperty("default") ? config.default : ""
        config.onselect_r = config.hasOwnProperty("onselect_r") ? JSON.stringify(config.onselect_r) : ""
        this.content = Sqrl.Render(this.htmlTemplate, {
            modal: modal,
            ms: config
        })
    }
    clearContent() {
        $(`#${this.id}`).val(this.defaults)
       //Note we don't remove the items from the select control. These remain on the dialog as in most cases they are static
    }
    canExecute(refToBaseModal) {
        if (this.required && this.getVal().length > 0) {
            return true
        } else if (!this.required) {
            return true
        }
        dialog.showMessageBoxSync({ type: "error", buttons: ["OK"], title: "Select control rule violation", message: `You need to make a selection in the Select control with label: "${this.label}"` })
        return false
    }
}
module.exports.element = select;