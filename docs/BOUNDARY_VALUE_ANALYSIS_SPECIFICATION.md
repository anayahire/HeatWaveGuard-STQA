# Boundary Value Analysis Specification - HeatWaveGuard

**Project**: HeatWaveGuard Climate Intelligence & Early Warning System  

---

## 1. Temperature Threshold Boundary Value Table

| Boundary Threshold | Nominal / Just Below | Boundary Value | Just Above | Tier Points & Behavior |
| :--- | :--- | :--- | :--- | :--- |
| **Moderate Temp Threshold (30.0°C)** | $29.99°C$ (+5 pts) | $30.00°C$ (+20 pts) | $30.01°C$ (+20 pts) | **+15 Point Tier Jump** at exactly $30.00°C$ |
| **High Temp Threshold (33.0°C)** | $32.99°C$ (+20 pts) | $33.00°C$ (+35 pts) | $33.01°C$ (+35 pts) | **+15 Point Tier Jump** at exactly $33.00°C$ |
| **Very High Temp Threshold (35.0°C)** | $34.99°C$ (+35 pts) | $35.00°C$ (+45 pts) | $35.01°C$ (+45 pts) | **+10 Point Tier Jump** at exactly $35.00°C$ |

---

## 2. Risk Score Classification Level Boundary Table

| Risk Level Category | Score Range | Boundary Min | Boundary Max | Warning Alert Required? |
| :--- | :--- | :---: | :---: | :---: |
| **Low Risk** | $0 – 24$ | **0** | **24** | **No** |
| **Moderate Risk** | $25 – 49$ | **25** | **49** | **No** |
| **High Risk** | $50 – 74$ | **50** | **74** | **Yes** |
| **Extreme Risk** | $75 – 100$ | **75** | **100** | **Yes** |

---

## 3. Input Validation Boundary Table

| Parameter | Min Valid Boundary | Max Valid Boundary | Invalid Below Min | Invalid Above Max | System Response |
| :--- | :---: | :---: | :---: | :---: | :--- |
| **Humidity (%)** | `0.0%` | `100.0%` | `-0.1%` | `100.1%` | Rejected with HTTP 400 |
| **Rainfall (mm)** | `0.0 mm` | `500.0 mm` | `-0.1 mm` | `500.1 mm` | Rejected with HTTP 400 |
| **Temperature (°C)** | `-10.0°C` | `60.0°C` | `-10.1°C` | `60.1°C` | Rejected with HTTP 400 |
