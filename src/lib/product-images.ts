import imgProduto from "@/assets/cardiochek-pa.png";
import imgConsulta from "@/assets/consulta.jpg";

export type GalleryItem = {
  src: string;
  alt: string;
  caption: string;
  /** Fundo do quadro (ex.: #ffffff para foto em fundo branco) */
  bg?: string;
};

/** Galeria do produto — troque/adicione fotos reais (caixa, tiras, aparelho em uso). */
export const productGallery: GalleryItem[] = [
  { src: imgProduto, alt: "Analisador CardioChek PA", caption: "CardioChek PA", bg: "#ffffff" },
  {
    src: imgConsulta,
    alt: "Profissional de saúde atendendo paciente no consultório",
    caption: "No consultório",
  },
];

export const productHeroImage = imgProduto;
export const productKitImage = imgProduto;
export const consultaImage = imgConsulta;
