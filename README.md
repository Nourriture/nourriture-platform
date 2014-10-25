nourriture-platform
===================

Repository for the Nourriture platform.

The Nourriture platform is the backend of our system. It provides REST API to developers.

Please, refer to the architecture diagram
(http://tinyurl.com/qattlat).

API Table (will be updated continuously during development):
┌────────┬────────────────────┬──────────────┐
│        │ Name               │ Path         │
├────────┼────────────────────┼──────────────┤
│ POST   │ postcompany        │ /company/    │
├────────┼────────────────────┼──────────────┤
│ GET    │ getcompany         │ /company     │
├────────┼────────────────────┼──────────────┤
│ GET    │ getcompanyid       │ /company/:id │
├────────┼────────────────────┼──────────────┤
│ PUT    │ putcompanyid       │ /company/:id │
├────────┼────────────────────┼──────────────┤
│ DELETE │ deletecompanyid    │ /company/:id │
└────────┴────────────────────┴──────────────┘