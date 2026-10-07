# Defect Management & Defect Reports - HeatWaveGuard

**Project**: HeatWaveGuard Climate Intelligence & Early Warning System  

---

## 1. Defect Report Template

| Field Name | Description |
| :--- | :--- |
| **Defect ID** | Unique identifier (e.g. `DEF-001`) |
| **Title** | Concise summary of defect |
| **Module** | Affected application module |
| **Description** | Detailed explanation of failure behavior |
| **Steps to Reproduce** | Sequential steps required to reproduce defect |
| **Expected Result** | Specified correct system behavior |
| **Actual Result** | Observed incorrect system behavior |
| **Severity** | Critical / High / Medium / Low |
| **Priority** | High / Medium / Low |
| **Environment** | OS, Python version, Browser |
| **Status** | New / Open / Fixed / Verified / Closed |
| **Resolution** | Fix description and code reference |

---

## 2. Resolved Defect Log

### Defect Log 1: DEF-001
- **Title**: Dew Point exceeding ambient Temperature accepted by validation layer
- **Module**: Data Validation (`validator.py`)
- **Severity**: High | **Priority**: High
- **Steps to Reproduce**:
  1. Submit POST `/api/risk/assess` with `temperature = 25.0°C` and `dew_point = 35.0°C`.
- **Expected Result**: System rejects input because physically dew point cannot exceed ambient temperature by $> 2°C$.
- **Actual Result**: System accepted input and generated unphysical heat index output.
- **Status**: **Closed / Resolved**
- **Resolution**: Added physical validation check in `validator.py` (`dew_point <= temperature + 2.0°C`).

---

### Defect Log 2: DEF-002
- **Title**: Negative rainfall input returns HTTP 500 internal server error
- **Module**: Risk Assessment API (`risk.py`)
- **Severity**: Medium | **Priority**: Medium
- **Steps to Reproduce**:
  1. Submit POST `/api/risk/assess` with `rainfall = -25.0 mm`.
- **Expected Result**: System returns HTTP 400 Bad Request with validation error message.
- **Actual Result**: System triggered unhandled exception returning HTTP 500.
- **Status**: **Closed / Resolved**
- **Resolution**: Added non-negative boundary check in `validator.py` (`rainfall >= 0.0 mm`), returning friendly HTTP 400 error.
