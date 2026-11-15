import Agent from "../models/agent.model.js";

export const createAgent = async (req, res) => {
  try {
    const { name, knowledgeBase, instructions, tools } = req.body;
    console.log("Request body", req.body);

    if (!name || !knowledgeBase || !instructions || !tools) {
      return res.status(400).json({ message: "send all detail" });
    }
    const existingAgentName = await Agent.findOne({ name });
    if (existingAgentName) {
      return res.status(400).json({ message: "agent's name should be unique" });
    }
    const userId = req.user._id;
    console.log(userId);
    const agent = await Agent.create({
      userId,
      name,
      knowledgeBase,
      instructions,
      tools,
    });
    return res.status(201).json(agent);
  } catch (error) {
    console.log("Create agent error:", error);

    return res.status(500).json({
      message: `Create agent error: ${error.message}`,
    });
  }
};

export const getAllAgent = async (req, res) => {
  try {
    const userId = req.user._id;
    const agents = await Agent.find({
      userId,
    });
    return res.status(200).json(agents);
  } catch (error) {
    return res.status(500).json({ message: "Get all agents error${error" });
  }
};

export const getAgentById = async (req, res) => {
  try {
    const userId = req.user._id;
    const agentId = req.params.id;
    const agent = await Agent.findById(agentId);
    return res.status(200).json(agent);
  } catch (error) {
    return res.status(500).json({ message: "Get agent by id error ${error" });
  }
};

export const deleteAgent = async (req, res) => {
  try {
    const agentId = req.params.id;
    const agent = await Agent.findByIdAndDelete(agentId);
    return res.status(200).json(agent);
  } catch (error) {
    return res.status(500).json({ message: "Delete agent error ${error" });
  }
};
