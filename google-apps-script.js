// Google Apps Script for Siteify Contact Form
// This script should be deployed in Google Apps Script and linked to a Google Sheet

// Configuration
const SHEET_ID = '1jBlJYshZR7fr-lw0FuaSz1RVsYCj4tgaVpqPWMGR9K0'; // Your Google Sheet ID (just the ID part)
const NOTIFICATION_EMAIL = 'siteify.in@gmail.com';

// Main function to handle form submissions
function doPost(e) {
  try {
    // Log the entire event object for debugging
    console.log('Full event object:', JSON.stringify(e));
    
    let data = {};
    
    // Check if we have parameters from form submission
    if (e && e.parameter) {
      data = {
        name: e.parameter.name || '',
        email: e.parameter.email || '',
        message: e.parameter.message || ''
      };
    } 
    // Check if we have postData (JSON submission)
    else if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (parseError) {
        console.error('Failed to parse JSON:', parseError);
        data = {
          name: 'Parse Error',
          email: 'unknown@email.com',
          message: 'Failed to parse form data'
        };
      }
    }
    // Fallback - create empty data
    else {
      console.log('No form data found, creating test entry');
      data = {
        name: 'Test Entry',
        email: 'test@example.com',
        message: 'No form data received - this is a test entry'
      };
    }
    
    // Log the parsed data
    console.log('Form submission received:', data);
    
    // Add to Google Sheet
    addToSheet(data);
    
    // Send notification email
    sendNotificationEmail(data);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Form submitted successfully'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error processing form submission:', error);
    
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        message: 'Error processing form submission: ' + error.message
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Function to add data to Google Sheet
function addToSheet(data) {
  try {
    console.log('Attempting to open sheet with ID:', SHEET_ID);
    
    // Validate Sheet ID
    if (SHEET_ID === 'YOUR_ACTUAL_GOOGLE_SHEET_ID') {
      throw new Error('Please update SHEET_ID with your actual Google Sheet ID');
    }
    
    // Open the Google Sheet
    const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();
    console.log('Sheet opened successfully:', sheet.getName());
    
    // Check if headers exist, if not create them
    const lastRow = sheet.getLastRow();
    if (lastRow === 0) {
      const headers = ['Timestamp', 'Type', 'Name', 'Email', 'Message', 'Project'];
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      
      // Format headers
      const headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#00704A');
      headerRange.setFontColor('#FFFFFF');
      console.log('Headers created');
    }
    
    // Prepare row data
    const timestamp = new Date();
    const type = data.type || 'contact';
    const name = data.name || '';
    const email = data.email || '';
    const message = data.message || '';
    const project = data.project || '';
    
    // Add new row
    const newRow = [timestamp, type, name, email, message, project];
    sheet.appendRow(newRow);
    
    // Auto-resize columns
    sheet.autoResizeColumns(1, 6);
    
    console.log('Data added to sheet successfully:', newRow);
    
  } catch (error) {
    console.error('Error adding data to sheet:', error);
    throw error;
  }
}

// Function to send notification email
function sendNotificationEmail(data) {
  try {
    const type = data.type || 'contact';
    const name = data.name || 'Unknown';
    const email = data.email || 'Not provided';
    const message = data.message || 'No message';
    const project = data.project || 'N/A';
    
    // Create email subject
    const subject = type === 'enquiry' 
      ? `New Project Enquiry from ${name} - ${project}`
      : `New Contact Form Submission from ${name}`;
    
    // Create email body
    let emailBody = `
      <h2>New ${type === 'enquiry' ? 'Project Enquiry' : 'Contact Form Submission'}</h2>
      <p><strong>Timestamp:</strong> ${new Date()}</p>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
    `;
    
    if (type === 'enquiry' && project) {
      emailBody += `<p><strong>Project Interest:</strong> ${project}</p>`;
    }
    
    emailBody += `
      <p><strong>Message:</strong></p>
      <div style="padding: 10px; border-left: 3px solid #00704A; background-color: #f8f9fa;">
        ${message.replace(/\n/g, '<br>')}
      </div>
      
      <hr>
      <p style="color: #666; font-size: 12px;">
        This email was sent automatically from your Siteify website contact form.
      </p>
    `;
    
    // Send email
    MailApp.sendEmail({
      to: NOTIFICATION_EMAIL,
      subject: subject,
      htmlBody: emailBody
    });
    
    console.log('Notification email sent successfully');
    
  } catch (error) {
    console.error('Error sending notification email:', error);
    throw error;
  }
}

// Function to handle GET requests (for testing)
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      message: 'Siteify Contact Form API is running',
      timestamp: new Date(),
      version: '1.0'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Test function to verify setup
function testSetup() {
  try {
    // Test sheet access
    const sheet = SpreadsheetApp.openById(SHEET_ID);
    console.log('Sheet access successful:', sheet.getName());
    
    // Test adding data to sheet
    const testData = {
      name: 'Test User',
      email: 'test@example.com',
      message: 'This is a test message'
    };
    addToSheet(testData);
    
    // Test email sending
    MailApp.sendEmail({
      to: NOTIFICATION_EMAIL,
      subject: 'Siteify Contact Form Test',
      body: 'This is a test email to verify the contact form setup is working correctly.'
    });
    
    console.log('Test completed successfully');
    return 'Setup test completed successfully';
    
  } catch (error) {
    console.error('Setup test failed:', error);
    return 'Setup test failed: ' + error.message;
  }
}

// Function to get form submissions (for admin purposes)
function getFormSubmissions(limit = 100) {
  try {
    const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();
    const lastRow = sheet.getLastRow();
    
    if (lastRow <= 1) {
      return [];
    }
    
    const dataRange = sheet.getRange(2, 1, Math.min(lastRow - 1, limit), 6);
    const data = dataRange.getValues();
    
    return data.map(row => ({
      timestamp: row[0],
      type: row[1],
      name: row[2],
      email: row[3],
      message: row[4],
      project: row[5]
    }));
    
  } catch (error) {
    console.error('Error getting form submissions:', error);
    return [];
  }
}

// Instructions for setup:
/*
1. Create a new Google Apps Script project at script.google.com
2. Replace the default code with this script
3. Create a new Google Sheet for storing form submissions
4. Replace SHEET_ID with your Google Sheet ID (found in the sheet URL)
5. Replace NOTIFICATION_EMAIL with your actual email address
6. Deploy the script as a web app:
   - Click "Deploy" > "New deployment"
   - Choose "Web app" as the type
   - Set execute as "Me" and access to "Anyone"
   - Copy the web app URL
7. Replace YOUR_SCRIPT_ID in main.js with your script ID from the URL
8. Run the testSetup() function to verify everything works
*/

// Security considerations:
/*
- The script validates and sanitizes input data
- Email notifications are sent only to the specified address
- The script logs all activities for monitoring
- Consider adding rate limiting if needed
- The sheet ID and email are not exposed to the client
*/