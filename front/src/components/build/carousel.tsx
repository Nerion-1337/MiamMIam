// BUILDER
import Typo from "#components/build/global/typography";
import Img from "#components/build/global/img";
import Button from "#components/build/global/button";
// DATA
import { List_icon } from "#1_data/links";
// REACT
import { useState, useEffect, useRef, useCallback, MouseEventHandler, TouchEventHandler} from "react";
import React from "react";
// TYPAGE
import { carousel, element_recipe_reducer, api, like_follow_reducer, cooking_process_reducer } from "#0_types/typages";
//
//
//
//
//
export default function Carousel({
  img,
}: carousel) {
//
//
// VARIABLE
//
//
const totalImages = img.length;
const [currentIndex, setCurrentIndex] = useState(0);
const [isSliding, setIsSliding] = useState(false);
const carouselRef = useRef<HTMLDivElement>(null);
const slideShow = currentIndex !== undefined && `${currentIndex + 1}`;
//
//
// FUNCTION
//
//
//
// PERMET LE SCROLL DU CAROUSEL
const scrollToIndex = useCallback(
    (index: React.SetStateAction<number>) => {
      if (carouselRef.current) {
        
        const currentRef = carouselRef.current as HTMLDivElement;
        //carouselRef.current.scrollWidth récupère la longueur total du carousel
        const itemWidth = currentRef.scrollWidth / totalImages;
        const currentPosition = (index as number) * itemWidth;

        currentRef.scrollTo({
          left: currentPosition,
          behavior: "smooth",
        });
        setCurrentIndex(index);
        setIsSliding(false);
      }
    },
    [carouselRef, totalImages]
  );
//
//
const handleLeftClick = () => {
    const newIndex = currentIndex === 0 ? totalImages - 1 : currentIndex - 1;
    scrollToIndex(newIndex);
  };
//
const handleRightClick = () => {
    const newIndex = currentIndex === totalImages - 1 ? 0 : currentIndex + 1;
    scrollToIndex(newIndex);
  };
//
// SWITCH TOUTES LES 5 SEC
useEffect(() => {
    let intervalId: number;
    if (!isSliding) {
      intervalId = setInterval(() => {
        const newIndex =
          currentIndex === totalImages - 1 ? 0 : currentIndex + 1;
        scrollToIndex(newIndex);
      }, 8000);
    }
    return () => clearInterval(intervalId);
  }, [isSliding, currentIndex, totalImages, scrollToIndex]);
//
// ACTUALISE AU REDIMENTIONNEMENT PAGE
useEffect(() => {
    const handleResize = () => {
      scrollToIndex(currentIndex);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });
//
// SCROLL A L'UTILISATION DE LA SOURIE
const handleMouseDown: MouseEventHandler<HTMLDivElement> = (event) => {
  if (event.type === "mousedown") {
    event.preventDefault();
  }
  setIsSliding(true);
  const allBanner = document.querySelector(".allBanner") as HTMLDivElement | null;

  // startX permet de stocker la position de départ horizontal du click
  const startX = event.pageX;

  //scroLeft stock la position actuelle du carousel
  if (!carouselRef.current) return;
  let scrollLeft = carouselRef.current.scrollLeft;
  let currentX: number;

  //fonction qui met à jour la position de fin du click
  const handleMouseMove = (event: MouseEvent) => {
    const x = event.pageX;

    //calcule la distance parcourur par la sourie entre début/fin click
    const walk = (x - startX) * 1;

    //permet le défilement du carousel
    if (!carouselRef.current) return;
    carouselRef.current.scrollLeft = scrollLeft - walk;
    currentX = x;
  };

  //s'execute lorsque le click n'est plus actif
  const handleMouseUp = () => {
    //setIsSliding(false);
    if (!carouselRef.current) return;
    const itemWidth = carouselRef.current.scrollWidth / totalImages;

    //calcule de l'index image la plus proche en divisant la position actuelle de défilement (scrollLeft) par la largeur de chaque item, puis en arrondissant le résultat à l'entier le plus proche
    const newIndex =
      Math.round(carouselRef.current.scrollLeft / itemWidth) || currentIndex;

    //si glissement vers la gauche + pas dernière image transition
    if (currentX < startX && newIndex !== totalImages - 1) {
      scrollToIndex(newIndex + 1);
      //si glissement vers la gauche + dernière image transition vers 1er
    } else if (currentX < startX && newIndex === totalImages - 1) {
      scrollToIndex(0);
      //si glissement vers la droite + pas première image transition
    } else if (currentX > startX && newIndex !== 0) {
      scrollToIndex(newIndex - 1);
      //si glissement vers la droite + première image transition vers last
    } else if (currentX > startX && newIndex === 0) {
      scrollToIndex(totalImages - 1);
      //si mouvement sourie insuffisant
    }
    //remet à zero l'écouteur d'évènement
    if (!allBanner) return;
    allBanner.removeEventListener("mousemove", handleMouseMove);
    allBanner.removeEventListener("mouseup", handleMouseUp);
  };
  if (!allBanner) return;
  allBanner.addEventListener("mousemove", handleMouseMove);
  allBanner.addEventListener("mouseup", handleMouseUp);
};
//
// SCROLL A L'UTILISATION TACTIL
const handleTouchDown: TouchEventHandler<HTMLDivElement> = (event) => {
  if (event.type === "mousedown") {
    event.preventDefault();
  }
  setIsSliding(true);
  const allBanner = document.querySelector(".allBanner") as HTMLDivElement | null;

  // startX permet de stocker la position de départ horizontal du click
  const startX = event.touches[0].pageX;

  //scroLeft stock la position actuelle du carousel
  if (!carouselRef.current) return;
  let scrollLeft = carouselRef.current.scrollLeft;
  let currentX: number;

  //fonction qui met à jour la position de fin du click
  const handleMouseMove = (event: TouchEvent) => {
    const x = event.touches[0].pageX;

    //calcule la distance parcourur par la sourie entre début/fin click
    const walk = (x - startX) * 1;

    //permet le défilement du carousel
    if (!carouselRef.current) return;
    carouselRef.current.scrollLeft = scrollLeft - walk;
    currentX = x;
  };

  //s'execute lorsque le click n'est plus actif
  const handleMouseUp = () => {
    //setIsSliding(false);
    if (!carouselRef.current) return;
    const itemWidth = carouselRef.current.scrollWidth / totalImages;

    //calcule de l'index image la plus proche en divisant la position actuelle de défilement (scrollLeft) par la largeur de chaque item, puis en arrondissant le résultat à l'entier le plus proche
    const newIndex =
      Math.round(carouselRef.current.scrollLeft / itemWidth) || currentIndex;

    //si glissement vers la gauche + pas dernière image transition
    if (currentX < startX && newIndex !== totalImages - 1) {
      scrollToIndex(newIndex + 1);
      //si glissement vers la gauche + dernière image transition vers 1er
    } else if (currentX < startX && newIndex === totalImages - 1) {
      scrollToIndex(0);
      //si glissement vers la droite + pas première image transition
    } else if (currentX > startX && newIndex !== 0) {
      scrollToIndex(newIndex - 1);
      //si glissement vers la droite + première image transition vers last
    } else if (currentX > startX && newIndex === 0) {
      scrollToIndex(totalImages - 1);
      //si mouvement sourie insuffisant
    }
    //remet à zero l'écouteur d'évènement
    if (!allBanner) return;
    allBanner.addEventListener("touchmove", handleMouseMove);
    allBanner.addEventListener("touchend", handleMouseUp);
  };
  if (!allBanner) return;
  allBanner.addEventListener("touchmove", handleMouseMove);
  allBanner.addEventListener("touchend", handleMouseUp);
};  
//
//
// BUILDER
//
//
const img_carousel = img.map((item, index) =>(
    <div className="bloc_img" key={index}>
      <img src={typeof item === "string" ? item : "" } />
    </div>
))
//
const carousel_multiple = (
    <>
    <div className="carousel">
        <Button
        variant="icon"
        size="s2"
        icon={List_icon.chevron[2].icon}
        className="btn btn_Left"
        fonction={handleLeftClick}
        />

        <div
          className="allBanner"
          ref={carouselRef}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchDown}
        >
          {img_carousel}
        </div>

        <div className="slideShow">
          {slideShow}/{totalImages}
        </div>

        <Button
        variant="icon"
        size="s2"
        icon={List_icon.chevron[3].icon}
        className="btn btn_Right"
        fonction={handleRightClick}
        />
      </div>
    </>
)
//
const carousel_simple = (
    <>
          <div className="carousel">
        <div className="allBanner">
          {img_carousel}
        </div>
      </div>
    </>
)
//
const content = (
    <>
    {totalImages > 1 ? (
   carousel_multiple
    ):(
        carousel_simple
    )}
    </>
)
//
//
// RETURN
//
//
    return content
}