# HeatWaveGuard: Climate Intelligence and Early Warning System

[![STQA Mini Project](https://img.shields.io/badge/Course-Software%20Testing%20%26%20QA-blue.svg)](docs/PROJECT_OVERVIEW.md)
[![Tests Status](https://img.shields.io/badge/pytest-82%20passed%20%2F%20100%25-success.svg)](docs/TEST_EXECUTION_REPORT.md)
[![Code Coverage](https://img.shields.io/badge/coverage-89%25-brightgreen.svg)](docs/TEST_EXECUTION_REPORT.md)
[![License](https://img.shields.io/badge/Academic-Prototype-orange.svg)](#academic-prototype-disclaimer)

**HeatWaveGuard** is an academic mini-project developed for a **Software Testing and Quality Assurance (STQA)** course. It consists of a functional web application for climate monitoring and heatwave early warnings (the **System Under Test / SUT**) coupled with a comprehensive software testing and quality assurance framework.

---

## Academic Prototype Disclaimer

> [!IMPORTANT]
> **Academic Prototype Notice**:
> HeatWaveGuard is strictly an academic mini-project prototype.
> - The Heatwave Risk Score is computed using an explainable, deterministic rule-based model for academic demonstration and does **NOT** represent official meteorological warnings (such as India Meteorological Department / IMD alerts).
> - The application does **NOT** provide official medical advice or emergency advisory services.
> - Geographic hotspot mapping is evaluated strictly based on historical dataset attribute thresholds; geographic map coordinates are not present in the dataset and are not fabricated.

---

## Problem Statement

Heatwaves are increasingly important extreme-weather events that affect public health, agriculture, water ecosystems, and socioeconomic activity. Software applications monitoring climatic conditions must accurately identify dangerous heat events, visualize historical trends, and issue early warnings.

As an STQA mini-project, the objective is to build the climate monitoring application (the SUT) and demonstrate how Software Testing and Quality Assurance techniques—such as Unit Testing, Boundary Value Analysis (BVA), Equivalence Partitioning (EP), Decision Tables, Integration Testing, Regression Testing, Performance Latency SLAs, and Input Security Fuzzing—can be systematically applied to validate its correctness, reliability, usability, security, and performance.

---

## Dataset Description

The application processes a historical dataset named `climate_probabilistic_latent_variable_dataset.csv`:
- **Records**: 1,000 meteorological rows.
- **Attributes**: 15 columns (`Year`, `Month`, `Day`, `Season`, `Temperature_C`, `Humidity_pct`, `Pressure_hPa`, `Wind_Speed_kmph`, `Cloud_Cover_pct`, `Rainfall_mm`, `Visibility_km`, `Solar_Radiation_Wm2`, `Air_Quality_Index`, `Dew_Point_C`, `Climate_Condition`).
- **Missing Values**: 0 (Complete dataset).
- **Climate Conditions**: `Normal` (549), `Cool` (292), `Rainy` (130), `Hot` (23), `Cloudy` (6).
- **Non-Destructive File Policy**: The original dataset file remains 100% untouched.

---

## Technology Stack

- **Backend**: Python 3.9+, Flask, Flask-CORS, Pandas
- **Frontend**: React 18, Vite, Recharts, Lucide React, Custom CSS Design System (Glassmorphism, Dark Mode)
- **Testing Framework**: `pytest`, `pytest-cov`, Flask Test Client, Requests, Playwright

---

## Deterministic Heatwave Risk Logic

The risk engine computes a score from **0 to 100** based on configurable parameters:
- **Temperature**: $<30°C$ (+5), $30–33°C$ (+20), $33–35°C$ (+35), $\ge 35°C$ (+45)
- **Humidity**: $<45\%$ (0), $45–60\%$ (+8), $60–75\%$ (+15), $\ge 75\%$ (+20)
- **Dew Point**: $<15°C$ (0), $15–20°C$ (+5), $20–25°C$ (+10), $\ge 25°C$ (+15)
- **Rainfall Mitigation**: $0\text{ mm}$ (0), $>0\le 20\text{ mm}$ (-10), $>20\text{ mm}$ (-20)
- **Season**: `Summer` (+10), `Monsoon` (+5), `Winter`/`Post-Monsoon` (0)
- **Climate Condition**: `Hot` (+20), `Normal` (+5), `Cloudy` (0), `Cool` (-10), `Rainy` (-15)

### Risk Classification
- **0–24**: Low Risk (Green)
- **25–49**: Moderate Risk (Amber)
- **50–74**: High Risk (Orange)
- **75–100**: Extreme Risk (Red)

---

## Application Modules

1. **Module 1 — Dashboard**: Summary metrics (total records, avg/max temp, avg humidity, hot count, high-risk count), pie charts, and active warnings.
2. **Module 2 — Climate Data Explorer**: Searchable, sortable, paginated table with season, condition, year, and risk level multi-filtering.
3. **Module 3 — Temperature Analytics**: Line charts for monthly trends, seasonal comparisons, and yearly hot-day frequencies.
4. **Module 4 — Heatwave Risk Assessment**: Interactive weather parameter calculator with live validation error messaging and factor breakdown.
5. **Module 5 — Hotspot Analysis**: Filtered high-risk climate records with geographic disclaimers.
6. **Module 6 — Early Warning Alert**: Automatic academic prototype warning banner trigger for risk scores $\ge 50$.
7. **Module 7 — Data Validation**: Input boundary checks preventing application crashes on invalid inputs.
8. **Module 8 — STQA Quality Portal**: Interactive UI view showing real-time test execution status, RTM matrix, defect logs, and coverage stats.

---

## Installation & Local Execution

### 1. Prerequisites
Ensure Python 3.9+ and Node.js 18+ are installed.

### 2. Install Dependencies
```bash
# Install Python backend dependencies
python3 -m pip install -r requirements.txt

# Install React frontend dependencies
cd frontend
npm install
cd ..
```

### 3. Run Backend API Server
```bash
python3 -m backend.app.main
```
*Backend API runs at `http://127.0.0.1:5000`.*

### 4. Run Frontend Application
In a separate terminal:
```bash
cd frontend
npm run dev
```
*Frontend opens at `http://localhost:3000`.*

---

## Running Automated QA Tests & Coverage

Execute the complete automated test suite (82 test cases):

```bash
# Run all tests
python3 -m pytest -v

# Run tests with code coverage report
python3 -m pytest --cov=backend/app --cov-report=term-missing
```

### Test Suite Structure (`tests/`)
- `tests/unit/`: Unit tests for risk calculator, validator, dataset, and analytics services.
- `tests/boundary/`: Boundary Value Analysis tests (29.99, 30.00, 32.99, 33.00, 34.99, 35.00, humidity 0/100).
- `tests/equivalence/`: Equivalence partitioning test suite.
- `tests/decision_table/`: Decision table test scenarios.
- `tests/functional/`: API endpoint functional tests.
- `tests/integration/`: Data flow integration tests.
- `tests/regression/`: Regression test suite runner.
- `tests/performance/`: Sub-millisecond latency benchmark tests ($< 500\text{ ms}$ SLA).
- `tests/security/`: Input fuzzing, injection protection, and stack trace masking tests.

---

## Project Structure

```
stqa_miniproject/
├── backend/
│   └── app/
│       ├── main.py                  # Flask application factory
│       ├── routes/                  # API route blueprints (dataset, analytics, risk, qa, health)
│       ├── services/                # Business logic (risk_service, dataset_service, analytics_service)
│       ├── utils/                   # Input validation (validator.py)
│       └── data/
│           └── climate_dataset.csv  # Backend dataset copy
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── index.css                 # CSS Design System
│       ├── components/               # Navbar, MetricCard, EarlyWarningBanner, Pagination
│       ├── pages/                    # Dashboard, Explorer, Analytics, Risk, Hotspot, QA Portal
│       └── services/api.js           # API client
├── tests/                           # 82 automated test cases across 9 testing levels
├── docs/                            # 13 formal QA documentation artifacts
├── climate_probabilistic_latent_variable_dataset.csv # Original untouched dataset
├── requirements.txt
└── README.md
```

---

## QA Artifacts Documentation (`docs/`)

The `docs/` directory contains 13 formal STQA Markdown artifacts:
1. [`PROJECT_OVERVIEW.md`](docs/PROJECT_OVERVIEW.md)
2. [`SOFTWARE_REQUIREMENTS_SPECIFICATION.md`](docs/SOFTWARE_REQUIREMENTS_SPECIFICATION.md)
3. [`TEST_PLAN.md`](docs/TEST_PLAN.md)
4. [`TEST_CASES.md`](docs/TEST_CASES.md)
5. [`TEST_SCENARIOS.md`](docs/TEST_SCENARIOS.md)
6. [`TRACEABILITY_MATRIX.md`](docs/TRACEABILITY_MATRIX.md)
7. [`DEFECT_REPORT.md`](docs/DEFECT_REPORT.md)
8. [`TEST_EXECUTION_REPORT.md`](docs/TEST_EXECUTION_REPORT.md)
9. [`PERFORMANCE_TEST_REPORT.md`](docs/PERFORMANCE_TEST_REPORT.md)
10. [`SECURITY_TEST_REPORT.md`](docs/SECURITY_TEST_REPORT.md)
11. [`USABILITY_TEST_REPORT.md`](docs/USABILITY_TEST_REPORT.md)
12. [`USER_MANUAL.md`](docs/USER_MANUAL.md)
13. [`FUTURE_SCOPE.md`](docs/FUTURE_SCOPE.md)
