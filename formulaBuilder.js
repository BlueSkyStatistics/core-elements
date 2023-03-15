var Sqrl = require('squirrelly');
var baseElement = require('./baseElement').baseElement;

class formulaControl extends baseElement {
    content;
    id;
    required = false;
    htmlTemplate = `
        <div class="formula-builder">
        <div class="row">
            <div class="col col-xx"></div>
            <div class="col col-rr mb-2">
            <h6>{{if(options.ms.label !=undefined)}}{{ms.label}}{{#else}}Formula Builder:{{/if}}{{if(options.ms.required)}}<span class="required">*</span>{{/if}}</h6>
            <div class="small-label">
                    Click on a button below and drag and drop variables to create an expression.<br> Clicking a selected button will toggle its state.<br> To insert at a position, place the cursor in that position and drag & drop/move variable(s).<br> Mouse over a button for help.<br> You cannot toggle the All N way button.
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
                    title="Click the + button then move the variables you want 
                    to separate with +. To insert just + , double click it">
                    <i class="fas fa-plus"></i>
                </button>
                </div>
                <div class="col p-0">
                    <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                        val="-" onclick="toggleButton(event, true)" ondblclick="toFormula(event)"
                        data-toggle="tooltip" data-html="true" data-placement="top"   
                        title="Click the - button then move the variables you want 
                        to separate with -. To insert just -, double click it">
                        <i class="fas fa-minus"></i>
                    </button>
                </div>
                <div class="col p-0">
                    <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0{{if(options.ms.default=="asterix" )}}activated{{/if}}" 
                    val="*" onclick="toggleButton(event, true)" ondblclick="toFormula(event)"
                    data-toggle="tooltip" data-html="true" data-placement="top"   
                    title="Click the * button then move the variables you want 
                    to separate with *. To insert just *, double click it">
                        <i class="fas fa-asterisk"></i>
                    </button>
                </div>
                <div class="col p-0">
                    <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
                    val="/" onclick="toggleButton(event, true)"  ondblclick="toFormula(event)"
                    data-toggle="tooltip" data-html="true" data-placement="top"   
                    title="Click the / button then move the variables you want to separate 
                    with /. To insert just /, double click it">
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
                        title="Click the ( button to insert it">
                        (
                    </button>
                </div>
                <div class="col p-0">
                    <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" val=")" 
                        onclick="toFormula(event)"
                        data-toggle="tooltip" data-html="true" data-placement="top"   
                        title="Click the ) button to insert it">
                        )
                    </button>
                </div>
                <div class="col p-0">
					<button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" 
						val="%in%" onclick="toFormula(event)"
						data-toggle="tooltip" data-html="true" data-placement="top"   
						title="Click on the %in% button to insert %in%">
						%in%
					</button>
                </div>
                <div class="col p-0">
					<button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" val="|" 
						onclick="toFormula(event)"
						data-toggle="tooltip" data-html="true" data-placement="top"   
						title="Click the | button to insert it">
						|
					</button>
                </div>
                <div class="col p-0">
                    <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" val=":" 
                            onclick="toggleButton(event, true)" ondblclick="toFormula(event)"
                            data-toggle="tooltip" data-html="true" data-placement="top"   
                        title="Click the : button then move the variables you 
                        want to separate with :. To insert just : , 
                        double click it">
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
                        title="Click the All N-way option and then move the variables to create N-way interactions. To deactivate click another button.">                        <option value="2">All 2 ways</option>
                        <option value="3">All 3 ways</option>
                        <option value="4">All 4 ways</option>
                        <option value="5">All 5 ways</option>
                        <option value="6">All 6 way</option>
                        <option value="7">All 7 ways</option>
                        <option value="8">All 8 ways</option>
                        <option value="9">All 9 ways</option>
                        <option value="10">All 10 ways</option>
                    </select>
                </div>
                <div class="col p-0">
                <div class="formula-btn pl-1 m-0" val="^" onclick="toggleSelectPoly(event,&quot;{{modal.id}}_{{ms.no}}_polyTerms&quot; )">
                    Polynomial terms
                    <input class="w-25 formula-select formula-options" type="number" id="{{modal.id}}_{{ms.no}}_polyTerms" 
                        bs-type="text" min="0" max="10000" step="1"  default="2" value="2" 
                        onclick="toggleButton(event, true)" onchange="toggleSelect(event)"
                        data-toggle="tooltip" data-html="true" data-placement="top"   
                        title="Select a number, click the button and move the variables to add degree N polynomial terms">
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
                    df for splines
                    <input class="w-25 formula-select formula-options" type="number" id="{{modal.id}}_{{ms.no}}_splinesDeg" 
                    bs-type="text" min="0" max="10000" step="1"  default="5" value="5" 
                    data-toggle="tooltip" data-html="true" data-placement="top"   
                    title="Specify a degree of freedom for splines">
                </div>
            </div>
            <div class="col p-0">
                    <div class="formula-btn pl-1 m-0" val="Polynomial degree">
                    Polynomial degree
                    <input class="w-25 formula-select formula-options" type="number" id="{{modal.id}}_{{ms.no}}_polyDeg" 
                    bs-type="text" min="0" max="10000" step="1"  default="5" value="5" 
                    data-toggle="tooltip" data-html="true" data-placement="top"   
                    title="Specify a polynomial degree">
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
                        title="Click B-spline then move one or more variables. To insert generic code, double click">
                        <b>B-spline</b>
                    </button>
                </div>
                <div class="col p-0">
                    <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" val="natural spline" 
                        onclick="toggleButton(event, true)" ondblclick="toFormula(event)"
                        data-toggle="tooltip" data-html="true" data-placement="top"   
                        title="Click natural spline then move one or more variables. To insert generic code, double click">
                        <b>Natural spline</b>
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
                        title="Click the orthogonal polynomial button then move one or more variables. To insert generic code, double click">
                        <b>Orthogonal polynomial</b>
                    </button>
                </div>
                <div class="col p-0">
                    <button type="button" class="btn btn-outline-secondary formula-btn w-100 m-0" val="Raw polynomial" 
                    onclick="toggleButton(event, true)" ondblclick="toFormula(event)"
                        data-toggle="tooltip" data-html="true" data-placement="top"   
                        title="Click raw polynomial button then move one or more variables. To insert generic code, double click">
                        <b>Raw polynomial</b>
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
            dialog.showMessageBoxSync({type: "error", buttons: ["OK"], title: "Input rule violation", message: `The control with label: Formula Builder needs to be populated to proceed`})     
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