const d = document,
	$sectionImages = d.querySelector(".imagenes"),
	$sectionVideo = d.querySelector(".videos"),
	$navImg = d.querySelector(".nav-img"),
	$navVideo = d.querySelector(".nav-video"),
	$btnImg = d.querySelector(".btn-img"),
	$btnVideo = d.querySelector(".btn-video"),
	$loader = d.querySelector(".loader"),
	$inputImg = d.querySelector(".s-img"),
	$inputVideo = d.querySelector(".s-video"),
	apiKey = "563492ad6f917000010000010fc16e753c264e85af65a56f7f5e9bdf",
	$templateImg = d.getElementById("template-imagenes").content,
	$fragmentImg = d.createDocumentFragment(),
	$imgContainer = d.querySelector(".imagenes-contenedor"),
	$templateVideos = d.getElementById("template-videos").content,
	$fragmentVideos = d.createDocumentFragment(),
	$videosContainer = d.querySelector(".videos-contenedor");

const nav = () => {
	$navImg.addEventListener("click", (e) => {
		e.preventDefault();
		$navImg.classList.add("focus");
		$navVideo.classList.remove("focus");
		$sectionVideo.classList.add("hidden");
		$sectionImages.classList.remove("hidden");
	});

	$navVideo.addEventListener("click", (e) => {
		e.preventDefault();
		$navVideo.classList.add("focus");
		$navImg.classList.remove("focus");
		$sectionImages.classList.add("hidden");
		$sectionVideo.classList.remove("hidden");
	});
};

let pageIMG = 1;
const getImages = () => {
	let query = $inputImg.value.toLowerCase();
	const options = {
		headers: {
			Authorization: apiKey,
		},
	};

	let urlImages = `https://api.pexels.com/v1/search?page=${pageIMG}&query=${query}`;

	$loader.classList.remove("hidden");

	fetch(urlImages, options)
		.then((res) => (res.ok ? res.json() : Promise.reject()))
		.then((json) => {
			let images = json.photos;
			images.forEach((el) => {
				$templateImg.querySelector("img").src = el.src.small;

				let clone = d.importNode($templateImg, true);
				$fragmentImg.appendChild(clone);
			});
			$loader.classList.add("hidden");
			$imgContainer.appendChild($fragmentImg);

			let $links = d.querySelector(".links");
			let $next = d.createElement("a");
			$next.textContent = "Cargar más...";
			$next.classList.add("more");
			$next.href = "#";

			if (!$links.hasChildNodes()) {
				$links.appendChild($next);
			}

			$next.addEventListener("click", (e) => {
				e.preventDefault();
				pageIMG++;
				getImages();
			});
		})
		.catch((err) => {
			console.log(err);
		});
};

let pageVideo = 1;
const getVideos = () => {
	let query = $inputVideo.value.toLowerCase();

	const urlVideos = `https://api.pexels.com/v1/videos/search?page=${pageVideo}&query=${query}`;
	const options = {
		headers: {
			Authorization: apiKey,
		},
	};

	$loader.classList.remove("hidden");

	fetch(urlVideos, options)
		.then((res) => (res.ok ? res.json() : Promise.reject()))
		.then((json) => {
			let videos = json.videos;

			videos.forEach((el) => {
				$templateVideos.querySelector("source").src = el.video_files[0].link;

				let clone = d.importNode($templateVideos, true);
				$fragmentVideos.appendChild(clone);
			});

			$loader.classList.add("hidden");
			$videosContainer.appendChild($fragmentVideos);

			let $links = d.querySelector(".linksv");
			let $next = d.createElement("a");
			$next.classList.add("more");
			$next.textContent = "Cargar más...";
			$next.href = "#";

			if (!$links.hasChildNodes()) {
				$links.appendChild($next);
			}

			$next.addEventListener("click", (e) => {
				e.preventDefault();
				pageVideo++;
				getVideos();
			});
		})
		.catch((err) => {
			console.log(err);
		});
};

d.addEventListener("click", (e) => {
	if (e.target === $btnImg) {
		e.preventDefault();
		$imgContainer.innerHTML = "";
		getImages();
	}

	if (e.target === $btnVideo) {
		e.preventDefault();
		$videosContainer.innerHTML = "";
		getVideos();
	}
});

(function main() {
	nav();
})();
