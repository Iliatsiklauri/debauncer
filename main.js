// ex 1

function debauncer(delay, cb) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      cb(...args);
    }, delay);
  };
}

const debouncedCordinates = debauncer(500, (e) =>
  console.log('x', e.clientX, 'y', e.clientY)
);

document.addEventListener('mousemove', debouncedCordinates);

// ex2

const container = document.querySelector('.container');
const container1 = document.querySelector('.container1');

const getData = (data) =>
  new Promise((res) => {
    fetch(data)
      .then((response) => response.json())
      .then((data) => res(data));
  });
const showData = (data, data1) => {
  container.innerHTML = data.map(
    (el) =>
      `<div>
        <h1>${el.name}</h1>
        <h1>${el.username}</h1>
        </div>`
  );
  container1.innerHTML = data1.map(
    (el) =>
      `<div>
        <h1>${el.id}</h1>
        <h1>${el.title}</h1>
        </div>`
  );
};

Promise.all([
  getData('https://jsonplaceholder.typicode.com/users'),
  getData('https://jsonplaceholder.typicode.com/posts'),
])
  .then(([res, res1]) => {
    showData(res, res1);
  })
  .catch((er) => console.log(er));
