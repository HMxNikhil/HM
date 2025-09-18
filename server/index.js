import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { MongoClient, ObjectId } from "mongodb";

// Load .env variables from project root
dotenv.config();

const app = express();
app.use(express.json());

// Configure CORS to allow the frontend origin(s)
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:5173";
const PREVIEW_ORIGIN = process.env.PREVIEW_ORIGIN || "https://89526568e31742afa21709ebb3bdb718-7a7142784232428b99c71dd48.projects.builder.codes";
app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin like mobile apps or curl
      if (!origin) return callback(null, true);
      const allowed = [CLIENT_ORIGIN, PREVIEW_ORIGIN];
      if (allowed.includes(origin)) return callback(null, true);
      return callback(new Error("CORS policy: This origin is not allowed"));
    },
  }),
);

// MongoDB connection setup
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.warn("Warning: MONGODB_URI is not set. The server will not start without a MongoDB connection string.");
}

const client = new MongoClient(MONGODB_URI || "", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let db;
let themesColl;
let outputsColl;

async function connectDB() {
  if (!MONGODB_URI) throw new Error("MONGODB_URI not provided in .env");
  await client.connect();
  db = client.db(process.env.MONGODB_DB || "ai_hackathon_hub");
  themesColl = db.collection("themes");
  outputsColl = db.collection("outputs");

  // Seed themes if empty
  const count = await themesColl.countDocuments();
  if (count === 0) {
    const seed = [
      {
        slug: "ai-climate",
        name: "AI for Climate Change",
        description: "Projects using AI to monitor, mitigate or adapt to climate change.",
      },
      { slug: "fintech", name: "FinTech", description: "Payments, fraud detection, and financial insights powered by AI." },
      { slug: "healthcare", name: "Healthcare", description: "Medical AI for diagnostics, triage, and patient support." },
      { slug: "education", name: "Education", description: "Personalized learning and assessment with AI." },
    ];
    await themesColl.insertMany(seed);
    console.log("Seeded default themes into MongoDB");
  }
}

// Helper: store generated output and return the record
async function storeOutput(type, input, result) {
  const doc = {
    type,
    input,
    result,
    createdAt: new Date(),
  };
  const res = await outputsColl.insertOne(doc);
  return { id: res.insertedId, ...doc };
}

// Mockable AI generation helpers. If EMERGENT_API_KEY is present, this function demonstrates how you'd call
// an external AI endpoint. For this example we fall back to deterministic mock outputs to keep the server runnable
// without external API keys.
const EMERGENT_API_KEY = process.env.EMERGENT_API_KEY || null;

async function callEmergentAI(prompt, options = {}) {
  // Example placeholder — replace with the real API integration you have
  if (!EMERGENT_API_KEY) {
    // Return a mock response for offline / testing
    return { text: `MOCK: Generated content for prompt: ${prompt.slice(0, 120)}...` };
  }

  // Example fetch usage (Node 18+ has global fetch)
  try {
    const resp = await fetch("https://api.emergent.ai/v1/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${EMERGENT_API_KEY}`,
      },
      body: JSON.stringify({ prompt, ...options }),
    });
    if (!resp.ok) {
      const text = await resp.text();
      throw new Error(`Emergent API error: ${resp.status} ${text}`);
    }
    const json = await resp.json();
    // adapt to actual API shape; using json.text as a placeholder
    return json;
  } catch (err) {
    console.error("Error calling Emergent AI:", err);
    // fallback to mock
    return { text: `MOCK-FALLBACK: ${err.message}` };
  }
}

// Route: GET /api/themes
// Returns the list of themes stored in MongoDB
app.get("/api/themes", async (req, res) => {
  try {
    const themes = await themesColl.find().toArray();
    res.json({ success: true, data: themes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Failed to fetch themes" });
  }
});

// Route: POST /api/idea
// Accepts { theme } and returns array of generated project ideas
app.post("/api/idea", async (req, res) => {
  try {
    const { theme } = req.body;
    if (!theme) return res.status(400).json({ success: false, error: "Missing 'theme' in request body" });

    // Build a prompt for AI generation
    const prompt = `Generate 4 concise hackathon project ideas for the theme: ${theme}. For each idea include a short title and one-sentence description and feasibility (Low/Medium/High).`;
    const aiResp = await callEmergentAI(prompt, { max_tokens: 400 });
    // Normalize the response. For mock we produce a simple list
    let ideas = [];
    if (aiResp && aiResp.ideas) {
      ideas = aiResp.ideas;
    } else if (aiResp && aiResp.text) {
      // Simple parser for mock text — produce deterministic ideas
      ideas = [
        { title: `${theme} Idea A`, description: `A prototype idea for ${theme}`, feasibility: "High" },
        { title: `${theme} Idea B`, description: `Another approach for ${theme}`, feasibility: "Medium" },
        { title: `${theme} Idea C`, description: `Experimental idea for ${theme}`, feasibility: "Low" },
      ];
    }

    const stored = await storeOutput("ideas", { theme }, { ideas });
    res.json({ success: true, data: { ideas, id: stored.id } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Failed to generate ideas" });
  }
});

// Route: POST /api/architecture
// Accepts { projectIdea } and returns architecture suggestions
app.post("/api/architecture", async (req, res) => {
  try {
    const { projectIdea } = req.body;
    if (!projectIdea) return res.status(400).json({ success: false, error: "Missing 'projectIdea' in request body" });

    const prompt = `Provide a concise system architecture for the following project idea: ${JSON.stringify(projectIdea)}. Include recommended tech stack, components, and a brief mermaid diagram description.`;
    const aiResp = await callEmergentAI(prompt, { max_tokens: 800 });

    const architecture = aiResp.architecture || aiResp.text || "Mock architecture suggestions: Frontend -> Backend -> DB, deploy containers, use async workers for ML tasks.";

    const stored = await storeOutput("architecture", { projectIdea }, { architecture });
    res.json({ success: true, data: { architecture, id: stored.id } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Failed to generate architecture" });
  }
});

// Route: POST /api/code
// Accepts { architectureDetails } and returns starter code snippets
app.post("/api/code", async (req, res) => {
  try {
    const { architectureDetails } = req.body;
    if (!architectureDetails) return res.status(400).json({ success: false, error: "Missing 'architectureDetails' in request body" });

    const prompt = `Generate starter code snippets (frontend, backend, database schema) for the following architecture: ${JSON.stringify(architectureDetails)}.`;
    const aiResp = await callEmergentAI(prompt, { max_tokens: 1000 });

    const code = aiResp.code || {
      frontend: `// Frontend starter code for ${architectureDetails?.name || "project"}`,
      backend: `// Backend starter code`,
      database: `-- SQL schema`,
    };

    const stored = await storeOutput("code", { architectureDetails }, { code });
    res.json({ success: true, data: { code, id: stored.id } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Failed to generate code" });
  }
});

// Route: POST /api/docs
// Accepts { projectSummary } and returns README and pitch deck outline
app.post("/api/docs", async (req, res) => {
  try {
    const { projectSummary } = req.body;
    if (!projectSummary) return res.status(400).json({ success: false, error: "Missing 'projectSummary' in request body" });

    const prompt = `Generate a README.md and a short pitch deck outline for the project: ${JSON.stringify(projectSummary)}.`;
    const aiResp = await callEmergentAI(prompt, { max_tokens: 800 });

    const docs = aiResp.docs || aiResp.text || { readme: `# ${projectSummary?.title || "Project"}\n\nDescription...`, pitch: ["One-liner", "Problem", "Solution"] };

    const stored = await storeOutput("docs", { projectSummary }, { docs });
    res.json({ success: true, data: { docs, id: stored.id } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Failed to generate docs" });
  }
});

// Generic error handler for unmatched routes
app.use((req, res) => {
  res.status(404).json({ success: false, error: "Endpoint not found" });
});

// Start the server after connecting to DB
const PORT = process.env.PORT || 4000;

(async () => {
  try {
    await connectDB();
    app.listen(PORT, () => console.log(`API server running on port ${PORT}`));
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
})();
