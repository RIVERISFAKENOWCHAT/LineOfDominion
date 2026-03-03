# Crownfall (Prototype)

A lightweight browser prototype for the **Crownfall** concept:
- 1v1 turn-based card battler
- Deck building (20 cards)
- Lane combat (3 lanes)
- Units, Spells, and single active Relic
- AI with Easy / Medium / Hard behavior

## Run

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

## Controls

- Build your deck to exactly 20 cards.
- Click **Start Match**.
- Click a hand card to play it.
  - Units auto-place in first open lane.
  - Spells auto-resolve with simple targeting.
- Click a ready unit, then click enemy lane to attack.
- Click **End Turn**.

## Notes

This prototype intentionally favors clarity and speed over full CCG complexity.
