/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */

var Sqrl = require('squirrelly');
var baseElement = require('./baseElement').baseElement;
let t = getT('menutoolbar')

class repMeasuresCTRL extends baseElement {
    content;
    id;
    htmlTemplate = `
    <a class="btn btn-sm btn-secondary btn-block mb-0" data-toggle="collapse" href="#{{modal.id}}_{{ms.no}}" role="button" aria-expanded="false" aria-controls="{{modal.id}}_{{ms.no}}">
    ${t('RMstr0')}
    <div class="ripple-container"></div>
    </a>
    <div class="collapse show mb-3" id="{{modal.id}}_{{ms.no}}" bs-type="repMeasuresCTRL">
        <div class="card card-body card-dark">
            <div>
                <div class="row" >
                <div class ="ml-2">
                ${t('RMstr0a')}:<br/><br/>
${t('RMstr1')}<br/>
${t('RMstr2')}<br/>
${t('RMstr3')}<br/>
${t('RMstr4')}<br/>
${t('RMstr5')}<br/>
${t('RMstr6')}<br/><br/>
                </div>
                    <div class="col-12">
                        <label  class="mt-2 mr-2 small-label">${t('RMlbl1')}</label>
                    </div>
                </div>
                <div class="row ">
                    <div class="col-12">
                        <input class="w-75" type="text" bs-type="{{if(options.ms.type)}}{{ms.type}}{{#else}}text{{/if}}" 
                            id="{{modal.id}}_{{ms.no}}_factor" 
                            {{if(options.ms.placeholder)}} placeholder="{{ms.placeholder}}" {{/if}}
                            no="{{ms.no}}_factor" extractable=true extractionRule="{{ms.extraction}}" 
                            {{if(options.ms.wrapped)}} wrapped="{{ms.wrapped}}" {{/if}} 
                            {{if(options.ms.value !== undefined)}} default="{{ms.value}}" value="{{ms.value}}" {{#else}} default="" {{/if}}
                            {{if(options.ms.filter)}} filter="{{ms.filter}}" {{/if}} ondrop="dropToInput(event)">
                    </div>
                </div>
                <div class="row mt-2">
                    <div class="col-12">
                        <label class="mt-2 mr-2 small-label">${t('RMlbl2')}</label>
                        <input class="w-25" type="number" bs-type="text" id="{{modal.id}}_{{ms.no}}_levels" no="{{ms.no}}_levels" extractable=true extractionRule="{{ms.extraction}}" min="2" max="9999" step="1" value="2" default="2" >
                    </div>
                </div>
                <div class="row" >
                    <div class="col-12">
                        <button type="button" class="btn btn-outline-secondary btn-text" onclick="addToFactorList( factor = &quot;{{modal.id}}_{{ms.no}}_factor&quot;, levels = &quot;{{modal.id}}_{{ms.no}}_levels&quot;, factorList =&quot;{{modal.id}}_{{ms.no}}_factorList&quot; );">${t('RMaddbtn')}</button>
                    </div>
                </div>
                <div class="row" >
                    <div class="col-6">
                        <label for="{{modal.id}}_{{ms.no}}" class="mt-2 mr-2 small-label {{if(options.ms.style)}}{{ms.style}}{{/if}}">${t('RMlbl3')}{{if(options.ms.required)}}<span class="required">*</span>{{/if}}</label>
                    </div>
                </div>
                <div class="row"  >
                    <div class="col-9">
                        <div class="list-group ms-list"  id="{{modal.id}}_{{ms.no}}_factorList" bs-type="simpleFactorList"  extractable=true extractionRule="{{ms.extraction}}" no="{{ms.no}}_factorList" >
                            <ul class ="list-group" >
                            </ul>
                        </div>
                    </div>
                    <div class="col-3">
                        <button type="button" class="btn btn-outline-secondary btn-text" onclick="removeFromList( factorList =&quot;{{modal.id}}_{{ms.no}}_factorList&quot; );">${t('RMdelbtn')}</button>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <label  class="mt-2 mr-2 small-label">${t('RMlbl4')}</label>
                    </div>
                </div>
                <div class="row ">
                    <div class="col-12">
                        <input class="w-75" type="text" bs-type="{{if(options.ms.type)}}{{ms.type}}{{#else}}text{{/if}}" 
                        id="{{modal.id}}_{{ms.no}}_measure" 
                        {{if(options.ms.placeholder)}} placeholder="{{ms.placeholder}}" {{/if}}
                        no="{{ms.no}}" extractable=true extractionRule="{{ms.extraction}}" 
                        {{if(options.ms.wrapped)}} wrapped="{{ms.wrapped}}" {{/if}} 
                        {{if(options.ms.value !== undefined)}} default="{{ms.value}}" value="{{ms.value}}" {{#else}} default="" {{/if}}
                        {{if(options.ms.filter)}} filter="{{ms.filter}}" {{/if}} ondrop="dropToInput(event)">
                    </div>
                </div>
                <div class="row mt-2">
                    <div class="col-12">
                        <button type="button" class="btn btn-outline-secondary btn-text" onclick="addToMeasureList(measure=&quot;{{modal.id}}_{{ms.no}}_measure&quot;, measureList =&quot;{{modal.id}}_{{ms.no}}_measureList&quot;);">${t('RMaddbtn')}</button>
                    </div>
                </div>
                <div class="row" >
                    <div class="col-6">
                        <label for="{{modal.id}}_{{ms.no}}" class="mt-2 mr-2 small-label {{if(options.ms.style)}}{{ms.style}}{{/if}}">${t('RMlbl5')}{{if(options.ms.required)}}<span class="required">*</span>{{/if}}</label>
                    </div>
                </div>
                <div class="row"  >
                    <div class="col-9">
                        <div class="list-group ms-list"  id="{{modal.id}}_{{ms.no}}_measureList" bs-type="simpleMeasureList"  extractable=true extractionRule="{{ms.extraction}}" no="{{ms.no}}_measureList" >
                            <ul class ="list-group" >
                            </ul>
                        </div>
                    </div>
                    <div class="col-3">
                            <button type="button" class="btn btn-outline-secondary btn-text" onclick="removeFromList( factorList =&quot;{{modal.id}}_{{ms.no}}_measureList&quot; );">${t('RMdelbtn')}</button>
                    </div>
                </div>
                <div class="row" >
                    <div class="col-12">
                        <button type="button" id="{{modal.id}}_{{ms.no}}_createRepMeasures" class="btn btn-outline-secondary btn-text" onclick="createRepeatedMeasures( measureList =&quot;{{modal.id}}_{{ms.no}}_measureList&quot;, factorList =&quot;{{modal.id}}_{{ms.no}}_factorList&quot;, modelid = &quot;{{modal.id}}&quot;, no =&quot;{{ms.no}}&quot;);">${t('RMdefinebtn')}</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
        `
    constructor(modal, config) {
        super(modal, config)
        this.label = config.label
        this.id = `${modal.id}_${config.no}`
        this.content = Sqrl.Render(this.htmlTemplate, { modal: modal, ms: config })
    }

    canExecute(refToBaseModal) {
        let labelTemp = ""
        let temp = ""
        let newobj = ""
        let config1 = ""
        let dynamicRepeatedVariables = ""
        //Code that saves the dependent variable in repeated measures to objects. We need to do this as this control is created dynamically
        //This is so that we can bring up the history correctly
        //Fetching the dependent variable
        newobj = $(`#repeatedMeasuresAnovaW_repMeasuresConfig_depVar_1`)
        if (newobj != '') {
            //Getting the label
            labelTemp = $(`#repeatedMeasuresAnovaW_repMeasuresConfig_depVarParent_1`).find('h6').text()
            temp = newobj.html()
            config1 = {
                id: "repeatedMeasuresAnovaW",
                label: "test1",
                modalType: "two",
            }
            //Creating the object
            dynamicRepeatedVariables = {
                depVar_1: {
                    el: new dstVariableList(config1, {
                        label: labelTemp,
                        no: "repMeasuresConfig_depVar_1",
                        filter: "Numeric|Scale",
                        extraction: "NoPrefix|UseComma|Enclosed",
                        required:true,
                    }), r: ['{{ repMeasuresConfig_depVar_1 | safe}}']
                },
            };
            //Getting the contents 
            dynamicRepeatedVariables.depVar_1.el.content = temp
            refToBaseModal.objects["repMeasuresConfig_depVar_1"] = dynamicRepeatedVariables.depVar_1
        }
        let pointNum = 1
        let factorListCtrl = document.getElementById("repeatedMeasuresAnovaW_repMeasuresConfig_factorList");
        let factorlistItems = factorListCtrl.getElementsByClassName("list-group-item")
        let noOfMeasures = document.getElementById("repeatedMeasuresAnovaW_repMeasuresConfig_measureList").getElementsByClassName("list-group-item").length
        factorlistItems.forEach(function (value) {
            pointNum = pointNum * parseFloat(value.getAttribute("val"));
        })
        if (pointNum == 1) {
            dialog.showMessageBoxSync({ type: "error", buttons: ["OK"], title: t('RMmsgboxTitle1'), message: t('RMmsgboxMsg1') })
            return false;
        }
        else if (factorlistItems.length > 1) {
            dialog.showMessageBoxSync({ type: "error", buttons: ["OK"], title: t('RMmsgboxTitle2'), message: t('RMmsgboxMsg2') })
            return false;
        }
        else if (noOfMeasures > 1) {
            dialog.showMessageBoxSync({ type: "error", buttons: ["OK"], title: t('RMmsgboxTitle3'), message: t('RMmsgboxMsg3') })
            return false;
        }
        else if (noOfMeasures == 0) {
            dialog.showMessageBoxSync({ type: "error", buttons: ["OK"], title: t('RMmsgboxTitle4'), message: t('RMmsgboxMsg4') })
            return false;
        }
        else if (document.getElementById("repeatedMeasuresAnovaW_repMeasuresConfig_depVar_1") == undefined) {
            dialog.showMessageBoxSync({ type: "error", buttons: ["OK"], title: t('RMmsgboxTitle5'), message: t('RMmsgboxMsg5') })
            return false;
        }
        else {
            return true;
        }
    }
    clearContent() {
        let count = 1
        let myid = this.id
        let ulist = document.getElementById(this.id + "_factorList").getElementsByTagName("UL")
        $(`#${this.id}_factorList`).find("UL").children().each(function (index, element) {
            element.remove()
        })
        $(`#${this.id}_measureList`).find("UL").children().each(function (index, element) {
            if (element.tagName != "UL")
                element.remove()
            $(`#${myid}_depVarParent_${count}`).remove()
            count = count + 1
        })
    }
}
module.exports.element = repMeasuresCTRL;