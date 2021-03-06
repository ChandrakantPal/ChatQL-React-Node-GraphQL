interface InputGroupProps {
  type: string
  placeholder: string
  value: string
  setValue: (str: string) => void
}

const InputGroup: React.FC<InputGroupProps> = ({
  placeholder,
  setValue,
  type,
  value,
}) => {
  return (
    <div className="mb-3">
      <input
        type={type}
        className="p-3 transition duration-200 border border-gray-300 rounded-full outline-none bg-gray-50 focus:bg-white hover:bg-white focus:border-blue-500"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  )
}

export default InputGroup
