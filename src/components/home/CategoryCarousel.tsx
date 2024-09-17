import { useDispatch } from "react-redux";
import { Button } from "../ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import type { AppDispatch } from "@/redux/store";
import { setSearchQuery } from "@/redux/slices/jobSlice";
import { useNavigate } from "react-router-dom";

const category = [
  "Web Developer",
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "FullStack Developer",
];

export default function () {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const browseCategory = (category: string) => {
    dispatch(setSearchQuery(category));

    navigate("/browse");
  };

  return (
    <div className="">
      <Carousel className="hidden w-full max-w-xl mx-auto my-20 md:flex">
        <CarouselContent>
          {category.map((cat, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg-basis-1/3">
              <Button
                onClick={() => browseCategory(cat)}
                variant="outline"
                className="font-bold rounded-md"
              >
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
