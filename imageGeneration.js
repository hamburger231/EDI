import OpenAI from "openai";

const { animalJob, animalSpecies, animalIndex } = require('./index.html')

const image_gen = async()=>{
    const openai = new OpenAI({
        apiKey:"sk-HN3rnLRhH0v7rWjm96o1T3BlbkFJhfCin2qvw4amz4VBTquZsetx"
    });
    const response = await openai.createImage({
        model: "dall-e-3",
        prompt: "a 3d render of a "+ animalSpecies + " dressed up and working as a " + animalJob + "who is " + animalAge + "years old",
        n: 1,
        size: "1024x1792",
    });
    let image_url = response.data.data[0].url;
    let obraz = this.shadowRoot.getElementsByClassName("pudelko")[0]
    obraz.src = image_url
}
module.exports = { image_gen }

