var Sqrl = require('squirrelly');

calls_map = {
    "single": getSingleVal,
    "list": getMultiVal,
    "simpleMeasureList": getFromMeasureList,
    "simpleFactorList" : getFromFactorList,
    "radio": getRadioVal,
    "checkbox": getCheckBoxVal,
    "valuebox": getValueBoxVal,
    "tab": getTabVal,
    "text": getTextVal,
    "file": getTextVal,
    "numeric": getTextVal,
    "character": getTextVal,
    "slider": getTextVal,
    "combobox": getComboValue,
    "select": getSelectValue,
    "wrapcontrol": getWrapControl,
    "switchcase": getSwitchCase,
    "label": getHTMLVal,
    "joinMapping": getJoinMapping,
    "advTxt": getAdvTxt,
    "sem": getSem,
   "semModelTermsDest":getSemModelTerms
}

function getVal(id){
    return calls_map[$(`#${id}`).attr("bs-type")](id);
}

function getSemModelTerms(id)
{
    getSingleVal(id)
}


function getSem(id)
{
    let results = {}
    let textContents =""
    let dstVarContents =""
    $(`#${id}`).find('.list-group1').each(function (index, item) {
        textContents =$(`#${item.id}`).find('input').val()
        dstVarContents = getMultiVal($(`#${item.id}`).find('.list-group').attr('id'))
        results [textContents] = dstVarContents
    })
    return results
}

function getHTMLVal(id) {
    return $(`#${id}`).html();
}

function getFromMeasureList( id) {
    let res =[];
    let ul = document.getElementById(id).getElementsByTagName('li');    
    ul.forEach(function (value) {
        res.push(value.innerHTML);
    })
    return res;
}

function getAdvTxt(id) {
    let res=[];
    let textBoxValue = $(`#${id}`).children().find('div[bs-type="advancedTextBox"] .CodeMirror')
    res.push(textBoxValue[0].CodeMirror.getValue())
    return (res)
}

function getSwitchCase(id) {
    var if_elements = $(`#${this.id}`).children().find('div[bs-type="switchif"] .CodeMirror')
    var then_elements = $(`#${this.id}`).children().find('div[bs-type="switchthen"] .CodeMirror')
    var else_elements = $(`#${this.id}`).children().find('div[bs-type="switchelse"] .CodeMirror')
    var res = []
    let temp = ""
    let closingBracket = ")"
    for (var i = 0 ; i < if_elements.length; i ++) {
            temp = temp + "\n\tifelse(" + if_elements[i].CodeMirror.getValue() + "," + then_elements[i].CodeMirror.getValue() + ","
    }
    if (else_elements[0] !=undefined) {
            temp += else_elements[0].CodeMirror.getValue()
    } else {
        temp += "NA"
    }
    temp = temp + closingBracket.repeat(i)
    return temp
}

function getWrapControl(id){
    var objects = getMultiVal(id)
    var counts = getValueBoxVal(`${id}_checkbox`)
    var variables = getTextVal(`${id}_input`).split(",")
    if (variables[0] === "") {
        variables = []
        if (counts) {
            variables.push("Count");
        }
        $(`#${id} a`).each(function(index, item) {
            variables.push(`${item.getAttribute("aggregation")}_${item.getAttribute("original")}`);
        });
    }
    var val = ""
    if (counts) {
        val += `${variables[0]}=${counts},`
        variables = variables.slice(1)
    }
    variables.forEach((item, index) => {
        val+=`${item}=${objects[index]},`
    })
    return val.slice(0, -1);
}

function getRadioVal(id){
    var name = $(`#${id}`).attr("name");
    if ($(`input[name=${name}]:checked`)[0].hasAttribute('syntax')) {
        syntax =  $(`input[name=${name}]:checked`).attr("syntax");
        return Sqrl.Render(syntax, {dataset: {name: getActiveDataset()}})
    }
    return $(`input[name=${name}]:checked`).val();
}

function getCheckBoxVal(id){
    return $(`#${id}`).prop("checked");
}

function getValueBoxVal(id){
    if (getCheckBoxVal(id)) {
        return $(`#${id}`).attr("true-value");
    } else {
        return $(`#${id}`).attr("false-value");
    }
}

function getTextVal(id){
    return $(`#${id}`).val();
}

function getSingleVal(id) {
    var elements=[];
    $(`#${id} a`).each(function(index, item) {
        elements.push(item.text);
    });
    return elements
}

function getTabVal(id) {
    return {
        "index": parseInt($(`#${id} li a.active`)[0].getAttribute(`el-index`)), 
        "group": $(`#${id} li a.active`)[0].getAttribute(`el-group`),
        "r": $(`#${id} li a.active`)[0].getAttribute(`r-value`)
    }
}

function getMultiVal(id) {
    return getSingleVal(id)
}

function getCheckedRadio(group) {
    return $(`input[name=${group}]:checked`).val();
}

function getComboValue(id) {
    var res = []
    if ($(`#${id}`).siblings("ul").length !== 0){
        $($(`#${id}`).siblings()[0]).find(".list-group-item.active").each(
            function(index, item){
                res.push(item.getAttribute("data-value"))
            })
    } else {
        res = [$(`#${id}`).val()]
    }
    return res
}


function getSelectValue(id) {
    var res = []
    res = $(`#${id}`).val()
    // res in null when the control is empty
    if (res != null) {
        if (res.length == 1) {
            return res[0]
        } else {
            return res
        }
    }
    else {
    //we return an empty string so that the call this.getVal().length does not create an exception 
    return "";
    }
}

function transform(val, rule, id) {
    var type=typeof(val); 
    let parameterCount =0
    // UseComma is default   
    var separator  = ','; 
    //Checking separator
    var finalRetString ="";
    if (rule.includes("UsePlus")) {
        separator = "+";
    } 
    let value;
    let res =[];
    let item;
    let retval;
    let tempretval =""
    let modalDiv =""
    let parameterizeFormulaChk;
    let parameterizeFormulaChkId;

    // Checking if value Enclosed
    if (rule.includes("Enclosed")) {
        // Enclosed is surrounded by '
        item = `'{{item | safe}}'`;
    } else {
        item = '{{item | safe}}';
    }
    if (rule =="modelTerms")
    {     
        modalDiv =$(`#${id}`).closest('[parameterCount]')
        parameterCount = $(`#${modalDiv[0].id}`).attr('parameterCount')
        parameterizeFormulaChkId = $(`#${modalDiv[0].id}`).find('[parameterizeFormula]')[0].id
        parameterizeFormulaChk = $(`#${parameterizeFormulaChkId}`).prop('checked');
        finalRetString =""
        val.forEach(function(element, index) {
            let myArray = element.split("->");
            if (parameterizeFormulaChk)
            {        
                parameterString = "p" + parameterCount
                finalRetString = finalRetString + myArray[1] + " " + "~" + " " + parameterString + "*" + myArray[0] +"\n"
                parameterCount = parseInt(parameterCount ) +1 
            }
            else
            {
                finalRetString = finalRetString + myArray[1] + "~" +  myArray[0] +"\n"
            }
           //finalRetString = finalRetString + myArray[1] + "~" +  myArray[0] +"\n"
        })
        $(`#${modalDiv[0].id}`).attr('parameterCount', parameterCount)
        return finalRetString
    }
    if (rule =="coVariances")
    {     
        //Get the modal
        modalDiv  =$(`#${id}`).closest('[parameterCount]')
        //Get the setting on the checkbox to check whether syntax should be parameterized or not
        parameterizeFormulaChkId = $(`#${modalDiv[0].id}`).find('[parameterizeFormula]')[0].id
        parameterizeFormulaChk = $(`#${parameterizeFormulaChkId}`).prop('checked');
        //Get the parameter count
        parameterCount = $(`#${modalDiv[0].id}`).attr('parameterCount')
        finalRetString =""
        val.forEach(function(element, index) {
            let myArray = element.split("<->");
            if (parameterizeFormulaChk)
            {
                parameterString = "p" + parameterCount
                finalRetString = finalRetString + myArray[1] + " " +  "~~" + " "+ parameterString + "*" + myArray[0] +"\n"
                parameterCount = parseInt(parameterCount ) +1 
            }
            else
            {
                finalRetString = finalRetString + myArray[1] + "~~" +  myArray[0] +"\n"
            }
        })  
        //Save the parameter count
        $(`#${modalDiv[0].id}`).attr('parameterCount', parameterCount)    
        return finalRetString
    }
    //This supports the removal of spaces in a textbox
    //This was added as users were enter multiple R package names to install by specifying foreign, car and it was failing as
    //we were looking for a package name " car"
    if (rule.includes("RemoveSpaces")) {
        // Enclosed is surrounded by '
        val = val.replace(/\s+/g, '');
    } 
    // Checking how to represent value
    // TextAsIs is equal to NoPrefix
    if ((rule.includes("Prefix") && !rule.includes("NoPrefix")) || rule.includes("PrefixByDatasetName")) {
        value = `${getActiveDataset()}\${{item | safe}}`;
    } else if (rule.includes("CustomFormat")) {
        value = `{{item | safe}} = ${getActiveDataset()}\${{item | safe}}`;
    } else if (rule.includes("CreateArray")){ 
        // this one is strange it basically split string 
        // by comma and create array out of it
        val = val.split(",");
        subitem = `'{{item | safe}}'`;
        val.forEach(function(el, index) {
            val[index] = Sqrl.Render(subitem, {item: el});
        })
        val = val.join(separator);
        value = `c({{item | safe}})`;
    } else {  
        // This is TextAsIs and NoPrefix
        value = `{{item | safe}}`;
    }
    if (type === 'object' && Array.isArray(val)) {
          val.forEach(function(element, index) {
              val[index] = Sqrl.Render(value, {item: Sqrl.Render(item, {item: element})});
          })
          retval = val.join(separator);
    } else if (type === 'object' && !Array.isArray(val)) {   
        value = `{{item | safe}}`;
        //Get the modal
        modalDiv  =$(`#${id}`).closest('[parameterCount]')
        //Get the setting on the checkbox to check whether syntax should be parameterized or not
        parameterizeFormulaChkId = $(`#${modalDiv[0].id}`).find('[parameterizeFormula]')[0].id
        parameterizeFormulaChk = $(`#${parameterizeFormulaChkId}`).prop('checked');
        //Get the parameter count
        parameterCount = $(`#${modalDiv[0].id}`).attr('parameterCount')
        parameterString = "p" + parameterCount
        finalRetString =""
        Object.keys(val).forEach(function (key, index) {
            val[key].forEach(function(element, index) {
                if (parameterizeFormulaChk)
                {
                    res[index] = parameterString + "*" + Sqrl.Render(value, {item: Sqrl.Render(item, {item: element})});
                    parameterCount = parseInt(parameterCount ) + 1 
                    parameterString = "p" + parameterCount
                }
                else
                {
                    res[index] = Sqrl.Render(value, {item: Sqrl.Render(item, {item: element})});
                }
            })
            tempretval = res.join(separator);
            val[key] = tempretval
            //Save the parameter count
             $(`#${modalDiv[0].id}`).attr('parameterCount', parameterCount)   
            finalRetString = finalRetString + key + "=~" + tempretval +"\n"
        })
        //finalRetString = finalRetString.replace(/\n$/, '');
        //retval = JSON.stringify(val)
        //finalRetString = "'" + finalRetString + "'\n";
        return finalRetString
    } 
    else if (type === "string") {
        retval = Sqrl.Render(value, {item: Sqrl.Render(item, {item: val})});
    } else if (type === "boolean") {
        retval = val.toString().toUpperCase();
    }
    return retval
}


function getFromFactorList(id) {
    let res =[];
    let str =""
    let ul = document.getElementById(id).getElementsByTagName('li');    
    ul.forEach(function (value) {
        str = value.innerHTML
        str =str.substring(0, str.indexOf("("));
        res.push(str);
    })
    return res;
}

function getJoinMapping( id) {
    let res =[];
    let ul = document.getElementById(id).getElementsByTagName('li');   
    ul.forEach(function (value) {
        res.push(value.getAttribute('pasteString'));
    })
    return res;
}

module.exports = { 
    getVal: getVal,
    getCheckedRadio: getCheckedRadio,
    transform: transform,
    getSemModelTerms: getSemModelTerms,
    getMultiVal:getMultiVal
  }