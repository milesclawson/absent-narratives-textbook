# Content Generation Guide

Guidance for generating student-facing content (chapters, lesson plans,
quizzes, FAQ, glossary) for the **Absent Narratives** textbook.

## Learning Mascot: Sage the Raven

### Mascot File Index

The canonical files for this mascot. When editing any of these, update the
others in the same turn so they stay in sync.

| File | Purpose |
|------|---------|
| [`docs/img/mascot/character-sheet.md`](docs/img/mascot/character-sheet.md) | Canonical identity document (name, species, colors, voice). Source of truth. |
| [`docs/img/mascot/image-prompts.md`](docs/img/mascot/image-prompts.md) | Self-contained AI prompts for regenerating each pose. |
| `docs/img/mascot/neutral.png` | Default / general-purpose pose (placeholder — see note below). |
| `docs/img/mascot/welcome.png` | Chapter-opening pose (placeholder). |
| `docs/img/mascot/thinking.png` | Key-concept pose (placeholder). |
| `docs/img/mascot/tip.png` | Hint / helpful-guidance pose (placeholder). |
| `docs/img/mascot/warning.png` | Common-mistake / pitfall pose (placeholder). |
| `docs/img/mascot/encouraging.png` | Difficult-content / struggle pose (placeholder). |
| `docs/img/mascot/celebration.png` | End-of-chapter / achievement pose (placeholder). |
| [`docs/css/mascot.css`](docs/css/mascot.css) | Custom admonition styles for the seven pose contexts. |
| [`docs/learning-graph/mascot-test.md`](docs/learning-graph/mascot-test.md) | Rendering test page that exercises every admonition style. |

**Note:** The seven pose PNGs are currently simple placeholder circles
(indigo fill, amber ring), generated programmatically so the site builds
cleanly under `mkdocs build --strict` and the admonition CSS can be
previewed. They are **not** final artwork. Generating the real character art
requires an external AI image tool (ChatGPT/DALL-E, Midjourney, etc.), which
this environment cannot call directly — run the prompts in
`docs/img/mascot/image-prompts.md` and replace the seven files, then run the
trim-padding script per that file's instructions.

### Character Overview

- **Name**: Sage
- **Species**: Raven
- **Personality**: Curious, Thoughtful, Fair-minded, Encouraging
- **Catchphrase**: "Every story has more than one side."
- **Visual**: Deep indigo-black feathers, small round wire-frame glasses, a
  worn leather satchel with a scroll peeking out — symbolizing an
  investigator who gathers and carries overlooked stories forward.

### Voice Characteristics

- Asks probing questions rather than handing over conclusions
- Refers to students as "historians" or "investigators"
- Never trivializes suffering, violence, or injustice — warmth without
  minimizing serious subject matter
- Signature phrases: "Every story has more than one side.", "Whose voice is
  missing here?", "Let's look at the evidence together."

### Mascot Admonition Format

Always place mascot images in the admonition body, never in the title bar:

    !!! mascot-welcome "Title Here"
        ![Sage waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
        Admonition text goes here after the image.

Image paths are relative to the *rendered* page URL, not the markdown file.
For a chapter page at `chapters/01-intro/index.md` (renders at
`chapters/01-intro/`), use `../../img/mascot/`.

### Placement Rules

| Context | Admonition Type | Frequency |
|---------|----------------|-----------|
| General note / sidebar | mascot-neutral | As needed |
| Chapter opening | mascot-welcome | Every chapter |
| Key concept | mascot-thinking | 2-3 per chapter |
| Helpful tip | mascot-tip | As needed |
| Common mistake | mascot-warning | As needed |
| Difficult content | mascot-encourage | Where students may struggle |
| Section completion | mascot-celebration | End of major sections |

### Do's and Don'ts

**Do:**

- Use Sage to introduce new topics warmly
- Include the catchphrase in welcome admonitions
- Keep dialogue brief (1-3 sentences)
- Match the pose/image to the content type

**Don't:**

- Use Sage more than 5-6 times per chapter
- Put mascot admonitions back-to-back
- Use the mascot for purely decorative purposes
- Change Sage's personality or speech patterns
- Use Sage to joke about or minimize the historical injustices the book
  covers — the tone is warm but the subject matter is serious
