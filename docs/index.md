# AKTV8 Fusion Library — Bibliothek

Welcome to the **Bibliothek**, a read-only mirror of the AKTV8 Fusion design library for browsing.

This site provides an indexed view of Fusion 360 designs from the AKTV8 LLC team hub. Each design page includes:

- **Shortlink** — direct A360 link to the design
- **Project Path** — location in the Fusion team hub
- **Uses** — components this design references
- **Used In** — assemblies that reference this design
- **Notes** — additional metadata from the harvest

## Quick Links

- [Shortlink Index](indexes/shortlinks.md) — all designs with A360 links (42 total)
- [BOM / Uses Index](indexes/bom-uses.md) — assemblies with component references (13 total)
- [Migration Candidates](indexes/migration-candidates.md) — designs flagged for potential relocation to `00 - Parts` (15 total)

## Design Tree

Browse designs by project folder:

- **[00 - Parts](designs/00-parts/arduino/amplifier-board.md)** — standard and purchased components
- **[A-0010 iAir6](designs/a-0010-iair6/cephalopod-2.md)** — iAir6 project designs
    - [A8 Parts](designs/a-0010-iair6/a8-parts/003234-x1a-manifold-iair6.md) — A8 subfolder designs
    - [DUT Box Parts](designs/a-0010-iair6/dut-box-parts/cephalopod-3.md) — DUT Box Parts subfolder designs (18 designs)
    - [OTS Parts](designs/a-0010-iair6/ots-parts/prox-switch.md) — off-the-shelf components (14 designs, migration candidates)
- **[A-0054 iAir3 Gen2](designs/a-0054-iair3-gen2/design-22.md)** — iAir3 Gen2 project designs
    - [Flash Runner](designs/a-0054-iair3-gen2/flash-runner/iair3-gen2-flash-runner-bed.md) — Flash Runner assembly designs

## Batch Summary

| Batch | Designs | Notes |
|-------|---------|-------|
| 001 | 3 | Initial harvest (Amplifier Board, CEPHALOPOD 2, FAST26 Clamping Jaws) |
| 002 | 5 | A8 Parts (2), OTS parts (3 migration candidates) |
| 003 | 5 | A-0054 iAir3 Gen2 (5 designs including Flash Runner subfolder) |
| 004 | 17 | DUT Box Parts (17 designs under A-0010 iAir6) |
| 005 | 12 | OTS Parts (11) + DUT Box Parts (1) — all 12 are migration candidates |

**Total designs indexed: 42**

---

*This Bibliothek is generated from Fusion harvest data. It does not modify or sync back to Fusion.*
