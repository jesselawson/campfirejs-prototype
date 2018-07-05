/* Storylang.js v0.1.0
 * Written by Jesse Lawson <jesse@lawsonry.com>
 * \ Website: https://lawsonry.com/storylang
 * \ GitHub: lawsonry
 * \ Twitter: @lawsonry
 * 
*/

const DEBUG = true

function Log(message) {
    if(DEBUG) console.log("[ Storylang.js] "+message)
}

function Storylang() {
    
    // Triggers
    // Triggers are stored like this:
    // { trigger: function(), events: [{targetId:'asdf',addClass:'qwer'}], optionalCallback() }
    this.triggers = []

    function getTriggers() { return this.triggers }

    this.onLoadCallback = function() {}

    _OnLoad = () => {
        this.onLoadCallback()
        // Safely determine whether we're loaded or not, and ensure we only call OnLoad() once
        if (
          document.readyState === "complete" || 
        (document.readyState !== "loading" && !document.documentElement.doScroll)
        ) {
          this.onLoadCallback();
        } else {
          document.addEventListener("DOMContentLoaded", this.onLoadCallback);
        }
    }
    
    _OnUpdate = () => {
        
        // Loop through triggers and execute them if their condition has been met
        for( let f of this.triggers ) {
           
            // If the condition is satisifed...
            if( f.trigger() && !f.fired ) {
                Log("Trigger fired")
                // Loop through the events and process them
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
                            Log("Fired trigger")
                            continue
                        }
                        if( e.removeClass != undefined) {
                            targetElement.classList.remove( e.removeClass )
                            continue
                        }
                    }

                    // Adding additional types:
                    // if( e.somethingElse != undefined ) { ... }

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
    _RegisterTrigger = ( params ) => {
        
        // First we loop through the events to ensure 1) all elements exist, and 2) all events have been implemented.
        if( params.events == undefined ) {
            Log("Could not register trigger because no 'events' property was found.")
            return false
        }

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
                // We are safe to process this event trigger
                var newParams = params 
                newParams["fired"] = false // Add a "fired" property to ensure we aren't double firing something
                this.triggers.push(newParams)
                Log("Registered trigger: "+newParams)
                console.log(newParams)
            } else {
                Log('Could not register trigger for element "'+e.targetId+'" because the method passed has not been implemented.')
            }
        } 
    }

    return {
        
        OnLoad: function(callback) {
            this.onLoadCallback = callback
        },
        OnUpdate: function() {
            return _OnUpdate()
        },
        RegisterTrigger: function( params ) {
            return _RegisterTrigger( params )
        },
        Begin: function() {
            return this.onLoadCallback()
        },
        __getTriggers: function() {
            return this.triggers
        }
        
    }
}



/*

Examples

var Story = Storylang()
Story.RegisterHook(function() { clicks == 4 ? true : false }, '#first-fade', 'fade-in-text');

*/