import {
  Page,
  Card,
  Text,
  InlineGrid,
  BlockStack,
  Button,
  Badge,
} from "@shopify/polaris";

export default function Dashboard() {
  const dashboardData = {
    shopifyConnected: true,
    hubspotConnected: false,

    customersSynced: 1250,
    ordersSynced: 3420,
    productsSynced: 580,

    lastSync: "25 Sep 2026 09:15 AM",

    shopifyApiStatus: "Healthy",
    hubspotApiStatus: "Disconnected",
  };

  return (
    <Page
      title="HubSpot Integration Dashboard"
      subtitle="Monitor and manage your Shopify to HubSpot integration"
    >
      <BlockStack gap="500">

        {/* Connection Status */}
        <InlineGrid columns={2} gap="400">
          <Card>
            <BlockStack gap="200">
              <Text variant="headingMd" as="h2">
                Shopify Connection
              </Text>

              <Badge tone="success">
                Connected
              </Badge>
            </BlockStack>
          </Card>

          <Card>
            <BlockStack gap="200">
              <Text variant="headingMd" as="h2">
                HubSpot Connection
              </Text>

              <Badge
                tone={
                  dashboardData.hubspotConnected
                    ? "success"
                    : "critical"
                }
              >
                {dashboardData.hubspotConnected
                  ? "Connected"
                  : "Not Connected"}
              </Badge>
            </BlockStack>
          </Card>
        </InlineGrid>

        {/* Sync Statistics */}
        <Card>
          <BlockStack gap="400">
            <Text variant="headingMd" as="h2">
              Sync Statistics
            </Text>

            <InlineGrid columns={3} gap="400">
              <Card>
                <BlockStack gap="100">
                  <Text variant="headingLg" as="p">
                    {dashboardData.customersSynced}
                  </Text>

                  <Text as="p">
                    Customers Synced
                  </Text>
                </BlockStack>
              </Card>

              <Card>
                <BlockStack gap="100">
                  <Text variant="headingLg" as="p">
                    {dashboardData.ordersSynced}
                  </Text>

                  <Text as="p">
                    Orders Synced
                  </Text>
                </BlockStack>
              </Card>

              <Card>
                <BlockStack gap="100">
                  <Text variant="headingLg" as="p">
                    {dashboardData.productsSynced}
                  </Text>

                  <Text as="p">
                    Products Synced
                  </Text>
                </BlockStack>
              </Card>
            </InlineGrid>
          </BlockStack>
        </Card>

        {/* Last Sync */}
        <Card>
          <BlockStack gap="200">
            <Text variant="headingMd" as="h2">
              Last Synchronisation
            </Text>

            <Text as="p">
              {dashboardData.lastSync}
            </Text>
          </BlockStack>
        </Card>

        {/* API Health */}
        <Card>
          <BlockStack gap="200">
            <Text variant="headingMd" as="h2">
              API Health
            </Text>

            <Text as="p">
              Shopify API: {dashboardData.shopifyApiStatus}
            </Text>

            <Text as="p">
              HubSpot API: {dashboardData.hubspotApiStatus}
            </Text>
          </BlockStack>
        </Card>

        {/* Quick Actions */}
        <Card>
          <BlockStack gap="300">
            <Text variant="headingMd" as="h2">
              Quick Actions
            </Text>

            <InlineGrid columns={3} gap="300">
              <Button variant="primary">
                Sync Customers
              </Button>

              <Button>
                Sync Orders
              </Button>

              <Button>
                Sync Products
              </Button>
            </InlineGrid>
          </BlockStack>
        </Card>

      </BlockStack>
    </Page>
  );
}