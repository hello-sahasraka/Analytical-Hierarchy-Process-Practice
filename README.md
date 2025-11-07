# AHP Practice

Lightweight AHP (Analytic Hierarchy Process) server. POST a decision problem to the endpoint to compute priority vectors and consistency metrics.

## Files
- [index.js](index.js)
- [package.json](package.json)
- [src/utils/ahs.js](src/utils/ahs.js)
- [src/utils/computeConsistancyRatio.js](src/utils/computeConsistancyRatio.js)
- [src/utils/computePriorityVector.js](src/utils/computePriorityVector.js) — contains the geometric-mean implementation [`weightVectorGeometricMean`](src/utils/computePriorityVector.js)
- [src/utils/pairwiseMatrix.js](src/utils/pairwiseMatrix.js)
- [src/utils/validateMatrix.js](src/utils/validateMatrix.js)

## Quick start

1. Install dependencies:
```sh
npm install
```

2. Start the server:
```sh
npm start
# or
node index.js
```

The API listens on the base URL used by the project (example below uses port 5000).

## API

POST http://localhost:5000/api/v1/ahp

Content-Type: application/json

Request body format:
```json
{
  "criteriaNames": ["Experience", "Technical Skill", "Communication", "Compensation Fit"],
  "alternativeNames": ["Alice", "Bob", "Carol"],
  "dataMatrix": [
    [5, 7, 8, 6],
    [3, 5, 9, 9],
    [7, 9, 6, 5]
  ],
  "benefitFlags": [true, true, true, true]
}
```

Example curl:
```sh
curl -X POST http://localhost:5000/api/v1/ahp \
  -H "Content-Type: application/json" \
  -d @sample.json
```

## What it computes

- Criteria/alternative priority vectors using the geometric mean method implemented in [`weightVectorGeometricMean`](src/utils/computePriorityVector.js).
- Consistency metrics via [`src/utils/computeConsistancyRatio.js`](src/utils/computeConsistancyRatio.js).
- Input validation via [`src/utils/validateMatrix.js`](src/utils/validateMatrix.js) and pairwise matrix utilities in [`src/utils/pairwiseMatrix.js`](src/utils/pairwiseMatrix.js).

Geometric mean formula used:
$g_i = \left(\prod_{j=1}^n a_{ij}\right)^{1/n}$

Normalized priority:
$$w_i = \frac{g_i}{\sum_{k=1}^n g_k}$$

## Notes
- Ensure `dataMatrix` rows correspond to items being compared and that the matrix is positive and reciprocal where required.
- See [src/utils/ahs.js](src/utils/ahs.js) and [index.js](index.js) for the exact request/response wiring.
