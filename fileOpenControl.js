var Sqrl = require('squirrelly');
var baseElement = require('./baseElement').baseElement;
let t = getT('menutoolbar')

class fileOpenControl extends baseElement{
    content;
    id;
    value = null;
    required = false;
    type_expected = null;
    overwrite = null;
    allow_spaces=false;
        label = null
    width = "w-75"
    htmlTemplate = `<div class="{{if(options.ms.style)}}{{ms.style}}{{/if}} {{if(options.ms.ml)}}ml-{{ms.ml}}{{/if}}">
        <div class="row">
            <div class="col-12">
                <label for="{{modal.id}}_{{ms.no}}" class="mt-2 mr-2 small-label">{{ms.label}} {{if(options.ms.required)}}<span class="required">*</span>{{/if}}</label>
            </div>
        </div>
        <div class="row">
            <div class="col-4">
                <button type="button" id="{{modal.id}}_{{ms.no}}_btn" class="btn formula-btn p-1 w-100" onclick="openFileControlDialog('{{modal.id}}_{{ms.no}}', '{{if(options.ms.type)}}{{ms.type}}{{#else}}file{{/if}}')" >${t('fileOpenLbl')} {{if(options.ms.type)}}{{ms.type}}{{#else}}file{{/if}}</button>  
            </div> 
            <div class="col-8">
                <input class="w-100" type="text" bs-type="file" 
                    id="{{modal.id}}_{{ms.no}}" 
                    no="{{ms.no}}" extractable=true 
                    {{if(options.ms.value)}} value = {{ms.value}}{{/if}}
                    extractionRule="{{ms.extraction}}" 
                    disabled 
                    />
            </div>         
        </div>
    </div>`

    constructor(modal, config) {
        super(modal, config)
        this.label = config.label
        if (config.type !== undefined) {
            this.type = config.type;
        }
        else {
            this.type = "file"
        }
        if (config.required) {
            this.required = config.required;
        }
        this.content = Sqrl.Render(this.htmlTemplate, {modal: modal, ms: config})
        this.id = `${modal.id}_${config.no}`
        this.value = config.value
    }
    
    canExecute(refToBaseModal) {
        var outer_this = this;
        var value = this.getVal()
        if (this.required && (value === "" || value == undefined) && this.type =="file"){
            dialog.showMessageBoxSync({type: "error", buttons: ["OK"], title: t('advTxtBxRulViolationMSgTitle2'), message: `${t('fileOpnRulVoiMsg1')}: "${outer_this.label}" ${t('fileOpnRulVoiMsg2')}`})
            return false
        } else if (this.required && (value === "" || value == undefined) && this.type =="folder"){
            dialog.showMessageBoxSync({type: "error", buttons: ["OK"], title: t('advTxtBxRulViolationMSgTitle2'), message: `${t('fileOpnRulVoiMsg3')}: "${outer_this.label}" ${t('fileOpnRulVoiMsg2')}`})
            return false
        } else if ( ! this.required && (value === "" || value == undefined)){
            return true
        }
        try {
            fs.statSync(value)
        } catch (ex) {
            dialog.showMessageBoxSync({type: "error", buttons: ["OK"], title: t('fileOpnRulVoiTitle'), message: `${t('fileOpnRulVoiMsg4')}: "${outer_this.label}" ${t('fileOpnRulVoiMsg5')}`})
            return false
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

module.exports.element = fileOpenControl;