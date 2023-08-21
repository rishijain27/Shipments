Project Link:- https://shipments-ten.vercel.app/

## Getting Started
### Prerequisites
- Node.js
- MongoDB

## Installation

### Clone the repository:
`git clone https://github.com/yourusername/stackflow-clone.git`

Navigate to the project directory:
`cd stackflow-clone`

### Install the required dependencies:
`npm install`

### Start the server:
`npm start`

Open your browser and navigate to http://localhost:3000.

## Usage

Register as a new user or log in.
Once authenticated, you can ask new questions, edit or delete your questions, upvote/downvote questions, and comment on them.

## API Endpoints
-User Registration: POST /signup
-User Login: POST /signin
-Create Question: POST /createquestion
-Get all questions: GET /allquestions
-Delete Question: DELETE /deleteQuestion/:questionId
-Upvote Question: PUT /upvote/:questionId
-Downvote Question: PUT /downvote/:questionId
-Comment Question: PUT/comment/:questionId
## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
