# Hobby Suggestion API

## Overview
The Hobby Suggestion API is a backend application that allows users to store and manage information about their hobbies. It integrates with MongoDB Atlas for data storage and utilizes Axios for making HTTP requests to external services, including AI-generated insights about hobbies.

## Features
- Create, read, update, and delete hobbies.
- Store total time spent on hobbies and daily time logs for weekly graph representation.
- Add extra notes related to each hobby.
- Generate AI-based information about hobbies.

## Technologies Used
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- Axios
- dotenv

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory and add the following:
   ```
   MONGO_URI=<your_mongodb_atlas_connection_string>
   PORT=5000
   ```

4. **Run the application**
   ```bash
   npm start
   ```

5. **Access the API**
   The API will be running on `http://localhost:5000`. You can test the endpoints using tools like Postman or curl.

## API Endpoints
- `GET /`: Check if the API is running.
- `POST /hobbies`: Create a new hobby.
- `GET /hobbies`: Retrieve all hobbies.
- `PUT /hobbies/:id`: Update a hobby by ID.
- `DELETE /hobbies/:id`: Delete a hobby by ID.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or features.

## License
This project is licensed under the MIT License.