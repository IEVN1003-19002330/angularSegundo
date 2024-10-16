import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-zodiaco',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './zodiaco.component.html',
  styleUrl: './zodiaco.component.css'
})

export default class ZodiacoComponent {

  datosForm: FormGroup;
  resultado: string = '';
  edad: number = 0;
  signoZodiaco: string = '';
  signoZodiacoUrl: string = '';
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
    const signosChinos = [
      'Rata',     // 0
      'Buey',     // 1
      'Tigre',    // 2
      'Conejo',   // 3
      'Dragón',   // 4
      'Serpiente',// 5
      'Caballo',  // 6
      'Cabra',    // 7
      'Mono',     // 8
      'Gallo',    // 9
      'Perro',    // 10
      'Cerdo'     // 11
    ];

    const baseYear = 1924;
    const index = (anio - baseYear) % 12;
    return signosChinos[(index + 12) % 12];
  }
  

  obtenerSignoZodiacoImagen(signo: string): string {
    const imagenesZodiaco: { [key: string]: string } = {
      'Rata': 'https://confuciomag.com/wp-content/uploads/2016/01/06_horoscopo_chino_Rata.jpg',
      'Buey': 'https://confuciomag.com/wp-content/uploads/2016/01/06_horoscopo_chino_Buey.jpg',
      'Tigre': 'https://confuciomag.com/wp-content/uploads/2016/01/06_horoscopo_chino_Tigre.jpg',
      'Conejo': 'https://confuciomag.com/wp-content/uploads/2016/01/06_horoscopo_chino_Conejo.jpg',
      'Dragón': 'https://confuciomag.com/wp-content/uploads/2016/01/06_horoscopo_chino_Dragon.jpg',
      'Serpiente':'https://confuciomag.com/wp-content/uploads/2016/01/06_horoscopo_chino_Serpiente.jpg',
      'Caballo':'https://confuciomag.com/wp-content/uploads/2016/01/06_horoscopo_chino_Caballo.jpg',
      'Cabra':'https://confuciomag.com/wp-content/uploads/2016/01/06_horoscopo_chino_Cabra.jpg',
      'Mono':'https://confuciomag.com/wp-content/uploads/2016/01/06_horoscopo_chino_Mono.jpg',
      'Gallo':'https://confuciomag.com/wp-content/uploads/2016/01/06_horoscopo_chino_Gallo.jpg',
      'Perro':'https://confuciomag.com/wp-content/uploads/2016/01/06_horoscopo_chino_Perro.jpg',
      'Cerdo':'https://confuciomag.com/wp-content/uploads/2016/01/06_horoscopo_chino_Cerdo.jpg'
    };
    return imagenesZodiaco[signo] || 'ruta/de/imagen/por_defecto.jpg';
  }

  esBisiesto(anio: number): boolean {
    return (anio % 4 === 0 && anio % 100 !== 0) || (anio % 400 === 0);
  }

  onImprimir() {
    const { apaterno, amaterno, nombre, dia, mes, anio } = this.datosForm.value;
    this.edad = this.calcularEdad(dia, mes, anio);
    this.signoZodiaco = this.obtenerSignoChino(anio);
    this.signoZodiacoUrl = this.obtenerSignoZodiacoImagen(this.signoZodiaco);
    this.resultado = `Hola ${nombre} ${apaterno} ${amaterno}, tienes ${this.edad} años y tu signo zodiacal chino es ${this.signoZodiaco}.`;
  }
}
