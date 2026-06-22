# Interaction Manual

Potty Pixel Pal should feel like a physical electronic potty-training toy. The player does not tap the eyes or LCD screen directly. Those parts are outputs. The only inputs are the yellow pull handle and the three chunky buttons.

## Controls

| Control | How It Works | Purpose |
| --- | --- | --- |
| Yellow top grip | Drag the top yellow bar downward until the handle flips from the toy top to the eye area, then release | Wake, confirm, trigger reactions, enter or exit mini-game |
| `1` button | Press down | No. 1 / pee training prompt |
| `◎` button | Press down | Flush / clean / reset prompt |
| `2` button | Press down | No. 2 / poop training prompt |

Only the top yellow grip is draggable. The thin left and right side arms are visual supports. A simple tap should not trigger anything. The grip must be dragged downward far enough to flip the handle roughly 90 degrees from the toy top to the eye area. If released too early, it springs back and does nothing.

## Main Training Loop

The core fantasy is a pretend potty-training routine:

```text
Pull handle to wake the toy.
Press 1 for No. 1 practice, or 2 for No. 2 practice.
The eyes react and the one-line LCD gives a short prompt.
Press ◎ to flush or clean.
Press 2 / completion prompts to celebrate.
Repeat until the toy rewards the player with a mini-game.
```

The toy should sound and behave like a fussy old learning device. It should use short words, slow LCD refresh, and expressive eyes instead of long instructions.

## Handle Behavior

| State | Pull Handle Result |
| --- | --- |
| Idle / training | Change expression and show a short greeting |
| Sleepy | Wake up and blink |
| After a few pulls | Enter `POTTY POP` mini-game |
| Mini-game | Exit the mini-game and return to training |

Current prototype shortcut: pull the handle fully three times to enter the mini-game. Press Space on keyboard to enter or exit for testing.

## Mini-Game: Potty Pop

The LCD becomes a three-position reaction screen. All normal text is hidden while a poop icon is visible.

```text
Poop appears on the left, center, or right side of the LCD.
Press the matching button below it: 1, ◎, or 2.
Correct hit clears it.
Wrong hit or timeout makes the eyes panic.
Clear 10 icons to get GOOD JOB and return to training.
```

The poop icon should fill most of the LCD height so it feels like a large chunky LCD segment, not a tiny modern emoji.

## Output Rules

- Eyes are feedback only.
- LCD is feedback only.
- Buttons and handle are the only direct controls.
- The toy should prefer one-line messages such as `PIP PANTS`, `NO. 1`, `FLUSH`, `NO. 2`, `GOOD JOB`, `MISS`, and `POTTY POP`.

