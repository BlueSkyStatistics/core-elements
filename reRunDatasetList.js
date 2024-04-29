var Sqrl = require('squirrelly');

class reRunDatasetList {
    content;
    id;
    modalID;
    action;
    order = []
    htmlTemplate = `{{if (options.ms.scroll)}}<div class="sticky-left">{{/if}}
<h6>{{if (options.ms.label)}}{{ms.label}}{{#else}}Dataset list from analysis{{/if}}</h6>
<div class="form-check list-group var-list" multiple 
     id="{{modal.id}}_{{ms.no}}" type="reRunDatasetList"
     modal_id="{{modal.id}}"
     {{if (options.ms.action)}}act="{{ms.action}}"{{#else}}act="copy"{{/if}}  
     ondrop="drop(event)" ondragover="allowDrop(event)">
</div>
{{if (options.ms.scroll)}}</div>{{/if}}`

    constructor(modal, config={}) {
        this.modalID = modal.id;
        this.id = `${modal.id}_${config.no}`
        this.action = config.hasOwnProperty("action") ? config.action : "copy"
        this.content = Sqrl.Render(this.htmlTemplate, {modal: modal, ms: config});
    }

    
    fillContent()
    {
        var _action = this.action
        let outputDatasetList =[]
        let outputId =getActiveTabOutputId()
        $(`#${outputId} .outputGroup`).each((_, outGrp) => {
            outputDatasetList.push($(outGrp).attr("dataset"))
             })   
        outputDatasetList = outputDatasetList.filter((item, index) => outputDatasetList.indexOf(item) === index);   
        var item_id = this.id;
        var order = []
        outputDatasetList.forEach(element => {
            order.push(`${item_id}_${getActiveDataset()}_${element.replace(/ /g,"_")}`)
            $(`#${item_id}`).append(`<a href="#" 
            id="${item_id}_${getActiveDataset()}_${element.replace(/ /g,"_")}"
            class="list-group-item list-group-item-sm list-group-item-action measure-dataset class-dataset" 
            draggable="true" 
            bs-row-type="dataset" 
            bs-row-class="dataset" 
            bs-row-measure="dataset" 
            
            >${element}</a>`) 
            });
    }

   // ondragstart="drag(event, '${_action}')"
     //       ondrop="drop(event)"
    
    canExecute() {
        return true
    }

    clearContent() {
        var outerthis = this
        $(`#${this.id}`).children().each(function(index, element) {
                element.remove()  
        })
    }


    



}


module.exports.element = reRunDatasetList;