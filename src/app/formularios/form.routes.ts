import {Routes} from "@angular/router";


export default[
    {
        path:'ejemplo1',
        loadComponent:()=>import('./ejemplo1/ejemplo1.component'),
    },
    {
        path: 'zodiaco',
        loadComponent:()=>import('./zodiaco/zodiaco.component'),
    }
]as Routes