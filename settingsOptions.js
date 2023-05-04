var Sqrl = require('squirrelly');
const common = require("./common")

class OutputOpt {
    content;
    id;
    htmlTemplate = `
                  <div id="scinotationdiv" class="form-check pb-3">
                    <input class="form-check-input" type="checkbox" id="scinotation" name="scinotation">
                    <label class="form-check-label" for="scinotation">Numbers in scientific notation for very small or
                      very
                      large numbers (eg.
                      0.00001234, 1.234e-5, -0.00001234, -1.234e-5)</label>
                  </div>
                  <div id="pvaluediv" class="form-check pb-3">
                    <input class="form-check-input" type="checkbox" id="pvalue" name="pvalue">
                    <label class="form-check-label" for="pvalue">When p-values are smaller than the number of digits
                      allocated
                      to display, show '
                      &#60;.001'</label>
                  </div>
                  <div id="dropasteriskdiv" class="form-check pb-3">
                    <input class="form-check-input" type="checkbox" id="dropasterisk" name="dropasterisk">
                    <label class="form-check-label" for="dropasterisk">Hide asterisk (*) in p value column</label>
                  </div>
                  <div id="decimaldigitsdiv" class="pb-3">
                    <label class="form-check-label mr-2" for="decimaldigits">Number of decimal digits to display</label>
                    <input class="w-25 float-right" type="number" id="decimaldigits" name="decimaldigits">
                  </div>
                  <div id="maxtblperanalysisdiv" class="pb-3">
                    <label class="form-check-label mr-2" for="maxtblperanalysis">Maximum output tables per
                      analysis</label>
                    <input class="w-25 float-right" type="number" id="maxtblperanalysis" name="maxtblperanalysis">
                  </div>
                  <div id="maxrowsperouttbldiv" class="pb-3">
                    <label class="form-check-label mr-2" for="maxrowsperouttbl">Maximum rows per output table</label>
                    <input class="w-25 float-right" type="number" id="maxrowsperouttbl" name="maxrowsperouttbl">
                  </div>
                  <div id="maxcolsperouttbldiv" class="pb-3">
                    <label class="form-check-label mr-2" for="maxcolsperouttbl">Maximum columns per output table</label>
                    <input class="w-25 float-right" type="number" id="maxcolsperouttbl" name="maxcolsperouttbl">
                  </div>
                  <div id="showInlineSyntaxdiv" class="form-check pb-3">
                    <input class="form-check-input" type="checkbox" id="showInlineSyntax" name="showInlineSyntax">
                    <label class="form-check-label" for="showInlineSyntax">Show in-line syntax in the output</label>
                  </div>
                  <div id="uithemediv" class="pb-3">
                    <label class="form-check-label mr-2">UI Theme</label>
                    <select class="form-select w-25 float-right" id="uitheme">
                      <option value="default-theme">Default</option>
                      <option value="gray-theme">Gray</option>
                      <option value="indigo-theme">Indigo</option>
                      <option value="darkcherry-theme">Dark Cherry</option>
                      <option value="dracula-theme">Dracula</option>
                    </select>
                  </div>
    `
    constructor(modal, config) {
        this.content = Sqrl.Render(this.htmlTemplate, { modal: modal, ms: config })
    }
    canExecute() {
        return true
    }
    clearContent() { }
}

class OutputTblOpt {
    content;
    id;
    htmlTemplate = `
                  <div id="outputTableThemediv" class="pb-3">
                    <label class="form-check-label mr-2">Output table theme</label>
                    <select class="form-select w-25 float-right" id="outputTableTheme">
                      <option value="kable_styling">Default</option>
                      <option value="kable_classic">APA</option>
                      <option value="kable_classic_2">Classic 2</option>
                      <option value="kable_minimal">Minimal</option>
                      <option value="kable_paper">Paper</option>
                      <option value="kable_material">Material</option>
                      <option value="kable_material_dark">Material Dark</option>
                    </select>
                  </div>
                  <div id="outputTableFontdiv" class="pb-3">
                    <label class="form-check-label mr-2">Output table font</label>
                    <select class="form-select h-25 w-25 float-right" id="outputTableFont">
                      <option value="PT Sans">PT Sans</option>
                      <option value="sans">Sans</option>
                      <option value="serif">Serif</option>
                      <option value="mono">Mono</option>
                    </select>
                  </div>
                  <div id="outputTableFontSizediv" class="pb-3">
                    <label class="form-check-label mr-2" for="outputTableFontSize">Output table font size</label>
                    <input class="w-25 float-right" type="number" id="outputTableFontSize" name="outputTableFontSize">
                  </div>
                  <div id="showLaTexdiv" class="form-check pb-3">
                    <input class="form-check-input" type="checkbox" id="showLaTex" name="showLaTex" onclick="latexCheckedChange(this)">
                    <label class="form-check-label" for="showLaTex">Show LaTeX in the output</label>
                  </div>
                  <div id="outputTableLaTexColSpacediv" class="pb-3">
                    <label class="form-check-label mr-2" for="outputTableLaTexColSpace">LaTeX column spacing (pt)</label>
                    <input class="w-25 float-right" type="number" id="outputTableLaTexColSpace" name="outputTableLaTexColSpace">
                  </div>                  
    `
    constructor(modal, config) {
        this.content = Sqrl.Render(this.htmlTemplate, { modal: modal, ms: config })
    }
    canExecute() {
        return true
    }
    clearContent() { }
}

class MiscOpt {
    content;
    id;
    htmlTemplate = `
      <div id="hideRDataWarningdiv" class="form-check pb-3">
        <input class="form-check-input" type="checkbox" id="hideRDataWarning" name="hideRDataWarning">
        <label class="form-check-label" for="hideRDataWarning">Hide warning when RData file is
          opened</label>
      </div>
      <div id="hideOutputSaveWarningdiv" class="form-check pb-3">
        <input class="form-check-input" type="checkbox" id="hideOutputSaveWarning"
          name="hideOutputSaveWarning">
        <label class="form-check-label" for="hideOutputSaveWarning">Hide output save warning on application
          exit</label>
      </div>
      <div id="useLocalFileDiv" class="form-check pb-3">
        <input class="form-check-input" type="checkbox" id="useLocalFile"
          name="useLocalFile">
        <label class="form-check-label" for="useLocalFile">Use Local Log File (Applied after application restart)</label>
      </div>
      <div id="disableGAdiv" class="form-check pb-3">
        <input class="form-check-input" type="checkbox" id="disableGA"
          name="disableGA">
        <label class="form-check-label" for="disableGA">Do not share usage data (Applied after application restart)</label>
      </div>
      <div id="debugRCodediv" class="form-check pb-3">
        <input class="form-check-input" type="checkbox" id="debugRCode"
          name="debugRCode">
        <label class="form-check-label" for="debugRCode">Capture all R calls to the logs</label>
      </div>
      <div id="appEncodingdiv" class="pb-3">
      <label class="form-check-label mr-2">Application encoding (Applied after application restart)</label>
        <select class="form-select h-25 w-25 float-right" id="appencoding">
          <option value="ascii">ascii</option>
          <option value="utf8">utf8</option>
          <option value="latin1">latin1</option>
        </select>
      </div>  
      <div id="disableDyanmicRHelpDiv" class="form-check pb-3">
        <input class="form-check-input" type="checkbox" id="disableDyanmicRHelp"
          name="disableDyanmicRHelp">
        <label class="form-check-label" for="disableDyanmicRHelp">Disable display of R native HTML help pages</label>
      </div>  
      <div id="factorCreationControlDiv" class="form-check pb-3">
        <input class="form-check-input" type="checkbox" id="factorCreationControl" name="factorCreationControl" onclick="maxFactorCheckedChange(this)">
        <label class="form-check-label" for="factorCreationControlDiv">Control the creation of factor variables</label>
        <div id="maxfactorcountdiv" class="pb-3">
          <label class="form-check-label ml-4 w-50" for="maxfactorcount">Specify the maximum number of distinct values to control creation of factor variables</label>
          <input class="w-25 float-right" type="number" id="maxfactorcount" name="maxfactorcount">
        </div>
      </div>   
    `
    constructor(modal, config) {
        this.content = Sqrl.Render(this.htmlTemplate, { modal: modal, ms: config })
    }
    canExecute() {
        return true
    }
    clearContent() { }
}


class RLocaleOpt {
  content;
  id; 
  htmlTemplate = `
                <div id="rlocalediv" class="pb-3">
                <label class="form-check-label mr-2" for="rlocale">Set R locale :</label>
                <input list="rlocalelist" name="rlocale" class="w-25 float-right" id="rlocale">
                <datalist id="rlocalelist">
                  <option value="Chinese (Simplified)">
                  <option value="Turkish">
                  <option value="French">
                  <option value="Portuguese">
                </datalist>                
                  <div id="rlocalekiddiv" class="pb-3">
                  <label class="form-check-label mr-2" for="rlocale">1. Enter a valid R locale in the text field</label>
                  <label class="form-check-label mr-2" for="rlocale">2. To pick a locale from the dropdown, make the text field empty and click in the text field</label>
                  <label class="form-check-label mr-2" for="rlocale">3. Leave the text field empty if you want to set the system locale</label>
                  </div>            
                </div>
  `
  constructor(modal, config) {
      this.content = Sqrl.Render(this.htmlTemplate, { modal: modal, ms: config })
  }
  canExecute() {
      return true
  }
  clearContent() { }
}

class DatabaseOpt {
    content;
    id;
    htmlTemplate = `
		                  <div id="tnsadminOraclediv" class="pb-3">
                    <label class="form-check-label mr-2" for="tnsadminpath">Oracle TNS_ADMIN path (use forward slash in path)</label>
                    <input class="w-25 float-right" type="text" id="tnsadminpath" name="tnsadminpath">
                    <div class="form-check ml-3">
                      <input class="form-check-input" type="checkbox" id="useSysTnsAdmin" name="useSysTnsAdmin">
                      <label class="form-check-label" for="useSysTnsAdmin">Use system defaults</label>
                    </div>
                  </div>
    `
    constructor(modal, config) {
        this.content = Sqrl.Render(this.htmlTemplate, { modal: modal, ms: config })
    }
    canExecute() {
        return true
    }
    clearContent() { }
}

class SaveAppSettings {
    content;
    id;
    htmlTemplate = `
<button type="button" class="btn btn-secondary" onclick="saveUserConfig()">Save</button>
    `
    constructor(modal, config) {
        this.content = Sqrl.Render(this.htmlTemplate, { modal: modal, ms: config })
    }
    canExecute() {
        return true
    }
    clearContent() { }
}


module.exports.OutputOpt = OutputOpt;
module.exports.OutputTblOpt = OutputTblOpt;
module.exports.MiscOpt = MiscOpt;
module.exports.RLocaleOpt = RLocaleOpt;
module.exports.DatabaseOpt = DatabaseOpt;
module.exports.SaveAppSettings = SaveAppSettings;