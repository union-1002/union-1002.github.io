export function RenderdCheckbox({ className, title, value, onChange, children }) {
  return (
    <label title={title} className={`${className} inline-flex items-center justify-between text-gray-500 bg-gray-50 border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 has-checked:border-blue-600 dark:has-checked:border-blue-600 hover:text-gray-600 dark:has-checked:text-gray-300 has-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600`}>
      <input type="checkbox" checked={value} onChange={onChange} className="hidden" />
      {children}
    </label>
  );
}

export function TextEdit({ className, icon, tail, placeholder, value, onChange }) {
  return (
    <div className={`${className} relative inline-block`}>
      {icon &&
        <div className="absolute h-full start-0 flex items-center ps-2.5 pointer-events-none">
          {icon}
        </div>
      }
      <input
        type="text"
        value={value}
        onChange={onChange}
        className={`${icon && "ps-8 "} w-full block p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
        placeholder={placeholder}
      />
      {tail}
    </div>
  );
}

export function TextEditTailButton({ className, onClick, children }) {
  return (
    <button onClick={onClick} className={`${className} cursor-pointer text-white absolute h-full end-0 bottom-0 bg-[#435373] hover:bg-[#3457A0] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-e-lg text-sm px-4 py-1 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}>{children}</button>
  );
}

export function ToggleButton({ className, value, onChange, children }) {
  return (
    <label className={`${className} inline-flex items-center cursor-pointer`}>
      <input type="checkbox" checked={value} onChange={onChange} className="sr-only peer" />
      <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
      {children && <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">{children}</span>}
    </label>
  );
}
