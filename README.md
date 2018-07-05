# Campfire

A lightweight, pure JavaScript tool for writing interactive, mutable stories.

An alpha demo is being developed in the `examples/` folder.

# Getting Started

Include `campfire.js` or `campfire.min.js` 

**CDN**

The most recent build of `campfire.min.js` can loaded with the following link:

```html
<script src="https://gitcdn.link/repo/lawsonry/campfirejs/master/dist/campfire.min.js"></script>
```

# Usage

Create a story object:

```js
var story = new Campfire()
```

## Triggers

You can create triggers based on a condition. There are two types of triggers: a **function** trigger, and an **event** trigger. In Campfire, **events** are little pieces of delivered functionality. 

Function triggers will call a function when a given trigger occurs. 

Event triggers can call an array of events, and may call a function when a given trigger occurs.

### Basic Trigger

A basic trigger has a condition--`trigger`--and something that happens when the trigger condition is true--`then`. Think of it like, when `trigger`, `then` (do something):

```js
var story = new Campfire()

story.RegisterTrigger({
    trigger: ()=> { 
        document.readyState === 'complete' 
    },
    then: ()=> { 
        console.log("Hello, world!")
    }
})
```

The above trigger will write "Hello, world!" to the console window once the document object has entered the ready state. 

Basic triggers like this are great ways to ensure that you have a function that is called exactly one time during your story based on some condition. 

```js
var playerIsDead = false
var gameOver = false

var story = new Campfire()

story.RegisterTrigger({
    trigger: ()=> { return (playerIsDead) },
    then: ()=>{ 
        gameOver = true
        document.getElementById('player-dead-message').classList.add('fade-in-message')
    }
})
```

The above will create a trigger that will fire **once** as soon as `playerIsDead` is true.

Here's another example: a trigger that uses your own custom functions:

```js
var story = new Campfire()

story.RegisterTrigger({
    trigger: PlayerIsDead(), then: HandleGameOver()
})
```

The above example would call `HandleGameOver()` exactly once when `PlayerIsDead()` returns true. 

## Event Triggers

Campfire delivers a special type of trigger called an "event trigger," which allows you to use any one of the delivered event methods inside your trigger. 

Two of the most basic event methods are `addClass` and `removeClass`, which will add and remove a css class to a target element respectively:

```js
story.RegisterTrigger({
    trigger: function() {
        // Some condition that must be true
    },
    events: [
        {
            targetId: 'my-element',
            addClass: 'fade-in-text'
        },
        {
            targetId: 'another-element',
            removeClass: 'fade-to-black'
        },
        {
            targetId: 'sidebar-meta',
            setContent: 'Something is awry...'
        }
    ],
    function() {
        // Do these once all the triggers have fired
    }
})
```

The `events` property can have as many events as you want that will be fired exactly once when the `trigger` condition is true. For a list of delivered events, see the documentation. 

## Switches

Switches are simple string properties that either exist or not. 

```js
var story = new Campfire()

story.setSwitch('loves_campfire')

if(story.getSwitch('loves_campfire')) {
    console.log("This will be written to the console since 'loves_campfire' was set to true")
}
```

The function `setSwitch` defaults to assigning the value to true, but you can always manually assign it to false:

```js 
var story = new Campfire()

story.setSwitch('has_physics_book')

if(playerDroppedBook()) {
    story.setSwitch('has_physics_book', false)
}
```

The functions `setSwitch` and `getSwitch` can also be used in two other ways: `remember` and `recall`, respectively:

```js
var story = Campfire()

story.remember('chose_left_door')

if(story.recall('chose_right_door')) {
    // This will not happen
}

if(story.recall('chose_left_door')) {
    // This will happen
}
```

# Contributing

Feel free to tackle some of the issues and/or submit your own new features as a merge request. 

## Getting Started

1. Clone the repo and enter the dir: `$> git clone https://www.github.com/lawsonry/campfirejs && cd campfirejs`
2. Install dev dependencies: `$/campfirejs> npm install`
3. Do amazing things.
4. Build `dist/campfire.min.js`: `$/campfirejs> npm run-script build`

Feel free to submit a merge request with your changes and improvements. 
