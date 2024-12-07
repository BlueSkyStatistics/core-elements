
var Sqrl = require('squirrelly');
var baseElement = require('./baseElement').baseElement;
let t = getT('menutoolbar')

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
            onclick="addToModelTermsDest( ctrl1 =&quot;{{modal.id}}_{{ms.firstModelTermCtrl}}&quot; , ctrl2 = &quot;{{modal.id}}_{{ms.secondModelTermCtrl}}&quot;,destId = &quot;{{modal.id}}_{{ms.no}}&quot;)">
                <i class="fas fa-arrow-right"></i>
            </button>
        </div>
        <div class="col col-9">    
            <div class="list-group ms-list" id="{{modal.id}}_{{ms.no}}" modal_id="{{modal.id}}" no="{{ms.no}}"  {{if(options.ms.wrapped)}}  wrapped="{{ms.wrapped}}" {{/if}} bs-type="list" ondrop="drop(event)" extractable=true extractionRule="{{ms.extraction}}" filter="{{ms.filter}}" ondragover="allowDrop(event)" {{if(options.ms.wrapped)}}  wrapped="{{ms.wrapped}}" {{/if}} {{if(options.ms.suppCtrlAddIds != undefined)}} suppCtrlAddIds = {{ms.suppCtrlAddIds}}{{/if}}{{if(options.ms.suppCtrlDeleteIds != undefined)}} suppCtrlDeleteIds = {{ms.suppCtrlDeleteIds}}{{/if}}></div>
        </div>
        <div class="col-1 col-1X">
            <button class="btn btn-secondary btn-top-menu p-1" onclick="removeFromModelTermsDest( ctrl =&quot;{{modal.id}}_{{ms.no}}&quot; , modalId = &quot;{{modal.id}}&quot;)">
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
        if (config.hasOwnProperty("suppCtrlAddIds"))
            config.suppCtrlAddIds = JSON.stringify(config.suppCtrlAddIds)
        if (config.hasOwnProperty("suppCtrlDeleteIds"))
            config.suppCtrlDeleteIds = JSON.stringify(config.suppCtrlDeleteIds)
        this.content = Sqrl.Render(this.htmlTemplate, {modal: modal, ms: config});
    }

  
    
    canExecute() {
        let transModelTerm = ""
        let duplicateRelationShips = []       
        if (this.id == "sem_modelTermsDst")
        {
            let modelTerms = common.getMultiVal(this.id)
            let coVarTerms = common.getMultiVal("sem_coVarDst")
            if (modelTerms.length != 0 && coVarTerms.length != 0)
            {                
                modelTerms.forEach(function(element, index) {                   
                    transModelTerm = element.replace("->", "<->")
                    if (coVarTerms.indexOf(transModelTerm ) != -1)
                    {
                        duplicateRelationShips.push(transModelTerm)
                    }
                })
            }
        }
        if (duplicateRelationShips.length > 0)
        {
            let newArray = duplicateRelationShips.map(element => element.replace("<->", " & "));
            let newArrayToString = "[" + newArray.join(", ") +"]"
            dialog.showMessageBoxSync({ type: "error", buttons: ["OK"], title: t('semModTermRulVoiTitle'), message: `${t('semModTermRulVoiMsg1')} ${newArrayToString} ${t('semModTermRulVoiMsg2')}` })
            return false
        }
        return true
    }

    clearContent() {
        $(`#${this.id}`).children().each(function(index, element) {
            element.remove()
        })
        //Removing the deletedCoVars attribute so that when a new sem dialog is launched the prir attributes don't get copied
        if (this.id == "sem_coVarDst" && $("#" + "sem_coVarDst").attr('deletedCoVars') != undefined)
               $(`#${this.id}`).removeAttr("deletedCoVars")
        if (this.id == "sem_coVarDst" && $("#" + "sem_coVarDst").attr('manAddedCovar') != undefined)
               $(`#${this.id}`).removeAttr("manAddedCovar")
    }
}


module.exports.element = semModelTermsDest;