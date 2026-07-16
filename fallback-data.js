window.BAY_FALLBACK = {
  "config": {
    "portal_name": "BAY-CLIMACCESS Evidence Observatory",
    "subtitle": "Public evidence and accountability interface for a climate-triggered malaria service-delivery Proof of Concept in flood-prone Bayelsa communities.",
    "organisation": "Hensard University · Toru-Orua, Bayelsa State, Nigeria",
    "status": "Pre-PoC reviewer prototype",
    "version": "3.0",
    "updated": "2026-07-15",
    "map_center": [
      5.12,
      6.05
    ],
    "map_zoom": 9,
    "evidence_maturity": "E2 · Internally checked",
    "claims": [
      {
        "status": "yes",
        "text": "Three live Google Earth Engine applications demonstrate technical readiness for rainfall warning, malaria-prone days and Sentinel-1 flood detection."
      },
      {
        "status": "yes",
        "text": "A published Bayelsa healthcare-accessibility baseline provides the starting evidence for settlement and facility-catchment planning."
      },
      {
        "status": "yes",
        "text": "The redesigned public database uses settlements and health-facility catchments as the operational units and keeps government, modelled and surveyed evidence separate."
      },
      {
        "status": "pending",
        "text": "Pilot catchments, local action thresholds, route states, facility readiness and target-population denominators still require government confirmation and PoC field validation."
      },
      {
        "status": "no",
        "text": "The portal does not yet demonstrate improved malaria-service continuity, clinical outcomes or cost-effectiveness; these are the outcomes to be tested."
      }
    ]
  },
  "metrics": [
    {
      "id": "apps",
      "label": "Live analytical applications",
      "value": 3,
      "unit": "apps",
      "theme": "forecast",
      "period": "Rainfall · malaria-prone days · flood detection",
      "source": "Google Earth Engine",
      "evidence_grade": "E1",
      "status": "Working technical assets"
    },
    {
      "id": "units",
      "label": "Operational decision units",
      "value": "Settlement + catchment",
      "unit": "",
      "theme": "access",
      "period": "No household health attributes in the public map",
      "source": "Redesigned PoC database",
      "evidence_grade": "E2",
      "status": "Database architecture defined"
    },
    {
      "id": "focus",
      "label": "Primary funding focus",
      "value": "Patient-care delivery",
      "unit": "",
      "theme": "pregnancy",
      "period": "Early warning is the enabling component",
      "source": "BAY-CLIMACCESS PoC design",
      "evidence_grade": "E2",
      "status": "Climate-responsive malaria services"
    },
    {
      "id": "targets",
      "label": "Priority populations",
      "value": "U5 + pregnant women",
      "unit": "",
      "theme": "children",
      "period": "Final denominators pending baseline verification",
      "source": "Government · WorldPop · survey evidence",
      "evidence_grade": "E0",
      "status": "No public target count claimed"
    },
    {
      "id": "actions",
      "label": "Verified alert-to-action records",
      "value": 0,
      "unit": "records",
      "theme": "water",
      "period": "Pre-PoC prototype",
      "source": "Action tracker",
      "evidence_grade": "E0",
      "status": "No outcome-linked action published"
    },
    {
      "id": "outcome",
      "label": "Primary PoC outcome",
      "value": "Timely service contact",
      "unit": "",
      "theme": "evidence",
      "period": "During climate-related access disruption",
      "source": "Matched controlled evaluation",
      "evidence_grade": "E0",
      "status": "To be measured during the PoC"
    }
  ],
  "maps": [
    {
      "id": "reference",
      "title": "Reference geography: LGAs, wards and settlements",
      "caption": "Public reference geography for selecting pilot communities and aggregating evidence. Settlement polygons or generalized points should use stable IDs and approved names.",
      "evidence_grade": "E0",
      "validation_status": "Upload approved Bayelsa, LGA, ward and settlement records",
      "source_url": "",
      "layers": [
        {
          "file": "data/reference/lga_boundaries.geojson",
          "style": "boundary",
          "popup_fields": [
            {
              "key": "lga_name",
              "label": "LGA"
            },
            {
              "key": "source",
              "label": "Source"
            },
            {
              "key": "source_date",
              "label": "Source date"
            },
            {
              "key": "evidence_grade",
              "label": "Evidence"
            }
          ]
        },
        {
          "file": "data/reference/ward_boundaries.geojson",
          "style": "boundary",
          "popup_fields": [
            {
              "key": "ward_name",
              "label": "Ward"
            },
            {
              "key": "lga_name",
              "label": "LGA"
            },
            {
              "key": "source",
              "label": "Source"
            },
            {
              "key": "evidence_grade",
              "label": "Evidence"
            }
          ]
        },
        {
          "file": "data/reference/settlements.geojson",
          "style": "settlement",
          "popup_fields": [
            {
              "key": "settlement_name",
              "label": "Settlement"
            },
            {
              "key": "lga_name",
              "label": "LGA"
            },
            {
              "key": "settlement_type",
              "label": "Type"
            },
            {
              "key": "building_count",
              "label": "Detected buildings"
            },
            {
              "key": "primary_transport_mode",
              "label": "Primary mode"
            },
            {
              "key": "evidence_grade",
              "label": "Evidence"
            }
          ]
        }
      ],
      "legend": [
        {
          "label": "Administrative boundary",
          "color": "#526a73"
        },
        {
          "label": "Settlement",
          "color": "#c97808"
        }
      ]
    },
    {
      "id": "facilities",
      "title": "Health facilities and catchment assignments",
      "caption": "Shows public facility locations and settlement-to-facility catchment assignments. Time-varying readiness and confidential operational records are stored separately.",
      "evidence_grade": "E0",
      "validation_status": "Registry import and facility verification pending",
      "source_url": "",
      "layers": [
        {
          "file": "data/reference/facility_catchments.geojson",
          "style": "catchment",
          "popup_fields": [
            {
              "key": "catchment_name",
              "label": "Catchment"
            },
            {
              "key": "facility_id",
              "label": "Facility ID"
            },
            {
              "key": "assignment_method",
              "label": "Assignment method"
            },
            {
              "key": "catchment_status",
              "label": "Status"
            },
            {
              "key": "evidence_grade",
              "label": "Evidence"
            }
          ]
        },
        {
          "file": "data/reference/health_facilities.geojson",
          "style": "facility",
          "popup_fields": [
            {
              "key": "facility_name",
              "label": "Facility"
            },
            {
              "key": "facility_type",
              "label": "Type"
            },
            {
              "key": "ownership",
              "label": "Ownership"
            },
            {
              "key": "verified_status",
              "label": "Verified status"
            },
            {
              "key": "road_access",
              "label": "Road access"
            },
            {
              "key": "boat_access",
              "label": "Boat access"
            },
            {
              "key": "evidence_grade",
              "label": "Evidence"
            }
          ]
        }
      ],
      "legend": [
        {
          "label": "Facility catchment",
          "color": "#7255b7"
        },
        {
          "label": "Health facility",
          "color": "#007d68"
        }
      ]
    },
    {
      "id": "population",
      "title": "Government, WorldPop and survey population evidence",
      "caption": "Displays settlement- or catchment-level target populations only. Government, WorldPop age–sex estimates, surveyed values and the preferred operational denominator remain separate and traceable.",
      "evidence_grade": "E0",
      "validation_status": "Population evidence template ready; baseline verification pending",
      "source_url": "",
      "layers": [
        {
          "file": "data/outputs/settlement_summary.geojson",
          "style": "settlement",
          "popup_fields": [
            {
              "key": "settlement_name",
              "label": "Settlement"
            },
            {
              "key": "government_u5",
              "label": "Government U5"
            },
            {
              "key": "worldpop_u5",
              "label": "WorldPop U5"
            },
            {
              "key": "surveyed_u5",
              "label": "Surveyed U5"
            },
            {
              "key": "preferred_u5",
              "label": "Preferred U5"
            },
            {
              "key": "registered_pregnant",
              "label": "Registered pregnant"
            },
            {
              "key": "preferred_pregnancy_target",
              "label": "Preferred pregnancy target"
            },
            {
              "key": "evidence_confidence",
              "label": "Evidence confidence"
            }
          ]
        }
      ],
      "legend": [
        {
          "label": "Settlement population summary",
          "color": "#c97808"
        }
      ]
    },
    {
      "id": "access",
      "title": "Normal and climate-disrupted healthcare access",
      "caption": "Compares normal and disrupted travel time from settlements to functioning facilities using road, walking and boat modes. GPS observations remain separate from modelled travel time.",
      "evidence_grade": "E3",
      "validation_status": "Published baseline available; dynamic event validation pending",
      "source_url": "",
      "layers": [
        {
          "file": "data/outputs/accessibility_summary.geojson",
          "style": "access",
          "popup_fields": [
            {
              "key": "settlement_name",
              "label": "Settlement"
            },
            {
              "key": "facility_name",
              "label": "Assigned facility"
            },
            {
              "key": "scenario",
              "label": "Scenario"
            },
            {
              "key": "modelled_travel_min",
              "label": "Modelled time",
              "unit": "min"
            },
            {
              "key": "surveyed_travel_min",
              "label": "Surveyed time",
              "unit": "min"
            },
            {
              "key": "corrected_travel_min",
              "label": "Operational time",
              "unit": "min"
            },
            {
              "key": "route_status",
              "label": "Route status"
            },
            {
              "key": "alternative_facility_name",
              "label": "Alternative facility"
            },
            {
              "key": "evidence_grade",
              "label": "Evidence"
            }
          ]
        },
        {
          "file": "data/reference/health_facilities.geojson",
          "style": "facility",
          "popup_fields": [
            {
              "key": "facility_name",
              "label": "Facility"
            },
            {
              "key": "facility_type",
              "label": "Type"
            },
            {
              "key": "verified_status",
              "label": "Status"
            }
          ]
        }
      ],
      "legend": [
        {
          "label": "Access summary",
          "color": "#2d6cdf"
        },
        {
          "label": "Health facility",
          "color": "#007d68"
        }
      ]
    },
    {
      "id": "services",
      "title": "Aggregated malaria and pregnancy service continuity",
      "caption": "Shows approved settlement- or catchment-level service indicators. Routine government records, modelled burden and survey observations are compared but not averaged into one case count.",
      "evidence_grade": "E0",
      "validation_status": "Government permissions and baseline data pending",
      "source_url": "",
      "layers": [
        {
          "file": "data/outputs/service_continuity_summary.geojson",
          "style": "service",
          "popup_fields": [
            {
              "key": "geo_name",
              "label": "Area"
            },
            {
              "key": "period",
              "label": "Period"
            },
            {
              "key": "u5_testing_completion_pct",
              "label": "U5 testing completion",
              "unit": "%"
            },
            {
              "key": "u5_act_treatment_completion_pct",
              "label": "U5 ACT treatment completion",
              "unit": "%"
            },
            {
              "key": "pw_testing_completion_pct",
              "label": "Pregnancy testing completion",
              "unit": "%"
            },
            {
              "key": "ipt3p_coverage_pct",
              "label": "IPT3p coverage",
              "unit": "%"
            },
            {
              "key": "timely_service_contact_pct",
              "label": "Timely service contact",
              "unit": "%"
            },
            {
              "key": "evidence_grade",
              "label": "Evidence"
            }
          ]
        }
      ],
      "legend": [
        {
          "label": "Service-continuity summary",
          "color": "#a3497f"
        }
      ]
    },
    {
      "id": "readiness",
      "title": "Facility readiness and climate-sensitive service gaps",
      "caption": "Displays public, aggregated readiness summaries: operational status, testing availability, stock-out risk, outreach capacity and climate-related isolation.",
      "evidence_grade": "E0",
      "validation_status": "Facility audit and monthly readiness reporting pending",
      "source_url": "",
      "layers": [
        {
          "file": "data/outputs/facility_readiness_summary.geojson",
          "style": "readiness",
          "popup_fields": [
            {
              "key": "facility_name",
              "label": "Facility"
            },
            {
              "key": "period",
              "label": "Period"
            },
            {
              "key": "operational_status",
              "label": "Operational status"
            },
            {
              "key": "malaria_testing_available",
              "label": "Testing available"
            },
            {
              "key": "sp_stockout_7d",
              "label": "SP stock-out ≥7 d"
            },
            {
              "key": "rdt_stockout_7d",
              "label": "RDT stock-out ≥7 d"
            },
            {
              "key": "act_stockout_7d",
              "label": "ACT stock-out ≥7 d"
            },
            {
              "key": "facility_isolated",
              "label": "Climate isolated"
            },
            {
              "key": "evidence_grade",
              "label": "Evidence"
            }
          ]
        }
      ],
      "legend": [
        {
          "label": "Facility readiness",
          "color": "#39804a"
        }
      ]
    },
    {
      "id": "hotspots",
      "title": "Climate–malaria service priority hotspots",
      "caption": "A transparent settlement/catchment prioritization output combining climate hazard, access disruption, exposed target populations, malaria-service burden and facility readiness. Weights remain provisional until stakeholder and outcome calibration.",
      "evidence_grade": "E1",
      "validation_status": "Priority domains defined; weights and thresholds not yet validated",
      "source_url": "",
      "layers": [
        {
          "file": "data/outputs/hotspot_scores.geojson",
          "style": "hotspot",
          "popup_fields": [
            {
              "key": "geo_name",
              "label": "Area"
            },
            {
              "key": "period",
              "label": "Period"
            },
            {
              "key": "priority_score",
              "label": "Priority score",
              "unit": "/100"
            },
            {
              "key": "priority_class",
              "label": "Priority class"
            },
            {
              "key": "climate_score",
              "label": "Climate"
            },
            {
              "key": "access_score",
              "label": "Access"
            },
            {
              "key": "u5_malaria_score",
              "label": "U5 malaria"
            },
            {
              "key": "maternal_gap_score",
              "label": "Maternal gap"
            },
            {
              "key": "readiness_gap_score",
              "label": "Readiness gap"
            },
            {
              "key": "evidence_confidence",
              "label": "Evidence confidence"
            },
            {
              "key": "recommended_action",
              "label": "Recommended action"
            }
          ]
        }
      ],
      "legend": [
        {
          "label": "Priority hotspot",
          "color": "#b94335"
        }
      ]
    },
    {
      "id": "validation",
      "title": "Field validation and evidence confidence",
      "caption": "Generalized validation observations for routes, facilities, waterlogging and service access. No household or individual health locations are permitted in this public layer.",
      "evidence_grade": "E3",
      "validation_status": "Template ready; PoC observations pending",
      "source_url": "",
      "layers": [
        {
          "file": "data/outputs/validation_points.geojson",
          "style": "validation",
          "popup_fields": [
            {
              "key": "validation_type",
              "label": "Validation type"
            },
            {
              "key": "observation_date",
              "label": "Date"
            },
            {
              "key": "model_value",
              "label": "Model value"
            },
            {
              "key": "observed_value",
              "label": "Observed value"
            },
            {
              "key": "agreement_status",
              "label": "Agreement"
            },
            {
              "key": "qa_status",
              "label": "QA status"
            },
            {
              "key": "evidence_grade",
              "label": "Evidence"
            }
          ]
        }
      ],
      "legend": [
        {
          "label": "Generalized validation record",
          "color": "#8a4aa0"
        }
      ]
    },
    {
      "id": "actions",
      "title": "Implemented climate-responsive actions and outcomes",
      "caption": "Shows only authorized, aggregated actions after a trigger, human decision and implementation record exist. This is the evidence chain the PoC is designed to create.",
      "evidence_grade": "E5",
      "validation_status": "No outcome-linked PoC records yet",
      "source_url": "",
      "layers": [
        {
          "file": "data/outputs/action_locations.geojson",
          "style": "action",
          "popup_fields": [
            {
              "key": "action_date",
              "label": "Action date"
            },
            {
              "key": "action_type",
              "label": "Action"
            },
            {
              "key": "trigger",
              "label": "Trigger"
            },
            {
              "key": "u5_reached",
              "label": "U5 reached"
            },
            {
              "key": "pregnant_reached",
              "label": "Pregnant women reached"
            },
            {
              "key": "timely_service_contacts",
              "label": "Timely contacts"
            },
            {
              "key": "cost_ngn",
              "label": "Cost",
              "unit": "NGN"
            },
            {
              "key": "result_summary",
              "label": "Result"
            },
            {
              "key": "evidence_grade",
              "label": "Evidence"
            }
          ]
        }
      ],
      "legend": [
        {
          "label": "Verified implemented action",
          "color": "#b94335"
        }
      ]
    }
  ],
  "updates": [
    {
      "id": "redesign-20260715",
      "category": "evidence",
      "status": "completed",
      "evidence_grade": "E2",
      "date": "2026-07-15",
      "valid_from": "",
      "valid_to": "",
      "geography": "Bayelsa State",
      "author": "BAY-CLIMACCESS Team",
      "title": "Portal redesigned around the Nexa Proof-of-Concept pathway",
      "summary": "The database and reviewer portal now prioritize settlements, health-facility catchments, transparent triggers, adaptive malaria-service actions and measurable outcomes.",
      "body": "Live forecast and satellite applications are separated from the uploaded public evidence map. Government, modelled and surveyed observations are stored separately, while confidential contacts and individual health records remain outside GitHub.",
      "recommendation": "Use the portal to demonstrate technical readiness and the proposed signal-to-action-to-outcome pathway; do not claim health impact before the controlled PoC evaluation.",
      "uncertainty": "Pilot catchments, local thresholds, target denominators and action effectiveness remain to be confirmed.",
      "source_url": "",
      "tags": [
        "Nexa",
        "database redesign",
        "settlement",
        "facility catchment",
        "service continuity"
      ]
    },
    {
      "id": "apps-registered-20260715",
      "category": "forecast",
      "status": "information",
      "evidence_grade": "E1",
      "date": "2026-07-15",
      "valid_from": "",
      "valid_to": "",
      "geography": "Nigeria with Bayelsa PoC focus",
      "author": "Climate Analytics Workstream",
      "title": "Three live Earth Engine applications registered",
      "summary": "Rainfall warning, malaria-prone days and Sentinel-1 flood-detection applications are linked as working technical assets.",
      "body": "The apps generate preliminary climate and earth-observation signals. They do not directly provide verified service disruption or health outcomes.",
      "recommendation": "Calibrate local thresholds and use community, route and facility confirmation before activating a service response.",
      "uncertainty": "Bayelsa-specific technical and operational validation is pending.",
      "source_url": "https://zubair-1300.projects.earthengine.app/view/fwn",
      "tags": [
        "GFS",
        "ERA5-Land",
        "Sentinel-1",
        "Earth Engine"
      ]
    },
    {
      "id": "published-access-2025",
      "category": "evidence",
      "status": "completed",
      "evidence_grade": "E3",
      "date": "2025-12-04",
      "valid_from": "",
      "valid_to": "",
      "geography": "Bayelsa State",
      "author": "Islam et al.",
      "title": "Published healthcare-accessibility baseline retained as starting evidence",
      "summary": "The published framework analysed 175,352 building footprints and identified localized barrier and remote-access patterns.",
      "body": "For the PoC, these building-level results will be summarized to settlements and facility catchments rather than treated as household records.",
      "recommendation": "Update travel time with field-observed route state, waiting time, boat availability, facility readiness and climate disruption.",
      "uncertainty": "Static travel speeds, current waterlogging, tides and service capacity were not represented in the baseline.",
      "source_url": "",
      "tags": [
        "published baseline",
        "accessibility",
        "settlement aggregation"
      ]
    }
  ],
  "apps": [
    {
      "id": "rainfall_app",
      "title": "Rainfall Forecast and Flood Warning (0–72 h)",
      "platform": "Google Earth Engine App",
      "purpose": "Visualizes forecast rainfall accumulation in classes of 0–25, 25–50, 50–75 and >75 mm to support early preparedness.",
      "url": "https://zubair-1300.projects.earthengine.app/view/fwn",
      "geographic_coverage": "Nigeria",
      "evidence_grade": "E1",
      "validation_status": "Working app; Bayelsa impact-threshold calibration pending",
      "operational_use": "Start a preparedness watch, review routes and facilities, and consider commodity pre-positioning.",
      "limitations": "The >75 mm class is a preliminary warning signal, not a locally validated prediction of access disruption or health impact.",
      "status": "Live"
    },
    {
      "id": "mpd_app",
      "title": "Nigeria Malaria-Prone Days (ERA5-Land)",
      "platform": "Google Earth Engine App",
      "purpose": "Identifies days and periods with climate conditions potentially favourable for malaria transmission.",
      "url": "https://zubair-1300.projects.earthengine.app/view/mpd",
      "geographic_coverage": "Nigeria",
      "evidence_grade": "E1",
      "validation_status": "Working app; comparison with routine and survey health evidence pending",
      "operational_use": "Support seasonal readiness and interpretation of malaria vulnerability, not case diagnosis.",
      "limitations": "Climate suitability is not observed incidence and must not be treated as a confirmed case count.",
      "status": "Live"
    },
    {
      "id": "flood_app",
      "title": "Nigeria Flood Detection (Sentinel-1 ΔVV with σ threshold)",
      "platform": "Google Earth Engine App",
      "purpose": "Detects probable flood-related radar-backscatter change using Sentinel-1 and a statistical threshold.",
      "url": "https://zubair-1300.projects.earthengine.app/view/nfm",
      "geographic_coverage": "Nigeria; Bayelsa PoC adaptation planned",
      "evidence_grade": "E1",
      "validation_status": "Working app; same-period baseline and GPS-referenced Bayelsa validation pending",
      "operational_use": "Support verification of probable inundation and prompt community or route-status confirmation.",
      "limitations": "Permanent water, seasonal wetlands, vegetation and acquisition gaps require human confirmation and uncertainty reporting.",
      "status": "Live"
    }
  ],
  "catalog": [
    {
      "dataset_id": "APP_RAIN",
      "dataset_name": "Rainfall Forecast and Flood Warning App",
      "category": "Live analytics",
      "purpose": "Preliminary 0–72-hour preparedness signal",
      "format": "External Earth Engine App",
      "geometry": "Raster display",
      "source": "NOAA GFS processed in Google Earth Engine",
      "evidence_stage": "E1",
      "status": "linked",
      "status_label": "Linked external source",
      "file_name": "External URL"
    },
    {
      "dataset_id": "APP_MPD",
      "dataset_name": "Malaria-Prone Days App",
      "category": "Live analytics",
      "purpose": "Climate-derived malaria suitability context",
      "format": "External Earth Engine App",
      "geometry": "Raster display",
      "source": "ERA5-Land / Google Earth Engine",
      "evidence_stage": "E1",
      "status": "linked",
      "status_label": "Linked external source",
      "file_name": "External URL"
    },
    {
      "dataset_id": "APP_FLOOD",
      "dataset_name": "Sentinel-1 Flood Detection App",
      "category": "Live analytics",
      "purpose": "Probable flood-related radar-backscatter change",
      "format": "External Earth Engine App",
      "geometry": "Raster display",
      "source": "Sentinel-1 / Google Earth Engine",
      "evidence_stage": "E1",
      "status": "linked",
      "status_label": "Linked external source",
      "file_name": "External URL"
    },
    {
      "dataset_id": "PUB_ACCESS",
      "dataset_name": "Published Bayelsa accessibility baseline",
      "category": "Published evidence",
      "purpose": "Starting evidence for settlement and catchment accessibility",
      "format": "JSON summary / publication",
      "geometry": "Building-linked 100 m baseline",
      "source": "Islam et al. (2025)",
      "evidence_stage": "E3",
      "status": "published",
      "status_label": "Published evidence",
      "file_name": "data/published_evidence.json"
    },
    {
      "dataset_id": "LGA",
      "dataset_name": "LGA boundaries",
      "category": "Reference geography",
      "purpose": "Approved aggregation and pilot selection",
      "format": "GeoJSON",
      "geometry": "Polygon / MultiPolygon",
      "source": "Government-approved or OCHA boundary",
      "evidence_stage": "E0",
      "status": "template",
      "status_label": "Template ready",
      "file_name": "data/reference/lga_boundaries.geojson"
    },
    {
      "dataset_id": "WARD",
      "dataset_name": "Ward boundaries",
      "category": "Reference geography",
      "purpose": "Sub-LGA aggregation where authorized",
      "format": "GeoJSON",
      "geometry": "Polygon / MultiPolygon",
      "source": "Government-approved boundary",
      "evidence_stage": "E0",
      "status": "template",
      "status_label": "Template ready",
      "file_name": "data/reference/ward_boundaries.geojson"
    },
    {
      "dataset_id": "SETTLEMENT",
      "dataset_name": "Settlement registry",
      "category": "Reference geography",
      "purpose": "Primary community decision unit and summarized built-environment evidence",
      "format": "GeoJSON",
      "geometry": "Polygon / generalized point",
      "source": "GRID3, government records, Open Buildings summaries and field verification",
      "evidence_stage": "E0",
      "status": "template",
      "status_label": "Template ready",
      "file_name": "data/reference/settlements.geojson"
    },
    {
      "dataset_id": "FACILITY",
      "dataset_name": "Health-facility registry",
      "category": "Healthcare services",
      "purpose": "Public facility identity, location, type and access characteristics",
      "format": "GeoJSON",
      "geometry": "Point",
      "source": "NHFR / government registry plus field verification",
      "evidence_stage": "E0",
      "status": "template",
      "status_label": "Template ready",
      "file_name": "data/reference/health_facilities.geojson"
    },
    {
      "dataset_id": "CATCHMENT",
      "dataset_name": "Facility-catchment assignment",
      "category": "Healthcare services",
      "purpose": "Connect settlements to primary, alternative and referral facilities",
      "format": "GeoJSON",
      "geometry": "Polygon / relationship layer",
      "source": "Government assignment, modelled access and survey correction",
      "evidence_stage": "E0",
      "status": "template",
      "status_label": "Template ready",
      "file_name": "data/reference/facility_catchments.geojson"
    },
    {
      "dataset_id": "POP",
      "dataset_name": "Population evidence",
      "category": "Population and vulnerability",
      "purpose": "Separate government, WorldPop, surveyed and preferred denominators",
      "format": "CSV long format",
      "geometry": "Joined by settlement or catchment ID",
      "source": "Government, WorldPop age–sex data and surveys",
      "evidence_stage": "E0",
      "status": "template",
      "status_label": "Template ready",
      "file_name": "data/observations/population_evidence.csv"
    },
    {
      "dataset_id": "HEALTH_OBS",
      "dataset_name": "Health indicator observations",
      "category": "Malaria and maternal services",
      "purpose": "Monthly facility/catchment observations with source and denominator metadata",
      "format": "CSV long format",
      "geometry": "Joined by facility/catchment/settlement ID",
      "source": "DHIS2/RHIS, registers, surveys and modelled context",
      "evidence_stage": "E0",
      "status": "restricted",
      "status_label": "Restricted source; publish aggregates only",
      "file_name": "data/observations/health_indicator_observations.csv"
    },
    {
      "dataset_id": "READINESS",
      "dataset_name": "Facility readiness events",
      "category": "Healthcare services",
      "purpose": "Time-varying operation, testing, stock-out, outreach and isolation status",
      "format": "CSV",
      "geometry": "Joined by facility ID",
      "source": "Routine reporting and facility audit",
      "evidence_stage": "E0",
      "status": "restricted",
      "status_label": "Restricted source; publish summary only",
      "file_name": "data/observations/facility_readiness_event.csv"
    },
    {
      "dataset_id": "CLIMATE",
      "dataset_name": "Climate-risk events",
      "category": "Climate and access",
      "purpose": "Event-level forecast, waterlogging, route disruption and confirmation stage",
      "format": "CSV",
      "geometry": "Joined by settlement/catchment ID",
      "source": "GFS, Sentinel-1, government and community confirmation",
      "evidence_stage": "E1",
      "status": "template",
      "status_label": "Template ready",
      "file_name": "data/observations/climate_risk_event.csv"
    },
    {
      "dataset_id": "ACCESS",
      "dataset_name": "Settlement access events",
      "category": "Climate and access",
      "purpose": "Normal and disrupted modelled, surveyed and corrected travel time",
      "format": "CSV",
      "geometry": "Joined by settlement, facility and route IDs",
      "source": "Accessibility model, GPS and route reports",
      "evidence_stage": "E1",
      "status": "template",
      "status_label": "Template ready",
      "file_name": "data/observations/settlement_access_event.csv"
    },
    {
      "dataset_id": "HOTSPOT",
      "dataset_name": "Climate–malaria service priority output",
      "category": "Decision support",
      "purpose": "Transparent priority domains plus separate evidence-confidence score",
      "format": "GeoJSON",
      "geometry": "Settlement / catchment",
      "source": "Derived from approved aggregated evidence",
      "evidence_stage": "E1",
      "status": "template",
      "status_label": "Template ready",
      "file_name": "data/outputs/hotspot_scores.geojson"
    },
    {
      "dataset_id": "ACTIONS",
      "dataset_name": "Alert-to-action and service outcomes",
      "category": "Operations",
      "purpose": "Document trigger, decision, implementation, reach, timely contacts, cost and result",
      "format": "JSON / GeoJSON",
      "geometry": "Table and generalized action location",
      "source": "Authorized PoC operations",
      "evidence_stage": "E5",
      "status": "template",
      "status_label": "Template ready",
      "file_name": "data/action_tracker.json / data/outputs/action_locations.geojson"
    },
    {
      "dataset_id": "EMERGENCY",
      "dataset_name": "Community alert and referral records",
      "category": "Restricted operations",
      "purpose": "Secure climate-health calls, referrals and dispatch records",
      "format": "Protected operational database",
      "geometry": "Sensitive",
      "source": "Authorized callers and health teams",
      "evidence_stage": "E3",
      "status": "restricted",
      "status_label": "Never upload raw records",
      "file_name": "DO NOT UPLOAD TO GITHUB"
    },
    {
      "dataset_id": "CONTACTS",
      "dataset_name": "Community and facility contacts",
      "category": "Restricted operations",
      "purpose": "Authorized focal-person and emergency communication register",
      "format": "Encrypted protected database",
      "geometry": "None / restricted",
      "source": "Consent-based contact register",
      "evidence_stage": "E3",
      "status": "restricted",
      "status_label": "Never upload names or phone numbers",
      "file_name": "DO NOT UPLOAD TO GITHUB"
    }
  ],
  "evidence": {
    "citation": "Islam, Z., Umoru, K., Tobirov, O., & Jabborov, A. (2025). Geospatial Analysis of Access from Buildings to Health Facilities in Bayelsa, Nigeria. Hensard Journal of Environment, 1(1).",
    "limitations": "The published study is a static baseline. Building footprints are not households, and the PoC must aggregate them to settlements/catchments and update travel time using route state, tides, facility readiness and field observations.",
    "headline_metrics": [
      {
        "label": "Buildings analysed",
        "value": 175352,
        "unit": ""
      },
      {
        "label": "Barrier-hotspot buildings",
        "value": 3080,
        "unit": ""
      },
      {
        "label": "Remote buildings",
        "value": 1438,
        "unit": ""
      },
      {
        "label": "No-estimate buildings",
        "value": 2431,
        "unit": ""
      },
      {
        "label": "Spatial resolution",
        "value": 100,
        "unit": "m"
      },
      {
        "label": "Access threshold used",
        "value": 60,
        "unit": "min"
      }
    ],
    "categories": [
      {
        "category": "Well-connected",
        "buildings": 115148,
        "share_pct": 65.7
      },
      {
        "category": "Typical",
        "buildings": 51322,
        "share_pct": 29.3
      },
      {
        "category": "Barrier hotspot",
        "buildings": 3080,
        "share_pct": 1.8
      },
      {
        "category": "Heterogeneous",
        "buildings": 1933,
        "share_pct": 1.1
      },
      {
        "category": "Remote",
        "buildings": 1438,
        "share_pct": 0.8
      },
      {
        "category": "No estimate",
        "buildings": 2431,
        "share_pct": 1.4
      }
    ]
  },
  "comparison": [
    {
      "indicator": "Under-five population",
      "unit": "persons",
      "government_evidence": "Administrative target or programme denominator",
      "modelled_evidence": "WorldPop age 0–4 aggregated to settlement/catchment",
      "surveyed_evidence": "Baseline enumeration or calibrated sample",
      "operational_use": "Select the preferred denominator using a documented evidence hierarchy; preserve every source and uncertainty.",
      "status": "template",
      "status_label": "Baseline pending"
    },
    {
      "indicator": "Pregnancy service target",
      "unit": "persons",
      "government_evidence": "ANC registers and programme estimates",
      "modelled_evidence": "Expected pregnancies derived from demographic assumptions and women aged 15–49",
      "surveyed_evidence": "Consent-based pregnancy/ANC verification",
      "operational_use": "Use registered and surveyed pregnancy targets; WorldPop supports the age–sex denominator but does not identify pregnancy directly.",
      "status": "restricted",
      "status_label": "Protected source records"
    },
    {
      "indicator": "Malaria burden and service use",
      "unit": "counts / rates",
      "government_evidence": "DHIS2/RHIS and facility registers",
      "modelled_evidence": "MAP or other burden surfaces used as contextual priors",
      "surveyed_evidence": "Register audit, household/service-use survey and verified testing information",
      "operational_use": "Compare reported, expected and surveyed evidence; do not average them into one corrected case count.",
      "status": "restricted",
      "status_label": "Permission required"
    },
    {
      "indicator": "Travel time to functioning service",
      "unit": "minutes",
      "government_evidence": "Official catchment assignment where available",
      "modelled_evidence": "Published static multimodal accessibility baseline",
      "surveyed_evidence": "GPS journey, waiting and transfer-time observations",
      "operational_use": "Use scenario-specific corrected travel time and retain model error and route-status evidence.",
      "status": "published",
      "status_label": "Baseline available"
    },
    {
      "indicator": "Facility readiness",
      "unit": "status / days",
      "government_evidence": "NHFR and routine stock/service reporting",
      "modelled_evidence": "Nearest or assigned service availability",
      "surveyed_evidence": "Facility audit and event status confirmation",
      "operational_use": "Use a dated readiness event record, not a permanent readiness attribute.",
      "status": "template",
      "status_label": "Audit pending"
    },
    {
      "indicator": "Climate-related access disruption",
      "unit": "risk stage",
      "government_evidence": "Approved rainfall, flood or emergency reports where available",
      "modelled_evidence": "GFS rainfall signal and Sentinel-1 probable inundation",
      "surveyed_evidence": "Community route report, GPS observation and facility confirmation",
      "operational_use": "Human-confirmed watch, alert, disruption, service activation or recovery stage.",
      "status": "template",
      "status_label": "Calibration pending"
    }
  ],
  "actions": []
};
