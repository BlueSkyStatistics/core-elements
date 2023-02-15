
var Sqrl = require('squirrelly');
var baseElement = require('./baseElement').baseElement;


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
        <h6>Multiple Condition Builder:{{if(options.ms.required)}}<span class="required">*</span>{{/if}}</h6>
            <div class="small-label">
                    Click on a button and drag and drop variables to create an expression.<br> Clicking a selected button will toggle its state.<br> To insert at a designated position, drag and drop directly to that position.<br> Mouse over a button for help.
            </div>  
        </div>    
    </div>
    <div class="row">
        <div class="col-3">
            <button class='btn btn-secondary h6 btn-submenu-text' onclick='addRowToSwitchCase("{{modal.id}}_{{ms.no}}")'><i class="fas fa-plus"></i>IF THEN</button>
        </div>
        <div class="col-3">
            <button class='btn btn-secondary h6 btn-submenu-text' onclick='addElseToSwitchCase("{{modal.id}}_{{ms.no}}")'><i class="fas fa-plus"></i>ELSE</button>
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
                                <a class="nav-link btn-secondary btn-top-menu btn-top-menu-tab active" 
                                style="-webkit-app-region: no-drag;" data-toggle="tab" 
                                href="#{{modal.id}}_{{ms.no}}_tab1" onclick="resetComputeBuilderButtons(event); return true;" aria-controls="{{modal.id}}_{{ms.no}}_tab1" 
                                aria-selected="true" role="tab">
                                Arithmetic
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link btn-secondary btn-top-menu btn-top-menu-tab" 
                                style="-webkit-app-region: no-drag;" data-toggle="tab" 
                                href="#{{modal.id}}_{{ms.no}}_tab2" onclick="resetComputeBuilderButtons(event); return true;" aria-controls="{{modal.id}}_{{ms.no}}_tab2" 
                                aria-selected="true" role="tab">
                                Logical
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link btn-secondary btn-top-menu btn-top-menu-tab" 
                                style="-webkit-app-region: no-drag;" data-toggle="tab" 
                                href="#{{modal.id}}_{{ms.no}}_tab3" onclick="resetComputeBuilderButtons(event); return true;" aria-controls="{{modal.id}}_{{ms.no}}_tab3" 
                                aria-selected="true" role="tab">
                                Math
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link btn-secondary btn-top-menu btn-top-menu-tab" 
                                style="-webkit-app-region: no-drag;" data-toggle="tab" 
                                href="#{{modal.id}}_{{ms.no}}_tab4" onclick="resetComputeBuilderButtons(event); return true;" aria-controls="{{modal.id}}_{{ms.no}}_tab4" 
                                aria-selected="true" role="tab">
                                String(1)
                                </a>
                            </li>

                            
                            <li class="nav-item">
                                <a class="nav-link btn-secondary btn-top-menu btn-top-menu-tab" 
                                style="-webkit-app-region: no-drag;" data-toggle="tab" 
                                href="#{{modal.id}}_{{ms.no}}_tab5" onclick="resetComputeBuilderButtons(event); return true;" aria-controls="{{modal.id}}_{{ms.no}}_tab5" 
                                aria-selected="true" role="tab">
                                String(2)
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link btn-secondary btn-top-menu btn-top-menu-tab" 
                                style="-webkit-app-region: no-drag;" data-toggle="tab" 
                                href="#{{modal.id}}_{{ms.no}}_tab6" onclick="resetComputeBuilderButtons(event); return true;" aria-controls="{{modal.id}}_{{ms.no}}_tab6" 
                                aria-selected="true" role="tab">
                                Conversion
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link btn-secondary btn-top-menu btn-top-menu-tab" 
                                style="-webkit-app-region: no-drag;" data-toggle="tab" 
                                href="#{{modal.id}}_{{ms.no}}_tab7" onclick="resetComputeBuilderButtons(event); return true;" aria-controls="{{modal.id}}_{{ms.no}}_tab7" 
                                aria-selected="true" role="tab">
                                Statistical
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link btn-secondary btn-top-menu btn-top-menu-tab" 
                                style="-webkit-app-region: no-drag;" data-toggle="tab" 
                                href="#{{modal.id}}_{{ms.no}}_tab8" onclick="resetComputeBuilderButtons(event); return true;" aria-controls="{{modal.id}}_{{ms.no}}_tab8" 
                                aria-selected="true" role="tab">
                                Random Numbers
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link btn-secondary btn-top-menu btn-top-menu-tab" 
                                style="-webkit-app-region: no-drag;" data-toggle="tab" 
                                href="#{{modal.id}}_{{ms.no}}_tab9" onclick="resetComputeBuilderButtons(event); return true;" aria-controls="{{modal.id}}_{{ms.no}}_tab9" 
                                aria-selected="true" role="tab">
                                Date(1)
                                </a>
                            </li>
                                <li class="nav-item">
                                <a class="nav-link btn-secondary btn-top-menu btn-top-menu-tab" 
                                style="-webkit-app-region: no-drag;" data-toggle="tab" 
                                href="#{{modal.id}}_{{ms.no}}_tab10" onclick="resetComputeBuilderButtons(event); return true;" aria-controls="{{modal.id}}_{{ms.no}}_tab10" 
                                aria-selected="true" role="tab">
                                Date(2)
                                </a>
                                </li>
                                </li>
                                <li class="nav-item">
                                <a class="nav-link btn-secondary btn-top-menu btn-top-menu-tab" 
                                style="-webkit-app-region: no-drag;" data-toggle="tab" 
                                href="#{{modal.id}}_{{ms.no}}_tab11" onclick="resetComputeBuilderButtons(event); return true;" aria-controls="{{modal.id}}_{{ms.no}}_tab11" 
                                aria-selected="true" role="tab">
                                Date(3)
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link btn-secondary btn-top-menu btn-top-menu-tab" 
                                style="-webkit-app-region: no-drag;" data-toggle="tab" 
                                href="#{{modal.id}}_{{ms.no}}_tab12" onclick="resetComputeBuilderButtons(event); return true;" aria-controls="{{modal.id}}_{{ms.no}}_tab12" 
                                aria-selected="true" role="tab">
                                Date(4)
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
                                title="Click the + symbol then move the variables you want 
                                to separate with +. To insert just + , double click it">
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                        <div class="col p-0">
                            <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                                val="-" onclick="toggleButton(event, true)" ondblclick="toFocusedInput(event)"
                                data-toggle="tooltip" data-html="true" data-placement="top"   
                                title="Click the - symbol then move the variables you want 
                                to separate with -. To insert just -, double click it">
                                <i class="fas fa-minus"></i>
                            </button>
                        </div>
                        <div class="col p-0">
                            <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                            val="*" onclick="toggleButton(event, true)" ondblclick="toFocusedInput(event)"
                            data-toggle="tooltip" data-html="true" data-placement="top"   
                            title="Click the * symbol then move the variables you want 
                            to separate with *. To insert just *, double click it">
                                <i class="fas fa-asterisk"></i>
                            </button>
                        </div>
                        <div class="col p-0">
                            <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                            val="/" onclick="toggleButton(event, true)"  ondblclick="toFocusedInput(event)"
                            data-toggle="tooltip" data-html="true" data-placement="top"   
                            title="Click the / symbol then move the variables you want to separate 
                            with /. To insert just  /, double click it">
                                /
                            </button>
                        </div>
                        <div class="col p-0">
                            <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                                val="^" onclick="toggleButton(event, true)"  ondblclick="toFocusedInput(event)"
                                data-toggle="tooltip" data-html="true" data-placement="top"   
                                title="Click ^ and move variables to exponentiate, to insert generic code double click">
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
                                title="Click SQRT and move variables to calculate a square root, to insert generic code double click">
                                sqrt
                            </button>
                        </div>
                        <div class="col p-0">
                            <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                                val="log" onclick="toggleButton(event, true)" ondblclick="toFocusedInput(event)"
                                data-toggle="tooltip" data-html="true" data-placement="top"   
                                title="Click LOG and move variables to compute a natural logarithm, to insert generic code double click">
                                log
                            </button>
                        </div>
                        <div class="col p-0">
                            <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                            val="log10" onclick="toggleButton(event, true)" ondblclick="toFocusedInput(event)"
                            data-toggle="tooltip" data-html="true" data-placement="top"   
                            title="Click LOG10 and move variables to calculate a log base 10, to insert generic code double click">
                                log10
                            </button>
                        </div>
                        <div class="col p-0">
                            <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                            val="log2" onclick="toggleButton(event, true)"  ondblclick="toFocusedInput(event)"
                            data-toggle="tooltip" data-html="true" data-placement="top"   
                            title="Click LOG2 and move variables to calculate a log base 2, to insert generic code double click">
                                log2
                            </button>
                        </div>
                    </div>
                    <div class="row pr-15">
                        <div class="col p-0">
                            <button type="button" class="btn btn-outline-secondary 
                                formula-btn w-100 m-0" val="%%" 
                                onclick="toggleButton(event, true)" ondblclick="toFocusedInput(event)"
                                data-toggle="tooltip" data-html="true" data-placement="top"   
                                title="Click MOD and move variables variables to divide and compute the reminder, to insert generic code double click">
                                mod
                            </button>
                        </div>
                        <div class="col p-0">
                            <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                                val="abs" onclick="toggleButton(event, true)" ondblclick="toFocusedInput(event)"
                                data-toggle="tooltip" data-html="true" data-placement="top"   
                                title="Click abs and move variables to compute an absolute value, to insert generic code double click">
                                abs
                            </button>
                        </div>
                        <div class="col p-0">
                            <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                            val="exp" onclick="toggleButton(event, true)" ondblclick="toFocusedInput(event)"
                            data-toggle="tooltip" data-html="true" data-placement="top"   
                            title="Click exp and move variables to compute an exponential, to insert generic code double click">
                                exp
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
                                title="Click to insert the > symbol">
                                <b>&gt;</b>
                            </button>
                        </div>
                        <div class="col p-0">
                            <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                                val="<" onclick="toFocusedInput(event)"  
                                data-toggle="tooltip" data-html="true" data-placement="top"   
                                title="Click to insert the < symbol">
                                <b>&lt;</b>
                            </button>
                        </div>
                        <div class="col p-0">
                            <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                                val=">=" onclick="toFocusedInput(event)"  
                                data-toggle="tooltip" data-html="true" data-placement="top"   
                                title="Click to insert the >= symbol">
                                <b>&gt;=</b>
                            </button>
                        </div>
                        <div class="col p-0">
                            <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                                val="<=" onclick="toFocusedInput(event)"  
                                data-toggle="tooltip" data-html="true" data-placement="top"   
                                title="Click to insert the <= symbol">
                                <b>&lt;=</b>
                            </button>
                        </div>
                        <div class="col p-0">
                            <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                                val="==" onclick="toFocusedInput(event)"  
                                data-toggle="tooltip" data-html="true" data-placement="top"   
                                title="Click to insert the == symbol (test of equality)">
                                <b>==</b>
                            </button>
                        </div>
                        <div class="col p-0">
                            <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                                val="!=" onclick="toFocusedInput(event)"  
                                data-toggle="tooltip" data-html="true" data-placement="top"   
                                title="Click to insert the !- (not equal) symbol">
                                <b>!=</b>
                            </button>
                        </div>
                    </div>
                    <div class="row pr-15">
                        <div class="col p-0">
                            <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                                val="|" onclick="toFocusedInput(event)"  
                                data-toggle="tooltip" data-html="true" data-placement="top"   
                                title="Click to insert the | (logical or) symbol">
                                <b>|</b>
                            </button>
                        </div>
                        <div class="col p-0">
                            <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                                val="&" onclick="toFocusedInput(event)"  
                                data-toggle="tooltip" data-html="true" data-placement="top"   
                                title="Click to insert the & (logical and) symbol">
                                <b>&amp;</b>
                            </button>
                        </div>
                        <div class="col p-0">
                            <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                                val="%/%" onclick="toFocusedInput(event)"  
                                data-toggle="tooltip" data-html="true" data-placement="top"   
                                title="Click to insert the integer division (%/%) symbol">
                                <b>%/%</b>
                            </button>
                        </div>
                        <div class="col p-0">
                            <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                            val="isTRUE" onclick="toggleButton(event, true)" ondblclick="toFocusedInput(event)"
                            data-toggle="tooltip" data-html="true" data-placement="top"   
                            title="Click isTRUE to select and move the variable to check for TRUE values. Returns TRUE/FALSE,to insert generic code double click">
                                isTRUE
                            </button>
                        </div>
                        <div class="col p-0">
                            <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                            val="is.na" onclick="toggleButton(event, true)" ondblclick="toFocusedInput(event)"
                            data-toggle="tooltip" data-html="true" data-placement="top"   
                            title="Click is.na to select and move the variable to check for NA values. Returns TRUE/FALSE, to insert generic code double click">
                                is.na
                            </button>
                        </div>
                        <div class="col p-0">
                            <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" val="%in%" 
                            onclick="toFocusedInput(event)"
                                data-toggle="tooltip" data-html="true" data-placement="top"   
                                title="Click %in% to insert it. %in% is used to check whether a variable contains values e.g. var1 %in% c(1,2)">
                                %in%
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
                                title="Click round and move variables to round, to insert generic code double click">
                                <b>round</b>
                            </button>
                        </div>
                        <div class="col p-0">
                            <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                                val="ceiling" onclick="toggleButton(event, true)" ondblclick="toFocusedInput(event)" 
                                data-toggle="tooltip" data-html="true" data-placement="top"   
                                title="Click ceiling and move variables to compute the ceiling for, to insert generic code double click">
                                <b>ceiling</b>
                            </button>
                        </div>
                        <div class="col p-0">
                            <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                                val="floor" onclick="toggleButton(event, true)" ondblclick="toFocusedInput(event)" 
                                data-toggle="tooltip" data-html="true" data-placement="top"   
                                title="Click floor and move variables to compute the floor for, to insert generic code double click">
                                <b>floor</b>
                            </button>
                        </div>
                        <div class="col p-0">
                            <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                                val="signif" onclick="toggleButton(event, true)" ondblclick="toFocusedInput(event)" 
                                data-toggle="tooltip" data-html="true" data-placement="top"   
                                title="Click signif and move variables to round to specified number of significant digits, to insert generic code double click">
                                <b>signif</b>
                            </button>
                        </div>
                        <div class="col p-0">
                            <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                                val="gamma" onclick="toggleButton(event, true)" ondblclick="toFocusedInput(event)" 
                                data-toggle="tooltip" data-html="true" data-placement="top"   
                                title="Click gamma and move variables to compute a gamma function, to insert generic code double click">
                                <b>gamma</b>
                            </button>
                        </div>
                        <div class="col p-0">
                            <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                                val="lgamma" onclick="toggleButton(event, true)" ondblclick="toFocusedInput(event)" 
                                data-toggle="tooltip" data-html="true" data-placement="top"   
                                title="Click lgamma and move variables to compute a lgamma function, to insert generic code double click">
                                <b>lgamma</b>
                            </button>
                        </div>
                        <div class="col p-0">
                            <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                                val="beta" onclick="toggleButton(event, true)" ondblclick="toFocusedInput(event)" 
                                data-toggle="tooltip" data-html="true" data-placement="top"   
                                title="Click beta and move variables to compute a beta function, to insert generic code double click">
                                <b>beta</b>
                            </button>
                        </div>
                        <div class="col p-0">
                            <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                                val="lbeta" onclick="toggleButton(event, true)" ondblclick="toFocusedInput(event)" 
                                data-toggle="tooltip" data-html="true" data-placement="top"   
                                title="Click lbeta and move variables to compute a lbeta function, to insert generic code double click">
                                <b>lbeta</b>
                            </button>
                        </div>
                        <div class="col p-0">
                            <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                            val="factorial" onclick="toggleButton(event, true)" ondblclick="toFocusedInput(event)" 
                            data-toggle="tooltip" data-html="true" data-placement="top"   
                            title="Click factorial and move variables to compute factorials, to insert generic code double click">
                            <b>factorial</b>
                            </button>
                        </div>
                        <div class="col p-0">
                            <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                            val="pigamma" onclick="toggleButton(event, true)" ondblclick="toFocusedInput(event)" 
                            data-toggle="tooltip" data-html="true" data-placement="top"   
                            title="Click pigamma and move variables to compute a pigamma function, to insert generic code double click">
                            <b>pigamma</b>
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
                                    title="Click toupper and move variables to convert to uppercase, to insert generic code double click">
                                    <b>toupper</b>
                                </button>
                        </div>
                        <div class="col p-0">
                                <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                                    val="tolower" onclick="toggleButton(event, true)" ondblclick="toFocusedInput(event)" 
                                    data-toggle="tooltip" data-html="true" data-placement="top"   
                                    title="Click tolower and move variables to convert to lowercase, to insert generic code double click">
                                    <b>tolower</b>
                                </button>
                        </div>
                        <div class="col p-0">
                            <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                                val="Pad" onclick="toggleButton(event, true)" ondblclick="toFocusedInput(event)" 
                                data-toggle="tooltip" data-html="true" data-placement="top"   
                                title="Click Pad and move variables to Pad with a character, to insert generic code double click">
                                <b>Pad</b>
                            </button>
                        </div>
                        <div class="col p-0">
                            <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                                val="Trim" onclick="toggleButton(event, true)" ondblclick="toFocusedInput(event)" 
                                data-toggle="tooltip" data-html="true" data-placement="top"   
                                title="Click Trim and move variables to remove white space from the left, right or both ends, to insert generic code double click">
                                <b>Trim</b>
                            </button>
                        </div>
                        <div class="col p-0">
                            <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                                val="Length" onclick="toggleButton(event, true)" ondblclick="toFocusedInput(event)" 
                                data-toggle="tooltip" data-html="true" data-placement="top"   
                                title="Click Length and move variables to return the number of characters in the string, to insert generic code double click">
                                <b>Length</b>
                            </button>
                        </div>
                        <div class="col p-0">
                            <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                                val="Count(matches)" onclick="toggleButton(event, true)" ondblclick="toFocusedInput(event)" 
                                data-toggle="tooltip" data-html="true" data-placement="top"   
                                title="Click Count(matches) and move variables to count matches of a pattern/sub-string, to insert generic code double click">
                                <b>Count(matches)</b>
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
                        title="Click Extract Substring and move variables to extract a sub-string (replace starting and ending position by integers), to insert generic code double click">
                        <b>Extract Substring</b>
                    </button>
                </div>
                <div class="col p-0">
                    <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                        val="Concatenate" onclick="toggleButton(event, true)" ondblclick="toFocusedInput(event)" 
                        data-toggle="tooltip" data-html="true" data-placement="top"   
                        title="Click Concatenate and move variables to Concatenate with an optional separator, to insert generic code double click">
                        <b>Concatenate</b>
                    </button>
                </div>
                <div class="col p-0">
                    <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                        val="Replace Pattern" onclick="toggleButton(event, true)" ondblclick="toFocusedInput(event)" 
                        data-toggle="tooltip" data-html="true" data-placement="top"   
                        title="Click Replace Pattern and move variables to replace a pattern, to insert generic code double click">
                        <b>Replace Pattern</b>
                    </button>
                </div>
                <div class="col p-0">
                    <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                        val="Replace Pattern(ALL)" onclick="toggleButton(event, true)" ondblclick="toFocusedInput(event)" 
                        data-toggle="tooltip" data-html="true" data-placement="top"   
                        title="Click Replace Pattern(ALL) and move variables to replace all patterns, to insert generic code double click">
                        <b>Replace Pattern(ALL)</b>
                    </button>
                </div>
                <div class="col p-0">
                    <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                        val="Extract a Number" onclick="toggleButton(event, true)" ondblclick="toFocusedInput(event)" 
                        data-toggle="tooltip" data-html="true" data-placement="top"   
                        title="Click Extract a Number and move variables to extract a number from, to insert generic code double click">
                        <b>Extract a Number</b>
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
                        title="Click ToNumeric and move variables to to convert to numeric, to insert generic code double click">
                        <b>ToNumeric</b>
                    </button>
                </div>
                <div class="col p-0">
                    <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                        val="ToCharacter" onclick="toggleButton(event, true)" ondblclick="toFocusedInput(event)" 
                        data-toggle="tooltip" data-html="true" data-placement="top"   
                        title="Click ToCharacter and move variables to convert to a character, to insert generic code double click">
                        <b>ToCharacter</b>
                    </button>
                </div>
            <div class="col p-0">
                <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                    val="ToFactor" onclick="toggleButton(event, true)" ondblclick="toFocusedInput(event)" 
                    data-toggle="tooltip" data-html="true" data-placement="top"   
                    title="Click ToFactor and move variables to convert to a factor, to insert generic code double click">
                    <b>ToFactor</b>
                </button>
                </div>
            <div class="col p-0">
                <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                    val="ToOrdered" onclick="toggleButton(event, true)" ondblclick="toFocusedInput(event)" 
                    data-toggle="tooltip" data-html="true" data-placement="top"   
                    title="Click ToOrdered and move variables to convert to an ordered factor, to insert generic code double click">
                    <b>ToOrdered</b>
                </button>
                </div>
                <div class="col p-0">
                <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                    val="ToLogical" onclick="toggleButton(event, true)" ondblclick="toFocusedInput(event)" 
                    data-toggle="tooltip" data-html="true" data-placement="top"   
                    title="Click ToLogical and move variables to convert to a logical, to insert generic code double click">
                    <b>ToLogical</b>
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
                    title="Click MAX and move variables to compute the maximum value, to insert generic code double click">
                    <b>MAX</b>
                </button>
            </div>
            <div class="col p-0">
                <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                    val="min" onclick="toggleButton(event, true)" ondblclick="toFocusedInput(event)" 
                    data-toggle="tooltip" data-html="true" data-placement="top"   
                    title="Click MIN and move variables to compute the minimum value, to insert generic code double click">
                    <b>MIN</b>
                </button>
            </div>
            <div class="col p-0">
                <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                    val="mean" onclick="toggleButton(event, true)" ondblclick="toFocusedInput(event)" 
                    data-toggle="tooltip" data-html="true" data-placement="top"   
                    title="Click MEAN and move variables to compute the mean value, to insert generic code double click">
                    <b>MEAN</b>
                </button>
            </div>
            <div class="col p-0">
                <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                    val="median" onclick="toggleButton(event, true)" ondblclick="toFocusedInput(event)" 
                    data-toggle="tooltip" data-html="true" data-placement="top"   
                    title="Click MEDIAN and move variables to compute the median value, to insert generic code double click">
                    <b>MEDIAN</b>
                </button>
            </div>
            <div class="col p-0">
                <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                    val="sd" onclick="toggleButton(event, true)" ondblclick="toFocusedInput(event)" 
                    data-toggle="tooltip" data-html="true" data-placement="top"   
                    title="Click SD and move variables to compute the standard deviation, to insert generic code double click">
                    <b>SD</b>
                </button>
            </div>
            <div class="col p-0">
                <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                    val="sum" onclick="toggleButton(event, true)" ondblclick="toFocusedInput(event)" 
                    data-toggle="tooltip" data-html="true" data-placement="top"   
                    title="Click SUM and move variables to compute the sum, to insert generic code double click">
                    <b>SUM</b>
                </button>
            </div>
            <div class="col p-0">
                <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                    val="variance" onclick="toggleButton(event, true)" ondblclick="toFocusedInput(event)" 
                    data-toggle="tooltip" data-html="true" data-placement="top"   
                    title="Click VARIANCE and move variables to compute the variance, to insert generic code double click">
                    <b>VARIANCE</b>
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
                title="Double Click RUNIF and random numbers will be generated from a uniform distribution with min and max">
                <b>runif</b>
            </button>
        </div>
        <div class="col p-0">
            <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                val="sample" onclick="toggleButton(event, true)" ondblclick="toFocusedInput(event)" 
                data-toggle="tooltip" data-html="true" data-placement="top"   
                title="Click SAMPLE and move variables to generate random samples with/without replacement, to insert generic code double click">
                <b>sample</b>
            </button>
        </div>
            <div class="col p-0">
                    <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                        val="rnorm" onclick="toggleButton(event, true)" ondblclick="toFocusedInput(event)" 
                        data-toggle="tooltip" data-html="true" data-placement="top"   
                        title="Double click rnorm to generate variables from a normal distribution with a specified mean and standard deviation">
                        <b>rnorm</b>
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
                title="Click Day of Week and move a date variable that you want to extract the day of the week(Monday..) from, to insert generic code double click">
                <b>Day of Week</b>
            </button>
        </div>
        <div class="col p-0">
            <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                val="Day of Month" onclick="toggleButton(event, true)" ondblclick="toFocusedInput(event)" 
                data-toggle="tooltip" data-html="true" data-placement="top"   
                title="Click Day of Month and move a date variable that you want to extract the day of the month(1-31) from, to insert generic code double click">
                <b>Day of Month</b>
            </button>
        </div>
            <div class="col p-0">
                    <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                        val="Day of Year" onclick="toggleButton(event, true)" ondblclick="toFocusedInput(event)" 
                        data-toggle="tooltip" data-html="true" data-placement="top"   
                        title="Click Day of Year and move a date variable that you want to extract the day of year(001-366) from, to insert generic code double click">
                        <b>Day of Year</b>
                    </button>
            </div>
            <div class="col p-0">
                    <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                        val="Week of Year" onclick="toggleButton(event, true)" ondblclick="toFocusedInput(event)" 
                        data-toggle="tooltip" data-html="true" data-placement="top"   
                        title="Click Week of Year and move a date variable that you want to extract the week of year(00-53) from, to insert generic code double click">
                        <b>Week of Year</b>
                    </button>
            </div>
            <div class="col p-0">
                    <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                        val="Month" onclick="toggleButton(event, true)" ondblclick="toFocusedInput(event)" 
                        data-toggle="tooltip" data-html="true" data-placement="top"   
                        title="Click Month and move a date variable that you want to extract the Month(January..) from, to insert generic code double click">
                        <b>Month</b>
                    </button>
            </div>
            <div class="col p-0">
                    <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                        val="Month(decimal)" onclick="toggleButton(event, true)" ondblclick="toFocusedInput(event)" 
                        data-toggle="tooltip" data-html="true" data-placement="top"   
                        title="Click Month(decimal) and move a date variable that you want to extract the Month(01-12) from, to insert generic code double click">
                        <b>Month(decimal)</b>
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
                title="Click Quarters and move a date variable that you want to extract the Quarters(Q1, Q2..) from, to insert generic code double click">
                <b>Quarters</b>
            </button>
        </div>
        <div class="col p-0">
            <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                val="Year(XXXX)" onclick="toggleButton(event, true)" ondblclick="toFocusedInput(event)" 
                data-toggle="tooltip" data-html="true" data-placement="top"   
                title="Click Year(XXXX) and move a date variable that you want to extract the Year(1980) from, to insert generic code double click">
                <b>Year(XXXX)</b>
            </button>
        </div>
            <div class="col p-0">
                    <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                        val="Year(XX)" onclick="toggleButton(event, true)" ondblclick="toFocusedInput(event)" 
                        data-toggle="tooltip" data-html="true" data-placement="top"   
                        title="Click Year(XX) and move a date variable that you want to extract the Year(80) from, to insert generic code double click">
                        <b>Year(XX)</b>
                    </button>
            </div>
            <div class="col p-0">
                    <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                        val="Hour(00-12)" onclick="toggleButton(event, true)" ondblclick="toFocusedInput(event)" 
                        data-toggle="tooltip" data-html="true" data-placement="top"   
                        title="Click Hour(00-12) and move a date variable that you want to extract the Hour(00) from, to insert generic code double click">
                        <b>Hour(00-12)</b>
                    </button>
            </div>
            <div class="col p-0">
                    <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                        val="Hour(00-23)" onclick="toggleButton(event, true)" ondblclick="toFocusedInput(event)" 
                        data-toggle="tooltip" data-html="true" data-placement="top"   
                        title="Click Hour(00-23) and move a date variable that you want to extract the Hour from, to insert generic code double click">
                        <b>Hour(00-23)</b>
                    </button>
            </div>
            <div class="col p-0">
                    <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                        val="Minutes" onclick="toggleButton(event, true)" ondblclick="toFocusedInput(event)" 
                        data-toggle="tooltip" data-html="true" data-placement="top"   
                        title="Click Minutes and move a date variable that you want to extract the minutes from, to insert generic code double click">
                        <b>Minutes</b>
                    </button>
            </div>
            <div class="col p-0">
            <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                val="Secs" onclick="toggleButton(event, true)" ondblclick="toFocusedInput(event)" 
                data-toggle="tooltip" data-html="true" data-placement="top"   
                title="Click Secs and move a date variable that you want to extract the seconds from, to insert generic code double click">
                <b>Secs</b>
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
                title="Click Date from String and move a string variable that you want to convert to date, to insert generic code double click">
                <b>Date from String</b>
            </button>
        </div>
        <div class="col p-0">
            <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                val="Date Difference" onclick="toggleButton(event, true)" ondblclick="toFocusedInput(event)" 
                data-toggle="tooltip" data-html="true" data-placement="top"   
                title="Click Date Difference and move a date variable that you want to subtract from another date variable, to insert generic code double click">
                <b>Date Difference</b>
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
                title="Click Numeric to date and move a numeric variable that you want to convert to date, to insert generic code double click">
                <b>Numeric to date</b>
            </button>
        </div>
        <div class="col p-0">
            <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                val="String to date" onclick="toggleButton(event, true)" ondblclick="toFocusedInput(event)" 
                data-toggle="tooltip" data-html="true" data-placement="top"   
                title="Click String to date and move a string variable that you want to convert to date, to insert generic code double click">
                <b>String to date</b>
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
                        IF
                    </div>
                    <div class="col-10 cm focus" bs-type="switchif"></div>
                </div>
                <div class="row">
                    <div class="col-2">
                        THEN
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
        for (var i = 0 ; i < if_elements.length; i ++) {
            if (if_elements[i].CodeMirror.getValue() == "" || if_elements[i].CodeMirror == undefined )
            {
                dialog.showMessageBoxSync({type: "error", buttons: ["OK"], title: "Input rule violation", message: `An if condition within the control with label: "${outer_this.label}" needs to be populated to proceed`})
                return false
            }
        }
        for (var i = 0 ; i < then_elements.length; i ++) {
            if (then_elements[i].CodeMirror.getValue() == "" || then_elements[i].CodeMirror == undefined )
            {
                dialog.showMessageBoxSync({type: "error", buttons: ["OK"], title: "Input rule violation", message: `A then condition within the control with label: "${outer_this.label}" needs to be populated to proceed`})     
                return false
            }
        }
        for (var i = 0 ; i < else_elements.length; i ++) {
            if (else_elements[i].CodeMirror.getValue() == "" || else_elements[i].CodeMirror == undefined ) 
            {
                dialog.showMessageBoxSync({type: "error", buttons: ["OK"], title: "Input rule violation", message: `An else condition within the control with label: "${outer_this.label}" needs to be populated to proceed`})     
                return false
            }
        }
        if (this.required && (this.getVal() === "" || this.getVal() == undefined)){
            dialog.showMessageBoxSync({type: "error", buttons: ["OK"], title: "Conditional input rule violation", message: `Conditional input with label: "${outer_this.label}" needs to be populated to proceed`})
            return false
        } else if ( ! this.required && (this.getVal() === "" || this.getVal() == undefined)){
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