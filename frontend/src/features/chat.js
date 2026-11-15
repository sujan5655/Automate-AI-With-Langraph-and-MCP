import { api } from "../../api";

export const chat = async (message) => {
  try {
    const { data } = await api.post("/api/chat/", {
      message: message,
    });

    return data;
  } catch (error) {
    console.error("Chat API Error:", error);
    throw error;
  }
};
