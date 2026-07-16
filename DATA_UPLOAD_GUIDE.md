# BAY-CLIMACCESS Public Data Upload Guide

## 1. Core rule

The public database is organized by **settlement**, **health-facility catchment**, and **event/month**. Google Open Buildings is summarized as building count, built footprint area and density; it is not treated as a household register. WorldPop supplies provisional age–sex denominators, not observed pregnancy status.

## 2. Upload order

1. `data/reference/lga_boundaries.geojson`
2. `data/reference/ward_boundaries.geojson`
3. `data/reference/settlements.geojson`
4. `data/reference/health_facilities.geojson`
5. `data/reference/facility_catchments.geojson`
6. approved aggregated population evidence
7. approved aggregated accessibility and service summaries
8. hotspot and evidence-confidence outputs
9. verified actions and public emergency summaries

## 3. Required stable IDs

Use `lga_id`, `ward_id`, `settlement_id`, `facility_id`, `catchment_id`, `risk_event_id` and `action_id`. Do not join datasets using names alone.

## 4. Population evidence

Store source observations in `data/observations/population_evidence.csv` using long format. Retain these separately:

- government/administrative target;
- WorldPop total, age 0–4 and female age 15–49 estimates;
- surveyed or enumerated population;
- preferred operational denominator selected through a documented evidence hierarchy.

Pregnancy is not directly observed in WorldPop. Use expected-pregnancy assumptions only as a modelled estimate and compare them with authorized ANC/register and survey evidence.

## 5. Health observations

Use codes from `data/metadata/indicator_catalogue.csv`. Government, modelled and surveyed malaria evidence must remain separate. Publish only approved settlement/catchment/LGA aggregates with numerator, denominator, completeness and quality flags.

## 6. Climate and access

The live GFS, malaria-prone-days and Sentinel-1 applications remain external Earth Engine apps. The public database may contain event summaries and archived, processed outputs, but GitHub Pages does not run `ee.ImageCollection` directly.

Use:

- `data/observations/climate_risk_event.csv` for forecast/observation/verification stage;
- `data/observations/settlement_access_event.csv` for modelled, surveyed and corrected travel time;
- `data/outputs/accessibility_summary.geojson` for public mapping.

## 7. Priority hotspots

`data/outputs/hotspot_scores.geojson` may include climate, access, under-five malaria, maternal service-gap and readiness domains. Keep **evidence confidence** separate from the priority score. State clearly that weights and thresholds are provisional until stakeholder and outcome calibration.

## 8. Actions and outcomes

Only publish an action after the record includes a trigger, human decision, implementation status and authorized aggregate outcome. Individual callers, patients and referrals remain in a secure system.

## 9. Never upload publicly

- names or phone numbers;
- household, pregnancy or child registers;
- individual malaria tests or treatment records;
- exact vulnerable-household coordinates;
- raw emergency calls, referrals or dispatch records;
- confidential facility data;
- API keys, passwords or Earth Engine credentials.

## 10. Technical requirements

- GeoJSON coordinates: WGS84 longitude/latitude;
- `public_display: false` hides a feature from the map;
- use `null` for missing values, never invented placeholders;
- simplify large geometry before GitHub upload;
- validate JSON/GeoJSON before committing;
- after upload, refresh GitHub Pages with `Ctrl + F5`.
