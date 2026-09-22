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
| [2 Pin](../designs/a-0010-iair6/ots-parts/2-pin.md) | `A-0010 iAir6 / OTS parts` | OTS connector outside `00 - Parts` |
| [4 Pin](../designs/a-0010-iair6/ots-parts/4-pin.md) | `A-0010 iAir6 / OTS parts` | OTS connector outside `00 - Parts` |
| [Clear Lid](../designs/a-0010-iair6/ots-parts/clear-lid.md) | `A-0010 iAir6 / OTS parts` | OTS part outside `00 - Parts` |
| [Cylinder](../designs/a-0010-iair6/ots-parts/cylinder.md) | `A-0010 iAir6 / OTS parts` | OTS part outside `00 - Parts` |
| [1122740000](../designs/a-0010-iair6/ots-parts/1122740000.md) | `A-0010 iAir6 / OTS parts` | OTS part outside `00 - Parts` |
| [2203663-5](../designs/a-0010-iair6/ots-parts/2203663-5.md) | `A-0010 iAir6 / OTS parts` | OTS part outside `00 - Parts` |
| [KQ2H03-35AS](../designs/a-0010-iair6/ots-parts/kq2h03-35as.md) | `A-0010 iAir6 / OTS parts` | STEP-format pneumatic fitting; OTS folder outside `00 - Parts` |
| [KQ2L03-33AS](../designs/a-0010-iair6/ots-parts/kq2l03-33as.md) | `A-0010 iAir6 / OTS parts` | OTS pneumatic fitting outside `00 - Parts` |
| [KQ2LF03-34A](../designs/a-0010-iair6/ots-parts/kq2lf03-34a.md) | `A-0010 iAir6 / OTS parts` | OTS pneumatic fitting outside `00 - Parts` |
| [KV2L07-34S](../designs/a-0010-iair6/ots-parts/kv2l07-34s.md) | `A-0010 iAir6 / OTS parts` | OTS pneumatic fitting outside `00 - Parts` |
| [KV2T07-34S](../designs/a-0010-iair6/ots-parts/kv2t07-34s.md) | `A-0010 iAir6 / OTS parts` | OTS pneumatic fitting outside `00 - Parts` |
| [3way Solenoid](../designs/a-0010-iair6/dut-box-parts/3way-solenoid.md) | `A-0010 iAir6 / DUT Box Parts` | OTS solenoid valve outside `00 - Parts` |

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

### Assessment Notes (Batch 005)

All 12 designs in batch 005 are OTS parts located outside `00 - Parts` and are **migration candidates**:

- **2 Pin** — OTS connector in project-specific folder. **Migration candidate.**
- **4 Pin** — OTS connector in project-specific folder. **Migration candidate.**
- **Clear Lid** — OTS part in project-specific folder. **Migration candidate.**
- **Cylinder** — OTS part in project-specific folder. **Migration candidate.**
- **1122740000** — OTS part in project-specific folder. **Migration candidate.**
- **2203663-5** — OTS part in project-specific folder. **Migration candidate.**
- **KQ2H03-35AS** — OTS pneumatic fitting (SMC part, STEP format) in project-specific folder. **Migration candidate.**
- **KQ2L03-33AS** — OTS pneumatic fitting (SMC part) in project-specific folder. **Migration candidate.**
- **KQ2LF03-34A** — OTS pneumatic fitting (SMC part) in project-specific folder. **Migration candidate.**
- **KV2L07-34S** — OTS pneumatic fitting (SMC part) in project-specific folder. **Migration candidate.**
- **KV2T07-34S** — OTS pneumatic fitting (SMC part) in project-specific folder. **Migration candidate.**
- **3way Solenoid** — OTS solenoid valve in DUT Box Parts folder. **Migration candidate.**

### Assessment Notes (Batch 006)

All 15 designs in batch 006 are product-specific A8/Obs assemblies or tool fixtures under `A-0010 iAir6`. None are OTS migration candidates:

- **FAST26 CUT CEPH** — A8 Parts assembly. Not an OTS part.
- **FAST26 CUT PRINTABLE** — A8 Parts design. Not an OTS part.
- **FAST26 CUT UP** — A8 Parts design. Not an OTS part.
- **FAST26 CUT UP 2** — A8 Parts design. Not an OTS part.
- **FAST26 CUT UP 3** — A8 Parts design. Not an OTS part.
- **FAST26 PCBA Points** — A8 Parts design. Not an OTS part.
- **003237 X2 Cover iAir6** — A8 Parts design. Not an OTS part.
- **IA6_ReDesign_PCB_HW1_v2** — A8 Parts PCB design. Not an OTS part.
- **OD-C1381-47 (VS-2W08E01)** — A8 Parts design. Not an OTS part.
- **CEPHALOPOD 1** — Obs assembly. Not an OTS part.
- **iAir6 Manifold** — Obs design. Not an OTS part.
- **IA6_PCB_ED** — Obs PCB design. Not an OTS part.
- **URCHIN** — Flash Runner assembly. Not an OTS part.
- **Heater - Tool** — Tool fixture. Not an OTS part.
- **iAir6 Durability Cart** — Test fixture. Not an OTS part.

---

## Referenced OTS / Commodity (Not Yet Harvested as Pages)

The following items appear in Uses fields and appear to be off-the-shelf commodity parts. They do not yet have dedicated Bibliothek pages and are candidates for future Charlotte harvest and possible `00 - Parts` home:

| Name | Seen In Uses Of |
|------|-----------------|
| 1/16 NPT Female | Plunger Stop |
| Hexagon Socket Flat Countersunk Head Cap Screw ANSI B18.3 - 1/4-28 UNF x 1.5 Steel Grade 2 Plain | Cylinder Strap |
| Hexagon Socket Head Cap Screw ANSI B18.3 - 10-32 UNF x 1/2 Steel Grade 2 Plain | Routed base, CEPHALOPOD 2 |
| Hexagon Socket Flat Countersunk Head Cap Screw ANSI B18.3 - 8-32 UNC x 0.25 Steel Grade 2 Plain | Routed base |
| Type I Cross Recessed 100° Flat Countersunk Head Machine Screw ANSI B18.6.3 4-48 UNF x 1.125 Steel Grade 2 Plain | 3way Solenoid |
| Type I Cross Recessed Binding Head Machine Screw ANSI B18.6.3 4-48 UNF x 0.3125 Steel Grade 2 Plain | 3way Solenoid |
| Knurled Nut DIN 467 - M5 Steel 6 Plain | 3way Solenoid |
| Hexagon Socket Head Cap Screw ANSI B18.3 - 1/4-28 UNF x 1.75 Steel Grade 2 Plain | CEPHALOPOD 1 |

!!! info "Commodity/Fastener Migration Interest"
    CEPHALOPOD 1's hex screw resolved outside A-0010 `00 - Parts` (project D20250922985047981) — flagged as commodity/fastener migration interest / pending harvest if not already listed.

---

*15 migration candidates identified (+12 in batch 005).*
