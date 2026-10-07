# Requirements Traceability Matrix (RTM) - HeatWaveGuard

**Project**: HeatWaveGuard Climate Intelligence & Early Warning System  
**Document Version**: 1.0.0  

---

| Requirement ID | Requirement Description | Target Module | Associated Test Case IDs | Testing Level / Type | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **REQ-01** | Dataset Loading & Non-Destructive Parsing | Data Explorer | TC-001, TC-002, test_ds_01 | Unit + Integration | **Pass** |
| **REQ-02** | Search, Sort & Multi-Filtering | Data Explorer | TC-003, TC-004, test_ds_03, test_ds_04 | Functional + Unit | **Pass** |
| **REQ-03** | Deterministic Heatwave Risk Scoring Engine | Risk Assessment | TC-005, TC-006, test_tc_u01 – u22 | Unit + Boundary | **Pass** |
| **REQ-04** | Risk Level Classification (Low, Mod, High, Extreme) | Risk Assessment | TC-006, test_bva_risk_score_classification_boundaries | Boundary + Decision Table | **Pass** |
| **REQ-05** | Early Warning Alert Generation ($\ge 50$ Score) | Early Warning | TC-008, test_tc_u11, test_tc_u12 | Functional + UI | **Pass** |
| **REQ-06** | Potential Climate Hotspots Identification | Hotspot Analysis | TC-009, test_an_04 | Integration + Functional | **Pass** |
| **REQ-07** | Data Validation & Error Masking | Data Validation | TC-010, TC-011, TC-012, test_val_01 – 10 | Unit + Security | **Pass** |
| **REQ-08** | Response Time Performance SLAs | System Performance | TC-013, test_perf_01, test_perf_02, test_perf_03 | Performance | **Pass** |
