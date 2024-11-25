# Kids Tracking Project README

## Table of Contents

- [Introduction](#introduction)
- [Design Overview](#design-overview)
- [Dependencies and Deployment](#dependencies-and-deployment)
- [Build Tools and API Communication](#build-tools-and-api-communication)
- [Modules Overview](#modules-overview)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Introduction

Kids Tracking is a comprehensive platform designed to tracking device to ensure the safety and health monitoring of kids. The project leverages NextJS for its component-based architecture, alongside various other libraries and tools to ensure robust functionality and seamless user experience.

## Design Overview

Kids Tracking employs a Monolithic Architecture where all pages, components, and styles are part of a single codebase. This approach ensures seamless integration and simplifies the development process.

### Primary Libraries and Frameworks

- **NextJS**: For creating, extending, and maintaining components.
- **ChartJS && Re-charts**: For rendering charts and graphs.
- **Pubnub and Socket.io-client**: For real-time communication.
- **uuid**: For unique identifier generation.
- **formik and react-hook-form**: For form handling and validation.
- **React-infinite-scroll-component**: For implementing infinite scrolling.
- **downloadjs**: For file downloading capabilities.
- **moment**: For date and time manipulation.
- **google map**: For map rendering.

## Dependencies and Deployment

### Dependencies

- **Axios Interceptor**: For globally modifying request or response handling.
- **MongoDB**: Used in production for secure and scalable data management.

### Deployment Process

1. **Version Control**: Managed using Git for continuous integration.
2. **Custom Deployment Script**: For automated, seamless updates.
3. **Security Configurations**: Includes SSL certificates and access controls/firewall settings.

### Hosting Services

- **Production Environment**: Hosted on GO4Hosting.
- **Testing Environment**: Hosted on UTHO.

## Build Tools and API Communication

### Build Tools

- **Project Structure**: Organized for optimal maintenance and scalability.
- **Linting and Formatting**: Ensures code quality and consistency.
- **Version Control**: Managed using Git.

### API Communication

- **RESTful api**: For standard API communication.
- **Redux-Toolkit**: For state management and efficient API interaction.

### Additional Configurations

- **Environment Variables**: For secure and customizable application settings.
- **Documentation**: Comprehensive documentation for ease of understanding and development.

## Modules Overview

### User Management && account management

- Categorizes users into two types with a user && agent , overseeing various accounts.
- assign device to user || unasign
- see all kids under the user's
- Add users
- edit users && delete as well
- history users

### Device Management

- Tracks Kids Tracking+ app-enabled devices.
- assign device to user
- Add Device
- edit Device && delete as well
- history Device

### Subscription Management

- Add subscription
- edit subscription && delete as well
- history subscription
- Enhances promotional capabilities.

### Transaction Management

- Assesses financial health, covering margin, transactions, analytics, revenue, and specifics.

### Analytics Module && dashboard

- Analyzes device, users, revenue, and demographics.
- trend analysis with graphical and tabular insights.

## Installation

1. Clone this (git clone <url>) repository.
2. Install the required dependencies by running `npm install`.
3. Configure your environment variables (if applicable).
4. Start the development server with `npm run dev`.
5. Open your web browser and navigate to `http://localhost:3000` to access the Kids Tracking.
