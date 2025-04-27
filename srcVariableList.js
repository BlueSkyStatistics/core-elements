/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */


var Sqrl = require('squirrelly');
const {getT} = global.requireFromRoot("localization");
// const i18next = require("i18next");
let t = getT('menutoolbar')

class srcVariableList {
    content;
    id;
    modalID;
    action;
    order = []
    htmlTemplate = `{{if (options.ms.scroll)}}<div class="sticky-left">{{/if}}
<h6>{{if (options.ms.label)}}{{ms.label}}{{#else}}Source variables{{/if}}</h6>
<div class="form-check list-group scrollable-container {{if (options.ms.semMain)}}var-listSem{{#else}}var-list{{/if}}" multiple 
     {{if (options.ms.no == undefined)}}id="{{modal.id}}Vars"{{#else}}id="{{modal.id}}{{ms.no}}Vars"{{/if}}
     modal_id="{{modal.id}}"
     {{if (options.ms.action)}}act="{{ms.action}}"{{#else}}act="copy"{{/if}}  
     bs-type="cols" ondrop="drop(event)" ondragover="allowDrop(event)">
     <div class="curtain"  {{if (options.ms.no == undefined)}}id="{{modal.id}}VarsCurtain"{{#else}}id="{{modal.id}}{{ms.no}}VarsCurtain"{{/if}} bs-type="curtain">
        <div class="fa fa-spinner fa-spin"></div>
        </div>
    </div>

{{if (options.ms.scroll)}}</div>{{/if}}`

    constructor(modal, config={}) {
        this.modalID = modal.id;
        if (config.no == undefined )
            this.id = `${modal.id}Vars`
        else
            this.id = `${modal.id}${config.no}Vars`
        this.action = config.hasOwnProperty("action") ? config.action : "copy"
        if (config.hasOwnProperty("allowedDstCtrls"))
            config.allowedDstCtrls = JSON.stringify(config.allowedDstCtrls)
        config.label = t('Source_variables')//, {ns: 'menutoolbar'})//, {ns: 'translation'}); //"bal bla Source variables"
        this.content = Sqrl.Render(this.htmlTemplate, {modal: modal, ms: config});
    }

    fillContent() {
    //The code below calculates the width of all the variables in a dataset
    //This is necessary so that the horizontal scroll bar is displayed
    //so that a user can see the variable names if they don't fit the width of the 
    //fixed source variable lists
    //We create a span to measure the width of each dataset variable
    //Setting the minwidth so that the horizontal scroll bar displays
    //If minwidth is not set the variable name is not visible as it is truncated
    const tempSpan = document.querySelector('#BSkyTempSpanCalVarWidth.hidden-span');
    let textWidth =0
    
    let srcVarElement = document.getElementById(this.id);
    let maxWidth =srcVarElement.clientWidth
    let flagMaxWidthChange = false
    var item_name =""  
    var dataset = getActiveDataset();
    var data = store.get(dataset); 
    data.cols.forEach(element =>    {
        item_name = element.Name[0];
        tempSpan.textContent = item_name
        textWidth = tempSpan.offsetWidth; // Measure the rendered text width
        if (textWidth > maxWidth) {
            maxWidth = textWidth;
            flagMaxWidthChange = true
        }
        
    })

        var _action = this.action
        if ($(`#${this.modalID}`).find("[bs-type=cols]").length !== 0) {
            $(`#${this.modalID}`).find("[bs-type=cols]").each(
                function(index, element) {
                    var item_id = element.id
                    if (data !== undefined) 
                    {
                        var order = []      
                        if (element.getAttribute('type') =="semModelTerms")
                        {
                            // the filter function prevents selected items from modelTermsDst (structural parameters) from being moved
                            //Every item in modeltermsdst has a class termsDst
                            //selectModelTerms ensures at the class active gets added to selected items in the structural parameters and coVarsDst in production mode
                            data.cols.forEach(element => {
                                var item_name = element.Name[0];
                                order.push(`${item_id}_${getActiveDataset()}_${item_name.replace(/ /g,"_")}`)
                                $(`#${item_id}`).append(`<a href="#" 
                                id="${item_id}_${getActiveDataset()}_${item_name.replace(/ /g,"_")}"
                                class="list-group-item list-group-item-sm termsDst list-group-item-action measure-${element.Measure[0]} class-${element.ColClass[0]}" 
                                draggable="true" 
                                bs-row-type="${element.Type[0]}" 
                                bs-row-class="${element.ColClass[0]}" 
                                bs-row-measure="${element.Measure[0]}" 
                                onclick="selectModelTerms(event)"
                                >${item_name}</a>`) 
                            });
                            $(`#${item_id}`).attr('order', order.join("|||"))  
                        }
                        else
                        {
                            //sem.js has 2 srcvariablelists, we want to make sure the 2nd is not populated as the
                            //first source variable list  populates all objects with cols
                            if ($("#"+item_id).find(".a").length ==0)
                            {
                                //Setting the minwidth so that the horizontal scroll bar displays
                                //If minwidth is not set the variable name is not visible as it is truncated
                                if ( flagMaxWidthChange)
                                {
                                    data.cols.forEach(element =>    {
                                        item_name = element.Name[0];
                                        order.push(`${item_id}_${getActiveDataset()}_${item_name.replace(/ /g,"_")}`)
                                        $(`#${item_id}`).append(`<a href="#" 
                                        id="${item_id}_${getActiveDataset()}_${item_name.replace(/ /g,"_")}"
                                        class="list-group-item list-group-item-sm list-group-item-action measure-${element.Measure[0]} class-${element.ColClass[0]}" 
                                        draggable="true" 
                                        bs-row-type="${element.Type[0]}" 
                                        bs-row-class="${element.ColClass[0]}" 
                                        bs-row-measure="${element.Measure[0]}" 
                                        style="min-width: ${maxWidth}px"; 
                                        ondragstart="drag(event, '${_action}')"
                                        ondrop="drop(event)"
                                        onclick="selectElement(event)">${item_name}</a>`) 
                                    })
                                    $('#' + item_id).attr('maxVarWidth', maxWidth.toString()+"px" );
                                } else 
                                {
                                    data.cols.forEach(element =>    {
                                        item_name = element.Name[0];
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
                                    })
                                }                  
                                $(`#${item_id}`).attr('order', order.join("|||"))
                                $(`#${item_id}Curtain`).hide()
                                
                            }
                        }
                    } 
                    else {
                        throw (`${dataset} is empty`)
                    }

                   // scrollContainer.scrollLeft = 0;
                }
            )
        }
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


module.exports.element = srcVariableList;