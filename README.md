# Interview Scheduler

Using the latest tools and techniques, we build and test a React application that allows users to book and cancel interviews. We combine a concise API with a WebSocket server to build a realtime experience. 

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## Running Cypress Visual Testbed

1. Clone the scheduler-api repo: 

```sh
https://github.com/lighthouse-labs/scheduler-api
```

2. Run API server in test mode:

```sh
npm run test:server
```

3. Send a GET request to reset the DB:

```sh
curl http://localhost:8001/api/debug/reset
```

4. Run Cypress:

```sh
npm run cypress
```

## Dependencies

* Axios
* Classnames
* Normalize
* React
* Storybook
* Cypress
* Jest

## Demo
### Create Appointment
![Create Appointment](docs/scheduler%20create%20interview.gif)
### Edit Appointment
![Edit Appointment](docs/scheduler%20edit.gif)
### Delete Appointment
![Delete Appointment](docs/scheduler%20delete.gif)