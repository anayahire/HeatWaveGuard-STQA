# Regression Test Suite - HeatWaveGuard

**Project**: HeatWaveGuard Climate Intelligence & Early Warning System  
**Test Runner**: `pytest`  

---

## 1. Regression Suite Overview

The Regression Test Suite contains critical test cases that verify deterministic scoring consistency, dataset integrity, and API contract preservation after any code update.

### Primary Regression Test Cases:
1. `tests/regression/test_regression.py::test_reg_01_dataset_integrity`
2. `tests/regression/test_regression.py::test_reg_02_deterministic_scoring_consistency`
3. `tests/regression/test_regression.py::test_reg_03_dashboard_statistics`
4. `tests/unit/test_risk_service.py` (22 core risk calculation tests)
5. `tests/boundary/test_boundary_analysis.py` (11 decision boundary tests)
6. `tests/functional/test_functional_routes.py` (6 API endpoint tests)

---

## 2. Regression Execution Command

To execute the complete regression test suite:

```bash
python3 -m pytest tests/regression/ tests/unit/ tests/boundary/ -v
```
