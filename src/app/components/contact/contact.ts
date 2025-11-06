import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms'; // Import FormsModule and NgForm
import { CommonModule } from '@angular/common'; // Import CommonModule for @if

@Component({
  selector: 'app-contact',
  imports: [
    CommonModule, // Needed for @if
    FormsModule   // Needed for [(ngModel)] and NgForm
  ],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Contact {
   // --- Component Properties ---
  // These properties are linked to the form inputs via [(ngModel)]
  name: string = '';
  message: string = '';
  alertMessage: string = '';

  /**
   * This function is called when the form is submitted.
   * @param form - A reference to the form (passed from the template)
   */
  onSubmit(form: NgForm) { // Using the specific NgForm type
    if (!form.valid) {
      console.log('Form is invalid');
      return; // Don't submit if form is invalid
    }

    // --- This is the key logic ---

    // 1. Define your target email
    const targetEmail = 'shaheeraliali@hotmail.com';
    
    // 2. Create the raw subject and body strings using component properties
    //    (this.name and this.message are already updated via ngModel)
    const subject = `Contact from ${this.name}`;
    const body = `Name: ${this.name}\n\nMessage:\n${this.message}`;
    
    // 3. URL-encode the subject and body for safety
    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(body);
    
    // 4. Construct the Gmail-specific link
    //const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${targetEmail}&su=${encodedSubject}&body=${encodedBody}`;
    // const outlookLink = `https://outlook.live.com/mail/0/deeplink/compose?to=${targetEmail}&subject=${encodedSubject}&body=${encodedBody}`;
    
    // --- End of key logic ---

    // Show a success message
    // this.alertMessage = 'Success! Redirecting you to gmail... Email to shaheeraliali@hotmail.com if doesnt work';
      
    // 4. --- New logic to check for mobile ---
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    let linkToOpen: string;
    let alertMessageText: string;

    if (isMobile) {
      // Use the native app URL scheme (ms-outlook://)
      linkToOpen = `ms-outlook://compose?to=${targetEmail}&subject=${encodedSubject}&body=${encodedBody}`;
      alertMessageText = 'Success! Opening your mail app... (Email: shaheeraliali@hotmail.com) If the link doesnt support.';
    } else {
      // Use the standard web URL for desktops
      linkToOpen = `https://outlook.live.com/mail/0/deeplink/compose?to=${targetEmail}&subject=${encodedSubject}&body=${encodedBody}`;
      alertMessageText = 'Success! Redirecting you to Outlook...';
    }
    // --- End of new logic ---

    // Show a success message
    this.alertMessage = alertMessageText;
    // Open the Gmail link in a new tab
    window.open(linkToOpen, '_blank');
    
    // Optional: Reset the form after submission
    form.resetForm(); // Use resetForm() for NgForm

    // Optional: Clear the success message after a few seconds
    setTimeout(() => {
      this.alertMessage = '';
    }, 5000);
  }}
