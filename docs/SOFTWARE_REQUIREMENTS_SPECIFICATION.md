# Software Requirements Specification (SRS) - HeatWaveGuard

**Document Version**: 1.0.0  
**Project Title**: HeatWaveGuard Climate Intelligence & Early Warning System  
**System Under Test (SUT)**: HeatWaveGuard Web Application  

---

## 1. Functional Requirements

| Req ID | Requirement Title | Module | Detailed Description | Verification Method |
| :--- | :--- | :--- | :--- | :--- |
| **REQ-01** | Dataset Loading & Parsing | Data Explorer | System shall load the 1,000-row historical CSV dataset (`climate_dataset.csv`) upon startup without modifying the source file. | Unit + Integration Test |
| **REQ-02** | Search & Filtering | Data Explorer | System shall allow multi-parameter filtering by Season, Climate Condition, Heatwave Risk Level, Year, and keyword text search with pagination. | Functional Test |
| **REQ-03** | Deterministic Risk Engine | Risk Assessment | System shall compute a deterministic Heatwave Risk Score (0–100) using Temperature, Humidity, Dew Point, Rainfall, Season, and Climate Condition. | Unit + Boundary Test |
| **REQ-04** | Risk Classification | Risk Assessment | System shall classify scores into Low (0-24), Moderate (25-49), High (50-74), and Extreme Risk (75-100). | Unit + BVA Test |
| **REQ-05** | Early Warning Alert | Early Warning | System shall issue a visible warning banner when calculated risk score $\ge 50$ (High or Extreme Risk). | Functional + UI Test |
| **REQ-06** | Potential Climate Hotspots | Hotspot Analysis | System shall filter historical records matching temperature $\ge 30°C$ or risk score $\ge 50$, presenting a geographic coordinate disclaimer. | Integration Test |
| **REQ-07** | Input Data Validation | Data Validation | System shall reject out-of-bounds numbers, negative rainfalls, humidity $> 100\%$, dew point $> \text{temperature} + 2°C$, and invalid categories with friendly HTTP 400 responses. | Unit + Security Test |
| **REQ-08** | QA Portal Dashboard | Testing / QA | System shall present dynamic QA test execution metrics, RTM, defect reports, and code coverage metrics. | Integration Test |

---

## 2. Non-Functional Requirements

### 2.1 Performance Requirements
- **NFR-PERF-01**: The Heatwave Risk Assessment API endpoint (`POST /api/risk/assess`) must return responses in $< 500\text{ ms}$.
- **NFR-PERF-02**: Standard data query endpoints (`GET /api/records`) must load in $< 2,000\text{ ms}$.
- **NFR-PERF-03**: Dashboard summary endpoint (`GET /api/dashboard/stats`) must respond in $< 1,000\text{ ms}$.

### 2.2 Reliability & Fault Tolerance
- **NFR-REL-01**: Normal invalid user input must **never** crash the Flask backend or expose Python stack traces.
- **NFR-REL-02**: Global HTTP 400, 404, 405, and 500 error handlers must sanitize error output.

### 2.3 Usability & Accessibility
- **NFR-USA-01**: Color-coded risk status badges (Green, Amber, Orange, Red) must be visually distinguishable.
- **NFR-USA-02**: Responsive glassmorphism layout must adjust across mobile, tablet, and desktop viewports.
