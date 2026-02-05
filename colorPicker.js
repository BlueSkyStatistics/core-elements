/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */

var Sqrl = require('squirrelly');
const {getT} = global.requireFromRoot("localization");
var baseElement = require('./baseElement').baseElement;
let t = getT('menutoolbar')

class colorPicker extends baseElement {
    content;
    id;
    value = null;
    required = false;
    type_expected = null;
    overwrite = null;
    allow_spaces=false;
    label = null
    htmlTemplate = `<div class="{{if(options.ms.style)}}{{ms.style}}{{/if}} {{if(options.ms.ml)}}ml-{{ms.ml}}{{/if}}">
    <div class="row">
        <div class="col-12">
            <label for="{{modal.id}}_{{ms.no}}" class="mt-2 mr-2 small-label">{{ms.label}} {{if(options.ms.required)}}<span class="required">*</span>{{/if}}</label>
        </div>
    </div>
    <div class="row">
        <div class="col-12">
            <input class="w-20" type="color" bs-type="{{if(options.ms.type)}}{{ms.type}}{{#else}}text{{/if}}" rel="txtTooltip" title=${t('colpickerttip1')} data-toggle="tooltip" data-placement="bottom"
                   id="{{modal.id}}_{{ms.no}}" 
                   {{if(options.ms.placeholder)}} placeholder="{{ms.placeholder}}" {{/if}}
                   no="{{ms.no}}" extractable=true extractionRule="{{ms.extraction}}" 
                   {{if(options.ms.wrapped)}} wrapped="{{ms.wrapped}}" {{/if}} 
                   {{if(options.ms.value !== undefined)}} default="{{ms.value}}" value="{{ms.value}}" {{#else}} default="" {{/if}}
                   {{if(options.ms.filter)}} filter="{{ms.filter}}" {{/if}} ondrop="dropToInput(event)">
        </div>
    </div>
    </div>`

    constructor(modal, config) {
        super(modal, config);
        this.label = config.label
        if (config.value !== undefined) {
            this.value = config.value;
        }
        if (config.type) {
            this.type_expected = config.type;
        }
        if (config.required) {
            this.required = config.required;
        }
        if (config.overwrite) {
            this.overwrite = config.overwrite;
        }
        if (config.allow_spaces ) {
            this.allow_spaces = config.allow_spaces;
        }
        this.content = Sqrl.Render(this.htmlTemplate, {modal: modal, ms: config})
        this.id = `${modal.id}_${config.no}`
    }

    clearContent() {
        if (this.value !== null) {
            $(`#${this.id}`).val(this.value)
        } else {
            $(`#${this.id}`).val("")
        }
        
    }
}

module.exports.element = colorPicker;