// displays Hello world! in console (browser)
console.log("Hello world!");

// get element by that has id of 'date' from directory document 
const dateElement = document.getElementById('date');
console.log(dateElement);
// What are the data types (e.g., const)?

// gets current date
let currentDate = new Date();
// updates date based on today's date
dateElement.innerHTML = currentDate;
// Question: what is purpose of "new" here and what is the dateElement.innerHTML

// Formats year and day numeric, and month in word
let dataOptions = {year: "numeric", month: "long", day: "numeric"}
// This uses a predefined format: month day year (i.e., no day, no timestamp)
dateElement.innerHTML = currentDate.toLocaleDateString('en-US', dataOptions)

/*
	// API for getting trending topics in Twitter
	// As you can try, if you typed the Twitter URL, you can't access anything
	// Unfortunately, https://twitter-trends5.p.rapidapi.com/twitter/request.php is unavailable
*/

// Access information
const url = "https://fakestoreapi.com/products"

// These are the "requirements"
// Since URL can be accessed without requirements, no options needed
const options = {
};

/*
	// This is supposedly for the Twitter API, which does not work unfortunately
	 const options = {
	 				method: 'POST',
	 				headers: {
	 					'content-type': 'application/x-www-form-urlencoded',
	 					'X-RapidAPI-Key': 'd4921beb9amsh547da79d8b1fdb4p1cd19fjsnf45fce634508',
	 					'X-RapidAPI-Host': 'twitter-trends5.p.rapidapi.com'
	 				},
	 				body: new URLSearchParams({woeid: '23424934'})
	 			};
 */

// Question: I noticed that some used comma while others use semicolon,
// when to know which to use? I think if single datatype, use comma

// make request to fetch data, submit values from options
fetch(url, options)
.then(res => res.json())
.then(data => {
	// used to display all data from API
	console.log(data);

	/*
		// This properties are based on URL
		// This block was used to check for contents, eventually commented out
		let products = [
			// Each one of this is an object
			// it will not add actual physical data but rather collect or document
			// data related to real-world object
			{
				title: "Lips Stick",
				price: 199.9,
				description: "rose red lipstick",
				category: "beauty product",
				image: null,
				rating: {
					rate: 5,
					count: 100
				}
			},
			{
				title: "Lips Stick",
				price: 199.9,
				description: "lush pink lipstick",
				category: "beauty product",
				image: null,
				rating: {
					rate: 4,
					count: 100
				}
			}	
		];

		// displays details about product
		console.log(products);
		console.log(products[0].title);
		console.log(products[0].price);
		console.log(products[0].rating.rate);
	*/
	
	// Compiled all the title per object and store to "titles" storage
	let titles = data.map(object => {
		// console.log(object);
		// console.log(object.title);
		return object.title; //adds the title per object to the "titles"
	});

	console.log(titles);

	// Compiled all the rate per object and store to "ratings" storage
	let ratings = data.map(object => {
		return object.rating.rate; // add the rate inside the rating property per object to the "ratings" storage
	})

	console.log(ratings);

	// Retrieved element from HTML to modify it
	const myChart = document.getElementById("myChart");

	let barChart = new Chart(myChart,{
		type: 'bar',
		data: {
			labels: titles,
			datasets: [{
				label: 'Ratings of Products',
				// The basis of the bar levels are based on compiled ratings of objects, coming from the retrieved data from fetch request
				data: ratings,
				borderWidth: 2,
				// Combination of red, green, blue, transparency
				backgroundColor: [
					'rgba(255, 99, 132, 0.2)',
					'rgba(255, 159, 64, 0.2)',
		    		'rgba(255, 205, 86, 0.2)',
		    		'rgba(75, 192, 192, 0.2)',
		    		'rgba(54, 162, 235, 0.2)',
		    		'rgba(153, 102, 255, 0.2)',
		    		'rgba(201, 203, 207, 0.2)'
				],
				borderColor: [
					'rgb(255, 99, 132)',
		    		'rgb(255, 159, 64)',
		    		'rgb(255, 205, 86)',
		    		'rgb(75, 192, 192)',
		    		'rgb(54, 162, 235)',
		    		'rgb(153, 102, 255)',
		    		'rgb(201, 203, 207)'
				],
				// lights up when hovering over bars
				hoverBackgroundColor: [
					'rgb(255, 99, 132)',
		    		'rgb(255, 159, 64)',
		    		'rgb(255, 205, 86)',
		    		'rgb(75, 192, 192)',
		    		'rgb(54, 162, 235)',
		    		'rgb(153, 102, 255)',
		    		'rgb(201, 203, 207)'					
				]
			}]
		},

		// You can experiment with this to vary orientation
		options: {
			indexAxis: 'y',
			scales: {
				y:{
					beginAtZero: true
				}
			}
		}

		// Question: Where can I find possible properties of Chart
		// There is available documentation in the web 
	});

})
