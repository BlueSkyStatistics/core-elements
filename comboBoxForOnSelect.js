/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */



var Sqrl = require('squirrelly');
var baseElement = require('./baseElement').baseElement;
let t = getT('menutoolbar')

class comboBoxForOnSelect extends baseElement{
    content;
    id;
    dynamicallyPopulated = false;
    required = false;
    defaults;
    label = null
   /*  htmlTemplate = `<div>
        <label for="{{modal.id}}_{{ms.no}}" class="mt-2 mr-2 small-label {{if(options.ms.style)}}{{ms.style}}{{/if}}">{{ms.label}} {{if(options.ms.required)}}<span class="required">*</span>{{/if}}</label>
        <div class="list-group ms-list {{if(options.ms.style)}}{{ms.style}}{{/if}}">
            <select class="list-group borderless" bs-type="combobox" {{ if (options.ms.multiple) }} multiple {{/if}} {{ if (options.ms.dynamicallyPopulated) }} dynamicallyPopulated=true {{/if}} id="{{modal.id}}_{{ms.no}}" no="{{ms.no}}" extractable=true default="{{ms.default}}" extractionRule="{{ms.extraction}}">
                {{ each(options.ms.options) }}
                <option {{ if (options.ms.hasOwnProperty("default") && options.ms.default.split("|").includes(@this))}}selected="selected"{{/if}}>{{@this}}</option> 
                {{/each}}
            </select>
                {{ if (options.ms.onselect_r != "" ) }}
                <script>
                    $(\`#{{modal.id}}_{{ms.no}}\`).on('change', function(){
                        r_on_select('{{modal.id}}', {{ms.onselect_r | safe}}, $(this).val())
                    })
                </script>
                {{/if}}
        </div>
    </div>
    ` */

     htmlTemplate = `<div class="ms-combobox">
  <label for="{{modal.id}}_{{ms.no}}" class="mt-2 mr-2 small-label {{if(options.ms.style)}}{{ms.style}}{{/if}}">
    {{ms.label}} {{if(options.ms.required)}}<span class="required">*</span>{{/if}}
  </label>
  <div class="ms-list {{if(options.ms.style)}}{{ms.style}}{{/if}}">
    <select
      class="form-select mb-3 {{if(options.ms.width)}}{{ms.width}}{{#else}}w-100{{/if}}"
      bs-type="comboboxOnSelect"
      {{ if (options.ms.multiple) }} multiple {{/if}}
      id="{{modal.id}}_{{ms.no}}"
      modal_id ="{{modal.id}}"
      no="{{ms.no}}"
      extractable="true"
      default="{{ms.default}}"
      extractionRule="{{ms.extraction}}"
      {{if (options.ms.onselect_r !="")}}onselect_r = "{{ms.onselect_r | safe}}"{{/if}}
    >
      {{ each(options.ms.options) }}
        <option {{ if (options.ms.hasOwnProperty("default") && options.ms.default == @this)}}selected="selected"{{/if}}>
          {{@this}}
        </option>
      {{/each}}
    </select>
  </div>
</div>`  
    constructor(modal, config) {
        super(modal, config)
        this.label = config.label
        // if (config.dynamicallyPopulated) {
        //     this.dynamicallyPopulated =config.dynamicallyPopulated
        // }
        this.dynamicallyPopulated = false
        if (config.required) {
            this.required = config.required
        }
        this.defaults = config.hasOwnProperty("default") ? config.default.split("|") : []
        config.onselect_r = config.hasOwnProperty("onselect_r") ? encodeURIComponent(JSON.stringify(config.onselect_r)) : ""
        this.content = Sqrl.Render(this.htmlTemplate, {modal: modal, ms: config})
        this.id = `${modal.id}_${config.no}`
        this.modal_id =`${modal.id}`
    }

    clearContent() {
        var outer_this = this;
        // console.log(`#${this.id} - Dynamic populated:`,this.dynamicallyPopulated)
        if ($(`#${this.id}`).attr('dynamicallyPopulated') || this.dynamicallyPopulated)
        {
          
          const $select = $(`#${this.id}`);
          $select.prev('ul.list-group').remove();   // the one listgroup.js created
          $select.removeData('listgroup');     
          /*  
          $(`#${this.id}`).attr("dynamicallyPopulated", "true")
            this.dynamicallyPopulated = true
           // $(`#${this.id}`).empty()
           //clearComboChild(this.id)
           $(`#${this.id}`).children().each(function (index, element) {
            element.remove()
          })
          if ($(`#${this.id}`).siblings('.list-group').length != 0) {
            $(`#${this.id}`).siblings('.list-group').remove()
          } */



        }
        else {
        /* $(`#${this.id}`).find('option').each(function(index, item){
            if (outer_this.defaults.includes(item.value)){
                $(`#${outer_this.id}`)?.siblings("ul")?.find("a")[index]?.classList.add("active") ;
                item.setAttribute("selected", "selected")
            } else {
                item.removeAttribute('selected');
                if ($(`#${outer_this.id}`).siblings("ul").find("a")[index] != undefined){
                    $(`#${outer_this.id}`).siblings("ul").find("a")[index].classList.remove("active") ;
                }
            }
        }) */

                const $select = $(`#${this.id}`);
                $select.prev('ul.list-group').remove();   // the one listgroup.js created
                $select.removeData('listgroup');          // remove plugin instance reference
 // $select.show();        
        }
    }

    canExecute(refToBaseModal) {
        if (this.required && this.getVal().length > 0){
            return true
        } else if ( !this.required ) {
            return true
        }
        dialog.showMessageBoxSync({type: "error", buttons: ["OK"], title: t('comboboxRulVoiTitle'), message: `${t('comboboxRulVoiMsg1')}: "${this.label}"`})                
        return false
    }
    
}

module.exports.element = comboBoxForOnSelect;