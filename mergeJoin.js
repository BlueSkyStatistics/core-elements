/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */

var Sqrl = require('squirrelly');
const {getT} = require("../../../../localization");
var baseElement = require('./baseElement').baseElement;
let t = getT('menutoolbar')
class mergeJoin extends baseElement{
    content;
    id;
    required = false;
    defaults;
    label = null
    htmlTemplate = `
    <div id="{{modal.id}}_{{ms.no}}">
    <div class="row" >
        <div class="col-6">
            <label for="{{modal.id}}_{{ms.no}}" class="mt-2 mr-2 small-label {{if(options.ms.style)}}{{ms.style}}{{/if}}"><h6>{{ms.label}}{{if(options.ms.required)}}<span class="required">*</span>{{/if}}</h6></label>
        </div>
        <div class="col-12">
            <label for="{{modal.id}}_{{ms.no}}Lab" class="mt-2 mr-2 small-label {{if(options.ms.style)}}{{ms.style}}{{/if}}">${t('MJlbl1')}</label>
        </div>
        <div class="col-3">
            <button type="button" class="btn btn-outline-secondary btn-text" onclick="addToJoin( modal_id = &quot;{{modal.id}}&quot; ,listOfVariablesToJoinBy =&quot;{{modal.id}}_{{ms.no}}_joinMap&quot; );">${t('MJbtn1')}</button>
            <button type="button" class="btn btn-outline-secondary btn-text" onclick="removeFromJoin( listOfVariablesToJoinBy =&quot;{{modal.id}}_{{ms.no}}_joinMap&quot; );">${t('MJbtn2')}</button>
        </div>
        <div class="col-9">
            <div class="list-group ms-list"  id="{{modal.id}}_{{ms.no}}_joinMap" bs-type="joinMapping"  extractable=true extractionRule="{{ms.extraction}}" no="{{ms.no}}" >
                <ul class ="list-group" >
                </ul>
            </div>
        </div>                  
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
        this.content = Sqrl.Render(this.htmlTemplate, {
            modal: modal,
            ms: config
        })
    }
    clearContent() {

            $(`#${this.id}_joinMap`).find("UL").children().each(function (index, element) {
                element.remove()
            })      
    }
    canExecute(refToBaseModal) {
        if (this.required && $(`#${this.id}_joinMap`).find("UL").children().length > 0) {
            return true
        } else if (!this.required) {
            return true
        }
        dialog.showMessageBoxSync({ type: "error", buttons: ["OK"], title: t('mergejoinRulVoiTitle1'), message: `${t('mergejoinRulVoiMsg1')}: "${this.label}"` })
        return false
    }
}
module.exports.element = mergeJoin;