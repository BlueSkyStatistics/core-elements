const { getMultiVal } = require("./common");

function attachActionToMoveArrow(parentId) {
  var modal_id = document.getElementById(parentId).getAttribute("modal_id");
  if ($(`#${parentId}`).parent().siblings().length > 0 && ($(`#${parentId}`).parent().siblings()[0].classList.contains("col-xx") || $(`#${parentId}`).parent().siblings()[0].classList.contains("mvbtn"))) {
    var btn = $(`#${parentId}`).parent().siblings()[0].children[0]
    btn.innerHTML = '<i class="fas fa-arrow-left"></i>'
    btn.removeEventListener("click", moveToSrc)
    btn.removeEventListener("click", moveToDst)
    btn.addEventListener("click", moveToSrc)
  } else {
    $(`#${modal_id} .btn-arrows`).html('<i class="fas fa-arrow-right"></i>')
    $(`#${modal_id} .btn-arrows`).each(function (index, item) {
      item.removeEventListener("click", moveToSrc)
      item.removeEventListener("click", moveToDst)
      item.addEventListener("click", moveToDst)
    })
  }
}
function moveToSrc(ev) {
  ev.preventDefault();
  ev.stopPropagation();
  var objects = []
  var ids = []
  var modal_id = $(`#${ev.currentTarget.id}`).parent().siblings()[0].children[0].getAttribute("modal_id")
//We are only moving items that are selected in the destination variable control
//associated with the move button
//dst_id is the id of the destination
  var dst_id = $(`#${ev.currentTarget.id}`).parent().siblings()[0].children[0].id
  // the filter function prevents selected items from modelTermsDst (structural parameters) from being moved
  //Every item in modeltermsdst has a class termsDst
 /*  $(`#${modal_id} .list-group-item-action.active`).filter(function () {
    return !$(this).hasClass('termsDst')
  }).each(function (index, item) {
    if (item.getAttribute("original")) {
      item.innerText = item.getAttribute("original")
      item.removeAttribute("original")
    }
    objects.push(item.outerHTML)
    ids.push(item.id)
  }) */
  $(`#${dst_id} .list-group-item-action.active`).filter(function () {
    return !$(this).hasClass('termsDst')
  }).each(function (index, item) {
    if (item.getAttribute("original")) {
      item.innerText = item.getAttribute("original")
      item.removeAttribute("original")
    }
    objects.push(item.outerHTML)
    ids.push(item.id)
  })
//There are no items to move, note we are only moving items that are selected in the destination variable control
//associated with the move button, there may be no items selected, hence we don't call the drop
 if (objects.length > 0)
{
    _drop(objects, "move", ids, ids[0].split("_")[0])
} 
}

function _to_compute(ev, dst) {
  ev.preventDefault();
  ev.stopPropagation();
  var el = ev.target
  if (ev.target.tagName != "BUTTON") {
    el = ev.target.parentElement
  }
  if (dst[0].tagName == 'DIV') {
    _toCodeMirrorCompute([], dst.find('.CodeMirror')[0].CodeMirror, undefined, el.getAttribute("val"))
  } else {
    _to_formula([], dst, el.getAttribute("val"))
  }
  el.blur();
}
module.exports.selectElementMergeDatasets = (ev) => {
  ev.preventDefault();
  ev.stopPropagation();
  var el = document.getElementById(ev.target.id)
  var parentId = el.parentElement.id;
  $(`#${parentId} .list-group-item-action.active`).removeAttr("active");
  $(`#${parentId} .list-group-item-action.active`).removeClass("active");
  if (el.classList.contains("active")) {
    el.removeAttribute("active");
    el.classList.remove("active");
  } else {
    el.setAttribute("active", "");
    el.classList.add("active");
  }
}
function arrangeFocus(inserted_object_id, parentID) {
  var el = document.getElementById(inserted_object_id)
  var modal_id = document.getElementById(parentID).getAttribute("modal_id");
  el.scrollIntoView(false);
  $(`#${modal_id} .list-group-item-action.active`).removeAttr("active");
  $(`#${modal_id} .list-group-item-action.active`).removeClass("active");
  el.setAttribute("active", "");
  el.classList.add("active");
  attachActionToMoveArrow(parentID);
}


function areAllElementsSame(arr) {
  if (arr.length === 0) {
    return true; // An empty array is considered to have all elements the same
  }

  const firstElement = arr[0];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] !== firstElement) {
      return false; // If any element is different, return false
    }
  }

  return true; // If no different elements found, return true
}



//When dragging and dropping 
//      From source to destination, the parentID is the destination
function _drop(objects, action, object_ids, parentID) {
  let index = 1
  let priorElementOrder = 0
  let finalOrder = 0
  let greatestOrderInParent = 0
  let position = 0
  let stop = false

  var el = undefined
    try {
      el = $(`#${parentID}`)
    } catch {
      el = $(document.getElementById(parentID))
    }
    if (!el.attr("bs-type")) {
      el = el.parent()
      parentID = el.attr("id")
    }

  //Getting all the iconTypes of the variables being dragged
  if ($("#" + parentID).attr("modal_id") == "sem" && extractBeforeLastUnderscore(parentID) == 'sem_sem3_depVar') 
  {
    //Making sure all the elements being dragged into a set are the same type
    // Check if there are at least two elements
    if (object_ids.length >= 2) {
    // Get the attribute value of the first element
    let firstElementValue = $("#" + object_ids[0]).attr("bs-row-class");
    // Loop through the remaining elements and compare their attribute values
    for (let i = 1; i < object_ids.length; i++) {
       let currentValue = $("#" + object_ids[i]).attr("bs-row-class");
        // If the current value is different from the first element's value, they are not all the same
        if (currentValue !== firstElementValue) {
          dialog.showMessageBoxSync({ type: "error", buttons: ["OK"], title: "Incompatible types", message: `An equality constraint set must contain all factor loadings, covariance relationships or structural relationships. The elements you are moving have different types.` })
          stop = true
          return
        }
      }
      if (stop == true) return
    }
    let elements = [];
    $(`#${parentID} a`).each(function (index, item) {
      //elements.push($("#" +item.id).attr("bs-row-class"));
      elements.push(item.getAttribute("bs-row-class"))
    });
    if (elements.length != 0) {
      object_ids.forEach(function (element, index) {
        if (document.getElementById(element).getAttribute("bs-row-class") != elements[0]) {
          dialog.showMessageBoxSync({ type: "error", buttons: ["OK"], title: "Incompatible types", message: `An equality constraint set must contain all factor loadings, covariance relationships or structural relationships. You cannot combine types in a single set.` })
          stop = true
          return
        }
      })
    }
  }
  if ($("#" +parentID).attr("modal_id") =="sem" && extractBeforeLastUnderscore(parentID) == 'sem_mediationDestCtrl_depVar')
  { 
    
    //Lets get the item values from the mediation control
    let elements=[];
      $(`#${parentID} a`).each(function(index, item) {
            //elements.push($("#" +item.id).attr("bs-row-class"));
            elements.push(item.text)
        });
    
    //If there are greater than 3 elements dragged show an error
    if (object_ids.length > 2) 
    { 
    dialog.showMessageBoxSync({ type: "error", buttons: ["OK"], title: "Not supported", message: `We don't support more than 2 variables in a mediation set. Please contact support@blueskystatistics.com if you need this capability.` })
            stop = true
            return
    } else if (object_ids.length ==2 && elements.length == 0  ) {
    //If there are 2 elements already in the mediation control show an error  
    //Case if I am dragging 2 items and there are no existing items
      let firstElement2nditem = $("#"+ object_ids[0]).text().split("->")[1]
      let secondElement1stitem = $("#"+ object_ids[1]).text().split("->")[0]
      let firstElement1stitem = $("#"+ object_ids[0]).text().split("->")[0]
      let secondElement2nditem = $("#"+ object_ids[1]).text().split("->")[1]		
      if (firstElement2nditem == secondElement1stitem)
      {
        //Case 1, the 2nd element of the first item is equal to the 1st element of the 2nd item
        //A->B and B->C
        stop = false
      } else if (firstElement1stitem == secondElement2nditem)
      {
        //Case 2, the 1st element of the first item is equal to the 2nd element of the 2nd item
        //B->C
        //A->B
        stop = false
      } else
      {
        stop = true
        dialog.showMessageBoxSync({ type: "error", buttons: ["OK"], title: "Error", message: `Mediation relationship variables must be in the form A->B and B->C ` })
			  return
      }
	  } else  if (object_ids.length == 1 && elements.length == 1  )
    {
    //Case if I am dragging 1 item and there is an existing item
      let firstElement2nditem = $("#"+ object_ids[0]).text().split("->")[1]
      let secondElement1stitem = elements[0].split("->")[0]
      let firstElement1stitem = $("#"+ object_ids[0]).text().split("->")[0]
      let secondElement2nditem = elements[0].split("->")[1]
      if (firstElement2nditem == secondElement1stitem)
      {
        //Case 1, the 2nd element of the first item is equal to the 1st element of the 2nd item
        //A->B and B->C
        stop = false
        
      } else if (firstElement1stitem == secondElement2nditem)
      {
        //Case 2, the 1st element of the first item is equal to the 2nd element of the 2nd item
        //B->C
        //A->B
        stop = false
      } else
      {
        stop = true
        dialog.showMessageBoxSync({ type: "error", buttons: ["OK"], title: "Error", message: `Mediation relationship variables must be in the form A->B and B->C or B->C and A->B` })
        return
      }
	} else if (object_ids.length >= 1 && elements.length >= 2  )
  {
    //case when I am dragging one or more items and there are already 2 items    
     stop = true
        dialog.showMessageBoxSync({ type: "error", buttons: ["OK"], title: "Error", message: `We don't support more than 2 variables in a mediation set. Please contact support@blueskystatistics.com if you need this capability.` })
        return
  } else  if (object_ids.length >= 2 &&  elements.length >= 1  )
  {
  //case when I am dragging 2 or more items and there is already 1 items
 
    dialog.showMessageBoxSync({ type: "error", buttons: ["OK"], title: "Not supported", message: `We don't support more than 2 variables in a mediation set. Please contact support@blueskystatistics.com if you need this capability.` })
          stop = true
          return
  }

}
    if (stop == true) return
  for (var i =  0; i < objects.length; i++) {
    
    var isWrapped = el.attr("is-wrapped");
    var object = objects[i];
    var object_id = object_ids[i];
    var inserted_object_id = object_id;
    //Comes here when adding a variable to a destination variable control including aggregate control
    if (_filter(el.attr('filter'), object)) {
      if (!document.getElementById(parentID).getAttribute("draggable")) {
        //Comes here when adding to a destination variable control including aggregate control and skips 
        //the if loop below when adding but NOT when dragging back from destination to source
        if (object_id.indexOf(":") > -1) {
          inserted_object_id = object_id.split(":")[0]
          object = object.replace(object_id, inserted_object_id)
        }
        // The or part below checks if the parent is a source variable
        if (action === "move" || document.getElementById(parentID).getAttribute("bs-type") === "cols") {
          document.getElementById(`${object_id}`).remove()
          if (el.attr("bs-type") == 'single') {
            var exising = document.getElementById(parentID).innerHTML
            if (exising) {
              var el_id = el.children()[0].id
              _drop([exising], "move", [el_id], el_id.split("_")[0])
            }
          }
        } else if (object_id.indexOf(":") === -1) {
          var id_addon = parentID;
          //Comes here when adding a variable to a destination variable control including aggregate control, 
          //but does NOT come here when moving back from destination to source
          let func = $(`#${parentID}_select option:selected`).html()
          //is_addon stores the destination variable name control
          //func is undefined for normal destination variable controls but not when moving to an aggregate control
          inserted_object_id = `${object_id}:${id_addon}_${func}`
          object = object.replace(object_id, inserted_object_id)
        }
        //Executes below when adding and when moving back to source, note that $1 is the first match of the expression /(drop\(event, ')(.\\w*)('\))/ $3 the 3rd match
        //I am not sure but when moving from source to destination, the code below does not change anything
        object = object.replace(/(drop\(event, ')(.\\w*)('\))/, "$1" + parentID + "$3")
        //Executes if below when adding, NOT when moving back from destination to source
        if (isWrapped) {
          object = object.replace(/>(.*)</, " aggregation='" + $(`#${parentID}_select option:selected`).html() + "' original='$1'>" + $(`#${parentID}_select`).val().replace("%", "$1") + "<")
        }
        //Executes this when adding not when moving back
        if (!document.getElementById(inserted_object_id)) {
          if (!document.getElementById(parentID).getAttribute("order")) {
            if ($(`#${parentID}`).attr("bs-type") == 'single') {
              document.getElementById(parentID).innerHTML = object;
            } else {
              //Executes this when adding
              /*  if ($("#" +parentID).attr("modal_id") =="sem" && $("#" +parentID).attr("equalityConstraint"))
              {
                object
              } */
              document.getElementById(parentID).innerHTML += object;
            }
          } else {
            var parentElement = document.getElementById(parentID)
            var order = document.getElementById(parentID).getAttribute("order").split("|||").indexOf(inserted_object_id)
            var template = document.createElement('template');
            template.innerHTML = object;
            greatestOrderInParent = findGreatestOrder(parentID)

            if (order > greatestOrderInParent) {
              parentElement.append(template.content.firstChild);
            } else {
              position = findPosition(parentID, order)
              parentElement.insertBefore(template.content.firstChild, parentElement.children[position]);
            }
          }
        }
        var comboBoxParent = document.getElementById(parentID).getAttribute("modal_id");
        if ($(`#${parentID}`).attr("onselect_r") != undefined) {
          var popComboBox = JSON.parse($(`#${parentID}`).attr("onselect_r"));
          if (popComboBox != "") {
            r_on_select(comboBoxParent, popComboBox, common.getVal(parentID)[0])
            $(`#${object_id}`).attr("onselect_r", JSON.stringify(popComboBox))
          }
        } else if ($(object).attr("onselect_r") != undefined) {
          var unpopComboBox = JSON.parse($(object).attr("onselect_r"));
          for (const property in unpopComboBox) {
            unpopComboBox[property] = "c('')"
            r_on_select(comboBoxParent, unpopComboBox, "")
          }
        }
        arrangeFocus(inserted_object_id, parentID);
      }
    }
  }
  //we don't populate covariances AND EQUALITY CONSTRAINTS when dragging and dropping to source and dest EQUALITY CONSTRAINTS
  //Also when latent controls are being deleted as we have already deleted the entries and we don't want them automatically populated
  //before the control is completely deleted
  if ($("#" + parentID).attr("modal_id") == "sem" && (extractBeforeLastUnderscore(parentID) != 'sem_sem3_depVar' && parentID != "semequalityConstraints1" && parentID !== "") && $("#" + parentID).attr("bskyState") != "deleted") {
    let autoPopCovarId = "sem" + "_" + "autoComputeCovar"
    let autoPopCovarState = $(`#${autoPopCovarId}`).prop('checked');
    if (autoPopCovarState) {
      autoPopulateCovar()
    }
    populateEqualityConstraints()
  }
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



function findGreatestOrder(parentID) {
  let maxOrder = 0
  let orderedArray = document.getElementById(parentID).getAttribute("order").split("|||")
  let parentDiv = $('#' + parentID)
  parentDiv.children().each(function () {
    // Access the current child element
    if (orderedArray.indexOf(this.id) > maxOrder)
      maxOrder = orderedArray.indexOf(this.id)
    // Perform actions on the child element
    // For example, you can add a class to each child element
    // child.addClass('childClass');
  })
  return maxOrder
}

function findPosition(parentID, order) {
  let position = 0
  let orderedArray = document.getElementById(parentID).getAttribute("order").split("|||")
  let parentDiv = $('#' + parentID)
  parentDiv.children().each(function () {
    // Access the current child element
    if (orderedArray.indexOf(this.id) > order) {

      return false
    }
    // Perform actions on the child element
    // For example, you can add a class to each child element
    // child.addClass('childClass');
    position++
  })
  return position
}


function getActiveVal(dst_id) {
  var active_val = ''
  try {
    var active_ = $(`#${dst_id}`).closest('.formula-builder').find(".formula-btn.activated, .formula-select.activated")
  } catch (ex) {
    var active_ = dst_id.closest('div[bs-type="switchcase"]').prev().find(".formula-btn.activated, .formula-select.activated")
  }
  active_.each((index, item) => {
    if (item.type === "button" || item.tagName == "DIV") {
      active_val += item.getAttribute("val")
    } else {
      active_val += item.value
    }
  })
  return active_val
}
function _to_formula(objects, dst_id, active_val) {
  if (!active_val) {
    var active_val = getActiveVal(dst_id)
  }
  try {
    var formula_value = $(`#${dst_id}`).val()
    var formula_value_length = formula_value.length
    var cursorPosition = $(`#${dst_id}`).prop("selectionStart");
    var originalStartCursorPosition = 0
    var originalEndCursorPosition = $(`#${dst_id}`).prop("selectionEnd");

    if (originalEndCursorPosition > cursorPosition && originalEndCursorPosition <= formula_value_length) {
      cursorPosition = originalEndCursorPosition
    }
    if (cursorPosition > 0) originalStartCursorPosition = cursorPosition
    // User hasnt specified a cursor position but may have specified it in the past
    // If the user has cleared out the formula, I ignore the prior selected cursor position
    /*  if (cursorPosition == 0 && formula_value.length !=0)
    {
      if (document.getElementById(dst_id).hasAttribute("originalCursorPosition"))
        cursorPosition = parseInt($(`#${dst_id}`).attr("originalCursorPosition"));
    } */

  } catch (ex) {
    var formula_value = dst_id.val()
    var cursorPosition = 0
  }
  let splinesDeg = ""
  let polyDeg = ""
  splinesDeg = $(`#${dst_id}_splinesDeg`).val()
  polyDeg = $(`#${dst_id}_polyDeg`).val()
  //This ensures I insert at the end
  if (cursorPosition == 0 || cursorPosition > formula_value.length) {
    cursorPosition = formula_value.length
  }
  var results = _form_new_formula_value(objects, cursorPosition, formula_value, active_val, false, splinesDeg, polyDeg)
  formula_addon = results.formula_addon
  try {
    $(`#${dst_id}`).val(formula_addon)

    //Code for optionally storing the cursor position
    //$(`#${dst_id}`).attr("originalCursorPosition", cursorPosition);
  } catch (ex) {
    dst_id.val(formula_addon)
    dst_id[0].scrollLeft = dst_id[0].scrollWidth;
  }
  $(`#${dst_id}`).prop('selectionEnd', cursorPosition + results.lengthInserted + 1);
  $(`#${dst_id}`).prop('selectionStart', cursorPosition);
  $(`#${dst_id}`).trigger('focus')
}
function _drop_to_compute(ev, parentID) {
  ev.preventDefault();
  var object_ids = ev.dataTransfer.getData("id").split(",");
  var objects = [];
  object_ids.forEach((item) => {
    objects.push(document.getElementById(item).textContent)
  })
  _to_formula(objects, parentID)
}
function _toCodeMirrorCompute(objects, editor, newline, active_val) {
  // Getting proper values
  let doc = editor.getDoc()
  let newpos = editor.getCursor()
  if (!newline) {
    var newline = _form_new_formula_value(objects, newpos.ch, editor.getValue(), active_val, true)
  }
  doc.replaceRange(newline, newpos)
  doc.setValue(doc.getValue().replace(/  +/g, ' '))
  newpos.ch = newpos.ch + newline.trim().length + 1
  editor.setCursor(newpos)
}
function createCMFromTestArea(modal_id) {
  $(`#${modal_id} .cm`).each((index, item) => {
    if ($(item).find(".CodeMirror").length == 0) {
      var editor = CodeMirror(item, {
        keyMap: "sublime",
        autoCloseBrackets: true,
        lineWrapping: true,
        matchBrackets: true,
        showCursorWhenSelecting: true
      })
      editor.on("focus", function (editor, e) {
        var parent_div = $(e.target).closest("div.col-10")
        $(parent_div).closest('div[bs-type="switchcase"]').find("div.col-10.focus").removeClass('focus')
        $(parent_div).addClass('focus')
      })
      editor.on("drop", function (editor, e) {
        var object_ids = e.dataTransfer.getData("id").split(",");
        var objects = [];
        object_ids.forEach((item) => {
          objects.push(document.getElementById(item).textContent)
        })
        editor.focus()
        let x = e.pageX
        let y = e.pageY
        editor.setCursor(editor.coordsChar({ left: x, top: y }))
        _toCodeMirrorCompute(objects, editor, undefined, getActiveVal($(e.target)))
        e.preventDefault();
        e.stopPropagation();
      })
      $(item).find(".CodeMirror").resizable({
        resize: function () {
          editor.setSize($(this).width(), $(this).height());
        }
      });
    }
  })
}
function toggleFormulaButtonOff(el) {
  var modal_id = $(el).closest('.formula-builder').find('textarea').attr('modal_id')
  if (modal_id == undefined) {
    $(el).closest('.tab-pane').parent().find(".formula-btn.activated, .formula-select.activated").removeClass("activated")
  } else {
    $(`#${modal_id}`).find(".formula-btn.activated, .formula-select.activated").removeClass("activated")
  }
}
function toggleButton(ev, toglable = false) {
  ev.preventDefault();
  ev.stopPropagation();
  if (toglable && isSameControl(ev.target)) {
    toggleFormulaButtonOff(ev.target)
  } else {
    toggleFormulaButtonOff(ev.target)
    if (ev.target.type === 'button' || ev.target.type === 'select-one' || ev.target.type === 'number') {
      ev.target.classList.add("activated")
    } else {
      ev.target.parentElement.classList.add("activated")
    }
  }
}
function toggleSelect(ev) {
  toggleButton(ev);
  ev.target.parentElement.classList.add("activated")
}
function toggleSelectPoly(ev, dest) {
  $(`#${dest}`).trigger("click")
  if ($(`#${dest}`).hasClass("activated")) {
    $(ev.target).addClass("activated")
  } else {
    $(ev.target).removeClass("activated")
  }
}
//Does the following
//1. Returns the formula string to be inserted into the compute control with the handling of a sign, basically should a sign be added (prefix or postfix)
//2. Returns the whole string in the compute control with the newly inserted formula string added
//3. Returns the number of characters in the newly inserted formula control
//4. Also inserts a +. -... on double click
function _calculate_position(formula_value, formula_addon, cursorPosition, sign, additive, onlyIncrement = false) {
  let lengthInserted = 0;


  //Inserting to the beginning when the formula control is empty
  if (cursorPosition === 0 && formula_value.length === 0 || formula_value.trim() == "") {
    if (onlyIncrement) {
      lengthInserted = formula_addon.length
      formula_addon = `${formula_addon} `
    } else {
      lengthInserted = formula_addon.length
      formula_addon = `${formula_addon} `
    }
    //Inserting to the beginning when the formula control has content
  } else if (cursorPosition === 0 && formula_value.length > 0) {
    if (formula_value.trim() != "") {
      if (additive.indexOf(formula_value.trim()[0] > -1)) {
        if (onlyIncrement) {
          formula_addon = ` ${formula_addon} `
        } else {
          lengthInserted = 1 + formula_addon.length
          formula_addon = `${formula_addon} ${formula_value}`
        }
      } else {
        if (onlyIncrement) {
          formula_addon = `${formula_addon} ${sign}`
        } else {
          lengthInserted = formula_addon.length + 1 + sign.length
          formula_addon = `${formula_addon} ${sign} ${formula_value}`
        }
      }
    }
  }
  else if (cursorPosition > 0) {
    //You are inserting inbetween or at the very end
    if (formula_value.length >= cursorPosition) {
      var last_ = formula_value.slice(0, cursorPosition)
      var first_ = formula_value.slice(cursorPosition, formula_value.length)
      //I am inserting between 2 pluses/additive characters
      if (additive.indexOf(last_.trim()[last_.trim().length - 1]) > -1 && additive.indexOf(first_.trim()[0]) > -1) {
        if (onlyIncrement) {
          formula_addon = ` ${formula_addon} `
        } else {
          lengthInserted = 1 + formula_addon.length
          formula_addon = `${last_} ${formula_addon} ${first_}`
        }
      } else if (additive.indexOf(last_.trim()[last_.trim().length - 1]) > -1 && first_.trim() == "") {
        //I am inserting at the end and the first part has an additive at the end
        if (onlyIncrement) {
          formula_addon = ` ${formula_addon} `
        } else {
          lengthInserted = 1 + formula_addon.length
          formula_addon = `${last_} ${formula_addon} `
        }
      }
      else if (additive.indexOf(last_.trim()[last_.trim().length - 1]) == -1 && first_.trim() == "") {
        //I am inserting at the end and the first part does not have an additive at the end
        if (onlyIncrement) {
          formula_addon = ` ${sign} ${formula_addon} `
        } else {
          lengthInserted = 1 + sign.length + 1 + formula_addon.length
          formula_addon = `${last_}  ${sign} ${formula_addon} `
        }
      }
      else if (additive.indexOf(last_.trim()[last_.trim().length - 1]) > -1 && additive.indexOf(first_.trim()[0]) == -1) {
        ////I am inserting inbetween and the first part has an additive at the end but the last does not start with an additive
        if (onlyIncrement) {
          formula_addon = ` ${formula_addon} ${sign} `
        } else {
          lengthInserted = 1 + formula_addon.length + 1 + sign.length
          formula_addon = `${last_} ${formula_addon} ${sign} ${first_}`
        }

      } else if (additive.indexOf(first_.trim()[0]) > -1 && additive.indexOf(last_.trim()[last_.trim().length - 1]) == -1) {
        //inserting in the middle, first part does not have an additive but last part does
        if (onlyIncrement) {
          formula_addon = ` ${sign} ${formula_addon} `
        } else {
          lengthInserted = 1 + sign.length + 1 + formula_addon.length
          formula_addon = `${last_} ${sign} ${formula_addon} ${first_}`
        }
      } else if (additive.indexOf(first_.trim()[0]) == -1 && additive.indexOf(last_.trim()[last_.trim().length - 1]) == -1) {
        //inserting in the middle, first part does not have an additive niether does the last
        if (onlyIncrement) {
          formula_addon = ` ${sign} ${formula_addon} ${sign}`
        } else {
          lengthInserted = 1 + sign.length + 1 + formula_addon.length + sign.length
          formula_addon = `${last_} ${sign} ${formula_addon} ${sign} ${first_}`
        }
      }
      //else case is when I am not inserting before or after a plus, I don't think this is executed
    } else {
      if (onlyIncrement) {
        formula_addon = ` ${sign} ${formula_addon}`
      } else {
        lengthInserted = 1 + sign.length + 1 + formula_addon.length
        formula_addon = `${formula_value} ${sign} ${formula_addon}`
      }
    }

  } else if (formula_addon === undefined) {
    formula_addon = sign
    lengthInserted = sign.length
  }
  //When we are dragging and dropping into an empty text area we return formula_addon
  results = { formula_addon: formula_addon, lengthInserted: lengthInserted }
  return results
}
function combinations(arr, k) {
  let n = arr.length
  let result = [];
  var res = [];
  function recurse(start, combos) {
    if (combos.length === k) {
      res = [];
      combos.slice().forEach(i => {
        res.push(arr[i - 1]);
      })
      return result.push(res.join(":"));
    }
    // Check if you can actually create a combo of valid length
    // given current start number
    // For example: 5 choose 4 can't begin with [3] since it would never have 4 numbers
    if (combos.length + (n - start + 1) < k) {
      return;
    }
    recurse(start + 1, combos);
    combos.push(start);
    recurse(start + 1, combos);
    combos.pop();
  }
  recurse(1, []);
  return result;
}
function _form_new_formula_value(objects, cursorPosition, formula_value, active_val, onlyIncrement = false, splinesDeg = "", polyDeg = "") {
  var additive = ['+', '-', '*', '^', '/', ':', '%', '', '%%']
  var insertive = ['(', ')', '|', '&', '>', '<', '==', '!=', '>=', '<=', '%in%', '%/%']
  var wraparive = ['sqrt', 'log', 'log10', 'log2', 'abs', 'exp', 'ceiling', 'floor', "as.numeric", "max", "min", "mean", "median", "sd", "sum", "variance"]
  //Multiple variables NOT allowed
  var multiVariables = ['ToOrdered', 'ToFactor', "ToLogical", "Day of Week", "Month", "Quarters", "Year(XXXX)", "Year(XX)", "Hour(00-12)", "Hour(00-23)", "Date from String", 'Numeric to date', "isTRUE", "is.na"]
  var complexinsert = { 'runif': ` runif(n=nrow(${getActiveDataset()}), min = 0, max = 1)`, 'rnorm': ` rnorm(n=nrow(${getActiveDataset()}), mean = 0, sd = 1)` }
  var complexerap = {
    'sample': [`sample(x= `, `, size=nrow(${getActiveDataset()}), replace = TRUE)`],
    'round': [`round(x= `, `, digits=2)`],
    'signif': [`signif(x= `, `, digits=2)`],
    'gamma': [`gamma(x= `, `)`],
    'lgamma': [`lgamma(x= `, `)`],
    'beta': [`beta(a= `, `, b=Enter a variable name)`],
    'lbeta': [`lbeta(a= `, `, b=Enter a variable name)`],
    'factorial': [`factorial(x= `, `)`],
    'pigamma': [`pigamma(x= `, `, deriv = 0)`],
    'Length': [`str_length(string= `, `)`],
    'Count(matches)': [`str_count(string= `, `, pattern ='Enter the pattern')`],
    'Extract a Number': [`str_extract(string= `, `, pattern="\\\\d+\\\\.*\\\\d*")`],
    'Day of Month': ['as.numeric(strftime(x= ', ', format ="%e", tz=""))'],
    'Day of Year': ['as.numeric(strftime(x= ', ', format ="%j", tz=""))'],
    'Week of Year': ['as.numeric(strftime(x= ', ', format ="%U", tz=""))'],
    'Month(decimal)': ['as.numeric(strftime(x= ', ', format ="%m", tz=""))'],
    'Minutes': ['as.numeric(strftime(x= ', ', format="%I", tz=""))'],
    'Secs': ['as.numeric(strftime(x= ', ', format="%S", tz=""))'],

  }
  var complexerapDynamic = {
    'B-spline': ['splines::bs(', ', deg = 5)'],
    'natural spline': ['splines::ns(', ', deg = 5)'],
    'Orthogonal polynomial': ['stats::poly(', ', deg = 5)'],
    'Raw polynomial': ['stats::poly(', ', deg = 5)', ', raw = TRUE)']

  }

  var differenceInsert = { 'Date Difference': ['as.double(difftime(time1= ', ', time2 =', ', units=c("days")))'] }
  var complexerapstr = {
    'toupper': [`toupper(x=`, `)`],
    'tolower': [`tolower(x=`, `)`],
    'Pad': ['str_pad(string = ', ', width = 5, side = "left", pad ="a" )'],
    'Trim': ['str_trim(string = ', ', side = "left" )'],
    'Extract Substring': ['substr(x= ', ', start ="starting position", stop ="Ending position" )'],
    'Replace Pattern': ['str_replace(string= ', ', pattern="Enter pattern to replace", replacement="Enter string")'],
    'Replace Pattern(ALL)': ['str_replace_all(string= ', ', pattern="Enter pattern to replace", replacement="Enter string")'],
    'ToOrdered': ['factor(x= ', ', ordered=TRUE)'],
    'ToFactor': ['factor(x= ', ' )'],
    'ToCharacter': ['as.character( ', ')'],
    'ToLogical': ['as.logical( ', ')'],
    'Day of Week': ['weekdays(x= ', ', abbreviate = FALSE)'],
    'Month': ['months( ', ', abbreviate = FALSE)'],
    'Quarters': ['quarters( ', ', abbreviate = FALSE)'],
    'Year(XXXX)': ['factor(strftime(x= ', ', format="%Y", tz=""))'],
    'Year(XX)': ['factor(strftime(x= ', ', format="%y", tz=""))'],
    'Hour(00-12)': ['factor(strftime(x= ', ', format="%I", tz=""))'],
    'Hour(00-23)': ['factor(strftime(x= ', ', format="%H", tz=""))'],
    'Date from String': ['as.POSIXct(strptime(x= ', ', format="%d/%m/%Y %H:%M:%S", tz = ""))'],
    'Numeric to date': ['as.Date(x= ', ', origin="1970-01-01")'],
    'String to date': ['as.Date(x= ', ')'],
    'is.na': ['is.na(', ')'],
    'isTRUE': ['isTRUE(', ')'],

  }
  var pasting = {
    'Concatenate': ['', ', sep ="" )'],
  }
  if (objects.length > 1 && multiVariables.includes(active_val)) {
    dialog.showErrorBox("Formula Error", "The function " + active_val + " does not support multiple variables, please select one variable and retry")
    if (onlyIncrement) {
      results = { formula_addon: "", lengthInserted: 0 }
      return results.formula_addon
    } else {
      results = { formula_addon: formula_value, lengthInserted: 0 }
      return results
    }
  }
  var formula_addon = ""
  var sign = "+"
  var lengthInserted = 0
  if (additive.indexOf(active_val) > -1 && active_val != '%in%' && active_val != '%/%') {
    //If there are destination variables selected
    if (objects.length > 1) {
      formula_addon = objects.join(` ${active_val} `)
    } else {
      formula_addon = objects[0] !== undefined ? objects[0] : ""
      sign = active_val
    }
    if (formula_addon != "") {
      results = _calculate_position(formula_value, formula_addon, cursorPosition, sign, additive, onlyIncrement)
    }
    else
    //Here I am just inserting the symbol at the cursor position
    {
      if (onlyIncrement) {
        results = { formula_addon: `${active_val} `, lengthInserted: active_val.length }
      }
      else {
        var last_ = formula_value.slice(0, cursorPosition)
        var first_ = formula_value.slice(cursorPosition, formula_value.length)
        formula_addon = `${last_} ${active_val} ${first_}`
        lengthInserted = 1 + sign.length
        results = { formula_addon: formula_addon, lengthInserted: lengthInserted }
      }
    }
  } else if (insertive.indexOf(active_val) > -1) {
    if (onlyIncrement) {
      results = { formula_addon: `${active_val} `, lengthInserted: active_val.length }
    }
    else {
      var last_ = formula_value.slice(0, cursorPosition)
      var first_ = formula_value.slice(cursorPosition, formula_value.length)
      formula_addon = `${last_} ${active_val} ${first_}`
      lengthInserted = 1 + active_val.length
      results = { formula_addon: formula_addon, lengthInserted: lengthInserted }
    }
  } else if (Object.keys(complexinsert).indexOf(active_val) > -1) {
    var last_ = formula_value.slice(0, cursorPosition)
    var first_ = formula_value.slice(cursorPosition, formula_value.length)
    lengthInserted = 1 + complexinsert[active_val].length
    if (onlyIncrement) {
      results = { formula_addon: ` ${complexinsert[active_val]} `, lengthInserted: lengthInserted }
    }
    else {
      formula_addon = `${last_} ${complexinsert[active_val]} ${first_}`
      results = { formula_addon: formula_addon, lengthInserted: lengthInserted }
    }
  } else if (wraparive.indexOf(active_val) > -1) {
    if (objects.length > 1) {
      formula_addon = `${active_val}(` + objects.join(`) + ${active_val}(`) + ')'
    } else {
      formula_addon = `${active_val}(${objects[0] !== undefined ? objects[0] : ""})`
    }
    //lengthInserted =formula_addon.length
    results = _calculate_position(formula_value, formula_addon, cursorPosition, sign, additive, onlyIncrement)
  } else if (Object.keys(complexerap).indexOf(active_val) > -1) {
    if (objects.length > 1) {
      formula_addon = `${complexerap[active_val][0]}` + objects.join(`${complexerap[active_val][1]} + ${complexerap[active_val][0]}`) + complexerap[active_val][1]
    } else {
      formula_addon = `${complexerap[active_val][0]}${objects[0] !== undefined ? objects[0] : ""}${complexerap[active_val][1]}`
    }
    //lengthInserted =formula_addon.length
    results = _calculate_position(formula_value, formula_addon, cursorPosition, sign, additive, onlyIncrement)
    //handling functions that work on strings where + generates an error
  } else if (Object.keys(complexerapDynamic).indexOf(active_val) > -1) {
    if (active_val == "B-spline" || active_val == "natural spline") {
      if (splinesDeg == "") splinesDeg = "5"
      complexerapDynamic[active_val][1] = ", df =" + splinesDeg + ")";
    }
    if (active_val == "Orthogonal polynomial" || active_val == "Raw polynomial") {
      if (polyDeg == "") polyDeg = "5"
      complexerapDynamic[active_val][1] = ", degree =" + polyDeg + ")";
    }
    if (objects.length > 1) {
      if (active_val == "Orthogonal polynomial" || active_val == "B-spline" || active_val == "natural spline") {
        formula_addon = `${complexerapDynamic[active_val][0]}` + objects.join(`${complexerapDynamic[active_val][1]} + ${complexerapDynamic[active_val][0]}`) + complexerapDynamic[active_val][1]
      } else if (active_val == "Raw polynomial") {
        complexerapDynamic[active_val][1] = ", deg =" + polyDeg;
        formula_addon = `${complexerapDynamic[active_val][0]}` + objects.join(`${complexerapDynamic[active_val][1]} + ${complexerapDynamic[active_val][2]}+ ${complexerapDynamic[active_val][0]}`) + complexerapDynamic[active_val][1]
      }
    } else {
      if (active_val == "Orthogonal polynomial" || active_val == "B-spline" || active_val == "natural spline") {
        formula_addon = `${complexerapDynamic[active_val][0]}${objects[0] !== undefined ? objects[0] : ""}${complexerapDynamic[active_val][1]}`
      }
      else if (active_val == "Raw polynomial") {
        complexerapDynamic[active_val][1] = ", deg =" + polyDeg;
        formula_addon = `${complexerapDynamic[active_val][0]}${objects[0] !== undefined ? objects[0] : ""}${complexerapDynamic[active_val][1]}${complexerapDynamic[active_val][2]}`
        //`${complexerapDynamic[active_val][0]}` + objects.join(`${complexerapDynamic[active_val][1]} + ${complexerapDynamic[active_val][2]}+ ${complexerapDynamic[active_val][0]}`) + complexerapDynamic[active_val][1]
      }
    }
    //lengthInserted =formula_addon.length
    results = _calculate_position(formula_value, formula_addon, cursorPosition, sign, additive, onlyIncrement)
    //handling functions that work on strings where + generates an error
  } else if (Object.keys(complexerapstr).indexOf(active_val) > -1) {
    sign = " "
    if (objects.length > 1) {
      formula_addon = "paste(" + `${complexerapstr[active_val][0]}` + objects.join(`${complexerapstr[active_val][1]} , ${complexerapstr[active_val][0]}`) + complexerapstr[active_val][1] + ", sep='_')"
    } else {
      formula_addon = `${complexerapstr[active_val][0]}${objects[0] !== undefined ? objects[0] : ""}${complexerapstr[active_val][1]}`
    }
    //lengthInserted =formula_addon.length
    results = _calculate_position(formula_value, formula_addon, cursorPosition, sign, additive, onlyIncrement)
    sign = "+"
  } else if (Object.keys(differenceInsert).indexOf(active_val) > -1) {
    sign = " "
    if (objects.length == 2) {
      formula_addon = `${differenceInsert[active_val][0]}` + objects[0] + `${differenceInsert[active_val][1]}` + objects[1] + `${differenceInsert[active_val][2]}`
    }
    else if (objects.length == 1) {
      dialog.showErrorBox("Formula Error", "The function " + active_val + " requires 2 variables to be selected, please retry")
    } else {
      formula_addon = `${differenceInsert[active_val][0]}` + "variable 1" + `${differenceInsert[active_val][1]}` + "variable 2" + `${differenceInsert[active_val][2]}`
    }
    //lengthInserted =formula_addon.length
    results = _calculate_position(formula_value, formula_addon, cursorPosition, sign, additive, onlyIncrement)
    sign = "+"
  } else if (Object.keys(pasting).indexOf(active_val) > -1) {
    sign = " "
    if (objects.length >= 2) {
      formula_addon = "paste(" + objects.join(`,`) + pasting[active_val][1]
    } else if (objects.length == 1) {
      dialog.showErrorBox("Formula Error", "The function " + active_val + " requires multiple variables, please retry")
    } else {
      formula_addon = "paste(variable 1, variable 2..." + pasting[active_val][1]
    }
    //lengthInserted = formula_addon.length
    results = _calculate_position(formula_value, formula_addon, cursorPosition, sign, additive, onlyIncrement)
    sign = "+"
  } else if (active_val.length > 1 && active_val.indexOf("^") > -1) {
    active_val = parseInt(active_val.replace("^", ""))
    objects.forEach(item => {
      for (var i = 1; i <= active_val; i++) {
        formula_addon += ` + I(${item}^${i})`
      }
    })
    //lengthInserted =formula_addon.length
    results = _calculate_position(formula_value, formula_addon.slice(3), cursorPosition, sign, additive, onlyIncrement)
  } else if (parseInt(active_val) !== NaN) {
    active_val = parseInt(active_val)
    if (objects.length < active_val) {
      dialog.showErrorBox("Formula Error", "You need to select N or more variables when creating All N Way interactions")
    } else {
      formula_addon = combinations(objects, active_val).join(" + ")
      lengthInserted = formula_addon.length
      results = _calculate_position(formula_value, formula_addon, cursorPosition, sign, additive, onlyIncrement)
    }
  }
  if (onlyIncrement) {
    return results.formula_addon
  } else {
    return results
  }

}
function tramsformFilter(filter_setting) {
  var check = {
    measure: [],
    class: [],
    type: [],
  }
  if (filter_setting.includes("Dataset")) {
    check.measure.push('dataset')
    check.class.push('dataset')
    check.type.push('dataset')
  }
  if (filter_setting.includes("Scale")) {
    check.measure.push('scale')
    check.class.push('numeric')
    check.type.push('integer')
    check.type.push('double')
  }
  if (filter_setting.includes("Numeric")) {
    check.class.push('integer')
    check.class.push('double')
  }
  if (filter_setting.includes('Nominal')) {
    check.measure.push('nominal')
    check.measure.push('factor')
    check.class.push('factor')
    check.type.push('integer')
  }
  if (filter_setting.includes('Ordinal')) {
    check.measure.push('ordinal')
    check.measure.push('ordered')
    check.class.push('ordered')
    check.type.push('integer')
  }
  if (filter_setting.includes('String')) {
    check.measure.push('string')
    check.class.push('character')
    check.type.push('character')
  }
  if (filter_setting.includes('Logical')) {
    check.measure.push('logical')
    check.class.push('logical')
    check.type.push('logical')
  }
  if (filter_setting.includes('Date')) {
    check.measure.push('date')
    check.measure.push('scale')
    check.class.push('date')
    check.class.push('Date')
    check.class.push('POSIXct')
    check.type.push('double')
  }
  if (filter_setting.includes('semFactor')) {
    check.class.push('semFactor')
  }
  if (filter_setting.includes('relation')) {
    check.class.push('relation')
  }
  if (filter_setting.includes('covariance')) {
    check.class.push('covariance')
  }
  if (filter_setting.includes('structuralParameter')) {
    check.class.push('structuralParameter')
  }
  return check
}
function filterInput(type_expected, value) {
  numeric_classes = ["numeric", "integer", "double"]
  if (type_expected === 'numeric' && numeric_classes.indexOf(value) == -1) {
    ipcRenderer.invoke('errormessage', { title: "Not expected Type", message: `This field expect numeric, not a sting` });
    return false
  } else if (type_expected === 'character' && numeric_classes.indexOf(value) != -1) {
    ipcRenderer.invoke('errormessage', { title: "Not expected Type", message: `This field expect string, not a numeric` });
    return false
  }
  return true
}
function _filter(filter_setting, object) {
  if (filter_setting) {
    var filtering_rules = tramsformFilter(filter_setting)
    var element = $($.parseHTML(object))
    var _type = element.attr('bs-row-type')
    var _class = element.attr('bs-row-class')
    var _measure = element.attr('bs-row-measure')
    var contains = filtering_rules.measure.indexOf(_measure) > -1 && filtering_rules.class.indexOf(_class) > -1 && filtering_rules.type.indexOf(_type) > -1
    if (!contains) {
      ipcRenderer.invoke('errormessage', { title: "Not expected Type", message: `The variable ${element.text()} cannot be moved, the destination does not allow variables of that type` });
    }
    return contains
  }
  return true
}
function r_on_select(modal_id, r_commands, val = "") {
  Object.keys(r_commands).forEach(function (item, index) {
    r_commands[item] = Sqrl.Render(r_commands[item], { dataset: { name: getActiveDataset() }, value: val })
  })
  Object.keys(r_commands).forEach(function (item, index) {
    ipcRenderer.invoke('updateModal', { element_id: `${modal_id}_${item}`, cmd: r_commands[item] })
  })
}
function clearComboChild(el_id) {
  $(`#${el_id}`).children().each(function (index, element) {
    element.remove()
  })
  if ($(`#${el_id}`).siblings('.list-group').length != 0) {
    $(`#${el_id}`).siblings('.list-group').remove()
  }
}
function clearCombo(id) {
  var _def = []
  if (!($(`#${id}`).attr('default') == "" || $(`#${id}`).attr('default') == undefined)) {
    _def = $(`#${id}`).attr('default')
  }
  $(`#${id}`).find('option').each(function (index, item) {
    if (_def != []) {
      if (_def.includes(item.value)) {
        if ($(`#${id}`).siblings("ul").length !== 0) {
          $(`#${id}`).siblings("ul").find("a")[index].classList.add("active");
        }
        item.setAttribute("selected", "selected")
      }
    } else {
      item.removeAttribute('selected');
      if ($(`#${id}`).siblings("ul").length !== 0) {
        $(`#${id}`).siblings("ul").find("a")[index].classList.remove("active");
      }
    }
  })
}
function renderCombo(element_id, content) {
  clearComboChild(element_id)
  var _def = $(`#${element_id}`).attr('default')
  var _opt_template = `{{ each(options.options) }}
      <option {{ if (options.default && options.default.split("|").includes(@this))}}selected="selected"{{/if}}>{{@this}}</option>
    {{/each}}`
  var _opt = Sqrl.Render(_opt_template, { options: content, default: _def })
  $(`#${element_id}`).append(_opt);
  if (!$(`#${element_id}`).parent()[0].classList.contains("simple-select")) {
    var list_group = $($(`#${element_id}`).parent().html()).listgroup();
    $(`#${element_id}`).before(list_group.siblings()[0])
  }
  clearCombo(element_id)
}
function renderDependants(item) {
  if (item.getAttribute("data-dependants")) {
    item.getAttribute("data-dependants").split(",").forEach(function (dependant) {
      if (item.checked) {
        $(dependant).prop('disabled', false)
      } else {
        $(dependant).prop('disabled', true)
        if ($(dependant).attr('type') == "text") {
          $(dependant).val("")
        }
      }
    })
  }
}
function focusInput(ev) {
  $(ev.target.closest('div[bs-type="switchcase"]')).find('input').removeClass('focus')
  $(ev.target).addClass('focus')
}

function moveToDst(ev) {
  ev.preventDefault();
  ev.stopPropagation();
  var objects = []
  var ids = []
  var modal_id = $(`#${ev.currentTarget.id}`).parent().siblings()[0].children[0].getAttribute("modal_id")
  var dst_id = $(`#${ev.currentTarget.id}`).parent().siblings()[0].children[0].id
  var action;
  if ($(`#${dst_id}`)[0].type == "textarea") {
    $(`#${modal_id} .list-group-item-action.active`).each(function (index, item) {
      objects.push(item.textContent)
    })
    _to_formula(objects, dst_id)
  } else {
    //Get the source controls can I can drag from
    let allowableDragCtrlsString =$(`#${dst_id}`).attr("allowedSrcCtrls")
    let allowableDragCtrls = []
    if (allowableDragCtrlsString != undefined)
    {
      //Get the allowable drag controls from the destination 
      allowableDragCtrls = JSON.parse(allowableDragCtrlsString)
    }
    //Check if the source of the drag and drop is valid
    if (allowableDragCtrls.length !=0)
    {
      allowableDragCtrls.forEach(function(element, index){
      $(`#${element} .list-group-item-action.active`).filter(function () {
        return !$(this).hasClass('termsDst')
      }).each(function (index, item) {
        objects.push(item.outerHTML)
        ids.push(item.id)
        action = $(`#${item.id.split("_")[0]}`).attr("act")
      })
    })
    } else {
    // the filter function prevents selected items from objects of class modelTermsDst from being moved
    $(`#${modal_id} .list-group-item-action.active`).filter(function () {
      return !$(this).hasClass('termsDst')
    }).each(function (index, item) {
      objects.push(item.outerHTML)
      ids.push(item.id)
      action = $(`#${item.id.split("_")[0]}`).attr("act")
    })
    }
    _drop(objects, action, ids, dst_id)
  }
}


module.exports.selectElement = (ev) => {
  ev.preventDefault();
  ev.stopPropagation();
  var el = document.getElementById(ev.target.id)
  var parentId = el.parentElement.id;
  var modal_id = document.getElementById(parentId).getAttribute("modal_id");
  $(`#${modal_id} .list-group-item-action.active`).not(`#${parentId} .list-group-item-action.active`).removeAttr("active");
  $(`#${modal_id} .list-group-item-action.active`).not(`#${parentId} .list-group-item-action.active`).parent().removeAttr("clicked")
  $(`#${modal_id} .list-group-item-action.active`).not(`#${parentId} .list-group-item-action.active`).parent().removeAttr("shiftclicked")
  $(`#${modal_id} .list-group-item-action.active`).not(`#${parentId} .list-group-item-action.active`).removeClass("active");
  if (ev.shiftKey) {
    if ($(`#${parentId}`).attr("shiftclicked") === undefined) {
      $(`#${parentId} .list-group-item-action.active`).removeAttr("active");
      $(`#${parentId} .list-group-item-action.active`).removeClass("active");
    }
    var kids = $(`#${parentId}`).children()
    var start = undefined
    var end = undefined
    kids.each((index, item) => {
      if (item.id === ev.target.id) start = index
      if (item.id === $(`#${parentId}`).attr("clicked")) end = index
    })
    if (start !== undefined && end !== undefined) {
      if (start > end) {
        var buf = start;
        start = end
        end = buf
      }
      for (var i = start; i <= end; i++) {
        if (kids[i].id !== ev.target.id) {
          document.getElementById(kids[i].id).setAttribute("active", "");
          document.getElementById(kids[i].id).classList.add("active");
        }
      }
    }
    $(`#${parentId}`).attr("shiftclicked", "")
  } else if (ev.ctrlKey || ev.metaKey) {
    $(`#${parentId}`).removeAttr("shiftclicked")
  } else {
    $(`#${parentId} .list-group-item-action.active`).removeAttr("active");
    $(`#${parentId} .list-group-item-action.active`).removeClass("active");
    $(`#${parentId}`).removeAttr("shiftclicked");
  }
  $(`#${parentId}`).attr("clicked", ev.target.id)
  if (el.classList.contains("active")) {
    el.removeAttribute("active");
    el.classList.remove("active");
  } else {
    el.setAttribute("active", "");
    el.classList.add("active");


    //The if is added to make sure that the direction of the move button does not change on the semmodelterms control
    // if ($(`#${parentId}`).attr("type") != "semModelTerms")
    attachActionToMoveArrow(parentId);
  }
}
module.exports.selectListItem = (ev) => {
  ev.preventDefault();
  ev.stopPropagation();
  if (ev.currentTarget.classList.contains("active")) ev.currentTarget.classList.remove("active")
  else ev.currentTarget.classList.add("active");
}
module.exports.dropToSwitchCase = (ev) => {
  _drop_to_compute(ev, $(ev.target))
}
module.exports.dropToTextArea = (ev, parentID = null) => {
  if (parentID === null) {
    parentID = ev.target.id;
  }
  _drop_to_compute(ev, parentID)
}
module.exports.dropToInputAditive = (ev) => {
  ev.preventDefault();
  var parentID = ev.target.id;
  var object_ids = ev.dataTransfer.getData("id").split(",");
  var objects = [];
  object_ids.forEach((item) => {
    objects.push(document.getElementById(item).textContent)
  })
  if (filterInput($(`#${parentID}`).attr("bs-type"), "character")) {
    var addon = ""
    if ($(`#${parentID}`).val().length > 0) {
      addon = $(`#${parentID}`).val()
      if (!$(`#${parentID}`).val().endsWith(",")) {
        addon += ","
      }
    }
    $(`#${parentID}`).val(addon + objects.join(","));
  }
}
module.exports.addRowToSwitchCase = (el) => {
  var el_index = parseInt($(`#${el}`).children().last().attr('el_index'))
  el_index = isNaN(el_index) ? 0 : el_index + 1
  if ($(`#${el}`).find('input[bs-type="switchelse"]').length > 0) {
    var el_index_else = parseInt($(`#${el}`).children().slice(-2).first().attr('el_index'))
    var el_index_if = parseInt($(`#${el}`).children().last().attr('el_index'))
    el_index = el_index_else > el_index_if ? el_index_else + 1 : el_index_if + 1
  }
  var switchEl = `<div class="row bg-gray m-1 p-2 mr-3" el_index=${el_index}>
    <div class="col-11">
        <div class="row">
            <div class="col-2">
                IF
            </div>
            <div class="col-10 cm" bs-type="switchif"></div>
        </div>
        <div class="row">
            <div class="col-2">
                THEN
            </div>
            <div class="col-10 cm" bs-type="switchthen"></div>
        </div>
    </div>
    <div class="col-1 p-1 pt-4">
        <button class='btn btn-secondary btn-top-menu p-1' onclick='removeSwitchCase("${el}", ${el_index})' parentdiv="${el}"><i class="fas fa-trash"></i></button></div>
    </div>
  </div>`
  if ($(`#${el}`).find('input[bs-type="switchelse"]').length > 0) {
    $(`#${el}`).find('input[bs-type="switchelse"]').closest('[el_index]').before(switchEl)
  } else {
    $(`#${el}`).append(switchEl)
  }
  createCMFromTestArea($(`#${el}`).closest(".modal").attr("id"))
}
module.exports.addElseToSwitchCase = (el) => {
  if ($(`#${el}`).find('input[bs-type="switchelse"]').length > 0) {
    dialog.showErrorBox("Conditional Compute Error", "Only one else statement allowed")
  } else {
    var el_index = parseInt($(`#${el}`).children().last().attr('el_index'))
    el_index = isNaN(el_index) ? 0 : el_index + 1
    $(`#${el}`).append(`<div class="row bg-gray m-1 p-2 mr-3" el_index=${el_index}>
      <div class="col-11">
          <div class="row">
              <div class="col-2">
                  ELSE
              </div>
              <div class="col-10 cm" bs-type="switchelse"></div>
          </div>
      </div>
      <div class="col-1 p-1 pt-1">
          <button class='btn btn-secondary btn-top-menu p-0' onclick='removeSwitchCase("${el}", ${el_index})' parentdiv="${el}"><i class="fas fa-trash"></i></button></div>
      </div>
    </div>`)
    createCMFromTestArea($(`#${el}`).closest(".modal").attr("id"))
  }
}
module.exports.dropWrapped = (ev) => {
  ev.preventDefault();
}
module.exports.drop = (ev, parentID = null) => {
  ev.preventDefault();
//The drop destination can be a listbox or an item in the listbox 
  if (parentID === null) {
    parentID = ev.target.id;
  }
  var el = undefined
    try {
      el = $(`#${parentID}`)
    } catch {
      el = $(document.getElementById(parentID))
    }
    if (!el.attr("bs-type")) {
      //Address case when the target is an item in the listbox
      el = el.parent()
      parentID = el.attr("id")
    }
  //Get the source controls can I can drag from
  let allowableDragCtrlsString =$(`#${parentID}`).attr("allowedSrcCtrls")
  let allowableDragCtrls = []
  if (allowableDragCtrlsString != undefined)
  {
    //Get the allowable drag controls from the destination 
    allowableDragCtrls = JSON.parse(allowableDragCtrlsString)
  }
  let srcDragCtrl = ev.dataTransfer.getData("srcDragName")
 //Check if the source of the drag and drop is valid
  if (allowableDragCtrls.length !=0)
  {
    if ( allowableDragCtrls.indexOf(srcDragCtrl) == -1)
    {
        let srcDragCtrlLabel = $(`#${srcDragCtrl}`).siblings('h6').text()
        dialog.showMessageBoxSync({ type: "error", buttons: ["OK"], title: "Error", message: `The destination control does not allow variables to be dropped from the source control with label "${srcDragCtrlLabel}".` })
        return
    }
  }
  var objects = [];
  var elTarget = document.getElementById(parentID)
  var action = ev.dataTransfer.getData("action");
  var object_ids = ev.dataTransfer.getData("id").split(",");
  if (document.getElementById(object_ids[0])) {
    //If I am dropping a variable from the aggregate control to the same aggregate control, I do nothing
    //There are 2 cases here, case 1, I drop an existing variable in the aggregate control to an empty place in the same control
    //Case 2, I drop an existing variable to an already exsting variable in that aggregate control
    if (((document.getElementById(object_ids[0]).parentNode.id == elTarget.parentNode.id) || (document.getElementById(object_ids[0]).parentNode.id == elTarget.id)) && elTarget.closest('div[bs-type="wrapcontrol"]') != null)
      return
  }
  object_ids.forEach((item) => {
    if (document.getElementById(item)) {
      if (document.getElementById(item).getAttribute("original")) {
        document.getElementById(item).innerText = document.getElementById(item).getAttribute("original")
        document.getElementById(item).removeAttribute("original")
        document.getElementById(item).removeAttribute("aggregation")
      }
      objects.push(document.getElementById(item).outerHTML)
    }
  })
  //I noticed that whenever I dropped an item from an aggregate control to the same aggregate control over an existing variable OR
  //I drop an item from the aggregate control to the source variable list over an existing variable, the 
  //the code comes to this function 2 times, the if loop just prevents the _drop from running twice
  //in the event I am moving from the destination aggregate control back to the source as the destination variable is removed
  if (objects.length > 0)
    _drop(objects, action, object_ids, parentID)
}

module.exports.dropToInput = (ev) => {
  ev.preventDefault();
  var parentID = ev.target.id;
  var object_ids = ev.dataTransfer.getData("id").split(",");
  
  var objects = [];
  object_ids.forEach((item) => {
    objects.push(document.getElementById(item).textContent)
  })
  if (filterInput($(`#${parentID}`).attr("bs-type"), "character")) {
    //I will be using this code for a new textarea control
    //let temp =$(`#${parentID}`).val();
    //$(`#${parentID}`).val(temp+objects[0]);srcDragName
    $(`#${parentID}`).val(objects[0]);
  }
}
module.exports.allowDrop = (ev) => {
  ev.preventDefault();
}
module.exports.drag = (ev, action) => {
  var ids = []
  //Save the uniqueid of the control you are dragging from
  //This allows me to check whether the destination allows me to drip items from the source
  let srcDragName =""
  $(`#${document.getElementById(ev.target.id).parentNode.id}`).find(".active").each((i, el) => {
    ids.push(el.id)
  })
  if (ids.indexOf(ev.target.id) === -1) {
    ids.push(ev.target.id)
  }
  srcDragName = document.getElementById(ev.target.id).parentNode.id
  ev.dataTransfer.setData("srcDragName", srcDragName);
  ev.dataTransfer.setData("action", action);
  ev.dataTransfer.setData("id", ids);
}
module.exports.toFormula = (ev) => {
  _to_compute(ev, $(ev.target).closest('.formula-builder').find("textarea").attr('id'))
}

let timer

module.exports.cancelSingleClick = (ev) => {
  ev.preventDefault();
  ev.stopPropagation();
  clearTimeout(timer)

}

module.exports.toFormulaWithTimer = (ev) => {
  if (ev.detail === 1) {
    timer = setTimeout(() => {
      _to_compute(ev, $(ev.target).closest('.formula-builder').find("textarea").attr('id'))
    }, 200)
  }
}

module.exports.toFocusedInputWithTimer = (ev) => {
  if (ev.detail === 1) {
    timer = setTimeout(() => {
      //_to_compute(ev, $(ev.target).closest('.formula-builder').find("textarea").attr('id'))
      if ($(ev.target).closest('div.tab-content').closest('.row.mb-1').next().find("div.col-10.focus")[0] == undefined) {
        dialog.showErrorBox("Error", "An input control associated with a if or then condition needs to be selected. Use your mouse to select a position in the if or then control and retry.")
      }
      else {
        _to_compute(ev, $(ev.target).closest('div.tab-content').closest('.row.mb-1').next().find("div.col-10.focus"))
      }
    }, 200)
  }
}

module.exports.toFocusedInput = (ev) => {
  if ($(ev.target).closest('div.tab-content').closest('.row.mb-1').next().find("div.col-10.focus")[0] == undefined) {
    dialog.showErrorBox("Error", "An input control associated with a if or then condition needs to be selected. Use your mouse to select a position in the if or then control and retry.")
  }
  else {
    _to_compute(ev, $(ev.target).closest('div.tab-content').closest('.row.mb-1').next().find("div.col-10.focus"))
  }

}
module.exports.enablyStickyDivs = (modal_id) => {
  $(`#${modal_id} .sticky-left`).closest('div.modal-content').on("scroll", function (ev) {
    $(ev.target).find(".sticky-left").each((ind, el) => {
      if ($(el).attr("data-offset") == undefined) {
        $(el).attr("data-offset", el.offsetTop)
        $(el).attr("data-height", $(el).parent().height())
      }
      if (ev.target.scrollTop < 70) {
        var offsetT = $(el).attr("data-offset")
        $(el).css("top", `${offsetT}px`)
        $(el).css("position", "")
        $(el).css("width", "")
      }
      if (ev.target.scrollTop > $(el).attr("data-height") + 20 - $(el).height()) {
        if ($(el).css("position") == "fixed") {
          $(el).css({
            "position": "sticky",
            "width": "100%"
          })
        }
      }
    })
  })
}
module.exports.disableStickyDivs = (modal_id) => {
  $(`#${modal_id} .sticky-left`).closest('div.modal-content').off("scroll")
}
module.exports.openFileControlDialog = (id, dialog_type) => {
  var openDialogProps = ['createDirectory', 'treatPackageAsDirectory']
  if (dialog_type == 'folder') {
    openDialogProps.push('openDirectory')
  } else {
    openDialogProps.push('openFile')
  }
  filepath = dialog.showOpenDialogSync(getCurrentWindow(), {
    title: 'Open File',
    buttonLabel: 'Select',
    properties: openDialogProps
  })
  if (filepath !== undefined) {
    $(`#${id}`).val(filepath[0].replace(/\\/g, "/")) //path should contain forward slash /
  }
}
module.exports.saveFileControlDialog = (id, dialog_type) => {
  var saveDialogProps = ['createDirectory', 'treatPackageAsDirectory']
  let extensions = [
    { name: 'R Data Format', extensions: ['RData'] }
  ]
  filepath = dialog.showSaveDialogSync(getCurrentWindow(), {
    title: 'Specify a file name or select a file to save selected model(s) to',
    buttonLabel: 'Select',
    properties: saveDialogProps,
    filters: extensions
  })
  if (filepath !== undefined) {
    $(`#${id}`).val(filepath.replace(/\\/g, "/")) //path should contain forward slash /
  }
}
module.exports.removeSwitchCase = (el, el_index) => {
  $(`#${el}`).find(`div[el_index=${el_index}]`).remove()
}
module.exports.changeRadio = (event) => {
  if ($(`input[name="${event.target.name}"][data-dependants]`).length > 0) {
    $(`input[name="${event.target.name}"]`).each(function (_, item) {
      renderDependants(item)
    })
  }
}
module.exports.changeCheckBox = (event) => {
  if ($(`#${event.target.id}`).attr("data-dependants")) {
    renderDependants(event.target)
  }
}
module.exports.resetComputeBuilderButtons = (ev) => {
  var builder_id = $(ev.target).closest('.formula-builder').attr('builder_id')
  if (builder_id !== undefined) {
    $(`[builder_id=${builder_id}]`).find(".formula-btn.activated, .formula-select.activated").removeClass("activated")
  } else {
    $(ev.target).closest('.row').next().find(".formula-btn.activated, .formula-select.activated").removeClass("activated")
  }
}
module.exports.renderChild = (el) => {
  var value = $(`#${el.id}`).find('option:selected')[0].innerHTML
  var child_id = el.getAttribute("child_combo");
  if ($(`#${el.id}`).attr("previouslyActive") === value && $(`#${child_id} option`).length > 0) {
    clearComboChild(child_id)
    $(`#${el.id}`).siblings().find(".active").removeClass("active")
    $(`#${el.id}`).val([])
  } else if ($(`#${child_id} option`).length == 0) {
    renderCombo(child_id, $(`#${el.id} option:contains('${value}')`).attr("kids").split("|"));
  } else {
    renderCombo(child_id, $(`#${el.id} option:selected`).attr("kids").split("|"));
  }
  $(`#${el.id}`).attr("previouslyActive", value)
}
module.exports.r_before_modal = (modal_id) => {
  var r_commands = JSON.parse($(`#${modal_id}_pre_r`).html())
  r_on_select(modal_id, r_commands)
  $(`#${modal_id}`).modal('show');
}

function renderSelect(element_id, content) {
  clearSelect(element_id)
  var _def = $(`#${element_id}`).attr('default')
  var _opt_template = `{{ each(options.options) }}
      <option {{ if (options.default && options.default.split("|").includes(@this))}}selected="selected"{{/if}}>{{@this}}</option>
    {{/each}}`
  var _opt = Sqrl.Render(_opt_template, { options: content, default: _def })
  $(`#${element_id}`).append(_opt);
}

function clearSelect(element_id) {
  let noOfentries = document.getElementById(element_id).length
  if (noOfentries > 0) {
    for (i = 0; i < noOfentries; i++) {
      document.getElementById(element_id).remove(0);
    }
  }
}

module.exports.updateModalHandler = (element_id, content) => {
  var el_type = $(`#${element_id}`).attr('bs-type')
  switch (el_type) {
    case 'combobox':
      renderCombo(element_id, content)
      $(`#${element_id}`).trigger('change');
      break;
    case 'select':
      renderSelect(element_id, content)
      $(`#${element_id}`).trigger('change');
      break;

    case 'label':
      switch (typeof (content)) {
        case "boolean":
          conent = content.toString().toUpperCase()
          break;
        case "object":
          content = content.join(", ")
        default:
          content = content !== "" ? content : "OFF"
      }
      $(`#${element_id}`).text(content)
      break;
    default:
      ipcRenderer.invoke("log", { message: `No such handler ${el_type} from ${element_id}`, source: "ModalHandler", event: "error" })
  }
}
function populateVariablesOfDataset(ctrlToPopulate, title, value, type) {
  document.getElementById(title).innerText = "Variables from the " + type + " dataset: " + value;
  $(`#${ctrlToPopulate}`).children().each(function (index, element) {
    element.remove()
  })
  var dataset = value;
  var item_id = ctrlToPopulate
  var data = store.get(dataset);
  if (data !== undefined) {
    var order = []
    data.cols.forEach(element => {
      var item_name = element.Name[0];
      order.push(`${item_id}_${value}_${item_name.replace(/ /g, "_")}`)
      $(`#${item_id}`).append(`<a href="#" 
                            id="${item_id}_${value}_${item_name.replace(/ /g, "_")}"
                            class="list-group-item list-group-item-sm list-group-item-action measure-${element.Measure[0]} class-${element.ColClass[0]}" 
                            draggable="true" 
                            bs-row-type="${element.Type[0]}" 
                            bs-row-class="${element.ColClass[0]}" 
                            bs-row-measure="${element.Measure[0]}" 
                            ondrop="drop(event)"
                            onclick="selectElementMergeDatasets(event)">${item_name}</a>`)
    });
    $(`#${item_id}`).attr('order', order.join("|||"))
  } else {
    throw (`${dataset} is empty`)
  }
}
function addToJoin(modal_id, listOfVariablesToJoinBy) {
  var joinString = []
  var pasteString = []
  if ($(`#${modal_id} .list-group-item-action.active`).length != 2) {
    dialog.showMessageBoxSync({ type: "error", buttons: ["OK"], title: "Join variables incorrectly specified", message: "You need to select a single variable from both the active dataset and the target dataset to join by " })
    return false;
  }
  else {
    //Making all existing selections in the listOfVariablesToJoinBy control inactive
    $(`#${listOfVariablesToJoinBy} .list-group-item.active`).each(
      function (_, el) {
        el.removeAttribute("active");
        el.classList.remove("active");
      }
    )
    $(`#${modal_id} .list-group-item-action.active`).each(
      function (_, element) {
        joinString.push(element.innerText)
        pasteString.push("'" + element.innerText + "'")
      }
    )
    let ul = document.getElementById(listOfVariablesToJoinBy).getElementsByTagName('ul');
    let li = document.createElement("li");
    let idstring = joinString.join("_")
    li.setAttribute('id', idstring);
    li.classList.add('list-group-item');
    li.classList.add('list-group-item-sm');
    li.classList.add('active');
    let attClick = document.createAttribute("onclick");       // Create a "class" attribute
    attClick.value = "selectForDeletionMergeDatasets(event)";                 // Set the value of the class attribute
    li.setAttributeNode(attClick);
    joinString = joinString.join("=")
    pasteString = pasteString.join("=")
    li.setAttribute('pasteString', pasteString);
    li.appendChild(document.createTextNode(joinString));
    ul[0].appendChild(li);
  }
}
module.exports.selectForDeletionMergeDatasets = (ev) => {
  ev.preventDefault();
  ev.stopPropagation();
  var el = document.getElementById(ev.target.id)
  var parentId = el.parentElement.id;
  if (el.classList.contains("active")) {
    el.removeAttribute("active");
    el.classList.remove("active");
  } else {
    el.setAttribute("active", "");
    el.classList.add("active");
  }
}
function removeFromJoin(listOfVariablesToJoinBy) {
  let liList = document.getElementById(listOfVariablesToJoinBy).getElementsByTagName('ul')[0].getElementsByClassName('active');
  let ul = document.getElementById(listOfVariablesToJoinBy).getElementsByTagName('ul')[0];
  if (liList.length == 0) {
    ipcRenderer.invoke('errormessage', { title: "Error", message: `You must select an entry to delete before clicking the delete button` });
  }
  else {
    let count = liList.length
    for (i = 0; i < count; i++) {
      ul.removeChild(liList[0])
    }
  }
}
module.exports.moveToSrc = moveToSrc
module.exports.moveToDst = moveToDst
module.exports.attachActionToMoveArrow = attachActionToMoveArrow
module.exports.arrangeFocus = arrangeFocus
module.exports.createCMFromTestArea = createCMFromTestArea
module.exports.toggleFormulaButtonOff = toggleFormulaButtonOff
module.exports.toggleButton = toggleButton
module.exports.toggleSelect = toggleSelect
module.exports.renderDependants = renderDependants
module.exports.r_on_select = r_on_select
module.exports.populateVariablesOfDataset = populateVariablesOfDataset
module.exports.addToJoin = addToJoin
module.exports.removeFromJoin = removeFromJoin
module.exports.toggleSelectPoly = toggleSelectPoly
module.exports._drop = _drop
