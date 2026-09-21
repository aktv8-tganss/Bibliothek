# Migration Candidates

Designs flagged as potential candidates for migration to `00 - Parts`.

A design is flagged when:

1. Its `project_path` is **outside** `00 - Parts`, AND
2. The name or notes clearly indicate it is an **off-the-shelf commodity part**

---

## Current Candidates

| Design | Current Path | Reason |
|--------|--------------|--------|
| [Prox Switch](../designs/a-0010-iair6/ots-parts/prox-switch.md) | `A-0010 iAir6 / OTS parts` | OTS folder outside `00 - Parts` |
| [SS Relay Board](../designs/a-0010-iair6/ots-parts/ss-relay-board.md) | `A-0010 iAir6 / OTS parts` | OTS folder outside `00 - Parts` |
| [KQ2H03-33AS](../designs/a-0010-iair6/ots-parts/kq2h03-33as.md) | `A-0010 iAir6 / OTS parts` | STEP-format pneumatic fitting; OTS folder outside `00 - Parts` |

---

### Assessment Notes (Batch 001)

- **Amplifier Board** — Already in `00 - Parts / Arduino`. No migration needed.
- **CEPHALOPOD 2** — Assembly under `A-0010 iAir6`. Not an OTS part.
- **FAST26 Clamping Jaws** — Product-specific assembly piece (part number `003270(003236)_PCM Fast26 no cover`). Not an OTS commodity part.

### Assessment Notes (Batch 002)

- **003234 X1a Manifold iAIR6** — Custom manifold under `A-0010 iAir6 / A8 Parts`. Not an OTS part.
- **003270 FAST26** — Custom design under `A-0010 iAir6 / A8 Parts`. Not an OTS part.
- **Prox Switch** — OTS proximity switch in project-specific folder. **Migration candidate.**
- **SS Relay Board** — OTS solid-state relay board in project-specific folder. **Migration candidate.**
- **KQ2H03-33AS** — OTS pneumatic fitting (SMC part) in project-specific folder. **Migration candidate.**

---

*3 migration candidates identified.*
