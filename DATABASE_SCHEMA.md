# BAY-CLIMACCESS Minimum Meaningful Database

## Public analytical units

1. **Settlement** — population, built environment, climate exposure, access and service continuity.
2. **Health-facility catchment** — target population, facility readiness, routine services and response performance.
3. **Climate event or month** — makes risk, access, services and actions time-specific.

## Main tables

| Table | Unit | Purpose |
|---|---|---|
| `reference/settlements.geojson` | Settlement | Stable settlement identity and summarized building evidence |
| `reference/health_facilities.geojson` | Facility | Stable public facility identity and access characteristics |
| `reference/facility_catchments.geojson` | Catchment | Primary, alternative and referral assignments |
| `observations/population_evidence.csv` | Settlement/catchment/source/period | Government, WorldPop, surveyed and preferred denominators |
| `observations/health_indicator_observations.csv` | Facility/catchment/indicator/month/source | Malaria, ANC and IPTp observations |
| `observations/facility_readiness_event.csv` | Facility/month or event | Operation, testing, stock-outs, outreach and isolation |
| `observations/climate_risk_event.csv` | Settlement/catchment/event | Forecast, probable inundation, verification and risk stage |
| `observations/settlement_access_event.csv` | Settlement–facility/event | Modelled, surveyed and corrected travel time |
| `outputs/hotspot_scores.geojson` | Settlement/catchment/month | Priority domains and separate evidence confidence |
| `action_tracker.json` | Verified action | Trigger, decision, implementation, reach and outcome |

## Source rule

Government, modelled, surveyed, sensor-observed and forecast evidence remain separate. A preferred operational value may be selected only through a documented hierarchy or calibration process, while every original source remains retained.

## Privacy rule

Names, telephone numbers, household registers, pregnancy records, individual tests, calls, referrals and dispatch records belong in a secure role-based operational database and must never be committed to this public repository.
