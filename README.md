# Aesthetics

A demonstration of the StorylangJS tool for writing mutable, interactive stories. 

# Usage

Create a story object:

```js
var story = new Storylang()
```

## Triggers

You can create triggers based on a condition.

```js
story.RegisterTrigger(
    function() {
        // Some condition that must be true
    },
    [
        {
            targetId: 'my-element',
            addClass: 'fade-in-text'
        },
        {
            targetId: 'another-element',
            removeClass: 'fade-out-text'
        },
        {
            targetId: 'sidebar-meta',
            setContent: 'something is awry...'
        }
    ],
    function() {
        // Do these once all the triggers have fired
    }
)
```