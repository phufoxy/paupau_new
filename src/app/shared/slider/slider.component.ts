import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Slider } from 'ngx-slider';
import { HomeService } from '../../core/services/home.service';

@Component({
    selector: 'slider',
    templateUrl: './slider.component.html',
    styleUrls: ['./slider.component.css'],
    providers: [HomeService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SliderComponent implements OnInit {

    public slider = new Slider();

    constructor(private homeService: HomeService, private ref: ChangeDetectorRef) {
        this.slider.config.loop = true;
        this.slider.config.showPreview = false;
        this.slider.config.showTitle = false;
        this.slider.config.showNavigator = true;
        this.slider.config.showDots = true;

    }

    ngOnInit() {

        this.homeService.getTopSlide().subscribe(
            data => {
                // console.log(data);
                data.forEach(element => {
                    this.slider.items.push({ src: 'https://nameless-beyond-97489.herokuapp.com' + element.image, title: element.title });
                });
            }

        );
        setInterval(() => {
            this.ref.markForCheck();
        }, 1000);
        // const slideItems = [
        //   { src: 'assets/img/slide-01.jpg', title: 'Title 1' },
        //   { src: 'assets/img/slide-02.jpg', title: 'Title 2' },
        //   { src: 'assets/img/slide-03.jpg', title: 'Title 3' },
        // ];

        // this.slider.items = slideItems;
    }

}
