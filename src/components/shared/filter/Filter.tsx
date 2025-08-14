import { on } from "events";
import { Search } from "lucide-react";
import { useState } from "react";

type FilterFormProps = {
  onSubmit?: (
    data: {
      name: string;
      lastName: string;
      email: string;
    }
  ) => void;
};
const FilterForm: React.FC<FilterFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  return (
    <div className="bg-white border border-gray-300 p-6 rounded-md shadow-md w-full mb-6">
      <form
        onSubmit={handleSubmit}
        className="flex md:flex-row md:space-x-4 md:space-y-0"
      >
        <div className="flex flex-col w-full">
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nome"
            className="border border-gray-300 rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col w-full">
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Sobrenome"
            className="border border-gray-300 rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col w-full">
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="E-mail"
            className="border border-gray-300 rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="flex bg-transparent px-10 py-0 items-center justify-center border border-blue-500 text-blue-700 rounded hover:bg-blue-500 hover:text-white"
          >
            <Search className="mr-2 size-4" />
            <span className="font-semibold">Buscar</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default FilterForm;
