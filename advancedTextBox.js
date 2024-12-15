var Sqrl = require('squirrelly');
var baseElement = require('./baseElement').baseElement;
let t = getT('menutoolbar')

class advancedTextBox extends baseElement {
    content;
    id;
    value = null;
    required = false;
    type_expected = null;
    overwrite = null;
    label = null
    no = null   
    htmlTemplate = `
    <div class="mb-2 {{if(options.ms.style)}}{{ms.style}}{{/if}} {{if(options.ms.ml)}}ml-{{ms.ml}}{{/if}}">
    <div class="row">
        <div class="col-12">
            <label for="{{modal.id}}_{{ms.no}}" class="mt-2 mr-2 small-label">{{ms.label}} {{if(options.ms.required)}}<span class="required">*</span>{{/if}}</label>
        </div>
    </div>
    <div id="{{modal.id}}_{{ms.no}}" {{if(options.ms.ml)}}class="ml-{{ms.ml}}"{{/if}}
         extractable=true bs-type="advTxt" no="{{ms.no}}" extractionRule="{{ms.extraction}}"
         style="overflow: auto"> 
         <div class="row bg-gray m-1 p-2" el_index=0> 
            <div class="col-12">
                <div class="row">
                   <div class="col-10 cm focus" bs-type="advancedTextBox"></div>
                </div>
            </div>
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
        this.content = Sqrl.Render(this.htmlTemplate, {modal: modal, ms: config})
        this.id = `${modal.id}_${config.no}`
        this.no = config.no
    }
    
    canExecute(refToBaseModal) {
        var outer_this = this;
        var value = this.getVal().toString()
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
        } else if (this.type_expected === 'character' && ! isNaN(value)) {
            dialog.showMessageBoxSync({type: "error", buttons: ["OK"], title: t('advTxtBxRulViolationMSgTitle2'), message: `${t('advTxtBxRulViolationMSg5')}: "${outer_this.label}" ${t('advTxtBxRulViolationMSg8')}`})
            return false
        }
        if (!this.allow_spaces)
        {
            //let pattern =/[0-9][0-9a-zA-Z._\s]*/g
            let pattern =/^[0-9]/g
            let result = value.match(pattern);
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
           
        }
      return true
    }

    clearContent() {
        var textBoxValue = $(`#${this.id}`).children().find('div[bs-type="advancedTextBox"] .CodeMirror')
        textBoxValue[0].CodeMirror.setValue("")
    }

    getVal() {
        var textBoxValue = $(`#${this.id}`).children().find('div[bs-type="advancedTextBox"] .CodeMirror')
        var res = []
        res.push(textBoxValue[0].CodeMirror.getValue())
        return (res)
    }
}

module.exports.element = advancedTextBox;