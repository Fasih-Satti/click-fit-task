const fs = require("fs");
const { Document, Packer, Paragraph, TextRun, HeadingLevel } = require("docx");

const doc = new Document({
    sections: [
        {
            properties: {},
            children: [
                new Paragraph({
                    text: "Click Fit Project Documentation",
                    heading: HeadingLevel.HEADING_1,
                }),
                new Paragraph({
                    text: "Overview",
                    heading: HeadingLevel.HEADING_2,
                }),
                new Paragraph({
                    text: "This website is a single-page fitness-themed landing page built with HTML, CSS, Bootstrap, jQuery, and a Node.js upload backend."
                }),
                new Paragraph({
                    text: "Steps Completed & Requirements Met",
                    heading: HeadingLevel.HEADING_2,
                }),
                new Paragraph({ text: "1. Website Theme: Created a responsive, single-page sports/fitness website ('Click Fit') using HTML, CSS, Bootstrap, jQuery, and jQuery plugins." }),
                new Paragraph({ text: "2. Premium UI & Animations: Built a high-quality light theme with smooth CSS animations, hover states, and glassmorphism." }),
                new Paragraph({ text: "3. API Integration: Used jQuery AJAX on page load to fetch from https://api.restful-api.dev/objects and write the formatted data to the page in beautiful cards." }),
                new Paragraph({ text: "4. Image Upload (Node.js): Added a drag-and-drop / click area. Images are uploaded to a local Node.js backend and saved in the 'upload_images' folder in the root directory (No cloud solutions used)." }),
                new Paragraph({ text: "5. Error Links: Links navigating to other pages are programmed to show an error notice as requested." }),
                new Paragraph({ text: "6. MySQL Database Script: Created a script (database/clickfit_users.sql) to create the 'users' table (userId, email, password, type, active), the 'addUser' stored procedure, and a call to the procedure." }),
                new Paragraph({
                    text: "Run Locally",
                    heading: HeadingLevel.HEADING_2,
                }),
                new Paragraph({ text: "- Install dependencies: npm install" }),
                new Paragraph({ text: "- Start server: npm start" }),
                new Paragraph({ text: "- Open: http://localhost:3000" }),
                new Paragraph({
                    text: "Project Notes",
                    heading: HeadingLevel.HEADING_2,
                }),
                new Paragraph({ text: "- Uploaded images are kept securely in the upload_images folder." }),
                new Paragraph({ text: "- The database script is located at: database/clickfit_users.sql" }),
                new Paragraph({
                    text: "Contact: devjob@onwavegroup.com",
                    heading: HeadingLevel.HEADING_3,
                }),
                new Paragraph({
                    text: "Designed & Developed by Fasih Ur Rehman",
                    heading: HeadingLevel.HEADING_3,
                })
            ],
        },
    ],
});

Packer.toBuffer(doc).then((buffer) => {
    fs.writeFileSync("docs/ClickFit_Project_Documentation.docx", buffer);
    console.log("Document created successfully at docs/ClickFit_Project_Documentation.docx");
});
