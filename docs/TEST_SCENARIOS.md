# Test Scenarios Specification - HeatWaveGuard

**Project**: HeatWaveGuard Climate Intelligence & Early Warning System  
**System Under Test (SUT)**: HeatWaveGuard Web Application  

---

## High-Level System Test Scenarios

### TS-01: End-to-End Climate Analyst Workflow
1. User opens HeatWaveGuard Web Application landing dashboard.
2. User reviews total record count, average temperature, and active high-risk early warning banners.
3. User navigates to **Data Explorer** and searches for "Summer" records with "Hot" climate condition.
4. User sorts records by `Temperature_C` descending.
5. User selects top row detail modal to inspect exact meteorological parameters.
6. User navigates to **Risk Assessment** page and inputs custom weather parameters ($35.5°C$ temperature, $78\%$ humidity, $26°C$ dew point, $0\text{ mm}$ rainfall).
7. User triggers **Calculate Heatwave Risk Score**.
8. System displays **Score: 95/100 (Extreme Risk)** with academic early warning alert banner and contributing factors list.

### TS-02: Negative Testing & Fault Tolerance Scenario
1. User enters invalid humidity ($125\%$) in Risk Assessment form.
2. User submits evaluation form.
3. System intercepts input gracefully in validation layer (`validator.py`), returning friendly error message `"Humidity must be between 0% and 100%"`.
4. User corrects humidity to $65\%$ and re-submits successfully without backend crashes or stack trace exposures.
