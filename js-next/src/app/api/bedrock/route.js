import {
  BedrockRuntimeClient,
  InvokeModelCommand,
} from "@aws-sdk/client-bedrock-runtime";

const creds = {
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
};

export async function POST(req, res) {
  // Process a POST request
  const client = new BedrockRuntimeClient(creds);

  // console.log(req.body)
  const inputMessage = await req.json();

  const input = {
    modelId: "amazon.titan-text-premier-v1:0",
    contentType: "application/json",
    accept: "application/json",
    body: JSON.stringify({
      inputText: inputMessage.message,
      textGenerationConfig: {
        temperature: 0.7,
        topP: 1,
        stopSequences: [],
      },
    }),
  };

  const command = new InvokeModelCommand(input);
  const response = await client.send(command);
  const rawRes = response.body;
  const jsonString = new TextDecoder().decode(rawRes);
  const parsedResponse = JSON.parse(jsonString);
  const textReply = parsedResponse.results[0].outputText;

  return new Response(textReply, {
    status: 200,
  });
}
