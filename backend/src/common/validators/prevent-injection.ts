import { registerDecorator } from 'class-validator';
import { SQL_INJECTION_REGEX } from '../../constants/regexs.constant';

/**
 * @description will test the incoming string with regex to preventing the sql injection.
 */
export const IsPreventInjection = () => {
  return (object: Object, propertyName: string) => {
    registerDecorator({
      name: 'isPreventInjection',
      target: object.constructor,
      propertyName: propertyName,
      validator: {
        validate(value: string) {
          return SQL_INJECTION_REGEX.test(value); // you can return a Promise<boolean> here as well, if you want to make async validation
        },
      },
    });
  };
};
