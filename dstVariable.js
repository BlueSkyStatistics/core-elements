

var Sqrl = require('squirrelly');
var baseElement = require('./baseElement').baseElement;
let t = getT('menutoolbar')

class dstVariable extends baseElement{
    content;
    id;
    required = false;
    label = null;
    htmlTemplate = `<div class="row">
    <div class="col col-xx"></div>
        <div class="col col-rr"><h6>{{ms.label}} {{if(options.ms.required)}}<span class="required">*</span>{{/if}}</h6></div>
    </div>
    <div class="row">
        <div class="col col-xx">
            <button type="button" class="btn btn-outline-secondary btn-arrows" id="{{modal.id}}arrow{{ms.no}}">
                <i class="fas fa-arrow-right"></i>
            </button>
        </div>
        <div class="col col-rr">    
            <div class="list-group scrollable-container sg-list" id="{{modal.id}}_{{ms.no}}" modal_id="{{modal.id}}" no="{{ms.no}}" bs-type="single" ondrop="drop(event)" extractable=true extractionRule="{{ms.extraction}}" filter="{{ms.filter}}" ondragover="allowDrop(event)" {{if(options.ms.wrapped)}}  wrapped="{{ms.wrapped}}" {{/if}} {{if (options.ms.onselect_r) }}onselect_r={{ms.onselect_r | safe}} {{/if}} {{if (options.ms.allowedSrcCtrls != undefined) }} allowedSrcCtrls = "{{ms.allowedSrcCtrls}}"{{/if}}></div>
        </div>   
    </div>` 

    constructor(modal, config) {
        super(modal, config)
        this.label = config.label
        if (config.hasOwnProperty("onselect_r"))
        {
            config.onselect_r = JSON.stringify(config.onselect_r) 
        } else {
            config.onselect_r =""
        }
        if (config.hasOwnProperty("allowedSrcCtrls"))
            config.allowedSrcCtrls = JSON.stringify(config.allowedSrcCtrls)
        this.content = Sqrl.Render(this.htmlTemplate, {modal: modal, ms: config})
        if (config.required) {
            this.required = config.required
        }
        this.id = `${modal.id}_${config.no}`
     }

    canExecute(refToBaseModal) {
        if ((this.required && $(`#${this.id}`).children().length === 1) || ! this.required) {
            return true
        }
        dialog.showMessageBoxSync({type: "error", buttons: ["OK"], title: t('dstVarRuleViolationMsgTitle'), message: `${t('dstVarRuleViolationMsg1')}: "${this.label}" ${t('dstVarRuleViolationMsg2')}`})                
        return false
    }

    clearContent() {
        $(`#${this.id}`).children().each(function(index, element) {
            element.remove()
        })
    }

}

module.exports.element = dstVariable;