/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */


var Sqrl = require('squirrelly');

class tabsComponents {
    content;
    id;
    htmlTemplate = `
    <div>
        <ul class="nav nav-pils nav-black" style="width:100%" id="{{modal.id}}_{{ms.no}}" no="{{ms.no}}" extractable=true extractionRule="{{ms.extraction}}" bs-type="tab" role="tablist">
        {{each(options.ms.tabs)}}
            <li class="nav-item">
                <a class="nav-link btn-secondary btn-top-menu {{@this.state}}" 
                id="{{modal.id}}_{{ms.no}}_{{@this.no}}_tab"
                data-toggle="tab" 
                href="#{{modal.id}}_{{ms.no}}_{{@this.no}}"
                role="tab" aria-controls="{{modal.id}}_{{ms.no}}_{{@this.no}}" 
                el-group="{{modal.id}}_{{@this.no}}"
                el-index={{@index}}
                r-value="{{@this.r_value}}"
                aria-selected="true">{{@this.label}}</a>
            </li>
        {{/each}}
        </ul>
        <div class="tab-content tab-content-black {{if (options.ms.invisible === true)}} invisible {{/if}}"  id="{{modal.id}}_{{ms.no}}_content">
            {{each(options.ms.tabs)}}
            <div class="tab-pane fade show {{@this.state}} p-2" 
                id="{{modal.id}}_{{ms.no}}_{{@this.no}}" 
                role="tabpanel" 
                aria-labelledby="{{modal.id}}_{{ms.no}}_{{@this.no}}_tab">
                {{ @this.content | safe }}
            </div>
            {{/each}}
        </div>
    </div>`;

    constructor(modal, config) {
        this.tabs = config.tabs;
        this.content = Sqrl.Render(this.htmlTemplate, {modal: modal, ms: config});
        this.id = `${modal.id}_${config.no}`;
    }

    canExecute() {
        return true
    }

    getActive(control) {
        return $(`#${this.id} li a.active`)[0].getAttribute(`${control}`)
    }
    
    clearContent() {}
}

module.exports.element = tabsComponents;