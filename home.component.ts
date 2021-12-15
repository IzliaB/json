import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Affiliate, profileAffiliate } from '../../../booking/components/home/model/IprofileDoctor'
import { ProfileModel } from './model/profile-model'
import { FormControl } from '@angular/forms';
import { CargarScriptsService } from './services/cargar-scripts.service';
import { BookingService } from '../../services/booking.service';
import { ActivatedRoute, Router, RoutesRecognized } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HotToastService } from '@ngneat/hot-toast';
import { DoctorModel } from '../../models/doctor.model';
import { MatDialog } from '@angular/material/dialog';
import { SelectServiceModalComponent } from './select-service-modal/select-service-modal.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  unsubscribe$ = new Subject<void>();

  afilliate!: profileAffiliate;
  profile!: ProfileModel;

  fullName: string = '';
  doctorId = "";

  doctorModel?: DoctorModel;

  services = new FormControl();
  groupedServices: any[] = [];
  encasa: string[] = [];
  clinica: string[] = [];
  virtual!: any;
  prueba!: any;
  serviceLimpioClinic!: any[];
  serviceLimpioAtHome!: any[];
  serviceLimpioVirtual!: any[];

  constructor(
    private bookingService: BookingService,
    private toast: HotToastService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
  ) {

  }

  ngOnInit(): void {
    this.getDoctorId();
    this.getDataAffiliate();
    this.getGroupService();
  }

  getDoctorId() {
    this.doctorId = this.route.snapshot.params['id'];
    console.log('getDoctor :>> ', this.doctorId);

  };

  removeService(service: string) {
    const services = this.services.value as string[];
    this.removeFirst(services, service);
    this.services.setValue(services); // To trigger change detection
  }

  private removeFirst<T>(array: T[], toRemove: T): void {
    const index = array.indexOf(toRemove);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }

  // 61097293913cf4eaacb177b2
  getDataAffiliate() {
    this.bookingService.getDoctorById(this.doctorId).pipe(takeUntil(this.unsubscribe$))
      .subscribe(res => {
        this.afilliate = res;
        const { fullName, id, specialty } = this.afilliate.affiliate;
        this.fullName = fullName;
        this.doctorModel = { fullName, id, specialty }

        this.bookingService.bookingModel.doctor = this.doctorModel;

        this.bookingService.saveData();

        console.log('nameAffiliate :>> ', fullName);
      }, (error => {
        this.router.navigate(['./error/not-found']);
      }))
  }

  //5d24476eea8ebc659106657c 5f88fad8fbe0751540193757 61097293913cf4eaacb177b2 - domicilio
  getGroupService() {
    this.bookingService.getDoctorById("5d24476eea8ebc659106657c").pipe(takeUntil(this.unsubscribe$))
      .subscribe((res: profileAffiliate) => {
        this.virtual = res.affiliate.groupedServices.virtual.map(service => service.service.name.es)
        this.encasa = res.affiliate.groupedServices.atHome.map(service => service.service.name.es)
        this.clinica = res.affiliate.groupedServices.clinic.map(service => service.service.name.es)
        //console.log('clinica', this.clinica);

        this.serviceLimpioClinic = Array.from(new Set(this.clinica))
        console.log('clean', this.serviceLimpioClinic)

        this.serviceLimpioAtHome = Array.from(new Set(this.encasa))
        console.log('clean', this.serviceLimpioAtHome)

        this.serviceLimpioVirtual = Array.from(new Set(this.virtual))
        console.log('clean', this.serviceLimpioVirtual)
        //console.log(this.virtual, this.encasa, this.clinica);
      })
  }



  onChange(op: any) {
    console.log(op)
    this.bookingService.bookingModel.type = op;
    switch (op) {
      case "telemedicina":
        this.groupedServices = this.serviceLimpioVirtual;
        break;
      case "athome":
        this.groupedServices = this.serviceLimpioAtHome;
        // this.afilliate.affiliate.groupedServices.atHome;
        break;
      case "atclinic":
        this.groupedServices = [
          ...this.serviceLimpioClinic,
        ];
        console.log("atclinic");
        // this.afilliate.affiliate.groupedServices.clinic
        break;
      default:
        console.log(op);
        break;
    }
  }

  openSnackBar() {
    this.toast.error('Seleccione Modalidad!', { position: 'top-center', duration: 2000 });
  }

  selectedType = (type: string): boolean => type == this.bookingService.bookingModel.type;

  openServiceModal() {
    if (this.groupedServices.length > 0) {

      const dialogRef = this.dialog.open(SelectServiceModalComponent, {
        data: { services: this.groupedServices, selected: this.services.value ?? [] },
        panelClass: 'DialogContainer'
      });

      dialogRef.afterClosed().subscribe(selectedServices => {
        console.log('The dialog was closed', selectedServices);
        if (selectedServices) {
          this.services.setValue(selectedServices)
        }
      });
    }
    else {
      this.openSnackBar();
    }

  }


  onClickNext() {
    console.log('hola', this.route.snapshot.url);
    this.bookingService.bookingModel.affiliate = this.afilliate.affiliate;
    this.bookingService.saveData();

    switch (this.bookingService.bookingModel.type) {
      case "telemedicina":
        this.router.navigate(['virtual'], { relativeTo: this.route });
        break;
      case "athome":
        this.router.navigate(['domicilio'], { relativeTo: this.route });
        // this.afilliate.affiliate.groupedServices.atHome;
        break;
      case "atclinic":
        this.router.navigate(['consultorio'], { relativeTo: this.route });
        console.log("atclinic");
        // this.afilliate.affiliate.groupedServices.clinic
        break;
      default:
        this.openSnackBar();
        break;
    }
  }


  ngOnDestroy() {
    this.unsubscribe$ ? this.unsubscribe$.next() : null;
    this.unsubscribe$ ? this.unsubscribe$.complete() : null;
  }

}
