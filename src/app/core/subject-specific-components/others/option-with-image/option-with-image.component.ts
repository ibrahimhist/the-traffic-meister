import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-option-with-image',
  templateUrl: './option-with-image.component.html',
  styleUrls: ['./option-with-image.component.scss'],
})
export class OptionWithImageComponent implements OnInit {
  @Input() label: string;
  @Input() img: string;
  @Input() errorImg: string;

  constructor() {}

  ngOnInit(): void {}

  onError() {
    this.img = this.errorImg;
  }
}
