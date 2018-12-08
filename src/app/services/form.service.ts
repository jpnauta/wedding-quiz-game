import {Injectable} from '@angular/core';
import {FormArray, FormControl, ValidatorFn, Validators} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor() {
  }

  formArray<T>(items: Array<T>, validatorOrOpts?: ValidatorFn | ValidatorFn[]) {
    return new FormArray(items && items.map(() => new FormControl(false)), validatorOrOpts);
  }

  minSelectedCheckboxes(min = 1) {
    return (formArray: FormArray) => {
      const totalSelected = formArray.controls
      // get a list of checkbox values (boolean)
        .map(control => control.value)
        // total up the number of checked checkboxes
        .reduce((prev, next) => next ? prev + next : prev, 0);

      // if the total is not greater than the minimum, return the error message
      return totalSelected >= min ? null : {required: true};
    };
  }

  minMax(min: number, max: number) {
    return [Validators.min(min), Validators.max(max)];
  }
}
