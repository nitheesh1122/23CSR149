# Stage 1

## Notification System REST API Design

The notification system should support the following core actions:

- Create notifications
- Fetch user notifications
- Mark notifications as read
- Delete notifications
- Filter notifications by type or priority
- Real-time notification delivery

---

## Base URL

```http
/api/v1/notifications