/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */



var Sqrl = require('squirrelly');
//const {getT} = global.requireFromRoot("localization");
var baseElement = require('./baseElement').baseElement;
let t = getT('menutoolbar')

class inputSpinner extends baseElement {
    content;
    id;
    value = null;
    required = false;
    type_expected = null;
    max;
    min;
    label = null;
    htmlTemplate = `
    <div class="row {{if(options.ms.ml)}} ml-{{ms.ml}} {{/if}} {{if(options.ms.style)}} {{ms.style}} {{/if}}">
    <div class="col-12">
    <label for="{{modal.id}}_{{ms.no}}" class="mt-2 mr-2 small-label">{{ms.label}} {{if(options.ms.required)}}<span class="required">*</span>{{/if}}</label>
    <input class="w-25" type="number" bs-type="text" id="{{modal.id}}_{{ms.no}}" no="{{ms.no}}" extractable=true extractionRule="{{ms.extraction}}" min="{{ms.min}}" max="{{ms.max}}" step="{{ms.step}}" value="{{ms.value}}" {{if(options.ms.wrapped)}}  wrapped="{{ms.wrapped}}" {{/if}} {{if(options.ms.value !== undefined)}} default="{{ms.value}}" value="{{ms.value}}" {{#else}} default="" {{/if}}>
    </div>
    </div>`

    constructor(modal, config) {
        super(modal, config);
        this.label = config.label;
        if (config.value !== undefined) {
            this.value = config.value;
        }
        this.type_expected = 'numeric';
        if (config.required) {
            this.required = config.required
        }
        this.max = config.max;
        this.min = config.min;
        this.content = Sqrl.Render(this.htmlTemplate, {modal: modal, ms: config})
        this.id = `${modal.id}_${config.no}`
    }
    
    canExecute(refToBaseModal) {
        var value = this.getVal()
        if (value > this.max || value < this.min) {
            dialog.showMessageBoxSync({type: "error", buttons: ["OK"], title: t('advTxtBxRulViolationMSgTitle2'), message: `${t('advTxtBxRulViolationMSg5')}: "${this.label}" ${t('inSpinerRulVoiMsg1')} (${this.min} - ${this.max})`})
            return false
        }
        if (this.required && (value === "" || value == undefined)){
            dialog.showMessageBoxSync({type: "error", buttons: ["OK"], title: t('advTxtBxRulViolationMSgTitle2'), message: `${t('advTxtBxRulViolationMSg5')}: "${this.label}" ${t('inSpinerRulVoiMsg2')}`})
            return false
        } else if ( ! this.required && (value === "" || value == undefined)){
            return true
        }
        if (this.type_expected === 'numeric' && isNaN(value)){
            dialog.showMessageBoxSync({type: "error", buttons: ["OK"], title: t('advTxtBxRulViolationMSgTitle2'), message: `${t('advTxtBxRulViolationMSg5')}: "${this.label}" ${t('inSpinerRulVoiMsg3')}`})
            return false
        } else if (this.type_expected === 'character' && ! isNaN(value)) {
            dialog.showMessageBoxSync({type: "error", buttons: ["OK"], title: t('advTxtBxRulViolationMSgTitle2'), message: `${t('advTxtBxRulViolationMSg5')}: "${this.label}" ${t('inSpinerRulVoiMsg4')}`})
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

module.exports.element = inputSpinner;