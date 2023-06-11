var Sqrl = require('squirrelly');

class optionsMenu {
    content;
    id;
    config;
    htmlTemplate = `
    <div>
      <a class="btn btn-sm btn-secondary btn-block mb-0" 
        data-toggle="collapse" href="#{{modal.id}}_{{ms.no}}" 
        role="button" aria-expanded="false" aria-controls="{{modal.id}}_{{ms.no}}">
      {{if(options.ms.name)}} {{ms.name}} {{#else}} Options {{/if}}
        <div class="ripple-container"></div>
      </a>
      <div class="collapse" id="{{modal.id}}_{{ms.no}}">
        <div class="card card-body card-dark">
          {{if (options.ms.layout =="two"|| options.ms.layout =="three")}}
            {{if (options.ms.layout =="two")}}
              <div class="row">
                <div class="col  col-4 destination ">
                  {{each(options.ms.left)}}
                    {{ @this.content | safe }}
                  {{/each}}
                </div>
                <div class="col  col-8 destination ">
                  {{each(options.ms.right)}}
                    {{ @this.content | safe }}
                  {{/each}}
                </div>
              </div>
            {{/if}}
            {{if (options.ms.layout =="three")}}

            <div class="row">
              <div class="col  col-12 destination ">
                {{each(options.ms.top)}}
                  {{ @this.content | safe }}
                {{/each}}
              </div>
              </div>

             <div class="row">
              <div class="col  col-3 destination ">
                {{each(options.ms.left)}}
                  {{ @this.content | safe }}
                {{/each}}
              </div>
              <div class="col  col-3 destination ">
                {{each(options.ms.center)}}
                  {{ @this.content | safe }}
                {{/each}}
              </div>
              <div class="col  col-6 destination ">
                {{each(options.ms.right)}}
                  {{ @this.content | safe }}
                {{/each}}
              </div>
              </div>
	          {{/if}} 
          {{#else}}
            <div>
              {{each(options.ms.content)}}
                {{ @this.content | safe }}
              {{/each}}
            </div>
          {{/if}}  
        </div>
      </div>
  </div>`

    constructor(modal, config) {
      this.content = Sqrl.Render(this.htmlTemplate, {modal: modal, ms: config})
      this.config = config;
      this.id = `${modal.id}_${config.no}`
    }

    canExecute() {
      return true
    }

    clearContent() {
    }
}

module.exports.element = optionsMenu;