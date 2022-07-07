

var Sqrl = require('squirrelly');
var baseElement = require('./baseElement').baseElement;

class comboBox extends baseElement{
    content;
    id;
    required = false;
    defaults;
    label = null
    htmlTemplate = `<label for="{{modal.id}}_{{ms.no}}" class="mt-2 mr-2 small-label {{if(options.ms.style)}}{{ms.style}}{{/if}}">{{ms.label}} {{if(options.ms.required)}}<span class="required">*</span>{{/if}}</label>
    <div class="list-group ms-list {{if(options.ms.style)}}{{ms.style}}{{/if}}">
        <select class="list-group borderless" bs-type="combobox" {{ if (options.ms.multiple) }} multiple {{/if}} id="{{modal.id}}_{{ms.no}}" no="{{ms.no}}" extractable=true default="{{ms.default}}" extractionRule="{{ms.extraction}}">
            {{ each(options.ms.options) }}
               <option {{ if (options.ms.hasOwnProperty("default") && options.ms.default.split("|").includes(@this))}}selected="selected"{{/if}}>{{@this}}</option> 
            {{/each}}
        </select>
    </div>
    `

    constructor(modal, config) {
        super(modal, config)
        this.label = config.label
        if (config.required) {
            this.required = config.required
        }
        this.defaults = config.hasOwnProperty("default") ? config.default.split("|") : []
        this.content = Sqrl.Render(this.htmlTemplate, {modal: modal, ms: config})
        this.id = `${modal.id}_${config.no}`
    }

    clearContent() {
        var outer_this = this;
        $(`#${this.id}`).find('option').each(function(index, item){
            if (outer_this.defaults.includes(item.value)){
                $(`#${outer_this.id}`).siblings("ul").find("a")[index].classList.add("active") ;
                item.setAttribute("selected", "selected")
            } else {
                item.removeAttribute('selected');
                if ($(`#${outer_this.id}`).siblings("ul").find("a")[index] != undefined){
                    $(`#${outer_this.id}`).siblings("ul").find("a")[index].classList.remove("active") ;
                }
            }
        })
        
    }

    canExecute(refToBaseModal) {
        if (this.required && this.getVal().length > 0){
            return true
        } else if ( !this.required ) {
            return true
        }
        dialog.showMessageBoxSync({type: "error", buttons: ["OK"], title: "Combobox control rule violation", message: `You need to make a selection in the Combobox with label: "${this.label}"`})                
        return false
    }
    
}

module.exports.element = comboBox;