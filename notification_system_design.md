# Stage 1

## Notification System REST API Design

The notification system should support the following operations:

- Create notifications
- Fetch notifications
- Mark notifications as read
- Delete notifications
- Filter notifications
- Real-time notification delivery

---

## Base URL

```http
/api/v1/notifications
```

---

## Create Notification

### Endpoint

```http
POST /api/v1/notifications
```

### Request Body

```json
{
  "userId": "USR101",
  "title": "Server Down",
  "message": "Production server is not responding",
  "type": "alert",
  "priority": "high"
}
```

### Response

```json
{
  "success": true,
  "message": "Notification created successfully"
}
```

---

## Fetch Notifications

### Endpoint

```http
GET /api/v1/notifications/:userId
```

### Example

```http
GET /api/v1/notifications/USR101
```

### Response

```json
{
  "success": true,
  "notifications": []
}
```

---

## Mark Notification as Read

### Endpoint

```http
PATCH /api/v1/notifications/:id/read
```

---

## Delete Notification

### Endpoint

```http
DELETE /api/v1/notifications/:id
```

---

## Real-Time Notifications

WebSockets can be used for sending notifications instantly to users without refreshing the page.

Advantages:

- Faster updates
- Better user experience
- Reduced API polling

---

# Stage 2

## Scaling the Notification System

If the number of users increases, the notification system should still work properly without delays. To handle more users and notifications, the system needs to be scalable.

Initially a single server may work fine, but when traffic increases it can become slow. So the application should be divided into multiple services.

---

## Components Used

The notification system can contain:

- API server
- Notification service
- Database
- WebSocket server
- Redis
- Queue system

Each component handles a separate task which improves performance and maintenance.

---

## Notification Flow

1. User performs some action
2. Backend receives request
3. Notification is created
4. Notification is stored in database
5. Notification is pushed to queue
6. User receives notification instantly

---

## Real Time Notifications

For real-time updates, WebSockets are better than normal API polling.

With WebSockets, the client stays connected to the server continuously. Whenever a notification is created, it can be sent immediately to the user.

Advantages:

- Faster updates
- Better user experience
- Less repeated requests
- Lower delay

---

## Why Polling is Not Efficient

In polling, frontend keeps sending requests repeatedly to check for updates.

Problems:

- Too many unnecessary requests
- Increased server load
- Delayed notification updates
- Bandwidth wastage

Because of this, WebSockets are preferred for large scale systems.

---

## Redis Pub/Sub

Redis Pub/Sub can be used for communication between services.

For example, if one server creates a notification, it publishes the event through Redis. Other servers subscribed to Redis can receive the event and send notifications to connected users.

This helps when multiple backend servers are running.

---

## Queue System

A queue system like RabbitMQ or Kafka can improve performance.

Instead of processing notifications immediately in the request cycle, notifications are added to queue and processed separately.

Benefits:

- Faster API response
- Better handling of heavy traffic
- Retry support for failed notifications
- Reduced server blocking

---

## Database Optimization

As notification count increases, database queries may become slower.

To improve performance:

- Add indexes
- Use read replicas
- Separate old notification records
- Optimize queries

This helps improve both read and write speed.

---

## Caching

Redis cache can store frequently used data such as:

- unread notification count
- recent notifications
- active sessions

This reduces database load and improves response speed.

---

## Horizontal Scaling

If traffic increases further, multiple server instances can be added.

A load balancer distributes requests between servers.

This improves:

- availability
- scalability
- reliability

---

## Failure Handling

The system should also handle failures properly.

Some methods:

- Retry failed notifications
- Store queue data safely
- Monitor server health
- Prevent data loss

---

## Monitoring

Monitoring tools can be used to track:

- failed notifications
- API response time
- queue size
- active WebSocket connections
- database performance

This helps identify issues quickly.

---

## Conclusion

Using WebSockets, Redis, queue systems, and database optimization can help build a scalable notification system that can handle large numbers of users efficiently.