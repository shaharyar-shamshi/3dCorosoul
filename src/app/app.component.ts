import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AppService } from './services/app.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit, AfterViewInit{
  
  newList: any = [];
  carousel: any;
  figure: any;
  numImages: any;
  theta: number;
  currImage: number;
  images: any;
  gap: any;
  bfc: boolean;
  

  constructor(public appService:AppService) {

  }

  ngAfterViewInit(): void {
    setTimeout(()=> {
      this.initiate3DCorosoul();
    }, 5000);
    setInterval(()=> {
      this.onClick(true);
    }, 5000);
  }

  ngOnInit(): void {
    this.getImage();
  }
  getImage() {
    this.appService.getImage().subscribe(
      (data, err) => {
      if (err) {
        console.log("Some error occured");
        return;
      }
       data.forEach(element => {
          const imageObj = {
            src: element.urls.small
          }
         this.newList.push(imageObj);
       });
  })
}
initiate3DCorosoul() {
  this.carousel = document.querySelector('.carousel');
  this.figure = this.carousel.querySelector('figure');
  this.numImages = this.newList.length;
  this.theta =  (2 * Math.PI) / this.numImages;
  this.currImage = 0;
  this.initiateCorosoul(this.carousel);
}
initiateCorosoul(root) {
let img = this.figure.children;
this.images = [].slice.call(img);
  this.gap = root.dataset.gap || 0;
  this.bfc = 'bfc' in root.dataset;
  this.setupCarousel(this.images.length, 1000);
}
setupCarousel(n, s) {
  let	apothem = s / (2 * Math.tan(Math.PI / n));
  
  this.figure.style.transformOrigin = `50% 50% ${- apothem}px`;
  
  for (let i = 0; i < n; i++)
    this.images[i].style.padding = `${this.gap}px`;
  for (let i = 1; i < n; i++) {
    this.images[i].style.transformOrigin = `50% 50% ${- apothem}px`;
    this.images[i].style.transform = `rotateY(${i * this.theta}rad)`;
  }
  if (this.bfc)
    for (let i = 0; i < n; i++)
       this.images[i].style.backfaceVisibility = 'hidden';
  
  this.rotateCarousel(this.currImage);
}
rotateCarousel(imageIndex) {
  this.figure.style.transform = `rotateY(${imageIndex * -this.theta}rad)`;
}


onClick(value) {
  if(value) {
    this.currImage++;
  } else {
    this.currImage--;
  }
  this.rotateCarousel(this.currImage);
}

  title = 'corosoul';
}
