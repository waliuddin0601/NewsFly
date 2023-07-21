let query = window.location.search.split("?")[1].split("&")[0].split("=")[1];
let page = parseInt(
  window.location.search.split("?")[1].split("&")[1].split("=")[1]
);

let articlesPerPage;
let totalPages;

const fetchNews = async (query, page) => {
  let a = await fetch(
    `/api?q=${query}&apiKey=f9915fe6f676436d85c914d832d1c802&pageSize=10&page=${page}`
  );
  let r = await a.json();
  console.log(r);
  totalPages = Math.ceil(r.totalResults / articlesPerPage);

  if (page > 1) {
    pre.href = `/?q=${query}&page=${page - 1}`;
  }

  next.href = `/?q=${query}&page=${page + 1}`;

  let str = "";

  for (item of r.articles) {
    str =
      str +
      `
    <div class="card m-4" style="width: 18rem">
    <img src="${item.urlToImage}" class="card-img-top" alt="..." />
    <div class="card-body">
      <h5 class="card-title">${item.title}</h5>
      <p class="card-text">
       ${item.description}
      </p>
      <a target="_blank" href="${item.url}" class="btn btn-primary">Read More</a>
    </div>
  </div>`;
  }
  content.innerHTML = str;
};

if (query) fetchNews(query, page);
else {
  content.innerHTML = `<div class="card m-4" style="width: 18rem">
    <div style="width:100%;height:0;padding-bottom:69%;position:relative;"><iframe src="https://giphy.com/embed/jiiRUIaVpG89i" width="280"  style="position:absolute" frameBorder="0" ></iframe></div>
    <div class="card-body">
      <h5 class="card-title">No results</h5>
      <p class="card-text">
        Please Enter a valid query
      </p>
      <a href="/?q=all&page=1" class="btn btn-primary">Go Back</a>
    </div>
  </div>`;
}
