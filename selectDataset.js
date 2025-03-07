/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */

var Sqrl = require('squirrelly');
const {getT} = require("../../../../localization");
var baseElement = require('./baseElement').baseElement;
let t = getT('menutoolbar')
class selectDataset extends baseElement {
    content;
    id;
    required = false;
    defaults;
    label = null
    htmlTemplate = `<div>
    <h6 id="{{modal.id}}_{{ms.no}}src">{{if (options.ms.label)}}{{ms.label}}{{#else}}Source variables{{/if}}</h6>
    <div class="form-check list-group var-list" multiple
     id="{{modal.id}}_{{ms.no}}actVars"
     modal_id="{{modal.id}}"
     {{if (options.ms.action)}}act="{{ms.action}}"{{#else}}act="copy"{{/if}}  
     bs-type="cols" ondrop="drop(event)" ondragover="allowDrop(event)">
    </div>
    <div class="simple-select">
        <label id="{{modal.id}}_{{ms.no}}label" class="mt-2 mr-2 small-label {{if(options.ms.style)}}{{ms.style}}{{/if}}">{{ms.label}} {{if(options.ms.required)}}<span class="required">*</span>{{/if}}</label>
        <select class="form-select mb-3 w-100" bs-type="select" id="{{modal.id}}_{{ms.no}}" no="{{ms.no}}" extractable=true default="{{ms.default}}" extractionRule="{{ms.extraction}}">
            {{ each(options.ms.options) }}
                <option {{ if (options.ms.hasOwnProperty("default") && options.ms.default == @this)}} selected="selected"{{/if}}>{{@this}}</option>
            {{/each}}
        </select>
        <script>
            $(\`#{{modal.id}}_{{ms.no}}\`).on('change', function(){
                populateVariablesOfDataset('{{modal.id}}_{{ms.no}}selVars','{{modal.id}}_{{ms.no}}tar', $(this).find(':selected').text(), "selected")
            })
        </script>
    </div>
    <h6 id="{{modal.id}}_{{ms.no}}tar">{{if (options.ms.label)}}{{ms.label}}{{#else}}Source variables{{/if}}</h6>
    <div class="form-check list-group var-list" multiple
     id="{{modal.id}}_{{ms.no}}selVars"
     modal_id="{{modal.id}}"
     {{if (options.ms.action)}}act="{{ms.action}}"{{#else}}act="copy"{{/if}}  
     bs-type="cols" ondrop="drop(event)" ondragover="allowDrop(event)">
    </div>
    </div>
`
    constructor(modal, config) {
        super(modal, config);
        this.label = config.label
        this.id = `${modal.id}_${config.no}`
        if (config.required) {
            this.required = config.required
        }
        this.defaults = config.hasOwnProperty("default") ? config.default : ""
        config.onselect_r = config.hasOwnProperty("onselect_r") ? JSON.stringify(config.onselect_r) : ""
        this.content = Sqrl.Render(this.htmlTemplate, {
            modal: modal,
            ms: config
        })
    }
    clearContent() {
        //Note, we intentionally don't remove the contents of the select control that lists the dataset we are joining with
        $(`#${this.id}actVars`).children().each(function (index, element) {
            element.remove()
        })
        $(`#${this.id}selVars`).children().each(function (index, element) {
            element.remove()
        })
    }
    canExecute(refToBaseModal) {
        if (this.required && this.getVal().length > 0) {
            return true
        } else if (!this.required) {
            return true
        }
        dialog.showMessageBoxSync({ type: "error", buttons: ["OK"], title: t('mergejoinRulVoiTitle1'), message: `${t('selectRulVoiMsg1')}: "${this.label}"` })
        return false
    }
    fillContent() {
        let activedataset = ""
        let selecteddataset = ""
        let prevSelected = ""
        activedataset = getActiveDataset()
        var datasets = getAllDatasets();
        var noOfdatasets = document.getElementById(this.id).length
        document.getElementById(this.id.concat("label")).innerHTML
            = t('SelDSsrclbl5') + activedataset + t('SelDSsrclbl6');
        //Find and save the selected dataset from history or a prior run of the dialog
        if ($(`#${this.id}`).attr("selectedValues" ) != undefined)
        {
            prevSelected  =$(`#${this.id}`).attr("selectedValues" )
            $(`#${this.id}`).removeAttr("selectedValues" )
        }
       
        if (!datasets.includes(prevSelected))
        {
            prevSelected = ""
        }
        //Remove all the previously selected datasets associated with the dialog
        //This may be from a previous launch of the mergedatasetsnew dialog
        //This may be from the history from a mergedatasetsnew dialog launched from history
        if (noOfdatasets > 0) {
            for (i = 0; i < noOfdatasets; i++) {
                document.getElementById(this.id).remove(0);
            }
        }
        //Remove the active dataset from the datasets you are joining by
        datasets = datasets.filter(function (value, index, arr) {
            return value != activedataset;
        });
        //Add back all the active datasets
        datasets.forEach((element, index) => {
            var option = document.createElement("option");
            option.text = element;
            document.getElementById(this.id).add(option);
            if (prevSelected == element) {
                $($(`#${this.id} option`)[index]).prop('selected', true)
            }
        })
        //If the previously selected dataset is available for joining, lets select it
        //However if the previously selected dataset is the active dataset, lets set the  selected dataset to the 1st dataset in the list
        if (prevSelected == "" || (prevSelected == activedataset)) {
            if (datasets[0] != "") prevSelected = datasets[0]
        }
        document.getElementById(this.id.concat("src")).innerText = "Variables from the active (left) dataset "+ activedataset;
        document.getElementById(this.id.concat("tar")).innerText = "Variables from the selected (right) dataset " + prevSelected;
        //Populate the variable list with the currect dataset
        if (datasets.length > 0) {
            populateVariablesOfDataset(this.id.concat("selVars"), this.id.concat("tar"), prevSelected, t('SelDSsrclbl3'))
        }
        populateVariablesOfDataset(this.id.concat("actVars"), this.id.concat("src"), activedataset, t('SelDSsrclbl2'))
    }
}
module.exports.element = selectDataset;