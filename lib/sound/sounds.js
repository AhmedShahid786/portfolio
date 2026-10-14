/*
|--------------------------------------------------------------------------
| SOUND LIBRARY
|--------------------------------------------------------------------------
|
| Usage:
|
| sounds.msgOut();
| sounds.wood();
| sounds.open();
| sounds.success();
| sounds.ruffle();
|
| Optional:
|
| sounds.wood({ strength: 0.8 });
| sounds.whoosh({ strength: 1 });
| sounds.note({ index: 4 });
|
| Browser note:
| Audio will become available after the first click/tap/keydown because of
| browser autoplay restrictions.
|
*/

(function () {
  "use strict";

  const AudioContextClass =
    window.AudioContext || window.webkitAudioContext;

  if (!AudioContextClass) {
    console.warn("Web Audio API is not supported in this browser.");
    return;
  }

  let ctx = null;
  let output = null;
  let reverbGain = null;
  let noiseBuffer = null;
  let unlocked = false;

  let soundEnabled = true;

  try {
    soundEnabled = localStorage.getItem("sound") !== "off";
  } catch (e) {}

  /*
  |--------------------------------------------------------------------------
  | Helpers
  |--------------------------------------------------------------------------
  */

  const random = (min, max) =>
    min + Math.random() * (max - min);

  const clamp = (value, min, max) =>
    value < min ? min : value > max ? max : value;

  function panFromX(x) {
    if (x == null) return 0;

    return (
      0.6 *
      clamp((x / window.innerWidth) * 2 - 1, -1, 1)
    );
  }

  function createAudioEngine() {
    if (ctx) return;

    ctx = new AudioContextClass({
      latencyHint: "interactive",
    });

    /*
    |--------------------------------------------------------------------------
    | Master output
    |--------------------------------------------------------------------------
    */

    const master = ctx.createGain();
    master.gain.value = 1;

    const compressor = ctx.createDynamicsCompressor();

    compressor.threshold.value = -20;
    compressor.knee.value = 12;
    compressor.ratio.value = 5;
    compressor.attack.value = 0.002;
    compressor.release.value = 0.18;

    master
      .connect(compressor)
      .connect(ctx.destination);

    output = ctx.createGain();
    output.connect(master);

    /*
    |--------------------------------------------------------------------------
    | Reverb
    |--------------------------------------------------------------------------
    */

    const convolver = ctx.createConvolver();

    const length = Math.floor(
      0.6 * ctx.sampleRate
    );

    const impulse = ctx.createBuffer(
      2,
      length,
      ctx.sampleRate
    );

    for (let channel = 0; channel < 2; channel++) {
      const data =
        impulse.getChannelData(channel);

      for (let i = 0; i < length; i++) {
        data[i] =
          (Math.random() * 2 - 1) *
          Math.pow(1 - i / length, 3.2);
      }
    }

    convolver.buffer = impulse;

    reverbGain = ctx.createGain();
    reverbGain.gain.value = 0.7;

    reverbGain
      .connect(convolver)
      .connect(master);

    /*
    |--------------------------------------------------------------------------
    | Noise buffer
    |--------------------------------------------------------------------------
    */

    noiseBuffer = ctx.createBuffer(
      1,
      ctx.sampleRate,
      ctx.sampleRate
    );

    const noise =
      noiseBuffer.getChannelData(0);

    for (let i = 0; i < noise.length; i++) {
      noise[i] =
        Math.random() * 2 - 1;
    }
  }

  function unlock() {
    createAudioEngine();

    if (
      ctx &&
      ctx.state !== "running"
    ) {
      ctx.resume();
    }

    unlocked = true;
  }

  [
    "pointerdown",
    "keydown",
    "touchend",
    "click",
  ].forEach((event) => {
    window.addEventListener(
      event,
      unlock,
      {
        capture: true,
        passive: true,
      }
    );
  });

  document.addEventListener(
    "visibilitychange",
    () => {
      if (!ctx) return;

      if (document.hidden) {
        ctx.suspend();
      } else if (unlocked) {
        ctx.resume();
      }
    }
  );

  function ready() {
    return (
      soundEnabled &&
      unlocked &&
      ctx &&
      ctx.state === "running"
    );
  }

  function connectNode(
    node,
    pan = 0,
    wet = 0
  ) {
    let finalNode = node;

    if (ctx.createStereoPanner) {
      const panner =
        ctx.createStereoPanner();

      panner.pan.value = pan;

      node.connect(panner);

      finalNode = panner;
    }

    finalNode.connect(output);

    if (wet) {
      const wetGain =
        ctx.createGain();

      wetGain.gain.value = wet;

      finalNode
        .connect(wetGain)
        .connect(reverbGain);
    }
  }

  function envelope(
    gain,
    time,
    attack,
    amount,
    duration
  ) {
    gain.gain.setValueAtTime(
      0.0001,
      time
    );

    gain.gain.exponentialRampToValueAtTime(
      Math.max(0.0002, amount),
      time + attack
    );

    gain.gain.exponentialRampToValueAtTime(
      0.0001,
      time + attack + duration
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Noise sound
  |--------------------------------------------------------------------------
  */

  function noise({
    t,
    freq = 2000,
    to,
    q = 1,
    type = "bandpass",
    dur = 0.03,
    gain = 0.1,
    attack = 0.002,
    pan = 0,
    wet = 0,
  }) {
    const source =
      ctx.createBufferSource();

    source.buffer = noiseBuffer;

    source.playbackRate.value =
      random(0.85, 1.15);

    const filter =
      ctx.createBiquadFilter();

    filter.type = type;
    filter.Q.value = q;

    filter.frequency.setValueAtTime(
      freq,
      t
    );

    if (to) {
      filter.frequency.exponentialRampToValueAtTime(
        to,
        t + attack + dur
      );
    }

    const gainNode =
      ctx.createGain();

    envelope(
      gainNode,
      t,
      attack,
      gain,
      dur
    );

    source
      .connect(filter)
      .connect(gainNode);

    connectNode(
      gainNode,
      pan,
      wet
    );

    source.start(
      t,
      random(0, 0.7)
    );

    source.stop(
      t + attack + dur + 0.05
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Oscillator sound
  |--------------------------------------------------------------------------
  */

  function oscillator({
    t,
    f0,
    f1,
    type = "sine",
    dur = 0.1,
    gain = 0.1,
    attack = 0.004,
    pan = 0,
    wet = 0,
  }) {
    const osc =
      ctx.createOscillator();

    osc.type = type;

    osc.frequency.setValueAtTime(
      f0,
      t
    );

    if (f1) {
      osc.frequency.exponentialRampToValueAtTime(
        f1,
        t + attack + dur
      );
    }

    const gainNode =
      ctx.createGain();

    envelope(
      gainNode,
      t,
      attack,
      gain,
      dur
    );

    osc.connect(gainNode);

    connectNode(
      gainNode,
      pan,
      wet
    );

    osc.start(t);

    osc.stop(
      t + attack + dur + 0.05
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Harmonic sound
  |--------------------------------------------------------------------------
  */

  function harmonic(
    frequency,
    time,
    gain,
    pan,
    duration = 0.34
  ) {
    const osc =
      ctx.createOscillator();

    osc.frequency.value =
      frequency;

    const harmonicOsc =
      ctx.createOscillator();

    harmonicOsc.frequency.value =
      frequency * 2;

    const harmonicGain =
      ctx.createGain();

    harmonicGain.gain.value =
      0.16;

    const vibrato =
      ctx.createOscillator();

    vibrato.frequency.value =
      5.4;

    const vibratoGain =
      ctx.createGain();

    vibratoGain.gain.setValueAtTime(
      0,
      time
    );

    vibratoGain.gain.linearRampToValueAtTime(
      0.012 * frequency,
      time + 0.18
    );

    vibrato
      .connect(vibratoGain)
      .connect(osc.frequency);

    const amp =
      ctx.createGain();

    amp.gain.setValueAtTime(
      0.0001,
      time
    );

    amp.gain.exponentialRampToValueAtTime(
      gain,
      time + 0.05
    );

    amp.gain.setTargetAtTime(
      0.0001,
      time + 0.07,
      duration / 3
    );

    osc.connect(amp);

    harmonicOsc
      .connect(harmonicGain)
      .connect(amp);

    connectNode(
      amp,
      pan,
      0.35
    );

    [
      osc,
      harmonicOsc,
      vibrato,
    ].forEach((source) => {
      source.start(time);

      source.stop(
        time +
          duration +
          0.6
      );
    });

    noise({
      t: time,
      freq: frequency * 2.4,
      q: 1.6,
      attack: 0.03,
      dur: 0.14,
      gain: 0.28 * gain,
      pan,
    });
  }

  function partials(
    frequencies,
    time,
    gain,
    duration,
    pan,
    wet
  ) {
    frequencies.forEach(
      (frequency, index) => {
        oscillator({
          t: time,
          f0:
            frequency *
            random(
              0.98,
              1.02
            ),
          dur:
            duration *
            (1 -
              0.22 *
                index),
          gain:
            gain *
            Math.pow(
              0.62,
              index
            ),
          pan,
          wet,
        });
      }
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Musical notes
  |--------------------------------------------------------------------------
  */

  const NOTES = [
    587.33,
    659.25,
    739.99,
    880,
    987.77,
    1174.66,
    1318.51,
    1479.98,
    1760,
  ];

  /*
  |--------------------------------------------------------------------------
  | UI sounds
  |--------------------------------------------------------------------------
  */

  const effects = {
    tick(t, options) {
      noise({
        t,
        freq: random(
          3800,
          4600
        ),
        q: 1.4,
        dur: 0.012,
        gain: 0.07,
        pan: options.pan,
      });

      oscillator({
        t,
        f0: random(
          2300,
          2600
        ),
        dur: 0.012,
        gain: 0.018,
        pan: options.pan,
      });
    },

    hover(t, options) {
      noise({
        t,
        freq: random(
          5200,
          6200
        ),
        q: 2,
        dur: 0.007,
        gain: 0.022,
        pan: options.pan,
      });
    },

    detent(t, options) {
      noise({
        t,
        freq: random(
          5000,
          6000
        ),
        q: 2.2,
        dur: 0.007,
        gain: 0.04,
        pan: options.pan,
      });
    },

    tap(t, options) {
      oscillator({
        t,
        f0: random(
          680,
          740
        ),
        f1: 470,
        dur: 0.06,
        gain: 0.11,
        pan: options.pan,
      });

      noise({
        t,
        freq: 1800,
        q: 1,
        dur: 0.012,
        gain: 0.04,
        pan: options.pan,
      });
    },

    success(t, options) {
      [
        659.25,
        987.77,
      ].forEach(
        (
          frequency,
          index
        ) => {
          oscillator({
            t:
              t +
              0.085 *
                index,
            f0: frequency,
            dur: 0.5,
            gain: 0.08,
            pan: options.pan,
            wet: 0.4,
          });

          oscillator({
            t:
              t +
              0.085 *
                index,
            f0:
              frequency *
              2,
            dur: 0.22,
            gain: 0.018,
            pan: options.pan,
            wet: 0.4,
          });
        }
      );
    },

    bonk(t, options) {
      oscillator({
        t,
        f0: 430,
        f1: 150,
        dur: 0.19,
        gain: 0.2,
        pan: options.pan,
      });

      oscillator({
        t,
        f0: 860,
        f1: 320,
        dur: 0.07,
        type: "triangle",
        gain: 0.04,
        pan: options.pan,
      });

      noise({
        t,
        type: "lowpass",
        freq: 700,
        dur: 0.05,
        gain: 0.12,
        pan: options.pan,
      });
    },

    boop(t, options) {
      oscillator({
        t,
        f0: 540,
        f1: 780,
        dur: 0.07,
        gain: 0.08,
        pan: options.pan,
      });

      oscillator({
        t: t + 0.01,
        f0: 1080,
        dur: 0.05,
        gain: 0.018,
        pan: options.pan,
      });
    },

    brush(t, options) {
      for (
        let i = 0;
        i < 5;
        i++
      ) {
        noise({
          t:
            t +
            0.1 * i +
            random(
              0,
              0.04
            ),

          freq: random(
            2400,
            3800
          ),

          to: random(
            900,
            1300
          ),

          q: 0.7,

          attack: 0.02,

          dur: random(
            0.08,
            0.13
          ),

          gain: 0.03,

          pan: random(
            -0.4,
            0.4
          ),
        });
      }
    },

    stroke(t, options) {
      noise({
        t,
        freq: random(
          2000,
          4200
        ),

        to: random(
          800,
          1200
        ),

        q: 0.6,

        attack: 0.012,

        dur: random(
          0.05,
          0.09
        ),

        gain:
          0.016 *
          (options.strength ||
            1),

        pan: options.pan,
      });
    },

    open(t, options) {
      oscillator({
        t,
        f0: 520,
        f1: 880,
        dur: 0.09,
        gain: 0.06,
        pan: options.pan,
        wet: 0.2,
      });

      noise({
        t,
        freq: 3000,
        to: 6500,
        q: 0.6,
        attack: 0.01,
        dur: 0.08,
        gain: 0.014,
        pan: options.pan,
      });
    },

    close(t, options) {
      oscillator({
        t,
        f0: 780,
        f1: 430,
        dur: 0.09,
        gain: 0.05,
        pan: options.pan,
        wet: 0.2,
      });

      noise({
        t,
        freq: 5000,
        to: 2200,
        q: 0.6,
        attack: 0.01,
        dur: 0.08,
        gain: 0.012,
        pan: options.pan,
      });
    },

    flip(t, options) {
      noise({
        t,
        freq: 2600,
        to: 5400,
        q: 0.9,
        attack: 0.006,
        dur: 0.06,
        gain: 0.05,
        pan: options.pan,
      });

      noise({
        t: t + 0.035,
        freq: 4200,
        to: 2400,
        q: 0.9,
        attack: 0.004,
        dur: 0.04,
        gain: 0.025,
        pan: options.pan,
      });
    },

    flick(t, options) {
      noise({
        t,
        freq: 3200,
        to: 6000,
        q: 1.1,
        attack: 0.004,
        dur: 0.045,
        gain: 0.05,
        pan: options.pan,
      });
    },

    poof(t, options) {
      noise({
        t,
        freq: 700,
        to: 3600,
        q: 0.6,
        attack: 0.04,
        dur: 0.24,
        gain: 0.07,
        pan: options.pan,
      });
    },

    whoosh(t, options) {
      const strength =
        clamp(
          options.strength ??
            0.5,
          0,
          1
        );

      noise({
        t,
        freq: 500,

        to:
          900 +
          2600 *
            strength,

        q: 0.8,

        attack: 0.04,

        dur:
          0.14 +
          0.1 *
            strength,

        gain:
          0.015 +
          0.05 *
            strength,

        pan: options.pan,
      });
    },

    pop(t, options) {
      oscillator({
        t,
        f0: 900,
        f1: 1350,
        dur: 0.045,
        gain: 0.035,
        pan: options.pan,
      });
    },

    note(t, options) {
      const index =
        clamp(
          options.index ??
            0,
          0,
          NOTES.length -
            1
        );

      harmonic(
        NOTES[index],
        t,
        0.055,
        options.pan
      );
    },

    notify(t, options) {
      oscillator({
        t,
        f0: 1318.51,
        dur: 0.11,
        gain: 0.045,
        pan: options.pan,
        wet: 0.3,
      });

      oscillator({
        t: t + 0.08,
        f0: 1760,
        dur: 0.16,
        gain: 0.045,
        pan: options.pan,
        wet: 0.3,
      });
    },

    bulb(t, options) {
      noise({
        t,
        freq: 3500,
        q: 1.5,
        dur: 0.01,
        gain: 0.05,
        pan: options.pan,
      });

      noise({
        t: t + 0.03,
        freq: 3000,
        q: 3,
        dur: 0.02,
        gain: 0.02,
        pan: options.pan,
      });

      oscillator({
        t: t + 0.07,
        f0: 1567.98,
        dur: 0.3,
        gain: 0.03,
        pan: options.pan,
        wet: 0.45,
      });
    },

    flutter(t, options) {
      for (
        let i = 0;
        i < 5;
        i++
      ) {
        noise({
          t:
            t +
            0.045 * i,

          freq: random(
            1200,
            1700
          ),

          q: 1.3,

          attack: 0.004,

          dur: 0.028,

          gain:
            0.03 *
            (1 -
              0.12 *
                i),

          pan: options.pan,
        });
      }
    },

    reload(t, options) {
      oscillator({
        t,
        f0: 440,
        f1: 880,
        dur: 0.12,
        type: "triangle",
        gain: 0.04,
        pan: options.pan,
        wet: 0.2,
      });

      oscillator({
        t: t + 0.12,
        f0: 1318.51,
        dur: 0.2,
        gain: 0.03,
        pan: options.pan,
        wet: 0.4,
      });
    },

    toggle(t, options) {
      oscillator({
        t,
        f0: 660,
        f1: 990,
        dur: 0.06,
        gain: 0.06,
        pan: options.pan,
      });

      noise({
        t,
        freq: 4200,
        q: 1.4,
        dur: 0.01,
        gain: 0.05,
        pan: options.pan,
      });
    },

    bell(t, options) {
      [
        0,
        0.27,
      ].forEach(
        (offset) => {
          for (
            let i = 0;
            i < 5;
            i++
          ) {
            partials(
              [
                2150,
                3390,
                4940,
              ],

              t +
                offset +
                0.024 *
                  i,

              0.07 *
                (1 -
                  0.12 *
                    i),

              0.55,

              options.pan,

              0.25
            );
          }
        }
      );
    },

    rewind(t, options) {
      for (
        let i = 0;
        i < 9;
        i++
      ) {
        const frequency =
          900 *
          Math.pow(
            4,
            i / 8
          );

        noise({
          t:
            t +
            0.12 * i,

          freq:
            frequency,

          to:
            frequency *
            1.18,

          q: 3,

          attack: 0.05,

          dur: 0.14,

          gain:
            0.035 +
            0.002 *
              i,

          pan: options.pan,
        });
      }

      oscillator({
        t: t + 1.12,
        f0: 190,
        f1: 95,
        dur: 0.07,
        gain: 0.12,
        pan: options.pan,
      });

      noise({
        t: t + 1.12,
        type: "lowpass",
        freq: 900,
        dur: 0.035,
        gain: 0.08,
        pan: options.pan,
      });
    },

    msgIn(t, options) {
      oscillator({
        t,
        f0: 1318.51,
        dur: 0.07,
        gain: 0.05,
        pan: options.pan,
        wet: 0.25,
      });

      oscillator({
        t: t + 0.065,
        f0: 987.77,
        dur: 0.12,
        gain: 0.05,
        pan: options.pan,
        wet: 0.25,
      });

      noise({
        t,
        freq: 2600,
        q: 1.2,
        dur: 0.012,
        gain: 0.02,
        pan: options.pan,
      });
    },

    key(t, options) {
      noise({
        t,
        freq: random(
          2800,
          3700
        ),
        q: 1.6,
        dur: 0.008,
        gain: 0.05,
        pan: options.pan,
      });

      oscillator({
        t,
        f0: random(
          1500,
          1800
        ),
        dur: 0.006,
        gain: 0.012,
        pan: options.pan,
      });
    },

    msgOut(t, options) {
      noise({
        t,
        freq: 1200,
        to: 5200,
        q: 0.8,
        attack: 0.02,
        dur: 0.1,
        gain: 0.03,
        pan: options.pan,
      });

      oscillator({
        t: t + 0.02,
        f0: 720,
        f1: 1440,
        dur: 0.08,
        gain: 0.04,
        pan: options.pan,
        wet: 0.2,
      });
    },

    read(t, options) {
      oscillator({
        t,
        f0: 2349.32,
        dur: 0.035,
        gain: 0.03,
        pan: options.pan,
        wet: 0.2,
      });

      oscillator({
        t: t + 0.045,
        f0: 3135.96,
        dur: 0.05,
        gain: 0.022,
        pan: options.pan,
        wet: 0.2,
      });
    },

    ring(t, options) {
      [
        987.77,
        1318.51,
        987.77,
        1318.51,
      ].forEach(
        (
          frequency,
          index
        ) => {
          const time =
            t +
            0.11 *
              index;

          oscillator({
            t: time,
            f0: frequency,
            dur: 0.16,
            gain: 0.05,
            attack: 0.003,
            pan: options.pan,
            wet: 0.2,
          });

          oscillator({
            t: time,
            f0:
              frequency *
              4,
            dur: 0.04,
            gain: 0.008,
            attack: 0.002,
            pan: options.pan,
          });
        }
      );
    },

    connect(t, options) {
      noise({
        t,
        freq: 3200,
        q: 1.5,
        dur: 0.01,
        gain: 0.04,
        pan: options.pan,
      });

      oscillator({
        t: t + 0.03,
        f0: 783.99,
        dur: 0.12,
        gain: 0.05,
        pan: options.pan,
        wet: 0.3,
      });

      oscillator({
        t: t + 0.13,
        f0: 1174.66,
        dur: 0.22,
        gain: 0.05,
        pan: options.pan,
        wet: 0.3,
      });
    },
  };

  /*
  |--------------------------------------------------------------------------
  | Material impact sounds
  |--------------------------------------------------------------------------
  */

  const materials = {
    wood(t, strength, pan) {
      oscillator({
        t,
        f0: random(
          430,
          520
        ),
        f1: 360,
        dur: 0.05,
        gain:
          0.12 *
          strength,
        pan,
      });

      noise({
        t,
        freq: random(
          1200,
          1600
        ),
        q: 3,
        dur: 0.03,
        gain:
          0.12 *
          strength,
        pan,
      });
    },

    plastic(
      t,
      strength,
      pan
    ) {
      noise({
        t,
        freq: random(
          2300,
          2900
        ),
        q: 2.5,
        dur: 0.025,
        gain:
          0.15 *
          strength,
        pan,
      });

      oscillator({
        t,
        f0: random(
          850,
          1000
        ),
        dur: 0.03,
        gain:
          0.035 *
          strength,
        pan,
      });
    },

    metal(
      t,
      strength,
      pan
    ) {
      partials(
        [
          1870,
          2990,
          4230,
        ],
        t,
        0.05 *
          strength,
        0.14,
        pan,
        0.18
      );

      noise({
        t,
        freq: 5000,
        q: 2,
        dur: 0.01,
        gain:
          0.06 *
          strength,
        pan,
      });
    },

    glass(
      t,
      strength,
      pan
    ) {
      partials(
        [
          3150,
          4750,
          6300,
        ],
        t,
        0.036 *
          strength,
        0.24,
        pan,
        0.35
      );
    },

    paper(
      t,
      strength,
      pan
    ) {
      noise({
        t,
        type: "lowpass",
        freq: 900,
        q: 0.7,
        dur: 0.05,
        gain:
          0.14 *
          strength,
        pan,
      });
    },

    rubber(
      t,
      strength,
      pan
    ) {
      oscillator({
        t,
        f0: random(
          200,
          240
        ),
        f1: 140,
        dur: 0.06,
        gain:
          0.13 *
          strength,
        pan,
      });

      noise({
        t,
        type: "lowpass",
        freq: 500,
        dur: 0.04,
        gain:
          0.07 *
          strength,
        pan,
      });
    },

    soft(
      t,
      strength,
      pan
    ) {
      noise({
        t,
        type: "lowpass",
        freq: 520,
        dur: 0.05,
        gain:
          0.05 *
          strength,
        pan,
      });
    },
  };

  /*
  |--------------------------------------------------------------------------
  | Pickup / object sounds
  |--------------------------------------------------------------------------
  */

  const pickups = {
    watch(t, pan) {
      noise({
        t,
        freq: 3400,
        q: 4,
        dur: 0.012,
        gain: 0.07,
        pan,
      });

      noise({
        t: t + 0.19,
        freq: 2300,
        q: 4,
        dur: 0.012,
        gain: 0.06,
        pan,
      });
    },

    quill(t, pan) {
      for (
        let i = 0;
        i < 3;
        i++
      ) {
        noise({
          t:
            t +
            0.075 * i +
            random(
              0,
              0.02
            ),

          freq: random(
            3800,
            5200
          ),

          to: random(
            2200,
            2900
          ),

          q: 2.2,

          attack: 0.006,

          dur: random(
            0.03,
            0.05
          ),

          gain: 0.06,

          pan,
        });
      }
    },

    astrolabe(t, pan) {
      partials(
        [
          1318.51,
          2637,
          3322,
        ],
        t,
        0.05,
        0.7,
        pan,
        0.4
      );
    },

    key(t, pan) {
      partials(
        [
          2093,
          3520,
          5040,
        ],
        t,
        0.04,
        0.12,
        pan,
        0.15
      );

      noise({
        t,
        freq: 6000,
        q: 2,
        dur: 0.008,
        gain: 0.05,
        pan,
      });
    },

    flute(t, pan) {
      harmonic(
        NOTES[
          Math.floor(
            random(
              0,
              5
            )
          )
        ],
        t,
        0.06,
        pan,
        0.5
      );
    },

    feather(t, pan) {
      effects.flutter(
        t,
        { pan }
      );
    },

    brush(t, pan) {
      noise({
        t,
        freq: 3200,
        to: 1100,
        q: 0.6,
        attack: 0.02,
        dur: 0.12,
        gain: 0.03,
        pan,
      });
    },

    palette(t, pan) {
      materials.wood(
        t,
        0.8,
        pan
      );

      materials.wood(
        t + 0.1,
        0.55,
        pan
      );
    },

    book(t, pan) {
      effects.flip(
        t,
        { pan }
      );
    },

    camera(t, pan) {
      noise({
        t,
        freq: 3000,
        q: 1.8,
        dur: 0.018,
        gain: 0.12,
        pan,
      });

      noise({
        t: t + 0.07,
        freq: 1800,
        q: 1.4,
        dur: 0.03,
        gain: 0.1,
        pan,
      });
    },

    nokia(t, pan) {
      oscillator({
        t,
        f0: 1000,
        type: "square",
        dur: 0.05,
        gain: 0.018,
        pan,
      });
    },

    cassette(t, pan) {
      materials.plastic(
        t,
        0.9,
        pan
      );

      materials.plastic(
        t + 0.06,
        0.6,
        pan
      );
    },

    duck(t, pan) {
      const osc =
        ctx.createOscillator();

      osc.type =
        "sawtooth";

      osc.frequency.setValueAtTime(
        880,
        t
      );

      osc.frequency.exponentialRampToValueAtTime(
        1500,
        t + 0.06
      );

      osc.frequency.exponentialRampToValueAtTime(
        1150,
        t + 0.17
      );

      const filter =
        ctx.createBiquadFilter();

      filter.type =
        "bandpass";

      filter.frequency.value =
        1900;

      filter.Q.value = 3;

      const gain =
        ctx.createGain();

      envelope(
        gain,
        t,
        0.01,
        0.07,
        0.17
      );

      osc
        .connect(filter)
        .connect(gain);

      connectNode(
        gain,
        pan
      );

      osc.start(t);

      osc.stop(
        t + 0.25
      );
    },

    chai(t, pan) {
      materials.glass(
        t,
        0.6,
        pan
      );
    },

    hourglass(t, pan) {
      for (
        let i = 0;
        i < 26;
        i++
      ) {
        noise({
          t:
            t +
            0.6 *
              Math.pow(
                i / 26,
                1.3
              ) +
            random(
              0,
              0.015
            ),

          freq: random(
            4500,
            8000
          ),

          q: 3,

          attack: 0.001,

          dur: 0.004,

          gain:
            0.05 *
            (1 -
              i / 32) *
            random(
              0.4,
              1
            ),

          pan,
        });
      }
    },

    magnifier(t, pan) {
      partials(
        [
          5274,
          7040,
        ],
        t,
        0.03,
        0.12,
        pan,
        0.3
      );
    },

    nautilus(t, pan) {
      noise({
        t,
        freq: 620,
        to: 420,
        q: 1.1,
        attack: 0.28,
        dur: 0.75,
        gain: 0.07,
        pan,
        wet: 0.3,
      });

      noise({
        t: t + 0.05,
        freq: 1500,
        to: 900,
        q: 1.4,
        attack: 0.3,
        dur: 0.6,
        gain: 0.02,
        pan,
        wet: 0.3,
      });
    },
  };

  /*
  |--------------------------------------------------------------------------
  | General playback functions
  |--------------------------------------------------------------------------
  */

  function playEffect(
    name,
    options = {}
  ) {
    unlock();

    if (!soundEnabled)
      return;

    const effect =
      effects[name];

    if (!effect) {
      console.warn(
        `Unknown sound: ${name}`
      );

      return;
    }

    effect(
      ctx.currentTime +
        0.005,
      {
        pan: panFromX(
          options.x
        ),

        strength:
          options.strength,

        index:
          options.index,
      }
    );
  }

  function playImpact(
    name,
    options = {}
  ) {
    unlock();

    if (!soundEnabled)
      return;

    const effect =
      materials[name];

    if (!effect) {
      console.warn(
        `Unknown material: ${name}`
      );

      return;
    }

    const strength =
      clamp(
        options.strength ??
          0.85,
        0,
        1
      );

    effect(
      ctx.currentTime,
      strength,
      panFromX(
        options.x
      )
    );
  }

  function playPickup(
    name,
    options = {}
  ) {
    unlock();

    if (!soundEnabled)
      return;

    const effect =
      pickups[name];

    if (!effect) {
      console.warn(
        `Unknown pickup: ${name}`
      );

      return;
    }

    effect(
      ctx.currentTime,
      panFromX(
        options.x
      )
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Ruffle
  |--------------------------------------------------------------------------
  */

  let ruffleSource = null;

  function playRuffle(
    options = {}
  ) {
    unlock();

    if (!soundEnabled)
      return;

    const now =
      ctx.currentTime;

    if (!ruffleSource) {
      const source =
        ctx.createBufferSource();

      source.buffer =
        noiseBuffer;

      source.loop = true;

      const filter =
        ctx.createBiquadFilter();

      filter.type =
        "bandpass";

      filter.frequency.value =
        3600;

      filter.Q.value =
        0.7;

      const gain =
        ctx.createGain();

      gain.gain.value =
        0;

      const panner =
        ctx.createStereoPanner
          ? ctx.createStereoPanner()
          : null;

      source
        .connect(filter)
        .connect(gain);

      if (panner) {
        gain
          .connect(panner)
          .connect(output);
      } else {
        gain.connect(
          output
        );
      }

      source.start();

      ruffleSource = {
        source,
        gain,
        panner,
        filter,
        timeout: null,
      };
    }

    const strength =
      clamp(
        options.strength ??
          0.9,
        0,
        1
      );

    ruffleSource.gain.gain.cancelScheduledValues(
      now
    );

    ruffleSource.gain.gain.setTargetAtTime(
      0.075 *
        strength,
      now,
      0.025
    );

    ruffleSource.gain.gain.setTargetAtTime(
      0,
      now + 0.09,
      0.12
    );

    ruffleSource.filter.frequency.setTargetAtTime(
      2600 +
        2200 *
          strength,

      now,

      0.05
    );

    if (
      ruffleSource.panner
    ) {
      ruffleSource.panner.pan.setTargetAtTime(
        panFromX(
          options.x
        ),

        now,

        0.05
      );
    }

    clearTimeout(
      ruffleSource.timeout
    );

    ruffleSource.timeout =
      setTimeout(() => {
        if (
          ruffleSource
        ) {
          ruffleSource.source.stop();

          ruffleSource.source.disconnect();

          ruffleSource =
            null;
        }
      }, 1400);
  }

  /*
  |--------------------------------------------------------------------------
  | Friendly API
  |--------------------------------------------------------------------------
  */

  const sounds = {};

  /*
  | UI sounds
  */

  [
    "tick",
    "hover",
    "detent",
    "tap",
    "success",
    "bonk",
    "boop",
    "brush",
    "stroke",
    "open",
    "close",
    "flip",
    "flick",
    "poof",
    "whoosh",
    "pop",
    "note",
    "notify",
    "bulb",
    "flutter",
    "reload",
    "toggle",
    "bell",
    "rewind",
    "msgIn",
    "key",
    "msgOut",
    "read",
    "ring",
    "connect",
  ].forEach((name) => {
    sounds[name] = (
      options = {}
    ) =>
      playEffect(
        name,
        options
      );
  });

  /*
  | Material sounds
  */

  [
    "wood",
    "plastic",
    "metal",
    "glass",
    "paper",
    "rubber",
    "soft",
  ].forEach((name) => {
    sounds[name] = (
      options = {}
    ) =>
      playImpact(
        name,
        options
      );
  });

  /*
  | Pickup sounds
  */

  sounds.watch = (
    options = {}
  ) =>
    playPickup(
      "watch",
      options
    );

  sounds.quill = (
    options = {}
  ) =>
    playPickup(
      "quill",
      options
    );

  sounds.astrolabe = (
    options = {}
  ) =>
    playPickup(
      "astrolabe",
      options
    );

  sounds.pickupKey = (
    options = {}
  ) =>
    playPickup(
      "key",
      options
    );

  sounds.flute = (
    options = {}
  ) =>
    playPickup(
      "flute",
      options
    );

  sounds.feather = (
    options = {}
  ) =>
    playPickup(
      "feather",
      options
    );

  sounds.pickupBrush = (
    options = {}
  ) =>
    playPickup(
      "brush",
      options
    );

  sounds.palette = (
    options = {}
  ) =>
    playPickup(
      "palette",
      options
    );

  sounds.book = (
    options = {}
  ) =>
    playPickup(
      "book",
      options
    );

  sounds.camera = (
    options = {}
  ) =>
    playPickup(
      "camera",
      options
    );

  sounds.nokia = (
    options = {}
  ) =>
    playPickup(
      "nokia",
      options
    );

  sounds.cassette = (
    options = {}
  ) =>
    playPickup(
      "cassette",
      options
    );

  sounds.duck = (
    options = {}
  ) =>
    playPickup(
      "duck",
      options
    );

  sounds.chai = (
    options = {}
  ) =>
    playPickup(
      "chai",
      options
    );

  sounds.hourglass = (
    options = {}
  ) =>
    playPickup(
      "hourglass",
      options
    );

  sounds.magnifier = (
    options = {}
  ) =>
    playPickup(
      "magnifier",
      options
    );

  sounds.nautilus = (
    options = {}
  ) =>
    playPickup(
      "nautilus",
      options
    );

  /*
  | Ruffle
  */

  sounds.ruffle =
    playRuffle;

  /*
  | Generic APIs
  */

  sounds.play = (
    name,
    options = {}
  ) =>
    playEffect(
      name,
      options
    );

  sounds.impact = (
    name,
    options = {}
  ) =>
    playImpact(
      name,
      options
    );

  sounds.pickup = (
    name,
    options = {}
  ) =>
    playPickup(
      name,
      options
    );

  /*
  | Controls
  */

  sounds.on = () => {
    soundEnabled = true;

    try {
      localStorage.setItem(
        "sound",
        "on"
      );
    } catch (e) {}
  };

  sounds.off = () => {
    soundEnabled = false;

    try {
      localStorage.setItem(
        "sound",
        "off"
      );
    } catch (e) {}
  };

  sounds.toggleSound =
    () => {
      soundEnabled =
        !soundEnabled;

      try {
        localStorage.setItem(
          "sound",
          soundEnabled
            ? "on"
            : "off"
        );
      } catch (e) {}

      return soundEnabled;
    };

  sounds.isOn = () =>
    soundEnabled;

  sounds.isReady = () =>
    !!ready();

  sounds.isAvailable =
    () =>
      !!AudioContextClass;

  sounds.unlock =
    unlock;

  /*
  |--------------------------------------------------------------------------
  | Export
  |--------------------------------------------------------------------------
  */

  window.sounds =
    sounds;
})();
