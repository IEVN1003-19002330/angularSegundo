import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface ResultadoTolerancia {
  tolerancia: string;
  color1: string;
  color2: string;
  color3: string;
  estilocolor1: string;
  estilocolor2: string;
  estilocolor3: string;
  colTolerancia: string;
  valor: number;
  valorMaximo: number;
  valorMinimo: number;
}

@Component({
  selector: 'app-resistencias',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './resistencias.component.html',
  styleUrls: ['./resistencias.component.css']
})
export default class ResistenciasComponent implements OnInit {
  formulario: FormGroup;
  resultados: ResultadoTolerancia[] = [];
  mostrarTabla: boolean = false;

  constructor(private fb: FormBuilder) {
    this.formulario = this.fb.group({
      color1: ['0'],
      color2: ['0'],
      color3: ['0'],
      tolerancia: ['oro']
    });
  }

  ngOnInit(): void {
    localStorage.removeItem('coloresArray');
  }

  generaTolerancia(color1: number, color2: number, color3: number, tolerancia: string): ResultadoTolerancia {
    const colores: { [key: number]: string } = {
      0: 'Negro',
      1: 'Café',
      2: 'Rojo',
      3: 'Naranja',
      4: 'Amarillo',
      5: 'Verde',
      6: 'Azul',
      7: 'Violeta',
      8: 'Gris',
      9: 'Blanco'
    };

    const colTolerancia: { [key: string]: string } = {
      'oro': '#FFD700',
      'plata': '#C0C0C0'
    };

    const colorescolor3: { [key: number]: string } = {
      1: 'Negro',
      10: 'Café',
      100: 'Rojo',
      1000: 'Naranja',
      10000: 'Amarillo',
      100000: 'Verde',
      1000000: 'Azul',
      10000000: 'Violeta',
      100000000: 'Gris',
      1000000000: 'Blanco'
    };

    const coloresBackground: { [key: number]: string } = {
      0: '#000000',
      1: '#6F4E37',
      2: '#FF0000',
      3: '#FFA500',
      4: '#FFFF00',
      5: '#008000',
      6: '#0000FF',
      7: '#8A2BE2',
      8: '#808080',
      9: '#FFFFFF'
    };

    let realizaCalculo = color1 * 10 + color2;
    let ohm = realizaCalculo * Math.pow(10, color3);
    let toleranciaFinal = 0;
    let toleranciaFinalMin = 0;

    if (tolerancia === 'oro') {
      toleranciaFinal = ohm + (ohm * 0.05);
      toleranciaFinalMin = ohm - (ohm * 0.05);
    } else if (tolerancia === 'plata') {
      toleranciaFinal = ohm + (ohm * 0.10);
      toleranciaFinalMin = ohm - (ohm * 0.10);
    }

    return {
      tolerancia,
      color1: colores[color1],
      color2: colores[color2],
      color3: colores[color3],
      estilocolor1: coloresBackground[color1],
      estilocolor2: coloresBackground[color2],
      estilocolor3: coloresBackground[color3],
      colTolerancia: colTolerancia[tolerancia],
      valor: ohm,
      valorMaximo: toleranciaFinal,
      valorMinimo: toleranciaFinalMin
    };
  }

  guardarColores(): void {
    const coloresSeleccionados = {
      color1: this.formulario.get('color1')?.value,
      color2: this.formulario.get('color2')?.value,
      color3: this.formulario.get('color3')?.value,
      tolerancia: this.formulario.get('tolerancia')?.value
    };
  
    let arregloColores = JSON.parse(localStorage.getItem('coloresArray') || '[]');
  
    arregloColores.push(coloresSeleccionados);
  
    localStorage.setItem('coloresArray', JSON.stringify(arregloColores));
  }

  imprimirResultados(): void {
    const coloresArray = JSON.parse(localStorage.getItem('coloresArray') || '[]');
    
    this.resultados = coloresArray.map((col: any) => {
      const color1 = parseInt(col.color1);
      const color2 = parseInt(col.color2);
      const color3 = parseInt(col.color3);
      const tolerancia = col.tolerancia;

      const resultadoTolerancia = this.generaTolerancia(color1, color2, color3, tolerancia);
      
      return {
        ...resultadoTolerancia,
        tolerancia: col.tolerancia,
      };
    });
    
    this.mostrarTabla = true;
  }
}
