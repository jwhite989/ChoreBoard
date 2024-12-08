# ChoreBoard

ChoreBoard is a task management application designed to help households organize and manage their chores efficiently. With features like user authentication, chore assignment, and progress tracking, ChoreBoard aims to simplify the process of distributing and completing tasks within a group.

## Features
- **User Authentication**: Secure user registration and login.
- **Chore Assignment**: Assign tasks to specific users.
- **Progress Tracking**: Mark chores as completed and view progress.
- **Responsive Design**: Accessible on both desktop and mobile devices.

## Tech Stack

### Frontend
- [Angular](https://angular.io/): A powerful framework for building user interfaces.

### Backend
- [Spring Boot](https://spring.io/projects/spring-boot): A Java-based framework for building robust APIs.

### Database
- [MySQL](https://www.mysql.com/): A reliable relational database for storing application data.

### Deployment
- Hosted on [Microsoft Azure](https://azure.microsoft.com/) using the free Azure student account.

## Prerequisites
- Node.js and npm installed
- Java Development Kit (JDK) 11 or higher
- MySQL Server
- Angular CLI
- Maven

## Setup Instructions

### Backend Setup
1. Clone the repository:
2. Configure the database:
    - Create a MySQL database named `choreboard`.
    - Update `application.properties` with your database credentials.
3. Build and run the application:
   ```bash
   mvn spring-boot:run
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd choreboard/frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the Angular application:
   ```bash
   ng serve
   ```
4. Access the application at `http://localhost:4200`.

## Deployment
ChoreBoard is deployed using Azure. Follow these steps to deploy:

1. **Backend Deployment**:
    - Package the Spring Boot application as a JAR file:
      ```bash
      mvn clean package
      ```
    - Deploy the JAR file to an Azure App Service instance.

2. **Frontend Deployment**:
    - Build the Angular project:
      ```bash
      ng build --prod
      ```
    - Deploy the `dist/` directory to Azure Static Web Apps or any suitable hosting service.