/* Campfire.js
 * Written by Jesse Lawson <jesse@lawsonry.com>
 * \ Website: https://lawsonry.com/campfire
 * \ GitHub: lawsonry
 * \ Twitter: @lawsonry
 * 
*/

const DEBUG = true

function Log(message) {
    if(DEBUG) console.log("[ Campfire.js ] "+message)
}

function Campfire() {
    
    // Triggers
    // Triggers are stored like this:
    // { trigger: function(), events: [{targetId:<string>,addClass:<string>}], optionalCallback() }
    this.triggers = []

    // Switches
    // Switches are stored like this:
    // { switch: <string>, state: <true or false> }
    this.switches = []

    // Functions for debugging
    _getTriggers = () => { return this.triggers }

    onLoadCallback = function() {}

    _onLoad = () => {
        // Safely determine whether we're loaded or not, and ensure we only call onLoad() once
        if (
          document.readyState === "complete" || 
        (document.readyState !== "loading" && !document.documentElement.doScroll)
        ) {
          this.onLoadCallback();
        } else {
          document.addEventListener("DOMContentLoaded", this.onLoadCallback);
        }
    }
    
    _onUpdate = () => {
        
        // Loop through triggers and execute them if their condition has been met
        for( let f of this.triggers ) {
           
            // If the condition is satisifed...
            if( f.trigger() && !f.fired ) {
                
                // Loop through the events and process them IF we have events in this trigger
                if( f.events ) {
                    for( let e of f.events ){
                        // Is this an element trigger?
                        if( e.targetId != undefined ) {
                            let targetElement = document.getElementById(e.targetId)
                            if(targetElement == null) { 
                                Log('Could not activate trigger for element "'+e.targetId+'" because that element was not found.')
                                continue
                            }
                            // Process element trigger based on method
                            if( e.addClass != undefined ){
                                targetElement.classList.add(e.addClass)
                                Log("Fired trigger for "+e.targetId)
                                continue
                            }
                            if( e.removeClass != undefined) {
                                targetElement.classList.remove( e.removeClass )
                                continue
                            }
                        }

                        // Adding additional types:
                        // if( e.somethingElse != undefined ) { ... }

                    } // End looping through events
                }
                // Lastly, let's call the "then" function that fires after this trigger's events have been processed
                if(typeof(f.then) == 'function') {
                    Log("Fired post-trigger function")
                    f.then()
                }

                // Mark this trigger as having been fired
                f.fired = true
            }
        }
    }

    // RegisterElementTrigger
    // param example
    /* var params = { 
        condition: () => {true},
        [{
            // triggered events
        }],
        optionalCallback()
    */
    //{ condition: function(), events: [{targetId:'asdf',addClass:'qwer'}], optionalCallback() }
    _registerTrigger = ( params ) => {
        
        // If this trigger has events, we'll loop through the events and validate them. Otherwise, just register
        // the trigger since it's just a "trigger-then" trigger.

        /* Depreciating this check since it's okay if events is empty--what if we just want a trigger and then a callback function?
        if( params.events == undefined ) {
            Log("Could not register trigger because no 'events' property was found.")
            return false
        }*/
        // If this trigger has an events parameter, we'll validate it
        var okay = true
        if( params.events != undefined ) {
            okay = false
            for(var e of params.events ) {
                // Check if this is an element trigger, which requires a target id
                if( e.targetId == undefined ) {
                    Log('Could not register trigger because no target element ID was specified.')
                    return false
                }

                if( document.getElementById(e.targetId) == null ) {
                    Log('Could not register trigger for element "'+e.targetId+'" because that element was not found.')
                    return false
                }
                    
                // TODO: If there are MORE element triggers added, they need to be listed here
                if( 
                        e.addClass != undefined 
                    || e.removeClass != undefined
                    || e.appendChild != undefined
                ){
                    // We're good to add this trigger
                    okay = true
                } else {
                    Log('Could not register trigger for element "'+e.targetId+'" because the method passed has not been implemented.')
                }
            }
        }
        
        if(okay) {
            // We are safe to process this event trigger
            var newParams = params 
            newParams["fired"] = false // Add a "fired" property to ensure we aren't double firing something
            this.triggers.push(newParams)
            Log("Registered trigger: "+newParams)
            //console.log(newParams)
        }
    },

    _remember = (string, _state = true) => {
        if(typeof(string) === 'string') {
            this.switches.push({ switch: string, state: _state })
        } else {
            Log("Could not register switch '"+string+"' because that is not a valid string.")
        }
    },

    _recall = (string) => {
        for(let s of this.switches) {
            if(s.switch == string) {
                return s.state
            }
        }

        return null
    }

    return {
        
        onLoad: function(callback) {
            onLoadCallback = callback
            return _onLoad()
        },
        onUpdate: function() {
            return _onUpdate()
        },
        registerTrigger: function( params ) {
            return _registerTrigger( params )
        },
        begin: function() {
            return onLoadCallback()
        },
        
        remember: function(string, state = true) { return _remember(string, state) },
        
        recall: function(string) { return _recall(string) },

        // DEBUG FUNCTIONS
        getTriggers: function() {
            return _getTriggers()
        }
        
    }
}