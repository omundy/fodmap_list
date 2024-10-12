(async () => {
	let json = await fetch("./fodmap_repo.json")
		.then((d) => d.json())
		.then((d) => {
			// console.log(d);
			return d;
		});

	// sort
	// console.log("json 1", json[1]);
	json = json.sort((a, b) => a.name.localeCompare(b.name));
	// console.log("json 2", json[1]);

	let foods = {};
	// process
	for (const obj in json) {
		let f = json[obj];
		// console.log(`${f.name}: ${f.category}`);
		// add category
		if (!foods[f.category]) {
			foods[f.category] = {
				low: [],
				high: [],
			};
		}
		foods[f.category][f.fodmap].push(f);
	}
	console.log("foods.Fruit.high[1]", foods.Fruit.high[1]);

	let html = ``;
	let cat = "";
	let count = 0;
	let max = 22;
	for (const c in foods) {
		let f = {};
		if (count++ > max) {
			count = 0;
			// html += `</div><div class="col">`;
		}
		if (cat != c) {
			cat = c;
			html += `<div class="c p-1">${cat}</div>`;
		}
		// html += `<div class="lowH p-1">Low</div>`;
		for (let i = 0; i < foods[c]["low"].length; i++) {
			f = foods[c]["low"][i];
			html += `<div class="px-1 low f">${f.name} ${getDetails(f)}</div>`;
		}
		// html += `<div class="highH p-1">High</div>`;
		for (let i = 0; i < foods[c]["high"].length; i++) {
			f = foods[c]["high"][i];
			html += `<div class="px-1 high f">${f.name} ${getDetails(f)}</div>`;
		}
	}
	document.querySelector(".foods").innerHTML = html;
})();

function getDetails(f) {
	let d = "";
	if (f.details) {
		if (f.details.oligos > 1) d += "<b>O</b>";
		else if (f.details.oligos > 0) d += "O";
		if (f.details.fructose > 1) d += "<b>F</b>";
		else if (f.details.fructose > 0) d += "F";
		if (f.details.polyols > 1) d += "<b>P</b>";
		else if (f.details.polyols > 0) d += "P";
		if (f.details.lactose > 1) d += "<b>L</b>";
		else if (f.details.lactose > 0) d += "L";
	}
	// if (d.length > 0) d = `[${d}]`;
	return d;
}
