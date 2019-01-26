import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {QuizGroupModel} from '../models/quiz-group-model';
import {ConfigService} from './config.service';

@Injectable()
export class QuizGroupService {
  numColumnsSubject = new BehaviorSubject<number>(null);
  numPointsPerClickSubject = new BehaviorSubject<number>(null);
  numPointsToWinSubject = new BehaviorSubject<number>(null);
  groupsSubject = new BehaviorSubject<QuizGroupModel[]>(null);

  private groups: QuizGroupModel[];
  private numPointsToWin: number;
  private numPointsPerClick: number;

  constructor(private configService: ConfigService) {
    // Sync values
    this.configService.configSubject.subscribe((next) => {
      this.numColumnsSubject.next(next && next.numColumns);
      this.numPointsPerClickSubject.next(next && next.numPointsPerClick);
      this.numPointsToWinSubject.next(next && next.numPointsToWin);
      this.groupsSubject.next(next && next.groups);
    });
    this.groupsSubject.subscribe((next) => this.groups = next);
    this.numPointsToWinSubject.subscribe((next) => this.numPointsToWin = next);
    this.numPointsPerClickSubject.subscribe((next) => this.numPointsPerClick = next);
  }

  initialize() {
    this.configService.initialize();
  }

  reset() {
    this.configService.reset();
  }

  addPoints(group: QuizGroupModel) {
    group.score = Math.min(group.score + this.numPointsPerClick, this.numPointsToWin);
    this.onQuizGroupChanged();
  }

  subtractPoints(group: QuizGroupModel) {
    group.score = group.score - this.numPointsPerClick;
    this.onQuizGroupChanged();
  }

  private onQuizGroupChanged() {
    this.configService.onConfigChanged();
  }

  resetScores() {
    this.configService.resetScores();
  }
}
