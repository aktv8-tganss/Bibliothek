# AKTV8 Fusion Library — Bibliothek

Welcome to the **Bibliothek**, a read-only mirror of the AKTV8 Fusion design library for browsing.

This site provides an indexed view of Fusion 360 designs from the AKTV8 LLC team hub. Each design page includes:

- **Shortlink** — direct A360 link to the design
- **Project Path** — location in the Fusion team hub
- **Uses** — components this design references
- **Used In** — assemblies that reference this design
- **Notes** — additional metadata from the harvest

## Quick Links

- [Shortlink Index](indexes/shortlinks.md) — all designs with A360 links (182 total)
- [BOM / Uses Index](indexes/bom-uses.md) — assemblies with component references (47 total)
- [Migration Candidates](indexes/migration-candidates.md) — designs flagged for potential relocation to `00 - Parts` (59 total)

## Design Tree

Browse designs by project folder:

- **[00 - Parts](designs/00-parts/arduino/amplifier-board.md)** — standard and purchased components
- **[A-0010 iAir6](designs/a-0010-iair6/cephalopod-2.md)** — iAir6 project designs
    - [A8 Parts](designs/a-0010-iair6/a8-parts/003234-x1a-manifold-iair6.md) — A8 subfolder designs (12 designs)
    - [ALC Parts](designs/a-0010-iair6/alc-parts/height-arm.md) — ALC Parts designs (2 designs)
    - [DUT Box Parts](designs/a-0010-iair6/dut-box-parts/cephalopod-3.md) — DUT Box Parts subfolder designs (18 designs)
    - [DUT Mounting](designs/a-0010-iair6/dut-mounting/angle-clamp.md) — DUT Mounting designs (2 designs)
    - [Flash Runner](designs/a-0010-iair6/flash-runner/urchin.md) — Flash Runner assembly designs (1 design)
        - [Parts](designs/a-0010-iair6/flash-runner/parts/press-fixture.md) — Flash Runner parts (11 designs)
    - [Obs](designs/a-0010-iair6/obs/cephalopod-1.md) — obsolete/archived designs (3 designs)
    - [OTS Parts](designs/a-0010-iair6/ots-parts/prox-switch.md) — off-the-shelf components (14 designs, migration candidates)
- **[A-0054 iAir3 Gen2](designs/a-0054-iair3-gen2/design-22.md)** — iAir3 Gen2 project designs
    - [FFT (Obs) / IO Box](designs/a-0054-iair3-gen2/fft-obs/io-box/io-box.md) — IO Box assembly designs (6 designs)
        - [Comps](designs/a-0054-iair3-gen2/fft-obs/io-box/comps/12v.md) — IO Box components (32 designs, 28 migration candidates)
        - [Josh CAD](designs/a-0054-iair3-gen2/fft-obs/io-box/josh-cad/box-bottom.md) — Josh CAD designs (3 designs, 3 migration candidates)
    - [Flash Runner](designs/a-0054-iair3-gen2/flash-runner/iair3-gen2-flash-runner-bed.md) — Flash Runner assembly designs (4 designs)
- **[A-0026 iTM](designs/a-0026-itm/12010717.md)** — iTM project designs (64 designs)
    - [ACROPORA](designs/a-0026-itm/acropora/acropora.md) — ACROPORA subfolder (4 designs, 3 migration candidates)
    - [AEETES](designs/a-0026-itm/aeetes/aeetes-asm.md) — AEETES subfolder (22 designs, 1 migration candidate)
    - [Alford](designs/a-0026-itm/alford/million-mile-power-supply-mount.md) — Alford subfolder (1 design)
    - [ASM TOOLING](designs/a-0026-itm/asm-tooling/inf-only-hose-cell.md) — ASM TOOLING subfolder (2 designs)
    - [ASM TOOLING SOW1](designs/a-0026-itm/asm-tooling-sow1/hose-assembly-cell.md) — ASM TOOLING SOW1 subfolder (19 designs)
    - [ENIGMA](designs/a-0026-itm/enigma/dyno-assy.md) — ENIGMA subfolder (2 designs)
    - [MTT03](designs/a-0026-itm/mtt03/tt03-10z-20z-50z.md) — MTT03 subfolder (1 design)

## Batch Summary

| Batch | Designs | Notes |
|-------|---------|-------|
| 001 | 3 | Initial harvest (Amplifier Board, CEPHALOPOD 2, FAST26 Clamping Jaws) |
| 002 | 5 | A8 Parts (2), OTS parts (3 migration candidates) |
| 003 | 5 | A-0054 iAir3 Gen2 (5 designs including Flash Runner subfolder) |
| 004 | 17 | DUT Box Parts (17 designs under A-0010 iAir6) |
| 005 | 12 | OTS Parts (11) + DUT Box Parts (1) — all 12 are migration candidates |
| 006 | 15 | A8 Parts (9), Obs (3), Flash Runner (1), Root A-0010 (2) — product assemblies, no OTS candidates |
| 007 | 17 | ALC Parts (2), DUT Mounting (2), Flash Runner/Parts (11), A8 Parts (1), Root A-0010 (1) — 7 OTS migration candidates |
| 008 | 20 | FFT (Obs) / IO Box (5), IO Box Comps (12), Flash Runner (3) — 8 OTS migration candidates |
| 009 | 24 | FFT (Obs) / IO Box (1), IO Box Comps (20), Josh CAD (3) — all 24 migration candidates |
| 010 | 15 | A-0026 iTM root (11), ACROPORA (3), AEETES (1) — 3 OTS migration candidates |
| 011 | 20 | A-0026 iTM: ACROPORA (1), AEETES (19) — 2 OTS migration candidates |
| 012 | 29 | A-0026 iTM: ASM TOOLING SOW1 (19), ASM TOOLING (2), AEETES (2), Alford (1), ENIGMA (2), MTT03 (1), tooling/product assemblies — no OTS migration candidates |

**Total designs indexed: 182**

!!! info "A-0026 iTM Remaining"
    Approximately **40 designs** remain in A-0026 iTM after batch 012. See [leftovers index](indexes/leftovers.md) for details.

---

*This Bibliothek is generated from Fusion harvest data. It does not modify or sync back to Fusion.*
