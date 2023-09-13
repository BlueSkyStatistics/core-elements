var Sqrl = require('squirrelly');

class semModelTerms {
    content;
    id;
    modalID;
    action;
    order = []
    htmlTemplate = `{{if (options.ms.scroll)}}<div class="sticky-left">{{/if}}
<h6>{{if (options.ms.label)}}{{ms.label}}{{#else}}Source variables{{/if}}</h6>
<div class="form-check list-group {{if (options.ms.semMain)}}var-listSem{{#else}}var-list{{/if}}" multiple 
     id="{{modal.id}}_{{ms.no}}" type="semModelTerms"
     modal_id="{{modal.id}}"
     {{if (options.ms.action)}}act="{{ms.action}}"{{#else}}act="copy"{{/if}}  
     bs-type="cols" ondrop="drop(event)" ondragover="allowDrop(event)">
</div>
{{if (options.ms.scroll)}}</div>{{/if}}`

    constructor(modal, config={}) {
        this.modalID = modal.id;
        this.id = `${modal.id}${config.no}`
        this.action = config.hasOwnProperty("action") ? config.action : "copy"
        this.content = Sqrl.Render(this.htmlTemplate, {modal: modal, ms: config});
    }

    
    
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


module.exports.element = semModelTerms;