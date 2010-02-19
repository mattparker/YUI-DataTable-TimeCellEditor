/*
Copyright (c) 2010 Lamplight Database Systems Limited. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
*/

(function(){


  var widget = YAHOO.widget,
      lang = YAHOO.util.Lang,
      BCE = YAHOO.widget.BaseCellEditor,
      Dom = YAHOO.util.Dom;


/****************************************************************************/
/****************************************************************************/
/****************************************************************************/
    
/**
 * The TimeCellEditor class provides functionality for inline editing
 * DataTable cell data that are times
 *
 * @namespace YAHOO.widget
 * @class TimeCellEditor
 * @extends YAHOO.widget.BaseCellEditor
 * @constructor
 * @param oConfigs {Object} (Optional) Object literal of configs.
 */
widget.TimeCellEditor = function(oConfigs) {
    this._sId = "yui-timeceditor" + YAHOO.widget.BaseCellEditor._nCount++;
    widget.TimeCellEditor.superclass.constructor.call(this, "time", oConfigs); 
};

// TimeCellEditor extends BaseCellEditor
lang.extend(widget.TimeCellEditor, BCE, {

/////////////////////////////////////////////////////////////////////////////
//
// TimeCellEditor public properties
//
/////////////////////////////////////////////////////////////////////////////

/**
 * Reference to the select elements.
 *
 * @property selects.  selects[0] is hour select element; selects[1] is minutes.
 * @type HTMLElement[] 
 */
selects : [],

/**
 * Array of selected time; value[0] = hours, value[1] = minutes.
 *
 * @property value
 * @type Array[] 
 */
value : '',


/////////////////////////////////////////////////////////////////////////////
//
// TimeCellEditor public methods
//
/////////////////////////////////////////////////////////////////////////////

/**
 * Render a form with input(s) type=select.
 *
 * @method renderForm
 */
renderForm : function() {


    var i=0,
        elId = this.getId() + "-sel",
        fmString = '<select name="' + elId + '-hours" id="' + elId + '-hours">';
    
    for( i = 0; i < 24 ; i++ ){
      fmString += '<option value="' + i + '"';
        //if( this.value[ 0 ] == i ){ fmString += ' selected="selected"'; }
      fmString += '>' + ( i < 10 ? '0' : '' ) + i + '</option>';    
    }
    
    fmString += "</select> : ";
    
        
    fmString += '<select name="' + elId + '-mins" id="' + elId + '-mins">';
    
    for( i = 0; i < 60 ; i++ ){
      fmString += '<option value="' + i + '"';
       // if( this.value[ 1 ] == i ){ fmString += ' selected="selected"'; }
      fmString += '>'  + ( i < 10 ? '0' : '' ) +  i + '</option>';      
    }
    
    fmString += "</select>";
    
    
    
    this.getContainerEl().innerHTML += fmString;

    
    this.selects[ 0 ] = Dom.get( elId + "-hours" );
    this.selects[ 1 ] = Dom.get( elId + "-mins" );


        if(this.disableBtns) {
            this.handleDisabledBtns();
        }
        
            
    /*

    if(lang.isArray(this.checkboxOptions)) {
        var checkboxOption, checkboxValue, checkboxId, elLabel, j, len;
        
        // Create the checkbox buttons in an IE-friendly way...
        for(j=0,len=this.checkboxOptions.length; j<len; j++) {
            checkboxOption = this.checkboxOptions[j];
            checkboxValue = lang.isValue(checkboxOption.value) ?
                    checkboxOption.value : checkboxOption;

            checkboxId = this.getId() + "-chk" + j;
            this.getContainerEl().innerHTML += "<input type=\"checkbox\"" +
                    " id=\"" + checkboxId + "\"" + // Needed for label
                    " value=\"" + checkboxValue + "\" />";
            
            // Create the labels in an IE-friendly way
            elLabel = this.getContainerEl().appendChild(document.createElement("label"));
            elLabel.htmlFor = checkboxId;
            elLabel.innerHTML = lang.isValue(checkboxOption.label) ?
                    checkboxOption.label : checkboxOption;
        }
        
        // Store the reference to the checkbox elements
        var allCheckboxes = [];
        for(j=0; j<len; j++) {
            allCheckboxes[allCheckboxes.length] = this.getContainerEl().childNodes[j*2];
        }
        this.checkboxes = allCheckboxes;

        if(this.disableBtns) {
            this.handleDisabledBtns();
        }
    }
    else {
    }
    */
},

/**
 * After rendering form, if disabledBtns is set to true, then sets up a mechanism
 * to save input without them. 
 *
 * @method handleDisabledBtns
 */
handleDisabledBtns : function() {
    Ev.addListener(this.getContainerEl(), "click", function(v){
        if(Ev.getTarget(v).tagName.toLowerCase() === "input") {
            // Save on blur
            this.save();
        }
    }, this, true);
},

/**
 * Resets CheckboxCellEditor UI to initial state.
 *
 * @method resetForm
 */
resetForm : function() {

  if( this.value.indexOf( ':' ) !== -1 ){
    
    var arTime = this.value.split( ':' );
    this.selects[ 0 ].selectedIndex = arTime[ 0 ];
    this.selects[ 1 ].selectedIndex = arTime[ 1 ];
    
  }
    
},

/**
 * Sets focus in CheckboxCellEditor.
 *
 * @method focus
 */
focus : function() {

    this.selects[0].focus();
},



/**
 * Retrieves input value from CheckboxCellEditor.
 *
 * @method getInputValue
 */
getInputValue : function() { 
    var h = this.selects[0].selectedIndex,
        m = this.selects[1].selectedIndex;
        
    return ( h < 10 ? "0" : "" ) + h + ":" + ( m < 10 ? "0" : "" ) + m ;
    
}

});

// Copy static members to CheckboxCellEditor class
lang.augmentObject(widget.CheckboxCellEditor, BCE);



})();

