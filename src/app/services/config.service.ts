import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {ConfigModel} from '../models/config-model';
import {QuizGroupModel} from '../models/quiz-group-model';
import {forEach} from '@angular/router/src/utils/collection';
import {LocalStorageService} from 'ngx-store';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private CONFIG_KEY = 'config';

  configSubject = new BehaviorSubject<ConfigModel>(null);

  private config: ConfigModel;

  constructor(private localStorageService: LocalStorageService) {
    // Sync values
    this.configSubject.subscribe((next) => this.config = next);

    // Save to local storage on any change
    this.configSubject.subscribe((config) => {
      if (config) {
        this.localStorageService.set(this.CONFIG_KEY, config);
      }
    });
  }

  /**
   * Forces the config to the default values
   */
  reset() {
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

  /**
   * Restores the config values from the cache
   */
  private restore() {
    this.config = this.localStorageService.get(this.CONFIG_KEY);
  }

  /**
   * Restores the config, either from from local storage or by default values
   */
  initialize() {
    this.restore();
    if (!this.config) {
      this.reset();
    }
    this.onConfigChanged();
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
      score: 0,
      waitingToEat: true
    });
    this.onConfigChanged();
  }

  /**
   * Resets all scores to zero
   */
  resetScores() {
    this.config.groups.forEach((group) => group.score = 0);
    this.config.groups.forEach((group) => group.waitingToEat = true);
    this.onConfigChanged();
  }
}
