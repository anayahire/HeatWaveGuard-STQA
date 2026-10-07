# Decision Table Specification - Heatwave Risk Logic

**Project**: HeatWaveGuard Climate Intelligence & Early Warning System  
**System Under Test (SUT)**: HeatWaveGuard Web Application  

---

## 1. Decision Table Overview

Decision Table testing verifies combinations of input conditions against specified system actions/outputs.

### Input Conditions:
- **C1: High Temperature?** ($\ge 33.0°C$)
- **C2: High Humidity?** ($\ge 60\%$)
- **C3: High Dew Point?** ($\ge 20.0°C$)
- **C4: Heavy Rainfall Present?** ($> 20\text{ mm}$ - Cooling Effect)
- **C5: Severe Climate Condition (Hot)?**

### Output Actions:
- **A1: Assign Extreme Risk (Score $\ge 75$)**
- **A2: Assign High Risk (Score $50–74$)**
- **A3: Assign Moderate Risk (Score $25–49$)**
- **A4: Assign Low Risk (Score $0–24$)**
- **A5: Trigger Academic Early Warning Banner**

---

## 2. Decision Table Rules Matrix

| Condition / Action | Rule 1 | Rule 2 | Rule 3 | Rule 4 | Rule 5 | Rule 6 |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **C1: Temp $\ge 33.0°C$?** | **Y** | **Y** | **Y** | **N** | **N** | **N** |
| **C2: Humidity $\ge 60\%$?** | **Y** | **Y** | **N** | **Y** | **N** | **N** |
| **C3: Dew Point $\ge 20.0°C$?** | **Y** | **Y** | **N** | **N** | **N** | **N** |
| **C4: Heavy Rain ($> 20\text{ mm}$)?** | **N** | **Y** | **N** | **N** | **N** | **Y** |
| **C5: Condition == 'Hot'?** | **Y** | **Y** | **N** | **N** | **N** | **N** |
| **Output Risk Level** | **Extreme Risk** | **High Risk** | **Moderate Risk** | **Moderate Risk** | **Low Risk** | **Low Risk** |
| **A5: Early Warning Alert?** | **Yes** | **Yes** | **No** | **No** | **No** | **No** |

---

## 3. Decision Table Test Verification

These rules are programmatically tested in `tests/decision_table/test_decision_tables.py`:
- **Rule 1 (Extreme Risk)**: Temp = 36°C, Hum = 80%, Dew = 26°C, Rain = 0mm, Hot $\rightarrow$ **Score 95 (Extreme Risk)**
- **Rule 2 (Mitigated High Risk)**: Temp = 33.5°C, Hum = 65%, Dew = 21°C, Rain = 30mm, Hot $\rightarrow$ **Score 75 vs 95 without rain (Mitigated Risk)**
- **Rule 3 (Moderate Risk)**: Temp = 31°C, Hum = 50%, Dew = 16°C, Rain = 0mm, Normal $\rightarrow$ **Score 48 (Moderate Risk)**
- **Rule 4 (Low Risk)**: Temp = 16°C, Hum = 40%, Dew = 8°C, Rain = 0mm, Cool $\rightarrow$ **Score 0 (Low Risk)**
