var Sqrl = require('squirrelly');
var baseElement = require('./baseElement').baseElement;
let t = getT('menutoolbar')

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
        if (config.allowSpacesNew != undefined) {
            this.allowSpacesNew = config.allowSpacesNew;
        }

        if (config.enforceRobjectRules != undefined) {
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
                var ret = dialog.showMessageBoxSync({type: "question", buttons: ["Ok", "Cancel"], title: t('advTxtBxRulViolationMSgTitle1'), message: `${t('advTxtBxRulViolationMSg1')}: "${outer_this.label}" ${t('advTxtBxRulViolationMSg2')}: ${value}`})
                if (ret === 0){
                    break
                } else {
                    throw 'OverwriteException' 
                }
               }
            case "dataset":
               if ( getAllDatasets().indexOf(value) > -1 ){
                var ret = dialog.showMessageBoxSync({type: "question", buttons: ["Ok", "Cancel"], title: t('advTxtBxRulViolationMSgTitle1'), message: `${t('advTxtBxRulViolationMSg3')}: "${outer_this.label}" ${t('advTxtBxRulViolationMSg4')}: ${value}`})
                if (ret === 0){
                    break
                } else {
                    throw 'OverwriteException' 
                }
            }
        }
        if (this.required && (value === "" || value == undefined)){
            dialog.showMessageBoxSync({type: "error", buttons: ["OK"], title: t('advTxtBxRulViolationMSgTitle2'), message: `${t('advTxtBxRulViolationMSg5')}: "${outer_this.label}" ${t('advTxtBxRulViolationMSg6')}`})
            return false
        } else if ( ! this.required && (value === "" || value == undefined)){
            return true
        }
        if (this.type_expected === 'numeric' && isNaN(value)){
            dialog.showMessageBoxSync({type: "error", buttons: ["OK"], title: t('advTxtBxRulViolationMSgTitle2'), message: `${t('advTxtBxRulViolationMSg5')}: "${outer_this.label}" ${t('advTxtBxRulViolationMSg7')}`})
            return false
        } else if (this.type_expected === 'onlyCharacter' && ! isNaN(value)) {
            dialog.showMessageBoxSync({type: "error", buttons: ["OK"], title: t('advTxtBxRulViolationMSgTitle2'), message: `${t('advTxtBxRulViolationMSg5')}: "${outer_this.label}" ${t('advTxtBxRulViolationMSg8')}`})
            return false
        } else if (!this.allow_spaces && this.enforceRobjectRules == undefined && this.allowSpacesNew == undefined)
        {
            //let pattern =/[0-9][0-9a-zA-Z._\s]*/g
            pattern =/^[0-9]/g
            result = value.match(pattern);
            if (result != null) 
            {
                dialog.showMessageBoxSync({type: "error", buttons: ["OK"], title: t('advTxtBxRulViolationMSgTitle2'), message: `${t('advTxtBxRulViolationMSg9')}: "${outer_this.label}" ${t('advTxtBxRulViolationMSg10')}`})
                return false
            }
            pattern = /\s+/g
            result = value.match(pattern);
            if (result != null) 
            {
                dialog.showMessageBoxSync({type: "error", buttons: ["OK"], title: t('advTxtBxRulViolationMSgTitle2'), message: `${t('advTxtBxRulViolationMSg9')}: "${outer_this.label}" ${t('advTxtBxRulViolationMSg11')}`})
                return false
            }
           pattern = "^((([A-Za-z]|[.][._A-Za-z])[._A-Za-z0-9]*)|[.])$"
           result = value.match(pattern);
           if (result == null) 
           {
               dialog.showMessageBoxSync({type: "error", buttons: ["OK"], title: t('advTxtBxRulViolationMSgTitle2'), message: `${t('advTxtBxRulViolationMSg9')}: "${outer_this.label}" ${t('advTxtBxRulViolationMSg12')}`})
               return false
           }
           
        } else if (this.enforceRobjectRules)
        {
            //let pattern =/[0-9][0-9a-zA-Z._\s]*/g
            pattern =/^[0-9]/g
            let result = value.match(pattern);
            if (result != null) 
            {
                dialog.showMessageBoxSync({type: "error", buttons: ["OK"], title: t('advTxtBxRulViolationMSgTitle2'), message: `${t('advTxtBxRulViolationMSg9')}: "${outer_this.label}" ${t('advTxtBxRulViolationMS10')}`})
                return false
            }
            pattern = /\s+/g
            result = value.match(pattern);
            if (result != null) 
            {
                dialog.showMessageBoxSync({type: "error", buttons: ["OK"], title: t('advTxtBxRulViolationMSgTitle2'), message: `${t('advTxtBxRulViolationMSg9')}: "${outer_this.label}" ${t('advTxtBxRulViolationMS11')}`})
                return false
            }
           pattern = "^((([A-Za-z]|[.][._A-Za-z])[._A-Za-z0-9]*)|[.])$"
           result = value.match(pattern);
           if (result == null) 
           {
               dialog.showMessageBoxSync({type: "error", buttons: ["OK"], title: t('advTxtBxRulViolationMSgTitle2'), message: `${t('advTxtBxRulViolationMSg9')}: "${outer_this.label}" ${t('advTxtBxRulViolationMS12')}`})
               return false
           }
           
        } else if (this.allowSpacesNew == false)
        {
            pattern = /\s+/g
            result = value.match(pattern);
            if (result != null) 
            {
                dialog.showMessageBoxSync({type: "error", buttons: ["OK"], title: t('advTxtBxRulViolationMSgTitle2'), message: `${t('advTxtBxRulViolationMSg9')}: "${outer_this.label}" ${t('advTxtBxRulViolationMS11')}`})
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