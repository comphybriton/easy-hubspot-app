# Shopify ↔ HubSpot Embedded App (React Router) - Implementation Plan

## Overview

Build a production-ready Shopify Embedded App using React Router, Shopify Polaris, App Bridge, NestJS, PostgreSQL, Redis/BullMQ, and HubSpot APIs.

---

# Updated Architecture

```text
┌─────────────────────────┐
│ Shopify Admin           │
│ Embedded App            │
└──────────┬──────────────┘
           │
           ▼
┌─────────────────────────┐
│ React Router App        │
│                         │
│ Routes                  │
│ Loaders                 │
│ Actions                 │
└──────────┬──────────────┘
           │
           ▼
┌─────────────────────────┐
│ Node.js Backend         │
│                         │
│ Shopify APIs            │
│ HubSpot APIs            │
│ Queue Service           │
└──────────┬──────────────┘
           │
           ▼
┌─────────────────────────┐
│ PostgreSQL             │
│ Redis / BullMQ         │
└─────────────────────────┘
```

---

# Recommended Technology Stack

## Frontend

- React Router v7
- TypeScript
- Shopify Polaris
- Shopify App Bridge
- TanStack Query

## Backend

- Node.js
- NestJS
- TypeScript

## Database

- PostgreSQL
- Prisma ORM

## Queue

- BullMQ
- Redis

## Infrastructure

- AWS ECS
- AWS RDS
- ElastiCache
- CloudWatch

---

# Monorepo Structure

```text
shopify-hubspot-app
│
├── apps
│   ├── web
│   │   ├── app
│   │   ├── routes
│   │   ├── components
│   │   └── lib
│   │
│   └── api
│       ├── src
│       ├── modules
│       └── workers
│
├── packages
│   ├── shared-types
│   ├── sdk-shopify
│   └── sdk-hubspot
│
└── prisma
```

---

# React Router Route Design

```text
/
├── dashboard
├── connections
├── sync
├── mappings
├── logs
├── settings
```

## Route Files

```text
app/routes

dashboard.tsx
connections.tsx
sync.tsx
logs.tsx
settings.tsx
mappings.tsx
```

---

# Dashboard

Route:

```text
/dashboard
```

Widgets:

- Customers
- Orders
- Products
- Sync Health
- Connection Status

Data:

- Store Information
- HubSpot Status
- Last Sync
- Records Synced
- Recent Errors

---

# Connection Management

Route:

```text
/connections
```

Merchant View:

```text
✅ Shopify Connected
❌ HubSpot Not Connected
```

Flow:

```text
React Router
    ↓
NestJS API
    ↓
HubSpot OAuth
    ↓
Authorization Code
    ↓
Access Token
```

---

# Customer Sync Module

Shopify Events:

- customers/create
- customers/update

Flow:

```text
Webhook
   ↓
Queue
   ↓
Sync Job
   ↓
HubSpot Contact
```

Entity:

```typescript
Customer {
  shopifyCustomerId
  email
  firstName
  lastName
}
```

---

# Order Sync Module

Events:

- orders/create
- orders/paid
- orders/updated

Flow:

```text
Shopify Order
      ↓
HubSpot Deal
```

Example:

```text
Order #12345
Amount: $250
Status: Paid
```

---

# Product Sync Module

Events:

- products/create
- products/update

Mapping:

```text
Shopify Product
      ↓
HubSpot Product
```

Database Mapping:

```sql
shopify_product_id
hubspot_product_id
```

---

# Queue Architecture

```text
Webhook
   ↓
BullMQ
   ↓
Worker
   ↓
HubSpot API
```

Queues:

- customer-sync
- order-sync
- product-sync
- retry-sync

Benefits:

- Retry Handling
- Rate Limiting
- Error Recovery
- Scalability

---

# Database Design

## stores

```sql
id
shop_domain
access_token
status
created_at
```

## hubspot_connections

```sql
id
store_id
portal_id
access_token
refresh_token
expires_at
```

## sync_jobs

```sql
id
store_id
type
status
payload
started_at
completed_at
```

## sync_logs

```sql
id
job_id
level
message
```

## field_mappings

```sql
id
store_id
shopify_field
hubspot_field
```

---

# NestJS Modules

```text
AuthModule
ShopifyModule
HubSpotModule
WebhookModule
SyncModule
QueueModule
AuditModule
```

Folder Structure:

```text
src/modules

auth
shopify
hubspot
sync
webhook
audit
```

---

# API Endpoints

## OAuth

```http
GET  /oauth/shopify
GET  /oauth/hubspot
GET  /oauth/hubspot/callback
```

## Dashboard

```http
GET /api/dashboard
```

## Sync

```http
POST /api/sync/customers
POST /api/sync/orders
POST /api/sync/products
```

## Logs

```http
GET /api/logs
```

---

# Webhook Endpoints

## Shopify

```http
POST /webhooks/customers
POST /webhooks/orders
POST /webhooks/products
POST /webhooks/app-uninstalled
```

## HubSpot (Phase 2)

```http
POST /webhooks/hubspot
```

---

# Polaris Pages

## Dashboard

- Cards
- Metrics
- Badges

## Connections

- Connected Accounts
- OAuth Actions

## Sync

- Run Sync
- Sync History
- Retry Failed Jobs

## Logs

- Search
- Filter
- Export

## Settings

- Webhook Settings
- Field Mapping
- Sync Rules

---

# Sprint Breakdown

## Sprint 1

- React Router Setup
- Shopify Embedded App
- App Bridge
- Polaris

## Sprint 2

- HubSpot OAuth
- Connection Screen
- Database

## Sprint 3

- Customer Sync
- Webhook Handling
- BullMQ

## Sprint 4

- Order Sync
- Product Sync
- Dashboard Metrics

## Sprint 5

- Logs
- Retry Queue
- Error Handling

## Sprint 6

- Performance Testing
- Security Review
- Production Deployment

---

# Recommended V1 Scope

## Include

- Shopify Installation
- HubSpot OAuth
- Dashboard
- Customer Sync
- Order Sync
- Product Sync
- Sync Logs
- Retry Queue
- App Uninstall Cleanup

## Defer to V2

- Two-way Synchronization
- HubSpot Webhooks
- Custom Field Mapping
- Shopify Metafields
- Marketing Automation
- Multi-Store Management

---

# Estimated Timeline

- 6 Sprints
- Approximately 10–12 Weeks
- Small Team Delivery Ready
