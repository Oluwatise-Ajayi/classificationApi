# classificationApi# Number Classification API

This API takes a number and returns interesting mathematical properties about it, along with a fun fact.

## Technology Stack
- Node.js
- Express
- Axios
- CORS

## API Specification

### Endpoint
`GET /api/classify-number?number=<your-number>`

### Required JSON Response Format (200 OK)
```json
{
  "number": 371,
  "is_prime": false,
  "is_perfect": false,
  "properties": ["armstrong", "odd"],
  "digit_sum": 11,
  "fun_fact": "371 is an Armstrong number because 3^3 + 7^3 + 1^3 = 371"
}
```

### Required JSON Response Format (400 Bad Request)
```json
{
  "number": "alphabet",
  "error": true
}
```

## Setup Instructions
1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Start the server with `node server.js`.
4. Access the API at `http://localhost:3000/api/classify-number?number=<your-number>`.






