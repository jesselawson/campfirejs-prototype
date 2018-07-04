/* Storylang.js v0.1.0
 * Written by Jesse Lawson <jesse@lawsonry.com>
 * \ Website: https://lawsonry.com
 * \ GitHub: lawsonry
 * \ Twitter: @lawsonry
 * 
*/

function Log(message) {
    console.log("[ Storylang.js] "+message)
}

// An object holding the implemented features of Storylang
const implemented = {
    classHooks: {
        methods: ['add', 'remove']
    }
}

function Storylang() {
    
    this.classHooks = []
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
        // Loop through faders and update them
        for( let f of this.classHooks ) {
            // If the condition is satisifed...
            if(f.condition) {
                // Ensure our element exists
                let e = document.getElementById( f.element )

                // Do work based on the method
                if(f.method == 'add') {
                    e.addClass( f.className )
                } else if(f.method == 'remove') {
                    e.classList.remove( f.classList )
                }
            }
        }
    }

    // RegisterClassHook
    // param example
    // var params = { condition: function() { return true }, method: 'add', className: 'fade-in-text' }
    
    _RegisterClassHook = ( params ) => {
        
        // Preregistration checks to ensure 1) the element exists, and 2) the method is appropriate
        if( document.getElementById( params.element == null)) {
            Log('Could not register class hook for element "'+params.element+'" because that element was not found.')
            return false
        } else if ( implemented.classHooks.method.includes( params.method ) == false ) {
            Log('Could not register class hook for element "'+params.element+'" because "'+params.method+'" +is not an implemented method.')
        
        }
    }
    return {
        
        OnLoad: function(callback) {
            this.onLoadCallback = callback
        },
        OnUpdate: function() {
            return _OnUpdate
        },
        RegisterClassHook: function( params ) {
            _RegisterClassHook( params )
        },
        Begin: function() {
            this.onLoadCallback()
        }
        
    }
}



/*

Examples

var Story = Storylang()
Story.RegisterClassHook(function() { clicks == 4 ? true : false }, '#first-fade', 'fade-in-text');

*/