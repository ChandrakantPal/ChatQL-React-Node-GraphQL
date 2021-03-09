import classNames from 'classnames'
interface InputGroupProps {
  type: string
  placeholder: string
  value: string
  setValue: (str: string) => void
  error: string | undefined
}

const InputGroup: React.FC<InputGroupProps> = ({
  placeholder,
  setValue,
  type,
  value,
  error,
}) => {
  return (
    <div className="mb-3">
      <input
        type={type}
        className={classNames(
          'p-3 transition duration-200 border border-gray-300 rounded-full outline-none bg-gray-50 focus:bg-white hover:bg-white focus:border-blue-500',
          { 'border-red-500': error }
        )}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <small className="block font-medium text-center text-red-600">
        {error}
      </small>
    </div>
  )
}

export default InputGroup
