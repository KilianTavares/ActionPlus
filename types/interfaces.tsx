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
  onSuccess?: () => void;
  onError?: (error: string) => void;
}