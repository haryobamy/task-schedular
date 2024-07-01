# Distributed Task Scheduler

The Distributed Task Scheduler allows clients to register and schedule tasks for execution. Tasks can be one-time or recurring. The scheduler ensures that tasks are executed within 10 seconds of their scheduled time. The system is designed for high availability, durability, and scalability.

## Overview

### Core Components

1. **Task Registry Service**

   - Function: Accepts task registrations from clients.
   - API Endpoints:
     - `POST /tasks`: Registers a task on the system.
     - `GET /tasks`: Gets all tasks.
   - Data Storage: Stores task metadata in a distributed database.

2. **Task Scheduler**

   - Function: Continuously checks for tasks nearing their execution time and dispatches them for execution.
   - Data Storage: Reads task schedules from the distributed database.

3. **Task Executor**

   - Function: Executes tasks and logs the execution time.
   - Data Storage: Logs task execution details.

4. **Distributed Database**

   - Function: Stores task metadata and execution logs using MongoDB database.

5. **Load Balancer (Optional)**

   - Function: Distributes incoming requests to the Task Registry Service across multiple instances.

6. **Message Queue (Optional)**
   - Function: Buffers tasks for execution to ensure they are executed within the required timeframe.
   - Example: Kafka, Redis.

### Task Lifecycle

1. **Registration**: Clients register tasks via the Task Registry Service.
2. **Scheduling**: The Task Scheduler checks for tasks due for execution.
3. **Execution**: The Task Executor picks up tasks from the scheduler and executes them.
4. **Logging**: Execution details are logged in the distributed database.

### High Availability and Durability

- **High Availability**: Multiple instances of Task Registry Service, Task Scheduler, and Task Executor ensure redundancy.
- **Durability**: All task metadata and logs are stored in a distributed database, ensuring data is not lost.

### Scaling

- **Scale-Up**: Add more instances of Task Registry Service, Task Scheduler, and Task Executor to handle increased load.
- **Scale-Down**: Remove instances during low load periods.
- **Chokepoints**:
  - Database performance under heavy load can be a chokepoint. Use of sharding and replication can mitigate this.
  - Network latency between components can affect performance. Ensuring components are co-located in the same region/data center can help.

### Cost-Effectiveness

- **Instance Management**: Use auto-scaling groups to manage the number of instances based on load.
- **Serverless Options**: Consider using serverless functions (e.g., AWS Lambda) for the Task Executor to reduce costs.

### Tradeoffs

- **Simplicity vs. Flexibility**: Keeping the design simple to ensure maintainability but at the cost of potential future flexibility.
- **Immediate vs. Guaranteed Execution**: Ensuring tasks are picked up within 10 seconds can require over-provisioning resources during peak times.

### Additional Features (Extra Credit)

- **Current Scheduled Tasks View**: List of all currently scheduled tasks.
- **Edit Task Schedule**: Ability to update the schedule of an existing task.
- **Delete Task**: Ability to remove a scheduled task.

## Prototype Instructions

### Prerequisites

- Docker
- Docker Compose

### Steps to Run

1. **Clone the Repository**:

   ```sh
   git clone <repository-url>
   cd distributed-task-scheduler
   ```

2. **Build Docker Images**:

   ```sh
   docker-compose build
   ```

3. **Run the Containers**:

   ```sh
   docker-compose up
   ```

4. **Access the UI**:
   Open [http://localhost:5173](http://localhost:5173) in your browser.

## Prototype Components

1. **Backend (TypeScript, Express)**:

   - Handles task registration and scheduling.
   - API endpoints for task operations.

2. **Frontend (React, Vite)**:
   - GUI for creating, scheduling, and viewing tasks.
   - Separate view for executed tasks.

## Directory Structure

```plaintext
distributed-task-scheduler/
├── server/
│   ├── src/
│   └── Dockerfile
├── client/
│   ├── src/
│   └── Dockerfile
├── docker-compose.yml
└── README.md

POST /tasks
Content-Type: application/json

{
    "name": "Daily report generation",
    "type": "one-time",
    "time": "2024-07-01T02:32:59.509Z",
    "cron": "0 9 * * *"
}


GET /tasks

DELETE /tasks/:id

PUT /tasks/:id
Content-Type: application/json

{
  "time": "2024-07-02T12:00:00Z"
}



Feel free to customize the README further based on any additional specifics or changes you make to the project.



```
