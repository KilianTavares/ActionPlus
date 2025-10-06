export interface FormInput {
  type: string;
  header: string;
  name: string;
  required?: boolean;
  placeholder?: string;
}

export interface DynamicFormProps {
  header: string;
  subheading: string;
  inputs: FormInput[];
  endpoint: string;
  switchTo?: boolean;
  altForm?:
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export interface signUpProps {
  name: string;
  email: string;
  password: string;
}