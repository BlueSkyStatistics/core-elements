/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */

var Sqrl = require('squirrelly');
const {getT} = require("../../../../localization");
var baseElement = require('./baseElement').baseElement;
let t = getT('menutoolbar')

class semControl extends baseElement {
    content;
    id;
    htmlTemplate = `
    <h6>{{ms.label}} {{if(options.ms.required)}}<span class="required">*</span>{{/if}}</h6>
        <div class="{{if (options.ms.style)}}{{ms.style | safe}}{{#else}}ms-list2{{/if}} list-group1" id = "{{modal.id}}_{{ms.no}}" count = {{ms.count}} extractable =true bs-type="sem" no="{{ms.no}}" extractionRule="{{ms.extraction}}"  suppCtrlIds ="{{ms.suppCtrl}}" ctrlsToDeleteFrom = "{{ms.ctrlsToDeleteFrom}}" {{if (options.ms.allowedSrcCtrls != undefined) }} allowedSrcCtrls = "{{ms.allowedSrcCtrls}}"{{/if}} >
            <div class="row">
                <div class="col-1">
                </div>
                <div class="col-11" id ="{{modal.id}}_{{ms.no}}_insertionPt">
                        <button type="button" id ="{{modal.id}}_{{ms.no}}_btn" class="btn formula-btn p-1 w-25" onclick="createEndoExoVariables( modelid = &quot;{{modal.id}}&quot;, no = &quot;{{ms.no}}&quot;, filter = &quot;{{ms.filter}}&quot;{{if(options.ms.equalityConstraints)}}, equalityConstraints = true{{#else}}, equalityConstraints = false{{/if}}, placeHolderText = &quot;{{ms.placeHolderText}}&quot;, type = &quot;{{ms.type}}&quot;)", >+ ${t('semCtrlAddBtn')}</button>
                </div>
            </div>    
        </div>  
    `
    
    constructor(modal, config) {
        super(modal, config)
        this.label = config.label
      //  this.type =config.type
        this.id = `${modal.id}_${config.no}`
        config.count = 0
        config.parameterCount = 0
        if (config.hasOwnProperty("suppCtrlIds"))
            config.suppCtrl = JSON.stringify(config.suppCtrlIds)
        if (config.hasOwnProperty("ctrlsToDeleteFrom"))
            config.ctrlsToDeleteFrom = JSON.stringify(config.ctrlsToDeleteFrom)
        if (config.hasOwnProperty("allowedSrcCtrls"))
            config.allowedSrcCtrls = JSON.stringify(config.allowedSrcCtrls)  
        this.content = Sqrl.Render(this.htmlTemplate, { modal: modal, ms: config })
    }
    clearContent() {
        $(`#${this.id}`).find('.list-group1').each(function (index, item) {
            $(`#${item.id}`).remove()
        })
        $(`#${this.id}`).attr("count",0)
    }
    canExecute(refToBaseModal) {
        var outer_this = this;
        let results = {}
        let textContents = ""
        let dstVarContents = ""
        let listGrp = ""
        let retval = true
        let numofvars = 0
        $(`#${this.id}`).find('.list-group1').each(function (index, item) {
            textContents = $(`#${item.id}`).find('input').val()
            listGrp = $(`#${item.id}`).find('.list-group')
            numofvars = $(`#${listGrp[0].id}`).find('a').length
            //You need to have atleast 2 variables for mediation
            if (this.id =="sem_mediationDestCtrl_destCtrl_1" && numofvars < 2)
            {
                dialog.showMessageBoxSync({ type: "error", buttons: ["OK"], title: t('advTxtBxRulViolationMSgTitle2'), message: `${t('semCtrlRulVoiMsg1')} "${outer_this.label}".` })
                retval = false
            }
            if (extractBeforeLastUnderscore(this.id) == 'sem_sem3_destCtrl' && numofvars < 2)
            {
                dialog.showMessageBoxSync({ type: "error", buttons: ["OK"], title: t('advTxtBxRulViolationMSgTitle2'), message: `${t('semCtrlRulVoiMsg2')} "${outer_this.label}" ${t('semCtrlRulVoiMsg3')}` })
                retval = false
            }
            if (textContents == "") 
            {
                if (outer_this.label =="Latent variables")
                {
                    dialog.showMessageBoxSync({ type: "error", buttons: ["OK"], title: t('advTxtBxRulViolationMSgTitle2'), message: `${t('semCtrlRulVoiMsg4')} "${outer_this.label}" ${t('semCtrlRulVoiMsg5')}` })
                } else {
                    dialog.showMessageBoxSync({ type: "error", buttons: ["OK"], title: t('advTxtBxRulViolationMSgTitle2'), message: `${t('semCtrlRulVoiMsg6')} "${outer_this.label}" ${t('semCtrlRulVoiMsg7')}` })
                }
                retval = false
            }
            if ( isFinite(textContents)) {
                dialog.showMessageBoxSync({ type: "error", buttons: ["OK"], title: t('advTxtBxRulViolationMSgTitle2'), message: `${t('semCtrlRulVoiMsg8')} "${outer_this.label}" ${t('semCtrlRulVoiMsg9')}` })
                retval = false
            }
            if (numofvars == 0) {
                if (outer_this.label =="Latent variables")
                {
                    dialog.showMessageBoxSync({ type: "error", buttons: ["OK"], title: t('advTxtBxRulViolationMSgTitle2'), message: `${t('semCtrlRulVoiMsg10')} "${outer_this.label}" ${t('semCtrlRulVoiMsg11')}` })
                } else {
                    dialog.showMessageBoxSync({ type: "error", buttons: ["OK"], title: t('advTxtBxRulViolationMSgTitle2'), message: `${t('semCtrlRulVoiMsg12')} "${outer_this.label}" ${t('semCtrlRulVoiMsg1')}` })
                }
                retval = false
            }          
        })
        return retval 
    }
}
module.exports.element = semControl;