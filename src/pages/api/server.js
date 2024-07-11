const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const generateFlowchart = (flowchartDefinition) => {
  const tempFile = path.join(__dirname, "temp.mmd");
  const outputFile = path.join(__dirname, "output.png");

  fs.writeFileSync(tempFile, flowchartDefinition);

  return new Promise((resolve, reject) => {
    exec(
      `npx mmdc -i ${tempFile} -o ${outputFile}`,
      (error, stdout, stderr) => {
        if (error) {
          reject(`Error: ${stderr}`);
        } else {
          resolve(outputFile);
        }
      }
    );
  });
};

app.post("/generate-insights", async (req, res) => {
  const {
    industry,
    businessName,
    businessDescription,
    targetMarket,
    productsServices,
    revenueModel,
    marketingStrategy,
    financialPlan,
  } = req.body;

  const flowchartDefinition = `
    graph TD;
      A[Business Plan for ${businessName}] --> B[Industry: ${industry}];
      A --> C[Business Description: ${businessDescription}];
      A --> D[Target Market: ${targetMarket}];
      A --> E[Products and Services: ${productsServices}];
      A --> F[Revenue Model: ${revenueModel}];
      A --> G[Marketing Strategy: ${marketingStrategy}];
      A --> H[Financial Plan: ${financialPlan}];
      A --> I[Future Outlook];
      I --> J[Expansion Opportunities];
      I --> K[Technological Innovations];
      I --> L[Sustainability Initiatives];
      I --> M[Strategic Partnerships];
      I --> N[Risk Management];
  `;

  try {
    const imagePath = await generateFlowchart(flowchartDefinition);
    res.sendFile(imagePath);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
