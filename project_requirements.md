# SWOT UP Sample Websites - Project Requirements

## Overview
This project serves as a common repository and application for hosting sample websites and tailored presentations built for potential clients in the future.

## Folder Structure
- **Client-Specific Folders**: Within the main source code directory, there must be a dedicated folder for each client (named after the client).
- **Encapsulation**: All code, components, assets, and pages relating to a specific client must be contained entirely within their dedicated folder.

## Routing & Redirection Strategy
- **Default Redirection**: The application will not have a standard landing page. Instead, all unassigned routes (404s), **including the root route (`/`)**, must automatically redirect to **[swot-up.com](https://swot-up.com)**.
- **Exclusive Client Routes**: The app will exclusively serve routes dedicated to specific clients.

## Client Route Structure (Example)
For a hypothetical client named "Client Name", the routing should look like this:

### 1. `/client_name`
This is the client's dedicated home/presentation page. It should include:
- A custom report or personalized content for the client. This report must explicitly cover:
  - An analysis of their current website (how it looks, features, tools integrated, SEO status, and what it currently accomplishes vs. what it lacks).
  - A comprehensive plan detailing the specific improvements we propose for each section of their online presence.
- Call-to-Action (CTA) buttons allowing the client to:
  - Contact us
  - Book a consultation
  - Request an estimate
- A prominent link navigating to their specific sample website.

### 2. `/client_name/sample`
This route will host the actual sample website or prototype developed specifically for this client.

## AI & Package Isolation Guidelines
- **No Global Theme Dependencies**: Each client's website or prototype is considered an independent project within their dedicated folder. There is no requirement or restriction to reuse previous themes or styles. 
- **Unlimited Package Additions**: AI agents building out new clients' folders must not limit themselves to UI libraries, dependencies, tools, or styling frameworks already present in the global `package.json` or used by other clients. Agents must install any additional dependencies and use any theme/design system exactly as requested for the new client.

## Client-Specific Configuration (`config.ts`)
Each client project folder MUST contain a dedicated `config.ts` file holding developer settings and operational variables specific to exactly that sample/client route. 
- **Time-restricted Access**: A primary purpose of this file is to enforce time restrictions for viewing the sample.
- **Current Variables**: At a minimum, variables should include properties such as:
  - `startDate`: The date the sample becomes accessible.
  - `expiryInDays`: The total number of days the route should be available after the start date.
- **Future Expansions**: Additional setting variables may be added incrementally to accommodate specific features or restrictions for individual clients. 
- **Application Logic**: The route handlers must calculate if the client's current access date falls outside this time restriction and enforce the redirection/omission if the time limit is passed.

## Hosting & Deployment Constraints
This application is hosted on **GitHub Pages** with the custom domain **`samples.swot-up.com`**.
- **Static Export**: Because it is on GitHub Pages, the application must be fully compatible with static exporting (e.g., `output: 'export'` if using Next.js).
- **Asset Paths**: All links, images, components, and statically served files must correctly handle relative/absolute paths so they don't break in the production build. Ensure the chosen framework handles asset prefixing or path routing correctly to support the custom domain.
- **Client-Side/Static Logic**: Any dynamic route logic (like time restrictions or dynamic redirects) must either run client-side (via JavaScript) or be handled via static generation approaches (like Edge functions/middleware if supported by a CDN wrapper, or purely client-side routing on `samples.swot-up.com`), because GitHub Pages does not support traditional server-side scripting (Node.js backend at runtime).
