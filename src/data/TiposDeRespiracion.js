// src/data/TiposDeRespiracion.js

export const tiposDeRespiracion = [
  {
    nombre: "Respiración 4-7-8",
    fases: [
      { texto: "Inhala", duracion: 4000 },
      { texto: "Mantén", duracion: 7000 },
      { texto: "Exhala", duracion: 8000 },
    ],
  },
  {
    nombre: "Respiración Diafragmática",
    fases: [
      { texto: "Inhala", duracion: 4000 },
      { texto: "Exhala", duracion: 4000 },
    ],
  },
  {
    nombre: "Respiración Cuadrada",
    fases: [
      { texto: "Inhala", duracion: 4000 },
      { texto: "Mantén", duracion: 4000 },
      { texto: "Exhala", duracion: 4000 },
      { texto: "Mantén", duracion: 4000 },
    ],
  },
  {
    nombre: "Respiración Alterna por las Fosas Nasales",
    fases: [
      { texto: "Inhala por la fosa nasal derecha", duracion: 4000 },
      { texto: "Exhala por la fosa nasal izquierda", duracion: 4000 },
    ],
  },
  {
    nombre: "Respiración Ujjayi",
    fases: [
      { texto: "Inhala y exhala por la nariz", duracion: 4000 },
    ],
  },
];
