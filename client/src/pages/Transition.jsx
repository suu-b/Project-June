import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import { ClimbingBoxLoader, BarLoader } from 'react-spinners'
import axios from 'axios';
import { toast } from 'sonner';

export default function Transition() {
    const navigate = useNavigate();
    const location = useLocation();

    const file = location.state.file

    useEffect(() => {
    const uploadFile = async () => {
      if (!file) {
        toast.error("No file found for upload.");
        return navigate("/");
      }

      const formData = new FormData();
      formData.append("file", file);

      try {
        await axios.post(`${import.meta.env.VITE_API_URL}/upload`, formData);
        const formattedTitleResponse = await axios.post(`${import.meta.env.VITE_API_URL}/query/format-title`, {fileName: file.name});
        const formattedTitle = formattedTitleResponse.data.result;

        toast.success("File processed successfully!");
        navigate("/chat", {state: {formattedTitle: formattedTitle}});
      } catch (error) {
        console.log(error)
        toast.error("Error processing the file. Please try again.");
        navigate("/");
      }
    };

    uploadFile();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="text-center">
        <ClimbingBoxLoader color={"#8E80FC"} size={30} className='mx-auto mb-14'/>

        <div className="my-5">
          <h1 className="text-2xl font-semibold text-slate-800"><span className='font-bold'>June </span>is processing your file</h1>
          <p className="text-slate-600 max-w-md mx-auto mt-5">
            Please wait while we chunk and analyze your document. This usually takes just a few moments.
          </p>
        </div>

        <div className="w-64 mx-auto">
            <BarLoader color={"#8E80FC"} width={200} className='mx-auto'/>
        </div>
      </div>
    </div>
  )
}
