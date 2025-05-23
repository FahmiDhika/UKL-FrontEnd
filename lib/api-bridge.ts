import axios, { AxiosError } from "axios";
import { BASE_API_URL } from "@/global";

const axiosInstance = axios.create({
  baseURL: `https://learn.smktelkom-mlg.sch.id/ukl1/api`,
});

export const get = async (url: string, token: string) => {
  try {
    let headers: any = {
      Authorization: `Bearer ${token}`,
    };

    let result = await axios.get(url, {
      headers,
    });

    return {
      status: true,
      data: result.data,
    };
  } catch (error) {
    const err = error as AxiosError<{ message: string; code: number }>;
    if (err.response) {
      console.log(err.response.data.message);
      return {
        status: false,
        message: `${err.code}: something wrong`,
      };
    }
    console.log(err.response);
    return {
      status: false,
      message: `Something were wrong: ${error}`,
    };
  }
};

export const post = async (url: string, data: string | FormData) => {
  try {
    const typed: string =
      typeof data == "string" ? "application/json" : "multipart/form-data";

    let headers: any = {
      "Content-Type": typed,
    };

    let result = await axiosInstance.post(url, data, { headers });

    return {
      status: true,
      data: result.data,
    };
  } catch (error) {
    const err = error as AxiosError<{ message: string; code: number }>;
    if (err.response) {
      console.log(err.response.data.message);
      return {
        status: false,
        message: `${err.code}: something wrong`,
      };
    }
    console.log(err.response);
    return {
      status: false,
      message: `Something were wrong: ${error}`,
    };
  }
};

export const put = async (
  url: string,
  data: string | FormData,
  token: string
) => {
  try {
    const typed: string =
      typeof data == "string" ? "application/json" : "multipart/form-data";

    let headers: any = {
      Authorization: `Bearer ${token}` || ``,
      "Content-Type": typed,
    };

    let result = await axiosInstance.put(url, data, {
      headers,
    });

    return {
      status: true,
      data: result.data,
    };
  } catch (error) {
    const err = error as AxiosError<{ message: string; code: number }>;
    if (err.response) {
      console.log(err.response.data.message);
      return {
        status: false,
        message: `${err.code}: something wrong`,
      };
    }
    console.log(err.response);
    return {
      status: false,
      message: `Something were wrong: ${error}`,
    };
  }
};

export const drop = async (url: string, token: string) => {
  try {
    let result = await axiosInstance.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return {
      status: false,
      message: result.data,
    };
  } catch (error) {
    const err = error as AxiosError<{ message: string; code: number }>;
    if (err.response) {
      console.log(err.response.data.message);
      return {
        status: false,
        message: `${err.code}: something wrong`,
      };
    }
    console.log(err.response);
    return {
      status: false,
      message: `Something were wrong`,
    };
  }
};
