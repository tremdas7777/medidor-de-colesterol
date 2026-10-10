import imgProduto from "@/assets/glicomax-produto.webp";
import imgMedidas from "@/assets/glicomax-medidas.webp";
import imgUsoNoite from "@/assets/glicomax-uso-noite.webp";
import bannerStoreMobile from "@/assets/glicomax-banner-mobile.jpg";
import bannerStoreDesktop from "@/assets/glicomax-banner-desktop.jpg";

export type BannerSlide = {
  mobile: string;
  desktop: string;
  alt: string;
  caption: string;
  bg: string;
};

/** Único banner da loja — desktop (horizontal) + mobile (vertical) */
export const bannerGallery: BannerSlide[] = [
  {
    mobile: bannerStoreMobile,
    desktop: bannerStoreDesktop,
    alt: "Glicosímetro GlicoMax — glicose e batimentos em segundos",
    caption: "Glicose · Frequência cardíaca · Tela colorida",
    bg: "#E6F3FB",
  },
];

export type GalleryItem = {
  src: string;
  alt: string;
  caption: string;
  /** Fundo do quadro (ex.: #ffffff para foto em fundo branco) */
  bg?: string;
};

/** Galeria do produto — troque pelas fotos reais quando chegarem */
export const productGallery: GalleryItem[] = [
  {
    src: imgProduto,
    alt: "Glicosímetro GlicoMax mostrando glicose e batimentos",
    caption: "Glicose e batimentos na tela",
    bg: "#ffffff",
  },
  {
    src: imgMedidas,
    alt: "Medidas do glicosímetro GlicoMax: 5,7 × 3,1 × 3 cm",
    caption: "Compacto · 5,7 × 3,1 × 3 cm",
    bg: "#ffffff",
  },
  {
    src: imgUsoNoite,
    alt: "Glicosímetro GlicoMax sobre a mesa de cabeceira",
    caption: "Para usar em casa",
  },
];

export const productHeroImage = imgProduto;
export const productKitImage = imgProduto;

export const homeImages = {
  bannerWide: { mobile: bannerStoreMobile, desktop: bannerStoreDesktop },
  heroSensor: { mobile: imgProduto, desktop: imgProduto },
  appIphone: { mobile: imgMedidas, desktop: imgMedidas },
  lifestyleRunning: { mobile: imgUsoNoite, desktop: imgUsoNoite },
  lifestyleFood: { mobile: imgProduto, desktop: imgProduto },
} as const;
