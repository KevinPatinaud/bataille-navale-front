import { Component, EventEmitter, Input, Output } from "@angular/core";
import {
  Croiseur,
  PorteAvion,
  SousMarin_1,
  SousMarin_2,
  Torpilleur,
} from "src/app/locales/boats";
import Boat from "src/app/models/boat";
import { BoatDescription } from "src/app/models/boatDescription";
import { CdkDrag, CdkDragStart, Point } from "@angular/cdk/drag-drop";

@Component({
  selector: "app-boat-selector",
  templateUrl: "./boatSelector.component.html",
  styleUrls: ["./boatSelector.component.css"],
})
export class BoatSelectorComponent {
  @Output() onBoatSelectedEvent = new EventEmitter<BoatDescription>();
  @Output() onLastBoatSelectedEvent = new EventEmitter();
  @Input() selectedBoat?: BoatDescription;
  @Input() onGridBoats?: Boat[];

  PorteAvion = PorteAvion;
  Croiseur = Croiseur;
  SousMarin_1 = SousMarin_1;
  SousMarin_2 = SousMarin_2;
  Torpilleur = Torpilleur;

  freeDragPosition: Point = { x: 0, y: 0 };
  private initialPosition: Point = { x: 0, y: 0 };

  onBoatSelected(boat: BoatDescription) {
    if (!this.isBoatOnTheGrid(boat)) {
      this.onBoatSelectedEvent.emit(boat);
    }
    if (this.onGridBoats && this.onGridBoats.length + 1 === 5) {
      this.onLastBoatSelectedEvent.emit();
    }
  }

  isBoatOnTheGrid(boat: BoatDescription) {
    return (
      this.onGridBoats?.filter(
        (b: Boat) => b.boatDescription.type === boat.type
      ).length === 1
    );
  }

  dragStarted(event: CdkDragStart) {
    this.initialPosition = {
      x: this.freeDragPosition.x,
      y: this.freeDragPosition.y,
    };
  }

  dragEnded() {
    this.freeDragPosition = {
      x: this.initialPosition.x,
      y: this.initialPosition.y,
    };
  }
}
