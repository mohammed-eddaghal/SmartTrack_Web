import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
    name: 'customtimeformatter'
})
export class CustomtimeformatterPipe implements PipeTransform {

    transform(value: number): string {
        let temp = value;
        const hours = Math.floor((temp / 3600));
        const minutes: number = Math.floor((temp / 60) / 60);
        const seconds = Math.floor(temp % 3600 % 60);
        return (hours < 10 ? '0' + hours : hours) + ':' + (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds);
    }
}

