/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */

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
                  <div class="form-row pb-3 align-items-baseline">
                    <label class="form-check-label mr-2">Precision value for decimal numbers</label>
                    <div class="form-check flex-grow-1">
                        <input class="form-check-input" type="checkbox" id="precisionDigitsNA" name="precisionDigitsNA" 
                            onchange="handlePrecisionValue(this)"
                        />
                        <label class="form-check-label mr-2" for="precisionDigitsNA">NA</label>
                    </div>
                    <div>
                        <label class="form-check-label mr-2" for="precisionDigitsInput">Digits</label>                 
                        <input class="w-25" type="number" id="precisionDigitsInput" name="precisionDigitsInput" />
                    </div>
                  </div>
                  <div id="dropasteriskdiv" class="form-check pb-3">
                    <input class="form-check-input" type="checkbox" id="dropasterisk" name="dropasterisk">
                    <label class="form-check-label" for="dropasterisk">Hide asterisk (*) in p value column</label>
                  </div>
                  <div id="decimaldigitsdiv" class="pb-3">
                    <label class="form-check-label mr-2" for="decimaldigits">Number of decimal digits to display</label>
                    <input class="w-25 float-right" type="number" id="decimaldigits" name="decimaldigits">
                  </div>
                  <div id="decimaldigitsgriddiv" class="pb-3">
                    <label class="form-check-label mr-2" style="width: 350px;" for="decimaldigitsgrid">Number of decimal digits to load in the data grid (blank is default)</label>
                    <input class="w-25 float-right" type="number" id="decimaldigitsgrid" name="decimaldigitsgrid">
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
                    <label class="form-check-label" for="showInlineSyntax">Hide in-line syntax in the output</label>
                  </div>
                  <div id="showRSyntaxdiv" class="form-check pb-3">
                    <input class="form-check-input" type="checkbox" id="showRSyntax" name="showRSyntaxdiv">
                    <label class="form-check-label" for="showRSyntaxdiv">Hide 'R Editor' and R syntax in the output (requires app relaunch)</label>
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
        global.handlePrecisionValue = el => {
            const value = el.checked ? 'NA' : $('#precisionDigitsInput').val()
            global.handlePrecisionValueChange(value)
        }
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
        <label class="form-check-label" for="factorCreationControlDiv">Convert character variables to factor when importing datasets</label>
        <label>
        For the files of type Excel, CSV, DAT and SAS we automatically convert all the character variables to factor. For all other file types, we rely on the R package to set the class of the dataset variables. This setting post processes the dataset after opening it to allow you to control the creation of factor variables based on the criteria below.
        </label>
        <div id="maxfactorcountdiv" class="pb-3">
          <label class="form-check-label ml-4 w-50" for="maxfactorcount">Specify the maximum number of distinct values to control creation of factor variables. When the number of unique values in a variable exceeds the speicified value we will create a variable of class character else a variable of class factor is created.</label>
          <input class="w-25 float-right" type="number" id="maxfactorcount" name="maxfactorcount">
        </div>
        <label>
          1: Uncheck this setting to load character variables as character. 
        </label>
        <label>
          2: Check this setting and provide a positive number to create a factor if the variable contains unique values less than or equal the specified number. 
        </label>
        <label>
          3: Check this setting and set a value of 0 to convert all character variables to factor.
        </label>                
      </div>   
      <div id="hidePasteWarningDiv" class="form-check pb-3">
        <input class="form-check-input" type="checkbox" id="hidePasteWarning" name="hidePasteWarning">
        <label class="form-check-label" for="hidePasteWarning">Hide warning when pasting overflowing data</label>
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
                    <option value="German">
                  </datalist>                
                  <div id="rlocalekiddiv" class="pb-3">
                    <p>
                    <label class="form-check-label mr-2">1. If you want to set to the system default locale, manually delete any text in the field if it is not already empty.</label>
                    <p>
                    <label class="form-check-label mr-2">The following examples are illustration purposes only to explain what system default locale setting means  </label>
                    <p>
                    <label class="form-check-label mr-2">
                    Example 1: if you purchased and configured a PC in the USA, your system defaut locale will likely be something like "English_United States".
                    </label>
                    <p>
                    <label class="form-check-label mr-2">
                    Example 2: if you purchased and configured a PC in China, your system default locale will likely be something like "Chinese (Simplified)".
                    </label>
                    <p>
                    <label class="form-check-label mr-2">2. To pick a locale from the dropdown, first make the text field empty by manully deleting any text. Click on the text field to get the dropdown to appear with multiple choices. If you do not find a suitable locale choice in the dropdown, you can hand type a valid locale in the text field.</label>
                    <p>
                    <label class="form-check-label mr-2">3. Whenever you want to change the locale and select from the dropdown, you must first manually delete the current text entry to make the text field empty, and then you will see the dropdown to pick a value from.</label>
                    <p>
                    <label class="form-check-label mr-2">Note: If the graphs/plots are not displaying the legends correctly in the correct locales, you must also go to the Theme dialog (see toolbar above) and select a suitable font from the dropdown list. </label>
                    <p>
                    <label class="form-check-label mr-2">
                    Example : if you set locale to "Chinese (Simplified)", you should also set the font to "Microsoft Yahei" or "SimSun" in the Theme dialog</label>
                    <p>
                    <label class="form-check-label mr-2">visit the support page on our website (www.blueskystatistics.com) for the related technote and further deatils</label>
                  </div>            
                </div>
                <div id="delimmarkerdiv" class="pb-3"> 
                  <label class="form-check-label mr-2" for="delimMarker">Settings related to Copy/Paste operations on the datagrid:</label>
                </div>  
                <div id="decimalmarkerdiv" class="pb-3 ml-4"> 
                  <label class="form-check-label mr-2" for="decimalMarker">Set decimal marker character :</label>
                  <input name="decimalMarker" class="w-25 float-right" id="decimalMarker" type="text">
                </div>
                <div id="displaymarkerdiv" class="pb-3 ml-4"> 
                  <label class="form-check-label mr-2" for="displayMarker">Set display marker character :</label>
                  <input name="displayMarker" class="w-25 float-right" id="displayMarker" type="text">
                </div>   
                 <div id="delimChardiv" class="pb-3 ml-4"> 
                  <label class="form-check-label mr-2" for="delimChar">Set delim character e.g. \\t, \\n:</label>
                  <input name="delimChar" class="w-25 float-right" id="delimChar" type="text">
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
                  <div>
                    <div id="maxDBtblRowCountdiv" class="pb-3">
                      <label class="form-check-label mr-2" for="maxDBtblRowCount">Maximum rows allowed for a database table</label>
                      <input class="w-25 float-right" type="number" id="maxDBtblRowCount" name="maxDBtblRowCount">
                    </div>
                    <div id="maxDBtblColCountdiv" class="pb-3">
                      <label class="form-check-label mr-2" for="maxDBtblColCount">Maximum columns allowed for a database table</label>
                      <input class="w-25 float-right" type="number" id="maxDBtblColCount" name="maxDBtblColCount">
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

class LLMOpt {
    content;
    id;
    htmlTemplate = `
      <div id="llmSettingsDiv" class="pb-3">
        <h5>LLM API Settings</h5>
        <div class="form-group pb-2">
          <label for="llmProviderType">Provider Type
            <span title="Choose your LLM provider. For Azure, ensure your endpoint and deployment name are correct." style="cursor: help; color: #007bff;">&#9432;</span>
          </label>
          <select class="form-select w-50" id="llmProviderType">
            <option value="openai">OpenAI</option>
            <option value="azure">Azure OpenAI</option>
            <option value="custom">Custom</option>
          </select>
        </div>
        <div class="form-group pb-2">
          <label for="llmApiUrl">API URL
            <span title="The full endpoint for chat completions. For OpenAI: https://api.openai.com/v1/chat/completions. For Azure: your deployment endpoint." style="cursor: help; color: #007bff;">&#9432;</span>
          </label>
          <input type="text" class="form-control w-75" id="llmApiUrl" placeholder="https://api.openai.com/v1/chat/completions" required>
        </div>
        <div class="form-group pb-2">
          <label for="llmModel">Model Name
            <span title="For OpenAI: gpt-3.5-turbo, gpt-4, etc. For Azure: your deployment name." style="cursor: help; color: #007bff;">&#9432;</span>
          </label>
          <input type="text" class="form-control w-50" id="llmModel" placeholder="gpt-3.5-turbo" required>
        </div>
        <div class="form-group pb-2">
          <label for="llmApiKey">API Key / Token
            <span title="Your secret API key. For OpenAI, starts with sk-. For Azure, use your Azure API key." style="cursor: help; color: #007bff;">&#9432;</span>
          </label>
          <input type="password" class="form-control w-50" id="llmApiKey" placeholder="sk-..." required>
        </div>
        <div class="form-text text-muted">Your API key is stored locally and only used for LLM requests.</div>
        <div id="llmSettingsWarning" class="alert alert-warning mt-2" style="display:none;"></div>
        <button id="llmSettingsSaveBtn" class="btn btn-primary mt-3" onclick="saveLlmSettings()">Save LLM Settings</button>
        <div id="llmSettingsSavedMsg" class="text-success mt-2" style="display:none;">LLM settings saved!</div>
      </div>
    `;
    constructor(modal, config) {
        this.content = Sqrl.Render(this.htmlTemplate, { modal: modal, ms: config });
        const {store} = global
        // Attach event handler after DOM insertion
        setTimeout(() => {
            // Pre-fill fields with current values from Electron Store
            const provider = store.get('llmProviderType', 'openai');
            const url = store.get('llmApiUrl', 'https://api.openai.com/v1/chat/completions');
            const model = store.get('llmModel', 'gpt-3.5-turbo');
            const key = store.get('llmApiKey', '');
            const providerEl = document.getElementById('llmProviderType');
            const urlEl = document.getElementById('llmApiUrl');
            const modelEl = document.getElementById('llmModel');
            const keyEl = document.getElementById('llmApiKey');
            if (providerEl) providerEl.value = provider;
            if (urlEl) urlEl.value = url;
            if (modelEl) modelEl.value = model;
            if (keyEl) keyEl.value = key;
        }, 0);
    }
    canExecute() {
        return true;
    }
    clearContent() { }
}


global.saveLlmSettings = function() {
    const warningDiv = document.getElementById('llmSettingsWarning');
    const savedMsg = document.getElementById('llmSettingsSavedMsg');
    warningDiv.style.display = 'none';
    savedMsg.style.display = 'none';
    const url = document.getElementById('llmApiUrl').value.trim();
    const model = document.getElementById('llmModel').value.trim();
    const key = document.getElementById('llmApiKey').value.trim();
    if (!url || !model || !key) {
        warningDiv.textContent = 'Please fill in all required LLM settings fields.';
        warningDiv.style.display = '';
        return;
    }

    store.set('llmProviderType', document.getElementById('llmProviderType').value);
    store.set('llmApiUrl', url);
    store.set('llmModel', model);
    store.set('llmApiKey', key);
    savedMsg.style.display = '';
    setTimeout(()=>{ savedMsg.style.display = 'none'; }, 2000);
}

module.exports.OutputOpt = OutputOpt;
module.exports.OutputTblOpt = OutputTblOpt;
module.exports.MiscOpt = MiscOpt;
module.exports.RLocaleOpt = RLocaleOpt;
module.exports.DatabaseOpt = DatabaseOpt;
module.exports.SaveAppSettings = SaveAppSettings;
module.exports.LLMOpt = LLMOpt;