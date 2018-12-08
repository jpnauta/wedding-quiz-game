import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {ConfigModel} from '../models/config-model';
import {QuizGroupModel} from '../models/quiz-group-model';
import {forEach} from '@angular/router/src/utils/collection';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  configSubject = new BehaviorSubject<ConfigModel>(null);

  private config: ConfigModel;

  constructor() {
    this.configSubject.subscribe((next) => this.config = next);
  }

  initialize() {
    this.configSubject.next({
      numColumns: 7,
      numPointsPerClick: 10,
      numPointsToWin: 100,
      groups: []
    });

    for (const i of new Array(28)) {
      this.appendGroup();
    }
  }

  onConfigChanged() {
    this.configSubject.next(this.config);
  }

  save(config: ConfigModel) {
    this.configSubject.next(config);
  }

  removeGroup(group: QuizGroupModel) {
    this.config.groups = this.config.groups.filter(obj => obj !== group);
    this.onConfigChanged();
  }

  appendGroup() {
    this.config.groups.push({
      name: 'Table ' + (this.config.groups.length + 1),
      score: 0
    });
    this.onConfigChanged();
  }
}
