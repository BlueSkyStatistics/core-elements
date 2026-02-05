/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */

var Sqrl = require('squirrelly');
const {getT} = global.requireFromRoot("localization");
var baseElement = require('./baseElement').baseElement;
let t = getT('menutoolbar')
class wrapControl extends baseElement {
    content;
    id;
    max_values = -1;
    items_count = -1;
    required = false;
    label = null;
    htmlTemplate = `<div class="row">
        <div class="col col-xx"></div>
        <div class="col col-rr mt-2"><h6>{{ms.label}} {{if(options.ms.required)}}<span class="required">*</span>{{/if}}</h6></div>
    </div>
    {{if(options.ms.upperdesc)}}
    <div class="row">
        <div class="col col-xx"></div>
        <div class="col col-rr h6">{{ms.upperdesc}}</div>
    </div>
    {{/if}}
    <div class="row">
        <div class="col col-xx"></div>
        <div class="col col-rr">
            <select class="custom-select" id="{{modal.id}}_{{ms.no}}_select">
                {{ each(options.ms.options) }}
                    <option value="{{@this.wrapped}}">{{@this.name}}</option>
                {{/each}}
            </select>
        </div>
    </div>
    {{if(options.ms.lowerdesc)}}
    <div class="row">
        <div class="col col-xx"></div>
        <div class="col col-rr h6">{{ms.lowerdesc}}</div>
    </div>
    {{/if}}
    <div class="row">
        <div class="col col-xx">
            <button type="button" class="btn btn-outline-secondary btn-arrows" id="{{modal.id}}arrow{{ms.no}}">
                <i class="fas fa-arrow-right"></i>
            </button>
        </div>
        <div class="col col-rr">    
            <div class="list-group ms-list" id="{{modal.id}}_{{ms.no}}" modal_id="{{modal.id}}" no="{{ms.no}}" bs-type="{{if(options.ms.counts)}}wrapcontrol{{#else}}list{{/if}}" ondrop="drop(event)" is-wrapped=true extractable=true extractionRule="{{ms.extraction}}" filter="{{ms.filter}}" ondragover="allowDrop(event)"></div>
        </div>
    </div>
    {{if(options.ms.counts)}}
    <div class="row">
        <div class="col col-xx"></div>
        <div class="col col-rr"> 
            <div class="form-check">
                <input type="checkbox" bs-type="valuebox" class="form-check-input" id="{{modal.id}}_{{ms.no}}_checkbox" extractionRule="BooleanValue" no="{{ms.no}}_count" true-value="dplyr::n()" false-value="">
                <label class="form-check-label" for="{{modal.id}}_{{ms.no}}_checkbox">${t('wrapCtrllabel1')}</label>
            </div>
            <div class="form-group">
            <label for="{{modal.id}}_{{ms.no}}_input" class="mr-2 small-label">${t('wrapCtrllabel2')}</label>
            <input class="w-100" type="text" bs-type="text" 
                id="{{modal.id}}_{{ms.no}}_input" 
                no="{{ms.no}}_input"
                extractionRule="CreateArray" value=""
                ondrop="dropToInputAditive(event)">
            </div>
        </div>
    </div>
    {{/if}}
    `

    constructor(modal, config) {
        super(modal, config)
        this.label = config.label;
        this.id = `${modal.id}_${config.no}`
        if (config.required) { this.required = config.required }
        if (config.max_values) { this.max_values = config.max_values }
        if (config.items_count) { this.items_count = config.items_count }
        this.content = Sqrl.Render(this.htmlTemplate, {modal: modal, ms: config})
    }

    canExecute(refToBaseModal) {
        if ($(`#${this.id}`).attr("bs-type") === "wrapcontrol" ) {
            if ($(`#${this.id}_input`).val().split(",")[0] != "") {
                var expected = $(`#${this.id}`).children().length + $(`#${this.id}_checkbox:checked`).length;
                if ($(`#${this.id}_input`).val().split(",").length < expected) {
                    dialog.showMessageBoxSync({type: "error", buttons: ["OK"], title: t('wrapCtrlRulVoiTitle'), message: `${t('wrapCtrlRulVoiMsg1')}: "${this.label}" ${t('wrapCtrlRulVoiMsg2')}: ${expected})`})                
                    return false
                }
            }
        }
        if (! this.required && $(`#${this.id}`).children().length === 0) {
            return true
        }
        if ((this.required && $(`#${this.id}`).children().length > 0) || ! this.required){
            if ((this.max_values > -1 && $(`#${this.id}`).children().length <= this.max_values) || this.max_values === -1) {
                if ((this.items_count > -1 && $(`#${this.id}`).children().length == this.items_count) || this.items_count === -1) {
                    return true
                }
            }
        }
        dialog.showMessageBoxSync({type: "error", buttons: ["OK"], title: t('wrapCtrlRulVoiTitle'), message: `${t('wrapCtrlRulVoiMsg1')}: "${this.label}"${t('wrapCtrlRulVoiMsg1')}`})                
        return false
    }

    clearContent() {
        $(`#${this.id}`).children().each(function(index, element) {
            element.remove()
        })
    }
}

module.exports.element = wrapControl;