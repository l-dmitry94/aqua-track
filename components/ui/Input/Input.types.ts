interface InputProps {
    type: string;
    placeholder: string;
    name: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
    value: string;
}

export type { InputProps };
