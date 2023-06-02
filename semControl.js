var Sqrl = require('squirrelly');
var baseElement = require('./baseElement').baseElement;

class semControl extends baseElement {
    content;
    id;
    htmlTemplate = `
    <h6>{{ms.label}} {{if(options.ms.required)}}<span class="required">*</span>{{/if}}</h6>
        <div class="ms-list2 list-group1" id = "{{modal.id}}_{{ms.no}}" count ={{ms.count}} extractable =true bs-type="sem" no="{{ms.no}}" extractionRule="{{ms.extraction}}"  suppCtrlIds ="{{ms.suppCtrl}}">
        <div class="row">
            <div class="col-1">
            </div>
            <div class="col-11" id ="{{modal.id}}_{{ms.no}}_insertionPt">
                    <button type="button" id ="{{modal.id}}_{{ms.no}}_btn" class="btn formula-btn p-1 w-25" onclick="createEndoExoVariables( modelid = &quot;{{modal.id}}&quot;, no =&quot;{{ms.no}}&quot;)">+ Add</button> 
            </div>
        </div>    
        </div>  
    `

    constructor(modal, config) {
        super(modal, config)
        this.label = config.label
        this.id = `${modal.id}_${config.no}`
        config.count =0
        //config.modal_id = modal.id
        if (config.hasOwnProperty("suppCtrlIds") )
            config.suppCtrl =JSON.stringify(config.suppCtrlIds)
        
        //this.suppCtrl = `${modal.id}_${config.suppCtrlId}`
        this.content = Sqrl.Render(this.htmlTemplate, {modal: modal, ms: config})
    }

    clearContent() {
        /* let count = 1
        let myid = this.id
        let ulist = document.getElementById(this.id + "_factorList").getElementsByTagName("UL")
        $(`#${this.id}_factorList`).find("UL").children().each(function (index, element) {
            element.remove()
        })
        $(`#${this.id}_measureList`).find("UL").children().each(function (index, element) {
            if (element.tagName != "UL")
                element.remove()
            $(`#${myid}_depVarParent_${count}`).remove()
            count = count + 1
        }) */
        ////////////////////////

        $(`#${this.id}`).find('.list-group1').each(function (index, item) {
            $(`#${item.id}`).remove()            
        })


        ////////////////////////////
       /*  if ($(`#${this.id}`).attr('bs-type') === 'sem') {
            $(`#${outer_this.objects[key].el.id}`).find('.list-group1').each(function (index, item) {
                txtCtrl =$(`#${item.id}`).find('input')
                txtVal = $(`#${item.id}`).find('input').val()
                modal_config[txtCtrl[0].id] = txtVal
            })

            modal_config[outer_this.objects[key].el.id] = $(`#${outer_this.objects[key].el.id}`).html()
         }  */




    }

    
    canExecute(refToBaseModal) {
    var outer_this = this; 
    let results = {}
    let textContents =""
    let dstVarContents =""
    let listGrp =""
    let retval =true
    let numofvars = 0
    $(`#${this.id}`).find('.list-group1').each(function (index, item) {
        textContents =$(`#${item.id}`).find('input').val()
        listGrp = $(`#${item.id}`).find('.list-group')
        numofvars =$(`#${listGrp[0].id}`).find('a').length
        if (textContents =="" )
        {
            dialog.showMessageBoxSync({type: "error", buttons: ["OK"], title: "Input field rule violation", message: `One of the names of the latent traits in the "${outer_this.label}" control are not populated.`})
            retval = false
        }
        if (numofvars ==0)
        {
            dialog.showMessageBoxSync({type: "error", buttons: ["OK"], title: "Input field rule violation", message: `No latent traits have been specifide in the "${outer_this.label}" control. Please add latent traits or delete the control.`})
            retval = false
        }

    })
    return retval
    
}
}
module.exports.element = semControl;
