import {Component, OnInit} from '@angular/core';
import {QuizGroupService} from '../../services/quiz-group.service';
import {QuizGroupModel} from '../../models/quiz-group-model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  numColumns: number;
  numPointsPerClick: number;
  numPointsToWin: number;
  groups: QuizGroupModel[];

  minGroupColorOpacity = 0.1;
  maxGroupColorOpacity = 0.5;

  constructor(private quizGroupService: QuizGroupService) {
  }

  ngOnInit() {
    // Sync values
    this.quizGroupService.numColumnsSubject.subscribe((next) => this.numColumns = next);
    this.quizGroupService.numPointsPerClickSubject.subscribe((next) => this.numPointsPerClick = next);
    this.quizGroupService.numPointsToWinSubject.subscribe((next) => this.numPointsToWin = next);
    this.quizGroupService.groupsSubject.subscribe((next) => this.groups = next);


    // Calculate derived properties
    this.quizGroupService.groupsSubject.subscribe((groups) => {
      this.groups = groups;
      if (this.groups) {
        this.groups.map((group) => {
          let color;
          if (group.score >= this.numPointsToWin) {
            color = `#659E80`;
          } else {
            const opacity = Math.max(
              (group.score / this.numPointsToWin * (this.maxGroupColorOpacity - this.minGroupColorOpacity)) + this.minGroupColorOpacity,
              this.minGroupColorOpacity);
            color = `rgb(136, 106, 126, ${opacity.toFixed(2)})`;
          }
          group.color = color;
        });
      }
    });

    // Initialize data
    this.quizGroupService.initialize();
  }

  reset() {
    this.quizGroupService.initialize();
  }

  onLeftClick(group: QuizGroupModel) {
    this.quizGroupService.addPoints(group);
  }

  onRightClick(group: QuizGroupModel) {
    this.quizGroupService.subtractPoints(group);
  }
}
