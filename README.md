# Project Name: WeSplit

## Project Description: 

{LOGO}

WeSplit, an expense splitter app, is designed to simplify the process of dividing costs among a group of people. It provides a user friendly interface of providing the detailed information of the expenses, adding friends to the expenses, grouping the expenses for convenience of the user. Once the user inputs the expenses, and adds the friends linked to that particular expense, then the WeSplit app will calculate the individual’s share. 

{SCREENSHOT}

### Key Features of the WeSplit App:
 - Expense Input: Allows users to input the expenses with details such as Description, amount, date and category.
 - Member Management: Enables users to add the list of participants involved in the shared expenses.
- Expense Allocation: Provides various methods for allocating expenses, including equal sharing, percentage based sharing and custom allocation.
 - Payment TRacking: Tracks payments made by each participant, as per who owes whom and how much is the amount owed.

### Target Audience:

- Groups of Friends: For managing shared expenses during trips, restaurants, other outings.
- Housemates: Participants sharing rent, utility bills, groceries, and other household costs.

### Technology Stack:	
- Frontend: Nextjs to build dynamic user interfaces .
- Backend: Nextjs to handle server-side logic and routing.
- Database: MongoDB is used to store groups, users, expenses, etc.
- Mobile compatibility: WeSplit app is designed to be compatible, responsive and accessible on both the desktop and mobile devices.

### Tools used:
- TypeScript
- Nextjs
- shadcn/ui - https://ui.shadcn.com/; 
- Resend email API - https://resend.com/;
- Mongodb


### How to Run:

1. To run WeSplit locally, In a code editor of your choice, open the terminal and enter `git clone https://github.com/chingu-voyages/v51-tier3-team-33.git`.
2. Install all dependencies for the application by entering `pnpm install`. If you do not have pnpm installed, you can install it by entering `npm install pnpm` in the terminal.
3. Create a `.env.local` file to add the required environment variables for the application to run successfully. Please ask the team for the keys before attempting to run the application, as it will not work without these.
4. Run the application by entering `pnpm run dev` in the terminal.

### Environment Variables

`MONGODB_URI`: Used to connect to WeSplit database.<br>
`AWS_S3_ACCESS_KEY_ID`: Used to authenticate API requests to Amazon S3.<br>
`AWS_S3_SECRET_ACCESS_KEY`: Used in conjunction with the access key to securely access AWS services.<br>
`AWS_S3_REGION`: The region our S3 bucket is within AWS.<br>
`AWS_S3_BUCKET_NAME`: The name of the bucket where the receipts are stored.<br>
`GOOGLE_CLIENT_ID`: Used for authenticating users via Google.<br>
`GOOGLE_CLIENT_SECRET`: Used in conjunction with the google client id to authenticate google users.<br>
`NEXTAUTH_SECRET`: A secret key used by NextAuth.js to encrypt session tokens and manage authentication.<br>
`NEXTAUTH_URL`: The URL where the application is hosted during development or production.<br>
`BASE_URL`: The base URL of the application (ex: localhost:3000 or deployed link). Used for dynamically establishing API calls.<br>
`RESEND_API_KEY`: API key for Resend, used to send email invites within the application.<br>
`NEXT_PUBLIC_SHAREABLE_LINK`: The public URL that is shared with users, such as for login links and group invites. Should be the same as the BASE_URL.

### Key Documents:
Throughout the project, we have several key documents to assist with planning, communication, and organization. These documents can be found in the /docs directory.

Important Documents

- [Minimal Viable Product](./docs/)
- [Team Agreement](./docs/team_decision_log.md)

## Our Team

- Product Owner - Radhika G: [GitHub](https://github.com/goldilocks0164) / [LinkedIn](https://www.linkedin.com/in/radhika-godla-81335166)
- Scrum Master - Lidia Prado Peñalver:  [LinkedIn](https://www.linkedin.com/in/lidiaprado)
- Web Developer - Gary Smith: [GitHub](https://github.com/garysmith1933) / [LinkedIn](https://www.linkedin.com/in/garysmith1933/)
- Web Developer - Olga Yudkin: [GitHub](https://github.com/cvtqx) / [LinkedIn](https://www.linkedin.com/in/olga-yudkin/)



