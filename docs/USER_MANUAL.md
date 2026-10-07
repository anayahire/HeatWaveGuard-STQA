# User Manual - HeatWaveGuard

**Project**: HeatWaveGuard Climate Intelligence & Early Warning System  

---

## 1. Getting Started

### Prerequisites
- Python 3.9+
- Node.js 18+ and npm

### Installation & Launch

1. **Start Backend Server**:
   ```bash
   python3 -m backend.app.main
   ```
   *Backend runs on `http://127.0.0.1:5000`.*

2. **Start Frontend Server**:
   ```bash
   cd frontend
   npm run dev
   ```
   *Frontend opens on `http://localhost:3000`.*

---

## 2. Using Application Modules

1. **Dashboard**: View overall historical dataset statistics, average temperature, humidity, and condition distributions.
2. **Climate Data Explorer**: Search by keywords, apply filters (Season, Condition, Risk Level), sort columns, and paginate through records.
3. **Analytics**: View interactive charts illustrating monthly temperature trends, seasonal comparisons, and yearly hot-day counts.
4. **Risk Assessment**: Enter custom values for Temperature, Humidity, Dew Point, Rainfall, Season, and Condition. Click **Calculate Heatwave Risk Score** to inspect explainable contributing factors and academic warnings.
5. **Hotspot Analysis**: Use sliders to adjust minimum temperature and risk score thresholds to identify extreme historical records.
6. **STQA Quality Portal**: Inspect real-time test execution results, code coverage, RTM, and defect logs.
