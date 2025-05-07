/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */

var Sqrl = require('squirrelly');
const {getT} = require("../../../../localization");
var baseElement = require('./baseElement').baseElement;
let t = getT('menutoolbar')

class formulaControl extends baseElement {
    content;
    id;
    required = false;
    htmlTemplate = `
        <div class="formula-builder">
        <div class="row">
            <div class="col col-xx"></div>
            <div class="col col-rr mb-2">
            <h6>{{if(options.ms.label !=undefined)}}{{ms.label}}{{#else}}${t('FBStr0')}:{{/if}}{{if(options.ms.required)}}<span class="required">*</span>{{/if}}</h6>
            <div class="small-label">
                    ${t('FBStr1')}<br>${t('FBStr2')}<br>${t('FBStr3')}<br>${t('FBStr4')}<br>${t('FBStr5')}
            </div>
            </div>
        </div>
        <div class="row">
        <div class="col col-xx"></div>
        <div class="col col-rr">
            <div class="row pr-15">
                <div class="col p-0">
                <button type="button" class="btn btn-outline-secondary 
                    formula-btn w-100 m-0 {{if(options.ms.default=="plus" )}}activated{{/if}}" val="+" 
                    onclick="toggleButton(event, true)" ondblclick="toFormula(event)"
                    data-toggle="tooltip" data-html="true" data-placement="top"   
                    title="${t('FBttip1')}">
                    <i class="fas fa-plus"></i>
                </button>
                </div>
                <div class="col p-0">
                    <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                        val="-" onclick="toggleButton(event, true)" ondblclick="toFormula(event)"
                        data-toggle="tooltip" data-html="true" data-placement="top"   
                        title="${t('FBttip2')}">
                        <i class="fas fa-minus"></i>
                    </button>
                </div>
                <div class="col p-0">
                    <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0{{if(options.ms.default=="asterix" )}}activated{{/if}}" 
                    val="*" onclick="toggleButton(event, true)" ondblclick="toFormula(event)"
                    data-toggle="tooltip" data-html="true" data-placement="top"   
                    title="${t('FBttip3')}">
                        <i class="fas fa-asterisk"></i>
                    </button>
                </div>
                <div class="col p-0">
                    <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                    val="/" onclick="toggleButton(event, true)"  ondblclick="toFormula(event)"
                    data-toggle="tooltip" data-html="true" data-placement="top"   
                    title="${t('FBttip4')}">
                        /
                    </button>
                </div>

            </div>
        </div>
    </div>


    <div class="row">
    <div class="col col-xx"></div>
        <div class="col col-rr">
            <div class="row pr-15">
				<div class="col p-0">
                    <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                        val="(" onclick="toFormula(event)"
                        data-toggle="tooltip" data-html="true" data-placement="top"   
                        title="${t('FBttip5')}">
                        (
                    </button>
                </div>
                <div class="col p-0">
                    <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" val=")" 
                        onclick="toFormula(event)"
                        data-toggle="tooltip" data-html="true" data-placement="top"   
                        title="${t('FBttip6')}">
                        )
                    </button>
                </div>
                <div class="col p-0">
					<button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
						val="%in%" onclick="toFormula(event)"
						data-toggle="tooltip" data-html="true" data-placement="top"   
						title="${t('FBttip7')}">
						%in%
					</button>
                </div>
                <div class="col p-0">
					<button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" val="|" 
						onclick="toFormula(event)"
						data-toggle="tooltip" data-html="true" data-placement="top"   
						title="${t('FBttip8')}">
						|
					</button>
                </div>
                <div class="col p-0">
                    <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" val=":" 
                            onclick="toggleButton(event, true)" ondblclick="toFormula(event)"
                            data-toggle="tooltip" data-html="true" data-placement="top"   
                        title="${t('FBttip9')}">
                        :   
                    </button>
				</div>
                
            </div>
        </div>
</div>
<div class="row">
    <div class="col col-xx"></div>
        <div class="col col-rr">
            <div class="row pr-15">		
				<div class="col p-0" >
                    <select class="custom-select formula-select m-0" style= {  text-align-last:center;} onclick="toggleButton(event)" onchange="toggleButton(event)"
                        data-toggle="tooltip" data-html="true" data-placement="top" style:{ margin: 20px auto;}   
                        title="${t('FBttip10')}">                        
                        <option value="2">${t('FBbtnlbl10a')}</option>
                        <option value="3">${t('FBbtnlbl10b')}</option>
                        <option value="4">${t('FBbtnlbl10c')}</option>
                        <option value="5">${t('FBbtnlbl10d')}</option>
                        <option value="6">${t('FBbtnlbl10e')}</option>
                        <option value="7">${t('FBbtnlbl10f')}</option>
                        <option value="8">${t('FBbtnlbl10g')}</option>
                        <option value="9">${t('FBbtnlbl10h')}</option>
                        <option value="10">${t('FBbtnlbl10i')}</option>
                    </select>
                </div>
                <div class="col p-0">
                <div class="formula-btn pl-1 m-0" val="^" onclick="toggleSelectPoly(event,&quot;{{modal.id}}_{{ms.no}}_polyTerms&quot; )">
                    ${t('FBbtnlbl11')}
                    <input class="w-25 formula-select formula-options" type="number" id="{{modal.id}}_{{ms.no}}_polyTerms" 
                        bs-type="text" min="0" max="10000" step="1"  default="2" value="2" 
                        onclick="toggleButton(event, true)" onchange="toggleSelect(event)"
                        data-toggle="tooltip" data-html="true" data-placement="top"   
                        title="${t('FBttip11')}">
                </div>
                </div>   
            </div>
        </div>
</div>
<div class="row">
        <div class="col col-xx"></div>
        <div class="col col-rr">
            <div class="row pr-15">
            <div class="col  p-0">
                <div class="formula-btn pl-1 m-0" val="df for splines">
                    ${t('FBbtnlbl12')}
                    <input class="w-25 formula-select formula-options" type="number" id="{{modal.id}}_{{ms.no}}_splinesDeg" 
                    bs-type="text" min="0" max="10000" step="1"  default="5" value="5" 
                    data-toggle="tooltip" data-html="true" data-placement="top"   
                    title="${t('FBttip12')}">
                </div>
            </div>
            <div class="col p-0">
                    <div class="formula-btn pl-1 m-0" val="Polynomial degree">
                    ${t('FBbtnlbl13')}
                    <input class="w-25 formula-select formula-options" type="number" id="{{modal.id}}_{{ms.no}}_polyDeg" 
                    bs-type="text" min="0" max="10000" step="1"  default="5" value="5" 
                    data-toggle="tooltip" data-html="true" data-placement="top"   
                    title="${t('FBttip13')}">
                    </div>
                </div>     
            </div>
        </div>
</div>
    
<div class="row">
    <div class="col col-xx"></div>
    <div class="col col-rr">
            <div class="row pr-15">
                <div class="col p-0">
                    <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                        val="B-spline" onclick="toggleButton(event, true)" ondblclick="toFormula(event)"
                        data-toggle="tooltip" data-html="true" data-placement="top"   
                        title="${t('FBttip14')}">
                        <b>${t('FBbtnlbl14')}</b>
                    </button>
                </div>
                <div class="col p-0">
                    <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" val="natural spline" 
                        onclick="toggleButton(event, true)" ondblclick="toFormula(event)"
                        data-toggle="tooltip" data-html="true" data-placement="top"   
                        title="${t('FBttip15')}">
                        <b>${t('FBbtnlbl15')}</b>
                    </button>
                </div>
            </div>
    </div>
</div>

<div class="row">
    <div class="col col-xx"></div>
    <div class="col col-rr">
            <div class="row pr-15">
                <div class="col p-0">
                    <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                        val="Orthogonal polynomial" onclick="toggleButton(event, true)" ondblclick="toFormula(event)"
                        data-toggle="tooltip" data-html="true" data-placement="top"   
                        title="${t('FBttip16')}">
                        <b>${t('FBbtnlbl16')}</b>
                    </button>
                </div>
                <div class="col p-0">
                    <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" val="Raw polynomial" 
                    onclick="toggleButton(event, true)" ondblclick="toFormula(event)"
                        data-toggle="tooltip" data-html="true" data-placement="top"   
                        title="${t('FBttip17')}">
                        <b>${t('FBbtnlbl17')}</b>
                    </button>
                </div>
                
            </div>
    </div>
</div>

    <div class="row">
        <div class="col col-xx">
            <button type="button" class="btn btn-outline-secondary btn-arrows" id="{{modal.id}}arrow{{ms.no}}">
                <i class="fas fa-arrow-right"></i>
            </button>
        </div>
        <div class="col col-rr">
            <textarea class="w-100" rows="3" 
                      type="text" bs-type="text" 
                      extractable="true" extractionRule="{{ms.extraction}}"  
                      id="{{modal.id}}_{{ms.no}}" 
                      modal_id="{{modal.id}}" no="{{ms.no}}" 
                      placeholder="Formula appears here" 
                      ondragover="allowDrop(event)" 
                      ondrop="dropToTextArea(event)"></textarea>
        </div>
    </div>
    </div>
    `
    constructor(modal, config) {
        super(modal, config);
        if (config.label !== undefined) {
            this.label = config.label;
        }
        if(!config.hasOwnProperty("default"))
        {
            config.default ="plus"
        }
        if (config.required) {
            this.required = config.required;
        }
       
        this.content = Sqrl.Render(this.htmlTemplate, {modal: modal, ms: config})
        this.id = `${modal.id}_${config.no}`
    }
    
    canExecute(refToBaseModal) {
        var outer_this = this;
        var value = this.getVal()
        if (this.required &&  (value == "" || value == undefined)){
            dialog.showMessageBoxSync({type: "error", buttons: ["OK"], title: t('CBuilderRulVoiTitle'), message: `${t('FBRulVoiMsg')}`})     
                return false
        }
        else
        {
            return true
        }
    }
    
    clearContent() {
        if (this.value !== null) {
            $(`#${this.id}`).val(this.value)
        } else {
            $(`#${this.id}`).val("")
        }
        
    }

}

module.exports.element = formulaControl;