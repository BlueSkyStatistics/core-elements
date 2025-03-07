/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */

var Sqrl = require('squirrelly');
const common = require("./common")
const {getT} = require("../../../../localization");
let t = getT('menutoolbar')
class labelHelpSixSigma {
    content;
    id;
    htmlTemplate = `
<p id="{{modal.id}}_{{ms.no}}" no="{{ms.no}}" bs-type="label" class="h{{ms.h}} {{if(options.ms.style)}}{{ms.style}}{{/if}}">
<h5>${t('sixSigmaOvrViewLbl1')}</h5>
<ul>
<li><a href="https://www.pyzdekinstitute.com/blog/six-sigma/what-is-six-sigma.html">${t('sixSigmaOvrViewLink1')}</a></li>
</ul>
<h5>${t('sixSigmaOvrViewLbl2')}</h5>
<ul>
<li><a href="https://cran.r-project.org/web/packages/qcc/vignettes/qcc_a_quick_tour.html">${t('sixSigmaOvrViewLink2')}</a></li>
</ul>
<h5>${t('sixSigmaOvrViewLbl3')}</h5>
<ul>
<li><a href="https://datascienceplus.com/six-sigma-dmaic-series-in-r-part-1/">${t('sixSigmaOvrViewLink3')}</a></li>
<li><a href="https://datascienceplus.com/six-sigma-dmaic-series-in-r-part-2/">${t('sixSigmaOvrViewLink4')}</a></li>
<li><a href="https://datascienceplus.com/six-sigma-dmaic-series-in-r-part-3/">${t('sixSigmaOvrViewLink5')}</a></li>
<li><a href="https://datascienceplus.com/six-sigma-dmaic-series-in-r-part4/">${t('sixSigmaOvrViewLink6')}</a></li>
<li><a href="https://datascienceplus.com/six-sigma-dmaic-series-in-r-part-5/">${t('sixSigmaOvrViewLink7')}</a></li>
</ul>
    `
    constructor(modal, config) {
        this.content = Sqrl.Render(this.htmlTemplate, { modal: modal, ms: config })
    }
    canExecute() {
        return true
    }
    clearContent() { }
}
module.exports.element = labelHelpSixSigma;