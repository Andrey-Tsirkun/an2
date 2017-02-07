export class ValidationService {
    static getValidatorErrorMessage(validatorName: string, validatorValue?: string) {
        let config = {
            'required': 'Required',
            'iconFieldValid': 'Field should contain just "YES" or "NO"!'
        };

        return config[validatorName];
    }

    static iconValidator(control) {

        if(control.value === 'YES' || control.value === 'NO'){
            return null;
        }
        else {
            return {'iconFieldValid': true};
        }

    }
}


