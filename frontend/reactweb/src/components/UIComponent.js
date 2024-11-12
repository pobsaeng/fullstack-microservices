export const InputField = ({ label, id, type = "text", value, onChange, placeholder="", divMarginButtom="mb-2", divButtonClassName="col-sm-10", labelClassName = "col-sm-2 pt-1 col-form-label col-form-label-sm text-end", required = false }) => (
  <div className={`row ${divMarginButtom}`}>
    <label htmlFor={id} className={`${labelClassName}`}>
      {label}
    </label>
    <div className={divButtonClassName}>
      <input
        type={type}
        className="form-control form-control-sm lighter-text"
        id={id}
        name={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  </div>
);
/*  
    ## Horizental ##
    <InputField label="Name" id="name" value={product.name} onChange={handleInputChange} />
    <InputField label="Stock" id="stock" type="number" value={product.stock} onChange={handleInputChange} />
    ## Vertical ##
    <InputField label="Username" id="name" value={username} onChange={(e) => setUsername(e.target.value)} classNameLabel="form-label" />
*/

export const TextAreaField = ({ label, id, value, onChange, rows = 3 }) => (
  <div className="row mb-2">
    <label htmlFor={id} className="col-sm-2 pt-1 col-form-label col-form-label-sm text-end">
      {label}
    </label>
    <div className="col-sm-10">
      <textarea
        className="form-control form-control-sm lighter-text"
        id={id}
        rows={rows}
        value={value}
        onChange={onChange}
      />
    </div>
  </div>
);
  /* <TextAreaField label="Description" id="description" value={product.description} onChange={handleInputChange} /> */

export const InputButton = ({ label, type = "button", onClick, disabled = false, className = "btn-primary" }) => (
  <input
    type={type}
    value={label}
    onClick={onClick}
    disabled={disabled}
    className={`btn btn-sm ${className}`}
  />
);
/* <InputField label="Stock" id="stock" type="number" value={product.stock} onChange={handleInputChange} /> */

export const FileInputField = ({ label, id, onChange, fileName }) => (
<div className="row mb-2">
  <label htmlFor={id} className="col-sm-2 pt-1 col-form-label col-form-label-sm text-end">
    {label}
  </label>
  <div className="col-sm-10">
    <input
      type="file"
      className="form-control form-control-sm lighter-text"
      id={id}
      accept="image/*"
      onChange={onChange}
    />
    {fileName && <small className="text-muted">{fileName}</small>}
  </div>
</div>
);
/* <FileInputField label="Image" id="image" onChange={handleImageChange} fileName={fileName}/> */

export const CheckboxField = ({ label, id, checked, onChange }) => (
  <div className="row mb-0">
    <label htmlFor={id} className="col-sm-2 col-form-label col-form-label-sm text-end">
      {label}
    </label>
    <div className="col-sm-10 d-flex align-items-center">
      <input
        type="checkbox"
        className="form-check-input lighter-text p-0 m-0"
        id={id}
        checked={checked}
        onChange={onChange}
      />
    </div>
  </div>
);
/*  <CheckboxField label="Active" id="active" checked={product.active} onChange={handleCheckboxChange} /> */

export const DropdownField = ({ label, id, value, onChange, options }) => (
  <div className="row mb-2">
    <label htmlFor={id} className="col-sm-2 pt-1 col-form-label col-form-label-sm text-end">
      {label}
    </label>
    <div className="col-sm-10">
      <select
        id={id}
        className="form-control form-control-sm lighter-text"
        value={value}
        onChange={onChange}
      >
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  </div>
);
/*
<DropdownField
  label="Category"
  id="category"
  value={product.category}
  onChange={handleInputChange}
  options={[
    { value: "electronics", label: "Electronics" },
    { value: "clothing", label: "Clothing" },
    { value: "furniture", label: "Furniture" }
  ]}
/>
*/

