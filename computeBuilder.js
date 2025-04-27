/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */

var Sqrl = require('squirrelly');
const common = require("./common")
const {getT} = global.requireFromRoot("localization");
var baseElement = require('./baseElement').baseElement;
let t = getT('menutoolbar')

class computeBuilder extends baseElement{
    content;
    id;
    required = false;
    htmlTemplate = `
    <div builder_id ="{{modal.id}}_{{ms.no}}"  class="formula-builder mb-3">
        <div class="row">
            <div class="col col-xx"></div>
            <div class="col col-rr mb-2">
            <h6>{{if(options.ms.label !="")}}{{ms.label}}{{#else}}Expression Builder:{{/if}}{{if(options.ms.required)}}<span class="required">*</span>{{/if}}</h6>
            <div class="small-label">
            ${t('CBStr1')}<br>${t('CBStr2')}<br>${t('CBStr3')}<br>${t('CBStr4')}
            </div>  
            </div>
        </div>
        <div class="row">
            <div class="col col-xx"></div>
            <div class="col col-rr pl-60">
                <div class="d-flex nav-black unselectable">
                    <div class="scmenu" style="width: calc(90vw);">
                    <div class="scroller scroller-menu-left"><img src="assets/images/chevron_left.svg" /></div>
                    <div class="scroller scroller-menu-right"><img src="assets/images/chevron_right.svg" /></div>
                        <div class="scwrapper">
                            <ul class="nav nav-pils sclist nav-black" style="width:100%" role="tablist">
                                <li class="nav-item">
                                    <a class="nav-link btn-secondary btn-top-menu active" 
                                    style="-webkit-app-region: no-drag;" data-toggle="tab" 
                                    href="#{{modal.id}}_{{ms.no}}_tab1" onclick="resetComputeBuilderButtons(event); return true;" aria-controls="{{modal.id}}_{{ms.no}}_tab1" 
                                    aria-selected="true" role="tab">
                                    ${t('CBtabArithmetic')}
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link btn-secondary btn-top-menu" 
                                    style="-webkit-app-region: no-drag;" data-toggle="tab" 
                                    href="#{{modal.id}}_{{ms.no}}_tab2" onclick="resetComputeBuilderButtons(event); return true;" aria-controls="{{modal.id}}_{{ms.no}}_tab2" 
                                    aria-selected="true" role="tab">
                                    ${t('CBtabLogical')}
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link btn-secondary btn-top-menu" 
                                    style="-webkit-app-region: no-drag;" data-toggle="tab" 
                                    href="#{{modal.id}}_{{ms.no}}_tab3" onclick="resetComputeBuilderButtons(event); return true;" aria-controls="{{modal.id}}_{{ms.no}}_tab3" 
                                    aria-selected="true" role="tab">
                                    ${t('CBtabMath')}
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link btn-secondary btn-top-menu" 
                                    style="-webkit-app-region: no-drag;" data-toggle="tab" 
                                    href="#{{modal.id}}_{{ms.no}}_tab4" onclick="resetComputeBuilderButtons(event); return true;" aria-controls="{{modal.id}}_{{ms.no}}_tab4" 
                                    aria-selected="true" role="tab">
                                    ${t('CBtabString1')}
                                    </a>
                                </li>

                                
                                <li class="nav-item">
                                    <a class="nav-link btn-secondary btn-top-menu" 
                                    style="-webkit-app-region: no-drag;" data-toggle="tab" 
                                    href="#{{modal.id}}_{{ms.no}}_tab5" onclick="resetComputeBuilderButtons(event); return true;" aria-controls="{{modal.id}}_{{ms.no}}_tab5" 
                                    aria-selected="true" role="tab">
                                    ${t('CBtabString2')}
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link btn-secondary btn-top-menu" 
                                    style="-webkit-app-region: no-drag;" data-toggle="tab" 
                                    href="#{{modal.id}}_{{ms.no}}_tab6" onclick="resetComputeBuilderButtons(event); return true;" aria-controls="{{modal.id}}_{{ms.no}}_tab6" 
                                    aria-selected="true" role="tab">
                                    ${t('CBtabConversion')}
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link btn-secondary btn-top-menu" 
                                    style="-webkit-app-region: no-drag;" data-toggle="tab" 
                                    href="#{{modal.id}}_{{ms.no}}_tab7" onclick="resetComputeBuilderButtons(event); return true;" aria-controls="{{modal.id}}_{{ms.no}}_tab7" 
                                    aria-selected="true" role="tab">
                                    ${t('CBtabStatistical')}
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link btn-secondary btn-top-menu" 
                                    style="-webkit-app-region: no-drag;" data-toggle="tab" 
                                    href="#{{modal.id}}_{{ms.no}}_tab8" onclick="resetComputeBuilderButtons(event); return true;" aria-controls="{{modal.id}}_{{ms.no}}_tab8" 
                                    aria-selected="true" role="tab">
                                    ${t('CBtabRandomNumbers')}
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link btn-secondary btn-top-menu" 
                                    style="-webkit-app-region: no-drag;" data-toggle="tab" 
                                    href="#{{modal.id}}_{{ms.no}}_tab9" onclick="resetComputeBuilderButtons(event); return true;" aria-controls="{{modal.id}}_{{ms.no}}_tab9" 
                                    aria-selected="true" role="tab">
                                    ${t('CBtabDate1')}
                                    </a>
                                </li>
                                    <li class="nav-item">
                                    <a class="nav-link btn-secondary btn-top-menu" 
                                    style="-webkit-app-region: no-drag;" data-toggle="tab" 
                                    href="#{{modal.id}}_{{ms.no}}_tab10" onclick="resetComputeBuilderButtons(event); return true;" aria-controls="{{modal.id}}_{{ms.no}}_tab10" 
                                    aria-selected="true" role="tab">
                                    ${t('CBtabDate2')}
                                    </a>
                                 </li>
                                 </li>
                                 <li class="nav-item">
                                    <a class="nav-link btn-secondary btn-top-menu" 
                                    style="-webkit-app-region: no-drag;" data-toggle="tab" 
                                    href="#{{modal.id}}_{{ms.no}}_tab11" onclick="resetComputeBuilderButtons(event); return true;" aria-controls="{{modal.id}}_{{ms.no}}_tab11" 
                                    aria-selected="true" role="tab">
                                    ${t('CBtabDate3')}
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link btn-secondary btn-top-menu" 
                                    style="-webkit-app-region: no-drag;" data-toggle="tab" 
                                    href="#{{modal.id}}_{{ms.no}}_tab12" onclick="resetComputeBuilderButtons(event); return true;" aria-controls="{{modal.id}}_{{ms.no}}_tab12" 
                                    aria-selected="true" role="tab">
                                    ${t('CBtabDate4')}
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col col-xx"></div>
            <div class="col col-rr">
                <div class="tab-content" >
                    <div class="tab-pane tab-pane-top fade active show " id="{{modal.id}}_{{ms.no}}_tab1" role="tabpanel" aria-labelledby="{{modal.id}}_{{ms.no}}_tab1">
                        <div class="row pr-15">
                            <div class="col p-0">
                                <button type="button" class="btn btn-outline-secondary 
                                    formula-btn w-100 m-0 activated" val="+" 
                                    onclick="toggleButton(event, true)" ondblclick="toFormula(event)"
                                    data-toggle="tooltip" data-html="true" data-placement="top"   
                                    title="${t('CBttip1')}">
                                    <i class="fas fa-plus"></i>
                                </button>
                            </div>
                            <div class="col p-0">
                                <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                                    val="-" onclick="toggleButton(event, true)" ondblclick="toFormula(event)"
                                    data-toggle="tooltip" data-html="true" data-placement="top"   
                                    title="${t('CBttip2')}">
                                    <i class="fas fa-minus"></i>
                                </button>
                            </div>
                            <div class="col p-0">
                                <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                                val="*" onclick="toggleButton(event, true)" ondblclick="toFormula(event)"
                                data-toggle="tooltip" data-html="true" data-placement="top"   
                                title="${t('CBttip3')}">
                                    <i class="fas fa-asterisk"></i>
                                </button>
                            </div>
                            <div class="col p-0">
                                <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                                val="/" onclick="toggleButton(event, true)"  ondblclick="toFormula(event)"
                                data-toggle="tooltip" data-html="true" data-placement="top"   
                                title="${t('CBttip4')}">
                                    /
                                </button>
                            </div>
                            <div class="col p-0">
                                <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                                    val="^" onclick="toggleButton(event, true)"  ondblclick="toFormula(event)"
                                    data-toggle="tooltip" data-html="true" data-placement="top"   
                                    title="${t('CBttip5')}">
                                    ^
                                </button>
                            </div>

                        </div>
                        <div class="row pr-15">
                            <div class="col p-0">
                                <button type="button" class="btn btn-outline-secondary 
                                    formula-btn w-100 m-0" val="sqrt" 
                                    onclick="toggleButton(event, true)" ondblclick="toFormula(event)"
                                    data-toggle="tooltip" data-html="true" data-placement="top"   
                                    title="${t('CBttip6')}">
                                    ${t('CBbtnlbl6')}
                                </button>
                            </div>
                            <div class="col p-0">
                                <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                                    val="log" onclick="toggleButton(event, true)" ondblclick="toFormula(event)"
                                    data-toggle="tooltip" data-html="true" data-placement="top"   
                                    title="${t('CBttip7')}">
                                    ${t('CBbtnlbl7')}
                                </button>
                            </div>
                            <div class="col p-0">
                                <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                                val="log10" onclick="toggleButton(event, true)" ondblclick="toFormula(event)"
                                data-toggle="tooltip" data-html="true" data-placement="top"   
                                title="${t('CBttip8')}">
                                    ${t('CBbtnlbl8')}
                                </button>
                            </div>
                            <div class="col p-0">
                                <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                                val="log2" onclick="toggleButton(event, true)"  ondblclick="toFormula(event)"
                                data-toggle="tooltip" data-html="true" data-placement="top"   
                                title="${t('CBttip9')}">
                                ${t('CBbtnlbl9')}
                                </button>
                            </div>
                        </div>
                        <div class="row pr-15">
                            <div class="col p-0">
                                <button type="button" class="btn btn-outline-secondary 
                                    formula-btn w-100 m-0" val="%%" 
                                    onclick="toggleButton(event, true)" ondblclick="toFormula(event)"
                                    data-toggle="tooltip" data-html="true" data-placement="top"   
                                    title="${t('CBttip10')}">
                                    ${t('CBbtnlbl10')}
                                </button>
                            </div>
                            <div class="col p-0">
                                <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                                    val="abs" onclick="toggleButton(event, true)" ondblclick="toFormula(event)"
                                    data-toggle="tooltip" data-html="true" data-placement="top"   
                                    title="${t('CBttip11')}">
                                    ${t('CBbtnlbl11')}
                                </button>
                            </div>
                            <div class="col p-0">
                                <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                                val="exp" onclick="toggleButton(event, true)" ondblclick="toFormula(event)"
                                data-toggle="tooltip" data-html="true" data-placement="top"   
                                title="${t('CBttip12')}">
                                    ${t('CBbtnlbl12')}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane tab-pane-top fade" id="{{modal.id}}_{{ms.no}}_tab2" role="tabpanel" aria-labelledby="{{modal.id}}_{{ms.no}}_tab2">
                        <div class="row pr-15">
                            <div class="col p-0">
                                <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                                    val=">"    onclick="toFormula(event)"  
                                    data-toggle="tooltip" data-html="true" data-placement="top"   
                                    title="${t('CBttip13')}">
                                    <b>&gt;</b>
                                </button>
                            </div>
                            <div class="col p-0">
                                <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                                    val="<" onclick="toFormula(event)" 
                                    data-toggle="tooltip" data-html="true" data-placement="top"   
                                    title="${t('CBttip14')}">
                                    <b>&lt;</b>
                                </button>
                            </div>
                            <div class="col p-0">
                                <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                                    val=">=" onclick="toFormula(event)" 
                                    data-toggle="tooltip" data-html="true" data-placement="top"   
                                    title="${t('CBttip15')}">
                                    <b>&gt;=</b>
                                </button>
                            </div>
                            <div class="col p-0">
                                <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                                    val="<=" onclick="toFormula(event)" 
                                    data-toggle="tooltip" data-html="true" data-placement="top"   
                                    title="${t('CBttip16')}">
                                    <b>&lt;=</b>
                                </button>
                            </div>
                            <div class="col p-0">
                                <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                                    val="==" onclick="toFormula(event)" 
                                    data-toggle="tooltip" data-html="true" data-placement="top"   
                                    title="${t('CBttip17')}">
                                    <b>==</b>
                                </button>
                            </div>
                            <div class="col p-0">
                                <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                                    val="!=" onclick="toFormula(event)"
                                    data-toggle="tooltip" data-html="true" data-placement="top"   
                                    title="${t('CBttip18')}">
                                    <b>!=</b>
                                </button>
                            </div>
                        </div>
                        <div class="row pr-15">
                            <div class="col p-0">
                                <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                                    val="|" onclick="toFormula(event)" 
                                    data-toggle="tooltip" data-html="true" data-placement="top"   
                                    title="${t('CBttip19')}">
                                    <b>|</b>
                                </button>
                            </div>
                            <div class="col p-0">
                                <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                                    val="&" onclick="toFormula(event)" 
                                    data-toggle="tooltip" data-html="true" data-placement="top"   
                                    title="${t('CBttip20')}">
                                    <b>&amp;</b>
                                </button>
                            </div>
                            <div class="col p-0">
                                <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                                    val="%/%" onclick="toFormula(event)" 
                                    data-toggle="tooltip" data-html="true" data-placement="top"   
                                    title="${t('CBttip21')}">
                                    <b>${t('CBbtnlbl21')}</b>
                                </button>
                            </div>
                            <div class="col p-0">
                                <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                                val="isTRUE" onclick="toggleButton(event, true)" ondblclick="toFormula(event)"
                                data-toggle="tooltip" data-html="true" data-placement="top"   
                                title="${t('CBttip22')}">
                                    ${t('CBbtnlbl22')}
                                </button>
                            </div>
                            <div class="col p-0">
                                <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                                val="is.na" onclick="toggleButton(event, true)" ondblclick="toFormula(event)"
                                data-toggle="tooltip" data-html="true" data-placement="top"   
                                title="${t('CBttip23')}">
                                    ${t('CBbtnlbl23')}
                                </button>
                            </div>

                            <div class="col p-0">
                            <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                                val="%in%" onclick="toFormula(event)"
                                data-toggle="tooltip" data-html="true" data-placement="top"   
                                title="${t('CBttip24')}">
                                ${t('CBbtnlbl24')}
                            </button>
                            </div>


                        </div>
                    </div>
                    <div class="tab-pane tab-pane-top fade" id="{{modal.id}}_{{ms.no}}_tab3" role="tabpanel" aria-labelledby="{{modal.id}}_{{ms.no}}_tab3">
                        <div class="row pr-15">
                            <div class="col p-0">
                                <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                                    val="round" onclick="toggleButton(event, true)" ondblclick="toFormula(event)" 
                                    data-toggle="tooltip" data-html="true" data-placement="top"   
                                    title="${t('CBttip25')}">
                                    <b>${t('CBbtnlbl25')}</b>
                                </button>
                            </div>
                            <div class="col p-0">
                                <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                                    val="ceiling" onclick="toggleButton(event, true)" ondblclick="toFormula(event)" 
                                    data-toggle="tooltip" data-html="true" data-placement="top"   
                                    title="${t('CBttip26')}">
                                    <b>${t('CBbtnlbl26')}</b>
                                </button>
                            </div>
                            <div class="col p-0">
                                <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                                    val="floor" onclick="toggleButton(event, true)" ondblclick="toFormula(event)" 
                                    data-toggle="tooltip" data-html="true" data-placement="top"   
                                    title="${t('CBttip27')}">
                                    <b>${t('CBbtnlbl27')}</b>
                                </button>
                            </div>
                            <div class="col p-0">
                                <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                                    val="signif" onclick="toggleButton(event, true)" ondblclick="toFormula(event)" 
                                    data-toggle="tooltip" data-html="true" data-placement="top"   
                                    title="${t('CBttip28')}">
                                    <b>${t('CBbtnlbl28')}</b>
                                </button>
                            </div>
                            <div class="col p-0">
                                <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                                    val="gamma" onclick="toggleButton(event, true)" ondblclick="toFormula(event)" 
                                    data-toggle="tooltip" data-html="true" data-placement="top"   
                                    title="${t('CBttip29')}">
                                    <b>${t('CBbtnlbl29')}</b>
                                </button>
                            </div>
                            <div class="col p-0">
                                <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                                    val="lgamma" onclick="toggleButton(event, true)" ondblclick="toFormula(event)" 
                                    data-toggle="tooltip" data-html="true" data-placement="top"   
                                    title="${t('CBttip30')}">
                                    <b>${t('CBbtnlbl30')}</b>
                                </button>
                            </div>
                            <div class="col p-0">
                                <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                                    val="beta" onclick="toggleButton(event, true)" ondblclick="toFormula(event)" 
                                    data-toggle="tooltip" data-html="true" data-placement="top"   
                                    title="${t('CBttip31')}">
                                    <b>${t('CBbtnlbl31')}</b>
                                </button>
                            </div>
                            <div class="col p-0">
                                <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                                    val="lbeta" onclick="toggleButton(event, true)" ondblclick="toFormula(event)" 
                                    data-toggle="tooltip" data-html="true" data-placement="top"   
                                    title="${t('CBttip32')}">
                                    <b>${t('CBbtnlbl32')}</b>
                                </button>
                            </div>
                            <div class="col p-0">
                                <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                                val="factorial" onclick="toggleButton(event, true)" ondblclick="toFormula(event)" 
                                data-toggle="tooltip" data-html="true" data-placement="top"   
                                title="${t('CBttip33')}">
                                <b>${t('CBbtnlbl33')}</b>
                                </button>
                            </div>
                            <div class="col p-0">
                                <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                                val="pigamma" onclick="toggleButton(event, true)" ondblclick="toFormula(event)" 
                                data-toggle="tooltip" data-html="true" data-placement="top"   
                                title="${t('CBttip34')}">
                                <b>${t('CBbtnlbl34')}</b>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane tab-pane-top fade" id="{{modal.id}}_{{ms.no}}_tab4" role="tabpanel"  aria-labelledby="{{modal.id}}_{{ms.no}}_tab4">
                        <div class="row pr-15">
                            <div class="col p-0">
                                    <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                                        val="toupper" onclick="toggleButton(event, true)" ondblclick="toFormula(event)" 
                                        data-toggle="tooltip" data-html="true" data-placement="top"   
                                        title="${t('CBttip35')}">
                                        <b>${t('CBbtnlbl35')}</b>
                                    </button>
                            </div>
                            <div class="col p-0">
                                    <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                                        val="tolower" onclick="toggleButton(event, true)" ondblclick="toFormula(event)" 
                                        data-toggle="tooltip" data-html="true" data-placement="top"   
                                        title="${t('CBttip36')}">
                                        <b>${t('CBbtnlbl36')}</b>
                                    </button>
                            </div>
                            <div class="col p-0">
                                <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                                    val="Pad" onclick="toggleButton(event, true)" ondblclick="toFormula(event)" 
                                    data-toggle="tooltip" data-html="true" data-placement="top"   
                                    title="${t('CBttip37')}">
                                    <b>${t('CBbtnlbl37')}</b>
                                </button>
                            </div>
                            <div class="col p-0">
                                <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                                    val="Trim" onclick="toggleButton(event, true)" ondblclick="toFormula(event)" 
                                    data-toggle="tooltip" data-html="true" data-placement="top"   
                                    title="${t('CBttip38')}">
                                    <b>${t('CBbtnlbl38')}</b>
                                </button>
                            </div>
                            <div class="col p-0">
                                <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                                    val="Length" onclick="toggleButton(event, true)" ondblclick="toFormula(event)" 
                                    data-toggle="tooltip" data-html="true" data-placement="top"   
                                    title="${t('CBttip39')}">
                                    <b>${t('CBbtnlbl39')}</b>
                                </button>
                            </div>
                            <div class="col p-0">
                                <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                                    val="Count(matches)" onclick="toggleButton(event, true)" ondblclick="toFormula(event)" 
                                    data-toggle="tooltip" data-html="true" data-placement="top"   
                                    title="${t('CBttip40')}">
                                    <b>${t('CBbtnlbl40')}</b>
                                </button>
                            </div>
                        </div>
                    </div>
                <div class="tab-pane tab-pane-top fade" id="{{modal.id}}_{{ms.no}}_tab5" role="tabpanel" aria-labelledby="{{modal.id}}_{{ms.no}}_tab5">
                    <div class="row pr-15">
                    <div class="col p-0">
                        <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                            val="Extract Substring" onclick="toggleButton(event, true)" ondblclick="toFormula(event)" 
                            data-toggle="tooltip" data-html="true" data-placement="top"   
                            title="${t('CBttip41')}">
                            <b>${t('CBbtnlbl41')}</b>
                        </button>
                    </div>
                    <div class="col p-0">
                        <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                            val="Concatenate" onclick="toggleButton(event, true)" ondblclick="toFormula(event)" 
                            data-toggle="tooltip" data-html="true" data-placement="top"   
                            title="${t('CBttip42')}">
                            <b>${t('CBbtnlbl42')}</b>
                        </button>
                    </div>
                    <div class="col p-0">
                        <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                            val="Replace Pattern" onclick="toggleButton(event, true)" ondblclick="toFormula(event)" 
                            data-toggle="tooltip" data-html="true" data-placement="top"   
                            title="${t('CBttip43')}">
                            <b>${t('CBbtnlbl43')}</b>
                        </button>
                    </div>
                    <div class="col p-0">
                        <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                            val="Replace Pattern(ALL)" onclick="toggleButton(event, true)" ondblclick="toFormula(event)" 
                            data-toggle="tooltip" data-html="true" data-placement="top"   
                            title="${t('CBttip44')}">
                            <b>${t('CBbtnlbl44')}</b>
                        </button>
                    </div>
                    <div class="col p-0">
                        <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                            val="Extract a Number" onclick="toggleButton(event, true)" ondblclick="toFormula(event)" 
                            data-toggle="tooltip" data-html="true" data-placement="top"   
                            title="${t('CBttip45')}">
                            <b>${t('CBbtnlbl45')}</b>
                        </button>
                    </div>
                    </div>
                </div>
                <div class="tab-pane tab-pane-top fade" id="{{modal.id}}_{{ms.no}}_tab6" role="tabpanel" aria-labelledby="{{modal.id}}_{{ms.no}}_tab6">
                    <div class="row pr-15">
                    <div class="col p-0">
                        <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                            val="as.numeric" onclick="toggleButton(event, true)" ondblclick="toFormula(event)" 
                            data-toggle="tooltip" data-html="true" data-placement="top"   
                            title="${t('CBttip46')}">
                            <b>${t('CBbtnlbl46')}</b>
                        </button>
                    </div>
                    <div class="col p-0">
                        <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                            val="ToCharacter" onclick="toggleButton(event, true)" ondblclick="toFormula(event)" 
                            data-toggle="tooltip" data-html="true" data-placement="top"   
                            title="${t('CBttip47')}">
                            <b>${t('CBbtnlbl47')}</b>
                        </button>
                    </div>
                <div class="col p-0">
                    <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                        val="ToFactor" onclick="toggleButton(event, true)" ondblclick="toFormula(event)" 
                        data-toggle="tooltip" data-html="true" data-placement="top"   
                        title="${t('CBttip48')}">
                        <b>${t('CBbtnlbl48')}</b>
                    </button>
                 </div>
                <div class="col p-0">
                    <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                        val="ToOrdered" onclick="toggleButton(event, true)" ondblclick="toFormula(event)" 
                        data-toggle="tooltip" data-html="true" data-placement="top"   
                        title="${t('CBttip49')}">
                        <b>${t('CBbtnlbl49')}</b>
                    </button>
                 </div>
                 <div class="col p-0">
                 <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                     val="ToLogical" onclick="toggleButton(event, true)" ondblclick="toFormula(event)" 
                     data-toggle="tooltip" data-html="true" data-placement="top"   
                     title="${t('CBttip50')}">
                     <b>${t('CBbtnlbl50')}</b>
                 </button>
              </div>
                    </div>
                </div>
                <div class="tab-pane tab-pane-top fade" id="{{modal.id}}_{{ms.no}}_tab7" role="tabpanel" aria-labelledby="{{modal.id}}_{{ms.no}}_tab7">
                <div class="row pr-15">
                <div class="col p-0">
                    <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                        val="max" onclick="toggleButton(event, true)" ondblclick="toFormula(event)" 
                        data-toggle="tooltip" data-html="true" data-placement="top"   
                        title="${t('CBttip51')}">
                        <b>${t('CBbtnlbl51')}</b>
                    </button>
                </div>
                <div class="col p-0">
                    <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                        val="min" onclick="toggleButton(event, true)" ondblclick="toFormula(event)" 
                        data-toggle="tooltip" data-html="true" data-placement="top"   
                        title="${t('CBttip52')}">
                        <b>${t('CBbtnlbl52')}</b>
                    </button>
                </div>
                <div class="col p-0">
                    <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                        val="mean" onclick="toggleButton(event, true)" ondblclick="toFormula(event)" 
                        data-toggle="tooltip" data-html="true" data-placement="top"   
                        title="${t('CBttip53')}">
                        <b>${t('CBbtnlbl53')}</b>
                    </button>
                </div>
                <div class="col p-0">
                    <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                        val="median" onclick="toggleButton(event, true)" ondblclick="toFormula(event)" 
                        data-toggle="tooltip" data-html="true" data-placement="top"   
                        title="${t('CBttip54')}">
                        <b>${t('CBbtnlbl54')}</b>
                    </button>
                </div>
                <div class="col p-0">
                    <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                        val="sd" onclick="toggleButton(event, true)" ondblclick="toFormula(event)" 
                        data-toggle="tooltip" data-html="true" data-placement="top"   
                        title="${t('CBttip55')}">
                        <b>${t('CBbtnlbl55')}</b>
                    </button>
                </div>
                <div class="col p-0">
                    <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                        val="sum" onclick="toggleButton(event, true)" ondblclick="toFormula(event)" 
                        data-toggle="tooltip" data-html="true" data-placement="top"   
                        title="${t('CBttip56')}">
                        <b>${t('CBbtnlbl56')}</b>
                    </button>
                </div>
                <div class="col p-0">
                    <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                        val="variance" onclick="toggleButton(event, true)" ondblclick="toFormula(event)" 
                        data-toggle="tooltip" data-html="true" data-placement="top"   
                        title="${t('CBttip57')}">
                        <b>${t('CBbtnlbl57')}</b>
                    </button>
                </div>
                </div>
            </div>
          <div class="tab-pane tab-pane-top fade" id="{{modal.id}}_{{ms.no}}_tab8" role="tabpanel" aria-labelledby="{{modal.id}}_{{ms.no}}_tab8">
                <div class="row pr-15">
                <div class="col p-0">
                <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                    val="runif" onclick="toggleButton(event, true)" ondblclick="toFormula(event)"
                    data-toggle="tooltip" data-html="true" data-placement="top"   
                    title="${t('CBttip58')}">
                    <b>${t('CBbtnlbl58')}</b>
                </button>
            </div>
            <div class="col p-0">
                <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                    val="sample" onclick="toggleButton(event, true)" ondblclick="toFormula(event)" 
                    data-toggle="tooltip" data-html="true" data-placement="top"   
                    title="${t('CBttip59')}">
                    <b>${t('CBbtnlbl59')}</b>
                </button>
            </div>
                <div class="col p-0">
                        <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                            val="rnorm" onclick="toggleButton(event, true)" ondblclick="toFormula(event)" 
                            data-toggle="tooltip" data-html="true" data-placement="top"   
                            title="${t('CBttip60')}">
                            <b>${t('CBbtnlbl60')}</b>
                        </button>
                </div>
                </div>
                </div>
            <div class="tab-pane tab-pane-top fade" id="{{modal.id}}_{{ms.no}}_tab9" role="tabpanel" aria-labelledby="{{modal.id}}_{{ms.no}}_tab9">
                <div class="row pr-15">
                <div class="col p-0">
                <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                    val="Day of Week" onclick="toggleButton(event, true)" ondblclick="toFormula(event)" 
                    data-toggle="tooltip" data-html="true" data-placement="top"   
                    title="${t('CBttip61')}">
                    <b>${t('CBbtnlbl61')}</b>
                </button>
            </div>
            <div class="col p-0">
                <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                    val="Day of Month" onclick="toggleButton(event, true)" ondblclick="toFormula(event)" 
                    data-toggle="tooltip" data-html="true" data-placement="top"   
                    title="${t('CBttip62')}">
                    <b>${t('CBbtnlbl62')}</b>
                </button>
            </div> 
                <div class="col p-0">
                        <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                            val="Day of Year" onclick="toggleButton(event, true)" ondblclick="toFormula(event)" 
                            data-toggle="tooltip" data-html="true" data-placement="top"   
                            title="${t('CBttip63')}">
                            <b>${t('CBbtnlbl63')}</b>
                        </button>
                </div>
                </div>
                <div class="row pr-15">

                <div class="col p-0">
                        <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                            val="Week of Year" onclick="toggleButton(event, true)" ondblclick="toFormula(event)" 
                            data-toggle="tooltip" data-html="true" data-placement="top"   
                            title="${t('CBttip64')}">
                            <b>${t('CBbtnlbl64')}</b>
                        </button>
                </div>
                <div class="col p-0">
                        <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                            val="Month" onclick="toggleButton(event, true)" ondblclick="toFormula(event)" 
                            data-toggle="tooltip" data-html="true" data-placement="top"   
                            title="${t('CBttip65')}">
                            <b>${t('CBbtnlbl65')}</b>
                        </button>
                </div>
                <div class="col p-0">
                        <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                            val="Month(decimal)" onclick="toggleButton(event, true)" ondblclick="toFormula(event)" 
                            data-toggle="tooltip" data-html="true" data-placement="top"   
                            title="${t('CBttip66')}">
                            <b>${t('CBbtnlbl66')}</b>
                        </button>
                </div>
                </div>
                </div>
                <div class="tab-pane tab-pane-top fade" id="{{modal.id}}_{{ms.no}}_tab10" role="tabpanel" aria-labelledby="{{modal.id}}_{{ms.no}}_tab10">
                <div class="row pr-15">
                <div class="col p-0">
                <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                    val="Quarters" onclick="toggleButton(event, true)" ondblclick="toFormula(event)" 
                    data-toggle="tooltip" data-html="true" data-placement="top"   
                    title="${t('CBttip67')}">
                    <b>${t('CBbtnlbl67')}</b>
                </button>
                </div>
                <div class="col p-0">
                <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                    val="Year(XXXX)" onclick="toggleButton(event, true)" ondblclick="toFormula(event)" 
                    data-toggle="tooltip" data-html="true" data-placement="top"   
                    title="${t('CBttip68')}">
                    <b>${t('CBbtnlbl68')}</b>
                </button>
                </div>
                
                <div class="col p-0">
                        <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                            val="Year(XX)" onclick="toggleButton(event, true)" ondblclick="toFormula(event)" 
                            data-toggle="tooltip" data-html="true" data-placement="top"   
                            title="${t('CBttip69')}">
                            <b>${t('CBbtnlbl69')}</b>
                        </button>
                </div>
                </div>

                <div class="row pr-15"> 
                    <div class="col p-0">
                            <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                                val="Hour(00-12)" onclick="toggleButton(event, true)" ondblclick="toFormula(event)" 
                                data-toggle="tooltip" data-html="true" data-placement="top"   
                                title="${t('CBttip70')}">
                                <b>${t('CBbtnlbl70')}</b>
                            </button>
                    </div>


                    <div class="col p-0">
                            <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                                val="Hour(00-23)" onclick="toggleButton(event, true)" ondblclick="toFormula(event)" 
                                data-toggle="tooltip" data-html="true" data-placement="top"   
                                title="${t('CBttip71')}">
                                <b>${t('CBbtnlbl71')}</b>
                            </button>
                    </div>
                    <div class="col p-0">
                            <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                                val="Minutes" onclick="toggleButton(event, true)" ondblclick="toFormula(event)" 
                                data-toggle="tooltip" data-html="true" data-placement="top"   
                                title="${t('CBttip72')}">
                                <b>${t('CBbtnlbl72')}</b>
                            </button>
                    </div>
                    <div class="col p-0">
                        <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                        val="Secs" onclick="toggleButton(event, true)" ondblclick="toFormula(event)" 
                        data-toggle="tooltip" data-html="true" data-placement="top"   
                        title="${t('CBttip73')}">
                        <b>${t('CBbtnlbl73')}</b>
                        </button>
                    </div>
                </div>
                </div>
                <div class="tab-pane tab-pane-top fade" id="{{modal.id}}_{{ms.no}}_tab11" role="tabpanel" aria-labelledby="{{modal.id}}_{{ms.no}}_tab11">
                <div class="row pr-15">
                <div class="col p-0">
                <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                    val="Date from String" onclick="toggleButton(event, true)" ondblclick="toFormula(event)" 
                    data-toggle="tooltip" data-html="true" data-placement="top"   
                    title="${t('CBttip74')}">
                    <b>${t('CBbtnlbl74')}</b>
                </button>
            </div>
            <div class="col p-0">
                <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                    val="Date Difference" onclick="toggleButton(event, true)" ondblclick="toFormula(event)" 
                    data-toggle="tooltip" data-html="true" data-placement="top"   
                    title="${t('CBttip75')}">
                    <b>${t('CBbtnlbl75')}</b>
                </button>
            </div>
                </div>
                </div>
                <div class="tab-pane tab-pane-top fade" id="{{modal.id}}_{{ms.no}}_tab12" role="tabpanel" aria-labelledby="{{modal.id}}_{{ms.no}}_tab12">
                <div class="row pr-15">
                <div class="col p-0">
                <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                    val="Numeric to date" onclick="toggleButton(event, true)" ondblclick="toFormula(event)" 
                    data-toggle="tooltip" data-html="true" data-placement="top"   
                    title="${t('CBttip76')}">
                    <b>${t('CBbtnlbl76')}</b>
                </button>
            </div>
            <div class="col p-0">
                <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                    val="String to date" onclick="toggleButton(event, true)" ondblclick="toFormula(event)" 
                    data-toggle="tooltip" data-html="true" data-placement="top"   
                    title="${t('CBttip77')}">
                    <b>${t('CBbtnlbl77')}</b>
                </button>
            </div>
                </div>
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
                        placeholder="{{if(options.ms.placeHolder != undefined)}}{{ms.placeHolder}}{{#else}}Create an expression here:{{/if}}" 
                        ondragover="allowDrop(event)" 
                        ondrop="dropToTextArea(event)"></textarea>
            </div>
        </div>
    </div>
    `
    constructor(modal, config) {
        super(modal, config)
        this.label = config.label
        if (config.required) {
            this.required = config.required;
        }
        if (config.placeHolder !== undefined) {
            this.placeHolder = config.placeHolder;
        }
        this.content = Sqrl.Render(this.htmlTemplate, { modal: modal, ms: config })
        this.id = `${modal.id}_${config.no}`
    }


    canExecute(refToBaseModal) {
        var outer_this = this;
        var value = this.getVal()
        if (this.required &&  ( value == "" || value == undefined)){
            dialog.showMessageBoxSync({type: "error", buttons: ["OK"], title: t('CBuilderRulVoiTitle'), message: `${t('CBuilderRulVoiMsg1')}: "${outer_this.label}" ${t('CBuilderRulVoiMsg2')}`})     
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



module.exports.element = computeBuilder;