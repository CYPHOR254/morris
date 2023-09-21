import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-havard',
  templateUrl: './havard.component.html',
  styleUrls: ['./havard.component.css']
})
export class HavardComponent {

  // slideIndex = 1;

  // ngOnInit() {
  //   this.showSlides(this.slideIndex);
  // }

  // openModal() {
  //   const modal = document.getElementById("myModal");
  //   if (modal) {
  //     modal.style.display = "block";
  //   }
  // }
  
  // closeModal() {
  //   const modal = document.getElementById("myModal");
  //   if (modal) {
  //     modal.style.display = "none";
  //   }
  // }
  

  // plusSlides(n: number) {
  //   this.showSlides(this.slideIndex += n);
  // }

  // currentSlide(n: number) {
  //   this.showSlides(this.slideIndex = n);
  // }

  // showSlides(n: number) {
  //   const slides = document.getElementsByClassName("mySlides");
  //   const dots = document.getElementsByClassName("demo");
  //   const captionText = document.getElementById("caption");

  //   if (slides !== null && dots !== null && captionText !== null) {
  //     if (n > slides.length) {
  //       this.slideIndex = 1;
  //     }
  //     if (n < 1) {
  //       this.slideIndex = slides.length;
  //     }

  //     for (let i = 0; i < slides.length; i++) {
  //       const slide = slides[i] as HTMLElement;
  //       slide.style.display = "none";
  //     }

  //     for (let i = 0; i < dots.length; i++) {
  //       const dot = dots[i] as HTMLElement;
  //       dot.className = dot.className.replace(" active", "");
  //     }

  //     const currentSlide = slides[this.slideIndex - 1] as HTMLElement;
  //     const currentDot = dots[this.slideIndex - 1] as HTMLElement;

  //     if (currentSlide !== null && currentDot !== null) {
  //       currentSlide.style.display = "block";
  //       currentDot.className += " active";
  //       const altText = currentDot.getAttribute("alt");
  //       if (altText !== null) {
  //         captionText.innerHTML = altText;
  //       }
  //     }
  //   }
  // }
}