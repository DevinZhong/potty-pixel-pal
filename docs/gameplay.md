# Gameplay Proposal

## Working Title

Potty Pop LCD

## Core Loop

The rectangular LCD screen shows one or more low-resolution symbols. The player presses the matching physical-style button before the timer expires.

| Symbol Type | Button | Meaning |
| --- | --- | --- |
| Drop | Yellow | No. 1 / pee-style category |
| Puff | Blue | gas / flush / middle category |
| Block | Red | No. 2 / poop-style category |

The exact symbols should be original pixel icons, not copied from any film UI.

## Controls

| Input | Action |
| --- | --- |
| Keyboard `1` | Yellow button |
| Keyboard `2` | Blue button |
| Keyboard `3` | Red button |
| Touch / click | Press visible button |
| Space | Start / wake |

## States

```text
SLEEP
  dim LCD, slow blink, low battery tick
BOOT
  scan line, short beep sequence, logo text
IDLE
  face animations, waiting for input
GAME
  symbol matching rounds
SCORE
  rank, score, silly reaction
```

## Round Rules

- A symbol appears for a short time.
- Correct button adds score and combo.
- Wrong button breaks combo and triggers an error expression.
- Timeout counts as a miss.
- Every few rounds, speed increases.
- Blue button can optionally become a `FLUSH` special that clears multiple symbols.

## Scoring

| Event | Score |
| --- | --- |
| Correct hit | +10 |
| Combo bonus | +2 per streak step |
| Perfect round | +25 |
| Wrong hit | -5 |
| Timeout | 0 and combo reset |

## Feedback

- Correct: short rising beep, happy LCD eyes.
- Wrong: buzz, slanted eyes.
- Timeout: dim flash.
- Combo: screen sparkle pixels.
- Game over: rolling LCD text.

## Visual Constraints

The game screen should feel constrained and toy-like:

- Very low resolution.
- No smooth modern icons.
- Limited palette: mint background, dark green pixels, occasional yellow frame.
- Frame-by-frame LCD ghosting rather than fluid animation.
