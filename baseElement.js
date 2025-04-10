/**
  * This file is protected by copyright (c) 2023-2025 by BlueSky Statistics, LLC.
  * All rights reserved. The copy, modification, or distribution of this file is not
  * allowed without the prior written permission from BlueSky Statistics, LLC.
 */

const common = require("./common")

class BaseElement {
    id;
    constructor(modal, config) {}

    getVal() {
        try{
            return common.getVal(this.id)
        } catch (ex) {
            return undefined
        }
    }

    clearContent() {
        try {
            return common.clearContent(this.id)
        } catch (ex) {
            return undefined
        }
        
    }

    canExecute(refToBaseModal) {
        return true
    }
}


module.exports.baseElement = BaseElement