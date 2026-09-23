# Migration Candidates

Designs flagged as potential candidates for migration to `00 - Parts`.

A design is flagged when:

1. Its `project_path` is **outside** `00 - Parts`, AND
2. The name or notes clearly indicate it is an **off-the-shelf commodity part**

This page organizes candidates into three buckets for triage.

---

## Summary

| Bucket | Count | Action |
|--------|-------|--------|
| (a) Move to 00 - Parts | 147 | Migrate to canonical `00 - Parts` folder |
| (b) Reconcile duplicate | 59 | May be duplicate of existing design; reconcile before migrating |
| (c) Review | 86 | Needs review to determine appropriate action |

**Total:** 292 candidates

---

## (a) Move to 00 - Parts

Pure OTS parts that should be migrated to the canonical `00 - Parts` folder.

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
| [1](../designs/a-0026-itm/aeetes/ots-parts/1.md) | `A-0026 iTM / AEETES / OTS Parts` | OTS part outside `00 - Parts` |
| [1/2 Magnet](../designs/a-0026-itm/aeetes/ots-parts/1-2-magnet.md) | `A-0026 iTM / AEETES / OTS Parts` | OTS magnet outside `00 - Parts` |
| [1/8 Branch Tee](../designs/a-0026-itm/aeetes/ots-parts/1-8-branch-tee.md) | `A-0026 iTM / AEETES / OTS Parts` | OTS pneumatic fitting outside `00 - Parts` |
| [1/8 Bulkhead Fitting](../designs/a-0026-itm/aeetes/ots-parts/1-8-bulkhead-fitting.md) | `A-0026 iTM / AEETES / OTS Parts` | OTS pneumatic fitting outside `00 - Parts` |
| [1/8 Muffler](../designs/a-0026-itm/aeetes/ots-parts/1-8-muffler.md) | `A-0026 iTM / AEETES / OTS Parts` | OTS pneumatic fitting outside `00 - Parts` |
| [1/8 Nipple](../designs/a-0026-itm/aeetes/ots-parts/1-8-nipple.md) | `A-0026 iTM / AEETES / OTS Parts` | OTS pneumatic fitting outside `00 - Parts` |
| [1/8 Union Tee](../designs/a-0026-itm/aeetes/ots-parts/1-8-union-tee.md) | `A-0026 iTM / AEETES / OTS Parts` | OTS pneumatic fitting outside `00 - Parts` |
| [12V10A](../designs/a-0026-itm/aeetes/ots-parts/12v10a.md) | `A-0026 iTM / AEETES / OTS Parts` | OTS power supply outside `00 - Parts` |
| [3/16 Machine Key](../designs/a-0026-itm/aeetes/ots-parts/3-16-machine-key.md) | `A-0026 iTM / AEETES / OTS Parts` | OTS hardware outside `00 - Parts` |
| [400VA UPS](../designs/a-0026-itm/aeetes/ots-parts/400va-ups.md) | `A-0026 iTM / AEETES / OTS Parts` | OTS UPS outside `00 - Parts` |
| [54100-17X-02-A](../designs/a-0026-itm/aeetes/ots-parts/54100-17x-02-a.md) | `A-0026 iTM / AEETES / OTS Parts` | OTS part outside `00 - Parts` |
| [5V14A](../designs/a-0026-itm/aeetes/ots-parts/5v14a.md) | `A-0026 iTM / AEETES / OTS Parts` | OTS power supply outside `00 - Parts` |
| [5V3A](../designs/a-0026-itm/aeetes/ots-parts/5v3a.md) | `A-0026 iTM / AEETES / OTS Parts` | OTS power supply outside `00 - Parts` |
| [67CP3220](../designs/a-0026-itm/aeetes/ots-parts/67cp3220.md) | `A-0026 iTM / AEETES / OTS Parts` | OTS part outside `00 - Parts` |
| [ANMBEST 4-MOSFET](../designs/a-0026-itm/aeetes/ots-parts/anmbest-4-mosfet.md) | `A-0026 iTM / AEETES / OTS Parts` | OTS MOSFET board outside `00 - Parts` |
| [ArduinoMega_STEP_AP203](../designs/a-0026-itm/aeetes/ots-parts/arduinomega-step-ap203.md) | `A-0026 iTM / AEETES / OTS Parts` | OTS Arduino STEP model outside `00 - Parts` |
| [Cable Duct](../designs/a-0026-itm/aeetes/ots-parts/cable-duct.md) | `A-0026 iTM / AEETES / OTS Parts` | OTS cable duct outside `00 - Parts` |
| [Compressor Motor](../designs/a-0026-itm/aeetes/ots-parts/compressor-motor.md) | `A-0026 iTM / AEETES / OTS Parts` | OTS motor outside `00 - Parts` |
| [Compressor Screw](../designs/a-0026-itm/aeetes/ots-parts/compressor-screw.md) | `A-0026 iTM / AEETES / OTS Parts` | OTS hardware outside `00 - Parts` |
| [Flow Control Exhaust](../designs/a-0026-itm/aeetes/ots-parts/flow-control-exhaust.md) | `A-0026 iTM / AEETES / OTS Parts` | OTS pneumatic component outside `00 - Parts` |
| [Flow Valve (Out)](../designs/a-0026-itm/aeetes/ots-parts/flow-valve-out.md) | `A-0026 iTM / AEETES / OTS Parts` | OTS valve outside `00 - Parts` |
| [Frame Screw](../designs/a-0026-itm/aeetes/ots-parts/frame-screw.md) | `A-0026 iTM / AEETES / OTS Parts` | OTS hardware outside `00 - Parts` |
| [H Cable Duct](../designs/a-0026-itm/aeetes/ots-parts/h-cable-duct.md) | `A-0026 iTM / AEETES / OTS Parts` | OTS cable duct outside `00 - Parts` |
| [KV2H03-34S](../designs/a-0026-itm/aeetes/ots-parts/kv2h03-34s.md) | `A-0026 iTM / AEETES / OTS Parts` | OTS pneumatic fitting outside `00 - Parts` |
| [KV2H07-34S](../designs/a-0026-itm/aeetes/ots-parts/kv2h07-34s.md) | `A-0026 iTM / AEETES / OTS Parts` | OTS pneumatic fitting outside `00 - Parts` |
| [Mini Regulator](../designs/a-0026-itm/aeetes/ots-parts/mini-regulator.md) | `A-0026 iTM / AEETES / OTS Parts` | OTS regulator outside `00 - Parts` |
| [Moonfish Base 2](../designs/a-0026-itm/aeetes/ots-parts/moonfish-base-2.md) | `A-0026 iTM / AEETES / OTS Parts` | OTS assembly outside `00 - Parts` |
| [Mount Screw](../designs/a-0026-itm/aeetes/ots-parts/mount-screw.md) | `A-0026 iTM / AEETES / OTS Parts` | OTS hardware outside `00 - Parts` |
| [Push Nut](../designs/a-0026-itm/aeetes/ots-parts/push-nut.md) | `A-0026 iTM / AEETES / OTS Parts` | OTS hardware outside `00 - Parts` |
| [Raspberry Pi](../designs/a-0026-itm/aeetes/ots-parts/raspberry-pi.md) | `A-0026 iTM / AEETES / OTS Parts` | OTS single-board computer outside `00 - Parts` |
| [Rubber Washer](../designs/a-0026-itm/aeetes/ots-parts/rubber-washer.md) | `A-0026 iTM / AEETES / OTS Parts` | OTS hardware outside `00 - Parts` |
| [Snap-in Nut](../designs/a-0026-itm/aeetes/ots-parts/snap-in-nut.md) | `A-0026 iTM / AEETES / OTS Parts` | OTS hardware outside `00 - Parts` |
| [Touchscreen](../designs/a-0026-itm/aeetes/ots-parts/touchscreen.md) | `A-0026 iTM / AEETES / OTS Parts` | OTS display outside `00 - Parts` |
| [USB-TC](../designs/a-0026-itm/aeetes/ots-parts/usb-tc.md) | `A-0026 iTM / AEETES / OTS Parts` | OTS thermocouple interface outside `00 - Parts` |
| [Untitled (AEETES OTS)](../designs/a-0026-itm/aeetes/ots-parts/untitled-aeetes.md) | `A-0026 iTM / AEETES / OTS Parts` | OTS part outside `00 - Parts` |
| [V Cable Duct](../designs/a-0026-itm/aeetes/ots-parts/v-cable-duct.md) | `A-0026 iTM / AEETES / OTS Parts` | OTS cable duct outside `00 - Parts` |
| [Hose Cutter](../designs/a-0026-itm/ots-parts/hose-cutter.md) | `A-0026 iTM / OTS Parts` | OTS outside `00 - Parts` |
| [Dropper](../designs/a-0026-itm/ots-parts/dropper.md) | `A-0026 iTM / OTS Parts` | OTS outside `00 - Parts` |
| [LUBER](../designs/a-0026-itm/ots-parts/luber.md) | `A-0026 iTM / OTS Parts` | OTS outside `00 - Parts` |
| [SCE-36N2408LP](../designs/a-0026-itm/orthrus/ots-parts/sce-36n2408lp.md) | `A-0026 iTM / ORTHRUS / OTS PARTS` | OTS outside `00 - Parts` |
| [Work Stand](../designs/a-0026-itm/orthrus/ots-parts/work-stand.md) | `A-0026 iTM / ORTHRUS / OTS PARTS` | OTS outside `00 - Parts` |
| [1500VA UPS](../designs/a-0026-itm/orthrus/ots-parts/pneu/1500va-ups.md) | `A-0026 iTM / ORTHRUS / OTS PARTS / PNEU` | OTS outside `00 - Parts` |
| [Samsung_T37F](../designs/a-0026-itm/orthrus/ots-parts/elec/samsung-t37f.md) | `A-0026 iTM / ORTHRUS / OTS PARTS / ELEC` | OTS outside `00 - Parts` |
| [USB-2637](../designs/a-0026-itm/orthrus/ots-parts/elec/usb-2637.md) | `A-0026 iTM / ORTHRUS / OTS PARTS / ELEC` | OTS outside `00 - Parts` |
| [Motor Control PCBA](../designs/a-0026-itm/orthrus/ots-parts/elec/motor-control-pcba.md) | `A-0026 iTM / ORTHRUS / OTS PARTS / ELEC` | OTS outside `00 - Parts` |
| [Fieldmann Ratchet Handle](../designs/a-0026-itm/asm-tooling/ots-parts/fieldmann-ratchet-handle.md) | `A-0026 iTM / ASM TOOLING / OTS Parts` | OTS outside `00 - Parts` |
| [4 inch Drill Press Vice](../designs/a-0026-itm/asm-tooling/ots-parts/4-inch-drill-press-vice.md) | `A-0026 iTM / ASM TOOLING / OTS Parts` | OTS outside `00 - Parts` |
| [STORAGE TOTE-14GAL](../designs/a-0026-itm/asm-tooling/ots-parts/storage-tote-14gal.md) | `A-0026 iTM / ASM TOOLING / OTS Parts` | OTS outside `00 - Parts` |
| [GIGADAQ](../designs/a-0026-itm/orthrus/ots-parts/gigadaq.md) | `A-0026 iTM / ORTHRUS / OTS PARTS` | OTS outside `00 - Parts` |
| [.5G V Tanjk](../designs/a-0026-itm/orthrus/ots-parts/pneu/dot5g-v-tanjk.md) | `A-0026 iTM / ORTHRUS / OTS PARTS / PNEU` | OTS outside `00 - Parts` |
| [Wire Channel](../designs/a-0026-itm/orthrus/ots-parts/elec/wire-channel.md) | `A-0026 iTM / ORTHRUS / OTS PARTS / ELEC` | OTS outside `00 - Parts` |
| [Flow Control Valve](../designs/a-0026-itm/orthrus/ots-parts/pneu/flow-control-valve.md) | `A-0026 iTM / ORTHRUS / OTS PARTS / PNEU` | OTS outside `00 - Parts` |
| [KV2E07-35](../designs/a-0026-itm/orthrus/ots-parts/pneu/kv2e07-35.md) | `A-0026 iTM / ORTHRUS / OTS PARTS / PNEU` | OTS outside `00 - Parts` |
| [KV2H07-35S](../designs/a-0026-itm/orthrus/ots-parts/pneu/kv2h07-35s.md) | `A-0026 iTM / ORTHRUS / OTS PARTS / PNEU` | OTS outside `00 - Parts` |
| [PTC Tee](../designs/a-0026-itm/orthrus/ots-parts/pneu/ptc-tee.md) | `A-0026 iTM / ORTHRUS / OTS PARTS / PNEU` | OTS outside `00 - Parts` |
| [ORTHRUS WCONFIG - Mounting rail 1 (4d0ZixU)](../designs/a-0026-itm/orthrus/ots-parts/elec/orthrus-wconfig-mounting-rail-1-4d0ZixU.md) | `A-0026 iTM / ORTHRUS / OTS PARTS / ELEC` | OTS outside `00 - Parts` |
| [ORTHRUS WCONFIG - Mounting rail 1 (4xSnKkK)](../designs/a-0026-itm/orthrus/ots-parts/elec/orthrus-wconfig-mounting-rail-1-4xSnKkK.md) | `A-0026 iTM / ORTHRUS / OTS PARTS / ELEC` | OTS outside `00 - Parts` |
| [c-1set411014r0000-a-3d v1](../designs/a-0026-itm/orthrus/ots-parts/elec/c-1set411014r0000-a-3d-v1.md) | `A-0026 iTM / ORTHRUS / OTS PARTS / ELEC` | OTS outside `00 - Parts` |
| [c-1set411202r0000-a-3d v1](../designs/a-0026-itm/orthrus/ots-parts/elec/c-1set411202r0000-a-3d-v1.md) | `A-0026 iTM / ORTHRUS / OTS PARTS / ELEC` | OTS outside `00 - Parts` |
| [c-2416050-5-a1-3d](../designs/a-0026-itm/orthrus/ots-parts/elec/c-2416050-5-a1-3d.md) | `A-0026 iTM / ORTHRUS / OTS PARTS / ELEC` | OTS outside `00 - Parts` |
| [1/4 NPT Double Bulkhead](../designs/a-0026-itm/orthrus/ots-parts/pneu/1-4-npt-double-bulkhead.md) | `A-0026 iTM / ORTHRUS / OTS PARTS / PNEU` | OTS outside `00 - Parts` |
| [1/4 NPT M Nipple](../designs/a-0026-itm/orthrus/ots-parts/pneu/1-4-npt-m-nipple.md) | `A-0026 iTM / ORTHRUS / OTS PARTS / PNEU` | OTS outside `00 - Parts` |
| [1/4 NPT Muffler](../designs/a-0026-itm/orthrus/ots-parts/pneu/1-4-npt-muffler.md) | `A-0026 iTM / ORTHRUS / OTS PARTS / PNEU` | OTS outside `00 - Parts` |
| [1/4 NPT Street Tee](../designs/a-0026-itm/orthrus/ots-parts/pneu/1-4-npt-street-tee.md) | `A-0026 iTM / ORTHRUS / OTS PARTS / PNEU` | OTS outside `00 - Parts` |
| [100CP8-2A](../designs/a-0026-itm/orthrus/ots-parts/pneu/100cp8-2a.md) | `A-0026 iTM / ORTHRUS / OTS PARTS / PNEU` | OTS outside `00 - Parts` |
| [1/4 1/8 NPT M Reducer](../designs/a-0026-itm/orthrus/ots-parts/pneu/1-4-1-8-npt-m-reducer.md) | `A-0026 iTM / ORTHRUS / OTS PARTS / PNEU` | OTS outside `00 - Parts` |
| [12V (ORTHRUS ELEC)](../designs/a-0026-itm/orthrus/ots-parts/elec/12v.md) | `A-0026 iTM / ORTHRUS / OTS PARTS / ELEC` | OTS outside `00 - Parts` |
| [3.5mm TRS](../designs/a-0026-itm/orthrus/ots-parts/elec/35mm-trs.md) | `A-0026 iTM / ORTHRUS / OTS PARTS / ELEC` | OTS outside `00 - Parts` |
| [46993-0420](../designs/a-0026-itm/orthrus/ots-parts/elec/46993-0420.md) | `A-0026 iTM / ORTHRUS / OTS PARTS / ELEC` | OTS outside `00 - Parts` |
| [C14 Plug](../designs/a-0026-itm/orthrus/ots-parts/elec/c14-plug.md) | `A-0026 iTM / ORTHRUS / OTS PARTS / ELEC` | OTS outside `00 - Parts` |
| [ERB24](../designs/a-0026-itm/orthrus/ots-parts/elec/erb24.md) | `A-0026 iTM / ORTHRUS / OTS PARTS / ELEC` | OTS outside `00 - Parts` |
| [keyboard](../designs/a-0026-itm/orthrus/ots-parts/elec/keyboard.md) | `A-0026 iTM / ORTHRUS / OTS PARTS / ELEC` | OTS outside `00 - Parts` |
| [Ball Valve](../designs/a-0047-tpms/ots-parts/ball-valve.md) | `A-0047 TPMS / OTS Parts` | OTS/catalog valve outside `00 - Parts` |
| [Large Schrader](../designs/a-0047-tpms/ots-parts/large-schrader.md) | `A-0047 TPMS / OTS Parts` | OTS/catalog fitting outside `00 - Parts` |
| [Manifold 5 Block](../designs/a-0047-tpms/ots-parts/manifold-5-block.md) | `A-0047 TPMS / OTS Parts` | OTS/catalog manifold outside `00 - Parts` |
| [Small Gauge](../designs/a-0047-tpms/ots-parts/small-gauge.md) | `A-0047 TPMS / OTS Parts` | OTS/catalog gauge outside `00 - Parts` |
| [Small Valve](../designs/a-0047-tpms/ots-parts/small-valve.md) | `A-0047 TPMS / OTS Parts` | OTS/catalog valve outside `00 - Parts` |
| [1-4 bearing](../designs/a-0047-tpms/ots-parts/1-4-bearing.md) | `A-0047 TPMS / OTS Parts` | OTS/catalog bearing outside `00 - Parts` |
| [1-8 brass schrader](../designs/a-0047-tpms/ots-parts/1-8-brass-schrader.md) | `A-0047 TPMS / OTS Parts` | OTS/catalog fitting outside `00 - Parts` |
| [1/2 Barrel](../designs/a-0047-tpms/ots-parts/1-2-barrel.md) | `A-0047 TPMS / OTS Parts` | OTS/catalog barrel outside `00 - Parts` |
| [Finger Stud](../designs/a-0047-tpms/ots-parts/finger-stud.md) | `A-0047 TPMS / OTS Parts` | OTS/catalog stud outside `00 - Parts` |
| [Gauge](../designs/a-0047-tpms/ots-parts/gauge.md) | `A-0047 TPMS / OTS Parts` | OTS/catalog gauge outside `00 - Parts` |
| [NUC Pro Chassis](../designs/a-0047-tpms/ots-parts/nuc-pro-chassis.md) | `A-0047 TPMS / OTS Parts` | OTS/catalog NUC chassis outside `00 - Parts` |
| [Schrader Fitting](../designs/a-0047-tpms/ots-parts/schrader-fitting.md) | `A-0047 TPMS / OTS Parts` | OTS/catalog fitting outside `00 - Parts` |
| [Stepper](../designs/a-0047-tpms/ots-parts/stepper.md) | `A-0047 TPMS / OTS Parts` | OTS/catalog stepper outside `00 - Parts` |
| [Worm Shaft](../designs/a-0047-tpms/ots-parts/worm-shaft.md) | `A-0047 TPMS / OTS Parts` | OTS/catalog shaft outside `00 - Parts` |
| [1/2 Dowel](../designs/a-0047-tpms/ots-parts/1-2-dowel.md) | `A-0047 TPMS / OTS Parts` | OTS/catalog dowel outside `00 - Parts` |
| [1/2 linear bearing](../designs/a-0047-tpms/ots-parts/1-2-linear-bearing.md) | `A-0047 TPMS / OTS Parts` | OTS/catalog bearing outside `00 - Parts` |
| [1/2 shoulder](../designs/a-0047-tpms/ots-parts/1-2-shoulder.md) | `A-0047 TPMS / OTS Parts` | OTS/catalog shoulder screw outside `00 - Parts` |
| [1/4 Shoulder](../designs/a-0047-tpms/ots-parts/1-4-shoulder.md) | `A-0047 TPMS / OTS Parts` | OTS/catalog shoulder screw outside `00 - Parts` |
| [1/4 spring](../designs/a-0047-tpms/ots-parts/1-4-spring.md) | `A-0047 TPMS / OTS Parts` | OTS/catalog spring outside `00 - Parts` |
| [1/4-28 Coupling](../designs/a-0047-tpms/ots-parts/1-4-28-coupling.md) | `A-0047 TPMS / OTS Parts` | OTS/catalog coupling outside `00 - Parts` |
| [1/4-28 Stud](../designs/a-0047-tpms/ots-parts/1-4-28-stud.md) | `A-0047 TPMS / OTS Parts` | OTS/catalog stud outside `00 - Parts` |
| [1/4-28 button](../designs/a-0047-tpms/ots-parts/1-4-28-button.md) | `A-0047 TPMS / OTS Parts` | OTS/catalog button outside `00 - Parts` |
| [1/8 brass nipple](../designs/a-0047-tpms/ots-parts/1-8-brass-nipple.md) | `A-0047 TPMS / OTS Parts` | OTS/catalog nipple outside `00 - Parts` |
| [1/8 brass plug](../designs/a-0047-tpms/ots-parts/1-8-brass-plug.md) | `A-0047 TPMS / OTS Parts` | OTS/catalog plug outside `00 - Parts` |
| [1/8 brass tee](../designs/a-0047-tpms/ots-parts/1-8-brass-tee.md) | `A-0047 TPMS / OTS Parts` | OTS/catalog tee outside `00 - Parts` |
| [3 3/8 spacer](../designs/a-0047-tpms/ots-parts/3-3-8-spacer.md) | `A-0047 TPMS / OTS Parts` | OTS/catalog spacer outside `00 - Parts` |
| [3/8 Bearing](../designs/a-0047-tpms/ots-parts/3-8-bearing.md) | `A-0047 TPMS / OTS Parts` | OTS/catalog bearing outside `00 - Parts` |
| [3/8 PTFE Bearing](../designs/a-0047-tpms/ots-parts/3-8-ptfe-bearing.md) | `A-0047 TPMS / OTS Parts` | OTS/catalog PTFE bearing outside `00 - Parts` |
| [3/8 Shoulder](../designs/a-0047-tpms/ots-parts/3-8-shoulder-upper.md) | `A-0047 TPMS / OTS Parts` | OTS/catalog shoulder screw outside `00 - Parts`; uppercase |
| [3/8 shoulder](../designs/a-0047-tpms/ots-parts/3-8-shoulder-lower.md) | `A-0047 TPMS / OTS Parts` | OTS/catalog shoulder screw outside `00 - Parts`; lowercase |
| [4040 12in](../designs/a-0047-tpms/ots-parts/4040-12in.md) | `A-0047 TPMS / OTS Parts` | OTS/catalog extrusion outside `00 - Parts` |
| [Cable Duct Medium](../designs/a-0047-tpms/ots-parts/cable-duct-medium.md) | `A-0047 TPMS / OTS Parts` | OTS/catalog cable duct outside `00 - Parts` |
| [Cable Duct Short](../designs/a-0047-tpms/ots-parts/cable-duct-short.md) | `A-0047 TPMS / OTS Parts` | OTS/catalog cable duct outside `00 - Parts` |
| [KQ2H03-34AS](../designs/a-0047-tpms/ots-parts/kq2h03-34as.md) | `A-0047 TPMS / OTS Parts` | OTS/catalog pneumatic fitting outside `00 - Parts` |
| [KQ2L03-34AS](../designs/a-0047-tpms/ots-parts/kq2l03-34as.md) | `A-0047 TPMS / OTS Parts` | OTS/catalog pneumatic fitting outside `00 - Parts` |
| [KQ2T03-34AS](../designs/a-0047-tpms/ots-parts/kq2t03-34as.md) | `A-0047 TPMS / OTS Parts` | OTS/catalog pneumatic fitting outside `00 - Parts` |
| [KQ2T03-35AS](../designs/a-0047-tpms/ots-parts/kq2t03-35as.md) | `A-0047 TPMS / OTS Parts` | OTS/catalog pneumatic fitting outside `00 - Parts` |
| [Moonfish Inner Nut](../designs/a-0047-tpms/ots-parts/moonfish-inner-nut.md) | `A-0047 TPMS / OTS Parts` | OTS/catalog nut outside `00 - Parts` |
| [Small Nipple](../designs/a-0047-tpms/ots-parts/small-nipple.md) | `A-0047 TPMS / OTS Parts` | OTS/catalog nipple outside `00 - Parts` |
| [Tee Fitting](../designs/a-0047-tpms/ots-parts/tee-fitting.md) | `A-0047 TPMS / OTS Parts` | OTS/catalog tee fitting outside `00 - Parts` |
| [250mm rail](../designs/a-0047-tpms/ots-parts/250mm-rail.md) | `A-0047 TPMS / OTS Parts` | OTS/catalog rail outside `00 - Parts` |
| [3-8 Ball](../designs/a-0047-tpms/ots-parts/3-8-ball.md) | `A-0047 TPMS / OTS Parts` | OTS/catalog ball outside `00 - Parts` |
| [3/4 dowel](../designs/a-0047-tpms/ots-parts/3-4-dowel.md) | `A-0047 TPMS / OTS Parts` | OTS/catalog dowel outside `00 - Parts` |
| [4.5in screw](../designs/a-0047-tpms/ots-parts/4-5in-screw.md) | `A-0047 TPMS / OTS Parts` | OTS/catalog screw outside `00 - Parts` |
| [6" Hinge](../designs/a-0047-tpms/ots-parts/6-inch-hinge.md) | `A-0047 TPMS / OTS Parts` | OTS/catalog hinge outside `00 - Parts` |
| [7/16 Shoulder](../designs/a-0047-tpms/ots-parts/7-16-shoulder.md) | `A-0047 TPMS / OTS Parts` | OTS/catalog shoulder screw outside `00 - Parts` |
| [9lb spring](../designs/a-0047-tpms/ots-parts/9lb-spring.md) | `A-0047 TPMS / OTS Parts` | OTS/catalog spring outside `00 - Parts` |
| [Detent Sprintg](../designs/a-0047-tpms/ots-parts/detent-sprintg.md) | `A-0047 TPMS / OTS Parts` | OTS/catalog spring outside `00 - Parts`; Fusion name spelling preserved |
| [MDX1000_1500_Head](../designs/a-0047-tpms/ots-parts/mdx1000-1500-head.md) | `A-0047 TPMS / OTS Parts` | OTS/catalog head outside `00 - Parts` |
| [Moonfish Tool Head 2.0](../designs/a-0047-tpms/ots-parts/moonfish-tool-head-2-0.md) | `A-0047 TPMS / OTS Parts` | OTS/catalog tool head outside `00 - Parts` |
| [TPMS PCBA Silh](../designs/a-0047-tpms/ots-parts/tpms-pcba-silh.md) | `A-0047 TPMS / OTS Parts` | OTS/catalog PCBA silhouette outside `00 - Parts` |
| [pxc_1411244_00_01_A-INL-M32-N-S_3D](../designs/a-0047-tpms/ots-parts/pxc-1411244-00-01-a-inl-m32-n-s-3d.md) | `A-0047 TPMS / OTS Parts` | OTS/catalog connector outside `00 - Parts` |
| [3R0 150W](../designs/d-0012-eol/ots-parts/3r0-150w.md) | `D-0012 EOL / OTS Parts` | OTS resistor/power component outside `00 - Parts` |
| [ZD411](../designs/d-0012-eol/ots-parts/zd411.md) | `D-0012 EOL / OTS Parts` | OTS printer outside `00 - Parts` |
| [IO Box_Fixture B](../designs/d-0012-eol/ots-parts/io-box-fixture-b.md) | `D-0012 EOL / OTS Parts` | OTS fixture outside `00 - Parts` |
| [1/4-20 Thin Nylock](../designs/d-0012-eol/gen2-fixture/ots-parts/1-4-20-thin-nylock.md) | `D-0012 EOL / Gen2 Fixture / OTS Parts` | OTS fastener outside `00 - Parts` |
| [1/4-20 x 1 1/2 CS Screw](../designs/d-0012-eol/gen2-fixture/ots-parts/1-4-20-x-1-1-2-cs-screw.md) | `D-0012 EOL / Gen2 Fixture / OTS Parts` | OTS fastener outside `00 - Parts` |
| [1/4-20 x 3 3/4 SH Screw](../designs/d-0012-eol/gen2-fixture/ots-parts/1-4-20-x-3-3-4-sh-screw.md) | `D-0012 EOL / Gen2 Fixture / OTS Parts` | OTS fastener outside `00 - Parts` |
| [10-24 x 3/8 PH Screw](../designs/d-0012-eol/gen2-fixture/ots-parts/10-24-x-3-8-ph-screw.md) | `D-0012 EOL / Gen2 Fixture / OTS Parts` | OTS fastener outside `00 - Parts` |
| [4-40 x 5/16 SH Screw](../designs/d-0012-eol/gen2-fixture/ots-parts/4-40-x-5-16-sh-screw.md) | `D-0012 EOL / Gen2 Fixture / OTS Parts` | OTS fastener outside `00 - Parts` |
| [6-32 x 7/16 CS Screw](../designs/d-0012-eol/gen2-fixture/ots-parts/6-32-x-7-16-cs-screw.md) | `D-0012 EOL / Gen2 Fixture / OTS Parts` | OTS fastener outside `00 - Parts` |

---

## (b) Reconcile Duplicate

Parts with project-specific suffixes (e.g., "(TPMS)", "(AEETES)") or noted as "distinct" copies. These may be duplicates of designs in other projects or in `00 - Parts`. Reconcile before migrating.

| Design | Current Path | Reason |
|--------|--------------|--------|
| [3way Solenoid (AEETES)](../designs/a-0026-itm/aeetes/ots-parts/3way-solenoid.md) | `A-0026 iTM / AEETES / OTS Parts` | OTS solenoid outside `00 - Parts` |
| [KV2L07-34S (AEETES)](../designs/a-0026-itm/aeetes/ots-parts/kv2l07-34s-aeetes.md) | `A-0026 iTM / AEETES / OTS Parts` | OTS pneumatic fitting outside `00 - Parts` |
| [KV2T07-34S (AEETES)](../designs/a-0026-itm/aeetes/ots-parts/kv2t07-34s-aeetes.md) | `A-0026 iTM / AEETES / OTS Parts` | OTS pneumatic fitting outside `00 - Parts` |
| [New Valve (AEETES)](../designs/a-0026-itm/aeetes/ots-parts/new-valve-aeetes.md) | `A-0026 iTM / AEETES / OTS Parts` | OTS valve outside `00 - Parts` |
| [Spacer (ORTHRUS)](../designs/a-0026-itm/orthrus/ots-parts/spacer.md) | `A-0026 iTM / ORTHRUS / OTS PARTS` | OTS outside `00 - Parts` |
| [19V Adapter (ORTHRUS)](../designs/a-0026-itm/orthrus/ots-parts/elec/19v-adapter.md) | `A-0026 iTM / ORTHRUS / OTS PARTS / ELEC` | OTS outside `00 - Parts`; distinct A-0026 shortlink |
| [Arduino_Uno_w/Shield (ORTHRUS)](../designs/a-0026-itm/orthrus/ots-parts/elec/arduino-uno-w-shield.md) | `A-0026 iTM / ORTHRUS / OTS PARTS / ELEC` | OTS outside `00 - Parts`; distinct from TAZ 4 |
| [NUC8ixBEH-Chassis (ORTHRUS)](../designs/a-0026-itm/orthrus/ots-parts/elec/nuc8ixbeh-chassis.md) | `A-0026 iTM / ORTHRUS / OTS PARTS / ELEC` | OTS outside `00 - Parts`; distinct A-0026 ORTHRUS copy |
| [Motor Controller (ORTHRUS)](../designs/a-0026-itm/orthrus/ots-parts/elec/motor-controller.md) | `A-0026 iTM / ORTHRUS / OTS PARTS / ELEC` | OTS outside `00 - Parts`; distinct from TAZ 4 |
| [Mini Regulator (ORTHRUS)](../designs/a-0026-itm/orthrus/ots-parts/pneu/mini-regulator.md) | `A-0026 iTM / ORTHRUS / OTS PARTS / PNEU` | OTS outside `00 - Parts`; distinct from AEETES |
| [New Valve (ORTHRUS)](../designs/a-0026-itm/orthrus/ots-parts/pneu/new-valve.md) | `A-0026 iTM / ORTHRUS / OTS PARTS / PNEU` | OTS outside `00 - Parts`; distinct from AEETES |
| [KV2H07-34S (ORTHRUS)](../designs/a-0026-itm/orthrus/ots-parts/kv2h07-34s.md) | `A-0026 iTM / ORTHRUS / OTS PARTS` | OTS outside `00 - Parts`; distinct from AEETES |
| [KV2E07-00 (PNEU)](../designs/a-0026-itm/orthrus/ots-parts/pneu/kv2e07-00.md) | `A-0026 iTM / ORTHRUS / OTS PARTS / PNEU` | OTS outside `00 - Parts` |
| [Cable Duct (TPMS)](../designs/a-0047-tpms/ots-parts/cable-duct-tpms.md) | `A-0047 TPMS / OTS Parts` | OTS/catalog cable duct outside `00 - Parts`; distinct from AEETES |
| [Cylinder (TPMS)](../designs/a-0047-tpms/ots-parts/cylinder-tpms.md) | `A-0047 TPMS / OTS Parts` | OTS/catalog cylinder outside `00 - Parts`; distinct from A-0010 |
| [3way Solenoid (TPMS)](../designs/a-0047-tpms/ots-parts/3way-solenoid-tpms.md) | `A-0047 TPMS / OTS Parts` | OTS/catalog solenoid outside `00 - Parts`; distinct from A-0010, A-0026 |
| [ANMBEST 4-MOSFET (TPMS)](../designs/a-0047-tpms/ots-parts/anmbest-4-mosfet-tpms.md) | `A-0047 TPMS / OTS Parts` | OTS/catalog MOSFET board outside `00 - Parts`; distinct from AEETES |
| [ArduinoMega_STEP_AP203 (TPMS)](../designs/a-0047-tpms/ots-parts/arduinomega-step-ap203-tpms.md) | `A-0047 TPMS / OTS Parts` | OTS/catalog Arduino STEP outside `00 - Parts`; distinct from AEETES |
| [KQ2H03-35AS (TPMS)](../designs/a-0047-tpms/ots-parts/kq2h03-35as-tpms.md) | `A-0047 TPMS / OTS Parts` | OTS/catalog pneumatic fitting outside `00 - Parts`; distinct from A-0010 |
| [KQ2L03-33AS (TPMS)](../designs/a-0047-tpms/ots-parts/kq2l03-33as-tpms.md) | `A-0047 TPMS / OTS Parts` | OTS/catalog pneumatic fitting outside `00 - Parts`; distinct from A-0010 |
| [Mini Regulator (TPMS)](../designs/a-0047-tpms/ots-parts/mini-regulator-tpms.md) | `A-0047 TPMS / OTS Parts` | OTS/catalog regulator outside `00 - Parts`; distinct from AEETES, ORTHRUS |
| [Nipple (TPMS)](../designs/a-0047-tpms/ots-parts/nipple-tpms.md) | `A-0047 TPMS / OTS Parts` | OTS/catalog nipple outside `00 - Parts` |
| [Tee (TPMS)](../designs/a-0047-tpms/ots-parts/tee-tpms.md) | `A-0047 TPMS / OTS Parts` | OTS/catalog tee outside `00 - Parts`; distinct from A-0026 PARTS |
| [Touchscreen (TPMS)](../designs/a-0047-tpms/ots-parts/touchscreen-tpms.md) | `A-0047 TPMS / OTS Parts` | OTS/catalog touchscreen outside `00 - Parts`; distinct from AEETES |
| [67CP3220 (TPMS)](../designs/a-0047-tpms/ots-parts/67cp3220-tpms.md) | `A-0047 TPMS / OTS Parts` | OTS/catalog part outside `00 - Parts`; distinct from AEETES |
| [Elbow (TPMS)](../designs/a-0047-tpms/ots-parts/elbow-tpms.md) | `A-0047 TPMS / OTS Parts` | OTS/catalog elbow fitting outside `00 - Parts` |
| [F Elbow (TPMS)](../designs/a-0047-tpms/ots-parts/f-elbow-tpms.md) | `A-0047 TPMS / OTS Parts` | OTS/catalog female elbow fitting outside `00 - Parts` |
| [GCX3105 (TPMS)](../designs/a-0047-tpms/ots-parts/gcx3105-tpms.md) | `A-0047 TPMS / OTS Parts` | OTS/catalog fitting outside `00 - Parts`; distinct from PLT COMPS |
| [Manifold Block (TPMS)](../designs/a-0047-tpms/ots-parts/manifold-block-tpms.md) | `A-0047 TPMS / OTS Parts` | OTS/catalog manifold block outside `00 - Parts` |
| [NANUK_935_Bottom Shell_INNER SURFS_Step (TPMS)](../designs/a-0047-tpms/ots-parts/nanuk-935-bottom-shell-inner-surfs-step-tpms.md) | `A-0047 TPMS / OTS Parts` | OTS/catalog STEP surface outside `00 - Parts`; distinct from Lab PARTS |
| [NANUK_935_Top Shell_INNER SURFS_Step (TPMS)](../designs/a-0047-tpms/ots-parts/nanuk-935-top-shell-inner-surfs-step-tpms.md) | `A-0047 TPMS / OTS Parts` | OTS/catalog STEP surface outside `00 - Parts`; distinct from Lab PARTS |
| [New Valve (TPMS)](../designs/a-0047-tpms/ots-parts/new-valve-tpms.md) | `A-0047 TPMS / OTS Parts` | OTS/catalog valve outside `00 - Parts`; distinct from A-0054, AEETES, ORTHRUS |
| [Screen 2 (TPMS)](../designs/a-0047-tpms/ots-parts/screen-2-tpms.md) | `A-0047 TPMS / OTS Parts` | OTS/catalog screen outside `00 - Parts`; distinct from A-0054 |
| [655-1203-104F (TPMS)](../designs/a-0047-tpms/ots-parts/655-1203-104f-tpms.md) | `A-0047 TPMS / OTS Parts` | OTS/catalog part outside `00 - Parts`; distinct from A-0026 PLT |
| [002390 (1) (D-0058)](../designs/d-0058-tpms-load/002390-1.md) | `D-0058 TPMS & Load` | Project-copy; reconcile with A-0047 TPMS original |
| [002582 AA TPMS Thru Conmet (2) (D-0058)](../designs/d-0058-tpms-load/002582-aa-tpms-thru-conmet-2.md) | `D-0058 TPMS & Load` | Project-copy; reconcile with A-0047 TPMS original |
| [Proc PCM (D-0058)](../designs/d-0058-tpms-load/proc-pcm.md) | `D-0058 TPMS & Load` | Project-copy; reconcile with A-003 Proc PCM |
| [Compressor Motor (D-0072)](../designs/d-0072-a8-wheel-end/compressor-motor.md) | `D-0072 A8 Wheel End` | Likely OTS/catalog motor outside `00 - Parts` |
| [12V (D-0012)](../designs/d-0012-eol/ots-parts/12v.md) | `D-0012 EOL / OTS Parts` | OTS power component outside `00 - Parts` |
| [19V Adapter (D-0012)](../designs/d-0012-eol/ots-parts/19v-adapter.md) | `D-0012 EOL / OTS Parts` | OTS power adapter outside `00 - Parts` |
| [940_R1_Btm_INNER_SURFACE_STEP (D-0012)](../designs/d-0012-eol/ots-parts/940-r1-btm-inner-surface-step.md) | `D-0012 EOL / OTS Parts` | OTS enclosure inner surface model outside `00 - Parts` |
| [940_R1_Top_INNER_SURFACE_STEP (D-0012)](../designs/d-0012-eol/ots-parts/940-r1-top-inner-surface-step.md) | `D-0012 EOL / OTS Parts` | OTS enclosure inner surface model outside `00 - Parts` |
| [Breaker SN180506A (D-0012)](../designs/d-0012-eol/ots-parts/breaker-sn180506a.md) | `D-0012 EOL / OTS Parts` | OTS breaker outside `00 - Parts` |
| [CG-U3MINI7PH_Model3D_JWV1 (D-0012)](../designs/d-0012-eol/ots-parts/cg-u3mini7ph-model3d-jwv1.md) | `D-0012 EOL / OTS Parts` | OTS connector/model outside `00 - Parts`; distinct shortlink from earlier collision debt |
| [DC11 (D-0012)](../designs/d-0012-eol/ots-parts/dc11.md) | `D-0012 EOL / OTS Parts` | OTS power component outside `00 - Parts` |
| [FAN (D-0012)](../designs/d-0012-eol/ots-parts/fan.md) | `D-0012 EOL / OTS Parts` | OTS fan outside `00 - Parts` |
| [S6F (D-0012)](../designs/d-0012-eol/ots-parts/s6f.md) | `D-0012 EOL / OTS Parts` | OTS component outside `00 - Parts` |
| [USB-2408-2AO (D-0012)](../designs/d-0012-eol/ots-parts/usb-2408-2ao.md) | `D-0012 EOL / OTS Parts` | OTS DAQ device outside `00 - Parts` |
| [Valve Assy (D-0012)](../designs/d-0012-eol/ots-parts/valve-assy.md) | `D-0012 EOL / OTS Parts` | OTS valve assembly outside `00 - Parts` |
| [Y201132R203NQ (D-0012)](../designs/d-0012-eol/ots-parts/y201132r203nq.md) | `D-0012 EOL / OTS Parts` | OTS component outside `00 - Parts` |
| [Screen (D-0012)](../designs/d-0012-eol/ots-parts/screen.md) | `D-0012 EOL / OTS Parts` | OTS screen outside `00 - Parts` |
| [Screen 2 (D-0012)](../designs/d-0012-eol/ots-parts/screen-2.md) | `D-0012 EOL / OTS Parts` | OTS screen outside `00 - Parts` |
| [c-206061-1-ad-3d (D-0012)](../designs/d-0012-eol/ots-parts/c-206061-1-ad-3d.md) | `D-0012 EOL / OTS Parts` | OTS connector model outside `00 - Parts` |
| [c-206151-1-ag-3d (D-0012)](../designs/d-0012-eol/ots-parts/c-206151-1-ag-3d.md) | `D-0012 EOL / OTS Parts` | OTS connector model outside `00 - Parts` |
| [HDMI Passthru (D-0012)](../designs/d-0012-eol/ots-parts/hdmi-passthru.md) | `D-0012 EOL / OTS Parts` | OTS passthrough outside `00 - Parts` |
| [Keypad (D-0012)](../designs/d-0012-eol/ots-parts/keypad.md) | `D-0012 EOL / OTS Parts` | OTS keypad outside `00 - Parts` |
| [Mounting rail 2 (D-0012)](../designs/d-0012-eol/ots-parts/mounting-rail-2.md) | `D-0012 EOL / OTS Parts` | OTS mounting rail outside `00 - Parts` |
| [NUC8ixBEH-Chassis (D-0012)](../designs/d-0012-eol/ots-parts/nuc8ixbeh-chassis.md) | `D-0012 EOL / OTS Parts` | OTS NUC chassis outside `00 - Parts` |
| [PCAN (D-0012)](../designs/d-0012-eol/ots-parts/pcan.md) | `D-0012 EOL / OTS Parts` | OTS PCAN adapter outside `00 - Parts` |

---

## (c) Review

Candidates that need review to determine appropriate action.

| Design | Current Path | Reason |
|--------|--------------|--------|
| [3way Solenoid](../designs/a-0010-iair6/dut-box-parts/3way-solenoid.md) | `A-0010 iAir6 / DUT Box Parts` | OTS solenoid valve outside `00 - Parts` |
| [6498K144_Round Body Air Cylinder](../designs/a-0010-iair6/flash-runner/parts/6498k144-round-body-air-cylinder.md) | `A-0010 iAir6 / Flash Runner / Parts` | OTS hardware outside `00 - Parts` |
| [S-0-U-2.2-G](../designs/a-0010-iair6/flash-runner/parts/s-0-u-2-2-g.md) | `A-0010 iAir6 / Flash Runner / Parts` | OTS probe/pin outside `00 - Parts` |
| [S-1-E-3.8-G](../designs/a-0010-iair6/flash-runner/parts/s-1-e-3-8-g.md) | `A-0010 iAir6 / Flash Runner / Parts` | OTS probe/pin outside `00 - Parts` |
| [S-1-J-3.8-G](../designs/a-0010-iair6/flash-runner/parts/s-1-j-3-8-g.md) | `A-0010 iAir6 / Flash Runner / Parts` | OTS probe/pin outside `00 - Parts` |
| [Shoulder Screw](../designs/a-0010-iair6/flash-runner/parts/shoulder-screw.md) | `A-0010 iAir6 / Flash Runner / Parts` | OTS hardware outside `00 - Parts` |
| [Sleeve Bearing](../designs/a-0010-iair6/flash-runner/parts/sleeve-bearing.md) | `A-0010 iAir6 / Flash Runner / Parts` | OTS hardware outside `00 - Parts` |
| [Spring](../designs/a-0010-iair6/flash-runner/parts/spring.md) | `A-0010 iAir6 / Flash Runner / Parts` | OTS hardware outside `00 - Parts` |
| [12V](../designs/a-0054-iair3-gen2/fft-obs/io-box/comps/12v.md) | `A-0054 iAir3 Gen2 / FFT (Obs) / IO Box / Comps` | OTS power component outside `00 - Parts` |
| [19V Adapter](../designs/a-0054-iair3-gen2/fft-obs/io-box/comps/19v-adapter.md) | `A-0054 iAir3 Gen2 / FFT (Obs) / IO Box / Comps` | OTS power adapter outside `00 - Parts` |
| [50A Breaker](../designs/a-0054-iair3-gen2/fft-obs/io-box/comps/50a-breaker.md) | `A-0054 iAir3 Gen2 / FFT (Obs) / IO Box / Comps` | OTS breaker component outside `00 - Parts` |
| [Barcode Scanner](../designs/a-0054-iair3-gen2/fft-obs/io-box/comps/barcode-scanner.md) | `A-0054 iAir3 Gen2 / FFT (Obs) / IO Box / Comps` | OTS scanner outside `00 - Parts` |
| [Breaker SN180506A](../designs/a-0054-iair3-gen2/fft-obs/io-box/comps/breaker-sn180506a.md) | `A-0054 iAir3 Gen2 / FFT (Obs) / IO Box / Comps` | OTS breaker outside `00 - Parts` |
| [Bulkhead](../designs/a-0054-iair3-gen2/fft-obs/io-box/comps/bulkhead.md) | `A-0054 iAir3 Gen2 / FFT (Obs) / IO Box / Comps` | OTS hardware/fitting outside `00 - Parts` |
| [Bulkhead Adapt](../designs/a-0054-iair3-gen2/fft-obs/io-box/comps/bulkhead-adapt.md) | `A-0054 iAir3 Gen2 / FFT (Obs) / IO Box / Comps` | OTS hardware adapter outside `00 - Parts` |
| [CG-U3MINI7PH_Model3D_JWV1](../designs/a-0054-iair3-gen2/fft-obs/io-box/comps/cg-u3mini7ph-model3d-jwv1.md) | `A-0054 iAir3 Gen2 / FFT (Obs) / IO Box / Comps` | OTS connector/model outside `00 - Parts` |
| [Bracket](../designs/a-0054-iair3-gen2/fft-obs/io-box/bracket.md) | `A-0054 iAir3 Gen2 / FFT (Obs) / IO Box` | Outside `00 - Parts` (FFT Obs) |
| [Screen](../designs/a-0054-iair3-gen2/fft-obs/io-box/comps/screen.md) | `A-0054 iAir3 Gen2 / FFT (Obs) / IO Box / Comps` | Outside `00 - Parts` (FFT Obs) |
| [Screen 2](../designs/a-0054-iair3-gen2/fft-obs/io-box/comps/screen-2.md) | `A-0054 iAir3 Gen2 / FFT (Obs) / IO Box / Comps` | Outside `00 - Parts` (FFT Obs) |
| [DC11](../designs/a-0054-iair3-gen2/fft-obs/io-box/comps/dc11.md) | `A-0054 iAir3 Gen2 / FFT (Obs) / IO Box / Comps` | Outside `00 - Parts` (FFT Obs) |
| [FAN](../designs/a-0054-iair3-gen2/fft-obs/io-box/comps/fan.md) | `A-0054 iAir3 Gen2 / FFT (Obs) / IO Box / Comps` | Outside `00 - Parts` (FFT Obs) |
| [KV2E07-34](../designs/a-0054-iair3-gen2/fft-obs/io-box/comps/kv2e07-34.md) | `A-0054 iAir3 Gen2 / FFT (Obs) / IO Box / Comps` | Outside `00 - Parts` (FFT Obs) |
| [Keypad](../designs/a-0054-iair3-gen2/fft-obs/io-box/comps/keypad.md) | `A-0054 iAir3 Gen2 / FFT (Obs) / IO Box / Comps` | Outside `00 - Parts` (FFT Obs) |
| [Mounting rail 2](../designs/a-0054-iair3-gen2/fft-obs/io-box/comps/mounting-rail-2.md) | `A-0054 iAir3 Gen2 / FFT (Obs) / IO Box / Comps` | Outside `00 - Parts` (FFT Obs) |
| [Mounting rail 3](../designs/a-0054-iair3-gen2/fft-obs/io-box/comps/mounting-rail-3.md) | `A-0054 iAir3 Gen2 / FFT (Obs) / IO Box / Comps` | Outside `00 - Parts` (FFT Obs) |
| [NHS150 0R5](../designs/a-0054-iair3-gen2/fft-obs/io-box/comps/nhs150-0r5.md) | `A-0054 iAir3 Gen2 / FFT (Obs) / IO Box / Comps` | Outside `00 - Parts` (FFT Obs) |
| [NUC8ixBEH-Chassis](../designs/a-0054-iair3-gen2/fft-obs/io-box/comps/nuc8ixbeh-chassis.md) | `A-0054 iAir3 Gen2 / FFT (Obs) / IO Box / Comps` | Outside `00 - Parts` (FFT Obs) |
| [New Valve](../designs/a-0054-iair3-gen2/fft-obs/io-box/comps/new-valve.md) | `A-0054 iAir3 Gen2 / FFT (Obs) / IO Box / Comps` | Outside `00 - Parts` (FFT Obs) |
| [PCAN](../designs/a-0054-iair3-gen2/fft-obs/io-box/comps/pcan.md) | `A-0054 iAir3 Gen2 / FFT (Obs) / IO Box / Comps` | Outside `00 - Parts` (FFT Obs) |
| [S6F](../designs/a-0054-iair3-gen2/fft-obs/io-box/comps/s6f.md) | `A-0054 iAir3 Gen2 / FFT (Obs) / IO Box / Comps` | Outside `00 - Parts` (FFT Obs) |
| [USB-2408-2AO](../designs/a-0054-iair3-gen2/fft-obs/io-box/comps/usb-2408-2ao.md) | `A-0054 iAir3 Gen2 / FFT (Obs) / IO Box / Comps` | Outside `00 - Parts` (FFT Obs) |
| [Valve Assy](../designs/a-0054-iair3-gen2/fft-obs/io-box/comps/valve-assy.md) | `A-0054 iAir3 Gen2 / FFT (Obs) / IO Box / Comps` | Outside `00 - Parts` (FFT Obs) |
| [Valve Assy 2](../designs/a-0054-iair3-gen2/fft-obs/io-box/comps/valve-assy-2.md) | `A-0054 iAir3 Gen2 / FFT (Obs) / IO Box / Comps` | Outside `00 - Parts` (FFT Obs) |
| [Y201132R203NQ](../designs/a-0054-iair3-gen2/fft-obs/io-box/comps/y201132r203nq.md) | `A-0054 iAir3 Gen2 / FFT (Obs) / IO Box / Comps` | Outside `00 - Parts` (FFT Obs) |
| [c-206061-1-ad-3d](../designs/a-0054-iair3-gen2/fft-obs/io-box/comps/c-206061-1-ad-3d.md) | `A-0054 iAir3 Gen2 / FFT (Obs) / IO Box / Comps` | Outside `00 - Parts` (FFT Obs) |
| [c-206151-1-ag-3d](../designs/a-0054-iair3-gen2/fft-obs/io-box/comps/c-206151-1-ag-3d.md) | `A-0054 iAir3 Gen2 / FFT (Obs) / IO Box / Comps` | Outside `00 - Parts` (FFT Obs) |
| [c-dtp04-4p-le07-b-3d](../designs/a-0054-iair3-gen2/fft-obs/io-box/comps/c-dtp04-4p-le07-b-3d.md) | `A-0054 iAir3 Gen2 / FFT (Obs) / IO Box / Comps` | Outside `00 - Parts` (FFT Obs) |
| [Valve and sensor](../designs/a-0054-iair3-gen2/fft-obs/io-box/josh-cad/valve-and-sensor.md) | `A-0054 iAir3 Gen2 / FFT (Obs) / IO Box / Josh CAD` | Outside `00 - Parts` (FFT Obs / Josh CAD) |
| [box bottom](../designs/a-0054-iair3-gen2/fft-obs/io-box/josh-cad/box-bottom.md) | `A-0054 iAir3 Gen2 / FFT (Obs) / IO Box / Josh CAD` | Outside `00 - Parts` (FFT Obs / Josh CAD) |
| [box top](../designs/a-0054-iair3-gen2/fft-obs/io-box/josh-cad/box-top.md) | `A-0054 iAir3 Gen2 / FFT (Obs) / IO Box / Josh CAD` | Outside `00 - Parts` (FFT Obs / Josh CAD) |
| [Adafruit Proto Shield](../designs/a-0026-itm/adafruit-proto-shield.md) | `A-0026 iTM` | OTS/catalog shield outside `00 - Parts` |
| [Dremel](../designs/a-0026-itm/acropora/dremel.md) | `A-0026 iTM / ACROPORA` | OTS tool model outside `00 - Parts` |
| [Shoulder Screw](../designs/a-0026-itm/acropora/shoulder-screw.md) | `A-0026 iTM / ACROPORA` | OTS hardware outside `00 - Parts` |
| [Acropora](../designs/a-0026-itm/acropora/acropora.md) | `A-0026 iTM / ACROPORA` | Assembly contains OTS fasteners outside `00 - Parts` |
| [Motor Adapter PSI](../designs/a-0026-itm/aeetes/motor-adapter-psi.md) | `A-0026 iTM / AEETES` | OTS fastener + PSI Tee outside `00 - Parts` |
| [Arduino_Uno](../designs/a-0026-itm/taz-4/arduino-uno.md) | `A-0026 iTM / TAZ 4` | Likely OTS outside `00 - Parts` |
| [Arduino_Uno_w/Shield](../designs/a-0026-itm/taz-4/arduino-uno-w-shield.md) | `A-0026 iTM / TAZ 4` | Likely OTS outside `00 - Parts` |
| [Whirlpool Motor](../designs/a-0026-itm/taz-4/whirlpool-motor.md) | `A-0026 iTM / TAZ 4` | Likely OTS outside `00 - Parts` |
| [KV2L07-35S](../designs/a-0026-itm/asm-tooling-sow1/comps/kv2l07-35s.md) | `A-0026 iTM / ASM TOOLING SOW1 / COMPS` | OTS fitting outside `00 - Parts` |
| [KV2E07-00 (PLT COMPS)](../designs/a-0026-itm/plt/comps/kv2e07-00.md) | `A-0026 iTM / PLT / COMPS` | OTS fitting outside `00 - Parts` |
| [KV2H07-36S](../designs/a-0026-itm/plt/comps/kv2h07-36s.md) | `A-0026 iTM / PLT / COMPS` | OTS fitting outside `00 - Parts` |
| [KV2L07-99](../designs/a-0026-itm/plt/comps/kv2l07-99.md) | `A-0026 iTM / PLT / COMPS` | OTS fitting outside `00 - Parts` |
| [GCX3105](../designs/a-0026-itm/plt/comps/gcx3105.md) | `A-0026 iTM / PLT / COMPS` | OTS fitting outside `00 - Parts` |
| [1/16 NPT Female](../designs/a-9999-lab/1-16-npt-female.md) | `A-9999 Lab` | OTS outside `00 - Parts`; PN: 1456N134 |
| [BRINGSMART MOTOR](../designs/a-9999-lab/bringsmart-motor.md) | `A-9999 Lab` | OTS outside `00 - Parts`; was phantom under A-0026, found in Lab |
| [DB9](../designs/a-9999-lab/gegenees/db9.md) | `A-9999 Lab / GEGENEES` | OTS-looking connector outside `00 - Parts` |
| [c-dt04-4p-l012-a-3d](../designs/a-9999-lab/gegenees/c-dt04-4p-l012-a-3d.md) | `A-9999 Lab / GEGENEES` | OTS-looking connector outside `00 - Parts` |
| [DTP04-4P-L012](../designs/a-9999-lab/gegenees/dtp04-4p-l012.md) | `A-9999 Lab / GEGENEES` | OTS-looking connector outside `00 - Parts` |
| [RX24-200W-2ΩJ](../designs/a-9999-lab/gegenees/rx24-200w-2oj.md) | `A-9999 Lab / GEGENEES` | OTS-looking resistor outside `00 - Parts` |
| [Locking Push Button](../designs/a-9999-lab/gegenees/locking-push-button.md) | `A-9999 Lab / GEGENEES` | OTS-looking button outside `00 - Parts` |
| [CI16-FCI06](../designs/a-9999-lab/ci16-fci06.md) | `A-9999 Lab` | OTS-looking catalog part outside `00 - Parts` |
| [Drill press - Ferm FTB-13M](../designs/a-9999-lab/drill-press-ferm-ftb-13m.md) | `A-9999 Lab` | OTS tool model outside `00 - Parts` |
| [M16x1 to 1/4NPT Adapter](../designs/a-9999-lab/m16x1-to-1-4npt-adapter.md) | `A-9999 Lab` | OTS/catalog adapter outside `00 - Parts` |
| [m16x1 thread](../designs/a-9999-lab/m16x1-thread.md) | `A-9999 Lab` | Catalog/thread reference outside `00 - Parts` |
| [c-1-1355200-1-d-3d](../designs/a-9999-lab/c-1-1355200-1-d-3d.md) | `A-9999 Lab` | OEM/catalog connector outside `00 - Parts` |
| [c-1-1564337-1-j-3d](../designs/a-9999-lab/c-1-1564337-1-j-3d.md) | `A-9999 Lab` | OEM/catalog connector outside `00 - Parts` |
| [c-1-1564337-1-j-3d No Clip](../designs/a-9999-lab/c-1-1564337-1-j-3d-no-clip.md) | `A-9999 Lab` | OEM/catalog connector outside `00 - Parts` |
| [c-1-1703543-0-a-3d](../designs/a-9999-lab/c-1-1703543-0-a-3d.md) | `A-9999 Lab` | OEM/catalog connector outside `00 - Parts` |
| [Bisofice Laser](../designs/d-0058-tpms-load/bisofice-laser.md) | `D-0058 TPMS & Load` | OTS laser engraver outside `00 - Parts` |
| [KQ2F01-34A](../designs/d-0058-tpms-load/kq2f01-34a.md) | `D-0058 TPMS & Load` | OTS SMC pneumatic fitting outside `00 - Parts` |
| [KQ2X01-03A](../designs/d-0058-tpms-load/kq2x01-03a.md) | `D-0058 TPMS & Load` | OTS SMC pneumatic fitting outside `00 - Parts` |
| [Samsung A8 Tablet](../designs/d-0058-tpms-load/samsung-a8-tablet.md) | `D-0058 TPMS & Load` | OTS tablet outside `00 - Parts` |
| [881211 AA](../designs/d-0012-eol/a8-parts/881211-aa.md) | `D-0012 EOL / A8 Parts` | A8 Parts folder outside `00 - Parts`; review for consolidation |
| [881212 AA](../designs/d-0012-eol/a8-parts/881212-aa.md) | `D-0012 EOL / A8 Parts` | A8 Parts folder outside `00 - Parts`; review for consolidation |
| [881213 AA](../designs/d-0012-eol/a8-parts/881213-aa.md) | `D-0012 EOL / A8 Parts` | A8 Parts folder outside `00 - Parts`; review for consolidation |
| [881214 AA](../designs/d-0012-eol/a8-parts/881214-aa.md) | `D-0012 EOL / A8 Parts` | A8 Parts folder outside `00 - Parts`; review for consolidation |
| [881215 AA](../designs/d-0012-eol/a8-parts/881215-aa.md) | `D-0012 EOL / A8 Parts` | A8 Parts folder outside `00 - Parts`; review for consolidation |
| [881216 AA](../designs/d-0012-eol/a8-parts/881216-aa.md) | `D-0012 EOL / A8 Parts` | A8 Parts folder outside `00 - Parts`; review for consolidation |
| [881218 AA](../designs/d-0012-eol/a8-parts/881218-aa.md) | `D-0012 EOL / A8 Parts` | A8 Parts folder outside `00 - Parts`; review for consolidation |
| [881219 AA](../designs/d-0012-eol/a8-parts/881219-aa.md) | `D-0012 EOL / A8 Parts` | A8 Parts folder outside `00 - Parts`; review for consolidation |
| [881220 AA](../designs/d-0012-eol/a8-parts/881220-aa.md) | `D-0012 EOL / A8 Parts` | A8 Parts folder outside `00 - Parts`; review for consolidation |
| [Deep Screen Bracket](../designs/d-0012-eol/a8-parts/deep-screen-bracket.md) | `D-0012 EOL / A8 Parts` | A8 Parts folder outside `00 - Parts`; review for consolidation |
| [DIN Proto Board Mount](../designs/d-0012-eol/a8-parts/din-proto-board-mount.md) | `D-0012 EOL / A8 Parts` | A8 Parts folder outside `00 - Parts`; review for consolidation |
| [DIN Resistor Bank](../designs/d-0012-eol/a8-parts/din-resistor-bank.md) | `D-0012 EOL / A8 Parts` | A8 Parts folder outside `00 - Parts`; review for consolidation |
| [Keypad Bump-it](../designs/d-0012-eol/a8-parts/keypad-bump-it.md) | `D-0012 EOL / A8 Parts` | A8 Parts folder outside `00 - Parts`; review for consolidation |
| [Pi VESA Mount](../designs/d-0012-eol/a8-parts/pi-vesa-mount.md) | `D-0012 EOL / A8 Parts` | A8 Parts folder outside `00 - Parts`; review for consolidation |

---

*This index is for documentation/planning only. Do not physically migrate Fusion designs without Thomas authorization.*
