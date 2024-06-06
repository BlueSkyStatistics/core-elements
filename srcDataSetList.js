

var Sqrl = require('squirrelly');


class srcDatasetList {
    content;
    id;
    modalID;
    action;
    order = []
    htmlTemplate = `<h6>{{if (options.ms.label)}}{{ms.label}}{{#else}}Source Datasets{{/if}}</h6>
<div class="form-check list-group var-list" multiple 
{{if (options.ms.no == undefined)}}id="{{modal.id}}Datasts"{{#else}}id="{{modal.id}}_{{ms.no}}"{{/if}}
     modal_id="{{modal.id}}"
     {{if (options.ms.action)}}act="{{ms.action}}"{{#else}}act="copy"{{/if}}  
     bs-type="dss" ondrop="drop(event)" ondragover="allowDrop(event)">
</div>`

    constructor(modal, config={}) {
        this.modalID = modal.id;

        if (config.no == undefined )
            this.id = `${modal.id}Datasets`
        else
            this.id = `${modal.id}_${config.no}`


        //this.id = `${modal.id}Datasets`
        this.action = config.hasOwnProperty("action") ? config.action : "copy"
        this.content = Sqrl.Render(this.htmlTemplate, {modal: modal, ms: config});
    }

    fillContent() {
        var _action = this.action
        
        if ($(`#${this.modalID}`).find("[bs-type=dss]").length !== 0) {
            $(`#${this.modalID}`).find("[bs-type=dss]").each(
                function(_, element) {
                    var datasets = getAllDatasets();
                    var item_id = element.id;
                    var order = []
                    datasets.forEach(element => {
                        order.push(`${item_id}_${getActiveDataset()}_${element.replace(/ /g,"_")}`)
                        $(`#${item_id}`).append(`<a href="#" 
                        id="${item_id}_${getActiveDataset()}_${element.replace(/ /g,"_")}"
                        class="list-group-item list-group-item-sm list-group-item-action measure-dataset class-dataset" 
                        draggable="true" 
                        bs-row-type="dataset" 
                        bs-row-class="dataset" 
                        bs-row-measure="dataset" 
                        ondragstart="drag(event, '${_action}')"
                        ondrop="drop(event)"
                        onclick="selectElement(event)">${element}</a>`) 
                    });
                    $(`#${item_id}`).attr('order', order.join("|||"))
                }
            )
        }
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


module.exports.element = srcDatasetList;