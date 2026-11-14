import { api } from "../../api";

export const createAgent = async (name, knowledgeBase, instructions, tools) => {
  const { data } = await api.post(
    "/api/agent/",
    name,
    knowledgeBase,
    instructions,
    tools,
  );
  return data;
};

export const getAllAgents = async (token) => {
  try {
    const { data } = await api.get("/api/agent/all");
    // console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getAgentById = async (id) => {
  try {
    const { data } = await api.get(`/api/agent/${id}`);
    // console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteAgent = async (id) => {
  try {
    const { data } = await api.get(`/api/agent/${id}`);
    // console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
