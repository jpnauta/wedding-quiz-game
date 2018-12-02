import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {QuizGroupModel} from '../models/quiz-group-model';

@Injectable()
export class QuizGroupService {
  numColumnsSubject = new BehaviorSubject<number>(null);
  numPointsPerClickSubject = new BehaviorSubject<number>(null);
  numPointsToWinSubject = new BehaviorSubject<number>(null);
  groupsSubject = new BehaviorSubject<QuizGroupModel[]>(null);

  private groups: QuizGroupModel[];

  constructor() {
    this.groupsSubject.subscribe((groups) => {
      this.groups = groups;
      if (this.groups) {
        this.groups.map((group) => {
          group.color = 'rgb(256, 0, 0, .2)';
        });
      }
    });
  }

  initialize() {
    this.numColumnsSubject.next(7);
    this.numPointsPerClickSubject.next(10);
    this.numPointsToWinSubject.next(100);
    this.groupsSubject.next([
      {name: 'Table 1', score: 0},
      {name: 'Table 2', score: 0},
      {name: 'Table 3', score: 0},
      {name: 'Table 4', score: 0},
      {name: 'Table 5', score: 0},
      {name: 'Table 6', score: 0},
      {name: 'Table 7', score: 0},
      {name: 'Table 8', score: 0},
      {name: 'Table 9', score: 0},
      {name: 'Table 10', score: 0},
      {name: 'Table 11', score: 0},
      {name: 'Table 12', score: 0},
      {name: 'Table 13', score: 0},
      {name: 'Table 14', score: 0},
      {name: 'Table 15', score: 0},
      {name: 'Table 16', score: 0},
      {name: 'Table 17', score: 0},
      {name: 'Table 18', score: 0},
      {name: 'Table 19', score: 0},
      {name: 'Table 20', score: 0},
      {name: 'Table 21', score: 0},
      {name: 'Table 23', score: 0},
      {name: 'Table 24', score: 0},
      {name: 'Table 25', score: 0},
      {name: 'Table 26', score: 0},
      {name: 'Table 27', score: 0},
      {name: 'Table 28', score: 0},
    ]);
  }

  addPoints(group: QuizGroupModel) {
    group.score += this.numPointsPerClickSubject.getValue();
    this.onQuizGroupChanged();
  }

  subtractPoints(group: QuizGroupModel) {
    group.score -= this.numPointsPerClickSubject.getValue();
    this.onQuizGroupChanged();
  }

  private onQuizGroupChanged() {
    this.groupsSubject.next(this.groupsSubject.getValue());
  }
}
