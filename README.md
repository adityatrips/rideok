# RideOk API endpoints

## Auth

POST /api/auth/register

- name
- email
- password
- phone
- username

POST /api/auth/login

- email
- password

## User

- GET /api/user?uid=&lt;uid&gt;
- PATCH /api/user?uid=&lt;uid&gt;
- DELETE /api/user?uid=&lt;uid&gt;
