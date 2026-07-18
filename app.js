const FALLBACK = window.BAY_FALLBACK || {};
const state = {
  config: {},
  metrics: [],
  maps: [],
  updates: [],
  apps: [],
  catalog: [],
  evidence: {},
  comparison: [],
  actions: [],

  wards: [],
  settlements: [],

  briefFilter: "all",
  briefSearch: "",
  catalogFilter: "all",
  catalogSearch: "",
  activeLayers: []
};
const gradeNames = { E0: 'Source', E1: 'Derived', E2: 'Internally checked', E3: 'Validated / published', E4: 'Survey corrected', E5: 'Outcome linked' };
const map = L.map('map', { zoomControl: true, preferCanvas: true }).setView([5.12, 6.05], 9);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '&copy; OpenStreetMap contributors' }).addTo(map);
const mapLayerGroup = L.layerGroup().addTo(map);

async function safeJson(path, fallback) {
  try {
    const response = await fetch(path, { cache: 'no-store' });
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
    return await response.json();
  } catch (error) {
    console.warn(`Using fallback for ${path}`, error);
    return typeof structuredClone === 'function' ? structuredClone(fallback ?? null) : JSON.parse(JSON.stringify(fallback ?? null));
  }
}

function escapeHtml(value = '') {
  return String(value).replace(/[&<>'"]/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#39;', '"':'&quot;' }[char]));
}
function formatValue(value, unit = '') {
  if (value === null || value === undefined || value === '') return 'Pending';
  if (typeof value === 'number') return `${value.toLocaleString()}${unit ? ` ${unit}` : ''}`;
  return `${value}${unit ? ` ${unit}` : ''}`;
}
function gradeClass(grade = 'E0') { return `grade-${String(grade).toLowerCase()}`; }
function gradeLabel(grade = 'E0') { return `${grade} · ${gradeNames[grade] || 'Evidence'}`; }

async function loadAll() {
  const [
    config,
    metrics,
    maps,
    updatesPayload,
    apps,
    catalog,
    evidence,
    comparison,
    actions,
    wardGeoJson,
    settlementGeoJson
  ] = await Promise.all([

    safeJson(
      "data/portal_config.json",
      FALLBACK.config || {}
    ),

    safeJson(
      "data/metrics.json",
      FALLBACK.metrics || []
    ),

    safeJson(
      "data/maps.json",
      FALLBACK.maps || []
    ),

    safeJson(
      "data/updates.json",
      {
        version: "0.0",
        updated: "",
        updates: FALLBACK.updates || []
      }
    ),

    safeJson(
      "data/app_registry.json",
      FALLBACK.apps || []
    ),

    safeJson(
      "data/data_catalog.json",
      FALLBACK.catalog || []
    ),

    safeJson(
      "data/published_evidence.json",
      FALLBACK.evidence || {}
    ),

    safeJson(
      "data/evidence_comparison.json",
      FALLBACK.comparison || []
    ),

    safeJson(
      "data/action_tracker.json",
      FALLBACK.actions || []
    ),

    safeJson(
      "data/reference/ward_boundaries.geojson",
      {
        type: "FeatureCollection",
        features: []
      }
    ),

    safeJson(
      "data/reference/settlements.geojson",
      {
        type: "FeatureCollection",
        features: []
      }
    )
  ]);

  Object.assign(state, {
    config,
    metrics,
    maps,
    updates: updatesPayload.updates || [],
    apps,
    catalog,
    evidence,
    comparison,
    actions
  });

  state.wards = (
    wardGeoJson.features || []
  )
    .map(feature => {
      const properties =
        feature.properties || {};

      return {
        ward_id: String(
          properties.ward_id ?? ""
        ).trim(),

        ward_name: String(
          properties.ward_name ?? ""
        ).trim(),

        lga_name: String(
          properties.lga_name ?? ""
        ).trim()
      };
    })
    .filter(record => {
      return (
        record.ward_name &&
        record.lga_name
      );
    });

  state.settlements = (
    settlementGeoJson.features || []
  )
    .map(feature => {
      const properties =
        feature.properties || {};

      return {
        settlement_id: String(
          properties.settlement_id ?? ""
        ).trim(),

        settlement_name: String(
          properties.settlement_name ?? ""
        ).trim(),

        ward_name: String(
          properties.ward_name ?? ""
        ).trim(),

        lga_name: String(
          properties.lga_name ?? ""
        ).trim()
      };
    })
    .filter(record => {
      return (
        record.settlement_id &&
        record.settlement_name &&
        record.ward_name &&
        record.lga_name
      );
    });

  state.updateMeta = {
    version:
      updatesPayload.version ||
      config.version,

    updated:
      updatesPayload.updated ||
      config.updated
  };

  renderAll();
}

function renderAll() {
  renderConfig();
  renderMetrics();
  renderClaims();
  renderApps();
  renderPublishedEvidence();
  renderComparison();
  renderBriefs();
  renderActions();
  renderCatalog();
  setupMapModules();
  setupGeographySelectors();

  if (location.protocol === "file:") {
    showFileNotice();
  }
}

function renderConfig() {
  document.getElementById('portalName').textContent = state.config.portal_name || 'BAY-CLIMACCESS Evidence Observatory';
  document.getElementById('portalSubtitle').textContent = state.config.subtitle || '';
  document.getElementById('organisationName').textContent = state.config.organisation || '';
  document.getElementById('portalStatus').textContent = state.config.status || 'Technical prototype';
  document.getElementById('portalUpdated').textContent = `Version ${state.config.version || '—'} · updated ${state.config.updated || '—'}`;
  document.getElementById('maturityLabel').textContent = state.config.evidence_maturity || 'Pre-PoC';
  if (Array.isArray(state.config.map_center)) map.setView(state.config.map_center, state.config.map_zoom || 9);
}

function renderMetrics() {
  const grid = document.getElementById('metricGrid');
  grid.innerHTML = state.metrics.map(m => `<article class="metric-card" data-theme="${escapeHtml(m.theme || 'evidence')}">
    <span class="metric-label">${escapeHtml(m.label)}</span>
    <strong class="metric-value">${escapeHtml(formatValue(m.value, m.unit))}</strong>
    <small>${escapeHtml(m.period || m.geography || 'Awaiting verified data')}</small>
    <div class="metric-footer"><span class="evidence-badge ${gradeClass(m.evidence_grade)}">${escapeHtml(m.evidence_grade || 'E0')}</span><small>${escapeHtml(m.status || '')}</small></div>
  </article>`).join('');
}

function renderClaims() {
  const claims = state.config.claims || [];
  document.getElementById('claimList').innerHTML = claims.map(c => `<div class="claim-item ${escapeHtml(c.status)}"><span class="claim-icon">${c.status === 'yes' ? '✓' : c.status === 'no' ? '×' : '!'}</span><p>${escapeHtml(c.text)}</p></div>`).join('');
}

function renderApps() {
  const grid = document.getElementById('appGrid');
  grid.innerHTML = state.apps.map(a => {
    const hasUrl = Boolean(a.url);
    return `<article class="card app-card">
      <div class="app-visual"><span>${escapeHtml(a.platform || 'Technical asset')}</span><h3>${escapeHtml(a.title)}</h3></div>
      <div class="app-body">
        <p>${escapeHtml(a.purpose)}</p>
        <div class="app-meta">
          <div><small>Evidence</small><strong>${escapeHtml(gradeLabel(a.evidence_grade || 'E1'))}</strong></div>
          <div><small>Validation</small><strong>${escapeHtml(a.validation_status || 'Pending')}</strong></div>
          <div><small>Coverage</small><strong>${escapeHtml(a.geographic_coverage || 'Nigeria')}</strong></div>
          <div><small>Status</small><strong>${escapeHtml(a.status || 'Prototype')}</strong></div>
        </div>
        <p><strong>Operational role:</strong> ${escapeHtml(a.operational_use || '')}</p>
        <p><strong>Limit:</strong> ${escapeHtml(a.limitations || '')}</p>
        <div class="app-actions">
          <a class="button-link ${hasUrl ? '' : 'disabled-link'}" ${hasUrl ? `href="${escapeHtml(a.url)}" target="_blank" rel="noopener"` : 'aria-disabled="true"'}>${hasUrl ? 'Open live app ↗' : 'Add live URL'}</a>
        </div>
      </div>
    </article>`;
  }).join('');
}

function renderPublishedEvidence() {
  const e = state.evidence || {};
  document.getElementById('publishedMetrics').innerHTML = (e.headline_metrics || []).map(m => `<div class="published-metric"><strong>${escapeHtml(formatValue(m.value, m.unit))}</strong><span>${escapeHtml(m.label)}</span></div>`).join('');
  const max = Math.max(...(e.categories || []).map(c => Number(c.share_pct || 0)), 1);
  document.getElementById('publishedBars').innerHTML = (e.categories || []).map(c => `<div class="bar-row"><span>${escapeHtml(c.category)}</span><div class="bar-track"><div class="bar-fill" style="width:${(Number(c.share_pct || 0)/max)*100}%"></div></div><strong>${escapeHtml(c.share_pct)}%</strong></div>`).join('');
  document.getElementById('publicationCitation').innerHTML = `<strong>Source:</strong> ${escapeHtml(e.citation || '')}<br><strong>Key limitation:</strong> ${escapeHtml(e.limitations || '')}`;
}

function renderComparison() {
  document.getElementById('comparisonBody').innerHTML = state.comparison.map(r => `<tr><td><strong>${escapeHtml(r.indicator)}</strong><br><small>${escapeHtml(r.unit || '')}</small></td><td>${escapeHtml(r.government_evidence || 'Not available')}</td><td>${escapeHtml(r.modelled_evidence || 'Not available')}</td><td>${escapeHtml(r.surveyed_evidence || 'PoC survey required')}</td><td>${escapeHtml(r.operational_use || 'Human review required')}</td><td><span class="catalog-status ${escapeHtml(r.status || 'template')}">${escapeHtml(r.status_label || r.status || 'Pending')}</span></td></tr>`).join('');
}

function renderBriefs() {
  const q = state.briefSearch.toLowerCase();
  const items = state.updates.filter(u => state.briefFilter === 'all' || u.category === state.briefFilter).filter(u => [u.title,u.summary,u.body,u.recommendation,u.geography,u.author,...(u.tags||[])].join(' ').toLowerCase().includes(q)).sort((a,b) => String(b.date).localeCompare(String(a.date)));
  document.getElementById('briefGrid').innerHTML = items.length ? items.map(u => `<article class="brief-card" data-category="${escapeHtml(u.category)}">
    <div class="brief-meta"><span>${escapeHtml(u.date)} · ${escapeHtml(u.geography || 'Bayelsa')}</span><span class="status-chip ${escapeHtml(u.status)}">${escapeHtml(u.status)}</span></div>
    <h3>${escapeHtml(u.title)}</h3><p><strong>${escapeHtml(u.summary)}</strong></p><p>${escapeHtml(u.body)}</p>
    ${u.recommendation ? `<div class="brief-extra"><strong>Operational recommendation</strong><p>${escapeHtml(u.recommendation)}</p></div>` : ''}
    ${u.uncertainty ? `<div class="brief-extra"><strong>Uncertainty</strong><p>${escapeHtml(u.uncertainty)}</p></div>` : ''}
    <div class="tags"><span class="${gradeClass(u.evidence_grade)}">${escapeHtml(u.evidence_grade || 'E0')}</span>${(u.tags||[]).map(t => `<span>${escapeHtml(t)}</span>`).join('')}</div>
  </article>`).join('') : '<div class="empty-state">No briefs match the selected filter.</div>';
}

function renderActions() {
  const body = document.getElementById('actionBody');
  const empty = document.getElementById('actionEmpty');
  if (!state.actions.length) { body.innerHTML = ''; empty.hidden = false; return; }
  empty.hidden = true;
  body.innerHTML = state.actions.map(a => `<tr><td>${escapeHtml(a.alert_date)}</td><td>${escapeHtml(a.geography)}</td><td>${escapeHtml(a.trigger)}</td><td>${escapeHtml(a.recommendation)}</td><td>${escapeHtml(a.decision_status)}</td><td>${escapeHtml(a.action_status)}</td><td>U5: ${escapeHtml(a.reached_u5 ?? '—')}<br>Pregnant: ${escapeHtml(a.reached_pregnant ?? '—')}</td><td><span class="evidence-badge ${gradeClass(a.evidence_grade)}">${escapeHtml(a.evidence_grade || 'E0')}</span></td></tr>`).join('');
}

function renderCatalog() {
  const q = state.catalogSearch.toLowerCase();
  const items = state.catalog.filter(d => state.catalogFilter === 'all' || d.status === state.catalogFilter).filter(d => [d.dataset_name,d.purpose,d.source,d.file_name,d.category].join(' ').toLowerCase().includes(q));
  document.getElementById('catalogBody').innerHTML = items.map(d => `<tr><td><strong>${escapeHtml(d.dataset_name)}</strong><br><small>${escapeHtml(d.category)}</small></td><td>${escapeHtml(d.purpose)}</td><td>${escapeHtml(d.format)}${d.geometry ? `<br><small>${escapeHtml(d.geometry)}</small>` : ''}</td><td>${escapeHtml(d.source)}</td><td><span class="evidence-badge ${gradeClass(d.evidence_stage)}">${escapeHtml(d.evidence_stage)}</span></td><td><span class="catalog-status ${escapeHtml(d.status)}">${escapeHtml(d.status_label)}</span></td><td><code>${escapeHtml(d.file_name || 'External link')}</code></td></tr>`).join('');
}

function setupMapModules() {
  const select = document.getElementById('moduleSelect');
  const visibleMaps = state.maps.filter(m => m.enabled !== false);
  select.innerHTML = visibleMaps.map(m => `<option value="${escapeHtml(m.id)}">${escapeHtml(m.title)}</option>`).join('');
  select.onchange = () => selectModule(select.value);
  if (visibleMaps.length) selectModule(visibleMaps[0].id);
}

async function selectModule(id) {
  const module = state.maps.find(m => m.id === id) || state.maps[0];
  if (!module) return;
  document.getElementById('moduleTitle').textContent = module.title;
  document.getElementById('moduleCaption').textContent = module.caption;
  const evidence = document.getElementById('moduleEvidence');
  evidence.textContent = gradeLabel(module.evidence_grade || 'E0');
  evidence.className = `evidence-badge ${gradeClass(module.evidence_grade)}`;
  document.getElementById('moduleValidation').textContent = module.validation_status || 'Not yet validated';
  const sourceLink = document.getElementById('moduleSourceLink');
  if (module.source_url) { sourceLink.href = module.source_url; sourceLink.hidden = false; } else sourceLink.hidden = true;
  renderLegend(module.legend || []);
  mapLayerGroup.clearLayers(); state.activeLayers = [];
  let featureCount = 0; let bounds = [];
  for (const layerDef of (module.layers || [])) {
    const geojson = await safeJson(layerDef.file, { type: 'FeatureCollection', features: [] });
    if (!geojson?.features?.length) continue;
    const layer = L.geoJSON(geojson, {
      pointToLayer: (feature, latlng) => pointStyle(feature, latlng, layerDef.style),
      style: feature => geometryStyle(feature, layerDef.style),
      filter: feature => feature.properties?.public_display !== false,
      onEachFeature: (feature, lyr) => lyr.bindPopup(popupForFeature(feature, layerDef.popup_fields || []))
    }).addTo(mapLayerGroup);
    featureCount += geojson.features.length;
    if (layer.getBounds().isValid()) bounds.push(layer.getBounds());
    state.activeLayers.push(layer);
  }
  const empty = document.getElementById('mapEmpty');
  empty.hidden = featureCount > 0;
  if (bounds.length) {
    let combined = bounds[0];
    bounds.slice(1).forEach(b => combined.extend(b));
    map.fitBounds(combined.pad(.12), { maxZoom: 13 });
  } else map.setView(state.config.map_center || [5.12,6.05], state.config.map_zoom || 9);
}

function pointStyle(feature, latlng, styleName) {
  const colors = { boundary:'#526a73', settlement:'#c97808', catchment:'#7255b7', facility:'#007d68', access:'#2d6cdf', service:'#a3497f', readiness:'#39804a', hotspot:'#b94335', validation:'#8a4aa0', action:'#b94335' };
  const color = colors[styleName] || '#007d68';
  return L.circleMarker(latlng, { radius: 7, color: '#fff', weight: 1.5, fillColor: color, fillOpacity: .88 });
}
function geometryStyle(feature, styleName) {
  const colors = { boundary:'#526a73', settlement:'#c97808', catchment:'#7255b7', facility:'#007d68', access:'#2d6cdf', service:'#a3497f', readiness:'#39804a', hotspot:'#b94335', validation:'#8a4aa0', action:'#b94335' };
  const color = colors[styleName] || '#007d68';
  return { color, weight: 2, opacity: .9, fillColor: color, fillOpacity: .22 };
}
function popupForFeature(feature, fields) {
  const p = feature.properties || {};
  const title = p.name || p.geo_name || p.settlement_name || p.catchment_name || p.community_name || p.facility_name || p.route_name || p.event_id || p.record_id || 'Map record';
  const rows = fields.filter(f => p[f.key] !== undefined && p[f.key] !== null && p[f.key] !== '').map(f => `<span>${escapeHtml(f.label)}</span><span>${escapeHtml(formatValue(p[f.key], f.unit || ''))}</span>`).join('');
  return `<strong>${escapeHtml(title)}</strong><div class="popup-table">${rows}</div>${p.evidence_grade ? `<p><span class="evidence-badge ${gradeClass(p.evidence_grade)}">${escapeHtml(gradeLabel(p.evidence_grade))}</span></p>` : ''}`;
}
function renderLegend(items) {
  document.getElementById('legend').innerHTML = items.map(i => `<span class="legend-item"><i class="legend-swatch" style="background:${escapeHtml(i.color)}"></i>${escapeHtml(i.label)}</span>`).join('');
}
function showFileNotice() {
  const note = document.createElement('div'); note.className = 'file-notice'; note.textContent = 'Local preview mode: JSON fallbacks are active. For full data loading, open index.html with VS Code Live Server or publish with GitHub Pages.'; document.body.appendChild(note); setTimeout(() => note.remove(), 9000);
}
// ==========================================================
// CASCADING GEOGRAPHY SELECTORS
// LGA -> Ward -> Settlement
// ==========================================================

function geographyText(value) {
  return String(
    value ?? ""
  ).trim();
}


function sortGeographyNames(a, b) {
  return a.localeCompare(
    b,
    undefined,
    {
      sensitivity: "base",
      numeric: true
    }
  );
}


function uniqueGeographyValues(values) {
  return [
    ...new Set(
      values
        .map(geographyText)
        .filter(Boolean)
    )
  ].sort(sortGeographyNames);
}


function resetGeographySelect(
  selectElement,
  placeholder,
  disabled = true
) {
  selectElement.innerHTML = "";

  const option =
    document.createElement("option");

  option.value = "";
  option.textContent = placeholder;

  selectElement.appendChild(option);
  selectElement.disabled = disabled;
}


function addGeographyOption(
  selectElement,
  value,
  label,
  additionalData = {}
) {
  const option =
    document.createElement("option");

  option.value = value;
  option.textContent = label;

  Object.entries(
    additionalData
  ).forEach(([key, dataValue]) => {
    option.dataset[key] = dataValue;
  });

  selectElement.appendChild(option);
}


function getSelectedSettlementName() {
  const settlementSelect =
    document.getElementById(
      "editSettlement"
    );

  const selectedOption =
    settlementSelect.options[
      settlementSelect.selectedIndex
    ];

  if (
    !selectedOption ||
    !settlementSelect.value
  ) {
    return "";
  }

  return geographyText(
    selectedOption.dataset.name ||
    selectedOption.textContent
  );
}


function updateGeneratedGeography() {
  const lgaName =
    geographyText(
      document.getElementById(
        "editLga"
      ).value
    );

  const wardName =
    geographyText(
      document.getElementById(
        "editWard"
      ).value
    );

  const settlementName =
    getSelectedSettlementName();

  const geographyInput =
    document.getElementById(
      "editGeography"
    );

  let generatedGeography =
    "Bayelsa State";

  if (lgaName) {
    generatedGeography =
      `${lgaName} LGA, Bayelsa State`;
  }

  if (lgaName && wardName) {
    generatedGeography =
      `${wardName} Ward, ` +
      `${lgaName} LGA, Bayelsa State`;
  }

  if (
    lgaName &&
    wardName &&
    settlementName
  ) {
    generatedGeography =
      `${settlementName}, ` +
      `${wardName} Ward, ` +
      `${lgaName} LGA, Bayelsa State`;
  }

  geographyInput.value =
    generatedGeography;
}


function populateWardSelector() {
  const lgaSelect =
    document.getElementById(
      "editLga"
    );

  const wardSelect =
    document.getElementById(
      "editWard"
    );

  const settlementSelect =
    document.getElementById(
      "editSettlement"
    );

  const selectedLga =
    geographyText(
      lgaSelect.value
    );

  resetGeographySelect(
    settlementSelect,
    "Choose settlement",
    true
  );

  if (!selectedLga) {
    resetGeographySelect(
      wardSelect,
      "Choose ward",
      true
    );

    updateGeneratedGeography();
    return;
  }

  resetGeographySelect(
    wardSelect,
    "Entire LGA / choose ward",
    false
  );

  const wardNames =
    uniqueGeographyValues(
      state.wards
        .filter(record => {
          return (
            record.lga_name ===
            selectedLga
          );
        })
        .map(record => {
          return record.ward_name;
        })
    );

  wardNames.forEach(wardName => {
    addGeographyOption(
      wardSelect,
      wardName,
      wardName
    );
  });

  updateGeneratedGeography();
}


function populateSettlementSelector() {
  const lgaName =
    geographyText(
      document.getElementById(
        "editLga"
      ).value
    );

  const wardName =
    geographyText(
      document.getElementById(
        "editWard"
      ).value
    );

  const settlementSelect =
    document.getElementById(
      "editSettlement"
    );

  if (!lgaName || !wardName) {
    resetGeographySelect(
      settlementSelect,
      "Choose settlement",
      true
    );

    updateGeneratedGeography();
    return;
  }

  const matchingSettlements =
    state.settlements
      .filter(record => {
        return (
          record.lga_name === lgaName &&
          record.ward_name === wardName &&
          !record.settlement_name
            .toLowerCase()
            .startsWith(
              "unnamed grid3 settlement"
            )
        );
      })
      .sort((a, b) => {
        return sortGeographyNames(
          a.settlement_name,
          b.settlement_name
        );
      });

  const uniqueSettlements =
    new Map();

  matchingSettlements.forEach(
    record => {
      if (
        !uniqueSettlements.has(
          record.settlement_id
        )
      ) {
        uniqueSettlements.set(
          record.settlement_id,
          record
        );
      }
    }
  );

  resetGeographySelect(
    settlementSelect,
    uniqueSettlements.size
      ? "Entire ward / choose settlement"
      : "No named settlements available",
    uniqueSettlements.size === 0
  );

  uniqueSettlements.forEach(
    record => {
      addGeographyOption(
        settlementSelect,
        record.settlement_id,
        record.settlement_name,
        {
          name:
            record.settlement_name
        }
      );
    }
  );

  updateGeneratedGeography();
}


function setupGeographySelectors() {
  const lgaSelect =
    document.getElementById(
      "editLga"
    );

  const wardSelect =
    document.getElementById(
      "editWard"
    );

  const settlementSelect =
    document.getElementById(
      "editSettlement"
    );

  if (
    !lgaSelect ||
    !wardSelect ||
    !settlementSelect
  ) {
    return;
  }

  resetGeographySelect(
    lgaSelect,
    "Choose LGA",
    false
  );

  resetGeographySelect(
    wardSelect,
    "Choose ward",
    true
  );

  resetGeographySelect(
    settlementSelect,
    "Choose settlement",
    true
  );

  const lgaNames =
    uniqueGeographyValues(
      state.wards.map(
        record => record.lga_name
      )
    );

  lgaNames.forEach(lgaName => {
    addGeographyOption(
      lgaSelect,
      lgaName,
      lgaName
    );
  });

  lgaSelect.onchange = () => {
    populateWardSelector();
  };

  wardSelect.onchange = () => {
    populateSettlementSelector();
  };

  settlementSelect.onchange = () => {
    updateGeneratedGeography();
  };

  updateGeneratedGeography();
}
function openEditor() { document.getElementById('editorPanel').hidden = false; document.getElementById('editDate').value = new Date().toISOString().slice(0,10); }
function closeEditor() { document.getElementById('editorPanel').hidden = true; }
document.getElementById('openEditor').addEventListener('click', openEditor);
document.getElementById('closeEditor').addEventListener('click', closeEditor);
document.getElementById('closeEditorBackdrop').addEventListener('click', closeEditor);
document.getElementById('resetMap').addEventListener('click', () => map.setView(state.config.map_center || [5.12,6.05], state.config.map_zoom || 9));
document.getElementById('refreshData').addEventListener('click', loadAll);
document.getElementById('briefFilter').addEventListener('change', e => { state.briefFilter = e.target.value; renderBriefs(); });
document.getElementById('briefSearch').addEventListener('input', e => { state.briefSearch = e.target.value; renderBriefs(); });
document.getElementById('catalogFilter').addEventListener('change', e => { state.catalogFilter = e.target.value; renderCatalog(); });
document.getElementById('catalogSearch').addEventListener('input', e => { state.catalogSearch = e.target.value; renderCatalog(); });

document
  .getElementById("updateForm")
  .addEventListener(
    "submit",
    event => {
      event.preventDefault();

      const lgaSelect =
        document.getElementById(
          "editLga"
        );

      const wardSelect =
        document.getElementById(
          "editWard"
        );

      const settlementSelect =
        document.getElementById(
          "editSettlement"
        );

      const settlementOption =
        settlementSelect.options[
          settlementSelect.selectedIndex
        ];

      const entry = {
        id:
          `${document.getElementById("editCategory").value}-` +
          `${Date.now()}`,

        category:
          document.getElementById(
            "editCategory"
          ).value,

        status:
          document.getElementById(
            "editStatus"
          ).value,

        evidence_grade:
          document.getElementById(
            "editGrade"
          ).value,

        date:
          document.getElementById(
            "editDate"
          ).value,

        valid_from:
          document.getElementById(
            "editValidFrom"
          ).value,

        valid_to:
          document.getElementById(
            "editValidTo"
          ).value,

        geography:
          document.getElementById(
            "editGeography"
          ).value.trim(),

        lga_name:
          lgaSelect.value,

        ward_name:
          wardSelect.value,

        settlement_id:
          settlementSelect.value,

        settlement_name:
          settlementOption &&
          settlementSelect.value
            ? geographyText(
                settlementOption.dataset.name ||
                settlementOption.textContent
              )
            : "",

        author:
          document.getElementById(
            "editAuthor"
          ).value.trim(),

        title:
          document.getElementById(
            "editTitle"
          ).value.trim(),

        summary:
          document.getElementById(
            "editSummary"
          ).value.trim(),

        body:
          document.getElementById(
            "editBody"
          ).value.trim(),

        recommendation:
          document.getElementById(
            "editRecommendation"
          ).value.trim(),

        uncertainty:
          document.getElementById(
            "editUncertainty"
          ).value.trim(),

        source_url:
          document.getElementById(
            "editSourceUrl"
          ).value.trim(),

        tags:
          document.getElementById(
            "editTags"
          )
            .value
            .split(",")
            .map(value => value.trim())
            .filter(Boolean)
      };

      state.updates.unshift(entry);

      state.briefFilter = "all";

      document.getElementById(
        "briefFilter"
      ).value = "all";

      renderBriefs();

      event.target.reset();

      setupGeographySelectors();

      document.getElementById(
        "editDate"
      ).value =
        new Date()
          .toISOString()
          .slice(0, 10);

      alert(
        "Brief added to the preview. " +
        "Download the revised JSON to publish it through GitHub."
      );
    }
  );
document.getElementById('downloadJson').addEventListener('click', () => {
  const payload = { version: incrementVersion(state.updateMeta?.version || state.config.version || '1.0'), updated: new Date().toISOString().slice(0,10), updates: state.updates };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'updates.json'; a.click(); URL.revokeObjectURL(url);
});
document.getElementById('reloadJson').addEventListener('click', loadAll);
function incrementVersion(v) { const p = String(v).split('.').map(Number); return `${p[0] || 1}.${(p[1] || 0) + 1}`; }

document.querySelectorAll('.site-nav a').forEach(link => link.addEventListener('click', () => { document.querySelectorAll('.site-nav a').forEach(a => a.classList.remove('active')); link.classList.add('active'); }));

loadAll();
