import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';   // 👈 ADD THIS

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterModule],   // 👈 ADD RouterModule HERE
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class RegisterComponent {

  onRegister(form: any) {
    console.log("Register Data:", form.value);
    alert("Registration Successful!");
  }

}