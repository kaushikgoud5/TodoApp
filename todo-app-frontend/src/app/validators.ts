import { FormControl } from "@angular/forms";

export class CustomValidators{
    static passwordValidator(control:FormControl){
        const value=control.value;
        if (value?.length < 8) {
            return { passwordInvalid: 'Password must be at least 8 characters long' };
        }
        const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/;
        if (!specialCharacterRegex.test(value)) {
            return { passwordInvalid: 'Password must contain at least one special character' };
        }

        const alphabeticRegex = /[a-zA-Z]/;
        if (!alphabeticRegex.test(value)) {
            return { passwordInvalid: 'Password must contain at least one alphabetic character' };
        }
        const numericRegex = /[0-9]/;
        if (!numericRegex.test(value)) {
            return { passwordInvalid: 'Password must contain at least one numeric character' };
        }

        return null;
    }
    static noSpaceAllowed(control: FormControl) {
        if (control.value != null && control.value.indexOf(' ') != -1) {
          return { noSpaceAllowed: true };
        }
        return null;
      }
}