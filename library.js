/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */

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
var RLocaleOpt = require('./settingsOptions').RLocaleOpt
var DatabaseOpt = require('./settingsOptions').DatabaseOpt
var SaveAppSettings = require('./settingsOptions').SaveAppSettings
var advancedTextBox = require('./advancedTextBox').element
var semControl = require('./semControl').element
var semSuppCtrl = require('./semSuppCtrl').element
var semModelTerms = require('./semModelTerms').element
var semModelTermsDest = require('./semModelTermsDest').element
var equalityConstraints = require('./equalityConstraints').element
var reRunDatasetList = require('./reRunDatasetList').element
var srcDataSetListForRerun =require('./srcDataSetListForRerun').element








module.exports = {
    "drag": handlers.drag,
    "drop": handlers.drop,
    "_drop": handlers._drop,
    "allowDrop": handlers.allowDrop,
    "attachActionToMoveArrow": handlers.attachActionToMoveArrow,
    "moveToSrc": handlers.moveToSrc,
    "moveToDst": handlers.moveToDst,
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
    "selectModelTerms": handlers.selectModelTerms,
    "enablyStickyDivs": handlers.enablyStickyDivs,
    "disableStickyDivs": handlers.disableStickyDivs,
    "r_before_modal": handlers.r_before_modal,
    "r_on_select": handlers.r_on_select,
    "populateVariablesOfDataset":handlers.populateVariablesOfDataset,
    "addToJoin":handlers.addToJoin,
    "updateModalHandler": handlers.updateModalHandler,
    "rconsole_autocompleteHandler":handlers.rconsole_autocompleteHandler,
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
    "RLocaleOpt": RLocaleOpt,
    "DatabaseOpt": DatabaseOpt,
    "SaveAppSettings": SaveAppSettings,
    "selectElementMergeDatasets": handlers.selectElementMergeDatasets,
    "addToJoin" : handlers.addToJoin,
    "removeFromJoin" : handlers.removeFromJoin,
    "selectForDeletionMergeDatasets": handlers.selectForDeletionMergeDatasets,
    "selectListItem":handlers.selectListItem,
    "advancedTextBox":advancedTextBox,
    "semControl":semControl,
    "semSuppCtrl":semSuppCtrl,
    "semModelTerms":semModelTerms,
    "semModelTermsDest":semModelTermsDest,
    "equalityConstraints":equalityConstraints,
    "reRunDatasetList":reRunDatasetList,
    "srcDataSetListForRerun":srcDataSetListForRerun
    
}
