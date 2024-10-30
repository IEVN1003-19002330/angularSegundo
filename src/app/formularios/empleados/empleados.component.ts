import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Empleado {
  matricula: number;
  nombre: string;
  correo: string;
  edad: number;
  horasTrabajadas: number;
}

interface EmpleadoConCalculos extends Empleado {
  horasXPagar: number;
  horasExtras: number;
  subtotal: number;
}

@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css'],
})
export default class EmpleadosComponent {

  formGroup!: FormGroup;
  empleados: EmpleadoConCalculos[] = [];
  horasPago = 70;
  horasExtrasPago = 140;
  totalAPagar: number = 0;

  constructor(private readonly fb: FormBuilder) {
    this.formGroup = this.fb.group({
      matricula: [0, Validators.required],
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      edad: [0, [Validators.required, Validators.min(18)]],
      horasTrabajadas: [0, Validators.required]
    });
  }

  registrarEmpleado() {
    if (this.formGroup.valid) {
      const { matricula, nombre, correo, edad, horasTrabajadas } = this.formGroup.value;
      const empleadoGuardado: Empleado = { matricula, nombre, correo, edad, horasTrabajadas };

      const registrosGuardados = localStorage.getItem('empleados');
      const empleadosActuales: Empleado[] = registrosGuardados ? JSON.parse(registrosGuardados) : [];

      const posicion = empleadosActuales.findIndex(e => e.matricula === matricula);
      if (posicion !== -1) {
        empleadosActuales[posicion] = empleadoGuardado;
      } else {
        empleadosActuales.push(empleadoGuardado);
      }

      localStorage.setItem('empleados', JSON.stringify(empleadosActuales));
      this.formGroup.reset();
    }
  }

  mostrarRegistros() {
    const registrosGuardados = localStorage.getItem('empleados');
    if (registrosGuardados) {
      this.empleados = JSON.parse(registrosGuardados).map((empleado: Empleado) => {
        const horasNormales = empleado.horasTrabajadas <= 40 ? empleado.horasTrabajadas : 40;
        const horasExtras = empleado.horasTrabajadas > 40 ? empleado.horasTrabajadas - 40 : 0;

        return {
          ...empleado,
          horasXPagar: horasNormales * this.horasPago,
          horasExtras: horasExtras * this.horasExtrasPago,
          subtotal: (horasNormales * this.horasPago) + (horasExtras * this.horasExtrasPago),
        } as EmpleadoConCalculos;
      });

      this.totalAPagar = this.calcularTotal();
    }
  }

  modificarEmpleado(matricula: number) {
    const empleado = this.empleados.find(e => e.matricula === matricula);
    if (empleado) {
      this.formGroup.patchValue({ ...empleado });
    }
  }

  eliminarEmpleado(matricula: number) {
    this.empleados = this.empleados.filter(e => e.matricula !== matricula);
    localStorage.setItem('empleados', JSON.stringify(this.empleados));
    this.totalAPagar = this.calcularTotal();
  }

  calcularTotal(): number {
    return this.empleados.reduce((total, empleado) => total + empleado.subtotal, 0);
  }

  ngOnInit() {
    localStorage.clear();
    this.mostrarRegistros();
  }
}
