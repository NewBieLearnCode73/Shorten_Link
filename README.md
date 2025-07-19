# URL Shortener Service

A simple and efficient URL shortening service built with Node.js, Express.js, and MongoDB.

## Features

- Shorten long URLs to compact, shareable links
- Redirect shortened URLs to original destinations
- Track click analytics and visit history
- RESTful API endpoints
- MongoDB database integration
- Error handling middleware
- Automatic timestamps

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **URL Generation**: ShortID library
- **HTTP Status**: http-status-codes
- **Development**: Nodemon for auto-restart

## API Endpoints

### 1. Create Short URL
```http
POST /api/url/
```

**Request Body:**
```json
{
  "url": "https://example.com/very-long-url"
}
```

**Response:**
```json
{
  "statusCode": 201,
  "message": {
    "_id": "...",
    "shortId": "abc123",
    "redirectURL": "https://example.com/very-long-url",
    "visitHistory": [],
    "createdAt": "2025-07-19T...",
    "updatedAt": "2025-07-19T..."
  }
}
```

### 2. Redirect to Original URL
```http
GET /api/url/:shortId
```

**Example:**
```http
GET /api/url/abc123
```
- Redirects to the original URL
- Automatically tracks visit history

### 3. Get Analytics
```http
GET /api/url/analytics/:shortId
```

**Response:**
```json
{
  "statusCode": 200,
  "message": {
    "totalClicks": 5,
    "visitHistory": [
      { "timestamp": 1721404800000 },
      { "timestamp": 1721405200000 }
    ]
  }
}
```

## Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd "Shorten Link"
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
Create a `.env` file in the root directory:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/url-shortener
NODE_ENV=development
```

4. **Start MongoDB**
Make sure MongoDB is running on your system.

5. **Run the application**

For development:
```bash
npm run dev
```

For production:
```bash
npm start
```

## Dependencies

- **express**: Web framework for Node.js
- **mongoose**: MongoDB object modeling
- **shortid**: URL-friendly unique ID generator
- **http-status-codes**: HTTP status constants
- **dotenv**: Environment variable loader
- **nodemon**: Development auto-restart (devDependency)

## Error Handling

The application includes comprehensive error handling:

- **400 Bad Request**: Invalid or missing URL
- **404 Not Found**: Short URL doesn't exist
- **500 Internal Server Error**: Server-side errors

## Usage Examples

### Using cURL

1. **Create a short URL:**
```bash
curl -X POST http://localhost:3000/api/url/ \
  -H "Content-Type: application/json" \
  -d '{"url": "https://github.com"}'
```

2. **Get analytics:**
```bash
curl http://localhost:3000/api/url/analytics/abc123
```

3. **Access short URL:**
```bash
curl -L http://localhost:3000/api/url/abc123
```