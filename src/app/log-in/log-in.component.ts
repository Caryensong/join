import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { Router, RouterModule } from '@angular/router';

/**
 * LogInComponent handles the user login functionality.
 * It allows users to log in with their email and password, handle guest logins, 
 * and navigate to related pages like the privacy policy and imprint.
 */
@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss'
})
export class LogInComponent {
  /**
   * Firebase authentication instance for handling user authentication.
   */
  auth = inject(Auth);

  isCurrentUser: boolean = false; 

  /**
   * Event emitted when the user successfully logs in.
   */
  @Output() loginSuccess = new EventEmitter<void>();

  /**
   * Event emitted when a new user needs to sign up.
   */
  @Output() newUserOutput = new EventEmitter<void>();

  /**
   * Flag to track if the user is logged in.
   */
  userLoggedIn: boolean = false;

  /**
   * Flag to track if the guest login is activated.
   */
  guestLoggedIn: boolean = false;

  /**
   * Flag indicating if the login form has been submitted.
   */
  formSubmitted: boolean = false;

  /**
   * Flag to toggle password visibility in the login form.
   */
  passwordVisible: boolean = false;

  /**
   * Flag to track if the password has been typed.
   */
  passwordTyped: boolean = false;

  /**
   * Default guest login credentials.
   */
  guestLogin = {
    email: "guest@gmail.com",
    password: "123456"
  }

  /**
   * User login credentials.
   */
  login = {
    email: "",
    password: "",
  }

  /**
   * Stores the error message in case of login failure.
   */
  loginError: string = '';

  constructor(private router: Router) {
  }

  /**
   * Triggered when the user wants to sign up.
   * Emits the `newUserOutput` event.
   */
  signUp() {
    this.newUserOutput.emit();
  }

  /**
   * Handles user login with email and password.
   * Uses Firebase authentication and emits login success or error.
   */
  loginUser() {
    this.formSubmitted = true;

    // Check if email and password are provided
    if (!this.login.email || !this.login.password) {
      this.loginError = "Check our email and password. Please try again.";
      return;
    }

    // Attempt to sign in with Firebase authentication
    signInWithEmailAndPassword(this.auth, this.login.email, this.login.password)
      .then(() => {
        this.loginError = ''; // Clear any previous errors
        this.loginSuccess.emit(); // Emit successful login
        this.userLoggedIn = true;
        this.router.navigate(['/']); // Navigate to the home page
      })
      .catch((error) => {
        this.handleLoginError(error.code); // Handle login error
      });
  }

  /**
   * Handles the various error codes returned by Firebase authentication.
   * Sets the appropriate error message based on the error code.
   * @param errorCode The error code returned from Firebase.
   */
  handleLoginError(errorCode: string) {
    switch (errorCode) {
      case 'auth/invalid-email':
        this.loginError = "Invalid email address.";
        break;
      case 'auth/user-not-found':
        this.loginError = "No user found with this email.";
        break;
      case 'auth/wrong-password':
      case 'auth/invalid-credential': 
        this.loginError = "Incorrect password. Please try again.";
        break;
      case 'auth/too-many-requests':
        this.loginError = "Too many requests. Please try again later.";
        break;
      default:
        this.loginError = "Login failed. Please try again later.";
    }
  }

  /**
   * Logs in the user as a guest using predefined credentials.
   * Emits login success or error.
   */
  loginAsGuest() {
    this.formSubmitted = true;

    // Attempt to sign in as a guest
    signInWithEmailAndPassword(this.auth, this.guestLogin.email, this.guestLogin.password)
      .then(() => {
        this.loginError = ''; // Clear any previous errors
        this.loginSuccess.emit(); // Emit successful login
        this.router.navigate(['']); // Navigate to the home page
      })
      .catch((error) => {
        this.handleLoginError(error.code); // Handle login error
      });
  }

  /**
   * Toggles the visibility of the password in the login form.
   */
  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  /**
   * Navigates to the privacy policy page.
   */
  navigateToPrivacyPolicy() {
    this.router.navigate(['/privacy-policy']);
  }

  /**
   * Navigates to the imprint page.
   */
  navigateToImprint() {
    this.router.navigate(['/imprint']);
  }
}
