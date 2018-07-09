
var story = new Campfire()
var testString = ""

var tests = [
    {
        given: 'a simple trigger is created',
        by: function() { 
            story.registerTrigger({
                trigger: function() { return true; },
                then: function() { testString = "hello" }
            })
            story.begin()
        },
        then: [
            {
                well: 'testString should say "hello"',
                because: () => { return (testString == "hello" ? true : false) }
            },
            {
                well: 'the trigger should be marked as fired',
                because: () => { 
                    var triggers = story.__getTriggers()
                    return triggers[0].fired
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
            }
        ]
    }
]

tao(tests)