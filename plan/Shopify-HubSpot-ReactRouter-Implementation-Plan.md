# Shopify ↔ HubSpot Embedded App Implementation Guide

## Overview

Build a production-grade Shopify Embedded App using:

- React Router v7
- Shopify Polaris
- Shopify App Bridge
- Shopify Admin UI Extensions
- NestJS
- PostgreSQL
- BullMQ + Redis
- HubSpot OAuth & CRM APIs

---

# Solution Architecture

```text
┌─────────────────────────────┐
│ Shopify Admin               │
│                             │
│ Embedded App (React Router) │
│ Admin UI Extensions         │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│ NestJS API                  │
│ Shopify Service             │
│ HubSpot Service             │
│ Sync Service                │
│ Queue Service               │
└──────────────┬──────────────┘
               │
       ┌───────┴────────┐
       │                │
       ▼                ▼
 PostgreSQL         Redis/BullMQ
       │
       ▼
 HubSpot APIs
```

## Step 1 - Create Shopify App

```bash
npm init @shopify/app@latest
```

Select:

```text
App Name: shopify-hubspot-sync
Framework: React Router
Embedded App: Yes
Language: TypeScript
```

```bash
pnpm install
pnpm shopify app dev
```

## Step 2 - Create Navigation

Routes:

```text
app/routes
├── dashboard.tsx
├── field-mapping.tsx
├── sync.tsx
├── health.tsx
├── settings.tsx
└── logs.tsx
```

## Step 3 - Connect HubSpot

Database table:

```sql
hubspot_connections
id
store_id
portal_id
access_token
refresh_token
expires_at
```

## Step 4 - Create Sync Dashboard

Route:

```text
/dashboard
```

API:

```http
GET /api/dashboard
```

## Step 5 - Build Field Mapping UI

Route:

```text
/field-mapping
```

Database:

```sql
field_mappings
id
store_id
shopify_field
hubspot_property
direction
```

## Step 6 - Register Shopify Webhooks

Required:

```text
customers/create
customers/update
orders/create
orders/updated
products/create
products/update
app/uninstalled
```

## Step 7 - Implement Queue System

```bash
pnpm add bullmq ioredis
```

Queues:

```text
customer-sync
order-sync
product-sync
retry-sync
```

## Step 8 - Create Workers

```text
CustomerSyncWorker
OrderSyncWorker
ProductSyncWorker
```

## Step 9 - Retry Queue

```typescript
attempts: 5
```

Backoff:

```text
5s
30s
2m
5m
15m
```

## Step 10 - Manual Re-Sync

Route:

```text
/sync
```

## Step 11 - Sync Health Monitoring

Route:

```text
/health
```

## Step 12 - Shopify Admin UI Extension

```bash
shopify app generate extension
```

Select:

```text
Admin UI Extension
```

## Step 13 - Logging Screen

Route:

```text
/logs
```

## Step 14 - Database Design

```sql
stores
hubspot_connections
field_mappings
sync_jobs
sync_logs
sync_metrics
product_mappings
customer_mappings
order_mappings
```

## MVP Roadmap

### Sprint 1
- Shopify App Setup
- Embedded App
- HubSpot OAuth
- Dashboard

### Sprint 2
- Customer Sync
- Queue Infrastructure
- Logging

### Sprint 3
- Product Sync
- Order Sync

### Sprint 4
- Field Mapping
- Retry Queue
- Health Monitoring

### Sprint 5
- Admin UI Extension
- Manual Re-Sync
- Production Hardening
