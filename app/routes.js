import { index, route } from "@react-router/dev/routes";

export default [
  index("./routes/dashboard.jsx"),

  route("field-mapping", "./routes/field-mapping.jsx"),
  route("sync", "./routes/sync.jsx"),
  route("health", "./routes/health.jsx"),
  route("settings", "./routes/settings.jsx"),
  route("logs", "./routes/logs.jsx"),
];