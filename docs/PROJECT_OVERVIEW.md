# Project Overview - HeatWaveGuard

**Project Title**: HeatWaveGuard: Climate Intelligence and Early Warning System  
**Course Domain**: Software Testing and Quality Assurance (STQA) Academic Mini-Project  
**Domain**: Climate Intelligence, Meteorological Monitoring, Heatwave Prediction & Early Warning  
**System Under Test (SUT)**: HeatWaveGuard Web Application (React + Flask + Pandas)

---

## 1. Problem Statement

Heatwaves are extreme meteorological events characterized by prolonged periods of abnormally high temperatures, often accompanied by elevated relative humidity. Heatwaves pose severe threats to public health (heat exhaustion, heatstroke), agricultural productivity, water resources, and energy grids.

In climate intelligence software development, there is an urgent need to build monitoring systems capable of:
1. Processing historical meteorological records.
2. Evaluating heat-stress indices deterministically.
3. Identifying high-risk climate hotspots.
4. Issuing transparent early-warning alerts.

However, as a System Under Test (SUT), such climate software must undergo rigorous Software Testing and Quality Assurance (STQA) to ensure that decision logic is correct, input validation is fault-tolerant, API response times satisfy SLAs, and no malformed data causes system failure.

---

## 2. Project Objectives

1. **System Under Test (SUT) Development**:
   - Ingest and validate a historical dataset containing 1,000 meteorological records (`climate_dataset.csv`).
   - Implement searchable, sortable, and paginated data exploration.
   - Provide statistical temperature trends and seasonal comparisons.
   - Implement a deterministic, explainable rule-based Heatwave Risk Score (0–100) engine.
   - Classify conditions into: **Low Risk**, **Moderate Risk**, **High Risk**, and **Extreme Risk**.
   - Generate academic early warning alerts when risk is High or Extreme ($\ge 50/100$).
   - Identify high-risk climate records (hotspots) with explicit disclaimers regarding geographic coordinate availability.

2. **Quality Assurance & Testing Framework**:
   - Establish comprehensive automated testing using `pytest` and `pytest-cov`.
   - Enforce Boundary Value Analysis (BVA), Equivalence Partitioning (EP), and Decision Table testing.
   - Verify performance latency SLAs ($< 500\text{ ms}$ for risk evaluation).
   - Ensure application security (input fuzzing, stack trace masking, error handling).
   - Author formal QA documentation artifacts (Test Plan, SRS, Test Cases, RTM, Defect Reports, Execution Reports).

---

## 3. Academic Prototype Disclaimer

> [!IMPORTANT]
> **Academic Prototype Notice**:
> HeatWaveGuard is an academic mini-project developed exclusively for Software Testing and Quality Assurance evaluation.
> - The risk score logic is an explainable rule-based academic model and does **NOT** represent official meteorological warnings (such as India Meteorological Department / IMD alerts).
> - The system does **NOT** provide real-world medical advisory services.
> - Geographic hotspot analysis is evaluated strictly on historical dataset attribute thresholds; geographic map coordinates are not fabricated.
