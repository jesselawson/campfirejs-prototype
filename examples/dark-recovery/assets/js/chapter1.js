class TextScramble {
    constructor(el) {
      this.el = el
      this.chars = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM'
      this.update = this.update.bind(this)
    }
    setText(newText) {
      const oldText = this.el.innerText
      const length = Math.max(oldText.length, newText.length)
      const promise = new Promise((resolve) => this.resolve = resolve)
      this.queue = []
      for (let i = 0; i < length; i++) {
        const from = oldText[i] || ''
        const to = newText[i] || ''
        const start = Math.floor(Math.random() * 40)
        const end = start + Math.floor(Math.random() * 40)
        this.queue.push({ from, to, start, end })
      }
      cancelAnimationFrame(this.frameRequest)
      this.frame = 0
      this.update()
      return promise
    }
    update() {
      let output = ''
      let complete = 0
      for (let i = 0, n = this.queue.length; i < n; i++) {
        let { from, to, start, end, char } = this.queue[i]
        if (this.frame >= end) {
          complete++
          output += to
        } else if (this.frame >= start) {
          if (!char || Math.random() < .005) {
            char = this.randomChar()
            this.queue[i].char = char
          }
          output += `<span class="dud">${char}</span>`
        } else {
          output += from
        }
      }
      this.el.innerHTML = output
      if (complete === this.queue.length) {
        this.resolve()
      } else {
        this.frameRequest = requestAnimationFrame(this.update)
        this.frame++
      }
    }
    randomChar() {
      return this.chars[Math.floor(Math.random() * this.chars.length)]
    }
  }
  
  const phrases = [
    'This is not your first time here.',
    'Your memories have been altered.',
    'They are still being altered.',
    'I know who is doing it and why.',
    'And together, we can stop them.'
  ]
  
  const c1p3_el = document.querySelector('.scramble-text')
  const c1p3_fx = new TextScramble(c1p3_el)
  
  let scrambleCounter = 0
  
  const c1p3BeginText = () => {
    c1p3_fx.setText(phrases[scrambleCounter]).then(() => {
      setTimeout(c1p3BeginText, 3000)
    })
    scrambleCounter = (scrambleCounter + 1) % phrases.length
  }