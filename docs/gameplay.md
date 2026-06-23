# Gameplay Proposal

## Working Title

Potty Pop LCD

## Product Fantasy

Potty Pixel Pal is first a paper-roll electronic potty-training toy, not a standalone arcade game. The toy should feel like an old learning gadget with a tiny one-line LCD display, two expressive LCD eyes, chunky physical buttons, slow screen refresh, and fussy feedback.

The main interaction is pretending to guide a toddler through a tiny potty routine: sit, wait, flush, celebrate, repeat. The reaction game is an unlockable or built-in mini-game inside that toy.

## Main Toy Loop

| Button | Training Role | Example LCD Feedback |
| --- | --- | --- |
| Left / yellow | Sit / try | `SIT?`, `TRY 1`, `WAIT` |
| Center / blue | Flush / reset | `FLUSH`, `WHOOSH`, `CLEAN` |
| Right / red | Done / celebrate | `DONE?`, `YAY!`, `STAR` |

The eyes should react to every interaction. They can blink, squint, smile, panic, sleep, wink, or look proud. They are output screens, not tap targets.

## Mini-Game Loop

The narrow LCD display is divided into three invisible positions: left, center, and right. A low-resolution poop-style pixel icon pops up in one position, and the player must press the physical-style button directly below that position before the timer expires.

This is closer to a tiny LCD whack-a-mole reaction game than a category quiz. The buttons do not mean different potty-training concepts during the mini-game; they become position controls.

| Screen Position | Button | Meaning |
| --- | --- | --- |
| Left pop-up | Left / yellow button | Clear the left icon |
| Center pop-up | Center / blue button | Clear the center icon |
| Right pop-up | Right / red button | Clear the right icon |

The exact poop icon should be an original chunky pixel drawing or emoji-inspired placeholder during prototyping, not copied from any film UI.

## Controls

| Input | Action |
| --- | --- |
| Keyboard `1` | Left button |
| Keyboard `2` | Center button |
| Keyboard `3` | Right button |
| Touch / click | Press visible button |
| Space | Start / exit mini-game |

## States

```text
SLEEP
  dim LCD, slow blink, low battery tick
BOOT
  one-line scan, short beep sequence, logo text
TRAIN
  sit / flush / done potty-training routine
IDLE
  eye animations, waiting for input
GAME
  three-position poop pop reaction mini-game
SCORE
  rank, score, proud or fussy reaction
```

## Mini-Game Rules

- A poop icon appears in one of three LCD positions for a short time.
- Correct matching button clears the icon, adds score, and increases combo.
- Wrong button breaks combo and triggers an error expression.
- Timeout counts as a miss.
- Every few hits, speed increases, but the refresh should still feel old and stepped.
- Later rounds can show decoy flashes, double-pops, or a brief `FLUSH` bonus round.

## Scoring

| Event | Score |
| --- | --- |
| Correct hit | +1 |
| Ten clears | Win / star reaction |
| Wrong hit | Buzz and combo reset |
| Timeout | Miss and combo reset |

## Feedback

- Correct: short rising beep, happy LCD eyes.
- Wrong: buzz, panic eyes.
- Timeout: dim flash.
- Combo: one-line LCD counter such as `X3`.
- Game over: one-line text such as `STAR` or `AGAIN?`.

## Visual Constraints

The toy should feel constrained, old, and physical:

- One-line text LCD, not a rich game screen.
- Very low-resolution icons and expression masks.
- No smooth modern icons.
- Limited palette: mint LCD, dark green pixels, yellowed paper, bright molded plastic.
- Slow stepped refresh and occasional blink rather than fluid animation.
- Mobile-first layout: eyes and LCD above three large thumb-friendly buttons.
