/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */

const {getT: utilityGetT} = requireFromRoot("localization.js");

function removenewline(str) {
    //new line followed my one or more tabs
    let pattern = /\n\t+/g
    res = str.replace(pattern, "\n\t");
    //new line followed by 0 or more spaces followed by newline
    pattern = /\n\s*\n/g
    res = res.replace(pattern, "\n");
    // plus followed by 0 or more spaces, followed by 0 or more new lines followed by +
    pattern = /\+\s*\n*\s*\+/g
    res = res.replace(pattern, "+");
    // new line followed by 4 or more spaces
    pattern = /\n\s\s\s+/g
    res = res.replace(pattern, "\n\t");
    // , followed by zero or more spaces followed by ,
    pattern = /\,[\s*]*\,/g
    res = res.replace(pattern, ",");
    return res;
}
function fetchAllColumnAttributes() {
    let allColumnsProperties = {};
    let dataset = getActiveDataset();
    let data = store.get(dataset);
    if (data !== undefined) {
        data.cols.forEach(element => {
            let colinfo = {};
            colinfo.Name = element.Name[0];
            colinfo.Type = element.Type[0];
            colinfo.ColClass = element.ColClass[0];
            colinfo.Measure = element.Measure[0];
            allColumnsProperties[colinfo.Name] = colinfo;
        });
    }
    return allColumnsProperties;
}
// Usage:
//
// let allColAttr = fetchAllColumnAttributes()
//
//
// let colname = 'Age';
//
// let singleColProperties = allColAttr[colname]
//
// let columnClass = singleColProperties.ColClass;
//
// let columnType = singleColProperties.Type;
//
// let columnMeEasure = singleColProperties.Measure;
//
// let columnName = singleColProperties.Name;
//
//
// for looping: start loop after fetchAllColumnAttributes() and end it above this line.
function getVariablesInMixedModel(tvarbox1, NestingVar, covariates, fixedEffects, randomvars) {
    let varsForMissing = "";
    let variablesToCheckForMissingArr = []
    let variablesToCheckForMissingObj = {}
    variablesToCheckForMissingObj[tvarbox1] = tvarbox1
    variablesToCheckForMissingObj[NestingVar] = NestingVar
    for (var covar in covariates) {
        variablesToCheckForMissingObj[covar] = covar
    }
    for (var effect in fixedEffects) {
        variablesToCheckForMissingObj[effect] = effect
    }
    randomvars.forEach(function (value) {
        variablesToCheckForMissingObj[value] = value
    }
    )
    for (var obj in variablesToCheckForMissingObj) {
        varsForMissing += "'" + obj + "'";
        varsForMissing += ",";
    }
    varsForMissing = varsForMissing.substring(0, varsForMissing.length - 1);
    return varsForMissing
}


function getNoOFFactorVariablesInFixedEffectsRandomEffects(fixedEffects, randomvars, allColAttr) {
    let factorVariables = []

    for (var effect in fixedEffects) {
        if (allColAttr[effect].Measure == "factor" || allColAttr[effect].Measure == "Ordinal")
            factorVariables.push(effect);
    }
    randomvars.forEach(function (value) {
        if (allColAttr[value].Measure == "factor" || allColAttr[value].Measure == "Ordinal")
            factorVariables.push(value);
    }
    )

    return factorVariables.length
}

function listOfAll2WayInteractions(tvarbox2, covariates) {
    let all2WayInteractions = {}
    regexpression = /[+]/
    let newTerm
    let modelTerms = []
    let vars = []
    modelTerms = tvarbox2.replace(/ /g, '').split(regexpression)
    modelTerms.forEach(function (term) {
        vartype = parseFloat(term)
        if (vartype != "number" && vartype != "bigint") {
            if (term.includes("*") || term.includes(":")) {
                regexpression = /[*:]/
                vars = term.split(regexpression);
                if (vars.length == 2) {
                    newTerm = term.replace('*', ':');
                    if (all2WayInteractions[newTerm] == undefined && covariates[newTerm] == undefined)
                        all2WayInteractions[newTerm] = newTerm;
                }
            }
        }
    }
    )
    return all2WayInteractions
}
function listOfAllNWayInteractions(tvarbox2) {
    let allNWayInteractions = {}
    regexpression = /[+]/
    let newTerm
    let modelTerms = []
    let vars = []
    modelTerms = tvarbox2.replace(/ /g, '').split(regexpression)
    modelTerms.forEach(function (term) {
        vartype = parseFloat(term)
        if (vartype != "number" && vartype != "bigint") {
            if (term.includes("*") || term.includes(":")) {
                regexpression = /[*:]/
                vars = term.split(regexpression);
                newTerm = term.replaceAll('*', ':');
                if (allNWayInteractions[newTerm] == undefined)
                    allNWayInteractions[newTerm] = newTerm;
            }
        }
    }
    )
    return allNWayInteractions
}
function getFixedEffectsandCovariates(tvarbox2) {
    let sliterals = []
    let vartype = ""
    let fixedEffects = {}
    let covariates = {}
    let results = {}
    let allColAttr = fetchAllColumnAttributes()
    let singleColProperties = []
    //Added Aaron 09/16/2024
    //This was previously /[*+-^(\)|%in%/ (Please verify with github)
    //Ross reported an issue when you had a model with Index1 as a fixed factor, lsmeans did not display
    //this was tested with "Index%%test", "Index%test""Index%in%test"
    let regexpression = /[\*\+\-\^\(\)\|:]|%in%|%%|%/

    let functList = []
    tvarbox2 = tvarbox2.replace(/ /g, '')
    //Remove package names for example stats::poly(x, degree)
    tvarbox2 < - tvarbox2.replace(/[\.,_,A-Z,a-z,0-9]+::/, "")
    //Extracting function names, note that hp+drat(mpg*10) will treat drat as a function name, this is OK as the model will be invalid and will error out or be null before we use
    //the extracted variable names in the syntax below the created model
    tvarbox2 < - tvarbox2.replace(/[\.,_,A-Z,a-z,0-9]+\s*\(/gi, "")
    //The code below should be retained as I may revery to this code based on feedback
    /*  if (tvarbox2.match( /[\.,A-Z,a-z,0-9]+\s*\(/gi) != null)
        {
            functList = tvarbox2.match( /[\.,A-Z,a-z,0-9]+\s*\(/gi)
            functList.forEach(function(element,index){
                functList[index] =element.replace(/^\\s+|\\s+$/,"" );  
            });
        } */
    pattern = /^((([a-zA-Z]|[.][._a-zA-Z])[._a-zA-Z0-9]*)|[.])$/
    sliterals = tvarbox2.split(regexpression)
    sliterals.forEach(function (value) {
        //Handle the case if value is empty string
        if (value != "" && pattern.test(value)) {
            vartype = parseFloat(value)
            if (vartype != "number" && vartype != "bigint") {
                singleColProperties = allColAttr[value];
                if (singleColProperties != undefined) {
                    if (fixedEffects[value] == undefined && covariates[value] == undefined) {
                        if (singleColProperties.Name == value && (singleColProperties.Measure == "factor" || singleColProperties.Measure == "ordered"))
                            fixedEffects[value] = value;
                        if (singleColProperties.Name == value && (singleColProperties.Measure == "scale"))
                            covariates[value] = value;
                    }
                }
            }
        }
    }
    )
    results["fixedEffects"] = fixedEffects
    results["covariates"] = covariates
    return results
}
function checkSingleDepVar(results) {
    let fixedEffects = {}
    let covariates = {}
    fixedEffects = results["fixedEffects"]
    covariates = results["covariates"]
    var count = Object.keys(fixedEffects).length
    count += Object.keys(covariates).length
    return count
}
function createfacets(Facetwrap, Facetcolumn, Facetrow, Facetscale) {
    let output = "";
    if (Facetscale == "free_x_and_y") {
        Facetscale = "free";
    }
    if (!(Facetwrap == "" || Facetwrap == null)) {
        if (Facetscale == "none" || Facetscale == "") {
            output = output + " +\n\t facet_wrap(~" + Facetwrap + ")";
        }
        else {
            output = output + " +\n\t facet_wrap(~" + Facetwrap + ",scales=" + "\"" + Facetscale + "\"" + ")";
        }
    }
    else if (!(Facetrow == "" || Facetrow == null) && !(Facetcolumn == "" || Facetcolumn == null)) {
        if (Facetscale == "none" || Facetscale == "") {
            output = output + " +\n\t facet_grid(" + Facetrow + "~" + Facetcolumn + ")";
        }
        else {
            output = output + " +\n\t facet_grid(" + Facetrow + "~" + Facetcolumn + ",scales=" + "\"" + Facetscale + "\"" + ")";
        }
    }
    else {
        if (!(Facetrow == "" || Facetrow == null)) {
            if (Facetscale == "none" || Facetscale == "") {
                output = output + " +\n\t facet_grid(" + Facetrow + "~ ." + ")";
            }
            else {
                output = output + " +\n\t facet_grid(" + Facetrow + "~ ." + ",scales =" + "\"" + Facetscale + "\"" + ")";
            }
        }
        else if ((!(Facetcolumn == "" || Facetcolumn == null))) {
            if (Facetscale == "none" || Facetscale == "") {
                output = output + " +\n\t facet_grid(" + ". ~" + Facetcolumn + ")";
            }
            else {
                output = output + " +\n\t facet_grid(" + ". ~" + Facetcolumn + ",scales =" + "\"" + Facetscale + "\"" + ")";
            }
        }
    }
    return output;
}
function stringWithFacetsForPlotOfMeans(Facetrow, Facetcolumn, Facetwrap) {
    tempFacets = ""
    if (!(Facetcolumn == "" && Facetrow == "" && Facetwrap == "")) {
        count = 0;
        if (!(Facetcolumn == "" || Facetcolumn == "")) {
            tempFacets += Facetcolumn;
            count++;
        }
        if (!(Facetrow == "" || Facetrow == "")) {
            tempFacets += Facetrow;
            count++;
        }
        if (!(Facetwrap == "" || Facetwrap == "")) {
            tempFacets += Facetwrap;
            count++;
        }
        if (count > 1) {
            msg = "ERROR";
            return msg;
        }
    }
    else {
        tempFacets = ""
        return tempFacets;
    }
    return tempFacets;
}
function addToFactorList(factor, levels, factorList) {
    let t = utilityGetT('menutoolbar')
    let factorName = document.getElementById(factor).value;
    if (factorName == "") {
        ipcRenderer.invoke('errormessage', { title: t('handlerRulVoiTitle3'), message: `${t('errormessageIPCmsg1')}` });
    }
    else {
        let levelValue = document.getElementById(levels).value;
        let ul = document.getElementById(factorList).getElementsByTagName('ul');
        let li = document.createElement("li");
        li.classList.add('list-group-item');
        li.classList.add('list-group-item-sm');
        let attClick = document.createAttribute("onclick");       // Create a "class" attribute
        attClick.value = "selectListItem(event)";                 // Set the value of the class attribute
        li.setAttributeNode(attClick);
        let att = document.createAttribute("val");       // Create a "class" attribute
        att.value = levelValue;                           // Set the value of the class attribute
        li.setAttributeNode(att);
        li.appendChild(document.createTextNode(factorName + '(' + levelValue + ')'));
        ul[0].appendChild(li);
        document.getElementById(factor).value = "";
        document.getElementById(levels).value = "2";
    }
}

function removeFromList(listID) {
    let t = utilityGetT('menutoolbar')
    let liList = document.getElementById(listID).getElementsByTagName('ul')[0].getElementsByClassName('active');
    let ul = document.getElementById(listID).getElementsByTagName('ul')[0];
    if (liList.length == 0) {
        ipcRenderer.invoke('errormessage', { title: t('handlerRulVoiTitle3'), message: `${t('errormessageIPCmsg2')}` });
    }
    else {
        liList.forEach(function (value) {
            ul.removeChild(value);
        })
    }
}

function addToMeasureList(measure, measureList) {
    let t = utilityGetT('menutoolbar')
    let measureName = document.getElementById(measure).value;
    if (measureName == "") {
        ipcRenderer.invoke('errormessage', { title: t('handlerRulVoiTitle3'), message: `${t('errormessageIPCmsg3')}` });
    }
    else {
        let ul = document.getElementById(measureList).getElementsByTagName('ul');
        let li = document.createElement("li");
        li.classList.add('list-group-item');
        li.classList.add('list-group-item-sm');
        let att = document.createAttribute("onclick");       // Create a "class" attribute
        att.value = "selectListItem(event)";                           // Set the value of the class attribute
        li.setAttributeNode(att);
        li.appendChild(document.createTextNode(measureName));
        ul[0].appendChild(li);
        document.getElementById(measure).value = "";
    }
}
//We only return measure when there is a single factor, pivot_longer does not support multiple values
//if there are multiple values, its essentially invalid
//We can only pass a single measure when there is a single factor
function getFromMeasureList(id) {
    let res = [];
    let ul = document.getElementById(id).getElementsByTagName('li');
    ul.forEach(function (value) {
        res.push(value.innerHTML);
    })
    return res;
}

function createRepeatedMeasures(measureList, factorList, modal_id, nos) {
    let t = utilityGetT('menutoolbar')
    let pointNum = 1
    let factorListCtrl = document.getElementById(factorList);
    let factorlistItems = factorListCtrl.getElementsByClassName("list-group-item")
    let noOfMeasures = document.getElementById(measureList).getElementsByClassName("list-group-item").length
    factorlistItems.forEach(function (value) {
        pointNum = pointNum * parseFloat(value.getAttribute("val"));
    })
    if (pointNum == 1) {
        ipcRenderer.invoke('errormessage', { title: t('handlerRulVoiTitle3'), message: `${t('errormessageIPCmsg4')}` });

    }
    else if (factorlistItems.length > 1) {
        ipcRenderer.invoke('errormessage', { title: t('handlerRulVoiTitle3'), message: `${t('errormessageIPCmsg5')}` });

    }
    else if (noOfMeasures > 1) {
        ipcRenderer.invoke('errormessage', { title: t('handlerRulVoiTitle3'), message: `${t('errormessageIPCmsg6')}` });
    }
    else if (noOfMeasures == 0) {
        //ipcRenderer.invoke('errormessage', { title: "Error", message: `You need to specify a measure.` });
        dialog.showMessageBoxSync({ type: "error", buttons: ["OK"], title: t('utilityRulVoiTitle1'), message: t('utilityRulVoiMsg1') })
    }
    else if (document.getElementById("repeatedMeasuresAnovaW_repMeasuresConfig_depVar_1")) {
        ipcRenderer.invoke('errormessage', { title: t('handlerRulVoiTitle3'), message: `${t('errormessageIPCmsg7')}` });
    }
    else {
        let measureListCtrl = document.getElementById(measureList);
        let dialogid = document.getElementById(modal_id);
        let newdiv = dialogid.getElementsByClassName("destination");
        let measureItemname = "";
        let modal = {
            id: modal_id
        }
        let config = {
            no: nos,
            filter: "Numeric|Scale",
            extraction: "NoPrefix|UseComma",
            required: true,
            measureCount: 0
        }
        htmlTemplate1 = `
    <div id="{{modal.id}}_{{ms.no}}_depVarParent_{{ms.measureCount}}">
        <div class="row" >
            <div class="col col-xx"></div>
            <div class="col col-rr" id="{{modal.id}}_{{ms.no}}_depVarParent_{{ms.measureCount}}_label"><h6>{{ms.label}} {{if(options.ms.required)}}<span class="required">*</span>{{/if}}</h6></div>
        </div>
        <div class="row">
            <div class="col col-xx">
            <button type="button" class="btn btn-outline-secondary btn-arrows" id="{{modal.id}}arrow{{ms.no}}" >
                <i class="fas fa-arrow-right"></i>
            </button>
        </div>
        <div class="col col-rr">    
            <div class="list-group ms-list" id="{{modal.id}}_{{ms.no}}_depVar_{{ms.measureCount}}" modal_id="{{modal.id}}" no="{{ms.no}}_depVar_{{ms.measureCount}}"  {{if(options.ms.wrapped)}}  wrapped="{{ms.wrapped}}" {{/if}} bs-type="list" ondrop="drop(event)" extractable=true extractionRule="NoPrefix|UseComma|Enclosed" filter="{{ms.filter}}" ondragover="allowDrop(event)" {{if(options.ms.wrapped)}}  wrapped="{{ms.wrapped}}" {{/if}}></div>
        </div>
        </div>
    </div>
    `
        let expandedHTML = "";
        let att;
        let measurelistItems = measureListCtrl.getElementsByClassName("list-group-item")
        //Case when a measure is not specified
        if (measurelistItems.length == 0) {
            config.label = "Move " + pointNum + " variables, corresponding to measures for the factor name(s) specified ";
            expandedHTML = Sqrl.Render(this.htmlTemplate1, { modal: modal, ms: config })
            newdiv[0].innerHTML = expandedHTML + newdiv[0].innerHTML
        }
        else {
            measurelistItems.forEach(function (val) {
                config.measureCount = config.measureCount + 1
                config.label = "Move " + pointNum + " variables, corresponding to measures for " + val.innerHTML;
                expandedHTML = Sqrl.Render(this.htmlTemplate1, { modal: modal, ms: config })
                newdiv[0].innerHTML = expandedHTML + newdiv[0].innerHTML
                att = document.createAttribute("labelDescription");       // Create a "class" attribute
                att.value = config.label;                           // Set the value of the class attribute
                val.setAttributeNode(att);
            })
        }
        //Keep this code, we may want to introduce
        // document.getElementById(modal.id +"_" +nos).classList.remove('show');
        // document.getElementById(modal.id +"_" +nos).classList.add('hide');
    }
}


function hasWritePermission(fpath) {
    let canWrite = false;
    if (fs.existsSync(fpath)) {
        try {
            fpath = changeBkslashToFrwdslash(path.join(fpath, "tempfile.txt"))
            fs.writeFileSync(fpath, "check write permission", (err) => {
            });

            fs.unlink(fpath, (err) => {
            });
            canWrite = true;

        } catch (err) {
            console.error('Cannot write')
            console.log(err.message);
        }
    }
    return (canWrite);
}

//type = normal is used for latent variables and higher order factors
//type -equalityconstraint is used to make the set names read only
//type =mediation is used for mediation 
//equalityConstraints =true creates a property called equality constrainst that is used to create the correct syntax for equality constrains in common.js
function createEndoExoVariables(modal_id, nos, filter, equalityConstraints, placeHolderText, type ) {
    let t = utilityGetT('menutoolbar')
    //Moderation destination controls only support a single set
    if (modal_id =="sem" && nos =="mediationDestCtrl")
    {
        if ($("#" +"sem_mediationDestCtrl").find(".list-group1").length >= 1)
        {
            dialog.showMessageBoxSync({ type: "error", buttons: ["OK"], title: t('handlerRulVoiTitle3'), message: `${t('utilityRulVoiMsg2')}` })
            return
        }
    }
    let allowedSrcCtrls = []
    let noEndoExoVariables = 0
    id = modal_id + "_" + nos
    noEndoExoVariables = parseInt($(`#${id}`).attr('count')) + 1
    $(`#${id}`).attr('count', noEndoExoVariables)
    allowedSrcCtrls =$(`#${id}`).attr('allowedSrcCtrls')
    var newdiv = document.getElementById(modal_id + "_" + nos + "_insertionPt");
    let measureItemname = "";
    let modal = {
        id: modal_id
    }
    let config ={}
    if (allowedSrcCtrls ==undefined)
    {
     config = {
        no: nos,
        filter: filter,
        extraction: "NoPrefix|UseComma",
        required: false,
        measureCount: 0,
        noEndoExoVariables: noEndoExoVariables,
        equalityConstraints: equalityConstraints,
        placeHolderText:placeHolderText,
        type:type,
        
    }
    } else
    {
        config = {
            no: nos,
            filter: filter,
            extraction: "NoPrefix|UseComma",
            required: false,
            measureCount: 0,
            noEndoExoVariables: noEndoExoVariables,
            equalityConstraints: equalityConstraints,
            placeHolderText:placeHolderText,
            type:type,
            allowedSrcCtrls: allowedSrcCtrls 
        }
    }
    htmlTemplate1 = `
    <div id="{{modal.id}}_{{ms.no}}_destCtrl_{{ms.noEndoExoVariables}}" class="list-group1" extractable=false bs-type="list">
        <div class="row my-1 " >
                <div class="col-2">
                </div>
                <div class="col-9">
                    <input class ="w-100" id="{{modal.id}}_{{ms.no}}_label_{{ms.noEndoExoVariables}}" priorValue = "" placeholder ="{{ms.placeHolderText}}" type ="text" onchange="actionOnCreateLatentVarHighorderVar(textBoxId = &quot;{{modal.id}}_{{ms.no}}_label_{{ms.noEndoExoVariables}}&quot; ,modalId = &quot;{{modal.id}}&quot; ,ctrlId = &quot;{{ms.no}}&quot;)" {{if(options.ms.type =="equalityConstraint")}}value ="set{{ms.noEndoExoVariables}}" disabled{{/if}} {{if(options.ms.type == "latentLoading")}}value ="latent{{ms.noEndoExoVariables}}"{{/if}}{{if(options.ms.type == "higherOrderFactor")}}value ="factor{{ms.noEndoExoVariables}}"{{/if}}{{if(options.ms.type =="mediation")}}value ="indirect relationship {{ms.noEndoExoVariables}}" disabled{{/if}} ></input>
                </div>
                <div class="col-1 col-1X">
                    <button class="btn btn-secondary btn-top-menu p-1" onclick="removeFromDestCtrl( ctrl =&quot;{{modal.id}}_{{ms.no}}_destCtrl_{{ms.noEndoExoVariables}}&quot; , textBoxId = &quot;{{modal.id}}_{{ms.no}}_label_{{ms.noEndoExoVariables}}&quot; ,modalId = &quot;{{modal.id}}&quot; )"  >
                        <i class ="fas fa-trash">
                        </i>
                    </button>
                </div>  
        </div>
        <div class="row my-1">
            <div class="col-2 mvbtn">
                <button type="button" class="btn btn-outline-secondary btn-arrows" id="{{modal.id}}arrow{{ms.no}}{{ms.noEndoExoVariables}}">
                <i class="fas fa-arrow-right"></i>
                </button>
            </div>
            <div class="col-9">    
                <div class="list-group ms-list1" id="{{modal.id}}_{{ms.no}}_depVar_{{ms.noEndoExoVariables}}" modal_id="{{modal.id}}" 
                no="{{ms.no}}_depVar_{{ms.noEndoExoVariables}}"  {{if(options.ms.wrapped)}}  
                wrapped="{{ms.wrapped}}" {{/if}} {{if(options.ms.equalityConstraints)}}equalityconstraints{{/if}} bs-type="list" 
                ondrop="drop(event)" extractable=false extractionRule="NoPrefix|UseComma|Enclosed" filter="{{ms.filter}}" 
                ondragover="allowDrop(event)" {{if(options.ms.wrapped)}}  wrapped="{{ms.wrapped}}" {{/if}} 
                {{if (options.ms.allowedSrcCtrls != undefined) }}allowedSrcCtrls = "{{ms.allowedSrcCtrls}}"{{/if}}
                relatedInputCtrl = "{{modal.id}}_{{ms.no}}_label_{{ms.noEndoExoVariables}}"></div>
            </div>
            <div class="col-1">
            </div>
        </div>
</div>
`  
    let expandedHTML = "";
    let att;
    //Case when a measure is not specified
    config.label = "Endogenous variable: ";
    expandedHTML = Sqrl.Render(this.htmlTemplate1, { modal: modal, ms: config })
    newdiv.insertAdjacentHTML("beforeend", expandedHTML);
    let tempid = modal.id + "arrow" + config.no + config.noEndoExoVariables
    var btn = document.getElementById(tempid);
    btn.addEventListener("click", moveToDst)
    let temp = modal.id + "_" + config.no + "_destCtrl" + "_" + config.noEndoExoVariables
    let eletemp = document.getElementById(temp);
    eletemp.scrollIntoView(false);
    actionOnCreateLatentVarHighorderVar(textBoxId = modal.id +"_" + config.no + "_label_" + config.noEndoExoVariables , modalId = modal.id, ctrlId = config.no)  
}


function checkNames (textBoxId)
{
    let colAttr =fetchAllColumnAttributes()
    if (colAttr[$(`#${textBoxId}`).val()] == undefined) return true
    else return false
}

function checkDuplicateNames(textBoxId, modalId)
{
    let t = utilityGetT('menutoolbar')
    let oriTextBoxId = textBoxId
    let valEntered =$(`#${textBoxId}`).val()
    let latentCtrlId = "#" + modalId + "_" +"sem"
    let higherOrderFactorsId = "#" + modalId + "_" +"sem2"
    let latentInputCtrls = $(latentCtrlId).find("input")
    let error = false
    latentInputCtrls.each(function() {
        if ( oriTextBoxId != this.id)
        {
            if ( valEntered == $(this).val())
            {
                dialog.showMessageBoxSync({ type: "error", buttons: ["OK"], title: t('utilityRulVoiTitle2'), message: `${t('utilityRulVoiMsg3')}` })
                $(`#${textBoxId}`).val("")
                error = true
                return 
            }
        }
      });
    let higherOrderFactorInputCtrls = $(higherOrderFactorsId).find("input")  
    higherOrderFactorInputCtrls.each(function() {
        if ( oriTextBoxId != this.id)
        {
            if ( valEntered == $(this).val())
            {
                dialog.showMessageBoxSync({ type: "error", buttons: ["OK"], title: t('utilityRulVoiTitle2'), message: `${t('utilityRulVoiMsg3')}` })
                $(`#${textBoxId}`).val("")
                error = true
                return 
            }
        }
      });
      return error
}


//Here we populate the suporting controls i.e. ["semSuppCtrl1", "modelTerms", "modelTerms1", "coVarTerms", "coVarTerms1"  ] or ["modelTerms", "modelTerms1", "coVarTerms", "coVarTerms1"]
//with latent trains or higher order factor names
//PriorVal holds the value of the input control
//Prior val is important as it allows me to handle renames
//Renames are handled as follows
//1. In all the supporting controls, we delete the old value/prior value
//2. In all the modeltermsdst and covarstermscst and mediationdest, we delete all entries with the old value/prior value
//3. If the new value is not empty, we add the new value to all supporting controls
function actionOnCreateLatentVarHighorderVar(textBoxId, modalId, ctrlId) 
{
    let t = utilityGetT('menutoolbar')
    //We don't populate supporting controls or have to check anything with equality constraints
    //The names of the equality constraints are not used, also the control is disabled
    if (ctrlId == "sem3" || ctrlId == "mediationDestCtrl") return
    let item_name = $(`#${textBoxId}`).val();
    let priorVal = $(`#${textBoxId}`).attr('priorValue')
    if (item_name =="" && priorVal == undefined)
        return
    //This is the case when I blanked out/back spaced an existing latent variable
    if (item_name =="" && priorVal != undefined) 
    {
        //Since there was a prior value for the latent variable, I need to remove it from all supporting controls and modeltermsdst and covarstermscst and mediationdest
        deletingLatentOrHigher( priorVal, textBoxId, modalId)
        $(`#${textBoxId}`).removeAttr('priorValue')
        return
    }
    //The name of a latent variable or higher order factor should not match any of the variable names in the active dataset
    if (!checkNames(textBoxId))
    {
        dialog.showMessageBoxSync({ type: "error", buttons: ["OK"], title: t('utilityRulVoiTitle3'), message: `${t('utilityRulVoiMsg4')}` })
        //I blank this out to force the user to enter a valid name
        $(`#${textBoxId}`).val("")
        if (priorVal != undefined){
            deletingLatentOrHigher( priorVal, textBoxId, modalId)
            $(`#${textBoxId}`).removeAttr('priorValue')
        }
        return
    }
    //We cannot have duplicates in the names of the latent variables or higher order factor names
    if (checkDuplicateNames(textBoxId, modalId, ctrlId))
    {
        if (priorVal != undefined){
            deletingLatentOrHigher( priorVal, textBoxId, modalId)
            $(`#${textBoxId}`).removeAttr('priorValue')
        }
        return 
    }
    var dataset = getActiveDataset();
    let suppCtrl =null
    //The if below allows us to support separate support controls for the latent variables and the 2nd order/higher order factors
    //Entering higher order factors, should not populate the semSuppCtrl with the higher order factor names
    if (ctrlId =="sem")
    {
        suppCtrl = $(`#${modalId}`).find('[suppCtrlIds]')[0]
    } else
    {
        suppCtrl = $(`#${modalId}`).find('[suppCtrlIds]')[1]
    }
    //let suppCtrl = $(`#${modalId}_${ctrlId}`).attr('suppCtrlIds')
    
    //This is the case if I edited the name of a latent or higher order variable name and did not change the name of the variable.
    //Since nothing was changed, I do nothing and skip out of the if below
    if (item_name != priorVal)
    {
        //Here we are adding the new variable specified in all the supporting controls
        if (priorVal != undefined)
        {
            deletingLatentOrHigher( priorVal, textBoxId, modalId)
        }
        if (suppCtrl != undefined) {
        let suppCtrlVal = JSON.parse($(`#${suppCtrl.id}`).attr('suppCtrlIds'))
        suppCtrlVal.forEach(function (value) {
            let item_id = modalId + "_" + value
            var order = []
                //semSuppCtrl is the only control when you select, other selected controls get deselected.
                //semSuppCtrl is the only control where elements can be dragged and dropped
                if (value =="semSuppCtrl1" )
                {
                    item_id = modalId  + value
               
                    let highFactId = "#" +`${item_id}_${getActiveDataset()}_${item_name.replace(/ /g, "_")}`
                    //Checks if the high order factor is already there
                    if ($(highFactId).length == 0)
                    {
                        order.push(`${item_id}_${getActiveDataset()}_${item_name.replace(/ /g, "_")}`)
                        $(`#${item_id}`).append(`<a href="#"
                                    id="${item_id}_${getActiveDataset()}_${item_name.replace(/ /g, "_")}"
                                    class="list-group-item list-group-item-sm list-group-item-action measure-scale class-numeric"
                                    draggable="true"
                                    bs-row-type="double"
                                    bs-row-class="semFactor"
                                    bs-row-measure="scale"
                                    ondragstart="drag(event, 'move')"
                                    ondrop="drop(event)"
                                    type ="sem"
                                    onclick="selectElement(event)">${item_name}</a>`)
                        $(`#${item_id}`).attr('order', order.join("|||"))
                    }
                }
                else
                {
                    $(`#${item_id}`).append(`<a href="#"
                    id="${item_id}_${getActiveDataset()}_${item_name.replace(/ /g, "_")}"
                    class="list-group-item list-group-item-sm termsDst list-group-item-action measure-scale class-numeric"
                    draggable="true"
                    bs-row-type="double"
                    bs-row-class="semFactor"
                    bs-row-measure="scale"
                    type ="sem"
                    onclick="selectModelTerms(event)"
                    >${item_name}</a>`)
                }
            }
        )
        $(`#${textBoxId}`).attr('priorValue', item_name);
        }
    //Populating the covariances
    let autoPopCovarId =  modalId + "_" + "autoComputeCovar"
    let autoPopCovarState = $(`#${autoPopCovarId}`).prop('checked');
    if (autoPopCovarState)
    {
        autoPopulateCovar(modalId, ctrlId)
    }
    populateEqualityConstraints()
}
}



//Automatically populates the covariances
//This is called when ever you add variables to create latent variables
//It is also called when you rename a latent variable
//This is also called when you create latent variables
//This is called when you add variabcdles to create higher order factors
//This is also called when you add structural parameters
function autoPopulateCovar() {
    //Lets get the latent variables
    let latentNames = []
    let coVarDst =""
    let moreThan2LatentVars = false;
    let latentId = '#' + "sem" + "_"+ "sem" ;    
    let latentVars = {}
    let latentInputCtrls = $(latentId).find("input")
    let no = ""
    let latentName = ""
    let latentMemembersId =""
    let latent = false
    let structuralExoVars = false
    let indexToRemove = 0
    let modalId ="sem"
    //Populate the latent variables
    if (latentInputCtrls.length > 0 )
    {
        latentInputCtrls.each(function() {
        latentName = $(this).val()
        if (latentName != "")
        {
            no = this.id.split("_")[3]
            latentMemembersId = modalId + "_sem"  + "_depVar" + "_" + no
            latentVars[$(this).val()] = common.getMultiVal(latentMemembersId)
        }
        });
        let  objectKeys = Object.keys(latentVars);
        if (objectKeys.length  > 1)
        {
            moreThan2LatentVars = true
        }
        if (objectKeys.length  >= 1)
        {
            latent = true
        }
    }
    //Populate the higher order factors
    let moreThan2HigherOrderFactors =   false;
    let higherOrderFactors = false;
    let higherOrderFactorsID = '#' + modalId + "_"+ "sem2" ;
    let higherOrderFactorsCtrls = $(higherOrderFactorsID).find("input")  
    let higherOrderFactorsVars = {}
    let higherOrderFactorsName = ""
    let higherOrderFactorsMemembersId =""
    if (higherOrderFactorsCtrls.length > 0 )
    {
        higherOrderFactorsCtrls.each(function() {
        higherOrderFactorsName = $(this).val()
        if (higherOrderFactorsName != "")
        {
            no = this.id.split("_")[3]
            higherOrderFactorsMemembersId = modalId + "_sem2"  + "_depVar" + "_" + no
            higherOrderFactorsVars[$(this).val()] = common.getMultiVal(higherOrderFactorsMemembersId)    
        }
       });
        let  objectKeys = Object.keys(higherOrderFactorsVars);
        if (objectKeys.length  > 1)
        {
            moreThan2HigherOrderFactors = true
        }
        if (objectKeys.length  >= 1)
        {
            higherOrderFactors = true
        }
    }
    //Lets get the structural parameters
    //Getting a list of observed and latent exogenous predictors from structural parameters
    //Id of structural parameters control is modelTermsDst  
    let structuralExoVarsId =  modalId + "_"+ "modelTermsDst" ;
    let structuralObservedExoVars = []
    let structuralLatentExoVars =[]
    let allExoVars = []
    let allOutcomeVars =[]
    let modelTerms = common.getMultiVal(structuralExoVarsId)
    if (modelTerms.length != 0 )
    {
        structuralExoVars = true
        modelTerms.forEach(function(element, index) {
            let myArray = element.split("->");
            let keysLatentVars =[]
            let keysHigherOrderFactors =[]
            let isIndicator =false
            keysLatentVars = Object.keys(latentVars);
            keysHigherOrderFactors = Object.keys(higherOrderFactorsVars);
            //lets check whether myArray[0] is an indicator
            //A variable is an indicator if its is a component of a latent variable
            //A latent variable is an indicator if its a component of a higher order factor 
            //Any exogenous variable that is a indicator is no longer exogenous
            if (latent)
            {
                for (const key in latentVars) {
                    if (latentVars[key].indexOf(myArray[0]) > -1)
                    {
                        isIndicator = true
                    }
                }
            }
            if (higherOrderFactors)
            {
                for (const key in higherOrderFactorsVars) {
                    if (higherOrderFactorsVars[key].indexOf(myArray[0]) > -1)
                    {
                        isIndicator = true
                    }
                }
            }
           // if (!isIndicator && allExoVars.indexOf(myArray[0]) ==-1)
           //We have to handle cases of the following in the structural parameters
           // A1->A2
           //A2->A3
           //A1->A2
           //The covariances need to be empty and NOT A1<->A2
           if (!isIndicator )
            {
                if (allExoVars.indexOf(myArray[0])==-1) 
                    allExoVars.push(myArray[0])
            }
                let allColumnProps = fetchAllColumnAttributes()
                if (allOutcomeVars.indexOf(myArray[1]) ==-1)
                    allOutcomeVars.push(myArray[1])
                if (allColumnProps[myArray[0]] != undefined)
                {
                    if (structuralObservedExoVars.indexOf(myArray[0])==-1)
                        structuralObservedExoVars.push(myArray[0])
                } else
                {
                    if (structuralLatentExoVars.indexOf(myArray[0])==-1)
                        structuralLatentExoVars.push(myArray[0])
                }
            
        })
    //Addressing the case where some predictor variables can also be outcome
    //In this case, we remove them from allExovars
    allOutcomeVars.forEach(function(element, index) {
        if (allExoVars.includes(element))
        {
            indexToRemove = allExoVars.indexOf(element);
            if (indexToRemove !== -1) {
                allExoVars.splice(indexToRemove, 1);
            }
        }
    })
    }
    //Now lets populate the covariances
    //Lets reset the covariances so we can start from the beginning
    coVarDst =   modalId + "_" + "coVarDst";
        $(`#${coVarDst}`).children().each(function(index, element) {
            element.remove()
        })
    //Case when there are latent variables but no high order factors or structural parameters
    //Here we simple correlate each latent variable with all the other latent variables
    if (moreThan2LatentVars && !higherOrderFactors && !structuralExoVars )
    {
        let latentNames = []
        //Getting the names of all the latent variables
        for (const key in latentVars) {
            latentNames.push(key)
          }
        //Correlating each latent variable with the other latent variables
        for (let i = 0; i < latentNames.length; i++) {
                for (let j = i + 1; j < latentNames.length; j++) {
                  value1 = latentNames[i];
                  value2 = latentNames[j];    
                  autoPopCovarTerm(latentNames[i],latentNames[j], modalId )
                }
        }
    }  
    //Case when there are latent variables, high order factors and no structural parameters
    //Here we correlate the high order factor variables with all the other high order factor variables and all
    //the remaining latent variables that are not part of the higher order factors
    if (moreThan2LatentVars && higherOrderFactors && !structuralExoVars )
    {        
        let higherOrderFactorNames = []
        for (const key in latentVars) {
            latentNames.push(key)
          }
        //Storing all the latent names
        let tempLatentNames =  latentNames.concat();
        //Getting a list of all the higher order factor names
        for (const key in higherOrderFactorsVars) {
            higherOrderFactorNames.push(key)
          }
        //Checking if all latent variables are represented in high order factor names
        //Missing latent variables that are not part of factor names are stored in tempLatentNames
        let latentNotInHighOrderFactors = []
        let latentVarsInKey = []
        for (const key in higherOrderFactorsVars) {
            latentVarsInKey = higherOrderFactorsVars[key]
            latentVarsInKey.forEach(function (value) {
                if (tempLatentNames.includes(value))
                {
                 //   tempLatentNames.remove(value)
                 indexToRemove = tempLatentNames.indexOf(value);
                if (indexToRemove !== -1) {
                    tempLatentNames.splice(indexToRemove, 1);
                    }
                }
          })
        }
        //Adding missing latent variables to the higherOrderFactorNames so we can correlate them
        tempLatentNames.forEach(function (value) {
            higherOrderFactorNames.push(value)

      })
        for (let i = 0; i < higherOrderFactorNames.length; i++) {
            for (let j = i + 1; j < higherOrderFactorNames.length; j++) {
            value1 = higherOrderFactorNames[i];
            value2 = higherOrderFactorNames[j];    
            autoPopCovarTerm(higherOrderFactorNames[i],higherOrderFactorNames[j], modalId )
            }
        }
    }

    //Case where there are structural parameters
    //Lets add higher order factor names if not there
    if (structuralExoVars)
    {
        let latentVarsInHighOrderFact =[]
        //Adding all higher order factors that are not already part of allExoVars and allOutcomevars
        for (const key in higherOrderFactorsVars) {
            if (!allExoVars.includes(key) && !allOutcomeVars.includes(key))
                allExoVars.push(key)
            //Get all the latent variables that are part of higher order factors
            higherOrderFactorsVars[key].forEach(function(element, index){
                latentVarsInHighOrderFact.push(element)
            })
        }
        //Adding all latent variables that are not higher order factors that are not already part of allExoVars and allOutcomevars
        for (const key in latentVars) { 
            if (!allExoVars.includes(key) && !allOutcomeVars.includes(key) && !latentVarsInHighOrderFact.includes(key) )
            allExoVars.push(key)
        }    
        for (let i = 0; i < allExoVars.length; i++) {
            for (let j = i + 1; j < allExoVars.length; j++) {
            value1 = allExoVars[i];
            value2 = allExoVars[j];    
            autoPopCovarTerm(allExoVars[i],allExoVars[j], modalId )
            }
        }
    }
   
    //Lets add back the manually added covariances if valid
    //Lets get all the manually added covariances
    let manAddedCovar =[]
    let inValidManAddedCovar =[]
    let firstTerm =""
    let secondTerm = ""
    if ($(`#sem_coVarDst`).attr('manAddedCovar') != undefined)
    {
        manAddedCovar = JSON.parse($(`#sem_coVarDst`).attr('manAddedCovar'))   
    }
    manAddedCovar.forEach (function (element, index){
        let firstTerm = element.split("<->")[0]
        let secondTerm = element.split("<->")[1]
        //Adding them only if they are valid
        if ( document.getElementById(`sem_coVarTerms_${getActiveDataset()}_${firstTerm}`) != undefined && document.getElementById(`sem_coVarTerms1_${getActiveDataset()}_${secondTerm}`) != undefined)
        {
            autoPopCovarTerm (firstTerm, secondTerm, "sem")
        }
        else {
            inValidManAddedCovar.push(element)
        }

    })
    if (inValidManAddedCovar.length > 0)
    {
        let finalAddCovar = removeElementsFromArray(manAddedCovar, inValidManAddedCovar)
        if (finalAddCovar.length > 0)
            $(`#sem_coVarDst`).attr('manAddedCovar', JSON.stringify(finalAddCovar))  
    }
}

//This function populates the equality constraints
//When you populate euality constraints, think about the model every thing with a ~ needs to be represented
//So all latent variables, all high order factors, all correlations , all structural parameters
function populateEqualityConstraints ()
{
    let latentNames = []
    let value1 =""
    let value2 =""
    let coVarDst =""
    let moreThan2LatentVars = false;
    let modalId ="sem"
    let latentId = '#' + modalId + "_"+ "sem" ;    
    let latentVars = {}
    let latentInputCtrls = $(latentId).find("input")
    let no = ""
    let latentName = ""
    let latentMemembersId =""
    let latent = false
    let structuralExoVars = false
    let indexToRemove = 0
    //Populate the latent variables
    if (latentInputCtrls.length > 0 )
    {
        latentInputCtrls.each(function() {
        latentName = $(this).val()
        if (latentName != "")
        {
            no = this.id.split("_")[3]
            latentMemembersId = modalId + "_sem"  + "_depVar" + "_" + no
            latentVars[$(this).val()] = common.getMultiVal(latentMemembersId)
        }
        });
        let  objectKeys = Object.keys(latentVars);
        if (objectKeys.length  > 1)
        {
            moreThan2LatentVars = true
        }
        if (objectKeys.length  > 1)
        {
            latent = true
        }
    }
    //Populate the higher order factors
    let moreThan2HigherOrderFactors =   false;
    let higherOrderFactors = false;
    let higherOrderFactorsID = '#' + modalId + "_"+ "sem2" ;
    let higherOrderFactorsCtrls = $(higherOrderFactorsID).find("input")  
    let higherOrderFactorsVars = {}
    let higherOrderFactorsName = ""
    let higherOrderFactorsMemembersId =""
    if (higherOrderFactorsCtrls.length > 0 )
    {
        higherOrderFactorsCtrls.each(function() {
        higherOrderFactorsName = $(this).val()
        if (higherOrderFactorsName != "")
        {
            no = this.id.split("_")[3]
            higherOrderFactorsMemembersId = modalId + "_sem2"  + "_depVar" + "_" + no
            higherOrderFactorsVars[$(this).val()] = common.getMultiVal(higherOrderFactorsMemembersId)    
        }
       });
        let  objectKeys = Object.keys(higherOrderFactorsVars);
        if (objectKeys.length  > 1)
        {
            moreThan2HigherOrderFactors = true
        }
        if (objectKeys.length  > 0)
        {
            higherOrderFactors = true
        }
    }
    // Getting the existing constraints in the sets
    let equalitySets = false;
    let equalitySetsID = '#' + modalId + "_"+ "sem3" ;
    let equalitySetsCtrls = $(equalitySetsID).find("input")  
    let equalitySetsCtrlsVars = {}
    let equalitySetsName = ""
    let equalitySetsMemembersId =""
    if (equalitySetsCtrls.length > 0 )
    {
        equalitySetsCtrls.each(function() {
        equalitySetsName = $(this).val()
        if (equalitySetsName != "")
        {
            no = this.id.split("_")[3]
            equalitySetsMemembersId = modalId + "_sem3"  + "_depVar" + "_" + no
            equalitySetsCtrlsVars[$(this).val()] = common.getMultiVal(equalitySetsMemembersId)    
        }
       });
        let  objectKeys = Object.keys(equalitySetsCtrlsVars);
        if (objectKeys.length  > 0)
        {
            equalitySets = true
        }
    }

    //Populating the equality constraints
    eqDstId = "semequalityConstraints1"
   
    $(`#${eqDstId}`).children().each(function(index, element) {
            element.remove()
        })
    for (const key in latentVars) {
        latentVars[key].forEach(function(element, index){
            if (!checkIfInASet(key + "->" + element, equalitySetsCtrlsVars))
                populateEqualityConstraint(key, element, eqDstId, "->")
        })
    }

    for (const key in higherOrderFactorsVars) {
        higherOrderFactorsVars[key].forEach(function(element, index){
            if (!checkIfInASet(key + "->" + element, equalitySetsCtrlsVars))
                populateEqualityConstraint(key, element, eqDstId, "->")
        })
    }
    //Populating covariances
    coVarDstId = modalId + "_" + "coVarDst";
    coVarDstVars = []
    coVarDstVars = common.getMultiVal(coVarDstId)
    coVarDstVars.forEach(function(element, index){
        if (!checkIfInASet(element, equalitySetsCtrlsVars))
            populateEqualityConstraint(element, "", eqDstId, "<->")
    })

    //Populating structural parameters
    //Populating covariances
    modelTermsDstId = modalId + "_" + "modelTermsDst";
    modelTermsDstVars = []
    modelTermsDstVars = common.getMultiVal(modelTermsDstId)
    let var1 =""
    let var2=""
    modelTermsDstVars.forEach(function(element, index){
        var2 = element.split("->")[1]
        var1 = element.split("->")[0]
        if (!checkIfInASet(element, equalitySetsCtrlsVars))
            populateEqualityConstraint(var1, var2, eqDstId, "->", true)
    })
}

function checkIfInASet ( entry, equalitySetsCtrlsVars)
{
    retval = false
    for (const key in equalitySetsCtrlsVars) {
        equalitySetsCtrlsVars[key].forEach(function(element, index){
            //Structural equality constraints contain objects to allow us to generate special syntax for structural relationships
            //We need to get to the relationship
            if (typeof(element) == "object")
            {
               element = element ["item"]
            }
            if (element.includes(entry))
            {
                retval = true
                return retval
            }
        })
    }
    return retval
}


//Add an equality constraint term
function populateEqualityConstraint (var1, var2, eqDstId, sign, structuralParameter =false)
{
    let item_id = ""
    let iconType = ""
    let var3Id = ""
    let var3 = ""
    if (sign == "<->")
    {
        iconType = "covariance"
        item_id =  eqDstId 
        var3 =  var1
        var3Id = var1.replace(sign, ".")
        var2 =var1.split("<->")[1]
        var1 =var1.split("<->")[0]
    }  
    if (sign== "->" )
    {
        iconType = "relation"
        item_id =  eqDstId 
        var3 =  var1 + sign + var2
        var3Id = var1 + "_" + var2    
    }
    if (!structuralParameter)
    {
    //firstTerm and secondTerm keep track of original variables so that they can be deleted when the latent variables are removed
    $(`#${eqDstId}`).append(`<a href="#"
                        id="${item_id}_${getActiveDataset()}_${var3Id.replace(/ /g, "_")}"
                        class="list-group-item list-group-item-sm list-group-item-action measure-scale class-numeric"
                        draggable="true"
                        bs-row-type="double"
                        bs-row-class="${iconType}"
                        firstTerm = "${var1}"
                        secondTerm = "${var2}"
                        ondragstart="drag(event, 'move')"
                        bs-row-measure="scale"
                        onclick="selectElement(event)"
                        >${var3}</a>`)
    } else
    {
        $(`#${eqDstId}`).append(`<a href="#"
        id="${item_id}_${getActiveDataset()}_${var3Id.replace(/ /g, "_")}"
        class="list-group-item list-group-item-sm list-group-item-action measure-scale class-numeric"
        draggable="true"
        bs-row-type="double"
        bs-row-class="structuralParameter"
        firstTerm = "${var1}"
        secondTerm = "${var2}"
        structuralParameter = true
        ondragstart="drag(event, 'move')"
        bs-row-measure="scale"
        onclick="selectElement(event)"
        >${var3}</a>`)
    }
}




//Adds the covariance term
function autoPopCovarTerm (var1, var2, modalId)
{
    if (var1 == var2) return
    let var3 = ""
    let iconType = "covariance"
    let destId =   modalId + "_" + "coVarDst";
    var3 =  var1 + "<->" +var2
    let deletedCoVars = []
    //Lets get all the previously deleted covariance terms
    if ( $(`#${destId}`).attr('deletedCoVars') != undefined)
    {
        deletedCoVars = JSON.parse($(`#${destId}`).attr('deletedCoVars'))
    }
    if (deletedCoVars.length == 0)
    {
        //firstTerm and secondTerm keep track of original variables so that they can be deleted when the latent variables are removed
        //the filter function prevents selected items from modelTermsDst (structural parameters) from being moved
        //Every item in modeltermsdst has a class termsDst
        if (!document.getElementById(`${destId}${var1}_${getActiveDataset()}_${var2.replace(/ /g, "_")}`))
        {
            $(`#${destId}`).append(`<a href="#"
            id="${destId}${var1}_${getActiveDataset()}_${var2.replace(/ /g, "_")}"
            class="list-group-item list-group-item-sm list-group-item-action measure-scale class-numeric termsDst"
            bs-row-type="double"
            bs-row-class="${iconType}"
            bs-row-measure="scale"
            firstTerm = "${var1}"
            secondTerm = "${var2}"
            type ="sem"
            onclick="selectModelTerms(event)"
            >${var3}</a>`)
        }
    } else if ( deletedCoVars.indexOf(var3) == -1 )
    //I need the check above as if there are manually deleted covariances, I don't want autopopulation to add manually deleted covariances
    {
        //If it was explicitly previously deleted, lets not add it
        //firstTerm and secondTerm keep track of original variables so that they can be deleted when the latent variables are removed
        // the filter function prevents selected items from modelTermsDst (structural parameters) from being moved
        //Every item in modeltermsdst has a class termsDst
        if (!document.getElementById(`${destId}${var1}_${getActiveDataset()}_${var2.replace(/ /g, "_")}`))
        {
            $(`#${destId}`).append(`<a href="#"
                                id="${destId}${var1}_${getActiveDataset()}_${var2.replace(/ /g, "_")}"
                                class="list-group-item list-group-item-sm list-group-item-action measure-scale class-numeric termsDst"
                                draggable="true"
                                bs-row-type="double"
                                bs-row-class="${iconType}"
                                bs-row-measure="scale"
                                firstTerm = "${var1}"
                                secondTerm = "${var2}"
                                type ="sem"
                                onclick="selectModelTerms(event)"
                                >${var3}</a>`)
        }
    }
}

//This function deletes the old/prior value of a latent or high order factor from 
//1. All the supporting controls 
//2. All the modeltermsDst and covarsTermsDst modelTermsDst, coVarsDst, equalityConstraints, mediationSrcCtrl
//3. All the sem controls to delete from, there are only the semControls

function deletingLatentOrHigher( priorVal, textBoxId, modalId) 
{
    let item_id =""
    let item_name =""
    let suppCtrlVal = []
    let ctrlsToDeleteFrom = []
    //let item = $(`#${modalId}`).find('[suppCtrlIds]')[0]
    var item = $("#"+ textBoxId).closest("div[bs-type='sem']")
    if (item != undefined)
    {
        if ( $(`#${item[0].id}`).attr('suppCtrlIds') != 'undefined')
        {
            suppCtrlVal = JSON.parse($(`#${item[0].id}`).attr('suppCtrlIds'))
        }
        item_name = priorVal
        //Deletes entry from modelTermsDst, coVarsDst, equalityConstraints, mediationSrcCtrl
        deleteItemsFromSupportingCtrls(item_name)
        //Deletes entries from each supporting control
        suppCtrlVal.forEach(function (value)
        {
           if (value == "semSuppCtrl1")
           {
            item_id = modalId +  value
           } else {
            item_id = modalId + "_" + value
           }
           $('#' + item_id + ' a').each(function () {
                //Supporting controls can contain dataset variable names, attr("type") == "sem" ensures that
                //we don't remove dataset variable names that match textbox names
                if ($(this).text() == item_name && $(this).attr("type") == "sem") {
                   $(this).remove()
                }
            });
        })
        // The code below removes deleted latent variables and higher order factor variables from
        //other higher order factor variable and equality constraint target variables
        if ($(`#${item[0].id}`).attr('ctrlsToDeleteFrom') != 'undefined')
        {
             ctrlsToDeleteFrom = JSON.parse($(`#${item[0].id}`).attr('ctrlsToDeleteFrom'))
             ctrlsToDeleteFrom.forEach(function (item, index) {
                 deleteFromSemModelCtrls(item, item_name)
             })
        }      
    }
}







//Invoked when deleting a sem dest ctrl (control that creates latent and high order factor variables), 
//removes all the names from the supporting controls
//Also removes from mediationSrcCtrl, mediationDestCtrl
function removeFromDestCtrl(id, textBoxId, modalId) {
    let item_id =""
    let item_name =""
    let suppCtrlVal = []
    let ctrlsToDeleteFrom = []
    //let item = $(`#${modalId}`).find('[suppCtrlIds]')[0]
    var item = $("#"+id).closest("div[bs-type='sem']")
    if (item != undefined)
    {
        if ( $(`#${item[0].id}`).attr('suppCtrlIds') != 'undefined')
        {
            suppCtrlVal = JSON.parse($(`#${item[0].id}`).attr('suppCtrlIds'))
        }
        item_name = $(`#${textBoxId}`).val();
        //Deletes entry from modelTermsDst, coVarsDst, equalityConstraints, mediationSrcCtrl
        deleteItemsFromSupportingCtrls(item_name)
        //Deletes entries from each supporting control
        suppCtrlVal.forEach(function (value)
        {
           if (value == "semSuppCtrl1")
           {
            item_id = modalId +  value
           } else {
            item_id = modalId + "_" + value
           }
           $('#' + item_id + ' a').each(function () {
                //Supporting controls can contain dataset variable names, attr("type") == "sem" ensures that
                //we don't remove dataset variable names that match textbox names
                if ($(this).text() == item_name && $(this).attr("type") == "sem") {
                   $(this).remove()
                }
            });
        })
        // The code below removes deleted latent variables and higher order factor variables from
        //other higher order factor variable and equality constraint target variables
        if ($(`#${item[0].id}`).attr('ctrlsToDeleteFrom') != 'undefined')
        {
             ctrlsToDeleteFrom = JSON.parse($(`#${item[0].id}`).attr('ctrlsToDeleteFrom'))
             ctrlsToDeleteFrom.forEach(function (item, index) {
                 deleteFromSemModelCtrls(item, item_name)
             })
         }
        //The code below moves all the items from the deleted latent variable e.g. lat1 with x1, x2 and x3
        //back to the source. The variables x1, x2 and x3 cannot be lost
        let ids = []
        let objects = []
        $(`#${id} .list-group-item`).each(function (index, item) {
            if (item.getAttribute("original")) {
              item.innerText = item.getAttribute("original")
              item.removeAttribute("original")
            }
           // deleteItemsFromSupportingCtrls(item.text)
            objects.push(item.outerHTML)
            ids.push(item.id)
        })
       
        //Removes the dest control
        //Also when latent controls are being deleted as we have already deleted the entries and we don't want them automatically populated
        //before the control is completely deleted
        //Code below checks if there are items to be moved to the source before deletion
        if (ids.length != 0)
        {
           //We mode the entries in the deleted control back to the sourde
            $("#" +ids[0].split("_")[0]).attr("bskyState", "deleted")
            _drop(objects, "move", ids, ids[0].split("_")[0])
        }
        $(`#${id}`).remove()
        if (ids.length != 0)
        {
            $("#" +ids[0].split("_")[0]).removeAttr("bskyState")
        }
        autoPopulateCovar()
    }
}
//Function is called when we delete latent variables and higher order factor variables
//Function below removes deleted latent variables and higher order factor variables from higher order variables and equality constraint sets
//mediationDestCtrl and mediationSrcCtrl
function deleteFromSemModelCtrls(semCtrlName, item_name)
{
    if (semCtrlName == "sem2")
    {      
        $("#" + "sem_" + semCtrlName).find("a").each(function () {
            if ($(this).text() == item_name ) {
                    $(this).remove()
            }
        });
    }
    if (semCtrlName == "sem3" || semCtrlName == "mediationDestCtrl" )
    {
        $("#" +  "sem_" + semCtrlName).find("a").each(function () {
            if ($(this).attr("firstTerm") == item_name || $(this).attr("secondTerm") == item_name) {
                $(this).remove()
            }
        });
    }
}

//Function that was a derivative of deleteItemsFromSupportingCtrls that is called when dragging items from a latent or higher order control
//back to the source
//We remove items from modeltermsDst and semmediationSrcCtrl ONLY as we call  to remove items from sem3 (equality constrainsts), mediationDstCtrl
function deleteItemsFromSupportingCtrlsDragDrop (varName)
{
    
    //Removing deleted entries that match the items that the user manually deleted from  coVarsTermsDst
    //NOTE: If you changed the name of a latent variable that you deleted from coVarsTermsDst 
    //we remove that deleted item from deletedCoVars
    let itemsToRemove =[]
    let finalArray = []
    
    //Removing deleted entries that match the items that the user manually added from  coVarsTermsDst
    //NOTE: If you changed the name of a latent variable that you manually added from coVarsTermsDst 
    //we remove that deleted item from manAddedCovar
    
    let modelTermsDstId = "sem_modelTermsDst"
    $('#' + modelTermsDstId + ' a').each(function () {
        if ($(this).attr("firstTerm") == varName || $(this).attr("secondTerm") == varName) {
            $(this).remove()

        }
    });
    
    let mediationSrcCtrlId = "semmediationSrcCtrl"
    $('#' + mediationSrcCtrlId + ' a').each(function () {
        if ($(this).attr("firstTerm") == varName || $(this).attr("secondTerm") == varName) {
            $(this).remove()
        }
    });

}


function deleteFromSemModelCtrlsDragDrop(semCtrlName, textOfDraggedDropped, inputVal)
{
    if (semCtrlName =="sem3")
    {
        $('#' + "sem_sem3" + ' a').each(function () {
            if ($(this).text()  == inputVal+ "->" + textOfDraggedDropped) {
                $(this).remove()
            //if ($(this).attr("firstTerm") == varName || $(this).attr("secondTerm") == varName) {
            //      $(this).remove()
            }
        });
    }
}


//function that deletes items from modelTermsDst, coVarDst, equalityConstraints1
function deleteItemsFromSupportingCtrls (varName)
{
    let coVarDstId = "sem_coVarDst"
    let deletedCoVars =[]
    $('#' + coVarDstId + ' a').each(function () {
        if ($(this).attr("firstTerm") == varName || $(this).attr("secondTerm") == varName) {
            $(this).remove()
        }
    });
    //Removing deleted entries that match the items that the user manually deleted from  coVarsTermsDst
    //NOTE: If you changed the name of a latent variable that you deleted from coVarsTermsDst 
    //we remove that deleted item from deletedCoVars
    let itemsToRemove =[]
    let finalArray = []
    if ( $(`#${coVarDstId}`).attr('deletedCoVars') != undefined)
    {
        itemsToRemove =[]
        deletedCoVars = JSON.parse($(`#${coVarDstId}`).attr('deletedCoVars'))
        deletedCoVars.forEach(function (element, index) {
            let firstTerm = element.split("<->")[0]
            let secondTerm = element.split("<->")[1]
            if (varName == firstTerm || varName == secondTerm)
            {
                itemsToRemove.push(element)
            }
        })
        finalArray = []
        finalArray =removeElementsFromArray(deletedCoVars, itemsToRemove);
        //Now we have to handle when finalArray returns []
        //We don't want to convert this to a string as when we try and parse "[]", the parse fails
        if (finalArray.length ==0)
        {
            $(`#${coVarDstId}`).removeAttr('deletedCoVars')
        } else{
            $(`#${coVarDstId}`).attr('deletedCoVars', JSON.stringify(finalArray))
        }
    }
    //Removing deleted entries that match the items that the user manually added from  coVarsTermsDst
    //NOTE: If you changed the name of a latent variable that you manually added from coVarsTermsDst 
    //we remove that deleted item from manAddedCovar
    if ( $(`#${coVarDstId}`).attr('manAddedCovar') != undefined)
    {
        itemsToRemove =[]
        manAddedCovar = JSON.parse($(`#${coVarDstId}`).attr('manAddedCovar'))
        manAddedCovar.forEach(function (element, index) {
            let firstTerm = element.split("<->")[0]
            let secondTerm = element.split("<->")[1]
            if (varName == firstTerm || varName == secondTerm)
            {
                itemsToRemove.push(element)
            }
        })
        finalArray = []
        finalArray = removeElementsFromArray(manAddedCovar, itemsToRemove);
        //Now we have to handle when finalArray returns []
        //We don't want to convert this to a string as when we try and parse "[]", the parse fails
        if (finalArray.length ==0)
        {
            $(`#${coVarDstId}`).removeAttr('manAddedCovar')
        } else{
            $(`#${coVarDstId}`).attr('manAddedCovar', JSON.stringify(finalArray))
        }
    }

    let modelTermsDstId = "sem_modelTermsDst"
    $('#' + modelTermsDstId + ' a').each(function () {
        if ($(this).attr("firstTerm") == varName || $(this).attr("secondTerm") == varName) {
            $(this).remove()

        }
    });
    let equalityConstraintsId = "semequalityConstraints1"
    $('#' + equalityConstraintsId + ' a').each(function () {
        if ($(this).attr("firstTerm") == varName || $(this).attr("secondTerm") == varName) {
            $(this).remove()
        }
    });
    let mediationSrcCtrlId = "semmediationSrcCtrl"
    $('#' + mediationSrcCtrlId + ' a').each(function () {
        if ($(this).attr("firstTerm") == varName || $(this).attr("secondTerm") == varName) {
            $(this).remove()
        }
    });

}
// remove elements from one array that are in another
//remove duplicates
function removeElementsFromArray(arr1, arr2) {
  // Use the filter() method to create a new array that includes only elements
  // from arr1 that are not present in arr2
  const result = arr1.filter(item => !arr2.includes(item));
  return result;
}


function stringToRCharacterArray(independentVars) {
    let rCharacterArray = ""
    if (independentVars.includes(",")) {
        let vars3 = independentVars.split(",");
        let vars4 = vars3.map(vars3 => '\"' + vars3.trim() + "\"");
        rCharacterArray = "c(" + vars4.join(",") + ")";
    }
    else {
        rCharacterArray = "\"" + independentVars + "\"";
    }
    return rCharacterArray
}

function extractBeforeLastUnderscore(inputString) {
    const lastUnderscoreIndex = inputString.lastIndexOf('_');
    if (lastUnderscoreIndex !== -1) {
      const extractedPart = inputString.substring(0, lastUnderscoreIndex);
      return extractedPart;
    } else {
      return inputString; // No underscore found, return the original string
    }
  }

function addToModelTermsDest( ctrl1Id, ctrl2Id, destId  )
{
    let t = utilityGetT('menutoolbar')
    //suppCtrlAddIds = JSON.parse(suppCtrlAddIds)
    //ctrlsToDeleteFrom = JSON.parse($(`#${item[0].id}`).attr('ctrlsToDeleteFrom'))
    let headerText1 =""
    let headerText2 =""
    let suppCtrlAddIds = []
    if ($(`#${destId}`).attr('suppCtrlAddIds') != undefined)
        suppCtrlAddIds= JSON.parse($(`#${destId}`).attr('suppCtrlAddIds'))
    //  suppCtrlDeleteIds =$(`#${destId}`).attr('suppCtrlDeleteIds')
    let var1 =$(`#${ctrl1Id} .list-group-item-action.active`).text()  
    let var2 =$(`#${ctrl2Id} .list-group-item-action.active`).text()
    if (var1 =="" && var2 =="" )
    {
        headerText1 =$(`#${ctrl1Id}`).siblings().text()
        headerText2 =$(`#${ctrl2Id}`).siblings().text()
        dialog.showMessageBoxSync({ type: "error", buttons: ["OK"], title: t('handlerRulVoiTitle3'), message: `${t('utilityRulVoiMsg5')} "${headerText1}" ${t('utilityRulVoiMsg6')} "${headerText2}" ${t('utilityRulVoiMsg7')}` })
        return
    }
    if (var1 == var2 && $(`#${destId}`).attr("mapSameDataset")!="true")
    {
        headerText1 =$(`#${ctrl1Id}`).siblings().text()
        headerText2 =$(`#${ctrl2Id}`).siblings().text()
        dialog.showMessageBoxSync({ type: "error", buttons: ["OK"], title: t('handlerRulVoiTitle3'), message: `${t('utilityRulVoiMsg8')} "${headerText1}" ${t('utilityRulVoiMsg6')} "${headerText2}" . ${t('utilityRulVoiMsg9')}` })
        return
    }

   
    if (var1 =="" )
    {
        headerText1 =$(`#${ctrl1Id}`).siblings().text()
        dialog.showMessageBoxSync({ type: "error", buttons: ["OK"], title: t('handlerRulVoiTitle3'), message: `${t('utilityRulVoiMsg5')} "${headerText1}" ${t('utilityRulVoiMsg10')}` })
        return
    }
    if (var2 =="" )
    {
        headerText2 =$(`#${ctrl2Id}`).siblings().text()
        dialog.showMessageBoxSync({ type: "error", buttons: ["OK"], title: t('handlerRulVoiTitle3'), message: `${t('utilityRulVoiMsg5')} "${headerText2}" ${t('utilityRulVoiMsg10')}` })
        return
    }
    let var3 = ""
    let iconType =""
    let extractionRule = $(`#${destId}`).attr('extractionRule')
    if (extractionRule =="modelTerms")
    {
        var3 =  var1 + "->" +var2
        iconType = "relation"
    }
    else {
        var3 =  var1 + "<->" +var2
        iconType = "covariance"
    }
    //removing the current selection
    $(`#${destId} .list-group-item-action.active`).removeClass("active");


    //Checking if the reverse relationship exists, i.e. I am adding C->A but I already added A->C
    //In the structural parameters, I cannot have 2 relationships with different directions between the same variables
    if ($(`#${destId}`).find(`#${destId}_${var2.replace(/\./g, "\\.")}_${getActiveDataset()}_${var1.replace(/ /g, "_").replace(/\./g, "\\.")}`).length > 0)
    {
        headerText2 =$(`#${ctrl2Id}`).siblings().text()
        dialog.showMessageBoxSync({ type: "error", buttons: ["OK"], title: t('handlerRulVoiTitle3'), message: `${t('utilityRulVoiMsg11')} "${var1}" ${t('utilityRulVoiMsg6')} "${var2}". ${t('utilityRulVoiMsg12')}` })
        return
    }

    // Checking if the item is already added
    if ($(`#${destId}`).find(`#${destId}_${var1.replace(/\./g, "\\.")}_${getActiveDataset()}_${var2.replace(/ /g, "_").replace(/\./g, "\\.")}`).length == 0)
    {
        //firstTerm and secondTerm keep track of original variables so that they can be deleted when the latent variables are removed
        //the filter function prevents selected items from modelTermsDst (structural parameters) from being moved
        //Every item in modeltermsdst has a class termsDst
        //selectModelTerms ensures at the class active gets added to selected items in the structural parameters and coVarsDst in production mode
        $(`#${destId}`).append(`<a href="#"
                    id="${destId}_${var1}_${getActiveDataset()}_${var2.replace(/ /g, "_")}"
                    class="list-group-item list-group-item-sm list-group-item-action measure-scale class-numeric active termsDst"
                    bs-row-type="double"
                    bs-row-class="${iconType}"
                    bs-row-measure="scale"
                    type ="sem"
                    firstTerm = "${var1}"
                    secondTerm = "${var2}"
                    onclick="selectModelTerms(event)"
                    >${var3}</a>`)
        
        //We want to keep track of the manually added covariances
        if (extractionRule == "coVariances")
        {
            let manAddedCovar =[]
            if ($(`#${destId}`).attr('manAddedCovar') != undefined)
            {
                manAddedCovar = JSON.parse($(`#${destId}`).attr('manAddedCovar'))
                if (manAddedCovar.indexOf(var3) ==-1)
                {
                    manAddedCovar.push(var3)
                } 
            }
            else manAddedCovar.push(var3)
            $(`#${destId}`).attr('manAddedCovar', JSON.stringify(manAddedCovar))          
        }

        //We I an adding a covariance term that was previously deleted, I want to remove the deletetion entry
        //Basically I am no longer going to suppress the syntax 
        if (destId == "sem_coVarDst")
        {
            if ( $(`#${destId}`).attr('deletedCoVars') != undefined)
            {
                deletedCoVars = JSON.parse($(`#${destId}`).attr('deletedCoVars'))
                //If the item I am adding was previously deleted, I remove the deleted entry  
                if ( deletedCoVars.indexOf(var3) != -1)
                {
                    //deletedCoVars.push(itemsToDelete)
                    deletedCoVars = deletedCoVars.filter(item => item !== var3);
                    if (deletedCoVars.length > 0)
                        $(`#${destId}`).attr('deletedCoVars', JSON.stringify(deletedCoVars))
                    else
                        $(`#${destId}`).removeAttr('deletedCoVars')
                }
            }
        } 
        if (extractionRule == "modelTerms")
        {          
            //Populating the mediationSrcCtrl 
            //We populate this control with all the elements added to structural parameters
            suppCtrlAddIds.forEach(function(element){
                if ($(`#sem${element}`).find(`#sem${element}_${getActiveDataset()}_${var1.replace(/\./g, "\\.")}${var2.replace(/ /g, "_").replace(/\./g, "\\.")}`).length == 0)
                {
                    $(`#sem${element}`).append(`<a href="#"
                    id="sem${element}_${getActiveDataset()}_${var1}${var2.replace(/ /g, "_")}"
                    class="list-group-item list-group-item-sm list-group-item-action measure-scale class-numeric"
                    draggable="true"
                    bs-row-type="double"
                    bs-row-class="semFactor"
                    bs-row-measure="scale"
                    type ="sem"
                    firstTerm = "${var1}"
                    secondTerm = "${var2}"
                    ondragstart="drag(event, 'move')"
                    ondrop="drop(event)" 
                    onclick="selectElement(event)"            
                    >${var3}</a>`)
                }
            })
            let autoPopCovarId =  "sem" + "_" + "autoComputeCovar"
            let autoPopCovarState = $(`#${autoPopCovarId}`).prop('checked');
            if (autoPopCovarState)
            {
                autoPopulateCovar()
            }
        }
        populateEqualityConstraints()
    }
    else
    {
        //Setting active class if the item is already added
        $(`#${destId}`).find(`#${destId}_${var1.replace(/\./g, "\\.")}_${getActiveDataset()}_${var2.replace(/ /g, "_").replace(/\./g, "\\.")}`).addClass("active")
    }  
}
//When you delete items from modelTermsDst, they need to be removed from the source and destination mediation controls
function removeFromModelTermsDest( ctrl  , modalId )
{
    let deletedCoVars =[]
    let itemsToDelete = ""
    itemsToDelete = $(`#${ctrl} .list-group-item-action.active`).text()
    if (ctrl == "sem_coVarDst")
    {
       if ( $(`#${ctrl}`).attr('deletedCoVars') != undefined)
        {
            deletedCoVars = JSON.parse($(`#${ctrl}`).attr('deletedCoVars'))
        }
        
        if ( deletedCoVars.indexOf(itemsToDelete) == -1)
        {
            deletedCoVars.push(itemsToDelete)
        }
        $(`#${ctrl}`).attr('deletedCoVars', JSON.stringify(deletedCoVars))
    }   else
    {
        //As I am deleting from structural parameters, its difficult to keep track of how to account
        //for deleted covariances, hence I just reinitialize this
        $(`#sem_coVarDst`).removeAttr('deletedCoVars')
        $(`#sem_coVarDst`).removeAttr('manAddedCovar')
    }

    let suppctrldeleteids = []
    if ($(`#${ctrl}`).attr('suppctrldeleteids') != undefined)
        suppctrldeleteids =JSON.parse($(`#${ctrl}`).attr('suppctrldeleteids'))
    suppctrldeleteids.forEach(function(element)
    {
        if (element =="mediationSrcCtrl")
        {
        $('#' + "sem"+ element + ' a').each(function () {
           // if ($(this).attr("firstTerm") == varName || $(this).attr("secondTerm") == varName) {
            if ($(this).text() == itemsToDelete)
                $(this).remove()
            });
        } else if (element =="mediationDestCtrl")
        {
            $("#" +  "sem_" + element).find("a").each(function () {
                if ($(this).text() == itemsToDelete)
                    $(this).remove()
            });
        }
    })

    $(`#${ctrl} .list-group-item-action.active`).remove();
    //When deleting from the covarances, we don't have to populate them
    if (ctrl != "sem_coVarDst")
    {
        autoPopulateCovar()
    }
    populateEqualityConstraints()
}

function deepCopy(obj) {
    if (obj === null || typeof obj !== 'object') {
      return obj; // Return non-object types as is
    }
  
    if (Array.isArray(obj)) {
      // If it's an array, create a new array and deep copy each element
      return obj.map(deepCopy);
    }
  
    // If it's an object, create a new object and deep copy each property
    const newObj = {};
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        newObj[key] = deepCopy(obj[key]);
      }
    }
  
    return newObj;
  }

module.exports = {
    extractBeforeLastUnderscore,
    removenewline,
    getVariablesInMixedModel,
    getNoOFFactorVariablesInFixedEffectsRandomEffects,
    listOfAll2WayInteractions,
    listOfAllNWayInteractions,
    getFixedEffectsandCovariates,
    checkSingleDepVar,
    createfacets,
    stringWithFacetsForPlotOfMeans,
    addToFactorList,
    removeFromList,
    addToMeasureList,
    getFromMeasureList,
    createRepeatedMeasures,
    hasWritePermission,
    createEndoExoVariables,
    checkNames,
    checkDuplicateNames,
    actionOnCreateLatentVarHighorderVar,
    autoPopulateCovar,
    populateEqualityConstraints,
    checkIfInASet,
    populateEqualityConstraint,
    autoPopCovarTerm,
    deletingLatentOrHigher,
    removeFromDestCtrl,
    deleteFromSemModelCtrls,
    deleteItemsFromSupportingCtrlsDragDrop,
    deleteFromSemModelCtrlsDragDrop,
    deleteItemsFromSupportingCtrls,
    removeElementsFromArray,
    stringToRCharacterArray,
    addToModelTermsDest,
    removeFromModelTermsDest,
    deepCopy,
    fetchAllColumnAttributes
};
