
import { validateEmail, validatePassword } from "./user";



describe('validatePassword', () => {
  it('should throw an error if passwords do not match', () => {
    expect(() => validatePassword('password1', 'password2')).toThrow('password tidak sama');
  });

  it('should throw an error if password length is less than 8', () => {
    expect(() => validatePassword('pass', 'pass')).toThrow('password kurang anjang');
  });

  it('should throw an error if password is not strong enough', () => {
    expect(() => validatePassword('password', 'password')).toThrow('password kurang kuat');
    expect(() => validatePassword('Password', 'Password')).toThrow('password kurang kuat');
    expect(() => validatePassword('pa$$w0rd', 'pa$$w0rd')).toThrow('password kurang kuat');

  });

  it('should throw an error if either password is empty', () => {
    expect(() => validatePassword('', '')).toThrow('Harus Diisi');
    expect(() => validatePassword('password', '')).toThrow('Harus Diisi');
    expect(() => validatePassword('', 'password')).toThrow('Harus Diisi');
  });

  it('should not throw an error if password is valid', () => {
    expect(() => validatePassword('Password1', 'Password1')).not.toThrow();
    expect(() => validatePassword('Pass1234', 'Pass1234')).not.toThrow();
    
  });


  it('should not throw an error if password is strong enough', () => {
    expect(() => validatePassword('Password123', 'Password123')).not.toThrow();
    expect(() => validatePassword('password1', 'password1')).not.toThrow();
    expect(() => validatePassword('12345678aA', '12345678aA')).not.toThrow();
});
});


describe('validateEmail', () => {
  it('should throw an error if email is not provided', () => {
    expect(() => validateEmail('')).toThrow('Harus Diisi');
  });

  it('should throw an error if email is not in a valid format', () => {
    expect(() => validateEmail('test@')).toThrow('Check Your Email!!');
    expect(() => validateEmail('test@example')).toThrow('Check Your Email!!');
    expect(() => validateEmail('test@.com')).toThrow('Check Your Email!!');
    expect(() => validateEmail('testexample.com')).toThrow('Check Your Email!!');
    expect(() => validateEmail('test@@example.com')).toThrow('Check Your Email!!');
    expect(() => validateEmail('test@exam_ple.com')).toThrow('Check Your Email!!');
  });

  it('should not throw an error if email is in a valid format', () => {
    expect(() => validateEmail('test@example.com')).not.toThrow();
    expect(() => validateEmail('test123@example.com')).not.toThrow();
    expect(() => validateEmail('test_123@example.com')).not.toThrow();
    expect(() => validateEmail('test+123@example.com')).not.toThrow();
    expect(() => validateEmail('test.123@example.com')).not.toThrow();
    expect(() => validateEmail('Test_123@example.com')).not.toThrow();
    expect(() => validateEmail('Test-123@example.com')).not.toThrow();
    expect(() => validateEmail('test@example.co.id')).not.toThrow();
  });
});
