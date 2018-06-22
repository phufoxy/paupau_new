import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { EventService } from '../core/services/event.service';

@Component({
    selector: 'event',
    templateUrl: './event.component.html',
    styleUrls: ['./event.component.css'],
    providers: [EventService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventComponent implements OnInit {

    start: boolean = false;
    stringEvent: string = 'The events we manage put us to the the test, broaden our areas of expertise and allow us to grow.'
    event: any;
    constructor(public ref: ChangeDetectorRef, public eventService: EventService) { }

    ngOnInit() {
        this.eventService.getTopEvent().subscribe(
            data => this.event = data.content[0]
        );
        setInterval(() => {
            this.ref.markForCheck();
        }, 500);
        // setTimeout(() => this.start = true, 1000)
    }

}
