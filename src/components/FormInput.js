import { useRef } from "react";
import { useForm } from "react-hook-form";

function FormInput({ label, placeholder, type = "text" }) {
  const fileInputRef = useRef(null);
  const {register} = useForm()

  const handleFileClick = (e) => {
    e.preventDefault()
    fileInputRef.current.click();
  };

  return (
    <div className="flex flex-col gap-1 w-full">
      {type !== "file" ? (
        <>
          <label htmlFor="title" className="text-x=lg font-medium">{label}: </label>
          <input
            type={type}
            name="title"
            placeholder={placeholder}
            className="bg-stone-100 w-full focus:outline-logo-primary-light px-2 py-4 rounded-lg mt-2"
            {...register({label}, { required: `${label} is required` })}
          />
        </>
      ) : (
        <>
          <label htmlFor="file" className="text-x=lg font-medium">
            {label}:
          </label>
          <button
            onClick={handleFileClick} 
            className="mt-2 bg-logo-primary text-white py-2 px-4 rounded-md hover:bg-logo-primary-dark focus:outline-none"
          >
            Choose File
          </button>
          <input
            ref={fileInputRef}
            accept="image/*"
            type="file"
            id="file"
            className="hidden"
            onChange={(e) => console.log(e.target.files[0]?.name)}
            {...register("image", { required: "Image is required" })}
          />
        </>
      )}
    </div>
  );
}

export default FormInput;
