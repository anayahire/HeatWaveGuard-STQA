# Test Plan - HeatWaveGuard

**Document ID**: TP-HWG-01  
**Project**: HeatWaveGuard Climate Intelligence and Early Warning System  
**System Under Test (SUT)**: HeatWaveGuard Web Application  

---

## 1. Introduction & Objectives

The primary goal of this Test Plan is to define the testing strategy, test levels, toolchains, entry/exit criteria, and test deliverables for verifying the correctness, performance, security, and usability of HeatWaveGuard.

---

## 2. Test Strategy & Scope

### 2.1 In-Scope Testing Levels
1. **Unit Testing**: Verifying deterministic risk engine functions, validator utility logic, dataset queries, and statistical calculations.
2. **Boundary Value Analysis (BVA)**: Testing precise decision thresholds (e.g. 29.99°C vs 30.00°C, 32.99°C vs 33.00°C, 34.99°C vs 35.00°C, humidity 0% vs 100%).
3. **Equivalence Partitioning (EP)**: Validating valid and invalid input domains.
4. **Decision Table Testing**: Evaluating combination rules for heatwave risk calculation.
5. **Functional Testing**: End-to-end endpoint verification, filtering, sorting, pagination, and alert rendering.
6. **Integration Testing**: Data flow across API -> Service -> Dataset layers.
7. **Regression Testing**: Rerunning regression test suite across code updates.
8. **Performance Testing**: Benchmarking API latencies against target SLAs.
9. **Security Testing**: Input fuzzing, SQL/script injection string safety, stack trace masking.
10. **Usability Testing**: Accessibility, color contrast, responsive layout, clear error messages.

---

## 3. Test Tooling & Environment

| Layer | Tool / Framework | Purpose |
| :--- | :--- | :--- |
| **Backend Test Runner** | `pytest` 8.4+ | Automated test execution |
| **Coverage Tool** | `pytest-cov` / `coverage` | Code coverage measurement |
| **API Client Testing** | Flask `test_client` | Endpoint functional verification |
| **Performance Benchmark** | Python `time` module | Sub-millisecond latency measurement |
| **E2E Automation** | `playwright` | Browser automation scenarios |

---

## 4. Entry and Exit Criteria

### 4.1 Entry Criteria
- Dataset file `climate_dataset.csv` loaded into backend environment.
- Backend dependencies installed (`flask`, `pandas`, `pytest`, `pytest-cov`).
- Test scripts compiled without syntax errors.

### 4.2 Exit Criteria
- 100% of defined automated test cases executed.
- Minimum 85% backend code coverage achieved (Actual: 89%).
- Zero open Critical or High severity defects.
- All performance latency SLAs satisfied ($< 500\text{ ms}$ risk API).
