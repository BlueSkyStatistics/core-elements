var Sqrl = require('squirrelly');
const common = require("./common")

class modal {
    htmlPieces = {
        one: `<div class="row"><div class="col col-12">{{each(options.content.items)}}{{ @this | safe }}{{/each}}</div>`,
        two: `<div class="row">
        <div class="col {{if (options.content.sizeleft) }} col-{{content.sizeleft}} {{#else}} col-4 {{/if}}">{{each(options.content.left)}}{{ @this | safe }}{{/each}}</div>
        <div class="col {{if (options.content.sizeright) }} col-{{content.sizeright}} {{#else}} col-8 destination{{/if}} ">{{each(options.content.right)}}{{ @this | safe }}{{/each}}</div>
        </div>`,

        doubletwo: `<div class="row">
        <div class="col {{if (options.content.sizeleft) }} col-{{content.sizeleft}} {{#else}} col-4 {{/if}}">{{each(options.content.left)}}{{ @this | safe }}{{/each}}</div>
        <div class="col {{if (options.content.sizeright) }} col-{{content.sizeright}} {{#else}} col-8 destination{{/if}} ">{{each(options.content.right)}}{{ @this | safe }}{{/each}}</div>
        </div>
        <div class="row">
        <div class="col {{if (options.content.sizeleft) }} col-{{content.sizeleft}} {{#else}} col-4 {{/if}}">{{each(options.content.leftbottom)}}{{ @this | safe }}{{/each}}</div>
        <div class="col {{if (options.content.sizeright) }} col-{{content.sizeright}} {{#else}} col-8 destination{{/if}} ">{{each(options.content.rightbottom)}}{{ @this | safe }}{{/each}}</div>
        </div>`,

        three: `<div class="row">
        <div class="col {{if (options.content.sizeleft) }} col-{{content.sizeleft}} {{#else}} col-4 {{/if}}">{{each(options.content.left)}}{{ @this | safe }}{{/each}}</div>
        <div class="col {{if (options.content.sizecenter) }} col-{{content.sizecenter}} {{#else}} col-6 {{/if}}">{{each(options.content.center)}}{{ @this | safe }}{{/each}}</div>
        <div class="col {{if (options.content.sizeright) }} col-{{content.sizeright}} {{#else}} col-2 {{/if}}">{{each(options.content.right)}}{{ @this | safe }}{{/each}}</div>
        </div>`
    }

    htmlTemplate = `<div class="modal right fade" id="{{modal.id}}" {{if (options.modal.parameterCount != undefined)}} parameterCount = "{{modal.parameterCount}}" {{/if}} tabindex="-1" role="dialog" 
    data-backdrop="false" data-keyboard="false"
    aria-labelledby="{{modal.id}}Label"
    aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header modal-header--sticky pr-1 pl-3">
                <div class="row w-100">
                    <div class="col-7">
                        <h5 class="modal-title" id="{{modal.id}}Label">{{modal.label}}</h5>
                    </div>
                    <div class="col-5 float-right pt-2">
                        <button type="button" data-dismiss="modal" class="close enable-tooltip"
                        data-toggle="tooltip" title="Close dialog">
                            <i class="fas fa-times"></i>
                        </button>
                        <button type="button" action="help" class="close mr-1 enable-tooltip" id="{{modal.id}}Help"
                        data-toggle="tooltip" title="Help on dialog">
                            <i class="fas fa-question"></i>
                        </button>
                        <button type="button" action="syntax" class="close mr-1 enable-tooltip" id="{{modal.id}}Syntax"
                        data-toggle="tooltip" title="Show R Syntax">
                            <i class="fas fa-code"></i>
                        </button>
                        <button type="button" action="submit" class="close btn-tooltip mr-0 enable-tooltip" id="{{modal.id}}Submit"
                        data-toggle="tooltip" title="Execute dialog">
                            <i class="fas fa-play"></i>
                        </button>
                        <button type="button" data-dismiss="modal" action="save" class="close d-none btn-tooltip mr-0 enable-tooltip" id="{{modal.id}}Save"
                        data-toggle="tooltip" title="Save Settings">
                            <i class="fas fa-save"></i>
                        </button>
                        <button type="button" action="attach" class="close mr-1 enable-tooltip" id="{{modal.id}}Attach"
                        data-toggle="tooltip" title="Attach" style="display: none;">
                            <i class="fas fa-window-restore"></i>
                        </button>                        
                    </div>
                </div>
            </div>
            <div class="modal-body" data-actions-box="true">
                {{if(options.content.head !== undefined)}}
                <div class="row">
                    <div class="col col-12">
                        {{each(options.content.head)}}
                            {{ @this | safe }}
                        {{/each}}
                    </div>
                </div>
                {{/if}}
                {{ mainContentPiece | safe }}
                {{if(options.content.bottom !== undefined)}}
                <div class="row">
                    <div class="col col-12">
                        {{each(options.content.bottom)}}
                            {{ @this | safe }}
                        {{/each}}
                    </div>
                </div>
                {{/if}}
            </div>
            {{if(options.modal.pre_start_r)}}
                <div id="{{modal.id}}_pre_r" style="display:none">
                    {{modal.pre_start_r}}
                </div>
            {{/if}}
        </div>
    </div>
</div>`
    id;
    content;

    constructor(config, content) {
        this.id = config.id;
        this.r = config.RCode;
        this.nav = content.nav;
        var contentPiece = Sqrl.Render(this.htmlPieces[config.modalType], { content: content });
        this.content = Sqrl.Render(this.htmlTemplate, { modal: config, content: content, mainContentPiece: contentPiece });
    }

    renderR(code_vars) {
        return this.renderSample(this.r, code_vars);
    }

    renderSample(code_sample, vars) {
        return Sqrl.Render(code_sample, vars);
    }

    prepareSelected(value, templates) {
        var selected = []
        templates.forEach(function (item) {
            if (Object.values(value)[0] !== "" && Object.values(value)[0] !== undefined) {
                selected.push(Sqrl.Render(item, value))
            } else {
                selected.push("")
            }

        })
        return selected
    }

    hide() {
        $(`#${this.id}`).removeAttr("dataset");
        $(`#${this.id}`).modal('hide');
    }

    extractData() {
        var code_vars = {}
        code_vars ["BSkyThemes"] = themeRsyntax;
        $(`#${this.id}`).find((`[extractable=true]`)).each(function (index, item) {
            code_vars[item.getAttribute("no")] = common.transform(common.getVal(item.getAttribute("id")), item.getAttribute("extractionRule"),item.getAttribute("id") )
            if (code_vars[item.getAttribute("no")] && item.hasAttribute("wrapped")) {
                code_vars[item.getAttribute("no")] = item.getAttribute("wrapped").replace("%val%", code_vars[item.getAttribute("no")])
            }
        })
        return code_vars
    }


    extractSemData() {
        var code_vars = {}
        code_vars ["BSkyThemes"] = themeRsyntax;
        $(`#${this.id}`).find((`[extractable=true]`)).each(function (index, item) {

            if (item.getAttribute("no") == "sem" || item.getAttribute("no") == "sem2"|| item.getAttribute("no") == "sem3" ||item.getAttribute("no") == "modelTermsDst"||item.getAttribute("no") == "coVarDst"|| item.getAttribute("no") == "mediationDestCtrl")
            {
                code_vars[item.getAttribute("no")] = common.getVal(item.getAttribute("id"))
            }
            else
            {
                code_vars[item.getAttribute("no")] = common.transform(common.getVal(item.getAttribute("id")), item.getAttribute("extractionRule"),item.getAttribute("id") )
            }
            if (code_vars[item.getAttribute("no")] && item.hasAttribute("wrapped")) {
                code_vars[item.getAttribute("no")] = item.getAttribute("wrapped").replace("%val%", code_vars[item.getAttribute("no")])
            }
        })
        return code_vars
    }



    static attachSidebar() {
        // Move modal to undraggable state
        // $(`.modal.show .modal-dialog`).draggable("disable");
        $(`.modal.show [action='attach']`).hide()
        var increment = $(".nav.main-sub-menu").not(":hidden").parent().parent().height()
        var activeModalSub = 53 + increment
        $(`.modal.show .modal-dialog`).css({top: `${activeModalSub}px`, left: ''})
    }

    compile(onShow, onHide, onSubmit, onSyntax, help, onSave) {
        return {
            modal: this.content,
            id: this.id,
            onshow: onShow,
            onhide: onHide,
            onsubmit: onSubmit,
            onsyntax: onSyntax,
            onhelp: help,
            onsave: onSave,
            onattach: modal.attachSidebar,
            nav: this.nav
        }
    }
}

module.exports.element = modal;