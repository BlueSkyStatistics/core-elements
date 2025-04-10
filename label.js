/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */



var Sqrl = require('squirrelly');
var baseElement = require('./baseElement').baseElement;

class labelVar extends baseElement {
    content;
    id;
    htmlTemplate = `<p id="{{modal.id}}_{{ms.no}}" no="{{ms.no}}" bs-type="label" class="h{{ms.h}} {{if(options.ms.style)}}{{ms.style}}{{/if}}">{{ms.label}}</p>`

    constructor(modal, config) {
        super(modal, config)
        this.id = `${modal.id}_${config.no}`
        this.content = Sqrl.Render(this.htmlTemplate, {modal: modal, ms: config})
    }
    
    canExecute() {
        return true
    }
    
    clearContent() {}
}

module.exports.element = labelVar;
