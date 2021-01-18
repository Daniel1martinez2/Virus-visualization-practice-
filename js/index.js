import Human from './Human.js';
let healthS = document.querySelector('.health');
let cured = document.querySelector('.cured');
let ill = document.querySelector('.ill');


const groupBy = (objectArray, property) => {
  return objectArray.reduce(function (acc, obj) {
    let key = obj[property]
    if (!acc[key]) {
      acc[key] = []
    }
    acc[key].push(obj)
    return acc
  }, {});
}
let sketch = (p) => {
  let human;
  let container;
  let humans = Array.from({
    length: 30
  }, (_, key) => {
    const humanBeing = new Human({
      position: {
        posx: Math.floor(Math.random() * 300),
        posy: Math.floor(Math.random() * 300)
      },
      state: 'health',
      p
    })
    return humanBeing
  });
  p.preload = () => {}
  p.setup = () => {
    console.log(humans);
    container = document.querySelector('.canvas');
    const canvas = p.createCanvas(container.clientWidth, container.clientHeight);
    canvas.parent(container);
    human = new Human({
      position: {
        posx: 100,
        posy: 200
      },
      state: 'ill',
      p
    });
  }
  p.windowResized = () => {
    p.resizeCanvas(container.clientWidth, container.clientHeight)
  }
  p.draw = () => {
    p.background(0);
    human.create(humans);
    humans.forEach(h => h.create(humans));
    let groupedPeople = groupBy([...humans, human], 'state');
    healthS.querySelector('strong').innerText = groupedPeople.health.length;
    cured.querySelector('strong').innerText = groupedPeople.cured != null ? groupedPeople.cured.length : '0';
    ill.querySelector('strong').innerText = groupedPeople.ill != null ? groupedPeople.ill.length : '0';

  }
}
let p5js = new p5(sketch);