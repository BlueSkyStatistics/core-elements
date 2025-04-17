/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */



var Sqrl = require('squirrelly');
var baseElement = require('./baseElement').baseElement;
let t = getT('menutoolbar')

class comboBoxWithChildren extends baseElement {
    content;
    id;
    required = false;
    child_id;
    first_kid;
    label = null
    htmlTemplate = `
    <label for="{{modal.id}}_{{ms.no}}" class="mt-2 mr-2 small-label">{{ms.label}} {{if(options.ms.required)}}<span class="required">*</span>{{/if}}</label>
    <div class="row">
    <div class="col-6">
            <div class="list-group ms-list">
                <select class="list-group borderless" bs-type="combobox" id="{{modal.id}}_{{ms.no}}" no="{{ms.no}}" child_combo="{{modal.id}}_{{ms.nochild}}" extractable=true extractionRule="{{ms.extraction}}" previouslyActive="{{ms.options[0].name}}" onchange="renderChild(this)">
                    {{ each(options.ms.options) }}
                        <option kids="{{@this.value_str}}">{{@this.name}}</option>
                    {{/each}}
                </select>
            </div>
        </div>
        <div class="col-6">
            <div class="list-group ms-list">
                <select class="list-group borderless" bs-type="combobox" {{ if (options.ms.multiple) }} multiple {{/if}} id="{{modal.id}}_{{ms.nochild}}" no="{{ms.nochild}}" extractable=true extractionRule="{{ms.extraction}}">
                    {{ each(options.ms.options[0].value) }}
                        <option>{{@this}}</option>
                    {{/each}}
                </select>
            </div>
        </div>
    </div>
    `

    constructor(modal, config) {
        super(modal, config)
        this.label = config.label
        if (config.required) {
            this.required = config.required
        }
        config.options.forEach(function(item) {
            item.value_str = item.value.join("|")
        })
        this.content = Sqrl.Render(this.htmlTemplate, {modal: modal, ms: config})
        this.child_id = `${modal.id}_${config.nochild}`
        this.id = `${modal.id}_${config.no}`
    }

    clearContent() {
        if (! $(`#${this.id}`).siblings("ul").find("a").first().hasClass("active"))
            $(`#${this.id}`).siblings("ul").find("a").first().trigger("click");
    }

    canExecute(refToBaseModal) {
        if (this.required && this.getVal().length > 1){
            return true
        } else if ( !this.required ) {
            return true
        }
        dialog.showMessageBoxSync({type: "error", buttons: ["OK"], title: t('comboboxWchildRulVoiTitle'), message: `${t('comboboxWchildRulVoiMsg1')}: "${this.label}"`})                
        return false
    }

    getVal() {
        var res = []
        $(`#${this.id}`).find('option:selected').each(function(index, item) {res.push(item.value)})
        $($(`#${this.child_id}`).siblings()[0]).find(".list-group-item.active").each(function(index, item){res.push(item.getAttribute("data-value"))})
        return res
    }
}

module.exports.element = comboBoxWithChildren;