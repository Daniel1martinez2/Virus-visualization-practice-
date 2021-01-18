export default class Human {
  constructor({
    position,
    state,
    p
  }) {
    this.state = state;
    this.position = position;
    this.p = p;
  }

  walk = (step) => {
    switch (step) {
      case 0:
        this.position.posx++;
        break;
      case 1:
        this.position.posx--;
        break;
      case 2:
        this.position.posy--;
        break;
      case 3:
        this.position.posy++;
        break;
      default:
        break;
    }
    return {}
  };
  infect = (healthy) => {
    healthy.forEach(element => {
      if (element.state === 'health' &&
        this.p.dist(this.position.posx, this.position.posy, element.position.posx, element.position.posy) < 20) {
        console.log('alo');
        element.state = 'ill';
      }
    });
  };

  theCure = () => {
    return () => {
      setTimeout(() => {
        console.log('sano');
        this.state = 'cured';
      }, 10000);
    }
  }

  create = (humans) => {
    switch (this.state) {
      case 'health':
        this.p.fill(0, 255, 0);
        break;
      case 'ill':
        this.p.fill(255, 0, 0);
        this.infect(humans);
        let cured = this.theCure();
        cured();


        break;
      case 'cured':
        this.p.fill(0, 0, 255);
        break;

      default:
        break;
    }
    this.walk(Math.floor(Math.random() * 4));
    this.p.ellipse(this.position.posx, this.position.posy, 20, 20);
  }
}