import React, { useEffect, useState, FC } from "react";
import '../style/Carousel.css';
import carousel1 from '../assets/img/carousel/carousel-1.png';
import carousel2 from '../assets/img/carousel/carousel-2.png';
import carousel3 from '../assets/img/carousel/carousel-3.png';

const Carousel: FC = () => {
    const images = [
        carousel1,
        carousel2,
        carousel3
    ];

    const texts = [
        "Pheabots is a team producing multi-purpose bots. We have 2 bots: Zilya and A-Nia.",
        "Zilya is a bot with multiple commands such as for fun/ moderation/ music etc and has a lot of features like logger, welcome/leave message, etc.",
        "A-Nia is a bot with multiple resources to help students in their studies."
    ];

    const [currentImage, setCurrentImage] = useState<number>(0);
    const [flipped, setFlipped] = useState<boolean>(false);
    const [isSwiping, setIsSwiping] = useState<boolean>(false);
    const [startTouchTime, setStartTouchTime] = useState<number>(0);
    const swipeThreshold = 50; // Minimum distance for a swipe to be registered
    const [startTouchPosition, setStartTouchPosition] = useState<number>(0);
    const [endTouchPosition, setEndTouchPosition] = useState<number>(0);

    useEffect(() => {
        const inviteButton = document.getElementsByClassName('home-invite-button')[0] as HTMLElement;
        if (currentImage === 0) {
            inviteButton.style.display = 'none';
        } else {
            inviteButton.style.display = 'block';
        }
    }, [currentImage]);

    const handleSwipeStart = (e: React.TouchEvent<HTMLDivElement>) => {
        setIsSwiping(true);
        setStartTouchTime(e.timeStamp);
        const touch: React.Touch = e.touches[0];
        const startX: number = touch.clientX;
        setStartTouchPosition(startX);
    };

    const handleSwipeMove = (e: TouchEvent) => {
        const touch: Touch = e.touches[0];
        const moveX: number = touch.clientX;

        setEndTouchPosition(moveX);
    };

    const handleSwipeEnd = () => {
        setIsSwiping(false);
        const swipeDistance = endTouchPosition - startTouchPosition;

        if (Math.abs(swipeDistance) > swipeThreshold) {
            if (swipeDistance > 0) {
                // Swiped right, show the previous image
                setCurrentImage((prevImage) => (prevImage - 1 + images.length) % images.length);
            } else {
                // Swiped left, show the next image
                setCurrentImage((prevImage) => (prevImage + 1) % images.length);
            }
        }
    };

    const selectImage = (index: number) => {
        if (!images[index] || !images[index].includes) {
            return;
        }
        if (images[index].includes("carousel-1")) {
            document.getElementsByClassName("home-text")[0].innerHTML = "Please select one of our bots!";
        }
        else if (images[index].includes("carousel-2")) {
            document.getElementsByClassName("home-invite-button")[0].innerHTML = "Invite Zilya!";
            document.getElementsByClassName("home-text")[0].innerHTML = "Zilya was picked!";
        } else {
            document.getElementsByClassName("home-invite-button")[0].innerHTML = "Invite A-Nia!";
            document.getElementsByClassName("home-text")[0].innerHTML = "A-Nia was picked!";
        }

        if (index === currentImage && !flipped) {
            // flip the card
            setFlipped(true);
            const flippedElement: Element = document.getElementsByClassName("carousel-item")[currentImage];
            flippedElement.addEventListener("transitionend", () => {
                (flippedElement.querySelector("img")! as HTMLElement).style.opacity = "0.15";
                setTimeout(() => {
                    // select the text depending on the image name
                    const text: string = texts[currentImage];
                    (flippedElement.querySelector(".carousel-item-text")! as HTMLElement).innerHTML = text;
                    (flippedElement.querySelector(".carousel-item-text")! as HTMLElement).style.display = "block";
                }, 500); // adjust delay time as needed
            }, { once: true });
            flippedElement.classList.add("flipped");
        } else if (index === currentImage && flipped) {
            // flip the card back
            const flippedElement: Element = document.getElementsByClassName("carousel-item")[currentImage];
            (flippedElement.querySelector(".carousel-item-text")! as HTMLElement).style.display = "none";
            flippedElement.addEventListener("transitionend", () => {
                (flippedElement.querySelector("img")! as HTMLElement).style.opacity = "1";
            }, { once: true });
            flippedElement.classList.remove("flipped");
            setFlipped(false);
        } else {
            // select a new card
            setFlipped(false);
            const currentElement: Element = document.getElementsByClassName("carousel-item")[currentImage];

            (currentElement.querySelector(".carousel-item-text")! as HTMLElement).style.display = "none";
            (currentElement.querySelector("img")! as HTMLElement).style.opacity = "1";
            currentElement.classList.remove("center");
            setCurrentImage(index);
        }
    };

    const debounce = (func: Function, delay: number) => {
        let timer: NodeJS.Timeout;
        return function (this: any, ...args: any[]) {
            clearTimeout(timer);
            timer = setTimeout(() => func.apply(this, args), delay);
        };
    };

    const debouncedSelectImage = debounce(selectImage, 100);

    const getClassName = (index: number) => {
        const center = currentImage;
        const left = (currentImage - 1 + images.length) % images.length;
        const right = (currentImage + 1) % images.length;

        if (index === center) {
            // check if class name is already set before making checks
            return "carousel-item center";
        } else if (index === left) {
            return "carousel-item left";
        } else if (index === right) {
            return "carousel-item right";
        } else {
            return "carousel-item";
        }
    };

    return (
        <div className="carousel">
            <div className="carousel-container">
                {images.map((image, index) => (
                    <div
                        className={getClassName(index)}
                        onClick={() => selectImage(index)}
                        onTouchStart={handleSwipeStart}
                        onTouchEnd={handleSwipeEnd}
                        onTouchMove={() => handleSwipeMove}
                        key={index}
                    >
                        <img src={image} alt={`Image ${index}`} />
                        <div className="carousel-item-text"></div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Carousel;
