var Sqrl = require('squirrelly');
var baseElement = require('./baseElement').baseElement;


class inputVariable extends baseElement {
    content;
    id;
    value = null;
    enforceRobjectRules = undefined;
    allowSpacesNew = undefined;
    required = false;
    type_expected = null;
    overwrite = null;
    allow_spaces=false;
        label = null
    width = "w-75"
    htmlTemplate = `
    <div class="mb-2 {{if(options.ms.style)}}{{ms.style}}{{/if}} {{if(options.ms.ml)}}ml-{{ms.ml}}{{/if}}">
    <div class="row">
        <div class="col-12">
            <label for="{{modal.id}}_{{ms.no}}" class="mt-2 mr-2 small-label">{{ms.label}} {{if(options.ms.required)}}<span class="required">*</span>{{/if}}</label>
        </div>
    </div>
    <div class="row">
        <div class="col-12">
            <input class="{{if(options.ms.width)}}{{ms.width}}{{#else}}w-75{{/if}}" type="text" bs-type="{{if(options.ms.type)}}{{ms.type}}{{#else}}text{{/if}}" 
                   id="{{modal.id}}_{{ms.no}}" 
                   {{if(options.ms.placeholder)}} placeholder="{{ms.placeholder}}" {{/if}}
                   no="{{ms.no}}" extractable=true extractionRule="{{ms.extraction}}" 
                   {{if(options.ms.wrapped)}} wrapped="{{ms.wrapped}}" {{/if}} 
                   {{if(options.ms.value !== undefined)}} default="{{ms.value}}" value="{{ms.value}}" {{#else}} default="" {{/if}}
                   {{if(options.ms.filter)}} filter="{{ms.filter}}" {{/if}} ondrop="dropToInput(event)">
        </div>
    </div>
    </div>`

    constructor(modal, config) {
        super(modal, config);
        this.label = config.label
        if (config.value !== undefined) {
            this.value = config.value;
        }
        if (config.type) {
            this.type_expected = config.type;
        }
        if (config.required) {
            this.required = config.required;
        }
        if (config.overwrite) {
            this.overwrite = config.overwrite;
        }
        if (config.allow_spaces ) {
            this.allow_spaces = config.allow_spaces;
        }
        if (config.allowSpacesNew ) {
            this.allowSpacesNew = config.allowSpacesNew;
        }

        if (config.enforceRobjectRules ) {
            this.enforceRobjectRules = config.enforceRobjectRules;
        }
        
        this.content = Sqrl.Render(this.htmlTemplate, {modal: modal, ms: config})
        this.id = `${modal.id}_${config.no}`
       
    }
    
    canExecute(refToBaseModal) {
        let result = null
        let pattern = ""
        var outer_this = this;
        var value = this.getVal()
        switch (this.overwrite){
            case "variable":
               if (getActiveVariables().indexOf(value) > -1){
                var ret = dialog.showMessageBoxSync({type: "question", buttons: ["Ok", "Cancel"], title: "Overwrite Alert", message: `The value specified in the field with label: "${outer_this.label}" will overwrite the existing variable: ${value}`})
                if (ret === 0){
                    break
                } else {
                    throw 'OverwriteException' 
                }
               }
            case "dataset":
               if ( getAllDatasets().indexOf(value) > -1 ){
                var ret = dialog.showMessageBoxSync({type: "question", buttons: ["Ok", "Cancel"], title: "Overwrite Alert", message: `The value specified in the field with label: "${outer_this.label}" will overwrite the dataset: ${value}`})
                if (ret === 0){
                    break
                } else {
                    throw 'OverwriteException' 
                }
            }
        }
        if (this.required && (value === "" || value == undefined)){
            dialog.showMessageBoxSync({type: "error", buttons: ["OK"], title: "Input field rule violation", message: `Field with label: "${outer_this.label}" needs to be populated to proceed`})
            return false
        } else if ( ! this.required && (value === "" || value == undefined)){
            return true
        }
        if (this.type_expected === 'numeric' && isNaN(value)){
            dialog.showMessageBoxSync({type: "error", buttons: ["OK"], title: "Input field rule violation", message: `Field with label: "${outer_this.label}" needs to be populated with a numeric value to proceed`})
            return false
        } else if (this.type_expected === 'onlyCharacter' && ! isNaN(value)) {
            dialog.showMessageBoxSync({type: "error", buttons: ["OK"], title: "Input field rule violation", message: `Field with label: "${outer_this.label}" needs to be populated with a character value to proceed`})
            return false
        }
        if (!this.allow_spaces && this.enforceRobjectRules == undefined && this.allowSpacesNew == undefined)
        {
            //let pattern =/[0-9][0-9a-zA-Z._\s]*/g
            pattern =/^[0-9]/g
            result = value.match(pattern);
            if (result != null) 
            {
                dialog.showMessageBoxSync({type: "error", buttons: ["OK"], title: "Input field rule violation", message: `The input field with label: "${outer_this.label}" cannot start with a number. You cannot create variable, dataset or model names that start with a number.`})
                return false
            }
            pattern = /\s+/g
            result = value.match(pattern);
            if (result != null) 
            {
                dialog.showMessageBoxSync({type: "error", buttons: ["OK"], title: "Input field rule violation", message: `The input field with label: "${outer_this.label}" cannot contain spaces. You cannot create variable, dataset or model names that contain spaces.`})
                return false
            }
           pattern = "^((([A-Za-z]|[.][._A-Za-z])[._A-Za-z0-9]*)|[.])$"
           result = value.match(pattern);
           if (result == null) 
           {
               dialog.showMessageBoxSync({type: "error", buttons: ["OK"], title: "Input field rule violation", message: `The input field with label: "${outer_this.label}" must contain only letters, numbers and the dot or underline characters. It must start with a letter or the dot not followed by a number.`})
               return false
           }
           
        }

        if (this.enforceRobjectRules)
        {
            //let pattern =/[0-9][0-9a-zA-Z._\s]*/g
            pattern =/^[0-9]/g
            let result = value.match(pattern);
            if (result != null) 
            {
                dialog.showMessageBoxSync({type: "error", buttons: ["OK"], title: "Input field rule violation", message: `The input field with label: "${outer_this.label}" cannot start with a number. You cannot create variable, dataset or model names that start with a number.`})
                return false
            }
            pattern = /\s+/g
            result = value.match(pattern);
            if (result != null) 
            {
                dialog.showMessageBoxSync({type: "error", buttons: ["OK"], title: "Input field rule violation", message: `The input field with label: "${outer_this.label}" cannot contain spaces. You cannot create variable, dataset or model names that contain spaces.`})
                return false
            }
           pattern = "^((([A-Za-z]|[.][._A-Za-z])[._A-Za-z0-9]*)|[.])$"
           result = value.match(pattern);
           if (result == null) 
           {
               dialog.showMessageBoxSync({type: "error", buttons: ["OK"], title: "Input field rule violation", message: `The input field with label: "${outer_this.label}" must contain only letters, numbers and the dot or underline characters. It must start with a letter or the dot not followed by a number.`})
               return false
           }
           
        }

        if (this.allowSpacesNew == false)
        {
            pattern = /\s+/g
            result = value.match(pattern);
            if (result != null) 
            {
                dialog.showMessageBoxSync({type: "error", buttons: ["OK"], title: "Input field rule violation", message: `The input field with label: "${outer_this.label}" cannot contain spaces. You cannot create variable, dataset or model names that contain spaces.`})
                return false
            }            
        }

        return true
    }

    clearContent() {
        if (this.value !== null) {
            $(`#${this.id}`).val(this.value)
        } else {
            $(`#${this.id}`).val("")
        }
        
    }

}

module.exports.element = inputVariable;