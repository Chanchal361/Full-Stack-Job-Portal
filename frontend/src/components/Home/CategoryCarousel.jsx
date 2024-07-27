import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "../ui/button";
import { setSearchText } from "@/Redux/jobSlic";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Engineer",
  "Data Science",
  "Graphic Designer",
  "UI Developer",
  "Wordpress Developer",
];
const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const nagivate = useNavigate();
  const searchJobHandler = (query) => {
    dispatch(setSearchText(query));
    nagivate("/browse");
  };
  return (
    <div>
      <Carousel className=" w-full max-w-xl mx-auto my-20">
        <CarouselContent>
          {category.map((item, index) => (
            <div key={index}>
              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <Button
                  onClick={() => searchJobHandler(item)}
                  className="rounded-full"
                  variant="outlet"
                >
                  {item}
                </Button>
              </CarouselItem>
            </div>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
