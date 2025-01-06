
var Sqrl = require('squirrelly');
var baseElement = require('./baseElement').baseElement;
let t = getT('menutoolbar')

class dstVariableList extends baseElement {
    content;
    id;
    max_values = -1;
    items_count = -1;
    required = false;
    label = null
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
    <div class="list-group scrollable-container ms-list" id="{{modal.id}}_{{ms.no}}"  modal_id="{{modal.id}}" no="{{ms.no}}"  {{if(options.ms.wrapped)}}  wrapped="{{ms.wrapped}}" {{/if}} bs-type="list" ondrop="drop(event)" extractable=true extractionRule="{{ms.extraction}}" filter="{{ms.filter}}" ondragover="allowDrop(event)" {{if(options.ms.wrapped)}}  wrapped="{{ms.wrapped}}" {{/if}} {{if (options.ms.allowedSrcCtrls != undefined) }} allowedSrcCtrls = "{{ms.allowedSrcCtrls}}"{{/if}}></div>
</div>
</div>`

    constructor(modal, config) {
        super(modal, config)
        this.label = config.label
        this.id = `${modal.id}_${config.no}`
        if (config.required) { this.required = config.required }
        if (config.max_values) { this.max_values = config.max_values }
        if (config.items_count) { this.items_count = config.items_count }
        if (config.hasOwnProperty("allowedSrcCtrls"))
            config.allowedSrcCtrls = JSON.stringify(config.allowedSrcCtrls)
        this.content = Sqrl.Render(this.htmlTemplate, {modal: modal, ms: config})
        
    }
    
    canExecute(refToBaseModal) {
        // let t = getT('menutoolbar')
        if (! this.required && $(`#${this.id}`).children().length === 0) {
            return true
        }
        if ((this.required && $(`#${this.id}`).children().length > 0) || ! this.required){
            if ((this.max_values > -1 && $(`#${this.id}`).children().length <= this.max_values) || this.max_values === -1) {
                if ((this.items_count > -1 && $(`#${this.id}`).children().length == this.items_count) || this.items_count === -1) {
                    return true
                } else {
                    dialog.showMessageBoxSync({type: "error", buttons: ["OK"], title: t('dstVarRuleViolationMsgTitle'), message: `${t('dstVarRuleViolationMsg1')}: "${this.label}" ${t('dstVarRuleViolationMsg3')} ${this.items_count} ${t('dstVarRuleViolationMsg4')}`})      
                    return false
                }
            }
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

module.exports.element = dstVariableList;