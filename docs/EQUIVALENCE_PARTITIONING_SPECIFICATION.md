# Equivalence Partitioning Specification - HeatWaveGuard

**Project**: HeatWaveGuard Climate Intelligence & Early Warning System  

---

## Equivalence Partitions Table

| Attribute | Valid Equivalence Partition (Valid Input) | Invalid Equivalence Partition (Invalid Low) | Invalid Equivalence Partition (Invalid High) | System Handling |
| :--- | :--- | :--- | :--- | :--- |
| **Temperature (°C)** | $-10.0°C \le \text{Temp} \le 60.0°C$ | $\text{Temp} < -10.0°C$ | $\text{Temp} > 60.0°C$ | HTTP 400 Validation Error |
| **Humidity (%)** | $0.0\% \le \text{Hum} \le 100.0\%$ | $\text{Hum} < 0.0\%$ | $\text{Hum} > 100.0\%$ | HTTP 400 Validation Error |
| **Dew Point (°C)** | $-20.0°C \le \text{Dew} \le 45.0°C$ and $\text{Dew} \le \text{Temp} + 2°C$ | $\text{Dew} < -20.0°C$ | $\text{Dew} > 45.0°C$ or $\text{Dew} > \text{Temp} + 2°C$ | HTTP 400 Validation Error |
| **Rainfall (mm)** | $0.0\text{ mm} \le \text{Rain} \le 500.0\text{ mm}$ | $\text{Rain} < 0.0\text{ mm}$ | $\text{Rain} > 500.0\text{ mm}$ | HTTP 400 Validation Error |
| **Pressure (hPa)** | $900.0 \le \text{Press} \le 1100.0$ | $\text{Press} < 900.0$ | $\text{Press} > 1100.0$ | HTTP 400 Validation Error |
| **Wind Speed (km/h)** | $0.0 \le \text{Wind} \le 150.0$ | $\text{Wind} < 0.0$ | $\text{Wind} > 150.0$ | HTTP 400 Validation Error |
| **Month** | $1 \le \text{Month} \le 12$ | $\text{Month} < 1$ | $\text{Month} > 12$ | HTTP 400 Validation Error |
| **Day** | $1 \le \text{Day} \le 31$ | $\text{Day} < 1$ | $\text{Day} > 31$ | HTTP 400 Validation Error |
| **Climate Condition** | `['Normal', 'Cool', 'Rainy', 'Hot', 'Cloudy']` | N/A | Category string not in allowed enum list (e.g. `'Freezing'`) | HTTP 400 Validation Error |
