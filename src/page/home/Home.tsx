import axios from "axios"
import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { API_BASE_URL } from "../../config/api";
import { Button } from "@mui/material";

const Home = () => {
	const [flag, setFlag] = useState<any | null>(null);

    const fetchFlag = async () => {
      try {
        const response = await axios.get<{ flag: string }>(`${API_BASE_URL}/api/flag`);
        setFlag(response.data.flag); // Giả sử API trả về { flag: "CTF{example_flag}" }
      } 
			catch (err: unknown) {
        if (axios.isAxiosError(err)) {
					console.log(err)
          setFlag("Oops! It seem that you already have the token but maybe you forget to BEARER it?")
        } else {
          // Xử lý các loại lỗi khác nếu cần
          setFlag('An unexpected error occurred');
        }
      } 
    };

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<div className="p-6 bg-white w-80 shadow-md rounded-lg">
				<h1 className="text-xl font-bold mb-4">CTF Flag</h1>
				{/* {flag ? ( */}
				<Button onClick={fetchFlag}
					sx={{ padding: ".8rem 0rem", backgroundColor: "red", "&:hover": { backgroundColor: "darkblue" } }}
					fullWidth
					variant="contained"
					color="primary"
					type="button">Click to see flag</Button>
					<p className="text-lg text-gray-800">{flag}</p>
			</div>
		</div>
	)
}

export default Home