
var Sqrl = require('squirrelly');

class semSuppCtrl {
    content;
    id;
    modalID;
    action;
    order = []
    htmlTemplate = `{{if (options.ms.scroll)}}<div class="sticky-left">{{/if}}
<h6>{{if (options.ms.label)}}{{ms.label}}{{#else}}Source variables{{/if}}</h6>
<div class="form-check list-group var-list" multiple 
    id="{{modal.id}}{{ms.no}}"  no="{{ms.no}}" modal_id="{{modal.id}}" count ="{{ms.count}}"
     {{if (options.ms.action)}}act="{{ms.action}}"{{#else}}act="copy"{{/if}}  
     bs-type="semSuppCtrl" ondrop="drop(event)" ondragover="allowDrop(event)">
</div>
{{if (options.ms.scroll)}}</div>{{/if}}`

    constructor(modal, config={}) {
        this.modalID = modal.id;
        this.id = `${modal.id}${config.no}`
        this.action = config.hasOwnProperty("action") ? config.action : "copy"
        this.content = Sqrl.Render(this.htmlTemplate, {modal: modal, ms: config});
    }

    fillContent() {
        var _action = this.action
        if ($(`#${this.modalID}`).find("[bs-type=cols]").length !== 0) {
            $(`#${this.modalID}`).find("[bs-type=cols]").each(
                function(index, element) {
                    var dataset = getActiveDataset();
                    var item_id = element.id
                    var data = store.get(dataset);
                    if (data !== undefined) {
                        var order = []
                        data.cols.forEach(element => {
                            var item_name = element.Name[0];
                            order.push(`${item_id}_${getActiveDataset()}_${item_name.replace(/ /g,"_")}`)
                            $(`#${item_id}`).append(`<a href="#" 
                            id="${item_id}_${getActiveDataset()}_${item_name.replace(/ /g,"_")}"
                            class="list-group-item list-group-item-sm list-group-item-action measure-${element.Measure[0]} class-${element.ColClass[0]}" 
                            draggable="true" 
                            bs-row-type="${element.Type[0]}" 
                            bs-row-class="${element.ColClass[0]}" 
                            bs-row-measure="${element.Measure[0]}" 
                            ondragstart="drag(event, '${_action}')"
                            ondrop="drop(event)"
                            onclick="selectElement(event)">${item_name}</a>`) 
                        });
                        $(`#${item_id}`).attr('order', order.join("|||"))
                    } else {
                        throw (`${dataset} is empty`)
                    }
                }
            )
        }
        $(`#${this.id}Curtain`).hide()
    }
    
    canExecute() {
        return true
    }

    clearContent() {
        var outerthis = this
        $(`#${this.id}`).children().each(function(index, element) {
            if (element.id != `${outerthis.id}Curtain`) {
                element.remove()
            }
        })
        $(`#${this.id}Curtain`).show()
    }
}


module.exports.element = semSuppCtrl;