# Student Complaint Management System
## User Manual Version 1.0 (24/5/2026)

## CSC264 - Introduction to Web and Mobile Application

Class Group: CDCS1104A

Prepared By:
- **Nur Fatin Nabilah binti Norazman**
- Margetha Enna anak Albert
- Nur Qaisara Syarafana
- Jacyintha Jane anak Utan

## Table of Contents
1.  Introduction \
    1.1 Overview 

2. Getting Started \
    2.1 Cautions & Warnings \
    2.2 Set-up Considerations \
    2.3 User Access Considerations  \
    2.4 Accessing the System \
    2.5 System Organization & Navigation \
    2.6 Exiting the System

3. Using the System \
    3.1 Student Functions \
        3.1.1 Registration \
        3.1.2 Login \
        3.1.3 Submit Complaint \
        3.1.4 Remove Complaint \
        3.1.5 Complaint History \
        3.1.6 Submit Feedback \
        3.1.7 Update Feedback \
        3.1.8 Logout

    3.2 Staff Functions \
        3.2.1 Staff Login \
        3.2.2 Manage Complaints \
        3.2.3 Update Complaint Status \
        3.2.4 Manage Feedback \
        3.2.5 Insert Student \
        3.2.6 Update Student Password \
        3.2.7 Remove Complaint \
        3.2.8 Logout

4. Troubleshooting & Support \
    4.1 Error Messages \
    4.2 Special Considerations

---

# Introduction
The Student Complaint Management System (SCMS) is a web-based application developed to help students submit complaints regarding academic, administrative, disciplinary, and infrastructure-related issues within the university environment.

The system also allows staff members to manage complaints, update complaint statuses, monitor student feedback, and maintain student records efficiently through a centralized digital platform.

This User Manual provides detailed instructions for both students and staff users on how to access and operate the system effectively.

The intended audience of this document includes: 
- Students
- Administrative Staff
- System Developers
- Future Maintenance Teams
- Lecturers and Evaluators

The system is developed using: \
HTML \
CSS \
JavaScript \
PHP \
MySQL \
XAMPP 

The application operates in a local client-server web environment using Apache and MySQL through XAMPP.

# 1.1 Overview
The Student Complaint Management System (SCMS) is designed as a web-based client-server application that enables students to submit and track complaints digitally.

The system provides two user roles:

## Student Users

**Students are able to:**
- Register accounts
- Log into the system
- Submit complaints
- Remove pending complaints
- View complaint history
- Submit feedback for completed complaints
- Update feedback

## Staff Users

**Staff members are able to:**
- Log into the system
- Manage student complaints
- Update complaint statuses
- Search complaints dynamically
- Manage feedback submissions
- Insert student records
- Update student passwords
- Remove complaints

**The system uses:**
- Session handling for login persistence
- Prepared statements for SQL injection prevention
- Password hashing for student account security
- JavaScript filtering for real-time search functionality

The graphical user interface is fully web-based and accessible through standard web browsers such as Google Chrome.


# 2. Getting Started
This section explains how to prepare, install, access, and use the Student Complaint Management System.

# 2.1 Cautions & Warnings
Before using the system, users should consider the following precautions:

- Unauthorized access to staff modules is prohibited.
- Users must not share login credentials with others.
- Students may only submit feedback after complaint status is marked as “Complete”.
- Removing complaints permanently removes complaint records and any related feedback records from the database.
- The system is intended for educational purposes and local deployment only.

# 2.2 Set-up Considerations
The following software environment is required:
|Software | Purpose|
|------|------|
|XAMPP|Local Web Server|
|Apache|Hosts PHP Pages|
|MySQL|Database Management|
|PHP 8+|Backend Processing|
|Google Chrome|Recommended Browser|

## System Folder Setup
Move the project folder into \
`C:\xampp\htdocs\`

Example: \
`C:\xampp\htdocs\scms\`

## Database Setup
1. Open XAMPP Control Panel as an Administrator
2. Start Apache and MySQL
3. Open phpMyAdmin
4. Create a database named: \
`scms`
5. Import the provided SQL file into the database

# 2.3 User Access Considerations
The system contains two main user groups:
|User Role|Access Rights|
|------|------|
|Student|Complaint submission and feedback|
|Staff|Complaint and student management|

**Students** cannot access staff pages directly without authentication. \
**Staff** users have administrative privileges to manage system records.

# 2.4 Accessing the System
To access the system:
1. Start Apache and MySQL in XAMPP
2. Open a browser
3. Enter: \
`http://localhost/scms/html/login.html`

## Student Login
Students must enter:
- Student ID
- Password

## Staff Login
**Ensure that staff credentials are entered in the _staff_ table in the MySQL database beforehand**

Staff members must enter:
- Staff ID
- Password

# 2.5 System Organization & Navigation
The system is divided into:

## Student Modules
- Dashboard
- Insert Complaint
- Search Complaint
- Remove Complaint
- Insert Feedback
- Update Feedback
- Profile
- Logout

## Staff Modules
- Staff Dashboard
- Insert Student
- Search Student
- Update Student
- Remove Complaint
- Search Complaint
- Update Complaint Status
- Remove Feedback
- Profile
- Logout

## Navigation Structure
The system uses:
- Sidebar navigation menus
- Top navigation bars
- Dynamic search bars
- Modal-based forms

# 2.6 Exiting the System
To safely exit the system:
1. Click the logout icon in the navigation bar on each user's dashboard
2. The session will automatically terminate
3. Users will be redirected to the login page

# 3. Using the System
This section provides detailed explanations of the major system functions.

# 3.1 Student Functions
# 3.1.1 Registration
Purpose: \
Allows new students to create accounts.

Functions:
- Stores student information
- Hashes passwords securely
- Saves data into the database

Expected Output: \
Student will be redirected to the login page.

# 3.1.2 Login
Purpose: \
Authenticates users into the system.

Functions:
- Verifies credentials
- Creates login sessions
- Redirects users based on role

Expected Output: \
Successful login redirects to dashboard.

# 3.1.3 Submit Complaint
Purpose: \
Allows students to submit complaints.

Functions:
- Select complaint category
- Enter complaint details
- Save complaint into database

Expected Output: \
A dialog box confirms that the complaint has been submitted successfully.

# 3.1.4 Remove Complaint
Purpose: \
Allows students to delete pending complaints.

Functions:
- Displays removable complaints
- Multi-select complaint deletion
- Real-time search filtering

Expected Output: \
A dialog box asks for deletion confirmation then if _Ok_, the dialog box confirms that the complaint has been removed. If _Cancel_, students will be redirected to the Remove Complaint Page.

# 3.1.5 Complaint History
Purpose: \
Displays all submitted complaints.

Functions:
- View complaint statuses
- Search complaints dynamically
- Access feedback functions

Expected Output: \
Complaint history table displayed.

# 3.1.6 Submit Feedback
Purpose: \
Allows students to submit feedback for completed complaints only.

Functions:
- Validates complaint completion status
- Stores feedback in database

Expected Output: \
A dialog box confirms that the feedback has been submitted successfully.

# 3.1.7 Update Feedback
Purpose: \
Allows modification of existing feedback.

Functions:
- Retrieve feedback record
- Update feedback content

Expected Output: \
A dialog box confirms that the feedback has been updated successfully.

# 3.1.8 Logout
Purpose: \
Ends user session securely.

Functions:
- Destroys session data
- Redirects to login page

Expected Output: \
User logged out successfully.

# 3.2 Staff Functions
# 3.2.1 Staff Login
Purpose: \
Allows staff authentication into administrative modules.

# 3.2.2 Manage Complaints
Purpose: \
Displays all student complaints.

Functions:
- Search complaints dynamically
- Update complaint statuses

Expected Output: \
List of all student complaints in a table.

# 3.2.3 Update Complaint Status
Purpose: \
Allows staff to modify complaint progress.

Complaint Statuses:
- Pending
- In Progress
- Complete

Expected Output: \
A dialog box confirms that the complaint status has been updated.

# 3.2.4 Manage Feedback
Purpose: \
Allows staff to manage student feedback.

Functions:
- View feedback
- Delete feedback
- Search feedback dynamically

Expected Output: \
List of all feedback submitted in a table.

# 3.2.5 Insert Student
Purpose: \
Allows staff to add student records.

Functions:
- Insert student details
- Insert temporary password for students

Expected Output: \
A dialog box confirms that a new student account has been inserted.

# 3.2.6 Update Student Password
Purpose: \
Allows staff to reset student passwords.

Functions:
- Search student by ID
- Update password securely

Expected Output: \
A dialog box confirms that the student has been updated successfully.

# 3.2.7 Remove Complaint
Purpose: \
Allows administrative complaint deletion.

Functions:
- Remove complaint records

Expected Output: \
A dialog box confirms that the complaint has been deleted.

# 3.2.8 Logout
Purpose: \
Securely exits staff session.

# 4. Troubleshooting & Support
# 4.1 Error Messages
|Error Message|Cause|Solution|
|-----|-----|-----|
|Database connection failed|MySQL inactive|Start MySQL in XAMPP|
|Page not found	|Incorrect file path|Verify folder structure|
|Invalid login information|Incorrect credentials|Re-enter credentials|
|Complaint not found|Invalid complaint ID|Verify complaint number|

# 4.2 Special Considerations
- The system requires Apache and MySQL services to remain active.
- Internet connection is not required for local deployment.
- Relative file paths must remain unchanged.

# Appendix A - Record of Changes
|Version Number|Date|Author	Description|
|-----|-----|-----|
|1.0|8/25/2026|SCMS Team|Initial Release|

# Appendix B - Glossary
|Term|Acronym|Definition|
|-----|-----|-----|
|Student Complaint Management System|SCMS|Web system for managing complaints|
|HyperText Markup Language|HTML|Website structure language|
|Cascading Style Sheets|CSS	|Styling language|
|JavaScript|JS|Frontend scripting language|
|PHP Hypertext Preprocessor|PHP|Backend scripting language|
|Structured Query Language|SQL|Database query language|
|Extensible Stylesheet Language|XAMPP|Local web server environment|
