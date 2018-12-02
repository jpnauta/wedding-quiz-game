import {TestBed} from '@angular/core/testing';

import {QuizGroupService} from './quiz-group.service';

describe('QuizGroupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QuizGroupService = TestBed.get(QuizGroupService);
    expect(service).toBeTruthy();
  });
});
