# WebSocket Load Test Report - Chat Application

This document summarizes load testing for a WebSocket-based chat application using [k6](https://k6.io/). Tests evaluate performance under high concurrent user load. This README will be updated as the project evolves with additional API tests.

## Test Overview

- **Tool**: k6
- **Protocol**: WebSocket with STOMP
- **Endpoint**: `ws://localhost:8081/ws-chat-native`
- **Behavior**: Connect, subscribe to `/topic/conversation/conv001`, send 5 messages to `/app/send/conv001`, wait 3s, disconnect.
- **Duration**: 2m 30s

## Load Stages

| Stage | Duration | Target VUs |
|-------|----------|------------|
| Ramp-up | 30s      | 100        |
| Hold    | 30s      | 300        |
| Hold    | 30s      | 700        |
| Peak    | 30s      | 1000       |
| Ramp-down | 30s    | 0          |

## Test Results

| Metric                     | Value                     |
|----------------------------|---------------------------|
| **Total Checks**           | 12,232 (98.34% success)   |
| **Failed Checks**          | 203 (1.65%, status 101)   |
| **Iteration Duration**     | Avg: 5.36s, Max: 11.01s  |
| **Iterations**             | 12,232 (78.98/s)         |
| **Virtual Users**          | Max: 1000, Min: 1        |
| **Data Received**          | 49 MB (318 kB/s)         |
| **Data Sent**              | 4.2 MB (27 kB/s)         |
| **WS Connection Time**     | Avg: 438.31ms, Max: 6.01s|
| **WS Messages Received**   | 95,436 (616.18/s)        |
| **WS Messages Sent**       | 18,785 (121.28/s)        |
| **WS Session Duration**    | Avg: 5.36s, Max: 11.01s |

## Observations

- **Scalability**: Handled 1000 VUs with 98.34% success.
- **Performance**: Reasonable connection times, but max 6.01s indicates potential bottlenecks.
- **Failures**: 1.65% failures (status 101) need investigation.

## Future Plans

- Investigate status 101 failures.
- Optimize connection times.
- Test additional APIs (REST, authentication).
- Conduct longer and higher-load tests.

## How to Run

1. Install [k6](https://k6.io/docs/getting-started/installation/).
2. Clone this repository.
3. Run: `k6 run load-test.js`

## Feedback

Open an issue or submit a pull request for suggestions or contributions.