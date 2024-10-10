import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-zodiaco',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './zodiaco.component.html',
  styleUrl: './zodiaco.component.css'
})
export class ZodiacoComponent {

  datosForm: FormGroup;
  resultado: string = '';
  edad: number = 0;
  signoZodiaco: string = '';
  currentYear: number = new Date().getFullYear();

  constructor(private fb: FormBuilder) {
    this.datosForm = this.fb.group({
      nombre: ['', Validators.required],
      apaterno: [''],
      amaterno: [''],
      dia: [null, [Validators.required, Validators.min(1), Validators.max(31)]],
      mes: [null, [Validators.required, Validators.min(1), Validators.max(12)]],
      anio: [null, [Validators.required, Validators.min(1900)]],
      sexo: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.datosForm.invalid) {
      alert('Por favor completa todos los campos obligatorios.');
      return;
    }

    const { dia, mes, anio } = this.datosForm.value;

    if (mes === 2) {
      if ((this.esBisiesto(anio) && dia > 29) || (!this.esBisiesto(anio) && dia > 28)) {
        alert('El día no es válido para el mes de febrero.');
        return;
      }
    }

    if ((mes === 4 || mes === 6 || mes === 9 || mes === 11) && dia > 30) {
      alert('El día no es válido para el mes seleccionado.');
      return;
    }

    this.onImprimir();
  }

  calcularEdad(dia: number, mes: number, anio: number): number {
    const hoy = new Date();
    let edad = hoy.getFullYear() - anio;
    const mesNacimiento = mes - 1;
    if (hoy.getMonth() < mesNacimiento || (hoy.getMonth() === mesNacimiento && hoy.getDate() < dia)) {
      edad--;
    }
    return edad;
  }

  obtenerSignoChino(anio: number): string {
    const signosChinos = ['Rata', 'Buey', 'Tigre', 'Conejo', 'Dragón', 'Serpiente', 'Caballo', 'Cabra', 'Mono', 'Gallo', 'Perro', 'Cerdo'];
    return signosChinos[anio % 12];
  }

  esBisiesto(anio: number): boolean {
    return (anio % 4 === 0 && anio % 100 !== 0) || (anio % 400 === 0);
  }

  onImprimir() {
    const { apaterno, amaterno, nombre, dia, mes, anio } = this.datosForm.value;
    this.edad = this.calcularEdad(dia, mes, anio);
    this.signoZodiaco = this.obtenerSignoChino(anio);
    this.resultado = `Hola ${nombre} ${apaterno} ${amaterno}, tienes ${this.edad} años y tu signo zodiacal chino es ${this.signoZodiaco}.`;
  }
}
