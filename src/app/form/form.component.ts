import { Component,OnInit } from '@angular/core';
import { FormBuilder,FormGroup,FormArray,Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  standalone: false,
  
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit {
  myForm: FormGroup;
  constructor(private fb: FormBuilder) { 
    this.myForm=this.fb.group({
      name:['',Validators.required],
      email:['',[Validators.required, Validators.email]],
      addresses: this.fb.array([]) //used FormArray for multiple addresses
    });
  }

  ngOnInit():void{
    this.addAddress(); //this will add an initial address
  }

  get addresses(): FormArray{
    return this.myForm.get('addresses') as FormArray;
  }

  addAddress():void{
    const addressGroup=this.fb.group({
      street:['',Validators.required],
      city:['',Validators.required],
      state:['',Validators.required]
    });
    this.addresses.push(addressGroup);
  }

  removeAddress(index:number):void{
    this.addresses.removeAt(index);
  }

  onSubmit():void{
    if (this.myForm.valid) {
      console.log(this.myForm.value); // Log the form values to the console
      alert('Form submitted successfully!'); // Show an alert to the user
      this.myForm.reset(); // Reset the form after submission
      this.addAddress(); //  add a new address group after reset
    } else {
      alert('Please fill out the form correctly.'); 
    }
}
}
