import {Component, OnInit} from '@angular/core';
import {QuizGroupService} from '../../services/quiz-group.service';
import {QuizGroupModel} from '../../models/quiz-group-model';
import {MatDialog} from '@angular/material';
import {SettingsDialogComponent} from './settings-dialog/settings-dialog.component';
import {GroupsDialogComponent} from './groups-dialog/groups-dialog.component';

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

  minGroupColorOpacity = 0.25;
  maxGroupColorOpacity = 0.75;

  rgbValues = [
    [133, 106, 126],  // Old lavender
    [125, 132, 178],  // Shadow blue
    [171, 195, 234],  // Pale cornflower blue
    [160, 166, 165],  // Quick silver
  ];

  constructor(private quizGroupService: QuizGroupService, private dialog: MatDialog) {
  }

  ngOnInit() {
    // Sync values
    this.quizGroupService.numColumnsSubject.subscribe((next) => this.numColumns = next);
    this.quizGroupService.numPointsPerClickSubject.subscribe((next) => this.numPointsPerClick = next);
    this.quizGroupService.numPointsToWinSubject.subscribe((next) => this.numPointsToWin = next);
    this.quizGroupService.groupsSubject.subscribe((next) => this.groups = next);


    // Calculate derived properties
	let maxPoints: number = 0;
    this.quizGroupService.groupsSubject.subscribe((groups) => {
      this.groups = groups;
	  maxPoints = 0;
      if (this.groups) {
        this.groups.map((group, index) => {
          if (group.waitingToEat) {
            maxPoints = Math.max(group.score, maxPoints);
          }
        });
      }
    });
    this.quizGroupService.groupsSubject.subscribe((groups) => {
      this.groups = groups;
      if (this.groups) {
        this.groups.map((group, index) => {
          let rgba;
          if (!group.waitingToEat) {
            rgba = `#659E80`;
          } else if (group.score == maxPoints) {
            rgba = `#ff9933`;
          } else {
            const rgb = this.rgbValues[index % this.rgbValues.length];
            const opacity = Math.max(
              (group.score / maxPoints * (this.maxGroupColorOpacity - this.minGroupColorOpacity)) + this.minGroupColorOpacity,
              this.minGroupColorOpacity);
            rgba = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${opacity.toFixed(2)})`;
          }
          group.color = rgba;
        });
      }
    });

    // Initialize data
    this.quizGroupService.initialize();
  }

  resetScores() {
    this.quizGroupService.resetScores();
  }

  resetAll() {
    this.quizGroupService.reset();
  }

  openSettings(): void {
    const dialogRef = this.dialog.open(SettingsDialogComponent, {});

    dialogRef.afterClosed().subscribe();
  }

  openEditGroups(): void {
    const dialogRef = this.dialog.open(GroupsDialogComponent, {
      height: '500px',
    });

    dialogRef.afterClosed().subscribe();
  }

  onLeftClick(event: MouseEvent, group: QuizGroupModel) {
    if (event.ctrlKey || event.metaKey) {  // CTRL + click on Windows, CMD + click on Mac
      this.quizGroupService.subtractPoints(group);
    } else if (event.altKey) {
      this.quizGroupService.toggleServedStatus(group);
    } else {
      this.quizGroupService.addPoints(group);
    }
  }
}
