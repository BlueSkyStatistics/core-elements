
var Sqrl = require('squirrelly');
var baseElement = require('./baseElement').baseElement;

class semModelTermsDest extends baseElement {
    content;
    id;
    modalID;
    action;
    order = []
    htmlTemplate = `<div class="row" bs-type="semModelTermsDest">
                <div class="col col-2">
                </div>
                <div class="col col-9"><h6>{{ms.label}} {{if(options.ms.required)}}<span class="required">*</span>{{/if}}</h6>
                </div>
                <div class="col-1">
        </div>
    </div> 
    <div class="row">
        <div class="col col-2">
            <button type="button" class="btn btn-outline-secondary btn-arrows-for-modelTermsDest" id="{{modal.id}}arrow{{ms.no}}" 
            onclick="addToModelTermsDest( ctrl1 =&quot;{{modal.id}}_{{ms.firstModelTermCtrl}}&quot; , ctrl2 = &quot;{{modal.id}}_{{ms.secondModelTermCtrl}}&quot;,destId = &quot;{{modal.id}}_{{ms.no}}&quot; )">
                <i class="fas fa-arrow-right"></i>
            </button>
        </div>
        <div class="col col-9">    
            <div class="list-group ms-list" id="{{modal.id}}_{{ms.no}}" modal_id="{{modal.id}}" no="{{ms.no}}"  {{if(options.ms.wrapped)}}  wrapped="{{ms.wrapped}}" {{/if}} bs-type="list" ondrop="drop(event)" extractable=true extractionRule="{{ms.extraction}}" filter="{{ms.filter}}" ondragover="allowDrop(event)" {{if(options.ms.wrapped)}}  wrapped="{{ms.wrapped}}" {{/if}}></div>
        </div>
        <div class="col-1 col-1X">
                        <button class="btn btn-secondary btn-top-menu p-1" onclick="removeFromModelTermsDest( ctrl =&quot;{{modal.id}}_{{ms.no}}&quot; , modalId = &quot;{{modal.id}}&quot; )"  >
                            <i class ="fas fa-trash">
                            </i>
                        </button>
        </div> 
        
    </div>`

    constructor(modal, config) {
        super(modal, config)
        this.modalID = modal.id;
        this.id = `${modal.id}_${config.no}`
        this.action = config.hasOwnProperty("action") ? config.action : "copy"
        this.content = Sqrl.Render(this.htmlTemplate, {modal: modal, ms: config});
    }

  
    
    canExecute() {
        return true
    }

    clearContent() {
        $(`#${this.id}`).children().each(function(index, element) {
            element.remove()
        })
    }
}


module.exports.element = semModelTermsDest;