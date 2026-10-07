# STQA Master Documentation & Methodology Guide - HeatWaveGuard

**Project**: HeatWaveGuard Climate Intelligence & Early Warning System  
**Course Domain**: Software Testing and Quality Assurance (STQA)  

---

## 1. Testing Strategy

The quality assurance strategy for HeatWaveGuard centers on rigorous, multi-layered verification of the System Under Test (SUT). The strategy guarantees that:
1. Business logic (Heatwave Risk Engine) is 100% deterministic, mathematically verifiable, and explainable.
2. Data validation layer prevents malformed or malicious inputs from causing backend server crashes or stack trace exposures.
3. System response times strictly meet performance SLAs ($< 500\text{ ms}$ for risk evaluation).
4. Code coverage is measured empirically ($89\%$ achieved via `pytest-cov`).

---

## 2. Testing Levels Implemented

1. **Unit Testing**: Tests isolated functions (`calculate_heatwave_risk`, `validate_risk_assessment_input`, `query_records`, `get_temperature_trends`).
2. **Integration Testing**: Verifies communication between API routes, service modules, dataset provider, and validator.
3. **Functional Testing**: Verifies feature compliance (dashboard stats, dataset search, multi-filtering, sorting, pagination, risk calculation, warning generation).
4. **System Testing**: End-to-end user workflows evaluated via API client and browser scenarios.
5. **Regression Testing**: Rerunning the regression test suite across updates to ensure consistent outputs.

---

## 3. Testing Techniques Applied

- **Boundary Value Analysis (BVA)**: Evaluates decision boundary points ($29.99°C, 30.00°C, 32.99°C, 33.00°C, 34.99°C, 35.00°C$, humidity $0\%, 100\%$, risk level transitions at scores $24, 25, 49, 50, 74, 75$).
- **Equivalence Partitioning (EP)**: Divides input ranges into valid and invalid partitions.
- **Decision Table Testing**: Evaluates combinations of temperature, humidity, dew point, rainfall, and climate condition.
- **Negative Testing**: Evaluates invalid inputs (negative rainfalls, humidity $>100\%$, dew point exceeding temperature, string/null types).
- **Performance Latency SLAs**: Benchmarks sub-millisecond API response times.
- **Security Fuzzing**: Validates script injection safety and stack trace masking on HTTP 400/404/500 errors.
- **Usability Testing**: Assesses responsive glassmorphism UI, color contrast, and clear error messaging.

---

## 4. Automation Strategy

- **Test Framework**: `pytest` 8.4+
- **Coverage Tool**: `pytest-cov` / `coverage`
- **Execution Command**:
  ```bash
  python3 -m pytest --cov=backend/app --cov-report=term-missing
  ```
- All automated test cases reside in the structured `tests/` directory (`tests/unit/`, `tests/boundary/`, `tests/equivalence/`, `tests/decision_table/`, `tests/functional/`, `tests/integration/`, `tests/regression/`, `tests/performance/`, `tests/security/`).

---

## 5. Defect Management & Resolution

Defects logged during development were tracked using a formal defect template:
- **DEF-001** (High): Dew point exceeding temperature by $> 2°C$ accepted by validator $\rightarrow$ **Fixed** in `validator.py`.
- **DEF-002** (Medium): Negative rainfall input returning HTTP 500 error $\rightarrow$ **Fixed** in `validator.py`.
- **Current Open Defects**: **0**.

---

## 6. Quality Metrics Summary

- **Total Test Cases**: 82 automated test cases (52 documented in formal test case repository table)
- **Execution Rate**: 100%
- **Pass Rate**: 100.0% (82 passed, 0 failed, 0 blocked)
- **Code Coverage**: 89%
- **Risk API Latency**: 0.27 ms (SLA $< 500\text{ ms}$)
