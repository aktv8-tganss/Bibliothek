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

### Assessment Notes (Batch 003)

- **iAIR3 Gen2 Flash Runner Bed** — Flash Runner assembly/bed under `A-0054 iAir3 Gen2 / Flash Runner`. Not an OTS part.
- **22** — Design under `A-0054 iAir3 Gen2`. No design references; not an OTS part.
- **GEN2 PROC MODULE** — Product-specific module under `A-0054 iAir3 Gen2`. Not an OTS part.
- **GEN2 PROC MODULE 2026** — Module design under `A-0054 iAir3 Gen2`. Not an OTS part.
- **Weight Plate** — Component under `A-0054 iAir3 Gen2`. Not an OTS part.

### Assessment Notes (Batch 004)

All 17 DUT Box Parts designs are product-specific parts under `A-0010 iAir6 / DUT Box Parts`. None are OTS migration candidates:

- **CEPHALOPOD 3** — DUT Box assembly. Not an OTS part.
- **Cylinder Block** — Custom machined part. Not an OTS part.
- **Cylinder Strap** — Custom machined part. Not an OTS part.
- **Lid Hinge** — Custom assembly. Not an OTS part.
- **Plunger Stop** — Custom machined part. Not an OTS part.
- **Plunger Stop Solid** — Custom machined part. Not an OTS part.
- **Plunger passthru** — Custom machined part. Not an OTS part.
- **Poly Shield** — Custom fabricated part. Not an OTS part.
- **Push Plate MFT** — Custom machined part. Not an OTS part.
- **Push Plate VMT** — Custom machined part. Not an OTS part.
- **Rail** — Custom machined part. Not an OTS part.
- **Receive Block** — Custom machined part. Not an OTS part.
- **Reg Sleeve Mount** — Custom machined part. Not an OTS part.
- **Routed base** — Custom machined assembly. Not an OTS part.
- **VMT Adapt Plate** — Custom machined part. Not an OTS part.
- **VMT Probe Carrier** — Custom machined part. Not an OTS part.
- **Valve mount** — Custom machined part. Not an OTS part.

---

## Referenced OTS / Commodity (Not Yet Harvested as Pages)

The following items appear in batch-004 Uses fields and appear to be off-the-shelf commodity parts. They do not yet have dedicated Bibliothek pages and are candidates for future Charlotte harvest and possible `00 - Parts` home:

| Name | Seen In Uses Of |
|------|-----------------|
| 2 Pin | Push Plate MFT |
| 4 Pin | CEPHALOPOD 3, VMT Adapt Plate |
| 3way Solenoid | Valve mount, Routed base |
| 1/16 NPT Female | Plunger Stop |
| Hexagon Socket Flat Countersunk Head Cap Screw ANSI B18.3 - 1/4-28 UNF x 1.5 Steel Grade 2 Plain | Cylinder Strap |
| Hexagon Socket Head Cap Screw ANSI B18.3 - 10-32 UNF x 1/2 Steel Grade 2 Plain | Routed base |
| Hexagon Socket Flat Countersunk Head Cap Screw ANSI B18.3 - 8-32 UNC x 0.25 Steel Grade 2 Plain | Routed base |
| Clear Lid | Lid Hinge |

---

*3 migration candidates identified (no new candidates in batch 004).*
