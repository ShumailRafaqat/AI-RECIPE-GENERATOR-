function displayRecipe(response) {
  const recipeElement = document.querySelector("#recipe");
  const downloadButton = document.querySelector("#download-button");

  // Get the recipe details from the response
  const recipeData = response.data.answer;

  // Insert the recipe into the page using Typewriter effect
  new Typewriter("#recipe", {
    strings: recipeData,
    autoStart: true,
    delay: 50,
    cursor: "",
  });

  // Show the download button after the recipe is generated
  downloadButton.classList.remove("hidden");

  // Add event listener to download button
  downloadButton.addEventListener("click", () => downloadRecipe(recipeData));
}

function generateRecipe(event) {
  event.preventDefault();

  let instructionInput = document.querySelector("#user-instructions");
  let servingsInput = document.querySelector("#servings-input");
  let timeInput = document.querySelector("#time-input");

  let apiKey = "ca80fb7d3o48t3c14460b13a3d83ca48";
  let prompt = `User instructions: Generate a recipe for ${instructionInput.value}. Servings: ${servingsInput.value}. Cooking Time: ${timeInput.value} minutes.`;
  let context =
    "You are a renowned chef who knows all the recipes around the world. Follow the user instructions clearly to generate a recipe. First, write the 'title' of the recipe inside a <h2> element. Secondly, summarize the 'cooking duration' and 'serving size' inside a standard <p> element. Thirdly, begin with the 'Ingredients' header inside a <h3> element, list the required ingredients in bullet point symbol, and separate each line item with a <br/>. Next, begin with the 'Instructions' header inside a <h3> element, list the recipe step-by-step in numbered list format, and separate each step with a <br/>. Lastly, sign off the recipe with 'The Connoisseur AI Recipe' inside an <em> element at the end of the recipe after a <br/>.";
  
  let apiUrl = `https://api.shecodes.io/ai/v1/generate?prompt=${prompt}&context=${context}&key=${apiKey}`;

  let recipeElement = document.querySelector("#recipe");
  recipeElement.classList.remove("hidden");
  recipeElement.innerHTML = `<div class="blink"> 👨🏻‍🍳 Generating a recipe for ${instructionInput.value}...</div>`;

  axios.get(apiUrl).then(displayRecipe);
}

function downloadRecipe(recipeData) {
  const blob = new Blob([recipeData], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "recipe.txt";
  link.click();
}

let recipeForm = document.querySelector("#recipe-form");
recipeForm.addEventListener("submit", generateRecipe);
