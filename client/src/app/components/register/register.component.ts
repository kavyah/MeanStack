import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],

})
export class RegisterComponent implements OnInit {
    message;
    messageClass;
    form: FormGroup;
    processing = false;
    emailValid;
    emailMessage;
    usernameValid;
    usernameMessage;
    constructor(private formBuilder: FormBuilder,
        private authService: AuthService, private router: Router) {
        this.createForm()
    }

    createForm() {
        this.form = this.formBuilder.group({

            career: ['', Validators.compose([
                Validators.required, // Field is required
                Validators.minLength(2), // Minimum length is 5 characters
                this.validateCareer // Custom validation
            ])],
            year: ['', Validators.compose([
                Validators.required, // Field is required
                this.validateYear // Custom validation
            ])],
            email: ['', Validators.compose([
                Validators.required, // Field is required
                Validators.minLength(5), // Minimum length is 5 characters
                Validators.maxLength(30), // Maximum length is 30 characters
                this.validateEmail // Custom validation
            ])],

            username: ['', Validators.compose([
                Validators.required, // Field is required
                Validators.minLength(3), // Minimum length is 3 characters
                Validators.maxLength(15), // Maximum length is 15 characters
                this.validateUsername // Custom validation
            ])],
            name: ['', Validators.compose([
                Validators.required, // Field is required
                Validators.minLength(3), // Minimum length is 3 characters
                Validators.maxLength(15), // Maximum length is 15 characters
                this.validateName // Custom validation
            ])],
            department: ['', Validators.compose([
                Validators.required, // Field is required
                Validators.minLength(2), // Minimum length is 3 characters
                // Custom validation
            ])],
            password: ['', Validators.compose([
                Validators.required, // Field is required
                Validators.minLength(8), // Minimum length is 8 characters
                Validators.maxLength(35), // Maximum length is 35 characters
                this.validatePassword // Custom validation
            ])],
            // Confirm Password Input
            confirm: ['', Validators.required] // Field is required
        }, { validator: this.matchingPasswords('password', 'confirm') }); // Add custom validator to form for matching passwords
    }


    ngOnInit() {
    }

    validateYear(controls)
    {
        const regExp = new RegExp(/^(\d{4}$)/);
        if (regExp.test(controls.value)) {
            return null; // Return as valid email
        } else {
            return { 'validateYear': true } // Return as invalid email
        }

    }

    validateEmail(controls) {
        // Create a regular expression
        const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        // Test email against regular expression
        if (regExp.test(controls.value)) {
            return null; // Return as valid email
        } else {
            return { 'validateEmail': true } // Return as invalid email
        }
    }

    // Function to validate username is proper format
    validateUsername(controls) {
        // Create a regular expression
        const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
        // Test username against regular expression
        if (regExp.test(controls.value)) {
            return null; // Return as valid username
        } else {
            return { 'validateUsername': true } // Return as invalid username
        }
    }
    validateName(controls) {
        // Create a regular expression
        const regExp = new RegExp(/^[a-zA-Z]/);
        // Test username against regular expression
        if (regExp.test(controls.value)) {
            return null; // Return as valid username
        } else {
            return { 'validateName': true } // Return as invalid username
        }
    }

    validateCareer(controls) {
        // Create a regular expression
        const words[] = ['graduate', 'undergraduate'];

        const v = controls.value;
        const p = v.toLowerCase();
        // Test username against regular expression
        if (words.includes(p)) {
            return null; // Return as valid username
        } else {
            return { 'validateCareer': true } // Return as invalid username
        }
    }
    // Function to validate password
    validatePassword(controls) {
        // Create a regular expression
        const regExp = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/);
        // Test password against regular expression
        if (regExp.test(controls.value)) {
            return null; // Return as valid password
        } else {
            return { 'validatePassword': true } // Return as invalid password
        }
    }

    // Funciton to ensure passwords match
    matchingPasswords(password, confirm) {
        return (group: FormGroup) => {
            // Check if both fields are the same
            if (group.controls[password].value === group.controls[confirm].value) {
                return null; // Return as a match
            } else {
                return { 'matchingPasswords': true } // Return as error: do not match
            }
        }
    }

    onRegisterSubmit() {

        console.log("submitted");

        const user = {
            email: this.form.get('email').value, // E-mail input field
            username: this.form.get('username').value, // Username input field
            password: this.form.get('password').value, // Password input field
            department: this.form.get('department').value,
            name: this.form.get('name').value,
            career: this.form.get('career').value,
            yearOfGrad: this.form.get('year').value
        }
        this.authService.registerUser(user).subscribe(data => {
            // Resposne from registration attempt
            if (!data.success) {
                this.messageClass = 'alert alert-danger'; // Set an error class
                this.message = data.message; // Set an error message
               
            } else {
                this.messageClass = 'alert alert-success'; // Set a success class
                this.message = data.message; // Set a success message
                setTimeout(() => {
                    this.router.navigate(['/login']); // Redirect to login view
                }, 2000);
                
            }
        });
        this.reset();

    }
    reset() {
        this.createForm();
    }
 
    }
}


