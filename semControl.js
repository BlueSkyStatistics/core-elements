var Sqrl = require('squirrelly');
var baseElement = require('./baseElement').baseElement;
class semControl extends baseElement {
    content;
    id;
    htmlTemplate = `
    <h6>{{ms.label}} {{if(options.ms.required)}}<span class="required">*</span>{{/if}}</h6>
        <div class="ms-list2 list-group1" id = "{{modal.id}}_{{ms.no}}" count = {{ms.count}} extractable =true bs-type="sem" no="{{ms.no}}" extractionRule="{{ms.extraction}}"  suppCtrlIds ="{{ms.suppCtrl}}" ctrlsToDeleteFrom = "{{ms.ctrlsToDeleteFrom}}" {{if (options.ms.allowedSrcCtrls != undefined) }} allowedSrcCtrls = "{{ms.allowedSrcCtrls}}"{{/if}} >
        <div class="row">
            <div class="col-1">
            </div>
            <div class="col-11" id ="{{modal.id}}_{{ms.no}}_insertionPt">
                    <button type="button" id ="{{modal.id}}_{{ms.no}}_btn" class="btn formula-btn p-1 w-25" onclick="createEndoExoVariables( modelid = &quot;{{modal.id}}&quot;, no = &quot;{{ms.no}}&quot;, filter = &quot;{{ms.filter}}&quot;{{if(options.ms.equalityConstraints)}}, equalityConstraints = true{{#else}}, equalityConstraints = false{{/if}}, placeHolderText = &quot;{{ms.placeHolderText}}&quot;, type = &quot;{{ms.type}}&quot;)", >+ Add</button>
            </div>
        </div>    
        </div>  
    `
    constructor(modal, config) {
        super(modal, config)
        this.label = config.label
      //  this.type =config.type
        this.id = `${modal.id}_${config.no}`
        config.count = 0
        config.parameterCount = 0
        if (config.hasOwnProperty("suppCtrlIds"))
            config.suppCtrl = JSON.stringify(config.suppCtrlIds)
        if (config.hasOwnProperty("ctrlsToDeleteFrom"))
            config.ctrlsToDeleteFrom = JSON.stringify(config.ctrlsToDeleteFrom)
        if (config.hasOwnProperty("allowedSrcCtrls"))
            config.allowedSrcCtrls = JSON.stringify(config.allowedSrcCtrls)  
        this.content = Sqrl.Render(this.htmlTemplate, { modal: modal, ms: config })
    }
    clearContent() {
        $(`#${this.id}`).find('.list-group1').each(function (index, item) {
            $(`#${item.id}`).remove()
        })
    }
    canExecute(refToBaseModal) {
        var outer_this = this;
        let results = {}
        let textContents = ""
        let dstVarContents = ""
        let listGrp = ""
        let retval = true
        let numofvars = 0
        $(`#${this.id}`).find('.list-group1').each(function (index, item) {
            textContents = $(`#${item.id}`).find('input').val()
            listGrp = $(`#${item.id}`).find('.list-group')
            numofvars = $(`#${listGrp[0].id}`).find('a').length
            //You need to have atleast 2 variables for mediation
            if (this.id =="sem_mediationDestCtrl_destCtrl_1" && numofvars < 2)
            {
                dialog.showMessageBoxSync({ type: "error", buttons: ["OK"], title: "Input field rule violation", message: `You need to have 2 mediation relationships specified in the control with label "${outer_this.label}".` })
                retval = false
            }
            if (textContents == "") {
                if (outer_this.label =="Latent variables")
                {
                    dialog.showMessageBoxSync({ type: "error", buttons: ["OK"], title: "Input field rule violation", message: `One of the names of the latent traits in the "${outer_this.label}" control are not populated.` })
                } else {
                    dialog.showMessageBoxSync({ type: "error", buttons: ["OK"], title: "Input field rule violation", message: `One of the names of the higher order factors in the "${outer_this.label}" control are not populated.` })
                }
                retval = false
            }
            if (numofvars == 0) {
                if (outer_this.label =="Latent variables")
                {
                    dialog.showMessageBoxSync({ type: "error", buttons: ["OK"], title: "Input field rule violation", message: `Variables that make up the latent trait have not been specified in the "${outer_this.label}" control. Please add variables or delete the control.` })
                } else {
                    dialog.showMessageBoxSync({ type: "error", buttons: ["OK"], title: "Input field rule violation", message: `No latent traits have been specified in the "${outer_this.label}" control. Please add latent traits or delete the control.` })
                }
                retval = false
            }          
        })


     /*    if (this.type =="equalityConstraint") */
        return retval 
    }
}
module.exports.element = semControl;