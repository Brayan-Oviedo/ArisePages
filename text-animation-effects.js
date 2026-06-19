class TextAnimator {

  static wrapChars(element) {
    const text = element.textContent;
    element.innerHTML = text
      .split('')
      .map(
        (char, i) =>
          `<span class="char char-${i}" style="display:inline-block;position:relative">${char === ' ' ? '&nbsp;' : char}</span>`
      )
      .join('');
    return Array.from(element.querySelectorAll('.char'));
  }

  static wrapWords(element) {
    const text = element.textContent;
    element.innerHTML = text
      .split(' ')
      .map(
        (word, i) =>
          `<span class="word word-${i}" style="display:inline-block;margin-right:0.25em">${word}</span>`
      )
      .join('');
    return Array.from(element.querySelectorAll('.word'));
  }

  static _scrollRepeat(tl, element, start) {
    gsap.registerPlugin(ScrollTrigger);
    return ScrollTrigger.create({
      trigger: element,
      start,
      onEnter: () => tl.restart(),
      onEnterBack: () => tl.restart(),
      onLeave: () => tl.progress(0).pause(),
      onLeaveBack: () => tl.progress(0).pause(),
    });
  }

  static typewriter(element, options = {}) {
    const {
      duration = 2,
      ease = 'power2.inOut',
      stagger = 0.05,
      trigger = 'load',
      start = 'top 80%',
      delay = 0
    } = options;

    if (!element) return;

    const chars = this.wrapChars(element);
    const tl = gsap.timeline({ paused: trigger === 'scroll', delay });

    chars.forEach((char, i) => {
      tl.fromTo(
        char,
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: duration / chars.length, ease },
        i * stagger
      );
    });

    if (trigger === 'scroll' && window.ScrollTrigger) {
      return this._scrollRepeat(tl, element, start);
    }

    return tl;
  }

  static morph(element, options = {}) {
    const {
      wordList = ['Create', 'Design', 'Launch'],
      wordDuration = 2,
      ease = 'power2.out',
      typewriter = false,
      charStagger = 0.05,
      trigger = 'load',
      start = 'top 80%'
    } = options;

    if (!element || wordList.length === 0) return;

    const tl = gsap.timeline({ repeat: -1, paused: trigger === 'scroll' });

    wordList.forEach((word, i) => {
      const pos = i * (wordDuration + 0.4);
      tl.to(element, { duration: 0.35, opacity: 0, ease: 'power2.in' }, pos);
      tl.call(() => { element.textContent = word; }, [], pos + 0.35);
      if (!typewriter) {
        tl.to(element, { duration: 0.4, opacity: 1, ease }, pos + 0.35);
      } else {
        const steps = word.length;
        const typeDuration = steps * charStagger;
        tl.set(element, { opacity: 1, clipPath: 'inset(0 100% 0 0)' }, pos + 0.35);
        tl.to(element, {
          clipPath: 'inset(0 0% 0 0)',
          duration: typeDuration,
          ease: `steps(${steps})`,
          onComplete: () => gsap.set(element, { clearProps: 'clipPath' }),
        }, pos + 0.35);
      }
      if (i < wordList.length - 1) tl.to({}, {}, `+=${wordDuration}`);
    });

    if (trigger === 'scroll' && window.ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
      return ScrollTrigger.create({
        trigger: element,
        start,
        onEnter: () => tl.restart(),
        onEnterBack: () => tl.restart(),
        onLeave: () => tl.pause(),
        onLeaveBack: () => tl.pause(),
      });
    }

    return tl;
  }

  static gradientFill(element, options = {}) {
    const {
      duration = 2,
      angle = 90,
      colors = ['#FF2D55', '#A855F7'],
      animateAngle = true,
      ease = 'sine.inOut',
      loop = false,
      trigger = 'load',
      start = 'top 80%'
    } = options;

    if (!element) return;

    const createGradient = (ang) => {
      const colorStop = colors.map((c, i) => `${c} ${(i / (colors.length - 1)) * 100}%`).join(', ');
      return `linear-gradient(${ang}deg, ${colorStop})`;
    };

    element.style.backgroundImage = createGradient(angle);
    element.style.backgroundClip = 'text';
    element.style.backgroundSize = '200% 200%';
    element.style.WebkitBackgroundClip = 'text';
    element.style.WebkitTextFillColor = 'transparent';

    const tl = gsap.timeline({ repeat: loop ? -1 : 0, yoyo: false, paused: trigger === 'scroll' });

    if (animateAngle) {
      tl.to(element, {
        backgroundPosition: '100% 0',
        duration,
        ease,
        onUpdate: function () {
          const currentAngle = angle + this.progress() * 360;
          element.style.backgroundImage = createGradient(currentAngle);
        }
      }, 0);
    } else {
      tl.to(element, { duration, ease });
    }

    if (trigger === 'scroll' && window.ScrollTrigger) {
      return this._scrollRepeat(tl, element, start);
    }

    return tl;
  }

  static characterEntrance(element, options = {}) {
    const {
      effect = 'fade-scale-rotate',
      duration = 0.6,
      stagger = 0.1,
      scale = { from: 0, to: 1 },
      rotation = { from: 0, to: 0 },
      ease = 'back.out(1.5)',
      trigger = 'load',
      start = 'top 80%',
      delay = 0
    } = options;

    if (!element) return;

    const chars = this.wrapChars(element);
    const tl = gsap.timeline({ paused: trigger === 'scroll', delay });

    chars.forEach((char, i) => {
      tl.fromTo(
        char,
        { opacity: 0, scale: scale.from, rotation: rotation.from, y: 0 },
        { opacity: 1, scale: scale.to, rotation: rotation.to, y: 0, duration, ease },
        i * stagger
      );
    });

    if (trigger === 'scroll' && window.ScrollTrigger) {
      return this._scrollRepeat(tl, element, start);
    }

    return tl;
  }

  static inkStroke(element, options = {}) {
    const {
      duration = 2.5,
      ease = 'power1.inOut',
      trigger = 'load',
      start = 'top 80%'
    } = options;

    if (!element) return;

    const tl = gsap.timeline({ paused: trigger === 'scroll' });

    tl.fromTo(
      element,
      { opacity: 0.3, filter: 'blur(2px)' },
      { opacity: 1, filter: 'blur(0px)', duration, ease }
    );

    if (trigger === 'scroll' && window.ScrollTrigger) {
      return this._scrollRepeat(tl, element, start);
    }

    return tl;
  }

  static glitch(element, options = {}) {
    const {
      intensity = 'medium',
      duration = 0.5,
      frequency = 5,
      offset = intensity === 'high' ? 6 : intensity === 'medium' ? 4 : 2,
      colors = ['#FF2D55', '#00D9FF'],
      trigger = 'load',
      start = 'top 80%'
    } = options;

    if (!element) return;

    const runOnce = () => {
      const parent = element.parentNode;
      if (!parent) return;
      const parentPos = window.getComputedStyle(parent).position;
      const needsPos = parentPos === 'static';
      if (needsPos) parent.style.position = 'relative';

      const clone = element.cloneNode(true);
      clone.style.position = 'absolute';
      clone.style.left = element.offsetLeft + 'px';
      clone.style.top = element.offsetTop + 'px';
      clone.style.width = element.offsetWidth + 'px';
      clone.style.pointerEvents = 'none';
      clone.style.opacity = '0.8';
      clone.style.color = colors[0];
      clone.style.textShadow = `2px 2px 0px ${colors[1]}`;
      parent.appendChild(clone);

      const tl = gsap.timeline();
      for (let i = 0; i < frequency; i++) {
        tl.to(clone, {
          x: (Math.random() - 0.5) * offset * 2,
          y: (Math.random() - 0.5) * offset * 2,
          duration: duration / frequency,
          ease: 'power1.inOut'
        }, (i / frequency) * duration);
      }
      tl.to(clone, { x: 0, y: 0, opacity: 0, duration: 0.3 }, duration * 0.8);
      tl.call(() => {
        clone.remove();
        if (needsPos) parent.style.removeProperty('position');
      }, [], duration + 0.3);
    };

    if (trigger === 'scroll' && window.ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
      return ScrollTrigger.create({
        trigger: element,
        start,
        onEnter: runOnce,
        onEnterBack: runOnce,
      });
    }

    runOnce();
  }

  static wave(element, options = {}) {
    const {
      duration = 2,
      amplitude = 15,
      frequency = 3,
      ease = 'sine.inOut',
      trigger = 'load',
      start = 'top 80%'
    } = options;

    if (!element) return;

    const words = this.wrapWords(element);
    const tl = gsap.timeline({ paused: trigger === 'scroll' });

    words.forEach((word, i) => {
      const phase = (i / words.length) * frequency * Math.PI * 2;
      tl.fromTo(
        word,
        { y: 0, opacity: 0 },
        {
          y: (index) => Math.sin(phase + (index / words.length) * Math.PI * 2) * amplitude,
          opacity: 1,
          duration,
          ease
        },
        0
      );
    });

    if (trigger === 'scroll' && window.ScrollTrigger) {
      return this._scrollRepeat(tl, element, start);
    }

    return tl;
  }

  static shatter(element, options = {}) {
    const {
      duration = 1.5,
      velocity = 200,
      ease = 'back.out(1.5)',
      mergeBack = true,
      mergeDuration = 0.8,
      trigger = 'load',
      start = 'top 80%'
    } = options;

    if (!element) return;

    const tl = gsap.timeline({ paused: trigger === 'scroll' });
    const chars = element.textContent.split('');
    const particleEls = [];

    element.innerHTML = '';

    chars.forEach((char, i) => {
      const particle = document.createElement('span');
      particle.textContent = char;
      particle.style.display = 'inline-block';
      particle.style.position = 'relative';
      particle.style.margin = '0 0.05em';
      element.appendChild(particle);
      particleEls.push(particle);

      tl.fromTo(
        particle,
        { opacity: 1, x: 0, y: 0, rotation: 0, scale: 1 },
        {
          opacity: 0,
          x: (Math.random() - 0.5) * velocity,
          y: (Math.random() - 0.5) * velocity * 1.5,
          rotation: Math.random() * 360,
          scale: 0,
          duration: duration * 0.7,
          ease
        },
        i * 0.05
      );
    });

    if (mergeBack) {
      particleEls.forEach((particle, i) => {
        tl.to(
          particle,
          { opacity: 1, x: 0, y: 0, rotation: 0, scale: 1, duration: mergeDuration, ease: 'back.out(1.5)' },
          duration - mergeDuration + i * 0.02
        );
      });
    }

    if (trigger === 'scroll' && window.ScrollTrigger) {
      return this._scrollRepeat(tl, element, start);
    }

    return tl;
  }

  static liquidMerge(element, options = {}) {
    const {
      duration = 2,
      blur = { from: 8, to: 0 },
      opacity = { from: 0.3, to: 1 },
      scale = { from: 0.8, to: 1 },
      ease = 'power2.out',
      trigger = 'load',
      start = 'top 80%'
    } = options;

    if (!element) return;

    const tl = gsap.timeline({ paused: trigger === 'scroll' });

    tl.fromTo(
      element,
      { opacity: opacity.from, filter: `blur(${blur.from}px)`, scale: scale.from },
      { opacity: opacity.to, filter: `blur(${blur.to}px)`, scale: scale.to, duration, ease }
    );

    if (trigger === 'scroll' && window.ScrollTrigger) {
      return this._scrollRepeat(tl, element, start);
    }

    return tl;
  }

  static pixelSort(element, options = {}) {
    const {
      duration = 1.2,
      sortDirection = 'horizontal',
      ease = 'expo.out',
      color = '#00D9FF',
      trigger = 'load',
      start = 'top 80%'
    } = options;

    if (!element) return;

    const chars = this.wrapChars(element);
    const tl = gsap.timeline({ paused: trigger === 'scroll' });
    const staggerAmount = duration / chars.length;

    chars.forEach((char, i) => {
      const fromX = sortDirection === 'horizontal' ? -60 : 0;
      const fromY = sortDirection === 'horizontal' ? 0 : -60;
      tl.fromTo(
        char,
        { opacity: 0, x: fromX, y: fromY, textShadow: `0 0 10px ${color}, 0 0 20px ${color}` },
        { opacity: 1, x: 0, y: 0, textShadow: `0 0 0px ${color}, 0 0 0px ${color}`, duration: staggerAmount, ease },
        i * staggerAmount
      );
    });

    if (trigger === 'scroll' && window.ScrollTrigger) {
      return this._scrollRepeat(tl, element, start);
    }

    return tl;
  }

  static neonFlicker(element, options = {}) {
    const {
      duration = 0.4,
      flickerPattern = 'pulse',
      glowColor = '#00D9FF',
      flickerCount = 8,
      trigger = 'load',
      start = 'top 80%'
    } = options;

    if (!element) return;

    const tl = gsap.timeline({ paused: trigger === 'scroll' });

    const applyNeonStyle = (opacity, blur) => {
      element.style.textShadow = `
        0 0 ${blur}px ${glowColor},
        0 0 ${blur * 1.5}px ${glowColor},
        0 0 ${blur * 2}px ${glowColor},
        0 0 ${blur * 3}px ${glowColor}
      `;
      element.style.opacity = opacity;
    };

    if (flickerPattern === 'random') {
      for (let i = 0; i < flickerCount; i++) {
        const delay = (i / flickerCount) * duration;
        const opacity = Math.random() > 0.5 ? 1 : 0.6;
        const blur = Math.random() > 0.5 ? 10 : 15;
        tl.call(() => applyNeonStyle(opacity, blur), [], delay);
      }
    } else {
      for (let i = 0; i < flickerCount; i++) {
        tl.call(() => applyNeonStyle(1, 12), [], (i / flickerCount) * duration);
        tl.call(() => applyNeonStyle(0.6, 8), [], (i / flickerCount) * duration + duration / (flickerCount * 2));
      }
    }

    tl.call(() => {
      element.style.textShadow = '';
      element.style.opacity = '1';
    }, [], duration);

    if (trigger === 'scroll' && window.ScrollTrigger) {
      return this._scrollRepeat(tl, element, start);
    }

    return tl;
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = TextAnimator;
}
