/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */


var Sqrl = require('squirrelly');
//const {getT} = global.requireFromRoot("localization");
var baseElement = require('./baseElement').baseElement;
let t = getT('menutoolbar')

class switchCase extends baseElement {
    content;
    id;
    value = null;
    required = false;
    type_expected = null;
    overwrite = null;
    label = null
    no = null   
    htmlTemplate = `
    <div class="row mt-3">
        <div class="col destination">
        <h6>${t('SCStr0')}:{{if(options.ms.required)}}<span class="required">*</span>{{/if}}</h6>
            <div class="small-label">
            ${t('SCStr1')}<br>${t('SCStr2')}<br>${t('SCStr3')}<br>${t('SCStr4')}
                    <br><br><br>
            </div>  
        </div>    
    </div>
    <div class="row">
        <div class="col-3">
            <button class='btn btn-secondary h6 btn-submenu-text' onclick='addRowToSwitchCase("{{modal.id}}_{{ms.no}}")'><i class="fas fa-plus"></i>${t('SCifthenbtn')}</button>
        </div>
        <div class="col-3">
            <button class='btn btn-secondary h6 btn-submenu-text' onclick='addElseToSwitchCase("{{modal.id}}_{{ms.no}}")'><i class="fas fa-plus"></i>${t('SCelsebtn')}</button>
        </div>
        <div class="col-6">
            <label for="{{modal.id}}_{{ms.no}}" class="mt-2 mr-2 small-label">{{ms.label}} {{if(options.ms.required)}}<span class="required">*</span>{{/if}}</label>
        </div>
    </div>
    <div class="row">
        <div class="col">
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
                                ${t('SCtabArithmetic')}
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link btn-secondary btn-top-menu" 
                                style="-webkit-app-region: no-drag;" data-toggle="tab" 
                                href="#{{modal.id}}_{{ms.no}}_tab2" onclick="resetComputeBuilderButtons(event); return true;" aria-controls="{{modal.id}}_{{ms.no}}_tab2" 
                                aria-selected="true" role="tab">
                                ${t('SCtabLogical')}
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link btn-secondary btn-top-menu" 
                                style="-webkit-app-region: no-drag;" data-toggle="tab" 
                                href="#{{modal.id}}_{{ms.no}}_tab3" onclick="resetComputeBuilderButtons(event); return true;" aria-controls="{{modal.id}}_{{ms.no}}_tab3" 
                                aria-selected="true" role="tab">
                                ${t('SCtabMath')}
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link btn-secondary btn-top-menu" 
                                style="-webkit-app-region: no-drag;" data-toggle="tab" 
                                href="#{{modal.id}}_{{ms.no}}_tab4" onclick="resetComputeBuilderButtons(event); return true;" aria-controls="{{modal.id}}_{{ms.no}}_tab4" 
                                aria-selected="true" role="tab">
                                ${t('SCtabString1')}
                                </a>
                            </li>

                            
                            <li class="nav-item">
                                <a class="nav-link btn-secondary btn-top-menu" 
                                style="-webkit-app-region: no-drag;" data-toggle="tab" 
                                href="#{{modal.id}}_{{ms.no}}_tab5" onclick="resetComputeBuilderButtons(event); return true;" aria-controls="{{modal.id}}_{{ms.no}}_tab5" 
                                aria-selected="true" role="tab">
                                ${t('SCtabString2')}
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link btn-secondary btn-top-menu" 
                                style="-webkit-app-region: no-drag;" data-toggle="tab" 
                                href="#{{modal.id}}_{{ms.no}}_tab6" onclick="resetComputeBuilderButtons(event); return true;" aria-controls="{{modal.id}}_{{ms.no}}_tab6" 
                                aria-selected="true" role="tab">
                                ${t('SCtabConversion')}
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link btn-secondary btn-top-menu" 
                                style="-webkit-app-region: no-drag;" data-toggle="tab" 
                                href="#{{modal.id}}_{{ms.no}}_tab7" onclick="resetComputeBuilderButtons(event); return true;" aria-controls="{{modal.id}}_{{ms.no}}_tab7" 
                                aria-selected="true" role="tab">
                                ${t('SCtabStatistical')}
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link btn-secondary btn-top-menu" 
                                style="-webkit-app-region: no-drag;" data-toggle="tab" 
                                href="#{{modal.id}}_{{ms.no}}_tab8" onclick="resetComputeBuilderButtons(event); return true;" aria-controls="{{modal.id}}_{{ms.no}}_tab8" 
                                aria-selected="true" role="tab">
                                ${t('SCtabRandomNumbers')}
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link btn-secondary btn-top-menu" 
                                style="-webkit-app-region: no-drag;" data-toggle="tab" 
                                href="#{{modal.id}}_{{ms.no}}_tab9" onclick="resetComputeBuilderButtons(event); return true;" aria-controls="{{modal.id}}_{{ms.no}}_tab9" 
                                aria-selected="true" role="tab">
                                ${t('SCtabDate1')}
                                </a>
                            </li>
                                <li class="nav-item">
                                <a class="nav-link btn-secondary btn-top-menu" 
                                style="-webkit-app-region: no-drag;" data-toggle="tab" 
                                href="#{{modal.id}}_{{ms.no}}_tab10" onclick="resetComputeBuilderButtons(event); return true;" aria-controls="{{modal.id}}_{{ms.no}}_tab10" 
                                aria-selected="true" role="tab">
                                ${t('SCtabDate2')}
                                </a>
                                </li>
                                </li>
                                <li class="nav-item">
                                <a class="nav-link btn-secondary btn-top-menu" 
                                style="-webkit-app-region: no-drag;" data-toggle="tab" 
                                href="#{{modal.id}}_{{ms.no}}_tab11" onclick="resetComputeBuilderButtons(event); return true;" aria-controls="{{modal.id}}_{{ms.no}}_tab11" 
                                aria-selected="true" role="tab">
                                ${t('SCtabDate3')}
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link btn-secondary btn-top-menu" 
                                style="-webkit-app-region: no-drag;" data-toggle="tab" 
                                href="#{{modal.id}}_{{ms.no}}_tab12" onclick="resetComputeBuilderButtons(event); return true;" aria-controls="{{modal.id}}_{{ms.no}}_tab12" 
                                aria-selected="true" role="tab">
                                ${t('SCtabDate4')}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row mb-1">
        <div class="col">
            <div class="tab-content" >
                <div class="tab-pane tab-pane-top fade active show " id="{{modal.id}}_{{ms.no}}_tab1" role="tabpanel" aria-labelledby="{{modal.id}}_{{ms.no}}_tab1">
                    <div class="row pr-15">
                        <div class="col p-0">
                            <button type="button" class="btn btn-outline-secondary 
                                formula-btn w-100 m-0 activated" val="+" 
                                onclick="toggleButton(event, true)" ondblclick="toFocusedInput(event)"
                                data-toggle="tooltip" data-html="true" data-placement="top"   
                                title="${t('SCttip1')}">
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                        <div class="col p-0">
                            <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                                val="-" onclick="toggleButton(event, true)" ondblclick="toFocusedInput(event)"
                                data-toggle="tooltip" data-html="true" data-placement="top"   
                                title="${t('SCttip2')}">
                                <i class="fas fa-minus"></i>
                            </button>
                        </div>
                        <div class="col p-0">
                            <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                            val="*" onclick="toggleButton(event, true)" ondblclick="toFocusedInput(event)"
                            data-toggle="tooltip" data-html="true" data-placement="top"   
                            title="${t('SCttip3')}">
                                <i class="fas fa-asterisk"></i>
                            </button>
                        </div>
                        <div class="col p-0">
                            <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                            val="/" onclick="toggleButton(event, true)"  ondblclick="toFocusedInput(event)"
                            data-toggle="tooltip" data-html="true" data-placement="top"   
                            title="${t('SCttip4')}">
                                /
                            </button>
                        </div>
                        <div class="col p-0">
                            <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                                val="^" onclick="toggleButton(event, true)"  ondblclick="toFocusedInput(event)"
                                data-toggle="tooltip" data-html="true" data-placement="top"   
                                title="${t('SCttip5')}">
                                ^
                            </button>
                        </div>
                    </div>
                    <div class="row pr-15">
                        <div class="col p-0">
                            <button type="button" class="btn btn-outline-secondary 
                                formula-btn w-100 m-0" val="sqrt" 
                                onclick="toggleButton(event, true)" ondblclick="toFocusedInput(event)"
                                data-toggle="tooltip" data-html="true" data-placement="top"   
                                title="${t('SCttip6')}">
                                ${t('SCbtnlbl6')}
                            </button>
                        </div>
                        <div class="col p-0">
                            <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                                val="log" onclick="toggleButton(event, true)" ondblclick="toFocusedInput(event)"
                                data-toggle="tooltip" data-html="true" data-placement="top"   
                                title="${t('SCttip7')}">
                                ${t('SCbtnlbl7')}
                            </button>
                        </div>
                        <div class="col p-0">
                            <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                            val="log10" onclick="toggleButton(event, true)" ondblclick="toFocusedInput(event)"
                            data-toggle="tooltip" data-html="true" data-placement="top"   
                            title="${t('SCttip8')}">
                            ${t('SCbtnlbl8')}
                            </button>
                        </div>
                        <div class="col p-0">
                            <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                            val="log2" onclick="toggleButton(event, true)"  ondblclick="toFocusedInput(event)"
                            data-toggle="tooltip" data-html="true" data-placement="top"   
                            title="${t('SCttip9')}">
                            ${t('SCbtnlbl9')}
                            </button>
                        </div>
                    </div>
                    <div class="row pr-15">
                        <div class="col p-0">
                            <button type="button" class="btn btn-outline-secondary 
                                formula-btn w-100 m-0" val="%%" 
                                onclick="toggleButton(event, true)" ondblclick="toFocusedInput(event)"
                                data-toggle="tooltip" data-html="true" data-placement="top"   
                                title="${t('SCttip10')}">
                            ${t('SCbtnlbl10')}
                            </button>
                        </div>
                        <div class="col p-0">
                            <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                                val="abs" onclick="toggleButton(event, true)" ondblclick="toFocusedInput(event)"
                                data-toggle="tooltip" data-html="true" data-placement="top"   
                                title="${t('SCttip11')}">
                            ${t('SCbtnlbl11')}
                            </button>
                        </div>
                        <div class="col p-0">
                            <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                            val="exp" onclick="toggleButton(event, true)" ondblclick="toFocusedInput(event)"
                            data-toggle="tooltip" data-html="true" data-placement="top"   
                            title="${t('SCttip12')}">
                            ${t('SCbtnlbl12')}
                            </button>
                        </div>
                    </div>
                </div>
                <div class="tab-pane tab-pane-top fade" id="{{modal.id}}_{{ms.no}}_tab2" role="tabpanel" aria-labelledby="{{modal.id}}_{{ms.no}}_tab2">
                    <div class="row pr-15">
                        <div class="col p-0">
                            <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                                val=">" onclick="toFocusedInput(event)" 
                                data-toggle="tooltip" data-html="true" data-placement="top"   
                                title="${t('SCttip13')}">
                                <b>&gt;</b>
                            </button>
                        </div>
                        <div class="col p-0">
                            <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                                val="<" onclick="toFocusedInput(event)"  
                                data-toggle="tooltip" data-html="true" data-placement="top"   
                                title="${t('SCttip14')}">
                                <b>&lt;</b>
                            </button>
                        </div>
                        <div class="col p-0">
                            <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                                val=">=" onclick="toFocusedInput(event)"  
                                data-toggle="tooltip" data-html="true" data-placement="top"   
                                title="${t('SCttip15')}">
                                <b>&gt;=</b>
                            </button>
                        </div>
                        <div class="col p-0">
                            <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                                val="<=" onclick="toFocusedInput(event)"  
                                data-toggle="tooltip" data-html="true" data-placement="top"   
                                title="${t('SCttip16')}">
                                <b>&lt;=</b>
                            </button>
                        </div>
                        <div class="col p-0">
                            <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                                val="==" onclick="toFocusedInput(event)"  
                                data-toggle="tooltip" data-html="true" data-placement="top"   
                                title="${t('SCttip17')}">
                                <b>==</b>
                            </button>
                        </div>
                        <div class="col p-0">
                            <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                                val="!=" onclick="toFocusedInput(event)"  
                                data-toggle="tooltip" data-html="true" data-placement="top"   
                                title="${t('SCttip18')}">
                                <b>!=</b>
                            </button>
                        </div>
                    </div>
                    <div class="row pr-15">
                        <div class="col p-0">
                            <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                                val="|" onclick="toFocusedInput(event)"  
                                data-toggle="tooltip" data-html="true" data-placement="top"   
                                title="${t('SCttip19')}">
                                <b>|</b>
                            </button>
                        </div>
                        <div class="col p-0">
                            <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                                val="&" onclick="toFocusedInput(event)"  
                                data-toggle="tooltip" data-html="true" data-placement="top"   
                                title="${t('SCttip20')}">
                                <b>&amp;</b>
                            </button>
                        </div>
                        <div class="col p-0">
                            <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                                val="%/%" onclick="toFocusedInput(event)"  
                                data-toggle="tooltip" data-html="true" data-placement="top"   
                                title="${t('SCttip21')}">
                                <b>${t('SCbtnlbl21')}</b>
                            </button>
                        </div>
                        <div class="col p-0">
                            <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                            val="isTRUE" onclick="toggleButton(event, true)" ondblclick="toFocusedInput(event)"
                            data-toggle="tooltip" data-html="true" data-placement="top"   
                            title="${t('SCttip22')}">
                                ${t('SCbtnlbl22')}
                            </button>
                        </div>
                        <div class="col p-0">
                            <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                            val="is.na" onclick="toggleButton(event, true)" ondblclick="toFocusedInput(event)"
                            data-toggle="tooltip" data-html="true" data-placement="top"   
                            title="${t('SCttip23')}">
                                ${t('SCbtnlbl23')}
                            </button>
                        </div>
                        <div class="col p-0">
                            <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" val="%in%" 
                            onclick="toFocusedInput(event)"
                                data-toggle="tooltip" data-html="true" data-placement="top"   
                                title="${t('SCttip24')}">
                                ${t('SCbtnlbl24')}
                            </button>
                        </div>
                    </div>
                </div>
                <div class="tab-pane tab-pane-top fade" id="{{modal.id}}_{{ms.no}}_tab3" role="tabpanel" aria-labelledby="{{modal.id}}_{{ms.no}}_tab3">
                    <div class="row pr-15">
                        <div class="col p-0">
                            <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                                val="round" onclick="toggleButton(event, true)" ondblclick="toFocusedInput(event)" 
                                data-toggle="tooltip" data-html="true" data-placement="top"   
                                title="${t('SCttip25')}">
                                <b>${t('SCbtnlbl25')}</b>
                            </button>
                        </div>
                        <div class="col p-0">
                            <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                                val="ceiling" onclick="toggleButton(event, true)" ondblclick="toFocusedInput(event)" 
                                data-toggle="tooltip" data-html="true" data-placement="top"   
                                title="${t('SCttip26')}">
                                <b>${t('SCbtnlbl26')}</b>
                            </button>
                        </div>
                        <div class="col p-0">
                            <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                                val="floor" onclick="toggleButton(event, true)" ondblclick="toFocusedInput(event)" 
                                data-toggle="tooltip" data-html="true" data-placement="top"   
                                title="${t('SCttip27')}">
                                <b>${t('SCbtnlbl27')}</b>
                            </button>
                        </div>
                        <div class="col p-0">
                            <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                                val="signif" onclick="toggleButton(event, true)" ondblclick="toFocusedInput(event)" 
                                data-toggle="tooltip" data-html="true" data-placement="top"   
                                title="${t('SCttip28')}">
                                <b>${t('SCbtnlbl28')}</b>
                            </button>
                        </div>
                        <div class="col p-0">
                            <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                                val="gamma" onclick="toggleButton(event, true)" ondblclick="toFocusedInput(event)" 
                                data-toggle="tooltip" data-html="true" data-placement="top"   
                                title="${t('SCttip29')}">
                                <b>${t('SCbtnlbl29')}</b>
                            </button>
                        </div>
                        <div class="col p-0">
                            <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                                val="lgamma" onclick="toggleButton(event, true)" ondblclick="toFocusedInput(event)" 
                                data-toggle="tooltip" data-html="true" data-placement="top"   
                                title="${t('SCttip30')}">
                                <b>${t('SCbtnlbl30')}</b>
                            </button>
                        </div>
                        <div class="col p-0">
                            <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                                val="beta" onclick="toggleButton(event, true)" ondblclick="toFocusedInput(event)" 
                                data-toggle="tooltip" data-html="true" data-placement="top"   
                                title="${t('SCttip31')}">
                                <b>${t('SCbtnlbl31')}</b>
                            </button>
                        </div>
                        <div class="col p-0">
                            <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                                val="lbeta" onclick="toggleButton(event, true)" ondblclick="toFocusedInput(event)" 
                                data-toggle="tooltip" data-html="true" data-placement="top"   
                                title="${t('SCttip32')}">
                                <b>${t('SCbtnlbl32')}</b>
                            </button>
                        </div>
                        <div class="col p-0">
                            <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                            val="factorial" onclick="toggleButton(event, true)" ondblclick="toFocusedInput(event)" 
                            data-toggle="tooltip" data-html="true" data-placement="top"   
                            title="${t('SCttip33')}">
                            <b>${t('SCbtnlbl33')}</b>
                            </button>
                        </div>
                        <div class="col p-0">
                            <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                            val="pigamma" onclick="toggleButton(event, true)" ondblclick="toFocusedInput(event)" 
                            data-toggle="tooltip" data-html="true" data-placement="top"   
                            title="${t('SCttip34')}">
                            <b>${t('SCbtnlbl34')}</b>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="tab-pane tab-pane-top fade" id="{{modal.id}}_{{ms.no}}_tab4" role="tabpanel"  aria-labelledby="{{modal.id}}_{{ms.no}}_tab4">
                    <div class="row pr-15">
                        <div class="col p-0">
                                <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                                    val="toupper" onclick="toggleButton(event, true)" ondblclick="toFocusedInput(event)" 
                                    data-toggle="tooltip" data-html="true" data-placement="top"   
                                    title="${t('SCttip35')}">
                                    <b>${t('SCbtnlbl35')}</b>
                                </button>
                        </div>
                        <div class="col p-0">
                                <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                                    val="tolower" onclick="toggleButton(event, true)" ondblclick="toFocusedInput(event)" 
                                    data-toggle="tooltip" data-html="true" data-placement="top"   
                                    title="${t('SCttip36')}">
                                    <b>${t('SCbtnlbl36')}</b>
                                </button>
                        </div>
                        <div class="col p-0">
                            <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                                val="Pad" onclick="toggleButton(event, true)" ondblclick="toFocusedInput(event)" 
                                data-toggle="tooltip" data-html="true" data-placement="top"   
                                title="${t('SCttip37')}">
                                <b>${t('SCbtnlbl37')}</b>
                            </button>
                        </div>
                        <div class="col p-0">
                            <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                                val="Trim" onclick="toggleButton(event, true)" ondblclick="toFocusedInput(event)" 
                                data-toggle="tooltip" data-html="true" data-placement="top"   
                                title="${t('SCttip38')}">
                                <b>${t('SCbtnlbl38')}</b>
                            </button>
                        </div>
                        <div class="col p-0">
                            <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                                val="Length" onclick="toggleButton(event, true)" ondblclick="toFocusedInput(event)" 
                                data-toggle="tooltip" data-html="true" data-placement="top"   
                                title="${t('SCttip39')}">
                                <b>${t('SCbtnlbl39')}</b>
                            </button>
                        </div>
                        <div class="col p-0">
                            <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                                val="Count(matches)" onclick="toggleButton(event, true)" ondblclick="toFocusedInput(event)" 
                                data-toggle="tooltip" data-html="true" data-placement="top"   
                                title="${t('SCttip40')}">
                                <b>${t('SCbtnlbl40')}</b>
                            </button>
                        </div>
                    </div>
                </div>
            <div class="tab-pane tab-pane-top fade" id="{{modal.id}}_{{ms.no}}_tab5" role="tabpanel" aria-labelledby="{{modal.id}}_{{ms.no}}_tab5">
                <div class="row pr-15">
                <div class="col p-0">
                    <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                        val="Extract Substring" onclick="toggleButton(event, true)" ondblclick="toFocusedInput(event)" 
                        data-toggle="tooltip" data-html="true" data-placement="top"   
                        title="${t('SCttip41')}">
                        <b>${t('SCbtnlbl41')}</b>
                    </button>
                </div>
                <div class="col p-0">
                    <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                        val="Concatenate" onclick="toggleButton(event, true)" ondblclick="toFocusedInput(event)" 
                        data-toggle="tooltip" data-html="true" data-placement="top"   
                        title="${t('SCttip42')}">
                        <b>${t('SCbtnlbl42')}</b>
                    </button>
                </div>
                <div class="col p-0">
                    <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                        val="Replace Pattern" onclick="toggleButton(event, true)" ondblclick="toFocusedInput(event)" 
                        data-toggle="tooltip" data-html="true" data-placement="top"   
                        title="${t('SCttip43')}">
                        <b>${t('SCbtnlbl43')}</b>
                    </button>
                </div>
                <div class="col p-0">
                    <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                        val="Replace Pattern(ALL)" onclick="toggleButton(event, true)" ondblclick="toFocusedInput(event)" 
                        data-toggle="tooltip" data-html="true" data-placement="top"   
                        title="${t('SCttip44')}">
                        <b>${t('SCbtnlbl44')}</b>
                    </button>
                </div>
                <div class="col p-0">
                    <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                        val="Extract a Number" onclick="toggleButton(event, true)" ondblclick="toFocusedInput(event)" 
                        data-toggle="tooltip" data-html="true" data-placement="top"   
                        title="${t('SCttip45')}">
                        <b>${t('SCbtnlbl45')}r</b>
                    </button>
                </div>
                </div>
            </div>
            <div class="tab-pane tab-pane-top fade" id="{{modal.id}}_{{ms.no}}_tab6" role="tabpanel" aria-labelledby="{{modal.id}}_{{ms.no}}_tab6">
                <div class="row pr-15">
                <div class="col p-0">
                    <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                        val="as.numeric" onclick="toggleButton(event, true)" ondblclick="toFocusedInput(event)" 
                        data-toggle="tooltip" data-html="true" data-placement="top"   
                        title="${t('SCttip46')}">
                        <b>${t('SCbtnlbl46')}</b>
                    </button>
                </div>
                <div class="col p-0">
                    <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                        val="ToCharacter" onclick="toggleButton(event, true)" ondblclick="toFocusedInput(event)" 
                        data-toggle="tooltip" data-html="true" data-placement="top"   
                        title="${t('SCttip47')}">
                        <b>${t('SCbtnlbl47')}</b>
                    </button>
                </div>
            <div class="col p-0">
                <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                    val="ToFactor" onclick="toggleButton(event, true)" ondblclick="toFocusedInput(event)" 
                    data-toggle="tooltip" data-html="true" data-placement="top"   
                    title="${t('SCttip48')}">
                    <b>${t('SCbtnlbl48')}</b>
                </button>
                </div>
            <div class="col p-0">
                <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                    val="ToOrdered" onclick="toggleButton(event, true)" ondblclick="toFocusedInput(event)" 
                    data-toggle="tooltip" data-html="true" data-placement="top"   
                    title="${t('SCttip49')}">
                    <b>${t('SCbtnlbl49')}</b>
                </button>
                </div>
                <div class="col p-0">
                <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                    val="ToLogical" onclick="toggleButton(event, true)" ondblclick="toFocusedInput(event)" 
                    data-toggle="tooltip" data-html="true" data-placement="top"   
                    title="${t('SCttip50')}">
                    <b>${t('SCbtnlbl50')}</b>
                </button>
            </div>
                </div>
            </div>
            <div class="tab-pane tab-pane-top fade" id="{{modal.id}}_{{ms.no}}_tab7" role="tabpanel" aria-labelledby="{{modal.id}}_{{ms.no}}_tab7">
            <div class="row pr-15">
            <div class="col p-0">
                <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                    val="max" onclick="toggleButton(event, true)" ondblclick="toFocusedInput(event)" 
                    data-toggle="tooltip" data-html="true" data-placement="top"   
                    title="${t('SCttip51')}">
                    <b>${t('SCbtnlbl51')}</b>
                </button>
            </div>
            <div class="col p-0">
                <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                    val="min" onclick="toggleButton(event, true)" ondblclick="toFocusedInput(event)" 
                    data-toggle="tooltip" data-html="true" data-placement="top"   
                    title="${t('SCttip52')}">
                    <b>${t('SCbtnlbl52')}</b>
                </button>
            </div>
            <div class="col p-0">
                <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                    val="mean" onclick="toggleButton(event, true)" ondblclick="toFocusedInput(event)" 
                    data-toggle="tooltip" data-html="true" data-placement="top"   
                    title="${t('SCttip53')}">
                    <b>${t('SCbtnlbl53')}</b>
                </button>
            </div>
            <div class="col p-0">
                <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                    val="median" onclick="toggleButton(event, true)" ondblclick="toFocusedInput(event)" 
                    data-toggle="tooltip" data-html="true" data-placement="top"   
                    title="${t('SCttip54')}">
                    <b>${t('SCbtnlbl54')}</b>
                </button>
            </div>
            <div class="col p-0">
                <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                    val="sd" onclick="toggleButton(event, true)" ondblclick="toFocusedInput(event)" 
                    data-toggle="tooltip" data-html="true" data-placement="top"   
                    title="${t('SCttip55')}">
                    <b>${t('SCbtnlbl55')}</b>
                </button>
            </div>
            <div class="col p-0">
                <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                    val="sum" onclick="toggleButton(event, true)" ondblclick="toFocusedInput(event)" 
                    data-toggle="tooltip" data-html="true" data-placement="top"   
                    title="${t('SCttip56')}">
                    <b>${t('SCbtnlbl56')}</b>
                </button>
            </div>
            <div class="col p-0">
                <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                    val="variance" onclick="toggleButton(event, true)" ondblclick="toFocusedInput(event)" 
                    data-toggle="tooltip" data-html="true" data-placement="top"   
                    title="${t('SCttip57')}">
                    <b>${t('SCbtnlbl57')}</b>
                </button>
            </div>
            </div>
        </div>
        <div class="tab-pane tab-pane-top fade" id="{{modal.id}}_{{ms.no}}_tab8" role="tabpanel" aria-labelledby="{{modal.id}}_{{ms.no}}_tab8">
            <div class="row pr-15">
            <div class="col p-0">
            <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                val="runif" onclick="toggleButton(event, true)" ondblclick="toFocusedInput(event)"
                data-toggle="tooltip" data-html="true" data-placement="top"   
                title="${t('SCttip58')}">
                <b>${t('SCbtnlbl58')}</b>
            </button>
        </div>
        <div class="col p-0">
            <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                val="sample" onclick="toggleButton(event, true)" ondblclick="toFocusedInput(event)" 
                data-toggle="tooltip" data-html="true" data-placement="top"   
                title="${t('SCttip59')}">
                <b>${t('SCbtnlbl59')}</b>
            </button>
        </div>
            <div class="col p-0">
                    <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                        val="rnorm" onclick="toggleButton(event, true)" ondblclick="toFocusedInput(event)" 
                        data-toggle="tooltip" data-html="true" data-placement="top"   
                        title="${t('SCttip60')}">
                        <b>${t('SCbtnlbl60')}</b>
                    </button>
            </div>
            </div>
            </div>
            <div class="tab-pane tab-pane-top fade" id="{{modal.id}}_{{ms.no}}_tab9" role="tabpanel" aria-labelledby="{{modal.id}}_{{ms.no}}_tab9">
            <div class="row pr-15">
            <div class="col p-0">
            <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                val="Day of Week" onclick="toggleButton(event, true)" ondblclick="toFocusedInput(event)" 
                data-toggle="tooltip" data-html="true" data-placement="top"   
                title="${t('SCttip61')}">
                <b>${t('SCbtnlbl61')}</b>
            </button>
        </div>
        <div class="col p-0">
            <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                val="Day of Month" onclick="toggleButton(event, true)" ondblclick="toFocusedInput(event)" 
                data-toggle="tooltip" data-html="true" data-placement="top"   
                title="${t('SCttip62')}">
                <b>${t('SCbtnlbl62')}</b>
            </button>
        </div>
            <div class="col p-0">
                    <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                        val="Day of Year" onclick="toggleButton(event, true)" ondblclick="toFocusedInput(event)" 
                        data-toggle="tooltip" data-html="true" data-placement="top"   
                        title="${t('SCttip63')}">
                        <b>${t('SCbtnlbl63')}</b>
                    </button>
            </div>
            <div class="col p-0">
                    <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                        val="Week of Year" onclick="toggleButton(event, true)" ondblclick="toFocusedInput(event)" 
                        data-toggle="tooltip" data-html="true" data-placement="top"   
                        title="${t('SCttip64')}">
                        <b>${t('SCbtnlbl64')}</b>
                    </button>
            </div>
            <div class="col p-0">
                    <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                        val="Month" onclick="toggleButton(event, true)" ondblclick="toFocusedInput(event)" 
                        data-toggle="tooltip" data-html="true" data-placement="top"   
                        title="${t('SCttip65')}">
                        <b>${t('SCbtnlbl65')}</b>
                    </button>
            </div>
            <div class="col p-0">
                    <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                        val="Month(decimal)" onclick="toggleButton(event, true)" ondblclick="toFocusedInput(event)" 
                        data-toggle="tooltip" data-html="true" data-placement="top"   
                        title="${t('SCttip66')}">
                        <b>${t('SCbtnlbl66')}</b>
                    </button>
            </div>
            </div>
            </div>
            <div class="tab-pane tab-pane-top fade" id="{{modal.id}}_{{ms.no}}_tab10" role="tabpanel" aria-labelledby="{{modal.id}}_{{ms.no}}_tab10">
            <div class="row pr-15">
            <div class="col p-0">
            <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                val="Quarters" onclick="toggleButton(event, true)" ondblclick="toFocusedInput(event)" 
                data-toggle="tooltip" data-html="true" data-placement="top"   
                title="${t('SCttip67')}">
                <b>${t('SCbtnlbl67')}</b>
            </button>
        </div>
        <div class="col p-0">
            <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                val="Year(XXXX)" onclick="toggleButton(event, true)" ondblclick="toFocusedInput(event)" 
                data-toggle="tooltip" data-html="true" data-placement="top"   
                title="${t('SCttip68')}">
                <b>${t('SCbtnlbl68')}</b>
            </button>
        </div>
            <div class="col p-0">
                    <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                        val="Year(XX)" onclick="toggleButton(event, true)" ondblclick="toFocusedInput(event)" 
                        data-toggle="tooltip" data-html="true" data-placement="top"   
                        title="${t('SCttip69')}">
                        <b>${t('SCbtnlbl69')}</b>
                    </button>
            </div>
            <div class="col p-0">
                    <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                        val="Hour(00-12)" onclick="toggleButton(event, true)" ondblclick="toFocusedInput(event)" 
                        data-toggle="tooltip" data-html="true" data-placement="top"   
                        title="${t('SCttip70')}">
                        <b>${t('SCbtnlbl70')}</b>
                    </button>
            </div>
            <div class="col p-0">
                    <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                        val="Hour(00-23)" onclick="toggleButton(event, true)" ondblclick="toFocusedInput(event)" 
                        data-toggle="tooltip" data-html="true" data-placement="top"   
                        title="${t('SCttip71')}">
                        <b>${t('SCbtnlbl71')}</b>
                    </button>
            </div>
            <div class="col p-0">
                    <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                        val="Minutes" onclick="toggleButton(event, true)" ondblclick="toFocusedInput(event)" 
                        data-toggle="tooltip" data-html="true" data-placement="top"   
                        title="${t('SCttip72')}">
                        <b>${t('SCbtnlbl72')}</b>
                    </button>
            </div>
            <div class="col p-0">
            <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                val="Secs" onclick="toggleButton(event, true)" ondblclick="toFocusedInput(event)" 
                data-toggle="tooltip" data-html="true" data-placement="top"   
                title="${t('SCttip73')}">
                <b>${t('SCbtnlbl73')}</b>
            </button>
    </div>
            </div>
            </div>
            <div class="tab-pane tab-pane-top fade" id="{{modal.id}}_{{ms.no}}_tab11" role="tabpanel" aria-labelledby="{{modal.id}}_{{ms.no}}_tab11">
            <div class="row pr-15">
            <div class="col p-0">
            <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                val="Date from String" onclick="toggleButton(event, true)" ondblclick="toFocusedInput(event)" 
                data-toggle="tooltip" data-html="true" data-placement="top"   
                title="${t('SCttip74')}">
                <b>${t('SCbtnlbl74')}</b>
            </button>
        </div>
        <div class="col p-0">
            <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                val="Date Difference" onclick="toggleButton(event, true)" ondblclick="toFocusedInput(event)" 
                data-toggle="tooltip" data-html="true" data-placement="top"   
                title="${t('SCttip75')}">
                <b>${t('SCbtnlbl75')}</b>
            </button>
        </div>
            </div>
            </div>
            <div class="tab-pane tab-pane-top fade" id="{{modal.id}}_{{ms.no}}_tab12" role="tabpanel" aria-labelledby="{{modal.id}}_{{ms.no}}_tab12">
            <div class="row pr-15">
            <div class="col p-0">
            <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                val="Numeric to date" onclick="toggleButton(event, true)" ondblclick="toFocusedInput(event)" 
                data-toggle="tooltip" data-html="true" data-placement="top"   
                title="${t('SCttip76')}">
                <b>${t('SCbtnlbl76')}</b>
            </button>
        </div>
        <div class="col p-0">
            <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                val="String to date" onclick="toggleButton(event, true)" ondblclick="toFocusedInput(event)" 
                data-toggle="tooltip" data-html="true" data-placement="top"   
                title="${t('SCttip77')}">
                <b>${t('SCbtnlbl77')}</b>
            </button>
        </div>
            </div>
            </div>
            </div>
        </div>
    </div>
    <div id="{{modal.id}}_{{ms.no}}" {{if(options.ms.ml)}}class="ml-{{ms.ml}}"{{/if}}
         extractable=true bs-type="switchcase" no="{{ms.no}}" extractionRule="{{ms.extraction}}"
         style="overflow: auto">
        <div class="row bg-gray m-1 p-2" el_index=0>
            <div class="col-11">
                <div class="row">
                    <div class="col-2">
                        ${t('SCIFlbl')}
                    </div>
                    <div class="col-10 cm focus" bs-type="switchif"></div>
                </div>
                <div class="row">
                    <div class="col-2">
                        ${t('SCTHENlbl')}
                    </div>
                    <div class="col-10 cm" bs-type="switchthen"></div>
                </div>
            </div>
            <div class="col-1 p-1 pt-4">
                <button class='btn btn-secondary btn-top-menu p-1' onclick='removeSwitchCase("{{modal.id}}_{{ms.no}}", 0)' parentdiv=><i class="fas fa-trash"></i></button></div>
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
        this.content = Sqrl.Render(this.htmlTemplate, {modal: modal, ms: config})
        this.id = `${modal.id}_${config.no}`
        this.no = config.no
    }
    
    canExecute(refToBaseModal) {
        var outer_this = this;
        var if_elements = $(`#${this.id}`).children().find('div[bs-type="switchif"] .CodeMirror')
        var then_elements = $(`#${this.id}`).children().find('div[bs-type="switchthen"] .CodeMirror')
        var else_elements = $(`#${this.id}`).children().find('div[bs-type="switchelse"] .CodeMirror')
        var res = []
        var value = this.getVal()
        for (var i = 0 ; i < if_elements.length; i ++) {
            if (if_elements[i].CodeMirror.getValue() == "" || if_elements[i].CodeMirror == undefined )
            {
                dialog.showMessageBoxSync({type: "error", buttons: ["OK"], title: t('SCruleVoilationMsgTitle1'), message: `${t('SCruleVoilationMsg1')}: "${outer_this.label}" ${t('dstVarRuleViolationMsg2')}`})
                return false
            }
        }
        for (var i = 0 ; i < then_elements.length; i ++) {
            if (then_elements[i].CodeMirror.getValue() == "" || then_elements[i].CodeMirror == undefined )
            {
                dialog.showMessageBoxSync({type: "error", buttons: ["OK"], title: t('SCruleVoilationMsgTitle1'), message: `${t('SCruleVoilationMsg2')}: "${outer_this.label}" ${t('dstVarRuleViolationMsg2')}`})     
                return false
            }
        }
        for (var i = 0 ; i < else_elements.length; i ++) {
            if (else_elements[i].CodeMirror.getValue() == "" || else_elements[i].CodeMirror == undefined ) 
            {
                dialog.showMessageBoxSync({type: "error", buttons: ["OK"], title: t('SCruleVoilationMsgTitle1'), message: `${t('SCruleVoilationMsg3')}: "${outer_this.label}" ${t('dstVarRuleViolationMsg2')}`})     
                return false
            }
        }
        if (this.required && (value === "" || value == undefined)){
            dialog.showMessageBoxSync({type: "error", buttons: ["OK"], title: t('SCruleVoilationMsgTitle2'), message: `${t('SCruleVoilationMsg4')}: "${outer_this.label}" ${t('dstVarRuleViolationMsg2')}`})
            return false
        } else if ( ! this.required && (value === "" || value == undefined)){
            return true
        }
        return true
    }

    clearContent() {
        $(`#${this.id}`).children().remove()
        addRowToSwitchCase(this.id)
    }

    getVal() {
        // TODO: this on how to get this crap out of here
        // This is required to present results when opening a modal from a previous run
        var if_elements = $(`#${this.id}`).children().find('div[bs-type="switchif"] .CodeMirror')
        var then_elements = $(`#${this.id}`).children().find('div[bs-type="switchthen"] .CodeMirror')
        var else_elements = $(`#${this.id}`).children().find('div[bs-type="switchelse"] .CodeMirror')
         var res = []
         for (var i = 0 ; i < if_elements.length; i ++) {
             res.push({'switch': if_elements[i].CodeMirror.getValue(), 'case': then_elements[i].CodeMirror.getValue()})
         }
         if (else_elements.length > 0) {
             res.push({"else": else_elements[0].CodeMirror.getValue()})
         }
         return JSON.stringify(res)
    }
}

module.exports.element = switchCase;