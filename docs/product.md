# Product Guide

[简体中文](zh-CN/product.md)

## One-Line Pitch

Pippin Roll, nicknamed PIP, is a paper-roll-shaped electronic potty-training toy that teaches tiny potty routines through chunky buttons, slow mint LCD expressions, and a hidden reaction mini-game.

## Identity

| Field | Direction |
| --- | --- |
| Project name | Potty Pixel Pal |
| Character name | Pippin Roll |
| LCD nickname | PIP |
| Chinese name | 皮皮卷 |
| Object type | Paper-roll-shaped LCD potty-training toy |
| Personality | Helpful, fussy, proud of simple tasks, occasionally overdramatic |
| Emotional arc | A sleepy outdated gadget wakes up, remembers its purpose, and becomes a playful companion |
| Audience | Makers, web toy fans, animation fans, retro LCD game enjoyers, and social-media viewers |

## Visual Language

- Warm white toilet-paper-roll body, read mostly from a flat frontal angle.
- Bright molded rectangular plastic handle / frame.
- Two mint LCD eye displays that change expression.
- A very narrow one-line LCD status display.
- Chunky physical buttons below the display.
- Slow, stepped, low-refresh screen behavior.
- Old educational-toy labels, beeps, buzzes, and fussy prompts.

The project uses project-owned proportions, casing treatment, labels, expression masks, button colors, and pixel icons. The toy stays readable from the front while keeping the details redrawn for this project.

## Color

| Part | Color |
| --- | --- |
| Paper body | Warm white, ivory highlights |
| Plastic frame | Sunny yellow / toy-store gold |
| LCD active pixels | Dark green |
| LCD glass | Mint green |
| Button A | Yellow |
| Button B | Blue |
| Button C | Red |
| Accent | Small sticker badge or molded toy label |

## Interaction Model

Pippin Roll behaves like a physical electronic potty-training toy. The player does not tap the eyes or LCD screen directly. Those parts are outputs. The only inputs are the yellow pull handle and the three chunky buttons.

### Controls

| Control | How It Works | Purpose |
| --- | --- | --- |
| Yellow top grip | Drag the top yellow bar downward until the handle flips from the toy top to the eye area, then release | Wake, confirm, trigger reactions, enter or exit mini-game |
| `1` button | Press down | No. 1 / pee training prompt |
| `◎` button | Press down | Flush / clean / reset prompt |
| `2` button | Press down | No. 2 / poop training prompt |

Only the top yellow grip is draggable. The left and right side bars are visual parts of the same frame, not separate controls. A simple tap does nothing. The grip must be dragged downward far enough to flip the handle roughly 90 degrees from the toy top to the eye area. If released too early, it springs back and does nothing.

### Main Training Loop

```text
Pull handle to wake the toy.
Press 1 for No. 1 practice, or 2 for No. 2 practice.
The eyes react and the one-line LCD gives a short prompt.
Press ◎ to flush, clean, and celebrate with a `GOOD JOB` after a No. 1 or No. 2 prompt.
Repeat until the toy rewards the player with a mini-game.
```

### Handle Behavior

| State | Pull Handle Result |
| --- | --- |
| Idle / training | Change expression and show a short greeting |
| Sleepy | Wake up and blink |
| After a few pulls | Enter `POTTY POP` mini-game |
| Mini-game | Exit the mini-game and return to training |

Current prototype shortcut: pull the handle fully three times to enter the mini-game. Press Space on keyboard to enter or exit for testing.

### Output Rules

- Eyes are screen output only.
- LCD is screen output only.
- Buttons and handle are the only direct controls.
- The toy prefers one-line messages such as `PIPPIN ROLL`, `NO. 1`, `FLUSH`, `NO. 2`, `GOOD JOB`, `MISS`, and `POTTY POP`.

## Gameplay

### Working Title

Potty Pop LCD

### Product Fantasy

Potty Pixel Pal is first a paper-roll electronic potty-training toy, not a standalone arcade game. The reaction game is a built-in mini-game inside that toy.

### Main Toy Loop

| Button | Training Role | Example LCD Feedback |
| --- | --- | --- |
| Left / yellow | No. 1 / pee | `NO. 1`, `PEE?`, `TRY 1` |
| Center / blue | Flush / clean / praise | `FLUSH`, `CLEAN`, `GOOD JOB` |
| Right / red | No. 2 / poop | `NO. 2`, `POOP?`, `TRY 2` |

The eyes react to every interaction. They can blink, squint, smile, panic, sleep, wink, or look proud. They are output screens, not tap targets.

### Mini-Game Loop

The narrow LCD display is divided into three invisible positions: left, center, and right. A low-resolution poop-style pixel icon pops up in one position, and the player must press the physical-style button directly below that position before the timer expires.

The buttons do not mean different potty-training concepts during the mini-game. They become position controls.

| Screen Position | Button | Meaning |
| --- | --- | --- |
| Left pop-up | Left / yellow button | Clear the left icon |
| Center pop-up | Center / blue button | Clear the center icon |
| Right pop-up | Right / red button | Clear the right icon |

The prototype uses an original chunky pixel poop icon.

### Controls

| Input | Action |
| --- | --- |
| Keyboard `1` | Left button |
| Keyboard `2` | Center button |
| Keyboard `3` | Right button |
| Touch / click | Press visible button |
| Space | Start / exit mini-game |

### States

```text
SLEEP
  dim LCD, slow blink, low battery tick
BOOT
  one-line scan, short beep sequence, logo text
TRAIN
  No. 1 / No. 2 prompt, then flush / praise potty-training routine
IDLE
  eye animations, waiting for input
GAME
  three-position poop pop reaction mini-game
SCORE
  rank, score, proud or fussy reaction
```

### Mini-Game Rules

- A poop icon appears in one of three LCD positions for a short time.
- Correct matching button clears the icon, adds score, and increases combo.
- Wrong button breaks combo and triggers an error expression.
- Timeout counts as a miss.
- Every few hits, speed increases, but the refresh stays old and stepped.
- Later rounds can show decoy flashes, double-pops, or a brief `FLUSH` bonus round.

### Scoring

| Event | Score |
| --- | --- |
| Correct hit | +1 |
| Ten clears | Win / star reaction |
| Wrong hit | Buzz and combo reset |
| Timeout | Miss and combo reset |

### Feedback

- Correct: short rising beep, happy LCD eyes.
- Wrong: buzz, panic eyes.
- Timeout: dim flash.
- Combo: one-line LCD counter such as `X3`.
- Game over: one-line text such as `STAR` or `AGAIN?`.

## Tone

Playful, tiny, and a little absurd. The joke comes from an overly serious gadget doing a very small job with heroic confidence.

