import {QuizGroupModel} from './quiz-group-model';

export interface ConfigModel {
  numColumns: number;
  groups: QuizGroupModel[];
  numPointsToWin: number;
  numPointsPerClick: number;
}
