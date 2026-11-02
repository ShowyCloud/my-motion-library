/* Shared, looping two-dimensional character-action presets. */
(function (g) {
  'use strict';
  const ease = x => { x = Math.max(0, Math.min(1, x)); return x * x * (3 - 2 * x); };
  function evaluate(config, seconds) {
    const p = ((Math.max(0, seconds) % config.duration) / config.duration), a = config.amplitude / 100;
    const onset = config.mood === 'tense' ? .34 : config.mood === 'relaxed' ? .17 : .25;
    const hold = ease((p - onset) / .23) * (1 - ease((p - .76) / .24));
    const sign = config.arm === 'left' ? 1 : -1;
    let arm = 0, lean = 0, dx = 0, step = 0, look = 0;
    if (config.action === 'reach') { arm = sign * 1.05 * hold * a; lean = .045 * hold * a; }
    if (config.action === 'speak') { arm = sign * .58 * Math.sin(Math.PI * hold) * a; lean = -.08 * Math.sin(Math.PI * hold) * a; }
    if (config.action === 'turn') { arm = sign * .12 * hold * a; lean = -.11 * hold * a; look = -2 * hold * a; }
    if (config.action === 'stop') {
      const forward = ease(p / .36), back = ease((p - .58) / .23), reset = ease((p - .82) / .18);
      dx = (55 * forward - 14 * back) * (1 - reset) * a;
      step = Math.sin(p * Math.PI * 6) * (1 - ease((p - .3) / .18)) * a;
      arm = sign * .3 * Math.sin(p * Math.PI * 6) * (1 - ease((p - .3) / .18)) * a;
      lean = -.1 * ease((p - .34) / .12) * (1 - ease((p - .7) / .3)) * a;
    }
    return { arm, lean, dx, step, look };
  }
  g.MPCharacterActions = { evaluate };
})(window);
