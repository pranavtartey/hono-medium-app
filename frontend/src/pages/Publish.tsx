import axios from "axios";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Inputs {
  title: string;
  content: string;
}

const Publish = () => {
  const navigate = useNavigate();
  const [publishInputs, setPublishInputs] = useState<Inputs>({
    title: "",
    content: "",
  });
  const publishHandler = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/blog`,
        publishInputs, {
            headers : {
                Authorization : localStorage.getItem("token")
            }
        }
      );
      console.log(
        "Your Inputs : ",
        publishInputs,
        "\nThis is your response : ",
        response
      );
      navigate(`/blog/${response.data.id}`);
    } catch (error) {
      console.log("Something went wrong : ", error);
    }
  };

  const changeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    console.log(`${name} : ${value}`);
    setPublishInputs((prev: Inputs) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="flex justify-center">
      <div className="w-3/5">
        {/* <label
          htmlFor="message"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Your message
        </label> */}
        <textarea
          id="message"
          name="title"
          value={publishInputs.title}
          onChange={changeHandler}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 mt-5 focus:outline-none"
          placeholder="Title"
        ></textarea>
        <TextEditor
          onChange={changeHandler}
          name="content"
          value={publishInputs.content}
        />
        <button
          onClick={publishHandler}
          className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800"
        >
          Publish post
        </button>
      </div>
    </div>
  );
};
export default Publish;

const TextEditor = ({
  onChange,
  name,
  value,
}: {
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  name: string;
  value: string;
}) => {
  return (
    <div>
      <div className="w-full mb-4 border mt-6">
        <div className="px-4 py-2 bg-white rounded-b-lg">
          <textarea
            id="editor"
            rows={8}
            onChange={onChange}
            name={name}
            value={value}
            className="block w-full px-0 text-sm text-gray-800 bg-white border-0 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Write an article..."
            required
          ></textarea>
        </div>
      </div>
    </div>
  );
};
