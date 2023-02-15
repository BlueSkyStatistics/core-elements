const { ipcRenderer, dialog } = require('electron')
const common = require('./common')
var handlers = require('./handlers')
var modal = require('./modal').element
var srcDataSetList = require('./srcDataSetList').element
var srcVariableList = require('./srcVariableList').element
var dstVariableList = require('./dstVariableList').element
var dstVariable = require('./dstVariable').element
var checkbox = require('./checkBox').element
var labelVar = require('./label').element
var input = require('./inputVariable').element 
var radioButton = require('./radioButton').element
var comboBox = require('./comboBox').element
var comboBoxWithChilderen = require('./comboBoxWithChilderen').element
var inputSpinner = require('./inputSpinner').element
var advancedSlider = require('./advancedSliderVariable').element
var wrapControl = require('./wrapControl').element
var computeBuilder = require('./computeBuilder').element
var formulaBuilder = require('./formulaBuilder').element
var labelHelp = require('./labelHelp').element
var optionsVar = require("./options").element
var preVar = require("./pre").element
var selectVar = require("./select").element
var sliderVariable = require("./sliderVariable").element
var tabsView = require('./tabs').element
var switchCase = require('./switchCase').element
var repMeasuresCTRL = require('./repMeasuresCtrl').element
var colorInput = require('./colorPicker').element
var fileOpenControl = require('./fileOpenControl').element
var fileSaveControl = require('./fileSaveControl').element
var labelHelpSixSigma = require('./labelHelpSixSigma').element
var selectDataset = require('./selectDataset').element
var mergeJoin = require('./mergeJoin').element
var OutputOpt = require('./settingsOptions').OutputOpt
var OutputTblOpt = require('./settingsOptions').OutputTblOpt
var MiscOpt = require('./settingsOptions').MiscOpt
var DatabaseOpt = require('./settingsOptions').DatabaseOpt
var SaveAppSettings = require('./settingsOptions').SaveAppSettings


const sessionStore = new Store({name:`constants`});
if (sessionStore.get("appVersion") == "10.2.1" || sessionStore.get("appVersion") == undefined) {
    var restart_required = false
    var modules = JSON.parse(fs.readFileSync(path.join(sessionStore.get("appRoot").replace("app.asar", ""), "modules.json"), 'utf8'))
    for (var i=0; i < modules.core.length; i++) {
        if (modules.core[i].update == "auto") {
            modules.core[i].update = "manual"
            restart_required = true;
        }
    }
    for (var i=0; i < modules.extentions.length; i++) {
        if (modules.extentions[i].update == "auto") {
            modules.extentions[i].update = "manual"
            restart_required = true
        }
    }
    for (var i=0; i < modules.dialogs.length; i++) {
        if (modules.dialogs[i].update == "auto") {
            modules.dialogs[i].update = "manual"
            restart_required = true
        }
    }
    try{
        if (restart_required) {
            fs.writeFileSync(store.get("modulespath"), JSON.stringify(modules, null, 4), 'utf8')
            ipcRenderer.invoke("restart-app")
        }
    } catch (err) {
        
    }
    
}


module.exports = {
    "drag": handlers.drag,
    "drop": handlers.drop,
    "allowDrop": handlers.allowDrop,
    "attachActionToMoveArrow": handlers.attachActionToMoveArrow,
    "moveToSrc": handlers.moveToSrc,
    "modeToDst": handlers.moveToDst,
    "arrangeFocus": handlers.arrangeFocus,
    "toFormula": handlers.toFormula,
    "toFocusedInput": handlers.toFocusedInput,
    "dropWrapped": handlers.dropWrapped,
    "dropToInputAditive": handlers.dropToInputAditive,
    "dropToInput": handlers.dropToInput,
    "createCMFromTestArea": handlers.createCMFromTestArea,
    "addRowToSwitchCase": handlers.addRowToSwitchCase,
    "addElseToSwitchCase": handlers.addElseToSwitchCase,
    "toggleFormulaButtonOff": handlers.toggleFormulaButtonOff,
    "toggleButton": handlers.toggleButton,
    "toggleSelect": handlers.toggleSelect,
    "toggleSelectPoly": handlers.toggleSelectPoly,
    "selectElement": handlers.selectElement,
    "enablyStickyDivs": handlers.enablyStickyDivs,
    "disableStickyDivs": handlers.disableStickyDivs,
    "r_before_modal": handlers.r_before_modal,
    "r_on_select": handlers.r_on_select,
    "populateVariablesOfDataset":handlers.populateVariablesOfDataset,
    "addToJoin":handlers.addToJoin,
    "updateModalHandler": handlers.updateModalHandler,
    "renderChild": handlers.renderChild,
    "renderDependants": handlers.renderDependants,
    "toFocusedInput": handlers.toFocusedInput,
    "changeRadio": handlers.changeRadio,
    "changeCheckBox": handlers.changeCheckBox,
    "resetComputeBuilderButtons": handlers.resetComputeBuilderButtons,
    "removeSwitchCase": handlers.removeSwitchCase,
    "dropToTextArea": handlers.dropToTextArea,
    "openFileControlDialog": handlers.openFileControlDialog,
    "saveFileControlDialog": handlers.saveFileControlDialog,
    "common": common,
    "modal": modal,
    "srcVariableList": srcVariableList,
    "dstVariableList": dstVariableList,
    "dstVariable": dstVariable,
    "checkbox": checkbox,
    "labelVar": labelVar,
    "input": input,
    "radioButton": radioButton,
    "comboBox": comboBox,
    "comboBoxWithChilderen": comboBoxWithChilderen,
    "inputSpinner": inputSpinner,
    "advancedSlider": advancedSlider,
    "wrapControl": wrapControl,
    "computeBuilder": computeBuilder,
    "formulaBuilder": formulaBuilder,
    "labelHelp": labelHelp,
    "optionsVar": optionsVar,
    "preVar": preVar,
    "selectVar": selectVar,
    "sliderVariable": sliderVariable,
    "srcDataSetList": srcDataSetList,
    "tabsView": tabsView,
    "switchCase": switchCase,
    "repMeasuresCTRL":repMeasuresCTRL,
    "colorInput":colorInput,
    "fileOpenControl": fileOpenControl,
    "fileSaveControl": fileSaveControl,
    "labelHelpSixSigma": labelHelpSixSigma,
    "selectDataset": selectDataset,
    "mergeJoin":mergeJoin,
    "OutputOpt": OutputOpt,
    "OutputTblOpt": OutputTblOpt,
    "MiscOpt": MiscOpt,
    "DatabaseOpt": DatabaseOpt,
    "SaveAppSettings": SaveAppSettings,
    "selectElementMergeDatasets": handlers.selectElementMergeDatasets,
    "addToJoin" : handlers.addToJoin,
    "removeFromJoin" : handlers.removeFromJoin,
    "selectForDeletionMergeDatasets": handlers.selectForDeletionMergeDatasets,
    "selectListItem":handlers.selectListItem,
    
}
