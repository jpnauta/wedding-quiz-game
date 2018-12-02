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

  constructor(private quizGroupService: QuizGroupService) {
  }

  ngOnInit() {
    this.quizGroupService.numColumnsSubject.subscribe((next) => this.numColumns = next);
    this.quizGroupService.numPointsPerClickSubject.subscribe((next) => this.numPointsPerClick = next);
    this.quizGroupService.numPointsToWinSubject.subscribe((next) => this.numPointsToWin = next);
    this.quizGroupService.groupsSubject.subscribe((next) => this.groups = next);

    this.quizGroupService.initialize();
  }

  resetScore() {
    this.quizGroupService.initialize();
  }

  onLeftClick(group: QuizGroupModel) {
    this.quizGroupService.addPoints(group);
  }

  onRightClick(group: QuizGroupModel) {
    this.quizGroupService.subtractPoints(group);
  }
}
