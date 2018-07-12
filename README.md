# Campfire

A lightweight, pure JavaScript tool for writing interactive experiences. Think of Campfire as a set of "if-this-then-that" tools that let you work with the reader or player and provide feedback based on their actions and choices. 

Good use cases--and future examples--include games, books, courses, and more. 

Examples are being developed in the [campfirejs-examples](https://www.github.com/lawsonry/campfirejs-examples) repository. Go check them out!

# Quick Start

Include `campfire.js` or `campfire.min.js` in your project. The most recent build of `campfire.min.js` can loaded with the following link:

```html
<script src="https://gitcdn.link/repo/lawsonry/campfirejs/master/dist/campfire.min.js"></script>
```

This build will always correspond to the most recent release--and not necessarily the most recent version in the repository. 

With Campfire loaded up, go on and write a cool, interactive experience. 

# Introduction

Campfire is a single function that exports a ton of features for scaffolding a rich interactive experience. There are three main pieces to every Campfire experience: 

1. The `Campfire()` object
2. The `onLoad()` function
3. The `begin()` function

The most bare bones Campfire looks like this:

```html
<script>
var story = new Campfire()

story.onLoad(function() {
    // Anything you want to happen before the experience starts, such as element binding, calculations, etc.
})

story.begin()

</script>
```

# Functionality

The rest of this readme will describe the delivered functionality of Campfire.

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

Switches are simple string properties that either do or do not exist. They are useful for keeping track of **choices** that someone makes for the duration of their experience.

There are two functions involved: `remember()` and `recall()`, which set and retrieve the state of the switches, respectively.

### Create a New Switch

Create a new switch with a single, unique string identifier:

```js
story.remember('some memorable, unique string')
```

Set switches will always evaluate to `true` unless you explicitly declare this as one you want to evaluate to `false`:

```js
story.remember('player loves puppies', false)
```

### Query a switch

```js
var thisIsTrue = story.recall('some memorable, unique string')
var thisIsFalse = story.recall('player loves puppies')
var thisIsNull = story.recall('an unset switch')
```

### Switch Example 

I want to remember if a player takes longer than five seconds to save someone from having to experience more pain:

```js
var story = new Campfire()

// ...

var playerSadismTimer = setTimeout(function() { story.remember('ch1_player_likes_seeing_pain') }, 5000);

function handleStopPainButton() {
    clearTimout(playerSadismTimer)
}
```

```html
<a id="player-sadism-button" class="btn btn-lg" onclick="handleStopPainButton()">Stop the Electrocution</a>
```

In the above example, if the player does not press the button (`#player-sadism-button`) in five seconds, the function `story.remember()` will be called and add `ch1_player_likes_seeing_pain` to Campfire's list of remembered switches. 

Later, I can write some dialogue like this:

```html
<p>You always were different from others, weren't you? <span id="player-is-sadist"></span> Regardless, we have work to do.</p>

<!-- ... -->

<script>
if( story.recall('ch1_player_likes_seeing_pain') ) {
    document.getElementById('player-is-sadist').innerHTML = "Your curiosity about the suffering of others is a little stronger than you ever anticipated, isn't it?"
}
</script>
```

### Integrated Example

You can use triggers to set switches, too:

```js
var story = new Campfire()

story.registerTrigger({
    trigger: () => { story.recall('player hates cheese') },
    events: [
        {
            targetId: 'player-cheese-preferences',
            setContent: 'Hates it!'
        }
    ]
})
```

Here's another example. In a choose-your-own-adventure game I am working on, the player's interactions with NPCs is dependent on the player's karma--which, subsequently, is influenced by their choices. 

Here, the first time that `story.recall('player helped the paladin')` returns true, the function `AddKarmaToPlayer()` will fire--and it will fire exactly one time for the duration of the game. This allows you to use the trigger and switch systems together as a sort of pseudo-achievements system. 

```js
var story = new Campfire()

story.registerTrigger({
    trigger: () => { story.recall('player helped the paladin') },
    then: () => { AddKarmaToPlayer() }
})
```

# Contributing

Feel free to tackle some of the issues and/or submit your own new features as a merge request. 

## Getting Started

1. Clone the repo and enter the dir with `git clone https://www.github.com/lawsonry/campfirejs && cd campfirejs`
2. Install dev dependencies with `npm install`
3. Do amazing things.
4. Build the campfire.min.js file with `npm run-script build`

## Testing

CampfireJS uses the [TaoJS testing tool](https://www.github.com/lawsonry/taojs).

To use it, just run any dev server **in your project's root folder** and then navigate to `/tests`.

**Running a dev server in Python**
```bash
python -m SimpleHTTPServer
```

**Running a dev server via Node and live-server**
```bash
npm install -g live-server
live-server
```

**Running a dev server in PHP**
```bash
php -S localhost:8080
```

# Changelog

**1.1**

* Add support for switches with `remember` and `recall`

**1.0**

* Initial release