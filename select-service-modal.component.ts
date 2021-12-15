import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-select-service-modal',
  templateUrl: './select-service-modal.component.html',
  styleUrls: ['./select-service-modal.component.scss']
})
export class SelectServiceModalComponent implements OnInit, OnDestroy {

  unsubscribe$ = new Subject<void>();
  selectedServices: any[] = [];
  filteredServices: any[] = [];
  services: any[] = [];
  search = new FormControl('');

  constructor(
    public dialogRef: MatDialogRef<SelectServiceModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { services: any[], selected: any[] },
  ) {
    console.log('data :>> ', data);
    this.services = data.services;
    this.selectedServices = [...data.selected]
  }


  ngOnInit(): void {
    this.filteredServices = this.services;

    this.search.valueChanges.pipe(takeUntil(this.unsubscribe$)).subscribe((val: string) => {
      console.log(val);
      if (val == "") {
        this.filteredServices = this.services;
      }
      else {

      }

      this.filteredServices = this.services.filter((x: string) => {
        return x.toLowerCase().includes(val.toLowerCase());
      });


      console.log('selectedServices :>> ', this.selectedServices);
      console.log('filteredServices :>> ', this.filteredServices);
      console.log('services :>> ', this.services);
    })
  }


  ngOnDestroy() {
    this.unsubscribe$ ? this.unsubscribe$.next() : null;
    this.unsubscribe$ ? this.unsubscribe$.complete() : null;
  }

  isSelected(service: string): boolean {
    return this.selectedServices.includes(service);
  }

  selectService(service: string) {
    if (this.selectedServices.includes(service)) {
      const index = this.selectedServices.indexOf(service);
      if (index !== -1) {
        this.selectedServices.splice(index, 1);
      }
    }
    else {
      this.selectedServices.push(service);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

  onApply(): void {
    this.dialogRef.close(this.selectedServices);
  }

}
