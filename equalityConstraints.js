/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */


var Sqrl = require('squirrelly');

class equalityConstraints {
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
     bs-type="equalityConstraints" ondrop="drop(event)" ondragover="allowDrop(event)">
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
            if (element.id != `${outerthis.id}Curtain`) {
                element.remove()
            }
        })
        $(`#${this.id}Curtain`).show()
    }
}


module.exports.element = equalityConstraints;