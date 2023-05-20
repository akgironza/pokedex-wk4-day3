// transform given array into one of grass and poison only
/* const originalArray = [
    { slot: 1,  type: {name:  "grass", url: "https://pokeapi.co/api/v2/type/12/"}},
    { slot: 2,  type: {name: "poison", url: "https://pokeapi.co/api/v2/type/4/"}},
 ];

const reducedArray = originalArray.map(item => item.type.name);

console.log(reducedArray);
saving for later */

// DEVELOPING THE FORM FOR THE POKEMON SEARCH
// we will be pulling name, id, weight, type(s)
const $searchForm = $("form");

// prevent default refresh
$searchForm.on("submit", event => {
   event.preventDefault();
   
   // generate data from the target object
   const formData = new FormData(event.target);

   // get the value from the generated data where the name value is "pokemon" (on the form)
   const pokemon = formData.get("pokemon").toLowerCase();

   const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`

   /* $.ajax(url)
      .then(response => console.log(response));
   using ajax, not vanilla javascript */

   const $screen = $(".screen")
   const $result = $(".result");

   // empty out the input field
   $('[name = "pokemon"]')[0].value = "";

   // empty out previous result and add in a loading indicator
   $screen.empty();
   $result.html(`<div>loading...</div>`)

      fetch (url)
         .then(response => {
            return response.json();
         })

         .then(data => {
            $screen.html(
               `<img src=${data.sprites.front_default} alt=${data.name}>`
            );
         
         $result.html(`
         <div>
               <b>Name:&nbsp;</b> ${data.name}
         </div>

         <div>
               <b>ID:&nbsp;</b> ${data.id}
         </div>

         <div>
               <b>Weight:&nbsp;</b> ${data.weight}
         </div>

         <div>
            <b>Type:&nbsp;</b> ${data.types.map(v => v.type.name)}
         </div>
         `)
         })

         .catch(() => {
            $result.html(
               `<div>there was an error...</div>`
            )
         });
});




