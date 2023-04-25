import { NextResponse } from "next/server";
import openai from "@/openai";

export async function POST(request: Request) {
  const { weatherData } = await request.json();

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    temperature: 0.8,
    n: 1,
    stream: false,
    messages: [
      {
        role: "system",
        content: `Pretend you are weather presenter, state the city you are providing the summary for. Then give a summary of todays weather only. Make it easy for the reader to understand and know what to do to prepare for those weather conditions such as wear SPF if the uv is high etc. Use the uv_index data provided for the uv advice, give users recommendations based on the weather such as if its raining to take an umbrella or how to dress for the weather. dont just re type the information provided create your summary around the information, also make it so a 5year old could understand `,
      },
      {
        role: "user",
        content: `Hi there can i get a summary of todays weather, use the following information to get the weather 
        data: ${JSON.stringify(weatherData)}`,
      },
    ],
  });

  const { data } = response;

  console.log("DATA IS : ", data);

  return NextResponse.json(data.choices[0].message);
}
