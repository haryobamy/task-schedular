# Distributed Task Scheduler

## Overview

The distributed task scheduler allows clients to register tasks to be executed at a specified time or on a recurring schedule using Cron syntax. The system will ensure that tasks are executed within 10 seconds of their scheduled time and is designed for high availability and durability.

## High-Level Architecture

The system is composed of several key components:

- **Task Registration Service**: Handles client requests to register, update, or delete tasks.
- **Task Storage**: A durable data store for persisting task details.
- **Scheduler**: Manages task scheduling and ensures tasks are executed at the correct time.
- **Executor**: Picks up tasks from the scheduler and executes them.
- **Logging Service**: Logs task executions for auditing and monitoring purposes.
- **User Interface**: A web interface for clients to interact with the system.

## Components and Communication

### Task Registration Service

- **API**: Provides endpoints for task registration, updating, and deletion.
- **Communication**: Interacts with the Task Storage to persist task details.

### Task Storage

- **Database**: A distributed database (e.g.MongoDb, Cassandra, DynamoDB) to ensure durability and high availability.
- **Data Model**: Stores task details including type (one-time or recurring), execution time or Cron expression, and status.

### Scheduler

- **Task Retrieval**: Periodically queries the Task Storage to retrieve tasks due for execution.
- **Queueing**: Enqueues tasks to be picked up by the Executor.

### Executor

- **Task Execution**: Picks tasks from the queue and executes them.
- **Communication**: Updates the Task Storage with execution status and interacts with the Logging Service.

### Logging Service

- **API**: Provides endpoints for logging task execution details.
- **Storage**: A separate log storage (e.g., Elasticsearch) for querying execution logs.

### User Interface

- **Frontend**: A React-based web interface for clients to register, view, update, and delete tasks.
- **Backend**: A backend service to support the UI, interacting with the Task Registration Service and Logging Service.

## Scaling Considerations

### High Availability

- **Redundancy**: Deploy multiple instances of each component to ensure no single point of failure.
- **Load Balancing**: Use load balancers to distribute client requests across multiple instances of the Task Registration Service and the Executor.

### Durability

- **Replication**: Use a distributed database with data replication to ensure durability of task data.
- **Backup**: Regular backups of the Task Storage to recover from data loss.

### Scalability

- **Horizontal Scaling**: Scale out by adding more instances of the Task Registration Service, Scheduler, and Executor as the load increases.
- **Sharding**: Shard the Task Storage to distribute the load across multiple nodes.

## Cost-Effectiveness

### Resource Utilization

- **Auto-Scaling**: Use auto-scaling groups to adjust the number of instances based on the current load, reducing costs during low demand.
- **Serverless Components**: Where applicable, use serverless components (e.g., AWS Lambda) to handle sporadic workloads efficiently.

### Open-Source Tools

- Leverage open-source tools and frameworks (e.g., React, Node.js) to minimize licensing costs.

## Potential Chokepoints

- **Task Retrieval Frequency**: The frequency of querying the Task Storage by the Scheduler can become a bottleneck. Optimizing query intervals and using efficient querying mechanisms are crucial.
- **Executor Throughput**: The Executor's ability to process tasks quickly enough to meet the 10-second execution window. Scaling executors and optimizing task processing logic will be necessary.

## Tradeoffs

- **Consistency vs. Availability**: Choosing a database that prioritizes availability and partition tolerance (AP in the CAP theorem) may introduce eventual consistency in task data.
- **Complexity vs. Cost**: Using sophisticated distributed databases and auto-scaling mechanisms increases complexity but reduces the risk of downtime and improves cost-effectiveness.

## Prototype Implementation

### Technology Stack

- **Frontend**: React, TypeScript
- **Backend**: Node.js, Express.js, TypeScript
- **Database**: MongoDB (for simplicity in the prototype)
- **Task Scheduler**: node-cron
- **Containerization**: Docker

### Prototype Features

- Register one-time and recurring tasks.
- Display a list of scheduled tasks.
- Edit and delete tasks.
- Log executed tasks with timestamps.

## Running the Prototype

### Prerequisites

- Docker
- Docker Compose

### Steps

1. Clone the repository.
2. Navigate to the project directory.
3. Build and run the containers:
   ```sh
   docker-compose up --build
   ```
