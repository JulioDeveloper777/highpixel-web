type Props = {
  placeholder: string;
  rows: number;
  value?: string;
  onChange?: (newValue: string) => void;
};

export const TextArea = ({ placeholder, rows, value, onChange }: Props) => {
  return (
    <div className="flex items-center rounded-3xl border-2 border-[#3b3b3b] has-[:focus]:border-white">
      <textarea
        className="h-full flex-1 resize-none bg-transparent p-5 outline-none"
        rows={rows}
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
        placeholder={placeholder}
      ></textarea>
    </div>
  );
};
