import { Component } from '@angular/core';
import { Tutorial } from 'src/app/models/tutorial.model';
import { TutorialService } from 'src/app/services/tutorial.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-tutorial',
  templateUrl: './add-tutorial.component.html',
  styleUrls: ['./add-tutorial.component.css'],
})

  export class AddTutorialComponent {
    tutorial: Tutorial = {
      title: '',
      description: '',
      MovieTime: 0,
      ShowTime: [{ date: '', hours: '', endTime: '' }],
      published: false,

    };

  submitted = false;
  titleExists = false;
  movieTimeError = false;
  // New variable to track title existence

  constructor(private tutorialService: TutorialService) {}


  saveTutorial(): void {
    // Check if the tutorial's title already exists
    let existingTutorials: Tutorial[]; // Declare the variable

    
    this.tutorialService.getAll().subscribe((existingTutorials) => {
      
      // const isExistingST = existingTutorials.some(existingTutorial =>
      //   existingTutorial.ShowTime && existingTutorial.ShowTime.length > 0 &&
      //   existingTutorial.ShowTime.some(existingShowTime =>
      //     this.tutorial.ShowTime && this.tutorial.ShowTime.length > 0 &&
      //     existingShowTime.date === this.tutorial.ShowTime[0].date &&
      //     this.doTimesOverlap(
      //       new Date(existingShowTime.date + 'T' + existingShowTime.hours),
      //       new Date(existingShowTime.date + 'T' + existingShowTime.endTime),
      //       new Date(this.tutorial.ShowTime[0].date + 'T' + this.tutorial.ShowTime[0].hours),
      //       new Date(this.tutorial.ShowTime[0].date + 'T' + this.tutorial.ShowTime[0].endTime)
      //     )
      //   )
      // );

      // if (isExistingST) {
      //   this.issoverlapping = true; // Set error state to true

      // }
   
      const isExistingTitle = existingTutorials.some(
        (existingTutorial) => existingTutorial.title === this.tutorial.title
      );
  
      if (isExistingTitle) {
        this.titleExists = true; // Set error state to true

        return;
        
      }
      if (this.tutorial.MovieTime as number < 0 || this.tutorial.MovieTime as number > 240) {
        console.log('Please enter a positive number for MovieTime and ensure it is less than or equal to 240.');
        this.movieTimeError = true;
        return;}  
      // If the title is unique, proceed with saving the tutorial
     const data = {
  title: this.tutorial.title,
  description: this.tutorial.description,
  MovieTime: this.tutorial.MovieTime,
  ShowTime: this.tutorial.ShowTime ?? [],
 
};

      this.tutorialService.create(data).subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
      this.titleExists = false;
      this.movieTimeError = false;
    });
  }
  


addShowTime() {
    this.tutorial.ShowTime = this.tutorial.ShowTime ?? [];
    this.tutorial.ShowTime.push({ date: '', hours: '', endTime:'' });
  }

  newTutorial(): void {
    this.submitted = false;
    this.tutorial = {
      title: '',
      description: '',
      MovieTime:0,
      ShowTime:  [{ date: '', hours: '', endTime:'' }],
      published: false,
      
    };
  }

  deleteShowTime(): void {
    if (this.tutorial.ShowTime && this.tutorial.ShowTime.length > 0) {
      this.tutorial.ShowTime.pop();
    }
  }
  // add-tutorial.component.ts

  
  

  doTimesOverlap(start1: Date, end1: Date, start2: Date, end2: Date): boolean {
    return start1 < end2 && end1 > start2;
  }
  
}
