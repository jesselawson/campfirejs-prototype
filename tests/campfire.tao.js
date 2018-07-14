
var story = new Campfire()
var testString = ""

var tests = [
    {
        given: 'a trigger is created',
        by: function() { 
            story.registerTrigger({
                trigger: function() { return true; },
                then: function() { testString = "hello" }
            })

            story.onUpdate()
        },
        then: [
            {
                well: 'testString should say "hello"',
                because: () => { return (testString == "hello" ? true : false) }
            },
            {
                well: 'the trigger should be marked as fired',
                because: () => { 
                    var triggers = story.getTriggers()
                    return (triggers[0].fired ? true : false)
                }
            }
            
        ]
    },
    { 
        given: 'a trigger with a label is created',
        by: () => {
            story.registerTrigger({
                label: 'a test label', 
                trigger: function() { return true; },
                then: function() { return true; }
            })
        },
        then: [
            {
                well: 'the trigger status should be false before being fired',
                because: () => { 
                    if(!story.fired('a test label')) {
                        return true
                    } else { return false }
                }
            },
            {
                well: 'the trigger status should be true after being fired',
                because: () => { 
                    story.onUpdate()
                    return story.fired('a test label')
                }
            },
            {
                well: 'the fired() function should return null if an invalid label is queried',
                because: () => {
                    if(story.fired('label that does not exist') == null){
                        return true
                    } else {
                        return false
                    }
                }
            }
        ]
    },
    {
        given: 'a new choice is created',
        by: function() { story.remember('a string') },
        then: 
        [
            {
                well: 'it can be recalled',
                because: ()=> { return story.recall('a string') }
            }, 
            {
                well: 'un-remembered strings return false',
                because: () => { return (!story.recall('nothing set') ? true : false) }
            }
        ]
    }
]

tao(tests)