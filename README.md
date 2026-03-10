# n8n-nodes-pushmark

This is an n8n community node. It allows you to send instant push notifications to mobile devices via the [Pushmark](https://pushmark.app/) API directly from your n8n workflows.

Pushmark is a developer-friendly, lightning-fast notification service designed to keep you updated on CI/CD pipelines, server alerts, cron jobs, and custom automation flows without complex setups.

[n8n](https://n8n.io/) is a fair-code licensed workflow automation tool.

## Installation

To install this custom node on your self-hosted n8n instance:

1. Go to your n8n interface.
2. Click on **Settings** in the left menu.
3. Click on **Community Nodes**.
4. Click **Install**.
5. Enter `n8n-nodes-pushmark` in the enter package name field.
6. Click **Install**.

## Operations

* **Send Notification**: Send a real-time push notification to a specific channel.
    * Define the **Channel Hash** (Target).
    * Select the **Message Type** (Info, Warning, Error, Success).
    * Compose your **Message**.

## Usage/Credentials

This node is designed to be plug-and-play and completely frictionless. **It does not require global n8n credentials.** Instead of dealing with global API keys, Pushmark securely routes notifications using a unique `Channel Hash`. Simply drop the node into your workflow, enter your specific Channel Hash obtained from the Pushmark dashboard, and you are ready to send alerts.

## Compatibility

Tested against n8n version 1.0.0 and above.

## Resources

* [Pushmark Official Website](https://pushmark.app/)
* [n8n Community Nodes Documentation](https://docs.n8n.io/integrations/community-nodes/)
* [GitHub Repository](https://github.com/Velqorio/n8n-nodes-pushmark)

## License

[MIT](https://github.com/Velqorio/n8n-nodes-pushmark/blob/main/LICENSE.md)