import React, { useState } from "react";
import JsonToTypescript from "../JsonToTypescript/JsonToTypescript";

interface ConversionPanelProps {}

const ConversionPanel: React.FC<ConversionPanelProps> = () => {
  const [jsonInput, setJsonInput] = useState<string>("{}");
  const [interfaceName, setInterfaceName] = useState<string>("");
  const [interfaceOutput, setInterfaceOutput] = useState<string>("");

  const generateInterface = () => {
    let json;
    try {
      json = JSON.parse(jsonInput);
    } catch (error) {
      alert("Invalid JSON input - Please correct formatting");
      return;
    }
    const interfaceCode = JsonToTypescript(json, interfaceName);
    setInterfaceOutput(interfaceCode);
  };

  const handleJsonChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    try {
      const formattedJson = JSON.stringify(
        JSON.parse(event.target.value),
        null,
        2
      );
      setJsonInput(formattedJson);
    } catch (error) {
      setJsonInput(event.target.value);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <div style={{ padding: "16px" }}>
        <h1 style={{ fontSize: "32px", marginBottom: "8px" }}>
          JSON to TypeScript Interface Conversion
        </h1>
        <textarea
          value={jsonInput}
          onChange={handleJsonChange}
          placeholder="Enter JSON here (e.g. {})"
          style={{
            width: "100%",
            height: "150px",
            resize: "none",
            fontFamily: "Consolas, monospace",
          }}
        />
      </div>
      <div style={{ padding: "16px" }}>
        <h2 style={{ fontSize: "24px", marginBottom: "8px" }}>
          TypeScript Interface Output
        </h2>
        <input
          value={interfaceName}
          onChange={(event) => setInterfaceName(event.target.value)}
          placeholder="Interface name (optional)"
          style={{ width: "100%", marginBottom: "8px", fontSize: "16px" }}
        />
        <button
          onClick={generateInterface}
          style={{ marginBottom: "8px", fontSize: "16px" }}
        >
          Generate Interface
        </button>
        <pre
          style={{
            backgroundColor: "#F7F7F7",
            padding: "16px",
            borderRadius: "4px",
            whiteSpace: "pre-wrap",
            wordWrap: "break-word",
            fontFamily: "Consolas, monospace",
            fontSize: "14px",
            lineHeight: "1.5",
            overflow: "auto",
          }}
        >
          {interfaceOutput}
        </pre>
      </div>
    </div>
  );
};

export default ConversionPanel;
